# ModusBrain Fix Tracker

- [x] Step 1 complete: TypeScript build blockers fixed.
- [x] Step 1 gate passed: `bunx tsc --noEmit`.
- [x] Step 2 complete: opskill compile/approve/execute/list operation wiring verified.
- [x] Step 2 gate passed: `bun test test/operational-skills.test.ts`.
- [x] Step 3 gate passed: 31/31 verify checks green.
- [x] Step 4 fixes applied: Windows paths, ModusBrain home, child process shims.
- [x] Step 4 fixes applied: shared `test/helpers/brain-isolation.ts` (CLI shims + config dir helpers).
- [x] Step 4 fixes applied: `run-unit-parallel.sh` defaults to 1 shard on Windows Git Bash.
- [x] Step 4 fixes applied: E2E spawn uses `process.execPath` not bare `bun`.
- [x] Step 4 fixes applied: `.gbrain` vs `.modusbrain` test contract aligned (legacy vs isolated env).
- [ ] Step 4 gate: `bun run test` passes (run locally — **use `bun run test:win` on Windows**, ~30–60 min).
- [ ] Step 5: Fix E2E failures after unit gate is green (needs Postgres via Docker).
- [ ] Step 5 gate: `bun run test:e2e` passes.
- [ ] Step 6: Run Docker CI and gitleaks after E2E is green.
- [ ] Step 6 gate: `bun run ci:local:diff` and `bun run ci:local` pass.
- [ ] Later: Finish ModusBrain rebrand cleanup (user-facing strings, npm publish as `modusbrain`).
- [ ] Later: Prepare launch checklist.

## What was fixed (code, not just commands)

| Area | Fix |
|------|-----|
| Windows test runner | `scripts/run-unit-parallel.sh` → 1 shard + lower concurrency on MINGW/MSYS |
| Windows subprocess PATH | `scripts/bun-child-env.sh` + `test/helpers/brain-isolation.ts` |
| Serial spawn tests | apply-migrations, doctor-cli-smoke use shared CLI shim (`gbrain.cmd` + full bun path) |
| Rebrand test drift | worker-registry expects `.gbrain` when only `GBRAIN_HOME` set; isolated tests use `.modusbrain` |
| E2E Windows | `serve-http-oauth`, `connect-bearer`, `init-fresh-pglite` spawn via `process.execPath` |
| cycle lock test | `cycle-pglite-lock-ordering.serial.test.ts` uses `configDir` consistently |

## Manual Verification Commands

```powershell
$env:PATH="$env:USERPROFILE\.bun\bin;C:\Program Files\Git\bin;C:\Program Files\Git\usr\bin;$env:PATH"
cd c:\Users\Shubham\Downloads\gbrain-master\gbrain-master
bun install
bunx tsc --noEmit
bun run verify
bun run build:llms
bun test test/build-llms.test.ts
```

**Quick serial smoke (tracker-listed, ~1 min each batch):**

```powershell
bun test --max-concurrency=1 --timeout=180000 test/pglite-engine-disconnect.serial.test.ts test/sync-inline-extract-stamps.serial.test.ts test/upgrade-checkpoint.serial.test.ts test/core/cycle.serial.test.ts
bun test test/worker-registry.serial.test.ts test/migration-in-process.serial.test.ts
```

**Full unit suite (Windows — do NOT use default 4-shard parallel):**

```powershell
bun run test:win
```

**E2E + CI (requires Docker daemon running + gitleaks installed):**

```powershell
docker info
gitleaks version
bun run test:e2e
bun run ci:local:diff
bun run ci:local
```

## Rebrand note

Product code still ships as **GBrain CLI strings** internally until Step "Later" — `package.json` name is `modusbrain` but `--version` prints `gbrain` for compatibility. Full rebrand (help text, npm publish, docs) comes **after** all test gates are green.
