import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('dist');
const p=JSON.parse(readFileSync('src/data/profile.json','utf8'));
const routes=['/','/about/','/work/','/writing/','/writing/problem-framing/','/problem-framing/reading/','/contact/','/colophon/'];
const site='https://m5rc238.github.io';
let links=0;
function target(path){const file=join(root,decodeURIComponent(path));return path.endsWith('/')?join(file,'index.html'):file;}
for(const route of routes){
 const file=target(route);assert.ok(existsSync(file),`Missing page: ${route}`);
 const html=readFileSync(file,'utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${route}: exactly one h1`);
 assert.ok(/<title>[^<]*Marcel Akiyama[^<]*<\/title>/.test(html),`${route}: full name in title`);
 assert.ok(html.includes(`href="${site+route}"`),`${route}: self canonical`);
 assert.ok(!html.includes('noindex'),`${route}: indexable`);
 assert.ok(/<meta name="description" content="[^"]{40,}"/.test(html),`${route}: meaningful description`);
 const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1,`${route}: structured identity`);
 const graph=JSON.parse(scripts[0][1])['@graph'];
 const person=graph.find(x=>x['@type']==='Person');
 assert.equal(person.name,p.name);assert.equal(person.jobTitle,p.role);
 assert.deepEqual(person.sameAs,p.links.map(x=>x.url));
 for(const match of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)){
  const url=new URL(match[1],site);if(url.pathname.startsWith('/@')||url.pathname.startsWith('/src/'))continue;
  assert.ok(existsSync(target(url.pathname)),`${route}: broken local link ${match[1]}`);links++;
 }
}
const about=readFileSync(target('/about/'),'utf8');assert.ok(about.includes('ProfilePage'));assert.ok(about.includes('founding designer at Alpaca'));
const homepage=readFileSync(target('/'),'utf8');assert.ok(homepage.includes('<h1>Marcel Akiyama'));assert.ok(homepage.includes('slowly turning blue mandala'));assert.ok(homepage.includes('/work/'));
const machine=JSON.parse(readFileSync(join(root,'profile.json'),'utf8'));assert.equal(machine.name,p.name);assert.deepEqual(machine.projects,p.projects);
const md=readFileSync(join(root,'profile.md'),'utf8');for(const project of p.projects){assert.ok(md.includes(project.detail));assert.ok(md.includes(project.url));}
const textEdition=readFileSync(target('/problem-framing/reading/'),'utf8');
const raw=readFileSync('public/problem-framing/course-data.js','utf8');const course=JSON.parse(raw.replace(/^window\.COURSE\s*=\s*/,'').replace(/;\s*$/,''));
for(const module of course.modules){assert.ok(textEdition.includes(`id="module-${module.id}"`),`Missing lesson ${module.id}`);assert.ok(textEdition.includes(module.title.replaceAll('&','&amp;')),`Missing title ${module.title}`);}
const normalized=textEdition.replace(/<[^>]+>/g,' ').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#39;',"'").replaceAll('&quot;','\"').replace(/\s+/g,' ');
for(const module of course.modules)for(const [,text] of module.sections)for(const paragraph of text.split(/\n\n/))assert.ok(normalized.includes(paragraph.replace(/\s+/g,' ')),`Missing lesson text in module ${module.id}`);
const sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');for(const route of [...routes,'/problem-framing/'])assert.ok(sitemap.includes(`<loc>${site+route}</loc>`));
assert.ok(!sitemap.includes('#'),'Sitemap must not contain fragment URLs');
const robots=readFileSync(join(root,'robots.txt'),'utf8');assert.ok(robots.includes('Allow: /'));assert.ok(robots.includes(site+'/sitemap.xml'));assert.ok(!robots.includes('Disallow: /'));
assert.ok(existsSync(join(root,'social-card.png')));assert.ok(existsSync(join(root,'llms.txt')));assert.ok(readFileSync(join(root,'404.html'),'utf8').includes('noindex'));
// Existing interactive course assets must still be present, with a text fallback.
for(const asset of ['app.js','course-data.js','styles.css'])assert.ok(existsSync(join(root,'problem-framing',asset)));
assert.ok(readFileSync(target('/problem-framing/'),'utf8').includes('/problem-framing/reading/'));
console.log(`Verified ${routes.length} indexable pages, ${links} local links/assets, identity consistency, sitemap, robots, course text, preserved interactive course, and 404 indexing controls.`);
