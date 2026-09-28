/* ===================== KHU VUI CHƠI SÁNG TẠO ===================== */
let G=null;
function stopGame(){if(!G)return;clearInterval(G.timer);clearInterval(G.spawn);clearTimeout(G.to);if(G.raf)cancelAnimationFrame(G.raf);G=null;}
const GAMES=[
  {id:'memory',name:'Lật thẻ tìm đôi',pic:'🃏',c:'var(--tv)',desc:'Lật 2 thẻ đi cùng nhau: hình và chữ, hoặc chấm và số.',modes:[['en','Tiếng Anh'],['tv','Tiếng Việt'],['math','Toán']]},
  {id:'pop',name:'Bắt bóng bay',pic:'🎈',c:'var(--dd)',desc:'Nghe cô đọc, chạm thật nhanh vào quả bóng đúng.',modes:[['en','Tiếng Anh'],['tv','Tiếng Việt'],['math','Toán']]},
  {id:'race',name:'Đua toán 60 giây',pic:'🏁',c:'var(--math)',desc:'Tính nhanh cộng, trừ. Con được bao nhiêu câu?',modes:[['10','Phạm vi 10'],['20','Phạm vi 20'],['100','Phạm vi 100']]},
  {id:'maker',name:'Tạo câu tiếng Anh',pic:'🪄',c:'var(--en)',desc:'Tự chọn hình, ghép thành câu, làm thành truyện của con.'},
  {id:'draw',name:'Góc vẽ sáng tạo',pic:'🎨',c:'#D6457A',desc:'Vẽ theo gợi ý, dán hình dán, lưu tranh vào bộ sưu tập.'}
];
const GBY=Object.fromEntries(GAMES.map(g=>[g.id,g]));
const rec=k=>(S.games||{})[k];
function setRec(k,v,better){S.games=S.games||{};const o=S.games[k];if(o===undefined||better(v,o)){S.games[k]=v;Store.commit();return true;}return false;}
function gamesHomeHTML(){
  return `<div class="sec-title"><h2>Khu vui chơi sáng tạo</h2><button class="chip" data-a="games" style="font-size:15px">Xem tất cả ›</button></div>
  <div class="gstrip">${GAMES.map(g=>`<button class="gmini" style="--c:${g.c}" data-a="game" data-g="${g.id}"><span class="e">${g.pic}</span><b>${esc(g.name)}</b></button>`).join('')}</div>`;
}
function vGames(){
  return `<button class="back" data-a="home">${BACK} Trang chính</button>
  <div class="hello"><div><h1>Khu vui chơi</h1><p>Chơi mà học, học mà chơi. Trò chơi không cộng hay trừ sao, con cứ chơi thoải mái nhé!</p></div></div>
  <div class="ggrid">${GAMES.map(g=>{let r='';if(g.id==='memory')r=['en','tv','math'].map(k=>rec('memory-'+k)).filter(x=>x!==undefined).length?`Kỷ lục: ${Math.min(...['en','tv','math'].map(k=>rec('memory-'+k)).filter(x=>x!==undefined))} lượt`:'';
    if(g.id==='pop'){const v=['en','tv','math'].map(k=>rec('pop-'+k)||0);if(Math.max(...v))r=`Kỷ lục: ${Math.max(...v)} quả`;}
    if(g.id==='race'){const v=['10','20','100'].map(k=>rec('race-'+k)||0);if(Math.max(...v))r=`Kỷ lục: ${Math.max(...v)} câu`;}
    if(g.id==='draw'){const n=loadDrawings().length;if(n)r=`${n} bức tranh`;}
    if(g.id==='maker'&&(S.story||[]).length)r=`Truyện có ${S.story.length} câu`;
    return `<button class="gcard" style="--c:${g.c}" data-a="game" data-g="${g.id}"><span class="e">${g.pic}</span><b>${esc(g.name)}</b><span class="muted">${esc(g.desc)}</span>${r?`<span class="chip ok">${r}</span>`:''}</button>`;}).join('')}</div>`;
}
function gHead(g){return `<button class="back" data-a="games">${BACK} Khu vui chơi</button><div class="les-head" style="--c:${g.c}"><div class="eyebrow">Trò chơi</div><h1>${g.pic} ${esc(g.name)}</h1></div>`;}
function vGame(){
  const g=GBY[NAV.g];if(!g)return vGames();
  if(g.id==='maker')return gHead(g)+makerHTML();
  if(g.id==='draw')return gHead(g)+drawHTML();
  if(!G||G.g!==g.id){
    return gHead(g)+`<div class="rule card" style="--c:${g.c}"><div class="big" aria-hidden="true">${g.pic}</div><h2>${esc(g.desc)}</h2><p class="muted" style="margin:0;font-weight:700">Con chọn loại muốn chơi:</p>
    <div class="row" style="justify-content:center">${g.modes.map(([k,n])=>`<button class="btn gold" data-a="gstart" data-m="${k}">${n}</button>`).join('')}</div></div>`;
  }
  if(g.id==='memory')return gHead(g)+memHTML();
  if(g.id==='pop')return gHead(g)+popHTML();
  if(g.id==='race')return gHead(g)+raceHTML();
  return '';
}
function mountGame(){if(NAV.g==='draw')drawMount();if(NAV.g==='pop'&&G&&G.g==='pop'&&!G.over&&!G.mounted){G.mounted=true;popMount();}}
function gameOver(title,line,lang,again){
  return `<div class="result">${teacher(line,line,lang)}<div class="big" style="font-size:64px" aria-hidden="true">🏆</div><h2>${esc(title)}</h2>
  <div class="row" style="justify-content:center"><button class="btn gold" data-a="gstart" data-m="${again}">Chơi lại</button><button class="btn ghost" data-a="gmode">Chọn loại khác</button><button class="btn ghost" data-a="games">Trò khác</button></div></div>`;
}

