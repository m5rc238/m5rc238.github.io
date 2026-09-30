/**
 * Engine for the manifesto's epistemic-system scenes.
 *
 * Each scene is one full-viewport panel whose DOM *is its end state*. If JS
 * is slow, broken, or the visitor prefers reduced motion, the scene is simply
 * read as-is: everything it means to communicate is already on the page.
 *
 * Under supported conditions we pin each panel for one viewport of scroll and
 * scrub a purpose-built timeline between a *calmer* opening and that DOM end
 * state — the "growth → maturity" rhythm the brief asks for. Every timeline
 * is built with `gsap.from`, so the rest state is the real CSS state.
 *
 * Motion is gated through `gsap.matchMedia()`, the GSAP-recommended way to
 * handle `prefers-reduced-motion`: pins and timelines are only created for
 * `no-preference`, and are reverted and rebuilt if the preference changes
 * while the reader sits on the page.
 *
 * The engine also owns the two things that are state, not decoration:
 *   - the 8-stage system rail (INFORMATION → … → NEW EVIDENCE) — informational,
 *     runs under every motion preference, never uses animation classes,
 *   - the Challenge scene's revision interaction, a genuine state change.
 */
import { gsap } from 'gsap';
import { registerPlugins, ScrollTrigger, refreshAfterFonts } from '../motion/plugins';

/** data-scene name → the stage of the epistemic cycle it exercises. */
const STAGE_BY_SCENE: Record<string, number> = {
	abundance: 0, //  INFORMATION
	decompose: 1, //  CLAIM
	blackbox: 2, //   EVIDENCE
	uncertainty: 3, // INTERPRETATION
	challenge: 4, //  DECISION
	relationships: 5, // ACTION
	revision: 5, //     ACTION (revising steers the next action)
	optimize: 4, //     DECISION — what we optimise is itself a decision
	automation: 5, //   ACTION
	loop: 7, //         NEW EVIDENCE — the cycle closes into the next one
};

/**
 * Minimal timeline builders. Each receives the scene root and returns either
 * a timeline (scrubbed against the pinned panel) or `null` if the scene has
 * nothing to animate (scrolls naturally).
 */
type Builder = (root: HTMLElement) => ReturnType<typeof gsap.timeline> | null;

