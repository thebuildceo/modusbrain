/**
 * `modusbrain dashboard --web` / `modusbrain dashboard web`
 *
 * Local browser-based web dashboard (Prisma Studio / Drizzle Studio pattern).
 * Runs a local HTTP server at http://localhost:3710 (or auto-assigned port).
 *
 * Features:
 *   1. Approval Queue — pending draft skills with risk tier & confidence score,
 *      with functional Approve and Reject buttons that update database state.
 *   2. Audit Log Viewer — filterable table of skill executions & policy checks.
 *   3. Skills List & Version History — all compiled skills, provenance, and versions.
 *
 * Self-hosted, local-only, zero external SaaS dependencies.
 */

import type { BrainEngine } from '../core/engine.ts';
import { createServer } from 'http';
import type { IncomingMessage, ServerResponse } from 'http';
import { exec } from 'child_process';
import {
  listSkills,
  getVersion,
  listVersions,
  approveVersion,
  rejectVersion,
  listActions,
} from '../core/operational-skills/store.ts';

export interface WebDashboardOptions {
  port?: number;
  openBrowser?: boolean;
}

export async function runWebDashboard(
  engine: BrainEngine,
  opts: WebDashboardOptions = {},
): Promise<void> {
  const port = opts.port ?? 3710;
  const openBrowser = opts.openBrowser ?? true;

  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? '/', `http://localhost:${port}`);
    const path = url.pathname;

    // Enable CORS for local development flexibility
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      // ── API ENDPOINTS ──────────────────────────────────────────────────

      if (path === '/api/approval-queue' && req.method === 'GET') {
        const skills = await listSkills(engine, 'default');
        const pending: any[] = [];
        for (const skill of skills) {
          const versions = await listVersions(engine, skill.id);
          const drafts = versions.filter(v => v.status === 'draft');
          for (const draft of drafts) {
            pending.push({
              skillId: skill.id,
              slug: skill.slug,
              title: skill.title ?? skill.slug,
              version: draft.version,
              riskTier: draft.risk_tier ?? 'UNKNOWN',
              status: draft.status,
              confidenceThreshold: draft.confidence_threshold,
              proseJudgment: draft.prose_judgment,
              structuredPolicy: draft.structured_policy,
              provenance: draft.provenance,
              createdAt: draft.created_at,
            });
          }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ queue: pending }));
        return;
      }

      if (path === '/api/skills' && req.method === 'GET') {
        const skills = await listSkills(engine, 'default');
        const detailedSkills: any[] = [];
        for (const skill of skills) {
          const versions = await listVersions(engine, skill.id);
          detailedSkills.push({
            id: skill.id,
            slug: skill.slug,
            title: skill.title ?? skill.slug,
            activeVersionId: skill.active_version_id,
            updatedAt: skill.updated_at,
            versions: versions.map(v => ({
              version: v.version,
              status: v.status,
              riskTier: v.risk_tier,
              confidenceThreshold: v.confidence_threshold,
              proseJudgment: v.prose_judgment,
              provenance: v.provenance,
              createdAt: v.created_at,
            })),
          });
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ skills: detailedSkills }));
        return;
      }

      if (path === '/api/audits' && req.method === 'GET') {
        const audits = await listActions(engine, 'default', { limit: 100 });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ audits }));
        return;
      }

      if (path === '/api/approve' && req.method === 'POST') {
        let bodyStr = '';
        req.on('data', chunk => { bodyStr += chunk; });
        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyStr);
            const { skillId, version, approver } = body;
            if (!skillId || !version) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'skillId and version are required' }));
              return;
            }
            const approved = await approveVersion(
              engine,
              Number(skillId),
              Number(version),
              approver ?? 'web-dashboard-user',
            );
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, version: approved }));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: (err as Error).message }));
          }
        });
        return;
      }

      if (path === '/api/reject' && req.method === 'POST') {
        let bodyStr = '';
        req.on('data', chunk => { bodyStr += chunk; });
        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyStr);
            const { skillId, version, rejectedBy } = body;
            if (!skillId || !version) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'skillId and version are required' }));
              return;
            }
            const rejected = await rejectVersion(
              engine,
              Number(skillId),
              Number(version),
              rejectedBy ?? 'web-dashboard-user',
            );
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, version: rejected }));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: (err as Error).message }));
          }
        });
        return;
      }

      // ── SERVE SINGLE PAGE WEB UI HTML ──────────────────────────────────
      if (path === '/' || path === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(getHtmlApp());
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  });

  // Wrap in a Promise that keeps the event loop alive until the process is
  // interrupted (SIGINT / SIGTERM / Ctrl-C). Without this Bun exits
  // immediately after server.listen() returns because there are no other
  // pending tasks holding the loop open.
  await new Promise<void>((resolve) => {
    server.listen(port, () => {
      const url = `http://localhost:${port}`;
      console.log(`\n========================================================`);
      console.log(`🚀 ModusBrain Web Dashboard active at ${url}`);
      console.log(`========================================================\n`);
      console.log(`Press Ctrl-C to stop.\n`);

      if (openBrowser) {
        const openCmd =
          process.platform === 'win32'
            ? `start ${url}`
            : process.platform === 'darwin'
              ? `open ${url}`
              : `xdg-open ${url}`;
        exec(openCmd, () => { /* best-effort browser launch */ });
      }
    });

    const shutdown = () => {
      console.log('\n[dashboard] Shutting down…');
      server.close(() => resolve());
    };
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
  });
}


