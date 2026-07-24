import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = 'docs';
let filesModified = [];

const replacements = [
  { search: /x-garrytan-daily\.mjs/g, replace: 'x-shubham-daily.mjs' },
  { search: /owner=garry/g, replace: 'owner=shubham' },
  { search: /garrytan\/companies\//g, replace: 'shubham/companies/' },
  { search: /people\/garry-tan/g, replace: 'people/shubham-chavan' },
  { search: /garry-tan/g, replace: 'shubham-chavan' },
  { search: /garrytan-agents/g, replace: 'thebuildceo-agents' }
];

function processFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let originalContent = content;

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
