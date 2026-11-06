import { ArrowLeft, Check, Layers3, Plus, Route, SlidersHorizontal } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'ابدأ بما تحتاجه',
    description: 'اختر مسار التأمين المناسب لك أو لمنشأتك، وحدد الغرض من التغطية.',
    Icon: Route,
    iconClassName: 'bg-[#e9f0ff] text-[#064bdb]',
    badgeClassName: 'bg-[#064bdb]',
  },
  {
    number: '02',
    title: 'افهم خياراتك',
    description: 'تعرّف على نوع التغطية والمزايا والاستثناءات قبل النظر إلى السعر.',
    Icon: SlidersHorizontal,
    iconClassName: 'bg-[#e5f5f5] text-[#147c87]',
    badgeClassName: 'bg-[#147c87]',
  },
  {
    number: '03',
    title: 'أكمل وأنت مطمئن',
    description: 'راجع المعلومات والمتطلبات، لتكون خطوتك التالية مبنية على اختيار واضح.',
    Icon: Check,
    iconClassName: 'bg-[#e8f6ef] text-[#008a63]',
    badgeClassName: 'bg-[#008a63]',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-28 border-b border-[#e2e9f2] bg-[#f5f8ff] py-16 lg:py-20">
      <div className="site-container">
        <div data-reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-[#064bdb]">
              <span aria-hidden="true" className="h-px w-8 bg-[#064bdb]" />
              رحلة واضحة من البداية
            </p>
            <h2 id="how-heading" className="text-3xl font-bold leading-relaxed text-[#142b46] lg:text-4xl">خطوتك الأولى، بكل بساطة.</h2>
          </div>
          <p className="max-w-sm text-sm leading-8 text-[#627086]">من معرفة ما تحتاجه إلى فهم ما تختاره.<br className="hidden md:block" /> تأمين يبدأ بك، وبما يهمك.</p>
        </div>

        <ol className="mt-9 grid gap-4 md:grid-cols-3 md:gap-8">
          {steps.map(({ number, title, description, Icon, iconClassName, badgeClassName }, index) => (
            <li key={number} data-reveal data-reveal-delay={index * 85} className="journey-card relative rounded-2xl border border-[#e2e9f2] bg-white p-6 shadow-[0_3px_14px_#163b6504] md:p-7">
              <div className={`journey-icon relative mb-6 flex size-16 items-center justify-center rounded-full ${iconClassName}`}>
                <Icon aria-hidden="true" size={30} strokeWidth={1.6} />
                <span dir="ltr" className={`absolute -bottom-1 -end-1 flex size-7 items-center justify-center rounded-full border-[3px] border-white font-number text-[10px] font-bold text-white ${badgeClassName}`}>{number}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#142b46]">{title}</h3>
              <p className="max-w-xs text-sm leading-7 text-[#627086]">{description}</p>
              {index < steps.length - 1 && <span aria-hidden="true" className="absolute -end-8 top-[60px] z-10 hidden w-8 items-center text-[#9fb8d8] md:flex"><span className="flex-1 border-t-2 border-dotted border-current" /><ArrowLeft size={12} strokeWidth={1.6} className="shrink-0" /></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const benefits = [
  { title: 'الوضوح أولاً', description: 'مسارات مرتبة بلغة بسيطة، لتعرف من أين تبدأ وما الذي تحتاجه.' },
  { title: 'لك، ولأعمالك', description: 'احتياجات الأفراد والمنشآت في مكان واحد، مع مدخل واضح لكل منتج.' },
  { title: 'التغطية قبل السعر', description: 'الاختيار المناسب يبدأ بفهم المنافع وحدود التغطية والاستثناءات.' },
];

export function WhySaleem() {
  return (
    <section id="why-saleem" aria-labelledby="why-heading" className="scroll-mt-28 bg-[#f1f6ff] py-20 lg:py-24">
      <div className="site-container grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div data-reveal>
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-[#064bdb]">
            <span aria-hidden="true" className="h-px w-8 bg-[#064bdb]" />
            لماذا سليم؟
          </p>
          <h2 id="why-heading" className="text-3xl font-bold leading-[1.6] text-[#142b46] lg:text-4xl">خيارات كثيرة.<br />وبداية <span className="text-[#064bdb]">واضحة.</span></h2>
          <p className="mt-5 max-w-sm text-sm leading-8 text-[#627086]">لكل مرحلة في حياتك احتياج مختلف. نرتّب لك خيارات التأمين لتبدأ من المكان المناسب، دون أن تضيع بين التفاصيل.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#dbe5f5] bg-white/70 px-4 py-2.5 text-xs font-medium text-[#142b46]">
            <Layers3 aria-hidden="true" size={17} strokeWidth={1.5} className="text-[#009c73]" />
            احتياجاتك هي نقطة البداية
          </div>
        </div>
        <ul className="divide-y divide-[#dce5f2] border-y border-[#dce5f2]">
          {benefits.map(({ title, description }, index) => (
            <li key={title} data-reveal data-reveal-delay={index * 70} className="flex gap-5 py-7 first:pt-6 last:pb-6">
              <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#009c73]/10 text-xs font-semibold text-[#009c73]">{index + 1}</span>
              <div>
                <h3 className="text-lg font-bold text-[#142b46]">{title}</h3>
                <p className="mt-2 text-sm leading-8 text-[#627086]">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const questions = [
  {
    question: 'ما دور سليم في رحلة التأمين؟',
    answer: 'سليم منصة وساطة ومقارنة تأمين. دورها تنظيم رحلة الاختيار والمقارنة ومتابعة الوثيقة، بينما تتولى شركة التأمين إصدار الوثيقة وتسوية المطالبات وفق شروطها.',
  },
  {
    question: 'من أين أبدأ تأمين مركبتي؟',
    answer: 'اختر تأمين المركبات للأفراد، ثم حدد الغرض: إصدار أو تجديد، نقل ملكية، أو بطاقة جمركية. ويمكنك التعرف على أنواع التغطية قبل متابعة الخطوات.',
  },
  {
    question: 'هل المسارات مخصصة للأفراد فقط؟',
    answer: 'تشمل الصفحة احتياجات الأفراد والمنشآت، ومنها أسطول المركبات والتأمين الطبي للشركات ونقل البضائع. استخدم تصنيف المنتجات للوصول إلى المسار المناسب.',
  },
  {
    question: 'هل التأمين الصحي والتعاقدي للعمالة المنزلية مسار واحد؟',
    answer: 'هما خياران مختلفان داخل قسم العمالة المنزلية. الصحي يتعلق بالرعاية الطبية، والتعاقدي يتعلق بمخاطر العلاقة التعاقدية. تختلف المنافع والاستثناءات بحسب الوثيقة.',
  },
  {
    question: 'هل يمكنني الحصول على عرض سعر أو شراء وثيقة الآن؟',
    answer: 'هذه نسخة لاستعراض تجربة سليم ومسارات التأمين. لا تتوفر فيها عروض أسعار فعلية أو خدمات دفع وإصدار وثائق حالياً.',
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 bg-white py-20 lg:py-24">
      <div className="site-container grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-[#064bdb]">
            <span aria-hidden="true" className="h-px w-8 bg-[#064bdb]" />
            إجابات تساعدك
          </p>
          <h2 id="faq-heading" className="text-3xl font-bold leading-relaxed text-[#142b46] lg:text-4xl">قد تتساءل…</h2>
          <p className="mt-4 max-w-xs text-sm leading-8 text-[#627086]">تعرف على سليم، واختر بداية تناسبك.</p>
        </div>
        <div data-reveal data-reveal-delay="90" className="border-t border-[#e2e9f2]">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group border-b border-[#e2e9f2]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 rounded-sm py-6 text-sm font-semibold leading-7 text-[#142b46] transition-colors hover:text-[#064bdb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#064bdb] [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <Plus aria-hidden="true" size={18} className="mt-1 shrink-0 text-[#064bdb] transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-xl pb-6 pe-8 text-sm leading-8 text-[#627086]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
