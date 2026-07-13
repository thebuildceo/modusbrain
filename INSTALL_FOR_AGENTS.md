# ModusBrain Installation Guide for AI Agents

Read this entire file, then follow the steps. Ask the user for API keys when needed.
Target: ~30 minutes to a fully working brain.

## Step 0: If you are not Claude Code

Read `AGENTS.md` at the repo root first. It's the non-Claude-agent operating
protocol (install, read order, trust boundary, common tasks). Claude Code reads
`CLAUDE.md` automatically and can skip ahead.

If you fetched this file by URL without cloning yet, the companion files live at:
- `https://raw.githubusercontent.com/garrytan/modusbrain/master/AGENTS.md` — start here
- `https://raw.githubusercontent.com/garrytan/modusbrain/master/llms.txt` — full doc map
- `https://raw.githubusercontent.com/garrytan/modusbrain/master/llms-full.txt` — same map, inlined

## Step 1: Install ModusBrain

Default path (Bun is required — modusbrain is a Bun + TypeScript runtime):

```bash
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
bun install -g github:garrytan/modusbrain
```

Verify: `modusbrain --version` should print a version number. If `modusbrain` is not found,
restart the shell or add the PATH export to the shell profile.

> **If `bun install -g` aborts or `modusbrain doctor` reports `schema_version: 0`** (Bun
> occasionally blocks the top-level postinstall hook on global installs, so schema
> migrations don't run automatically), the CLI prints a recovery hint pointing at
> [#218](https://github.com/garrytan/gbrain/issues/218). Run `modusbrain apply-migrations --yes`
> to recover. If that doesn't work, fall back to the deterministic install path:
>
> ```bash
> git clone https://github.com/garrytan/gbrain.git ~/modusbrain && cd ~/modusbrain
> bun install && bun link
> ```

## Step 2: API Keys

Ask the user for these. modusbrain defaults to the ZeroEntropy embedding + reranker stack
(as of v0.36.2.0); OpenAI/Voyage are still supported as fallbacks via `modusbrain config
set embedding_model <provider:model>`.

```bash
export ZEROENTROPY_API_KEY=ze-...     # default embedding + reranker (v0.36.2.0+)
export OPENAI_API_KEY=sk-...          # fallback for vector search; also used for chat models
export ANTHROPIC_API_KEY=sk-ant-...   # optional, improves search quality via query expansion
```

Save to shell profile or `.env`. Keys are picked up by `modusbrain config set` automatically
or can be stored in `~/.modusbrain/config.json` (file plane). Without any embedding provider,
keyword search still works. Without Anthropic, search works but skips query expansion.

## Step 3: Create the Brain

```bash
modusbrain init                           # PGLite, no server needed
modusbrain doctor --json                  # verify all checks pass
```

The user's markdown files (notes, docs, brain repo) are SEPARATE from this tool repo.
Ask the user where their files are, or create a new brain repo:

```bash
mkdir -p ~/brain && cd ~/brain && git init
```

Read `~/modusbrain/docs/MODUSBRAIN_RECOMMENDED_SCHEMA.md` and set up the MECE directory
structure (people/, companies/, concepts/, etc.) inside the user's brain repo,
NOT inside ~/modusbrain.

## Step 3.5: Confirm search mode with the user (DO NOT SKIP)

`modusbrain init` auto-applied a default search mode (`tokenmax` unless your subagent
tier is Haiku-class or no OpenAI key is configured). The init output included the
cost matrix below preceded by `[AGENT]` markers. You must NOT silently accept the
default. Stop and ask the operator.

**Present this matrix verbatim:**

```
Per-query cost @ 10K queries/mo (typical single-user volume):

                  Haiku 4.5     Sonnet 4.6    Opus 4.7
                  ($1/M)        ($3/M)        ($5/M)
  conservative    $40/mo        $120/mo       $200/mo
  balanced        $100/mo       $300/mo       $500/mo
  tokenmax        $200/mo       $600/mo       $1,000/mo

(scales linearly: ×10 for 100K/mo, ÷10 for 1K. 25x corner-to-corner spread.
 Natural diagonal pairings — cheap/cheap → frontier/frontier — span ~4x.)
```

**Ask the operator (paraphrase if needed):**

> Your modusbrain just installed with search mode `<auto-applied default>`. This is
> a one-time setup decision that controls retrieval payload size. Which mode
> do you want?
>
>   1) conservative — tight 4K budget, no LLM expansion, 10 chunks max.
>      Best for Haiku subagents, cost-sensitive setups, high-volume loops.
>
>   2) balanced — 12K budget, no expansion, 25 chunks. Sonnet-tier sweet spot.
>
>   3) tokenmax (recommended default — preserves v0.31.x retrieval shape) —
>      no budget, LLM expansion ON, 50 chunks. Best for Opus/frontier models.
>
> Cost depends on BOTH the mode AND the downstream model you run. See the
> matrix above for the 9-cell breakdown.

If the operator picks a non-default mode, run:
```bash
modusbrain config set search.mode <mode>
```

