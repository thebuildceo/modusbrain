/**
 * #1698 — shared `hasAnthropicKey` (consolidated from 3 private copies).
 *
 * Hermetic: every case isolates env + MODUSBRAIN_HOME via `withEnv` (R1) so the
 * dev machine's real ~/.modusbrain/config.json never leaks into the "neither" case.
 */

import { describe, test, expect, afterEach } from 'bun:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { withEnv } from '../helpers/with-env.ts';
import { hasAnthropicKey } from '../../src/core/ai/anthropic-key.ts';

const tmpDirs: string[] = [];
function freshHome(withConfig?: Record<string, unknown>): string {
  const home = mkdtempSync(join(tmpdir(), 'modusbrain-akey-'));
  tmpDirs.push(home);
  if (withConfig) {
    const dir = join(home, '.modusbrain');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'config.json'), JSON.stringify(withConfig), 'utf8');
  }
  return home;
}

afterEach(() => {
  while (tmpDirs.length) {
    const d = tmpDirs.pop()!;
    try { rmSync(d, { recursive: true, force: true }); } catch { /* best effort */ }
  }
});

describe('hasAnthropicKey', () => {
  test('env ANTHROPIC_API_KEY set → true (no config read needed)', async () => {
    const home = freshHome(); // empty home so config can't accidentally satisfy it
    await withEnv(
      { ANTHROPIC_API_KEY: 'sk-test', MODUSBRAIN_HOME: home, DATABASE_URL: undefined, MODUSBRAIN_DATABASE_URL: undefined },
      async () => {
        expect(hasAnthropicKey()).toBe(true);
      },
    );
  });

  test('modusbrain config anthropic_api_key set (no env) → true', async () => {
    const home = freshHome({ anthropic_api_key: 'sk-from-config' });
    await withEnv(
      { ANTHROPIC_API_KEY: undefined, MODUSBRAIN_HOME: home, DATABASE_URL: undefined, MODUSBRAIN_DATABASE_URL: undefined },
      async () => {
        expect(hasAnthropicKey()).toBe(true);
      },
    );
  });

  test('neither env nor config → false', async () => {
    const home = freshHome(); // no config.json written
    await withEnv(
      { ANTHROPIC_API_KEY: undefined, MODUSBRAIN_HOME: home, DATABASE_URL: undefined, MODUSBRAIN_DATABASE_URL: undefined },
      async () => {
        expect(hasAnthropicKey()).toBe(false);
      },
    );
  });
});
