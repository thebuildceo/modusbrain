import { readFileSync, writeFileSync } from 'fs';

// Fix 1: docs/architecture/schema-packs.md — already done above

// Fix 2: docs/architecture/KEY_FILES.md — escape c<i>of<n> inside idempotency key string
const keyFilesPath = 'docs/architecture/KEY_FILES.md';
let keyFiles = readFileSync(keyFilesPath, 'utf-8');

// The specific pattern that trips MDX: :c<i>of<n>  (bare JSX-like tags inside backtick prose)
keyFiles = keyFiles.replace(/:c<i>of<n>/g, ':c&lt;i&gt;of&lt;n&gt;');

writeFileSync(keyFilesPath, keyFiles);
console.log('KEY_FILES.md fixed');

// Fix 3: .mintignore — add scratch/ so Mintlify never parses our temp files
const mintignorePath = '.mintignore';
let mintignore = readFileSync(mintignorePath, 'utf-8');
if (!mintignore.includes('scratch/')) {
  mintignore = mintignore.trimEnd() + '\nscratch/\n';
  writeFileSync(mintignorePath, mintignore);
  console.log('.mintignore updated: added scratch/');
} else {
  console.log('.mintignore already has scratch/');
}

// Fix 4: docs/designs/2026_05_EVAL_PLAN.md — {cell} bare brace expressions
// Mintlify/MDX interprets bare { } as JSX expressions
// We need to escape { as &#123; and } as &#125; in prose lines only
const evalPlanPath = 'docs/designs/2026_05_EVAL_PLAN.md';
let evalPlan = readFileSync(evalPlanPath, 'utf-8');
const evalLines = evalPlan.split('\n');
let inCodeBlock = false;
const fixedEvalLines = evalLines.map(line => {
  const trimmed = line.trimStart();
  if (trimmed.startsWith('```')) { inCodeBlock = !inCodeBlock; return line; }
  if (inCodeBlock) return line;
  // Replace bare {cell} {A0,A1,...} etc. in prose with escaped versions
  if (/\{[^}]+\}/.test(line)) {
    return line.replace(/\{([^}]+)\}/g, '&#123;$1&#125;');
  }
  return line;
});
const fixedEvalPlan = fixedEvalLines.join('\n');
if (fixedEvalPlan !== evalPlan) {
  writeFileSync(evalPlanPath, fixedEvalPlan);
  console.log('2026_05_EVAL_PLAN.md fixed');
} else {
  console.log('2026_05_EVAL_PLAN.md — no changes needed');
}

console.log('All MDX fixes applied.');
