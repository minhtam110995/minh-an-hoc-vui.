/* ===================== APP ===================== */
const STAR_SVG='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="#F5B301" stroke="#B98200" stroke-width="1.2" stroke-linejoin="round" d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';
const GIFT='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#E0493B" d="M3 10h18v4H3z"/><path fill="#F5B301" d="M4 14h16v7H4z"/><path fill="#1F2A5C" d="M11 10h2v11h-2z"/><path fill="none" stroke="#1F2A5C" stroke-width="1.8" d="M12 10C9 4 5 6 7.5 9M12 10c3-6 7-4 4.5-1"/></svg>';
const LOCK='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="3" fill="#1F2A5C"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#1F2A5C" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.8" fill="#F5B301"/></svg>';
const BACK='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const $=s=>document.querySelector(s);

const TIERS=[{n:'Mầm',cost:20,c:'#23965A'},{n:'Chồi',cost:40,c:'#0F9A8F'},{n:'Cây',cost:70,c:'#2F6FDB'},{n:'Hoa',cost:120,c:'#8A4FD8'},{n:'Quả ngọt',cost:250,c:'#E0701A'}];
const DEFAULT_REWARDS=[['r1',0,'Đi ăn kem','🍦'],['r2',0,'Chọn phim tối cuối tuần','🎬'],['r3',0,'Bố mẹ đọc thêm 1 truyện','📖'],
 ['r4',1,'Đi ăn bánh mì chảo','🍳'],['r5',1,'Đi nhà sách chọn 1 cuốn','📚'],['r6',1,'Khu vui chơi trong nhà','🎠'],
 ['r7',2,'Đi ăn nướng','🍢'],['r8',2,'Đi ăn lẩu','🍲'],['r9',2,'Xem phim ở rạp','🍿'],['r10',2,'Đi bể bơi','🏊'],
 ['r11',3,'Đi sở thú','🦁'],['r12',3,'Đi thủy cung','🐠'],['r13',3,'Làm bánh cùng bố mẹ','🧁'],
 ['r14',4,'Dã ngoại cả ngày','🧺'],['r15',4,'Công viên nước','🌊'],['r16',4,'Chuyến đi xa 1 ngày','🚗']].map(([id,tier,name,pic])=>({id,tier,name,pic}));
const PASS=80,WIN=3,LOSE=1;

const todayStr=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmtDate=iso=>{const d=new Date(iso);return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;};
function fresh(){return {games:{},story:[],v:1,rev:0,stars:0,earned:0,spent:0,pin:'1234',pinSet:false,autoRead:true,lessons:{},challenges:{},vouchers:[],rewards:DEFAULT_REWARDS.map(r=>({...r})),history:[],streak:{n:0,last:''},lastLesson:null,quiz:null,voiceVi:'',voiceEn:''};}
const migrate=d=>Object.assign(fresh(),d||{});
let S=fresh();

function addStars(delta,text){
  let a=delta;if(delta<0)a=-Math.min(S.stars,-delta);
  S.stars+=a;if(a>0)S.earned+=a;
  S.history.unshift({d:new Date().toISOString(),t:text,s:a,want:delta});S.history=S.history.slice(0,150);
  return a;
}
function touchStreak(){const t=todayStr();if(S.streak.last===t)return;const y=new Date();y.setDate(y.getDate()-1);S.streak.n=(S.streak.last===todayStr(y))?S.streak.n+1:1;S.streak.last=t;}
const streakNow=()=>{const t=todayStr(),y=new Date();y.setDate(y.getDate()-1);return (S.streak.last===t||S.streak.last===todayStr(y))?S.streak.n:0;};

/* ---------- storage: artifact db when available, device storage as backup ---------- */
const LSKEY='minhan-hocvui-v1';
function saveLocal(){try{localStorage.setItem(LSKEY,JSON.stringify(S));}catch(e){}}
function loadLocal(){try{const r=localStorage.getItem(LSKEY);return r?JSON.parse(r):null;}catch(e){return null;}}
const Store={ref:null,mode:'local',saving:false,again:false,
  async init(){
    try{
      if(!window.claude||!window.claude.use)return;
      const db=await window.claude.use('db');if(!db)return;
      this.ref=db.doc('app/minhan');
      const snap=await this.ref.get();
      if(snap.exists){const d=snap.data();if((d.rev||0)>=(S.rev||0)){S=migrate(JSON.parse(JSON.stringify(d)));saveLocal();refresh();}else this.save();}
      else this.save();
      this.mode='cloud';refresh();
      this.ref.onSnapshot(s=>{if(!s.exists||s.metadata.hasPendingWrites)return;const d=s.data();if((d.rev||0)>(S.rev||0)){S=migrate(JSON.parse(JSON.stringify(d)));saveLocal();refresh();}},()=>{});
    }catch(e){}
  },
  commit(){S.rev=(S.rev||0)+1;saveLocal();this.save();},
  async save(){
    if(!this.ref)return;if(this.saving){this.again=true;return;}
    this.saving=true;
    try{await this.ref.set(JSON.parse(JSON.stringify(S)));this.mode='cloud';}
    catch(e){if(e&&e.code==='unavailable')setTimeout(()=>this.save(),1500);else if(e&&e.code==='invalid_argument')this.mode='local';}
    this.saving=false;if(this.again){this.again=false;this.save();}
  }
};

/* ---------- sound ---------- */
let VOICES=[];
function loadVoices(){try{const v=speechSynthesis.getVoices();if(v&&v.length)VOICES=v;}catch(e){}}
if('speechSynthesis' in window){loadVoices();try{speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}setTimeout(loadVoices,600);setTimeout(loadVoices,2500);}
/* prefer warm female voices; enhanced/natural versions first */
const VPREF={vi:['hoaimy','linh','google tiếng việt','tiếng việt','vi-vn-x-gft','vi-vn-x-vic','vi-vn-x-vif','vi-vn-language','female'],
  en:['samantha','ava','allison','susan','zoe','nicky','karen','tessa','serena','jenny','aria','michelle','zira','google us english','google uk english female','en-us-x-sfg','en-us-x-tpc','en-us-x-iol','en-us-language','female']};
const VMALE=/\b(male|nam|namminh|minh|daniel|alex|fred|thomas|david|mark|guy|ryan|oliver|george|aaron|arthur|rishi|tom|evan|nathan|reed|rocko|grandpa|eddy|christopher|eric|roger|steffan|andrew|brian|james|william|liam|jacob|noah|gordon|lee|junior|ralph|albert|bruce|bahh|trinoids|zarvox|whisper|bells|boing|bubbles|cellos|superstar|jester|organ)\b|microsoft an\b|x-vid|x-vie|x-iom|x-iob|x-tpd|x-iol-local-male/i;
const VFEMALE=/female|\bnữ\b|hoaimy|linh|samantha|ava|allison|susan|zoe|nicky|karen|tessa|serena|jenny|aria|michelle|zira|moira|fiona|victoria|kathy|shelley|sandy|flo|grandma|x-gft|x-vif|x-sfg|x-tpc|x-iog|google/i;
const isMaleVoice=v=>VMALE.test(v.name||'')&&!/female/i.test(v.name||'');
function voiceList(lang){if(!VOICES.length)loadVoices();const pre=lang==='en'?['en-us','en-gb','en-au','en-ca','en-ie','en-nz','en']:['vi-vn','vi'];return VOICES.filter(v=>{const l=(v.lang||'').replace('_','-').toLowerCase();return pre.some(p=>l.startsWith(p));});}
function voiceScore(v,lang){const n=(v.name||'').toLowerCase(),l=(v.lang||'').replace('_','-').toLowerCase();let sc=0;VPREF[lang].forEach((f,i)=>{if(n.includes(f))sc+=60-i*2;});
  if(/enhanced|premium|natural|neural|nâng cao|cao cấp/.test(n))sc+=35;if(VFEMALE.test(n))sc+=40;if(isMaleVoice(v))sc-=500;if(lang==='en'&&l.startsWith('en-us'))sc+=12;if(lang==='vi'&&l.startsWith('vi-vn'))sc+=5;return sc;}
