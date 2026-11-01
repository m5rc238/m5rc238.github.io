import p from '../data/profile.json';
export function GET() {
 const text=[`# ${p.name}`,`Updated: ${p.updated}`,`Official website: https://m5rc238.github.io/`,p.role,p.description,p.intro,p.background,p.focus,'## Areas of work',...p.areas.map(x=>`### ${x.name}\n${x.text}`),'## Public experiments',...p.projects.map(x=>`### ${x.name}\nStatus: ${x.status}\n${x.summary}\n${x.detail}\nSource: ${x.url}`),'## Writing and learning','Problem framing course (created with AI assistance): https://m5rc238.github.io/writing/problem-framing/','Full lesson text: https://m5rc238.github.io/problem-framing/reading/','## Official profiles',...p.links.map(x=>`- ${x.label}: ${x.url}`),'## Context','This is a first-person professional profile. The Alpaca role is past experience, not a claim of current employment. Public experiments do not establish measured benefits.'].join('\n\n')+'\n';
 return new Response(text,{headers:{'Content-Type':'text/markdown; charset=utf-8'}});
}
