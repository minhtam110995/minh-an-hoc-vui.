/* ===================== TIẾNG VIỆT 1 (Kết nối tri thức) ===================== */
const TONEMARK={'̀':'huyền','́':'sắc','̉':'hỏi','̃':'ngã','̣':'nặng'};
const TONE_SIGN={ngang:'không dấu',huyền:'dấu huyền ( ` )',sắc:'dấu sắc ( ´ )',hỏi:'dấu hỏi ( ̉ )',ngã:'dấu ngã ( ~ )',nặng:'dấu nặng ( . )'};
function vbase(s){return s.normalize('NFD').replace(/[̣̀́̉̃]/g,'').normalize('NFC').toLowerCase();}
function toneOf(s){const d=s.normalize('NFD');for(const k in TONEMARK)if(d.includes(k))return TONEMARK[k];return 'ngang';}
const INITS=['ngh','ng','gh','gi','kh','nh','ph','qu','th','tr','ch','b','c','d','đ','g','h','k','l','m','n','p','r','s','t','v','x'];
function parseSyl(s){const b=vbase(s);if(b==='gi')return{init:'gi',rime:'i'};for(const i of INITS){if(b.startsWith(i)&&b.length>i.length)return{init:i,rime:b.slice(i.length)};}return{init:'',rime:b};}
const isCons=u=>INITS.includes(u);

const WB=('cá=🐟;gà=🐔;bà=👵;lá=🍃;bé=👶;bò=🐄;bóng=⚽;bánh=🍰;bút=✏️;bướm=🦋;bí ngô=🎃;bơ=🥑;cua=🦀;cây=🌳;cam=🍊;cơm=🍚;cốc=🥤;cú=🦉;cờ=🚩;'+
'xe máy=🛵;xe đạp=🚲;mẹ=👩;tre=🎋;dế=🦗;lê=🍐;ghế=🪑;chó=🐕;thỏ=🐇;nho=🍇;cỏ=🌿;lọ=🫙;ô=🌂;ô tô=🚗;hổ=🐯;bố=👨;tổ=🪺;rổ=🧺;nơ=🎀;phở=🍜;vở=📓;'+
'dê=🐐;dưa=🍉;dừa=🥥;dù=☂️;đèn=💡;đỏ=🔴;đào=🍑;đĩa=🍽️;đồng hồ=⏰;đàn=🎸;ví=👛;bi=🔵;kì đà=🦎;kéo=✂️;kem=🍦;kính=👓;kiến=🐜;kẹo=🍬;'+
'hoa=🌸;hề=🤡;hộp=📦;hươu=🦌;hà mã=🦛;lợn=🐖;lửa=🔥;lều=⛺;lạc=🥜;mũ=🧢;tủ=🗄️;đu quay=🎡;thư=✉️;sư tử=🦁;chữ=🔤;chuối=🍌;chim=🐦;chổi=🧹;chùa=🛕;'+
'khỉ=🐒;khăn=🧣;khóa=🔒;khoai=🥔;khủng long=🦖;mèo=🐈;mưa=🌧️;mây=☁️;mắt=👁️;nón=👒;nước=💧;nấm=🍄;nến=🕯️;gấu=🐻;gỗ=🪵;gạo=🌾;găng tay=🧤;'+
'giày=👟;gió=🌬️;giường=🛏️;ghim=📌;nhà=🏠;nhện=🕷️;nhím=🦔;nhẫn=💍;ngựa=🐎;ngô=🌽;ngỗng=🦢;ngủ=😴;nghĩ=🤔;nghé=🐂;rùa=🐢;rau=🥬;rắn=🐍;rồng=🐉;'+
'sao=⭐;sữa=🥛;sách=📚;sóc=🐿️;sò=🐚;tôm=🦐;táo=🍎;tay=✋;tàu=🚢;tỏi=🧄;tai=👂;trăng=🌙;trống=🥁;trứng=🥚;trâu=🐃;tranh=🖼️;thuyền=⛵;thịt=🍖;thước=📏;'+
'chìa khóa=🔑;múa=💃;vua=👑;cửa=🚪;pháo hoa=🎆;phố=🏙️;phao=🛟;quà=🎁;quạt=🪭;quần=👖;vịt=🦆;voi=🐘;váy=👗;xoài=🥭;xà phòng=🧼;xôi=🍙;xương=🦴;y tá=👩‍⚕️;'+
'bạn=🧑‍🤝‍🧑;bàn chải=🪥;chân=🦶;cân=⚖️;hòn đá=🪨;bốn=4️⃣;sơn=🎨;kèn=🎺;ốc sên=🐌;pin=🔋;chín=9️⃣;giun=🪱;con cún=🐶;tám=8️⃣;tằm=🐛;ôm=🤗;xem=👀;đêm=🌃;tim=💗;'+
'hai=2️⃣;máy bay=✈️;còi=📯;dơi=🦇;bơi=🏊;núi=⛰️;túi=👜;ngửi=👃;muối=🧂;người=🧍;lưới=🥅;dao=🔪;áo=👕;rìu=🪓;cừu=🐑;cầu=🌉;bát=🥣;cát=🏖️;bắt tay=🤝;'+
'mật ong=🍯;trái đất=🌍;bọt=🫧;cà rốt=🥕;một=1️⃣;ớt=🌶️;vẹt=🦜;tết=🧧;tháp=🗼;cặp=🎒;lớp=🏫;dép=🩴;bếp=🍳;búp bê=🪆;chanh=🍋;bình=🏺;ếch=🐸;lịch=📅;'+
'thang=🪜;răng=🦷;ong=🐝;ông=👴;thùng=🪣;gừng=🫚;xiếc=🎪;tiên=🧚;biển=🌊;thiệp=💌;viết=✍️;diều=🪁;yêu=🥰;chuông=🔔;thuốc=💊;chuột=🐭;vườn=🏡;gương=🪞;'+
'lược=🪮;loa=📢;huân chương=🎖️;tuyết=❄️;tàu thủy=🛳️;bông=🌼;lông=🪶;xăng=⛽;chăn=🛌;nắng=☀️;đồng=🪙')
  .split(';').map(x=>{const [w,e]=x.split('=');return {w,e,syl:w.split(' ').map(parseSyl)};});

