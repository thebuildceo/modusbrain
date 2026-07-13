# ModusBrain

**The company brain agents can safely execute against.**

ModusBrain compiles scattered company knowledge — policies, runbooks, wikis, tickets — into **versioned operational skills** with confidence gating, human approval workflows, conflict queues, and full action audit trails. Agents execute against approved skills, not fresh chat hallucinations.

> Built on the open-source [ModusBrain](https://github.com/garrytan/gbrain) engine (MIT License). ModusBrain handles retrieval, graph, and freshness; ModusBrain adds the safe-execution layer for autonomous company operations.

**Domain:** [modusbrain.com](https://modusbrain.com) · **Launch playbook:** [MODUSBRAIN_LAUNCH.md](./MODUSBRAIN_LAUNCH.md) · **Technical guide:** [company-brain-rfs-analysis.md](./company-brain-rfs-analysis.md)

---

## Quick start

```bash
# Install (Bun)
curl -fsSL https://bun.sh/install | bash
cd modusbrain && bun install --ignore-scripts
bun link   # or: bun install -g github.com/your-org/modusbrain

# Initialize brain (PGLite, zero-config)
modusbrain init
modusbrain apply-migrations --yes
modusbrain config set schema_pack modusbrain-ops

# Operational skills — compile → approve → execute
modusbrain opskill compile "refund handling"
modusbrain opskill approve refund-handling --by you@company.com
modusbrain opskill execute refund-handling \
  --task "Process $300 refund" --context '{"amount":300}'
modusbrain opskill audit --json
```

The legacy `modusbrain` CLI alias still works during migration.

---

## What ModusBrain adds (5 phases)

| Phase | Capability |
|---|---|
| **1. Compile** | Draft versioned skills from brain content (prose + structured rules) |
| **2. Gate** | Risk tiers, confidence scores, approval before high-stakes actions |
| **3. Conflicts** | Owner queue, serve-last-approved vs block policies |
| **4. Audit** | Log every agent action: skill, version, confidence, result |
| **5. Feedback** | Human corrections → evidence → auto re-compile |

Full ModusBrain capabilities (hybrid search, synthesis, graph, dream cycle, MCP) remain available under the hood.

---

## CLI commands

```bash
modusbrain opskill compile "<topic>"     # Draft skill from brain pages
modusbrain opskill approve <slug>        # Promote to active
modusbrain opskill execute <slug>        # Run with confidence gating
modusbrain opskill audit                 # Action audit trail
modusbrain opskill correct <slug>        # Feedback loop
modusbrain search "..."                  # Hybrid RAG
modusbrain think "..."                   # Synthesis with citations
modusbrain doctor                        # Health check
```

Run `modusbrain --help` for the full command list. Deep engine docs: [`llms.txt`](llms.txt).

---

## Config & migration

| Setting | Value |
|---|---|
| Config dir | `~/.modusbrain` (falls back to `~/.modusbrain` if present) |
| Env vars | `MODUSBRAIN_*` preferred; `MODUSBRAIN_*` legacy alias still honored |
| Source dotfile | `.modusbrain-source` (legacy `.modusbrain-source` still read) |
| Branding module | `src/core/branding.ts` (single source of truth) |

---

## For agents

- [`AGENTS.md`](./AGENTS.md) — install + operating protocol  
- [`MODUSBRAIN_LAUNCH.md`](./MODUSBRAIN_LAUNCH.md) — website, Mintlify docs, pricing, launch checklist  
- [`company-brain-rfs-analysis.md`](./company-brain-rfs-analysis.md) — architecture + usage  

MCP operations for operational skills: `compile_operational_skill`, `execute_operational_skill`, `list_operational_skills`.

---

## Attribution

ModusBrain extends [ModusBrain](https://github.com/garrytan/gbrain) (MIT License). See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).

---

## Development

```bash
bun install --ignore-scripts
bun test test/operational-skills.test.ts test/branding.test.ts
bun run build    # → bin/modusbrain
bun run src/cli.ts opskill --help
```
