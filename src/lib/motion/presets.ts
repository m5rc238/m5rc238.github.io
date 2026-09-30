import { gsap, registerPlugins, SplitText } from './plugins';
import type { RevealPreset } from './types';

export interface RevealOptions {
	/** Which animation to run. `'none'` is a deliberate no-op. */
	preset?: RevealPreset;
	/** Descendant selector to target. Omit to animate `target` itself. */
	selector?: string;
	duration?: number;
	delay?: number;
	stagger?: number;
	/** Drive the reveal off scroll position instead of playing on load. */
	scrollTrigger?: boolean;
	/** ScrollTrigger `start` value, when `scrollTrigger` is enabled. */
	start?: string;
	/** Overrides the preset's own default easing. */
	ease?: string;
}

/**
 * Entrance animation for a heading, list, or block.
 *
 * Every preset uses `gsap.from(...)` rather than `gsap.set(...)` + `to(...)`.
 * That is deliberate: with `from`, the element's resting state is its real CSS
 * state, so if JS fails, is slow to arrive, or the visitor prefers reduced
 * motion, the content is simply *already visible* instead of stranded at
 * `opacity: 0`. Animations get cancelled; content does not.
 */
export function reveal(
	target: Element | string | null | undefined,
	options: RevealOptions = {},
): gsap.MatchMedia | undefined {
	registerPlugins();
	if (typeof window === 'undefined') return undefined;

	const {
		preset = 'split-lines',
		selector,
		duration = 0.9,
		delay = 0,
		stagger = 0.08,
		scrollTrigger = true,
		start = 'top 85%',
		ease,
	} = options;

	if (preset === 'none') return undefined;

	const root =
		typeof target === 'string' ? document.querySelector(target) : target;
	if (!root) return undefined;

	const elements = selector
		? Array.from(root.querySelectorAll<HTMLElement>(selector))
		: [root as HTMLElement];
	if (elements.length === 0) return undefined;

	const mm = gsap.matchMedia();

	// Motion-sensitive visitors get the content, not the movement.
	mm.add('(prefers-reduced-motion: reduce)', () => {
		gsap.set(elements, { clearProps: 'all' });
	});

	mm.add('(prefers-reduced-motion: no-preference)', () => {
		const trigger = scrollTrigger ? { trigger: root, start } : undefined;

		switch (preset) {
			case 'split-lines':
			case 'split-chars': {
				const isLines = preset === 'split-lines';
				// Split presets override `ease` by default: overshooting a line
				// mask reads best with a slight back-out, a char cascade with a
				// deeper one. Both still honour a caller-supplied `ease`.
				const splitEase = ease ?? (isLines ? 'power4.out' : 'back.out(1.6)');
				for (const el of elements) {
					SplitText.create(el, {
						type: isLines ? 'lines' : 'chars',
						// `mask` wraps each split in an overflow-hidden parent, so
						// yPercent can overshoot without text bleeding upwards.
						mask: isLines ? 'lines' : 'chars',
						// Re-splits on resize and on font load, and reverts the old
						// split first — without this, long headlines accumulate
						// stacked <div>s on every breakpoint crossing.
						autoSplit: true,
						onSplit: (self) => {
							const parts = isLines ? self.lines : self.chars;
							gsap.from(parts, {
								yPercent: isLines ? 115 : 100,
								autoAlpha: 0,
								duration,
								delay,
								stagger,
								ease: splitEase,
								scrollTrigger: trigger,
							});
						},
					});
				}
				break;
			}

			case 'fade-up':
				gsap.from(elements, {
					y: 24,
					opacity: 0,
					duration,
					delay,
					stagger,
					ease: ease ?? 'power3.out',
					scrollTrigger: trigger,
				});
				break;

			case 'clip-reveal':
				gsap.from(elements, {
					clipPath: 'inset(0% 0% 100% 0%)',
					duration,
					delay,
					ease: ease ?? 'power4.inOut',
					scrollTrigger: trigger,
				});
				break;
		}
	});

	return mm;
}
