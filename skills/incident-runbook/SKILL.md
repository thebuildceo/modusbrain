---
name: incident-runbook
version: 0.1.0
description: Generate a structured incident runbook from an existing brain page or SOP doc. Produces step-by-step triage, escalation paths, and rollback procedures backed by brain knowledge.
triggers:
  - "create incident runbook"
  - "make a runbook"
  - "generate runbook"
  - "incident response template"
  - "build runbook from"
  - "runbook for"
mutating: true
writes_pages: true
writes_to:
  - wiki/runbooks/
---

# incident-runbook — Incident Runbook Generator

> **Convention:** see [_brain-filing-rules.md](../_brain-filing-rules.md) for filing paths.
> **Convention:** see [conventions/quality.md](../conventions/quality.md) for citation rules.

## What this does

Generates a structured, actionable incident runbook from:
- An existing brain page (architecture doc, SOP, post-mortem)
- A file on disk (`.md`, `.txt`, `.pdf`)
- A plain-language description of the system or incident type

The runbook is filed under `wiki/runbooks/<slug>.md` and cross-referenced against brain
pages for every step, contact, and threshold it names.

## Trigger conditions

Activate when the user says:

- "create an incident runbook for our payment service"
- "generate a runbook from our database SOP"
- "make a runbook from this post-mortem"
- "build a runbook for <system-name>"

## Pre-flight checks

1. Identify the **source**: a brain slug, a file path, or a free-text system description.
2. If a file path: verify it exists. Stop with `Error: file not found: <path>` if not.
3. If a brain slug: verify it exists. Stop with `Error: page not found: <slug>` if not.
4. For file/slug sources, verify brain overlap ≥ 20%. If below, warn but proceed (the
   user may be creating a runbook for a new system).

## Runbook structure

Every generated runbook MUST include the following sections:

### 1. Incident Classification
| Severity | Definition | Response SLA |
|---|---|---|
| SEV-1 | Complete outage or data loss | 15 min |
| SEV-2 | Degraded service, &lt; 50% traffic | 30 min |
| SEV-3 | Partial degradation, workaround available | 4 hours |

### 2. Triage Steps (numbered, each with a verification command or check)

### 3. Escalation Path (with role names from brain pages if available)

### 4. Rollback Procedure (versioned steps with checkpoints)

### 5. Post-Incident Actions (checklist)

### 6. Brain Sources (auto-populated from matched brain pages)

## Output format

```
✅ Runbook generated: wiki/runbooks/<slug>.md
   Sections:       6
   Triage steps:   12
   Brain sources:  4 pages
   Escalation contacts: found / NOT FOUND (manual fill required)

Scaffold next: modusbrain opskill compile wiki/runbooks/<slug>.md
```

## Hard stops

- If a file path is given and does not exist → `Error: file not found: <path>`. Stop.
- If brain lookup for contacts/thresholds fails → warn inline, never fabricate names/numbers.
- Never invent escalation contacts that are not found in the brain.
