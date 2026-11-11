/* Books for All - shop page and book detail page */
function wishHtml(i){var on=!!st.wish[i];return '<svg class="hrt" width="17" height="17" viewBox="0 0 24 24" fill="'+(on?'currentColor':'none')+'" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z"/></svg><span>'+(on?'Saved':'Save')+'</span>'}
var DESC=['A sharp, witty novel of manners about family pressure, first impressions and learning to understand another person. A friendly first classic.','A coming-of-age story about ambition, class and loyalty, following a young man whose life changes when an unknown benefactor appears.','A sea voyage and an obsession: a captain’s hunt for one whale, mixed with long, curious chapters on life aboard a whaling ship.','The story of an orphaned governess who holds on to her independence and self-respect while facing a secretive household.','An illustrated look at how contemporary artists use shape, scale and space, with plenty of full-page images to browse.','Explores how colour creates energy and mood in modern work, with side-by-side examples you can compare.','A study of line, from quick sketches to confident graphic work, with examples and short notes from the artists.','Looks at art made outside traditional galleries, in public spaces and online, and why it matters to everyday viewers.','A practical guide to building routines that last, with simple weekly exercises you can start right away.','Explains everyday money ideas such as saving, trade and value in plain language for general readers.','An accessible introduction to how memory, attention and emotion work, written for curious beginners.','Short chapters on making real change through tiny, repeatable actions.','Three easy-to-start classics bundled at a lower price than buying them one by one. A good starter shelf or gift.','Three art books that pair well together: shapes, colour and line in one set. Great for students and art lovers.','Three practical nonfiction reads on habits, thinking and everyday change, bundled to save money.','A classic pirate adventure of a map, a hidden treasure and a young cabin boy. A donated copy, free to request.','A pioneering tale of a time traveller who journeys far into the future. A donated copy, free to request.','A quiet account of living simply beside a pond, and of paying close attention to the world. A donated copy, free to request.','Mowgli’s stories of the jungle, told in short, lively chapters. A donated copy, free to request.','Four sisters grow up together, each finding her own way. A donated copy, free to request.','Short, calm notes on living well, written as a personal journal by a Roman emperor. A donated copy, free to request.'];
var FOR={classic:'First-time classic readers, students and gifts',modern:'Art lovers, students and anyone who likes browsing pictures',nonfiction:'Self-learners, curious readers and gifts',combo:'Gifts, starter collections and readers who want more for less'};
var GR={'Like new':{c:'Clean, no visible wear',k:'Sharp, no bends',s:'Tight and uncracked',p:'Crisp and clean',d:'None',o:'Fresh, no odour',m:'None, book is complete',w:'None',sum:'Looks almost unread. Ready to read, or to gift as it is.'},'Good':{c:'Light shelf wear on the edges',k:'Light rubbing on a few corners',s:'Intact with minor creases',p:'Slight yellowing, nothing missing',d:'None or a few tiny spots',o:'Normal old-book smell',m:'None, book is complete',w:'None or very light pencil marks',sum:'A clean, well-kept copy with normal signs of use. Fully readable.'},'Fair':{c:'Visible wear and rubbed corners',k:'Rubbed or slightly bent corners',s:'Creased but firmly bound',p:'Yellowed, may have light marks',d:'Light spotting possible',o:'Noticeable old-book smell',m:'None, book is complete',w:'Some underlining or notes possible',sum:'Shows its age but is complete and fully readable. Priced lower for that.'}};
var LABS=['Front cover','Back cover','Spine','Inside pages','Flaws close-up'];
function pic(b,k){return (b.imgs&&b.imgs[k])||(k===0?b.img:'')}
function row2(a){return a.filter(function(r){return r[1]}).map(function(r){return '<dt>'+r[0]+'</dt><dd>'+esc(r[1])+'</dd>'}).join('')}
function book(i){
 var b=B[i],cb=!!b.items,sv=b.old?b.old-b.p:0,pc=b.old?Math.round(sv/b.old*100):0,g=GR[b.cond]||GR.Good,n=cb?b.items.length:0;
 var CN={classic:'Classic',modern:'Modern Art',nonfiction:'Nonfiction',combo:'Combo deal'};
 var dk=function(x){return x.c==='nonfiction'?'#1c1c1c':'#fff'};
 st.cur=i;
 var th=LABS.map(function(l,k){var im=pic(b,k);return '<button class="th'+(k?'':' on')+'" data-act="thumb" data-k="'+k+'" aria-label="'+l+'" style="background-color:'+COL[b.c]+';color:'+dk(b)+'">'+(im?'<img src="'+esc(im)+'" alt="" loading="lazy" onerror="this.remove()">':'')+'<span>'+l+'</span></button>'}).join('');
 var mt=function(c){var n={'Like new':3,'Good':2,'Fair':1}[c]||2;return '<span class="mt" aria-label="Condition level '+n+' of 3">'+[1,2,3].map(function(k){return '<i'+(k<=n?' class="on"':'')+'></i>'}).join('')+'</span>'};
 var scl=function(c){return '<div class="scale">'+['Fair','Good','Like new'].map(function(s){return '<span'+(s===c?' class="on"':'')+'>'+s+'</span>'}).join('')+'</div>'};
 var gof=function(x){return Object.assign({},GR[x.cond]||GR.Good,x.cdx||{})};
 var cond;
 if(cb){cond='<p>Every book in this combo has its own condition grade. Swipe to see each one.</p><div class="cscroll">'+b.items.map(function(k){var x=B[k],gx=gof(x);return '<div class="ccd w"><div class="cbh"><b>'+esc(x.t)+'</b><span class="tag'+(x.cond==='Like new'?' o':'')+'">'+esc(x.cond)+'</span></div>'+scl(x.cond)+'<p class="csum">'+esc(gx.sum)+'</p><dl class="spec">'+row2([['Cover',gx.c],['Corners',gx.k],['Spine',gx.s],['Pages',gx.p],['Stains / water damage',gx.d],['Writing / markings',gx.w],['Smell',gx.o],['Missing pages',gx.m],['Seller’s note',x.note]])+'</dl></div>'}).join('')+'</div>'}
 else{var gx=gof(b),cds=[['Overall',null,[['Grade',b.cond],['Summary',gx.sum]]],['Cover and corners',1,[['Cover',gx.c],['Corners',gx.k]]],['Spine and binding',1,[['Spine',gx.s]]],['Pages',1,[['Pages',gx.p],['Missing pages',gx.m]]],['Marks and stains',1,[['Writing / markings',gx.w],['Stains / water damage',gx.d],['Smell',gx.o]]]];if(b.note)cds.push(['Seller’s note',null,[['Note',b.note]]]);
  cond='<div class="cscroll">'+cds.map(function(c,k){return '<div class="ccd"><div class="cbh"><b>'+c[0]+'</b>'+(c[1]?mt(b.cond):'')+'</div>'+(k===0?scl(b.cond):'')+'<dl class="spec">'+row2(c[2].filter(function(r){return !(k===0&&r[0]==='Grade')}))+'</dl></div>'}).join('')+'</div>'}
 var inside=cb?'<div class="bs"><h3>What’s inside this combo</h3>'+b.items.map(function(k){var x=B[k];return '<button class="inc" data-go="book-'+k+'"><span class="mini" style="background-color:'+COL[x.c]+';color:'+dk(x)+'">'+esc(x.t)+'</span><span><b>'+esc(x.t)+'</b><br>'+esc(x.a)+' · '+esc(x.cond)+'<br>Sold separately: '+CUR+x.p+'</span></button>'}).join('')+'<p style="margin-top:14px">Buying separately: <b>'+CUR+b.old+'</b> · Combo price: <b>'+PR(b)+'</b> · You save <b>'+CUR+sv+' ('+pc+'%)</b></p></div>':'';
 var spec=cb?[['Type','Combo · '+n+' books'],['Condition','Mixed, see each book'],['Separate price',CUR+b.old],['Combo price',CUR+b.p],['You save',CUR+sv+' ('+pc+'%)']]:[['Author',b.a],['Category',CN[b.c]],['Condition',b.cond],['Language',b.lang||'English'],['Format',b.fmt],['Pages',b.pages],['Publisher',b.pub],['Year',b.year],['ISBN',b.isbn]];
 var rel=B.filter(function(x,k){return k!==i&&x.c===b.c}).concat(B.filter(function(x,k){return k!==i&&x.c!==b.c&&!!x.items===cb})).slice(0,4);
 var faq=[['Is this a used book?','Yes. Every book here is pre-loved, and the condition grade and photos show its exact state.'],['Will I get the copy in the photos?','Yes, the photos show the exact copy you will receive.'],['How long does delivery take?',STORE.delivery+'.'],['How can I pay?',STORE.pay+'.'],['Can I return it?',STORE.ret+'.']];
 if(cb)faq.push(['Can I buy one book from the combo?','Yes. Every book in the combo has its own page and price.']);
 vb.className='vbody bkpage';
 vb.innerHTML='<p class="crumb"><a href="#shop">Shop</a> / '+CN[b.c]+' / '+esc(b.t)+'</p><div class="bk"><div class="gal"><div id="gmain">'+cover(b)+'</div><div class="gcap" id="gcap">'+LABS[0]+(pic(b,0)?'':' · photo not added yet')+'</div><div class="thumbs">'+th+'</div></div>'+
 '<div class="binfo"><div class="tags">'+(cb?'<span class="tag o">COMBO · '+n+' BOOKS</span>':'')+'<span class="tag">'+(cb?'Mixed condition':esc(b.cond))+'</span><span class="tag">'+CN[b.c]+'</span></div><h1>'+esc(b.t)+'</h1><p class="by">'+(cb?n+' books bundled together':'by '+esc(b.a))+'</p>'+
 priceRow(b,sv,pc)+'<p class="stock">● '+(cb?'1 set available':'1 copy available')+'</p>'+
 '<div class="brow"><button class="sub" data-add="'+i+'">Add to cart</button><button class="lnk" data-act="buy" data-i="'+i+'">Buy now</button></div><div class="brow"><button class="lnk wish'+(st.wish[i]?' on':'')+'" data-act="wish" data-i="'+i+'" aria-pressed="'+!!st.wish[i]+'">'+wishHtml(i)+'</button><button class="lnk" data-act="share">Share</button></div>'+
 '<div class="bs"><h3>About this '+(cb?'combo':'book')+'</h3><p>'+esc(DESC[i]||'')+'</p><p><b>Good for:</b> '+FOR[b.c]+'</p></div>'+
 '<div class="bs"><div class="bsh"><h3>Condition</h3><div class="carrs"><button class="carr" data-act="cscroll" data-d="-1" aria-label="Scroll left">←</button><button class="carr" data-act="cscroll" data-d="1" aria-label="Scroll right">→</button></div></div>'+cond+'</div>'+inside+
 '<div class="bs"><h3>'+(cb?'Combo':'Book')+' details</h3><dl class="spec">'+row2(spec)+'</dl></div>'+
 '<div class="bs"><h3>Sold by</h3><div class="store"><b style="font-size:20px">'+esc(STORE.name)+'</b><br>'+esc(STORE.city)+'<dl class="spec" style="margin-top:10px">'+row2([['Delivery',STORE.delivery],['Payment',STORE.pay],['Returns',STORE.ret],['Packing',STORE.pack]])+'</dl></div></div>'+
 '<div class="bs"><h3>Questions buyers ask</h3>'+faq.map(function(f){return '<details class="faq"><summary>'+f[0]+'</summary><p>'+esc(f[1])+'</p></details>'}).join('')+'</div></div></div>'+
 '<div class="bs"><h3>You may also like</h3><div class="grid">'+rel.map(card).join('')+'</div></div>'+
 '<div class="buybar"><div><b class="big" style="font-size:26px">'+PR(b)+'</b>'+(was(b)?' <s style="opacity:.5">'+CUR+was(b)+'</s>':'')+'</div><button class="sub" data-add="'+i+'" style="width:auto;margin:0;padding:12px 26px">Add to cart</button></div>';
}
function priceRow(b,sv,pc){
 if(b.dl){var s2=b.reg-b.p,p2=Math.round(s2/b.reg*100);return '<div class="ofr"><div class="ofh"><svg class="ci" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> LIMITED-TIME OFFER · ends in <b class="cd" data-end="'+b.dl.end+'"></b></div><div><span class="big">'+PR(b)+'</span><s>'+CUR+b.reg+'</s><span class="save">Save '+CUR+s2+' ('+p2+'%)</span></div><p class="ofn">Order before the timer ends to get this special price. After that it goes back to '+CUR+b.reg+'.</p></div>'}
 return '<div><span class="big">'+PR(b)+'</span>'+(b.old?'<s>'+CUR+b.old+'</s><span class="save">Save '+CUR+sv+' ('+pc+'%)</span>':'')+'</div>';
}
var SH={q:'',qraw:'',cat:[],cond:[],au:[],min:'',max:'',offer:false,sort:'feat'};
var SH_CATS=[['classic','Classic'],['modern','Modern Art'],['nonfiction','Nonfiction'],['combo','Combos']],SH_CONDS=['Like new','Good','Fair','Mixed condition'];
var SH_RNG=[['Under ৳300','',300],['৳300 – ৳500',300,500],['৳500 – ৳1,000',500,1000],['Over ৳1,000',1000,'']];
var SH_SORTS=[['feat','Featured','Our default order'],['price','Price: low to high',''],['price-d','Price: high to low',''],['title','Title: A to Z',''],['save','Biggest saving','Best discounts first'],['end','Offer ending soonest','Closing deals first']];
var SH_AU=[];B.forEach(function(b){if(!b.items&&SH_AU.indexOf(b.a)<0)SH_AU.push(b.a)});SH_AU.sort();
function shq(s){var r=shRoot();return r&&r.querySelector(s)}
function shAus(b){return b.items?b.items.map(function(k){return B[k].a}):[b.a]}
function shHay(b){return (b.t+' '+(b.items?b.items.map(function(k){return B[k].t+' '+B[k].a}).join(' '):b.a)).toLowerCase()}
function shPct(b){var w=was(b);return w?Math.round((w-b.p)/w*100):0}
function shOk(b,x){
 if(x!=='cat'&&SH.cat.length&&SH.cat.indexOf(b.c)<0)return 0;
 if(x!=='cond'&&SH.cond.length&&SH.cond.indexOf(b.cond)<0)return 0;
 if(x!=='au'&&SH.au.length&&!shAus(b).some(function(a){return SH.au.indexOf(a)>-1}))return 0;
 if(x!=='price'&&((SH.min!==''&&b.p<SH.min)||(SH.max!==''&&b.p>SH.max)))return 0;
 if(x!=='off'&&SH.offer&&!b.dl)return 0;
 if(SH.q&&shHay(b).indexOf(SH.q)<0)return 0;
 return 1}
