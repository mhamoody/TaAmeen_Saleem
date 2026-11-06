import { Link } from 'react-router-dom';
import { ArrowUpLeft, ArrowUp, HeartHandshake } from 'lucide-react';
import { insuranceProducts } from '../data/insurance.js';
import Logo from './Logo.jsx';

export default function Footer({ onInfo }) {
  return (
    <footer className="border-t border-line bg-[#fafcff]">
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-8 text-muted">اختيار التأمين يبدأ بفهم احتياجك.<br />مع سليم، البداية أوضح.</p>
          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-green"><HeartHandshake size={18} />للأفراد والأعمال في المملكة</div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold">مسارات التأمين</h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
            {insuranceProducts.map(product => <li key={product.id}><Link to={`/?product=${product.id}#insurance`} className="text-xs leading-7 text-muted hover:text-brand hover:underline">{product.shortTitle}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold">كل ما يساعدك</h2>
          <div className="flex flex-col items-start gap-4 text-xs text-muted">
            <Link to="/#how-it-works" className="hover:text-brand">كيف تبدأ رحلتك؟</Link>
            <Link to="/#faq" className="hover:text-brand">الأسئلة الشائعة</Link>
            <button onClick={() => onInfo('help')} className="flex items-center gap-2 hover:text-brand">المساعدة والتواصل <ArrowUpLeft size={14} /></button>
            <button onClick={() => onInfo('privacy')} className="hover:text-brand">الخصوصية والشروط</button>
          </div>
        </div>
      </div>
      <div className="site-container">
        <div className="flex flex-col justify-between gap-4 border-t border-line py-6 text-[11px] leading-6 text-muted sm:flex-row sm:items-center">
          <p>سليم · تصور لواجهة المنصة، دون عروض أسعار أو إصدار وثائق.</p>
          <a href="#top" className="inline-flex items-center gap-2 self-start hover:text-brand">العودة إلى الأعلى <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
