import type { AnalysisResult } from '@/lib/footfit-api';

function humanize(key: string) { return key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2'); }
function Values({ data }: { data: unknown }) {
  if (data === null || data === undefined) return <span className="text-muted-foreground">Not provided</span>;
  if (typeof data !== 'object') return <span className="break-words font-mono text-xs">{String(data)}</span>;
  return <dl className="space-y-2">{Object.entries(data).map(([key, value]) => <div key={key} className="grid gap-1 border-b border-border py-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><dt className="break-words text-xs capitalize text-muted-foreground">{humanize(key)}</dt><dd className="min-w-0"><Values data={value}/></dd></div>)}</dl>;
}
export function TechnicalDetails({ result }: { result: AnalysisResult }) {
  return <details className="disclosure"><summary>Technical Details <span className="text-xs font-normal text-muted-foreground">Science Expo</span></summary><div className="space-y-7 p-6 pt-0">
    {result.features !== undefined && <section><h3 className="mb-3 text-sm font-semibold">Extracted features</h3><Values data={result.features}/></section>}
    {result.predictions !== undefined && <section><h3 className="mb-3 text-sm font-semibold">Individual model predictions</h3><Values data={result.predictions}/></section>}
    <section><h3 className="mb-3 text-sm font-semibold">Hybrid ensemble decision</h3><Values data={result.decision}/></section>
    {Object.entries(result).filter(([k]) => !['success', 'features', 'predictions', 'decision', 'filename'].includes(k)).map(([key, data]) => <section key={key}><h3 className="mb-3 text-sm font-semibold capitalize">{humanize(key)}</h3><Values data={data}/></section>)}
  </div></details>;
}