function shRes(x){return B.filter(function(b){return shOk(b,x)})}
function shSorted(l){var f={price:function(a,b){return a.p-b.p},'price-d':function(a,b){return b.p-a.p},title:function(a,b){return a.t.localeCompare(b.t)},save:function(a,b){return shPct(b)-shPct(a)},end:function(a,b){return (a.dl?Date.parse(a.dl.end):9e15)-(b.dl?Date.parse(b.dl.end):9e15)}}[SH.sort];return f?l.slice().sort(f):l}
function shCard(b){var i=B.indexOf(b),inn=st.items.indexOf(i)>-1,w=was(b),p=shPct(b);
 return '<article class="pc"><button class="pcb" data-go="book-'+i+'" aria-label="'+esc(b.t)+', view details">'+cover(b)+'</button><div class="meta"><b>'+esc(b.t)+'</b><br>'+(b.items?b.items.length+' books':esc(b.a))+' · '+esc(b.cond)+'</div><div class="pr"><span><b>'+PR(b)+'</b>'+(w?' <s>'+CUR+w+'</s>':'')+(p?'<em class="sv">-'+p+'%</em>':'')+'</span><button class="add'+(inn?' in':'')+'" data-sadd="'+i+'">'+(inn?'In cart':'Add to cart')+'</button></div>'+(b.dl?'<div class="dl" title="Offer ends in" aria-label="Offer countdown">'+shsv(SH_P.clock,'1em')+'<b class="cd" data-end="'+b.dl.end+'"></b></div>':'<div class="dl st"><i></i>1 '+(b.items?'set':'copy')+' available</div>')+'</article>'}
