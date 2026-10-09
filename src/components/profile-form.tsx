import { ACTIVITIES, GENDERS, type Activity, type Gender } from '@/lib/recommendations';

export type ProfileDraft = { gender?: Gender; age: string; activity?: Activity; otherActivity: string };

function Choice({ name, value, label, checked, disabled, onChange }: { name: string; value: string; label: string; checked: boolean; disabled: boolean; onChange: () => void }) {
  return <label className={`choice-card ${checked ? 'choice-selected' : ''}`}>
    <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} className="sr-only"/>{label}
  </label>;
}

export function ProfileForm({ draft, setDraft, ageError, activityError, disabled }: { draft: ProfileDraft; setDraft: (d: ProfileDraft) => void; ageError: string | null; activityError: string; disabled: boolean }) {
  return <section aria-labelledby="profile-title" className="mt-7 border-t border-border pt-7 fade-in">
    <div className="mb-5 flex items-start justify-between gap-3"><div><h2 id="profile-title" className="text-base font-semibold">Tell us a little about yourself</h2><p className="mt-1 text-xs text-muted-foreground">These details help us personalize your footwear suggestions.</p></div><span className="shrink-0 rounded bg-accent px-2 py-1 text-xs text-primary">Step 02</span></div>
    <fieldset className="mb-5"><legend className="mb-2 text-sm font-medium">What is your gender?</legend>
      <div className="grid gap-2 sm:grid-cols-3">{GENDERS.map(g => <Choice key={g} name="gender" value={g} label={g} checked={draft.gender === g} disabled={disabled} onChange={() => setDraft({ ...draft, gender: g })}/>)}</div>
    </fieldset>
    <div className="mb-5"><label htmlFor="age" className="mb-2 block text-sm font-medium">What is your age? <span className="font-normal text-muted-foreground">(optional)</span></label>
      <input id="age" inputMode="numeric" value={draft.age} disabled={disabled} onChange={e => setDraft({ ...draft, age: e.target.value })} aria-invalid={!!ageError} aria-describedby={ageError ? 'age-error' : undefined} placeholder="e.g. 15" className="h-10 w-32 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/>
      {ageError && <p id="age-error" className="mt-1.5 text-xs text-destructive">{ageError}</p>}
    </div>
    <fieldset><legend className="mb-2 text-sm font-medium">What best describes your usual day?</legend>
      <div className="grid gap-2 sm:grid-cols-2">{(Object.keys(ACTIVITIES) as Activity[]).map(a => <Choice key={a} name="activity" value={a} label={ACTIVITIES[a]} checked={draft.activity === a} disabled={disabled} onChange={() => setDraft({ ...draft, activity: a })}/>)}</div>
      {draft.activity === 'other' && <input aria-label="Describe your usual activity (optional)" maxLength={60} value={draft.otherActivity} disabled={disabled} onChange={e => setDraft({ ...draft, otherActivity: e.target.value })} placeholder="Describe your usual activity (optional)" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/>}
      {activityError && <p className="mt-1.5 text-xs text-destructive">{activityError}</p>}
    </fieldset>
  </section>;
}
