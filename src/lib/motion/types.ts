/**
 * Shared motion vocabulary.
 *
 * Deliberately dependency-free so it can be imported from `content.config.ts`
 * (which runs in Node) without pulling the browser-only GSAP bundle along.
 */
export const REVEAL_PRESETS = [
	'split-lines',
	'split-chars',
	'fade-up',
	'clip-reveal',
	'none',
] as const;

export type RevealPreset = (typeof REVEAL_PRESETS)[number];

export const DEFAULT_REVEAL: RevealPreset = 'split-lines';