function hasU(w,u){return w.syl.some(s=>isCons(u)?s.init===u:s.rime===u);}
const wordsWith=u=>WB.filter(w=>hasU(w,u));
function blankWord(w,u){
  const parts=w.w.split(' ');const i=w.syl.findIndex(s=>isCons(u)?s.init===u:s.rime===u);
  const s=parts[i],p=w.syl[i];parts[i]=isCons(u)?'＿'+s.slice(p.init.length):s.slice(0,p.init.length)+'＿';
  return parts.join(' ');
}
const SAYU={b:'bờ',c:'cờ',d:'dờ',đ:'đờ',g:'gờ',h:'hờ',k:'ca',l:'lờ',m:'mờ',n:'nờ',p:'pờ',r:'rờ',s:'sờ',t:'tờ',v:'vờ',x:'xờ',ch:'chờ',kh:'khờ',gh:'gờ kép',gi:'di',nh:'nhờ',ng:'ngờ',ngh:'ngờ kép',ph:'phờ',qu:'quờ',th:'thờ',tr:'trờ',y:'i dài',i:'i ngắn'};
const sayU=u=>SAYU[u]||u;
const ALL_V=['a','ă','â','e','ê','i','o','ô','ơ','u','ư','y','ia','ua','ưa'];
const RIMES=[];
function similarUnits(u,units){
  const kindCons=isCons(u);
  const pool=[...units.filter(x=>x!==u&&isCons(x)===kindCons),...shuffle((kindCons?INITS:[...ALL_V,...RIMES]).filter(x=>x!==u&&!units.includes(x)))];
  return pool;
}
const optW=w=>({pic:w.e,t:w.w,k:w.w});
const optP=w=>({pic:w.e,k:w.e,say:w.w});
function tvGens(units,label){
  const withW=units.filter(u=>wordsWith(u).length);
  const uw=()=>WB.filter(w=>withW.some(u=>hasU(w,u)));
  const uo=x=>({t:x,k:x,say:sayU(x)});
  const g=[
    ()=>{const u=pick(units);return Q('Nghe và chọn chữ đúng',uo(u),similarUnits(u,units).map(uo),{audio:{text:sayU(u)},cols:4,big:true});},
    ()=>{const u=pick(withW),w=pick(wordsWith(u));return Q(`Hình nào có ${label} "${u}"?`,optW(w),shuffle(WB.filter(x=>!hasU(x,u))).map(optW),{cols:2,say:`Hình nào có ${label} ${sayU(u)}?`});},
    ()=>{const w=pick(uw());return Q('Con đọc chữ, rồi chọn hình đúng',optP(w),shuffle(WB.filter(x=>x.e!==w.e)).map(optP),{visual:`<div class="word">${w.w}</div>`,cols:4});},
    ()=>{const u=pick(withW),w=pick(wordsWith(u));return Q(`Chọn ${label} còn thiếu`,uo(u),similarUnits(u,units).map(uo),{visual:`<div class="pic-lg">${w.e}</div><div class="word">${blankWord(w,u)}</div>`,cols:4,big:true,say:`Chọn ${label} còn thiếu trong tiếng ${w.w}`});},
    ()=>{const w=pick(uw());return Q('Nghe và chọn hình đúng',optP(w),shuffle(WB.filter(x=>x.e!==w.e)).map(optP),{audio:{text:w.w},cols:4});}
  ];
  return withW.length?g:[g[0]];
}
function tvLearn(units,label){
  return units.map(u=>{const ex=sample(wordsWith(u),3);return {unit:u,say:`${label} ${sayU(u)}`,ex};});
}
const TONE_SETS=[['ma','mà','má','mả','mã','mạ'],['ba','bà','bá','bả','bã','bạ'],['be','bè','bé','bẻ','bẽ','bẹ'],['co','cò','có','cỏ','cõ','cọ'],['ca','cà','cá','cả','cã','cạ']];
const TONE_ORDER=['ngang','huyền','sắc','hỏi','ngã','nặng'];
const oneSyl=()=>WB.filter(w=>w.syl.length===1);
const toneGens=[
  ()=>{const w=pick(oneSyl()),t=toneOf(w.w);const o=x=>({t:TONE_SIGN[x],k:x});return Q('Tiếng này có dấu gì?',o(t),shuffle(TONE_ORDER.filter(x=>x!==t)).map(o),{visual:`<div class="pic-lg">${w.e}</div><div class="word">${w.w}</div>`,cols:2});},
  ()=>{const t=pick(TONE_ORDER.slice(1));const good=oneSyl().filter(w=>toneOf(w.w)===t),bad=oneSyl().filter(w=>toneOf(w.w)!==t);const w=pick(good);return Q(`Tiếng nào có ${TONE_SIGN[t].split(' (')[0]}?`,optW(w),shuffle(bad).map(optW),{cols:2});},
  ()=>{const set=pick(TONE_SETS),w=pick(set);return Q('Nghe và chọn tiếng đúng',{t:w,k:w},shuffle(set.filter(x=>x!==w)).map(x=>({t:x,k:x})),{audio:{text:w},cols:2,big:true});}
];
const SPELL=[['cá','🐟','c'],['kem','🍦','k'],['kéo','✂️','k'],['kính','👓','k'],['cua','🦀','c'],['cam','🍊','c'],['kiến','🐜','k'],['cây','🌳','c'],['kẹo','🍬','k'],['cốc','🥤','c'],
  ['gà','🐔','g'],['ghế','🪑','gh'],['gấu','🐻','g'],['gỗ','🪵','g'],['ghim','📌','gh'],['ngựa','🐎','ng'],['nghé','🐂','ngh'],['ngô','🌽','ng'],['nghĩ','🤔','ngh'],['ngủ','😴','ng']];
