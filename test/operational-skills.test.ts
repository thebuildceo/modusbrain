/**
 * Operational skills layer tests — Phases 1–5 from company-brain-rfs-analysis.md
 */
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'bun:test';
import { PGLiteEngine } from '../src/core/pglite-engine.ts';
import { resetPgliteState } from './helpers/reset-pglite.ts';
import {
  compileSkill,
  approveVersion,
  executeSkill,
  getSkillBySlug,
  listSkills,
  createConflict,
  hasOpenConflict,
  listActions,
  recordSkillCorrection,
  evaluatePolicy,
  computeConfidence,
  issueApprovalToken,
} from '../src/core/operational-skills/index.ts';

let engine: PGLiteEngine;

beforeAll(async () => {
  engine = new PGLiteEngine();
  await engine.connect({});
  await engine.initSchema();
});

afterAll(async () => {
  await engine.disconnect();
});

beforeEach(async () => {
  await resetPgliteState(engine);
});

async function seedRefundPolicyPage(): Promise<void> {
  await engine.executeRaw(
    `INSERT INTO pages (source_id, slug, type, page_kind, title, compiled_truth)
     VALUES ('default', 'wiki/policies/refund-policy', 'guide', 'markdown',
             'Refund Policy',
             'If amount is under $50, auto approve refunds. If amount is under $500, auto approve with support lead notification. Amounts over $500 require finance approval.')`,
  );
}

describe('operational skills — Phase 1 compile', () => {
  test('compile drafts skill from brain content', async () => {
    await seedRefundPolicyPage();
    const result = await compileSkill(engine, {
      topic: 'refund handling',
      risk_tier: 'low_stakes',
      compiled_by: 'test-user',
    });

    expect(result.skill.slug).toBe('refund-handling');
    expect(result.version.status).toBe('draft');
    expect(result.version.version).toBe(1);
    expect(result.matched_sources).toContain('wiki/policies/refund-policy');
    expect(result.version.structured_policy.rules.length).toBeGreaterThan(0);
    expect(result.version.prose_judgment).toContain('refund handling');
  });

  test('re-compile creates v2 on same skill', async () => {
    await seedRefundPolicyPage();
    await compileSkill(engine, { topic: 'refund handling' });
    const second = await compileSkill(engine, { topic: 'refund handling' });
    expect(second.version.version).toBe(2);
    expect(second.skill.slug).toBe('refund-handling');
  });
});

describe('operational skills — Phase 2 confidence gating', () => {
  test('draft skill blocked for untrusted execution', async () => {
    await seedRefundPolicyPage();
    const { skill, version } = await compileSkill(engine, {
      topic: 'refund handling',
      risk_tier: 'high_stakes',
    });

    const result = await executeSkill(engine, {
      skill_slug: skill.slug,
      task_description: 'Process refund for order #123',
      context: { amount: 300 },
    }, { trusted: false });

    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Draft');
  });

  test('approved skill executes with policy evaluation', async () => {
    await seedRefundPolicyPage();
    const { skill } = await compileSkill(engine, {
      topic: 'refund handling',
      risk_tier: 'informational',
      confidence_threshold: 0.3,
    });
    await approveVersion(engine, skill.id, 1, 'alice@company.com');

    const result = await executeSkill(engine, {
      skill_slug: skill.slug,
      task_description: 'refund handling for $300 order',
      context: { amount: 300 },
    }, { trusted: true });

    expect(result.allowed).toBe(true);
    expect(result.action).toBeTruthy();
    expect(result.audit_id).toBeGreaterThan(0);
  });

  test('evaluatePolicy matches amount rules', async () => {
    await seedRefundPolicyPage();
    const { version } = await compileSkill(engine, { topic: 'refund handling' });

    const action = evaluatePolicy(version, { amount: 30 });
    expect(action).toBe('auto_approve');
  });

  test('computeConfidence penalizes drafts vs approved', () => {
    const baseVersion = {
      id: 1,
      skill_id: 1,
      version: 1,
      slug: 'test',
      title: 'refund handling',
      risk_tier: 'low_stakes' as const,
      conflict_policy: 'serve_last_approved' as const,
      prose_judgment: 'refund policy guidance',
      structured_policy: { rules: [] },
      provenance: { source_slugs: ['a', 'b'], compiled_at: new Date().toISOString() },
      confidence_threshold: 0.7,
      source_id: 'default',
      created_at: new Date().toISOString(),
    };

    const draftConf = computeConfidence({
      version: { ...baseVersion, status: 'draft' },
      task_description: 'refund handling request',
    });
    const approvedConf = computeConfidence({
      version: { ...baseVersion, status: 'approved' },
      task_description: 'refund handling request',
    });
    expect(approvedConf.score).toBeGreaterThan(draftConf.score);
  });
});

