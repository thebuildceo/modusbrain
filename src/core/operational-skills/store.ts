/**
 * Database persistence for operational skills.
 */
import type { BrainEngine } from '../engine.ts';
import type {
  OperationalSkill,
  OperationalSkillVersion,
  SkillConflict,
  SkillActionAuditEntry,
  SkillCorrection,
  RiskTier,
  SkillStatus,
  ConflictPolicy,
  StructuredPolicyBlock,
  SkillProvenance,
} from './types.ts';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'skill';
}

export { slugify };

interface SkillRow {
  id: number;
  slug: string;
  title: string;
  owner: string | null;
  source_id: string;
  active_version_id: number | null;
  created_at: string;
  updated_at: string;
}

interface VersionRow {
  id: number;
  skill_id: number;
  version: number;
  slug: string;
  title: string;
  status: SkillStatus;
  risk_tier: RiskTier;
  conflict_policy: ConflictPolicy;
  prose_judgment: string;
  structured_policy: StructuredPolicyBlock;
  provenance: SkillProvenance;
  confidence_threshold: number;
  source_id: string;
  created_at: string;
}

function mapSkill(row: SkillRow): OperationalSkill {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    owner: row.owner ?? undefined,
    source_id: row.source_id,
    active_version_id: row.active_version_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapVersion(row: VersionRow): OperationalSkillVersion {
  return {
    id: row.id,
    skill_id: row.skill_id,
    version: row.version,
    slug: row.slug,
    title: row.title,
    status: row.status,
    risk_tier: row.risk_tier,
    conflict_policy: row.conflict_policy,
    prose_judgment: row.prose_judgment,
    structured_policy: row.structured_policy,
    provenance: row.provenance,
    confidence_threshold: row.confidence_threshold,
    source_id: row.source_id,
    created_at: row.created_at,
  };
}

export async function getSkillBySlug(
  engine: BrainEngine,
  slug: string,
  sourceId: string,
): Promise<OperationalSkill | null> {
  const rows = await engine.executeRaw<SkillRow>(
    `SELECT id, slug, title, owner, source_id, active_version_id,
            created_at::text, updated_at::text
     FROM operational_skills
     WHERE slug = $1 AND source_id = $2`,
    [slug, sourceId],
  );
  return rows[0] ? mapSkill(rows[0]) : null;
}

export async function listSkills(
  engine: BrainEngine,
  sourceId: string,
): Promise<OperationalSkill[]> {
  const rows = await engine.executeRaw<SkillRow>(
    `SELECT id, slug, title, owner, source_id, active_version_id,
            created_at::text, updated_at::text
     FROM operational_skills
     WHERE source_id = $1
     ORDER BY updated_at DESC`,
    [sourceId],
  );
  return rows.map(mapSkill);
}

export async function getVersion(
  engine: BrainEngine,
  skillId: number,
  version: number,
): Promise<OperationalSkillVersion | null> {
  const rows = await engine.executeRaw<VersionRow>(
    `SELECT id, skill_id, version, slug, title, status, risk_tier,
            conflict_policy, prose_judgment, structured_policy, provenance,
            confidence_threshold, source_id, created_at::text
     FROM operational_skill_versions
     WHERE skill_id = $1 AND version = $2`,
    [skillId, version],
  );
  return rows[0] ? mapVersion(rows[0]) : null;
}

export async function getActiveVersion(
  engine: BrainEngine,
  skill: OperationalSkill,
): Promise<OperationalSkillVersion | null> {
  if (!skill.active_version_id) return null;
  const rows = await engine.executeRaw<VersionRow>(
    `SELECT id, skill_id, version, slug, title, status, risk_tier,
            conflict_policy, prose_judgment, structured_policy, provenance,
            confidence_threshold, source_id, created_at::text
     FROM operational_skill_versions
     WHERE id = $1`,
    [skill.active_version_id],
  );
  return rows[0] ? mapVersion(rows[0]) : null;
}

export async function getLatestVersion(
  engine: BrainEngine,
  skillId: number,
): Promise<OperationalSkillVersion | null> {
  const rows = await engine.executeRaw<VersionRow>(
    `SELECT id, skill_id, version, slug, title, status, risk_tier,
            conflict_policy, prose_judgment, structured_policy, provenance,
            confidence_threshold, source_id, created_at::text
     FROM operational_skill_versions
     WHERE skill_id = $1
     ORDER BY version DESC
     LIMIT 1`,
    [skillId],
  );
  return rows[0] ? mapVersion(rows[0]) : null;
}

export async function listVersions(
  engine: BrainEngine,
  skillId: number,
): Promise<OperationalSkillVersion[]> {
  const rows = await engine.executeRaw<VersionRow>(
    `SELECT id, skill_id, version, slug, title, status, risk_tier,
            conflict_policy, prose_judgment, structured_policy, provenance,
            confidence_threshold, source_id, created_at::text
     FROM operational_skill_versions
     WHERE skill_id = $1
     ORDER BY version ASC`,
    [skillId],
  );
  return rows.map(mapVersion);
}

export interface CreateSkillDraftInput {
  title: string;
  slug?: string;
  owner?: string;
  prose_judgment: string;
  structured_policy: StructuredPolicyBlock;
  provenance: SkillProvenance;
  risk_tier: RiskTier;
  conflict_policy: ConflictPolicy;
  confidence_threshold: number;
  source_id: string;
}

export async function createSkillDraft(
  engine: BrainEngine,
  input: CreateSkillDraftInput,
): Promise<{ skill: OperationalSkill; version: OperationalSkillVersion }> {
  const slug = input.slug ?? slugify(input.title);

  const existing = await getSkillBySlug(engine, slug, input.source_id);
  let skillId: number;
  let nextVersion: number;

  if (existing) {
    skillId = existing.id;
    const latest = await getLatestVersion(engine, skillId);
    nextVersion = (latest?.version ?? 0) + 1;
    await engine.executeRaw(
      `UPDATE operational_skills SET title = $1, owner = COALESCE($2, owner),
              updated_at = NOW()
       WHERE id = $3`,
      [input.title, input.owner ?? null, skillId],
    );
  } else {
    const inserted = await engine.executeRaw<{ id: number }>(
      `INSERT INTO operational_skills (slug, title, owner, source_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [slug, input.title, input.owner ?? null, input.source_id],
    );
    skillId = inserted[0]!.id;
    nextVersion = 1;
  }

  const versionRows = await engine.executeRaw<{ id: number; created_at: string }>(
    `INSERT INTO operational_skill_versions
       (skill_id, version, slug, title, status, risk_tier, conflict_policy,
        prose_judgment, structured_policy, provenance, confidence_threshold, source_id)
     VALUES ($1, $2, $3, $4, 'draft', $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11)
     RETURNING id, created_at::text`,
    [
      skillId,
      nextVersion,
      slug,
      input.title,
      input.risk_tier,
      input.conflict_policy,
      input.prose_judgment,
      input.structured_policy,
      input.provenance,
      input.confidence_threshold,
      input.source_id,
    ],
  );

  const skill = (await engine.executeRaw<SkillRow>(
    `SELECT id, slug, title, owner, source_id, active_version_id,
            created_at::text, updated_at::text
     FROM operational_skills WHERE id = $1`,
    [skillId],
  ))[0]!;

  const version = (await getVersion(engine, skillId, nextVersion))!;

  return { skill: mapSkill(skill), version };
}

export async function approveVersion(
  engine: BrainEngine,
  skillId: number,
  version: number,
  approvedBy: string,
): Promise<OperationalSkillVersion> {
  const now = new Date().toISOString();

  // Supersede prior approved versions
  await engine.executeRaw(
    `UPDATE operational_skill_versions
     SET status = 'superseded'
     WHERE skill_id = $1 AND status = 'approved' AND version != $2`,
    [skillId, version],
  );

  const current = await getVersion(engine, skillId, version);
  if (!current) throw new Error(`Version ${version} not found for skill ${skillId}`);

  const updatedProvenance = {
    ...current.provenance,
    approved_by: approvedBy,
    approved_at: now,
  };

  await engine.executeRaw(
    `UPDATE operational_skill_versions
     SET status = 'approved', provenance = $3::jsonb
     WHERE skill_id = $1 AND version = $2`,
    [skillId, version, updatedProvenance],
  );

  const versionRow = await getVersion(engine, skillId, version);
  if (!versionRow) throw new Error(`Version ${version} not found after approve`);

  await engine.executeRaw(
    `UPDATE operational_skills
     SET active_version_id = $1, updated_at = NOW()
     WHERE id = $2`,
    [versionRow.id, skillId],
  );

  return versionRow;
}

export async function hasOpenConflict(
  engine: BrainEngine,
  skillId: number,
): Promise<boolean> {
  const rows = await engine.executeRaw<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM operational_skill_conflicts
     WHERE skill_id = $1 AND status = 'open'`,
    [skillId],
  );
  return parseInt(rows[0]?.count ?? '0', 10) > 0;
}

export async function createConflict(
  engine: BrainEngine,
  input: {
    skill_id: number;
    skill_version_id?: number;
    conflicting_sources: string[];
    description: string;
    owner?: string;
    source_id: string;
  },
): Promise<SkillConflict> {
  const rows = await engine.executeRaw<{
    id: number;
    skill_id: number;
    skill_version_id: number | null;
    conflicting_sources: string[];
    description: string;
    owner: string | null;
    status: 'open';
    resolution_note: null;
    resolved_by: null;
    resolved_at: null;
    created_at: string;
    source_id: string;
  }>(
    `INSERT INTO operational_skill_conflicts
       (skill_id, skill_version_id, conflicting_sources, description, owner, source_id)
     VALUES ($1, $2, $3::jsonb, $4, $5, $6)
     RETURNING id, skill_id, skill_version_id, conflicting_sources, description,
               owner, status, resolution_note, resolved_by,
               resolved_at::text, created_at::text, source_id`,
    [
      input.skill_id,
      input.skill_version_id ?? null,
      input.conflicting_sources,
      input.description,
      input.owner ?? null,
      input.source_id,
    ],
  );
  return rows[0] as SkillConflict;
}

export async function listConflicts(
  engine: BrainEngine,
  sourceId: string,
  status?: 'open' | 'resolved' | 'dismissed',
): Promise<SkillConflict[]> {
  const sql = status
    ? `SELECT id, skill_id, skill_version_id, conflicting_sources, description,
              owner, status, resolution_note, resolved_by, resolved_at::text,
              created_at::text, source_id
       FROM operational_skill_conflicts
       WHERE source_id = $1 AND status = $2
       ORDER BY created_at DESC`
    : `SELECT id, skill_id, skill_version_id, conflicting_sources, description,
              owner, status, resolution_note, resolved_by, resolved_at::text,
              created_at::text, source_id
       FROM operational_skill_conflicts
       WHERE source_id = $1
       ORDER BY created_at DESC`;
  const params = status ? [sourceId, status] : [sourceId];
  return engine.executeRaw<SkillConflict>(sql, params);
}

export async function resolveConflict(
  engine: BrainEngine,
  conflictId: number,
  resolvedBy: string,
  resolutionNote: string,
): Promise<SkillConflict> {
  await engine.executeRaw(
    `UPDATE operational_skill_conflicts
     SET status = 'resolved', resolved_by = $2, resolution_note = $3, resolved_at = NOW()
     WHERE id = $1`,
    [conflictId, resolvedBy, resolutionNote],
  );
  const rows = await engine.executeRaw<SkillConflict>(
    `SELECT id, skill_id, skill_version_id, conflicting_sources, description,
            owner, status, resolution_note, resolved_by, resolved_at::text,
            created_at::text, source_id
     FROM operational_skill_conflicts WHERE id = $1`,
    [conflictId],
  );
  return rows[0]!;
}

export async function logAction(
  engine: BrainEngine,
  entry: Omit<SkillActionAuditEntry, 'id' | 'created_at'>,
): Promise<number> {
  const rows = await engine.executeRaw<{ id: number }>(
    `INSERT INTO operational_skill_actions
       (skill_id, skill_version, skill_slug, task_description, confidence_score,
        risk_tier, approval_required, approval_obtained, action_taken,
        action_result, agent_id, metadata, source_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13)
     RETURNING id`,
    [
      entry.skill_id,
      entry.skill_version,
      entry.skill_slug,
      entry.task_description,
      entry.confidence_score,
      entry.risk_tier,
      entry.approval_required,
      entry.approval_obtained,
      entry.action_taken,
      entry.action_result,
      entry.agent_id,
      entry.metadata,
      entry.source_id,
    ],
  );
  return rows[0]!.id;
}

export async function listActions(
  engine: BrainEngine,
  sourceId: string,
  opts: { skill_slug?: string; limit?: number } = {},
): Promise<SkillActionAuditEntry[]> {
  const limit = opts.limit ?? 50;
  if (opts.skill_slug) {
    return engine.executeRaw<SkillActionAuditEntry>(
      `SELECT id, skill_id, skill_version, skill_slug, task_description,
              confidence_score, risk_tier, approval_required, approval_obtained,
              action_taken, action_result, agent_id, metadata, created_at::text, source_id
       FROM operational_skill_actions
       WHERE source_id = $1 AND skill_slug = $2
       ORDER BY created_at DESC LIMIT $3`,
      [sourceId, opts.skill_slug, limit],
    );
  }
  return engine.executeRaw<SkillActionAuditEntry>(
    `SELECT id, skill_id, skill_version, skill_slug, task_description,
            confidence_score, risk_tier, approval_required, approval_obtained,
            action_taken, action_result, agent_id, metadata, created_at::text, source_id
     FROM operational_skill_actions
     WHERE source_id = $1
     ORDER BY created_at DESC LIMIT $2`,
    [sourceId, limit],
  );
}

export async function recordCorrection(
  engine: BrainEngine,
  input: {
    skill_id: number;
    skill_version: number;
    original_action: string;
    correction: string;
    evidence_slug?: string;
    recompile_triggered: boolean;
    corrected_by?: string;
    source_id: string;
  },
): Promise<SkillCorrection> {
  const rows = await engine.executeRaw<SkillCorrection>(
    `INSERT INTO operational_skill_corrections
       (skill_id, skill_version, original_action, correction, evidence_slug,
        recompile_triggered, corrected_by, source_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, skill_id, skill_version, original_action, correction,
               evidence_slug, recompile_triggered, corrected_by,
               created_at::text, source_id`,
    [
      input.skill_id,
      input.skill_version,
      input.original_action,
      input.correction,
      input.evidence_slug ?? null,
      input.recompile_triggered,
      input.corrected_by ?? null,
      input.source_id,
    ],
  );
  return rows[0]!;
}

export async function listCorrections(
  engine: BrainEngine,
  skillId: number,
): Promise<SkillCorrection[]> {
  return engine.executeRaw<SkillCorrection>(
    `SELECT id, skill_id, skill_version, original_action, correction,
            evidence_slug, recompile_triggered, corrected_by, created_at::text, source_id
     FROM operational_skill_corrections
     WHERE skill_id = $1
     ORDER BY created_at DESC`,
    [skillId],
  );
}
