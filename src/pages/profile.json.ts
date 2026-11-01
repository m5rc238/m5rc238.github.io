import p from '../data/profile.json';
export function GET() {return new Response(JSON.stringify({url:'https://m5rc238.github.io/',...p},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});}
