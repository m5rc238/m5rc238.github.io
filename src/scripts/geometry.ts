const svg = document.querySelector<SVGSVGElement>('#geometry-art');
const pattern = document.querySelector<SVGGElement>('#pattern');
const select = document.querySelector<HTMLSelectElement>('#pattern-select');
const toggle = document.querySelector<HTMLButtonElement>('#motion-toggle');
const controls = document.querySelector<HTMLElement>('.geometry-controls');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (svg && pattern && select && toggle && controls) {
 controls.hidden = false;
 let paused = reduced.matches;
 const ns = 'http://www.w3.org/2000/svg';
 function element(name: string, attrs: Record<string,string|number>) {
  const node=document.createElementNS(ns,name); Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value))); return node;
 }
 function syncMotion() {if(!svg||!toggle)return; svg.classList.toggle('paused',paused); svg.classList.toggle('motion-enabled',!paused); toggle.textContent=paused?'Play motion':'Pause motion'; toggle.setAttribute('aria-pressed',String(paused)); svg.setAttribute('aria-label',`A ${paused?'still':'slowly turning'} blue ${select?.selectedOptions[0]?.text.toLowerCase() || 'mandala'} made from repeating rules`);}
 toggle.addEventListener('click',()=>{paused=!paused;syncMotion();});
 reduced.addEventListener('change',()=>{paused=reduced.matches;syncMotion();});
 // The animation is entirely CSS: pausing preserves its phase and costs no JS frame loop.
 const observer=new IntersectionObserver(entries=>{svg.classList.toggle('offscreen',!entries[0].isIntersecting);}); observer.observe(svg);
 select.addEventListener('change',()=>{
  pattern.replaceChildren();
  const group=element('g',{class:'turning',style:'transform-origin:260px 260px'}); pattern.appendChild(group);
  if(select.value==='mandala') {
   for(let i=0;i<12;i++) {const g=element('g',{transform:`rotate(${i*30} 260 260)`});g.append(element('ellipse',{cx:260,cy:166,rx:65,ry:138}),element('ellipse',{cx:260,cy:192,rx:38,ry:106}));group.append(g);}
   group.append(element('circle',{cx:260,cy:260,r:212}),element('circle',{cx:260,cy:260,r:185}));
  } else if(select.value==='orbits') {
   for(let i=0;i<28;i++)group.append(element('ellipse',{cx:260,cy:260,rx:212,ry:55+i*3.8,transform:`rotate(${i*13} 260 260)`}));
  } else {
   function branch(x:number,y:number,length:number,angle:number,depth:number) {if(!depth)return;const nx=x+Math.cos(angle)*length,ny=y+Math.sin(angle)*length;group.append(element('path',{d:`M${x.toFixed(2)} ${y.toFixed(2)}L${nx.toFixed(2)} ${ny.toFixed(2)}`}));branch(nx,ny,length*.7,angle-.48,depth-1);branch(nx,ny,length*.7,angle+.48,depth-1);}
   for(let i=0;i<6;i++)branch(260,260,70,i*Math.PI/3,6);
  }
  pattern.append(element('circle',{cx:260,cy:260,r:5,fill:'#a7442d',stroke:'none'}));
  svg.setAttribute('aria-label',`A ${paused?'still':'slowly turning'} blue ${select.options[select.selectedIndex].text.toLowerCase()} made from repeating rules`);
 });
 syncMotion();
}
