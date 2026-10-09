import { useState } from 'react';
import { ExternalLink, SlidersHorizontal, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FootType } from '@/lib/footfit-api';
import type { Activity } from '@/lib/recommendations';
import { CATALOGUE, LAST_CHECKED, filterShoes, formatINR, type ShoeFilters } from '@/lib/shoe-catalogue';

const BUDGETS = [2500, 5000, 7000, 10000] as const;

export function ShoeProducts({ footType, activity }: { footType: FootType; activity: Activity | undefined }) {
  const [filters, setFilters] = useState<ShoeFilters>({});
  const shoes = filterShoes(footType, activity, filters);
  const active = filters.budget !== undefined || !!filters.width || !!filters.size;
  return <section aria-labelledby="shoes-title" className="rounded-lg border border-border bg-background p-6 sm:p-8">
    <h2 id="shoes-title" className="mb-1 flex items-center gap-2 text-lg font-semibold"><ShoppingBag size={18} className="text-primary"/> Recommended Shoes for You</h2>
    <p className="mb-5 text-xs text-muted-foreground">Real products matched to your AI result and activity by simple rules — not by the trained models. Prices were last checked on {LAST_CHECKED}; please verify the current price on the retailer’s page.</p>
    <div className="mb-5 flex flex-wrap items-center gap-3 rounded-md bg-muted p-4">
      <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><SlidersHorizontal size={14}/> Filters</span>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">Budget
        <select className="rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground" value={filters.budget ?? ''} onChange={e => setFilters(f => ({ ...f, budget: e.target.value ? Number(e.target.value) : undefined }))}>
          <option value="">Any</option>
          {BUDGETS.map(b => <option key={b} value={b}>Up to {formatINR(b)}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">Shoe size (UK)
        <input inputMode="numeric" placeholder="e.g. 8" className="w-16 rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground" value={filters.size ?? ''} onChange={e => setFilters(f => ({ ...f, size: e.target.value.replace(/[^\d.]/g, '') }))}/>
      </label>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">Width
        <select className="rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground" value={filters.width ?? ''} onChange={e => setFilters(f => ({ ...f, width: e.target.value as ShoeFilters['width'] }))}>
          <option value="">Any</option><option>Narrow</option><option>Regular</option><option>Wide</option>
        </select>
      </label>
      {active && <Button variant="ghost" size="sm" onClick={() => setFilters({})}><X/> Clear filters</Button>}
    </div>
    {shoes.length === 0 ? <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">No verified products match these filters. Clear the filters to see all {CATALOGUE.length} verified products.</p> : <>
      {shoes.length < 3 && <p className="mb-4 text-xs text-muted-foreground">Only {shoes.length} verified product{shoes.length === 1 ? '' : 's'} match — we show just what we could verify rather than pad the list.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{shoes.map(p => <article key={p.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-background">
        <div className="bg-muted p-4"><img src={p.image} alt={`${p.brand} ${p.model}`} className="h-40 w-full object-contain" loading="lazy"/></div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-medium text-primary">{p.brand}</p>
          <h3 className="mb-2 font-semibold">{p.model}</h3>
          <p className="mb-3 text-sm"><span className="font-semibold">{formatINR(p.price)}</span>{p.mrp !== undefined && p.mrp > p.price && <> <s className="text-xs text-muted-foreground">{formatINR(p.mrp)}</s> <span className="text-xs font-medium text-success">{Math.round((1 - p.price / p.mrp) * 100)}% off</span></>}</p>
          <p className="mb-3 text-xs leading-5 text-muted-foreground">{p.match[footType] || 'A comfortable, well-reviewed option for your activity.'}</p>
          <p className="mb-4 text-xs text-muted-foreground">{p.width ? `Verified width: ${p.width} · ` : ''}Sizes and availability: check the retailer’s page.</p>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">View Product <ExternalLink size={14}/></a>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">at {p.retailer}</p>
        </div>
      </article>)}</div>
    </>}
  </section>;
}
