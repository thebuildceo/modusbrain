/**
 * Closed feedback loop — human corrections write back as evidence
 * and optionally trigger skill re-compilation.
 */
import type { BrainEngine } from '../engine.ts';
import type { RecordCorrectionInput } from './types.ts';
import {
  getSkillBySlug,
  getLatestVersion,
  recordCorrection,
  listCorrections,
} from './store.ts';
import { compileSkill } from './compile.ts';

const DEFAULT_RECOMPILE_THRESHOLD = 2; // corrections count before auto-recompile prompt

export async function recordSkillCorrection(
  engine: BrainEngine,
  input: RecordCorrectionInput,
): Promise<{
  correction_id: number;
  evidence_slug: string;
  recompile_triggered: boolean;
  new_draft_version?: number;
}> {
  const sourceId = input.source_id ?? 'default';
  const skill = await getSkillBySlug(engine, input.skill_slug, sourceId);
  if (!skill) throw new Error(`Skill '${input.skill_slug}' not found`);

  const version = await getLatestVersion(engine, skill.id);
  if (!version) throw new Error(`No version for skill '${input.skill_slug}'`);

  const evidenceSlug = `skills/corrections/${skill.slug}-${Date.now()}`;
  const evidenceContent = `# Correction: ${skill.title}

**Original action:** ${input.original_action}

**Correction:** ${input.correction}

**Corrected by:** ${input.corrected_by ?? 'unknown'}
**Date:** ${new Date().toISOString()}
**Skill version:** v${version.version}
`;

  // Write correction as brain evidence page
  await engine.executeRaw(
    `INSERT INTO pages (source_id, slug, type, page_kind, title, compiled_truth)
     VALUES ($1, $2, 'skill', 'markdown', $3, $4)
     ON CONFLICT (source_id, slug) DO UPDATE
       SET compiled_truth = EXCLUDED.compiled_truth, updated_at = NOW()`,
    [sourceId, evidenceSlug, `Correction: ${skill.title}`, evidenceContent],
  );

  const priorCorrections = await listCorrections(engine, skill.id);
  const threshold = input.recompile_threshold ?? DEFAULT_RECOMPILE_THRESHOLD;
  const shouldRecompile = priorCorrections.length + 1 >= threshold;

  let newDraftVersion: number | undefined;
  if (shouldRecompile) {
    const result = await compileSkill(engine, {
      topic: skill.title,
      risk_tier: version.risk_tier,
      conflict_policy: version.conflict_policy,
      confidence_threshold: version.confidence_threshold,
      owner: skill.owner,
      compiled_by: input.corrected_by,
      source_id: sourceId,
    });
    newDraftVersion = result.version.version;
  }

  const correction = await recordCorrection(engine, {
    skill_id: skill.id,
    skill_version: version.version,
    original_action: input.original_action,
    correction: input.correction,
    evidence_slug: evidenceSlug,
    recompile_triggered: shouldRecompile,
    corrected_by: input.corrected_by,
    source_id: sourceId,
  });

  return {
    correction_id: correction.id,
    evidence_slug: evidenceSlug,
    recompile_triggered: shouldRecompile,
    new_draft_version: newDraftVersion,
  };
}

export async function resolveConflictAndRecompile(
  engine: BrainEngine,
  conflictId: number,
  resolvedBy: string,
  resolutionNote: string,
  sourceId = 'default',
): Promise<{ conflict_resolved: boolean; new_version?: number }> {
  const { resolveConflict, getSkillBySlug: getSkill } = await import('./store.ts');
  const conflict = await resolveConflict(engine, conflictId, resolvedBy, resolutionNote);

  const skillRows = await engine.executeRaw<{ slug: string; title: string; owner: string | null }>(
    `SELECT slug, title, owner FROM operational_skills WHERE id = $1`,
    [conflict.skill_id],
  );
  const skillMeta = skillRows[0];
  if (!skillMeta) return { conflict_resolved: true };

  const result = await compileSkill(engine, {
    topic: skillMeta.title,
    owner: skillMeta.owner ?? undefined,
    compiled_by: resolvedBy,
    source_id: sourceId,
  });

  return { conflict_resolved: true, new_version: result.version.version };
}
