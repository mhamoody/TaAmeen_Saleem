import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu, X, UserRound } from 'lucide-react';
import Logo from './Logo.jsx';

const links = [['منتجات التأمين', '/#insurance'], ['كيف تعمل سليم؟', '/#how-it-works'], ['لماذا سليم؟', '/#why-saleem'], ['الأسئلة الشائعة', '/#faq']];

export default function Navbar({ onAccount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex h-21 items-center justify-between gap-4">
        <Logo onClick={() => setOpen(false)} />
        <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-7 lg:flex">
          {links.map(([name, href]) => <Link key={href} to={href} className="py-3 text-[13px] font-medium text-ink/80 hover:text-brand">{name}</Link>)}
        </nav>
        <div className="flex items-center gap-3 lg:gap-5">
          <button onClick={onAccount} className="hidden items-center gap-2 text-xs font-semibold text-muted hover:text-brand sm:flex"><UserRound size={17} />حسابي</button>
          <Link to="/#insurance" className="button-primary hidden sm:inline-flex">ابدأ من هنا <ArrowLeft size={17} /></Link>
          <button ref={toggle} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-xl border border-line lg:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {open && <nav id="mobile-menu" aria-label="قائمة الجوال" className="absolute inset-x-0 top-full border-b border-line bg-white p-5 shadow-lg lg:hidden">
        {links.map(([name, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm hover:bg-wash">{name}</Link>)}
        <button onClick={() => { setOpen(false); onAccount(); }} className="mt-3 flex w-full items-center gap-3 rounded-lg bg-wash px-4 py-3 text-sm text-brand"><UserRound size={18} />حسابي</button>
      </nav>}
    </header>
  );
}
