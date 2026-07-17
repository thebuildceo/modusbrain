Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\WINDOWS\system32> cd C:\Users\Shubham\Downloads\gbrain-master\gbrain-master
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.1 — Check CLI is installed and version
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain --version
modusbrain 1.0.1
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.2 — Full system health check
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain doctor
[doctor.db_checks] done
[doctor-categories] unknown check name 'embed_staleness' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'entity_link_coverage' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'timeline_coverage' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'takes_count' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'pack_upgrade_available' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'type_proliferation' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'dangling_aliases' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.

ModusBrain Health Check
===================

Top issues (ranked by cause):
  [FAIL] sync_failures → 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [WARN] embeddings → No embeddings yet. Run: modusbrain embed --stale
  [WARN] jsonb_integrity → Could not check JSONB integrity
  [WARN] pgvector → Could not check pgvector extension
  [WARN] resolver_health → Could not find skills directory
  +2 more — see full list below

  [WARN] resolver_health: Could not find skills directory
  [WARN] retrieval_reflex_health: pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`
  [FAIL] sync_failures: 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [OK] nightly_quality_probe_health: disabled (opt-in). Enable with: modusbrain config set autopilot.nightly_quality_probe.enabled true
  [OK] extract_health: no extractions in last 7 days
  [OK] conversation_facts_backlog: disabled (opt-in). Enable with: modusbrain config set cycle.conversation_facts_backfill.enabled true
  [OK] extract_atoms_backlog: no pages awaiting atom extraction
  [OK] conversation_format_coverage: No conversation-type pages — coverage check not applicable
  [OK] progressive_batch_audit_health: No progressive-batch operations in the last 7 days
  [OK] conversation_parser_probe_health: Skipped (nightly probe is opt-in; enable with `modusbrain config set autopilot.conversation_parser_probe.enabled true`)
  [OK] home_dir_in_worktree: modusbrain home is outside any enclosing git worktree.
  [OK] connection: Connected, 0 pages
  [WARN] pgvector: Could not check pgvector extension
  [OK] rls: Skipped (PGLite — no PostgREST exposure, RLS not applicable)
  [OK] schema_version: Version 123 (latest: 123)
  [OK] rls_event_trigger: Skipped (PGLite — no event trigger support)
  [WARN] embeddings: No embeddings yet. Run: modusbrain embed --stale
  [OK] embedding_provider: zeroentropyai:zembed-1 ✓ 1696ms, 1280 dims, DB aligned
  [OK] embedding_column_registry: Registry healthy: 2 columns (embedding, embedding_image); active='embedding'
  [OK] embedding_env_override: no embedding env overrides set
  [OK] graph_coverage: No entity pages — graph_coverage not applicable (markdown-only brain)
  [OK] brain_score: Brain score 100/100
  [OK] orphan_ratio: Vacuous: 0 entity pages (<100). Orphan ratio not meaningful at this scale.
  [OK] integrity: Sampled 0 pages; no bare-tweet phrases or external links.
  [WARN] jsonb_integrity: Could not check JSONB integrity
  [OK] takes_weight_grid: No takes yet
  [OK] child_table_orphans: All FK-child tables clean (10 tables checked)
  [OK] whoknows_health: whoknows eval fixture present (10 queries). Run `modusbrain eval whoknows test/fixtures/whoknows-eval.jsonl` to grade.
  [OK] cross_modal_modality_backfill: All image-asset chunks have modality=image
  [OK] unified_multimodal_coverage: search.unified_multimodal is off; coverage check N/A
  [OK] markdown_body_completeness: Skipped (raw_data unavailable)
  [OK] oversized_pages: Skipped (No database connection: connect() has not been called. Fix: Run modusbrain init --supabase or modusbrain init --url <connection_string>)
  [OK] scraper_junk_pages: Skipped (No database connection: connect() has not been called. Fix: Run modusbrain init --supabase or modusbrain init --url <connection_string>)
  [OK] content_sanity_audit_recent: No content-sanity events in last 7 days (audit JSONL is local to this host; share MODUSBRAIN_AUDIT_DIR for multi-host visibility)
  [OK] quarantined_pages: No quarantined pages
  [OK] flagged_pages: No flagged pages
  [OK] frontmatter_integrity: No registered sources to scan
  [OK] eval_capture: No capture failures in the last 24h
  [OK] contradictions: No probe runs in the last 7 days. Run `modusbrain eval suspected-contradictions --query "..." --top-k 5` to populate.
  [OK] facts_extraction_health: No facts:absorb failures in the last 24h.
  [OK] effective_date_health: Sample of last 1000 pages clean (no fallback-with-parseable-fm-date, no future-dated, no pre-1990)
  [OK] salience_health: Skipped (no pages have emotional_weight > 0; either fresh install or recompute hasn't run yet)
  [OK] queue_health: Skipped (PGLite — no multi-process worker surface)
  [OK] subagent_capability: Subagent tier resolves to default (claude-sonnet-4-6) — full tool-loop capability
  [OK] facts_health: facts_health(default): 0 active, 0 today, 0 this week, 0 consolidated, top entities —
  [OK] image_assets: No image assets indexed yet
  [OK] ocr_health: OCR not in use (or no images ingested with OCR opt-in)
  [OK] sync_freshness: No federated sources to sync
  [OK] sync_consolidation: Single-source brain — sync --all consolidation not applicable.
  [OK] links_extraction_lag: Extraction lag not applicable (no pages)
  [OK] cycle_freshness: No federated sources to cycle
  [OK] search_mode: Mode: conservative (no per-key overrides — mode bundle is canonical).
  [OK] hidden_by_search_policy: No pages hidden by search-exclude policy.
  [OK] eval_drift: No retrieval-affecting files changed in working tree.
  [OK] reranker_health: 8 reranker failure(s) in last 7 days (below threshold)
  [OK] batch_retry_health: No exhausted batch retries in last 24h.
  [OK] wedged_queue: PGLite — no queue to check
  [OK] autopilot_fanout_concurrency: PGLite — single-writer, fan-out is 1
  [OK] graph_signals_coverage: graph_signals disabled — coverage not checked
  [OK] brainstorm_health: Migration v79 applied; tracking enabled. Calibration profile not yet generated — brainstorm/lsd will run unbiased until enough takes are resolved.
  [OK] link_resolution_opportunity: Brain is empty — nothing to scan
  [OK] ze_embedding_health: embedding_model="zeroentropyai:zembed-1" with key configured
  [OK] embedding_width_consistency: Schema width (1280d) matches gateway embedding_dimensions
  [OK] facts_embedding_width_consistency: Skipped on PGLite (single bundled pgvector version).
  [OK] source_routing_health: Single-source brain (no federation to check)
  [OK] oauth_confidential_client_health: No OAuth clients registered
  [OK] autopilot_lock_scope: Lock path: C:\Users\Shubham\.modusbrain\autopilot.lock
  [OK] stale_locks: No stale locks (no rows with ttl_expires_at < NOW())
  [OK] cycle_phase_scope: Phase taxonomy: 12 source-scoped, 8 brain-global, 2 mixed. Source-safe: [lint, backlinks, sync, extract, extract_facts, extract_atoms, recompute_emotional_weight, consolidate, propose_takes, conversation_facts_backfill, enrich_thin, schema-suggest]. Brain-global: [resolve_symbol_edges, synthesize_concepts, grade_takes, calibration_profile, skillopt, embed, orphans, purge]. Mixed: [synthesize, patterns].
  [OK] embed_staleness: No stale chunks
  [OK] entity_link_coverage: No entity pages — coverage check vacuous
  [OK] timeline_coverage: No entity pages — coverage check vacuous
  [WARN] takes_count: 0 takes (takes.bootstrap_enabled is false; opt in to enable)
  [OK] pack_upgrade_available: No active pack
  [OK] type_proliferation: 0 distinct typed values (pack declares 15)
  [OK] dangling_aliases: No dangling aliases

Brain checks:  70/100  (category penalty)
Skill checks:  90/100
Ops checks:    95/100
Meta checks:   95/100
Weighted brain score: Brain score 100/100

Overall health score: 50/100. Failed checks found.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.3 — Health check (JSON output)
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain doctor --json
[doctor.db_checks] done
[doctor-categories] unknown check name 'embed_staleness' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'entity_link_coverage' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'timeline_coverage' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'takes_count' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'pack_upgrade_available' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'type_proliferation' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
[doctor-categories] unknown check name 'dangling_aliases' — defaulting to 'meta'. Add it to src/core/doctor-categories.ts.
{"schema_version":2,"status":"unhealthy","health_score":50,"brain_checks_score":70,"category_scores":{"brain":70,"skill":90,"ops":95,"meta":95},"checks":[{"name":"resolver_health","status":"warn","message":"Could not find skills directory","category":"skill"},{"name":"retrieval_reflex_health","status":"warn","message":"pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`","details":{"enabled":true,"engine":"pglite","path":"pglite — serve IPC socket not present","fired_recently":false,"last_fired":null,"policy_skill_installed":false},"category":"skill"},{"name":"sync_failures","status":"fail","message":"1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug \"wrong-slug\" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.","remediation":[{"id":"sync-retry-failed","job":"sync-retry-failed","params":{"failure_count":1,"oldest_failure":"2026-07-13T17:44:17.449Z"},"idempotency_key":"default:sync-retry-failed:5c5f3a8b","severity":"high","est_seconds":30,"est_usd_cost":0,"rationale":"Retry 1 unresolved sync failure(s) (codes: SLUG_MISMATCH=1)","status":"remediable"}],"remediation_status":"remediable","category":"brain"},{"name":"nightly_quality_probe_health","status":"ok","message":"disabled (opt-in). Enable with: modusbrain config set autopilot.nightly_quality_probe.enabled true","category":"brain"},{"name":"extract_health","status":"ok","message":"no extractions in last 7 days","details":{"schema_version":1,"kinds":[]},"category":"brain"},{"name":"conversation_facts_backlog","status":"ok","message":"disabled (opt-in). Enable with: modusbrain config set cycle.conversation_facts_backfill.enabled true","category":"brain"},{"name":"extract_atoms_backlog","status":"ok","message":"no pages awaiting atom extraction","details":{"backlog":0,"pack_declares_phase":false,"known_approximation":"page backlog only; transcript corpus not counted"},"category":"brain"},{"name":"conversation_format_coverage","status":"ok","message":"No conversation-type pages — coverage check not applicable","category":"brain"},{"name":"progressive_batch_audit_health","status":"ok","message":"No progressive-batch operations in the last 7 days","category":"ops"},{"name":"conversation_parser_probe_health","status":"ok","message":"Skipped (nightly probe is opt-in; enable with `modusbrain config set autopilot.conversation_parser_probe.enabled true`)","category":"brain"},{"name":"home_dir_in_worktree","status":"ok","message":"modusbrain home is outside any enclosing git worktree.","category":"ops"},{"name":"connection","status":"ok","message":"Connected, 0 pages","category":"ops"},{"name":"pgvector","status":"warn","message":"Could not check pgvector extension","category":"ops"},{"name":"rls","status":"ok","message":"Skipped (PGLite — no PostgREST exposure, RLS not applicable)","category":"ops"},{"name":"schema_version","status":"ok","message":"Version 123 (latest: 123)","category":"meta"},{"name":"rls_event_trigger","status":"ok","message":"Skipped (PGLite — no event trigger support)","category":"ops"},{"name":"embeddings","status":"warn","message":"No embeddings yet. Run: modusbrain embed --stale","category":"brain"},{"name":"embedding_provider","status":"ok","message":"zeroentropyai:zembed-1 ✓ 1483ms, 1280 dims, DB aligned","category":"brain"},{"name":"embedding_column_registry","status":"ok","message":"Registry healthy: 2 columns (embedding, embedding_image); active='embedding'","category":"brain"},{"name":"embedding_env_override","status":"ok","message":"no embedding env overrides set","category":"brain"},{"name":"graph_coverage","status":"ok","message":"No entity pages — graph_coverage not applicable (markdown-only brain)","category":"brain"},{"name":"brain_score","status":"ok","message":"Brain score 100/100","category":"brain"},{"name":"orphan_ratio","status":"ok","message":"Vacuous: 0 entity pages (<100). Orphan ratio not meaningful at this scale.","category":"brain"},{"name":"integrity","status":"ok","message":"Sampled 0 pages; no bare-tweet phrases or external links.","category":"brain"},{"name":"jsonb_integrity","status":"warn","message":"Could not check JSONB integrity","category":"brain"},{"name":"takes_weight_grid","status":"ok","message":"No takes yet","category":"brain"},{"name":"child_table_orphans","status":"ok","message":"All FK-child tables clean (10 tables checked)","category":"brain"},{"name":"whoknows_health","status":"ok","message":"whoknows eval fixture present (10 queries). Run `modusbrain eval whoknows test/fixtures/whoknows-eval.jsonl` to grade.","category":"skill"},{"name":"cross_modal_modality_backfill","status":"ok","message":"All image-asset chunks have modality=image","category":"brain"},{"name":"unified_multimodal_coverage","status":"ok","message":"search.unified_multimodal is off; coverage check N/A","category":"brain"},{"name":"markdown_body_completeness","status":"ok","message":"Skipped (raw_data unavailable)","category":"brain"},{"name":"oversized_pages","status":"ok","message":"Skipped (No database connection: connect() has not been called. Fix: Run modusbrain init --supabase or modusbrain init --url <connection_string>)","category":"brain"},{"name":"scraper_junk_pages","status":"ok","message":"Skipped (No database connection: connect() has not been called. Fix: Run modusbrain init --supabase or modusbrain init --url <connection_string>)","category":"brain"},{"name":"content_sanity_audit_recent","status":"ok","message":"No content-sanity events in last 7 days (audit JSONL is local to this host; share MODUSBRAIN_AUDIT_DIR for multi-host visibility)","category":"brain"},{"name":"quarantined_pages","status":"ok","message":"No quarantined pages","category":"brain"},{"name":"flagged_pages","status":"ok","message":"No flagged pages","category":"brain"},{"name":"frontmatter_integrity","status":"ok","message":"No registered sources to scan","category":"brain"},{"name":"eval_capture","status":"ok","message":"No capture failures in the last 24h","category":"meta"},{"name":"contradictions","status":"ok","message":"No probe runs in the last 7 days. Run `modusbrain eval suspected-contradictions --query \"...\" --top-k 5` to populate.","category":"brain"},{"name":"facts_extraction_health","status":"ok","message":"No facts:absorb failures in the last 24h.","category":"brain"},{"name":"effective_date_health","status":"ok","message":"Sample of last 1000 pages clean (no fallback-with-parseable-fm-date, no future-dated, no pre-1990)","category":"brain"},{"name":"salience_health","status":"ok","message":"Skipped (no pages have emotional_weight > 0; either fresh install or recompute hasn't run yet)","category":"brain"},{"name":"queue_health","status":"ok","message":"Skipped (PGLite — no multi-process worker surface)","category":"ops"},{"name":"subagent_capability","status":"ok","message":"Subagent tier resolves to default (claude-sonnet-4-6) — full tool-loop capability","category":"ops"},{"name":"facts_health","status":"ok","message":"facts_health(default): 0 active, 0 today, 0 this week, 0 consolidated, top entities —","category":"brain"},{"name":"image_assets","status":"ok","message":"No image assets indexed yet","category":"brain"},{"name":"ocr_health","status":"ok","message":"OCR not in use (or no images ingested with OCR opt-in)","category":"brain"},{"name":"sync_freshness","status":"ok","message":"No federated sources to sync","details":{"unchanged_count":0,"synced_recently_count":0,"stale_count":0},"category":"brain"},{"name":"sync_consolidation","status":"ok","message":"Single-source brain — sync --all consolidation not applicable.","category":"ops"},{"name":"links_extraction_lag","status":"ok","message":"Extraction lag not applicable (no pages)","category":"brain"},{"name":"cycle_freshness","status":"ok","message":"No federated sources to cycle","category":"brain"},{"name":"search_mode","status":"ok","message":"Mode: conservative (no per-key overrides — mode bundle is canonical).","category":"ops"},{"name":"hidden_by_search_policy","status":"ok","message":"No pages hidden by search-exclude policy.","details":{"prefixes":["test/","attachments/",".raw/"],"counts":{}},"category":"brain"},{"name":"eval_drift","status":"ok","message":"No retrieval-affecting files changed in working tree.","category":"brain"},{"name":"reranker_health","status":"ok","message":"8 reranker failure(s) in last 7 days (below threshold)","category":"ops"},{"name":"batch_retry_health","status":"ok","message":"No exhausted batch retries in last 24h.","category":"ops"},{"name":"wedged_queue","status":"ok","message":"PGLite — no queue to check","category":"ops"},{"name":"autopilot_fanout_concurrency","status":"ok","message":"PGLite — single-writer, fan-out is 1","category":"ops"},{"name":"graph_signals_coverage","status":"ok","message":"graph_signals disabled — coverage not checked","category":"brain"},{"name":"brainstorm_health","status":"ok","message":"Migration v79 applied; tracking enabled. Calibration profile not yet generated — brainstorm/lsd will run unbiased until enough takes are resolved.","category":"ops"},{"name":"link_resolution_opportunity","status":"ok","message":"Brain is empty — nothing to scan","category":"brain"},{"name":"ze_embedding_health","status":"ok","message":"embedding_model=\"zeroentropyai:zembed-1\" with key configured","category":"ops"},{"name":"embedding_width_consistency","status":"ok","message":"Schema width (1280d) matches gateway embedding_dimensions","category":"brain"},{"name":"facts_embedding_width_consistency","status":"ok","message":"Skipped on PGLite (single bundled pgvector version).","category":"brain"},{"name":"source_routing_health","status":"ok","message":"Single-source brain (no federation to check)","category":"brain"},{"name":"oauth_confidential_client_health","status":"ok","message":"No OAuth clients registered","category":"ops"},{"name":"autopilot_lock_scope","status":"ok","message":"Lock path: C:\\Users\\Shubham\\.modusbrain\\autopilot.lock","category":"ops"},{"name":"stale_locks","status":"ok","message":"No stale locks (no rows with ttl_expires_at < NOW())","category":"ops"},{"name":"cycle_phase_scope","status":"ok","message":"Phase taxonomy: 12 source-scoped, 8 brain-global, 2 mixed. Source-safe: [lint, backlinks, sync, extract, extract_facts, extract_atoms, recompute_emotional_weight, consolidate, propose_takes, conversation_facts_backfill, enrich_thin, schema-suggest]. Brain-global: [resolve_symbol_edges, synthesize_concepts, grade_takes, calibration_profile, skillopt, embed, orphans, purge]. Mixed: [synthesize, patterns].","details":{"phase_scope_map":{"lint":"source","backlinks":"source","sync":"source","synthesize":"mixed","extract":"source","extract_facts":"source","resolve_symbol_edges":"global","patterns":"mixed","recompute_emotional_weight":"source","consolidate":"source","propose_takes":"source","grade_takes":"global","calibration_profile":"global","embed":"global","orphans":"global","purge":"global","schema-suggest":"source","extract_atoms":"source","synthesize_concepts":"global","conversation_facts_backfill":"source","enrich_thin":"source","skillopt":"global"},"counts":{"source":12,"global":8,"mixed":2}},"category":"meta"},{"name":"embed_staleness","status":"ok","message":"No stale chunks","category":"meta"},{"name":"entity_link_coverage","status":"ok","message":"No entity pages — coverage check vacuous","category":"meta"},{"name":"timeline_coverage","status":"ok","message":"No entity pages — coverage check vacuous","category":"meta"},{"name":"takes_count","status":"warn","message":"0 takes (takes.bootstrap_enabled is false; opt in to enable)","category":"meta"},{"name":"pack_upgrade_available","status":"ok","message":"No active pack","category":"meta"},{"name":"type_proliferation","status":"ok","message":"0 distinct typed values (pack declares 15)","category":"meta"},{"name":"dangling_aliases","status":"ok","message":"No dangling aliases","category":"meta"}],"top_issues":[{"name":"sync_failures","status":"fail","tier":"symptom","fix":"1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug \"wrong-slug\" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge."},{"name":"embeddings","status":"warn","tier":"symptom","fix":"No embeddings yet. Run: modusbrain embed --stale"},{"name":"jsonb_integrity","status":"warn","tier":"symptom","fix":"Could not check JSONB integrity"},{"name":"pgvector","status":"warn","tier":"symptom","fix":"Could not check pgvector extension"},{"name":"resolver_health","status":"warn","tier":"symptom","fix":"Could not find skills directory"},{"name":"retrieval_reflex_health","status":"warn","tier":"symptom","fix":"pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`"},{"name":"takes_count","status":"warn","tier":"symptom","fix":"0 takes (takes.bootstrap_enabled is false; opt in to enable)"}]}
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.4 — Fast health check (skips slow probes)
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain doctor --fast

ModusBrain Health Check
===================

Top issues (ranked by cause):
  [FAIL] sync_failures → 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [WARN] connection → Skipping DB checks (--fast mode, URL present from config-file-path)
  [WARN] resolver_health → Could not find skills directory
  [WARN] retrieval_reflex_health → pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`

  [WARN] resolver_health: Could not find skills directory
  [WARN] retrieval_reflex_health: pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`
  [FAIL] sync_failures: 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [OK] nightly_quality_probe_health: disabled (opt-in). Enable with: modusbrain config set autopilot.nightly_quality_probe.enabled true
  [OK] progressive_batch_audit_health: No progressive-batch operations in the last 7 days
  [OK] conversation_parser_probe_health: Skipped (nightly probe is opt-in; enable with `modusbrain config set autopilot.conversation_parser_probe.enabled true`)
  [OK] home_dir_in_worktree: modusbrain home is outside any enclosing git worktree.
  [WARN] connection: Skipping DB checks (--fast mode, URL present from config-file-path)

Brain checks:  80/100  (category penalty)
Skill checks:  90/100
Ops checks:    95/100
Meta checks:   100/100

Overall health score: 65/100. Failed checks found.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.5 — Check for available updates
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain check-update
ModusBrain 1.0.1 — could not check for updates (no releases found or network unavailable).
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 1.6 — Check for updates (JSON output)
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain check-update --json
{
  "current_version": "1.0.1",
  "current_source": "package-json",
  "latest_version": "",
  "update_available": false,
  "upgrade_command": "bun update modusbrain",
  "release_url": "",
  "changelog_diff": "",
  "published_at": "",
  "error": "no_releases"
}
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.1 — Lint markdown files in a directory
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain lint C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs
[lint.pages] 1/115 (0%)
ENGINES.md:
  L1 no-frontmatter: Page has no YAML frontmatter

INSTALL.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_RECOMMENDED_SCHEMA.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L264 placeholder-date: Placeholder date found: - **Last assessed:** YYYY-MM-DD
  L285 placeholder-date: Placeholder date found: - **YYYY-MM-DD** | Source — What happened.
  L1 no-frontmatter: Page has no YAML frontmatter
  L333 empty-section: Empty section: ## Attendees
  L334 empty-section: Empty section: ## Key Decisions
  L335 empty-section: Empty section: ## Action Items
  L1 huge-page: Page body is 64209 bytes (exceeds warn threshold)

MODUSBRAIN_SKILLPACK.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_V0.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_VERIFY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

RELEASING.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

TESTING.md:
  L1 no-frontmatter: Page has no YAML frontmatter

UPGRADING_DOWNSTREAM_AGENTS.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

