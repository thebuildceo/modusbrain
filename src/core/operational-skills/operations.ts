/**
 * Operational skills MCP operations.
 */
import type { Operation, OperationContext } from '../operations.ts';
import {
  compileSkill,
  executeSkill,
  getSkillBySlug,
  listSkills,
  approveVersion,
  listVersions,
} from './index.ts';

export const compile_operational_skill: Operation = {
  name: 'compile_operational_skill',
  description:
    'Draft a versioned operational skill from existing brain content. Holds as draft until approved.',
  params: {
    topic: { type: 'string', required: true, description: 'Skill topic, e.g. "refund handling"' },
    risk_tier: {
      type: 'string',
      enum: ['informational', 'low_stakes', 'high_stakes'],
      description: 'Risk tier (default low_stakes)',
    },
    owner: { type: 'string', description: 'Named owner for conflict routing' },
    source_id: { type: 'string', description: 'Source scope (default ctx.sourceId)' },
  },
  handler: async (p, ctx) => {
    const result = await compileSkill(ctx.engine, {
      topic: p.topic as string,
      risk_tier: (p.risk_tier as 'informational' | 'low_stakes' | 'high_stakes') ?? 'low_stakes',
      owner: p.owner as string | undefined,
      compiled_by: ctx.auth?.clientId ?? 'mcp',
      source_id: (p.source_id as string) ?? ctx.sourceId ?? 'default',
    });
    return result;
  },
  scope: 'write',
};

export const approve_operational_skill: Operation = {
  name: 'approve_operational_skill',
  description: 'Promote a draft operational skill to approved active status.',
  params: {
    slug: { type: 'string', required: true },
    version: { type: 'number', description: 'Version number (default: latest draft)' },
    approved_by: { type: 'string', required: true },
    source_id: { type: 'string' },
  },
  handler: async (p, ctx) => {
    const sourceId = (p.source_id as string) ?? ctx.sourceId ?? 'default';
    const skill = await getSkillBySlug(ctx.engine, p.slug as string, sourceId);
    if (!skill) throw new Error(`Skill not found: ${p.slug}`);
    const versions = await listVersions(ctx.engine, skill.id);
    const target = p.version
      ? versions.find(v => v.version === (p.version as number))
      : versions.filter(v => v.status === 'draft').pop() ?? versions[versions.length - 1];
    if (!target) throw new Error('No version to approve');
    return approveVersion(ctx.engine, skill.id, target.version, p.approved_by as string);
  },
  scope: 'write',
  localOnly: true,
};

export const execute_operational_skill: Operation = {
  name: 'execute_operational_skill',
  description:
    'Execute an approved operational skill with confidence gating. Draft skills are refused for remote callers.',
  params: {
    slug: { type: 'string', required: true },
    task_description: { type: 'string', required: true },
    context: { type: 'object', description: 'Variables for policy evaluation, e.g. { amount: 300 }' },
    approval_token: { type: 'string', description: 'Human approval token for high-stakes below threshold' },
    agent_id: { type: 'string' },
    source_id: { type: 'string' },
  },
  handler: async (p, ctx: OperationContext) => {
    const trusted = ctx.remote === false;
    return executeSkill(ctx.engine, {
      skill_slug: p.slug as string,
      task_description: p.task_description as string,
      context: (p.context as Record<string, unknown>) ?? {},
      approval_token: p.approval_token as string | undefined,
      agent_id: p.agent_id as string | undefined,
      source_id: (p.source_id as string) ?? ctx.sourceId ?? 'default',
    }, { trusted });
  },
  scope: 'read',
};

export const list_operational_skills: Operation = {
  name: 'list_operational_skills',
  description: 'List operational skills with active version metadata.',
  params: {
    source_id: { type: 'string' },
  },
  handler: async (p, ctx) => {
    const sourceId = (p.source_id as string) ?? ctx.sourceId ?? 'default';
    const skills = await listSkills(ctx.engine, sourceId);
    const { getActiveVersion } = await import('./store.ts');
    return Promise.all(
      skills.map(async s => ({
        ...s,
        active_version: await getActiveVersion(ctx.engine, s),
      })),
    );
  },
  scope: 'read',
};

export const operationalSkillOperations = [
  compile_operational_skill,
  approve_operational_skill,
  execute_operational_skill,
  list_operational_skills,
];