function shOpt(k,v,l,n,on){return '<label class="opt'+(n||on?'':' z')+'"><input type="checkbox" data-k="'+k+'" data-v="'+esc(v)+'"'+(on?' checked':'')+'>'+esc(l)+'<i>'+n+'</i></label>'}
function shSide(n){
 var g=function(t,b,o){return '<details class="fs"'+(o?' open':'')+'><summary>'+t+'</summary><div class="fb">'+b+'</div></details>'};
 var h='<div class="dh"><span>Filters</span><button class="x" data-sdrclose aria-label="Close">'+shsv(SH_P.x,24)+'</button></div>';
 h+=g('Category',SH_CATS.map(function(c){return shOpt('cat',c[0],c[1],shRes('cat').filter(function(b){return b.c===c[0]}).length,SH.cat.indexOf(c[0])>-1)}).join(''),1);
 h+=g('Condition',SH_CONDS.map(function(c){return shOpt('cond',c,c,shRes('cond').filter(function(b){return b.cond===c}).length,SH.cond.indexOf(c)>-1)}).join(''),1);
 h+=g('Price (৳)','<div class="pin"><input id="pmin" type="number" min="0" inputmode="numeric" placeholder="Min" value="'+SH.min+'" aria-label="Minimum price"><span>–</span><input id="pmax" type="number" min="0" inputmode="numeric" placeholder="Max" value="'+SH.max+'" aria-label="Maximum price"></div><div class="chips">'+SH_RNG.map(function(r,k){return '<button class="chip'+(SH.min===r[1]&&SH.max===r[2]?' on':'')+'" data-sp="'+k+'">'+r[0]+'</button>'}).join('')+'</div>',1);
 h+=g('Author',SH_AU.map(function(a){return shOpt('au',a,a,shRes('au').filter(function(b){return shAus(b).indexOf(a)>-1}).length,SH.au.indexOf(a)>-1)}).join(''),0);
 h+=g('Offers','<label class="opt"><input type="checkbox" data-k="offer"'+(SH.offer?' checked':'')+'>Limited-time offers only<i>'+shRes('off').filter(function(b){return b.dl}).length+'</i></label>',1);
 shq('#side').innerHTML=h+'<div class="df"><button class="sub" data-sdrclose>Show '+n+' items</button></div>'}

