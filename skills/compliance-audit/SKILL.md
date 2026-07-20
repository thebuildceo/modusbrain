---
name: compliance-audit
version: 0.1.0
description: Run a structured compliance audit across brain pages. Maps policies to controls, flags gaps, and produces an evidence dossier. Supports SOC 2, GDPR, HIPAA, ISO 27001 frameworks.
triggers:
  - "run compliance audit"
  - "audit our policies"
  - "check soc2 compliance"
  - "gdpr audit"
  - "hipaa compliance check"
  - "compliance gap analysis"
  - "iso 27001 audit"
  - "generate evidence dossier"
mutating: true
writes_pages: true
writes_to:
  - wiki/compliance/
---

# compliance-audit — Compliance Audit & Evidence Dossier

> **Convention:** see [_brain-filing-rules.md](../_brain-filing-rules.md) for filing paths.
> **Convention:** see [conventions/quality.md](../conventions/quality.md) for citation rules.

## What this does

Runs a structured compliance audit against your brain's policy and procedure pages.

Outputs:
1. A gap analysis listing which controls are covered, partially covered, or missing
2. An evidence dossier page at `wiki/compliance/<framework>-audit-<date>.md` with
   brain-page citations for every control that IS covered
3. A remediation checklist for every gap

Supports: **SOC 2 Type II**, **GDPR Article 30**, **HIPAA §164**, **ISO 27001 Annex A**

## Trigger conditions

Activate when the user says:

- "run a SOC 2 compliance audit"
- "do a GDPR gap analysis"
- "check our HIPAA compliance"
- "audit our ISO 27001 controls"
- "are we compliant with <framework>?"

## Pre-flight checks

1. Identify the **framework**: SOC 2, GDPR, HIPAA, or ISO 27001. If unclear, ask once.
2. Verify the brain has policy/procedure pages to audit. If `modusbrain stats` returns
   0 pages, stop with `Error: brain is empty — import your policy docs first`.
3. Do NOT invent controls or evidence. Every covered control MUST cite a brain page slug.

## Audit steps

1. Load the control list for the requested framework (built-in, see below).
2. For each control, run a brain search to find matching policy/procedure pages.
3. Score each control:
   - ✅ `COVERED` — brain page found with explicit evidence
   - ⚠️  `PARTIAL` — brain page found but evidence is incomplete or outdated
   - ❌ `GAP` — no brain page found or evidence is insufficient

4. Generate the evidence dossier page with:
   - Control ID, control name, status, brain-page slug, key excerpt
   - Remediation action for every GAP/PARTIAL

5. Print a summary table to the console.

## Built-in control sets (abbreviated — full sets in references/)

### SOC 2 (Trust Services Criteria)
- CC1 — Control Environment (tone at top, board oversight)
- CC2 — Communication & Information (policy distribution)
- CC3 — Risk Assessment (risk identification process)
- CC6 — Logical Access (access provisioning, MFA, offboarding)
- CC7 — System Operations (incident detection, backup, monitoring)
- CC9 — Risk Mitigation (vendor management, insurance)
- A1 — Availability (SLA, redundancy, DR plan)

### GDPR (Article 30 + key articles)
- Art. 5 — Data processing principles (purpose limitation, minimization)
- Art. 13/14 — Privacy notice (what, why, how long, rights)
- Art. 17 — Right to erasure (deletion process documented)
- Art. 25 — Privacy by design (DPIA process)
- Art. 32 — Security of processing (encryption, access controls)
- Art. 33 — Breach notification (72h process)

### HIPAA (§164 Security Rule)
- §164.308(a)(1) — Security management (risk analysis)
- §164.308(a)(3) — Workforce access controls
- §164.308(a)(6) — Security incident procedures
- §164.312(a)(2) — Automatic logoff
- §164.312(b) — Audit controls

### ISO 27001 (Annex A)
- A.5 — Information security policies
- A.6 — Organization of information security
- A.8 — Asset management
- A.9 — Access control
- A.12 — Operations security
- A.16 — Incident management
- A.17 — Business continuity

## Output format

```
compliance-audit: SOC 2 Type II — 2026-07-20
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Controls audited: 7
✅ COVERED:    4  (57%)
⚠️  PARTIAL:   2  (29%)
❌ GAPS:       1  (14%)

Dossier written: wiki/compliance/soc2-audit-2026-07-20.md
Remediation checklist: 3 items

Next: share the dossier with your auditor or run:
  modusbrain opskill compile wiki/compliance/soc2-audit-2026-07-20.md
```

## Hard stops

- Never fabricate control evidence. If no brain page covers a control → mark it GAP.
- Never claim COVERED without a real brain-page slug citation.
- Do not auto-approve anything involving legal or financial obligations without a
  HIGH risk-tier review.