ai-providers\llama-server-reranker.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 11/115 (9%)
ai-providers\zeroentropy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\KEY_FILES.md:
  L193 placeholder-date: Placeholder date found: - `src/commands/extract.ts` — `modusbrain extract links|time
  L280 placeholder-date: Placeholder date found: - `src/commands/anomalies.ts` — `modusbrain anomalies [--sin
  L323 placeholder-date: Placeholder date found: - `src/commands/dream.ts` — `modusbrain dream` CLI; thin ali
  L1 no-frontmatter: Page has no YAML frontmatter
  L1 huge-page: Page body is 448775 bytes (exceeds warn threshold)

architecture\RETRIEVAL.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\RETRIEVAL_MAXPOOL_INCIDENT.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\brains-and-sources.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\calibration-quality-gate-spec.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\frontmatter-scan-incremental.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\infra-layer.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\lens-packs.md:
  L33 placeholder-date: Placeholder date found: `atoms/{YYYY-MM-DD}/{slug}` pages. Budget cap $0.30/source/r
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\pack-upgrade-mechanism.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 21/115 (18%)
architecture\schema-packs.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\serve-sync-concurrency.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\system-of-record.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\thin-client.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\topologies.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\type-taxonomy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

contradictions.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\2026_05_EVAL_PLAN.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\CODE_CATHEDRAL_II.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\COMMUNITY_IDEAS.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 31/115 (26%)
designs\HOMEBREW_FOR_PERSONAL_AI.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\KNOWLEDGE_RUNTIME.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\MINIONS_AGENT_ORCHESTRATION.md:
  L1 missing-title: Frontmatter missing required field: title
  L1 missing-type: Frontmatter missing required field: type
  L1 missing-created: Frontmatter missing required field: created

designs\SKILLPACK_REGISTRY_V1_SPEC.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L614 placeholder-date: Placeholder date found: fix_hint: 'Add a `## [<version>] - <YYYY-MM-DD>` entry. Use
  L1 no-frontmatter: Page has no YAML frontmatter
  L1 huge-page: Page body is 89072 bytes (exceeds warn threshold)

designs\V038_SCHEMA_PACKS.md:
  L1 missing-title: Frontmatter missing required field: title
  L1 missing-type: Frontmatter missing required field: type
  L1 missing-created: Frontmatter missing required field: created

embedding-migrations.md:
  L1 no-frontmatter: Page has no YAML frontmatter

ethos\MARKDOWN_SKILLS_AS_RECIPES.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]

