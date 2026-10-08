import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Footprints, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="page-width flex h-20 items-center justify-between gap-5">
    <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}><span className="brand-icon"><Footprints size={22}/></span><span className="text-xl font-bold">FootFit<span className="text-primary">-AI</span></span></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex"><Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'nav-active' }} className="nav-link">Home</Link><Link to="/analyze" activeProps={{ className: 'nav-active' }} className="nav-link">Foot Analysis</Link><Link to="/how-it-works" activeProps={{ className: 'nav-active' }} className="nav-link">How It Works</Link></nav>
    <Button asChild className="hidden h-10 md:inline-flex"><Link to="/analyze">Start Analysis <ArrowUpRight/></Link></Button>
    <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
  </div>{open && <nav aria-label="Mobile navigation" className="page-width flex flex-col gap-4 border-t border-border py-5">{([{ to: '/', label: 'Home' }, { to: '/analyze', label: 'Foot Analysis' }, { to: '/how-it-works', label: 'How It Works' }] as const).map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="nav-link">{item.label}</Link>)}</nav>}</header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border"><div className="page-width flex flex-col justify-between gap-4 py-7 text-xs text-muted-foreground sm:flex-row"><span className="flex items-center gap-2 font-medium text-foreground"><Footprints size={16}/> FootFit-AI <span className="ml-3 font-normal text-muted-foreground">Science Expo Project</span></span><span>For education and demonstration. Not a medical diagnosis.</span></div></footer>;
}