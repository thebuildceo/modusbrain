---
type: concept
title: Eval & Benchmarking
icon: flask
description: Test and score your ModusBrain retrieval quality with the built-in eval suite.
---

# Eval & Benchmarking

ModusBrain ships a complete retrieval evaluation suite so you can measure, track, and gate search quality. This is essential before shipping any retrieval change — embedding model swap, reranker tuning, or fusion weight adjustments.

<Info>
  Each eval subcommand spins up an isolated in-memory PGLite instance per run. Your `~/.modusbrain` brain is **never opened or modified** during evaluations.
</Info>

---

## Eval Subcommands

All eval commands are invoked as `modusbrain eval <subcommand>`:

| Subcommand | What it does |
| :--- | :--- |
| `whoknows <fixture.jsonl>` | Grade expertise routing — checks if the brain correctly identifies the right knowledge holder per query |
| `longmemeval <dataset.jsonl>` | Benchmark long-context memory recall against a standard ground-truth dataset |
| `trajectory <entity-slug>` | Analyze typed-fact claim history for an entity over time; flags regressions |
| `suspected-contradictions` | Surface document pairs in your brain that likely contradict each other |
| `export` | Export captured query rows to a portable NDJSON baseline file |
| `replay` | Replay a captured NDJSON baseline against your current retrieval pipeline |
| `gate` | CI regression gate — fail if retrieval quality degrades vs. a baseline or qrels |
| `compare` | Side-by-side diff of two NDJSON baselines |
| `retrieval-quality` | Gold query set benchmark against your hybrid retrieval pipeline |
| `cross-modal` | Evaluate unified text + image retrieval quality |
| `brainstorm` | Grade brainstorm + LSD session output quality on three axes |
| `run-all` | Run the full eval suite sequentially with a comparison report |

---

## WhoKnows

The `whoknows` eval checks whether your brain correctly routes queries to the right knowledge holder. It runs two layers:

- **Layer 1** — Hand-labeled fixture hit rate (minimum 80% required to pass).
- **Layer 2** — Replay of captured eval queries with set-Jaccard@3 regression check (minimum 0.4 mean).

```bash
# Run against the built-in fixture
modusbrain eval whoknows test/fixtures/whoknows-eval.jsonl

# Run against a custom fixture and output JSON
modusbrain eval whoknows ./my-eval-fixtures.jsonl --json

# Skip the Layer 2 replay regression gate
modusbrain eval whoknows ./my-eval-fixtures.jsonl --skip-replay
```

**Fixture format** — one JSON object per line:
```json
{ "query": "Who handles enterprise onboarding?", "expected": "alice-example" }
```

**Exit codes:** `0` = both gates pass, `1` = at least one gate failed, `2` = config error.

---

## LongMemEval

Benchmarks long-context memory recall against the standard [LongMemEval](https://arxiv.org/abs/2410.10813) academic dataset. Each question runs in an isolated in-memory brain:

```bash
# Run the full benchmark (500 questions; takes 20–60 minutes)
modusbrain eval longmemeval ./dataset.jsonl

# Limit to first 20 questions during development
modusbrain eval longmemeval ./dataset.jsonl --limit 20

# Retrieval only — skip LLM answer generation
modusbrain eval longmemeval ./dataset.jsonl --retrieval-only --output ./results.jsonl

# Per-question-type breakdown
modusbrain eval longmemeval ./dataset.jsonl --by-type
```

**Key flags:**

| Flag | Description |
| :--- | :--- |
| `--limit N` | Run only the first N questions |
| `--model M` | Override the answer-generation model |
| `--retrieval-only` | Skip LLM generation; emit retrieved sessions only |
| `--top-k K` | Retrieve K sessions per question (default: 8) |
| `--mode conservative\|balanced\|tokenmax` | Search mode |
| `--expansion` | Enable multi-query expansion (costs one extra LLM call per question) |
| `--resume-from FILE` | Skip question IDs already present in a prior run output |
| `--output FILE` | Write JSONL to a file instead of stdout |

---

## Trajectory

Shows the chronological history of typed metric claims for a specific entity — MRR, ARR, team size, and more — and flags regressions.

```bash
# Full trajectory for an entity
modusbrain eval trajectory alice-example

# Filter to a specific metric
modusbrain eval trajectory alice-example --metric mrr

# Filter to a date window
modusbrain eval trajectory alice-example --since 2024-01-01 --until 2024-12-31

# JSON output (stable schema_version: 1)
modusbrain eval trajectory alice-example --json
```

---

## Suspected Contradictions

Samples top-K retrieval pairs and uses an LLM judge to classify each pair. Results are cached to the `eval_contradictions_cache` table and can be trended over time.

```bash
# Run a single probe for a query
modusbrain eval suspected-contradictions \
  --query "What is our refund policy?" \
  --top-k 5

# Run from captured eval queries
modusbrain eval suspected-contradictions --from-capture --limit 20

# Review the results from the most recent run
modusbrain eval suspected-contradictions review --severity medium

# Show a trend chart of contradiction rates over the past 30 days
modusbrain eval suspected-contradictions trend --days 30 --json
```

**Classification outputs:** `no_contradiction`, `contradiction`, `temporal_supersession`, `temporal_regression`, `temporal_evolution`, `negation_artifact`.

---

## Capture → Publish → Gate Loop

The full retrieval CI loop for making sure your changes don't break search quality:

```bash
# Step 1: Capture live queries from your brain
modusbrain eval export --limit 200 --tool query > /tmp/captured.ndjson

# Step 2: Publish a named baseline before your change
mkdir -p ~/.modusbrain/baselines
modusbrain bench publish \
  --from /tmp/captured.ndjson \
  --to ~/.modusbrain/baselines/my-baseline.ndjson \
  --label "pre-refactor-$(date +%Y%m%d)"

# Step 3: Gate against the baseline (runs on CI after your change)
modusbrain eval gate \
  --baseline ~/.modusbrain/baselines/my-baseline.ndjson

# Step 4: Compare two runs side-by-side
modusbrain eval compare ./before.ndjson ./after.ndjson
```

<Warning>
  Public baselines in shared repositories must use **synthetic fixture data only** (placeholder names like `alice-example`, `widget-co`). Never export real user captures to a public baseline.
</Warning>

---

## Replay

Replay a previously captured NDJSON baseline against your current brain to detect regressions:

```bash
modusbrain eval replay --against /tmp/captured.ndjson
```

Outputs Jaccard similarity, top-1 stability, and latency multiplier deltas vs. the original capture.
