/**
 * modusbrain skill — operational skill compilation & safe execution layer.
 *
 * Subcommands:
 *   compile   Draft a versioned skill from brain content
 *   approve   Promote a draft to active (approved)
 *   list      List skills and versions
 *   execute   Run a skill with confidence gating
 *   conflicts Manage contradiction queue
 *   audit     View agent action audit trail
 *   correct   Record human correction (feedback loop)
 *   approve-token  Issue approval token for high-stakes execution
 */
import type { BrainEngine } from '../core/engine.ts';
import {
  compileSkill,
  approveVersion,
  getSkillBySlug,
  listSkills,
  listVersions,
  getActiveVersion,
  executeSkill,
  issueApprovalToken,
  listConflicts,
  createConflict,
  resolveConflictAndRecompile,
  listActions,
  recordSkillCorrection,
  listCorrections,
} from '../core/operational-skills/index.ts';
import type { RiskTier, ConflictPolicy } from '../core/operational-skills/types.ts';
import { cliCmd } from '../core/branding.ts';

const HELP = `${cliCmd('opskill')} <subcommand> [options]
  (alias: ${cliCmd('skill compile|approve|execute|...')} — subcommand form only)

Operational skills — versioned, confidence-gated procedures for agents.

Subcommands:
  compile "<topic>"     Draft skill from brain content (holds for approval)
  approve <slug>        Promote draft to active approved skill
  list                  List all operational skills
  show <slug>           Show skill details and version history
  execute <slug>        Execute skill with confidence gating
  conflicts             List open conflicts
  flag-conflict <slug>  Flag a contradiction for owner review
  resolve <id>          Resolve conflict and trigger re-compilation
  audit [--slug X]      View agent action audit trail
  correct <slug>        Record human correction (feedback loop)
                          Required: --original "..." --correction "..."
  approve-token <slug>  Issue approval token for high-stakes execution

Examples:
  modusbrain skill compile "refund handling" --risk-tier high_stakes
  modusbrain skill approve refund-handling --by alice@company.com
  modusbrain skill execute refund-handling --task "Process $300 refund" --context '{"amount":300}'
  modusbrain skill correct refund-handling --original "gave full refund" --correction "amounts over $400 need sign-off"
  modusbrain skill audit --slug refund-handling --json

Note (Windows PowerShell): pass --context as single-quoted JSON:
  modusbrain skill execute <slug> --task "..." --context '{"key":"value"}'
`;

function flagValue(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  return args[i + 1];
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name);
}

function parseContext(raw: string | undefined): Record<string, unknown> {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    console.error('Invalid --context JSON');
    process.exit(2);
  }
}