function pickVoice(lang){const list=voiceList(lang);if(!list.length)return null;const want=lang==='en'?S.voiceEn:S.voiceVi;if(want){const v=list.find(x=>x.name===want);if(v&&!isMaleVoice(v))return v;}return list.slice().sort((a,b)=>voiceScore(b,lang)-voiceScore(a,lang))[0];}
/* speak a list of [text, lang] pieces one after another, each in its own voice */
function sayParts(parts){
  if(!('speechSynthesis' in window))return;
  try{speechSynthesis.cancel();
    parts.forEach(p=>{if(!p||!p[0]||!String(p[0]).trim())return;const [t,lang]=p;const u=new SpeechSynthesisUtterance(lang==='vi'?spoken(t):t);
      u.lang=lang==='en'?'en-US':'vi-VN';const v=pickVoice(lang);if(v)u.voice=v;u.rate=lang==='en'?.8:.92;
      u.pitch=(!v||isMaleVoice(v))?1.45:(VFEMALE.test(v.name||'')?1.1:1.25);speechSynthesis.speak(u);});
  }catch(e){}
}
/* in English lessons: words in "quotes" or (parentheses), or plain-English sentences, are read with the English voice */
function mixParts(text,enMode){
  if(!enMode)return [[text,'vi']];
  const out=[];String(text).split(/("[^"]+"|\([A-Za-z][^)]*\))/).forEach(seg=>{if(!seg||!seg.trim())return;const m=seg.match(/^"(.+)"$|^\((.+)\)$/);
    if(m)out.push([m[1]||m[2],'en']);else if(/^[\x00-\x7F]+$/.test(seg)&&/[A-Za-z]{2}/.test(seg))out.push([seg,'en']);else out.push([seg,'vi']);});
  return out;
}
function speak(text,lang='vi'){if(text)sayParts([[text,lang]]);}
const KID='Minh An';
const T_OK=['Giỏi quá Minh An ơi!','Đúng rồi! Con giỏi lắm!','Chính xác! Cô khen con nè!','Hoan hô Minh An!','Tuyệt vời! Con thông minh quá!','Đúng rồi, con làm tốt lắm!'];
const T_OK_EN=['Excellent!','Good job!','Well done!','Great!','Super!'];
const T_NO=['Chưa đúng rồi, không sao đâu con.','Ôi, suýt nữa thì đúng rồi!','Chưa đúng con ạ, mình nhớ nhé.','Không sao, sai thì mình học tiếp nha con.'];
const T_INTRO=['Cô hỏi nè.','Câu tiếp theo nhé con.','Con nghe cô hỏi nhé.','Mình cùng làm câu này nào.','Con cố lên nhé.'];
const teacher=(text,sayText,lang,sub)=>`<div class="teacher"><span class="ava" aria-hidden="true">👩‍🏫</span><div class="bubble">${esc(text)}${sub?`<span class="qsub">${esc(sub)}</span>`:''}</div>${sayText?`<button class="say sm" data-a="say" data-lang="${lang==='en'?'en':'vi'}" data-say="${esc(sayText)}" aria-label="Nghe cô nói">${SPEAKER}</button>`:''}</div>`;
let AC=null;
function chime(ok){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;(ok?[660,880,1175]:[330,247]).forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=ok?'sine':'triangle';o.frequency.value=f;const s=t+i*.11;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.22,s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+.28);o.connect(g).connect(AC.destination);o.start(s);o.stop(s+.3);});}catch(e){}}
function burst(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const b=document.createElement('div');b.className='burst';for(let i=0;i<26;i++){const s=document.createElement('span');s.textContent=pick(['⭐','🌟','✨','🎉']);s.style.left=Math.random()*100+'%';s.style.animationDelay=(Math.random()*.6)+'s';b.appendChild(s);}document.body.appendChild(b);setTimeout(()=>b.remove(),2800);}
let toastT=null;
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2600);}

/* ---------- helpers for progress ---------- */
const lessonRec=id=>S.lessons[id];
const passed=id=>(S.lessons[id]?.best||0)>=PASS;
const subjLessons=s=>SUBJ_BY[s].topics.flatMap(t=>t.lessons);
const allLessons=()=>SUBJ.flatMap(s=>subjLessons(s.id));
const rewardCost=r=>TIERS[r.tier].cost;
function starsBadge(n){return `<span class="pill">${STAR_SVG}<span>${n}</span></span>`;}

/* ---------- navigation ---------- */
let NAV={v:'home'},QZ=null,PARENT=false,PIN=null;
function go(n){
  if(QZ&&!QZ.done&&QZ.res.length>0&&!(n.v==='lesson'&&n.id===QZ.id&&n.tab==='practice')){confirmQuit(()=>go(n));return;}
  if(!(n.v==='lesson'&&n.tab==='practice')){if(QZ&&!QZ.done&&S.quiz){S.quiz=null;Store.commit();}QZ=null;}
  if(n.v!=='parent')PARENT=false;
  if(typeof stopGame==='function')stopGame();
  NAV=n;render();window.scrollTo(0,0);
}
function refresh(){renderTop();if(!(NAV.v==='lesson'&&QZ)&&NAV.v!=='game')render();}
function render(){
  renderTop();
  const v=NAV.v;let h='';
  if(v==='home')h=vHome();else if(v==='subj')h=vSubj();else if(v==='lesson')h=vLesson();else if(v==='rewards')h=vRewards();else if(v==='parent')h=vParent();else if(v==='games')h=vGames();else if(v==='game')h=vGame();
  $('#view').innerHTML=h;if(v==='game')mountGame();
}
function renderTop(){
  $('#topbar').innerHTML=`<button class="brand" data-a="home" aria-label="Về trang chính"><span class="seal">★</span><span>Minh An<small>Học vui · Đổi quà</small></span></button>
  ${starsBadge(S.stars)}
  <button class="icon-btn" data-a="rewards">${GIFT}<span class="lb">Đổi quà</span></button>
  <button class="icon-btn" data-a="parent">${LOCK}<span class="lb">Bố mẹ</span></button>`;
}

