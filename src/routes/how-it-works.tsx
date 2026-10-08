import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Info } from 'lucide-react';
import { HowItWorks } from '@/components/how-it-works';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/how-it-works')({
  head: () => ({ meta: [
    { title: 'How FootFit-AI Works — The Science' }, { name: 'description', content: 'Explore the seven geometric features, five trained AI models, and hybrid voting behind FootFit-AI.' },
    { property: 'og:title', content: 'How FootFit-AI Works — The Science' }, { property: 'og:description', content: 'From foot contour detection to a hybrid ensemble classification: explore the pipeline.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: SciencePage,
});
function SciencePage() {
  return <main className="page-width min-h-[75vh] py-14 fade-in"><span className="eyebrow mb-4">Behind the analysis</span><h1 className="section-title mb-4">How FootFit-AI Works</h1><p className="mb-12 max-w-2xl text-sm leading-7 text-muted-foreground">From a single foot image to a collective AI decision. The existing analysis service processes the image, measures its geometry, and combines five model predictions.</p><HowItWorks/><section className="my-12 border-t border-border pt-8"><h2 className="mb-4 text-xl font-semibold">One result, informed by five models.</h2><p className="max-w-3xl text-sm leading-7 text-muted-foreground">The service uses existing Orange3-trained Random Forest, Decision Tree, kNN, SVM, and Logistic Regression models. A hybrid voting strategy combines their predictions to select the final classification and confidence. FootFit-AI displays that decision without changing it.</p></section><div className="mb-8 flex items-start gap-3 rounded-md bg-secondary p-5 text-sm leading-6 text-secondary-foreground"><Info className="mt-1 shrink-0" size={18}/><p>This result is an AI-based foot-type classification and is intended for educational and demonstration purposes. It is not a medical diagnosis.</p></div><Button asChild className="h-11"><Link to="/analyze">Analyze Your Foot <ArrowUpRight/></Link></Button></main>;
}