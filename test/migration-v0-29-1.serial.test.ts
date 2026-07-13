import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createEngine } from '../src/core/engine-factory.ts';
import { __testing } from '../src/commands/migrations/v0_29_1.ts';

const opts = {
  yes: true,
  dryRun: false,
  noAutopilotInstall: true,
};

describe('v0.29.1 migration', () => {
  let tmp: string;
  let oldModusbrainHome: string | undefined;

  beforeEach(async () => {
    oldModusbrainHome = process.env.MODUSBRAIN_HOME;
    tmp = mkdtempSync(join(tmpdir(), 'modusbrain-v0291-'));
    process.env.MODUSBRAIN_HOME = tmp;

    const modusbrainHome = join(tmp, '.modusbrain');
    const dbPath = join(tmp, 'brain-db');
    mkdirSync(modusbrainHome, { recursive: true });
    writeFileSync(
      join(modusbrainHome, 'config.json'),
      JSON.stringify({ engine: 'pglite', database_path: dbPath }, null, 2) + '\n',
    );

    const engine = await createEngine({ engine: 'pglite', database_path: dbPath });
    await engine.connect({ engine: 'pglite', database_path: dbPath });
    try {
      await engine.initSchema();
    } finally {
      await engine.disconnect();
    }
  });

  afterEach(() => {
    if (oldModusbrainHome === undefined) delete process.env.MODUSBRAIN_HOME;
    else process.env.MODUSBRAIN_HOME = oldModusbrainHome;
    rmSync(tmp, { recursive: true, force: true });
  });

  test('connects the PGLite engine before backfill and verify phases', async () => {
    const backfill = await __testing.phaseBBackfill(opts);
    expect(backfill.status).toBe('complete');
    expect(backfill.detail).toContain('examined=0');

    const verify = await __testing.phaseCVerify(opts);
    expect(verify).toEqual({
      name: 'verify',
      status: 'complete',
      detail: '0 pages with NULL effective_date',
    });
  });
});
