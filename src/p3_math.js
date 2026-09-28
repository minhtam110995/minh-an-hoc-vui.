/* ===================== TOÁN 1 (Kết nối tri thức) ===================== */
const OBJ=[['🍎','quả táo'],['🐟','con cá'],['⭐','ngôi sao'],['🌸','bông hoa'],['🐥','chú gà con'],['🍊','quả cam'],['🎈','quả bóng bay'],['🚗','chiếc ô tô'],['🐞','con bọ rùa'],['🍓','quả dâu tây'],['🦋','con bướm'],['🐢','con rùa']];
const COLORS=['#2F6FDB','#E0493B','#0F9A8F','#E0701A','#8A4FD8','#F5B301'];
function grp(e,n,cls=''){if(!n)return `<div class="grp empty ${cls}"><span class="none">không có</span></div>`;let s='';for(let i=0;i<n;i++)s+=`<span>${e}</span>`;return `<div class="grp ${cls}">${s}</div>`;}
function grpX(e,n,x){let s='';for(let i=0;i<n;i++)s+=`<span class="${i>=n-x?'gone':''}">${e}</span>`;return `<div class="grp">${s}</div>`;}
const eqv=s=>`<div class="eq">${s}</div>`;

const SH={
  'hình tròn':c=>`<circle cx="50" cy="50" r="40" fill="${c}"/>`,
  'hình vuông':c=>`<rect x="12" y="12" width="76" height="76" rx="3" fill="${c}"/>`,
  'hình tam giác':c=>`<polygon points="50,8 93,88 7,88" fill="${c}"/>`,
  'hình chữ nhật':c=>`<rect x="4" y="26" width="92" height="50" rx="3" fill="${c}"/>`
};
const shapeSvg=(name,c,size=120)=>`<svg viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${name}">${SH[name](c)}</svg>`;
const SHOBJ={
  'hình tròn':[['🍪','bánh quy'],['⚽','quả bóng'],['🕐','mặt đồng hồ'],['🍩','bánh vòng'],['🥏','đĩa ném']],
  'hình tam giác':[['🍕','miếng bánh pizza'],['⛺','cái lều'],['🔺','hình biển báo'],['🍙','nắm cơm']],
  'hình chữ nhật':[['📱','điện thoại'],['🚪','cánh cửa'],['📺','ti vi'],['✉️','phong bì'],['📘','quyển sách']],
  'hình vuông':[['🎲','mặt xúc xắc'],['🧇','bánh kẹp'],['🟨','ô gạch vuông']]
};
function box3d(w,h,d,c){
  const x=10,y=10+d*.55,dx=d,dy=d*.55,W=x+w+dx+10,H=y+h+10;
  const k='stroke="#1F2A5C" stroke-width="2.5" stroke-linejoin="round"';
  return `<svg viewBox="0 0 ${W} ${H}" width="${Math.round(W*1.1)}" style="max-width:100%">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${k}/>
  <polygon points="${x},${y} ${x+dx},${y-dy} ${x+w+dx},${y-dy} ${x+w},${y}" fill="${c}" ${k}/>
  <polygon points="${x},${y} ${x+dx},${y-dy} ${x+w+dx},${y-dy} ${x+w},${y}" fill="#fff" opacity=".45"/>
  <polygon points="${x+w},${y} ${x+w+dx},${y-dy} ${x+w+dx},${y-dy+h} ${x+w},${y+h}" fill="${c}" ${k}/>
  <polygon points="${x+w},${y} ${x+w+dx},${y-dy} ${x+w+dx},${y-dy+h} ${x+w},${y+h}" fill="#000" opacity=".18"/></svg>`;
}
function tensSvg(n){
  const t=Math.floor(n/10),u=n%10,cell=13;let s='',x=4;
  for(let i=0;i<t;i++){for(let j=0;j<10;j++)s+=`<rect x="${x}" y="${4+j*cell}" width="${cell-2}" height="${cell-2}" rx="2" fill="#2F6FDB"/>`;x+=cell+5;}
  x+=10;for(let j=0;j<u;j++)s+=`<rect x="${x}" y="${4+(9-j)*cell}" width="${cell-2}" height="${cell-2}" rx="2" fill="#E0701A"/>`;
  const W=x+cell+4,H=8+10*cell;
  return `<svg viewBox="0 0 ${W} ${H}" width="${Math.round(W*1.5)}" style="max-width:100%">${s}</svg>`;
}
function clockSvg(h,size=160){
  let s=`<circle cx="60" cy="60" r="55" fill="#fff" stroke="#1F2A5C" stroke-width="4"/>`;
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;s+=`<text x="${(60+43*Math.sin(a)).toFixed(1)}" y="${(60-43*Math.cos(a)+5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="800" font-family="Nunito,sans-serif" fill="#1F2A5C">${i}</text>`;}
  const ah=(h%12)*Math.PI/6;
  s+=`<line x1="60" y1="60" x2="${(60+27*Math.sin(ah)).toFixed(1)}" y2="${(60-27*Math.cos(ah)).toFixed(1)}" stroke="#D8433A" stroke-width="7" stroke-linecap="round"/><line x1="60" y1="60" x2="60" y2="17" stroke="#2F6FDB" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="5" fill="#1F2A5C"/>`;
  return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="đồng hồ chỉ ${h} giờ">${s}</svg>`;
}
function rulerSvg(n){
  const u=26,x0=12;let s=`<rect x="${x0}" y="8" width="${n*u}" height="22" rx="5" fill="#E0701A"/><polygon points="${x0+n*u},8 ${x0+n*u+14},19 ${x0+n*u},30" fill="#F5B301"/>`;
  s+=`<rect x="4" y="40" width="${12*u+18}" height="52" rx="7" fill="#FFF4CC" stroke="#B98200" stroke-width="2"/>`;
  for(let i=0;i<=12;i++){const x=x0+i*u;s+=`<line x1="${x}" y1="40" x2="${x}" y2="58" stroke="#1F2A5C" stroke-width="2"/><text x="${x}" y="80" text-anchor="middle" font-size="14" font-weight="800" font-family="Nunito,sans-serif" fill="#1F2A5C">${i}</text>`;if(i<12)s+=`<line x1="${x+u/2}" y1="40" x2="${x+u/2}" y2="49" stroke="#1F2A5C" stroke-width="1.5"/>`;}
  const W=12*u+26;
  return `<svg viewBox="0 0 ${W} 96" width="${W*1.3}" style="max-width:100%">${s}</svg>`;
}
const PCOL=[['Đỏ','#E0493B'],['Xanh','#2F6FDB'],['Vàng','#F5B301'],['Tím','#8A4FD8']];
function pencils(lens){
  let s='';lens.forEach((L,i)=>{const y=10+i*38,w=L*26,c=PCOL[i][1];s+=`<rect x="10" y="${y}" width="${w}" height="24" rx="4" fill="${c}"/><polygon points="${10+w},${y} ${10+w+20},${y+12} ${10+w},${y+24}" fill="#F3D3A5"/><circle cx="${10+w+17}" cy="${y+12}" r="3" fill="#1F2A5C"/>`;});
  const W=10+Math.max(...lens)*26+34;return `<svg viewBox="0 0 ${W} ${lens.length*38+14}" width="${Math.round(W*1.2)}" style="max-width:100%">${s}</svg>`;
}
function towers(hs){
  let s='';const mh=Math.max(...hs);hs.forEach((h,i)=>{const x=10+i*70,H=h*22,y=10+(mh-h)*22,c=PCOL[i][1];s+=`<rect x="${x}" y="${y}" width="50" height="${H}" rx="6" fill="${c}"/>`;for(let j=1;j<h;j++)s+=`<line x1="${x}" y1="${y+j*22}" x2="${x+50}" y2="${y+j*22}" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`;});
  return `<svg viewBox="0 0 ${hs.length*70+10} ${mh*22+20}" width="${(hs.length*70+10)*1.2}" style="max-width:100%">${s}</svg>`;
}
const colorOpt=i=>({html:`<i class="sw" style="background:${PCOL[i][1]}"></i>`,t:PCOL[i][0],k:PCOL[i][0]});

const DAYS=['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
const ANI=[['🐱','mèo'],['🐶','chó'],['🐰','thỏ'],['🐻','gấu'],['🐷','lợn'],['🐸','ếch'],['🐵','khỉ'],['🐔','gà'],['🐼','gấu trúc'],['🦊','cáo']];
const aniOpt=a=>({pic:a[0],t:'con '+a[1],k:a[1]});

const M={
  count:(lo,hi)=>()=>{const [e,nm]=pick(OBJ),n=rint(lo,hi);return Q(`Có mấy ${nm}?`,n,numOpts(n,Math.max(0,lo-1),Math.min(10,hi+2)),{visual:grp(e,n),cols:4,big:true});},
  pickGroup:(lo,hi)=>()=>{const [e,nm]=pick(OBJ),n=rint(Math.max(1,lo),hi);const mk=k=>({html:grp(e,k,'sm'),k:'g'+k});return Q(`Nhóm nào có ${n} ${nm}?`,mk(n),numOpts(n,Math.max(1,lo-1),Math.min(10,hi+1)).map(mk),{n:3,cols:1});},
  readNum:(lo,hi)=>()=>{const n=rint(lo,hi);return Q(`Số nào là số "${readVN(n)}"?`,n,numOpts(n,lo,hi),{cols:4,big:true});},
  moreLess:()=>{const [e1]=pick(OBJ),[e2]=pick(OBJ);const a=rint(1,9);let b=rint(1,9);if(Math.random()<.25)b=a;const more=Math.random()<.5;
    const ans=a===b?'Bằng nhau':(more?(a>b?'Bên trái':'Bên phải'):(a<b?'Bên trái':'Bên phải'));const opts=['Bên trái','Bên phải','Bằng nhau'];
    return {type:'choice',prompt:`Bên nào ${more?'nhiều hơn':'ít hơn'}?`,visual:`<div class="pair"><div><b>Bên trái</b>${grp(e1,a,'sm')}</div><div><b>Bên phải</b>${grp(e2,b,'sm')}</div></div>`,options:opts,answer:opts.indexOf(ans),cols:3};},
  sign:(lo,hi)=>()=>{const a=rint(lo,hi);const b=Math.random()<.2?a:rint(lo,hi);const ans=a>b?'>':a<b?'<':'=';const opts=[{t:'>',sub:'lớn hơn',k:'>'},{t:'<',sub:'bé hơn',k:'<'},{t:'=',sub:'bằng',k:'='}];
    return {type:'choice',prompt:`Chọn dấu đúng: ${a} ☐ ${b}`,say:`${a} và ${b}. Chọn dấu lớn hơn, bé hơn hay bằng.`,visual:eqv(`${a}<span class="slot">?</span>${b}`),options:opts,answer:['>','<','='].indexOf(ans),cols:3,big:true};},
  extreme:(lo,hi)=>()=>{const ns=sample(range(lo,hi),4),big=Math.random()<.5,c=big?Math.max(...ns):Math.min(...ns);return Q(`Số nào ${big?'lớn nhất':'bé nhất'}?`,c,ns.filter(x=>x!==c),{cols:4,big:true});},
  split:(lo,hi)=>()=>{const n=rint(lo,hi),a=rint(1,n-1);let s='';for(let i=0;i<n;i++)s+=`<span>${i<a?'🔴':'🔵'}</span>`;return Q(`${n} gồm ${a} và mấy?`,n-a,numOpts(n-a,0,n),{visual:`<div class="grp">${s}</div>`,cols:4,big:true});},
  seq:(lo,hi)=>()=>{const st=rint(lo,hi-4),arr=range(st,st+4),mi=rint(1,3);const c=arr[mi];return Q('Số nào còn thiếu?',c,numOpts(c,Math.max(0,lo-2),hi+2),{visual:`<div class="seq">${arr.map((x,i)=>i===mi?'<span class="slot">?</span>':`<span>${x}</span>`).join('')}</div>`,cols:4,big:true});},
  orderNums:(lo,hi)=>()=>{const ns=sample(range(lo,hi),4),asc=Math.random()<.6;const it=ns.slice().sort((a,b)=>asc?a-b:b-a).map(String);return {type:'order',prompt:`Xếp các số từ ${asc?'bé đến lớn':'lớn đến bé'}`,items:it};},
  shapeName:()=>{const names=Object.keys(SH),nm=pick(names);return Q('Đây là hình gì?',{t:nm,k:nm},names.filter(x=>x!==nm).map(x=>({t:x,k:x})),{visual:shapeSvg(nm,pick(COLORS)),cols:2});},
  shapeObj:()=>{const names=Object.keys(SHOBJ),nm=pick(names),o=pick(SHOBJ[nm]);const ds=names.filter(x=>x!==nm).map(x=>pick(SHOBJ[x]));return Q(`Đồ vật nào có dạng ${nm}?`,{pic:o[0],t:o[1],k:o[1]},ds.map(d=>({pic:d[0],t:d[1],k:d[1]})),{cols:2});},
  countShapes:()=>{const names=Object.keys(SH),target=pick(names);let svg='',cnt=0;const cells=shuffle(range(0,9)),k=rint(6,10);
    for(let i=0;i<k;i++){const nm=(i===0)?target:pick(names);if(nm===target)cnt++;const c=cells[i],x=(c%5)*64,y=Math.floor(c/5)*64;svg+=`<g transform="translate(${x+4},${y+4}) scale(.56)">${SH[nm](pick(COLORS))}</g>`;}
    return Q(`Có mấy ${target}?`,cnt,numOpts(cnt,0,10),{visual:`<svg viewBox="0 0 320 128" width="400" style="max-width:100%">${svg}</svg>`,cols:4,big:true});},
  add:(max,vis)=>()=>{const a=rint(1,max-1),b=rint(0,max-a);const [e]=pick(OBJ);return Q(`${a} + ${b} = ?`,a+b,numOpts(a+b,0,max),{visual:vis?`${grp(e,a,'sm')}<span class="op">+</span>${grp(e,b,'sm')}`:eqv(`${a} + ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  sub:(max,vis)=>()=>{const a=rint(2,max),b=rint(1,a);const [e]=pick(OBJ);return Q(`${a} − ${b} = ?`,a-b,numOpts(a-b,0,max),{visual:vis?grpX(e,a,b):eqv(`${a} − ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  missing:(max)=>()=>{const f=rint(0,2);let a,b,c,txt,ans;
    if(f===0){c=rint(2,max);a=rint(0,c);ans=c-a;txt=`${a} + ☐ = ${c}`;}
    else if(f===1){c=rint(2,max);b=rint(0,c);ans=c-b;txt=`☐ + ${b} = ${c}`;}
    else{a=rint(2,max);ans=rint(0,a);c=a-ans;txt=`${a} − ☐ = ${c}`;}
    return Q('Số nào điền vào ô trống?',ans,numOpts(ans,0,max),{visual:eqv(txt.replace('☐','<span class="slot">?</span>')),say:'Số nào điền vào ô trống? '+spoken(txt),cols:4,big:true});},
  exprEq:(max)=>()=>{const n=rint(2,max);const mk=r=>{if(Math.random()<.5){const a=rint(0,r);return `${a} + ${r-a}`;}const a=rint(r,max);return `${a} − ${a-r}`;};
    const c=mk(n);const ds=[];let g=0;while(ds.length<3&&g++<40){let r=rint(0,max);if(r===n)continue;const e=mk(r);if(!ds.includes(e))ds.push(e);}
    return Q(`Phép tính nào có kết quả bằng ${n}?`,c,ds,{cols:2,big:true});},
  word:(max,kind)=>()=>{
    const it=pick([['cái kẹo','cái'],['quả cam','quả'],['viên bi','viên'],['bông hoa','bông'],['quyển truyện','quyển'],['cái bánh','cái']]);
    const nm=pick(['Minh An','Bạn Nam','Bạn Lan','Em Bin']);
    const add=kind?kind==='+':Math.random()<.5;let a,b,t,ans;
    if(add){a=rint(1,max-1);b=rint(1,max-a);ans=a+b;t=pick([
      `${nm} có ${a} ${it[0]}, mẹ cho thêm ${b} ${it[1]}. ${nm} có tất cả mấy ${it[0]}?`,
      `Trong vườn có ${a} con gà mái và ${b} con gà trống. Có tất cả mấy con gà?`,
      `Bố mua ${a} quả trứng, mẹ mua thêm ${b} quả. Nhà có mấy quả trứng?`,
      `Tổ Một có ${a} bạn gái và ${b} bạn trai. Tổ Một có tất cả mấy bạn?`]);}
    else{a=rint(2,max);b=rint(1,a-1);ans=a-b;t=pick([
      `${nm} có ${a} ${it[0]}, cho bạn ${b} ${it[1]}. ${nm} còn lại mấy ${it[0]}?`,
      `Trên cành có ${a} con chim, ${b} con bay đi. Trên cành còn lại mấy con chim?`,
      `Trong đĩa có ${a} quả táo. Cả nhà ăn hết ${b} quả. Trong đĩa còn lại mấy quả?`,
      `Lớp có ${a} quả bóng, ${b} quả bị xẹp. Còn lại mấy quả bóng tốt?`]);}
    if(Math.random()<.35){const c=add?`${a} + ${b} = ${ans}`:`${a} − ${b} = ${ans}`;const ds=add?[`${a} − ${b} = ${a-b}`,`${a} + ${b+1} = ${ans+1}`,`${b} − ${a} = 0`]:[`${a} + ${b} = ${a+b}`,`${a} − ${b-1} = ${ans+1}`,`${b} + ${ans} = ${a+1}`];return Q(t+' Chọn phép tính đúng.',c,ds.filter(x=>!x.includes('-')),{cols:1,optLang:'vi'});}
    return Q(t,ans,numOpts(ans,0,Math.max(10,max)),{cols:4,big:true});},
  solidName:()=>{const cube=Math.random()<.5;const c=pick(COLORS);const nm=cube?'Khối lập phương':'Khối hộp chữ nhật';return Q('Đây là khối gì?',nm,['Khối lập phương','Khối hộp chữ nhật','Hình vuông','Hình chữ nhật'].filter(x=>x!==nm),{visual:cube?box3d(70,70,40,c):box3d(120,56,40,c),cols:2});},
  solidObj:()=>{const cube=Math.random()<.5;const A=[['🎲','xúc xắc'],['🧊','viên đá lạnh']],B=[['🧱','viên gạch'],['📦','hộp giấy'],['🗄️','cái tủ']],O=[['⚽','quả bóng'],['🍩','bánh vòng'],['🥫','lon sữa']];
    const c=pick(cube?A:B);const ds=[...(cube?B:A),...O];return Q(`Đồ vật nào có dạng ${cube?'khối lập phương':'khối hộp chữ nhật'}?`,{pic:c[0],t:c[1],k:c[1]},shuffle(ds).map(d=>({pic:d[0],t:d[1],k:d[1]})),{cols:2});},
  countCubes:()=>{const n=rint(2,8);let s='';for(let i=0;i<n;i++)s+=box3d(34,34,18,COLORS[i%6]);return Q('Có mấy khối lập phương?',n,numOpts(n,1,10),{visual:`<div class="row" style="justify-content:center;gap:4px">${s}</div>`,cols:4,big:true});},
  posRow:()=>{const as=sample(ANI,4),row=as.slice(0,3);const f=rint(0,2);let p,c;
    if(f===0){p='Con vật nào ở giữa?';c=row[1];}
    else if(f===1){const i=rint(1,2);p=`Con vật nào ở bên trái con ${row[i][1]}?`;c=row[i-1];}
    else{const i=rint(0,1);p=`Con vật nào ở bên phải con ${row[i][1]}?`;c=row[i+1];}
    return Q(p,aniOpt(c),[...row,as[3]].filter(x=>x!==c).map(aniOpt),{visual:`<div class="lineup">${row.map(a=>`<div>${a[0]}</div>`).join('')}</div>`,cols:2,say:p+' Bên trái là phía tay trái của con.'});},
  posStack:()=>{const as=sample(ANI,4),st=as.slice(0,3);const f=rint(0,2);let p,c;
    if(f===0){p='Con vật nào ở trên cùng?';c=st[0];}else if(f===1){p='Con vật nào ở dưới cùng?';c=st[2];}else{p=`Con vật nào ở ngay dưới con ${st[0][1]}?`;c=st[1];}
    return Q(p,aniOpt(c),[...st,as[3]].filter(x=>x!==c).map(aniOpt),{visual:`<div class="stack">${st.map(a=>`<div>${a[0]}</div>`).join('')}</div>`,cols:2});},
  posQueue:()=>{const as=sample(ANI,4),q=as.slice(0,3);const first=Math.random()<.5;const c=first?q[2]:q[0];const p=`Các bạn đang đi về phía lá cờ. Bạn nào đi ${first?'đầu tiên':'sau cùng'}?`;
    return Q(p,aniOpt(c),[...q,as[3]].filter(x=>x!==c).map(aniOpt),{visual:`<div class="lineup">${q.map(a=>`<div>${a[0]}</div>`).join('')}<div class="flag">🚩</div></div>`,cols:2});},
  tensCount:()=>{const n=rint(11,59);return Q('Có tất cả bao nhiêu ô vuông?',n,[n%10&&Math.floor(n/10)!==n%10?(n%10)*10+Math.floor(n/10):n+2,...numOpts(n,10,99)],{visual:tensSvg(n)+'<p class="muted" style="width:100%;text-align:center;margin:0;font-weight:700">Mỗi cột xanh là 1 chục (10 ô)</p>',cols:4,big:true});},
  tensOnes:()=>{const t=rint(1,9),u=rint(0,9),n=t*10+u;const f=(a,b)=>`${a} chục và ${b} đơn vị`;const ds=[f(u,t),f(t+1>9?t-1:t+1,u),f(t,u===9?8:u+1)].filter(x=>x!==f(t,u));return Q(`Số ${n} gồm:`,f(t,u),ds,{cols:1});},
  readWrite:()=>{const n=rint(11,99);const sw=(n%10)*10+Math.floor(n/10);return Q(`"${readVN(n)}" viết là số nào?`,n,[sw>=10&&sw!==n?sw:n+1,...numOpts(n,10,99)],{cols:4,big:true});},
  neighbor:()=>{const n=rint(2,98),after=Math.random()<.5;const c=after?n+1:n-1;return Q(`Số liền ${after?'sau':'trước'} của ${n} là số nào?`,c,[after?n-1:n+1,n,c+10,c-10].filter(x=>x>0&&x<=100),{cols:4,big:true});},
  seq100:()=>{const st=rint(10,95),arr=range(st,st+4).filter(x=>x<=100);const mi=rint(1,Math.min(3,arr.length-1));const c=arr[mi];return Q('Số nào còn thiếu?',c,numOpts(c,1,100),{visual:`<div class="seq">${arr.map((x,i)=>i===mi?'<span class="slot">?</span>':`<span>${x}</span>`).join('')}</div>`,cols:4,big:true});},
  tensSeq:()=>{const st=rint(1,5)*10,arr=[st,st+10,st+20,st+30,st+40];const mi=rint(1,3);const c=arr[mi];return Q('Số tròn chục nào còn thiếu?',c,[c+1,c-1,c+5,c+20].filter(x=>!arr.includes(x)),{visual:`<div class="seq">${arr.map((x,i)=>i===mi?'<span class="slot">?</span>':`<span>${x}</span>`).join('')}</div>`,cols:4,big:true});},
  roundTen:()=>{const c=rint(1,9)*10;const ds=sample(range(11,99).filter(x=>x%10),3);return Q('Số nào là số tròn chục?',c,ds,{cols:4,big:true});},
  longest:()=>{const k=3,lens=sample(range(3,10),k),longest=Math.random()<.5;const idx=lens.indexOf(longest?Math.max(...lens):Math.min(...lens));
    return Q(`Bút chì màu nào ${longest?'dài nhất':'ngắn nhất'}?`,colorOpt(idx),range(0,k-1).filter(i=>i!==idx).map(colorOpt),{visual:pencils(lens),n:3,cols:3});},
  tallest:()=>{const hs=sample(range(2,7),3),tall=Math.random()<.5;const idx=hs.indexOf(tall?Math.max(...hs):Math.min(...hs));
    return Q(`Cột nào ${tall?'cao nhất':'thấp nhất'}?`,colorOpt(idx),[0,1,2].filter(i=>i!==idx).map(colorOpt),{visual:towers(hs),n:3,cols:3});},
  ruler:()=>{const n=rint(2,12);return Q('Thanh màu cam dài mấy xăng-ti-mét?',`${n} cm`,[`${n+1} cm`,`${n-1} cm`,`${n+2} cm`,`${n-2} cm`].filter(x=>parseInt(x)>0),{visual:rulerSvg(n),cols:4,say:'Thanh màu cam dài mấy xăng ti mét?'});},
  cmCompare:()=>{const it=sample([['bút chì','✏️'],['cục tẩy','🧽'],['quyển vở','📓'],['cái thước','📏'],['chiếc lá','🍃'],['chiếc thìa','🥄']],2);let a=rint(3,25),b=rint(3,25);while(b===a)b=rint(3,25);const longer=Math.random()<.5;
    const c=(longer?a>b:a<b)?0:1;const o=i=>({pic:it[i][1],t:`${it[i][0]} (${i?b:a} cm)`,k:it[i][0]});
    return Q(`${it[0][0][0].toUpperCase()+it[0][0].slice(1)} dài ${a} cm, ${it[1][0]} dài ${b} cm. Vật nào ${longer?'dài hơn':'ngắn hơn'}?`,o(c),[o(1-c)],{n:2,cols:2});},
  unit:()=>Q('Để đo độ dài chiếc bút chì cho chính xác, con dùng gì?',{pic:'📏',t:'Thước có vạch xăng-ti-mét',k:'r'},[{pic:'⚖️',t:'Cái cân',k:'c'},{pic:'⏰',t:'Đồng hồ',k:'d'},{pic:'🥛',t:'Cái cốc',k:'k'}],{cols:2}),
  add100a:()=>{const t=rint(1,8),u=rint(0,8),a=t*10+u,b=rint(1,9-u);return Q(`${a} + ${b} = ?`,a+b,numOpts(a+b,10,99),{visual:eqv(`${a} + ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  addTens:()=>{const a=rint(1,8)*10,b=rint(1,(90-a)/10)*10;return Q(`${a} + ${b} = ?`,a+b,[a+b+10,a+b-10,a+b+1,a+b-1],{visual:eqv(`${a} + ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  sub100a:()=>{const t=rint(1,9),u=rint(1,9),a=t*10+u,b=rint(1,u);return Q(`${a} − ${b} = ?`,a-b,numOpts(a-b,0,99),{visual:eqv(`${a} − ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  subTens:()=>{const a=rint(2,9)*10,b=rint(1,a/10-1)*10;return Q(`${a} − ${b} = ?`,a-b,[a-b+10,a-b-10,a-b+1,a+b].filter(x=>x>=0&&x<=100),{visual:eqv(`${a} − ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  add2d:()=>{const t1=rint(1,7),t2=rint(1,8-t1),u1=rint(0,8),u2=rint(0,9-u1);const a=t1*10+u1,b=t2*10+u2;return Q(`${a} + ${b} = ?`,a+b,numOpts(a+b,10,99),{visual:eqv(`${a} + ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  sub2d:()=>{const t1=rint(2,9),t2=rint(1,t1-1),u1=rint(0,9),u2=rint(0,u1);const a=t1*10+u1,b=t2*10+u2;return Q(`${a} − ${b} = ?`,a-b,numOpts(a-b,0,99),{visual:eqv(`${a} − ${b} = <span class="slot">?</span>`),cols:4,big:true});},
  word100:()=>{const f=rint(0,4);let t,ans,unit='';
    if(f===0){const a=pick([20,30,50]),b=pick([10,20]);ans=a-b;t=`Minh An có ${a} nghìn đồng. Con mua một quyển vở giá ${b} nghìn đồng. Con còn lại bao nhiêu nghìn đồng?`;unit=' nghìn';}
    else if(f===1){const a=rint(3,8)*10,b=rint(1,9);ans=a+b;t=`Mẹ mua ${a} quả trứng, bà cho thêm ${b} quả. Nhà có tất cả bao nhiêu quả trứng?`;}
    else if(f===2){const t1=rint(3,9),u1=rint(2,9),a=t1*10+u1,b=rint(1,t1-1)*10+rint(0,u1);ans=a-b;t=`Sợi dây dài ${a} cm. Mẹ cắt đi ${b} cm. Sợi dây còn lại dài bao nhiêu xăng-ti-mét?`;unit=' cm';}
    else if(f===3){const a=rint(4,9)*10+rint(0,9),b=rint(1,Math.floor(a/10)-1)*10;ans=a-b;t=`Quyển truyện có ${a} trang. Minh An đã đọc ${b} trang. Còn bao nhiêu trang chưa đọc?`;}
    else{const t1=rint(1,4),t2=rint(1,4),u1=rint(0,5),u2=rint(0,4);const a=t1*10+u1,b=t2*10+u2;ans=a+b;t=`Lớp 1A có ${a} bạn, lớp 1B có ${b} bạn. Hai lớp có tất cả bao nhiêu bạn?`;}
    return Q(t,`${ans}${unit}`,numOpts(ans,0,100).map(x=>`${x}${unit}`),{cols:2,big:false});},
  clock:()=>{const h=rint(1,12);return Q('Đồng hồ chỉ mấy giờ?',`${h} giờ`,numOpts(h,1,12).map(x=>`${x} giờ`),{visual:clockSvg(h),cols:4});},
  clockPick:()=>{const ctx=pick([[6,'thức dậy lúc 6 giờ sáng'],[7,'ăn sáng lúc 7 giờ'],[11,'ăn trưa lúc 11 giờ'],[5,'tan học về lúc 5 giờ chiều'],[9,'đi ngủ lúc 9 giờ tối'],[8,'vào lớp học lúc 8 giờ']]);
    const mk=h=>({html:clockSvg(h,96),k:'h'+h,t:''});return Q(`Minh An ${ctx[1]}. Đồng hồ nào chỉ đúng giờ đó?`,mk(ctx[0]),numOpts(ctx[0],1,12).map(mk),{cols:2});},
  days:()=>{const d=rint(0,6),tm=Math.random()<.5;const c=DAYS[(d+(tm?1:6))%7];return Q(`Hôm nay là ${DAYS[d]}. ${tm?'Ngày mai':'Hôm qua'} là thứ mấy?`,c,DAYS.filter(x=>x!==c&&x!==DAYS[d]),{cols:2});},
  week:()=>pick([
    ()=>Q('Một tuần lễ có mấy ngày?',7,[5,6,10],{cols:4,big:true}),
    ()=>Q('Những ngày nào thường được nghỉ học?','Thứ Bảy và Chủ nhật',['Thứ Hai và Thứ Ba','Thứ Tư và Thứ Năm','Thứ Năm và Thứ Sáu'],{cols:1}),
    ()=>Q('Ngày đầu tuần đi học là thứ mấy?','Thứ Hai',['Chủ nhật','Thứ Bảy','Thứ Sáu'],{cols:2})])(),
  calendar:()=>{const d=rint(1,28),w=rint(0,6);const ask=Math.random()<.5;const vis=`<div class="cal"><small>Tháng Mười</small><b>${d}</b><span>${DAYS[w]}</span></div>`;
    if(ask)return Q('Tờ lịch cho biết hôm nay là ngày mấy?',`Ngày ${d}`,[`Ngày ${d+1}`,`Ngày ${d>1?d-1:d+2}`,`Ngày ${d+10}`],{visual:vis,cols:2});
    const c=DAYS[(w+1)%7];return Q(`Hôm nay ngày ${d}. Ngày ${d+1} là thứ mấy?`,c,DAYS.filter(x=>x!==c&&x!==DAYS[w]),{visual:vis,cols:2});}
};

(function(){
  const card=(t,v,say)=>({t,v,say});
  const T=(name,list)=>{const tp=topic('math',name);list.forEach(o=>addLesson(tp,'math',o));};
  T('Các số từ 0 đến 10',[
    {id:'m1',title:'Các số 0, 1, 2, 3, 4, 5',learn:[card('Đếm từng đồ vật, chạm tay vào mỗi cái và đọc to: một, hai, ba…',grp('🍎',3),'Đếm từng đồ vật và đọc to: một, hai, ba'),card('Số 0 nghĩa là không có cái nào.',grp('🍎',0),'Số không nghĩa là không có cái nào'),card('Số 5: năm ngón tay trên một bàn tay.',`<div class="pic-lg">🖐️</div>`,'Số năm, năm ngón tay')],
      gen:()=>mix([M.count(0,5),M.pickGroup(1,5),M.readNum(0,5)]),real:'Khi dọn cơm, con đếm xem nhà mình cần mấy cái bát, rồi tự lấy đủ bát đặt lên bàn.'},
    {id:'m2',title:'Các số 6, 7, 8, 9, 10',learn:[card('Đếm tiếp sau 5: sáu, bảy, tám, chín, mười.',grp('⭐',8),'sáu, bảy, tám, chín, mười'),card('Hai bàn tay có 10 ngón.',`<div class="pic-lg">🖐️🖐️</div>`,'Hai bàn tay có mười ngón')],
      gen:()=>mix([M.count(6,10),M.pickGroup(6,10),M.readNum(0,10)]),real:'Đếm số bậc cầu thang hoặc số cây trong chậu (từ 6 đến 10), đọc to từng số cho bố mẹ nghe.'},
    {id:'m3',title:'Nhiều hơn, ít hơn, bằng nhau',learn:[card('Nối mỗi con với một đồ vật. Bên nào còn thừa là bên nhiều hơn.',`<div class="pair"><div>${grp('🐰',4,'sm')}</div><div>${grp('🥕',3,'sm')}</div></div>`,'Bên nào còn thừa là bên nhiều hơn')],
      gen:()=>mix([M.moreLess],10),real:'Chia hoa quả vào 2 đĩa, nói đĩa nào nhiều hơn, đĩa nào ít hơn. Làm sao để 2 đĩa bằng nhau?'},
    {id:'m4',title:'So sánh số: lớn hơn, bé hơn, bằng nhau',learn:[card('Dấu > đọc là "lớn hơn": 5 > 3. Dấu < đọc là "bé hơn": 2 < 6. Dấu = đọc là "bằng".',eqv('5 > 3'),'Năm lớn hơn ba. Hai bé hơn sáu.'),card('Mẹo nhớ: miệng dấu luôn há về phía số lớn hơn.',eqv('2 < 6'),'Miệng dấu luôn há về phía số lớn hơn')],
      gen:()=>mix([M.sign(0,10),M.extreme(0,10)]),real:'Chơi bài với bố mẹ: mỗi người rút 1 lá (1 đến 10), con tự nói số của ai lớn hơn, bé hơn hay bằng nhau.'},
    {id:'m5',title:'Mấy và mấy (tách số)',learn:[card('7 gồm 4 và 3. Cũng có thể 7 gồm 5 và 2, 6 và 1.',`<div class="grp"><span>🔴</span><span>🔴</span><span>🔴</span><span>🔴</span><span>🔵</span><span>🔵</span><span>🔵</span></div>`,'Bảy gồm bốn và ba')],
      gen:()=>mix([M.split(2,10)]),real:'Lấy 8 hạt đậu chia vào 2 tay theo nhiều cách: 1 và 7, 2 và 6… Con tìm được mấy cách?'},
    {id:'m6',title:'Dãy số và xếp thứ tự',learn:[card('Các số từ 0 đến 10 xếp từ bé đến lớn: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',`<div class="seq"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>`,'Không, một, hai, ba, bốn, năm')],
      gen:()=>mix([M.seq(0,10),M.orderNums(0,10),M.extreme(0,10)]),real:'Xếp các cốc hoặc gấu bông trong nhà từ thấp đến cao, rồi đánh số 1, 2, 3… cho từng cái.'}
  ]);
  T('Làm quen với một số hình phẳng',[
    {id:'m7',title:'Hình vuông, hình tròn, hình tam giác, hình chữ nhật',learn:Object.keys(SH).map((n,i)=>card(n[0].toUpperCase()+n.slice(1),shapeSvg(n,COLORS[i],90),n)),
      gen:()=>mix([M.shapeName,M.shapeObj]),real:'Đi quanh nhà tìm: 2 đồ vật hình tròn, 2 hình vuông, 2 hình chữ nhật và 1 hình tam giác. Chỉ cho bố mẹ xem.'},
    {id:'m8',title:'Đếm hình, lắp ghép hình',learn:[card('Đếm từng hình một, đếm xong hình nào thì nhớ đánh dấu để không đếm lại.',shapeSvg('hình tam giác','#E0701A',70)+shapeSvg('hình tam giác','#2F6FDB',70),'Đếm từng hình một')],
      gen:()=>mix([M.countShapes,M.shapeName]),real:'Dùng que tăm xếp 1 hình tam giác và 1 hình vuông. Mỗi hình cần mấy que?'}
  ]);
  T('Phép cộng, phép trừ trong phạm vi 10',[
    {id:'m9',title:'Phép cộng trong phạm vi 10',learn:[card('Gộp lại thì làm phép cộng. 3 quả thêm 2 quả là 5 quả: 3 + 2 = 5.',`${grp('🍎',3,'sm')}<span class="op">+</span>${grp('🍎',2,'sm')}`,'Ba cộng hai bằng năm'),card('Đổi chỗ các số, kết quả không đổi: 2 + 3 = 3 + 2.',eqv('2 + 3 = 3 + 2'),'Hai cộng ba bằng ba cộng hai')],
      gen:()=>{const a=mix([M.add(10,true)],5),b=mix([M.add(10,false)],5);return [...a,...b];},real:'Đi siêu thị: bỏ vào giỏ 3 quả cam rồi thêm 4 quả táo. Con tính có tất cả mấy quả.'},
    {id:'m10',title:'Phép trừ trong phạm vi 10',learn:[card('Bớt đi thì làm phép trừ. Có 5 quả, ăn 2 quả, còn 3 quả: 5 − 2 = 3.',grpX('🍎',5,2),'Năm trừ hai bằng ba')],
      gen:()=>{const a=mix([M.sub(10,true)],5),b=mix([M.sub(10,false)],5);return [...a,...b];},real:'Có 10 cái kẹo, con cho em hoặc bạn một số cái. Con nói con còn lại mấy cái bằng phép trừ.'},
    {id:'m11',title:'Bảng cộng, bảng trừ và số còn thiếu',learn:[card('Tìm số còn thiếu: 3 + ? = 7. Đếm tiếp từ 3 đến 7: 4, 5, 6, 7 là 4 bước. Vậy số cần tìm là 4.',eqv('3 + <span class="slot">4</span> = 7'),'Ba cộng bốn bằng bảy')],
      gen:()=>mix([M.missing(10),M.exprEq(10),M.add(10,false),M.sub(10,false)]),real:'Đố vui: bố mẹ nói một phép tính còn thiếu số (ví dụ 3 + mấy = 7), con đoán. Sau đó con đố lại bố mẹ.'},
    {id:'m12',title:'Bài toán có lời văn (phạm vi 10)',learn:[card('Đọc kĩ đề. "Thêm, tất cả" thường là phép cộng. "Bớt, cho đi, bay đi, còn lại" thường là phép trừ.',`<div class="pic-lg">🐦🐦🐦</div>`,'Thêm thì cộng. Bớt đi, còn lại thì trừ')],
      gen:()=>mix([M.word(10)]),real:'Con tự nghĩ 1 bài toán về gia đình mình (ví dụ số người, số bát đũa) và đố lại bố mẹ.'}
  ]);
  T('Làm quen với một số hình khối',[
    {id:'m13',title:'Khối lập phương, khối hộp chữ nhật',learn:[card('Khối lập phương: mọi mặt đều là hình vuông, giống viên xúc xắc.',box3d(70,70,40,'#2F6FDB'),'Khối lập phương giống viên xúc xắc'),card('Khối hộp chữ nhật: giống viên gạch, hộp bánh.',box3d(120,56,40,'#E0701A'),'Khối hộp chữ nhật giống viên gạch')],
      gen:()=>mix([M.solidName,M.solidObj,M.countCubes]),real:'Tìm trong nhà 2 đồ vật dạng khối lập phương và 2 đồ vật dạng khối hộp chữ nhật (hộp sữa, hộp quà, xúc xắc…).'}
  ]);
  T('Vị trí, định hướng trong không gian',[
    {id:'m14',title:'Trên – dưới, phải – trái, trước – sau, ở giữa',learn:[card('Tay con cầm thìa ăn cơm thường là tay phải. Phía bên kia là bên trái.',`<div class="pic-lg">🫲 🫱</div>`,'Tay cầm thìa là tay phải'),card('Con mèo ở giữa, con chó ở bên trái con mèo, con thỏ ở bên phải con mèo.',`<div class="lineup"><div>🐶</div><div>🐱</div><div>🐰</div></div>`,'Con mèo ở giữa')],
      gen:()=>mix([M.posRow,M.posStack,M.posQueue]),real:'Chơi "Bố mẹ nói, con làm": đặt gấu bông ở trên, dưới, bên trái, bên phải, phía trước, phía sau cái ghế.'}
  ]);
  T('Các số đến 100',[
    {id:'m15',title:'Số có hai chữ số (chục và đơn vị)',learn:[card('10 đơn vị là 1 chục. Số 34 gồm 3 chục và 4 đơn vị.',tensSvg(34),'Ba mươi tư gồm ba chục và bốn đơn vị'),card('Đọc số: 21 là "hai mươi mốt", 25 là "hai mươi lăm", 15 là "mười lăm".',eqv('21 · 25 · 15'),'hai mươi mốt, hai mươi lăm, mười lăm')],
      gen:()=>mix([M.tensCount,M.tensOnes,M.readWrite]),real:'Bó que tính (hoặc ống hút) thành từng bó 10. Con bó được mấy chục và còn thừa mấy que? Đọc số đó.'},
    {id:'m16',title:'So sánh số có hai chữ số',learn:[card('So sánh hàng chục trước. Hàng chục bằng nhau thì so sánh hàng đơn vị: 45 < 52; 37 > 34.',eqv('45 < 52'),'Bốn mươi lăm bé hơn năm mươi hai')],
      gen:()=>mix([M.sign(10,99),M.extreme(10,99),M.orderNums(10,99)]),real:'Ở siêu thị, xem giá 2 món đồ (ví dụ 25 nghìn và 32 nghìn). Con nói món nào rẻ hơn.'},
    {id:'m17',title:'Bảng các số từ 1 đến 100',learn:[card('Số liền sau thì thêm 1, số liền trước thì bớt 1. Liền sau 39 là 40.',`<div class="seq"><span>38</span><span>39</span><span>40</span></div>`,'Liền sau ba mươi chín là bốn mươi'),card('Các số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90.',`<div class="seq"><span>10</span><span>20</span><span>30</span></div>`,'mười, hai mươi, ba mươi')],
      gen:()=>mix([M.neighbor,M.seq100,M.tensSeq,M.roundTen]),real:'Tìm số nhà, số tầng hoặc số trang sách. Đọc to và nói số liền trước, liền sau của nó.'}
  ]);
  T('Độ dài và đo độ dài',[
    {id:'m18',title:'Dài hơn, ngắn hơn, cao hơn, thấp hơn',learn:[card('Muốn so dài ngắn, đặt các vật thẳng hàng ở một đầu.',pencils([6,4,8]),'Đặt thẳng hàng ở một đầu')],
      gen:()=>mix([M.longest,M.tallest]),real:'So chiều cao cả nhà: ai cao nhất, ai thấp nhất? Xếp hàng từ thấp đến cao.'},
    {id:'m19',title:'Đo độ dài bằng xăng-ti-mét (cm)',learn:[card('Đặt vạch 0 của thước ở đầu vật. Đầu kia của vật chỉ vào số nào thì vật dài bấy nhiêu xăng-ti-mét.',rulerSvg(5),'Đặt vạch không ở đầu vật')],
      gen:()=>mix([M.ruler,M.cmCompare,M.unit]),real:'Dùng thước đo chiếc bút chì, quyển vở và bàn tay của con. Đọc số xăng-ti-mét cho bố mẹ nghe.'}
  ]);
  T('Phép cộng, phép trừ (không nhớ) trong phạm vi 100',[
    {id:'m20',title:'Cộng, trừ số có hai chữ số với số có một chữ số',learn:[card('Cộng, trừ hàng đơn vị với nhau, giữ nguyên hàng chục: 32 + 5 = 37.',eqv('32 + 5 = 37'),'Ba mươi hai cộng năm bằng ba mươi bảy'),card('Số tròn chục: 30 + 20 = 50 (3 chục + 2 chục = 5 chục).',eqv('30 + 20 = 50'),'Ba chục cộng hai chục bằng năm chục')],
      gen:()=>mix([M.add100a,M.sub100a,M.addTens,M.subTens]),real:'Đi chợ cùng mẹ, tính tiền 2 món có giá tròn chục (ví dụ 20 nghìn + 30 nghìn).'},
    {id:'m21',title:'Cộng, trừ hai số có hai chữ số',learn:[card('Đơn vị cộng đơn vị, chục cộng chục: 24 + 13 = 37.',eqv('24 + 13 = 37'),'Hai mươi tư cộng mười ba bằng ba mươi bảy')],
      gen:()=>mix([M.add2d,M.sub2d]),real:'Chơi ném bóng vào rổ, mỗi quả trúng 10 điểm. Tính điểm của con và bố, xem ai hơn bao nhiêu điểm.'},
    {id:'m22',title:'Bài toán có lời văn (phạm vi 100)',learn:[card('Đọc đề, tìm xem bài hỏi gì. Viết phép tính, rồi trả lời kèm đơn vị: cm, nghìn đồng, quả…',`<div class="pic-lg">🪙</div>`,'Trả lời kèm đơn vị')],
      gen:()=>mix([M.word100]),real:'Con được cầm 20 nghìn mua đồ ở cửa hàng. Tự trả tiền và tính tiền thừa cùng bố mẹ.'}
  ]);
  T('Thời gian, giờ và lịch',[
    {id:'m23',title:'Xem giờ đúng',learn:[card('Kim dài chỉ số 12, kim ngắn chỉ số nào thì là mấy giờ. Đồng hồ này chỉ 3 giờ.',clockSvg(3,130),'Kim dài chỉ số mười hai, kim ngắn chỉ số ba, là ba giờ')],
      gen:()=>mix([M.clock,M.clockPick]),real:'Tự xem đồng hồ và nhắc cả nhà giờ ăn tối, giờ đi ngủ. Nhắc đúng giờ 3 ngày liền.'},
    {id:'m24',title:'Các ngày trong tuần',learn:[card('Một tuần có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ nhật.',`<div class="cal"><small>Tháng Mười</small><b>28</b><span>Thứ Hai</span></div>`,'Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ nhật')],
      gen:()=>mix([M.days,M.week,M.calendar]),real:'Mỗi sáng con nói: hôm nay là thứ mấy, ngày mấy. Đánh dấu vào tờ lịch trên tường cả tuần.'}
  ]);
  T('Ôn tập cả năm',[
    {id:'m25',title:'Ôn tập tổng hợp Toán 1',learn:[card('Bài ôn gồm các dạng con đã học: đếm, so sánh, hình, cộng trừ, đo độ dài, xem giờ.',`<div class="pic-lg">🏆</div>`,'Bài ôn tập tổng hợp')],
      gen:()=>mix([M.count(0,10),M.sign(0,99),M.split(2,10),M.shapeName,M.add(10,false),M.sub(10,false),M.word(10),M.solidName,M.tensOnes,M.add2d,M.sub2d,M.ruler,M.clock,M.days]),real:'Làm "thầy giáo nhỏ": con ra 3 câu đố toán cho bố mẹ giải, rồi con chấm điểm.'}
  ]);
})();
