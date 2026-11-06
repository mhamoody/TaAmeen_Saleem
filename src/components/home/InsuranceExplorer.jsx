import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, BadgeCheck, Building2, Car, Check, CircleCheck, HandHeart, HeartPulse, House, Info, Plane, ShieldCheck, Ship, Sprout, Stethoscope, Truck, UserRound } from 'lucide-react';
import { insuranceProducts } from '../../data/insurance.js';
import { productVisuals } from '../../data/productVisuals.js';
import Modal from '../ui/Modal.jsx';

const icons = { Car, Truck, HeartPulse, Stethoscope, HandHeart, Plane, BadgeCheck, Sprout, Ship, House };
const filters = [{ id: 'all', label: 'جميع المنتجات', Icon: null }, { id: 'individual', label: 'للأفراد', Icon: UserRound }, { id: 'business', label: 'للأعمال', Icon: Building2 }];

function Choices({ label, options, selected, onSelect, name }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-xs font-semibold text-ink">{label}</legend>
      <div className={`grid gap-2 ${options.length === 1 ? 'grid-cols-1' : options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 min-[440px]:grid-cols-3'}`}>
        {options.map(option => <label key={option.id} className="relative min-w-0 cursor-pointer">
          <input type="radio" name={name} value={option.id} checked={selected.id === option.id} onChange={() => onSelect(option.id)} className="journey-radio sr-only" />
          <span className="choice-face flex h-full min-h-12 items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 text-[11px] font-medium leading-6 text-muted transition-colors hover:border-brand/40"><span className="choice-dot size-3.5 shrink-0 rounded-full border border-[#adbacb]" aria-hidden="true" />{option.label}</span>
        </label>)}
      </div>
    </fieldset>
  );
}

