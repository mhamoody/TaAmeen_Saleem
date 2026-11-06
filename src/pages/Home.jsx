import Hero from '../components/home/Hero.jsx';
import InsuranceExplorer from '../components/home/InsuranceExplorer.jsx';
import { Faq, HowItWorks, WhySaleem } from '../components/home/InformationSections.jsx';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      <InsuranceExplorer />
      <HowItWorks />
      <WhySaleem />
      <Faq />
      <section className="site-container pb-20" aria-label="ابدأ رحلتك">
        <div className="relative isolate flex flex-col items-start justify-between gap-7 overflow-hidden rounded-3xl bg-brand px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:py-12">
          <div aria-hidden="true" className="brand-stripes absolute -left-12 -top-10 -z-10 flex w-64 flex-col gap-6 opacity-10"><span className="h-12 bg-white" /><span className="h-12 bg-white" /><span className="h-12 bg-white" /></div>
          <div><h2 className="text-2xl font-bold leading-10 sm:text-3xl">كل رحلة مطمئنة، تبدأ باختيار سليم.</h2><p className="mt-3 text-sm leading-7 text-blue-100">خذ خطوتك الأولى. اكتشف التأمين الذي يناسب احتياجك.</p></div>
          <a href="#insurance" className="inline-flex min-h-13 shrink-0 items-center gap-4 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand hover:bg-blue-50">استكشف المسارات <ArrowLeft size={18} /></a>
        </div>
      </section>
    </>
  );
}
