import { ArrowLeft, ArrowDownLeft, Check } from 'lucide-react';
import HeroCarousel from './HeroCarousel.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8faff] pb-9 pt-9 lg:pb-12 lg:pt-14" aria-labelledby="hero-heading">
      <div className="site-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="pb-2 pt-2 lg:py-6">
            <p className="section-kicker mb-5">لحياتك، ولأعمالك، ولما هو قادم</p>
            <h1 id="hero-heading" className="text-[39px] font-bold leading-[1.55] tracking-tight text-ink sm:text-[50px] xl:text-[60px]">حياتك تمضي.<br />وتأمينك <span className="relative inline-block text-brand">سليم.<svg aria-hidden="true" viewBox="0 0 180 14" className="absolute -bottom-1 right-0 h-3 w-full text-[#00a779]"><path d="M3 9Q80 0 176 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg></span></h1>
            <p className="mt-7 max-w-md text-[15px] leading-8 text-muted">من سيارتك وبيتك إلى عائلتك وأعمالك.<br className="hidden sm:block" /> اكتشف خيارات التأمين، واختر بداية تناسب ما يهمّك.</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#insurance" className="button-primary min-h-13 px-7">اكتشف تأمينك <ArrowLeft size={19} /></a>
              <a href="#how-it-works" className="flex min-h-12 items-center gap-2 text-sm font-semibold hover:text-brand">كيف تبدأ؟ <ArrowDownLeft size={17} className="text-green" /></a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
              <span className="flex items-center gap-1.5"><Check size={15} className="text-green" />للأفراد والمنشآت</span>
              <span className="flex items-center gap-1.5"><Check size={15} className="text-green" />خيارات واضحة من البداية</span>
            </div>
          </div>
          <HeroCarousel />
        </div>
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-[#e3eaf4] pt-6 text-center sm:mt-15">
          <span className="h-px w-8 bg-[#b6c5d9]" aria-hidden="true" /><p className="text-[11px] leading-6 text-muted sm:text-xs">سيارة، منزل، رحلة أو مشروع. <span className="font-semibold text-ink">لكل خطوة، بداية سليم.</span></p><span className="h-px w-8 bg-[#b6c5d9]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
