import { describe, expect, test } from 'bun:test';
import { withEnv } from './helpers/with-env.ts';
import { BRAND, brandEnv, brandHelp, cliCmd, usageLine } from '../src/core/branding.ts';

describe('branding', () => {
  test('product constants', () => {
    expect(BRAND.cliName).toBe('modusbrain');
    expect(BRAND.productName).toBe('ModusBrain');
    expect(BRAND.domain).toBe('modusbrain.com');
  });

  test('brandEnv prefers MODUSBRAIN_ over MODUSBRAIN_', async () => {
    const key = 'TEST_BRAND_ENV_' + Date.now();
    await withEnv(
      {
        [`MODUSBRAIN_${key}`]: 'legacy',
        [`MODUSBRAIN_${key}`]: 'modus',
      },
      () => {
        expect(brandEnv(key)).toBe('modus');
      },
    );
  });

  test('brandHelp rewrites user-facing strings', () => {
    const out = brandHelp('Run modusbrain init; config at ~/.modusbrain');
    expect(out).toContain('modusbrain');
    expect(out).toContain('.modusbrain');
    expect(out).not.toContain('modusbrain init');
  });

  test('cliCmd formats commands', () => {
    expect(cliCmd()).toBe('modusbrain');
    expect(cliCmd('init')).toBe('modusbrain init');
  });

  test('usageLine formats branded usage', () => {
    expect(usageLine('init')).toBe('Usage: modusbrain init');
  });
});
