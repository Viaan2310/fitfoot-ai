import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Camera, CheckCircle2, ImagePlus, Info, LoaderCircle, RotateCcw, ScanLine, ShieldCheck, Trash2, Upload, AlertCircle, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HowItWorks } from '@/components/how-it-works';
import { TechnicalDetails } from '@/components/technical-details';
import { AnalysisError, FOOT_TYPES, predictFoot, validateImage, type AnalysisResult } from '@/lib/footfit-api';

export const Route = createFileRoute('/analyze')({
  head: () => ({ meta: [
    { title: 'Analyze Your Foot — FootFit-AI' }, { name: 'description', content: 'Upload a foot image for a real AI foot-type classification and confidence from the FootFit-AI service.' },
    { property: 'og:title', content: 'Analyze Your Foot — FootFit-AI' }, { property: 'og:description', content: 'Upload, preview, and analyze your foot image with the FootFit-AI hybrid ensemble.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: AnalysisPage,
});

function AnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!file) { setPreview(''); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { if (result) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [result]);
  function choose(next?: File) {
    if (busy) return;
    const invalid = validateImage(next);
    if (invalid) { setError(invalid); return; }
    setFile(next ?? null); setResult(null); setError(''); setDetail('');
  }
  function remove() { setFile(null); setResult(null); setError(''); setDetail(''); if (input.current) input.current.value = ''; }
  async function analyze() {
    const invalid = validateImage(file);
    if (invalid || !file) { setError(invalid ?? 'Please select a foot image.'); return; }
    setBusy(true); setError(''); setDetail(''); setResult(null);
    const controller = new AbortController(); request.current = controller;
    try { setResult(await predictFoot(file, controller.signal)); }
    catch (e) {
      if (controller.signal.aborted) return;
      const kind = e instanceof AnalysisError ? e.kind : 'unexpected';
      setError(kind === 'network' ? 'We couldn’t reach the AI service. Check your connection and try again.' : kind === 'timeout' ? 'The AI service is taking longer than expected. Please try again in a moment.' : 'We couldn’t analyze this image. Please try another clear foot image.');
      setDetail(e instanceof AnalysisError ? e.detail ?? `Request issue: ${kind}` : 'Unexpected response');
    } finally { if (!controller.signal.aborted) setBusy(false); }
  }
  return <main className="bg-muted"><div className="page-width py-12 fade-in">
    <div className="mb-9 text-center"><span className="eyebrow mb-3">An image. An insight.</span><h1 className="section-title mb-3">Foot Image Analysis</h1><p className="text-sm text-muted-foreground">A closer look at your foot, powered by computer vision and AI.</p></div>
    <div className="mx-auto grid max-w-5xl items-start gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
      <section className="rounded-lg border border-border bg-background p-6 sm:p-8" aria-labelledby="upload-title">
        <div className="mb-6 flex items-center justify-between"><h2 id="upload-title" className="text-base font-semibold">{result ? 'Your uploaded image' : 'Upload your foot image'}</h2><span className="rounded bg-accent px-2 py-1 text-xs text-primary">Step 01</span></div>
        <input ref={input} type="file" accept="image/*" aria-label="Select foot image" className="sr-only" disabled={busy} onChange={e => { choose(e.target.files?.[0]); e.target.value = ''; }}/>
        <div className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); if (!busy) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); if (!busy) choose(e.dataTransfer.files[0]); }}>
          {preview ? <div className="p-3"><img src={preview} alt="Selected foot image" className="h-64 w-full rounded object-contain" onError={() => { setFile(null); setError('This image could not be opened. Please choose another image.'); }}/><p className="mt-3 truncate px-1 text-xs text-muted-foreground">{file?.name}</p></div> : <div className="flex min-h-72 flex-col items-center justify-center px-5 py-9 text-center"><span className="mb-5 flex size-14 items-center justify-center rounded-lg border border-border bg-background text-primary"><ImagePlus size={25}/></span><h3 className="mb-2 text-sm font-semibold">Drop your foot image here</h3><p className="mb-5 text-xs text-muted-foreground">or select an image from your device</p><Button variant="outline" onClick={() => input.current?.click()}><Upload/> Select Image</Button><p className="mt-5 text-xs text-muted-foreground">Image files only · JPG, PNG, WebP and more</p></div>}
        </div>
        {file && <div className="mt-3 flex justify-between gap-3"><Button variant="ghost" size="sm" disabled={busy} onClick={() => input.current?.click()}><RotateCcw/>Replace image</Button><Button variant="ghost" size="sm" disabled={busy} onClick={remove}><Trash2/>Remove</Button></div>}
        {error && <div role="alert" className="mt-5 flex items-start gap-2 rounded-md bg-destructive/10 p-4 text-sm text-destructive"><AlertCircle className="mt-0.5 shrink-0" size={17}/><span>{error}</span></div>}
        {detail && <details className="mt-3 text-xs text-muted-foreground"><summary className="cursor-pointer">Technical error details</summary><p className="mt-2 break-words font-mono">{detail}</p></details>}
        <Button className="mt-6 h-12 w-full" disabled={busy} onClick={analyze}>{busy ? <><LoaderCircle className="animate-spin"/> Analyzing your foot…</> : <><ScanLine/> {result ? 'Analyze Again' : 'Analyze Foot'} <ArrowRight/></>}</Button>
        {busy && <div role="status" className="mt-4 text-center text-xs leading-5 text-muted-foreground">Your image is being processed by the AI service.<br/>The service may need a moment to wake up.</div>}
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={14}/> Sent to the FootFit-AI analysis service</p>
      </section>
      <aside className="py-2"><span className="mb-5 flex size-11 items-center justify-center rounded-md bg-accent text-primary"><Camera size={21}/></span><h2 className="mb-4 text-base font-semibold">A clearer image. A better analysis.</h2><ul className="space-y-5">{['Use a clear, well-lit image.', 'Keep the whole foot visible in the frame.', 'Choose a plain, contrasting background.', 'Avoid shadows, blur, and obstructions.'].map(text => <li key={text} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 shrink-0 text-success" size={16}/>{text}</li>)}</ul><div className="mt-7 border-t border-border pt-6"><span className="eyebrow mb-3">What you’ll receive</span><p className="text-sm leading-6 text-muted-foreground">Your foot-type classification, the AI’s confidence, and a look at the science behind the decision.</p></div><div className="mt-6 flex items-start gap-2 text-xs leading-5 text-muted-foreground"><Info className="mt-0.5 shrink-0" size={15}/><p>For educational and demonstration purposes. Not a medical diagnosis.</p></div></aside>
    </div>
    {result && <div ref={resultRef} className="mx-auto mt-9 max-w-5xl scroll-mt-6 fade-in"><section className="result-panel"><div className="grid md:grid-cols-[1fr_1.4fr]"><div className="bg-muted p-6"><img src={preview} alt="Analyzed foot image" className="h-72 w-full object-contain"/></div><div className="p-8 sm:p-10"><span className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-success"><CheckCircle2 size={16}/> Analysis complete</span><p className="mb-3 text-sm text-muted-foreground">Your Foot Type</p><h2 className="mb-7 flex items-center gap-4 text-4xl font-bold text-primary"><Footprints size={32}/>{FOOT_TYPES[result.decision.final_prediction]}</h2><div className="mb-6 flex items-center justify-between border-y border-border py-4"><span className="text-sm text-muted-foreground">AI Confidence</span><span className="rounded bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground">{result.decision.confidence}</span></div><p className="text-sm leading-6 text-muted-foreground">The hybrid ensemble classified the geometric features extracted from your image as <strong className="font-medium text-foreground">{FOOT_TYPES[result.decision.final_prediction].toLowerCase()}</strong>.</p></div></div><div className="flex items-start gap-3 border-t border-border bg-muted px-6 py-5 text-xs leading-6 text-muted-foreground"><Info className="mt-1 shrink-0" size={16}/><p>This result is an AI-based foot-type classification and is intended for educational and demonstration purposes.</p></div></section><div className="mt-5"><TechnicalDetails result={result}/></div><Button variant="outline" className="mt-5" onClick={() => { remove(); input.current?.click(); }}><RotateCcw/> Analyze Another Image</Button></div>}
    <details className="disclosure mx-auto mt-9 max-w-5xl"><summary>How FootFit-AI Works</summary><div className="px-6 pb-6"><HowItWorks compact/></div></details>
  </div></main>;
}