const buildAbundance: Builder = (root) => {
	const words = root.querySelectorAll<HTMLElement>('[data-sys-abundance-words] .sys-words__w');
	const ask = root.querySelector<HTMLElement>('[data-sys-abundance-ask]');
	if (!ask || words.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(words, { opacity: 0, y: 6, duration: 0.45, stagger: 0.04 })
		.from(ask, { opacity: 0, y: 14, duration: 0.7 }, '+=0.3')
		.to(words, { opacity: 0.16, duration: 0.9, ease: 'power1.inOut' }, '+=0.2');
	return tl;
};

const buildDecompose: Builder = (root) => {
	const answer = root.querySelector<HTMLElement>('[data-sys-answer]');
	const parts = root.querySelectorAll<HTMLElement>('[data-sys-decompose-parts] [data-sys-part]');
	const link = root.querySelector<HTMLElement>('[data-sys-decompose-link]');
	if (!answer || !link) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(answer, { opacity: 0, scale: 0.92, duration: 0.5 })
		.from(link, { scaleY: 0, duration: 0.45, ease: 'power1.inOut', transformOrigin: '50% 0%' }, '-=0.15')
		.from(parts, { opacity: 0, y: 18, duration: 0.5, stagger: 0.09 }, '-=0.2');
	return tl;
};

const buildUncertainty: Builder = (root) => {
	const steps = root.querySelectorAll<HTMLElement>('[data-sys-uncertainty] .sys-flow > *');
	if (steps.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(steps, { opacity: 0, y: 10, duration: 0.4, stagger: 0.24 });
	return tl;
};

const buildBlackbox: Builder = (root) => {
	const steps = root.querySelectorAll<HTMLElement>('[data-sys-blackbox] .sys-flow > *');
	const inner = root.querySelector<HTMLElement>('[data-sys-blackbox-inner]');
	if (steps.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(steps, { opacity: 0, y: 10, duration: 0.4, stagger: 0.2 });
	const layers = inner
		? inner.querySelectorAll<HTMLElement>('[data-sys-blackbox-layer]')
		: [];
	if (inner && layers.length > 0) {
		tl.from(inner, { opacity: 0, duration: 0.3 }, '<0.3');
		// The layers read better as a controlled cascade than as part of the
		// row stagger, so reveal them after the shell itself has settled.
		tl.from(layers, { opacity: 0, x: 8, duration: 0.4, stagger: 0.1 }, '<0.1');
	}
	return tl;
};

const buildChallenge: Builder = () => null; // handled in `initChallenge` below.

const buildRelationships: Builder = (root) => {
	const steps = root.querySelectorAll<HTMLElement>('[data-sys-relationships] .sys-flow > *');
	if (steps.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(steps, { opacity: 0, y: 10, duration: 0.35, stagger: 0.16 });
	return tl;
};

const buildRevision: Builder = (root) => {
	const steps = root.querySelectorAll<HTMLElement>('[data-sys-revision] .sys-flow > *');
	if (steps.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(steps, { opacity: 0, y: 10, duration: 0.4, stagger: 0.2 });
	return tl;
};

const buildOptimize: Builder = (root) => {
	// No timeline: the "active objective" is real state, so it is driven by
	// scroll position instead of a scrubbed tween and is reversible both ways.
	const cols = root.querySelectorAll<HTMLElement>('[data-opt-col]');
	const objective = root.querySelector<HTMLElement>('[data-objective]');
	const blind = root.querySelector<HTMLElement>('[data-blind-spot]');
	if (!objective || !blind || cols.length === 0) return null;

	const meta = Array.from(cols).map((c) => ({
		label: c.dataset.optLbl ?? '',
		blind: c.dataset.optBlind ?? '',
	}));

	ScrollTrigger.create({
		trigger: root,
		start: 'top top',
		end: '+=100%',
		scrub: true,
		pin: true,
		anticipatePin: 1,
		onUpdate: (self) => {
			const i = Math.min(cols.length - 1, Math.floor(self.progress * cols.length));
			cols.forEach((col, k) => col.classList.toggle('sys-opt__col--lit', k === i));
			objective.textContent = meta[i].label;
			blind.textContent = meta[i].blind;
		},
	});
	return null; // has its own pin + controller
};

const buildAutomation: Builder = (root) => {
	const rows = root.querySelectorAll<HTMLElement>('[data-auto-phase]');
	if (rows.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(rows, { opacity: 0, y: 16, duration: 0.5, stagger: 0.18 });
	return tl;
};

const buildLoop: Builder = (root) => {
	const nodes = root.querySelectorAll<HTMLElement>('[data-sys-loop] .sys-loop__node');
	if (nodes.length === 0) return null;

	const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
	tl.from(nodes, { opacity: 0, scale: 0.62, duration: 0.5, stagger: 0.13 });
	return tl;
};

const BUILDERS: Record<string, Builder> = {
	abundance: buildAbundance,
	decompose: buildDecompose,
	uncertainty: buildUncertainty,
	blackbox: buildBlackbox,
	challenge: buildChallenge,
	relationships: buildRelationships,
	revision: buildRevision,
	optimize: buildOptimize,
	automation: buildAutomation,
	loop: buildLoop,
};

/* --- rail ---------------------------------------------------------------- */

let currentStage = 0;

function renderRail(active: number): void {
	const steps = document.querySelectorAll<HTMLElement>('[data-sys-rail-step]');
	steps.forEach((step, i) => {
		step.classList.toggle('sys-rail__step--done', i < active);
		step.classList.toggle('sys-rail__step--on', i === active);
	});
}

/** Advance the cycle once; the rail only ever moves forward. */
function advance(stage: number): void {
	currentStage = Math.max(currentStage, stage);
	renderRail(currentStage);
}

/* --- instances ----------------------------------------------------------- */

interface Instance {
	scene: HTMLElement;
	stage: number;
	/** Called on enter so unpinned scenes still advance the rail. */
	onEnter: () => void;
}

function makeEnter(onEnter: () => void): (self: { isActive: boolean }) => void {
	return (self) => {
		if (self.isActive) onEnter();
	};
}

/**
 * The rail is state, not decoration, so it advances how/when each scene is
 * acknowledged. ScrollTrigger coalesces `onEnter` away when a large scroll
 * jump crosses a trigger's whole range in one update, so the rail reads a
 * position-based check off `onUpdate` instead (fires on every progress
 * change, however big the step).
 */
function wireRail(trigger: HTMLElement, stage: number, start: string): void {
	ScrollTrigger.create({
		trigger,
		start,
		onUpdate: (self) => {
			if (self.scroll() >= self.start) advance(stage);
		},
	});
}

/**
 * Build the pinned/scrubbed scenes. Only `prefers-reduced-motion:
 * no-preference` gets this; `gsap.matchMedia()` reverts every trigger and
 * tween created here if the preference flips (and rebuilds them when it
 * comes back) — the GSAP-blessed way to honour reduced motion.
 */
function buildMotion(nodes: Instance[]): gsap.MatchMedia {
	const mm = gsap.matchMedia();

	mm.add('(prefers-reduced-motion: no-preference)', () => {
		nodes.forEach(({ scene, stage, onEnter }) => {
			const name = scene.dataset.scene ?? '';
			const builder = BUILDERS[name];

			// Unpinned scenes still mark the rail when scrolled into view.
			if (!builder) {
				wireRail(scene, stage, 'top 65%');
				return;
			}

			const timeline = builder(scene);
			if (!timeline) {
				// Optimize owns its own pin + onUpdate; we only add the rail.
				wireRail(scene, stage, 'top top');
				return;
			}

			ScrollTrigger.create({
				trigger: scene,
				start: 'top top',
				end: '+=100%',
				scrub: 0.7,
				pin: true,
				anticipatePin: 1,
				animation: timeline,
				onToggle: makeEnter(onEnter),
			});
		});
	});

	// Reduced motion: no pinning, no scrub — the DOM is already the end state,
	// so honour each scene with a plain rail acknowledgement instead.
	mm.add('(prefers-reduced-motion: reduce)', () => {
		nodes.forEach(({ scene, stage }) => wireRail(scene, stage, 'top 65%'));
	});

	return mm;
}

/* --- Challenge interaction ------------------------------------------------ */

function initChallenge(): void {
	const card = document.querySelector<HTMLElement>('[data-sys-rec]');
	const button = document.querySelector<HTMLButtonElement>('[data-challenge]');
	const review = document.querySelector<HTMLElement>('[data-review]');
	const ghost = document.querySelector<HTMLElement>('[data-ghost-conclusion]');

	if (!card || !button || !review) return;
	const status = card.querySelector<HTMLElement>('[data-status]');
	const value = card.querySelector<HTMLElement>('[data-confidence-value]');
	const meter = card.querySelector<HTMLElement>('[data-confidence-meter]');

	let challenged = false;
	const setState = (on: boolean) => {
		challenged = on;
		card.classList.toggle('sys-rec--reviewed', on);
		if (status) status.textContent = on ? 'Under revision' : 'Confident';
		if (value) value.textContent = on ? '52%' : '84%';
		if (meter) meter.style.width = on ? '52%' : '84%';
		review.hidden = !on;
		ghost?.classList.toggle('sys-challenge-hidden', !on);
		button.textContent = on ? 'Re-examine' : 'Challenge this';
		button.setAttribute('aria-expanded', String(on));
	};

	button.addEventListener('click', () => setState(!challenged));
	// Ensure the default aria state reflects what's in the DOM.
	button.setAttribute('aria-expanded', 'false');
}

/* --- boot ---------------------------------------------------------------- */

export function initManifesto(): void {
	if (typeof document === 'undefined') return;
	registerPlugins();

	const scenes = document.querySelectorAll<HTMLElement>('.sys-scene[data-scene]');
	const nodes: Instance[] = Array.from(scenes).map((scene) => {
		const stage = STAGE_BY_SCENE[scene.dataset.scene ?? ''] ?? 0;
		return { scene, stage, onEnter: () => advance(stage) };
	});

	// The rail moves forward as we move through the manifesto; it is the one
	// "decoration" that is state, so it updates even under reduced motion.
	// Scenes that pin are built inside `gsap.matchMedia()`, which reverts and
	// rebuilds them if the motion preference changes mid-session.
	buildMotion(nodes);

	initChallenge();

	refreshAfterFonts();
	// Some scenes pin; make sure offsets are correct on first paint.
	requestAnimationFrame(() => ScrollTrigger.refresh());
}

// Imported for types only in this file; the module side-effects do nothing on
// the server, so importing is safe anywhere.