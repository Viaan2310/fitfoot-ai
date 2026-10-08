import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, BrainCircuit, ScanLine, ShieldCheck, Sparkles, Camera, Combine, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import scanner from '@/assets/foot-scanner.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'FootFit-AI — Foot Analysis Through Science' },
    { name: 'description', content: 'Explore computer vision and machine learning with FootFit-AI, an educational foot-type classification project.' },
    { property: 'og:title', content: 'FootFit-AI — Foot Analysis Through Science' },
    { property: 'og:description', content: 'One foot image. Computer vision, five AI models, and a real ensemble classification.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});

function Index() {
  return <main>
    <section className="home-hero">
      <img src={scanner} alt="A foot on an illuminated glass analysis platform" width={1536} height={1024} className="hero-image"/>
      <div className="page-width hero-content fade-in">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-3 py-1.5 text-xs font-medium text-primary"><Sparkles size={13}/> Where science meets every step</div>
        <h1 className="mb-5">FootFit<span className="text-primary">-AI</span></h1>
        <p className="mb-4 text-2xl font-medium leading-snug">A closer look at<br/>the way you stand.</p>
        <p className="mb-8 text-sm leading-7 text-muted-foreground">Discover your foot type through computer vision and machine learning. One image. Five AI models. A smarter understanding of your feet.</p>
        <div className="flex flex-wrap gap-3"><Button asChild className="h-12 px-6"><Link to="/analyze">Analyze Your Foot <ArrowUpRight/></Link></Button><Button asChild variant="outline" className="h-12 border-border bg-background/70 px-5"><Link to="/how-it-works">Explore the Science <ArrowRight/></Link></Button></div>
        <div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-success"/> Educational AI · Not a medical diagnosis</div>
      </div>
    </section>
    <div className="border-b border-border bg-background"><div className="page-width grid grid-cols-1 gap-5 py-6 text-xs font-medium text-muted-foreground sm:grid-cols-3"><span className="flex items-center justify-center gap-2"><ScanLine size={17} className="text-primary"/> Computer vision powered</span><span className="flex items-center justify-center gap-2"><BrainCircuit size={17} className="text-primary"/> 5-model hybrid ensemble</span><span className="flex items-center justify-center gap-2"><Footprints size={17} className="text-primary"/> Built for scientific exploration</span></div></div>
    <section className="page-width py-16">
      <div className="mb-9 text-center"><span className="eyebrow mb-3">From image to insight</span><h2 className="section-title mb-3">Your foot. A little science. A new perspective.</h2><p className="text-sm text-muted-foreground">A simple experience, backed by a thoughtful analysis pipeline.</p></div>
      <div className="grid gap-5 md:grid-cols-3">{[
        { icon: Camera, n: '01', title: 'Upload a foot image', text: 'Choose a clear image of your foot. Preview it before sending it for analysis.' },
        { icon: Combine, n: '02', title: 'Let the science work', text: 'Computer vision extracts seven geometric features. Five trained models contribute to a hybrid decision.' },
        { icon: Footprints, n: '03', title: 'Discover your foot type', text: 'View your classification and AI confidence, with the science available when you want to go deeper.' },
      ].map(({ icon: Icon, n, title, text }) => <article key={n} className="feature-card"><div className="mb-6 flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-md bg-accent text-primary"><Icon size={21}/></span><span className="text-xs text-muted-foreground">{n}</span></div><h3 className="mb-3 text-base font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
    </section>
    <section className="border-y border-border bg-muted"><div className="page-width flex flex-col items-start justify-between gap-7 py-12 sm:flex-row sm:items-center"><div><span className="eyebrow mb-3">The science behind the step</span><h2 className="text-2xl font-semibold">Not just one model. A collective decision.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Random Forest, Decision Tree, kNN, SVM, and Logistic Regression work together through hybrid voting.</p></div><Button asChild variant="outline" className="h-11"><Link to="/how-it-works">How FootFit-AI Works <ArrowRight/></Link></Button></div></section>
    <section className="page-width py-14 text-center"><span className="eyebrow mb-3">Science Expo Project</span><h2 className="section-title mb-4">Take the first step.</h2><Button asChild className="h-11 px-6"><Link to="/analyze">Analyze Your Foot <ArrowUpRight/></Link></Button></section>
  </main>;
}