function shCountWithout(t,v){
 var keep=JSON.stringify(SH),n;
 if(t==='cat'||t==='cond'||t==='au'){var i=SH[t].indexOf(v);if(i>-1)SH[t].splice(i,1)}
 else if(t==='price')SH.min=SH.max='';
 else if(t==='offer')SH.offer=false;
 else if(t==='q')SH.q=SH.qraw='';
 n=shRes().length;
 var o=JSON.parse(keep);for(var k in o)SH[k]=o[k];
 return n}
function shNone(){
 var tags=[],opts=[],add=function(t,v,lab){var n=shCountWithout(t,v);tags.push('<span class="ntag">'+esc(lab)+'</span>');if(n>0)opts.push({t:t,v:v,lab:lab,n:n})};
 if(SH.q)add('q','','Search: “'+SH.qraw.trim()+'”');
 SH.cat.forEach(function(v){add('cat',v,SH_CATS.filter(function(c){return c[0]===v})[0][1])});
 SH.cond.forEach(function(v){add('cond',v,v)});
 SH.au.forEach(function(v){add('au',v,v)});
 if(SH.min!==''||SH.max!=='')add('price','',SH.min!==''&&SH.max!==''?CUR+SH.min+' – '+CUR+SH.max:SH.min!==''?'Over '+CUR+SH.min:'Under '+CUR+SH.max);
 if(SH.offer)add('offer','','Offers only');
 opts.sort(function(a,b){return b.n-a.n});
 var onlySearch=SH.q&&tags.length===1;
 var h='<div class="none" role="status">'+shNoneArt()
  +'<h3>'+(onlySearch?'No books found for <em>“'+esc(SH.qraw.trim())+'”</em>':'No books match these <em>filters</em>')+'</h3>'
  +'<p>'+(onlySearch?'Check the spelling, or try a shorter title or the author’s name.':'Your shelf is empty with this exact mix. Loosen a filter below, or start fresh and browse everything.')+'</p>';
 if(tags.length>1||!onlySearch)h+='<div class="nact" aria-label="Active filters">'+tags.join('')+'</div>';
 h+='<button class="add nbtn" data-sclear>'+shsv(SH_P.x,16)+' Clear all filters</button>';
 if(opts.length)h+='<div class="nsg"><small>Or loosen just one</small><div>'+opts.slice(0,4).map(function(o){return '<button class="chip" data-srm="'+o.t+'" data-v="'+esc(o.v)+'">Remove '+esc(o.lab)+' · <b>'+o.n+' '+(o.n===1?'book':'books')+'</b></button>'}).join('')+'</div></div>';
 return h+'</div>'}