/* ---- 1. Memory ---- */
function memStart(kind){
  let pairs;
  if(kind==='en')pairs=sample(EN_ALL.filter(w=>!String(w.pic).startsWith('svg:')&&w.en.length<=8),6).map(w=>({a:picHTML(w.pic),b:w.en,say:w.en,lang:'en'}));
  else if(kind==='tv')pairs=sample(WB.filter(w=>w.syl.length===1&&!/\d/.test(w.e)),6).map(w=>({a:w.e,b:w.w,say:w.w,lang:'vi'}));
  else pairs=sample(range(1,10),6).map(n=>({a:`<span class="mdots">${'●'.repeat(n)}</span>`,b:String(n),say:readVN(n),lang:'vi'}));
  const cards=shuffle(pairs.flatMap((p,i)=>[{p:i,face:`<span class="mpic">${p.a}</span>`},{p:i,face:`<span class="mword">${esc(p.b)}</span>`}]));
  G={g:'memory',kind,pairs,cards,open:[],got:[],moves:0,lock:false};render();
  speak(kind==='en'?"Let's play! Find the pairs.":'Mình cùng lật thẻ tìm đôi nhé!',kind==='en'?'en':'vi');
}
function memHTML(){
  if(G.over)return gameOver(`Con tìm đủ ${G.pairs.length} đôi sau ${G.moves} lượt lật!`,G.line,G.kind==='en'?'en':'vi',G.kind);
  return `<div class="ghud"><span>Đã tìm: <b>${G.got.length}/${G.pairs.length}</b> đôi</span><span>Lượt lật: <b>${G.moves}</b></span></div>
  <div class="mgrid">${G.cards.map((c,i)=>{const up=G.open.includes(i)||G.got.includes(c.p);return `<button class="mcard ${up?'up':''} ${G.got.includes(c.p)?'got':''}" data-a="mem" data-i="${i}" aria-label="Thẻ ${i+1}">${up?c.face:'<span class="back-face">★</span>'}</button>`;}).join('')}</div>`;
}
function memFlip(i){
  if(!G||G.lock||G.over)return;const c=G.cards[i];if(G.got.includes(c.p)||G.open.includes(i))return;
  G.open.push(i);const p=G.pairs[c.p];speak(p.say,p.lang);
  if(G.open.length===2){G.moves++;const [a,b]=G.open;
    if(G.cards[a].p===G.cards[b].p){G.got.push(c.p);G.open=[];setTimeout(()=>chime(true),250);
      if(G.got.length===G.pairs.length){const best=setRec('memory-'+G.kind,G.moves,(v,o)=>v<o);G.over=true;
        G.line=G.kind==='en'?`Wonderful, ${KID}! You found all the pairs!${best?' A new record!':''}`:`Hoan hô ${KID}! Con tìm đủ các đôi rồi!${best?' Kỷ lục mới luôn!':''}`;
        setTimeout(()=>{if(G&&G.over){render();burst();speak(G.line,G.kind==='en'?'en':'vi');}},700);}}
    else{G.lock=true;G.to=setTimeout(()=>{if(!G)return;G.open=[];G.lock=false;render();},1100);}}
  render();
}

