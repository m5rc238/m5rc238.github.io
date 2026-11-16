import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string(),
		order: z.number(),
		featured: z.boolean().default(false),
		coverImage: z.string(),
		coverAlt: z.string().default(''),
		role: z.string(),
		scope: z.string(),
		timeline: z.string(),
		team: z.string(),
		youtubeId: z.string().optional(),
		prevSlug: z.string().optional(),
		nextSlug: z.string().optional(),
	}),
});

const journal = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
	schema: z.object({
		title: z.string(),
		date: z.string(),
		url: z.url(),
		order: z.number(),
	}),
});

export const collections = { cases, journal };