function shRender(){
 if(!shRoot())return;
 var l=shSorted(shRes()),a=[],rm=function(t,v,lab){a.push('<button class="chip on" data-srm="'+t+'" data-v="'+esc(v)+'">'+esc(lab)+' '+shsv(SH_P.x,14)+'</button>')};
 SH.cat.forEach(function(v){rm('cat',v,SH_CATS.filter(function(c){return c[0]===v})[0][1])});SH.cond.forEach(function(v){rm('cond',v,v)});SH.au.forEach(function(v){rm('au',v,v)});
 if(SH.min!==''||SH.max!=='')rm('price','',SH.min!==''&&SH.max!==''?CUR+SH.min+' – '+CUR+SH.max:SH.min!==''?'Over '+CUR+SH.min:'Under '+CUR+SH.max);
 if(SH.offer)rm('offer','','Offers only');
 shq('#act').innerHTML=a.length?a.join('')+'<button class="lk" data-sclear>Clear all</button>':'';
 shq('#cnt').innerHTML='Showing <b>'+l.length+'</b> of '+B.length+' items';
 shq('#fbtn').innerHTML=shsv(SH_P.filt)+' Filters'+(a.length?' <b>'+a.length+'</b>':'');
 shq('#grid').innerHTML=l.length?l.map(shCard).join(''):shNone();
 shSide(l.length);
 shq('#sortb').innerHTML=shsv(SH_P.srt)+' Sort<span class="sl">: <b>'+SH_SORTS.filter(function(o){return o[0]===SH.sort})[0][1]+'</b></span>';
 shq('#fcart').innerHTML=shsv(SH_P.cart)+' Cart (<b class="cc">'+st.items.length+'</b>)';
 paintCd()}
