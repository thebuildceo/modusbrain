# ModusBrain — Company Brain RFS Implementation Guide

**Product name:** ModusBrain · **Domain:** [modusbrain.com](https://modusbrain.com)  
**Launch playbook:** [MODUSBRAIN_LAUNCH.md](./MODUSBRAIN_LAUNCH.md) (website, Mintlify, DNS, pricing)  
**Base engine:** [GBrain](https://github.com/garrytan/gbrain) (MIT License)  
**Target:** Y Combinator "Company Brain" Request for Startups — Tom Blomfield

> Built on the open-source GBrain engine (MIT licensed), extended with a skill-compilation and safe-execution layer purpose-built for autonomous company operations.

---

## 1. Attribution & Positioning (read this first)

This project is built **on top of** GBrain. Forking and extending it is fully permitted under the MIT license, provided the original license and copyright notice are retained.

**Do not:**

- Present GBrain's retrieval/graph/dream-cycle engine as your own invention.
- Reuse Garry Tan's first-person bio or OpenClaw-specific framing in your product docs.
- Omit the MIT license/attribution when you publish.

**Honest pitch:**

> "GBrain solved the hardest 70% — pulling scattered knowledge into a current, cited memory layer. ModusBrain adds the last 30%: compiling that memory into versioned, confidence-gated skills that AI agents can safely execute against, not just query."

---



## 2. Implementation Status (all 5 phases shipped)


| RFS Requirement                         | Before           | Now (ModusBrain layer)                          |
| --------------------------------------- | ---------------- | ----------------------------------------------- |
| Pulls knowledge from fragmented sources | ✅ GBrain         | ✅ Unchanged                                     |
| Structures it                           | ✅ GBrain         | ✅ + `skill` / `procedure` page types            |
| Keeps it current                        | ✅ Dream Cycle    | ✅ + re-compile on correction threshold          |
| Not just search/chatbot                 | ✅ `gbrain think` | ✅ + `gbrain skill execute`                      |
| Living map of how company works         | ⚠️ Partial       | ✅ Operational skills capture procedures         |
| Executable skills for AI                | ❌ Gap            | ✅ **Versioned skill artifacts (v1→v2→v3)**      |
| Safe, consistent agent actions          | ❌ Gap            | ✅ **Risk tiers + confidence gating + approval** |
| Multi-user / team memory                | ✅ GBrain         | ✅ Unchanged                                     |




### What was added (file map)


| Phase     | Feature             | Code location                                                                     |
| --------- | ------------------- | --------------------------------------------------------------------------------- |
| **1**     | Skill compilation   | `src/core/operational-skills/compile.ts`, `gbrain opskill compile`                |
| **1**     | Skill page type     | `src/core/schema-pack/base/modusbrain-ops.yaml`                                   |
| **1**     | DB schema           | Migration v123 `operational_skills_layer` in `src/core/migrate.ts`                |
| **2**     | Confidence gating   | `src/core/operational-skills/confidence.ts`, `execute.ts`                         |
| **2**     | Approval workflow   | `gbrain opskill approve`, `gbrain opskill approve-token`                          |
| **3**     | Conflict queue      | `gbrain opskill flag-conflict`, `gbrain opskill resolve`                          |
| **4**     | Action audit trail  | `operational_skill_actions` table, `gbrain opskill audit`                         |
| **5**     | Feedback loop       | `src/core/operational-skills/feedback.ts`, `gbrain opskill correct`               |
| **MCP**   | Remote agent API    | `compile_operational_skill`, `execute_operational_skill`, etc. in `operations.ts` |
| **Tests** | Full phase coverage | `test/operational-skills.test.ts`                                                 |


---



## 3. Quick Start — How to Use ModusBrain



### Prerequisites

```bash
# Install Bun + dependencies
curl -fsSL https://bun.sh/install | bash
cd gbrain-master
bun install --ignore-scripts   # skip postinstall on Windows if needed

# Init brain (defaults to embedded PGLite)
bun run src/cli.ts init

# Apply migrations (includes v123 operational skills)
bun run src/cli.ts apply-migrations --yes

# Optional: activate ModusBrain schema pack
bun run src/cli.ts config set schema_pack modusbrain-ops
```



### End-to-end workflow (refund handling example)

```bash
# 1. Ingest policy content into the brain
bun run src/cli.ts capture --file ./docs/refund-policy.md

# 2. Compile a draft skill from brain content
bun run src/cli.ts opskill compile "refund handling" --risk-tier high_stakes --owner support-lead

# 3. Review the draft
bun run src/cli.ts opskill show refund-handling

# 4. Human approves → becomes active
bun run src/cli.ts opskill approve refund-handling --by alice@company.com

# 5. Agent executes with confidence gating
bun run src/cli.ts opskill execute refund-handling \
  --task "Process $300 refund for order #4521" \
  --context '{"amount":300}'

# 6. High-stakes below threshold? Issue approval token first
bun run src/cli.ts opskill approve-token refund-handling
bun run src/cli.ts opskill execute refund-handling \
  --task "Process $800 refund" \
  --context '{"amount":800}' \
  --approval-token appr_refund-handling_v1_...

# 7. Audit what agents did
bun run src/cli.ts opskill audit --slug refund-handling --json

# 8. Human corrects a bad action → writes evidence + may re-compile
bun run src/cli.ts opskill correct refund-handling \
  --original "auto_approve" \
  --correction "Amounts over $400 need manager approval, not $500" \
  --by bob@company.com
```

> **CLI note:** `gbrain skill <name>` still fetches host skillpack instructions (existing GBrain). Operational skills use `gbrain opskill ...` or `gbrain skill compile|approve|execute|...`.



### All CLI commands


| Command                                                             | Purpose                      |
| ------------------------------------------------------------------- | ---------------------------- |
| `gbrain opskill compile "<topic>"`                                  | Draft skill from brain pages |
| `gbrain opskill approve <slug> --by <user>`                         | Promote draft → active       |
| `gbrain opskill list`                                               | List all skills              |
| `gbrain opskill show <slug>`                                        | Version history + metadata   |
| `gbrain opskill execute <slug> --task "..." --context JSON`         | Run with gating              |
| `gbrain opskill approve-token <slug>`                               | Issue 1h approval token      |
| `gbrain opskill flag-conflict <slug> --description "..."`           | Open conflict queue item     |
| `gbrain opskill resolve <id> --by <user> --note "..."`              | Resolve + re-compile         |
| `gbrain opskill audit [--slug X]`                                   | Agent action audit trail     |
| `gbrain opskill correct <slug> --original "..." --correction "..."` | Feedback loop                |


Add `--json` to any command for machine-readable output.

### MCP operations (for autonomous agents)


| Operation                   | Scope | Notes                                   |
| --------------------------- | ----- | --------------------------------------- |
| `compile_operational_skill` | write | Drafts skill; remote agents can compile |
| `approve_operational_skill` | write | **localOnly** — humans approve locally  |
| `execute_operational_skill` | read  | Refuses draft skills for remote callers |
| `list_operational_skills`   | read  | Discovery                               |


**Agent rule:** Use `execute_operational_skill` for actions, not raw `think` or `query`.

---



## 4. Architecture — How Each Phase Works



### Phase 1 — Skill Compilation

Each skill version stores:

- **prose_judgment** — natural-language edge-case guidance
- **structured_policy** — JSON rules (`if amount < 500 → auto_approve`)
- **provenance** — source page slugs, compiler, approver, timestamps
- **version** — immutable v1, v2, v3 history (draft → approved → superseded)



### Phase 2 — Confidence Gating


| Risk tier       | Default threshold | Behavior                                  |
| --------------- | ----------------- | ----------------------------------------- |
| `informational` | 0.50              | Low bar; read-only guidance               |
| `low_stakes`    | 0.70              | Standard ops                              |
| `high_stakes`   | 0.85              | Below threshold → requires approval token |


Draft skills are **always refused** for remote/untrusted agents.

### Phase 3 — Conflict Resolution

- `serve_last_approved` (default) — keep serving last approved version during conflict
- `block` — refuse all execution until resolved
- Resolution triggers automatic re-compilation → new draft version



### Phase 4 — Action Audit Trail

Every execution logs: skill slug, version, confidence, action taken, result, agent ID.  
Separate from GBrain's citation trail (knowledge provenance vs action provenance).

### Phase 5 — Closed Feedback Loop

Corrections write evidence pages under `skills/corrections/`.  
After N corrections (default: 2), auto-triggers re-compilation.

---



## 5. Industry Use Cases — Who Uses This and How



### Customer Support (50–500 agents)

- Compile refund, escalation, and SLA skills from existing Notion/Confluence wikis
- Agents execute against approved v3 refund policy, not hallucinated answers
- Audit trail for SOC2 / ISO 27001 compliance reviews



### Fintech / Insurance (high-stakes)

- `high_stakes` tier + approval tokens for claims above threshold
- Conflict queue when policy docs disagree
- Full action provenance for regulators



### HR / People Ops

- Compile onboarding, PTO, and benefits procedures
- New hires' AI assistants load approved skills, not stale Slack threads
- Human corrections update institutional knowledge automatically



### Legal / Compliance teams

- Version history proves which policy version was active when agent acted
- Block policy during open contradictions
- Export audit via `gbrain skill audit --json`



### Enterprise IT (1000+ employees)

- Postgres + pgvector via Supabase for multi-machine sync
- Per-source isolation for team brains (`--source`, `GBRAIN_SOURCE`)
- OAuth-scoped MCP for department-level access control



### Startup (5–20 people, YC-style)

- PGLite zero-config default — no infra needed
- One domain first (e.g. support refunds only)
- Design partner workflow before scaling to all ops

---



## 6. Running Tests

```bash
# Operational skills suite (11 tests, all phases)
bun test test/operational-skills.test.ts

# Full unit suite (requires Docker for some E2E)
bun run test
```

---



## 7. Rebrand to ModusBrain — Step-by-Step Guide

When you're ready to rebrand from `gbrain` → `modusbrain`:

### Step 1 — Binary & package name


| File           | Change                                                                     |
| -------------- | -------------------------------------------------------------------------- |
| `package.json` | `"name": "modusbrain"`, update `bin.gbrain` → `"modusbrain": "src/cli.ts"` |
| `VERSION`      | Keep semver, optionally reset to `1.0.0.0` for launch                      |
| `src/cli.ts`   | Update help text references                                                |
| Build script   | `bun build --compile --outfile bin/modusbrain src/cli.ts`                  |




### Step 2 — Find and replace (safe order)

```bash
# 1. User-facing strings only (NOT internal module paths on first pass)
rg -l 'GBrain' --glob '!node_modules' --glob '!bun.lock' --glob '!CHANGELOG.md'
rg -l 'gbrain' docs/ README.md skills/ company-brain-rfs-analysis.md

# 2. CLI command string in docs/help (keep `gbrain` as alias during transition)
# Replace in: README.md, docs/, skills/, AGENTS.md, INSTALL_FOR_AGENTS.md

# 3. Config directory (breaking change — document migration)
# ~/.gbrain → ~/.modusbrain
# Update: src/core/config.ts paths, docs/guides/

# 4. Environment variables
# GBRAIN_* → MODUSBRAIN_* (keep GBRAIN_* as deprecated aliases for one release)

# 5. MCP / API identifiers
# gbrain-skillpack-v1 → modusbrain-skillpack-v1 (new major, keep reader for old)
```



### Step 3 — Keep GBrain attribution

In `README.md` and `LICENSE`:

```markdown
ModusBrain is built on [GBrain](https://github.com/garrytan/gbrain) (MIT License).
Copyright (c) 2024 Garry Tan — GBrain engine portions used under MIT.
Copyright (c) 2026 Your Company — ModusBrain extensions.
```



### Step 4 — Website rebrand checklist

- [ ] Domain: modusbrain.com (or your choice)
- [ ] Hero: "The company brain agents can safely execute against"
- [ ] Feature sections map to Phases 1–5 above
- [ ] "Built on GBrain" footer badge with link
- [ ] Docs site: replace `gbrain` CLI examples with `modusbrain`
- [ ] GitHub repo rename or new org repo with attribution in README



### Step 5 — Schema / DB (no breaking changes needed)

Operational skills tables use `operational_*` prefix — no rename required.  
Schema pack `modusbrain-ops` is already named for the product.

### Step 6 — Verify after rebrand

```bash
bun run typecheck
bun test test/operational-skills.test.ts
modusbrain doctor
modusbrain opskill list
```

---



## 8. Suggested MVP / YC Application Sequence

1. ✅ Fork GBrain, retain license — done
2. ✅ Ship Phase 1–5 — done (this implementation)
3. **Next:** Get one design partner on one workflow (refund handling)
4. **Next:** Rebrand to ModusBrain + landing page
5. Apply with usage evidence, not just architecture

---



## 9. One-Line Pitch

> "GBrain solved the hardest 70% of the Company Brain problem. ModusBrain adds versioned, confidence-gated skills that AI agents execute against safely — with audit trails, conflict queues, and a closed feedback loop."

