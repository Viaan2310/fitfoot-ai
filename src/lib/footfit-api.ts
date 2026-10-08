export const API_BASE_URL = 'https://footfit-ai-backend.onrender.com';

export const FOOT_TYPES = { Flat: 'Flat Foot', Normal: 'Normal Foot', HighArch: 'High Arch' } as const;
export type FootType = keyof typeof FOOT_TYPES;
export type AnalysisResult = {
  success: true;
  filename?: string;
  features?: unknown;
  predictions?: unknown;
  decision: { final_prediction: FootType; confidence: string | number; [key: string]: unknown };
  [key: string]: unknown;
};

export class AnalysisError extends Error {
  constructor(public kind: 'invalid' | 'network' | 'backend' | 'unexpected' | 'timeout', public detail?: string) {
    super(kind);
  }
}

export function validateImage(file?: File | null): string | null {
  if (!file) return 'Please select a foot image before analyzing.';
  if (!file.type.startsWith('image/') || file.size === 0) return 'Please choose a valid image file.';
  return null;
}

export function parseAnalysisResponse(value: unknown): AnalysisResult {
  if (!value || typeof value !== 'object') throw new AnalysisError('unexpected');
  const result = value as Record<string, unknown>;
  if (result['success'] === false) throw new AnalysisError('backend', JSON.stringify(result));
  const decision = result['decision'];
  if (result['success'] !== true || !decision || typeof decision !== 'object') throw new AnalysisError('unexpected');
  const d = decision as Record<string, unknown>;
  if (typeof d['final_prediction'] !== 'string' || !Object.hasOwn(FOOT_TYPES, d['final_prediction']) ||
    !((typeof d['confidence'] === 'string' && d['confidence'].trim().length > 0) || (typeof d['confidence'] === 'number' && Number.isFinite(d['confidence'])))) {
    throw new AnalysisError('unexpected');
  }
  return result as AnalysisResult;
}

export async function predictFoot(file: File, signal?: AbortSignal): Promise<AnalysisResult> {
  if (validateImage(file)) throw new AnalysisError('invalid');
  const body = new FormData();
  body.append('file', file);
  const timeout = AbortSignal.timeout(120_000);
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, { method: 'POST', body, signal: signal ? AbortSignal.any([signal, timeout]) : timeout });
    if (!response.ok) throw new AnalysisError('backend', `HTTP ${response.status}`);
    let data: unknown;
    try { data = await response.json(); } catch { throw new AnalysisError('unexpected'); }
    return parseAnalysisResponse(data);
  } catch (error) {
    if (error instanceof AnalysisError) throw error;
    if (timeout.aborted) throw new AnalysisError('timeout');
    if (signal?.aborted) throw error;
    throw new AnalysisError('network');
  }
}