export async function runSkill(engine: BrainEngine | null, args: string[]): Promise<void> {
  const sub = args[0];
  const rest = args.slice(1);
  const json = hasFlag(rest, '--json');
  const sourceId = flagValue(rest, '--source') ?? 'default';

  if (!sub || sub === '--help' || sub === '-h') {
    console.log(HELP);
    return;
  }

  if (!engine) {
    console.error('No brain configured. Run: modusbrain init');
    process.exit(1);
  }

  if (sub === 'compile') {
    const topic = rest.find(a => !a.startsWith('--')) ?? rest[0];
    if (!topic || topic.startsWith('--')) {
      console.error('Usage: modusbrain skill compile "<topic>" [--risk-tier informational|low_stakes|high_stakes]');
      process.exit(2);
    }
    const riskTier = (flagValue(rest, '--risk-tier') ?? 'low_stakes') as RiskTier;
    const conflictPolicy = (flagValue(rest, '--conflict-policy') ?? 'serve_last_approved') as ConflictPolicy;
    const owner = flagValue(rest, '--owner');
    const by = flagValue(rest, '--by') ?? process.env.USER ?? 'cli';

    const result = await compileSkill(engine, {
      topic,
      risk_tier: riskTier,
      conflict_policy: conflictPolicy,
      owner,
      compiled_by: by,
      source_id: sourceId,
    });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`Draft skill compiled: ${result.skill.slug} v${result.version.version}`);
      console.log(`Status: ${result.version.status} (requires approval before agent execution)`);
      console.log(`Matched sources: ${result.matched_sources.join(', ') || '(none)'}`);
      console.log(`Risk tier: ${result.version.risk_tier}, threshold: ${result.version.confidence_threshold}`);
      console.log(`\nNext: modusbrain skill approve ${result.skill.slug} --by ${by}`);
    }
    return;
  }

  if (sub === 'approve') {
    const slug = rest.find(a => !a.startsWith('--'));
    const by = flagValue(rest, '--by') ?? process.env.USER ?? 'cli';
    const versionNum = flagValue(rest, '--version') ? parseInt(flagValue(rest, '--version')!, 10) : undefined;

    if (!slug) {
      console.error('Usage: modusbrain skill approve <slug> --by <approver>');
      process.exit(2);
    }

    const skill = await getSkillBySlug(engine, slug, sourceId);
    if (!skill) {
      console.error(`Skill not found: ${slug}`);
      process.exit(1);
    }

    const versions = await listVersions(engine, skill.id);
    const target = versionNum
      ? versions.find(v => v.version === versionNum)
      : versions.filter(v => v.status === 'draft').pop() ?? versions[versions.length - 1];

    if (!target) {
      console.error('No version to approve');
      process.exit(1);
    }

    const approved = await approveVersion(engine, skill.id, target.version, by);
    if (json) {
      console.log(JSON.stringify(approved, null, 2));
    } else {
      console.log(`Approved: ${slug} v${approved.version} (active)`);
    }
    return;
  }

  if (sub === 'list') {
    const skills = await listSkills(engine, sourceId);
    if (json) {
      const enriched = await Promise.all(
        skills.map(async s => ({
          ...s,
          active_version: await getActiveVersion(engine, s),
        })),
      );
      console.log(JSON.stringify(enriched, null, 2));
    } else {
      if (skills.length === 0) {
        console.log('No operational skills yet. Run: modusbrain skill compile "<topic>"');
        return;
      }
      for (const s of skills) {
        const active = await getActiveVersion(engine, s);
        console.log(`${s.slug}\t${s.title}\tactive=${active ? `v${active.version}` : 'none'}`);
      }
    }
    return;
  }

  if (sub === 'show') {
    const slug = rest.find(a => !a.startsWith('--'));
    if (!slug) {
      console.error('Usage: modusbrain skill show <slug>');
      process.exit(2);
    }
    const skill = await getSkillBySlug(engine, slug, sourceId);
    if (!skill) {
      console.error(`Skill not found: ${slug}`);
      process.exit(1);
    }
    const versions = await listVersions(engine, skill.id);
    if (json) {
      console.log(JSON.stringify({ skill, versions }, null, 2));
    } else {
      console.log(`# ${skill.title} (${skill.slug})`);
      console.log(`Owner: ${skill.owner ?? '(unset)'}`);
      for (const v of versions) {
        console.log(`\n## v${v.version} [${v.status}] risk=${v.risk_tier}`);
        console.log(`Threshold: ${v.confidence_threshold}, policy: ${v.conflict_policy}`);
        console.log(`Sources: ${v.provenance.source_slugs.join(', ') || '(none)'}`);
      }
    }
    return;
  }

  if (sub === 'execute') {
    const slug = rest.find(a => !a.startsWith('--'));
    const task = flagValue(rest, '--task') ?? 'execute skill';
    const context = parseContext(flagValue(rest, '--context'));
    const approvalToken = flagValue(rest, '--approval-token');
    const force = hasFlag(rest, '--force');
    const agentId = flagValue(rest, '--agent-id');

    if (!slug) {
      console.error('Usage: modusbrain skill execute <slug> --task "..." [--context JSON]');
      process.exit(2);
    }

    const result = await executeSkill(engine, {
      skill_slug: slug,
      task_description: task,
      context,
      approval_token: approvalToken,
      force,
      agent_id: agentId,
      source_id: sourceId,
    }, { trusted: force });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(result.allowed ? `✓ Action: ${result.action}` : `✗ Blocked: ${result.reason}`);
      console.log(`Confidence: ${result.confidence_score.toFixed(2)}, audit_id: ${result.audit_id}`);
    }
    if (!result.allowed) process.exit(1);
    return;
  }

  if (sub === 'conflicts') {
    const status = flagValue(rest, '--status') as 'open' | 'resolved' | undefined;
    const conflicts = await listConflicts(engine, sourceId, status);
    if (json) {
      console.log(JSON.stringify(conflicts, null, 2));
    } else {
      for (const c of conflicts) {
        console.log(`#${c.id} skill_id=${c.skill_id} [${c.status}] ${c.description}`);
        console.log(`  owner=${c.owner ?? '(unset)'} sources=${c.conflicting_sources.join(', ')}`);
      }
    }
    return;
  }

  if (sub === 'flag-conflict') {
    const slug = rest.find(a => !a.startsWith('--'));
    const description = flagValue(rest, '--description') ?? 'Contradiction detected';
    const sources = (flagValue(rest, '--sources') ?? '').split(',').filter(Boolean);
    const owner = flagValue(rest, '--owner');

    if (!slug) {
      console.error('Usage: modusbrain skill flag-conflict <slug> --description "..." [--sources a,b]');
      process.exit(2);
    }

    const skill = await getSkillBySlug(engine, slug, sourceId);
    if (!skill) {
      console.error(`Skill not found: ${slug}`);
      process.exit(1);
    }

    const conflict = await createConflict(engine, {
      skill_id: skill.id,
      conflicting_sources: sources,
      description,
      owner: owner ?? skill.owner,
      source_id: sourceId,
    });

    if (json) {
      console.log(JSON.stringify(conflict, null, 2));
    } else {
      console.log(`Conflict #${conflict.id} flagged for ${slug}`);
    }
    return;
  }

  if (sub === 'resolve') {
    const idStr = rest.find(a => !a.startsWith('--'));
    const by = flagValue(rest, '--by') ?? process.env.USER ?? 'cli';
    const note = flagValue(rest, '--note') ?? 'Resolved';

    if (!idStr) {
      console.error('Usage: modusbrain skill resolve <conflict-id> --by <user> --note "..."');
      process.exit(2);
    }

    const result = await resolveConflictAndRecompile(engine, parseInt(idStr, 10), by, note, sourceId);
    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`Conflict resolved. New draft version: v${result.new_version ?? 'n/a'}`);
    }
    return;
  }

  if (sub === 'audit') {
    const slug = flagValue(rest, '--slug');
    const limit = flagValue(rest, '--limit') ? parseInt(flagValue(rest, '--limit')!, 10) : 50;
    const actions = await listActions(engine, sourceId, { skill_slug: slug, limit });
    if (json) {
      console.log(JSON.stringify(actions, null, 2));
    } else {
      for (const a of actions) {
        console.log(`[${a.created_at}] ${a.skill_slug} v${a.skill_version} → ${a.action_result}: ${a.action_taken}`);
        console.log(`  conf=${a.confidence_score.toFixed(2)} task="${a.task_description.slice(0, 60)}"`);
      }
    }
    return;
  }

  if (sub === 'correct') {
    const slug = rest.find(a => !a.startsWith('--'));
    const original = flagValue(rest, '--original') ?? '';
    const correction = flagValue(rest, '--correction') ?? '';
    const by = flagValue(rest, '--by') ?? process.env.USER ?? 'cli';

    if (!slug || !original || !correction) {
      console.error('Usage: modusbrain skill correct <slug> --original "..." --correction "..."');
      process.exit(2);
    }

    const result = await recordSkillCorrection(engine, {
      skill_slug: slug,
      original_action: original,
      correction,
      corrected_by: by,
      source_id: sourceId,
    });

    if (json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`Correction recorded: evidence at ${result.evidence_slug}`);
      if (result.recompile_triggered) {
        console.log(`Re-compilation triggered → new draft v${result.new_draft_version}`);
      }
    }
    return;
  }

  if (sub === 'approve-token') {
    const slug = rest.find(a => !a.startsWith('--'));
    if (!slug) {
      console.error('Usage: modusbrain skill approve-token <slug>');
      process.exit(2);
    }
    const skill = await getSkillBySlug(engine, slug, sourceId);
    if (!skill) {
      console.error(`Skill not found: ${slug}`);
      process.exit(1);
    }
    const active = await getActiveVersion(engine, skill);
    const version = active?.version ?? 1;
    const token = issueApprovalToken(slug, version);
    if (json) {
      console.log(JSON.stringify({ token, slug, version, expires_in_seconds: 3600 }));
    } else {
      console.log(`Approval token (1h TTL):\n${token}`);
      console.log(`Use: modusbrain skill execute ${slug} --approval-token ${token} ...`);
    }
    return;
  }

  console.error(`Unknown subcommand: ${sub}\n`);
  console.error(HELP);
  process.exit(2);
}
