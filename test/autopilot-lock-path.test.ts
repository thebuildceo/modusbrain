/**
 * v0.37.7.0 #1226 regression test.
 *
 * The autopilot lockfile was hardcoded at `~/.modusbrain/autopilot.lock`
 * (via `process.env.HOME`), bypassing MODUSBRAIN_HOME. Two brains pointed
 * at different MODUSBRAIN_HOME directories would still write to the same
 * global lockfile; one would silently take over the other on each
 * restart.
 *
 * Fix: route through `modusbrainPath('autopilot.lock')` which honors
 * MODUSBRAIN_HOME. This file pins the contract via the canonical helper
 * directly, since the autopilot daemon's lifecycle is heavy to drive
 * in a unit test.
 */

import { describe, test, expect } from 'bun:test';
import { withEnv } from './helpers/with-env.ts';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { modusbrainPath } from '../src/core/config.ts';

describe('autopilot lock path scoped to MODUSBRAIN_HOME (#1226)', () => {
  test('one MODUSBRAIN_HOME produces one canonical lock path', async () => {
    const home = mkdtempSync(join(tmpdir(), 'modusbrain-autopilot-lock-'));
    await withEnv({ MODUSBRAIN_HOME: home }, async () => {
      const lockPath = modusbrainPath('autopilot.lock');
      // Lockfile MUST live inside the per-brain MODUSBRAIN_HOME, not under
      // process.env.HOME — that was the pre-fix bug.
      expect(lockPath.startsWith(home)).toBe(true);
      expect(lockPath.endsWith('autopilot.lock')).toBe(true);
    });
  });

  test('two MODUSBRAIN_HOME values produce two distinct lockfiles', async () => {
    const homeA = mkdtempSync(join(tmpdir(), 'modusbrain-autopilot-A-'));
    const homeB = mkdtempSync(join(tmpdir(), 'modusbrain-autopilot-B-'));

    let lockA = '';
    let lockB = '';
    await withEnv({ MODUSBRAIN_HOME: homeA }, async () => {
      lockA = modusbrainPath('autopilot.lock');
    });
    await withEnv({ MODUSBRAIN_HOME: homeB }, async () => {
      lockB = modusbrainPath('autopilot.lock');
    });

    // The contract that prevents two brains from silently colliding:
    // distinct MODUSBRAIN_HOME values MUST produce distinct lockfile paths.
    expect(lockA).not.toBe(lockB);
    expect(lockA.startsWith(homeA)).toBe(true);
    expect(lockB.startsWith(homeB)).toBe(true);
  });

  test('default (no MODUSBRAIN_HOME override) still produces a valid path', async () => {
    // When MODUSBRAIN_HOME is unset, modusbrainPath falls through to its
    // default (`~/.modusbrain`). The path must still exist as a string
    // and end with the expected filename — we don't assert the exact
    // home dir since that varies by environment.
    await withEnv({ MODUSBRAIN_HOME: undefined }, async () => {
      const lockPath = modusbrainPath('autopilot.lock');
      expect(typeof lockPath).toBe('string');
      expect(lockPath.endsWith('autopilot.lock')).toBe(true);
      expect(lockPath.length).toBeGreaterThan('autopilot.lock'.length);
    });
  });
});
