import { spawnSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const files = [];

function check(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.git') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (full.replace(/\\/g, '/') === 'test/e2e') continue;
      check(full);
    } else if (full.endsWith('.test.ts')) {
      if (entry.endsWith('.slow.test.ts') || entry.endsWith('.serial.test.ts')) continue;
      files.push(full);
    }
  }
}

check('test');
files.sort();

console.log(`[run_unit_tests] Found ${files.length} unit test files.`);
console.log('Spawning bun test...');

const gitBin = 'C:\\Program Files\\Git\\bin';
const env = { ...process.env, PATH: gitBin + ';' + process.env.PATH };

const res = spawnSync('bun', ['test', '--timeout=60000', ...files], {
  stdio: 'inherit',
  env,
});

process.exit(res.status ?? 1);