ethos\ORIGIN.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval-bench.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 41/115 (35%)
eval-capture.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval-takes-quality.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval\METRIC_GLOSSARY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval\SEARCH_MODE_METHODOLOGY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guardrails.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\agent-to-modusbrain.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-agent-loop.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-first-lookup.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-vs-memory.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\compiled-truth.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 51/115 (44%)
guides\content-media.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\cron-schedule.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\deterministic-collectors.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\diligence-ingestion.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\enrichment-pipeline.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\entity-detection.md:
  L64 placeholder-date: Placeholder date found: Format: - YYYY-MM-DD | {what happened} [Source: {who}, {cont
  L71 placeholder-date: Placeholder date found: Format: - **YYYY-MM-DD** | Referenced in [{page title}]({pat
  L1 no-frontmatter: Page has no YAML frontmatter

guides\executive-assistant.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\idea-capture.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\live-sync.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\meeting-ingestion.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 61/115 (53%)
guides\minions-deployment.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\minions-fix.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\minions-shell-jobs.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\multi-source-brains.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\operational-disciplines.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\originals-folder.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\plugin-authors.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\plugin-handlers.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\push-context.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\queue-operations-runbook.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 71/115 (61%)
guides\quiet-hours.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\repo-architecture.md:
  L65 placeholder-date: Placeholder date found: └── YYYY-MM-DD.md      # Daily session logs
  L90 placeholder-date: Placeholder date found: │           └── YYYY-MM-DD.md
  L1 no-frontmatter: Page has no YAML frontmatter

guides\rls-and-you.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\scaling-skills.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\search-modes.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skill-development.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skillopt.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skillpacks-as-scaffolding.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\source-attribution.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\sub-agent-routing.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 81/115 (70%)
guides\upgrades-auto-update.md:
  L1 no-frontmatter: Page has no YAML frontmatter

incidents\2026-05-20-lsd-cost-explosion.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\README.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\credential-gateway.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\embedding-providers.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\meeting-webhooks.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\pre-commit.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\reliability-repair.md:
  L1 no-frontmatter: Page has no YAML frontmatter

issues\cross-modal-search.md:
  L1 no-frontmatter: Page has no YAML frontmatter

issues\doctor-auto-heal-and-scoring.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 91/115 (79%)
mcp\ALTERNATIVES.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CHATGPT.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_CODE.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_COWORK.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_DESKTOP.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CODEX.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\DEPLOY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\PERPLEXITY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

migrations\v0.41.2-markdown-greenfield.md:
  L76 placeholder-date: Placeholder date found: 1. Walks `atoms/{YYYY-MM-DD}/*.md`, `concepts/*.md`, `ideas/
  L1 no-frontmatter: Page has no YAML frontmatter

operations\headless-install.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 101/115 (87%)
operations\spend-controls.md:
  L1 no-frontmatter: Page has no YAML frontmatter

plans\2026-06-03-001-feat-idea-lineage-skill-plan.md:
  L1 missing-created: Frontmatter missing required field: created

progress-events.md:
  L1 no-frontmatter: Page has no YAML frontmatter

proposals\temporal-contradiction-probe.md:
  L1 no-frontmatter: Page has no YAML frontmatter

schema-author-tutorial.md:
  L1 no-frontmatter: Page has no YAML frontmatter

skillpack-anatomy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

storage-tiering.md:
  L1 no-frontmatter: Page has no YAML frontmatter

takes-vs-facts.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\README.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\company-brain.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L272 placeholder-date: Placeholder date found: copy to customers/alice-example/digests/YYYY-MM-DD-pipeline.
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 111/115 (96%)
tutorials\connect-coding-agent.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\improving-skills-with-skillopt.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\personal-brain.md:
  L1 no-frontmatter: Page has no YAML frontmatter

v0.38-smoke-test-report.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 115/115 (100%)
what-schemas-unlock.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 115/115 (100%) done

115 pages scanned. 148 issue(s) in 114 page(s).
Run with --fix to auto-fix fixable issues.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.2 — Lint a single file
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain lint C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\README.md
[lint.pages] 1/1 (100%)
C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\README.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 1/1 (100%) done

1 pages scanned. 1 issue(s) in 1 page(s).
Run with --fix to auto-fix fixable issues.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.3 — Lint with auto-fix
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain lint C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs --fix
[lint.pages] 1/115 (0%)
ENGINES.md:
  L1 no-frontmatter: Page has no YAML frontmatter

INSTALL.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_RECOMMENDED_SCHEMA.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L264 placeholder-date: Placeholder date found: - **Last assessed:** YYYY-MM-DD
  L285 placeholder-date: Placeholder date found: - **YYYY-MM-DD** | Source — What happened.
  L1 no-frontmatter: Page has no YAML frontmatter
  L333 empty-section: Empty section: ## Attendees
  L334 empty-section: Empty section: ## Key Decisions
  L335 empty-section: Empty section: ## Action Items
  L1 huge-page: Page body is 64209 bytes (exceeds warn threshold)

MODUSBRAIN_SKILLPACK.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_V0.md:
  L1 no-frontmatter: Page has no YAML frontmatter

MODUSBRAIN_VERIFY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

RELEASING.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter
  Fixed 1 issue(s)

TESTING.md:
  L1 no-frontmatter: Page has no YAML frontmatter

UPGRADING_DOWNSTREAM_AGENTS.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter
  Fixed 1 issue(s)

ai-providers\llama-server-reranker.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 11/115 (9%)
ai-providers\zeroentropy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\KEY_FILES.md:
  L193 placeholder-date: Placeholder date found: - `src/commands/extract.ts` — `modusbrain extract links|time
  L280 placeholder-date: Placeholder date found: - `src/commands/anomalies.ts` — `modusbrain anomalies [--sin
  L323 placeholder-date: Placeholder date found: - `src/commands/dream.ts` — `modusbrain dream` CLI; thin ali
  L1 no-frontmatter: Page has no YAML frontmatter
  L1 huge-page: Page body is 448775 bytes (exceeds warn threshold)

architecture\RETRIEVAL.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\RETRIEVAL_MAXPOOL_INCIDENT.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\brains-and-sources.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\calibration-quality-gate-spec.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\frontmatter-scan-incremental.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\infra-layer.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\lens-packs.md:
  L33 placeholder-date: Placeholder date found: `atoms/{YYYY-MM-DD}/{slug}` pages. Budget cap $0.30/source/r
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\pack-upgrade-mechanism.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 21/115 (18%)
architecture\schema-packs.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\serve-sync-concurrency.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\system-of-record.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\thin-client.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\topologies.md:
  L1 no-frontmatter: Page has no YAML frontmatter

architecture\type-taxonomy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

contradictions.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\2026_05_EVAL_PLAN.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\CODE_CATHEDRAL_II.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\COMMUNITY_IDEAS.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 31/115 (26%)
designs\HOMEBREW_FOR_PERSONAL_AI.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\KNOWLEDGE_RUNTIME.md:
  L1 no-frontmatter: Page has no YAML frontmatter

designs\MINIONS_AGENT_ORCHESTRATION.md:
  L1 missing-title: Frontmatter missing required field: title
  L1 missing-type: Frontmatter missing required field: type
  L1 missing-created: Frontmatter missing required field: created

designs\SKILLPACK_REGISTRY_V1_SPEC.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L614 placeholder-date: Placeholder date found: fix_hint: 'Add a `## [<version>] - <YYYY-MM-DD>` entry. Use
  L1 no-frontmatter: Page has no YAML frontmatter
  L1 huge-page: Page body is 89072 bytes (exceeds warn threshold)

designs\V038_SCHEMA_PACKS.md:
  L1 missing-title: Frontmatter missing required field: title
  L1 missing-type: Frontmatter missing required field: type
  L1 missing-created: Frontmatter missing required field: created

embedding-migrations.md:
  L1 no-frontmatter: Page has no YAML frontmatter

ethos\MARKDOWN_SKILLS_AS_RECIPES.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]

ethos\ORIGIN.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval-bench.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 41/115 (35%)
eval-capture.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval-takes-quality.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval\METRIC_GLOSSARY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

eval\SEARCH_MODE_METHODOLOGY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guardrails.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\agent-to-modusbrain.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-agent-loop.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-first-lookup.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\brain-vs-memory.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\compiled-truth.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 51/115 (44%)
guides\content-media.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\cron-schedule.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\deterministic-collectors.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\diligence-ingestion.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\enrichment-pipeline.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\entity-detection.md:
  L64 placeholder-date: Placeholder date found: Format: - YYYY-MM-DD | {what happened} [Source: {who}, {cont
  L71 placeholder-date: Placeholder date found: Format: - **YYYY-MM-DD** | Referenced in [{page title}]({pat
  L1 no-frontmatter: Page has no YAML frontmatter

guides\executive-assistant.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\idea-capture.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\live-sync.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\meeting-ingestion.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 61/115 (53%)
guides\minions-deployment.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\minions-fix.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\minions-shell-jobs.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\multi-source-brains.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\operational-disciplines.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\originals-folder.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\plugin-authors.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\plugin-handlers.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\push-context.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\queue-operations-runbook.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 71/115 (61%)
guides\quiet-hours.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\repo-architecture.md:
  L65 placeholder-date: Placeholder date found: └── YYYY-MM-DD.md      # Daily session logs
  L90 placeholder-date: Placeholder date found: │           └── YYYY-MM-DD.md
  L1 no-frontmatter: Page has no YAML frontmatter

guides\rls-and-you.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\scaling-skills.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

guides\search-modes.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skill-development.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skillopt.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\skillpacks-as-scaffolding.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\source-attribution.md:
  L1 no-frontmatter: Page has no YAML frontmatter

guides\sub-agent-routing.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 81/115 (70%)
guides\upgrades-auto-update.md:
  L1 no-frontmatter: Page has no YAML frontmatter

incidents\2026-05-20-lsd-cost-explosion.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\README.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\credential-gateway.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\embedding-providers.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\meeting-webhooks.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\pre-commit.md:
  L1 no-frontmatter: Page has no YAML frontmatter

integrations\reliability-repair.md:
  L1 no-frontmatter: Page has no YAML frontmatter

issues\cross-modal-search.md:
  L1 no-frontmatter: Page has no YAML frontmatter

issues\doctor-auto-heal-and-scoring.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 91/115 (79%)
mcp\ALTERNATIVES.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CHATGPT.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_CODE.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_COWORK.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CLAUDE_DESKTOP.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\CODEX.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\DEPLOY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

mcp\PERPLEXITY.md:
  L1 no-frontmatter: Page has no YAML frontmatter

migrations\v0.41.2-markdown-greenfield.md:
  L76 placeholder-date: Placeholder date found: 1. Walks `atoms/{YYYY-MM-DD}/*.md`, `concepts/*.md`, `ideas/
  L1 no-frontmatter: Page has no YAML frontmatter

operations\headless-install.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 101/115 (87%)
operations\spend-controls.md:
  L1 no-frontmatter: Page has no YAML frontmatter

plans\2026-06-03-001-feat-idea-lineage-skill-plan.md:
  L1 missing-created: Frontmatter missing required field: created

progress-events.md:
  L1 no-frontmatter: Page has no YAML frontmatter

proposals\temporal-contradiction-probe.md:
  L1 no-frontmatter: Page has no YAML frontmatter

schema-author-tutorial.md:
  L1 no-frontmatter: Page has no YAML frontmatter

skillpack-anatomy.md:
  L1 no-frontmatter: Page has no YAML frontmatter

storage-tiering.md:
  L1 no-frontmatter: Page has no YAML frontmatter

takes-vs-facts.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\README.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\company-brain.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L272 placeholder-date: Placeholder date found: copy to customers/alice-example/digests/YYYY-MM-DD-pipeline.
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 111/115 (96%)
tutorials\connect-coding-agent.md:
  L1 code-fence-wrap: Page wrapped in ```markdown code fences (LLM artifact) [fixable]
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\improving-skills-with-skillopt.md:
  L1 no-frontmatter: Page has no YAML frontmatter

tutorials\personal-brain.md:
  L1 no-frontmatter: Page has no YAML frontmatter

v0.38-smoke-test-report.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 115/115 (100%)
what-schemas-unlock.md:
  L1 no-frontmatter: Page has no YAML frontmatter
[lint.pages] 115/115 (100%) done

115 pages scanned. 148 issue(s) in 114 page(s).
0 auto-fixed.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.4 — Find orphan pages (no inbound links)
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain orphans
[orphans.scan] done
122 orphans out of 122 linkable pages (122 total; 0 excluded)

[advanced-cli]
  advanced-cli  Advanced CLI Commands

[ai-providers]
  ai-providers/llama-server-reranker  llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider
  ai-providers/zeroentropy  ZeroEntropy — zembed-1 + zerank-2

[architecture]
  architecture/brains-and-sources  Brains and Sources — the mental model
  architecture/calibration-quality-gate-spec  Calibration Quality Gate — Falsifiability Filter + Category Classification
  architecture/frontmatter-scan-incremental  Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)
  architecture/infra-layer  ModusBrain Infrastructure Layer
  architecture/key_files  Key files — per-file index (modusbrain repo)
  architecture/lens-packs  Lens packs (v0.41.2.0)
  architecture/pack-upgrade-mechanism  Pack-Upgrade Mechanism (v0.41.22)
  architecture/retrieval  Why the hybrid + graph stack works
  architecture/retrieval_maxpool_incident  Retrieval Incident: a chosen-name page was missed, and the fix
  architecture/schema-packs  Schema Packs
  architecture/serve-sync-concurrency  Serve Sync Concurrency
  architecture/system-of-record  System of record
  architecture/thin-client  Thin-client routing (remote MCP)
  architecture/topologies  ModusBrain Deployment Topologies
  architecture/type-taxonomy  Type Taxonomy (v0.41.22: gbrain-base-v2)

[contradictions]
  contradictions  modusbrain eval suspected-contradictions (v0.32.6)

[designs]
  designs/2026_05_eval_plan  Embedder Shootout — May 2026 Eval Plan
  designs/code_cathedral_ii  Code Cathedral II — v0.20.0 Design
  designs/community_ideas  Community Ideas Ledger
  designs/homebrew_for_personal_ai  Homebrew for Personal AI Infrastructure
  designs/knowledge_runtime  ModusBrain Knowledge Runtime — Design Doc
  designs/minions_agent_orchestration  Minions Agent Orchestration
  designs/skillpack_registry_v1_spec  Skillpack Publish + Registry + Install Spec (post-v0.36.0.0)
  designs/v038_schema_packs  V038 Schema Packs

[embedding-migrations]
  embedding-migrations  Switching embedding models or dimensions on an existing brain

[engines]
  engines  Pluggable Engine Architecture

[ethos]
  ethos/markdown_skills_as_recipes  Homebrew for Personal AI
  ethos/origin  Origin story
  ethos/thin_harness_fat_skills  Thin Harness, Fat Skills

[eval]
  eval/metric_glossary  Evaluation Metric Glossary
  eval/search_mode_methodology  Search Mode Evaluation Methodology

[eval-bench]
  eval-bench  Running real-world eval benchmarks against your modusbrain changes

[eval-benchmarking]
  eval-benchmarking  Eval & Benchmarking

[eval-capture]
  eval-capture  Eval capture — NDJSON schema reference

[eval-takes-quality]
  eval-takes-quality  Eval Takes Quality

[guardrails]
  guardrails  Content Guardrail Seams

[guides]
  guides/agent-to-modusbrain  How a downstream agent should talk to modusbrain
  guides/brain-agent-loop  The Brain-Agent Loop
  guides/brain-first-lookup  Brain-First Lookup Protocol
  guides/brain-vs-memory  Brain vs Memory vs Session
  guides/compiled-truth  Compiled Truth + Timeline Pattern
  guides/content-media  Content and Media Ingestion
  guides/cron-schedule  Reference Cron Schedule
  guides/deterministic-collectors  Deterministic Collectors: Code for Data, LLMs for Judgment
  guides/diligence-ingestion  Diligence Ingestion: Data Room to Brain Pages
  guides/enrichment-pipeline  Enrichment Pipeline
  guides/entity-detection  Entity Detection: Run It on Every Message
  guides/executive-assistant  Executive Assistant Pattern
  guides/idea-capture  Idea Capture: Originals, Depth, and Distribution
  guides/live-sync  Live Sync: Keep the Index Current
  guides/meeting-ingestion  Meeting Ingestion
  guides/minions-deployment  Minions Worker Deployment Guide
  guides/minions-fix  Minions fix — repairing a half-migrated install
  guides/minions-shell-jobs  Minions shell jobs — move deterministic crons off the gateway
  guides/multi-source-brains  Multi-source brains
  guides/operational-disciplines  Operational Disciplines
  guides/originals-folder  The Originals Folder
  guides/plugin-authors  Plugin authors guide (v0.15)
  guides/plugin-handlers  Plugin handlers — registering host-specific Minion handlers
  guides/push-context  Push-based context (#2095, v0.42.43.0)
  guides/queue-operations-runbook  Queue operations runbook
  guides/quiet-hours  Quiet Hours and Timezone-Aware Delivery
  guides/repo-architecture  Two-Repo Architecture: Agent Behavior vs World Knowledge
  guides/rls-and-you  RLS and you
  guides/scaling-skills  Scaling skills past 300 without drowning the context window
  guides/search-modes  Search Modes
  guides/skill-development  Skill Development Cycle
  guides/skillopt  Skillopt
  guides/skillpacks-as-scaffolding  Skillpacks as scaffolding, not amber
  guides/source-attribution  Source Attribution
  guides/sub-agent-routing  Sub-Agent Model Routing
  guides/upgrades-auto-update  Upgrades and Auto-Update Notifications

[how-modusbrain-works]
  how-modusbrain-works  How ModusBrain Works

[inbox]
  inbox/2026-07-17-4616e2bc  Introduction
  inbox/2026-07-17-b273a309  ModusBrain
  inbox/2026-07-17-e02b98aa  ModusBrain is an operational knowledge engine for AI agents.

[incidents]
  incidents/2026-05-20-lsd-cost-explosion  Incident Report: LSD Brainstorm 53× Cost Overrun

[install]
  install  Install

[integrations]
  integrations/credential-gateway  Credential Gateway (ClawVisor / Hermes)
  integrations/embedding-providers  Embedding providers
  integrations/meeting-webhooks  Meeting & Call Webhooks
  integrations/pre-commit  Pre-commit hook for brain repos (v0.22.4+)
  integrations/readme  Getting Data Into Your Brain
  integrations/reliability-repair  Reliability repair (v0.12.2)

[issues]
  issues/cross-modal-search  Cross-Modal Search: Text↔Image Retrieval
  issues/doctor-auto-heal-and-scoring  Doctor Auto-Heal and Scoring Improvements

[mcp]
  mcp/alternatives  Remote MCP Deployment Options
  mcp/chatgpt  Connect ModusBrain to ChatGPT
  mcp/claude_code  Connect ModusBrain to Claude Code
  mcp/claude_cowork  Connect ModusBrain to Claude Cowork
  mcp/claude_desktop  Connect ModusBrain to Claude Desktop
  mcp/codex  Connect ModusBrain to Codex
  mcp/deploy  Deploy ModusBrain Remote MCP Server
  mcp/perplexity  Connect ModusBrain to Perplexity Computer

[migrations]
  migrations/v0.41.2-markdown-greenfield  Migrating your OpenClaw brain to modusbrain v0.41.2.0 (greenfield)

[modusbrain_recommended_schema]
  modusbrain_recommended_schema  Brain: The LLM-Maintained Knowledge Base

[modusbrain_skillpack]
  modusbrain_skillpack  ModusBrain Skillpack: Reference Architecture for AI Agents

[modusbrain_v0]
  modusbrain_v0  ModusBrain v0: Postgres-Native Personal Knowledge Brain

[modusbrain_verify]
  modusbrain_verify  ModusBrain Installation Verification Runbook

[operations]
  operations/headless-install  Headless install: Docker, CI, postinstall
  operations/spend-controls  Spend controls

[plans]
  plans/2026-06-03-001-feat-idea-lineage-skill-plan  feat: Add idea-lineage thinking skill

[progress-events]
  progress-events  Progress events

[proposals]
  proposals/temporal-contradiction-probe  Proposal: Temporal Axis for Contradiction Probe

[quickstart-guide]
  quickstart-guide  Quickstart

[releasing]
  releasing  Releasing & contributing (modusbrain)

[schema-author-tutorial]
  schema-author-tutorial  Tutorial: Build your first schema pack

[skillpack-anatomy]
  skillpack-anatomy  Skillpack anatomy

[storage-tiering]
  storage-tiering  Storage Tiering: db-tracked vs db-only directories

[takes-vs-facts]
  takes-vs-facts  Takes vs Facts — Architectural Distinction

[testing]
  testing  Testing (modusbrain repo)

[tutorials]
  tutorials/company-brain  Tutorial: Extend your personal brain into a company brain
  tutorials/connect-coding-agent  Give your coding agent a memory: ModusBrain + Claude Code / Codex
  tutorials/improving-skills-with-skillopt  Auto-improve a skill with `modusbrain skillopt`
  tutorials/personal-brain  Tutorial: Set up your personal AI agent + brain from zero
  tutorials/readme  Tutorials

[upgrading_downstream_agents]
  upgrading_downstream_agents  Upgrading Downstream Agents

[v0.38-smoke-test-report]
  v0.38-smoke-test-report  v0.38.0.0 Smoke Test Report

[what-schemas-unlock]
  what-schemas-unlock  What schemas unlock
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.5 — Orphans as JSON
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain orphans --json
[orphans.scan] done
{
  "orphans": [
    {
      "slug": "advanced-cli",
      "title": "Advanced CLI Commands",
      "domain": "advanced-cli"
    },
    {
      "slug": "ai-providers/llama-server-reranker",
      "title": "llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider",
      "domain": "ai-providers"
    },
    {
      "slug": "ai-providers/zeroentropy",
      "title": "ZeroEntropy — zembed-1 + zerank-2",
      "domain": "ai-providers"
    },
    {
      "slug": "architecture/brains-and-sources",
      "title": "Brains and Sources — the mental model",
      "domain": "architecture"
    },
    {
      "slug": "architecture/calibration-quality-gate-spec",
      "title": "Calibration Quality Gate — Falsifiability Filter + Category Classification",
      "domain": "architecture"
    },
    {
      "slug": "architecture/frontmatter-scan-incremental",
      "title": "Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)",
      "domain": "architecture"
    },
    {
      "slug": "architecture/infra-layer",
      "title": "ModusBrain Infrastructure Layer",
      "domain": "architecture"
    },
    {
      "slug": "architecture/key_files",
      "title": "Key files — per-file index (modusbrain repo)",
      "domain": "architecture"
    },
    {
      "slug": "architecture/lens-packs",
      "title": "Lens packs (v0.41.2.0)",
      "domain": "architecture"
    },
    {
      "slug": "architecture/pack-upgrade-mechanism",
      "title": "Pack-Upgrade Mechanism (v0.41.22)",
      "domain": "architecture"
    },
    {
      "slug": "architecture/retrieval",
      "title": "Why the hybrid + graph stack works",
      "domain": "architecture"
    },
    {
      "slug": "architecture/retrieval_maxpool_incident",
      "title": "Retrieval Incident: a chosen-name page was missed, and the fix",
      "domain": "architecture"
    },
    {
      "slug": "architecture/schema-packs",
      "title": "Schema Packs",
      "domain": "architecture"
    },
    {
      "slug": "architecture/serve-sync-concurrency",
      "title": "Serve Sync Concurrency",
      "domain": "architecture"
    },
    {
      "slug": "architecture/system-of-record",
      "title": "System of record",
      "domain": "architecture"
    },
    {
      "slug": "architecture/thin-client",
      "title": "Thin-client routing (remote MCP)",
      "domain": "architecture"
    },
    {
      "slug": "architecture/topologies",
      "title": "ModusBrain Deployment Topologies",
      "domain": "architecture"
    },
    {
      "slug": "architecture/type-taxonomy",
      "title": "Type Taxonomy (v0.41.22: gbrain-base-v2)",
      "domain": "architecture"
    },
    {
      "slug": "contradictions",
      "title": "modusbrain eval suspected-contradictions (v0.32.6)",
      "domain": "contradictions"
    },
    {
      "slug": "designs/2026_05_eval_plan",
      "title": "Embedder Shootout — May 2026 Eval Plan",
      "domain": "designs"
    },
    {
      "slug": "designs/code_cathedral_ii",
      "title": "Code Cathedral II — v0.20.0 Design",
      "domain": "designs"
    },
    {
      "slug": "designs/community_ideas",
      "title": "Community Ideas Ledger",
      "domain": "designs"
    },
    {
      "slug": "designs/homebrew_for_personal_ai",
      "title": "Homebrew for Personal AI Infrastructure",
      "domain": "designs"
    },
    {
      "slug": "designs/knowledge_runtime",
      "title": "ModusBrain Knowledge Runtime — Design Doc",
      "domain": "designs"
    },
    {
      "slug": "designs/minions_agent_orchestration",
      "title": "Minions Agent Orchestration",
      "domain": "designs"
    },
    {
      "slug": "designs/skillpack_registry_v1_spec",
      "title": "Skillpack Publish + Registry + Install Spec (post-v0.36.0.0)",
      "domain": "designs"
    },
    {
      "slug": "designs/v038_schema_packs",
      "title": "V038 Schema Packs",
      "domain": "designs"
    },
    {
      "slug": "embedding-migrations",
      "title": "Switching embedding models or dimensions on an existing brain",
      "domain": "embedding-migrations"
    },
    {
      "slug": "engines",
      "title": "Pluggable Engine Architecture",
      "domain": "engines"
    },
    {
      "slug": "ethos/markdown_skills_as_recipes",
      "title": "Homebrew for Personal AI",
      "domain": "ethos"
    },
    {
      "slug": "ethos/origin",
      "title": "Origin story",
      "domain": "ethos"
    },
    {
      "slug": "ethos/thin_harness_fat_skills",
      "title": "Thin Harness, Fat Skills",
      "domain": "ethos"
    },
    {
      "slug": "eval-bench",
      "title": "Running real-world eval benchmarks against your modusbrain changes",
      "domain": "eval-bench"
    },
    {
      "slug": "eval-benchmarking",
      "title": "Eval & Benchmarking",
      "domain": "eval-benchmarking"
    },
    {
      "slug": "eval-capture",
      "title": "Eval capture — NDJSON schema reference",
      "domain": "eval-capture"
    },
    {
      "slug": "eval-takes-quality",
      "title": "Eval Takes Quality",
      "domain": "eval-takes-quality"
    },
    {
      "slug": "eval/metric_glossary",
      "title": "Evaluation Metric Glossary",
      "domain": "eval"
    },
    {
      "slug": "eval/search_mode_methodology",
      "title": "Search Mode Evaluation Methodology",
      "domain": "eval"
    },
    {
      "slug": "guardrails",
      "title": "Content Guardrail Seams",
      "domain": "guardrails"
    },
    {
      "slug": "guides/agent-to-modusbrain",
      "title": "How a downstream agent should talk to modusbrain",
      "domain": "guides"
    },
    {
      "slug": "guides/brain-agent-loop",
      "title": "The Brain-Agent Loop",
      "domain": "guides"
    },
    {
      "slug": "guides/brain-first-lookup",
      "title": "Brain-First Lookup Protocol",
      "domain": "guides"
    },
    {
      "slug": "guides/brain-vs-memory",
      "title": "Brain vs Memory vs Session",
      "domain": "guides"
    },
    {
      "slug": "guides/compiled-truth",
      "title": "Compiled Truth + Timeline Pattern",
      "domain": "guides"
    },
    {
      "slug": "guides/content-media",
      "title": "Content and Media Ingestion",
      "domain": "guides"
    },
    {
      "slug": "guides/cron-schedule",
      "title": "Reference Cron Schedule",
      "domain": "guides"
    },
    {
      "slug": "guides/deterministic-collectors",
      "title": "Deterministic Collectors: Code for Data, LLMs for Judgment",
      "domain": "guides"
    },
    {
      "slug": "guides/diligence-ingestion",
      "title": "Diligence Ingestion: Data Room to Brain Pages",
      "domain": "guides"
    },
    {
      "slug": "guides/enrichment-pipeline",
      "title": "Enrichment Pipeline",
      "domain": "guides"
    },
    {
      "slug": "guides/entity-detection",
      "title": "Entity Detection: Run It on Every Message",
      "domain": "guides"
    },
    {
      "slug": "guides/executive-assistant",
      "title": "Executive Assistant Pattern",
      "domain": "guides"
    },
    {
      "slug": "guides/idea-capture",
      "title": "Idea Capture: Originals, Depth, and Distribution",
      "domain": "guides"
    },
    {
      "slug": "guides/live-sync",
      "title": "Live Sync: Keep the Index Current",
      "domain": "guides"
    },
    {
      "slug": "guides/meeting-ingestion",
      "title": "Meeting Ingestion",
      "domain": "guides"
    },
    {
      "slug": "guides/minions-deployment",
      "title": "Minions Worker Deployment Guide",
      "domain": "guides"
    },
    {
      "slug": "guides/minions-fix",
      "title": "Minions fix — repairing a half-migrated install",
      "domain": "guides"
    },
    {
      "slug": "guides/minions-shell-jobs",
      "title": "Minions shell jobs — move deterministic crons off the gateway",
      "domain": "guides"
    },
    {
      "slug": "guides/multi-source-brains",
      "title": "Multi-source brains",
      "domain": "guides"
    },
    {
      "slug": "guides/operational-disciplines",
      "title": "Operational Disciplines",
      "domain": "guides"
    },
    {
      "slug": "guides/originals-folder",
      "title": "The Originals Folder",
      "domain": "guides"
    },
    {
      "slug": "guides/plugin-authors",
      "title": "Plugin authors guide (v0.15)",
      "domain": "guides"
    },
    {
      "slug": "guides/plugin-handlers",
      "title": "Plugin handlers — registering host-specific Minion handlers",
      "domain": "guides"
    },
    {
      "slug": "guides/push-context",
      "title": "Push-based context (#2095, v0.42.43.0)",
      "domain": "guides"
    },
    {
      "slug": "guides/queue-operations-runbook",
      "title": "Queue operations runbook",
      "domain": "guides"
    },
    {
      "slug": "guides/quiet-hours",
      "title": "Quiet Hours and Timezone-Aware Delivery",
      "domain": "guides"
    },
    {
      "slug": "guides/repo-architecture",
      "title": "Two-Repo Architecture: Agent Behavior vs World Knowledge",
      "domain": "guides"
    },
    {
      "slug": "guides/rls-and-you",
      "title": "RLS and you",
      "domain": "guides"
    },
    {
      "slug": "guides/scaling-skills",
      "title": "Scaling skills past 300 without drowning the context window",
      "domain": "guides"
    },
    {
      "slug": "guides/search-modes",
      "title": "Search Modes",
      "domain": "guides"
    },
    {
      "slug": "guides/skill-development",
      "title": "Skill Development Cycle",
      "domain": "guides"
    },
    {
      "slug": "guides/skillopt",
      "title": "Skillopt",
      "domain": "guides"
    },
    {
      "slug": "guides/skillpacks-as-scaffolding",
      "title": "Skillpacks as scaffolding, not amber",
      "domain": "guides"
    },
    {
      "slug": "guides/source-attribution",
      "title": "Source Attribution",
      "domain": "guides"
    },
    {
      "slug": "guides/sub-agent-routing",
      "title": "Sub-Agent Model Routing",
      "domain": "guides"
    },
    {
      "slug": "guides/upgrades-auto-update",
      "title": "Upgrades and Auto-Update Notifications",
      "domain": "guides"
    },
    {
      "slug": "how-modusbrain-works",
      "title": "How ModusBrain Works",
      "domain": "how-modusbrain-works"
    },
    {
      "slug": "inbox/2026-07-17-4616e2bc",
      "title": "Introduction",
      "domain": "inbox"
    },
    {
      "slug": "inbox/2026-07-17-b273a309",
      "title": "ModusBrain",
      "domain": "inbox"
    },
    {
      "slug": "inbox/2026-07-17-e02b98aa",
      "title": "ModusBrain is an operational knowledge engine for AI agents.",
      "domain": "inbox"
    },
    {
      "slug": "incidents/2026-05-20-lsd-cost-explosion",
      "title": "Incident Report: LSD Brainstorm 53× Cost Overrun",
      "domain": "incidents"
    },
    {
      "slug": "install",
      "title": "Install",
      "domain": "install"
    },
    {
      "slug": "integrations/credential-gateway",
      "title": "Credential Gateway (ClawVisor / Hermes)",
      "domain": "integrations"
    },
    {
      "slug": "integrations/embedding-providers",
      "title": "Embedding providers",
      "domain": "integrations"
    },
    {
      "slug": "integrations/meeting-webhooks",
      "title": "Meeting & Call Webhooks",
      "domain": "integrations"
    },
    {
      "slug": "integrations/pre-commit",
      "title": "Pre-commit hook for brain repos (v0.22.4+)",
      "domain": "integrations"
    },
    {
      "slug": "integrations/readme",
      "title": "Getting Data Into Your Brain",
      "domain": "integrations"
    },
    {
      "slug": "integrations/reliability-repair",
      "title": "Reliability repair (v0.12.2)",
      "domain": "integrations"
    },
    {
      "slug": "issues/cross-modal-search",
      "title": "Cross-Modal Search: Text↔Image Retrieval",
      "domain": "issues"
    },
    {
      "slug": "issues/doctor-auto-heal-and-scoring",
      "title": "Doctor Auto-Heal and Scoring Improvements",
      "domain": "issues"
    },
    {
      "slug": "mcp/alternatives",
      "title": "Remote MCP Deployment Options",
      "domain": "mcp"
    },
    {
      "slug": "mcp/chatgpt",
      "title": "Connect ModusBrain to ChatGPT",
      "domain": "mcp"
    },
    {
      "slug": "mcp/claude_code",
      "title": "Connect ModusBrain to Claude Code",
      "domain": "mcp"
    },
    {
      "slug": "mcp/claude_cowork",
      "title": "Connect ModusBrain to Claude Cowork",
      "domain": "mcp"
    },
    {
      "slug": "mcp/claude_desktop",
      "title": "Connect ModusBrain to Claude Desktop",
      "domain": "mcp"
    },
    {
      "slug": "mcp/codex",
      "title": "Connect ModusBrain to Codex",
      "domain": "mcp"
    },
    {
      "slug": "mcp/deploy",
      "title": "Deploy ModusBrain Remote MCP Server",
      "domain": "mcp"
    },
    {
      "slug": "mcp/perplexity",
      "title": "Connect ModusBrain to Perplexity Computer",
      "domain": "mcp"
    },
    {
      "slug": "migrations/v0.41.2-markdown-greenfield",
      "title": "Migrating your OpenClaw brain to modusbrain v0.41.2.0 (greenfield)",
      "domain": "migrations"
    },
    {
      "slug": "modusbrain_recommended_schema",
      "title": "Brain: The LLM-Maintained Knowledge Base",
      "domain": "modusbrain_recommended_schema"
    },
    {
      "slug": "modusbrain_skillpack",
      "title": "ModusBrain Skillpack: Reference Architecture for AI Agents",
      "domain": "modusbrain_skillpack"
    },
    {
      "slug": "modusbrain_v0",
      "title": "ModusBrain v0: Postgres-Native Personal Knowledge Brain",
      "domain": "modusbrain_v0"
    },
    {
      "slug": "modusbrain_verify",
      "title": "ModusBrain Installation Verification Runbook",
      "domain": "modusbrain_verify"
    },
    {
      "slug": "operations/headless-install",
      "title": "Headless install: Docker, CI, postinstall",
      "domain": "operations"
    },
    {
      "slug": "operations/spend-controls",
      "title": "Spend controls",
      "domain": "operations"
    },
    {
      "slug": "plans/2026-06-03-001-feat-idea-lineage-skill-plan",
      "title": "feat: Add idea-lineage thinking skill",
      "domain": "plans"
    },
    {
      "slug": "progress-events",
      "title": "Progress events",
      "domain": "progress-events"
    },
    {
      "slug": "proposals/temporal-contradiction-probe",
      "title": "Proposal: Temporal Axis for Contradiction Probe",
      "domain": "proposals"
    },
    {
      "slug": "quickstart-guide",
      "title": "Quickstart",
      "domain": "quickstart-guide"
    },
    {
      "slug": "releasing",
      "title": "Releasing & contributing (modusbrain)",
      "domain": "releasing"
    },
    {
      "slug": "schema-author-tutorial",
      "title": "Tutorial: Build your first schema pack",
      "domain": "schema-author-tutorial"
    },
    {
      "slug": "skillpack-anatomy",
      "title": "Skillpack anatomy",
      "domain": "skillpack-anatomy"
    },
    {
      "slug": "storage-tiering",
      "title": "Storage Tiering: db-tracked vs db-only directories",
      "domain": "storage-tiering"
    },
    {
      "slug": "takes-vs-facts",
      "title": "Takes vs Facts — Architectural Distinction",
      "domain": "takes-vs-facts"
    },
    {
      "slug": "testing",
      "title": "Testing (modusbrain repo)",
      "domain": "testing"
    },
    {
      "slug": "tutorials/company-brain",
      "title": "Tutorial: Extend your personal brain into a company brain",
      "domain": "tutorials"
    },
    {
      "slug": "tutorials/connect-coding-agent",
      "title": "Give your coding agent a memory: ModusBrain + Claude Code / Codex",
      "domain": "tutorials"
    },
    {
      "slug": "tutorials/improving-skills-with-skillopt",
      "title": "Auto-improve a skill with `modusbrain skillopt`",
      "domain": "tutorials"
    },
    {
      "slug": "tutorials/personal-brain",
      "title": "Tutorial: Set up your personal AI agent + brain from zero",
      "domain": "tutorials"
    },
    {
      "slug": "tutorials/readme",
      "title": "Tutorials",
      "domain": "tutorials"
    },
    {
      "slug": "upgrading_downstream_agents",
      "title": "Upgrading Downstream Agents",
      "domain": "upgrading_downstream_agents"
    },
    {
      "slug": "v0.38-smoke-test-report",
      "title": "v0.38.0.0 Smoke Test Report",
      "domain": "v0.38-smoke-test-report"
    },
    {
      "slug": "what-schemas-unlock",
      "title": "What schemas unlock",
      "domain": "what-schemas-unlock"
    }
  ],
  "total_orphans": 122,
  "total_linkable": 122,
  "total_pages": 122,
  "excluded": 0
}
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> # 15.6 — Check/fix missing backlinks across brain
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master> modusbrain check-backlinks check C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs
[backlinks.scan] done
No missing back-links found.
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
PS C:\Users\Shubham\Downloads\gbrain-master\gbrain-master>
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Shubham> # 2.1 — Show full config
PS C:\Users\Shubham> modusbrain config show
ModusBrain config:
  engine: pglite
  database_path: C:\Users\Shubham\.modusbrain\brain.pglite
  embedding_model: zeroentropyai:zembed-1
  embedding_dimensions: 1280
  zeroentropy_api_key: ***
  schema_pack: gbrain-base-v2
  mcp: [object Object]
  self_upgrade: [object Object]
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.2 — Get a specific config value
PS C:\Users\Shubham> modusbrain config get schema_pack
Config key not found: schema_pack
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.3 — Set a config value
PS C:\Users\Shubham> modusbrain config set schema_pack gbrain-base-v2
[config] Unknown config key "schema_pack".
[config] No similar known key. Run `modusbrain config show` to see currently-set keys.
[config] If this is intentional (downstream tooling, forward-compat), re-run with --force.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.4 — List configured AI models and their roles
PS C:\Users\Shubham> modusbrain models
Tier routing:
  tier.utility    anthropic:claude-haiku-4-5-20251001           [default]
  tier.reasoning  anthropic:claude-sonnet-4-6                   [default]
  tier.deep       anthropic:claude-opus-4-7                     [default]
  tier.subagent   anthropic:claude-sonnet-4-6                   [default]

Global default:
  models.default  (unset)

Per-task overrides:
  models.dream.synthesize            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.dream.synthesize_verdict    → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.dream.patterns              → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.drift                       → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.auto_think                  → anthropic:claude-opus-4-7                     [tier.deep]
  models.think                       → anthropic:claude-opus-4-7                     [tier.deep]
  models.subagent                    → anthropic:claude-sonnet-4-6                   [tier.subagent]
  facts.extraction_model             → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.longmemeval            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.contradictions_judge   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.expansion                   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.chat                        → anthropic:claude-sonnet-4-6                   [tier.reasoning]

Aliases:
  opus     → anthropic:claude-opus-4-7
  sonnet   → anthropic:claude-sonnet-4-6
  haiku    → anthropic:claude-haiku-4-5-20251001
  gemini   → google:gemini-3-pro
  gpt      → openai:gpt-5

Tip: probe reachability with `modusbrain models doctor` (opt-in; spends a minimal request per configured chat/embed/rerank surface).
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.5 — Probe each configured model with a 1-token test
PS C:\Users\Shubham> modusbrain models doctor
Tier routing:
  tier.utility    anthropic:claude-haiku-4-5-20251001           [default]
  tier.reasoning  anthropic:claude-sonnet-4-6                   [default]
  tier.deep       anthropic:claude-opus-4-7                     [default]
  tier.subagent   anthropic:claude-sonnet-4-6                   [default]

Global default:
  models.default  (unset)

Per-task overrides:
  models.dream.synthesize            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.dream.synthesize_verdict    → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.dream.patterns              → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.drift                       → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.auto_think                  → anthropic:claude-opus-4-7                     [tier.deep]
  models.think                       → anthropic:claude-opus-4-7                     [tier.deep]
  models.subagent                    → anthropic:claude-sonnet-4-6                   [tier.subagent]
  facts.extraction_model             → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.longmemeval            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.contradictions_judge   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.expansion                   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.chat                        → anthropic:claude-sonnet-4-6                   [tier.reasoning]

Aliases:
  opus     → anthropic:claude-opus-4-7
  sonnet   → anthropic:claude-sonnet-4-6
  haiku    → anthropic:claude-haiku-4-5-20251001
  gemini   → google:gemini-3-pro
  gpt      → openai:gpt-5

Tip: probe reachability with `modusbrain models doctor` (opt-in; spends a minimal request per configured chat/embed/rerank surface).
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.6 — Show brain statistics
PS C:\Users\Shubham> modusbrain stats
Pages:     0
Chunks:    0
Embedded:  0
Links:     0
Tags:      0
Timeline:  0

By type:
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.7 — Show brain health dashboard
PS C:\Users\Shubham> modusbrain health
Health score: 8/10
Embed coverage: 0.0%
Missing embeddings: 0
Stale pages: 0
Orphan pages: 0
Link coverage (entities): 0.0%
Timeline coverage (entities): 0.0%
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2.8 — Show current status
PS C:\Users\Shubham> modusbrain status

ModusBrain Status
=============
Mode: local  ·  v1.0.1  ·  2026-07-17T05:42:55.519Z

Sync:
  [UNKNOWN] default              never  pages=0  embed=100%
  1 unacknowledged sync failure(s)

Cycle:
  Last full cycle: never run
  Last targeted run: never run

Locks:
  (none active)

Workers (last 24h):
  crashes=0  clean_exits=0

Queue (live):
  active=0  waiting=0  failed=0  dead=0  completed=0

Autopilot:
  not running. Install with `modusbrain autopilot --install`.
PS C:\Users\Shubham> # 13.1 — List stored files
PS C:\Users\Shubham> modusbrain files list
No files stored.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 13.2 — Check storage tier status
PS C:\Users\Shubham> modusbrain storage status
Note: storage tiering has limited effect on PGLite — pages live in your local database file regardless of tier. The .gitignore management still keeps bulk content out of git history. To get full tiering, migrate to Postgres with `modusbrain migrate --to supabase`.
Storage Status
==============

No modusbrain.yml configuration found.

All pages are stored in git by default.
Total pages: 122
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 13.3 — Upload a file to a page
PS C:\Users\Shubham> modusbrain files upload C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\logo\moduslogo.svg --page README
Uploaded: README/moduslogo.svg (225 KB)
PS C:\Users\Shubham> # 14.1 — Export all pages to a directory
PS C:\Users\Shubham> modusbrain export --dir C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\exported-brain
Exporting 122 pages to C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\exported-brain/
[export.pages] 122/122 (100%) done
Exported 122 pages to C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\exported-brain/
PS C:\Users\Shubham>
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Shubham> # 3.1 — List all registered sources
PS C:\Users\Shubham> modusbrain sources list
SOURCES
───────
  default               federated          0 pages  never synced
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 3.2 — List sources as JSON
PS C:\Users\Shubham> modusbrain sources list --json
{
  "sources": [
    {
      "id": "default",
      "name": "default",
      "local_path": null,
      "federated": true,
      "page_count": 0,
      "last_sync_at": null
    }
  ]
}
PS C:\Users\Shubham> # 4.1 — Capture a single real file into the brain
PS C:\Users\Shubham> modusbrain capture --file C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\README.md
captured:
  slug:          inbox/2026-07-17-b273a309
  status:        created_or_updated
  content_hash:  b273a309c46982fc…
  captured_at:   2026-07-17T05:43:13.795Z
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4.2 — Capture another real file
PS C:\Users\Shubham> modusbrain capture --file C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\introduction.mdx
captured:
  slug:          inbox/2026-07-17-4616e2bc
  status:        created_or_updated
  content_hash:  4616e2bc4f0a3562…
  captured_at:   2026-07-17T05:43:18.015Z
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4.3 — Capture inline text content
PS C:\Users\Shubham> modusbrain capture "ModusBrain is an operational knowledge engine for AI agents."
captured:
  slug:          inbox/2026-07-17-e02b98aa
  status:        created_or_updated
  content_hash:  e02b98aa5e0e084f…
  captured_at:   2026-07-17T05:43:20.708Z
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4.4 — Capture with a custom slug and type
PS C:\Users\Shubham> modusbrain capture --file C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\quickstart.mdx --slug quickstart-guide --type procedure
captured:
  slug:          quickstart-guide
  status:        created_or_updated
  content_hash:  f3d5314949ba2d74…
  captured_at:   2026-07-17T05:43:23.346Z
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4.5 — Import an entire directory of markdown files
PS C:\Users\Shubham> modusbrain import C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs
[modusbrain phase] import.collect_files start dir=C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs strategy=markdown
[modusbrain phase] import.collect_files done 49ms files=118
Found 118 markdown files
[import.files] 7/118 (5%) imported=7 skipped=0 errors=0[modusbrain phase] import.process_file slow 5172ms tutorials\company-brain.md
[import.files] 22/118 (18%) imported=22 skipped=0 errors=0[modusbrain] content-sanity warn: modusbrain_recommended_schema (64209 bytes) — exceeds warn threshold, consider splitting
[modusbrain phase] import.process_file slow 7411ms MODUSBRAIN_RECOMMENDED_SCHEMA.md
[import.files] 89/118 (75%) imported=89 skipped=0 errors=0[modusbrain phase] import.process_file slow 10535ms ENGINES.md
[import.files] 92/118 (77%) imported=92 skipped=0 errors=0[modusbrain] content-sanity warn: designs/skillpack_registry_v1_spec (89072 bytes) — exceeds warn threshold, consider splitting
[modusbrain phase] import.process_file slow 7862ms designs\SKILLPACK_REGISTRY_V1_SPEC.md
[import.files] 94/118 (79%) imported=94 skipped=0 errors=0[modusbrain phase] import.process_file slow 8995ms designs\KNOWLEDGE_RUNTIME.md
[import.files] 110/118 (93%) imported=110 skipped=0 errors=0[modusbrain] content-sanity warn: architecture/key_files (448775 bytes) — exceeds warn threshold, consider splitting
[modusbrain phase] import.process_file slow 42603ms architecture\KEY_FILES.md
[import.files] 118/118 (100%) done

Import complete (285.1s):
  118 pages imported
  0 pages skipped (0 unchanged, 0 errors)
  1048 chunks created
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4.6 — Import without embedding (faster, embed later)
PS C:\Users\Shubham> modusbrain import C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs --no-embed
[modusbrain phase] import.collect_files start dir=C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\docs strategy=markdown
[modusbrain phase] import.collect_files done 81ms files=118
Found 118 markdown files
[import.files] 20/118 (16%) imported=0 skipped=20 errors=0[modusbrain] content-sanity warn: modusbrain_recommended_schema (64209 bytes) — exceeds warn threshold, consider splitting
[import.files] 90/118 (76%) imported=0 skipped=90 errors=0[modusbrain] content-sanity warn: designs/skillpack_registry_v1_spec (89072 bytes) — exceeds warn threshold, consider splitting
[import.files] 110/118 (93%) imported=0 skipped=110 errors=0[modusbrain] content-sanity warn: architecture/key_files (448775 bytes) — exceeds warn threshold, consider splitting
[import.files] 118/118 (100%) done

Import complete (1.0s):
  0 pages imported
  118 pages skipped (118 unchanged, 0 errors)
  0 chunks created
PS C:\Users\Shubham> # 11.1 — View timeline for a page
PS C:\Users\Shubham> modusbrain timeline README
No timeline entries.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 11.2 — Add a timeline entry
PS C:\Users\Shubham> modusbrain timeline-add README 2025-07-17 "Rebranded from gbrain to ModusBrain"
addTimelineEntry failed: page "README" (source=default) not found
PS C:\Users\Shubham> # 12.1 — Extract links from filesystem markdown files
PS C:\Users\Shubham> modusbrain extract links --source fs --dir C:\Users\Shubham\Downloads\gbrain-master\gbrain-master --dry-run
[extract.links_fs] start  agents → docs/architecture/thin-client (mentions)
  agents → docs/architecture/brains-and-sources (mentions)
  agents → skills/conventions/brain-routing (mentions)
  agents → docs/guides/live-sync (mentions)
  agents → docs/guides/minions-fix (mentions)
  agents → docs/eval-bench (mentions)
  agents → docs/architecture/topologies (mentions)
  changelog → docs/tutorials/connect-coding-agent (mentions)
  changelog → docs/operations/headless-install (mentions)
  contributing → docs/eval-bench (mentions)
  contributing → docs/eval-capture (mentions)
  cursor_modusbrain_feature_enhancement → company-brain-rfs-analysis (mentions)
  docs/ai-providers/llama-server-reranker → docs/eval-bench (mentions)
[extract.links_fs] 40/342 (11%)  docs/eval-bench → docs/eval-capture (mentions)
  docs/guides/brain-agent-loop → docs/guides/entity-detection (mentions)
  docs/guides/brain-agent-loop → docs/guides/brain-first-lookup (mentions)
  docs/guides/brain-first-lookup → docs/guides/brain-agent-loop (mentions)
  docs/guides/brain-first-lookup → docs/guides/search-modes (mentions)
[extract.links_fs] 50/342 (14%)  docs/guides/compiled-truth → docs/guides/source-attribution (mentions)
  docs/guides/compiled-truth → docs/guides/entity-detection (mentions)
  docs/guides/cron-schedule → recipes/email-to-brain (mentions)
  docs/guides/cron-schedule → recipes/x-to-brain (mentions)
  docs/guides/cron-schedule → recipes/meeting-sync (mentions)
  docs/guides/cron-schedule → recipes/calendar-to-brain (mentions)
  docs/guides/cron-schedule → docs/guides/quiet-hours (mentions)
  docs/guides/cron-schedule → docs/guides/operational-disciplines (mentions)
[extract.links_fs] 70/342 (20%)  docs/guides/scaling-skills → docs/guides/skillpacks-as-scaffolding (mentions)
  docs/guides/scaling-skills → docs/guides/skill-development (mentions)
  docs/guides/scaling-skills → docs/guides/sub-agent-routing (mentions)
  docs/guides/skillopt → docs/tutorials/improving-skills-with-skillopt (mentions)
[extract.links_fs] 80/342 (23%)  docs/install → docs/tutorials/company-brain (mentions)
  docs/install → docs/tutorials/connect-coding-agent (mentions)
  docs/install → docs/architecture/topologies (mentions)
  docs/integrations/embedding-providers → docs/ai-providers/zeroentropy (mentions)
  docs/integrations/embedding-providers → docs/ai-providers/llama-server-reranker (mentions)
  docs/integrations/readme → recipes/ngrok-tunnel (mentions)
  docs/integrations/readme → recipes/credential-gateway (mentions)
  docs/integrations/readme → recipes/twilio-voice-brain (mentions)
  docs/integrations/readme → recipes/email-to-brain (mentions)
  docs/integrations/readme → recipes/x-to-brain (mentions)
  docs/integrations/readme → recipes/calendar-to-brain (mentions)
  docs/integrations/readme → recipes/meeting-sync (mentions)
  docs/integrations/readme → docs/integrations/credential-gateway (mentions)
  docs/integrations/readme → docs/integrations/meeting-webhooks (mentions)
  docs/integrations/readme → docs/guides/deterministic-collectors (mentions)
  docs/integrations/readme → docs/architecture/infra-layer (mentions)
[extract.links_fs] 90/342 (26%)  docs/mcp/alternatives → recipes/ngrok-tunnel (mentions)
  docs/mcp/claude_code → docs/tutorials/connect-coding-agent (mentions)
  docs/mcp/claude_code → recipes/ngrok-tunnel (mentions)
  docs/mcp/claude_desktop → recipes/ngrok-tunnel (mentions)
  docs/mcp/codex → docs/tutorials/connect-coding-agent (mentions)
  docs/mcp/deploy → recipes/ngrok-tunnel (mentions)
  docs/mcp/deploy → recipes/twilio-voice-brain (mentions)
  docs/mcp/perplexity → recipes/ngrok-tunnel (mentions)
[extract.links_fs] 100/342 (29%)  docs/modusbrain_skillpack → docs/guides/brain-agent-loop (mentions)
  docs/modusbrain_skillpack → docs/guides/entity-detection (mentions)
  docs/modusbrain_skillpack → docs/guides/originals-folder (mentions)
  docs/modusbrain_skillpack → docs/guides/brain-first-lookup (mentions)
  docs/modusbrain_skillpack → docs/guides/compiled-truth (mentions)
  docs/modusbrain_skillpack → docs/guides/source-attribution (mentions)
  docs/modusbrain_skillpack → docs/guides/enrichment-pipeline (mentions)
  docs/modusbrain_skillpack → docs/guides/meeting-ingestion (mentions)
  docs/modusbrain_skillpack → docs/guides/content-media (mentions)
  docs/modusbrain_skillpack → docs/guides/diligence-ingestion (mentions)
  docs/modusbrain_skillpack → docs/guides/deterministic-collectors (mentions)
  docs/modusbrain_skillpack → docs/guides/idea-capture (mentions)
  docs/modusbrain_skillpack → docs/guides/cron-schedule (mentions)
  docs/modusbrain_skillpack → skills/conventions/cron-via-minions (mentions)
  docs/modusbrain_skillpack → docs/guides/plugin-handlers (mentions)
  docs/modusbrain_skillpack → docs/guides/minions-fix (mentions)
  docs/modusbrain_skillpack → docs/guides/minions-shell-jobs (mentions)
  docs/modusbrain_skillpack → docs/guides/quiet-hours (mentions)
  docs/modusbrain_skillpack → docs/guides/executive-assistant (mentions)
  docs/modusbrain_skillpack → docs/guides/operational-disciplines (mentions)
  docs/modusbrain_skillpack → docs/guides/skill-development (mentions)
  docs/modusbrain_skillpack → docs/guides/repo-architecture (mentions)
  docs/modusbrain_skillpack → docs/guides/sub-agent-routing (mentions)
  docs/modusbrain_skillpack → docs/guides/search-modes (mentions)
  docs/modusbrain_skillpack → docs/guides/brain-vs-memory (mentions)
  docs/modusbrain_skillpack → docs/integrations/credential-gateway (mentions)
  docs/modusbrain_skillpack → docs/integrations/meeting-webhooks (mentions)
  docs/modusbrain_skillpack → recipes/twilio-voice-brain (mentions)
  docs/modusbrain_skillpack → recipes/email-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/x-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/calendar-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/meeting-sync (mentions)
  docs/modusbrain_skillpack → docs/guides/upgrades-auto-update (mentions)
  docs/modusbrain_skillpack → docs/guides/live-sync (mentions)
  docs/modusbrain_skillpack → docs/architecture/infra-layer (mentions)
[extract.links_fs] 110/342 (32%)  docs/schema-author-tutorial → docs/what-schemas-unlock (mentions)
  docs/schema-author-tutorial → skills/conventions/schema-evolution (mentions)
  docs/tutorials/company-brain → docs/tutorials/personal-brain (mentions)
  docs/tutorials/company-brain → docs/skillpack-anatomy (mentions)
  docs/tutorials/connect-coding-agent → docs/tutorials/personal-brain (mentions)
  docs/tutorials/connect-coding-agent → docs/tutorials/company-brain (mentions)
  docs/tutorials/improving-skills-with-skillopt → docs/guides/skillopt (mentions)
  docs/tutorials/personal-brain → docs/tutorials/company-brain (mentions)
[extract.links_fs] 120/342 (35%)  docs/tutorials/readme → docs/tutorials/personal-brain (mentions)
  docs/tutorials/readme → docs/tutorials/company-brain (mentions)
  docs/tutorials/readme → docs/tutorials/improving-skills-with-skillopt (mentions)
  docs/tutorials/readme → docs/guides/skillopt (mentions)
  docs/tutorials/readme → docs/tutorials/connect-coding-agent (mentions)
  docs/tutorials/readme → docs/guides/scaling-skills (mentions)
  docs/what-schemas-unlock → docs/schema-author-tutorial (mentions)
  docs/what-schemas-unlock → skills/conventions/schema-evolution (mentions)
[extract.links_fs] 150/342 (43%)  recipes/credential-gateway → recipes/email-to-brain (mentions)
  recipes/credential-gateway → recipes/calendar-to-brain (mentions)
  recipes/ngrok-tunnel → recipes/twilio-voice-brain (mentions)
  recipes/twilio-voice-brain → recipes/agent-voice (mentions)
  recipes/twilio-voice-brain → recipes/ngrok-tunnel (mentions)
[extract.links_fs] 160/342 (46%)  skills/academic-verify/skill → skills/conventions/quality (mentions)
  skills/academic-verify/skill → skills/conventions/brain-first (mentions)
  skills/archive-crawler/skill → skills/conventions/quality (mentions)
  skills/article-enrichment/skill → skills/conventions/quality (mentions)
  skills/book-mirror/skill → skills/conventions/quality (mentions)
  skills/book-mirror/skill → skills/conventions/brain-first (mentions)
  skills/brain-pdf/skill → skills/conventions/quality (mentions)
[extract.links_fs] 170/342 (49%)  skills/citation-fixer/skill → skills/conventions/quality (mentions)
  skills/concept-synthesis/skill → skills/conventions/quality (mentions)
[extract.links_fs] 180/342 (52%)  skills/cross-modal-review/skill → skills/conventions/test-before-bulk (mentions)
  skills/cross-modal-review/skill → skills/conventions/model-routing (mentions)
[extract.links_fs] 190/342 (55%)  skills/idea-lineage/skill → skills/conventions/quality (mentions)
  skills/idea-lineage/skill → docs/takes-vs-facts (mentions)
[extract.links_fs] 240/342 (70%)  skills/perplexity-research/skill → skills/conventions/quality (mentions)
  skills/perplexity-research/skill → skills/conventions/brain-first (mentions)
  skills/schema-author/skill → skills/conventions/brain-first (mentions)
  skills/schema-author/skill → skills/conventions/schema-evolution (mentions)
  skills/schema-author/skill → docs/what-schemas-unlock (mentions)
  skills/schema-author/skill → docs/schema-author-tutorial (mentions)
[extract.links_fs] 250/342 (73%)  skills/strategic-reading/skill → skills/conventions/quality (mentions)
  skills/testing/skill → skills/conventions/quality (mentions)
  skills/voice-note-ingest/skill → skills/conventions/quality (mentions)
[extract.links_fs] 342/342 (100%) done
Links: (dry run) would create 132 from 342 pages
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 12.2 — Extract timeline entries (dry run)
PS C:\Users\Shubham> modusbrain extract timeline --source fs --dir C:\Users\Shubham\Downloads\gbrain-master\gbrain-master --dry-run
[extract.timeline_fs] 100/342 (29%)  docs/modusbrain_recommended_schema: 2026-04-07 — Replied to post about developer tools.
[extract.timeline_fs] 260/342 (76%)  test/e2e/fixtures/companies/novamind: 2025-03-15 — YC W25 Demo Day
  test/e2e/fixtures/companies/novamind: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/companies/novamind: 2025-04-01 — Hiring Kickoff
  test/e2e/fixtures/companies/threshold-ventures: 2025-03-18 — NovaMind Term Sheet
  test/e2e/fixtures/companies/threshold-ventures: 2025-03-28 — NovaMind Seed Closed
  test/e2e/fixtures/concepts/compiled-truth: 2025-02-10 — Pattern Formalized
  test/e2e/fixtures/concepts/compiled-truth: 2025-03-01 — Applied to All Page Types
  test/e2e/fixtures/concepts/hybrid-search: 2025-03-28 — Decision to Implement
  test/e2e/fixtures/concepts/hybrid-search: 2025-04-01 — Shipped in v0.3
  test/e2e/fixtures/concepts/retrieval-augmented-generation: 2025-02-15 — RAG Research
  test/e2e/fixtures/concepts/retrieval-augmented-generation: 2025-03-28 — Hybrid Search Decision
  test/e2e/fixtures/deals/novamind-seed: 2025-03-18 — Term Sheet Issued
  test/e2e/fixtures/deals/novamind-seed: 2025-03-28 — Round Closed
[extract.timeline_fs] 270/342 (78%)  test/e2e/fixtures/meetings/novamind-demo-day: 2025-03-15 — Event Notes
  test/e2e/fixtures/meetings/weekly-sync-mar28: 2025-03-28 — Meeting Notes
  test/e2e/fixtures/people/marcus-reid: 2025-03-18 — NovaMind Seed Term Sheet
  test/e2e/fixtures/people/marcus-reid: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/people/priya-patel: 2025-03-22 — Technical Deep Dive (via Sarah)
  test/e2e/fixtures/people/sarah-chen: 2025-03-15 — YC W25 Demo Day
  test/e2e/fixtures/people/sarah-chen: 2025-03-22 — Follow-up Call
  test/e2e/fixtures/people/sarah-chen: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/projects/modusbrain: 2025-02-01 — Project Started
  test/e2e/fixtures/projects/modusbrain: 2025-03-01 — Contract-First Refactor
  test/e2e/fixtures/projects/modusbrain: 2025-03-28 — Hybrid Search Decision
  test/e2e/fixtures/projects/modusbrain: 2025-04-01 — v0.3 Shipped
  test/e2e/fixtures/sources/crustdata-sarah-chen: 2025-03-20 — Data Retrieved
[extract.timeline_fs] 280/342 (81%)  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-01-12 — PMF startups in vertical-AI categories will compound
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-02-08 — example pivot from devtools to vertical-AI was
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-04-19 — start liquidity
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-06-22 — co's plateau is a marketing problem, not a product
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-09-11 — a portfolio companies
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2025-03-14 — AI valuations are running ahead of their actual
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2025-08-30 — c's recent hires suggest they're pivoting their
[extract.timeline_fs] 290/342 (84%)  test/fixtures/calibration/holdout/concept-founder-execution: 2024-07-11 — example shipped the acme-example MVP in 11 days
  test/fixtures/calibration/holdout/concept-founder-execution: 2024-11-19 — example is going to struggle with the
  test/fixtures/calibration/holdout/concept-founder-execution: 2025-02-28 — c portfolio's median time-to-first-paying-
  test/fixtures/calibration/holdout/concept-founder-execution: 2025-05-15 — example proved me wrong on widget-co. The
[extract.timeline_fs] 342/342 (100%) done
Timeline: (dry run) would create 38 entries from 342 pages
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 12.3 — Extract all (links + timeline, dry run)
PS C:\Users\Shubham> modusbrain extract all --source fs --dir C:\Users\Shubham\Downloads\gbrain-master\gbrain-master --dry-run
[extract.links_fs] start  agents → docs/architecture/thin-client (mentions)
  agents → docs/architecture/brains-and-sources (mentions)
  agents → skills/conventions/brain-routing (mentions)
  agents → docs/guides/live-sync (mentions)
  agents → docs/guides/minions-fix (mentions)
  agents → docs/eval-bench (mentions)
  agents → docs/architecture/topologies (mentions)
  changelog → docs/tutorials/connect-coding-agent (mentions)
  changelog → docs/operations/headless-install (mentions)
  contributing → docs/eval-bench (mentions)
  contributing → docs/eval-capture (mentions)
  cursor_modusbrain_feature_enhancement → company-brain-rfs-analysis (mentions)
  docs/ai-providers/llama-server-reranker → docs/eval-bench (mentions)
[extract.links_fs] 40/342 (11%)  docs/eval-bench → docs/eval-capture (mentions)
  docs/guides/brain-agent-loop → docs/guides/entity-detection (mentions)
  docs/guides/brain-agent-loop → docs/guides/brain-first-lookup (mentions)
  docs/guides/brain-first-lookup → docs/guides/brain-agent-loop (mentions)
  docs/guides/brain-first-lookup → docs/guides/search-modes (mentions)
[extract.links_fs] 50/342 (14%)  docs/guides/compiled-truth → docs/guides/source-attribution (mentions)
  docs/guides/compiled-truth → docs/guides/entity-detection (mentions)
  docs/guides/cron-schedule → recipes/email-to-brain (mentions)
  docs/guides/cron-schedule → recipes/x-to-brain (mentions)
  docs/guides/cron-schedule → recipes/meeting-sync (mentions)
  docs/guides/cron-schedule → recipes/calendar-to-brain (mentions)
  docs/guides/cron-schedule → docs/guides/quiet-hours (mentions)
  docs/guides/cron-schedule → docs/guides/operational-disciplines (mentions)
[extract.links_fs] 70/342 (20%)  docs/guides/scaling-skills → docs/guides/skillpacks-as-scaffolding (mentions)
  docs/guides/scaling-skills → docs/guides/skill-development (mentions)
  docs/guides/scaling-skills → docs/guides/sub-agent-routing (mentions)
  docs/guides/skillopt → docs/tutorials/improving-skills-with-skillopt (mentions)
[extract.links_fs] 80/342 (23%)  docs/install → docs/tutorials/company-brain (mentions)
  docs/install → docs/tutorials/connect-coding-agent (mentions)
  docs/install → docs/architecture/topologies (mentions)
  docs/integrations/embedding-providers → docs/ai-providers/zeroentropy (mentions)
  docs/integrations/embedding-providers → docs/ai-providers/llama-server-reranker (mentions)
  docs/integrations/readme → recipes/ngrok-tunnel (mentions)
  docs/integrations/readme → recipes/credential-gateway (mentions)
  docs/integrations/readme → recipes/twilio-voice-brain (mentions)
  docs/integrations/readme → recipes/email-to-brain (mentions)
  docs/integrations/readme → recipes/x-to-brain (mentions)
  docs/integrations/readme → recipes/calendar-to-brain (mentions)
  docs/integrations/readme → recipes/meeting-sync (mentions)
  docs/integrations/readme → docs/integrations/credential-gateway (mentions)
  docs/integrations/readme → docs/integrations/meeting-webhooks (mentions)
  docs/integrations/readme → docs/guides/deterministic-collectors (mentions)
  docs/integrations/readme → docs/architecture/infra-layer (mentions)
[extract.links_fs] 90/342 (26%)  docs/mcp/alternatives → recipes/ngrok-tunnel (mentions)
  docs/mcp/claude_code → docs/tutorials/connect-coding-agent (mentions)
  docs/mcp/claude_code → recipes/ngrok-tunnel (mentions)
  docs/mcp/claude_desktop → recipes/ngrok-tunnel (mentions)
  docs/mcp/codex → docs/tutorials/connect-coding-agent (mentions)
  docs/mcp/deploy → recipes/ngrok-tunnel (mentions)
  docs/mcp/deploy → recipes/twilio-voice-brain (mentions)
  docs/mcp/perplexity → recipes/ngrok-tunnel (mentions)
[extract.links_fs] 100/342 (29%)  docs/modusbrain_skillpack → docs/guides/brain-agent-loop (mentions)
  docs/modusbrain_skillpack → docs/guides/entity-detection (mentions)
  docs/modusbrain_skillpack → docs/guides/originals-folder (mentions)
  docs/modusbrain_skillpack → docs/guides/brain-first-lookup (mentions)
  docs/modusbrain_skillpack → docs/guides/compiled-truth (mentions)
  docs/modusbrain_skillpack → docs/guides/source-attribution (mentions)
  docs/modusbrain_skillpack → docs/guides/enrichment-pipeline (mentions)
  docs/modusbrain_skillpack → docs/guides/meeting-ingestion (mentions)
  docs/modusbrain_skillpack → docs/guides/content-media (mentions)
  docs/modusbrain_skillpack → docs/guides/diligence-ingestion (mentions)
  docs/modusbrain_skillpack → docs/guides/deterministic-collectors (mentions)
  docs/modusbrain_skillpack → docs/guides/idea-capture (mentions)
  docs/modusbrain_skillpack → docs/guides/cron-schedule (mentions)
  docs/modusbrain_skillpack → skills/conventions/cron-via-minions (mentions)
  docs/modusbrain_skillpack → docs/guides/plugin-handlers (mentions)
  docs/modusbrain_skillpack → docs/guides/minions-fix (mentions)
  docs/modusbrain_skillpack → docs/guides/minions-shell-jobs (mentions)
  docs/modusbrain_skillpack → docs/guides/quiet-hours (mentions)
  docs/modusbrain_skillpack → docs/guides/executive-assistant (mentions)
  docs/modusbrain_skillpack → docs/guides/operational-disciplines (mentions)
  docs/modusbrain_skillpack → docs/guides/skill-development (mentions)
  docs/modusbrain_skillpack → docs/guides/repo-architecture (mentions)
  docs/modusbrain_skillpack → docs/guides/sub-agent-routing (mentions)
  docs/modusbrain_skillpack → docs/guides/search-modes (mentions)
  docs/modusbrain_skillpack → docs/guides/brain-vs-memory (mentions)
  docs/modusbrain_skillpack → docs/integrations/credential-gateway (mentions)
  docs/modusbrain_skillpack → docs/integrations/meeting-webhooks (mentions)
  docs/modusbrain_skillpack → recipes/twilio-voice-brain (mentions)
  docs/modusbrain_skillpack → recipes/email-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/x-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/calendar-to-brain (mentions)
  docs/modusbrain_skillpack → recipes/meeting-sync (mentions)
  docs/modusbrain_skillpack → docs/guides/upgrades-auto-update (mentions)
  docs/modusbrain_skillpack → docs/guides/live-sync (mentions)
  docs/modusbrain_skillpack → docs/architecture/infra-layer (mentions)
[extract.links_fs] 110/342 (32%)  docs/schema-author-tutorial → docs/what-schemas-unlock (mentions)
  docs/schema-author-tutorial → skills/conventions/schema-evolution (mentions)
  docs/tutorials/company-brain → docs/tutorials/personal-brain (mentions)
  docs/tutorials/company-brain → docs/skillpack-anatomy (mentions)
  docs/tutorials/connect-coding-agent → docs/tutorials/personal-brain (mentions)
  docs/tutorials/connect-coding-agent → docs/tutorials/company-brain (mentions)
  docs/tutorials/improving-skills-with-skillopt → docs/guides/skillopt (mentions)
  docs/tutorials/personal-brain → docs/tutorials/company-brain (mentions)
[extract.links_fs] 120/342 (35%)  docs/tutorials/readme → docs/tutorials/personal-brain (mentions)
  docs/tutorials/readme → docs/tutorials/company-brain (mentions)
  docs/tutorials/readme → docs/tutorials/improving-skills-with-skillopt (mentions)
  docs/tutorials/readme → docs/guides/skillopt (mentions)
  docs/tutorials/readme → docs/tutorials/connect-coding-agent (mentions)
  docs/tutorials/readme → docs/guides/scaling-skills (mentions)
  docs/what-schemas-unlock → docs/schema-author-tutorial (mentions)
  docs/what-schemas-unlock → skills/conventions/schema-evolution (mentions)
[extract.links_fs] 150/342 (43%)  recipes/credential-gateway → recipes/email-to-brain (mentions)
  recipes/credential-gateway → recipes/calendar-to-brain (mentions)
  recipes/ngrok-tunnel → recipes/twilio-voice-brain (mentions)
  recipes/twilio-voice-brain → recipes/agent-voice (mentions)
  recipes/twilio-voice-brain → recipes/ngrok-tunnel (mentions)
[extract.links_fs] 160/342 (46%)  skills/academic-verify/skill → skills/conventions/quality (mentions)
  skills/academic-verify/skill → skills/conventions/brain-first (mentions)
  skills/archive-crawler/skill → skills/conventions/quality (mentions)
  skills/article-enrichment/skill → skills/conventions/quality (mentions)
  skills/book-mirror/skill → skills/conventions/quality (mentions)
  skills/book-mirror/skill → skills/conventions/brain-first (mentions)
  skills/brain-pdf/skill → skills/conventions/quality (mentions)
[extract.links_fs] 170/342 (49%)  skills/citation-fixer/skill → skills/conventions/quality (mentions)
  skills/concept-synthesis/skill → skills/conventions/quality (mentions)
[extract.links_fs] 180/342 (52%)  skills/cross-modal-review/skill → skills/conventions/test-before-bulk (mentions)
  skills/cross-modal-review/skill → skills/conventions/model-routing (mentions)
[extract.links_fs] 190/342 (55%)  skills/idea-lineage/skill → skills/conventions/quality (mentions)
  skills/idea-lineage/skill → docs/takes-vs-facts (mentions)
[extract.links_fs] 240/342 (70%)  skills/perplexity-research/skill → skills/conventions/quality (mentions)
  skills/perplexity-research/skill → skills/conventions/brain-first (mentions)
  skills/schema-author/skill → skills/conventions/brain-first (mentions)
  skills/schema-author/skill → skills/conventions/schema-evolution (mentions)
  skills/schema-author/skill → docs/what-schemas-unlock (mentions)
  skills/schema-author/skill → docs/schema-author-tutorial (mentions)
[extract.links_fs] 250/342 (73%)  skills/strategic-reading/skill → skills/conventions/quality (mentions)
  skills/testing/skill → skills/conventions/quality (mentions)
  skills/voice-note-ingest/skill → skills/conventions/quality (mentions)
[extract.links_fs] 342/342 (100%) done
Links: (dry run) would create 132 from 342 pages
[extract.timeline_fs] 100/342 (29%)  docs/modusbrain_recommended_schema: 2026-04-07 — Replied to post about developer tools.
[extract.timeline_fs] 260/342 (76%)  test/e2e/fixtures/companies/novamind: 2025-03-15 — YC W25 Demo Day
  test/e2e/fixtures/companies/novamind: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/companies/novamind: 2025-04-01 — Hiring Kickoff
  test/e2e/fixtures/companies/threshold-ventures: 2025-03-18 — NovaMind Term Sheet
  test/e2e/fixtures/companies/threshold-ventures: 2025-03-28 — NovaMind Seed Closed
  test/e2e/fixtures/concepts/compiled-truth: 2025-02-10 — Pattern Formalized
  test/e2e/fixtures/concepts/compiled-truth: 2025-03-01 — Applied to All Page Types
  test/e2e/fixtures/concepts/hybrid-search: 2025-03-28 — Decision to Implement
  test/e2e/fixtures/concepts/hybrid-search: 2025-04-01 — Shipped in v0.3
  test/e2e/fixtures/concepts/retrieval-augmented-generation: 2025-02-15 — RAG Research
  test/e2e/fixtures/concepts/retrieval-augmented-generation: 2025-03-28 — Hybrid Search Decision
  test/e2e/fixtures/deals/novamind-seed: 2025-03-18 — Term Sheet Issued
  test/e2e/fixtures/deals/novamind-seed: 2025-03-28 — Round Closed
[extract.timeline_fs] 270/342 (78%)  test/e2e/fixtures/meetings/novamind-demo-day: 2025-03-15 — Event Notes
  test/e2e/fixtures/meetings/weekly-sync-mar28: 2025-03-28 — Meeting Notes
  test/e2e/fixtures/people/marcus-reid: 2025-03-18 — NovaMind Seed Term Sheet
  test/e2e/fixtures/people/marcus-reid: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/people/priya-patel: 2025-03-22 — Technical Deep Dive (via Sarah)
  test/e2e/fixtures/people/sarah-chen: 2025-03-15 — YC W25 Demo Day
  test/e2e/fixtures/people/sarah-chen: 2025-03-22 — Follow-up Call
  test/e2e/fixtures/people/sarah-chen: 2025-03-28 — Seed Round Closed
  test/e2e/fixtures/projects/modusbrain: 2025-02-01 — Project Started
  test/e2e/fixtures/projects/modusbrain: 2025-03-01 — Contract-First Refactor
  test/e2e/fixtures/projects/modusbrain: 2025-03-28 — Hybrid Search Decision
  test/e2e/fixtures/projects/modusbrain: 2025-04-01 — v0.3 Shipped
  test/e2e/fixtures/sources/crustdata-sarah-chen: 2025-03-20 — Data Retrieved
[extract.timeline_fs] 280/342 (81%)  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-01-12 — PMF startups in vertical-AI categories will compound
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-02-08 — example pivot from devtools to vertical-AI was
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-04-19 — start liquidity
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-06-22 — co's plateau is a marketing problem, not a product
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2024-09-11 — a portfolio companies
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2025-03-14 — AI valuations are running ahead of their actual
  test/fixtures/calibration/extract-takes-corpus/concept-startup-market-dynamics: 2025-08-30 — c's recent hires suggest they're pivoting their
[extract.timeline_fs] 290/342 (84%)  test/fixtures/calibration/holdout/concept-founder-execution: 2024-07-11 — example shipped the acme-example MVP in 11 days
  test/fixtures/calibration/holdout/concept-founder-execution: 2024-11-19 — example is going to struggle with the
  test/fixtures/calibration/holdout/concept-founder-execution: 2025-02-28 — c portfolio's median time-to-first-paying-
  test/fixtures/calibration/holdout/concept-founder-execution: 2025-05-15 — example proved me wrong on widget-co. The
[extract.timeline_fs] 342/342 (100%) done
Timeline: (dry run) would create 38 entries from 342 pages
PS C:\Users\Shubham>
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Shubham> # 5.1 — List all pages in the brain
PS C:\Users\Shubham> modusbrain list
advanced-cli    concept 2026-07-17      Advanced CLI Commands
ai-providers/llama-server-reranker      note    2026-07-17      llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider
ai-providers/zeroentropy        note    2026-07-17      ZeroEntropy — zembed-1 + zerank-2
architecture/brains-and-sources note    2026-07-17      Brains and Sources — the mental model
architecture/calibration-quality-gate-spec      note    2026-07-17      Calibration Quality Gate — Falsifiability Filter + Category Classification
architecture/frontmatter-scan-incremental       note    2026-07-17      Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)
architecture/infra-layer        note    2026-07-17      ModusBrain Infrastructure Layer
architecture/key_files  note    2026-07-17      Key files — per-file index (modusbrain repo)
architecture/lens-packs note    2026-07-17      Lens packs (v0.41.2.0)
architecture/pack-upgrade-mechanism     note    2026-07-17      Pack-Upgrade Mechanism (v0.41.22)
architecture/retrieval_maxpool_incident note    2026-07-17      Retrieval Incident: a chosen-name page was missed, and the fix
architecture/retrieval  note    2026-07-17      Why the hybrid + graph stack works
architecture/schema-packs       note    2026-07-17      Schema Packs
architecture/serve-sync-concurrency     concept 2026-07-17      Serve Sync Concurrency
architecture/system-of-record   note    2026-07-17      System of record
architecture/thin-client        note    2026-07-17      Thin-client routing (remote MCP)
architecture/topologies note    2026-07-17      ModusBrain Deployment Topologies
architecture/type-taxonomy      note    2026-07-17      Type Taxonomy (v0.41.22: gbrain-base-v2)
contradictions  note    2026-07-17      modusbrain eval suspected-contradictions (v0.32.6)
designs/2026_05_eval_plan       note    2026-07-17      Embedder Shootout — May 2026 Eval Plan
designs/code_cathedral_ii       note    2026-07-17      Code Cathedral II — v0.20.0 Design
designs/community_ideas note    2026-07-17      Community Ideas Ledger
designs/homebrew_for_personal_ai        note    2026-07-17      Homebrew for Personal AI Infrastructure
designs/knowledge_runtime       note    2026-07-17      ModusBrain Knowledge Runtime — Design Doc
designs/minions_agent_orchestration     concept 2026-07-17      Minions Agent Orchestration
designs/skillpack_registry_v1_spec      note    2026-07-17      Skillpack Publish + Registry + Install Spec (post-v0.36.0.0)
designs/v038_schema_packs       concept 2026-07-17      V038 Schema Packs
embedding-migrations    note    2026-07-17      Switching embedding models or dimensions on an existing brain
engines note    2026-07-17      Pluggable Engine Architecture
ethos/markdown_skills_as_recipes        essay   2026-07-17      Homebrew for Personal AI
ethos/origin    note    2026-07-17      Origin story
ethos/thin_harness_fat_skills   essay   2026-07-17      Thin Harness, Fat Skills
eval-bench      note    2026-07-17      Running real-world eval benchmarks against your modusbrain changes
eval-benchmarking       concept 2026-07-17      Eval & Benchmarking
eval-capture    note    2026-07-17      Eval capture — NDJSON schema reference
eval-takes-quality      concept 2026-07-17      Eval Takes Quality
eval/metric_glossary    note    2026-07-17      Evaluation Metric Glossary
eval/search_mode_methodology    note    2026-07-17      Search Mode Evaluation Methodology
guardrails      note    2026-07-17      Content Guardrail Seams
guides/agent-to-modusbrain      note    2026-07-17      How a downstream agent should talk to modusbrain
guides/brain-agent-loop note    2026-07-17      The Brain-Agent Loop
guides/brain-first-lookup       note    2026-07-17      Brain-First Lookup Protocol
guides/brain-vs-memory  note    2026-07-17      Brain vs Memory vs Session
guides/compiled-truth   note    2026-07-17      Compiled Truth + Timeline Pattern
guides/content-media    note    2026-07-17      Content and Media Ingestion
guides/cron-schedule    note    2026-07-17      Reference Cron Schedule
guides/deterministic-collectors note    2026-07-17      Deterministic Collectors: Code for Data, LLMs for Judgment
guides/diligence-ingestion      note    2026-07-17      Diligence Ingestion: Data Room to Brain Pages
guides/enrichment-pipeline      note    2026-07-17      Enrichment Pipeline
guides/entity-detection note    2026-07-17      Entity Detection: Run It on Every Message
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.2 — List pages (limit to 10)
PS C:\Users\Shubham> modusbrain list -n 10
advanced-cli    concept 2026-07-17      Advanced CLI Commands
ai-providers/llama-server-reranker      note    2026-07-17      llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider
ai-providers/zeroentropy        note    2026-07-17      ZeroEntropy — zembed-1 + zerank-2
architecture/brains-and-sources note    2026-07-17      Brains and Sources — the mental model
architecture/calibration-quality-gate-spec      note    2026-07-17      Calibration Quality Gate — Falsifiability Filter + Category Classification
architecture/frontmatter-scan-incremental       note    2026-07-17      Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)
architecture/infra-layer        note    2026-07-17      ModusBrain Infrastructure Layer
architecture/key_files  note    2026-07-17      Key files — per-file index (modusbrain repo)
architecture/lens-packs note    2026-07-17      Lens packs (v0.41.2.0)
architecture/pack-upgrade-mechanism     note    2026-07-17      Pack-Upgrade Mechanism (v0.41.22)
architecture/retrieval_maxpool_incident note    2026-07-17      Retrieval Incident: a chosen-name page was missed, and the fix
architecture/retrieval  note    2026-07-17      Why the hybrid + graph stack works
architecture/schema-packs       note    2026-07-17      Schema Packs
architecture/serve-sync-concurrency     concept 2026-07-17      Serve Sync Concurrency
architecture/system-of-record   note    2026-07-17      System of record
architecture/thin-client        note    2026-07-17      Thin-client routing (remote MCP)
architecture/topologies note    2026-07-17      ModusBrain Deployment Topologies
architecture/type-taxonomy      note    2026-07-17      Type Taxonomy (v0.41.22: gbrain-base-v2)
contradictions  note    2026-07-17      modusbrain eval suspected-contradictions (v0.32.6)
designs/2026_05_eval_plan       note    2026-07-17      Embedder Shootout — May 2026 Eval Plan
designs/code_cathedral_ii       note    2026-07-17      Code Cathedral II — v0.20.0 Design
designs/community_ideas note    2026-07-17      Community Ideas Ledger
designs/homebrew_for_personal_ai        note    2026-07-17      Homebrew for Personal AI Infrastructure
designs/knowledge_runtime       note    2026-07-17      ModusBrain Knowledge Runtime — Design Doc
designs/minions_agent_orchestration     concept 2026-07-17      Minions Agent Orchestration
designs/skillpack_registry_v1_spec      note    2026-07-17      Skillpack Publish + Registry + Install Spec (post-v0.36.0.0)
designs/v038_schema_packs       concept 2026-07-17      V038 Schema Packs
embedding-migrations    note    2026-07-17      Switching embedding models or dimensions on an existing brain
engines note    2026-07-17      Pluggable Engine Architecture
ethos/markdown_skills_as_recipes        essay   2026-07-17      Homebrew for Personal AI
ethos/origin    note    2026-07-17      Origin story
ethos/thin_harness_fat_skills   essay   2026-07-17      Thin Harness, Fat Skills
eval-bench      note    2026-07-17      Running real-world eval benchmarks against your modusbrain changes
eval-benchmarking       concept 2026-07-17      Eval & Benchmarking
eval-capture    note    2026-07-17      Eval capture — NDJSON schema reference
eval-takes-quality      concept 2026-07-17      Eval Takes Quality
eval/metric_glossary    note    2026-07-17      Evaluation Metric Glossary
eval/search_mode_methodology    note    2026-07-17      Search Mode Evaluation Methodology
guardrails      note    2026-07-17      Content Guardrail Seams
guides/agent-to-modusbrain      note    2026-07-17      How a downstream agent should talk to modusbrain
guides/brain-agent-loop note    2026-07-17      The Brain-Agent Loop
guides/brain-first-lookup       note    2026-07-17      Brain-First Lookup Protocol
guides/brain-vs-memory  note    2026-07-17      Brain vs Memory vs Session
guides/compiled-truth   note    2026-07-17      Compiled Truth + Timeline Pattern
guides/content-media    note    2026-07-17      Content and Media Ingestion
guides/cron-schedule    note    2026-07-17      Reference Cron Schedule
guides/deterministic-collectors note    2026-07-17      Deterministic Collectors: Code for Data, LLMs for Judgment
guides/diligence-ingestion      note    2026-07-17      Diligence Ingestion: Data Room to Brain Pages
guides/enrichment-pipeline      note    2026-07-17      Enrichment Pipeline
guides/entity-detection note    2026-07-17      Entity Detection: Run It on Every Message
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.3 — List pages filtered by type
PS C:\Users\Shubham> modusbrain list --type procedure
quickstart-guide        procedure       2026-07-17      Quickstart
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.4 — Read a specific page (use a slug from the list output above)
PS C:\Users\Shubham> modusbrain get README
Error [page_not_found]: Page not found: README
  Fix: Page may be soft-deleted; pass include_deleted: true to verify
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.5 — Write/update a page from a file
PS C:\Users\Shubham> modusbrain put test-page < C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\README.md
At line:1 char:26
+ modusbrain put test-page < C:\Users\Shubham\Downloads\gbrain-master\g ...
+                          ~
The '<' operator is reserved for future use.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : RedirectionNotSupported

PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.6 — View page version history (use a slug that exists)
PS C:\Users\Shubham> modusbrain history README
No versions.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5.7 — Delete a test page
PS C:\Users\Shubham> modusbrain delete test-page
Error [page_not_found]: Page not found: test-page
  Fix: Check the slug.
PS C:\Users\Shubham> # 6.1 — Generate embeddings for all stale pages
PS C:\Users\Shubham> modusbrain embed --stale
Embedded 0 chunks (0 stale found)
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 6.2 — Generate embeddings for all pages
PS C:\Users\Shubham> modusbrain embed --all
[embed.pages] 122/122 (100%)Embedded 1066 chunks across 122 pages
[embed.pages] 122/122 (100%) done
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 6.3 — Generate embedding for a single page (use a real slug)
PS C:\Users\Shubham> modusbrain embed README
Page not found: README
PS C:\Users\Shubham> # 7.1 — Basic keyword search
PS C:\Users\Shubham> modusbrain search "operational skills"
[0.8861] how-modusbrain-works -- is:
- **Linked** back to the source documents it was compiled from (provenance)
- **Versioned** so y
[0.8634] inbox/2026-07-17-4616e2bc -- <img className="block dark:hidden" src="/docs/modusbrain-black.svg" />
<img className="hidden dark:
[0.7673] tutorials/company-brain -- - `weekly-team-digest`. Only you (admin) run this. Aggregates everyone's published pages into one we
[0.7535] modusbrain_skillpack -- The collector pattern |
| [Idea Capture & Originals](guides/idea-capture.md) | Depth test, originali
[0.7484] ethos/markdown_skills_as_recipes -- It builds.

And because the source code is English, forking is trivial. Don't like how the voice age
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 7.2 — Hybrid search (RRF + expansion)
PS C:\Users\Shubham> modusbrain query "How does ModusBrain compile skills?"
[0.8929] quickstart-guide -- Welcome to the ModusBrain Quickstart Guide. This walk-through is designed to get you up and running
[0.8696] inbox/2026-07-17-4616e2bc -- <img className="block dark:hidden" src="/docs/modusbrain-black.svg" />
<img className="hidden dark:
[0.8681] modusbrain_skillpack -- <!-- skillpack-version: 0.7.0 -->
<!-- source: https://raw.githubusercontent.com/garrytan/modusbrain
[0.8666] inbox/2026-07-17-b273a309 -- # ModusBrain

**The operational execution layer for autonomous AI agents.**

[![License: MIT](https:
[0.8136] architecture/infra-layer -- | 4-layer result deduplication |
| `src/core/search/expansion.ts` | Multi-query expansion via Claude
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 7.3 — Hybrid search without query expansion
PS C:\Users\Shubham> modusbrain query "confidence gating" --no-expand
[0.8756] guides/push-context -- # Push-based context (#2095, v0.42.43.0)

Retrieval used to be pull-only: the agent had to *know to
[0.8337] contradictions -- The MCP op accepts a severity filter
so agents can fetch just the high-priority items.

## How to in
[0.8330] inbox/2026-07-17-4616e2bc -- <img className="block dark:hidden" src="/docs/modusbrain-black.svg" />
<img className="hidden dark:
[0.8289] how-modusbrain-works -- # How ModusBrain Works

ModusBrain adds a **safe execution layer** on top of the underlying RAG engi
[0.8256] architecture/lens-packs -- Activate via `modusbrain config set schema_pack modusbrain-everything` and
calibration_profile produ
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 7.4 — Ask (alias for query)
PS C:\Users\Shubham> modusbrain ask "What is the audit trail?"
[0.8651] quickstart-guide -- $300 refund for order #1204" \
  --context '{"amount":300}'
```
---
## Step 5: Verify the action
[0.7921] guides/minions-shell-jobs -- **Audit trail, not forensic insurance.** Every submission writes a JSONL line
to `~/.modusbrain/audi
[0.7424] inbox/2026-07-17-4616e2bc -- <img className="block dark:hidden" src="/docs/modusbrain-black.svg" />
<img className="hidden dark:
[0.6961] architecture/system-of-record -- ### FS-canonical (markdown is the source of truth)

These are user-authored knowledge. The DB row is
[0.6902] guides/push-context -- | Key | Default | What it does |
|---|---|---|
| `retrieval_reflex_window_turns` | 4 | turns the amb
[0.5354] how-modusbrain-works -- # How ModusBrain Works

ModusBrain adds a **safe execution layer** on top of the underlying RAG engi
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 7.5 — Synthesis with citations
PS C:\Users\Shubham> modusbrain think "Explain how ModusBrain keeps agents safe."
# Explain how ModusBrain keeps agents safe.

(no LLM available — set ANTHROPIC_API_KEY or pass `client`)

## Gaps
- no LLM available; gather succeeded but synthesis skipped

---
Model: anthropic:claude-opus-4-7 | Pages: 5 | Takes: 0 | Graph: 0 | Citations: 0
Warnings: NO_ANTHROPIC_API_KEY
PS C:\Users\Shubham> # 8.1 — List all operational skills
PS C:\Users\Shubham> modusbrain opskill list
No operational skills yet. Run: modusbrain skill compile "<topic>"
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.2 — Compile a new skill from brain content
PS C:\Users\Shubham> modusbrain opskill compile "refund handling" --risk-tier high_stakes
Draft skill compiled: refund-handling v1
Status: draft (requires approval before agent execution)
Matched sources: quickstart-guide, inbox/2026-07-17-b273a309, eval-benchmarking, how-modusbrain-works, architecture/key_files, designs/knowledge_runtime, designs/skillpack_registry_v1_spec, guardrails, guides/cron-schedule, guides/upgrades-auto-update, modusbrain_skillpack, tutorials/company-brain
Risk tier: high_stakes, threshold: 0.85

Next: modusbrain skill approve refund-handling --by cli
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.3 — Show the compiled skill details
PS C:\Users\Shubham> modusbrain opskill show refund-handling
# refund handling (refund-handling)
Owner: (unset)

## v1 [draft] risk=high_stakes
Threshold: 0.85, policy: serve_last_approved
Sources: quickstart-guide, inbox/2026-07-17-b273a309, eval-benchmarking, how-modusbrain-works, architecture/key_files, designs/knowledge_runtime, designs/skillpack_registry_v1_spec, guardrails, guides/cron-schedule, guides/upgrades-auto-update, modusbrain_skillpack, tutorials/company-brain
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.4 — Approve the skill for agent execution
PS C:\Users\Shubham> modusbrain opskill approve refund-handling --by owner@company.com
Approved: refund-handling v1 (active)
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.5 — Execute the skill with confidence gating
PS C:\Users\Shubham> modusbrain opskill execute refund-handling --task "Process $300 refund for order #1204" --context "{\"amount\":300}"
Invalid --context JSON
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.6 — View the audit trail for this skill
PS C:\Users\Shubham> modusbrain opskill audit --slug refund-handling
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.7 — View the audit trail as JSON
PS C:\Users\Shubham> modusbrain opskill audit --slug refund-handling --json
[]
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.8 — Issue an approval token for high-stakes execution
PS C:\Users\Shubham> modusbrain opskill approve-token refund-handling
Approval token (1h TTL):
appr_refund-handling_v1_mrol1wio
Use: modusbrain skill execute refund-handling --approval-token appr_refund-handling_v1_mrol1wio ...
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.9 — Submit a correction (feedback loop)
PS C:\Users\Shubham> modusbrain opskill correct refund-handling --correction "Amounts over $400 require manager sign-off" --by manager@company.com
Usage: modusbrain skill correct <slug> --original "..." --correction "..."
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.10 — Flag a conflict for owner review
PS C:\Users\Shubham> modusbrain opskill flag-conflict refund-handling --description "Policy docs disagree on refund threshold"
Conflict #1 flagged for refund-handling
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.11 — List all open conflicts
PS C:\Users\Shubham> modusbrain opskill conflicts
#1 skill_id=1 [open] Policy docs disagree on refund threshold
  owner=(unset) sources=
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8.12 — Resolve a conflict (use the ID from 8.11 output)
PS C:\Users\Shubham> # modusbrain opskill resolve <conflict-id> --by owner@company.com --note "Use the $400 threshold"
PS C:\Users\Shubham> # 9.1 — List tags on a page (use a real slug from your brain)
PS C:\Users\Shubham> modusbrain tags README
No tags.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 9.2 — Add a tag
PS C:\Users\Shubham> modusbrain tag README operations
addTag failed: page "README" (source=default) not found
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 9.3 — Remove a tag
PS C:\Users\Shubham> modusbrain untag README operations
{
  "status": "ok"
}
PS C:\Users\Shubham> # 10.1 — Create a link between two pages
PS C:\Users\Shubham> modusbrain link README quickstart-guide --link-type related
addLink failed: page "README" (source=default) or "quickstart-guide" (source=default) not found
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10.2 — View backlinks (incoming links to a page)
PS C:\Users\Shubham> modusbrain backlinks README
[]
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10.3 — Traverse the link graph
PS C:\Users\Shubham> modusbrain graph README --depth 2
[]
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10.4 — Edge-based graph query
PS C:\Users\Shubham> modusbrain graph-query README --direction both --depth 2
No edges found from README.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10.5 — Remove a link
PS C:\Users\Shubham> modusbrain unlink README quickstart-guide --link-type related
{
  "status": "ok"
}
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10.6 — List all link provenances with edge counts
PS C:\Users\Shubham> modusbrain link-sources
[]
PS C:\Users\Shubham>
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Shubham> # 16.1 — Brainstorm ideas from brain content
PS C:\Users\Shubham> modusbrain brainstorm "How can we improve agent safety?"
[brainstorm] estimated cost: $0.78 (4×6 = 24 crosses × 3 ideas + judge)
[brainstorm] Press Ctrl-C within 10s to abort, or wait to proceed...
[brainstorm] calibration cold-start, judging without bias context.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [mcp/claude_cowork] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [eval/metric_glossary] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [architecture/pack-upgrade-mechanism] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [guides/compiled-truth] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [integrations/pre-commit] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-4616e2bc] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [mcp/claude_cowork] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [eval/metric_glossary] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [architecture/pack-upgrade-mechanism] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [guides/compiled-truth] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [integrations/pre-commit] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [inbox/2026-07-17-b273a309] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [mcp/claude_cowork] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [eval/metric_glossary] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [architecture/pack-upgrade-mechanism] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [guides/compiled-truth] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [integrations/pre-commit] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/skillopt] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [mcp/claude_cowork] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [eval/metric_glossary] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [architecture/pack-upgrade-mechanism] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [guides/compiled-truth] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [integrations/pre-commit] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[brainstorm] WARN: cross [guides/scaling-skills] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
brainstorm: no ideas generated across 24 crosses. Check API keys via `modusbrain models doctor`.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 16.2 — Lateral Synaptic Drift (creative brainstorm)
PS C:\Users\Shubham> modusbrain lsd "What unconventional approaches to company knowledge could work?"
[lsd] estimated cost: $0.96 (2×12 = 24 crosses × 4 ideas + judge)
[lsd] Press Ctrl-C within 10s to abort, or wait to proceed...
[lsd] calibration cold-start, judging without bias context.
[lsd] WARN: cross [tutorials/company-brain] × [guides/minions-fix] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [guides/queue-operations-runbook] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [guides/minions-deployment] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [guides/rls-and-you] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [ai-providers/llama-server-reranker] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [architecture/serve-sync-concurrency] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [designs/2026_05_eval_plan] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [integrations/embedding-providers] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [operations/spend-controls] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [architecture/retrieval_maxpool_incident] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [tutorials/company-brain] × [operations/headless-install] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [guides/minions-fix] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [guides/queue-operations-runbook] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [guides/minions-deployment] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [guides/rls-and-you] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [ai-providers/llama-server-reranker] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [architecture/serve-sync-concurrency] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [designs/2026_05_eval_plan] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [integrations/embedding-providers] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [operations/spend-controls] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [inbox/2026-07-17-e02b98aa] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [architecture/retrieval_maxpool_incident] failed: Anthropic chat requires ANTHROPIC_API_KEY.
[lsd] WARN: cross [what-schemas-unlock] × [operations/headless-install] failed: Anthropic chat requires ANTHROPIC_API_KEY.
lsd: no ideas generated across 24 crosses. Check API keys via `modusbrain models doctor`.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 16.3 — View page salience ranking
PS C:\Users\Shubham> modusbrain salience
#   score   emo   takes   slug — title
--------------------------------------
1   0.954   0.00  0       advanced-cli — Advanced CLI Commands
2   0.954   0.00  0       ai-providers/llama-server-reranker — llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider
3   0.954   0.00  0       ai-providers/zeroentropy — ZeroEntropy — zembed-1 + zerank-2
4   0.954   0.00  0       architecture/brains-and-sources — Brains and Sources — the mental model
5   0.954   0.00  0       architecture/calibration-quality-gate-spec — Calibration Quality Gate — Falsifiability Filter + Category Classification
6   0.954   0.00  0       architecture/frontmatter-scan-incremental — Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)
7   0.954   0.00  0       architecture/infra-layer — ModusBrain Infrastructure Layer
8   0.954   0.00  0       architecture/key_files — Key files — per-file index (modusbrain repo)
9   0.954   0.00  0       architecture/lens-packs — Lens packs (v0.41.2.0)
10  0.954   0.00  0       architecture/pack-upgrade-mechanism — Pack-Upgrade Mechanism (v0.41.22)
11  0.954   0.00  0       architecture/retrieval_maxpool_incident — Retrieval Incident: a chosen-name page was missed, and the fix
12  0.954   0.00  0       architecture/retrieval — Why the hybrid + graph stack works
13  0.954   0.00  0       architecture/schema-packs — Schema Packs
14  0.954   0.00  0       architecture/serve-sync-concurrency — Serve Sync Concurrency
15  0.954   0.00  0       architecture/system-of-record — System of record
16  0.954   0.00  0       architecture/thin-client — Thin-client routing (remote MCP)
17  0.954   0.00  0       architecture/topologies — ModusBrain Deployment Topologies
18  0.954   0.00  0       architecture/type-taxonomy — Type Taxonomy (v0.41.22: gbrain-base-v2)
19  0.954   0.00  0       contradictions — modusbrain eval suspected-contradictions (v0.32.6)
20  0.954   0.00  0       designs/2026_05_eval_plan — Embedder Shootout — May 2026 Eval Plan
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 16.4 — Detect statistical anomalies
PS C:\Users\Shubham> modusbrain anomalies
6 anomalous cohort(s) for 2026-07-17:

[type=note] count=110, baseline mean=0.00±0.00, sigma=110.00
  pages: ai-providers/llama-server-reranker, ai-providers/zeroentropy, architecture/brains-and-sources, architecture/calibration-quality-gate-spec, architecture/frontmatter-scan-incremental, +45 more
[type=concept] count=8, baseline mean=0.00±0.00, sigma=8.00
  pages: advanced-cli, architecture/serve-sync-concurrency, designs/minions_agent_orchestration, designs/v038_schema_packs, eval-benchmarking, +3 more
[tag=agents] count=2, baseline mean=0.00±0.00, sigma=2.00
  pages: ethos/markdown_skills_as_recipes, ethos/thin_harness_fat_skills
[tag=ai] count=2, baseline mean=0.00±0.00, sigma=2.00
  pages: ethos/markdown_skills_as_recipes, ethos/thin_harness_fat_skills
[tag=gstack] count=2, baseline mean=0.00±0.00, sigma=2.00
  pages: ethos/markdown_skills_as_recipes, ethos/thin_harness_fat_skills
[type=essay] count=2, baseline mean=0.00±0.00, sigma=2.00
  pages: ethos/markdown_skills_as_recipes, ethos/thin_harness_fat_skills
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 16.5 — View recent transcripts
PS C:\Users\Shubham> modusbrain transcripts recent
(no recent transcripts in the corpus dir)
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 16.6 — Scan features and recommend unused ones
PS C:\Users\Shubham> modusbrain features

Brain score: 45/100

UNUSED FEATURES:
  Build Link Graph: 122 pages but 0 links. Your brain is a flat file cabinet, not a knowledge graph.
    Try: modusbrain extract links
  Extract Timeline: No structured timeline entries. Your brain can't answer "when did X happen?"
    Try: modusbrain extract timeline
  Set Up Integrations: 7 integration recipes available but not configured: Email to Brain, Calendar Sync, X/Twitter to Brain, Voice to Brain, Meeting Sync, Credential Gateway, Ngrok Tunnel.
    Try: modusbrain integrations list
  Configure Sync: Brain not syncing from git. Changes in your repo don't reach your brain.
    Try: modusbrain sync --repo <path>

Run 'modusbrain features --auto-fix' to fix all auto-fixable issues.
PS C:\Users\Shubham> # 1. Version
PS C:\Users\Shubham> modusbrain --version
modusbrain 1.0.1
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 2. Health
PS C:\Users\Shubham> modusbrain doctor --fast

ModusBrain Health Check
===================

Top issues (ranked by cause):
  [FAIL] sync_failures → 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [WARN] connection → Skipping DB checks (--fast mode, URL present from config-file-path)
  [WARN] resolver_health → Could not find skills directory
  [WARN] retrieval_reflex_health → pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`

  [WARN] resolver_health: Could not find skills directory
  [WARN] retrieval_reflex_health: pglite — serve IPC socket not present; enabled but no observed activity and no visible resolve path (host capability may still supply it; policy skill carries otherwise) — policy skill not installed; run `modusbrain integrations install retrieval-reflex --target <host-repo>`
  [FAIL] sync_failures: 1 unresolved sync failure(s) [SLUG_MISMATCH=1]. notes/bad.md (Frontmatter slug "wrong-slug" does not match path-derived sl). Fix the file(s) and re-run 'modusbrain sync', or use 'modusbrain sync --skip-failed' to acknowledge.
  [OK] nightly_quality_probe_health: disabled (opt-in). Enable with: modusbrain config set autopilot.nightly_quality_probe.enabled true
  [OK] progressive_batch_audit_health: No progressive-batch operations in the last 7 days
  [OK] conversation_parser_probe_health: Skipped (nightly probe is opt-in; enable with `modusbrain config set autopilot.conversation_parser_probe.enabled true`)
  [OK] home_dir_in_worktree: modusbrain home is outside any enclosing git worktree.
  [WARN] connection: Skipping DB checks (--fast mode, URL present from config-file-path)

Brain checks:  80/100  (category penalty)
Skill checks:  90/100
Ops checks:    95/100
Meta checks:   100/100

Overall health score: 65/100. Failed checks found.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 3. Config
PS C:\Users\Shubham> modusbrain config show
ModusBrain config:
  engine: pglite
  database_path: C:\Users\Shubham\.modusbrain\brain.pglite
  embedding_model: zeroentropyai:zembed-1
  embedding_dimensions: 1280
  zeroentropy_api_key: ***
  schema_pack: gbrain-base-v2
  mcp: [object Object]
  self_upgrade: [object Object]
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 4. Capture a file
PS C:\Users\Shubham> modusbrain capture --file C:\Users\Shubham\Downloads\gbrain-master\gbrain-master\README.md
captured:
  slug:          inbox/2026-07-17-b273a309
  status:        skipped
  content_hash:  b273a309c46982fc…
  captured_at:   2026-07-17T06:57:24.143Z
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 5. List pages
PS C:\Users\Shubham> modusbrain list
advanced-cli    concept 2026-07-17      Advanced CLI Commands
ai-providers/llama-server-reranker      note    2026-07-17      llama-server reranker (local) — Qwen3-Reranker, self-hosted ZE, any ZE-wire-shape provider
ai-providers/zeroentropy        note    2026-07-17      ZeroEntropy — zembed-1 + zerank-2
architecture/brains-and-sources note    2026-07-17      Brains and Sources — the mental model
architecture/calibration-quality-gate-spec      note    2026-07-17      Calibration Quality Gate — Falsifiability Filter + Category Classification
architecture/frontmatter-scan-incremental       note    2026-07-17      Frontmatter scan: DB-backed incremental state (Phase 2 design sketch)
architecture/infra-layer        note    2026-07-17      ModusBrain Infrastructure Layer
architecture/key_files  note    2026-07-17      Key files — per-file index (modusbrain repo)
architecture/lens-packs note    2026-07-17      Lens packs (v0.41.2.0)
architecture/pack-upgrade-mechanism     note    2026-07-17      Pack-Upgrade Mechanism (v0.41.22)
architecture/retrieval_maxpool_incident note    2026-07-17      Retrieval Incident: a chosen-name page was missed, and the fix
architecture/retrieval  note    2026-07-17      Why the hybrid + graph stack works
architecture/schema-packs       note    2026-07-17      Schema Packs
architecture/serve-sync-concurrency     concept 2026-07-17      Serve Sync Concurrency
architecture/system-of-record   note    2026-07-17      System of record
architecture/thin-client        note    2026-07-17      Thin-client routing (remote MCP)
architecture/topologies note    2026-07-17      ModusBrain Deployment Topologies
architecture/type-taxonomy      note    2026-07-17      Type Taxonomy (v0.41.22: gbrain-base-v2)
contradictions  note    2026-07-17      modusbrain eval suspected-contradictions (v0.32.6)
designs/2026_05_eval_plan       note    2026-07-17      Embedder Shootout — May 2026 Eval Plan
designs/code_cathedral_ii       note    2026-07-17      Code Cathedral II — v0.20.0 Design
designs/community_ideas note    2026-07-17      Community Ideas Ledger
designs/homebrew_for_personal_ai        note    2026-07-17      Homebrew for Personal AI Infrastructure
designs/knowledge_runtime       note    2026-07-17      ModusBrain Knowledge Runtime — Design Doc
designs/minions_agent_orchestration     concept 2026-07-17      Minions Agent Orchestration
designs/skillpack_registry_v1_spec      note    2026-07-17      Skillpack Publish + Registry + Install Spec (post-v0.36.0.0)
designs/v038_schema_packs       concept 2026-07-17      V038 Schema Packs
embedding-migrations    note    2026-07-17      Switching embedding models or dimensions on an existing brain
engines note    2026-07-17      Pluggable Engine Architecture
ethos/markdown_skills_as_recipes        essay   2026-07-17      Homebrew for Personal AI
ethos/origin    note    2026-07-17      Origin story
ethos/thin_harness_fat_skills   essay   2026-07-17      Thin Harness, Fat Skills
eval-bench      note    2026-07-17      Running real-world eval benchmarks against your modusbrain changes
eval-benchmarking       concept 2026-07-17      Eval & Benchmarking
eval-capture    note    2026-07-17      Eval capture — NDJSON schema reference
eval-takes-quality      concept 2026-07-17      Eval Takes Quality
eval/metric_glossary    note    2026-07-17      Evaluation Metric Glossary
eval/search_mode_methodology    note    2026-07-17      Search Mode Evaluation Methodology
guardrails      note    2026-07-17      Content Guardrail Seams
guides/agent-to-modusbrain      note    2026-07-17      How a downstream agent should talk to modusbrain
guides/brain-agent-loop note    2026-07-17      The Brain-Agent Loop
guides/brain-first-lookup       note    2026-07-17      Brain-First Lookup Protocol
guides/brain-vs-memory  note    2026-07-17      Brain vs Memory vs Session
guides/compiled-truth   note    2026-07-17      Compiled Truth + Timeline Pattern
guides/content-media    note    2026-07-17      Content and Media Ingestion
guides/cron-schedule    note    2026-07-17      Reference Cron Schedule
guides/deterministic-collectors note    2026-07-17      Deterministic Collectors: Code for Data, LLMs for Judgment
guides/diligence-ingestion      note    2026-07-17      Diligence Ingestion: Data Room to Brain Pages
guides/enrichment-pipeline      note    2026-07-17      Enrichment Pipeline
guides/entity-detection note    2026-07-17      Entity Detection: Run It on Every Message
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 6. Search
PS C:\Users\Shubham> modusbrain search "ModusBrain"
[1.1355] inbox/2026-07-17-b273a309 -- Check the Secure Audit Trail
Inspect the queryable execution log containing parameters, versions, an
[0.9042] architecture/schema-packs -- # Schema Packs

A schema pack tells modusbrain what shape your brain takes — which directories
exist
[0.9023] guides/brain-vs-memory -- just shared"                  -> session

# Lookup routing:
on user_asks(question):
    if question.
[0.8383] what-schemas-unlock -- - The downstream `think` skill can now answer "what did we decide about pricing in the last three ro
[0.8330] tutorials/readme -- # Tutorials

Step-by-step walkthroughs that take you from zero to a working outcome. Concrete comman
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 7. Compile a skill
PS C:\Users\Shubham> modusbrain opskill compile "refund handling" --risk-tier low_stakes
Draft skill compiled: refund-handling v2
Status: draft (requires approval before agent execution)
Matched sources: quickstart-guide, inbox/2026-07-17-b273a309, eval-benchmarking, how-modusbrain-works, architecture/key_files, designs/knowledge_runtime, designs/skillpack_registry_v1_spec, guardrails, guides/cron-schedule, guides/upgrades-auto-update, modusbrain_skillpack, tutorials/company-brain
Risk tier: low_stakes, threshold: 0.7

Next: modusbrain skill approve refund-handling --by cli
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 8. List skills
PS C:\Users\Shubham> modusbrain opskill list
refund-handling refund handling active=v1
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 9. Models
PS C:\Users\Shubham> modusbrain models
Tier routing:
  tier.utility    anthropic:claude-haiku-4-5-20251001           [default]
  tier.reasoning  anthropic:claude-sonnet-4-6                   [default]
  tier.deep       anthropic:claude-opus-4-7                     [default]
  tier.subagent   anthropic:claude-sonnet-4-6                   [default]

Global default:
  models.default  (unset)

Per-task overrides:
  models.dream.synthesize            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.dream.synthesize_verdict    → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.dream.patterns              → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.drift                       → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.auto_think                  → anthropic:claude-opus-4-7                     [tier.deep]
  models.think                       → anthropic:claude-opus-4-7                     [tier.deep]
  models.subagent                    → anthropic:claude-sonnet-4-6                   [tier.subagent]
  facts.extraction_model             → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.longmemeval            → anthropic:claude-sonnet-4-6                   [tier.reasoning]
  models.eval.contradictions_judge   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.expansion                   → anthropic:claude-haiku-4-5-20251001           [tier.utility]
  models.chat                        → anthropic:claude-sonnet-4-6                   [tier.reasoning]

Aliases:
  opus     → anthropic:claude-opus-4-7
  sonnet   → anthropic:claude-sonnet-4-6
  haiku    → anthropic:claude-haiku-4-5-20251001
  gemini   → google:gemini-3-pro
  gpt      → openai:gpt-5

Tip: probe reachability with `modusbrain models doctor` (opt-in; spends a minimal request per configured chat/embed/rerank surface).
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 10. Features scan
PS C:\Users\Shubham> modusbrain features

Brain score: 45/100

UNUSED FEATURES:
  Build Link Graph: 122 pages but 0 links. Your brain is a flat file cabinet, not a knowledge graph.
    Try: modusbrain extract links
  Extract Timeline: No structured timeline entries. Your brain can't answer "when did X happen?"
    Try: modusbrain extract timeline
  Set Up Integrations: 7 integration recipes available but not configured: Email to Brain, Calendar Sync, X/Twitter to Brain, Voice to Brain, Meeting Sync, Credential Gateway, Ngrok Tunnel.
    Try: modusbrain integrations list
  Configure Sync: Brain not syncing from git. Changes in your repo don't reach your brain.
    Try: modusbrain sync --repo <path>

Run 'modusbrain features --auto-fix' to fix all auto-fixable issues.
PS C:\Users\Shubham>
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Shubham> # 17.1 — Validate the skill tree (reachability, MECE, DRY)
PS C:\Users\Shubham> modusbrain check-resolvable --skills-dir skills/
resolver_health: FAIL — 1 issue(s): 1 error(s), 0 warning(s)
  • missing_file       RESOLVER.md or AGENTS.md Create C:\Users\Shubham\skills\RESOLVER.md with skill routing tables, or add 'triggers:' to each SKILL.md frontmatter
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 17.2 — Validate with JSON output
PS C:\Users\Shubham> modusbrain check-resolvable --skills-dir skills/ --json
{
  "ok": false,
  "skillsDir": "C:\\Users\\Shubham\\skills",
  "report": {
    "ok": false,
    "errors": [
      {
        "type": "missing_file",
        "severity": "error",
        "skill": "RESOLVER.md or AGENTS.md",
        "message": "RESOLVER.md or AGENTS.md not found in C:\\Users\\Shubham\\skills or its parent (and no SKILL.md frontmatter declares triggers:)",
        "action": "Create C:\\Users\\Shubham\\skills\\RESOLVER.md with skill routing tables, or add 'triggers:' to each SKILL.md frontmatter",
        "fix": {
          "type": "create_stub",
          "file": "C:\\Users\\Shubham\\skills\\RESOLVER.md"
        }
      }
    ],
    "warnings": [],
    "issues": [
      {
        "type": "missing_file",
        "severity": "error",
        "skill": "RESOLVER.md or AGENTS.md",
        "message": "RESOLVER.md or AGENTS.md not found in C:\\Users\\Shubham\\skills or its parent (and no SKILL.md frontmatter declares triggers:)",
        "action": "Create C:\\Users\\Shubham\\skills\\RESOLVER.md with skill routing tables, or add 'triggers:' to each SKILL.md frontmatter",
        "fix": {
          "type": "create_stub",
          "file": "C:\\Users\\Shubham\\skills\\RESOLVER.md"
        }
      }
    ],
    "summary": {
      "total_skills": 0,
      "reachable": 0,
      "unreachable": 0,
      "overlaps": 0,
      "gaps": 0
    }
  },
  "autoFix": null,
  "deferred": [],
  "error": null,
  "message": null
}
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 17.3 — Show skill resolvers
PS C:\Users\Shubham> modusbrain resolvers
Usage: modusbrain resolvers <subcommand> [options]

Subcommands:
  list                    List all registered resolvers (pretty table)
  list --json             List as JSON
  list --cost <c>         Filter by cost: free, rate-limited, paid
  list --backend <b>      Filter by backend label
  describe <id>           Show schema + availability for a single resolver

Examples:
  modusbrain resolvers list
  modusbrain resolvers list --cost paid
  modusbrain resolvers describe x_handle_to_tweet

PS C:\Users\Shubham> # 18.1 — Start MCP server (stdio mode — will block; Ctrl+C to stop)
PS C:\Users\Shubham> # modusbrain serve
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 18.2 — Start HTTP MCP server on port 3000 (will block; Ctrl+C to stop)
PS C:\Users\Shubham> # modusbrain serve --http --port 3000
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 18.3 — Print tool discovery JSON
PS C:\Users\Shubham> modusbrain --tools-json
[
  {
    "name": "get_page",
    "description": "Read a page by slug (supports optional fuzzy matching). Soft-deleted pages are hidden by default; pass include_deleted: true to surface them with deleted_at populated (see v0.26.5 recovery window).",
    "parameters": {
      "slug": "string",
      "fuzzy": "boolean?",
      "include_deleted": "boolean?"
    }
  },
  {
    "name": "put_page",
    "description": "Write/update a page (markdown with frontmatter). Chunks, embeds, reconciles tags, and (when auto_link/auto_timeline are enabled) extracts + reconciles graph links and timeline entries. For large content on Windows (pipe-buffer limit ~45KB) or any file-as-input workflow, use `modusbrain capture --file PATH --slug SLUG` — capture reads the file as a Buffer with a binary-NUL guard and adds provenance write-through (v0.39.3.0).",
    "parameters": {
      "slug": "string",
      "content": "string",
      "source_kind": "string?",
      "source_uri": "string?",
      "ingested_via": "string?"
    }
  },
  {
    "name": "delete_page",
    "description": "Soft-delete a page. The row is hidden from search and from get_page/list_pages, but is recoverable via restore_page within 72h. The autopilot purge phase hard-deletes after the recovery window. Pass include_deleted: true to get_page to verify the soft-delete landed.",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "list_pages",
    "description": "List pages with optional filters. For 'what's recent / what did I touch this week' questions, use list_pages with sort=updated_desc instead of semantic search.",
    "parameters": {
      "type": "string?",
      "tag": "string?",
      "limit": "number?",
      "updated_after": "string?",
      "sort": "string?",
      "include_deleted": "boolean?"
    }
  },
  {
    "name": "restore_page",
    "description": "v0.26.5 — restore a soft-deleted page (clear deleted_at). Returns success only if the page was actually soft-deleted. After this op, the page reappears in search and in get_page/list_pages without the include_deleted flag.",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "purge_deleted_pages",
    "description": "v0.26.5 — admin-only. Hard-deletes pages whose deleted_at is older than older_than_hours (default 72). Cascades through content_chunks, page_links, chunk_relations. Local CLI only (not exposed over HTTP MCP). Manual escape hatch alongside the autopilot purge phase.",
    "parameters": {
      "older_than_hours": "number?"
    }
  },
  {
    "name": "search",
    "description": "Keyword search using full-text search. For personal/emotional questions, prefer get_recent_salience or find_anomalies — they surface activity bursts without needing a search term. For code-symbol questions (callers, callees, definitions, blast radius), use code_callers / code_callees / code_def / code_refs instead — those return structural graph data, not text chunks.",
    "parameters": {
      "query": "string",
      "limit": "number?",
      "offset": "number?",
      "mode": "string?"
    }
  },
  {
    "name": "query",
    "description": "Hybrid search with vector + keyword + multi-query expansion. For personal/emotional questions ('what's going on with me', 'anything notable', 'how am I feeling'), prefer get_recent_salience, find_anomalies, or get_recent_transcripts. Semantic search returns polished pages and misses recent activity bursts. Do NOT assume words like 'crazy', 'notable', or 'big' mean impressive — they often mean difficult or emotionally charged.",
    "parameters": {
      "query": "string?",
      "image": "string?",
      "image_mime": "string?",
      "limit": "number?",
      "offset": "number?",
      "expand": "boolean?",
      "detail": "string?",
      "mode": "string?",
      "lang": "string?",
      "symbol_kind": "string?",
      "near_symbol": "string?",
      "walk_depth": "number?",
      "salience": "string?",
      "recency": "string?",
      "since": "string?",
      "until": "string?",
      "source_id": "string?",
      "cross_modal": "string?",
      "embedding_column": "string?",
      "adaptive_return": "boolean?",
      "autocut": "boolean?",
      "relational": "boolean?"
    }
  },
  {
    "name": "search_by_image",
    "description": "v0.36 cross-modal Phase 2: image-as-query retrieval. Accepts a local path (CLI), data: URI, or http(s):// URL (SSRF-defended). Returns visually-similar image chunks plus any OCR text they carry. Optional `query` text refinement merges via weighted RRF (D13 hybrid intersect). True image→full-text-knowledge requires Phase 3 (`modusbrain reindex --multimodal` + `search.unified_multimodal: true`).",
    "parameters": {
      "image_path": "string?",
      "image_url": "string?",
      "image_data": "string?",
      "image_mime": "string?",
      "query": "string?",
      "limit": "number?",
      "offset": "number?",
      "source_id": "string?"
    }
  },
  {
    "name": "add_tag",
    "description": "Add tag to page",
    "parameters": {
      "slug": "string",
      "tag": "string"
    }
  },
  {
    "name": "remove_tag",
    "description": "Remove tag from page",
    "parameters": {
      "slug": "string",
      "tag": "string"
    }
  },
  {
    "name": "get_tags",
    "description": "List tags for a page",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "add_link",
    "description": "Create link between pages",
    "parameters": {
      "from": "string",
      "to": "string",
      "link_type": "string?",
      "context": "string?",
      "link_source": "string?"
    }
  },
  {
    "name": "remove_link",
    "description": "Remove link between pages",
    "parameters": {
      "from": "string",
      "to": "string",
      "link_type": "string?",
      "link_source": "string?"
    }
  },
  {
    "name": "get_links",
    "description": "List outgoing links from a page",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "get_backlinks",
    "description": "List incoming links to a page",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "list_link_sources",
    "description": "List distinct link_source provenances in the brain with edge counts (e.g. citation-graph, manual, markdown)",
    "parameters": {}
  },
  {
    "name": "traverse_graph",
    "description": "Traverse link graph from a page. With link_type/direction, returns edges (GraphPath[]) instead of nodes.",
    "parameters": {
      "slug": "string",
      "depth": "number?",
      "link_type": "string?",
      "direction": "string?"
    }
  },
  {
    "name": "add_timeline_entry",
    "description": "Add timeline entry to a page",
    "parameters": {
      "slug": "string",
      "date": "string",
      "summary": "string",
      "detail": "string?",
      "source": "string?"
    }
  },
  {
    "name": "get_timeline",
    "description": "Get timeline entries for a page",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "get_stats",
    "description": "Brain statistics (page count, chunk count, etc.)",
    "parameters": {}
  },
  {
    "name": "get_health",
    "description": "Brain health dashboard (embed coverage, stale pages, orphans)",
    "parameters": {}
  },
  {
    "name": "run_doctor",
    "description": "Run brain health checks and return a structured DoctorReport (thin-client doctor surface).",
    "parameters": {}
  },
  {
    "name": "get_versions",
    "description": "Page version history",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "revert_version",
    "description": "Revert page to a previous version",
    "parameters": {
      "slug": "string",
      "version_id": "number"
    }
  },
  {
    "name": "get_brain_identity",
    "description": "Brain identity + counters for thin-client banner. Returns version, engine kind, and page/chunk counts. Read-scope.",
    "parameters": {}
  },
  {
    "name": "list_skills",
    "description": "List the skills this agent's brain publishes. A skill is a named prose instruction set (NOT executable code) that teaches you how to do a task using this server's other tools. Returns a flat catalog — each entry has a name, one-line description, triggers (phrasings that should invoke it), and `usable_tools` / `unavailable_tools` (which tools the skill calls that you CAN vs CANNOT call given this server + your access). To actually use a skill, call get_skill with its name, read the returned prose, and follow it — calling the correspondingly-named tools on THIS server. The response also carries an `instructions` envelope explaining this protocol. Reflects the serving repo's skills even when the call targets a mounted brain. Read-scope; published only when the brain owner enabled mcp.publish_skills.",
    "parameters": {
      "section": "string?"
    }
  },
  {
    "name": "get_skill",
    "description": "Fetch one skill's full instructions by name. Returns `{name, frontmatter (sanitized), body, usable_tools, unavailable_tools, client_guidance}`. The `body` is prose — read it as your operating instructions for this task, and when it says to search / store / look something up, call the same-named MCP tool on THIS server. There is nothing to 'execute' — the value is the instructions plus your tool calls back to this server. Tools listed in `unavailable_tools` won't work for you (not exposed here, or beyond your access) — adapt accordingly. Size-capped; read-scope; requires the owner to have enabled mcp.publish_skills.",
    "parameters": {
      "name": "string",
      "source_id": "string?"
    }
  },
  {
    "name": "list_brain_skillpack",
    "description": "List brain-resident skillpacks this brain ships (per-source). Returns each pack's skills, one-line descriptions, the schema pack it targets + whether that matches this brain, and a git scaffold spec. Read-only; gated by mcp.publish_skills. After orienting, call this and ask the user whether to install any pack the brain offers (modusbrain skillpack scaffold <spec>).",
    "parameters": {}
  },
  {
    "name": "advisor",
    "description": "Ranked, read-only \"what to do next\" for this brain: version drift, pending migrations, schema-pack issues, stalled jobs, usage-shape gaps, and setup smells. Each finding has a severity, why-it-matters, and the exact fix command. Never mutates. Tell the user; ask before running any fix. Gated by mcp.publish_advisor (separate from mcp.publish_skills because diagnostics are not prose skills).",
    "parameters": {}
  },
  {
    "name": "get_status_snapshot",
    "description": "Snapshot for `modusbrain status` thin-client mode: sync freshness + last cycle. Admin-scope.",
    "parameters": {}
  },
  {
    "name": "sync_brain",
    "description": "Sync git repo to brain (incremental)",
    "parameters": {
      "repo": "string?",
      "dry_run": "boolean?",
      "full": "boolean?",
      "no_pull": "boolean?",
      "no_embed": "boolean?"
    }
  },
  {
    "name": "put_raw_data",
    "description": "Store raw API response data for a page",
    "parameters": {
      "slug": "string",
      "source": "string",
      "data": "object"
    }
  },
  {
    "name": "get_raw_data",
    "description": "Retrieve raw data for a page",
    "parameters": {
      "slug": "string",
      "source": "string?"
    }
  },
  {
    "name": "resolve_slugs",
    "description": "Fuzzy-resolve a partial slug to matching page slugs",
    "parameters": {
      "partial": "string"
    }
  },
  {
    "name": "get_chunks",
    "description": "Get content chunks for a page",
    "parameters": {
      "slug": "string"
    }
  },
  {
    "name": "log_ingest",
    "description": "Log an ingestion event",
    "parameters": {
      "source_type": "string",
      "source_ref": "string",
      "pages_updated": "array",
      "summary": "string"
    }
  },
  {
    "name": "get_ingest_log",
    "description": "Get recent ingestion log entries",
    "parameters": {
      "limit": "number?"
    }
  },
  {
    "name": "file_list",
    "description": "List stored files",
    "parameters": {
      "slug": "string?"
    }
  },
  {
    "name": "file_upload",
    "description": "Upload a file to storage",
    "parameters": {
      "path": "string",
      "page_slug": "string?"
    }
  },
  {
    "name": "file_url",
    "description": "Get a URL for a stored file",
    "parameters": {
      "storage_path": "string"
    }
  },
  {
    "name": "submit_job",
    "description": "Submit a background job to the Minions queue. Built-in types: sync, embed, lint, import, extract, backlinks, autopilot-cycle. The `shell` type is CLI-only and rejected over MCP.",
    "parameters": {
      "name": "string",
      "data": "object?",
      "queue": "string?",
      "priority": "number?",
      "max_attempts": "number?",
      "delay": "number?",
      "timeout_ms": "number?"
    }
  },
  {
    "name": "get_job",
    "description": "Get job status and details by ID",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "list_jobs",
    "description": "List jobs with optional filters",
    "parameters": {
      "status": "string?",
      "queue": "string?",
      "name": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "cancel_job",
    "description": "Cancel a waiting, active, or delayed job",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "retry_job",
    "description": "Re-queue a failed or dead job for retry",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "get_job_progress",
    "description": "Get structured progress for a running job",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "pause_job",
    "description": "Pause a waiting, active, or delayed job",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "resume_job",
    "description": "Resume a paused job back to waiting",
    "parameters": {
      "id": "number"
    }
  },
  {
    "name": "replay_job",
    "description": "Replay a completed/failed/dead job, optionally with modified data",
    "parameters": {
      "id": "number",
      "data_overrides": "object?"
    }
  },
  {
    "name": "send_job_message",
    "description": "Send a sidechannel message to a running job's inbox",
    "parameters": {
      "id": "number",
      "payload": "object",
      "sender": "string?"
    }
  },
  {
    "name": "submit_agent",
    "description": "Submit an LLM agent job that the worker dispatches via the gateway-native tool loop. Requires the `agent` OAuth scope. Tools, source, slug prefixes, max concurrency, and daily budget are bound at OAuth client registration time.",
    "parameters": {
      "prompt": "string",
      "model": "string?",
      "allowed_tools": "array?",
      "allowed_slug_prefixes": "array?",
      "max_turns": "number?",
      "queue": "string?"
    }
  },
  {
    "name": "find_orphans",
    "description": "Find pages with no inbound wikilinks. Essential for content enrichment cycles.",
    "parameters": {
      "include_pseudo": "boolean?"
    }
  },
  {
    "name": "get_calibration_profile",
    "description": "Read the active calibration profile for a holder. Returns the latest row from calibration_profiles (per-source, per-holder) including Brier score, accuracy, pattern statements, and active bias tags. Source-scoped via sourceScopeOpts — federated_read scopes see the union of allowed sources, scalar source-bound clients see only their source. Returns null when no profile exists yet (cold-brain branch: builds after 5+ resolved takes + a calibration_profile phase run).",
    "parameters": {
      "holder": "string?"
    }
  },
  {
    "name": "takes_list",
    "description": "List takes (typed/weighted/attributed claims) filtered by holder/kind/active/etc.",
    "parameters": {
      "page_slug": "string?",
      "holder": "string?",
      "kind": "string?",
      "active": "boolean?",
      "resolved": "boolean?",
      "sort_by": "string?",
      "limit": "number?",
      "offset": "number?"
    }
  },
  {
    "name": "takes_search",
    "description": "Keyword search across takes (pg_trgm similarity over claim text)",
    "parameters": {
      "query": "string",
      "limit": "number?"
    }
  },
  {
    "name": "think",
    "description": "Multi-hop synthesis across pages + takes + graph. Pulls relevant evidence and produces a cited answer with conflict + gap analysis.",
    "parameters": {
      "question": "string",
      "anchor": "string?",
      "rounds": "number?",
      "save": "boolean?",
      "take": "boolean?",
      "model": "string?",
      "since": "string?",
      "until": "string?"
    }
  },
  {
    "name": "takes_scorecard",
    "description": "Calibration scorecard for resolved bets: counts, accuracy, Brier (correct ∨ incorrect only), partial_rate.",
    "parameters": {
      "holder": "string?",
      "domain_prefix": "string?",
      "since": "string?",
      "until": "string?"
    }
  },
  {
    "name": "takes_calibration",
    "description": "Calibration curve: resolved correct/incorrect bets binned by stated weight; observed vs predicted per bucket.",
    "parameters": {
      "holder": "string?",
      "bucket_size": "number?"
    }
  },
  {
    "name": "whoami",
    "description": "Introspect the calling identity. Returns one of three transport shapes: {transport: \"oauth\", client_id, client_name, scopes, expires_at}, {transport: \"legacy\", token_name, scopes, expires_at: null}, or {transport: \"local\", scopes: []}. Throws unknown_transport when the context is ambiguous (remote=true without auth) — fail-closed posture mirroring the v0.26.9 trust-boundary contract.",
    "parameters": {}
  },
  {
    "name": "sources_add",
    "description": "Register a new source. Supports either --path (existing v0.17 behavior) or --url (v0.28 federated remote-clone path: parses the URL through the SSRF gate, clones into $MODUSBRAIN_HOME/clones/<id>/ via temp-dir + rename atomicity, and stores remote_url in sources.config). Pre-flight collision check on id; rollback on either-side failure.",
    "parameters": {
      "id": "string",
      "name": "string?",
      "path": "string?",
      "url": "string?",
      "federated": "boolean?",
      "clone_dir": "string?"
    }
  },
  {
    "name": "sources_list",
    "description": "List registered sources with page counts and remote_url. v0.28 surfaces the new remote_url field so a remote MCP caller can confirm a source is managed by clone+pull rather than user-supplied path.",
    "parameters": {
      "include_archived": "boolean?"
    }
  },
  {
    "name": "sources_remove",
    "description": "Hard-remove a source (cascades pages/chunks/embeddings). Refuses to delete the auto-managed clone dir unless its resolved path is confined under $MODUSBRAIN_HOME/clones/ (realpath+lstat — symlink-safe). For most workflows prefer sources_archive for the soft-delete path.",
    "parameters": {
      "id": "string",
      "confirm_destructive": "boolean?",
      "dry_run": "boolean?",
      "keep_storage": "boolean?"
    }
  },
  {
    "name": "sources_status",
    "description": "Per-source diagnostic. Returns clone_state (\"healthy\" | \"missing\" | \"not-a-dir\" | \"no-git\" | \"url-drift\" | \"corrupted\" | \"not-applicable\") so a remote MCP caller can diagnose whether the on-disk clone is syncable without SSH access to the brain host.",
    "parameters": {
      "id": "string"
    }
  },
  {
    "name": "get_recent_salience",
    "description": "Returns pages recently touched and ranked by emotional + activity salience (deterministic 0..1 emotional_weight + take density + recency decay). Use this when the user asks what's been going on, what's notable, what's hot, anything crazy happening, or for any open-ended 'current state' question about themselves or their work. Do NOT run a semantic search for these — salience surfaces what's unusual without needing a search term.",
    "parameters": {
      "days": "number?",
      "limit": "number?",
      "slugPrefix": "string?",
      "recency_bias": "string?"
    }
  },
  {
    "name": "find_anomalies",
    "description": "Returns statistical anomalies in recent page activity, grouped by cohort (tag or type). Use this for questions about what stood out, what's unusual, or what changed recently. Returns explanatory cohorts (e.g. '15 pages tagged wedding touched on 2026-04-28, baseline 0.3/day') so you can speak about patterns the user wouldn't have searched for. Cohort kinds: tag, type. Year cohort is deferred to a later release.",
    "parameters": {
      "since": "string?",
      "lookback_days": "number?",
      "sigma": "number?"
    }
  },
  {
    "name": "get_recent_transcripts",
    "description": "Returns one-line summaries of recent raw conversation transcripts (NOT polished reflections). Use this FIRST for questions about 'what's going on with me', 'what have I been thinking about', or anything personal/emotional. Raw transcripts are the canonical source for the user's own state — polished pages summarize and flatten. Local-only: rejects remote (MCP/HTTP) callers with a clear permission_denied; call via the modusbrain CLI.",
    "parameters": {
      "days": "number?",
      "summary": "boolean?",
      "limit": "number?"
    }
  },
  {
    "name": "chronicle_day",
    "description": "Life Chronicle: events + timeline entries on a given day (or its ISO week when week=true), ordered chronologically; each row backlinks to its depth page. Distinct from `get_timeline`/`modusbrain timeline <slug>`, which shows ONE page's timeline. CLI: `modusbrain day <date>`.",
    "parameters": {
      "date": "string",
      "week": "boolean?",
      "limit": "number?",
      "narrative": "boolean?"
    }
  },
  {
    "name": "chronicle_on_this_day",
    "description": "Life Chronicle: events from the same calendar day in PRIOR years (\"on this day\"). CLI: `modusbrain on-this-day [--date YYYY-MM-DD]`.",
    "parameters": {
      "date": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "chronicle_since",
    "description": "Life Chronicle: events + timeline entries on or after a date, optionally filtered by event kind. CLI: `modusbrain since <date> [--kind commitment]`.",
    "parameters": {
      "date": "string",
      "kind": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "chronicle_last_seen",
    "description": "Life Chronicle: when an entity was last seen — its own timeline rows OR an event's `who`. Returns last_date, the event slug, and days_ago. CLI: `modusbrain last-seen <entity-slug>`.",
    "parameters": {
      "entity": "string",
      "asof": "string?"
    }
  },
  {
    "name": "ontology_get",
    "description": "Life Chronicle: the current resolved per-entity ontology (dimension → value) at `asof` (default now), with provenance + confidence + validity. CLI: `modusbrain ontology <entity> [--asof YYYY-MM-DD]`.",
    "parameters": {
      "entity": "string",
      "asof": "string?",
      "min_confidence": "number?",
      "include_quarantined": "boolean?"
    }
  },
  {
    "name": "ontology_propose",
    "description": "Life Chronicle: record one ontology observation (entity has dimension=value), sourced + confidence-weighted + bi-temporal. Idempotent on (entity,dimension,value,source). A new value supersedes the prior; a backdated conflict is flagged not rewritten. CLI: `modusbrain ontology-add <entity> <dimension> <value>`.",
    "parameters": {
      "entity": "string",
      "dimension": "string",
      "value": "string",
      "confidence": "number?",
      "source": "string?",
      "valid_from": "string?",
      "valid_to": "string?",
      "visibility": "string?"
    }
  },
  {
    "name": "ontology_dimensions",
    "description": "Life Chronicle meta-ontology: which dimensions the brain tracks across entities, with entity + observation counts. CLI: `modusbrain ontology-dimensions`.",
    "parameters": {}
  },
  {
    "name": "ontology_conflicts",
    "description": "Life Chronicle: dimensions with ≥2 distinct current values from ≥2 provenances (genuine disagreement, not temporal supersession). CLI: `modusbrain ontology-contradictions`.",
    "parameters": {
      "min_confidence": "number?"
    }
  },
  {
    "name": "volunteer_chronicle",
    "description": "Life Chronicle agent-orientation: the recent timeline (last N days) + the current validity-resolved ontology for the named entities, in one zero-LLM payload, so an agent orients before acting. Diary-sourced ontology is redacted for remote callers. CLI: `modusbrain orient [--days 7] [--entities people/a,people/b]`.",
    "parameters": {
      "days": "number?",
      "entities": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "chronicle_backfill",
    "description": "Life Chronicle: sweep existing meeting/conversation/calendar pages into timeline events by enqueuing chronicle_extract jobs (one per eligible page). --dry-run counts without enqueuing. Local-only bulk op. CLI: `modusbrain chronicle-backfill [--since YYYY-MM-DD] [--limit N] [--dry-run]`.",
    "parameters": {
      "since": "string?",
      "limit": "number?",
      "dry_run": "boolean?"
    }
  },
  {
    "name": "volunteer_context",
    "description": "Push-based context: volunteer brain pages relevant to a rolling conversation window WITHOUT being asked. Zero-LLM, confidence-gated (alias 0.9 / exact-title 0.8 / slug-suffix 0.6, +0.05 for multi-turn or newest-turn mentions; default gate 0.7), capped at 3 pages (max 5). Returns pointers with one-line rationales + synopses — open the page (get_page) before relying on details. Pass stats: true for the approximate volunteered-vs-used precision summary (the feedback loop).",
    "parameters": {
      "window": "string?",
      "prior_context": "string?",
      "max_pages": "number?",
      "min_confidence": "number?",
      "session_id": "string?",
      "turn": "number?",
      "stats": "boolean?",
      "days": "number?"
    }
  },
  {
    "name": "extract_facts",
    "description": "v0.31: extract personal-knowledge facts (events, preferences, commitments, beliefs) from a conversation turn into the per-source hot memory. Sanitizes turn_text via INJECTION_PATTERNS, calls Haiku to extract structured claims, runs the cosine fast-path + classifier dedup pipeline, INSERTs into facts. Returns counts by status. Skips extraction when the turn is dream-generated content (anti-loop).",
    "parameters": {
      "turn_text": "string",
      "session_id": "string?",
      "entity_hints": "array?",
      "is_dream_generated": "boolean?",
      "visibility": "string?"
    }
  },
  {
    "name": "recall",
    "description": "v0.31: query per-source hot memory (facts table). Filters by entity / since / session. Remote callers see only visibility=world facts. Returns most-recent first. v0.32 adds optional include_pending to return pending_consolidation_count alongside facts in one round trip.",
    "parameters": {
      "entity": "string?",
      "since": "string?",
      "session_id": "string?",
      "include_expired": "boolean?",
      "supersessions": "boolean?",
      "limit": "number?",
      "grep": "string?",
      "include_pending": "boolean?"
    }
  },
  {
    "name": "forget_fact",
    "description": "v0.32.2: forget a fact. Rewrites the page's `## Facts` fence to strike through the row and set valid_until=today (the DB's expired_at derives via valid_until + now() on the next reconcile so the forget survives `modusbrain rebuild`). Falls back to legacy DB-only expire for pre-v51 / thin-client rows. Idempotent on already-expired or unknown ids.",
    "parameters": {
      "id": "number",
      "reason": "string?"
    }
  },
  {
    "name": "find_contradictions",
    "description": "v0.32.6 — return suspected-contradiction findings from the most recent `modusbrain eval suspected-contradictions` probe run, optionally filtered by slug and/or severity. Use this when the user asks 'what's inconsistent in my brain', 'show me contradictions about Acme', 'high-severity issues only', or wants to act on the probe's findings without re-running it. Returns {contradictions: [{a, b, severity, axis, confidence, resolution_command}]}. Reads the cached run row — does NOT trigger a new probe; users run `modusbrain eval suspected-contradictions` for that.",
    "parameters": {
      "slug": "string?",
      "severity": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "find_experts",
    "description": "Answers 'who in my brain knows about <topic>'. Returns ranked person/company pages by expertise depth (sub-linear match score), relationship recency (exp decay with 6-month half-life), and salience. Use this for questions like 'who should I talk to about X', 'who knows about Y', 'find me someone who's worked on Z', or any expertise-routing intent. Filters at SQL to person + company pages — does NOT return notes or articles. Pair with --explain (CLI) to surface the per-result factor breakdown.",
    "parameters": {
      "topic": "string?",
      "limit": "number?",
      "explain": "boolean?"
    }
  },
  {
    "name": "find_trajectory",
    "description": "v0.35.4 — return the chronological claim trajectory for an entity (typed metric values over time, plus auto-detected regressions and narrative drift). Use this when the user asks 'how has Acme's MRR trended', 'show me what alice-example said about runway over time', 'is this founder consistent', 'find regressions for fund-a's portfolio', or wants a time-series view of an entity's structured claims. Returns `{points: [{fact_id, valid_from, metric, value, unit, period, text, source_session, source_markdown_slug}], regressions: [{metric, from_value, from_date, to_value, to_date, delta_pct}], drift_score: number|null, schema_version: 1}`. Drift score 0 = stable narrative, 1 = every consecutive claim is unrelated; null when fewer than 3 typed points exist. Visibility-filtered for remote callers (world-only); source-scoped by the caller's OAuth source binding. Pair with `modusbrain founder scorecard <slug>` for an aggregated rollup of the same data.",
    "parameters": {
      "entity_slug": "string?",
      "metric": "string?",
      "kind": "string?",
      "since": "string?",
      "until": "string?",
      "limit": "number?"
    }
  },
  {
    "name": "code_callers",
    "description": "BEFORE editing any function, run code_callers with the symbol name to find every caller (the people who'd be affected by your change). Returns direct callers from the v0.20+ tree-sitter call graph. Use during plan-mode to size the change. Defaults to source-scoped; for multi-source brains pass source_id or all_sources=true. Returns: `{symbol, count, callers: [{from_symbol_qualified, to_symbol_qualified, edge_type, resolved}]}`. Example: `{symbol:'parseMarkdown', count:4, callers:[{from_symbol_qualified:'callerInA', to_symbol_qualified:'parseMarkdown', edge_type:'calls', resolved:true}]}`.",
    "parameters": {
      "symbol": "string",
      "limit": "number?",
      "source_id": "string?",
      "all_sources": "boolean?"
    }
  },
  {
    "name": "code_callees",
    "description": "When tracing how a function flows to its dependencies (DB calls, HTTP calls, file I/O), run code_callees from the entry point. Forward view of the call graph: what does this symbol call? Use this when debugging unexpected behavior or when planning to extract / inline a function. Same shape as code_callers but the field is `callees` and the edge direction is reversed.",
    "parameters": {
      "symbol": "string",
      "limit": "number?",
      "source_id": "string?",
      "all_sources": "boolean?"
    }
  },
  {
    "name": "code_def",
    "description": "Where is this symbol defined? Returns one row per definition site (function, class, type, interface, enum, struct, trait, module, contract). Use this BEFORE reaching for grep when you want to read a definition. Single-result is the common case; multiple results indicate same-name symbols across files (which is information in itself). Returns: `{symbol, count, defs: [{slug, file, language, symbol_type, start_line, end_line, snippet}]}`. Filter by --lang to scope a polyglot brain (e.g., lang='typescript').",
    "parameters": {
      "symbol": "string",
      "limit": "number?",
      "lang": "string?"
    }
  },
  {
    "name": "code_refs",
    "description": "Find every reference to a symbol across the codebase (every file, every line). Differs from code_callers in two ways: (1) catches references in comments, strings, imports, type annotations — not just call sites; (2) returns line numbers, not symbol-qualified edges. Use this when planning a rename or deprecation where you need to touch every literal mention. Returns: `{symbol, count, refs: [{slug, file, language, line, context}]}`.",
    "parameters": {
      "symbol": "string",
      "limit": "number?",
      "lang": "string?"
    }
  },
  {
    "name": "code_blast",
    "description": "BEFORE editing any function, run code_blast with the symbol name to surface every transitive caller grouped by depth (direct → 2-hop → 3-hop). Use this during plan-mode to size the change. Returns up to 200 nodes. Returns: {result, depth_groups?, truncation?, cycles_detected?, did_you_mean?, candidates?}. Example ok: {result:\"ok\", depth_groups:[{depth:1, nodes:[{symbol,chunk_id}], confidence:0.77}], truncation:\"none\"}.",
    "parameters": {
      "symbol": "string",
      "depth": "number?",
      "max_nodes": "number?",
      "exact": "boolean?",
      "source_id": "string?"
    }
  },
  {
    "name": "code_flow",
    "description": "When tracing how a request flows through the codebase from entry point to side effect (DB write, HTTP call, file I/O), run code_flow from the entry point. Returns ordered execution chain with terminal-node tags. Returns: same envelope as code_blast plus terminal_nodes: [{symbol, sink_kind}] where sink_kind ∈ \"db_call\"|\"http_call\"|\"file_io\"|\"process_exec\"|\"unknown\".",
    "parameters": {
      "entry_point": "string",
      "depth": "number?",
      "max_nodes": "number?",
      "exact": "boolean?",
      "source_id": "string?"
    }
  },
  {
    "name": "code_traversal_cache_clear",
    "description": "Clear cached code_blast / code_flow traversal results. Source-scoped by default; pass all_sources=true to wipe everything (D8 destructive-guard).",
    "parameters": {
      "source_id": "string?",
      "all_sources": "boolean?"
    }
  },
  {
    "name": "get_active_schema_pack",
    "description": "v0.40.6.0: cheap identity packet for the active schema pack. Returns {pack_name, version, sha8, page_types_count, link_types_count, primitive_summary, source_tier}. Useful for agents to know which pack they are operating against without paying full manifest load cost.",
    "parameters": {}
  },
  {
    "name": "list_schema_packs",
    "description": "v0.40.6.0: list installed schema packs (bundled + user-installed). Returns {bundled: string[], installed: string[]}. Read-only directory listing.",
    "parameters": {}
  },
  {
    "name": "schema_stats",
    "description": "v0.40.6.0: per-type page counts + typed-coverage from the DB. Returns {schema_version:1, pack_identity, aggregate, per_source, dead_prefixes}. Multi-source aware via ctx.sourceId/allowedSources.",
    "parameters": {}
  },
  {
    "name": "schema_lint",
    "description": "v0.40.6.0: lint the active (or named) schema pack. File-plane rules only over MCP — the with_db option is rejected for remote callers (DB-aware rules require local CLI). Returns {ok, errors, warnings} structured report.",
    "parameters": {
      "pack": "string?"
    }
  },
  {
    "name": "schema_graph",
    "description": "v0.40.6.0: schema pack graph as JSON edges. Returns {nodes: [{name, primitive}], edges: [{from, verb, to}]} derived from link_types inference + frontmatter_links.",
    "parameters": {}
  },
  {
    "name": "schema_explain_type",
    "description": "v0.40.6.0: resolved settings for a single page_type in the active pack. Returns {pack, type, primitive, path_prefixes, aliases, extractable, expert_routing}.",
    "parameters": {
      "type": "string"
    }
  },
  {
    "name": "schema_review_orphans",
    "description": "v0.40.6.0: list pages with no active-pack type match. Returns {orphan_count, orphans: [{slug, source_id}]}.",
    "parameters": {
      "limit": "number?"
    }
  },
  {
    "name": "schema_apply_mutations",
    "description": "v0.40.7.0: batched schema pack mutation. ATOMIC: all mutations succeed or all roll back. Audit log records one batch_id. Admin scope; NOT localOnly so remote agents (your OpenClaw, etc.) can author packs over normal MCP. Mutation shape per ApplyMutationsRequest type — supports add_type / remove_type / update_type / add_alias / remove_alias / add_prefix / remove_prefix / add_link_type / remove_link_type / set_extractable / set_expert_routing.",
    "parameters": {
      "pack": "string",
      "mutations": "array",
      "force": "boolean?"
    }
  },
  {
    "name": "reload_schema_pack",
    "description": "v0.40.6.0: flush the in-process schema pack cache so the next loadActivePack re-reads from disk. Cascades through extends-chain (codex C6). Admin scope; NOT localOnly. Returns {invalidated: string[]}.",
    "parameters": {
      "pack": "string?"
    }
  },
  {
    "name": "run_onboard",
    "description": "Probe brain health + optionally submit onboard remediations. Admin scope required. Protected handlers (LLM-bearing) require run_protected_onboard scope ADDITIONALLY.",
    "parameters": {
      "mode": "string?",
      "target_score": "number?",
      "max_usd": "number?"
    }
  },
  {
    "name": "run_skillopt",
    "description": "Run SkillOpt against a single skill. Admin scope; mutating; rate-limited per-skill via DB lock. See modusbrain skillopt CLI for the full flag surface.",
    "parameters": {
      "skill_name": "string",
      "benchmark_path": "string?",
      "epochs": "number?",
      "batch_size": "number?",
      "lr": "number?",
      "max_cost_usd": "number?",
      "no_mutate": "boolean?",
      "allow_mutate_bundled": "boolean?",
      "held_out_path": "string?",
      "dry_run": "boolean?"
    }
  },
  {
    "name": "compile_operational_skill",
    "description": "Draft a versioned operational skill from existing brain content. Holds as draft until approved.",
    "parameters": {
      "topic": "string",
      "risk_tier": "string?",
      "owner": "string?",
      "source_id": "string?"
    }
  },
  {
    "name": "approve_operational_skill",
    "description": "Promote a draft operational skill to approved active status.",
    "parameters": {
      "slug": "string",
      "version": "number?",
      "approved_by": "string",
      "source_id": "string?"
    }
  },
  {
    "name": "execute_operational_skill",
    "description": "Execute an approved operational skill with confidence gating. Draft skills are refused for remote callers.",
    "parameters": {
      "slug": "string",
      "task_description": "string",
      "context": "object?",
      "approval_token": "string?",
      "agent_id": "string?",
      "source_id": "string?"
    }
  },
  {
    "name": "list_operational_skills",
    "description": "List operational skills with active version metadata.",
    "parameters": {
      "source_id": "string?"
    }
  }
]
PS C:\Users\Shubham> # 19.1 — Find definition of a symbol
PS C:\Users\Shubham> modusbrain code-def brandEnv
No definitions found for "brandEnv"
Symbol graph not built (no code indexed in scope). Run `modusbrain sync` to index code.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 19.2 — Find references to a symbol
PS C:\Users\Shubham> modusbrain code-refs BRAND
No references found for "BRAND"
Symbol graph not built (no code indexed in scope). Run `modusbrain sync` to index code.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 19.3 — Who calls this symbol
PS C:\Users\Shubham> modusbrain code-callers brandConfigDir
No callers found for "brandConfigDir" in source 'default'. Try --all-sources to search every source.
Symbol graph not built (no code indexed in scope). Run `modusbrain sync` to index code.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 19.4 — What does this symbol call
PS C:\Users\Shubham> modusbrain code-callees brandConfigDir
No callees found for "brandConfigDir" in source 'default'. Try --all-sources to search every source.
Symbol graph not built (no code indexed in scope). Run `modusbrain sync` to index code.
PS C:\Users\Shubham> # 20.1 — Run integrity checks
PS C:\Users\Shubham> modusbrain integrity
Usage: modusbrain integrity <subcommand> [options]

Subcommands:
  check                         Read-only report (pages scanned, bare tweets found)
  check --type people           Scope to people/ pages
  check --limit N --json        JSON output for N pages

  auto [options]                Three-bucket repair loop
    --confidence 0.8            Auto-repair threshold (default 0.8)
    --review-lower 0.5          Review-queue lower bound (default 0.5)
    --dry-run                   Report what would change, no writes
    --limit N                   Process at most N pages (resumable)
    --fresh                     Ignore progress file; start over
    --skip-bare-tweet           Skip bare-tweet detection
    --skip-urls                 Skip dead-link detection

  review                        Print review-queue path + entry count
  reset-progress                Clear ~/.modusbrain/integrity-progress.jsonl

Paths:
  Review queue: ~/.modusbrain/integrity-review.md
  Skip log:     ~/.modusbrain/integrity.log.jsonl
  Progress:     ~/.modusbrain/integrity-progress.jsonl

PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.2 — Raw tool invocation (JSON)
PS C:\Users\Shubham> modusbrain call search_brain "{\"query\": \"operational skills\"}"
JSON Parse error: Unrecognized token '\'
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.3 — View schema information
PS C:\Users\Shubham> modusbrain schema --help
modusbrain schema — active schema pack management

Inspection:
  active                  Show resolved pack + which tier provided it
  list                    List installed packs (bundled + ~/.modusbrain/schema-packs/)
  show [<pack>]           Pretty-print a manifest (default: active pack)
  validate [<pack>]       Validate manifest shape against the v1 schema
  graph                   Show type/primitive graph with link-verb edges
  lint [<pack>]           Lint a pack for duplicates, dangling refs, etc.
  stats [--source <id>]   Per-type page counts + typed-coverage from the DB
  explain <type>          Print resolved settings for a single type
  usage [--since N(d|w|m)] CLI invocation telemetry summary

Activation:
  use <pack>              Activate pack (writes ~/.modusbrain/config.json schema_pack)
  downgrade [--to <pack>] Restore the previous active pack
  reload [--pack <name>]  Flush the in-process pack cache; --pack scopes

Authoring (v0.40.6.0):
  init <name>             Scaffold a new pack (extends gbrain-base)
  fork <src> <new>        Copy a pack to a new editable name
  edit <name>             Print the on-disk pack file path
  diff <a> <b>            Compare page_type sets across two packs

  add-type <name> --primitive <p> --prefix <dir/>
                          [--extractable] [--expert] [--alias <a>]* [--pack <name>]
  remove-type <name>      [--pack <name>]
  update-type <name>      [--extractable BOOL] [--expert BOOL] [--primitive P] [--pack <name>]
  add-alias <type> <alias>      [--pack <name>]
  remove-alias <type> <alias>   [--pack <name>]
  add-prefix <type> <prefix>    [--pack <name>]
  remove-prefix <type> <prefix> [--pack <name>]
  add-link-type <name> [--inverse <verb>] [--page-type <t>] [--target-type <t>] [--pack <name>]
  remove-link-type <name>       [--pack <name>]
  set-extractable <type> <true|false>      [--pack <name>]
  set-expert-routing <type> <true|false>   [--pack <name>]
  scaffold-extractable <type> [--pack <name>] [--dims a,b,c] [--force]
                          v0.42: declare a pack-supplied prompt + fixtures
                          + eval dimensions for an LLM-backed extractor.
                          Generates prompts/extract/<type>.md and
                          fixtures/extract/<type>.jsonl stubs the
                          pack-author edits, then pairs with
                          `modusbrain extract benchmark` for the iteration loop.

Discovery + repair:
  detect                  Cluster pages by source_path → candidate page_types
  suggest                 Heuristic refinement on detect output
  review-candidates       Review disk-derived candidates; promote with --apply
  review-orphans          List pages with no active-pack type match
  sync [--apply]          Backfill page.type for rows matching pack prefixes
                          (dry-run by default; chunked UPDATE on apply)

All new verbs accept --json. Verbs scoped by source accept --source <id>.
Pass --force to bypass per-pack lock contention on writes.

Resolution chain (7-tier, tier 1 trust-gated):
  1. Per-call --schema-pack flag (CLI only)
  2. MODUSBRAIN_SCHEMA_PACK env var
  3. Per-source DB config schema_pack.source.<id>
  4. Brain-wide DB config schema_pack
  5. modusbrain.yml schema: section
  6. ~/.modusbrain/config.json schema_pack
  7. Default: gbrain-base

PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.4 — Dream cycle (overnight maintenance, dry run)
PS C:\Users\Shubham> modusbrain dream --dry-run
[cycle.extract_facts] done
[cycle.resolve_symbol_edges] done
[cycle.recompute_emotional_weight] done
[cycle.consolidate] done
[cycle.propose_takes] done
[cycle.grade_takes] done
[cycle.calibration_profile] done
[cycle.conversation_facts_backfill] done
[cycle.enrich_thin] done
[cycle.skillopt] done
[cycle.embed] start[dry-run] Would embed 0 chunks (0 stale found)
[cycle.embed] done
[orphans.scan] done
[cycle.orphans] done
[cycle.schema_suggest] done
[cycle.purge] done
Dream cycle (partial) in 0.3s:
  - lint        requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  - backlinks   requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  - sync        requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  - synthesize  requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  - extract     requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  ! extract_facts  0 fact(s) reconciled across 122 page(s) (1 warning(s))
  - extract_atoms  extract_atoms: active pack does not declare this phase (run `modusbrain dream --phase extract_atoms --drain` to drain a backlog)
  - resolve_symbol_edges  dry-run: resolve_symbol_edges phase skipped
  - patterns    requires a local brain directory; this brain has no on-disk checkout (postgres/remote engine); pass --dir <path> to run filesystem phases
  - synthesize_concepts  synthesize_concepts: active pack does not declare this phase
  ✓ recompute_emotional_weight  recompute_emotional_weight (dry-run, 122 pages)
  ✓ consolidate  (dry-run) would promote 0 facts into 0 takes across 0 buckets
  ✓ propose_takes  propose_takes: scanned 100 pages, 0 cached, 0 new proposals (run propose-20260717065709-ff43f3ac)
  ✓ grade_takes  grade_takes: scanned 0 takes (0 too recent, 0 cached, 0 new verdicts, 0 auto-applied)
  ✓ calibration_profile  calibration_profile: holder=garry has only 0 resolved takes (need >=5 for a profile)
  - conversation_facts_backfill  cycle.conversation_facts_backfill.enabled=false (default OFF)
  - enrich_thin  cycle.enrich_thin.enabled=false (default OFF)
  - skillopt    feature flag off (modusbrain config set cycle.skillopt.enabled true to enable)
  ✓ embed       0 chunk(s) would be embedded (dry-run)
  ! orphans     122 orphan page(s) out of 122 total
  ✓ schema-suggest  6 suggestions emitted
  ✓ purge       dry-run: skipped purge sweep
  totals: lint=0 backlinks=0 synced=0 extracted=0 embedded=0 orphans=122 synth_transcripts=0 synth_pages=0 patterns=0
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.5 — Show pages count
PS C:\Users\Shubham> modusbrain pages
Unknown command: pages
Run modusbrain --help for available commands.
PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.6 — Cache management
PS C:\Users\Shubham> modusbrain cache --help

modusbrain cache — manage the semantic query cache (v0.32.x search-lite)

Usage:
  modusbrain cache stats        Print cache row counts, hit counts, freshness.
  modusbrain cache clear        Wipe ALL cache rows. Requires --yes.
  modusbrain cache prune        Delete only stale (past-TTL) rows.

Flags:
  --yes                     Bypass clear confirmation prompt.
  --source <id>             Scope clear to a single source_id.
  --help                    Show this help.

PS C:\Users\Shubham>
PS C:\Users\Shubham> # 20.7 — Apply database migrations
PS C:\Users\Shubham> modusbrain apply-migrations --yes

=== Applying migration v0.11.0: ModusBrain Minions — durable background agents ===
Minion worker stopped.
SMOKE PASS — Minions healthy in 0.14s (engine: pglite)
Note: the `modusbrain jobs work` daemon requires Postgres. PGLite
supports inline execution only (`submit --follow`).
Defaulting minion_mode=pain_triggered (non-interactive). Change with `modusbrain config set minion_mode <always|off>`.
No repo path. Use --repo or run modusbrain sync --repo first.
Migration v0.11.0 complete.

=== Applying migration v0.12.0: Knowledge Graph wires itself — every page write extracts typed links automatically ===

=== v0.12.0 — Knowledge Graph auto-wire ===

Config key not found: auto_link
Access is denied.

  Brain wire-up:
    Pages:    122
    Links:    0
    Timeline: 5
  Pages present but 0 links extracted. Likely no entity refs in content,
  or all entity refs target slugs that do not exist as pages.
  Try: modusbrain extract links --source db --dry-run | head -20
Migration v0.12.0 complete.

=== Applying migration v0.12.2: Postgres frontmatter queries now work — JSONB double-encode bug fixed and existing rows auto-repaired ===

=== v0.12.2 — JSONB double-encode repair ===

Migration v0.12.2 complete.

=== Applying migration v0.13.0: Frontmatter becomes a graph — company, investors, attendees now create typed edges automatically ===

=== v0.13.0 — Frontmatter relationship indexing ===

Migration v0.13.0 complete.

=== Applying migration v0.13.1: BrainWriter integrity + grandfather protection for existing pages. ===
Migration v0.13.1 complete.

=== Applying migration v0.14.0: Shell jobs + autopilot cooperative handler + max_stalled default bump. ===
Migration v0.14.0 complete.

=== Applying migration v0.16.0: Durable LLM agents land in the brain — survive crashes, sleeps, and worker restarts. ===

=== v0.16.0 — Subagent runtime schema ===

Migration v0.16.0 complete.

=== Applying migration v0.18.0: Multi-source brains: one database, many knowledge repos. Federation flag keeps them from polluting each other. ===

=== v0.18.0 — Multi-source brains ===

Migration v0.18.0 complete.

=== Applying migration v0.18.1: Row Level Security hardened on all public tables + escape hatch. ===
Migration v0.18.1 complete.

=== Applying migration v0.21.0: Code Cathedral II — chunk-grain FTS, qualified symbols, structural edges, 165-language lazy-load ===

=== v0.21.0 — Code Cathedral II ===


=== v0.21.0 Cathedral II — code reindex options ===

Schema migrated. CHUNKER_VERSION bumped 3 → 4 (folds into content_hash).

Two ways to roll the new chunker over existing code pages:

  1. AUTOMATIC (recommended): next `modusbrain sync` detects the version
     mismatch via sources.chunker_version and forces a full re-walk.
     No action needed.

  2. IMMEDIATE: `modusbrain reindex-code --dry-run` to preview cost, then
     `modusbrain reindex-code --yes` to reindex every code page now.

Either way, the new chunker ships: qualified symbol identity, chunk-grain
FTS with doc_comment Weight A, parent scope capture (Layer 6 pending),
and structural edge resolution (Layer 5 pending).

Migration v0.21.0 complete.

=== Applying migration v0.22.4: Frontmatter-guard ships — broken brain pages can't hide ===

=== v0.22.4 — frontmatter-guard adoption ===

Migration v0.22.4 complete.

=== Applying migration v0.28.0: Takes ship — your brain finally captures what you BELIEVE, not just what's true ===

=== v0.28.0 — Takes + Think + Unified Model Config ===

Migration v0.28.0 complete.

=== Applying migration v0.29.1: Recency + salience as two opt-in axes — agent in charge of when to use each ===

=== v0.29.1 — backfill effective_date for existing pages ===

Migration v0.29.1 complete.

=== Applying migration v0.31.0: Hot memory ships — your brain remembers what you said today, across sessions ===

=== v0.31.0 — Hot Memory: Cross-Session Facts ===

Migration v0.31.0 complete.

=== Applying migration v0.32.2: Facts join the system-of-record — your hot memory now lives in markdown, indexed by the DB ===

=== v0.32.2 — facts join the system-of-record invariant ===

Migration v0.32.2 complete.
PS C:\Users\Shubham>