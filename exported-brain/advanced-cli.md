---
type: concept
title: Advanced CLI Commands
icon: terminal
description: >-
  Advanced operational utilities — quarantine, background jobs, scorecard, and
  more.
---

# Advanced CLI Commands

These commands are advanced operational utilities that complement the core sync/search/opskill workflow. They are designed for brain administrators, power users, and contributors.

---

## Quarantine

The quarantine surface manages the content-quality gate. ModusBrain flags pages as either:
- **Quarantined** — Hidden from all search results; high-confidence junk or malformed content.
- **Content-flagged** — Still searchable, but warned; typically fuzzy, oversize, or markup-heavy pages.

```bash
# List all quarantined pages
modusbrain quarantine list

# Include content-flagged pages in the listing
modusbrain quarantine list --include-flagged --json

# Scan all brain pages and apply quarantine markers automatically
modusbrain quarantine scan --apply

# Clear the quarantine/flag marker for a specific page
modusbrain quarantine clear <page-slug>
```

**Key flags for `scan`:**

| Flag | Description |
| :--- | :--- |
| `--apply` | Write quarantine markers to matching pages (dry-run without this flag) |
| `--limit N` | Maximum pages to scan |
| `--no-embed` | Skip re-embedding after clearing markers |
| `--json` | Output results as JSON |

---

## Founder Scorecard

Computes a four-metric founder/entity scorecard from typed fact claims and historical takes. This is a pure aggregation command — zero LLM calls, zero schema changes.

```bash
# Full scorecard for an entity
modusbrain founder scorecard alice-example

# Filter to a specific date window
modusbrain founder scorecard alice-example --since 2024-01-01 --until 2024-06-30

# JSON output (stable schema_version: 1)
modusbrain founder scorecard alice-example --json
```

**Output metrics:**

| Metric | Description |
| :--- | :--- |
| `claim_accuracy` | Ratio of predicted/accurate outcomes from resolved takes |
| `consistency` | Score based on metric-value change rate across typed facts |
| `growth_trajectory` | Per-metric direction (up/down/flat) with latest delta percentage |
| `red_flags` | List of regressions, narrative drift events, and missed predictions |

<Note>
  This command requires at least one entity page with typed metric claims in its `## Facts` fence (columns: `metric`, `value`, `unit`, `period`). Empty entities return a `max_reachable_score` ceiling.
</Note>

---

## Jobs

The `jobs` command is ModusBrain's background async task manager (the Minions system). It manages job submission, execution, supervision, and monitoring.

### Submitting Jobs

```bash
# Submit a job by name
modusbrain jobs submit embed --params '{"source_id": "default"}'

# Submit with follow mode (stream output until complete)
modusbrain jobs submit sync --params '{"source_id": "default"}' --follow

# Submit with custom priority and retry settings
modusbrain jobs submit extract \
  --priority 10 \
  --max-attempts 3 \
  --backoff-type exponential
```

### Listing and Managing Jobs

```bash
# List all jobs
modusbrain jobs list

# Filter by status
modusbrain jobs list --status failed

# Get details for a specific job
modusbrain jobs get <job-id>

# Cancel a running job
modusbrain jobs cancel <job-id>

# Retry a failed job
modusbrain jobs retry <job-id>

# Show queue statistics
modusbrain jobs stats

# Clean up old completed jobs
modusbrain jobs prune --older-than 30d
```

### Running Workers

```bash
# Start a worker process (processes jobs from the queue)
modusbrain jobs work --concurrency 2

# Run the supervisor (auto-restarts workers on crash)
modusbrain jobs supervisor start --concurrency 2 --detach

# Check supervisor status
modusbrain jobs supervisor status

# Gracefully stop the supervisor
modusbrain jobs supervisor stop
```

**Built-in job handler types:** `sync`, `embed`, `lint`, `import`, `extract`, `backlinks`, `autopilot-cycle`, `shell`.

---

## Jobs Watch

Live TTY dashboard for monitoring the Minions job queue in real-time. Refreshes every second.

```bash
# Open the live ANSI dashboard (TTY mode)
modusbrain jobs watch

# One-shot JSON snapshot
modusbrain jobs watch --json

# Stream continuously
modusbrain jobs watch --follow
```

**Dashboard shows:**
- Per-job-type throughput totals (last 24 hours)
- Queue health (waiting / active / stalled counts)
- Rate-lease utilization (last 1 hour)
- Top error clusters (last 24 hours)
- Budget owners currently in flight

| Context | Behavior |
| :--- | :--- |
| TTY terminal | Live ANSI dashboard with cursor management |
| Non-TTY (piped) | One human-readable plain-text snapshot, then exits |
| Any + `--json` | JSON snapshot, one-shot |
| Any + `--follow` | Continuous streaming (JSONL with `--json`) |

---

## Search Diagnose

Runs a diagnostic probe on the search pipeline for a given query to help debug unexpected retrieval results:

```bash
modusbrain search diagnose "your query here"
```

Shows the full pipeline breakdown: intent classification, query expansion candidates, fusion weights, and the top matching pages with scores.

---

## Source Harden

Validates and hardens registered source configurations, checking for path issues, missing dotfiles, or misconfigured sync settings:

```bash
modusbrain sources harden
```

Useful after migrating a brain between machines or renaming source directories.