/* ---- 2. Balloon pop ---- */
const BCOL=['#E0493B','#2F6FDB','#F5B301','#23965A','#8A4FD8','#E0701A','#D6457A','#0F9A8F'];
function popPool(mode){
  if(mode==='en')return EN_ALL.filter(w=>!String(w.pic).startsWith('svg:')).map(w=>({k:w.en,face:w.pic,say:w.en,lang:'en'}));
  if(mode==='tv')return WB.filter(w=>!/\d/.test(w.e)).map(w=>({k:w.w,face:w.e,say:w.w,lang:'vi'}));
  return range(0,10).map(n=>({k:String(n),face:String(n),num:true}));
}
function popStart(mode){
  stopGame();G={g:'pop',mode,pool:popPool(mode),score:0,miss:0,left:45,bs:[],id:1,target:null,over:false};
  render();
}
function popMount(){
  popTarget();
  G.timer=setInterval(()=>{if(!G)return;G.left--;popHud();if(G.left<=0)popEnd();},1000);
  G.spawn=setInterval(popSpawn,900);popSpawn();popSpawn();
  let last=performance.now();const loop=t=>{if(!G||G.g!=='pop'||G.over)return;const dt=Math.min(.05,(t-last)/1000);last=t;const f=$('#popf');const H=f?f.clientHeight:500;
    G.bs=G.bs.filter(b=>{b.y+=b.v*dt;b.el.style.transform=`translateY(${-b.y}px)`;if(b.y>H+160){b.el.remove();return false;}return true;});G.raf=requestAnimationFrame(loop);};
  G.raf=requestAnimationFrame(loop);
}
function popTarget(){
  const m=G.mode;let t;
  if(m==='math'){const c=rint(0,10),a=rint(0,c),plus=Math.random()<.6;t=plus?{k:String(c),label:`${a} + ${c-a}`,say:`${a} cộng ${c-a}`,lang:'vi'}:(()=>{const x=rint(c,10);return {k:String(c),label:`${x} − ${x-c}`,say:`${x} trừ ${x-c}`,lang:'vi'};})();}
  else{const w=pick(G.pool);t={k:w.k,label:'🔊',say:w.say,lang:w.lang};}
  G.target=t;popHud();speak(m==='en'?`Pop the ${t.say}!`:m==='tv'?`Bắt quả bóng có hình ${t.say}`:`${t.say} bằng mấy?`,m==='en'?'en':'vi');
}
function popHud(){const h=$('#pophud');if(!h||!G)return;h.innerHTML=`<button class="ptarget" data-a="ptarget">${G.mode==='math'?`<b>${G.target.label} = ?</b>`:`${SPEAKER}<b>Nghe lại</b>`}</button><span>⭐ <b>${G.score}</b></span><span>⏱ <b>${G.left}</b>s</span>`;}
function popSpawn(){
  const f=$('#popf');if(!f||!G||G.over)return;
  const onScreen=G.bs.some(b=>b.k===G.target.k);
  const it=(!onScreen||Math.random()<.35)?G.pool.find(x=>x.k===G.target.k):pick(G.pool.filter(x=>x.k!==G.target.k));
  const el=document.createElement('button');el.className='balloon'+(it.num?' num':'');el.dataset.k=it.k;el.style.left=rint(2,78)+'%';el.style.setProperty('--bc',pick(BCOL));
  el.innerHTML=`<span>${picHTML(it.face)}</span>`;el.setAttribute('aria-label','bóng bay');f.appendChild(el);
  const y0=G.bs.length<3&&G.left>=44?rint(80,320):0;el.style.transform=`translateY(${-y0}px)`;G.bs.push({el,k:it.k,y:y0,v:rint(70,110)});
}
function popHit(el){
  if(!G||G.over||el.classList.contains('popped'))return;
  if(el.dataset.k===G.target.k){G.score++;el.classList.add('popped');chime(true);G.bs=G.bs.filter(b=>b.el!==el);setTimeout(()=>el.remove(),260);popTarget();}
  else{G.miss++;el.classList.add('wrongb');chime(false);setTimeout(()=>el.classList.remove('wrongb'),400);}
}
function popEnd(){
  if(!G||G.over)return;clearInterval(G.timer);clearInterval(G.spawn);G.over=true;
  const best=setRec('pop-'+G.mode,G.score,(v,o)=>v>o);
  G.line=G.mode==='en'?`Time's up! You popped ${G.score} balloons, ${KID}!${best?' A new record!':''}`:`Hết giờ rồi! ${KID} bắt được ${G.score} quả bóng!${best?' Kỷ lục mới luôn!':''}`;
  render();if(G.score)burst();speak(G.line,G.mode==='en'?'en':'vi');
}
function popHTML(){
  if(G.over)return gameOver(`Con bắt được ${G.score} quả bóng!`,G.line,G.mode==='en'?'en':'vi',G.mode);
  return `<div class="ghud" id="pophud"></div><div class="popf" id="popf" aria-label="Sân bóng bay"></div>`;
}