const PAIRS={c:['c','k'],k:['c','k'],g:['g','gh'],gh:['g','gh'],ng:['ng','ngh'],ngh:['ng','ngh']};
const spellGens=[
  ()=>{const [w,e,u]=pick(SPELL);const [a,b]=PAIRS[u];return Q(`Điền ${a} hay ${b}?`,{t:u,k:u,say:sayU(u)},[{t:u===a?b:a,k:u===a?b:a,say:sayU(u===a?b:a)}],{visual:`<div class="pic-lg">${e}</div><div class="word">＿${w.slice(u.length)}</div>`,n:2,cols:2,big:true});},
  ()=>{const [w,e,u]=pick(SPELL);const [a,b]=PAIRS[u];const wrong=(u===a?b:a)+w.slice(u.length);return Q('Chữ nào viết đúng?',{t:w,k:w},[{t:wrong,k:wrong}],{visual:`<div class="pic-lg">${e}</div>`,n:2,cols:2,big:true});}
];

/* ---- original reading passages (Tập 2 themes) ---- */
const READS=[
 {topic:'Tôi và các bạn',real:'Hỏi tên và làm quen với 1 bạn mới ở lớp hoặc ở khu nhà. Về kể lại cho bố mẹ nghe bạn tên gì, thích gì.',ps:[
  {t:'Bạn mới',x:'Lớp em có bạn mới tên là Hà. Hà còn ngại, chưa chơi với ai. Giờ ra chơi, Minh An rủ Hà nhảy dây. Hà cười thật tươi. Từ hôm đó, hai bạn chơi rất thân.',
   q:[['Bạn mới tên là gì?',['Hà','Lan','Mai','Nga']],['Lúc đầu, Hà thế nào?',['Còn ngại, chưa chơi với ai','Rất nghịch','Hay trêu bạn','Hay khóc nhè']],['Minh An rủ Hà chơi gì?',['Nhảy dây','Đá bóng','Vẽ tranh','Đọc truyện']]],
   o:'Hà cười thật tươi',f:['Minh An rủ Hà ___ dây.',['nhảy','ăn','ngủ','hát']]},
  {t:'Chiếc bút chì',x:'Nam quên mang bút chì. Lan có hai cái bút chì. Lan cho Nam mượn một cái. Nam nói: "Cảm ơn bạn!". Lan vui vì đã giúp bạn.',
   q:[['Ai quên mang bút chì?',['Nam','Lan','Hà','Cô giáo']],['Lan có mấy cái bút chì?',['Hai cái','Một cái','Ba cái','Năm cái']],['Nam nói gì với Lan?',['Cảm ơn bạn!','Tạm biệt!','Chúc ngủ ngon!','Xin chào!']]],
   o:'Lan cho Nam mượn bút',f:['Lan vui vì đã ___ bạn.',['giúp','trêu','chê','quên']]}]},
 {topic:'Mái ấm gia đình',real:'Tối nay con giúp mẹ xếp bát đũa và kể cho cả nhà nghe 1 chuyện vui ở trường.',ps:[
  {t:'Bữa cơm tối',x:'Tối nào cả nhà cũng ăn cơm cùng nhau. Mẹ nấu canh rau. Bố rán cá. Minh An xếp bát đũa. Cả nhà vừa ăn vừa kể chuyện vui.',
   q:[['Mẹ nấu món gì?',['Canh rau','Cá rán','Thịt gà','Phở']],['Minh An làm gì?',['Xếp bát đũa','Nấu canh','Rán cá','Rửa bát']],['Cả nhà vừa ăn vừa làm gì?',['Kể chuyện vui','Xem ti vi','Đọc sách','Hát to']]],
   o:'Cả nhà ăn cơm cùng nhau',f:['Mẹ nấu ___ rau.',['canh','xe','mũ','sách']]},
  {t:'Ông của em',x:'Ông em năm nay đã bảy mươi tuổi. Tóc ông bạc trắng. Sáng nào ông cũng tưới cây. Em thích nghe ông kể chuyện cổ tích.',
   q:[['Ông năm nay bao nhiêu tuổi?',['Bảy mươi tuổi','Bảy tuổi','Mười bảy tuổi','Bảy trăm tuổi']],['Sáng nào ông cũng làm gì?',['Tưới cây','Đá bóng','Đi học','Nấu cơm']],['Em thích nghe ông kể gì?',['Chuyện cổ tích','Chuyện ma','Tin thời sự','Bài hát']]],
   o:'Em thích nghe ông kể chuyện',f:['Tóc ông ___ trắng.',['bạc','đỏ','xanh','tím']]}]},
 {topic:'Mái trường mến yêu',real:'Sau khi học, con tự cất sách vở gọn gàng và kể cho bố mẹ nghe hôm nay con học được điều gì.',ps:[
  {t:'Buổi sáng ở trường',x:'Trống trường vang lên tùng tùng. Các bạn xếp hàng vào lớp. Cô giáo mỉm cười chào cả lớp. Hôm nay, lớp em tập viết chữ a.',
   q:[['Cái gì kêu tùng tùng?',['Trống trường','Chuông xe đạp','Còi ô tô','Điện thoại']],['Các bạn vào lớp thế nào?',['Xếp hàng','Chạy ùa vào','Chen lấn','Đi một mình']],['Hôm nay lớp tập viết chữ gì?',['Chữ a','Chữ b','Chữ c','Chữ d']]],
   o:'Các bạn xếp hàng vào lớp',f:['Cô giáo mỉm ___ chào cả lớp.',['cười','khóc','ngủ','chạy']]},
  {t:'Thư viện',x:'Thư viện trường em có rất nhiều sách. Có sách truyện, sách tranh và sách khoa học. Vào thư viện, các bạn đi nhẹ, nói khẽ. Đọc xong, em cất sách về chỗ cũ.',
   q:[['Thư viện có gì?',['Rất nhiều sách','Rất nhiều đồ chơi','Rất nhiều bánh','Rất nhiều cây']],['Vào thư viện, các bạn phải thế nào?',['Đi nhẹ, nói khẽ','Chạy nhảy','Hát thật to','Ăn quà']],['Đọc xong, em làm gì?',['Cất sách về chỗ cũ','Mang sách về nhà','Để sách trên sàn','Vẽ vào sách']]],
   o:'Em cất sách về chỗ cũ',f:['Các bạn đi nhẹ, nói ___.',['khẽ','to','hét','ồn']]}]},
 {topic:'Điều em cần biết',real:'Học thuộc số điện thoại của bố hoặc mẹ. Tập nói: "Cháu tên là Minh An, bố/mẹ cháu tên là…, số điện thoại là…".',ps:[
  {t:'Qua đường',x:'Muốn sang đường, em phải đi cùng người lớn. Em đi trên vạch kẻ trắng. Đèn đỏ thì dừng lại. Đèn xanh mới được đi.',
   q:[['Muốn sang đường, em đi cùng ai?',['Người lớn','Em nhỏ','Con chó','Đi một mình']],['Đèn đỏ thì em làm gì?',['Dừng lại','Chạy thật nhanh','Nhảy qua','Đi tiếp']],['Em sang đường ở đâu?',['Trên vạch kẻ trắng','Giữa đường','Chỗ không có ai','Trên vỉa hè']]],
   o:'Đèn xanh mới được đi',f:['Đèn đỏ thì ___ lại.',['dừng','chạy','nhảy','hát']]},
  {t:'Khi bị lạc',x:'Nếu bị lạc ở chỗ đông người, em đứng yên một chỗ. Em nhờ cô bán hàng hoặc chú bảo vệ giúp. Em nói tên bố mẹ và số điện thoại. Em không đi theo người lạ.',
   q:[['Khi bị lạc, việc đầu tiên em làm là gì?',['Đứng yên một chỗ','Chạy đi tìm','Khóc thật to','Đi theo người lạ']],['Em nhờ ai giúp?',['Cô bán hàng hoặc chú bảo vệ','Người lạ rủ đi','Không nhờ ai','Một bạn nhỏ']],['Em có đi theo người lạ không?',['Không','Có','Có, nếu được cho kẹo','Có, nếu họ cười']]],
   o:'Em không đi theo người lạ',f:['Em nói tên bố mẹ và số ___ thoại.',['điện','xe','nhà','cây']]}]},
 {topic:'Bài học từ cuộc sống',real:'Kể cho bố mẹ nghe 1 lần con đã nói thật, hoặc 1 lần con biết nhận lỗi. Bố mẹ khen con.',ps:[
  {t:'Kiến và châu chấu',x:'Mùa hè, kiến chăm chỉ tha mồi về tổ. Châu chấu chỉ mải chơi. Mùa đông đến, trời lạnh. Kiến có đủ thức ăn, còn châu chấu thì đói.',
   q:[['Mùa hè, kiến làm gì?',['Tha mồi về tổ','Đi chơi','Ngủ cả ngày','Ca hát']],['Châu chấu thế nào?',['Mải chơi','Chăm chỉ','Tha mồi','Xây tổ']],['Vì sao kiến có đủ thức ăn?',['Vì kiến chăm chỉ','Vì kiến may mắn','Vì châu chấu cho','Vì trời lạnh']]],
   o:'Kiến có đủ thức ăn',f:['Mùa đông đến, trời ___.',['lạnh','nóng','mưa','sáng']]},
  {t:'Bình hoa vỡ',x:'Bi chơi bóng trong nhà, làm vỡ bình hoa. Bi sợ lắm. Nhưng Bi vẫn nói thật với mẹ. Mẹ ôm Bi và khen con dũng cảm.',
   q:[['Bi làm vỡ cái gì?',['Bình hoa','Cái cốc','Cửa kính','Cái đĩa']],['Bi đã làm gì?',['Nói thật với mẹ','Giấu đi','Đổ tại em','Bỏ chạy']],['Mẹ khen Bi thế nào?',['Dũng cảm','Nghịch ngợm','Lười biếng','Chạy nhanh']]],
   o:'Bi nói thật với mẹ',f:['Bi chơi ___ trong nhà.',['bóng','cơm','sách','mưa']]}]},
 {topic:'Thiên nhiên kì thú',real:'Gieo 1 hạt đỗ vào cốc đất, mỗi ngày tưới nước và báo bố mẹ khi hạt nảy mầm.',ps:[
  {t:'Cơn mưa',x:'Trời đang nắng bỗng tối sầm. Gió thổi mạnh. Mưa rơi lộp độp. Cây cối được tắm mát. Mưa tạnh, cầu vồng hiện ra thật đẹp.',
   q:[['Mưa rơi thế nào?',['Lộp độp','Tùng tùng','Ầm ầm','Ríu rít']],['Mưa tạnh thì cái gì hiện ra?',['Cầu vồng','Mặt trăng','Ngôi sao','Cánh diều']],['Ai được tắm mát?',['Cây cối','Ô tô','Con mèo','Ngôi nhà']]],
   o:'Mưa rơi lộp độp',f:['Gió thổi ___.',['mạnh','ngọt','tròn','xanh']]},
  {t:'Hạt đỗ nảy mầm',x:'Em gieo một hạt đỗ vào cốc đất. Ngày nào em cũng tưới nước. Mấy hôm sau, hạt đỗ nảy mầm. Cây đỗ nhỏ vươn lên đón nắng.',
   q:[['Em gieo hạt gì?',['Hạt đỗ','Hạt lạc','Hạt bí','Hạt ngô']],['Ngày nào em cũng làm gì?',['Tưới nước','Nhổ cây','Hát cho cây','Bón phân']],['Cây đỗ vươn lên đón gì?',['Nắng','Mưa','Gió','Trăng']]],
   o:'Hạt đỗ nảy mầm',f:['Em gieo hạt đỗ vào cốc ___.',['đất','sữa','nước ngọt','kẹo']]}]},
 {topic:'Thế giới trong mắt em',real:'Giới thiệu với bố mẹ đồ chơi con thích nhất: tên là gì, màu gì, vì sao con thích.',ps:[
  {t:'Chú gấu Bông',x:'Em có một chú gấu bông màu nâu. Gấu có đôi mắt tròn xoe. Tối nào em cũng ôm gấu đi ngủ. Em đặt tên gấu là Bông.',
   q:[['Gấu bông màu gì?',['Màu nâu','Màu hồng','Màu xanh','Màu trắng']],['Mắt gấu thế nào?',['Tròn xoe','Nhỏ xíu','Dài','Vuông']],['Gấu tên là gì?',['Bông','Na','Mi','Bin']]],
   o:'Em ôm gấu đi ngủ',f:['Gấu có đôi mắt ___ xoe.',['tròn','vuông','dài','nhọn']]},
  {t:'Bầu trời đêm',x:'Buổi tối, em cùng bố ra ban công. Trên trời có trăng sáng. Những ngôi sao lấp lánh như đang cười. Bố chỉ cho em ngôi sao sáng nhất.',
   q:[['Em cùng ai ra ban công?',['Bố','Mẹ','Bà','Bạn']],['Trên trời có gì?',['Trăng và sao','Mặt trời','Cầu vồng','Máy bay']],['Bố chỉ cho em cái gì?',['Ngôi sao sáng nhất','Đám mây','Con chim','Cây cao']]],
   o:'Trên trời có trăng sáng',f:['Những ngôi sao lấp ___.',['lánh','lửng','ló','lá']]}]},
 {topic:'Đất nước và con người',real:'Vẽ lá cờ Tổ quốc và kể tên 3 nghề con biết (ví dụ bác nông dân, cô giáo, chú công an).',ps:[
  {t:'Lá cờ Tổ quốc',x:'Thứ Hai nào trường em cũng chào cờ. Lá cờ đỏ có ngôi sao vàng năm cánh. Các bạn đứng nghiêm, hát Quốc ca. Em rất yêu lá cờ Tổ quốc.',
   q:[['Trường chào cờ vào thứ mấy?',['Thứ Hai','Thứ Ba','Thứ Bảy','Chủ nhật']],['Lá cờ có màu gì?',['Nền đỏ, sao vàng','Nền xanh, sao trắng','Nền vàng, sao đỏ','Nền trắng, sao xanh']],['Ngôi sao có mấy cánh?',['Năm cánh','Ba cánh','Bốn cánh','Sáu cánh']]],
   o:'Em rất yêu lá cờ Tổ quốc',f:['Các bạn đứng ___, hát Quốc ca.',['nghiêm','ngủ','nhảy','chơi']]},
  {t:'Bác nông dân',x:'Bác nông dân dậy từ sáng sớm. Bác cày ruộng, cấy lúa. Nhờ có bác, chúng em có cơm trắng để ăn. Em ăn hết cơm để cảm ơn bác.',
   q:[['Bác nông dân dậy lúc nào?',['Sáng sớm','Buổi trưa','Buổi tối','Nửa đêm']],['Bác làm gì?',['Cày ruộng, cấy lúa','Dạy học','Lái xe','Bán hàng']],['Em làm gì để cảm ơn bác?',['Ăn hết cơm','Bỏ thừa cơm','Chê cơm','Đổ cơm đi']]],
   o:'Em ăn hết cơm',f:['Bác cày ruộng, cấy ___.',['lúa','hoa','nhà','xe']]}]}
];
function readGens(r){
  const out=[];
  r.ps.forEach(p=>{
    const vis=`<div class="passage"><h4>${esc(p.t)}<button class="say sm" data-a="say" data-say="${esc(p.t+'. '+p.x)}" aria-label="Đọc bài">${SPEAKER}</button></h4>${esc(p.x)}</div>`;
    p.q.forEach(([pr,op])=>out.push(Q(pr,op[0],op.slice(1),{visual:vis,cols:1,optLang:'vi'})));
    out.push({type:'order',prompt:'Xếp các từ thành câu đúng trong bài',items:p.o.split(' '),visual:vis});
    out.push(Q('Chọn từ đúng điền vào chỗ trống',p.f[1][0],p.f[1].slice(1),{visual:vis+`<div class="fill">${esc(p.f[0]).replace('___','<u>&nbsp;?&nbsp;</u>')}</div>`,cols:4,say:'Chọn từ đúng điền vào chỗ trống: '+p.f[0].replace('___','gì')}));
  });
  return out;
}

