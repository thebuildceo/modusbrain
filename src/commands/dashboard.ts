/**
 * `modusbrain dashboard` — enriched brain health + operational skills overview.
 *
 * Tier 3 of the audit-and-fix pass. Wraps `runStatus` (the existing 6-section
 * health snapshot) and appends a 7th section: **Operational Skills** — a live
 * table of every compiled opskill, its active version, status, risk tier, and
 * last updated timestamp. Also prints the enterprise skill scaffold hint for
 * teams that haven't installed them yet.
 *
 * Usage:
 *   modusbrain dashboard [--json] [--section <name>] [--deadline-ms <n>]
 *
 * Exit codes (same as `modusbrain status`):
 *   0  snapshot produced successfully
 *   1  snapshot could NOT be produced
 *   2  usage error
 */

import type { BrainEngine } from '../core/engine.ts';
import { runStatus } from './status.ts';
import { listSkills, getActiveVersion, getLatestVersion } from '../core/operational-skills/store.ts';
import { ENTERPRISE_RECOMMENDED } from '../core/advisor/recommended-set.ts';

// ─── Operational Skills Section ────────────────────────────────────────────

interface OpskillRow {
  slug: string;
  title: string;
  status: string;
  risk_tier: string;
  version: number;
  updated_at: string;
}

async function buildOpskillsSection(engine: BrainEngine): Promise<{
  rows: OpskillRow[];
  error: string | null;
}> {
  try {
    const skills = await listSkills(engine, 'default');
    if (skills.length === 0) {
      return { rows: [], error: null };
    }

    const rows: OpskillRow[] = [];
    for (const skill of skills) {
      let status = 'draft';
      let risk_tier = 'UNKNOWN';
      let version = 0;

      // Prefer active version; fall back to latest draft so table is always populated
      const av = skill.active_version_id !== null
        ? await getActiveVersion(engine, skill)
        : await getLatestVersion(engine, skill.id);

      if (av) {
        status = av.status;
        risk_tier = av.risk_tier ?? 'UNKNOWN';
        version = av.version;
      }

      rows.push({
        slug: skill.slug,
        title: skill.title ?? skill.slug,
        status,
        risk_tier,
        version,
        updated_at: skill.updated_at ?? '',
      });
    }

    return { rows, error: null };
  } catch (err) {
    return { rows: [], error: (err as Error).message };
  }
}

function renderOpskillsSection(rows: OpskillRow[], error: string | null): string {
  const lines: string[] = ['\nOperational Skills:'];

  if (error) {
    lines.push(`  [ERR] ${error}`);
    return lines.join('\n');
  }

  if (rows.length === 0) {
    lines.push('  (none compiled yet — run `modusbrain opskill compile <topic>`)');
    return lines.join('\n');
  }

  // Header
  const cols = { slug: 28, status: 10, risk: 8, ver: 5, updated: 24 };
  const header =
    'SLUG'.padEnd(cols.slug) +
    'STATUS'.padEnd(cols.status) +
    'RISK'.padEnd(cols.risk) +
    'VER'.padEnd(cols.ver) +
    'UPDATED';
  const divider = '─'.repeat(header.length);
  lines.push('  ' + header);
  lines.push('  ' + divider);

  for (const r of rows) {
    const statusMark =
      r.status === 'approved'
        ? '[OK]'
        : r.status === 'draft'
          ? '[DR]'
          : '[??]';
    const row =
      r.slug.slice(0, cols.slug - 1).padEnd(cols.slug) +
      (statusMark + ' ' + r.status).slice(0, cols.status - 1).padEnd(cols.status) +
      r.risk_tier.slice(0, cols.risk - 1).padEnd(cols.risk) +
      String(r.version).padEnd(cols.ver) +
      r.updated_at.slice(0, 19);
    lines.push('  ' + row);
  }

  return lines.join('\n');
}

function renderEnterpriseHint(installedSlugs: Set<string>): string {
  const missing = ENTERPRISE_RECOMMENDED.filter((s) => !installedSlugs.has(s.slug));
  if (missing.length === 0) return '';
  return (
    '\nEnterprise Skills (not yet installed):\n' +
    missing.map((s) => `  - ${s.slug}`).join('\n') +
    '\n  To install: modusbrain skillpack scaffold ' +
    missing.map((s) => s.slug).join(' ')
  );
}

// ─── Main entry point ──────────────────────────────────────────────────────

export async function runDashboard(
  engine: BrainEngine | null,
  args: string[],
): Promise<{ exitCode: number }> {
  // Collect dashboard stdout so we can append opskills after it
  const chunks: string[] = [];
  const collect = (s: string) => { chunks.push(s); };

  // Run the existing status command (all 6 sections)
  const statusResult = await runStatus(engine, args, { stdout: collect });
  if (statusResult.exitCode !== 0) {
    // Re-print whatever status produced, then bail
    process.stdout.write(chunks.join(''));
    return { exitCode: statusResult.exitCode };
  }

  // Re-title the header line
  const combined = chunks.join('').replace('ModusBrain Status', 'ModusBrain Dashboard');
  process.stdout.write(combined);

  // Append operational skills section (section 7)
  if (!args.includes('--json') && engine) {
    const { rows, error } = await buildOpskillsSection(engine);
    process.stdout.write(renderOpskillsSection(rows, error) + '\n');

    // Enterprise hint: which opskill-oriented bundled skills aren't scaffolded yet?
    // We reuse the skill slugs as a proxy for whether the user is enterprise-oriented.
    const installedSlugs = new Set(rows.map((r) => r.slug));
    const hint = renderEnterpriseHint(installedSlugs);
    if (hint) process.stdout.write(hint + '\n');
  }

  return { exitCode: 0 };
}