/* ---- 3. Math race ---- */
function raceStart(max){stopGame();G={g:'race',max:+max,score:0,wrong:0,left:60,q:null,flash:''};raceNext();render();
  speak('Chuẩn bị nào! Một, hai, ba, bắt đầu!');
  G.timer=setInterval(()=>{if(!G)return;G.left--;const t=$('#racet');if(t)t.textContent=G.left;const b=$('#raceb');if(b)b.style.width=(G.left/60*100)+'%';if(G.left<=0)raceEnd();},1000);}
function raceNext(){
  const m=G.max;let a,b,plus=Math.random()<.55,ans;
  if(m===100){if(plus){const t1=rint(1,8),t2=rint(0,8-t1),u1=rint(0,9),u2=rint(0,9-u1);a=t1*10+u1;b=t2*10+u2;if(b===0)b=rint(1,9-u1);ans=a+b;}else{const t1=rint(1,9),u1=rint(0,9);a=t1*10+u1;const t2=rint(0,t1),u2=rint(0,u1);b=t2*10+u2;if(b===0){b=u1?1:10;}ans=a-b;}}
  else{if(plus){a=rint(0,m-1);b=rint(1,m-a);ans=a+b;}else{a=rint(1,m);b=rint(0,a);ans=a-b;}}
  const opts=shuffle([ans,...numOpts(ans,0,m).slice(0,2)]);
  G.q={t:`${a} ${plus?'+':'−'} ${b}`,ans,opts};
}
function raceHTML(){
  if(G.over)return gameOver(`Con làm đúng ${G.score} câu trong 60 giây!`,G.line,'vi',String(G.max));
  return `<div class="ghud"><span>Đúng: <b>${G.score}</b></span><span>⏱ <b id="racet">${G.left}</b>s</span></div><div class="bar-prog" style="margin-bottom:14px"><i id="raceb" style="width:${G.left/60*100}%;background:var(--math)"></i></div>
  <div class="qcard race ${G.flash}"><div class="eq">${G.q.t} = <span class="slot">?</span></div><div class="opts" style="--cols:3">${G.q.opts.map(o=>`<button class="opt big" data-a="race" data-v="${o}"><span class="t">${o}</span></button>`).join('')}</div></div>`;
}
function raceAns(v){if(!G||G.over)return;if(v===G.q.ans){G.score++;G.flash='okf';chime(true);}else{G.wrong++;G.flash='nof';chime(false);}raceNext();render();}
function raceEnd(){if(!G||G.over)return;clearInterval(G.timer);G.over=true;const best=setRec('race-'+G.max,G.score,(v,o)=>v>o);
  G.line=`Hết giờ! ${KID} làm đúng ${G.score} câu.${best?' Kỷ lục mới luôn, giỏi quá!':' Con cố gắng lần sau nhanh hơn nhé!'}`;render();if(G.score)burst();speak(G.line);}

