# ModusBrain — Website, Docs & Launch Playbook

**Domain:** [modusbrain.com](https://modusbrain.com)  
**Product:** ModusBrain — the company brain agents can safely execute against  
**Engine:** Built on [GBrain](https://github.com/garrytan/gbrain) (MIT License)

This file is your single checklist for going public: copy, website structure, docs hosting, deployment, and user onboarding.

---

## 1. Positioning (use everywhere)

### One-liner
> **ModusBrain turns scattered company knowledge into versioned, confidence-gated skills that AI agents execute against — not just search.**

### Elevator pitch (30 seconds)
Most “company brain” tools stop at search and chat. ModusBrain compiles your policies, runbooks, and tribal knowledge into **approved operational skills** with version history, confidence scoring, human approval gates, conflict queues, and full action audit trails. Built on the open-source GBrain retrieval engine; extended for autonomous operations.

### Honest attribution (footer + About page — required)
> ModusBrain is built on GBrain, an open-source knowledge engine by Garry Tan (MIT License). We added the skill-compilation and safe-execution layer for company operations.

### Do NOT say
- “We invented hybrid RAG / dream cycle / graph retrieval” (that’s GBrain)
- Garry Tan’s personal OpenClaw/Hermes deployment stories as your own

---

## 2. Website structure — modusbrain.com

### Recommended pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, problem/solution, social proof, CTA |
| Product | `/product` | Features mapped to 5 phases |
| How it works | `/how-it-works` | Compile → Approve → Execute diagram |
| Use cases | `/use-cases` | Support, fintech, HR, legal, enterprise |
| Pricing | `/pricing` | Self-hosted free (OSS) + cloud/enterprise tiers |
| Docs | `docs.modusbrain.com` | Mintlify (see §4) |
| GitHub | `github.com/your-org/modusbrain` | Source + issues |
| About | `/about` | Team, GBrain attribution, MIT license |
| Blog | `/blog` | Launch posts, customer stories |
| Contact | `/contact` | Demo request, enterprise sales |

### Home page copy (ready to paste)

**Hero headline:**  
The company brain agents can safely execute against.

**Hero subhead:**  
ModusBrain compiles your policies and runbooks into versioned skills with confidence gating, approval workflows, and audit trails — so autonomous agents act consistently, not creatively.

**Primary CTA:** `Get started free` → docs install  
**Secondary CTA:** `Book a demo` → Cal.com / Typeform

**Three pillars (below fold):**

1. **Compile** — Turn wiki pages, tickets, and docs into standing operational skills (v1, v2, v3), not one-off chat answers.  
2. **Gate** — Risk tiers, confidence scores, and human approval before high-stakes actions.  
3. **Prove** — Action audit trail: which skill, which version, what happened.

**Trust bar:**  
Built on GBrain (MIT) · Postgres-native · Self-hostable · SOC2-ready audit exports

**Social proof placeholders (fill when ready):**  
“Used by [design partner] for refund handling” · “X skills compiled · Y agent actions audited”

---

## 3. Product page — feature sections

### Phase 1 — Skill compilation
- Draft skills from existing brain content: `modusbrain opskill compile "refund handling"`
- Prose judgment + structured JSON rules (`if amount < 500 → auto_approve`)
- Full provenance and version history

### Phase 2 — Confidence gating
- Risk tiers: informational / low_stakes / high_stakes
- Draft skills blocked for remote agents until approved
- Approval tokens for high-stakes execution

### Phase 3 — Conflict resolution
- Contradictions route to named owners
- Configurable: serve last approved vs block until resolved

### Phase 4 — Action audit
- Every execution logged: skill, version, confidence, action, agent ID
- Export JSON for compliance reviews

### Phase 5 — Feedback loop
- Human corrections write back as evidence
- Auto re-compile after threshold

---

## 4. Documentation — Mintlify setup

### Why Mintlify
- Beautiful developer docs, search, versioning
- GitHub sync on every push
- Free tier for open source

### Steps

1. Create account at [mintlify.com](https://mintlify.com)
2. Connect GitHub repo `your-org/modusbrain`
3. Point docs root to `/docs` (create this folder) or use `MODUSBRAIN_LAUNCH.md` + `company-brain-rfs-analysis.md` as seeds
4. Set custom domain: **docs.modusbrain.com**
   - DNS: CNAME `docs` → Mintlify-provided target
5. Add `mint.json` at repo root:

```json
{
  "name": "ModusBrain",
  "logo": { "light": "/logo/light.svg", "dark": "/logo/dark.svg" },
  "favicon": "/favicon.svg",
  "colors": { "primary": "#2563EB", "light": "#3B82F6", "dark": "#1D4ED8" },
  "topbarLinks": [{ "name": "GitHub", "url": "https://github.com/your-org/modusbrain" }],
  "topbarCtaButton": { "name": "Install", "url": "https://docs.modusbrain.com/quickstart" },
  "navigation": [
    { "group": "Start", "pages": ["quickstart", "install", "opskill-workflow"] },
    { "group": "Product", "pages": ["features/compile", "features/gating", "features/audit"] },
    { "group": "Deploy", "pages": ["deploy/self-host", "deploy/supabase", "deploy/mcp"] },
    { "group": "Reference", "pages": ["cli/opskill", "mcp/operations", "env-vars"] }
  ]
}
```

### Essential doc pages to write first

| Page | Content source |
|---|---|
| `quickstart.md` | 5-minute: init → compile → approve → execute |
| `install.md` | Bun install, PGLite vs Supabase |
| `opskill-workflow.md` | Full refund-handling walkthrough |
| `env-vars.md` | MODUSBRAIN_* with GBRAIN_* legacy aliases |
| `rebrand-migration.md` | ~/.gbrain → ~/.modusbrain migration |

---

## 5. Where to push / host

| Asset | Where | Notes |
|---|---|---|
| Source code | GitHub `your-org/modusbrain` | Public repo; keep LICENSE + GBrain NOTICE |
| Website | Vercel or Cloudflare Pages | Connect to `website/` Next.js or Astro app |
| Docs | Mintlify → docs.modusbrain.com | Auto-deploy on push to `main` |
| npm/bun package | `bun publish` as `modusbrain` | package.json already named modusbrain |
| Binary releases | GitHub Releases | `bun run build` → upload `bin/modusbrain` |
| Docker | `ghcr.io/your-org/modusbrain` | Optional; Dockerfile from gbrain base |
| Demo brain | Supabase + hosted MCP | Enterprise tier later |

### DNS for modusbrain.com

| Record | Type | Value |
|---|---|---|
| `@` | A / ALIAS | Vercel / Cloudflare |
| `www` | CNAME | modusbrain.com |
| `docs` | CNAME | Mintlify target |
| `app` | CNAME | Future cloud product |

---

## 6. Pricing page copy (suggested)

### Open Source (Self-hosted) — **Free**
- Full ModusBrain CLI + operational skills layer
- PGLite embedded DB (zero config)
- Community support via GitHub Issues

### Team — **$XX/user/mo** (when you ship cloud)
- Hosted Postgres + pgvector
- Team-scoped brains, OAuth MCP
- Shared skill approval workflows

### Enterprise — **Contact sales**
- SSO, audit export, SLA
- On-prem / VPC deploy
- Custom schema packs + design partner support

---

## 7. How users install and use (copy for docs)

```bash
# Install
curl -fsSL https://bun.sh/install | bash
bun install -g github.com/your-org/modusbrain
# Legacy alias still works: `gbrain` → same binary

# Initialize
modusbrain init
modusbrain apply-migrations --yes
modusbrain config set schema_pack modusbrain-ops

# Operational skills workflow
modusbrain opskill compile "refund handling"
modusbrain opskill approve refund-handling --by you@company.com
modusbrain opskill execute refund-handling \
  --task "Process refund" --context '{"amount":300}'
modusbrain opskill audit --json
```

**Config directory:** `~/.modusbrain` (falls back to `~/.gbrain` for existing installs)  
**Env vars:** `MODUSBRAIN_*` preferred; `GBRAIN_*` still honored

---

## 8. SEO & metadata

**Title tag:** ModusBrain — Company brain for safe AI agent execution  
**Meta description:** Compile company knowledge into versioned operational skills. Confidence gating, approval workflows, and audit trails for autonomous agents. Built on GBrain.  
**Keywords:** company brain, AI agents, operational skills, knowledge base, RAG, YC RFS, agent safety, audit trail

**Open Graph image:** Dashboard mock showing skill versions + audit log (1200×630)

---

## 9. Launch checklist

- [ ] Buy modusbrain.com (done when you purchase)
- [ ] Create GitHub org/repo `modusbrain`
- [ ] Push rebranded code; tag `v1.0.0`
- [ ] Deploy marketing site to Vercel
- [ ] Connect Mintlify → docs.modusbrain.com
- [ ] Publish npm/bun package `modusbrain`
- [ ] GitHub Release with compiled binaries (macOS, Linux)
- [ ] Write launch blog post (Product Hunt / HN / LinkedIn)
- [ ] One design partner case study (refund handling)
- [ ] Add GBrain MIT attribution to LICENSE + NOTICE file
- [ ] Run `bun test test/operational-skills.test.ts` before every release

---

## 10. Legal files to add

**NOTICE** (in repo root):
```
ModusBrain
Copyright (c) 2026 [Your Company Name]

This product includes software from GBrain (https://github.com/garrytan/gbrain)
Copyright (c) Garry Tan
Licensed under the MIT License.
```

Keep the existing MIT LICENSE file; add NOTICE for attribution chain.

---

## 11. Brand assets to create

| Asset | Spec |
|---|---|
| Logo | Wordmark “ModusBrain” + optional brain/circuit icon |
| Colors | Primary #2563EB (blue), accent #10B981 (green for “approved”) |
| Font | Inter / Geist for site; JetBrains Mono for CLI docs |
| Favicon | “M” monogram |

---

## 12. Support channels

| Channel | URL |
|---|---|
| GitHub Issues | github.com/your-org/modusbrain/issues |
| Discord (optional) | discord.gg/modusbrain |
| Enterprise email | hello@modusbrain.com |
| Security | security@modusbrain.com |

---

## 13. Internal rebrand reference (already done in code)

| Old | New |
|---|---|
| CLI `gbrain` | `modusbrain` (`gbrain` alias kept) |
| `~/.gbrain` | `~/.modusbrain` (auto-fallback) |
| `GBRAIN_*` env | `MODUSBRAIN_*` (+ legacy fallback) |
| `.gbrain-source` | `.modusbrain-source` (+ legacy) |
| package name | `modusbrain` |
| Branding module | `src/core/branding.ts` |

Internal protocol strings (`gbrain-base`, `gbrain-skillpack-v1`) unchanged for engine compatibility.

---

*Last updated: launch prep for modusbrain.com*
