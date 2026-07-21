---
title: Brains & Sources
description: "The two-axis model: which brain and which source every query routes on."
icon: database
---

# Brains and Sources — the mental model

ModusBrain has two orthogonal axes for organizing knowledge. Users and agents both
need to understand both of them, or queries misroute silently.

**TL;DR:**
- A **brain** is a database. You can have many.
- A **source** is a named repo of content *inside* a brain. One brain can hold many.
- `--brain &lt;id&gt;` picks WHICH DATABASE.
- `--source &lt;id&gt;` picks WHICH REPO WITHIN that database.
- They're independent. You can target any combination.

---

## The two axes

### Brains (the DB axis)

A **brain** is one database — PGLite file, self-hosted Postgres, or Supabase.
Each brain has:
- Its own `pages` table, `chunks` table, `embeddings`, etc.
- Its own OAuth surface if served over HTTP MCP (v0.19+, PR 2).
- Its own separate lifecycle, backup, access control.

Brains are enumerated by:
- **host** — your default brain, configured in `~/.modusbrain/config.json`.
- **mounts** — additional brains registered in `~/.modusbrain/mounts.json` via
  `modusbrain mounts add &lt;id&gt;` (v0.19+).

Routing: `--brain &lt;id&gt;`, `MODUSBRAIN_BRAIN_ID`, `.modusbrain-mount` dotfile, or
longest-path match against registered mount paths. Falls back to `host`.

### Sources (the repo axis, v0.18.0+)

A **source** is a named content repo *inside* one brain. Every `pages` row
carries a `source_id`. Slugs are unique per source, not globally.

Example: in one brain, the slug `topics/ai` can exist under `source=wiki`
AND under `source=gstack` — they're different pages.

Routing: `--source &lt;id&gt;`, `MODUSBRAIN_SOURCE`, `.modusbrain-source` dotfile, or
registered `local_path` match in the `sources` table.

### When does each axis move?

| You want to | Adjust |
|---|---|
| Work in a different repo within the same brain (wiki → gstack notes) | `--source` |
| Query a team-published brain that isn't yours | `--brain` |
| Isolate a topic so it never leaks into personal search | `--source` with `federated=false` |
| Share a brain with teammates | `--brain` (mount the team brain) |
| Add a new repo to your personal brain | `--source` via `modusbrain sources add` |
| Add a team brain | `--brain` via `modusbrain mounts add` |

**Rule of thumb:** if the data owner changes, it's a brain boundary. If the
data owner stays the same but the topic/repo changes, it's a source boundary.

---

## Topology: a single-person developer

Simplest case. One brain, one source.

```
┌─────────────────────────────────────────┐
│  host brain (~/.modusbrain)                 │
│  ├── source: default (federated=true)   │
│  │   └── all pages                      │
└─────────────────────────────────────────┘
```

`modusbrain query "retry budgets"` finds everything. No `--brain`, no `--source`
needed.

---

## Topology: a personal brain with multiple repos

You maintain several codebases or writing streams. Each is its own source
inside one brain. Cross-source search is on by default so a query about
"caching" returns hits from every repo.

```
┌──────────────────────────────────────────────┐
│  host brain (~/.modusbrain)                      │
│  ├── source: wiki      (federated=true)      │
│  │   └── personal notes, people, companies   │
│  ├── source: gstack    (federated=true)      │
│  │   └── gstack plans, learnings             │
│  ├── source: openclaw  (federated=true)      │
│  │   └── openclaw docs, memos                │
│  └── source: essays    (federated=false)     │
│      └── draft essays, isolated on purpose   │
└──────────────────────────────────────────────┘
```

Inside `~/openclaw/` the `.modusbrain-source` dotfile pins every command to
`source=openclaw`. Inside `~/gstack/` the dotfile pins to `source=gstack`.
Everything still targets one DB.

Use this topology when:
- You own all the content.
- You want cross-repo search to just work.
- You don't need to share any of it with someone who isn't you.

---

## Topology: personal brain + one team brain

You're on a team that publishes a shared brain. Your personal brain stays
as-is; you mount the team brain alongside it.

```
┌──────────────────────────────────────────────┐
│  host brain (~/.modusbrain)  — YOUR personal DB  │
│  ├── source: wiki                            │
│  ├── source: gstack                          │
│  └── ...                                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  mount: media-team                           │
│  path:   ~/team-brains/media                 │
│  engine: postgres (team's Supabase)          │
│  └── sources: wiki, raw, enriched            │
└──────────────────────────────────────────────┘
```

