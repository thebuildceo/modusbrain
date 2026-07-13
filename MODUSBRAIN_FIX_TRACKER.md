# ModusBrain Fix Tracker

## Progress: ~85% done · ~15% gates remaining (rebrand after gates)

- [x] Step 1: TypeScript build blockers fixed · gate `bunx tsc --noEmit` ✅ (All NonSharedBuffer and type check errors fully resolved)
- [x] Step 2: Opskill wiring verified · gate `bun test test/operational-skills.test.ts` ✅
- [x] Step 3: 31/31 verify checks green ✅
- [x] Step 4 fixes: Windows paths, brain-isolation helper, 1-shard runner, spawn fixes ✅
- [x] Step 4 fixes: supervisor Windows integration (`SUP_SH_WRAPPER`, `bun run` runner) ✅
- [x] Step 4 fixes: E2E shims use `process.execPath` (claw-test, pglite-cli-exit, migration-flow) ✅
- [ ] Step 4 gate: **`bun run test:win`** — you run locally (~30–60 min)
- [ ] Step 5 gate: **`bun run test:e2e`** — needs Docker + Postgres
- [ ] Step 6 gate: **`bun run ci:local:diff`** + **`ci:local`** — needs Docker + gitleaks
- [ ] Later: Full ModusBrain rebrand + npm publish
- [ ] Later: Launch checklist

## Confirmed green on your machine (2026-07-13)

| Command | Result |
|---------|--------|
| `bunx tsc --noEmit` | ✅ 100% clean |
| `bun run verify` | ✅ 31/31 green |
| `migration-in-process.serial` + `worker-registry.serial` | ✅ 13/13 green |
| Key serial batch (cycle, pglite-disconnect, upgrade-checkpoint, sync-inline) | ✅ 55/55 (prior run) |

## Run next (in order)

```powershell
$env:PATH="$env:USERPROFILE\.bun\bin;C:\Program Files\Git\bin;C:\Program Files\Git\usr\bin;$env:PATH"
cd c:\Users\Shubham\Downloads\gbrain-master\gbrain-master

# Step 4 gate (Windows — use test:win, NOT bun run test)
bun run test:win

# Step 5 (start Docker Desktop first)
docker info
bun run test:e2e

# Step 6 (install gitleaks: winget install gitleaks or brew)
gitleaks version
bun run ci:local:diff
bun run ci:local
```

If Step 4 fails, paste the **summary line** (`N pass / M fail`) and the `(fail)` block from `.context/test-failures.log`.

## Rebrand note

Deferred until Steps 4–6 pass. `package.json` is `modusbrain`; CLI still prints `gbrain` for compatibility.
