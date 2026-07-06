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
  legacyCliName: 'gbrain',
  domain: 'modusbrain.com',
  website: 'https://modusbrain.com',
  docsUrl: 'https://docs.modusbrain.com',
  githubOrg: 'modusbrain', // update when repo is created
  tagline: 'The company brain agents can safely execute against.',
  configDirName: '.modusbrain',
  legacyConfigDirName: '.gbrain',
  sourceDotfile: '.modusbrain-source',
  legacySourceDotfile: '.gbrain-source',
  attribution:
    'Built on GBrain (MIT License) — https://github.com/garrytan/gbrain',
} as const;

/** Resolve env var: MODUSBRAIN_* wins, then legacy GBRAIN_*. */
export function brandEnv(name: string): string | undefined {
  const modus = `MODUSBRAIN_${name}`;
  const legacy = `GBRAIN_${name}`;
  return process.env[modus] ?? process.env[legacy];
}

/** Home override: MODUSBRAIN_HOME or GBRAIN_HOME (parent dir; we append config dir). */
export function brandHomeOverride(): string | undefined {
  const v = brandEnv('HOME') ?? process.env.GBRAIN_HOME;
  return v?.trim() || undefined;
}

/**
 * Active config directory (~/.modusbrain or legacy ~/.gbrain).
 * New installs use ~/.modusbrain. Existing GBrain users keep working via fallback.
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
    return join(override, BRAND.configDirName);
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

/** Replace user-facing gbrain/GBrain in help strings at runtime. */
export function brandHelp(text: string): string {
  return text
    .replace(/\bgbrain\b/g, BRAND.cliName)
    .replace(/\bGBrain\b/g, BRAND.productName)
    .replace(/~\/\.gbrain\b/g, `~/${BRAND.configDirName}`)
    .replace(/\$GBRAIN_HOME/g, '$MODUSBRAIN_HOME')
    .replace(/\bGBRAIN_/g, 'MODUSBRAIN_')
    .replace(/\.gbrain-source/g, BRAND.sourceDotfile);
}
