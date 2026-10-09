import { describe, expect, it } from 'vitest';
import { CATALOGUE, filterShoes, formatINR } from '@/lib/shoe-catalogue';

describe('shoe catalogue', () => {
  it('contains only verified products with real links, images and prices', () => {
    expect(CATALOGUE.length).toBeGreaterThanOrEqual(3);
    for (const p of CATALOGUE) {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.image).toMatch(/^https:\/\//);
      expect(p.price).toBeGreaterThan(0);
      expect(p.brand.length).toBeGreaterThan(0);
      expect(p.model.length).toBeGreaterThan(0);
    }
  });
  it('ranks products matching the foot type first', () => {
    const flat = filterShoes('Flat', 'running', {});
    expect(flat[0]?.id).toBe('asics-gt-1000-14');
    const high = filterShoes('HighArch', 'running', {});
    expect(high[0]?.footTypes).toContain('HighArch');
  });
  it('budget filter hides products above the budget', () => {
    const cheap = filterShoes('Normal', 'walking', { budget: 2500 });
    expect(cheap.every(p => p.price <= 2500)).toBe(true);
    expect(cheap.some(p => p.id === 'asics-gt-1000-14')).toBe(false);
  });
  it('width filter never hides products with unverified width', () => {
    const wide = filterShoes('Normal', 'walking', { width: 'Wide' });
    expect(wide.length).toBe(CATALOGUE.filter(p => p.width === undefined || p.width === 'Wide').length);
  });
  it('formats prices in Indian rupee style', () => {
    expect(formatINR(9024)).toBe('₹9,024');
  });
});