describe('operational skills — Phase 3 conflict resolution', () => {
  test('open conflict with block policy refuses execution', async () => {
    await seedRefundPolicyPage();
    const { skill } = await compileSkill(engine, {
      topic: 'refund handling',
      conflict_policy: 'block',
    });
    await approveVersion(engine, skill.id, 1, 'alice@company.com');

    await createConflict(engine, {
      skill_id: skill.id,
      conflicting_sources: ['wiki/policies/refund-policy', 'wiki/policies/old-refund'],
      description: 'Conflicting refund thresholds',
      owner: 'support-lead',
      source_id: 'default',
    });

    expect(await hasOpenConflict(engine, skill.id)).toBe(true);

    const result = await executeSkill(engine, {
      skill_slug: skill.slug,
      task_description: 'refund',
      context: { amount: 100 },
    }, { trusted: true });

    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('conflict');
  });
});

describe('operational skills — Phase 4 audit trail', () => {
  test('execution writes audit entry', async () => {
    await seedRefundPolicyPage();
    const { skill } = await compileSkill(engine, { topic: 'refund handling', confidence_threshold: 0.3 });
    await approveVersion(engine, skill.id, 1, 'alice@company.com');

    await executeSkill(engine, {
      skill_slug: skill.slug,
      task_description: 'audit test refund',
      context: { amount: 200 },
      agent_id: 'agent-test-1',
    }, { trusted: true });

    const actions = await listActions(engine, 'default', { skill_slug: skill.slug });
    expect(actions.length).toBe(1);
    expect(actions[0]!.agent_id).toBe('agent-test-1');
    expect(actions[0]!.action_result).toBe('success');
  });
});

describe('operational skills — Phase 5 feedback loop', () => {
  test('correction writes evidence page', async () => {
    await seedRefundPolicyPage();
    const { skill } = await compileSkill(engine, { topic: 'refund handling' });
    await approveVersion(engine, skill.id, 1, 'alice@company.com');

    const result = await recordSkillCorrection(engine, {
      skill_slug: skill.slug,
      original_action: 'auto_approve',
      correction: 'Amounts over $400 need manager approval, not $500',
      corrected_by: 'bob@company.com',
      recompile_threshold: 99, // don't auto-recompile in this test
    });

    expect(result.evidence_slug).toContain('skills/corrections/');
    expect(result.recompile_triggered).toBe(false);

    const pages = await engine.executeRaw<{ slug: string }>(
      `SELECT slug FROM pages WHERE slug = $1`,
      [result.evidence_slug],
    );
    expect(pages.length).toBe(1);
  });
});

describe('operational skills — list and approve', () => {
  test('listSkills returns compiled skills', async () => {
    await compileSkill(engine, { topic: 'onboarding checklist' });
    const skills = await listSkills(engine, 'default');
    expect(skills.length).toBe(1);
    expect(skills[0]!.slug).toBe('onboarding-checklist');
  });

  test('approval token validates', async () => {
    const token = issueApprovalToken('refund-handling', 1);
    expect(token).toContain('appr_');
  });
});