If they pick tokenmax AND want to preserve the literal v0.31.x default
(limit=20 instead of tokenmax's 50), also run:
```bash
modusbrain config set search.searchLimit 20
```

Verify the choice with `modusbrain search modes` before continuing.

**Why this matters:** the cost spread between corners of the matrix is 25x.
An agent that silently accepts the default and starts running queries against
a user who didn't expect tokenmax-class context loads can rack up surprise
spend. Confirm before continuing.

## Step 4: Import and Index

```bash
modusbrain import ~/brain/ --no-embed     # import markdown files
modusbrain embed --stale                  # generate vector embeddings
modusbrain query "key themes across these documents?"
```

## Step 4.5: Wire the Knowledge Graph

If the user already had a brain repo (Step 3 imported existing markdown), backfill
the typed-link graph and structured timeline. This populates the `links` and
`timeline_entries` tables that future writes will maintain automatically.

```bash
modusbrain extract links --source db --dry-run | head -20    # preview
modusbrain extract links --source db                         # commit
modusbrain extract timeline --source db                      # dated events
modusbrain stats                                             # verify links > 0
```

For brand-new empty brains, skip this step — auto-link populates the graph as the
agent writes pages going forward. There is nothing to backfill yet.

After this step:
- `modusbrain graph-query <slug> --depth 2` works (relationship traversal)
- Search ranks well-connected entities higher (backlink boost)
- Every future `put_page` auto-creates typed links and reconciles stale ones

If a user has a very large brain (>10K pages), `extract --source db` is idempotent
and supports `--since YYYY-MM-DD` for incremental runs.

### Obsidian-style bare wikilinks (opt-in)

If the user imported an Obsidian or Notion vault that uses **bare** `[[note-name]]`
wikilinks — where `[[struktura]]` written in one folder means the page that lives
at `projects/struktura.md` in another — ModusBrain does NOT connect those by default.
Out of the box it only resolves path-qualified refs like `[[projects/struktura]]`,
so a vault full of bare links shows up as a thin, broken graph. Turn on basename
resolution so the cross-folder links connect:

```bash
modusbrain config set link_resolution.global_basename true
modusbrain extract links --source db          # re-run so the new edges land
```

`modusbrain doctor` surfaces a `link_resolution_opportunity` hint with the exact count
("47 of 60 bare wikilinks would resolve") so you know whether it's worth enabling
before you flip it. When a bare name matches more than one page (`[[struktura]]` →
both `projects/struktura` and `archive/struktura`), ModusBrain emits one edge to each
rather than guessing a winner — review and prune the duplicates with
`modusbrain graph-query <slug>`. The mode is also honored on the filesystem-walk path
(`modusbrain extract links` with no `--source db`) and by auto-link on every future
`put_page`.

## Step 5: Load Skills

If you're running an agent platform (OpenClaw, Hermes, or any repo with a workspace),
scaffold the bundled skills into it:

```bash
cd /path/to/agent/workspace
modusbrain skillpack scaffold --all       # copy 43 curated skills + RESOLVER.md
```

Scaffolded skills are first-class files in your repo. Edit freely; re-running scaffold
refuses to overwrite anything that exists. Use `modusbrain skillpack reference <name>` to
diff against modusbrain's bundle when you want upstream improvements. (The legacy
`modusbrain skillpack install` managed-block model was retired in v0.36.0.0 — run
`modusbrain skillpack migrate-fence` once if upgrading from an older release.)

Whether you scaffolded or not, read `skills/RESOLVER.md` (in your workspace, or the
bundled copy at `~/modusbrain/skills/RESOLVER.md` when running from the cloned repo). It's
the skill dispatcher — tells you which skill to read for any task. Save this to your
memory permanently.

The three most important skills to adopt immediately:

1. **Signal detector** (`skills/signal-detector/SKILL.md`) — fire this on EVERY
   inbound message. It captures ideas and entities in parallel. The brain compounds.

2. **Brain-ops** (`skills/brain-ops/SKILL.md`) — brain-first lookup on every response.
   Check the brain before any external API call.

3. **Conventions** (`skills/conventions/quality.md`) — citation format, back-linking
   iron law, source attribution. These are non-negotiable quality rules.

## Step 6: Identity (optional)

Run the soul-audit skill to customize the agent's identity:

```
Read skills/soul-audit/SKILL.md and follow it.
```

This generates SOUL.md (agent identity), USER.md (user profile), ACCESS_POLICY.md
(who sees what), and HEARTBEAT.md (operational cadence) from the user's answers.

If skipped, minimal defaults are installed automatically.

## Step 7: Recurring Jobs

Set up using your platform's scheduler (OpenClaw cron, Railway cron, crontab), or skip the
platform glue entirely with `modusbrain autopilot --install` (built-in self-maintaining daemon):

- **Live sync** (every 15 min): `modusbrain sync --repo ~/brain && modusbrain embed --stale`
  — or `modusbrain sync --watch` for a continuous loop.
