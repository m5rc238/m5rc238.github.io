# m5rc238.github.io

Personal site. Currently a shell — the Astro scaffold, design tokens, and a
placeholder home page, waiting for real content.

The manifesto that used to live here ("A Manifesto for Epistemic Resilience")
now has its own repo and is served from
[`m5rc238/epistemic-resilience`](https://github.com/m5rc238/epistemic-resilience)
at `m5rc238.github.io/epistemic-resilience/`.

## Stack

| Piece | Version |
| ----- | ------- |
| Astro | 7.x (static) |
| TypeScript | 6.x, `astro/tsconfigs/strict` |
| Tailwind CSS | 4.x (CSS-first, no `tailwind.config.js`) |

## Commands

```sh
npm run dev       # dev server
npm run check     # astro check (types + templates)
npm run build     # static build to dist/
npm run preview   # serve the built output
```

## Layout

```
src/
  layouts/        Base.astro — the only layout
  components/     Header.astro
  styles/         global.css (tokens) + effects.css (zero-JS visual effects)
  pages/          / — the home page
```

## Styles

`src/styles/global.css` holds the design tokens under Tailwind v4's `@theme`:
fonts (self-hosted via Fontsource, no third-party runtime requests), the warm
neutral palette with a single lavender accent, the fluid type scale, and the
base layer. Measured contrast ratios are recorded inline — the two colours
that fail AA against the light ground are confined to large type, rules, and
fills, never body text.

`src/styles/effects.css` is plain CSS with no JS: the scroll progress bar (via
`animation-timeline: scroll()`, no fallback needed), the noise overlay, link
wipes, and card treatments. Every effect respects
`prefers-reduced-motion`.

## Deployment

`.github/workflows/deploy.yml` runs on push to `master`: install, `astro
check`, build, upload `dist/`, deploy. Concurrency is set to cancel superseded
runs so rapid pushes do not publish a stale build.

Pages builds from the **GitHub Actions** source.

`base` is `/` because this is a user site served from the domain root. If the
repo is ever renamed to a project site, `base` in `astro.config.mjs` must change
to `/<repo>` and asset paths need the prefix.

## Archived

- `archive/old-design` — the previous site (Pug, Sass, gulp, Font Awesome)
- The manifesto lived here from `eb4c09b` through `9971887`