# ModusBrain Master Rebrand Blueprint & Execution Guide

## 1. Core Translation & Casing Dictionary
Match and replace all textual references across code, strings, logs, and comments using strict casing rules:
- `gbrain` (lowercase) -> `modusbrain`
- `GBrain` / `GBRAIN` (Pascal/Uppercase) -> `ModusBrain` / `MODUSBRAIN`

## 2. Global Code Content Modifications
Scan and rewrite the following specific code constructs:
- **Environment Variables**: Update `GBRAIN_API_KEY` to `MODUSBRAIN_API_KEY` (and any other `GBRAIN_*` prefixes).
- **Configuration Paths**: Change all hardcoded user-space directories from `~/.config/gbrain` to `~/.config/modusbrain`.
- **State & Metadata Files**: Change temporary or database caching prefixes from `.gbrain` to `.modusbrain`.
- **Package Manifest**: In the root `package.json`, change the `"name"` property to `"modusbrain"` or your target npm namespace. Update the `"bin"` mapping:
  ```json
  "bin": {
    "modusbrain": "./src/cli/index.ts"
  }
  ```

## 3. Physical File & Directory Renaming Rules
Locate every physical file and folder path containing the string `gbrain` and rename them sequentially using system terminal operations. This includes (but is not limited to):
- Any configuration templates (e.g., `gbrain-config.json.template` -> `modusbrain-config.json.template`)
- Internal module or documentation directories (e.g., `src/gbrain-core/` -> `src/modusbrain-core/`)
- Test suite configurations (e.g., `gbrain.test.ts` -> `modusbrain.test.ts`)

## 4. Strict Code Preservation Enclaves
Do NOT modify, delete, or alter the logical structures of our custom enterprise layers:
- **ModusBrain Core Layer**: Keep all internal routing logic intact.
- **Skill Versioning System**: Keep the artifact mutation pipelines (`v1` -> `v2` -> `v3`) intact.
- **Risk-Tier Gating**: Keep confidence score thresholds, risk classification filters, and manual approval gate triggers fully intact.

## 5. Post-Rebrand Automated Verification Routine
Immediately after renaming files and updating code text, execute the following steps in the terminal to verify workspace integrity:
1. **Clear Links**: Run `bun unlink gbrain || true` to remove old global references.
2. **Type Compilation**: Run `bun x tsc --noEmit --skipLibCheck` (or the equivalent Node.js type-checker) to ensure no relative import paths are broken.
3. **Leaked Reference Check**: Run `grep -rnw . -e "gbrain" --exclude-dir={node_modules,.git,.next,dist,build,REBRAND_MAP.md}` to confirm zero leakage of the old brand name.
4. **Global Re-Link**: Run `bun link` to globally register the new `modusbrain` binary.
5. **System Diagnostics**: Run `modusbrain doctor` to verify configuration directories initialize perfectly.
