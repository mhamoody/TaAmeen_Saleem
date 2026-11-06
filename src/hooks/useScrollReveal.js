import { useEffect, useRef } from 'react';

// Content stays visible by default. Motion is a one-time enhancement, so a
// missing browser API or a changed motion preference never hides the page.
export default function useScrollReveal() {
  const root = useRef(null);

  useEffect(() => {
    const container = root.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!container || motion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

    const animations = new Map();
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        observer.unobserve(target);
        if (motion.matches || target.contains(document.activeElement)) continue;
        const animation = target.animate(
          [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 550, delay: Math.min(Number(target.dataset.revealDelay) || 0, 200), easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
        );
        animations.set(target, animation);
        animation.onfinish = () => animations.delete(target);
      }
    }, { threshold: 0.12 });

    container.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

    function onFocus(event) {
      for (const [element, animation] of animations) {
        if (element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
        }
      }
    }

    function stopMotion() {
      if (!motion.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }

    container.addEventListener('focusin', onFocus);
    motion.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      container.removeEventListener('focusin', onFocus);
      motion.removeEventListener('change', stopMotion);
    };
  }, []);

  return root;
}
