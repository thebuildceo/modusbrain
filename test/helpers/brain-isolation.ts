/**
 * Hermetic brain-home + CLI shim helpers for subprocess/serial tests.
 * Use on Windows and Unix so migration orchestrators find `gbrain` on PATH.
 */
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { BRAND } from '../../src/core/branding.ts';

/** Config dir when both home overrides are set (matches brandConfigDir). */
export function isolatedConfigDir(home: string): string {
  return join(home, BRAND.configDirName);
}

/** Legacy config dir when only GBRAIN_HOME is set. */
export function legacyConfigDir(home: string): string {
  return join(home, BRAND.legacyConfigDirName);
}

/** Env for an isolated brain temp home (subprocess-safe). */
export function isolatedBrainEnv(home: string, extra: Record<string, string> = {}): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) env[key] = value;
  }
  delete env.DATABASE_URL;
  delete env.GBRAIN_DATABASE_URL;
  delete env.MODUSBRAIN_DATABASE_URL;
  env.HOME = home;
  env.GBRAIN_HOME = home;
  env.MODUSBRAIN_HOME = home;
  return { ...env, ...extra };
}

/** Env when tests intentionally exercise legacy ~/.gbrain layout only. */
export function legacyBrainEnv(home: string, extra: Record<string, string> = {}): Record<string, string> {
  const env = isolatedBrainEnv(home, extra);
  delete env.MODUSBRAIN_HOME;
  return env;
}

const pathSep = process.platform === 'win32' ? ';' : ':';

/** Prepends shim bin dir to PATH. */
export function withShimPath(binDir: string, basePath = process.env.PATH ?? ''): string {
  return `${binDir}${pathSep}${basePath}`;
}

/** Shell script body for a `gbrain`/`modusbrain` shim (Git Bash / Unix). */
export function cliShimScript(repoRoot: string): string {
  const repo = repoRoot.replace(/\\/g, '/');
  const exec = process.execPath.replace(/\\/g, '/');
  return `#!/bin/sh\nexec "${exec}" run "${repo}/src/cli.ts" "$@"\n`;
}

/** Windows `.cmd` shim body. */
export function cliShimCmd(repoRoot: string): string {
  const repoWin = repoRoot.replace(/\//g, '\\');
  return `@echo off\r\n"${process.execPath}" run "${repoWin}\\src\\cli.ts" %*\r\n`;
}

/**
 * Migration orchestrators shell out to `gbrain …`; Windows needs `.cmd` stubs too.
 */
export function makeCliShim(repoRoot: string, prefix = 'gbrain-shim-'): { binDir: string; cleanup: () => void } {
  const binDir = mkdtempSync(join(tmpdir(), prefix));

  for (const name of ['gbrain', 'modusbrain'] as const) {
    const shimPath = join(binDir, name);
    writeFileSync(shimPath, cliShimScript(repoRoot), { mode: 0o755 });
    chmodSync(shimPath, 0o755);
    writeFileSync(join(binDir, `${name}.cmd`), cliShimCmd(repoRoot));
  }

  return {
    binDir,
    cleanup: () => {
      try { rmSync(binDir, { recursive: true, force: true }); } catch { /* best-effort */ }
    },
  };
}