function shSd(o){var d=shq('#sd');d.hidden=!o;if(o){shq('#sl').innerHTML=SH_SORTS.map(function(x){var on=x[0]===SH.sort;return '<button class="so'+(on?' on':'')+'" role="radio" aria-checked="'+on+'" data-ssort="'+x[0]+'"><i></i>'+x[1]+(x[2]?'<small>'+x[2]+'</small>':'')+'</button>'}).join('');var f=shq('#sl .on');if(f)f.focus()}else shq('#sortb').focus()}
function shDr(o){shq('#side').classList.toggle('open',o);shq('#bk').hidden=!o}
function shEsc(){var r=shRoot();if(!r)return false;var d=r.querySelector('#sd');if(d&&!d.hidden){shSd(false);return true}var s=r.querySelector('#side');if(s&&s.classList.contains('open')){shDr(false);return true}return false}
function shTg(k,v){var i=SH[k].indexOf(v);i<0?SH[k].push(v):SH[k].splice(i,1)}
function shH(){var r=shRoot();if(!r)return;var n=view.querySelector(window.innerWidth>=1200?'.vnavd':'.vnavm'),h=n?n.offsetHeight:0;r.style.setProperty('--h',(h>40?h:84)+'px')}
window.addEventListener('resize',shH);
function shop(){
 vb.classList.add('shopv');
 if(st.apply){st.apply=0;SH.cat=(st.cat&&st.cat!=='all')?[st.cat]:[];SH.cond=[];SH.au=[];SH.min=SH.max='';SH.offer=false;SH.qraw=st.q||'';SH.q=SH.qraw.trim().toLowerCase()}
 vb.innerHTML='<div id="shopv"><main class="wrap"><section class="hero"><small>SHOP</small><h1>All our books,<br>one shelf</h1></section><div class="shopgrid"><aside id="side" aria-label="Filters"></aside><div><div class="sq"><span id="si">'+shsv(SH_P.search)+'</span><input id="shq" type="search" placeholder="Search books or authors" autocomplete="off" aria-label="Search"></div><div class="tb"><button class="chip" id="fbtn"></button><p class="cnt" id="cnt"></p><button class="chip" id="sortb" aria-haspopup="dialog" aria-controls="sd"></button></div><div id="act"></div><div class="grid" id="grid"></div></div></div></main><button class="fcart" id="fcart" data-act="cart"></button><div id="bk" hidden></div><div id="sd" hidden><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sdt"><div class="sh"><span id="sdt">Sort by</span><button class="x" data-ssheetclose aria-label="Close">'+shsv(SH_P.x,24)+'</button></div><div id="sl" role="radiogroup" aria-label="Sort by"></div></div></div></div>';
 var r=shRoot(),qi=r.querySelector('#shq');qi.value=SH.qraw;
 r.addEventListener('click',function(e){var t=e.target.closest('[data-sadd],[data-sclear],[data-srm],[data-sp],[data-sdrclose],[data-ssort],[data-ssheetclose],#sortb,#sd,#fbtn,#bk');if(!t||!r.contains(t))return;
  if(t.dataset.sadd!=null){var i=+t.dataset.sadd,k=st.items.indexOf(i);if(k<0){st.items.push(i);say(B[i].t+' added to cart')}else{st.items.splice(k,1);say('Removed from cart')}sync();shRender()}
  else if(t.dataset.sclear!=null){SH.cat=[];SH.cond=[];SH.au=[];SH.min=SH.max='';SH.offer=false;SH.q=SH.qraw='';qi.value='';shRender()}
  else if(t.dataset.srm){var m=t.dataset.srm;if(m==='q'){SH.q=SH.qraw='';qi.value=''}else if(m==='price')SH.min=SH.max='';else if(m==='offer')SH.offer=false;else shTg(m,t.dataset.v);shRender()}
  else if(t.dataset.sp!=null){var g=SH_RNG[+t.dataset.sp],on=SH.min===g[1]&&SH.max===g[2];SH.min=on?'':g[1];SH.max=on?'':g[2];shRender()}
  else if(t.dataset.ssort){SH.sort=t.dataset.ssort;shSd(false);shRender()}
  else if(t.id==='sortb')shSd(true);
  else if(t.dataset.ssheetclose!=null||(t.id==='sd'&&e.target===t))shSd(false);
  else if(t.id==='fbtn')shDr(true);
  else if(t.id==='bk'||t.dataset.sdrclose!=null)shDr(false)});
 r.querySelector('#side').addEventListener('change',function(e){var t=e.target;
  if(t.id==='pmin'||t.id==='pmax'){SH[t.id==='pmin'?'min':'max']=t.value===''?'':Math.max(0,+t.value)}
  else if(t.dataset.k==='offer')SH.offer=t.checked;else if(t.dataset.k)shTg(t.dataset.k,t.dataset.v);
  shRender()});
 qi.addEventListener('input',function(){SH.qraw=this.value;SH.q=this.value.trim().toLowerCase();shRender()});
 shRender();shH();requestAnimationFrame(shH);setTimeout(shH,60);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(shH);
}
acts.wish=function(x){var i=+x.dataset.i,on=!st.wish[i];if(on)st.wish[i]=1;else delete st.wish[i];x.classList.toggle('on',on);x.setAttribute('aria-pressed',on);x.innerHTML=wishHtml(i);x.classList.remove('pop');void x.offsetWidth;x.classList.add('pop');say(on?'Saved “'+B[i].t+'”':'Removed from saved')};
acts.cscroll=function(x){var c=x.closest('.bs').querySelector('.cscroll');if(c)c.scrollBy({left:+x.dataset.d*c.clientWidth*.8,behavior:'smooth'})};
acts.thumb=function(x){var b=B[st.cur],k=+x.dataset.k,im=pic(b,k);document.querySelectorAll('.th').forEach(function(t){t.classList.toggle('on',t===x)});$('#gmain').innerHTML=cover(im?Object.assign({},b,{img:im}):b);$('#gcap').textContent=LABS[k]+(im?'':' · photo not added yet')};
acts.share=function(){var u=location.href;if(navigator.share){navigator.share({title:document.title,url:u}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){say('Link copied')},function(){say('Copy the link from the address bar')})}else say('Copy the link from the address bar')};
acts.buy=function(x){st.items.push(+x.dataset.i);sync();acts.checkout()};
function route(){var h=location.hash.slice(1),mm=/^book-(\d+)$/.exec(h);mountView(mm&&B[+mm[1]]?function(){book(+mm[1])}:shop,!!mm)}
function onDeals(){route()}
applyDeals();tick();setInterval(tick,1000);window.addEventListener('hashchange',route);route();
