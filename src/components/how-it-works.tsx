import { ArrowRight, Camera, ScanLine, Shapes, Ruler, BrainCircuit, Combine, Check } from 'lucide-react';

export const features = ['Contour Area', 'Perimeter', 'Bounding Rectangle Width', 'Bounding Rectangle Height', 'Solidity', 'Extent', 'Aspect Ratio'];
export const models = ['Random Forest', 'Decision Tree', 'kNN', 'SVM', 'Logistic Regression'];
const stages = [
  { icon: Camera, title: 'Foot image', description: 'A clear image is sent to the AI service.' },
  { icon: ScanLine, title: 'Image processing', description: 'OpenCV prepares the image for analysis.' },
  { icon: Shapes, title: 'Contour detection', description: 'The outline of the foot is extracted.' },
  { icon: Ruler, title: '7 geometric features', description: 'Shape and proportions become measurable data.' },
  { icon: BrainCircuit, title: '5 AI models', description: 'Existing Orange3-trained models classify the features.' },
  { icon: Combine, title: 'Hybrid ensemble', description: 'A hybrid voting strategy selects the final result.' },
  { icon: Check, title: 'Final classification', description: 'Foot type and confidence are returned to you.' },
];

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return <div>
    <div className={compact ? 'grid gap-3 sm:grid-cols-2' : 'pipeline-grid'}>
      {stages.map(({ icon: Icon, title, description }, i) => <div key={title} className="pipeline-step">
        <div className="mb-5 flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-md bg-accent text-primary"><Icon size={21}/></span><span className="text-xs text-muted-foreground">0{i + 1}</span></div>
        <h3 className="mb-2 text-sm font-semibold">{title}</h3><p className="text-xs leading-5 text-muted-foreground">{description}</p>
        {!compact && i < stages.length - 1 && <ArrowRight className="pipeline-arrow" size={14}/>}
      </div>)}
    </div>
    <div className="mt-8 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
      <div><h3 className="mb-3 text-sm font-semibold">The seven geometric features</h3><div className="flex flex-wrap gap-2">{features.map(f => <span key={f} className="rounded border border-border px-2.5 py-1.5 text-xs text-muted-foreground">{f}</span>)}</div></div>
      <div><h3 className="mb-3 text-sm font-semibold">The five existing models</h3><div className="flex flex-wrap gap-2">{models.map(m => <span key={m} className="rounded border border-border px-2.5 py-1.5 text-xs text-muted-foreground">{m}</span>)}</div></div>
    </div>
  </div>;
}