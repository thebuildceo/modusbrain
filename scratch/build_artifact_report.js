import { readFileSync, writeFileSync } from 'fs';

const report = readFileSync('scratch/full_scan_report.md', 'utf-8');
const lines = report.split('\n');

let summaryHtml = `
## Summary of Scan Results

We scanned all files in the \`docs/\` directory. Below is the breakdown of matches by file:
`;

const fileCounts = {};
lines.forEach(l => {
  const m = l.match(/\[docs\/(.*?\.mdx?)\]/);
  if (m) {
    const f = 'docs/' + m[1];
    fileCounts[f] = (fileCounts[f] || 0) + 1;
  }
});

summaryHtml += '| File | Match Count |\n| --- | --- |\n';
for (const [file, count] of Object.entries(fileCounts)) {
  summaryHtml += `| [${file}](file:///${process.cwd().replace(/\\/g, '/')}/${file}) | ${count} |\n`;
}

summaryHtml += '\n\n';

const finalContent = report.replace('# Full Scan Report of docs/ folder', '# Full Scan Report of docs/ folder\n\n' + summaryHtml);

writeFileSync('C:/Users/Shubham/.gemini/antigravity/brain/9c218866-35e7-449a-8024-93feb860bb81/full_scan_results.md', finalContent);
console.log('Artifact report generated successfully.');
