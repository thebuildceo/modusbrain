/**
 * Compile operational skills from existing brain content.
 * Searches the brain for relevant pages and drafts a versioned skill artifact.
 */
import type { BrainEngine } from '../engine.ts';
import type {
  CompileSkillInput,
  CompileSkillResult,
  StructuredPolicyBlock,
  StructuredPolicyRule,
} from './types.ts';
import { DEFAULT_CONFIDENCE_THRESHOLDS } from './types.ts';
import { createSkillDraft, slugify } from './store.ts';

const REFUND_POLICY_TEMPLATE: StructuredPolicyRule[] = [
  { condition: 'amount < 50', action: 'auto_approve', metadata: { notify: false } },
  { condition: 'amount < 500', action: 'auto_approve', metadata: { notify: 'support-lead' } },
  { condition: 'amount >= 500 AND customer_tier == "enterprise"', action: 'require_manager_approval' },
  { condition: 'amount >= 500', action: 'require_finance_approval' },
];

function inferPolicyRules(topic: string, excerpts: string[]): StructuredPolicyBlock {
  const lower = topic.toLowerCase();
  const combined = excerpts.join('\n').toLowerCase();

  if (lower.includes('refund') || combined.includes('refund')) {
    return { rules: REFUND_POLICY_TEMPLATE, default_action: 'escalate_to_human' };
  }

  // Generic policy extraction from bullet/numbered lists in source content
  const rules: StructuredPolicyRule[] = [];
  for (const excerpt of excerpts) {
    const lines = excerpt.split('\n');
    for (const line of lines) {
      const bullet = line.match(/^[\s*\-•]+(.+)/);
      if (!bullet) continue;
      const text = bullet[1]!.trim();
      if (text.length < 10 || text.length > 200) continue;
      // Heuristic: lines with "if/when/must/should" become rules
      if (/\b(if|when|must|should|always|never)\b/i.test(text)) {
        rules.push({ condition: text, action: 'follow_guidance' });
      }
    }
  }

  if (rules.length === 0) {
    rules.push({
      condition: 'default',
      action: 'follow_prose_judgment',
      metadata: { note: 'No structured rules extracted; agent must read prose block' },
    });
  }

  return { rules: rules.slice(0, 10), default_action: 'escalate_to_human' };
}

function buildProseJudgment(topic: string, excerpts: string[]): string {
  const header = `# ${topic}\n\nCompiled operational guidance for agents.\n\n`;
  if (excerpts.length === 0) {
    return `${header}No matching brain content found. Review and enrich before approving.\n`;
  }
  const sections = excerpts.map((e, i) => `## Source excerpt ${i + 1}\n\n${e.trim()}\n`);
  return `${header}${sections.join('\n')}\n## Edge cases\n\nUse judgment when sources conflict. Escalate ambiguous cases to a human.\n`;
}

async function searchBrainContent(
  engine: BrainEngine,
  topic: string,
  sourceId: string,
): Promise<{ slugs: string[]; excerpts: string[] }> {
  const slugs: string[] = [];
  const excerpts: string[] = [];
  const seen = new Set<string>();

  // Search by full topic AND by each significant keyword (handles "refund handling" → "refunds")
  const keywords = [
    topic,
    ...topic.toLowerCase().split(/\W+/).filter(w => w.length > 3),
  ];
  const uniqueKeywords = [...new Set(keywords)];

  for (const kw of uniqueKeywords) {
    const pattern = `%${kw.replace(/[%_\\]/g, '\\$&')}%`;
    const rows = await engine.executeRaw<{ slug: string; compiled_truth: string }>(
      `SELECT slug, compiled_truth FROM pages
       WHERE source_id = $1 AND deleted_at IS NULL
         AND (compiled_truth ILIKE $2 OR slug ILIKE $2 OR title ILIKE $2)
       ORDER BY updated_at DESC
       LIMIT 10`,
      [sourceId, pattern],
    );

    for (const row of rows) {
      if (seen.has(row.slug)) continue;
      seen.add(row.slug);
      slugs.push(row.slug);
      excerpts.push((row.compiled_truth ?? '').slice(0, 800));
    }
  }

  return { slugs, excerpts };
}

export async function compileSkill(
  engine: BrainEngine,
  input: CompileSkillInput,
): Promise<CompileSkillResult> {
  const sourceId = input.source_id ?? 'default';
  const riskTier = input.risk_tier ?? 'low_stakes';
  const conflictPolicy = input.conflict_policy ?? 'serve_last_approved';
  const confidenceThreshold =
    input.confidence_threshold ?? DEFAULT_CONFIDENCE_THRESHOLDS[riskTier];

  const { slugs, excerpts } = await searchBrainContent(engine, input.topic, sourceId);
  const prose = buildProseJudgment(input.topic, excerpts);
  const structuredPolicy = inferPolicyRules(input.topic, excerpts);
  const slug = slugify(input.topic);
  const now = new Date().toISOString();

  const { skill, version } = await createSkillDraft(engine, {
    title: input.topic,
    slug,
    owner: input.owner,
    prose_judgment: prose,
    structured_policy: structuredPolicy,
    provenance: {
      source_slugs: slugs,
      compiled_by: input.compiled_by,
      compiled_at: now,
    },
    risk_tier: riskTier,
    conflict_policy: conflictPolicy,
    confidence_threshold: confidenceThreshold,
    source_id: sourceId,
  });

  return { skill, version, matched_sources: slugs };
}