/* ---- 4. Sentence maker ---- */
const MAKER=EN.filter(u=>u.pat).map(u=>({tpl:u.pat[0],ws:u.pat[1],n:u.n}));
let MK={f:0,w:null};
function makerHTML(){
  const fr=MAKER[MK.f],sent=MK.w?fr.tpl.replace('{w}',MK.w):null;
  const story=S.story||[];
  return `${teacher("Let's make a sentence!","Let's make a sentence!",'en','1. Chọn khung câu · 2. Chọn hình · 3. Nghe cô đọc và thêm vào truyện của con')}
  <div class="sec-title"><h2>1. Chọn khung câu</h2></div><div class="chips">${MAKER.map((m,i)=>`<button class="fchip ${i===MK.f?'on':''}" data-a="mk-f" data-i="${i}">${esc(m.tpl.replace('{w}','___'))}</button>`).join('')}</div>
  <div class="sec-title"><h2>2. Chọn hình</h2></div><div class="exw">${fr.ws.map(w=>`<button class="${MK.w===w?'on':''}" data-a="mk-w" data-w="${esc(w)}"><span class="e">${picHTML(EN_PIC[w])}</span>${esc(w)}</button>`).join('')}</div>
  ${sent?`<div class="mkcard"><div class="pic-lg">${picHTML(EN_PIC[MK.w])}</div><div class="enpat" style="font-size:34px">${esc(sent)}</div><div class="row" style="justify-content:center">${sayBtn(sent,'en')}<button class="btn good" data-a="mk-add">Thêm vào truyện</button><button class="btn ghost" data-a="mk-rand">Ngẫu nhiên 🎲</button></div></div>`:`<div class="cta"><button class="btn ghost" data-a="mk-rand">Chọn ngẫu nhiên 🎲</button></div>`}
  <div class="sec-title"><h2>Truyện của ${KID}</h2>${story.length?`<span class="row">${sayBtn(story.map(x=>x.s).join(' '),'en')}<button class="chip" data-a="mk-clear">Xóa truyện</button></span>`:''}</div>
  ${story.length?`<ol class="story">${story.map(x=>`<li><span class="e">${picHTML(x.p)}</span>${esc(x.s)}</li>`).join('')}</ol>`:'<p class="muted">Truyện đang trống. Con tạo câu rồi bấm "Thêm vào truyện" nhé.</p>'}`;
}

