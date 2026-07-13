/**
 * Cross-platform Bun subprocess helpers.
 * Bare `spawnSync('bun', …)` fails on Windows (uv_spawn cannot resolve bun).
 */
import { execFileSync, spawnSync, type ExecFileSyncOptions, type SpawnSyncOptions } from 'child_process';

/** Absolute path to the running Bun executable. */
export const BUN = process.execPath;

export function bunSpawnSync(args: string[], options?: SpawnSyncOptions) {
  return spawnSync(BUN, args, options);
}

export function bunExecFileSync(args: string[], options?: ExecFileSyncOptions) {
  return execFileSync(BUN, args, options);
}
