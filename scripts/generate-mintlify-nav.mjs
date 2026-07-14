#!/usr/bin/env bun
/**
 * Regenerate docs.json navigation into the organized 7-tab structure
 * while dynamically collecting all markdown files under docs/.
 * Run: bun scripts/generate-mintlify-nav.mjs
 */
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const DOCS = join(ROOT, 'docs');

/** Convert file path to Mintlify page slug (no extension, forward slashes). */
function toPageSlug(absPath) {
  const rel = relative(ROOT, absPath).replace(/\\/g, '/');
  return rel.replace(/\.(md|mdx)$/i, '');
}

function collectMdFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === 'images' || name === 'minions-deployment-snippets') continue;
      out.push(...collectMdFiles(full));
    } else if (/\.(md|mdx)$/i.test(name)) {
      out.push(toPageSlug(full));
    }
  }
  return out;
}

const allDocs = collectMdFiles(DOCS);

// Grouping logic for the 7 tabs
const mcpDeployment = ['docs/mcp/DEPLOY', 'docs/mcp/ALTERNATIVES'];
const mcpClients = allDocs.filter(f => f.startsWith('docs/mcp/') && !mcpDeployment.includes(f)).sort();
const mcpDeploy = allDocs.filter(f => f.startsWith('docs/mcp/') && mcpDeployment.includes(f)).sort();
const integrations = allDocs.filter(f => f.startsWith('docs/integrations/')).sort();

const coreConcepts = [
  'docs/guides/brain-agent-loop',
  'docs/guides/brain-vs-memory',
  'docs/guides/compiled-truth',
  'docs/guides/source-attribution',
  'docs/guides/upgrades-auto-update'
];
const knowledgeIngestion = [
  'docs/guides/diligence-ingestion',
  'docs/guides/originals-folder',
  'docs/guides/meeting-ingestion',
  'docs/guides/content-media',
  'docs/guides/idea-capture'
];
const advancedOperation = allDocs.filter(f => 
  f.startsWith('docs/guides/') && 
  !coreConcepts.includes(f) && 
  !knowledgeIngestion.includes(f) && 
  ![
    'docs/guides/skill-development',
    'docs/guides/scaling-skills',
    'docs/guides/skillopt',
    'docs/guides/deterministic-collectors',
    'docs/guides/minions-deployment',
    'docs/guides/minions-fix',
    'docs/guides/minions-shell-jobs',
    'docs/guides/operational-disciplines',
    'docs/guides/sub-agent-routing',
    'docs/guides/queue-operations-runbook',
    'docs/guides/cron-schedule'
  ].includes(f)
).sort();

const skillAuthoring = [
  'docs/guides/skill-development',
  'docs/guides/scaling-skills',
  'docs/guides/skillopt',
  'docs/guides/deterministic-collectors'
];
const minionsGating = [
  'docs/guides/minions-deployment',
  'docs/guides/minions-fix',
  'docs/guides/minions-shell-jobs',
  'docs/guides/operational-disciplines',
  'docs/guides/sub-agent-routing'
];
const spendControls = [
  'docs/operations/spend-controls',
  'docs/guides/queue-operations-runbook',
  'docs/guides/cron-schedule'
];

const topologies = [
  'docs/architecture/topologies',
  'docs/architecture/brains-and-sources',
  'docs/architecture/system-of-record',
  'docs/architecture/infra-layer',
  'docs/architecture/thin-client'
];
const schemaPacks = [
  'docs/architecture/schema-packs',
  'docs/architecture/lens-packs',
  'docs/architecture/type-taxonomy',
  'docs/architecture/pack-upgrade-mechanism'
];
const searchSync = [
  'docs/architecture/RETRIEVAL',
  'docs/architecture/frontmatter-scan-incremental',
  'docs/architecture/serve-sync-concurrency',
  'docs/architecture/RETRIEVAL_MAXPOOL_INCIDENT'
];
const qualityEvals = [
  'docs/architecture/calibration-quality-gate-spec',
  'docs/architecture/KEY_FILES'
];

const tutorials = allDocs.filter(f => f.startsWith('docs/tutorials/')).sort();

