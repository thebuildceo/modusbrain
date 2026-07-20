---
name: policy-compile
version: 0.1.0
description: Compile an existing brain page (wiki, policy doc, runbook) into a versioned operational skill. Validates that brain content backs every decision rule before creating a draft skill version.
triggers:
  - "compile this policy"
  - "turn this policy into a skill"
  - "make a skill from this runbook"
  - "create operational skill"
  - "policy compile"
  - "compile runbook"
mutating: true
writes_pages: true
writes_to:
  - skills/ops/
---

# policy-compile — Operational Policy Compiler

> **Convention:** see [_brain-filing-rules.md](../_brain-filing-rules.md) for filing paths.
> **Convention:** see [conventions/quality.md](../conventions/quality.md) for citation rules.

## What this does

Converts a wiki/policy page (or a file on disk) into a versioned **operational skill** backed
by the brain. Every decision rule in the output is cross-referenced against a brain page that
confirmed the rule — fabrication is blocked by the confidence gate.

Output: a draft `skills/ops/<slug>/SKILL.md` page with version metadata, risk tier, and a
`matched_sources` block listing the brain pages that supply each decision rule.

## Trigger conditions

Activate when the user says:

- "compile this policy into a skill"
- "turn our refund policy into an operational skill"
- "create a skill from this runbook"
- "policy compile <file or slug>"
- "compile <wiki-slug>"

## Pre-flight checks

1. If a **file path** is given: verify the file exists on disk. If it does not exist, stop
   immediately with `Error: file not found: <path>`. Do not synthesize results.
2. If a **brain slug** is given: verify the page exists via `modusbrain query <slug> --exact`.
   If not found, stop with `Error: page not found in brain: <slug>`.
3. Run a brain overlap check. If the content of the source file or page has fewer than 30%
   token overlap with any synced brain page, stop with:
   `Low confidence match (score: X). The content does not appear to be backed by the brain.`

## Compilation steps

1. Parse the source into logical decision rules (IF/THEN/ELSE patterns, thresholds,
   approvals, escalations).
2. For each rule, find the brain page(s) that contain confirming evidence (using `modusbrain
   query`). Record the brain-page slug and matched excerpt.
3. Assign a risk tier:
   - `LOW`: all rules have brain-backed evidence, no financial/legal thresholds
   - `MEDIUM`: some rules involve financial thresholds under $10 000 or single approver
   - `HIGH`: rules involve legal obligations, PII, or financial thresholds over $10 000
4. Create a draft skill version at `skills/ops/<slug>/SKILL.md` with:
   - Frontmatter: `name`, `version: 1`, `status: draft`, `risk_tier`, `compiled_from`, `matched_sources`
   - Body: the compiled decision tree in structured IF/THEN format

## Output format

```
✅ Policy compiled: <slug>
   Version:         1 (draft — approval required before execution)
   Risk tier:       MEDIUM
   Decision rules:  12
   Brain sources:   3 pages
   Confidence:      0.91

To approve:  modusbrain opskill approve <slug> --version 1 --approver you@company.com
To execute:  modusbrain opskill execute <slug> --input '{"amount": 450}'
```

## Hard stops

- If the source file does not exist → stop, clear error. Never proceed.
- If brain confidence &lt; 0.30 → stop, `Low confidence match`. Never fabricate.
- If risk tier is HIGH → always produce `draft`; never auto-approve.
