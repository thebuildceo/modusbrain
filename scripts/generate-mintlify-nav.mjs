#!/usr/bin/env bun
/**
 * Regenerate docs.json navigation to include ALL markdown files under docs/.
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

function groupBySubfolder(files) {
  const groups = {};
  for (const f of files) {
    if (!f.startsWith('docs/')) continue;
    const parts = f.slice('docs/'.length).split('/');
    if (parts.length === 1) {
      groups._root ??= [];
      groups._root.push(f);
    } else {
      const folder = parts[0];
      groups[folder] ??= [];
      groups[folder].push(f);
    }
  }
  return groups;
}

const FOLDER_LABELS = {
  _root: 'Core',
  guides: 'Guides',
  architecture: 'Architecture',
  tutorials: 'Tutorials',
  mcp: 'MCP integrations',
  integrations: 'Integrations',
  operations: 'Operations',
  eval: 'Eval',
  designs: 'Designs',
  ethos: 'Ethos',
  'ai-providers': 'AI providers',
  migrations: 'Migrations',
  issues: 'Issues',
  incidents: 'Incidents',
  proposals: 'Proposals',
  plans: 'Plans',
};

const allDocs = collectMdFiles(DOCS);
const grouped = groupBySubfolder(allDocs);

const engineGroups = Object.keys(grouped)
  .sort((a, b) => {
    if (a === '_root') return -1;
    if (b === '_root') return 1;
    return a.localeCompare(b);
  })
  .map(key => ({
    group: FOLDER_LABELS[key] ?? key,
    pages: grouped[key].sort((a, b) => a.localeCompare(b)),
  }));

const base = JSON.parse(readFileSync(join(ROOT, 'docs.json'), 'utf8'));

base.navigation = {
  tabs: [
    {
      tab: 'ModusBrain',
      groups: [
        {
          group: 'Get started',
          pages: ['introduction', 'quickstart', 'install', 'opskill-workflow'],
        },
        {
          group: 'Reference',
          pages: ['cli-reference', 'env-vars', 'attribution'],
        },
      ],
    },
    {
      tab: 'Engine docs',
      groups: engineGroups,
    },
  ],
};

writeFileSync(join(ROOT, 'docs.json'), JSON.stringify(base, null, 2) + '\n');
console.log(`Updated docs.json with ${allDocs.length} engine doc pages in ${engineGroups.length} groups.`);
