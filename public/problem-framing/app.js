'use strict';
const {modules, sources, rubric} = window.COURSE;
const KEY = 'frame-course-v1';
let state;
try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { state = {}; }
if (!state || typeof state !== 'object' || Array.isArray(state)) state = {};
let storageWorks = true;
const main = document.querySelector('main');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function entry(id) {
  if (!state[id] || typeof state[id] !== 'object') state[id] = {};
  const item = state[id];
  item.answers ||= {};
  item.review ||= {};
  item.choices ||= {};
  return item;
}
function notify(message) {
  document.querySelector('#notice').textContent = message;
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => { document.querySelector('#notice').textContent = ''; }, 6000);
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { storageWorks = false; notify('Browser storage is unavailable. Export your workbook before leaving.'); }
  updateProgress();
}
const moduleLabel = m => m.id === 0 ? 'Foundations' : m.id === 11 ? 'Final project' : 'Module '+String(m.id).padStart(2,'0');
const passScore = m => m.quiz.length === 10 ? 8 : 2;
function passed(m) { return (entry(m.id).best || 0) >= passScore(m); }
function complete(m) {
  const e = entry(m.id);
  return Boolean(e.read && passed(m) && m.exercises.every((_, i) => (e.answers[i] || '').trim().length > 0 && e.review[i]));
}
function updateProgress() {
  const count = modules.filter(complete).length;
  document.querySelector('#progress').value = count;
  document.querySelector('#progress').max = modules.length;
  document.querySelector('#progress-text').textContent = count + ' / ' + modules.length;
  document.querySelector('#navigation').innerHTML = '<a href="#/" class="'+(location.hash==='#/'||!location.hash?'active':'')+'">Course overview</a>' + modules.map(m =>
    '<a href="#/module/'+m.id+'/lesson" '+(location.hash.startsWith('#/module/'+m.id+'/')?'class="active" aria-current="page"':'')+'><span class="number">'+(m.id===0?'F':String(m.id).padStart(2,'0'))+'</span><span>'+esc(m.title)+'</span>'+(complete(m)?'<span class="done" aria-label="Complete">✓</span>':'')+'</a>').join('');
}
function overview() {
  const next = modules.find(m => !complete(m)) || modules[0];
  return '<section class="hero"><p class="eyebrow">A practical course for product designers</p><h1>Get better at deciding<br>what the problem is.</h1><p class="lead">Learn to examine evidence, clarify goals, set boundaries, and compare explanations. Turn an unclear brief into a next step you can explain and justify.</p><div class="meta"><span>Foundations + 10 modules + final project</span><span>50 quiz questions</span><span>26 exercises</span><span>Suggested pace · 10–14 hours</span></div><div class="actions"><a class="button primary" href="#/module/'+next.id+'/lesson">'+(modules.some(m => entry(m.id).read || Object.values(entry(m.id).answers).some(Boolean) || entry(m.id).best)?'Continue learning':'Start the course')+' →</a><a class="button" href="#/notebook">Open your workbook</a></div></section>'+
    '<div class="intro-grid"><div><h3>Understand why, then practice</h3><p>Start with seven core ideas, a worked example, three exercises, and ten quiz questions. Then apply them in ten practical modules with two exercises and three questions each. The final project asks you to revise a decision memo as evidence arrives.</p></div><div><h3>Make your reasoning visible</h3><p>Write your answer before opening the example. Use the review criteria to check your work. You review the quality of your own answers; the course does not grade written responses.</p></div></div>'+
    '<div class="section-title"><h2>Your course path</h2><span class="small">All modules are open</span></div><div class="cards">'+modules.map(m=>'<article class="card '+(m.id===0?'foundation':'')+'"><p class="eyebrow">'+moduleLabel(m)+'</p><h3><a class="stretched" href="#/module/'+m.id+'/lesson">'+esc(m.title)+'</a></h3><p>'+esc(m.objective)+'</p><div class="card-foot"><span>'+m.minutes+' min · '+m.exercises.length+' exercises</span><span>'+(complete(m)?'Completed ✓':'Explore →')+'</span></div></article>').join('')+'</div>'+
    '<div class="call"><h3>How completion works</h3><p class="small">Mark the lesson as read, save and review each exercise response, and answer at least 2 of 3 quiz questions correctly. Foundations and the final project each require 8 of 10. Your best quiz score is kept. Completion records these activities; it does not certify professional ability.</p><p class="small">The course brings together design research and methods used in practice. It has not been tested as a complete training program. All supplied cases are fictional. Your work is saved in this browser, without an account or sending answers to a server.</p></div>';
}
function modulePage(m, tab) {
  const e = entry(m.id);
  const status = '<div class="meta"><span>'+m.minutes+' min</span><span>'+m.exercises.length+' exercises</span><span>Best quiz · '+(e.best || 0)+' / '+m.quiz.length+'</span><span>'+(complete(m)?'Completed ✓':'In progress')+'</span></div>';
  const tabs = '<nav class="tabs" aria-label="Module sections">'+['lesson','practice','quiz'].map(t=>'<a href="#/module/'+m.id+'/'+t+'" '+(tab===t?'aria-current="page"':'')+'>'+({lesson:'Read the lesson',practice:'Practice',quiz:'Check understanding'}[t])+'</a>').join('')+'</nav>';
  let body;
  if (tab === 'lesson') body = lesson(m);
  else if (tab === 'practice') body = practice(m);
  else body = quiz(m);
  return '<p class="eyebrow">'+moduleLabel(m)+' · Part '+(modules.indexOf(m)+1)+' of '+modules.length+'</p><h1>'+esc(m.title)+'</h1><p class="lead">'+esc(m.objective)+'</p>'+status+tabs+body;
}
function videoResources(m) {
  if (!m.videos?.length) return '';
  return '<section class="video-resources"><h2>Selected viewing</h2><p class="small">Optional examples to watch alongside the readings and exercises.</p>'+m.videos.map(v=>'<article class="video-card"><p class="label">'+esc(v.creator)+'</p><h3><a href="'+esc(v.url)+'" target="_blank" rel="noopener noreferrer">'+esc(v.title)+' ↗</a></h3><p>'+esc(v.why)+'</p><p><strong>Keep in mind.</strong> '+esc(v.limit)+'</p><p><strong>Viewing task.</strong> '+esc(v.task)+'</p><p class="small">'+esc(v.review)+'</p></article>').join('')+'</section>';
}
function lesson(m) {
  const paragraphs = text => text.split('\n\n').map(p=>'<p>'+esc(p)+'</p>').join('');
  return '<div class="reading">'+m.sections.map((s,i)=>m.id===11&&(i===1||i===2)?'<details><summary>Open '+esc(s[0].toLowerCase())+'</summary>'+paragraphs(s[1])+'</details>':'<section><h2>'+esc(s[0])+'</h2>'+paragraphs(s[1])+(m.readings?.[i]?'<p class="reading-link"><a href="'+esc(m.readings[i][1])+'" target="_blank" rel="noopener noreferrer">Reading · '+esc(m.readings[i][0])+' ↗</a></p>':'')+'</section>').join('')+'<div class="example"><span class="label">Worked example</span>\n'+esc(m.worked)+'</div>'+videoResources(m)+'<label class="check"><input type="checkbox" data-read="'+m.id+'" '+(entry(m.id).read?'checked':'')+'> I have read this lesson and its example.</label><div class="actions"><a class="button primary" href="#/module/'+m.id+'/practice">Apply it in practice →</a></div></div>';
}
function practice(m) {
  const e = entry(m.id);
  return '<p class="small">Write your own answer first. It saves as you type. The example shows one reasonable approach. Other answers can meet the review criteria.</p>'+m.exercises.map((x,i)=>
    '<section class="exercise"><p class="label">Exercise '+(i+1)+'</p><h2>'+esc(x.title)+'</h2><p>'+esc(x.brief)+'</p><ol>'+x.tasks.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ol><label class="answer-label" for="answer-'+i+'">Your response</label><textarea id="answer-'+i+'" data-answer="'+i+'" data-module="'+m.id+'" placeholder="Explain your thinking, the evidence behind it, and what could change your mind.">'+esc(e.answers[i] || '')+'</textarea><p class="saved" id="saved-'+i+'">'+(e.answers[i]?'Saved in this browser':'Your response will save automatically')+'</p><details><summary>Compare with an example response</summary><p>'+esc(x.model)+'</p><p><strong>Review your work</strong></p><ul>'+x.review.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></details><label class="check"><input type="checkbox" data-review="'+i+'" data-module="'+m.id+'" '+(e.review[i]?'checked':'')+'> I checked my answer against the criteria and noted any changes.</label></section>').join('')+
    (m.id===11?rubricPage():'')+'<div class="actions"><a class="button primary" href="#/module/'+m.id+'/quiz">Check understanding →</a></div>';
}
function rubricPage() {
  const scores = entry(11).rubric || {};
  return '<h2>Review your final memo</h2><p>Use this rubric (scoring guide) to review each area from 0 to 3. Use 0 when it is missing, 1 when claims have little support, 2 when reasoning has support but an important gap remains, and 3 when it is clear, supported, and suited to the decision. This guide has not been validated as an assessment. Improve weak areas even if the total looks good.</p><table class="rubric"><thead><tr><th scope="col">Area</th><th scope="col">What to check</th><th scope="col">0–3</th></tr></thead><tbody>'+rubric.map((r,i)=>'<tr><th scope="row">'+esc(r[0])+'</th><td>'+esc(r[1])+'</td><td><select class="score-input" aria-label="'+esc(r[0])+' score" data-rubric="'+i+'"><option value="">—</option>'+[0,1,2,3].map(n=>'<option '+(String(scores[i])===String(n)?'selected':'')+'>'+n+'</option>').join('')+'</select></td></tr>').join('')+'</tbody></table>';
}
function quiz(m) {
  const e = entry(m.id);
  const result = e.result;
  return '<p>Choose one answer for every question, then check your reasoning. '+'You need '+passScore(m)+' of '+m.quiz.length+' correct to complete this knowledge check. '+(m.id===11?'This final review revisits concepts from across the course.':'')+'</p><form id="quiz-form" data-module="'+m.id+'">'+m.quiz.map((q,i)=>{
    const answer = e.choices[i];
    const graded = result && Number.isInteger(answer);
    return '<fieldset><legend>Question '+(i+1)+' of '+m.quiz.length+'</legend><p class="question">'+esc(q.prompt)+'</p>'+q.options.map((o,j)=>'<label class="option"><input type="radio" name="q'+i+'" value="'+j+'" '+(answer===j?'checked':'')+' '+(result?'disabled':'')+' required><span><strong>'+String.fromCharCode(65+j)+'.</strong> '+esc(o)+'</span></label>').join('')+'<details><summary>Hint</summary><p>'+esc(q.hint)+'</p></details>'+(graded?'<div class="feedback '+(answer===q.correct?'':'wrong')+'"><strong>'+(answer===q.correct?'Correct':'Review this answer')+'</strong><p>'+esc(q.reason)+'</p><p>Correct answer · '+esc(q.options[q.correct])+'</p></div>':'')+'</fieldset>';
  }).join('')+(result?'<div class="result" role="status"><h3>'+result.score+' / '+m.quiz.length+' on this attempt</h3><p>Best score · '+(e.best||0)+' / '+m.quiz.length+'. '+(passed(m)?'Knowledge check complete. Review any answers you were unsure about.':'Review the lesson and try again.')+'</p><button type="button" data-retry="'+m.id+'">Try a fresh attempt</button></div>':'<button class="primary" type="submit">Check my answers</button>')+'</form><div class="actions">'+(m.id<11?'<a class="button" href="#/module/'+(m.id+1)+'/lesson">Next module →</a>':'<a class="button" href="#/notebook">Review your workbook →</a>')+'</div>';
}
function notebook() {
  return '<p class="eyebrow">Your field notes</p><h1>Your workbook</h1><p class="lead">Your responses, review status, and best scores. Export a Markdown copy for your own records.</p><div class="actions"><button class="primary" data-export>Export workbook</button></div>'+modules.map(m=>{
    const e=entry(m.id);
    const answers=m.exercises.map((x,i)=>e.answers[i]?'<section><h3>'+esc(x.title)+'</h3><p class="notebook-answer">'+esc(e.answers[i])+'</p><p class="small">'+(e.review[i]?'Self-review recorded':'Self-review still open')+'</p></section>':'').join('');
    return '<article class="exercise"><p class="eyebrow">'+moduleLabel(m)+'</p><h2>'+esc(m.title)+'</h2><p class="small">Lesson '+(e.read?'read':'open')+' · Best quiz '+(e.best||0)+' / '+m.quiz.length+'</p>'+(answers||'<p class="small">No written responses yet.</p>')+'<a href="#/module/'+m.id+'/practice">Open exercises →</a></article>';
  }).join('');
}
function sourcePage() {
  return '<p class="eyebrow">Evidence and scope</p><h1>Research and course notes</h1><p class="lead">A course for product designers working with unclear briefs.</p><p>The sources include research reviews, observational studies, experiments, theories, and practical guidance. They support particular ideas and methods, each with its own limits. They do not show that this complete course or its assessments have been validated. The examples, suggested timings, and review criteria are teaching choices.</p><p>Study times are estimates. Module completion tracks reading, quiz scores, and your own exercise reviews. You still need to judge the quality of your written work. Example answers show possible approaches. The final quiz repeats earlier concepts for review.</p>'+sources.map(s=>'<article class="source"><a href="'+esc(s[2])+'" target="_blank" rel="noopener noreferrer">'+esc(s[0])+' ↗</a><p>'+esc(s[1])+'</p></article>').join('')+'<h2 class="resource-heading">Video illustrations</h2><p>The lessons link to two videos on their original source pages. Each names the creator, gives you a viewing task, and explains a limitation. We selected them by reviewing the published talk script or edited transcript. We did not independently review the footage. Both are examples from one person’s practice, rather than independent research findings or a survey of available videos.</p>'+modules.filter(m=>m.videos?.length).map(m=>videoResources(m)).join('')+'<div class="call"><h2>Your data</h2><p>Your progress and answers are saved in this browser. The course does not create an online account or automatically send your answers to a server. Clearing website data or switching browsers can make your notes unavailable. Export a copy regularly. Other code served from this website may be able to access the same browser storage.</p></div>';
}
function exportWorkbook() {
  const lines=['# Problem framing workbook','', 'Exported '+new Date().toISOString(),'', 'Exercise reviews and rubric scores are your own assessments.',''];
  modules.forEach(m=>{
    const e=entry(m.id);
    lines.push('## '+moduleLabel(m)+' · '+m.title,'','Lesson read: '+Boolean(e.read),'Best quiz: '+(e.best||0)+' / '+m.quiz.length,'');
    m.exercises.forEach((x,i)=>lines.push('### '+x.title,'',e.answers[i] || '(No response yet)','', 'Self-reviewed: '+Boolean(e.review[i]),''));
  });
  if(entry(11).rubric) { lines.push('## Final project rubric','');rubric.forEach((r,i)=>lines.push(r[0]+': '+(entry(11).rubric[i]??'unscored'))); }
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'}));
  const a=document.createElement('a'); a.href=url;a.download='problem-framing-workbook.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function render() {
  const route=location.hash.split('/');
  const id=Number(route[2]);
  const m=modules.find(m=>m.id===id);
  let content;
  if(route[1]==='module' && m) content=modulePage(m,['lesson','practice','quiz'].includes(route[3])?route[3]:'lesson');
  else if(route[1]==='notebook')content=notebook();
  else if(route[1]==='sources')content=sourcePage();
  else content=overview();
  main.innerHTML=content;
  document.title=(m?m.title:'A course in problem framing')+' · Frame';
  updateProgress();
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu').setAttribute('aria-expanded','false');
  window.scrollTo(0,0);
  main.focus({preventScroll:true});
}
document.addEventListener('input', event=>{
  const el=event.target;
  if(el.matches('[data-answer]')){
    entry(el.dataset.module).answers[el.dataset.answer]=el.value;save();
    document.querySelector('#saved-'+el.dataset.answer).textContent=storageWorks?'Saved in this browser':'Export your work before leaving';
  }
  if(el.matches('#quiz-form input')){entry(el.closest('form').dataset.module).choices[el.name.slice(1)]=Number(el.value);save();}
});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.matches('[data-read]')){entry(el.dataset.read).read=el.checked;save();}
  if(el.matches('[data-review]')){entry(el.dataset.module).review[el.dataset.review]=el.checked;save();}
  if(el.matches('[data-rubric]')){const e=entry(11);e.rubric||={};if(el.value==='')delete e.rubric[el.dataset.rubric];else e.rubric[el.dataset.rubric]=Number(el.value);save();}
});
document.addEventListener('submit', event=>{
  if(event.target.id!=='quiz-form')return;
  event.preventDefault();
  const m=modules.find(m=>m.id===Number(event.target.dataset.module)); const e=entry(m.id);
  const data=new FormData(event.target);
  let score=0;
  m.quiz.forEach((q,i)=>{e.choices[i]=Number(data.get('q'+i));if(e.choices[i]===q.correct)score++;});
  e.result={score};e.best=Math.max(e.best||0,score);save();render();
});
document.addEventListener('click',event=>{
  const retry=event.target.closest('[data-retry]');
  if(retry){const e=entry(retry.dataset.retry);delete e.result;e.choices={};save();render();}
  if(event.target.closest('[data-export]'))exportWorkbook();
});
document.querySelector('#export').addEventListener('click',exportWorkbook);
document.querySelector('#print').addEventListener('click',()=>window.print());
document.querySelector('#menu').addEventListener('click',()=>{const open=document.querySelector('#sidebar').classList.toggle('open');document.querySelector('#menu').setAttribute('aria-expanded',String(open));});
window.addEventListener('hashchange',render);
render();

document.querySelector('.skip').addEventListener('click', event => { event.preventDefault(); main.focus(); main.scrollIntoView(); });
