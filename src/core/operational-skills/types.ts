/**
 * Operational skills — versioned, confidence-gated procedures for agent execution.
 * Extends GBrain's knowledge layer with the "Company Brain" compile → approve → execute loop.
 */

/** Risk tier determines approval and conflict-handling behavior. */
export type RiskTier = 'informational' | 'low_stakes' | 'high_stakes';

/** Lifecycle status of a skill version. */
export type SkillStatus = 'draft' | 'approved' | 'superseded' | 'blocked';

/** How to behave when an open conflict exists for this skill. */
export type ConflictPolicy = 'serve_last_approved' | 'block';

export interface StructuredPolicyRule {
  /** Human-readable condition, e.g. "amount < 500" */
  condition: string;
  /** Action when condition matches, e.g. "auto_approve" */
  action: string;
  /** Optional metadata for agent evaluators */
  metadata?: Record<string, unknown>;
}

export interface StructuredPolicyBlock {
  rules: StructuredPolicyRule[];
  /** Default action when no rule matches */
  default_action?: string;
}

export interface SkillProvenance {
  /** Source page slugs compiled from */
  source_slugs: string[];
  /** Timeline entry IDs if any */
  timeline_entry_ids?: number[];
  /** Who compiled (user id or email) */
  compiled_by?: string;
  /** Who approved (user id or email) */
  approved_by?: string;
  /** ISO timestamp of compilation */
  compiled_at: string;
  /** ISO timestamp of approval (if approved) */
  approved_at?: string;
}

export interface OperationalSkillVersion {
  id: number;
  skill_id: number;
  version: number;
  slug: string;
  title: string;
  status: SkillStatus;
  risk_tier: RiskTier;
  conflict_policy: ConflictPolicy;
  /** Natural-language guidance for edge cases */
  prose_judgment: string;
  /** Deterministic rules agents can evaluate */
  structured_policy: StructuredPolicyBlock;
  provenance: SkillProvenance;
  /** Minimum confidence (0–1) required for auto-execution */
  confidence_threshold: number;
  source_id: string;
  created_at: string;
}

export interface OperationalSkill {
  id: number;
  slug: string;
  title: string;
  /** Named owner for conflict resolution queue routing */
  owner?: string;
  source_id: string;
  active_version_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface SkillConflict {
  id: number;
  skill_id: number;
  skill_version_id: number | null;
  /** Contradicting source slugs or fact refs */
  conflicting_sources: string[];
  description: string;
  /** Named owner / queue assignee */
  owner: string | null;
  status: 'open' | 'resolved' | 'dismissed';
  resolution_note: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
  source_id: string;
}

export interface SkillActionAuditEntry {
  id: number;
  skill_id: number;
  skill_version: number;
  skill_slug: string;
  task_description: string;
  confidence_score: number;
  risk_tier: RiskTier;
  /** Whether human approval was required and obtained */
  approval_required: boolean;
  approval_obtained: boolean;
  /** Action the agent took or attempted */
  action_taken: string;
  action_result: 'success' | 'blocked' | 'pending_approval' | 'error';
  agent_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  source_id: string;
}

export interface SkillCorrection {
  id: number;
  skill_id: number;
  skill_version: number;
  /** What the agent did wrong */
  original_action: string;
  /** Human-provided correction */
  correction: string;
  /** Written back as evidence page slug */
  evidence_slug: string | null;
  /** Whether re-compilation was triggered */
  recompile_triggered: boolean;
  corrected_by: string | null;
  created_at: string;
  source_id: string;
}

export interface CompileSkillInput {
  topic: string;
  risk_tier?: RiskTier;
  conflict_policy?: ConflictPolicy;
  confidence_threshold?: number;
  owner?: string;
  compiled_by?: string;
  source_id?: string;
}

export interface CompileSkillResult {
  skill: OperationalSkill;
  version: OperationalSkillVersion;
  matched_sources: string[];
}

export interface ExecuteSkillInput {
  skill_slug: string;
  task_description: string;
  /** Context variables for policy evaluation, e.g. { amount: 300 } */
  context?: Record<string, unknown>;
  agent_id?: string;
  /** Force execution even below threshold (local trusted only) */
  force?: boolean;
  /** Human approval token when required */
  approval_token?: string;
  source_id?: string;
}

export interface ExecuteSkillResult {
  allowed: boolean;
  action: string | null;
  confidence_score: number;
  approval_required: boolean;
  approval_obtained: boolean;
  reason: string;
  audit_id: number;
  skill_version: number;
}

export interface ApproveSkillInput {
  skill_slug: string;
  version?: number;
  approved_by: string;
  source_id?: string;
}

export interface RecordCorrectionInput {
  skill_slug: string;
  original_action: string;
  correction: string;
  corrected_by?: string;
  /** Confidence threshold above which recompile is auto-triggered */
  recompile_threshold?: number;
  source_id?: string;
}

/** Default confidence thresholds per risk tier */
export const DEFAULT_CONFIDENCE_THRESHOLDS: Record<RiskTier, number> = {
  informational: 0.5,
  low_stakes: 0.7,
  high_stakes: 0.85,
};
