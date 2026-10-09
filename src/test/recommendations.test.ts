import { describe, expect, it } from 'vitest';
import { generateRecommendations, validateAge } from '@/lib/recommendations';

describe('recommendation rules', () => {
  it('age is optional', () => { expect(validateAge('')).toBeNull(); });
  it('rejects non-numeric and out-of-range ages', () => { expect(validateAge('abc')).not.toBeNull(); expect(validateAge('0')).not.toBeNull(); expect(validateAge('130')).not.toBeNull(); expect(validateAge('15')).toBeNull(); });
  it('changes with activity', () => { expect(generateRecommendations('Flat', 'running').recommendations[0]!.title).not.toBe(generateRecommendations('Flat', 'standing').recommendations[0]!.title); });
  it('changes with foot type', () => { expect(generateRecommendations('Flat', 'walking').recommendations[1]!.title).not.toBe(generateRecommendations('HighArch', 'walking').recommendations[1]!.title); });
  it('gives three to five tips', () => { const n = generateRecommendations('Normal', 'sports', 12).tips.length; expect(n).toBeGreaterThanOrEqual(3); expect(n).toBeLessThanOrEqual(5); });
  it('work footwear mentions safety requirements', () => { expect(generateRecommendations('Normal', 'physical').recommendations[0]!.characteristics.join(' ')).toMatch(/safety/); });
});
