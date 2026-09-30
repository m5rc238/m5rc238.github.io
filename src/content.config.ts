// `z` is imported from `zod` rather than re-exported from `astro:content`,
// where it is deprecated. The schema types are identical.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { REVEAL_PRESETS, DEFAULT_REVEAL } from './lib/motion/types';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		/**
		 * Selects a GSAP reveal preset applied to this page's hero.
		 * See `src/lib/motion/presets.ts`.
		 */
		reveal: z.enum(REVEAL_PRESETS).default(DEFAULT_REVEAL),
	}),
});

const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		link: z.url().optional(),
		repo: z.url().optional(),
		featured: z.boolean().default(false),
		/** Ordinal used to order cards on the work index. */
		order: z.number().default(0),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
	}),
});

/**
 * Standing documents rather than dated posts — currently the manifesto.
 * Kept separate from `blog` so it can be linked, versioned, and rendered at a
 * permanent URL without inheriting publication dates or draft semantics.
 */
const manifesto = defineCollection({
	loader: glob({ base: './src/content/manifesto', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** Last substantive revision. Rendered in the document header. */
		updatedDate: z.coerce.date().optional(),
		/** Reads as a thesis in the header, above the body. */
		standfirst: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, work, manifesto };
