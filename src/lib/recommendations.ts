import type { FootType } from '@/lib/footfit-api';

export const GENDERS = ['Male', 'Female', 'Prefer not to say'] as const;
export type Gender = (typeof GENDERS)[number];

export const ACTIVITIES = {
  sitting: 'Mostly sitting or studying',
  standing: 'Mostly standing',
  walking: 'Walking frequently',
  running: 'Running or jogging',
  sports: 'Playing sports',
  physical: 'Physical or outdoor work',
  other: 'Other',
} as const;
export type Activity = keyof typeof ACTIVITIES;

export type Profile = { gender?: Gender; age?: number; activity?: Activity; otherActivity?: string };

/** Age is optional. Returns an error message for invalid input, or null. */
export function validateAge(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (!/^\d+$/.test(v)) return 'Please enter your age as a whole number.';
  const n = Number(v);
  if (n < 1 || n > 120) return 'Please enter an age between 1 and 120.';
  return null;
}

export type Recommendation = { title: string; characteristics: string[]; why: string; fitTip: string };

const footBase: Record<FootType, { focus: string; characteristics: string[]; label: string }> = {
  Flat: { label: 'flat foot', focus: 'a secure fit and suitable stability', characteristics: ['Secure, snug midfoot fit', 'Stable, supportive midsole', 'Firm heel counter'] },
  Normal: { label: 'normal foot', focus: 'comfort and a well-matched fit', characteristics: ['Comfortable, balanced cushioning', 'Well-fitting upper', 'Flexible forefoot'] },
  HighArch: { label: 'high arch', focus: 'comfortable cushioning and a secure fit', characteristics: ['Generous cushioning', 'Secure heel hold', 'Enough room for the toes'] },
};

const activityRec: Record<Activity, { title: string; extra: string[]; why: string; fitTip: string }> = {
  sitting: { title: 'Comfortable everyday shoes', extra: ['Lightweight, breathable materials'], why: 'Most of your day is seated, so comfortable everyday footwear for walking between classes or tasks is usually enough.', fitTip: 'Try shoes on later in the day, when feet are slightly larger.' },
  standing: { title: 'All-day standing comfort', extra: ['Cushioned insole', 'Supportive, non-slip outsole'], why: 'Standing for long periods puts steady pressure on your feet, so comfort and cushioning matter.', fitTip: 'Leave about a thumb’s width of space in front of your longest toe.' },
  walking: { title: 'Walking shoes', extra: ['Smooth heel-to-toe rocker or flexible sole', 'Breathable upper'], why: 'Frequent walking benefits from shoes designed to roll smoothly with each step.', fitTip: 'Walk around the shop for a few minutes before deciding.' },
  running: { title: 'Running shoes', extra: ['Running-specific cushioning', 'Grippy, durable outsole'], why: 'Running repeats impact many times, so a shoe that fits well and feels comfortable while running is important.', fitTip: 'Wear your usual running socks when trying shoes on.' },
  sports: { title: 'Sport-specific footwear', extra: ['Designed for your sport and surface', 'Good lateral (side-to-side) support'], why: 'Different sports and surfaces need different grip and support, so choose shoes made for your sport.', fitTip: 'Check that your heel does not slip when you move side to side.' },
  physical: { title: 'Task-appropriate work footwear', extra: ['Durable, slip-resistant outsole', 'Meets any workplace safety requirements (e.g. protective toe)'], why: 'Physical or outdoor work needs durable footwear suited to the task and any safety rules at your workplace.', fitTip: 'Always follow your workplace’s safety footwear requirements.' },
  other: { title: 'Activity-matched footwear', extra: ['Suited to your main activity'], why: 'Choosing shoes designed for what you do most keeps them comfortable and practical.', fitTip: 'Try both shoes on and walk around before buying.' },
};

export function generateRecommendations(footType: FootType, activity: Activity | undefined, age?: number) {
  const base = footBase[footType];
  const act = activityRec[activity ?? 'other'];
  const actLabel = activity ? ACTIVITIES[activity].toLowerCase() : 'your usual day';
  const young = age !== undefined && age < 18;

  const recommendations: Recommendation[] = [
    { title: act.title, characteristics: [...base.characteristics.slice(0, 2), ...act.extra], why: `${act.why} With a ${base.label} classification, you may prefer shoes that offer ${base.focus}.`, fitTip: act.fitTip },
    { title: `Fit focus for a ${base.label}`, characteristics: base.characteristics, why: `People with a ${base.label} classification often find ${base.focus} comfortable for ${actLabel}. Everyone is different, so comfort is the best guide.`, fitTip: footType === 'HighArch' ? 'Press the toe area: your toes should be able to wiggle freely.' : footType === 'Flat' ? 'Check that the shoe holds your midfoot securely without pinching.' : 'Make sure the widest part of your foot matches the widest part of the shoe.' },
  ];

  const tips = [
    young ? 'Growing feet change size often — check your shoe size regularly.' : 'Feet can change over time — measure both feet when buying new shoes.',
    `Choose shoes made for ${activity && activity !== 'other' ? actLabel : 'what you do most'}.`,
    footType === 'Flat' ? 'Look for a shoe that feels stable and keeps your foot secure.' : footType === 'HighArch' ? 'Look for cushioning that feels comfortable and leaves room for your toes.' : 'Prioritize a comfortable, well-matched fit over looks.',
    activity === 'running' || activity === 'walking' || activity === 'standing' ? 'Replace shoes when the cushioning or sole looks worn.' : 'Check that your heel stays in place and your toes have room.',
    young ? 'If your feet hurt often, tell a parent, guardian, or teacher and get advice from a professional.' : 'If you have persistent foot pain, seek advice from a qualified professional.',
  ];

  return { recommendations, tips };
}
