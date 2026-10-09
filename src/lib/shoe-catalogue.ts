import type { FootType } from '@/lib/footfit-api';
import type { Activity } from '@/lib/recommendations';

/**
 * Maintainable catalogue of verified real products.
 * Prices are catalogue prices checked by hand on LAST_CHECKED — they are NOT live.
 * Only include a product when its name, price, image and product-page link were
 * verified on the retailer's own page. Add width/sizes only when verified.
 */
export const LAST_CHECKED = '9 October 2026';

export type ShoeProduct = {
  id: string;
  brand: string;
  model: string;
  price: number; // ₹, last-checked catalogue price
  mrp?: number; // verified MRP, when shown on the retailer's page
  retailer: string;
  url: string; // exact product page
  image: string; // product image served by the retailer
  footTypes: FootType[]; // classifications this shoe suits
  activities: Activity[]; // activities this shoe suits
  width?: 'Narrow' | 'Regular' | 'Wide'; // only when verified
  match: Record<FootType, string>; // why it suits each classification
};

export const CATALOGUE: ShoeProduct[] = [
  {
    id: 'asics-gel-contend-9',
    brand: 'ASICS',
    model: 'Gel-Contend 9',
    price: 2279,
    mrp: 5999,
    retailer: 'Flipkart',
    url: 'https://www.flipkart.com/asics-gel-contend-9-running-shoes-men/p/itm34ff83f9bce0c',
    image: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/shoe/o/i/2/-original-imahrrjthcz78yyb.jpeg',
    footTypes: ['HighArch', 'Normal'],
    activities: ['running', 'walking', 'sports', 'standing'],
    match: {
      HighArch: 'GEL cushioning in the midsole gives the soft, comfortable landing a high-arch foot often prefers.',
      Normal: 'A balanced, cushioned everyday running shoe that suits a normal foot well.',
      Flat: '',
    },
  },
  {
    id: 'adidas-duramo-sl',
    brand: 'Adidas',
    model: 'Duramo SL',
    price: 2274,
    mrp: 6999,
    retailer: 'Flipkart',
    url: 'https://www.flipkart.com/adidas-duramo-sl-m-running-shoes-men/p/itmb5d0fd5cda5c4',
    image: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/shoe/c/g/4/-watermarked-original-imahgcs8uhyb8pjj.jpeg',
    footTypes: ['Normal', 'HighArch', 'Flat'],
    activities: ['walking', 'running', 'sitting', 'standing', 'sports', 'other'],
    match: {
      Normal: 'A light, comfortable all-rounder for everyday wear, walking and easy runs.',
      HighArch: 'Soft midsole cushioning keeps each step comfortable for a high-arch foot.',
      Flat: 'A comfortable everyday option; check that the midfoot feels secure when you try it.',
    },
  },
  {
    id: 'puma-viz-runner-2',
    brand: 'PUMA',
    model: 'Viz Runner 2',
    price: 5999,
    retailer: 'PUMA India (official store)',
    url: 'https://in.puma.com/in/en/pd/viz-runner-2-mens-running-shoes/310383',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/310383/03/sv01/fnd/IND/fmt/png/Viz-Runner-2-Men%27s-Running-Shoes',
    footTypes: ['HighArch', 'Normal'],
    activities: ['running', 'sports', 'walking'],
    width: 'Regular',
    match: {
      HighArch: 'Responsive cushioning and a secure lace-up fit suit a high-arch foot on runs.',
      Normal: 'A breathable, cushioned road-running shoe for neutral runners.',
      Flat: '',
    },
  },
  {
    id: 'asics-gt-1000-14',
    brand: 'ASICS',
    model: 'GT-1000 14',
    price: 9024,
    mrp: 9999,
    retailer: 'Flipkart',
    url: 'https://www.flipkart.com/asics-gt-1000-14-running-shoes-men/p/itm65ffc622ce9fa',
    image: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/shoe/4/o/w/-original-imahh6w8g3h2kbxx.jpeg',
    footTypes: ['Flat'],
    activities: ['running', 'walking', 'standing'],
    match: {
      Flat: 'A stability running shoe designed for extra support — the kind of secure, stable feel often preferred with a flat-foot classification.',
      Normal: '',
      HighArch: '',
    },
  },
];

export type ShoeFilters = { budget?: number | undefined; size?: string | undefined; width?: '' | 'Narrow' | 'Regular' | 'Wide' };

/**
 * Rank and filter the catalogue for a user. Products matching the AI foot-type
 * classification come first, then activity matches. Budget hides products above
 * it; width/size only hide a product when that attribute was verified and
 * differs — unverified attributes never exclude a product.
 */
export function filterShoes(footType: FootType, activity: Activity | undefined, filters: ShoeFilters): ShoeProduct[] {
  const ranked = [...CATALOGUE].sort((a, b) => score(b, footType, activity) - score(a, footType, activity));
  return ranked.filter(p => {
    if (filters.budget !== undefined && p.price > filters.budget) return false;
    if (filters.width && p.width !== undefined && p.width !== filters.width) return false;
    return true;
  });
}

function score(p: ShoeProduct, footType: FootType, activity: Activity | undefined): number {
  let s = 0;
  if (p.footTypes.includes(footType)) s += 2;
  if (activity && p.activities.includes(activity)) s += 1;
  return s;
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}
