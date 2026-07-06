/**
 * Confidence scoring for skill invocation.
 * Combines retrieval match quality with provenance freshness signals.
 */
import type { BrainEngine } from '../engine.ts';
import type { OperationalSkillVersion } from './types.ts';

export interface ConfidenceInput {
  version: OperationalSkillVersion;
  task_description: string;
  context?: Record<string, unknown>;
}

export interface ConfidenceResult {
  score: number;
  factors: {
    source_coverage: number;
    task_relevance: number;
    approval_bonus: number;
    conflict_penalty: number;
  };
  rationale: string;
}

function tokenOverlap(a: string, b: string): number {
  const tokensA = new Set(a.toLowerCase().split(/\W+/).filter(t => t.length > 2));
  const tokensB = new Set(b.toLowerCase().split(/\W+/).filter(t => t.length > 2));
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  let overlap = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) overlap++;
  }
  return overlap / Math.max(tokensA.size, tokensB.size);
}

export function computeConfidence(input: ConfidenceInput): ConfidenceResult {
  const { version, task_description } = input;
  const sources = version.provenance.source_slugs ?? [];

  // Source coverage: more provenance sources = higher confidence
  const sourceCoverage = Math.min(1, sources.length / 3);

  // Task relevance: overlap between task and skill title/prose
  const relevanceToTitle = tokenOverlap(task_description, version.title);
  const relevanceToProse = tokenOverlap(task_description, version.prose_judgment.slice(0, 500));
  const taskRelevance = Math.max(relevanceToTitle, relevanceToProse * 0.8);

  // Approved skills get a bonus; drafts get penalized heavily for execution
  const approvalBonus = version.status === 'approved' ? 0.15 : -0.3;

  const factors = {
    source_coverage: sourceCoverage,
    task_relevance: taskRelevance,
    approval_bonus: approvalBonus,
    conflict_penalty: 0, // applied externally when open conflict exists
  };

  let score =
    0.35 * sourceCoverage +
    0.45 * taskRelevance +
    approvalBonus +
    0.05; // baseline

  score = Math.max(0, Math.min(1, score));

  const rationale =
    `confidence=${score.toFixed(2)} ` +
    `(sources=${sourceCoverage.toFixed(2)}, relevance=${taskRelevance.toFixed(2)}, ` +
    `status=${version.status})`;

  return { score, factors, rationale };
}

export async function computeConfidenceWithConflictPenalty(
  engine: BrainEngine,
  input: ConfidenceInput & { skill_id: number; has_open_conflict: boolean },
): Promise<ConfidenceResult> {
  const base = computeConfidence(input);
  if (input.has_open_conflict) {
    base.factors.conflict_penalty = 0.2;
    base.score = Math.max(0, base.score - 0.2);
    base.rationale += ', conflict_penalty=-0.20';
  }
  return base;
}

/**
 * Evaluate structured policy rules against context.
 * Returns the action from the first matching rule, or default_action.
 */
export function evaluatePolicy(
  version: OperationalSkillVersion,
  context: Record<string, unknown> = {},
): string {
  const { rules, default_action } = version.structured_policy;

  for (const rule of rules) {
    if (matchesCondition(rule.condition, context)) {
      return rule.action;
    }
  }

  return default_action ?? 'escalate_to_human';
}

function matchesCondition(condition: string, context: Record<string, unknown>): boolean {
  // Simple expression parser for conditions like "amount < 500"
  const cmpMatch = condition.match(/^(\w+)\s*(<|>|<=|>=|==|!=)\s*(.+)$/);
  if (cmpMatch) {
    const [, key, op, rawVal] = cmpMatch;
    const ctxVal = context[key!];
    if (ctxVal === undefined) return false;

    const numCtx = Number(ctxVal);
    const numRaw = Number(rawVal);
    if (!Number.isNaN(numCtx) && !Number.isNaN(numRaw)) {
      switch (op) {
        case '<': return numCtx < numRaw;
        case '>': return numCtx > numRaw;
        case '<=': return numCtx <= numRaw;
        case '>=': return numCtx >= numRaw;
        case '==': return numCtx === numRaw;
        case '!=': return numCtx !== numRaw;
      }
    }

    const strCtx = String(ctxVal).replace(/^"|"$/g, '');
    const strRaw = rawVal!.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    if (op === '==') return strCtx === strRaw;
    if (op === '!=') return strCtx !== strRaw;
  }

  // Compound: "amount >= 500 AND customer_tier == enterprise"
  if (condition.includes(' AND ')) {
    return condition.split(' AND ').every(part => matchesCondition(part.trim(), context));
  }

  // Default/follow_guidance always matches as fallback rule
  if (condition === 'default') return true;

  return false;
}