/* ---- 5. Drawing corner ---- */
const DKEY='minhan-drawings';
function loadDrawings(){try{return JSON.parse(localStorage.getItem(DKEY)||'[]');}catch(e){return [];}}
function saveDrawings(a){try{localStorage.setItem(DKEY,JSON.stringify(a));return true;}catch(e){return false;}}
const DIDEAS=['Vẽ gia đình của con','Vẽ món quà con muốn đổi bằng sao','Vẽ ngôi trường của con','Vẽ con vật con thích nhất','Vẽ bầu trời có cầu vồng','Draw a cat 🐱','Draw a big red apple 🍎','Draw the sun and a tree ☀️🌳','Vẽ 5 quả táo và 3 quả cam','Vẽ một hình tròn, một hình vuông, một hình tam giác','Vẽ bữa cơm tối nhà con','Vẽ con đang đi học'];
const DCOL=['#1F2A5C','#E0493B','#F08A24','#F5B301','#23965A','#0F9A8F','#2F6FDB','#8A4FD8','#D6457A','#8C5A2B','#FFFFFF'];
const STICK=['⭐','🌸','🐱','🐶','🌈','☀️','🍦','🎈','🏠','🌳','🦋','❤️'];
let DR={c:'#1F2A5C',w:10,tool:'pen',st:null,idea:DIDEAS[0]};
function drawHTML(){
  const gal=loadDrawings();
  return `<div class="dideas"><span class="teacher" style="flex:1"><span class="ava" aria-hidden="true">👩‍🏫</span><span class="bubble" id="didea">${esc(DR.idea)}</span></span><button class="btn ghost" data-a="d-idea">Gợi ý khác 🎲</button></div>
  <div class="dtools">
    <div class="row" style="gap:6px">${DCOL.map(c=>`<button class="dcol ${DR.tool==='pen'&&DR.c===c?'on':''}" style="--dc:${c}" data-a="d-col" data-c="${c}" aria-label="Màu"></button>`).join('')}</div>
    <div class="row" style="gap:6px">${[5,10,20].map(w=>`<button class="dsize ${DR.w===w?'on':''}" data-a="d-size" data-w="${w}" aria-label="Nét ${w}"><i style="width:${w}px;height:${w}px"></i></button>`).join('')}
      <button class="dtool ${DR.tool==='eraser'?'on':''}" data-a="d-eraser">Tẩy</button></div>
    <div class="row" style="gap:6px">${STICK.map(s=>`<button class="dstick ${DR.tool==='stick'&&DR.st===s?'on':''}" data-a="d-stick" data-s="${s}">${s}</button>`).join('')}</div>
  </div>
  <div class="dwrap"><canvas id="dcv" width="1000" height="640" aria-label="Tờ giấy vẽ"></canvas></div>
  <div class="row" style="justify-content:center;margin-top:12px"><button class="btn good" data-a="d-save">Lưu tranh</button><span id="dclr"><button class="btn ghost" data-a="d-clear">Vẽ tờ mới</button></span></div>
  <div class="sec-title"><h2>Bộ sưu tập tranh của ${KID}</h2><span class="muted" style="font-weight:700">${gal.length} bức</span></div>
  ${gal.length?`<div class="gal">${gal.map((g,i)=>`<button class="gitem" data-a="d-view" data-i="${i}"><img src="${g.img}" alt="${esc(g.idea)}"><span>${esc(g.date)}</span></button>`).join('')}</div>`:'<p class="muted">Chưa có bức tranh nào. Con vẽ rồi bấm "Lưu tranh" nhé!</p>'}
  <p class="muted" style="font-size:14px">Tranh được lưu trên máy này (tối đa 12 bức mới nhất).</p>`;
}
function drawMount(){
  const cv=$('#dcv');if(!cv)return;const ctx=cv.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);ctx.lineCap='round';ctx.lineJoin='round';
  let down=false,lx=0,ly=0;
  const pos=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height];};
  cv.addEventListener('pointerdown',e=>{const [x,y]=pos(e);
    if(DR.tool==='stick'){ctx.font='72px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(DR.st,x,y);chime(true);return;}
    down=true;lx=x;ly=y;cv.setPointerCapture(e.pointerId);ctx.beginPath();ctx.fillStyle=DR.tool==='eraser'?'#fff':DR.c;ctx.arc(x,y,DR.w/2*(DR.tool==='eraser'?2.5:1),0,Math.PI*2);ctx.fill();});
  cv.addEventListener('pointermove',e=>{if(!down)return;const [x,y]=pos(e);ctx.strokeStyle=DR.tool==='eraser'?'#fff':DR.c;ctx.lineWidth=DR.w*(DR.tool==='eraser'?2.5:1);ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(x,y);ctx.stroke();lx=x;ly=y;});
  const up=()=>{down=false;};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);cv.addEventListener('pointerleave',up);
}
function drawToolsRefresh(){document.querySelectorAll('.dcol').forEach(b=>b.classList.toggle('on',DR.tool==='pen'&&b.dataset.c===DR.c));document.querySelectorAll('.dsize').forEach(b=>b.classList.toggle('on',+b.dataset.w===DR.w));
  document.querySelectorAll('.dstick').forEach(b=>b.classList.toggle('on',DR.tool==='stick'&&b.dataset.s===DR.st));const e=document.querySelector('[data-a="d-eraser"]');if(e)e.classList.toggle('on',DR.tool==='eraser');}
function drawSave(){
  const cv=$('#dcv');if(!cv)return;const sm=document.createElement('canvas');sm.width=500;sm.height=320;sm.getContext('2d').drawImage(cv,0,0,500,320);
  const img=sm.toDataURL('image/jpeg',.7);const d=new Date();const a=loadDrawings();a.unshift({img,idea:DR.idea,date:`${d.getDate()}/${d.getMonth()+1}`});
  if(!saveDrawings(a.slice(0,12))){toast('Máy hết chỗ lưu tranh. Bố mẹ xóa bớt tranh cũ nhé.');return;}
  burst();speak(`Đẹp quá! Cô đã cất tranh của ${KID} vào bộ sưu tập rồi nhé!`);
  const keep=cv.toDataURL();render();const nc=$('#dcv');if(nc){const im=new Image();im.onload=()=>nc.getContext('2d').drawImage(im,0,0);im.src=keep;}
}

