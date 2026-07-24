import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = 'docs';
const results = [];

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check individual patterns:
    const garryMatch = line.match(/(Garry|Gary)\s*(Tan)?/gi);
    const garrytanUserMatch = line.includes('garrytan');
    const ycMatch = line.match(/\bYC\b|Y\s*Combinator/i);
    const gbrainMatch = line.match(/\bGBrain\b/i);
    const firstPersonMatch = line.match(/\b(I\s+built|I\s+run|I\s+am|I\s+created|I\s+designed|I\s+started|I\s+wrote|my\s+own\s+agents|my\s+own\s+AI|behind\s+my\s+own\s+AI)\b/i);

    if (garryMatch || garrytanUserMatch || ycMatch || gbrainMatch || firstPersonMatch) {
      results.push({
        file: filePath.replace(/\\/g, '/'),
        lineNum,
        content: line.trim(),
        matched: {
          garry: !!garryMatch,
          garrytanUser: garrytanUserMatch,
          yc: !!ycMatch,
          gbrain: !!gbrainMatch,
          firstPerson: !!firstPersonMatch
        }
      });
    }
  });
}

function traverse(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      traverse(full);
    } else if (full.endsWith('.md') || full.endsWith('.mdx')) {
      scanFile(full);
    }
  }
}

traverse(docsDir);

// Generate Markdown report
let md = '# Full Scan Report of docs/ folder\n\n';
md += `Total matches found: ${results.length}\n\n`;
md += '| File | Line | Content | Matches |\n';
md += '| --- | --- | --- | --- |\n';

for (const r of results) {
  const matchedTypes = [];
  if (r.matched.garry) matchedTypes.push('Garry/Gary');
  if (r.matched.garrytanUser) matchedTypes.push('garrytan');
  if (r.matched.yc) matchedTypes.push('YC/Y Combinator');
  if (r.matched.gbrain) matchedTypes.push('GBrain');
  if (r.matched.firstPerson) matchedTypes.push('First Person');
  
  // escape markdown pipes in content
  const escapedContent = r.content.replace(/\|/g, '\\|');
  md += `| [${r.file}](file:///${process.cwd().replace(/\\/g, '/')}/${r.file}#L${r.lineNum}) | ${r.lineNum} | \`${escapedContent}\` | ${matchedTypes.join(', ')} |\n`;
}

writeFileSync('scratch/full_scan_report.md', md);
console.log(`Scan complete. Found ${results.length} matches. Report written to scratch/full_scan_report.md`);
