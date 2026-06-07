/**
 * Scroll-reveal IntersectionObserver utility.
 *
 * Observes elements with `.reveal` and `.reveal-image` classes.
 * When an element enters the viewport, toggles `--visible` to trigger
 * the CSS transitions defined in `theme.css`.
 *
 * Usage — drop into any page's <script> block:
 *
 *   import { observeReveal } from '../lib/reveal';
 *   observeReveal(document);
 *
 * Or for the current viewport only:
 *
 *   observeReveal(document, { threshold: 0.15 });
 *
 * ── GSAP upgrade path ──
 * For complex sequenced animations, staggered entrances, parallax,
 * or scroll-driven timelines, replace this utility with GSAP +
 * ScrollTrigger (both are already dependencies in package.json):
 *
 *   import gsap from 'gsap';
 *   import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *   gsap.registerPlugin(ScrollTrigger);
 */

export interface RevealOptions {
  /** IntersectionObserver threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** IntersectionObserver rootMargin. Default: '0px 0px -40px 0px' */
  rootMargin?: string;
  /** Optional root element. Default: null (viewport) */
  root?: Element | null;
}

export function observeReveal(
  scope: Document | Element = document,
  options: RevealOptions = {}
): IntersectionObserver {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', root = null } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.classList.contains('reveal-image')) {
            el.classList.add('reveal-image--visible');
          } else {
            el.classList.add('reveal--visible');
          }
          observer.unobserve(el);
        }
      }
    },
    { threshold, rootMargin, root: root ?? undefined }
  );

  const revealEls = scope.querySelectorAll<HTMLElement>('.reveal, .reveal-image');
  revealEls.forEach((el) => observer.observe(el));

  return observer;
}