`modusbrain query "X"` (no flags) → runs against host (your personal brain).
`modusbrain query "X" --brain media-team` → runs against the team's DB.
Inside `~/team-brains/media/` a `.modusbrain-mount` dotfile pins brain to
`media-team` automatically.

Use this topology when:
- You're on a team and someone publishes a brain the team subscribes to.
- You need data isolation between work and personal.
- Different teams/orgs own different brains.

---

## Topology: a CEO-class user with multiple team memberships

You're senior enough to sit across multiple teams. You maintain your personal
brain (with N sources inside) AND mount several work team brains. Each team
brain is itself a multi-source brain in the v0.18.0 sense — organized
internally however the team owner chose.

```
┌──────────────────────────────────────────────┐
│  host brain — YOUR personal DB               │
│  ├── source: wiki                            │
│  ├── source: essays                          │
│  ├── source: gstack                          │
│  └── source: openclaw                        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  mount: media-team (your media team's brain) │
│  └── sources: wiki, pipeline, enriched       │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  mount: policy-team (your policy team's)     │
│  └── sources: wiki, research, letters        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  mount: portfolio (another team's)           │
│  └── sources: companies, deals, diligence    │
└──────────────────────────────────────────────┘
```

Inside each team's checkout, a `.modusbrain-mount` dotfile pins the brain. Inside
a specific subdirectory, a `.modusbrain-source` dotfile pins the source. So `cd
~/team-brains/policy/research && modusbrain query "X"` targets
`brain=policy-team, source=research` with zero flags.

Use this topology when:
- You cross-cut multiple teams.
- Each team owns its own brain with its own access policy.
- You need latent-space federation (agent decides when to query across
  brains), not SQL federation.

Cross-brain queries are **not deterministic** in v0.19. The agent sees the
brain list and re-queries as needed. That's the feature — it keeps debugging
sane and access control clean.

---

## Resolution precedence (one page to remember)

```
WHICH BRAIN (DB)?                    WHICH SOURCE (repo in DB)?
 1. --brain <id>                      1. --source <id>
 2. MODUSBRAIN_BRAIN_ID env               2. MODUSBRAIN_SOURCE env
 3. .modusbrain-mount dotfile             3. .modusbrain-source dotfile
 4. longest-prefix mount path match   4. longest-prefix source path match
 5. (reserved: brains.default v2)     5. sources.default config
 6. fallback: 'host'                  6. fallback: 'default'
```

Both axes follow the same layered pattern on purpose. If you know one, you
know the other.

---

## For agents reading this

- Default assumption when the user asks a question: start in the current
  brain (resolved via the precedence above). Don't jump brains without a
  reason.
- If the user asks a question that crosses topic areas a team might own
  (e.g. "what did Team X decide last week?"), the right move is to *query
  the team's brain explicitly* rather than searching host with "team x".
- Cross-brain federation is YOUR JOB, not the DB's. You have the brain list
  (`modusbrain mounts list`). You decide when to fan out. You synthesize
  findings. You cite `brain:source:slug`.
- When writing a page, respect the brain boundary. A fact about a team's
  work belongs in the team's brain, not in the user's personal brain. Ask
  before writing cross-brain.
- See `skills/conventions/brain-routing.md` for the full decision table.

## For users reading this

- **Default path:** set up your personal brain (`modusbrain init`), add a source
  per repo you care about (`modusbrain sources add gstack --path ~/gstack`).
  You'll almost never need `--brain`.
- **When a team publishes a brain:** `modusbrain mounts add &lt;team-id&gt; --path
  &lt;clone&gt; --db-url &lt;url&gt;` and the `.modusbrain-mount` dotfile in that checkout
  routes queries there automatically.
- **When you are the CEO-class user with multiple team memberships:** mount
  each team brain. Trust the resolver — inside a team's directory the
  dotfile picks the brain, inside a subdirectory the dotfile picks the
  source. The flags are for when you want to query across the boundary
  deliberately.

## Further reading

- v0.18.0 CHANGELOG — introduced `sources` primitive.
- v0.19.0 CHANGELOG (TBD after PR 0+1+2 ship) — introduces `mounts`.
- `docs/mounts/publishing-a-team-brain.md` (PR 2) — how to be the brain
  publisher, not just the subscriber.
