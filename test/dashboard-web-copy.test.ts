/**
 * Test for Tier 3 browser-based Web UI Dashboard write safety.
 * Verifies reads and writes (approve / reject) against an isolated copy
 * of the brain database before pointing at live data.
 */

import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { createEngine } from '../src/core/engine-factory.ts';
import type { BrainEngine } from '../src/core/engine.ts';
import {
  createSkillDraft,
  approveVersion,
  rejectVersion,
  listSkills,
  listVersions,
  getVersion,
  getSkillBySlug,
} from '../src/core/operational-skills/store.ts';

describe('Tier 3 — Web Dashboard DB Read/Write Safety on Copy', () => {
  const liveDbPath = join(homedir(), '.modusbrain', 'brain.pglite');
  // Store the copy OUTSIDE ~/.modusbrain/ so it's isolated from the real brain
  // directory. Using <project-root>/test/tmp/ keeps it next to the test file
  // and makes it easy to gitignore and inspect after a failure.
  const copyDbPath = join(import.meta.dir, 'tmp', 'test_copy_brain.pglite');
  let engine: BrainEngine;

  // 30 s: cpSync of the real brain + PGLite open takes longer than the
  // default 5 s beforeAll timeout.
  beforeAll(async () => {
    // 1. Always start from scratch — remove any leftover copy from a prior run
    //    so the test never operates on stale data.
    console.log(`[TEST COPY] Copying brain DB for isolated read/write testing: ${copyDbPath}`);
    if (existsSync(copyDbPath)) {
      rmSync(copyDbPath, { recursive: true, force: true });
    }
    // Ensure the parent tmp/ directory exists
    mkdirSync(join(import.meta.dir, 'tmp'), { recursive: true });
    if (existsSync(liveDbPath)) {
      cpSync(liveDbPath, copyDbPath, { recursive: true });
    }

    // 2. Open engine on the copy DB. The copy already has all migrations
    //    applied (schema v123) so we do NOT call initSchema() — that would
    //    redundantly re-check all 118 migrations and hit the timeout.
    const { toEngineConfig } = await import('../src/core/config.ts');
    const engineCfg = toEngineConfig({
      engine: 'pglite',
      database_path: copyDbPath,
    });
    engine = await createEngine(engineCfg);
    await engine.connect(engineCfg);
  }, 30_000);

  afterAll(async () => {
    if (engine) await engine.disconnect();
    if (existsSync(copyDbPath)) {
      try { rmSync(copyDbPath, { recursive: true, force: true }); } catch { /* best-effort cleanup */ }
    }
  });

  test('Read skills & draft versions from copy DB', async () => {
    const skills = await listSkills(engine, 'default');
    console.log(`[TEST COPY] Read ${skills.length} skills from copy DB.`);
    expect(Array.isArray(skills)).toBe(true);
  });

  test('Create draft skill and approve version on copy DB (write verification)', async () => {
    // Seed a test draft skill in the copy DB
    const draft = await createSkillDraft(engine, {
      slug: 'test-policy-approval-copy',
      title: 'Test Policy Approval (Copy)',
      prose_judgment: 'Test policy judgment block for approve write test',
      risk_tier: 'low_stakes',
      confidence_threshold: 0.85,
      conflict_policy: 'block',
      source_id: 'default',
      structured_policy: { rules: [{ condition: 'amount < 100', action: 'approve' }], default_action: 'escalate' },
      provenance: { source_slugs: [], compiled_at: new Date().toISOString() },
    });

    expect(draft.version.status).toBe('draft');
    console.log(`[TEST COPY BEFORE APPROVE] Skill ID ${draft.skill.id} version 1 status: ${draft.version.status}`);

    // Approve the version on the copy DB
    const approved = await approveVersion(engine, draft.skill.id, draft.version.version, 'test-operator@company.com');
    expect(approved.status).toBe('approved');

    // Verify active_version_id was updated on the skill row
    const skillRow = await getSkillBySlug(engine, 'test-policy-approval-copy', 'default');
    expect(skillRow?.active_version_id).toBe(approved.id);
    console.log(`[TEST COPY AFTER APPROVE] Skill ID ${draft.skill.id} active_version_id: ${skillRow?.active_version_id}, status: ${approved.status}`);
  });

  test('Create draft skill and reject version on copy DB (write verification)', async () => {
    // Seed another test draft skill in the copy DB
    const draft = await createSkillDraft(engine, {
      slug: 'test-policy-rejection-copy',
      title: 'Test Policy Rejection (Copy)',
      prose_judgment: 'Test policy judgment block for reject write test',
      risk_tier: 'high_stakes',
      confidence_threshold: 0.90,
      conflict_policy: 'block',
      source_id: 'default',
      structured_policy: { rules: [{ condition: 'amount > 1000', action: 'deny' }], default_action: 'escalate' },
      provenance: { source_slugs: [], compiled_at: new Date().toISOString() },
    });

    expect(draft.version.status).toBe('draft');
    console.log(`[TEST COPY BEFORE REJECT] Skill ID ${draft.skill.id} version 1 status: ${draft.version.status}`);

    // Reject the version on the copy DB
    const rejected = await rejectVersion(engine, draft.skill.id, draft.version.version, 'test-operator@company.com');
    expect(rejected.status).toBe('blocked');
    console.log(`[TEST COPY AFTER REJECT] Skill ID ${draft.skill.id} version 1 status: ${rejected.status}`);

    // Verify active_version_id is NOT set
    const skillRow = await getSkillBySlug(engine, 'test-policy-rejection-copy', 'default');
    expect(skillRow?.active_version_id).toBeNull();
  });
});