- **Auto-update** (daily): `modusbrain check-update --json` (tell user, never auto-install).
- **Dream cycle** (nightly): `modusbrain dream` runs the 8-phase overnight maintenance cycle.
  Entity sweep, citation fixes, memory consolidation, plus (v0.23+) overnight conversation
  synthesis and cross-session pattern detection. One cron-friendly command. This is what
  makes the brain compound. Do not skip it. See `docs/guides/cron-schedule.md` for the
  full protocol.
- **Weekly**: `modusbrain doctor --json && modusbrain embed --stale`

## Step 8: Integrations

Run `modusbrain integrations list`. Each recipe in `~/modusbrain/recipes/` is a self-contained
installer. It tells you what credentials to ask for, how to validate, and what cron
to register. Ask the user which integrations they want (email, calendar, voice, Twitter).

Verify: `modusbrain integrations doctor` (after at least one is configured)

## Step 9: Verify

Read `docs/MODUSBRAIN_VERIFY.md` and run all 7 verification checks. Check #4 (live sync
actually works) is the most important.

## Upgrade

If you installed via `bun install -g`:

```bash
modusbrain upgrade                        # self-updates the binary, runs schema migrations,
                                      # and prints post-upgrade notes for the version range
```

If you installed via `git clone + bun link`:

```bash
cd ~/modusbrain && git pull origin master && bun install
modusbrain apply-migrations --yes         # apply schema migrations (idempotent)
modusbrain post-upgrade                   # show migration notes for the version range
```

Then read `~/modusbrain/skills/migrations/v<NEW_VERSION>.md` (and any intermediate
versions you skipped) and run any backfill or verification steps it lists. Skipping
this is how features ship in the binary but stay dormant in the user's brain.

**v0.32.3 search modes (one-time upgrade prompt):** if the user's brain was
created before v0.32.3, `modusbrain post-upgrade` prints a banner including the
9-cell cost matrix (mode × downstream model) preceded by `[AGENT]` markers.
**Do NOT silently move past the banner.** Present the matrix to the operator
verbatim, ask which mode they want (recommended default: `tokenmax` to preserve
v0.31.x retrieval shape), then run `modusbrain config set search.mode <mode>`. See
Step 3.5 above for the full ask-the-user protocol — the upgrade path uses the
same matrix and same default.

For v0.12.0+ specifically: if your brain was created before v0.12.0, run
`modusbrain extract links --source db && modusbrain extract timeline --source db` to
backfill the new graph layer (see Step 4.5 above).

For v0.12.2+ specifically: if your brain is Postgres- or Supabase-backed and
predates v0.12.2, the `v0_12_2` migration runs `modusbrain repair-jsonb`
automatically during `modusbrain post-upgrade` to fix the double-encoded JSONB
columns. PGLite brains no-op. If wiki-style imports were truncated by the old
`splitBody` bug, run `modusbrain sync --full` after upgrading to rebuild
`compiled_truth` from source markdown.

## v0.42.0+ onboard surface (NEW)

`modusbrain onboard` is the activation surface modusbrain did not have before.
Once your brain has any content, run `modusbrain onboard --check --json` to
see structured recommendations across 5 brain-health axes (orphans,
stale embeddings, entity link coverage, timeline coverage, takes count).

**On first connect (after `modusbrain init`):**
```bash
modusbrain onboard --check --json
```
The JSON envelope (`schema_version: 1`) carries `recommendations[]` with
`apply_policy` per item: `auto_apply` (safe to run unattended),
`prompt_required` (needs explicit user consent), or `manual_only`
(LLM-bearing, user must run themselves).

**After every `modusbrain upgrade`:**
```bash
modusbrain onboard --check --json
```
New versions may surface new opportunities. The post-upgrade banner
nudges the user when it runs, but agents should re-probe as a hygiene
step regardless.

**Unattended remediation (cron / autopilot):**
```bash
modusbrain onboard --auto --max-usd 5
```
Refuses without `--max-usd N`. Runs auto-eligible items only. The
autopilot daemon also consults onboard recommendations on its tick — no
explicit agent action needed for the autonomous path.

**Remote / federated brain installs (MCP):**
The `run_onboard` MCP op (admin scope) lets thin-client agents probe
brain health + drive remediation over OAuth-authenticated MCP. Protected
LLM-bearing handlers (synthesize, patterns, consolidate, takes-bootstrap,
contextual_reindex_per_chunk) require the additional `run_protected_onboard`
scope — admin alone is insufficient. The MCP op returns
`skipped_missing_scope[]` listing what would have run with the right
grants.

**Privacy + consent gates:**
- `modusbrain takes extract --from-pages` sends concept/atom/lore/briefing/
  writing/originals page content to your configured chat model (default
  Anthropic Haiku). Refuses to run unless `takes.bootstrap_enabled=true`
  is set in config AND `--yes` is passed. Two-gate opt-in by design.
- Autopilot's auto-apply tier for takes-bootstrap stays `manual_only`
  until v0.42.1's eval gate (do not bypass).

**Suppress nudges in CI / scripted environments:**
```bash
export MODUSBRAIN_NO_ONBOARD_NUDGE=1
```
Init + upgrade banners auto-skip in non-TTY too.