/* ---- game events ---- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,ds=b.dataset;
  switch(a){
    case 'games':stopGame();go({v:'games'});break;
    case 'game':stopGame();go({v:'game',g:ds.g});break;
    case 'gmode':stopGame();render();break;
    case 'gstart':{const g=NAV.g,m=ds.m;if(g==='memory')memStart(m);else if(g==='pop')popStart(m);else if(g==='race')raceStart(m);break;}
    case 'mem':memFlip(+ds.i);break;
    case 'ptarget':if(G&&G.target)speak(G.mode==='en'?G.target.say:G.target.say,G.target.lang);break;
    case 'race':raceAns(+ds.v);break;
    case 'mk-f':MK={f:+ds.i,w:null};render();speak(MAKER[+ds.i].tpl.replace('{w}','...'),'en');break;
    case 'mk-w':MK.w=ds.w;render();speak(MAKER[MK.f].tpl.replace('{w}',MK.w),'en');break;
    case 'mk-rand':{MK.f=rint(0,MAKER.length-1);MK.w=pick(MAKER[MK.f].ws);render();speak(MAKER[MK.f].tpl.replace('{w}',MK.w),'en');break;}
    case 'mk-add':{if(!MK.w)return;S.story=S.story||[];S.story.push({s:MAKER[MK.f].tpl.replace('{w}',MK.w),p:EN_PIC[MK.w]});S.story=S.story.slice(-12);Store.commit();chime(true);render();speak(`Great story, ${KID}!`,'en');break;}
    case 'mk-clear':S.story=[];Store.commit();render();break;
    case 'd-idea':DR.idea=pick(DIDEAS.filter(x=>x!==DR.idea));$('#didea').textContent=DR.idea;speak(DR.idea.replace(/[^\p{L}\p{N}\s,.!]/gu,''),/^Draw/.test(DR.idea)?'en':'vi');break;
    case 'd-col':DR.c=ds.c;DR.tool='pen';drawToolsRefresh();break;
    case 'd-size':DR.w=+ds.w;if(DR.tool!=='pen'&&DR.tool!=='eraser')DR.tool='pen';drawToolsRefresh();break;
    case 'd-eraser':DR.tool='eraser';drawToolsRefresh();break;
    case 'd-stick':DR.tool='stick';DR.st=ds.s;drawToolsRefresh();toast('Chạm lên tờ giấy để dán hình');break;
    case 'd-clear':$('#dclr').innerHTML='<span style="font-weight:800">Xóa tranh đang vẽ?</span> <button class="btn bad" data-a="d-clear2">Xóa</button> <button class="btn ghost" data-a="d-clear0">Thôi</button>';break;
    case 'd-clear0':$('#dclr').innerHTML='<button class="btn ghost" data-a="d-clear">Vẽ tờ mới</button>';break;
    case 'd-clear2':render();break;
    case 'd-save':drawSave();break;
    case 'd-view':{const g=loadDrawings()[+ds.i];if(!g)return;modal(`<h2>${esc(g.idea)}</h2><img src="${g.img}" alt="" style="width:100%;border-radius:14px;border:2px solid var(--line)"><p class="muted">Vẽ ngày ${esc(g.date)}</p><button class="btn bad" data-a="d-del" data-i="${ds.i}">Xóa tranh này</button><button class="btn ghost" data-a="modal-close">Đóng</button>`);break;}
    case 'd-del':{const a2=loadDrawings();a2.splice(+ds.i,1);saveDrawings(a2);closeModal();render();break;}
  }
});
document.addEventListener('pointerdown',e=>{const bl=e.target.closest('.balloon');if(bl){e.preventDefault();popHit(bl);}});

/* ---------- boot ---------- */
(function boot(){const loc=loadLocal();if(loc)S=migrate(loc);render();resumeQuiz();Store.init().then(()=>{if(NAV.v==='home')resumeQuiz();});})();
