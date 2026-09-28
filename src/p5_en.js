/* ===================== TIẾNG ANH 1 (Global Success) ===================== */
const EN_NUM=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
const cap=s=>s[0].toUpperCase()+s.slice(1);
const EN=[
 {n:1,t:'In the school playground',vi:'Ở sân trường',L:'B',w:[['ball','quả bóng','⚽'],['book','quyển sách','📕'],['bike','xe đạp','🚲'],['Bill','bạn Bill','👦',1]],sent:["Hi, I'm Bill.","Bye, Linh."],
  real:'Chào bố mẹ và bạn bè bằng tiếng Anh: "Hi, I\'m Minh An." Khi về nói "Bye!".'},
 {n:2,t:'In the dining room',vi:'Trong phòng ăn',L:'C',w:[['cake','cái bánh','🎂'],['car','ô tô','🚗'],['cup','cái cốc','☕'],['cat','con mèo','🐱']],pat:['I have a {w}.',['cake','car','cup','cat']],
  real:'Cầm từng đồ vật và nói "I have a …" với 3 món: cup, cake, car (ô tô đồ chơi).'},
 {n:3,t:'At the street market',vi:'Ở chợ phố',L:'A',w:[['apple','quả táo','🍎'],['bag','cái túi','👜'],['can','cái lon','🥫'],['hat','cái mũ','👒']],pat:['This is my {w}.',['apple','bag','can','hat']],
  real:'Chỉ vào đồ của con và nói "This is my bag", "This is my hat".'},
 {n:4,t:'In the bedroom',vi:'Trong phòng ngủ',L:'D',w:[['desk','bàn học','svg:desk'],['dog','con chó','🐶'],['door','cái cửa','🚪'],['duck','con vịt','🦆']],pat:['This is a {w}.',['desk','dog','door','duck']],
  real:'Đi quanh nhà, chỉ và nói: "This is a door", "This is a desk".'},
 {n:5,t:'At the fish and chip shop',vi:'Ở quán cá và khoai tây chiên',L:'I',w:[['fish','cá','🐟'],['chips','khoai tây chiên','🍟'],['milk','sữa','🥛'],['chicken','thịt gà','🍗']],pat:['I like {w}.',['fish','chips','milk','chicken']],
  real:'Trong bữa ăn, nói món con thích: "I like milk", "I like chicken", "I like fish".'},
 {n:6,t:'In the classroom',vi:'Trong lớp học',L:'E',w:[['red','màu đỏ','🔴'],['pen','cái bút','🖊️'],['pencil','bút chì','✏️'],['bell','cái chuông','🔔']],pat:["It's a red {w}.",['pen','pencil','bell']],
  real:'Tìm 3 đồ màu đỏ trong nhà và nói "It\'s a red …".'},
 {n:7,t:'In the garden',vi:'Trong khu vườn',L:'G',w:[['garden','khu vườn','🏡'],['gate','cái cổng','svg:gate'],['girl','cô bé','👧'],['goat','con dê','🐐']],pat:["There's a {w}.",['garden','gate','girl','goat']],
  real:'Ra công viên hoặc vườn, chỉ và nói "There\'s a garden", "There\'s a gate".'},
 {n:8,t:'In the park',vi:'Ở công viên',L:'H',w:[['hair','tóc','💇‍♀️'],['hand','bàn tay','✋'],['head','cái đầu','👤'],['horse','con ngựa','🐴']],pat:['Touch your {w}.',['hair','hand','head']],
  real:'Chơi "Touch your…" với bố mẹ: bố mẹ nói "Touch your head", con chạm đúng. Rồi con đố lại.'},
 {n:9,t:'In the shop',vi:'Trong cửa hàng',L:'O',w:[['clocks','những cái đồng hồ','🕰️'],['locks','những cái ổ khóa','🔒'],['mops','những cây lau nhà','🧹'],['pots','những cái nồi','🍲']],count:true,
  real:'Đếm đồ vật bằng tiếng Anh: bố mẹ hỏi "How many cups?", con trả lời "Three!".'},
 {n:10,t:'At the zoo',vi:'Ở sở thú',L:'M',w:[['mango','quả xoài','🥭'],['monkey','con khỉ','🐒'],['mother','mẹ','👩'],['mouse','con chuột','🐭']],pat:["That's a {w}.",['mango','monkey','mouse']],
  real:'Xem tranh con vật hoặc đi sở thú, chỉ và nói "That\'s a monkey".'},
 {n:11,t:'At the bus stop',vi:'Ở bến xe buýt',L:'U',w:[['bus','xe buýt','🚌'],['sun','mặt trời','☀️'],['truck','xe tải','🚚'],['running','đang chạy','🏃']],run:true,
  real:'Chạy tại chỗ và nói "I\'m running!". Chỉ vào bố và nói "He\'s running", chỉ vào mẹ nói "She\'s running".'},
 {n:12,t:'At the lake',vi:'Ở bên hồ',L:'L',w:[['lake','cái hồ','🏞️'],['leaf','chiếc lá','🍃'],['lemons','những quả chanh','🍋'],['Lucy','bạn Lucy','👧',1]],pat:['Look at the {w}.',['lake','leaf','lemons']],
  real:'Tìm lá cây và quả chanh trong nhà hoặc vườn, nói "Look at the leaf", "Look at the lemons".'},
 {n:13,t:'In the school canteen',vi:'Ở căng tin trường',L:'N',w:[['noodles','mì','🍜'],['nuts','các loại hạt','🥜'],['bananas','những quả chuối','🍌'],['Nick','bạn Nick','👦',1]],having:true,
  real:'Trong bữa ăn, nói người khác đang ăn gì: "He\'s having noodles", "She\'s having bananas".'},
 {n:14,t:'In the toy shop',vi:'Ở cửa hàng đồ chơi',L:'T',w:[['teddy bear','gấu bông','🧸'],['tiger','con hổ','🐯'],['top','con quay','svg:top'],['turtle','con rùa','🐢']],pat:['I can see a {w}.',['teddy bear','tiger','top','turtle']],
  real:'Xếp đồ chơi ra bàn và nói "I can see a teddy bear", "I can see a top".'},
 {n:15,t:'At the football match',vi:'Ở trận bóng đá',L:'F',w:[['face','khuôn mặt','🙂'],['foot','bàn chân','🦶'],['father','bố','👨'],['football','bóng đá','⚽']],pat:['Point to your {w}.',['face','foot','hand','hair']],
  real:'Chơi "Point to your face / foot / hair" cùng bố mẹ. Người nào chỉ sai phải hát 1 bài.'},
 {n:16,t:'At home',vi:'Ở nhà',L:'W',w:[['window','cửa sổ','🪟'],['water','nước','💧'],['washing','giặt, rửa','🧼'],['Wendy','bạn Wendy','👧',1]],win:true,
  real:'Đếm số cửa sổ trong nhà bằng tiếng Anh và nói "I can see … windows".'}
];
const EN_ALL=EN.flatMap(u=>u.w.filter(w=>!w[3]).map(w=>({en:w[0],vi:w[1],pic:w[2],u:u.n})));
const EN_PIC=Object.fromEntries(EN_ALL.map(w=>[w.en,w.pic]));
const enOptPic=w=>({pic:w.pic,k:w.en,say:w.en,lang:'en'});
const enOptWord=w=>({t:w.en,k:w.en});
function enOthers(w){return shuffle(EN_ALL.filter(x=>x.en!==w.en&&x.pic!==w.pic));}
const bigPic=p=>`<div class="pic-lg">${picHTML(p)}</div>`;
function enMatchSet(ws){
  const pool=[...shuffle(ws)];for(const x of shuffle(EN_ALL)){if(pool.length>=4)break;if(!pool.some(y=>y.en===x.en||y.pic===x.pic))pool.push(x);}
  return pool.slice(0,4);
}
function enGens(u){
  const ws=EN_ALL.filter(x=>x.u===u.n);
  const g=[
    ()=>{const w=pick(ws);return Q('Listen and choose.',enOptPic(w),enOthers(w).map(enOptPic),{sub:'Nghe và chọn hình đúng',audio:{text:w.en,lang:'en'},cols:4});},
    ()=>{const w=pick(ws);return Q('What is it?',enOptWord(w),[...ws.filter(x=>x!==w),...enOthers(w)].map(enOptWord),{sub:'Đây là gì? Chọn từ đúng',visual:bigPic(w.pic),cols:2,optLang:'en'});},
    ()=>{const Lc=u.L.toLowerCase();const starts=ws.filter(x=>x.en[0].toLowerCase()===Lc);const good=starts.length?starts:ws.filter(x=>x.en.toLowerCase().includes(Lc));if(!good.length)return null;const w=pick(good);
      const bad=EN_ALL.filter(x=>starts.length?x.en[0].toLowerCase()!==Lc:!x.en.toLowerCase().includes(Lc));
      return Q(starts.length?`Which word starts with the letter ${u.L}?`:`Which word has the letter ${u.L}?`,{pic:w.pic,t:w.en,k:w.en},shuffle(bad).map(x=>({pic:x.pic,t:x.en,k:x.en})),{sub:starts.length?`Từ nào bắt đầu bằng chữ ${u.L}?`:`Từ nào có chữ ${u.L}?`,cols:2,optLang:'en'});},
    ()=>{const w=pick(ws);return Q(`What does "${w.en}" mean?`,{pic:w.pic,t:w.vi,k:w.vi},enOthers(w).map(x=>({pic:x.pic,t:x.vi,k:x.vi})),{sub:'Từ này nghĩa là gì?',audio:{text:w.en,lang:'en'},cols:2});},
    ()=>({type:'match',prompt:'Match the pictures and the words.',sub:'Nối hình với từ đúng: chạm hoặc kéo hình vào từ',pairs:enMatchSet(ws).map(w=>({pic:w.pic,t:w.en}))}),
    ()=>{const c=ws.filter(w=>w.en.length<=6&&!w.en.includes(' '));if(!c.length)return null;const w=pick(c);
      return {type:'order',prompt:'Spell the word.',sub:'Kéo các chữ cái để xếp thành từ',items:w.en.split(''),audio:{text:w.en,lang:'en'},visual:bigPic(w.pic),lang:'en',letters:true};}
  ];
  if(u.pat){const [tpl,list]=u.pat;const S=x=>tpl.replace('{w}',x);
    g.push(()=>{const x=pick(list);return Q('Choose the right sentence.',S(x),list.filter(y=>y!==x).map(S),{sub:'Chọn câu đúng với hình',visual:bigPic(EN_PIC[x]),cols:1,optLang:'en'});});
    g.push(()=>{const x=pick(list);return {type:'order',prompt:'Listen and put the words in order.',sub:'Nghe rồi kéo các từ thành câu',items:S(x).split(' '),audio:{text:S(x),lang:'en'},visual:bigPic(EN_PIC[x]),lang:'en'};});
  }
  if(u.sent){
    g.push(()=>Q('You meet a new friend. What do you say?',"Hi, I'm Minh An.",['Bye, Minh An.','I have a ball.','Touch your head.'],{sub:'Gặp bạn mới, con nói gì?',visual:bigPic('👋'),cols:1,optLang:'en'}));
    g.push(()=>Q('It is time to go home. What do you say?','Bye, Linh.',["Hi, I'm Linh.",'I like milk.',"That's a monkey."],{sub:'Lúc ra về, con chào bạn thế nào?',visual:bigPic('🏫'),cols:1,optLang:'en'}));
    g.push(()=>({type:'order',prompt:'Listen and put the words in order.',sub:'Nghe rồi kéo các từ thành câu',items:["Hi,","I'm","Bill."],audio:{text:"Hi, I'm Bill.",lang:'en'},lang:'en'}));
  }
  if(u.count){g.push(()=>{const w=pick(ws),n=rint(2,5);return Q(`How many ${w.en}?`,cap(EN_NUM[n])+'.',[2,3,4,5].filter(x=>x!==n).map(x=>cap(EN_NUM[x])+'.'),{sub:'Có bao nhiêu? Đếm rồi chọn',visual:grp(picHTML(w.pic),n),cols:2,optLang:'en'});});
    g.push(()=>{const n=rint(1,10);return Q('Listen and choose the number.',n,numOpts(n,1,10),{sub:'Nghe và chọn số đúng',audio:{text:EN_NUM[n],lang:'en'},cols:4,big:true});});}
  if(u.run){g.push(()=>{const he=Math.random()<.5;const c=he?"He's running.":"She's running.";return Q('Choose the right sentence.',c,[he?"She's running.":"He's running.","He's having nuts.","I like fish."],{sub:'Chọn câu đúng với hình',visual:bigPic(he?'🏃‍♂️':'🏃‍♀️'),cols:1,optLang:'en'});});}
  if(u.having){const foods=['noodles','nuts','bananas','chips'];g.push(()=>{const he=Math.random()<.5,f=pick(foods);const S=(p,x)=>`${p}'s having ${x}.`;const c=S(he?'He':'She',f);
    return Q('Choose the right sentence.',c,[S(he?'She':'He',f),S(he?'He':'She',pick(foods.filter(x=>x!==f))),S(he?'She':'He',pick(foods.filter(x=>x!==f)))],{sub:'Chọn câu đúng với hình',visual:`<div class="pic-lg">${he?'👦':'👧'} ${EN_PIC[f]}</div>`,cols:1,optLang:'en'});});
    g.push(()=>{const f=pick(foods);const s=`She's having ${f}.`;return {type:'order',prompt:'Listen and put the words in order.',sub:'Nghe rồi kéo các từ thành câu',items:s.split(' '),audio:{text:s,lang:'en'},visual:`<div class="pic-lg">👧 ${EN_PIC[f]}</div>`,lang:'en'};});}
  if(u.win){g.push(()=>{const n=rint(6,10);const S=x=>`I can see ${EN_NUM[x]} windows.`;return Q('How many windows can you see?',S(n),[6,7,8,9,10].filter(x=>x!==n).map(S),{sub:'Con thấy mấy cửa sổ?',visual:grp('🪟',n,'sm'),cols:1,optLang:'en'});});
    g.push(()=>{const n=rint(6,10);return Q('Listen and choose the number.',n,numOpts(n,1,10),{sub:'Nghe và chọn số đúng',audio:{text:EN_NUM[n],lang:'en'},cols:4,big:true});});}
  return g;
}
function enSentences(u){
  if(u.pat)return u.pat[1].map(x=>u.pat[0].replace('{w}',x));
  if(u.sent)return u.sent;
  if(u.count)return ['How many clocks? – Two.','How many pots? – Four.'];
  if(u.run)return ["He's running.","She's running."];
  if(u.having)return ["He's having nuts.","She's having noodles."];
  if(u.win)return ['How many windows can you see?','I can see six windows.'];
  return [];
}
(function(){
  const groups=[['Units 1 – 4',0,4],['Units 5 – 8',4,8],['Units 9 – 12',8,12],['Units 13 – 16',12,16]];
  groups.forEach(([nm,a,b])=>{const tp=topic('en',nm);EN.slice(a,b).forEach(u=>addLesson(tp,'en',{id:'e'+u.n,title:`Unit ${u.n}: ${u.t}`,sub:u.vi,en:u,gen:()=>mix(enGens(u)),real:u.real}));});
  const tp=topic('en','Ôn tập');
  addLesson(tp,'en',{id:'e17',title:'Ôn tập cả năm (Units 1 – 16)',sub:'Review',enReview:true,gen:()=>mix(EN.map(u=>()=>pick(enGens(u))())),real:'Làm "cô giáo tiếng Anh": dạy bố mẹ 5 từ tiếng Anh con thích nhất, kèm cách đọc.'});
})();
