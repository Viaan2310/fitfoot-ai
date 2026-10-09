import { BrainCircuit, Lightbulb, Footprints, User } from 'lucide-react';
import { FOOT_TYPES, type AnalysisResult } from '@/lib/footfit-api';
import { ACTIVITIES, generateRecommendations, type Profile } from '@/lib/recommendations';
import { ShoeProducts } from '@/components/shoe-products';

export function FootwearProfile({ result, profile }: { result: AnalysisResult; profile: Profile }) {
  const footType = result.decision.final_prediction;
  const { recommendations, tips } = generateRecommendations(footType, profile.activity, profile.age);
  const activity = profile.activity ? (profile.activity === 'other' && profile.otherActivity ? `Other: ${profile.otherActivity}` : ACTIVITIES[profile.activity]) : 'Not provided';
  return <div className="mt-5 space-y-5">
    <section className="rounded-lg border border-border bg-background p-6 sm:p-8">
      <h2 className="mb-5 text-lg font-semibold">Your personalized footwear profile</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-accent p-4"><p className="mb-2 flex items-center gap-2 text-xs font-medium text-primary"><BrainCircuit size={14}/> From the AI model</p><p className="text-sm text-muted-foreground">Foot type</p><p className="font-semibold">{FOOT_TYPES[footType]} <span className="text-xs font-normal text-muted-foreground">· {String(result.decision.confidence)} confidence</span></p></div>
        <div className="rounded-md bg-muted p-4"><p className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground"><User size={14}/> Provided by you</p><dl className="space-y-1 text-sm"><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Age</dt><dd>{profile.age ?? 'Not provided'}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Gender</dt><dd>{profile.gender ?? 'Not provided'}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Usual day</dt><dd className="text-right">{activity}</dd></div></dl></div>
      </div>
    </section>
    <section aria-labelledby="recs-title"><h2 id="recs-title" className="mb-1 text-lg font-semibold">Shoe recommendations</h2><p className="mb-4 text-xs text-muted-foreground">Created by simple, transparent rules from your AI result and answers — not by the trained AI models.</p>
      <div className="grid gap-4 md:grid-cols-2">{recommendations.map(r => <article key={r.title} className="rounded-lg border border-border bg-background p-6"><h3 className="mb-3 flex items-center gap-2 font-semibold"><Footprints size={18} className="text-primary"/>{r.title}</h3><ul className="mb-3 flex flex-wrap gap-2">{r.characteristics.map(c => <li key={c} className="rounded border border-border px-2.5 py-1 text-xs text-muted-foreground">{c}</li>)}</ul><p className="mb-3 text-sm leading-6 text-muted-foreground">{r.why}</p><p className="text-xs text-foreground"><strong className="font-medium">Fitting tip:</strong> {r.fitTip}</p></article>)}</div>
    </section>
    <ShoeProducts footType={footType} activity={profile.activity}/>
    <section className="rounded-lg border border-border bg-background p-6"><h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Lightbulb size={18} className="text-primary"/> Personalized tips</h2><ul className="space-y-2">{tips.map(t => <li key={t} className="text-sm leading-6 text-muted-foreground">• {t}</li>)}</ul></section>
    <p className="text-xs leading-5 text-muted-foreground">FootFit-AI provides an educational image-based foot-type classification and general footwear suggestions. It is not a medical diagnosis or a substitute for professional assessment.</p>
  </div>;
}
