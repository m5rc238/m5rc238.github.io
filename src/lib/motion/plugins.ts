import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export { gsap, ScrollTrigger, SplitText, Flip, MorphSVGPlugin, MotionPathPlugin };

let registered = false;

/**
 * Registers every plugin once per page.
 *
 * Guarded on `window` so it is safe to call from module scope in a component
 * that Astro also renders on the server. The `gsap` module itself is also
 * SSR-safe, so an accidental server-side import degrades to a no-op rather
 * than throwing.
 */
export function registerPlugins(): typeof gsap {
	if (registered || typeof window === 'undefined') return gsap;

	gsap.registerPlugin(ScrollTrigger, SplitText, Flip, MorphSVGPlugin, MotionPathPlugin);

	// Mobile browsers fire resize when the URL bar collapses. Without this,
	// ScrollTrigger recalculates every trigger position mid-scroll and visible
	// sections visibly jump.
	ScrollTrigger.config({ ignoreMobileResize: true });

	registered = true;
	return gsap;
}

/**
 * Re-measures triggers once webfonts land.
 *
 * SplitText line positions and ScrollTrigger start/end values are computed
 * from layout, so an unstyled fallback font produces wrong values. This is the
 * single most common cause of "animation is fine locally, broken on deploy".
 */
export function refreshAfterFonts(): void {
	if (typeof document === 'undefined') return;
	const fonts = document.fonts as FontFaceSet | undefined;
	fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
}

/**
 * True when the visitor has asked the OS to reduce motion.
 * Read lazily so it always reflects the current preference.
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