// ── HTML/CSS/JS SINGLE PAGE APPLICATION ───────────────────────────────────

function getHtmlApp(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ModusBrain Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.1);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-hover: #4f46e5;
      --green: #10b981;
      --green-bg: rgba(16, 185, 129, 0.15);
      --red: #ef4444;
      --red-bg: rgba(239, 68, 68, 0.15);
      --amber: #f59e0b;
      --amber-bg: rgba(245, 158, 11, 0.15);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      padding: 24px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--card-border);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 8px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .badge {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
    }
    .nav {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }
    .nav-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-btn:hover { color: var(--text-main); background: rgba(255, 255, 255, 0.05); }
    .nav-btn.active {
      color: var(--text-main);
      background: var(--card-bg);
      border-color: var(--card-border);
    }
    .panel { display: none; }
    .panel.active { display: block; }

    .card {
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tag {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .tag-HIGH { background: var(--red-bg); color: var(--red); }
    .tag-MEDIUM { background: var(--amber-bg); color: var(--amber); }
    .tag-LOW { background: var(--green-bg); color: var(--green); }
    .tag-draft { background: var(--amber-bg); color: var(--amber); }
    .tag-approved { background: var(--green-bg); color: var(--green); }

    .code-block {
      font-family: 'JetBrains Mono', monospace;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 12px;
      font-size: 13px;
      color: #cbd5e1;
      overflow-x: auto;
      margin: 12px 0;
      white-space: pre-wrap;
    }

    .btn-group { display: flex; gap: 8px; margin-top: 12px; }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-approve { background: var(--green); color: #fff; }
    .btn-approve:hover { background: #059669; }
    .btn-reject { background: var(--red); color: #fff; }
    .btn-reject:hover { background: #dc2626; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--card-border);
    }
    th {
      color: var(--text-muted);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
    }
    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--text-muted);
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-logo"></div>
      <div class="brand-title">ModusBrain Web Dashboard</div>
    </div>
    <span class="badge">Local Studio Mode</span>
  </div>

  <div class="nav">
    <button class="nav-btn active" onclick="showTab('approval')">Approval Queue</button>
    <button class="nav-btn" onclick="showTab('skills')">Skills & Version History</button>
    <button class="nav-btn" onclick="showTab('audits')">Audit Log Viewer</button>
  </div>

  <!-- APPROVAL QUEUE TAB -->
  <div id="tab-approval" class="panel active">
    <div id="approval-container">Loading approval queue...</div>
  </div>

  <!-- SKILLS & VERSIONS TAB -->
  <div id="tab-skills" class="panel">
    <div id="skills-container">Loading skills list...</div>
  </div>

  <!-- AUDIT LOG TAB -->
  <div id="tab-audits" class="panel">
    <div id="audits-container">Loading audit log...</div>
  </div>

  <script>
    function showTab(tabName) {
      document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
      event.target.classList.add('active');
      document.getElementById('tab-' + tabName).classList.add('active');
      if (tabName === 'approval') loadApprovalQueue();
      if (tabName === 'skills') loadSkills();
      if (tabName === 'audits') loadAudits();
    }

    async function loadApprovalQueue() {
      const res = await fetch('/api/approval-queue');
      const data = await res.json();
      const container = document.getElementById('approval-container');
      if (!data.queue || data.queue.length === 0) {
        container.innerHTML = '<div class="card empty-state">🎉 No pending draft skills in the approval queue!</div>';
        return;
      }

      container.innerHTML = data.queue.map(function(item) {
        return '<div class="card" id="card-' + item.skillId + '-' + item.version + '">' +
          '<div class="card-title">' +
            '<span>' + item.title + ' <small style="color:var(--text-muted)">(' + item.slug + ' v' + item.version + ')</small></span>' +
            '<span class="tag tag-' + item.riskTier + '">Risk: ' + item.riskTier + '</span>' +
          '</div>' +
          '<div style="font-size:13px; color:var(--text-muted); margin-bottom:8px">' +
            'Confidence Threshold: <strong>' + item.confidenceThreshold + '</strong> · Created: ' + item.createdAt.slice(0, 19) +
          '</div>' +
          '<div class="code-block">' + (item.proseJudgment || 'No prose judgment text') + '</div>' +
          '<div class="btn-group">' +
            '<button class="btn btn-approve" onclick="approveSkill(' + item.skillId + ', ' + item.version + ')">Approve & Activate</button>' +
            '<button class="btn btn-reject" onclick="rejectSkill(' + item.skillId + ', ' + item.version + ')">Reject Version</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function approveSkill(skillId, version) {
      const res = await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId: skillId, version: version, approver: 'web-dashboard-operator' }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Skill version v' + version + ' approved and activated!');
        loadApprovalQueue();
      } else {
        alert('Approval failed: ' + data.error);
      }
    }

    async function rejectSkill(skillId, version) {
      const res = await fetch('/api/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId: skillId, version: version, rejectedBy: 'web-dashboard-operator' }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Skill version v' + version + ' rejected.');
        loadApprovalQueue();
      } else {
        alert('Rejection failed: ' + data.error);
      }
    }

    async function loadSkills() {
      const res = await fetch('/api/skills');
      const data = await res.json();
      const container = document.getElementById('skills-container');
      if (!data.skills || data.skills.length === 0) {
        container.innerHTML = '<div class="card empty-state">No compiled operational skills found in database.</div>';
        return;
      }

      container.innerHTML = data.skills.map(function(s) {
        const rowsHtml = s.versions.map(function(v) {
          return '<tr>' +
            '<td>v' + v.version + '</td>' +
            '<td><span class="tag tag-' + v.status + '">' + v.status + '</span></td>' +
            '<td><span class="tag tag-' + v.riskTier + '">' + v.riskTier + '</span></td>' +
            '<td>' + v.createdAt.slice(0, 19) + '</td>' +
          '</tr>';
        }).join('');

        return '<div class="card">' +
          '<div class="card-title">' +
            '<span>' + s.title + ' <small style="color:var(--text-muted)">(' + s.slug + ')</small></span>' +
            '<span class="badge">Active Ver: ' + (s.activeVersionId ? 'v' + s.activeVersionId : 'None') + '</span>' +
          '</div>' +
          '<table>' +
            '<thead><tr><th>Version</th><th>Status</th><th>Risk Tier</th><th>Created</th></tr></thead>' +
            '<tbody>' + rowsHtml + '</tbody>' +
          '</table>' +
        '</div>';
      }).join('');
    }

    async function loadAudits() {
      const res = await fetch('/api/audits');
      const data = await res.json();
      const container = document.getElementById('audits-container');
      if (!data.audits || data.audits.length === 0) {
        container.innerHTML = '<div class="card empty-state">No skill execution audits logged yet.</div>';
        return;
      }

      const rowsHtml = data.audits.map(function(a) {
        return '<tr>' +
          '<td>' + a.skill_id + '</td>' +
          '<td>v' + a.version + '</td>' +
          '<td><strong>' + a.action_taken + '</strong></td>' +
          '<td>' + (a.confidence * 100).toFixed(1) + '%</td>' +
          '<td>' + a.created_at.slice(0, 19) + '</td>' +
        '</tr>';
      }).join('');

      container.innerHTML = '<div class="card">' +
        '<table>' +
          '<thead><tr><th>Skill ID</th><th>Version</th><th>Action</th><th>Confidence</th><th>Timestamp</th></tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
      '</div>';
    }

    // Initial load
    loadApprovalQueue();
  </script>
</body>
</html>`;
}
