const fs = require('fs');

const filesToCheck = [
  'docs/architecture/schema-packs.md',
  'docs/designs/2026_05_EVAL_PLAN.md',
  'docs/designs/KNOWLEDGE_RUNTIME.md',
  'docs/designs/MINIONS_AGENT_ORCHESTRATION.md',
  'docs/designs/SKILLPACK_REGISTRY_V1_SPEC.md',
  'docs/designs/V038_SCHEMA_PACKS.md',
  'docs/architecture/KEY_FILES.md',
  'docs/architecture/RETRIEVAL.md',
  'docs/architecture/RETRIEVAL_MAXPOOL_INCIDENT.md',
  'docs/architecture/type-taxonomy.md',
  'docs/tutorials/company-brain.md',
  'docs/tutorials/personal-brain.md',
  'docs/RELEASING.md',
  'docs/UPGRADING_DOWNSTREAM_AGENTS.md',
  'docs/INSTALL.md',
  'docs/MODUSBRAIN_RECOMMENDED_SCHEMA.md',
  'docs/MODUSBRAIN_SKILLPACK.md',
  'docs/ethos/MARKDOWN_SKILLS_AS_RECIPES.md',
  'docs/ethos/ORIGIN.md',
  'docs/guides/minions-fix.md',
  'docs/guides/minions-shell-jobs.md',
  'docs/guides/multi-source-brains.md',
  'docs/guides/rls-and-you.md',
  'docs/guides/scaling-skills.md',
  'docs/guides/upgrades-auto-update.md',
];

let results = [];

for (const f of filesToCheck) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const trimmed = l.trimStart();
    if (trimmed.startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;

    // Bare <digit> tag-like patterns (MDX tries to parse as JSX)
    if (/<\d/.test(l)) {
      results.push({ file: f, line: i+1, issue: 'angle-digit', text: l.substring(0, 150) });
    }
    // Bare <single-lowercase-letter> that look like JSX tags
    if (/<[a-z]>/.test(l) || /<[a-z]\s/.test(l)) {
      results.push({ file: f, line: i+1, issue: 'bare-angle-tag', text: l.substring(0, 150) });
    }
    // Unescaped { outside of code that could cause expression issues
    if (/\{[^`'"}]/.test(l) && !l.includes('`')) {
      results.push({ file: f, line: i+1, issue: 'bare-brace', text: l.substring(0, 150) });
    }
  }
}

console.log(JSON.stringify(results, null, 2));
