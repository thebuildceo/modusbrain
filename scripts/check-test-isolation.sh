#!/usr/bin/env bash
# CI guard for test isolation. Fast Node-backed implementation; enforces:
# R1 env mutation, R2 mock.module, R3 PGLiteEngine creation location,
# R4 PGLiteEngine disconnect cleanup.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

node <<'NODE'
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const allowlistPath = path.join(root, 'scripts/check-test-isolation.allowlist');
const allowlist = new Set(
  fs.existsSync(allowlistPath)
    ? fs.readFileSync(allowlistPath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
    : [],
);

function posix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (posix(path.relative(root, full)).includes('/e2e')) continue;
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.test.ts') && !entry.name.endsWith('.serial.test.ts')) {
      const rel = posix(path.relative(root, full));
      if (!rel.startsWith('test/e2e/')) out.push(rel);
    }
  }
  return out.sort();
}

const files = walk(path.join(root, 'test'));
const violations = [];

function addViolation(file, rule, detail, lines) {
  if (allowlist.has(file)) return;
  violations.push({ file, rule, detail, lines: lines.slice(0, 3) });
}

const envMutation = /process\.env\.[A-Za-z_][A-Za-z_0-9]*\s*=[^=]|process\.env\[[^\]]+\]\s*=[^=]|delete\s+process\.env\.|delete\s+process\.env\[|Object\.assign\s*\(\s*process\.env|Reflect\.set\s*\(\s*process\.env/;
const mockModule = /mock\.module\s*\(/;
const pgliteNew = /new PGLiteEngine\s*\(/;
const beforeAll = /beforeAll\s*\(/;
const afterAll = /afterAll\s*\(/;
const disconnect = /\.disconnect\s*\(/;

for (const file of files) {
  const full = path.join(root, ...file.split('/'));
  const text = fs.readFileSync(full, 'utf8');
  const lines = text.split(/\r?\n/);

  const envLines = [];
  const mockLines = [];
  let hasPglite = false;
  let hasAfterAll = false;
  let hasDisconnect = false;
  let lastBeforeAll = -1000;
  const badPgliteLines = [];

  lines.forEach((line, index) => {
    const lineNo = index + 1;
    if (envMutation.test(line)) envLines.push(`${lineNo}:${line}`);
    if (mockModule.test(line)) mockLines.push(`${lineNo}:${line}`);
    if (beforeAll.test(line)) lastBeforeAll = lineNo;
    if (afterAll.test(line)) hasAfterAll = true;
    if (disconnect.test(line)) hasDisconnect = true;
    if (pgliteNew.test(line)) {
      hasPglite = true;
      if (lineNo - lastBeforeAll > 50) badPgliteLines.push(`${lineNo}:${line}`);
    }
  });

  if (envLines.length) addViolation(file, 'R1', 'process.env mutation; use withEnv() or rename to *.serial.test.ts', envLines);
  if (mockLines.length) addViolation(file, 'R2', 'mock.module() leaks across files in the shard process; rename to *.serial.test.ts', mockLines);
  if (badPgliteLines.length) addViolation(file, 'R3', 'new PGLiteEngine(...) outside beforeAll() context (>50 lines); move into beforeAll', badPgliteLines);
  if (hasPglite && (!hasAfterAll || !hasDisconnect)) {
    addViolation(file, 'R4', 'creates PGLiteEngine but missing afterAll(() => engine.disconnect()); engine leaks across files in the shard process', []);
  }
}

if (violations.length > 0) {
  for (const violation of violations) {
    console.log(`ERROR: ${violation.file}`);
    console.log(`       rule ${violation.rule}: ${violation.detail}`);
    for (const line of violation.lines) console.log(`         ${line}`);
  }
  console.log('');
  console.log(`check-test-isolation: FAIL (${violations.length} violation(s))`);
  console.log('');
  console.log('Fix:');
  console.log('  - For env mutations, use withEnv() from test/helpers/with-env.ts');
  console.log('  - For mock.module(), rename to *.serial.test.ts (quarantine)');
  console.log('  - For PGLiteEngine, follow the canonical pattern in');
  console.log('    test/helpers/reset-pglite.ts JSDoc and CLAUDE.md.');
  process.exit(1);
}

console.log(`check-test-isolation: OK (${files.length} non-serial unit files scanned)`);
NODE