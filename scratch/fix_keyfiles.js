import { readFileSync, writeFileSync } from 'fs';

const path = 'docs/architecture/KEY_FILES.md';
const content = readFileSync(path, 'utf-8');

// The raw file has literal <i> (not HTML-entity encoded) — replace it
const fixed = content.replace(/:c<i>of/g, ':c&lt;i&gt;of');

if (fixed === content) {
  console.log('No match found — trying alternate search...');
  // Search for any remaining <i> patterns on line 3667
  const lines = content.split('\n');
  const line3667 = lines[3666];
  console.log('Chars around <i>:', JSON.stringify(line3667.substring(line3667.indexOf(':c'), line3667.indexOf(':c') + 30)));
} else {
  writeFileSync(path, fixed);
  console.log('Fixed: replaced :c<i>of with :c&lt;i&gt;of');
}
