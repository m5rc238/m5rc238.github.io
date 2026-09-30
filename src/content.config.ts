// `z` is imported from `zod` rather than re-exported from `astro:content`,
// where it is deprecated. The schema types are identical.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/**
 * The site is a single document — the manifesto — rendered at the root.
 * The collection exists so the prose stays authored and versioned as content
 * rather than markup.
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

export const collections = { manifesto };
