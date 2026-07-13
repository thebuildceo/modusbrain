/**
 * Execute operational skills with confidence gating and approval workflow.
 */
import type { BrainEngine } from '../engine.ts';
import type { ExecuteSkillInput, ExecuteSkillResult } from './types.ts';
import {
  getSkillBySlug,
  getActiveVersion,
  getLatestVersion,
  hasOpenConflict,
  logAction,
} from './store.ts';
import { computeConfidenceWithConflictPenalty, evaluatePolicy } from './confidence.ts';

/** In-memory approval tokens (local dev / single-user). Production: use DB or auth service. */
const approvalTokens = new Map<string, { skill_slug: string; version: number; expires: number }>();

export function issueApprovalToken(skillSlug: string, version: number, ttlMs = 3600_000): string {
  const token = `appr_${skillSlug}_v${version}_${Date.now().toString(36)}`;
  approvalTokens.set(token, {
    skill_slug: skillSlug,
    version,
    expires: Date.now() + ttlMs,
  });
  return token;
}

export function validateApprovalToken(
  token: string,
  skillSlug: string,
  version: number,
): boolean {
  const entry = approvalTokens.get(token);
  if (!entry) return false;
  if (entry.expires < Date.now()) {
    approvalTokens.delete(token);
    return false;
  }
  return entry.skill_slug === skillSlug && entry.version === version;
}

export async function executeSkill(
  engine: BrainEngine,
  input: ExecuteSkillInput,
  opts: { trusted?: boolean } = {},
): Promise<ExecuteSkillResult> {
  const sourceId = input.source_id ?? 'default';
  const skill = await getSkillBySlug(engine, input.skill_slug, sourceId);

  if (!skill) {
    const auditId = await logAction(engine, {
      skill_id: 0,
      skill_version: 0,
      skill_slug: input.skill_slug,
      task_description: input.task_description,
      confidence_score: 0,
      risk_tier: 'high_stakes',
      approval_required: false,
      approval_obtained: false,
      action_taken: 'none',
      action_result: 'error',
      agent_id: input.agent_id ?? null,
      metadata: { error: 'skill_not_found' },
      source_id: sourceId,
    });
    return {
      allowed: false,
      action: null,
      confidence_score: 0,
      approval_required: false,
      approval_obtained: false,
      reason: `Skill '${input.skill_slug}' not found`,
      audit_id: auditId,
      skill_version: 0,
    };
  }

  const openConflict = await hasOpenConflict(engine, skill.id);
  let version = await getActiveVersion(engine, skill);

  // Conflict policy handling
  if (openConflict) {
    const latest = await getLatestVersion(engine, skill.id);
    if (latest?.conflict_policy === 'block') {
      const auditId = await logAction(engine, {
        skill_id: skill.id,
        skill_version: latest.version,
        skill_slug: skill.slug,
        task_description: input.task_description,
        confidence_score: 0,
        risk_tier: latest.risk_tier,
        approval_required: false,
        approval_obtained: false,
        action_taken: 'blocked',
        action_result: 'blocked',
        agent_id: input.agent_id ?? null,
        metadata: { reason: 'open_conflict_block_policy' },
        source_id: sourceId,
      });
      return {
        allowed: false,
        action: null,
        confidence_score: 0,
        approval_required: false,
        approval_obtained: false,
        reason: 'Open conflict with block policy — execution refused',
        audit_id: auditId,
        skill_version: latest.version,
      };
    }
    // serve_last_approved: use active approved version even if draft exists
    if (!version || version.status !== 'approved') {
      version = await getActiveVersion(engine, skill);
    }
  }

  if (!version) {
    version = await getLatestVersion(engine, skill.id);
  }

  if (!version) {
    return {
      allowed: false,
      action: null,
      confidence_score: 0,
      approval_required: false,
      approval_obtained: false,
      reason: 'No skill version exists',
      audit_id: 0,
      skill_version: 0,
    };
  }

  // Draft skills cannot be auto-executed by agents (remote/untrusted)
  if (version.status === 'draft' && !opts.trusted) {
    const auditId = await logAction(engine, {
      skill_id: skill.id,
      skill_version: version.version,
      skill_slug: skill.slug,
      task_description: input.task_description,
      confidence_score: 0,
      risk_tier: version.risk_tier,
      approval_required: true,
      approval_obtained: false,
      action_taken: 'refused_draft',
      action_result: 'blocked',
      agent_id: input.agent_id ?? null,
      metadata: { reason: 'draft_skill_refused' },
      source_id: sourceId,
    });
    return {
      allowed: false,
      action: null,
      confidence_score: 0,
      approval_required: true,
      approval_obtained: false,
      reason: 'Draft skills cannot be auto-executed — approve first with `modusbrain skill approve`',
      audit_id: auditId,
      skill_version: version.version,
    };
  }

  const confidence = await computeConfidenceWithConflictPenalty(engine, {
    version,
    task_description: input.task_description,
    context: input.context,
    skill_id: skill.id,
    has_open_conflict: openConflict,
  });

  const threshold = version.confidence_threshold;
  const belowThreshold = confidence.score < threshold;
  const isHighStakes = version.risk_tier === 'high_stakes';
  const approvalRequired = isHighStakes && belowThreshold && !input.force;

  let approvalObtained = false;
  if (approvalRequired) {
    if (input.approval_token) {
      approvalObtained = validateApprovalToken(
        input.approval_token,
        skill.slug,
        version.version,
      );
    }
    if (!approvalObtained && !opts.trusted) {
      const auditId = await logAction(engine, {
        skill_id: skill.id,
        skill_version: version.version,
        skill_slug: skill.slug,
        task_description: input.task_description,
        confidence_score: confidence.score,
        risk_tier: version.risk_tier,
        approval_required: true,
        approval_obtained: false,
        action_taken: 'pending_approval',
        action_result: 'pending_approval',
        agent_id: input.agent_id ?? null,
        metadata: { confidence: confidence.rationale, threshold },
        source_id: sourceId,
      });
      return {
        allowed: false,
        action: null,
        confidence_score: confidence.score,
        approval_required: true,
        approval_obtained: false,
        reason: `Confidence ${confidence.score.toFixed(2)} below threshold ${threshold} — human approval required`,
        audit_id: auditId,
        skill_version: version.version,
      };
    }
  }

  const action = evaluatePolicy(version, input.context ?? {});

  const auditId = await logAction(engine, {
    skill_id: skill.id,
    skill_version: version.version,
    skill_slug: skill.slug,
    task_description: input.task_description,
    confidence_score: confidence.score,
    risk_tier: version.risk_tier,
    approval_required: approvalRequired,
    approval_obtained: approvalObtained || opts.trusted === true,
    action_taken: action,
    action_result: 'success',
    agent_id: input.agent_id ?? null,
    metadata: { confidence: confidence.rationale, context: input.context ?? {} },
    source_id: sourceId,
  });

  return {
    allowed: true,
    action,
    confidence_score: confidence.score,
    approval_required: approvalRequired,
    approval_obtained: approvalObtained || opts.trusted === true,
    reason: confidence.rationale,
    audit_id: auditId,
    skill_version: version.version,
  };
}
