import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = 'docs';
let filesModified = [];

const replacements = [
  // 1. URLs & Repositories
  { search: /github\.com\/garrytan\/gbrain/gi, replace: 'github.com/thebuildceo/modusbrain' },
  { search: /garrytan\/modusbrain/g, replace: 'thebuildceo/modusbrain' },
  { search: /garrytan-agents/g, replace: 'thebuildceo-agents' },
  { search: /garrytan\/fix-wave-N/g, replace: 'thebuildceo/fix-wave-N' },
  { search: /garrytan\/modusbrain-skillpack-registry/g, replace: 'thebuildceo/modusbrain-skillpack-registry' },
  { search: /garrytan\/modusbrain-schema-registry/g, replace: 'thebuildceo/modusbrain-schema-registry' },
  { search: /garrytan\/gbrain-skillpack-registry/g, replace: 'thebuildceo/modusbrain-skillpack-registry' },
  { search: /garrytan\/skillpack-hackathon-evaluation/g, replace: 'thebuildceo/skillpack-hackathon-evaluation' },
  { search: /garrytan\/gbrain-evals/g, replace: 'thebuildceo/modusbrain-evals' },
  
  // 2. Personal identities & narrations in specific contexts
  { search: /I'm Garry Tan\. I built ModusBrain to run my own AI agents at Y Combinator\./g, 
    replace: "I'm Shubham Chavan, founder of Genthropic. I built ModusBrain to run my own AI agents in production." },
  
  { search: /ModusBrain came out of building OpenClaw — Garry's personal AI agent fork\./g, 
    replace: "ModusBrain came out of building OpenClaw — a personal AI agent fork." },
  
  { search: /Names of people Garry had introduced/g, replace: "Names of people we had introduced" },
  { search: /It wakes Garry up smarter/g, replace: "It wakes the user up smarter" },
  { search: /wakes Garry up smarter/g, replace: "wakes the user up smarter" },
  { search: /wakes Garry up/g, replace: "wakes the user up" },
  { search: /Garry caught it:/g, replace: "we caught it:" },
  { search: /Garry Tan's OpenClaw/g, replace: "the OpenClaw agent" },
  { search: /Garry's OpenClaw/g, replace: "OpenClaw" },
  { search: /Garry's own OpenClaw/g, replace: "OpenClaw" },
  { search: /Garry wants to ship/g, replace: "We want to ship" },
  { search: /without Garry hand-curating/g, replace: "without hand-curating" },
  { search: /Garry-only overlay/g, replace: "Admin-only overlay" },
  { search: /Garry has a hero\/rescuer pattern/g, replace: "Shubham has a hero/rescuer pattern" },
  { search: /what I run in production behind my own AI agents\./g, replace: "what I run in production behind my own AI agents." },
  { search: /Garry Tan \+ retrieval/gi, replace: "Shubham Chavan + retrieval" },
  { search: /Garry Tan/g, replace: "Shubham Chavan" },
  { search: /Garry/g, replace: "Shubham" },
  { search: /yc-media \+ garrys-list/g, replace: "team-media + personal-list" },
  { search: /yc-media/g, replace: "team-media" },
  { search: /garrys-list/g, replace: "personal-list" },
  { search: /Garry's List/g, replace: "Personal List" },
  { search: /YC Media/g, replace: "Team Media" },
  { search: /Companies in Garry's portfolio/g, replace: "Companies in the portfolio" },
  
  // 3. YC-specific structures in designs & scaling
  { search: /YC Spring 2026 -- Thin Harness, Fat Skills/g, replace: "Spring 2026 -- Thin Harness, Fat Skills" },
  { search: /everything I'd been teaching at YC\./g, replace: "everything I'd been building at Genthropic." },
  { search: /system we're building at YC\./g, replace: "system we're building at Genthropic." },
  { search: /YC Startup School/g, replace: "Genthropic Startup School" },
  { search: /YC tools/g, replace: "external tools" },
  { search: /YC rubric/g, replace: "evaluation rubric" },
  { search: /yc-w24-company/g, replace: "w24-company" },
  { search: /companies\/yc-w24\//g, replace: "companies/w24/" },
  { search: /YC W24/g, replace: "W24" },
  { search: /YC orgs/g, replace: "corporate orgs" },
  { search: /behind Y Combinator's/g, replace: "behind Genthropic's" },
  { search: /works on retrieval quality at YC\?/g, replace: "works on retrieval quality?" },
  { search: /garrytan\/minions-jobs/g, replace: "shubham/minions-jobs" },
  { search: /Owner: Garry/g, replace: "Owner: Shubham" },
  { search: /author: Garry Tan/g, replace: "author: Shubham Chavan" },
  { search: /author_handle": "garrytan"/g, replace: 'author_handle": "shubham"' },
  
  // 4. File-system / Conductor Paths
  { search: /\/Users\/garrytan\//g, replace: '/Users/shubham/' },
  { search: /garrytan\/v0\.35/g, replace: 'shubham/v0.35' },
  { search: /garrytan\/embedder/g, replace: 'shubham/embedder' },
  { search: /handle: "garrytan"/g, replace: 'handle: "shubham"' },
  { search: /garrytan\/status/g, replace: 'shubham/status' },
  { search: /holder=people\/garry-tan/g, replace: 'holder=people/shubham-chavan' },
  { search: /x-garrytan-unified/g, replace: 'x-shubham-unified' },
  
  // 5. Instruction neutralization override in RELEASING.md
  { search: /- Never auto-merge PRs that remove YC references or "neutralize" the founder perspective\./g,
    replace: '- Never auto-merge PRs that neutralize the Genthropic founder perspective.' }
];

function processFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Let's strip the specific thread link in thin-harness essay
  if (filePath.endsWith('THIN_HARNESS_FAT_SKILLS.md')) {
    content = content.replace(/thread: "https:\/\/x\.com\/garrytan\/status\/\d+"\n/, '');
  }

  for (const r of replacements) {
    content = content.replace(r.search, r.replace);
  }

  if (content !== originalContent) {
    writeFileSync(filePath, content);
    filesModified.push(filePath.replace(/\\/g, '/'));
  }
}

function traverse(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      traverse(full);
    } else if (full.endsWith('.md') || full.endsWith('.mdx')) {
      processFile(full);
    }
  }
}

traverse(docsDir);

console.log(JSON.stringify(filesModified, null, 2));
