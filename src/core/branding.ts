/**
 * ModusBrain product branding — single source of truth for user-facing names,
 * paths, and env var resolution. Internal protocol strings (gbrain-skillpack-v1,
 * gbrain-base schema pack) stay unchanged for compatibility.
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { isAbsolute, join } from 'node:path';

export const BRAND = {
  productName: 'ModusBrain',
  productSlug: 'modusbrain',
  cliName: 'modusbrain',
  /** Deprecated alias; still registered as a bin entry for migration. */
  legacyCliName: 'modusbrain',
  domain: 'modusbrain.com',
  website: 'https://modusbrain.com',
  docsUrl: 'https://docs.modusbrain.com',
  githubOrg: 'thebuildceo', // github.com/thebuildceo/modusbrain
  tagline: 'The company brain agents can safely execute against.',
  configDirName: '.modusbrain',
  legacyConfigDirName: '.modusbrain',
  sourceDotfile: '.modusbrain-source',
  legacySourceDotfile: '.modusbrain-source',
  attribution:
    'Built on ModusBrain (MIT License) — https://github.com/thebuildceo/modusbrain',
} as const;

/** Resolve env var: MODUSBRAIN_* wins, then legacy MODUSBRAIN_*. */
export function brandEnv(name: string): string | undefined {
  const modus = `MODUSBRAIN_${name}`;
  const legacy = `MODUSBRAIN_${name}`;
  return cleanEnvValue(process.env[modus]) ?? cleanEnvValue(process.env[legacy]);
}

function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return undefined;
  return trimmed;
}

/** Home override: MODUSBRAIN_HOME or MODUSBRAIN_HOME (parent dir; we append config dir). */
export function brandHomeOverride(): string | undefined {
  return brandEnv('HOME') ?? cleanEnvValue(process.env.MODUSBRAIN_HOME);
}

/**
 * Active config directory (~/.modusbrain or legacy ~/.modusbrain).
 * New installs use ~/.modusbrain. Existing ModusBrain users keep working via fallback.
 */
export function brandConfigDir(): string {
  const override = brandHomeOverride();
  if (override) {
    if (!isAbsolute(override)) {
      throw new Error(`MODUSBRAIN_HOME must be an absolute path; got: ${override}`);
    }
    if (override.split(/[\\/]/).includes('..')) {
      throw new Error(`MODUSBRAIN_HOME must not contain '..' segments; got: ${override}`);
    }
    if (cleanEnvValue(process.env.MODUSBRAIN_HOME)) {
      return join(override, BRAND.configDirName);
    }
    return join(override, BRAND.legacyConfigDirName);
  }

  const modusDir = join(homedir(), BRAND.configDirName);
  const legacyDir = join(homedir(), BRAND.legacyConfigDirName);

  if (existsSync(modusDir)) return modusDir;
  if (existsSync(legacyDir)) return legacyDir;
  return modusDir;
}

/** CLI command prefix for help text, e.g. `modusbrain init`. */
export function cliCmd(sub = ''): string {
  return sub ? `${BRAND.cliName} ${sub}` : BRAND.cliName;
}

/** Replace user-facing modusbrain/ModusBrain in help strings at runtime. */
export function brandHelp(text: string): string {
  return text
    .replace(/\bmodusbrain\b/g, BRAND.cliName)
    .replace(/\bModusBrain\b/g, BRAND.productName)
    .replace(/~\/\.modusbrain\b/g, `~/${BRAND.configDirName}`)
    .replace(/\$MODUSBRAIN_HOME/g, '$MODUSBRAIN_HOME')
    .replace(/\bMODUSBRAIN_/g, 'MODUSBRAIN_')
    .replace(/\.modusbrain-source/g, BRAND.sourceDotfile);
}

/** Branded `Usage: …` line for CLI help and error messages. */
export function usageLine(sub: string): string {
  return brandHelp(`Usage: modusbrain ${sub}`);
}