(function(){
  const LET=[
    ['tv1','a, b, c',['a','b','c']],['tv2','e, ê, o, ô, ơ',['e','ê','o','ô','ơ']],['tv3','d, đ, i, k',['d','đ','i','k']],['tv4','h, l, u, ư',['h','l','u','ư']],
    ['tv5','ch, kh, m, n',['ch','kh','m','n']],['tv6','g, gi, gh, nh',['g','gi','gh','nh']],['tv7','ng, ngh, r, s',['ng','ngh','r','s']],['tv8','t, tr, th',['t','tr','th']],
    ['tv9','ia, ua, ưa',['ia','ua','ưa']],['tv10','ph, qu, v, x, y',['ph','qu','v','x','y']]];
  const VAN=[
    ['v1',['an','ăn','ân']],['v2',['on','ôn','ơn']],['v3',['en','ên','in','un']],['v4',['am','ăm','âm']],['v5',['om','ôm','ơm']],['v6',['em','êm','im','um']],
    ['v7',['ai','ay','ây']],['v8',['oi','ôi','ơi']],['v9',['ui','ưi','uôi','ươi']],['v10',['ao','eo','au','âu','êu']],['v11',['iu','ưu','ươu']],
    ['v12',['at','ăt','ât','ot','ôt','ơt']],['v13',['et','êt','it','ut']],['v14',['ap','ăp','op','ôp','ơp','ep','êp','up']],['v15',['anh','inh','ach','êch','ich']],
    ['v16',['ang','ăng','ong','ông','ung','ưng']],['v17',['iêc','iên','iêp','iêt','iêu','yêu']],['v18',['uôc','uôt','uông']],['v19',['ươn','ương','ươc','ươm']],
    ['v20',['oa','oai','oang']],['v21',['uân','uyên','uyêt','uy']]];
  VAN.forEach(v=>v[1].forEach(r=>{if(!RIMES.includes(r))RIMES.push(r);}));
  const t1=topic('tv','Âm, chữ và dấu thanh');
  LET.forEach(([id,t,u])=>addLesson(t1,'tv',{id,title:'Âm '+t,units:u,label:'âm',gen:()=>mix(tvGens(u,'âm')),real:`Đi quanh nhà hoặc trên đường, tìm 3 đồ vật hay chữ trên biển hiệu có âm ${u.join(', ')}. Đọc to cho bố mẹ nghe.`}));
  addLesson(t1,'tv',{id:'tv11',title:'Dấu thanh: huyền, sắc, hỏi, ngã, nặng',learnTone:true,gen:()=>mix(toneGens),real:'Đọc to cho bố mẹ nghe: ma, mà, má, mả, mã, mạ. Rồi tìm trong truyện 5 tiếng có dấu khác nhau.'});
  addLesson(t1,'tv',{id:'tv12',title:'Chính tả: c/k, g/gh, ng/ngh',learnSpell:true,gen:()=>mix(spellGens),real:'Viết vào vở 4 tiếng: kem, kéo, ghế, nghé. Nhớ luật: trước e, ê, i viết k, gh, ngh.'});
  const t2=topic('tv','Vần');
  VAN.forEach(([id,u])=>addLesson(t2,'tv',{id,title:'Vần '+u.join(', '),units:u,label:'vần',gen:()=>mix(tvGens(u,'vần')),real:`Tìm 3 tiếng có vần ${u.join(', ')} trong truyện, biển hiệu hoặc tên đồ vật trong nhà. Đọc to cho bố mẹ nghe.`}));
  const t3=topic('tv','Đọc hiểu (Tập hai)');
  READS.forEach((r,i)=>addLesson(t3,'tv',{id:'rd'+(i+1),title:r.topic,read:r,gen:()=>readGens(r),real:r.real}));
})();
