# ModusBrain Fix Tracker

- [x] Step 1 complete: TypeScript build blockers fixed.
- [x] Step 1 gate passed: `bunx tsc --noEmit`.
- [x] Step 2 complete: opskill compile/approve/execute/list operation wiring verified.
- [x] Step 2 gate passed: `bun test test/operational-skills.test.ts`.
- [x] Step 3 gate passed: 31/31 verify checks green.
- [~] Step 4 fixes applied: Windows paths, ModusBrain home, child process shims.
- [~] Step 4 fixes applied: remaining known serial failures patched.
- [ ] Step 4 gate: `bun run test` passes.
- [ ] Step 5: Fix E2E failures after unit gate is green.
- [ ] Step 5 gate: `bun run test:e2e` passes.
- [ ] Step 6: Run Docker CI and gitleaks after E2E is green.
- [ ] Step 6 gate: `bun run ci:local:diff` and `bun run ci:local` pass.
- [ ] Later: Finish ModusBrain rebrand cleanup.
- [ ] Later: Prepare launch checklist.

## Manual Verification Commands

- `$env:PATH="$env:USERPROFILE\.bun\bin;C:\Program Files\Git\bin;C:\Program Files\Git\usr\bin;$env:PATH"`
- `bun install`
- `bunx tsc --noEmit`
- `bun run verify`
- `bun test --max-concurrency=1 --timeout=180000 test/pglite-engine-disconnect.serial.test.ts`
- `bun test --max-concurrency=1 --timeout=180000 test/sync-inline-extract-stamps.serial.test.ts`
- `bun test --max-concurrency=1 --timeout=180000 test/upgrade-checkpoint.serial.test.ts`
- `bun test --max-concurrency=1 --timeout=180000 test/core/cycle.serial.test.ts`
- `bun run test`
- `docker info`
- `gitleaks version`
- `bun run test:e2e`
- `bun run ci:local:diff`
- `bun run ci:local`
