/**
 * Hermeticity test: every site that writes under `~/.modusbrain` must honor
 * `MODUSBRAIN_HOME=<tmp>` and write under `<tmp>/.modusbrain` instead of the developer's
 * real home.
 *
 * Why this exists: `src/core/config.ts::configDir()` already supports
 * `MODUSBRAIN_HOME` as a parent-dir override (returns `<override>/.modusbrain`), but
 * historically many call sites built paths from `os.homedir()` directly,
 * bypassing the override. The hermeticity migration migrated every write-side
 * caller to `modusbrainPath(...)`. This test is the regression gate.
 *
 * Scope: write-isolation only. Read-side host detection in
 * `src/commands/init.ts` (reading `~/.claude`, `~/.openclaw`, etc. for module
 * fingerprinting) is the documented v1 caveat and is NOT asserted here.
 */

import { describe, test, expect } from 'bun:test';
import { mkdtempSync, existsSync, readdirSync, statSync, rmSync } from 'fs';
import { homedir, tmpdir } from 'os';
import { join } from 'path';

// Save original env so we don't leak between tests.
const ORIG_MODUSBRAIN_HOME = process.env.MODUSBRAIN_HOME;

function fresh(): string {
  return mkdtempSync(join(tmpdir(), 'modusbrain-home-isolation-'));
}

describe('MODUSBRAIN_HOME write-side isolation', () => {
  test('configDir() returns <MODUSBRAIN_HOME>/.modusbrain when override is set', async () => {
    const tmp = fresh();
    process.env.MODUSBRAIN_HOME = tmp;
    try {
      const { configDir, modusbrainPath } = await import('../src/core/config.ts');
      expect(configDir()).toBe(join(tmp, '.modusbrain'));
      expect(modusbrainPath('foo', 'bar.json')).toBe(join(tmp, '.modusbrain', 'foo', 'bar.json'));
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('configDir() falls back to ModusBrain homedir when overrides unset', async () => {
    delete process.env.MODUSBRAIN_HOME;
    delete process.env.MODUSBRAIN_HOME;
    try {
      const { configDir } = await import('../src/core/config.ts');
      const { BRAND } = await import('../src/core/branding.ts');
      expect(configDir()).toBe(join(homedir(), BRAND.configDirName));
    } finally {
      if (ORIG_MODUSBRAIN_HOME !== undefined) process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
    }
  });

  test('rejects relative MODUSBRAIN_HOME', async () => {
    process.env.MODUSBRAIN_HOME = 'relative/path';
    try {
      const { configDir } = await import('../src/core/config.ts');
      expect(() => configDir()).toThrow(/absolute path/);
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
    }
  });

  test("rejects MODUSBRAIN_HOME containing '..' segments", async () => {
    process.env.MODUSBRAIN_HOME = '/tmp/foo/../bar';
    try {
      const { configDir } = await import('../src/core/config.ts');
      expect(() => configDir()).toThrow(/'\.\.' segments/);
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
    }
  });

  test('saveConfig/loadConfig honor MODUSBRAIN_HOME', async () => {
    const tmp = fresh();
    process.env.MODUSBRAIN_HOME = tmp;
    try {
      const { saveConfig, loadConfig } = await import('../src/core/config.ts');
      const cfg = { engine: 'pglite' as const, database_path: join(tmp, '.modusbrain', 'brain.pglite') };
      saveConfig(cfg);
      // Config file should exist under the override, NOT under real ~/.modusbrain.
      expect(existsSync(join(tmp, '.modusbrain', 'config.json'))).toBe(true);

      // Round-trip: loadConfig() finds it back via the override.
      const loaded = loadConfig();
      expect(loaded?.engine).toBe('pglite');
      expect(loaded?.database_path).toBe(cfg.database_path);
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('integrity, sync-failures, integrations heartbeat resolve under MODUSBRAIN_HOME', async () => {
    const tmp = fresh();
    process.env.MODUSBRAIN_HOME = tmp;
    try {
      const { modusbrainPath } = await import('../src/core/config.ts');
      // Spot-check a representative set of paths used across the migrated sites.
      const paths = [
        modusbrainPath('integrity-review.md'),                       // src/commands/integrity.ts
        modusbrainPath('sync-failures.jsonl'),                       // src/core/sync.ts
        modusbrainPath('integrations', 'recipe-x'),                  // src/commands/integrations.ts
        modusbrainPath('migrate-manifest.json'),                     // src/commands/migrate-engine.ts
        modusbrainPath('import-checkpoint.json'),                    // src/commands/import.ts
        modusbrainPath('migrations', 'v0_13_1-rollback.jsonl'),      // src/commands/migrations/v0_13_1.ts
        modusbrainPath('migrations', 'pending-host-work.jsonl'),     // src/commands/migrations/v0_14_0.ts
        modusbrainPath('audit'),                                     // shell-audit / backpressure-audit
        modusbrainPath('cycle.lock'),                                // src/core/cycle.ts
        modusbrainPath('fail-improve'),                              // src/core/fail-improve.ts
        modusbrainPath('validator-lint.jsonl'),                      // src/core/output/post-write.ts
        modusbrainPath('brain.pglite'),                              // init pglite default
      ];
      for (const p of paths) {
        expect(p.startsWith(join(tmp, '.modusbrain'))).toBe(true);
      }
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('MODUSBRAIN_AUDIT_DIR override still wins over MODUSBRAIN_HOME', async () => {
    const tmp = fresh();
    const auditTmp = fresh();
    process.env.MODUSBRAIN_HOME = tmp;
    process.env.MODUSBRAIN_AUDIT_DIR = auditTmp;
    try {
      const { resolveAuditDir } = await import('../src/core/minions/handlers/shell-audit.ts');
      // Per the docstring: MODUSBRAIN_AUDIT_DIR is the explicit override and wins.
      expect(resolveAuditDir()).toBe(auditTmp);
    } finally {
      process.env.MODUSBRAIN_HOME = ORIG_MODUSBRAIN_HOME;
      delete process.env.MODUSBRAIN_AUDIT_DIR;
      rmSync(tmp, { recursive: true, force: true });
      rmSync(auditTmp, { recursive: true, force: true });
    }
  });
});
