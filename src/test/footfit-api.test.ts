import { afterEach, describe, expect, it, vi } from 'vitest';
import { API_BASE_URL, FOOT_TYPES, parseAnalysisResponse, predictFoot, validateImage } from '@/lib/footfit-api';

afterEach(() => vi.unstubAllGlobals());
describe('FootFit service contract', () => {
  it('requires an image before sending', () => { expect(validateImage(null)).not.toBeNull(); });
  it('rejects non-images', () => { expect(validateImage(new File(['text'], 'foot.txt', { type: 'text/plain' }))).not.toBeNull(); });
  it('displays the three required classification names', () => { expect(FOOT_TYPES).toEqual({ Flat: 'Flat Foot', Normal: 'Normal Foot', HighArch: 'High Arch' }); });
  it('keeps the backend confidence and classification unchanged', () => {
    const data = { success: true, decision: { final_prediction: 'HighArch', confidence: 'Very High' } };
    expect(parseAnalysisResponse(data)).toBe(data);
  });
  it('rejects unrecognized results instead of inventing a prediction', () => { expect(() => parseAnalysisResponse({ success: true, decision: { final_prediction: 'Other', confidence: 'High' } })).toThrow(); });
  it('rejects failed contour extraction', () => { expect(() => parseAnalysisResponse({ success: false, error: 'No foot contour detected' })).toThrow(); });
  it('rejects missing confidence', () => { expect(() => parseAnalysisResponse({ success: true, decision: { final_prediction: 'Flat' } })).toThrow(); });
  it('sends an image as multipart file to the real endpoint without setting content type', async () => {
    const file = new File(['image'], 'foot.png', { type: 'image/png' });
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: true, decision: { final_prediction: 'Normal', confidence: 'Moderate' } })));
    vi.stubGlobal('fetch', fetcher);
    await predictFoot(file);
    const call = fetcher.mock.calls[0];
    if (!call) throw new Error('Expected an API request');
    const [url, options] = call;
    if (!options || !(options.body instanceof FormData)) throw new Error('Expected multipart options');
    expect(url).toBe(`${API_BASE_URL}/predict`);
    expect(options.method).toBe('POST');
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.body.get('file')).toBe(file);
    expect(options.headers).toBeUndefined();
  });
});