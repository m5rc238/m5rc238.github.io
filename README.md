# Marcel Akiyama — personal website

Public professional home: https://m5rc238.github.io/

A static Astro site with a readable biography, source-linked work, writing, an interactive geometric study, and the existing problem-framing course.

## Develop and verify

```sh
npm ci
npm run check
npm run build
node scripts/verify-site.mjs
npm run dev
```

`master` is deployed by the existing GitHub Pages workflow. Do not commit `node_modules`, `dist`, or preview-only configuration.

## Keep information accurate

Edit `src/data/profile.json` for shared professional facts, project descriptions, areas of work, official links, and the real profile update date. This generates the site’s profile JSON, Markdown, llms.txt summary, and identity markup. Review editorial pages too when changing positioning.

- Alpaca is past experience, not current employment.
- Keep experiments separate from established findings and shipped client outcomes.
- Do not add metrics without an attributable source and clear ownership.
- Publish only professional information intended for public use.

Search setup and ownership verification: [docs/search-setup.md](docs/search-setup.md).

Design and creative-coding inspiration is credited at `/colophon/`. The geometric SVG implementation is original.