/* ---------- HOME ---------- */
function greet(){const h=new Date().getHours();return h<11?'Chào buổi sáng! Hôm nay con muốn học gì?':h<14?'Buổi trưa vui vẻ! Học một bài nhỏ nhé?':h<18?'Buổi chiều rồi, cùng học một chút nào!':'Buổi tối rồi. Học một bài rồi đi ngủ sớm nhé!';}
function vHome(){
  const st=streakNow();
  const next=TIERS.find(t=>t.cost>S.stars);const can=TIERS.filter(t=>t.cost<=S.stars).pop();
  let goal='';
  if(can){const rs=S.rewards.filter(r=>r.tier===TIERS.indexOf(can));goal+=`<div class="t"><span>Con đủ sao đổi quà mốc <b style="color:${can.c}">${can.n}</b> rồi! ${rs.map(r=>r.pic).join(' ')}</span><button class="btn gold" data-a="rewards" style="min-height:44px;font-size:17px">Xem quà</button></div>`;}
  if(next){const rs=S.rewards.filter(r=>r.tier===TIERS.indexOf(next));const p=Math.min(100,Math.round(S.stars/next.cost*100));
    goal+=`<div class="t"><span>Còn <b>${next.cost-S.stars} sao</b> nữa đến mốc <b style="color:${next.c}">${next.n}</b> (${next.cost} sao)</span><span class="big" aria-hidden="true">${rs.slice(0,3).map(r=>r.pic).join('')}</span></div><div class="bar-prog" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;}
  let h=`<section class="hello"><div><h1>Chào Minh An!</h1><p>${greet()}</p></div>${st?`<span class="chip try" style="font-size:16px;padding:6px 12px">🔥 ${st} ngày liền</span>`:''}</section>
  <section class="goal">${goal}<div class="muted" style="font-size:15px;font-weight:700">Mỗi bài: đúng từ 80% trở lên được +${WIN} sao · dưới 80% bị −${LOSE} sao.</div></section>
  <section class="subjects">${SUBJ.map(s=>{const ls=subjLessons(s.id),d=ls.filter(passed).length,p=Math.round(d/ls.length*100);
    return `<button class="subj" style="--c:${s.c}" data-a="subj" data-s="${s.id}"><span class="glyph">${s.glyph}</span><span><h2>${s.name}</h2><div class="meta">${d}/${ls.length} bài đã đạt · ${esc(s.book.split(' · ')[1])}</div><div class="bar-prog"><i style="width:${p}%"></i></div></span></button>`;}).join('')}</section>${gamesHomeHTML()}`;
  if(S.lastLesson&&L[S.lastLesson]){const l=L[S.lastLesson],sj=SUBJ_BY[l.subj];const nxt=passed(l.id)?nextLesson(l.id):l.id;const nl=L[nxt];
    if(nl)h+=`<div class="sec-title"><h2>${passed(l.id)?'Bài tiếp theo':'Học tiếp'}</h2></div><button class="task" style="--c:${SUBJ_BY[nl.subj].c}" data-a="lesson" data-id="${nl.id}"><i class="dot"></i><span><b>${esc(nl.title)}</b><span>${SUBJ_BY[nl.subj].name} · ${esc(nl.topic)}</span></span><span class="chip">Vào học ›</span></button>`;}
  const todo=Object.entries(S.challenges).filter(([id,c])=>c.st==='todo'&&L[id]);
  if(todo.length){h+=`<div class="sec-title"><h2>Thử thách ngoài đời đang chờ</h2><span class="muted" style="font-weight:700">${todo.length} việc</span></div>`+todo.map(([id])=>{const l=L[id];return `<button class="task" style="--c:${SUBJ_BY[l.subj].c}" data-a="lesson" data-id="${id}" data-t="real"><i class="dot"></i><span><b>${esc(l.real)}</b><span>${SUBJ_BY[l.subj].name} · ${esc(l.title)}</span></span><span class="chip try">+${WIN} sao</span></button>`;}).join('');}
  h+=`<p class="save-note">${Store.mode==='cloud'?'Tiến độ được lưu vào tài khoản của bố mẹ, mở trên máy khác vẫn thấy.':'Tiến độ đang được lưu trên máy này.'}</p>`;
  return h;
}
function nextLesson(id){const l=L[id],ls=subjLessons(l.subj);const i=ls.indexOf(id);for(let k=1;k<=ls.length;k++){const c=ls[(i+k)%ls.length];if(!passed(c))return c;}return ls[(i+1)%ls.length];}

/* ---------- SUBJECT ---------- */
function vSubj(){
  const s=SUBJ_BY[NAV.s];
  let h=`<button class="back" data-a="home">${BACK} Trang chính</button><div class="subj-head" style="--c:${s.c}"><span class="glyph">${s.glyph}</span><div><h1>${s.name}</h1><div class="muted" style="font-weight:700">${esc(s.book)}</div></div></div>`;
  s.topics.forEach((t,ti)=>{
    h+=`<section class="topic" style="--c:${s.c}"><h3><span class="n">Chủ đề ${ti+1}</span>${esc(t.name)}</h3><div class="lessons">${t.lessons.map(id=>{const l=L[id],r=lessonRec(id),ch=S.challenges[id];
      let chip=r?(passed(id)?`<span class="chip ok">✓ Đạt ${r.best}%</span>`:`<span class="chip try">Cao nhất ${r.best}%</span>`):`<span class="chip">Chưa học</span>`;
      if(ch&&ch.st==='done')chip+=`<span class="chip ok">🏅 Ngoài đời</span>`;else if(ch&&ch.st==='todo')chip+=`<span class="chip try">Thử thách đang chờ</span>`;
      return `<button class="les ${passed(id)?'done':''}" data-a="lesson" data-id="${id}"><b>${esc(l.title)}</b>${l.sub?`<span class="muted" style="font-size:14px;font-weight:700">${esc(l.sub)}</span>`:''}<span class="row">${chip}</span></button>`;}).join('')}</div></section>`;
  });
  return h;
}

/* ---------- LESSON ---------- */
function vLesson(){
  const l=L[NAV.id],s=SUBJ_BY[l.subj],tab=NAV.tab||'learn';
  let h=`<div style="--c:${s.c}"><button class="back" data-a="subj" data-s="${s.id}">${BACK} ${s.name}</button>
  <div class="les-head"><div class="eyebrow">${s.name} · ${esc(l.topic)}</div><h1>${esc(l.title)}</h1>${l.sub?`<div class="muted" style="font-weight:800">${esc(l.sub)}</div>`:''}</div>
  <div class="tabs" role="tablist">${[['learn','Học'],['practice','Luyện tập'],['real','Ngoài đời']].map(([k,n],i)=>`<button role="tab" aria-selected="${tab===k}" class="${tab===k?'on':''}" data-a="tab" data-t="${k}"><span class="n">${i+1}</span>${n}</button>`).join('')}</div>`;
  if(tab==='learn')h+=learnHTML(l);else if(tab==='practice')h+=practiceHTML(l);else h+=realHTML(l);
  return h+'</div>';
}
const sayBtn=(text,lang='vi',sm)=>`<button class="say ${sm?'sm':''}" data-a="say" data-say="${esc(text)}" data-lang="${lang}" aria-label="Nghe">${SPEAKER}</button>`;
function learnHTML(l){
  let cards='';
  if(l.learn)cards=l.learn.map(c=>`<div class="lcard"><div class="top"><p>${esc(c.t)}</p>${sayBtn(c.say||c.t)}</div>${c.v?`<div class="visual">${c.v}</div>`:''}</div>`).join('');
  else if(l.units){cards=tvLearn(l.units,l.label).map(c=>`<div class="lcard"><div class="top"><span class="unit">${c.unit}</span>${sayBtn(c.say)}</div>${c.ex.length?`<div class="exw">${c.ex.map(w=>`<button data-a="say" data-say="${esc(w.w)}"><span class="e">${w.e}</span>${esc(w.w)}</button>`).join('')}</div>`:'<p class="muted" style="font-size:16px">Nghe cô đọc mẫu và đọc theo nhé.</p>'}</div>`).join('');}
  else if(l.learnTone){cards=`<div class="lcard" style="grid-column:1/-1"><div class="top"><p>Tiếng Việt có 6 thanh. Chạm vào từng tiếng để nghe.</p>${sayBtn('ma, mà, má, mả, mã, mạ')}</div><div class="exw">${TONE_SETS[0].map((w,i)=>`<button data-a="say" data-say="${w}"><span class="e" style="font-family:var(--display);font-weight:800">${w}</span>${TONE_SIGN[TONE_ORDER[i]].split(' (')[0]}</button>`).join('')}</div></div>`;}
  else if(l.learnSpell){cards=[['k','Viết k trước e, ê, i: kem, kéo, kính. Còn lại viết c: cá, cua, cây.'],['gh','Viết gh trước e, ê, i: ghế, ghim. Còn lại viết g: gà, gấu, gỗ.'],['ngh','Viết ngh trước e, ê, i: nghé, nghĩ. Còn lại viết ng: ngựa, ngô, ngủ.']].map(([u,t])=>`<div class="lcard"><div class="top"><span class="unit">${u}</span>${sayBtn(t)}</div><p>${t}</p></div>`).join('');}
  else if(l.read){cards=l.read.ps.map(p=>`<div class="lcard" style="grid-column:1/-1"><div class="passage"><h4>${esc(p.t)}${sayBtn(p.t+'. '+p.x)}</h4>${esc(p.x)}</div></div>`).join('');}
  else if(l.en){const u=l.en;cards=`<div class="lcard"><div class="top"><span class="unit">${u.L} ${u.L.toLowerCase()}</span>${sayBtn(`${u.L}. ${u.w.filter(w=>!w[3]).map(w=>w[0]).join(', ')}`,'en')}</div><p>Chữ cái của bài: ${u.L}</p></div>`+
      u.w.map(w=>`<div class="lcard"><div class="top"><span class="pic-lg" style="font-size:64px">${picHTML(w[2])}</span>${sayBtn(w[0],'en')}</div><p><span class="enpat">${esc(w[0])}</span><br><span class="muted">${esc(w[1])}</span></p></div>`).join('')+
      `<div class="lcard" style="grid-column:1/-1"><p>Mẫu câu</p>${enSentences(u).map(s=>`<div class="row"><span class="enpat">${esc(s)}</span>${sayBtn(s,'en',1)}</div>`).join('')}</div>`;}
  else if(l.enReview){cards=EN.map(u=>`<div class="lcard"><div class="top"><p>Unit ${u.n}: ${esc(u.t)}</p>${sayBtn(u.w.filter(w=>!w[3]).map(w=>w[0]).join(', '),'en',1)}</div><div class="exw">${u.w.filter(w=>!w[3]).map(w=>`<button data-a="say" data-lang="en" data-say="${esc(w[0])}"><span class="e">${picHTML(w[2])}</span>${esc(w[0])}</button>`).join('')}</div></div>`).join('');}
  else if(l.learnLines){cards=l.learnLines.map((t,i)=>`<div class="lcard"><div class="top"><span class="unit" style="font-size:40px">${i+1}</span>${sayBtn(t)}</div><p>${esc(t)}</p></div>`).join('');}
  const en=l.subj==='en',hi=en?`Hello ${KID}! Let's learn ${l.title.replace(/^Unit \d+: /,'')}. Listen and say it with me!`:`Chào ${KID}! Hôm nay cô cùng con học bài ${l.title}. Con chạm vào cái loa để nghe cô đọc, rồi đọc theo cô nhé!`;
  return `${teacher(hi,hi,en?'en':'vi',en?'Chào Minh An! Mình cùng học bài này nhé. Con nghe cô đọc rồi đọc theo nha!':'')}<div class="learn">${cards}</div><div class="cta"><button class="btn" data-a="tab" data-t="practice">Luyện tập ngay ›</button></div>`;
}
function practiceHTML(l){
  if(!QZ||QZ.id!==l.id){
    const r=lessonRec(l.id),today=r&&r.passDay===todayStr();
    return `<div class="rule card"><div class="big" aria-hidden="true">✏️</div><h2>Sẵn sàng chưa, Minh An?</h2>
    <p class="muted" style="font-weight:700;margin:0">Bài có khoảng 10 câu. Chạm vào loa để nghe câu hỏi.</p>
    <div class="rules"><div class="g">Đúng từ 80% trở lên<br><span style="font-size:24px">+${WIN} sao</span></div><div class="b">Dưới 80%<br><span style="font-size:24px">−${LOSE} sao</span></div></div>
    ${today?'<p class="chip ok" style="justify-self:center;font-size:15px">Hôm nay bài này đã được cộng sao. Làm lại đạt thì không cộng thêm, chưa đạt vẫn bị trừ 1 sao.</p>':''}
    ${r?`<p class="muted" style="margin:0;font-weight:700">Điểm cao nhất: ${r.best}% · Đã làm ${r.tries} lần</p>`:''}
    <div class="cta" style="margin-top:4px"><button class="btn gold" data-a="start">Bắt đầu</button></div></div>`;
  }
  if(QZ.done)return resultHTML(l);
  return quizHTML();
}
function startQuiz(id){
  const qs=L[id].gen();
  QZ={id,qs,i:0,res:[],picked:null,sel:[],bank:null,done:false};prepQ();saveQuiz();render();speakQ();
}
function prepQ(){const q=QZ.qs[QZ.i];QZ.picked=null;QZ.sel=[];QZ.checked=null;QZ.mm=null;
  if(q.type==='order'){let b=range(0,q.items.length-1);for(let k=0;k<6;k++){b=shuffle(b);if(b.some((x,i)=>q.items[x]!==q.items[i]))break;}QZ.bank=b;}
  if(q.type==='match'){let r=range(0,q.pairs.length-1);for(let k=0;k<6;k++){r=shuffle(r);if(r.some((x,i)=>x!==i))break;}QZ.mm={sel:null,done:{},order:[],miss:0,right:r,bad:null};}}
function isEn(){return QZ&&L[QZ.id]&&L[QZ.id].subj==='en';}
const EN_INTRO=['Next one!','Listen carefully!','You can do it!','Here we go!','Look and think!'];
const EN_OK=['Great job','Well done','Excellent','Super','Good job','Awesome'];
const EN_NO=['Oops! Nice try.','Almost!','Not quite.','Good try!'];
function qParts(q,withIntro){
  const en=isEn(),parts=[];
  if(en){
    if(withIntro)parts.push([QZ.i===0?`Hello ${KID}! Let's play!`:pick(EN_INTRO),'en']);
    parts.push([q.prompt,'en']);
    if(q.audio&&!q.prompt.includes(q.audio.text))parts.push([q.audio.text,'en']);
    return parts;
  }
  if(withIntro)parts.push([QZ.i===0?`Chào ${KID}! Mình cùng làm bài với cô nhé. Câu một.`:pick(T_INTRO),'vi']);
  if(q.audio){if(/"/.test(q.prompt))parts.push(...mixParts(q.prompt,false));else{parts.push([q.type==='order'?'Con nghe cô đọc, rồi xếp lại cho đúng nhé.':'Con nghe cô đọc nhé.','vi']);parts.push([q.audio.text,q.audio.lang||'vi']);}}
  else parts.push([q.say||q.prompt,'vi']);
  return parts;
}
function speakQ(){const q=QZ.qs[QZ.i];if(S.autoRead)sayParts(qParts(q,true));else if(q.audio)speak(q.audio.text,q.audio.lang||'vi');}
function feedback(ok,q){
  const en=isEn();let text,parts,ansT='',ansL='vi';
  if(!ok){if(q.type==='choice'){const o=q.options[q.answer];const O=typeof o==='object'?o:{t:String(o)};ansT=String(O.t??O.say??'');ansL=O.t!==undefined?(q.optLang==='en'?'en':'vi'):(O.lang||'vi');if(en&&/^\d+$/.test(ansT))ansL='en';}
    else if(q.type==='order'){ansT=q.items.join(q.letters?'':' ');ansL=q.lang==='en'?'en':'vi';}}
  if(en){
    if(ok){const p=`${pick(EN_OK)}, ${KID}!`;text=`${p} (Giỏi lắm con!)`;parts=[[p,'en']];}
    else{const p=pick(EN_NO);
      if(q.type==='match'){text=`${p} (Con nối nhầm hơi nhiều, lần sau cố lên nhé!)`;parts=[[p+' Keep practicing!','en']];}
      else if(ansT&&ansL==='en'){text=`${p} The answer is: ${ansT}`;parts=[[p,'en'],['The answer is','en'],[ansT,'en']];}
      else{text=`${p} (Đáp án đúng: ${ansT||'ô tô xanh'})`;parts=[[p+' Look at the green answer.','en']];}}
  }else{
    if(ok){const p=pick(T_OK);text=p;parts=[[p,'vi']];}
    else{const p=pick(T_NO);text=p+(ansT?` Đáp án đúng là: ${ansT}`:' Con xem đáp án tô xanh nhé.');
      parts=[[p,'vi']];if(ansT){parts.push(['Đáp án đúng là','vi']);parts.push([ansT,ansL]);}else parts.push(['Con xem đáp án tô xanh nhé.','vi']);}
  }
  QZ.line=text;sayParts(parts);
}
function optHTML(o,i,q){
  const O=typeof o==='object'?o:{t:String(o)};
  const cls=['opt'];if(q.big&&!O.pic&&!O.html)cls.push('big');if(O.pic||O.html)cls.push('col');else if(q.optLang)cls.push('left');
  if(QZ.picked!==null){if(i===q.answer)cls.push('ok');else if(i===QZ.picked)cls.push('no');}
  const hasT=O.t!==undefined&&O.t!=='';
  const speaker=(q.optLang&&hasT)?`<span class="say sm osay" role="button" tabindex="0" aria-label="Nghe" data-a="osay" data-i="${i}">${SPEAKER}</span>`:'';
  return `<button class="${cls.join(' ')}" data-a="pick" data-i="${i}">${O.html||''}${O.pic?`<span class="pic">${picHTML(O.pic)}</span>`:''}${hasT?`<span class="${O.pic||O.html?'lb':'t'}">${esc(O.t)}${O.sub?`<span class="sub">${esc(O.sub)}</span>`:''}</span>`:''}${speaker}</button>`;
}
function matchHTML(q){
  const M=QZ.mm,locked=QZ.res.length>QZ.i;const col=li=>M.order.indexOf(li)%4;
  const left=q.pairs.map((p,i)=>{const d=M.done[i]!==undefined;return `<button class="mitem ${d?'done m'+col(i):''} ${M.sel===i?'sel':''}" data-a="m-l" data-i="${i}" ${d||locked?'disabled':'data-drag="ml"'} aria-label="Hình ${i+1}"><span class="pic">${picHTML(p.pic)}</span></button>`;}).join('');
  const right=M.right.map(j=>{const li=Object.keys(M.done).map(Number).find(k=>M.done[k]===j);const d=li!==undefined;return `<button class="mitem word ${d?'done m'+col(li):''} ${M.bad===j?'bad':''}" data-a="m-r" data-i="${j}" data-drop="mr" ${d||locked?'disabled':''}>${esc(q.pairs[j].t)}</button>`;}).join('');
  return `<div class="match"><div class="mcol">${left}</div><div class="mcol">${right}</div></div>`;
}
function quizHTML(){
  const q=QZ.qs[QZ.i],n=QZ.qs.length,en=isEn();
  const dots=QZ.qs.map((_,i)=>`<i class="${i<QZ.res.length?(QZ.res[i]?'ok':'no'):(i===QZ.i?'cur':'')}"></i>`).join('');
  let body='';
  if(q.type==='choice'){
    const cols=q.cols||2;
    body=`<div class="opts ${cols===1?'c1':''} ${QZ.picked!==null?'lock':''}" style="--cols:${cols}">${q.options.map((o,i)=>optHTML(o,i,q)).join('')}</div>`;
  }else if(q.type==='match'){body=matchHTML(q);}
  else{
    const st=QZ.checked===null?'':(QZ.checked?'ok':'no'),lk=QZ.checked!==null,lt=q.letters?'letter':'';
    body=`<div class="order-slot ${st} ${lt}" data-drop="slot" style="${q.vertical?'flex-direction:column;align-items:stretch':''}">${QZ.sel.map((bi,k)=>`<button class="tile ${lt}" data-a="ord-rm" data-i="${k}" ${lk?'disabled':''}>${esc(q.items[bi])}</button>`).join('')}</div>
    <div class="order-bank">${QZ.bank.map(bi=>{const u=QZ.sel.includes(bi);return `<button class="tile ${lt} ${u?'used':''}" data-a="ord-add" data-i="${bi}" ${lk||u?'disabled':'data-drag="tile"'}>${esc(q.items[bi])}</button>`;}).join('')}</div>
    ${!lk&&QZ.sel.length===q.items.length?'<div class="cta" style="margin:0"><button class="btn good" data-a="ord-check">Kiểm tra</button></div>':''}`;
  }
  let fb='';
  const answered=QZ.res.length>QZ.i;
  if(answered){const ok=QZ.res[QZ.i];const last=QZ.i===n-1;
    fb=`<div class="fb ${ok?'ok':'no'}" role="status"><span class="tline"><span class="ava" aria-hidden="true">👩‍🏫</span><span>${esc(QZ.line||(ok?'Đúng rồi!':'Chưa đúng rồi.'))}</span></span><button class="btn ${ok?'good':''}" data-a="next">${last?(en?'Finish · Xem kết quả':'Xem kết quả'):(en?'Next · Câu tiếp':'Câu tiếp')} ›</button></div>`;}
  const bub=en?(QZ.i===0?[`Hello ${KID}! Let's play!`,'Chào Minh An! Mình cùng chơi nhé!']:pick([['You can do it!','Con làm được mà!'],['Look and think!','Nhìn kĩ và suy nghĩ nhé!'],['Tap the speaker to listen again.','Chạm loa để nghe lại nhé.']]))
    :[QZ.i===0?`Chào ${KID}! Cô hỏi nè, con chạm loa để nghe lại nhé.`:pick(['Cô hỏi nè!','Con suy nghĩ kĩ nhé!','Con làm được mà!','Chạm loa để nghe cô đọc lại nhé.'])];
  return `<div class="quiz"><div class="qtop"><div class="dots" aria-label="Câu ${QZ.i+1} trên ${n}">${dots}</div><span style="font-weight:800">${QZ.i+1}/${n}</span><button class="icon-btn" data-a="quit" style="height:40px">Thoát</button></div>
  ${answered?'':teacher(bub[0],null,null,bub[1])}
  <div class="qcard"><div class="prompt"><button class="say" data-a="qsay" aria-label="Đọc câu hỏi">${SPEAKER}</button><span class="tx">${esc(q.prompt)}${q.sub?`<span class="qsub">${esc(q.sub)}</span>`:''}</span></div>
  ${q.audio?`<div class="visual"><button class="listen" data-a="listen" aria-label="Nghe lại">${SPEAKER}</button></div>`:''}
  ${q.visual?`<div class="visual">${q.visual}</div>`:''}
  ${body}</div>${fb}</div>`;
}
function ordAdd(i){if(!QZ||QZ.checked!==null)return;if(!QZ.sel.includes(i)){QZ.sel.push(i);const q=QZ.qs[QZ.i];if(q.lang==='en')speak(q.items[i],'en');}render();}
function matchTry(i,j){
  const q=QZ.qs[QZ.i],M=QZ.mm;if(!M||QZ.res.length>QZ.i||M.done[i]!==undefined)return;
  if(i===j){M.done[i]=j;M.order.push(i);M.sel=null;M.bad=null;
    if(M.order.length===q.pairs.length){answer(M.miss<=1);saveQuiz();}else{chime(true);speak(q.pairs[j].t,'en');}}
  else{M.miss++;M.bad=j;M.sel=null;chime(false);speak(pick(['Try again!','Oops! Try again.','Not this one!']),'en');setTimeout(()=>{if(QZ&&QZ.mm===M){M.bad=null;render();}},700);}
  render();
}
function saveQuiz(){S.quiz=QZ&&!QZ.done?JSON.parse(JSON.stringify(QZ)):null;Store.commit();}
function resumeQuiz(){if(QZ||!S.quiz||!L[S.quiz.id]||S.quiz.done)return false;QZ=JSON.parse(JSON.stringify(S.quiz));NAV={v:'lesson',id:QZ.id,tab:'practice'};render();window.scrollTo(0,0);toast(`Con làm tiếp bài đang dở nhé (câu ${QZ.i+1}/${QZ.qs.length})`);return true;}
function answer(ok){QZ.res[QZ.i]=ok;chime(ok);feedback(ok,QZ.qs[QZ.i]);}
function nextQ(){if(QZ.i<QZ.qs.length-1){QZ.i++;prepQ();saveQuiz();render();speakQ();window.scrollTo({top:0});}else finishQuiz();}
function finishQuiz(forced){
  const l=L[QZ.id],n=QZ.qs.length;const correct=QZ.res.filter(Boolean).length;const pct=Math.round(correct/n*100);const pass=pct>=PASS;
  const r=S.lessons[l.id]||(S.lessons[l.id]={best:0,tries:0,passDay:''});
  r.tries++;r.best=Math.max(r.best,pct);r.last=pct;
  const t=todayStr();let delta=0,counted=true;
  if(pass&&r.passDay===t){counted=false;}
  else if(pass){delta=addStars(WIN,`Đạt ${pct}% · ${SUBJ_BY[l.subj].name}: ${l.title}`);r.passDay=t;}
  else{delta=addStars(-LOSE,`${forced?'Bỏ dở':'Chưa đạt'} ${pct}% · ${SUBJ_BY[l.subj].name}: ${l.title}`);}
  touchStreak();S.lastLesson=l.id;S.quiz=null;Store.commit();
  QZ.done=true;QZ.result={pct,correct,n,pass,delta,counted};
  if(l.subj==='en'){QZ.result.line=pass&&counted?`Hooray! Well done, ${KID}! You got ${correct} out of ${n}. Three stars for you!`:pass?`Great job, ${KID}! You got ${correct} out of ${n}.`:`Good try, ${KID}! You got ${correct} out of ${n}. Let's practice and try again!`;
    QZ.result.sub=pass&&counted?`Hoan hô! Con đúng ${correct}/${n} câu, được cộng 3 sao!`:pass?`Giỏi lắm! Con đúng ${correct}/${n} câu.`:`Con đúng ${correct}/${n} câu. Mình luyện thêm rồi thử lại nhé!`;
    QZ.result.lang='en';}
  else QZ.result.line=pass&&counted?`Hoan hô ${KID}! Con làm đúng ${correct} trên ${n} câu và được cộng ba ngôi sao rồi. Cô tự hào về con lắm!`:pass?`Giỏi lắm ${KID}! Con làm đúng ${correct} trên ${n} câu. Luyện thêm là con càng giỏi hơn đó!`:`${KID} ơi, lần này con đúng ${correct} trên ${n} câu, chưa đủ tám mươi phần trăm${delta<0?' nên bị trừ một sao':''}. Không sao đâu con, mình xem lại bài học rồi thử lại với cô nhé!`;
  if(!forced){render();if(pass&&counted)burst();speak(QZ.result.line,QZ.result.lang||'vi');window.scrollTo({top:0});}
}
function resultHTML(l){
  const R=QZ.result;
  let d='';if(!R.counted)d=`<div class="delta zero">Hôm nay bài này đã được cộng sao rồi</div>`;else if(R.delta>0)d=`<div class="delta plus">+${R.delta} sao</div>`;else if(R.delta<0)d=`<div class="delta minus">${R.delta} sao</div>`;else d=`<div class="delta zero">Chưa có sao để trừ</div>`;
  const msg=R.pass?'Con làm rất tốt! Giờ thử làm ở ngoài đời nhé.':'Chưa đủ 80%. Con xem lại bài học rồi làm lại nhé!';
  return `<div class="result">${R.line?teacher(R.line,R.line,R.lang||'vi',R.sub):''}<div class="ring" style="--p:${R.pct};--rc:${R.pass?'var(--good)':'var(--bad)'}"><div><b>${R.pct}%</b><span>${R.correct}/${R.n} câu đúng</span></div></div>${d}<h2>${msg}</h2>
  <div class="row" style="justify-content:center">${R.pass?`<button class="btn gold" data-a="tab" data-t="real">Thử thách ngoài đời ›</button>`:`<button class="btn ghost" data-a="tab" data-t="learn">Xem lại bài học</button>`}<button class="btn ${R.pass?'ghost':''}" data-a="start">Làm lại</button></div></div>`;
}
function confirmQuit(then){
  modal(`<h2>Con đang làm dở bài</h2><p>Nếu thoát bây giờ, bài này sẽ tính là chưa đạt (−${LOSE} sao).</p><div class="row" style="justify-content:center"><button class="btn good" data-a="modal-close">Làm tiếp</button><button class="btn ghost" data-a="quit-yes">Thoát</button></div>`);
  QUIT_THEN=then;
}
let QUIT_THEN=null;

/* ---------- REAL-LIFE ---------- */
function realHTML(l){
  const ch=S.challenges[l.id];
  let st='';
  if(ch&&ch.st==='done')st=`<div class="fb ok">🏅 Con đã hoàn thành thử thách này ngày ${fmtDate(ch.d).split(' ')[0]}. Giỏi lắm!</div>`;
  else st=`<div class="row" style="justify-content:center"><button class="btn good" data-a="real-done" data-id="${l.id}">Con làm xong rồi · Nhờ bố mẹ xác nhận</button>${ch&&ch.st==='todo'?'<span class="chip try">Đã ghi vào danh sách thử thách</span>':`<button class="btn ghost" data-a="real-later" data-id="${l.id}">Để sau, nhắc con nhé</button>`}</div>`;
  const rt=`${KID} ơi, giờ mình mang bài học ra ngoài đời nhé! Con làm xong thì nhờ bố mẹ xác nhận để nhận sao.`;
  const enr=l.subj==='en';
  return `<div class="real">${enr?teacher("Let's use English at home!","Let's use English at home!",'en','Mình dùng tiếng Anh ở nhà nhé! Làm xong nhờ bố mẹ xác nhận để nhận sao.'):teacher(rt,rt)}<div class="ticket"><div class="row" style="justify-content:space-between"><span class="eyebrow">Thử thách ngoài đời · +${WIN} sao</span>${sayBtn(l.real)}</div><p>${esc(l.real)}</p></div>${st}
  <p class="muted" style="text-align:center;font-weight:700;margin:0">Bố mẹ xác nhận bằng mã PIN. Làm tốt được +${WIN} sao, chưa làm được bị −${LOSE} sao.</p></div>`;
}
function judgeChallenge(id,ok){
  const l=L[id];
  if(ok){addStars(WIN,`Ngoài đời · ${l.title}`);S.challenges[id]={st:'done',d:new Date().toISOString()};burst();toast(`Tuyệt vời! +${WIN} sao cho Minh An`);}
  else{addStars(-LOSE,`Ngoài đời chưa làm được · ${l.title}`);S.challenges[id]={st:'todo',d:new Date().toISOString()};toast('Chưa được lần này. Con thử lại nhé!');}
  touchStreak();Store.commit();
}

/* ---------- REWARDS ---------- */
function vRewards(){
  const wait=S.vouchers.filter(v=>v.st==='wait'),done=S.vouchers.filter(v=>v.st==='done').slice(0,6);
  let h=`<button class="back" data-a="home">${BACK} Trang chính</button><div class="hello"><div><h1>Đổi sao lấy quà</h1><p>Con đang có ${S.stars} sao. Đổi quà cần bố mẹ nhập mã PIN.</p></div>${starsBadge(S.stars)}</div>`;
  if(wait.length||done.length){h+=`<div class="sec-title"><h2>Phiếu đi chơi của con</h2></div>`+[...wait,...done].map(v=>`<div class="voucher ${v.st==='done'?'done':''}"><span class="e">${v.pic}</span><span><b>${esc(v.name)}</b><br><span class="muted" style="font-size:15px;font-weight:700">${v.st==='done'?'Đã đi ngày '+fmtDate(v.done).split(' ')[0]:'Đổi ngày '+fmtDate(v.d).split(' ')[0]+' · Chờ bố mẹ đưa đi'}</span></span>${v.st==='wait'?`<span class="chip try">${v.cost} sao</span>`:'<span class="chip ok">✓</span>'}</div>`).join('');}
  TIERS.forEach((t,ti)=>{const rs=S.rewards.filter(r=>r.tier===ti);if(!rs.length)return;
    h+=`<section class="tier"><div class="tier-h" style="--tc:${t.c}"><span class="badge">${t.n}</span><span class="cost">${t.cost} sao</span></div><div class="rewards">${rs.map(r=>{const times=S.vouchers.filter(v=>v.rid===r.id).length;return `<div class="rw"><span class="e">${r.pic}</span><b>${esc(r.name)}</b><span class="muted" style="font-weight:800;font-size:15px">${t.cost} sao${times?` · <span style="color:var(--good)">Đã đổi ${times} lần</span>`:''}</span>${S.stars>=t.cost?`<button class="btn gold" data-a="redeem" data-id="${r.id}">${times?'Đổi lại lần nữa':'Đổi quà'}</button>`:`<span class="need">${times?'Muốn đổi lại? ':''}Còn thiếu ${t.cost-S.stars} sao</span>`}</div>`;}).join('')}</div></section>`;});
  return h;
}
function redeem(rid){
  const r=S.rewards.find(x=>x.id===rid);if(!r)return;const cost=rewardCost(r);if(S.stars<cost)return;
  S.stars-=cost;S.spent=(S.spent||0)+cost;S.history.unshift({d:new Date().toISOString(),t:`Đổi quà · ${r.name}`,s:-cost});
  S.vouchers.unshift({id:'v'+Date.now(),rid,name:r.name,pic:r.pic,cost,d:new Date().toISOString(),st:'wait'});
  Store.commit();closeModal();render();burst();toast(`Đã đổi: ${r.name}! Tích thêm ${cost} sao là đổi lại được.`);
}

/* ---------- PARENT ---------- */
function vParent(){
  const all=allLessons(),done=all.filter(passed).length,chDone=Object.values(S.challenges).filter(c=>c.st==='done').length;
  const todo=Object.entries(S.challenges).filter(([id,c])=>c.st==='todo'&&L[id]);
  const wait=S.vouchers.filter(v=>v.st==='wait');
  let h=`<button class="back" data-a="home">${BACK} Trang chính</button><div class="hello"><div><h1>Khu của bố mẹ</h1><p>Theo dõi tiến độ, xác nhận thử thách và quản lý phần thưởng.</p></div><button class="btn ghost" data-a="home">Khóa lại</button></div>
  <div class="pgrid"><div class="stat"><b>${S.stars}</b><span>Sao hiện có</span></div><div class="stat"><b>${S.earned}</b><span>Tổng sao đã kiếm</span></div><div class="stat"><b>${done}/${all.length}</b><span>Bài đã đạt 80%</span></div><div class="stat"><b>${chDone}</b><span>Thử thách ngoài đời đã xong</span></div><div class="stat"><b>${streakNow()}</b><span>Ngày học liên tục</span></div></div>
  ${dataMgmtHTML()}
  <div class="sec-title"><h2>Theo môn</h2></div><div class="tbl-wrap"><table class="hist"><tbody>${SUBJ.map(s=>{const ls=subjLessons(s.id),tried=ls.filter(id=>S.lessons[id]),avg=tried.length?Math.round(tried.reduce((a,id)=>a+S.lessons[id].best,0)/tried.length):0;return `<tr><td><b style="color:${s.c}">${s.name}</b></td><td>${ls.filter(passed).length}/${ls.length} bài đạt</td><td>${tried.length} bài đã học</td><td class="n">${tried.length?avg+'% TB':'—'}</td></tr>`;}).join('')}</tbody></table></div>`;
  h+=`<div class="sec-title"><h2>Thử thách chờ xác nhận</h2></div>`+(todo.length?`<div class="plist">${todo.map(([id])=>`<div class="pitem"><div><b>${esc(L[id].real)}</b><div class="muted" style="font-size:14px;font-weight:700">${SUBJ_BY[L[id].subj].name} · ${esc(L[id].title)}</div></div><div class="row"><button class="btn good" data-a="p-ok" data-id="${id}">Làm tốt +${WIN}</button><button class="btn bad" data-a="p-no" data-id="${id}">Chưa −${LOSE}</button></div></div>`).join('')}</div>`:'<p class="muted">Chưa có thử thách nào đang chờ. Khi con bấm "Để sau", thử thách sẽ hiện ở đây.</p>');
  h+=`<div class="sec-title"><h2>Phiếu đi chơi chờ thực hiện</h2></div>`+(wait.length?`<div class="plist">${wait.map(v=>`<div class="pitem"><div><b>${v.pic} ${esc(v.name)}</b><div class="muted" style="font-size:14px;font-weight:700">Đổi ngày ${fmtDate(v.d)} · ${v.cost} sao</div></div><button class="btn good" data-a="v-done" data-id="${v.id}">Đã đi ✓</button></div>`).join('')}</div>`:'<p class="muted">Chưa có phiếu nào.</p>');
  h+=`<div class="sec-title"><h2>Điều chỉnh sao</h2></div><div class="row">${[3,1,-1,-3].map(n=>`<button class="btn ${n>0?'good':'bad'}" data-a="adj" data-n="${n}">${n>0?'+':''}${n} sao</button>`).join('')}</div><p class="muted" style="font-size:15px">Dùng khi con làm việc tốt ngoài app, hoặc để sửa sai sót. Mọi thay đổi đều ghi vào lịch sử.</p>`;
  h+=`<div class="sec-title"><h2>Lịch sử sao</h2><span class="muted" style="font-weight:700">40 lần gần nhất</span></div>`+(S.history.length?`<div class="tbl-wrap"><table class="hist"><tbody>${S.history.slice(0,40).map(x=>`<tr><td class="d">${fmtDate(x.d)}</td><td>${esc(x.t)}${x.want!==undefined&&x.want!==x.s?' <span class="muted">(đang 0 sao)</span>':''}</td><td class="n ${x.s>0?'p':x.s<0?'m':''}">${x.s>0?'+':''}${x.s}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">Chưa có hoạt động nào.</p>');
  h+=`<div class="sec-title"><h2>Phần thưởng</h2></div><div class="plist">${S.rewards.map(r=>`<div class="pitem"><div><b>${r.pic} ${esc(r.name)}</b><div class="muted" style="font-size:14px;font-weight:700">Mốc ${TIERS[r.tier].n} · ${rewardCost(r)} sao</div></div><button class="btn ghost" data-a="rw-del" data-id="${r.id}" aria-label="Xóa ${esc(r.name)}">Xóa</button></div>`).join('')}</div>
  <div class="card" style="margin-top:12px"><div class="form"><label>Biểu tượng<input id="rw-pic" maxlength="4" placeholder="🎡" value="🎡"></label><label>Tên phần thưởng<input id="rw-name" placeholder="Ví dụ: Đi đu quay"></label><label>Mốc sao<select id="rw-tier">${TIERS.map((t,i)=>`<option value="${i}">${t.n} · ${t.cost} sao</option>`).join('')}</select></label><button class="btn" data-a="rw-add">Thêm</button></div></div>`;
  h+=`<div class="sec-title"><h2>Sao lưu và chuyển máy</h2></div><div class="card" style="display:grid;gap:10px">
   <p class="muted" style="margin:0;font-size:15px;font-weight:700">Sao chép mã sao lưu rồi dán vào app ở máy khác (hoặc bản trên web riêng) để chuyển toàn bộ sao, điểm và phiếu đi chơi sang.</p>
   <div class="row"><button class="btn ghost" data-a="bk-copy">Sao chép mã sao lưu</button></div>
   <textarea id="bk-text" rows="3" placeholder="Dán mã sao lưu vào đây để khôi phục" style="width:100%;border:2px solid var(--line);border-radius:12px;padding:10px;font:inherit;font-size:14px;background:#fff;color:var(--ink)"></textarea>
   <div class="row"><button class="btn" data-a="bk-load">Khôi phục từ mã</button></div></div>`;
  h+=`<div class="sec-title"><h2>Cài đặt</h2></div><div class="card" style="display:grid;gap:16px">
   ${voiceSettings()}
   <label class="toggle"><input type="checkbox" id="autoread" ${S.autoRead?'checked':''}> Tự đọc câu hỏi khi chuyển câu</label>
   <div class="form" style="grid-template-columns:1fr 1fr auto"><label>Mã PIN mới (4 số)<input id="pin1" inputmode="numeric" maxlength="4" pattern="[0-9]*"></label><label>Nhập lại mã PIN<input id="pin2" inputmode="numeric" maxlength="4" pattern="[0-9]*"></label><button class="btn" data-a="pin-change">Đổi mã PIN</button></div>
   ${S.pinSet?'':'<p class="muted" style="margin:0;font-size:15px">Mã PIN đang là 1234. Bố mẹ nên đổi để con không tự xác nhận.</p>'}
</div>
  <div class="sec-title"><h2>Luật chơi</h2></div><div class="card"><ul style="margin:0;padding-left:20px;display:grid;gap:6px;font-weight:700">
   <li>Mỗi bài luyện tập: đúng từ 80% trở lên được +${WIN} sao; dưới 80% bị −${LOSE} sao (không trừ xuống dưới 0).</li>
   <li>Mỗi bài chỉ được cộng 3 sao 1 lần mỗi ngày. Làm lại chưa đạt thì lần nào cũng bị trừ 1 sao.</li>
   <li>Thoát giữa chừng tính là chưa đạt.</li>
   <li>Thử thách ngoài đời: bố mẹ xác nhận, làm tốt +${WIN} sao, chưa làm được −${LOSE} sao. Mỗi thử thách chỉ được cộng 1 lần.</li>
   <li>Đổi quà cần mã PIN của bố mẹ.</li></ul></div>
  <p class="save-note">${Store.mode==='cloud'?'Dữ liệu lưu trong tài khoản Claude của bố mẹ và đồng bộ giữa các máy.':'Dữ liệu đang lưu trên máy này.'}</p>`;
  return h;
}

function voiceSettings(){
  const opt=(lang)=>{const list=voiceList(lang),cur=lang==='en'?S.voiceEn:S.voiceVi,auto=pickVoice(lang);
    const fem=list.filter(v=>!isMaleVoice(v)).sort((a,b)=>voiceScore(b,lang)-voiceScore(a,lang));
    return `<option value="">Tự chọn giọng nữ hay nhất${!cur&&auto?' ('+esc(auto.name)+')':''}</option>`+fem.map(v=>`<option value="${esc(v.name)}" ${v.name===cur?'selected':''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('');};
  const noVi=!voiceList('vi').length,onlyMale=['vi','en'].filter(l=>{const L=voiceList(l);return L.length&&L.every(isMaleVoice);}).map(l=>l==='vi'?'tiếng Việt':'tiếng Anh');
  return `<div style="display:grid;gap:10px"><b>Giọng cô giáo</b>
   <div class="form" style="grid-template-columns:1fr 1fr"><label>Giọng tiếng Việt<select id="v-vi">${opt('vi')}</select></label><label>Giọng tiếng Anh<select id="v-en">${opt('en')}</select></label></div>
   <div class="row"><button class="btn ghost" data-a="v-test">Nghe thử giọng cô giáo</button></div>
   <p class="muted" style="margin:0;font-size:15px">${noVi?'Máy này chưa có giọng tiếng Việt. ':''}${onlyMale.length?`Máy này chỉ có giọng nam cho ${onlyMale.join(' và ')}, app đang nâng cao giọng cho gần giọng nữ; nên tải thêm giọng nữ như hướng dẫn. `:''}Chỉ giọng nữ được hiện trong danh sách. Muốn giọng hay và truyền cảm hơn: trên iPad vào Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói, tải giọng <b>Linh (Nâng cao)</b> cho tiếng Việt và <b>Samantha / Ava (Nâng cao)</b> cho tiếng Anh, rồi mở lại app.</p></div>`;
}
/* ---------- data management (parent) ---------- */
const DEL_OPTS=[
  ['hist','Xóa lịch sử sao','Xóa danh sách cộng, trừ sao. Số sao hiện có giữ nguyên.'],
  ['scores','Cho con học lại từ đầu','Xóa điểm và dấu ✓ của các bài, bài đang làm dở và thử thách ngoài đời. Sao và phiếu đi chơi giữ nguyên.'],
  ['quiz','Xóa bài đang làm dở','Bỏ bài luyện tập đang làm dở mà không trừ sao.'],
  ['vouchers','Xóa phiếu đi chơi','Xóa danh sách phiếu đã đổi. Không hoàn lại sao.'],
  ['play','Xóa dữ liệu khu vui chơi','Xóa kỷ lục trò chơi, truyện tiếng Anh và tranh vẽ.'],
  ['all','Xóa toàn bộ, bắt đầu lại','Xóa tất cả: sao, điểm, lịch sử, phiếu, trò chơi. Giữ mã PIN và giọng đọc.']
];
function dataMgmtHTML(){
  const subjOpts=`<select id="del-subj" aria-label="Chọn môn"><option value="">Tất cả các môn</option>${SUBJ.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select>`;
  return `<div class="sec-title"><h2>Xóa lịch sử học của con</h2></div><div class="plist">${DEL_OPTS.map(([k,t,d])=>`<div class="pitem" id="del-${k}"><div><b>${t}</b><div class="muted" style="font-size:14px;font-weight:700">${d}</div>${k==='scores'?`<div class="form" style="grid-template-columns:1fr;margin-top:8px;max-width:260px">${subjOpts}</div>`:''}</div><button class="btn ${k==='all'?'bad':'ghost'}" data-a="del-ask" data-k="${k}">${k==='all'?'Xóa toàn bộ':'Xóa'}</button></div>`).join('')}</div>`;
}
function delAsk(k){const box=$('#del-'+k);if(!box)return;const btn=box.querySelector('[data-a="del-ask"]');const wrap=document.createElement('div');wrap.className='row';wrap.innerHTML=`<span style="font-weight:800;color:var(--bad)">Chắc chắn?</span><button class="btn bad" data-a="del-do" data-k="${k}">Xóa</button><button class="btn ghost" data-a="del-no">Thôi</button>`;btn.replaceWith(wrap);}
function delDo(k){
  let msg='';
  if(k==='hist'){S.history=[];msg='Đã xóa lịch sử sao';}
  else if(k==='scores'){const sj=($('#del-subj')||{}).value||'';const ids=sj?subjLessons(sj):allLessons();ids.forEach(id=>{delete S.lessons[id];delete S.challenges[id];});
    if(S.quiz&&ids.includes(S.quiz.id)){S.quiz=null;QZ=null;}if(S.lastLesson&&ids.includes(S.lastLesson))S.lastLesson=null;msg=sj?`Đã cho con học lại môn ${SUBJ_BY[sj].name} từ đầu`:'Đã cho con học lại tất cả các môn từ đầu';}
  else if(k==='quiz'){S.quiz=null;QZ=null;msg='Đã xóa bài đang làm dở';}
  else if(k==='vouchers'){S.vouchers=[];msg='Đã xóa phiếu đi chơi';}
  else if(k==='play'){S.games={};S.story=[];try{localStorage.removeItem('minhan-drawings');}catch(e){}msg='Đã xóa dữ liệu khu vui chơi';}
  else if(k==='all'){const keep={pin:S.pin,pinSet:S.pinSet,rev:S.rev,voiceVi:S.voiceVi,voiceEn:S.voiceEn,autoRead:S.autoRead};S=Object.assign(fresh(),keep);QZ=null;try{localStorage.removeItem('minhan-drawings');}catch(e){}msg='Đã xóa toàn bộ, con bắt đầu lại từ đầu';}
  Store.commit();render();toast(msg);
}
/* ---------- modal & PIN ---------- */
function modal(html){const m=$('#modal');m.innerHTML=`<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;m.hidden=false;}
function closeModal(){const m=$('#modal');m.hidden=true;m.innerHTML='';PIN=null;}
function askPin(title,cb){PIN={buf:'',cb,title};drawPin();}
function drawPin(err){
  modal(`<h2>${esc(PIN.title)}</h2><p class="muted">Bố mẹ nhập mã PIN 4 số</p><div class="pindots ${err?'err':''}">${[0,1,2,3].map(i=>`<i class="${i<PIN.buf.length?'f':''}"></i>`).join('')}</div>
  <div class="keypad">${[1,2,3,4,5,6,7,8,9].map(k=>`<button data-a="pin-k" data-k="${k}">${k}</button>`).join('')}<button data-a="modal-close" style="font-size:17px">Hủy</button><button data-a="pin-k" data-k="0">0</button><button data-a="pin-del" style="font-size:17px">Xóa</button></div>
  ${S.pinSet?'':'<p class="hint">Mã mặc định: 1234 (đổi trong Khu bố mẹ)</p>'}`);
}
function pinKey(k){if(!PIN)return;PIN.buf+=k;if(PIN.buf.length<4){drawPin();return;}
  if(PIN.buf===S.pin){const cb=PIN.cb;closeModal();cb();}else{PIN.buf='';drawPin(true);}}

/* ---------- drag and drop (touch + mouse) ---------- */
let DRAG=null,SUPPRESS=false;
document.addEventListener('pointerdown',e=>{const el=e.target.closest('[data-drag]');if(!el||el.disabled)return;DRAG={el,x:e.clientX,y:e.clientY,moved:false,kind:el.dataset.drag,i:+el.dataset.i};});
document.addEventListener('pointermove',e=>{
  if(!DRAG)return;const dx=e.clientX-DRAG.x,dy=e.clientY-DRAG.y;if(!DRAG.moved&&Math.hypot(dx,dy)<10)return;
  if(!DRAG.moved){DRAG.moved=true;const r=DRAG.el.getBoundingClientRect(),g=DRAG.el.cloneNode(true);g.classList.add('drag-ghost');g.removeAttribute('data-a');g.style.width=r.width+'px';g.style.height=r.height+'px';DRAG.ox=DRAG.x-r.left;DRAG.oy=DRAG.y-r.top;document.body.appendChild(g);DRAG.g=g;DRAG.el.classList.add('dragging');
    if(DRAG.kind==='ml'&&QZ&&QZ.mm){QZ.mm.sel=DRAG.i;}}
  DRAG.g.style.transform=`translate(${e.clientX-DRAG.ox}px,${e.clientY-DRAG.oy}px)`;
  document.querySelectorAll('.drop-hover').forEach(x=>x.classList.remove('drop-hover'));
  const t=document.elementFromPoint(e.clientX,e.clientY),d=t&&t.closest('[data-drop]');if(d)d.classList.add('drop-hover');
},{passive:true});
function endDrag(e,cancel){
  if(!DRAG)return;const d=DRAG;DRAG=null;if(!d.moved)return;SUPPRESS=true;setTimeout(()=>SUPPRESS=false,80);
  d.g.remove();d.el.classList.remove('dragging');document.querySelectorAll('.drop-hover').forEach(x=>x.classList.remove('drop-hover'));
  if(cancel)return;const t=document.elementFromPoint(e.clientX,e.clientY),drop=t&&t.closest('[data-drop]');
  if(!drop){if(d.kind==='ml')render();return;}
  if(d.kind==='tile'&&drop.dataset.drop==='slot')ordAdd(d.i);
  else if(d.kind==='ml'&&drop.dataset.drop==='mr')matchTry(d.i,+drop.dataset.i);
}
document.addEventListener('pointerup',e=>endDrag(e,false));
document.addEventListener('pointercancel',e=>endDrag(e,true));

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const m=$('#modal');if(e.target===m){closeModal();return;}
  if(SUPPRESS){SUPPRESS=false;return;}
  const b=e.target.closest('[data-a]');if(!b)return;
  const a=b.dataset.a,ds=b.dataset;
  switch(a){
    case 'home':go({v:'home'});break;
    case 'subj':go({v:'subj',s:ds.s});break;
    case 'lesson':go({v:'lesson',id:ds.id,tab:ds.t||'learn'});break;
    case 'tab':go({v:'lesson',id:NAV.id,tab:ds.t});break;
    case 'rewards':go({v:'rewards'});break;
    case 'parent':if(NAV.v==='parent')break;askPin('Khu của bố mẹ',()=>{go({v:'parent'});PARENT=true;});break;
    case 'say':if(ds.mix)sayParts(mixParts(ds.say,true));else speak(ds.say,ds.lang||'vi');break;
    case 'start':startQuiz(NAV.id);break;
    case 'qsay':{const q=QZ.qs[QZ.i];sayParts(qParts(q,false));break;}
    case 'listen':{const q=QZ.qs[QZ.i];speak(q.audio.text,q.audio.lang||'vi');break;}
    case 'osay':{e.stopPropagation();const q=QZ.qs[QZ.i],o=q.options[+ds.i];const t=typeof o==='object'?o.t:String(o);speak(t,q.optLang);break;}
    case 'pick':{if(!QZ||QZ.picked!==null)return;const q=QZ.qs[QZ.i],i=+ds.i;QZ.picked=i;answer(i===q.answer);saveQuiz();
      render();break;}
    case 'ord-add':ordAdd(+ds.i);break;
    case 'm-l':{if(!QZ||!QZ.mm)return;QZ.mm.sel=+ds.i;chime(true);render();break;}
    case 'm-r':{if(!QZ||!QZ.mm)return;const q=QZ.qs[QZ.i];if(QZ.mm.sel===null){speak(q.pairs[+ds.i].t,'en');toast('Con chọn một hình trước, rồi chạm vào từ nhé');return;}matchTry(QZ.mm.sel,+ds.i);break;}
    case 'ord-rm':{if(QZ.checked!==null)return;QZ.sel.splice(+ds.i,1);render();break;}
    case 'ord-check':{const q=QZ.qs[QZ.i];const ok=QZ.sel.map(i=>q.items[i]).join('|')===q.items.join('|');QZ.checked=ok;answer(ok);saveQuiz();render();break;}
    case 'next':nextQ();break;
    case 'quit':if(QZ&&QZ.res.length>0&&!QZ.done)confirmQuit(()=>go({v:'lesson',id:NAV.id,tab:'learn'}));else go({v:'lesson',id:NAV.id,tab:'learn'});break;
    case 'quit-yes':{closeModal();const then=QUIT_THEN;QUIT_THEN=null;if(QZ&&!QZ.done){while(QZ.res.length<QZ.qs.length)QZ.res.push(false);finishQuiz(true);}QZ=null;toast('Bài được tính là chưa đạt.');if(then)then();break;}
    case 'modal-close':closeModal();break;
    case 'pin-k':pinKey(ds.k);break;
    case 'pin-del':if(PIN){PIN.buf=PIN.buf.slice(0,-1);drawPin();}break;
    case 'real-later':S.challenges[ds.id]={st:'todo',d:new Date().toISOString()};Store.commit();render();toast('Đã ghi vào danh sách thử thách ở trang chính');break;
    case 'real-done':{const id=ds.id;askPin('Bố mẹ xác nhận thử thách',()=>{modal(`<h2>Minh An làm thử thách thế nào?</h2><p>${esc(L[id].real)}</p><button class="btn good" data-a="judge" data-id="${id}" data-ok="1">Con làm tốt · +${WIN} sao</button><button class="btn bad" data-a="judge" data-id="${id}" data-ok="0">Chưa làm được · −${LOSE} sao</button><button class="btn ghost" data-a="modal-close">Để bố mẹ xem lại sau</button>`);});break;}
    case 'judge':closeModal();judgeChallenge(ds.id,ds.ok==='1');render();break;
    case 'p-ok':judgeChallenge(ds.id,true);render();break;
    case 'p-no':judgeChallenge(ds.id,false);render();break;
    case 'redeem':{const r=S.rewards.find(x=>x.id===ds.id);askPin('Bố mẹ đồng ý đổi quà',()=>{modal(`<div style="font-size:64px;text-align:center">${r.pic}</div><h2>Đổi "${esc(r.name)}"?</h2><p>Dùng ${rewardCost(r)} sao. Minh An còn lại ${S.stars-rewardCost(r)} sao.</p><button class="btn gold" data-a="redeem-yes" data-id="${r.id}">Đổi quà</button><button class="btn ghost" data-a="modal-close">Để sau</button>`);});break;}
    case 'redeem-yes':redeem(ds.id);break;
    case 'v-done':{const v=S.vouchers.find(x=>x.id===ds.id);if(v){v.st='done';v.done=new Date().toISOString();Store.commit();render();toast('Đã đánh dấu: '+v.name);}break;}
    case 'v-test':sayParts([[`Chào ${KID}! Cô là cô giáo của con đây. Hôm nay mình cùng học thật vui nhé!`,'vi'],['Hello! Nice to meet you!','en']]);break;
    case 'adj':{const n=+ds.n;addStars(n,'Bố mẹ điều chỉnh');Store.commit();render();toast(`${n>0?'+':''}${n} sao`);break;}
    case 'rw-del':S.rewards=S.rewards.filter(r=>r.id!==ds.id);Store.commit();render();break;
    case 'rw-add':{const name=$('#rw-name').value.trim(),pic=$('#rw-pic').value.trim()||'🎁',tier=+$('#rw-tier').value;if(!name){toast('Nhập tên phần thưởng trước nhé');$('#rw-name').focus();return;}S.rewards.push({id:'c'+Date.now(),tier,name,pic});Store.commit();render();toast('Đã thêm phần thưởng');break;}
    case 'pin-change':{const a1=$('#pin1').value.trim(),a2=$('#pin2').value.trim();if(!/^\d{4}$/.test(a1)){toast('Mã PIN cần đúng 4 chữ số');return;}if(a1!==a2){toast('Hai mã PIN chưa khớp nhau');return;}S.pin=a1;S.pinSet=true;Store.commit();render();toast('Đã đổi mã PIN');break;}
    case 'del-ask':delAsk(ds.k);break;
    case 'del-do':delDo(ds.k);break;
    case 'del-no':render();break;
    case 'bk-copy':{const txt=JSON.stringify(S);const ta=$('#bk-text');const fallback=()=>{ta.value=txt;ta.focus();ta.select();toast('Mã đã hiện trong ô bên dưới, bấm giữ để sao chép');};
      try{navigator.clipboard.writeText(txt).then(()=>toast('Đã sao chép mã sao lưu'),fallback);}catch(err){fallback();}break;}
    case 'bk-load':{const raw=$('#bk-text').value.trim();let d=null;try{d=JSON.parse(raw);}catch(err){}
      if(!d||typeof d!=='object'||typeof d.stars!=='number'||!d.lessons){toast('Mã sao lưu không đúng. Hãy dán lại toàn bộ mã.');return;}
      const rev=S.rev||0;S=migrate(d);S.rev=Math.max(rev,d.rev||0);Store.commit();render();toast(`Đã khôi phục: ${S.stars} sao`);break;}
  }
});
document.addEventListener('change',e=>{if(e.target.id==='v-vi'||e.target.id==='v-en'){const en=e.target.id==='v-en';if(en)S.voiceEn=e.target.value;else S.voiceVi=e.target.value;Store.commit();sayParts(en?[['Hello Minh An! Let\'s learn English!','en']]:[['Chào Minh An! Cô đây nè!','vi']]);return;}if(e.target.id==='autoread'){S.autoRead=e.target.checked;Store.commit();toast(S.autoRead?'Sẽ tự đọc câu hỏi':'Đã tắt tự đọc câu hỏi');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').hidden)closeModal();if(PIN&&/^\d$/.test(e.key))pinKey(e.key);if(PIN&&e.key==='Backspace'){PIN.buf=PIN.buf.slice(0,-1);drawPin();}
  if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('osay')){e.preventDefault();e.target.click();}});

/* ---------- boot ---------- */

