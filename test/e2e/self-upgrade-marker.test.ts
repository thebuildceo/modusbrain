/**
 * E2E: the self-upgrade marker actually fires on a real `modusbrain` invocation.
 *
 * This is the load-bearing proof of the "rides invocation frequency" mechanism:
 * spawn a real `bun src/cli.ts <cmd>` with a warm "upgrade available" cache and
 * assert the startup hook prints `UPGRADE_AVAILABLE` on stderr — which is what an
 * agent (Claude Code / Codex / OpenClaw) keys off to run the modusbrain-upgrade skill.
 *
 * Carrier command: `config get self_upgrade.mode` — runs the startup hook, needs
 * no DB and no network, exits fast. The cache is pre-written fresh so the hook
 * emits from cache and never spawns the detached network refresh (hermetic).
 *
 * The child is spawned with NODE_ENV unset (the production code gates the hook
 * off under NODE_ENV=test to keep the unit suite from spawning refreshers).
 */
import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { VERSION } from '../../src/version.ts';

let home: string;
let modusbrainDir: string;
const repoRoot = process.cwd();

beforeEach(() => {
  home = mkdtempSync(join(tmpdir(), 'modusbrain-marker-'));
  modusbrainDir = join(home, '.modusbrain');
  mkdirSync(modusbrainDir, { recursive: true });
});

afterEach(() => {
  rmSync(home, { recursive: true, force: true });
});

function writeCache(line: string): void {
  writeFileSync(join(modusbrainDir, 'last-update-check'), line + '\n'); // mtime = now → fresh
}

function runModusbrain(mode: string | undefined): { stdout: string; stderr: string; code: number } {
  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  delete env.NODE_ENV; // un-gate the startup hook (production code skips it under test)
  delete env.MODUSBRAIN_SKIP_STARTUP_HOOKS;
  env.MODUSBRAIN_HOME = home;
  if (mode === undefined) delete env.MODUSBRAIN_SELF_UPGRADE_MODE;
  else env.MODUSBRAIN_SELF_UPGRADE_MODE = mode;
  const r = Bun.spawnSync([process.execPath, 'src/cli.ts', 'config', 'get', 'self_upgrade.mode'], {
    cwd: repoRoot,
    env,
    stdout: 'pipe',
    stderr: 'pipe',
  });
  return {
    stdout: r.stdout.toString(),
    stderr: r.stderr.toString(),
    code: r.exitCode ?? -1,
  };
}

describe('self-upgrade marker on a real invocation', () => {
  test('notify mode + fresh upgrade_available cache → emits UPGRADE_AVAILABLE on stderr', () => {
    writeCache(`UPGRADE_AVAILABLE ${VERSION} 0.99.0`);
    const { stderr } = runModusbrain('notify');
    expect(stderr).toContain(`UPGRADE_AVAILABLE ${VERSION} 0.99.0`);
    expect(stderr).toContain('Run: modusbrain self-upgrade');
  });

  test('off mode → no marker (update checks disabled)', () => {
    writeCache(`UPGRADE_AVAILABLE ${VERSION} 0.99.0`);
    const { stderr } = runModusbrain('off');
    expect(stderr).not.toContain('UPGRADE_AVAILABLE');
  });

  test('up_to_date cache → no marker', () => {
    writeCache(`UP_TO_DATE ${VERSION}`);
    const { stderr } = runModusbrain('notify');
    expect(stderr).not.toContain('UPGRADE_AVAILABLE');
  });

  test('active snooze for the version → no marker (notify mode honors snooze)', () => {
    writeCache(`UPGRADE_AVAILABLE ${VERSION} 0.99.0`);
    // snooze record: "<version> <level> <epoch-ms>" — fresh ts so it's active.
    writeFileSync(join(modusbrainDir, 'update-snoozed'), `0.99.0 1 ${Date.now()}\n`);
    const { stderr } = runModusbrain('notify');
    expect(stderr).not.toContain('UPGRADE_AVAILABLE');
  });

  test('JUST_UPGRADED breadcrumb → one-time confirmation on stderr, then cleared', () => {
    const breadcrumb = join(modusbrainDir, 'just-upgraded-from');
    writeFileSync(breadcrumb, '0.42.0\n');
    const { stderr } = runModusbrain('notify');
    expect(stderr).toContain(`JUST_UPGRADED 0.42.0 ${VERSION}`);
    expect(existsSync(breadcrumb)).toBe(false); // consumed
  });

  test('--quiet suppresses the marker', () => {
    writeCache(`UPGRADE_AVAILABLE ${VERSION} 0.99.0`);
    const env: Record<string, string> = { ...process.env } as Record<string, string>;
    delete env.NODE_ENV;
    env.MODUSBRAIN_HOME = home;
    env.MODUSBRAIN_SELF_UPGRADE_MODE = 'notify';
    const r = Bun.spawnSync([process.execPath, 'src/cli.ts', '--quiet', 'config', 'get', 'self_upgrade.mode'], {
      cwd: repoRoot,
      env,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    expect(r.stderr.toString()).not.toContain('UPGRADE_AVAILABLE');
  });
});
