/* ===================== core helpers ===================== */
const rint=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const sample=(a,n)=>shuffle(a).slice(0,n);
const range=(a,b)=>{const r=[];for(let i=a;i<=b;i++)r.push(i);return r;};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const okey=o=>typeof o==='object'?String(o.k??o.t??o.pic??o.html):String(o);
/* choice question: correct + distractors, deduped and shuffled */
function Q(prompt,correct,distractors,extra={}){
  const n=extra.n||4,seen=new Set([okey(correct)]),ds=[];
  for(const d of distractors){if(ds.length>=n-1)break;const k=okey(d);if(seen.has(k))continue;seen.add(k);ds.push(d);}
  const options=shuffle([correct,...ds]);
  return Object.assign({type:'choice',prompt,options,answer:options.indexOf(correct)},extra);
}
function numOpts(c,lo,hi,n=6){
  const s=new Set(),deltas=[1,-1,2,-2,3,-3,10,-10];let g=0;
  while(s.size<n&&g++<80){const d=c+pick(deltas);if(d>=lo&&d<=hi&&d!==c)s.add(d);}
  for(let x=lo;s.size<n&&x<=hi;x++)if(x!==c)s.add(x);
  return shuffle([...s]);
}
/* build n questions from a list of generators, avoiding repeats */
function mix(fns,n=10){
  const out=[],seen=new Set();let bag=[],tries=0;
  while(out.length<n&&tries<n*10){
    tries++;if(!bag.length)bag=shuffle(fns);
    const q=bag.pop()();if(!q)continue;
    const k=q.prompt+'|'+(q.visual||'')+'|'+(q.audio?q.audio.text:'')+'|'+(q.items||[]).join('/');
    if(seen.has(k))continue;seen.add(k);out.push(q);
  }
  return out;
}
/* read math prompts aloud in Vietnamese */
function spoken(t){return String(t).replace(/=\s*\?/g,'= mấy').replace(/☐/g,' mấy ').replace(/\+/g,' cộng ').replace(/−|-(?=\s*\d)/g,' trừ ').replace(/=/g,' bằng ').replace(/>/g,' lớn hơn ').replace(/</g,' bé hơn ').replace(/\s+/g,' ').trim();}

const DG=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function readVN(n){
  if(n<10)return DG[n];if(n===100)return 'một trăm';
  const t=Math.floor(n/10),u=n%10;const s=t===1?'mười':DG[t]+' mươi';if(!u)return s;
  let w=DG[u];if(u===5)w='lăm';else if(u===1&&t>1)w='mốt';else if(u===4&&t>1)w='tư';
  return s+' '+w;
}

/* custom drawn pictures where no emoji fits */
const ICONS={
  desk:`<svg viewBox="0 0 64 64"><rect x="5" y="16" width="54" height="8" rx="2" fill="#B5773A"/><rect x="9" y="24" width="6" height="32" fill="#8C5A2B"/><rect x="49" y="24" width="6" height="32" fill="#8C5A2B"/><rect x="27" y="24" width="22" height="15" fill="#C98A4B"/><circle cx="38" cy="31" r="2.2" fill="#5B3A1A"/></svg>`,
  gate:`<svg viewBox="0 0 64 64"><path d="M6 58V26Q32 6 58 26V58" fill="none" stroke="#2F6B3A" stroke-width="5"/><g stroke="#2F6B3A" stroke-width="4"><line x1="16" y1="22" x2="16" y2="58"/><line x1="26" y1="17" x2="26" y2="58"/><line x1="38" y1="17" x2="38" y2="58"/><line x1="48" y1="22" x2="48" y2="58"/><line x1="6" y1="42" x2="58" y2="42"/></g></svg>`,
  top:`<svg viewBox="0 0 64 64"><rect x="29" y="3" width="6" height="13" rx="2" fill="#8A4FD8"/><path d="M7 22Q32 10 57 22L35 58Q32 63 29 58Z" fill="#E0493B"/><path d="M11 28H53" stroke="#F5B301" stroke-width="5"/><path d="M19 40H45" stroke="#2F6FDB" stroke-width="5"/></svg>`
};
function picHTML(p){return String(p).startsWith('svg:')?`<span class="svgpic">${ICONS[p.slice(4)]}</span>`:p;}
const SPEAKER='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';

/* registry */
const L={};           // lessonId -> lesson
const SUBJ=[
  {id:'math',name:'Toán',glyph:'1+2',c:'var(--math)',s:'var(--math-s)',book:'Toán 1 · Kết nối tri thức',topics:[]},
  {id:'tv',name:'Tiếng Việt',glyph:'Aă',c:'var(--tv)',s:'var(--tv-s)',book:'Tiếng Việt 1 · Kết nối tri thức',topics:[]},
  {id:'en',name:'Tiếng Anh',glyph:'ABC',c:'var(--en)',s:'var(--en-s)',book:'Tiếng Anh 1 · Global Success',topics:[]},
  {id:'dd',name:'Đạo đức',glyph:'♥',c:'var(--dd)',s:'var(--dd-s)',book:'Đạo đức 1 · Kết nối tri thức',topics:[]}
];
const SUBJ_BY=Object.fromEntries(SUBJ.map(s=>[s.id,s]));
function topic(subj,name){const t={name,lessons:[]};SUBJ_BY[subj].topics.push(t);return t;}
function addLesson(t,subj,o){o.subj=subj;o.topic=t.name;L[o.id]=o;t.lessons.push(o.id);return o;}