const cliRef = [
  'docs/INSTALL',
  'docs/ENGINES',
  'docs/operations/headless-install',
  'docs/RELEASING',
  'docs/TESTING',
  'docs/UPGRADING_DOWNSTREAM_AGENTS',
  'docs/v0.38-smoke-test-report'
];
const evalsMetrics = allDocs.filter(f => f.startsWith('docs/eval/') || ['docs/eval-bench', 'docs/eval-capture', 'docs/eval-takes-quality'].includes(f)).sort();
const dbSchemas = [
  'docs/contradictions',
  'docs/embedding-migrations',
  'docs/guardrails',
  'docs/storage-tiering',
  'docs/takes-vs-facts',
  'docs/what-schemas-unlock',
  'docs/progress-events'
];
const schemaDev = [
  'docs/schema-author-tutorial',
  'docs/skillpack-anatomy',
  'docs/MODUSBRAIN_RECOMMENDED_SCHEMA',
  'docs/MODUSBRAIN_SKILLPACK',
  'docs/MODUSBRAIN_V0',
  'docs/MODUSBRAIN_VERIFY'
];
const aiProviders = allDocs.filter(f => f.startsWith('docs/ai-providers/')).sort();
const incidentsIssues = allDocs.filter(f => f.startsWith('docs/incidents/') || f.startsWith('docs/issues/')).sort();
const migrationsPlans = allDocs.filter(f => f.startsWith('docs/migrations/') || f.startsWith('docs/plans/') || f.startsWith('docs/proposals/')).sort();
const internalDesigns = allDocs.filter(f => f.startsWith('docs/designs/')).sort();
const ethosOrigin = allDocs.filter(f => f.startsWith('docs/ethos/')).sort();

const base = JSON.parse(readFileSync(join(ROOT, 'docs.json'), 'utf8'));

base.navigation = {
  tabs: [
    {
      tab: 'Get Started',
      groups: [
        {
          group: 'Overview',
          pages: ['introduction'],
        },
        {
          group: 'First Run',
          pages: ['quickstart', 'install'],
        },
        {
          group: 'Skills Workflow',
          pages: ['opskill-workflow'],
        },
        {
          group: 'Reference',
          pages: ['cli-reference', 'env-vars', 'attribution'],
        },
      ],
    },
    {
      tab: 'MCP & Integrations',
      groups: [
        {
          group: 'MCP Clients',
          pages: mcpClients,
        },
        {
          group: 'MCP Deployment',
          pages: mcpDeploy,
        },
        {
          group: 'Integrations',
          pages: integrations,
        },
      ],
    },
    {
      tab: 'Core Guides',
      groups: [
        {
          group: 'Core Concepts',
          pages: coreConcepts,
        },
        {
          group: 'Knowledge Ingestion',
          pages: knowledgeIngestion,
        },
        {
          group: 'Advanced Operation',
          pages: advancedOperation,
        },
      ],
    },
    {
      tab: 'Opskill Dev',
      groups: [
        {
          group: 'Skill Authoring',
          pages: skillAuthoring,
        },
        {
          group: 'Minions & Gating',
          pages: minionsGating,
        },
        {
          group: 'Spend & Cost Controls',
          pages: spendControls,
        },
      ],
    },
    {
      tab: 'Architecture',
      groups: [
        {
          group: 'System Topologies',
          pages: topologies,
        },
        {
          group: 'Schema & Packs',
          pages: schemaPacks,
        },
        {
          group: 'Search & Sync Internals',
          pages: searchSync,
        },
        {
          group: 'Quality & Evals Spec',
          pages: qualityEvals,
        },
      ],
    },
    {
      tab: 'Tutorials',
      groups: [
        {
          group: 'Hands-on Guides',
          pages: tutorials,
        },
      ],
    },
    {
      tab: 'Reference',
      groups: [
        {
          group: 'CLI & Core Reference',
          pages: cliRef,
        },
        {
          group: 'Evals & Metrics',
          pages: evalsMetrics,
        },
        {
          group: 'Database & Schemas',
          pages: dbSchemas,
        },
        {
          group: 'Schema Development',
          pages: schemaDev,
        },
        {
          group: 'AI Providers',
          pages: aiProviders,
        },
        {
          group: 'Incidents & Issues',
          pages: incidentsIssues,
        },
        {
          group: 'Migrations & Plans',
          pages: migrationsPlans,
        },
        {
          group: 'Internal Designs',
          pages: internalDesigns,
        },
        {
          group: 'Ethos & Origin',
          pages: ethosOrigin,
        },
      ],
    },
  ],
};

writeFileSync(join(ROOT, 'docs.json'), JSON.stringify(base, null, 2) + '\n');
console.log(`Updated docs.json with ${allDocs.length} engine doc pages in 7 organized tabs.`);
