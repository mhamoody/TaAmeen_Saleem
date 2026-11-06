import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroSlides } from '../../data/heroSlides.js';

export const HERO_ROTATION_MS = 4000;
export const HERO_CROSSFADE_MS = 400;

// Decode before displaying a new image, keeping the current photo visible while
// a slower connection loads it. Only the next image is prefetched.
const imageCache = new Map();
function loadImage(src) {
  if (imageCache.has(src)) return imageCache.get(src);
  const pending = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      image.decode().catch(() => {}).then(() => resolve(src));
    };
    image.onerror = () => reject(new Error('Could not load carousel image'));
    image.src = src;
  }).catch(error => { imageCache.delete(src); throw error; });
  imageCache.set(src, pending);
  return pending;
}

export default function HeroCarousel() {
  const region = useRef(null);
  const requestId = useRef(0);
  const requestedIndex = useRef(0);
  const mounted = useRef(false);
  const outgoingImage = useRef(null);
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [inView, setInView] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const slide = heroSlides[index];
  const previousSlide = previousIndex === null ? null : heroSlides[previousIndex];
  const SlideIcon = slide.Icon;
  const rotating = playing && !hovered && !focused && visible && inView;

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; requestId.current += 1; };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) {
        setPlaying(false);
        setPreviousIndex(null);
      }
    };
    const onVisibility = () => setVisible(!document.hidden);
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(region.current);
    return () => {
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (previousIndex === null) return;
    if (reducedMotion || !outgoingImage.current?.animate) {
      setPreviousIndex(null);
      return;
    }

    // Keep the decoded incoming photo opaque underneath the old photo. Fading
    // only the upper layer never exposes the frame background between images.
    let cancelled = false;
    const animation = outgoingImage.current.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: HERO_CROSSFADE_MS, easing: 'ease-in-out', fill: 'forwards' },
    );
    animation.finished.then(() => {
      if (!cancelled) setPreviousIndex(null);
    }).catch(() => {});
    return () => {
      cancelled = true;
      animation.cancel();
    };
  }, [index, previousIndex, reducedMotion]);

  const selectSlide = useCallback(async nextIndex => {
    const next = (nextIndex + heroSlides.length) % heroSlides.length;
    const ticket = ++requestId.current;
    requestedIndex.current = next;
    setLoadError(false);
    try {
      await loadImage(heroSlides[next].src);
      if (mounted.current && ticket === requestId.current && next !== index) {
        setPreviousIndex(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? null : index);
        setIndex(next);
      }
    } catch {
      if (mounted.current && ticket === requestId.current) {
        requestedIndex.current = index;
        setLoadError(true);
      }
    }
  }, [index]);

  const move = useCallback(delta => selectSlide(requestedIndex.current + delta), [selectSlide]);

  useEffect(() => {
    loadImage(heroSlides[(index + 1) % heroSlides.length].src).catch(() => {});
  }, [index]);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => move(1), HERO_ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, index, move]);

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? 1 : -1);
    }
  }

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="عرض شرائح"
      aria-label="صور مسارات التأمين"
      data-active-slide={slide.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={onKeyDown}
      className="relative isolate min-w-0"
    >
      <div className="relative">
        <div className="absolute -left-3 -top-3 -z-10 h-3/5 w-2/3 rounded-[28px] border border-[#d2e1fc] sm:-left-4 sm:-top-4" aria-hidden="true" />
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="الصورة التالية"
          aria-describedby="hero-slide-caption"
          className="relative block aspect-[1.25] w-full overflow-hidden rounded-[24px] bg-[#eaf0f7] text-start transition-[filter] duration-200 hover:brightness-[.98] active:brightness-95 motion-reduce:transition-none sm:aspect-[1.3] lg:aspect-[1.16]"
        >
          <img key={slide.id} src={slide.src} alt={slide.alt} width="1536" height="1024" fetchPriority={index === 0 ? 'high' : 'auto'} draggable="false" className="hero-photo h-full w-full object-cover" />
          {previousSlide && !reducedMotion && <img key={`outgoing-${previousSlide.id}`} ref={outgoingImage} src={previousSlide.src} alt="" aria-hidden="true" width="1536" height="1024" draggable="false" className="hero-photo pointer-events-none absolute inset-0 h-full w-full object-cover" />}
        </button>
        <div id="hero-slide-caption" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true" className="pointer-events-none absolute -bottom-5 right-4 left-4 flex min-h-20 items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_8px_32px_#163b6520] sm:right-6 sm:left-auto sm:max-w-[calc(100%-48px)] sm:min-w-65 sm:px-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e7f6f0]"><SlideIcon size={25} strokeWidth={1.6} className="text-green" aria-hidden="true" /></span>
          <div className="min-w-0"><p className="text-xs font-bold leading-6 sm:text-sm">{slide.title}</p><p className="mt-0.5 text-[11px] leading-5 text-muted">خطوتك الأولى، مع سليم <span aria-hidden="true" className="mx-1.5 text-[#cad5e3]">·</span><span dir="ltr" className="font-number">{String(index + 1).padStart(2, '0')} / {heroSlides.length}</span></p></div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -left-4 top-8 hidden size-14 items-center justify-center rounded-2xl border border-white bg-brand text-white shadow-lg sm:flex"><SlideIcon size={27} strokeWidth={1.5} /></div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-1 sm:flex-row sm:gap-2">
        <div role="group" aria-label="اختيار صورة التأمين" className="flex shrink-0 items-center">
          {heroSlides.map((item, dotIndex) => <button key={item.id} type="button" aria-label={`عرض ${item.title}`} aria-current={index === dotIndex ? 'true' : undefined} onClick={() => selectSlide(dotIndex)} className="flex h-11 w-6 items-center justify-center rounded-md"><span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${index === dotIndex ? 'w-5 bg-brand' : 'w-1.5 bg-[#bacbe2]'}`} /></button>)}
        </div>
        <div role="group" aria-label="التحكم في عرض الصور" className="flex shrink-0 items-center gap-1 rounded-full border border-[#dce6f3] bg-white p-1">
          <button type="button" onClick={() => move(-1)} aria-label="الشريحة السابقة" className="flex size-10 items-center justify-center rounded-full text-muted hover:bg-wash hover:text-brand"><ChevronRight size={19} /></button>
          <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'إيقاف التبديل التلقائي' : 'تشغيل التبديل التلقائي'} className="flex size-10 items-center justify-center rounded-full bg-wash text-brand">{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>
          <button type="button" onClick={() => move(1)} aria-label="الشريحة التالية" className="flex size-10 items-center justify-center rounded-full text-muted hover:bg-wash hover:text-brand"><ChevronLeft size={19} /></button>
        </div>
      </div>
      {loadError && <p role="status" className="mt-2 text-center text-xs leading-6 text-muted">تعذر تحميل الصورة التالية. حاول مرة أخرى.</p>}
    </div>
  );
}
