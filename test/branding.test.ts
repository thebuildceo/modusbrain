import { describe, expect, test } from 'bun:test';
import { BRAND, brandEnv, brandHelp, cliCmd } from '../src/core/branding.ts';

describe('branding', () => {
  test('product constants', () => {
    expect(BRAND.cliName).toBe('modusbrain');
    expect(BRAND.productName).toBe('ModusBrain');
    expect(BRAND.domain).toBe('modusbrain.com');
  });

  test('brandEnv prefers MODUSBRAIN_ over GBRAIN_', () => {
    const key = 'TEST_BRAND_ENV_' + Date.now();
    process.env[`GBRAIN_${key}`] = 'legacy';
    process.env[`MODUSBRAIN_${key}`] = 'modus';
    expect(brandEnv(key)).toBe('modus');
    delete process.env[`GBRAIN_${key}`];
    delete process.env[`MODUSBRAIN_${key}`];
  });

  test('brandHelp rewrites user-facing strings', () => {
    const out = brandHelp('Run gbrain init; config at ~/.gbrain');
    expect(out).toContain('modusbrain');
    expect(out).toContain('.modusbrain');
    expect(out).not.toContain('gbrain init');
  });

  test('cliCmd formats commands', () => {
    expect(cliCmd()).toBe('modusbrain');
    expect(cliCmd('init')).toBe('modusbrain init');
  });
});
