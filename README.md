# m5rc238.github.io

Personal site. Static output, deployed to GitHub Pages.

## Stack

| Piece | Version |
| ----- | ------- |
| Astro | 7.x (static) |
| TypeScript | 6.x, `astro/tsconfigs/strict` |
| Tailwind CSS | 4.x (CSS-first, no `tailwind.config.js`) |
| GSAP | 3.15 — ScrollTrigger, SplitText, Flip, MorphSVG, MotionPath |
| MDX | via `@astrojs/mdx` |

All GSAP plugins ship free in the public `gsap` package since 3.13. No Club
account is required for SplitText or MorphSVG.

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
  lib/motion/     plugins.ts, presets.ts, types.ts — GSAP setup and reveals
  lib/manifesto/  engine.ts — scene pin/scrub timelines, rail, challenge state
  layouts/        Base.astro — the only layout; owns the motion bootstrap
  components/     Header, Footer
  components/manifesto/  SysScene.astro + scene panels (one per manifesto section)
  styles/         global.css (tokens) + effects.css (visual effects) + scenes.css
  content/        manifesto/ — the single Astro content collection
  pages/          / — the manifesto; /manifesto redirects to it
```

## Content

`src/content.config.ts` holds the schema. One collection:

- **manifesto** — a single standing document, authored in MDX, rendered at the
  root. Section headings carry their own numbers; scene panels are embedded as
  components in the MDX and animated by `src/lib/manifesto/engine.ts`.

Frontmatter is validated at build time, so a missing `title` or a malformed
`updatedDate` fails the build rather than shipping a blank page.

## Motion

Entrance animations use `data-reveal="<preset>"`, where preset is one of
`split-lines`, `split-chars`, `fade-up`, `clip-reveal`, or `none`. The page
hero uses `data-hero` and the preset passed to `Base`'s `heroReveal` prop.

Reveals are built on `gsap.from()`. An element's resting state is its real CSS
state, so if JavaScript fails or is blocked the content is simply visible —
animations get cancelled, content does not. Nothing is hidden by CSS.

`prefers-reduced-motion: reduce` skips the animation and renders the final
state. Verified in-browser, not assumed.

## Deployment

`.github/workflows/deploy.yml` runs on push to `master`: install, `astro
check`, build, upload `dist/`, deploy. Concurrency is set to cancel superseded
runs so rapid pushes do not publish a stale build.

Pages must be configured to build from the **GitHub Actions** source (already
set for this repo).

`base` is `/` because this is a user site served from the domain root. If the
repo is ever renamed to a project site, `base` in `astro.config.mjs` must change
to `/<repo>` and asset paths need the prefix.

## Archived

The previous site (Pug, Sass, gulp, Font Awesome) is preserved on the
`archive/old-design` branch.
