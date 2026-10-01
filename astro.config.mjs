// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Required for canonical URLs, sitemap, and RSS to resolve correctly.
	site: 'https://m5rc238.github.io',

	// `m5rc238.github.io` is a user site, served from the domain root, so
	// `base` stays at '/'. If this ever becomes a project site
	// (`m5rc238.github.io/repo`), set base: '/repo' and prefix asset paths.
	base: '/',

	// GitHub Pages serves static files only.
	output: 'static',

	trailingSlash: 'always',

	vite: {
		plugins: [tailwindcss()],
	},

	build: {
		inlineStylesheets: 'auto',
	},

	prefetch: {
		// Makes in-site navigation feel instant without a client router.
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
});
