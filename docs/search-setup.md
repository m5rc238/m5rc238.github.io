# Search setup and remaining external steps

## Implemented

- Static HTML: biography, project descriptions, navigation, all course lesson text.
- Full-name page titles, descriptions, self-referencing canonical URLs.
- Person, WebSite, WebPage and About ProfilePage JSON-LD; official sameAs links.
- Open Graph and social preview metadata, local fonts, SVG favicon and PNG social card.
- Root robots.txt allows crawling, including AI search crawlers through its wildcard rule.
- Root sitemap.xml lists real HTML routes, not hash-based lesson URLs.
- `/profile.md`, `/profile.json`, and `/llms.txt` generated from shared profile data.
- Original course is preserved; its full text is also available at `/problem-framing/reading/`.

`llms.txt` is an optional convenience. It does not cause indexing and Google says it does not improve Google Search rankings. Crawl access does not guarantee an AI will retrieve or quote a page, and publication does not immediately update model training.

## Google Search Console — requires an authenticated Google account

1. Open https://search.google.com/search-console/ .
2. Add the URL-prefix property **https://m5rc238.github.io/**. DNS verification of github.io is not appropriate because the user does not control that domain’s DNS.
3. Choose HTML-file or HTML-meta-tag verification. Publish the exact verification file in `public/` or put the exact tag into `src/layouts/Base.astro`; keep it after verification.
4. Submit **https://m5rc238.github.io/sitemap.xml**.
5. Inspect the homepage and `/about/`; use Live Test, confirm crawlability and the Google-selected canonical, and request indexing.
6. Monitor Pages and Performance for indexed URLs and impressions on the full name. Recheck after Google has crawled. Indexing and position are not guaranteed.

## Bing Webmaster Tools — requires an authenticated owner account

Add the same site, verify ownership (or import the verified Google property where available), and submit the sitemap at https://www.bing.com/webmasters/ .

## Identity links

Set the main website link in GitHub, LinkedIn, Framer, and Substack to **https://m5rc238.github.io/**. Retain Framer as a case-study destination. This task does not change those other account profiles.

## References

- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.openai.com/api/docs/bots
