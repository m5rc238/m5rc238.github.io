import p from '../data/profile.json';
const paths=['/','/about/','/work/','/writing/','/writing/problem-framing/','/problem-framing/','/problem-framing/reading/','/contact/','/colophon/'];
export function GET(){const body='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(path=>`<url><loc>https://m5rc238.github.io${path}</loc><lastmod>${p.updated}</lastmod></url>`).join('')+'</urlset>';return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8'}});}