export default function InsuranceExplorer() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const product = insuranceProducts.find(item => item.id === params.get('product')) || insuranceProducts[0];
  const choice = product.choices.find(item => item.id === params.get('purpose')) || product.choices[0];
  const secondary = product.secondaryChoices?.find(item => item.id === params.get('option')) || product.secondaryChoices?.[0];
  // Direct links and browser back always expose their selected product, even after filtering.
  const visibleFilter = filter === 'all' || product.audience.includes(filter) ? filter : 'all';
  const visible = insuranceProducts.filter(item => visibleFilter === 'all' || item.audience.includes(visibleFilter));
  const ProductIcon = icons[product.icon];
  const productVisual = productVisuals[product.id];

  function selectProduct(id) { setParams({ product: id }, { preventScrollReset: true }); }
  function changeFilter(id) {
    setFilter(id);
    if (id !== 'all' && !product.audience.includes(id)) selectProduct(insuranceProducts.find(item => item.audience.includes(id)).id);
  }
  function selectChoice(key, id) {
    const next = new URLSearchParams(params);
    next.set('product', product.id);
    next.set(key, id);
    setParams(next, { preventScrollReset: true });
  }

  return (
    <section id="insurance" aria-labelledby="insurance-heading" className="scroll-mt-24 border-b border-line bg-white py-16 lg:py-21">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><p className="section-kicker mb-3">احتياجات مختلفة. وجهة واحدة.</p><h2 id="insurance-heading" className="text-[27px] font-bold leading-relaxed sm:text-[34px]">على ماذا تحب أن تطمئن؟</h2><p className="mt-2 text-sm leading-7 text-muted">اختر التأمين المناسب، وتعرّف على مسارك بخطوات واضحة.</p></div>
          <div role="group" aria-label="تصفية منتجات التأمين" className="flex w-fit max-w-full items-center gap-1 rounded-xl border border-line bg-[#f7f9fc] p-1">
            {filters.map(({ id, label, Icon }) => <button key={id} onClick={() => changeFilter(id)} aria-pressed={visibleFilter === id} className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors sm:px-4 ${visibleFilter === id ? 'bg-white text-brand shadow-sm ring-1 ring-line' : 'text-muted hover:text-brand'}`}>{Icon && <Icon size={14} aria-hidden="true" />}{label}</button>)}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5" role="group" aria-label="منتجات التأمين">
          {visible.map(item => {
            const Icon = icons[item.icon];
            const selected = product.id === item.id;
            const visual = productVisuals[item.id];
            return <button key={item.id} onClick={() => selectProduct(item.id)} aria-pressed={selected} aria-controls="insurance-start" className="product-card flex min-h-30 flex-col justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-start sm:p-5">
              <span className="flex w-full items-center justify-between"><span className="flex size-12 shrink-0 items-center justify-center rounded-full" style={{ color: visual.color, backgroundColor: visual.background }}><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></span>{selected ? <CircleCheck size={17} className="text-brand" aria-hidden="true" /> : <ArrowUpLeft size={17} className="text-[#9cadbf]" aria-hidden="true" />}</span>
              <span className={`text-xs font-semibold leading-6 ${selected ? 'text-brand' : 'text-ink'}`}>{item.title}</span>
            </button>;
          })}
        </div>

        <div id="insurance-start" className="mt-6 scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-[#fbfcff] lg:grid lg:grid-cols-[0.85fr_1.4fr]">
          <div className="relative overflow-hidden border-b border-line bg-[#f1f6ff] p-6 sm:p-8 lg:border-b-0 lg:border-e">
            <div className="flex items-center gap-2 text-xs font-semibold text-green"><span className="flex size-5 items-center justify-center rounded-full bg-green/10"><Check size={12} /></span>اخترت البداية المناسبة</div>
            <div className="mt-5 flex items-start gap-3"><ProductIcon size={28} strokeWidth={1.7} aria-hidden="true" className="mt-1 shrink-0" style={{ color: productVisual.color }} /><h3 className="text-xl font-bold leading-9">{product.title}</h3></div>
            <p className="mt-3 max-w-sm text-sm leading-8 text-muted">{product.description}</p>
            <p className="mt-5 flex items-center gap-2 text-[11px] leading-6 text-[#54708b]"><ShieldCheck size={16} className="shrink-0 text-green" />افهم التغطية أولاً، ثم قارن الخيارات.</p>
            <div className="brand-stripes absolute -bottom-7 -left-4 h-14 w-36 bg-[#e1eafe]" aria-hidden="true" />
          </div>
          <div className="p-5 sm:p-8">
            <div className="space-y-5">
              <Choices label={product.choiceLabel} options={product.choices} selected={choice} onSelect={id => selectChoice('purpose', id)} name={`${product.id}-purpose`} />
              {product.secondaryChoices && <Choices label={product.secondaryLabel} options={product.secondaryChoices} selected={secondary} onSelect={id => selectChoice('option', id)} name={`${product.id}-option`} />}
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
              <p className="max-w-65 text-[11px] leading-6 text-muted">تعرّف على الخطوات التالية قبل إدخال أي بيانات شخصية.</p>
              <button onClick={() => setOpen(true)} className="button-primary shrink-0">عرض مسار التأمين <ArrowLeft size={17} /></button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`مسارك إلى ${product.title}`} id="journey-title">
        <div className="mb-6 flex flex-wrap gap-2"><span className="rounded-full bg-wash px-3 py-1.5 text-xs font-medium text-brand">{choice.label}</span>{secondary && <span className="rounded-full bg-[#eaf6f0] px-3 py-1.5 text-xs font-medium text-green">{secondary.label}</span>}</div>
        <ol className="mb-7 space-y-0">
          {product.steps.map((step, index) => (
            <li key={step} aria-current={index === 0 ? 'step' : undefined} className="relative flex min-h-15 gap-4 pb-5 last:min-h-0 last:pb-0">
              <span className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-brand text-white' : 'border border-line bg-white text-muted'}`}>{index === 0 ? <Check size={15} /> : index + 1}</span>
              {index < product.steps.length - 1 && <span aria-hidden="true" className="absolute start-4 top-8 h-[calc(100%-32px)] w-px bg-line" />}
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium leading-7">{step}</p>
                {index === 0 && <span className="mt-1 inline-flex rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-medium leading-5 text-green">خطوتك الحالية</span>}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex gap-3 rounded-xl border border-line bg-[#f8fafc] p-4"><Info size={18} className="mt-1 shrink-0 text-brand" /><p className="text-xs leading-7 text-muted">هذا استعراض للمسار المقترح. التحقق من البيانات وعروض الأسعار والشراء غير متاحة في هذه النسخة. لم يتم إرسال طلب أو إصدار وثيقة.</p></div>
        <button onClick={() => setOpen(false)} className="button-secondary mt-6 w-full">العودة إلى الخيارات</button>
      </Modal>
    </section>
  );
}
