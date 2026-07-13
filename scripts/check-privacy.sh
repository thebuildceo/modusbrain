#!/usr/bin/env bash
# check-privacy.sh - CLAUDE.md privacy enforcement.

set -euo pipefail

usage() {
  cat <<EOF
scripts/check-privacy.sh - scan for banned private deployment names/paths.

USAGE:
  scripts/check-privacy.sh           Scan all tracked files in the working tree.
  scripts/check-privacy.sh --staged  Scan only files staged for commit.
  scripts/check-privacy.sh --help    Show this message.
EOF
}

MODE=working
for arg in "$@"; do
  case "$arg" in
    --staged) MODE=staged ;;
    --help|-h) usage; exit 1 ;;
    *) echo "Unknown argument: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

if ! command -v git >/dev/null 2>&1; then
  echo "check-privacy: git not found" >&2
  exit 2
fi

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

if [ "$MODE" = staged ]; then
  FILES="$(git diff --cached --name-only --diff-filter=ACMR 2>/dev/null || true)"
else
  FILES="$(git ls-files 2>/dev/null || true)"
fi

if [ -z "$FILES" ]; then
  exit 0
fi

export CHECK_PRIVACY_FILES="$FILES"
node <<'NODE'
const fs = require('fs');
const path = require('path');

const bannedName = /wintermute/i;
const bannedPaths = ['/data/brain/', '/data/.openclaw/'];
const allowList = new Set([
  'scripts/check-privacy.sh',
  'scripts/check-fixture-privacy.sh',
  'CLAUDE.md',
  'llms-full.txt',
  'docs/UPGRADING_DOWNSTREAM_AGENTS.md',
  'test/integrations.test.ts',
  'docs/GBRAIN_RECOMMENDED_SCHEMA.md',
  'docs/GBRAIN_V0.md',
  'docs/guides/minions-shell-jobs.md',
  'scripts/smoke-test.sh',
  'skills/migrations/v0.9.0.md',
  'skills/migrations/v0.14.0.md',
  'test/storage-status.test.ts',
  'CHANGELOG.md',
  'skills/migrations/v0.25.1.md',
  'test/recency-decay.test.ts',
  'scripts/check-test-real-names.sh',
  'scripts/check-proposal-pii.sh',
  'test/scripts/check-proposal-pii.test.ts',
  'skills/functional-area-resolver/SKILL.md',
  'src/core/skillpack/harvest-lint.ts',
  'test/skillpack-harvest-lint.test.ts',
  'test/skillpack-harvest.test.ts',
  'test/e2e/skillpack-flow.test.ts',
  'skills/skillpack-harvest/SKILL.md',
  'test/eval-replay-gate.test.ts',
]);
const allowedExtensions = new Set(['.md', '.ts', '.mjs', '.js', '.py', '.sh', '.json', '.yaml', '.yml', '.txt']);

function isScannable(file) {
  const base = path.basename(file);
  if (base.startsWith('README') || base.startsWith('CHANGELOG') || base.startsWith('CLAUDE') || base.startsWith('AGENTS')) return true;
  return allowedExtensions.has(path.extname(file));
}

function lineMatches(text, predicate) {
  const out = [];
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    if (predicate(lines[index])) out.push(`${index + 1}:${lines[index]}`);
  }
  return out;
}

const input = process.env.CHECK_PRIVACY_FILES || '';
const files = input.split(/\r?\n/).filter(Boolean).map((file) => file.replace(/\\/g, '/'));
let found = false;

for (const file of files) {
  if (allowList.has(file)) continue;
  if (!isScannable(file)) continue;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const nameHits = lineMatches(text, (line) => bannedName.test(line));
  if (nameHits.length) {
    found = true;
    console.error(`[check-privacy] BANNED NAME in ${file}:`);
    for (const hit of nameHits) console.error(`  ${hit}`);
  }
  for (const bannedPath of bannedPaths) {
    const pathHits = lineMatches(text, (line) => line.includes(bannedPath));
    if (pathHits.length) {
      found = true;
      console.error(`[check-privacy] BANNED PATH '${bannedPath}' in ${file}:`);
      for (const hit of pathHits) console.error(`  ${hit}`);
    }
  }
}

if (found) {
  console.error('');
  console.error('The private OpenClaw fork name is banned in public artifacts.');
  console.error("Replace with 'your OpenClaw', 'OpenClaw reference deployment', or 'openclaw-reference'.");
  process.exit(1);
}
NODE