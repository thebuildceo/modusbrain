# ModusBrain Rebrand Blueprint

## Core Translation Rules
- Old Brand Name: gbrain / GBrain
- New Brand Name: ModusBrain / ModusBrain / modusbrain
- Core CLI Binary Command: gbrain -> modusbrain
- State Configuration Directory: ~/.config/gbrain -> ~/.config/modusbrain
- Internal State Files: .gbrain -> .modusbrain

## Execution Preservations
- Do NOT alter the underlying functional logic of the custom ModusBrain layer.
- Preserve all structures related to versioned skill artifacts (v1 -> v2 -> v3).
- Preserve all structures related to risk tiers, confidence gating, and manual approvals.