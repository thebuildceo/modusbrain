/**
 * Cross-platform Bun subprocess helpers.
 * Bare `spawnSync('bun', …)` fails on Windows (uv_spawn cannot resolve bun).
 * All helpers coerce stdout/stderr to `string` so callers don't need casts.
 */
import { execFileSync, spawnSync, type ExecFileSyncOptions, type SpawnSyncOptions } from 'child_process';

/** Absolute path to the running Bun executable. */
export const BUN = process.execPath;

/** Result type with stdout/stderr guaranteed as strings */
export interface BunSpawnSyncResult {
  status: number | null;
  stdout: string;
  stderr: string;
  error?: Error;
}

export function bunSpawnSync(args: string[], options?: SpawnSyncOptions): BunSpawnSyncResult {
  const res = spawnSync(BUN, args, { encoding: 'utf-8', ...options });
  return {
    status: res.status,
    stdout: res.stdout == null ? '' : typeof res.stdout === 'string' ? res.stdout : res.stdout.toString('utf-8'),
    stderr: res.stderr == null ? '' : typeof res.stderr === 'string' ? res.stderr : res.stderr.toString('utf-8'),
    error: res.error,
  };
}

export function bunExecFileSync(args: string[], options?: ExecFileSyncOptions): string {
  const res = execFileSync(BUN, args, { encoding: 'utf-8', ...options } as any);
  return typeof res === 'string' ? res : (res as Buffer).toString('utf-8');
}
