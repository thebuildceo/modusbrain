/**
 * Run `fn` with NO Anthropic key reachable from EITHER source the gateway
 * checks. `hasAnthropicKey()` (src/core/ai/anthropic-key.ts) returns true if
 * `process.env.ANTHROPIC_API_KEY` is set OR `~/.modusbrain/config.json` carries
 * `anthropic_api_key`. A test that only `delete`s the env var is NOT hermetic:
 * on a developer machine whose `~/.modusbrain` holds a real key (or whose
 * `.env.testing` sets ANTHROPIC_API_KEY), the "no key" path actually fires a
 * live LLM call and the assertion flips from `NO_ANTHROPIC_API_KEY` to
 * `LLM_OUTPUT_NOT_JSON`.
 *
 * This helper neutralizes BOTH sources for the duration of `fn`:
 *   - deletes ANTHROPIC_API_KEY from the env, and
 *   - points MODUSBRAIN_HOME at a fresh empty temp dir so `configDir()` (which
 *     honors MODUSBRAIN_HOME) resolves to a directory with no config.json, making
 *     `loadConfig()` return null.
 *
 * Both are restored (and the temp dir removed) in a finally, even on throw.
 * `loadConfig()` reads the file fresh on every call and `probeChatModel` runs
 * before the gateway's model cache, so per-call isolation is sufficient — no
 * module-level key state survives.
 */
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function withoutAnthropicKey<T>(fn: () => Promise<T>): Promise<T> {
  const origKey = process.env.ANTHROPIC_API_KEY;
  const origHome = process.env.MODUSBRAIN_HOME;
  const tmp = mkdtempSync(join(tmpdir(), 'modusbrain-nokey-'));
  delete process.env.ANTHROPIC_API_KEY;
  process.env.MODUSBRAIN_HOME = tmp; // configDir() -> $MODUSBRAIN_HOME/.modusbrain (absent -> no config key)
  try {
    return await fn();
  } finally {
    if (origKey !== undefined) process.env.ANTHROPIC_API_KEY = origKey;
    else delete process.env.ANTHROPIC_API_KEY;
    if (origHome !== undefined) process.env.MODUSBRAIN_HOME = origHome;
    else delete process.env.MODUSBRAIN_HOME;
    try { rmSync(tmp, { recursive: true, force: true }); } catch { /* best-effort */ }
  }
}
