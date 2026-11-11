/* Books for All - shared by every page: data, cart, modals, navigation helpers */
var $=function(s,r){return (r||document).querySelector(s)};
var view=$('#view'),vb=$('#vb'),vt=$('#vt'),modal=$('#modal'),mc=$('#mc'),toast=$('#toast'),tt;
var st={cat:'all',q:'',cart:0,items:[],user:null,wish:{}};
/* state shared between the separate page files (cart, name, wishlist, pending shop filter) */
try{var _s=JSON.parse(sessionStorage.getItem('bfa-state')||'null');if(_s){st.items=_s.items||[];st.user=_s.user||null;st.wish=_s.wish||{};st.cat=_s.cat||'all';st.q=_s.q||'';st.apply=_s.apply||0}}catch(e){}
function _save(){try{sessionStorage.setItem('bfa-state',JSON.stringify({items:st.items,user:st.user,wish:st.wish,cat:st.cat,q:st.q,apply:st.apply}))}catch(e){}}
window.addEventListener('pagehide',_save);
var _FILES={home:'index.html',shop:'shop.html',free:'free-books.html',ebooks:'ebooks.html',study:'study.html',about:'about.html',team:'team.html'};
var _CUR=(location.pathname.split('/').pop()||'index.html').toLowerCase();if(_CUR.indexOf('.')<0)_CUR+='.html';
function _target(r){if(/^book-\d+$/.test(r))return 'shop.html';if(/^study-/.test(r))return 'study.html';return _FILES[r]||null}
var COL={classic:'#fd7b2e',modern:'#2a4577',nonfiction:'#fbbc58',combo:'#1c1c1c'};
var CUR='৳';
var B=[
{t:'Pride and Prejudice',a:'Jane Austen',c:'classic',p:220,cond:'Good'},{t:'Great Expectations',a:'Charles Dickens',c:'classic',p:260,cond:'Fair'},{t:'Moby-Dick',a:'Herman Melville',c:'classic',p:280,cond:'Good'},{t:'Jane Eyre',a:'Charlotte Brontë',c:'classic',p:240,cond:'Like new'},
{t:'Shapes of Now',a:'Lena Ortiz',c:'modern',p:520,cond:'Like new'},{t:'Colour in Motion',a:'Daniel Reyes',c:'modern',p:580,cond:'Good'},{t:'The Bold Line',a:'Mira Kapoor',c:'modern',p:480,cond:'Good'},{t:'Gallery Without Walls',a:'Tom Hale',c:'modern',p:540,cond:'Fair'},
{t:'Deep Habits',a:'Sara Quinn',c:'nonfiction',p:320,cond:'Like new'},{t:'The Quiet Economy',a:'Omar Siddiq',c:'nonfiction',p:350,cond:'Good'},{t:'Mapping the Mind',a:'Priya Nair',c:'nonfiction',p:380,cond:'Good'},{t:'Small Steps',a:'Ben Carter',c:'nonfiction',p:290,cond:'Fair'},
{t:'Classic Starter Combo',a:'3 books',c:'combo',p:620,old:740,cond:'Mixed condition',items:[0,2,3]},{t:'Art Lover Pack',a:'3 books',c:'combo',p:1290,old:1580,cond:'Mixed condition',items:[4,5,6]},{t:'Think Better Bundle',a:'3 books',c:'combo',p:820,old:990,cond:'Mixed condition',items:[8,10,11]},
{t:'Treasure Island',a:'Robert Louis Stevenson',c:'classic',p:0,cond:'Good'},{t:'The Time Machine',a:'H. G. Wells',c:'classic',p:0,cond:'Fair'},{t:'Walden',a:'Henry David Thoreau',c:'nonfiction',p:0,cond:'Good'},
{t:'The Jungle Book',a:'Rudyard Kipling',c:'classic',p:0,cond:'Good'},{t:'Little Women',a:'Louisa May Alcott',c:'classic',p:0,cond:'Fair'},{t:'Meditations',a:'Marcus Aurelius',c:'nonfiction',p:0,cond:'Like new'}];
var PR=function(b){return b.p===0?'Free':CUR+b.p};
function flash(x){if(x._f)return;x._f=1;var h=x.innerHTML;x.innerHTML='✓ Added';x.classList.add('ok');setTimeout(function(){if(x.isConnected){x.innerHTML=h;x.classList.remove('ok')}x._f=0},1100)}
function bump(){document.querySelectorAll('.fcart,.bn-n').forEach(function(e){e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')})}
function sync(){st.cart=st.items.length;bump();document.querySelectorAll('.cc').forEach(function(e){e.textContent=st.cart});document.querySelectorAll('.bn-n').forEach(function(e){e.hidden=!st.cart});shRefresh()}
function cover(b){return '<div class="cover" style="background-color:'+COL[b.c]+';color:'+(b.c==='nonfiction'?'#1c1c1c':'#fff')+'">'+(b.img?'<img src="'+esc(b.img)+'" alt="'+esc(b.t)+'" loading="lazy" onerror="this.remove()">':'')+(b.items?'<span class="cb">COMBO</span>':'')+(b.dl?'<span class="cb of">OFFER</span>':'')+esc(b.t)+'</div>'}
function card(b){var i=B.indexOf(b);return '<div class="pc"><button class="pcb" data-act="detail" data-i="'+i+'">'+cover(b)+'<div class="meta"><b>'+esc(b.t)+'</b><br>'+(b.items?b.items.length+' books':esc(b.a))+' · '+esc(b.cond)+'</div></button><div class="pr"><span><b>'+PR(b)+'</b>'+(was(b)?' <s>'+CUR+was(b)+'</s>':'')+'</span><button class="add" data-add="'+i+'">Add to cart</button></div>'+(b.dl?'<div class="dl"><svg class="ci" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> Ends in <b class="cd" data-end="'+b.dl.end+'"></b></div>':'')+'</div>'}
function detail(x){var i=+x.dataset.i,b=B[i];openM('<h2>'+esc(b.t)+'</h2><p style="margin-bottom:12px">'+(b.items?'Combo · '+b.items.length+' books':esc(b.a))+' · '+esc(b.cond)+'</p>'+(b.items?'<ul class="il">'+b.items.map(function(k){return '<li>'+esc(B[k].t)+' — '+esc(B[k].a)+'</li>'}).join('')+'</ul>':'<p style="margin-bottom:12px">Pre-loved copy, sold as a single book.</p>')+'<p style="font-size:24px;margin:10px 0"><b>'+PR(b)+'</b>'+(b.old?' <s>'+CUR+b.old+'</s>':'')+'</p><button class="sub" data-add="'+i+'">Add to cart</button>')}
var STORE={name:'Books for All',city:'Dhaka, Bangladesh',delivery:'Delivery across Bangladesh, usually 2–4 days',pay:'Cash on delivery',ret:'Return within 7 days if the book is not as described',pack:'Wrapped in paper with a protective sleeve'};
var DEALS={0:{p:170,end:'2026-11-12T23:59:59+06:00'},5:{p:450,end:'2026-11-15T23:59:59+06:00'},8:{p:250,end:'2026-11-12T23:59:59+06:00'},12:{p:499,end:'2026-11-20T23:59:59+06:00'},13:{p:990,end:'2026-11-30T23:59:59+06:00'}};
function was(b){return b.dl?b.reg:b.old}
function applyDeals(){var ch=false;Object.keys(DEALS).forEach(function(k){var b=B[k],d=DEALS[k];if(b.reg==null)b.reg=b.p;var on=Date.parse(d.end)>Date.now(),prev=!!b.dl;b.dl=on?d:null;b.p=on?d.p:b.reg;if(prev&&!on)ch=true});return ch}
function fmt(ms){var s=Math.max(0,Math.floor(ms/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60,p=function(n){return String(n).padStart(2,'0')};return (d?d+'d ':'')+p(h)+':'+p(m)+':'+p(x)}
function cdHtml(ms){var t=Math.max(0,Math.floor(ms/1000)),d=Math.floor(t/86400),h=Math.floor(t%86400/3600),m=Math.floor(t%3600/60),x=t%60,p=function(n){return String(n).padStart(2,'0')},C=113.1;var u=function(v,l,f){f=Math.min(1,Math.max(0,f));return '<span class="u"><span class="r"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="t" cx="22" cy="22" r="18"/><circle class="g" cx="22" cy="22" r="18" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-f)).toFixed(1)+'"/></svg><em>'+v+'</em></span><small>'+l+'</small></span>'};return (d?u(p(d),'Days',d/30):'')+u(p(h),'Hrs',h/24)+u(p(m),'Min',m/60)+u(p(x),'Sec',x/60)}
function paintCd(){document.querySelectorAll('.cd').forEach(function(e){if(e.dataset.end){var h=cdHtml(Date.parse(e.dataset.end)-Date.now());if(e._h!==h){e._h=h;e.innerHTML=h}}})}
function tick(){if(applyDeals()){if(typeof onDeals==='function')onDeals();say('A special offer just ended')}paintCd()}
function cartM(){
 if(!st.items.length){openM('<h2>Your cart</h2><p style="margin-bottom:10px">Your cart is empty. Add some books first.</p><button class="sub" data-go="shop">Browse books</button>');return}
 var t=0,rows=st.items.map(function(i,k){var b=B[i];t+=b.p;return '<div class="crow"><span>'+esc(b.t)+(b.items?' <small>(combo)</small>':'')+'</span><b>'+PR(b)+'</b><button class="rm" data-act="rm" data-k="'+k+'" aria-label="Remove">×</button></div>'}).join('');
 openM('<h2>Your cart</h2>'+rows+'<div class="crow tot"><span>Total</span><b>'+CUR+t+'</b></div><button class="sub" data-act="checkout">Checkout</button>');
}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function say(m){toast.textContent=m;toast.className='on';clearTimeout(tt);tt=setTimeout(function(){toast.className=''},2200)}
function go(r){document.querySelectorAll('.mnav').forEach(function(m){m.classList.remove('open')});var bn=document.getElementById('bnav');if(bn)bn.classList.remove('open');var _t=_target(r);if(_t&&_t!==_CUR){_save();location.href=_t+(/^(book|study)-/.test(r)?'#'+r:'');return}if(typeof route!=='function')return;if(location.hash==='#'+r)route();else location.hash=r}
function openM(h){mc.innerHTML=h;modal.hidden=false;var i=$('input,textarea',mc);if(i)i.focus()}
function closeM(){modal.hidden=true}
/* ===== Shop page (ported from Shop.html, shares the site's cart, navbar and modals) ===== */
var SH_P={clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',cart:'<path d="M3 4h2l2.4 11h10.2L20 8H6"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',srt:'<path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/>',filt:'<path d="M4 6h16M7 12h10M10 18h4"/>'};
function shsv(d,s){return '<svg class="ci" viewBox="0 0 24 24" width="'+(s||18)+'" height="'+(s||18)+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>'}
function shRoot(){return document.getElementById('shopv')}
function shNoneArt(){
 return '<svg class="nart" viewBox="0 0 240 190" role="img" aria-label="Empty bookshelf with a magnifying glass" fill="none">'
 +'<ellipse cx="116" cy="172" rx="100" ry="8" fill="#1c1c1c" opacity=".12"/>'
 +'<rect x="14" y="166" width="212" height="6" rx="3" fill="#1c1c1c"/>'
 +'<g class="nbk"><rect x="38" y="62" width="40" height="104" rx="3" fill="#000"/><rect x="30" y="62" width="40" height="104" rx="3" fill="#fd7b2e" stroke="#1c1c1c" stroke-width="2.5"/><path d="M30 84h40M30 144h40" stroke="#1c1c1c" stroke-width="2.5"/><circle cx="50" cy="114" r="6" fill="#fff" stroke="#1c1c1c" stroke-width="2"/></g>'
 +'<g class="nbk b2"><rect x="94" y="40" width="36" height="126" rx="3" fill="#000"/><rect x="86" y="40" width="36" height="126" rx="3" fill="#2a4577" stroke="#1c1c1c" stroke-width="2.5"/><path d="M86 62h36M86 148h36" stroke="#fff" stroke-width="2.5"/><path d="M98 90h12M98 100h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></g>'
 +'<g class="nbk b3"><rect x="144" y="74" width="34" height="92" rx="3" fill="#000"/><rect x="136" y="74" width="34" height="92" rx="3" fill="#fbbc58" stroke="#1c1c1c" stroke-width="2.5"/><path d="M136 96h34M136 138h34" stroke="#1c1c1c" stroke-width="2.5"/></g>'
 +'<g class="nlens"><circle cx="178" cy="62" r="26" fill="#fefdfb" fill-opacity=".85" stroke="#1c1c1c" stroke-width="4"/><path d="M196 82l22 24" stroke="#1c1c1c" stroke-width="9" stroke-linecap="round"/><path d="M168 54a14 14 0 0 1 12-6" stroke="#f47c2c" stroke-width="4" stroke-linecap="round"/><path d="M171 63l14 0M178 56l0 14" stroke="#1c1c1c" stroke-width="3" stroke-linecap="round" opacity="0"/><text x="178" y="72" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="700" font-size="28" fill="#1c1c1c">?</text></g>'
 +'</svg>'}
function shRefresh(){var r=shRoot();if(!r)return;if(r.classList.contains("stv")){if(typeof syRender==='function')syRender()}else if(typeof shRender==='function')shRender()}
function setBtn(t){document.querySelectorAll('.btn,.mbtn,.nbtn').forEach(function(b){b.textContent=t})}
var acts={
 cart:cartM,join:function(){openM('<h2>Join the team</h2><p style="margin-bottom:8px">Tell us how you would like to help and we will get in touch.</p><form id="joinf"><input class="fi" name="nm" placeholder="Your name" required autocomplete="name"><input class="fi" name="ph" type="tel" placeholder="Phone number" required autocomplete="tel"><select class="fi" name="rl" aria-label="How you would like to help"><option>Volunteer reader</option><option>Campus ambassador</option><option>Collection partner</option><option>Something else</option></select><textarea class="fi" name="ms" rows="3" placeholder="A few words about you (optional)"></textarea><button class="sub">Send</button></form>')},coach:function(){openM('<h2>Admission coaching</h2><p style="margin-bottom:8px">Tell us what you are preparing for and our team will get in touch.</p><form id="coachf"><input class="fi" name="nm" placeholder="Your name" required autocomplete="name"><input class="fi" name="ph" type="tel" placeholder="Phone number" required autocomplete="tel"><select class="fi" name="lv" aria-label="Level"><option>School admission</option><option>College admission</option><option selected>University admission</option><option>Medical or engineering admission</option><option>Other</option></select><textarea class="fi" name="ms" rows="3" placeholder="Anything we should know? (optional)"></textarea><button class="sub">Send request</button></form>')},donate:function(){openM('<h2>Donate books</h2><p style="margin-bottom:8px">Tell us what you would like to give and we will get in touch.</p><form id="donf"><input class="fi" name="nm" placeholder="Your name" required autocomplete="name"><input class="fi" name="ph" type="tel" placeholder="Phone number" required autocomplete="tel"><input class="fi" name="ar" placeholder="Your area or city" required><textarea class="fi" name="bk" rows="3" placeholder="Which books would you like to donate?" required></textarea><button class="sub">Submit donation</button></form>')},sell:function(){openM('<h2>Post your old book</h2><p style="margin-bottom:8px">Tell us about the book you want to sell.</p><form id="sellf"><input class="fi" name="t" placeholder="Book title" required><input class="fi" name="a" placeholder="Author"><select class="fi" name="c" aria-label="Condition"><option>Like new</option><option selected>Good</option><option>Fair</option></select><input class="fi" name="p" type="number" min="0" placeholder="Your price (৳)" required><input class="fi" name="ct" placeholder="Your phone or email" required><button class="sub">Submit book</button></form>')},detail:function(x){go('book-'+x.dataset.i)},
 ask:function(x){var b=B[+x.dataset.i];openM('<h2>Ask the seller</h2><p style="margin-bottom:8px">About: <b>'+esc(b.t)+'</b></p><form id="qf"><textarea class="fi" rows="4" required placeholder="Your question, for example: are all pages intact?"></textarea><input class="fi" name="ct" placeholder="Your phone or email" required><button class="sub">Send question</button></form>')},menu:function(x){x.closest('.mnav').classList.toggle('open')},bmenu:function(x){var o=$('#bnav').classList.toggle('open');x.setAttribute('aria-expanded',o)},
 rm:function(x){st.items.splice(+x.dataset.k,1);sync();cartM()},
 checkout:function(){openM('<h2>Checkout</h2><form id="of"><input class="fi" name="nm" placeholder="Full name" required autocomplete="name"><input class="fi" name="ph" type="tel" placeholder="Phone number" required autocomplete="tel"><textarea class="fi" name="ad" rows="3" placeholder="Delivery address" required></textarea><button class="sub">Place order</button></form>')},
 search:function(){openM('<h2>Search</h2><form id="sf"><input class="fi" name="q" placeholder="Search books or authors" autocomplete="off"><button class="sub">Search</button></form>')},
 signup:function(){
  if(st.user)openM('<h2>Your account</h2><p style="margin-bottom:10px">Signed in as '+esc(st.user)+'.</p><button class="sub" data-act="logout">Log out</button>');
  else openM('<h2>Sign up</h2><form id="su"><input class="fi" name="nm" placeholder="Full name" required autocomplete="name"><input class="fi" name="em" type="email" placeholder="Email" required autocomplete="email"><input class="fi" name="pw" type="password" placeholder="Password (6+ characters)" minlength="6" required autocomplete="new-password"><button class="sub">Create account</button></form>');
 },
 top:function(){window.scrollTo({top:0,behavior:(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)?'auto':'smooth'})},
 logout:function(){st.user=null;setBtn('Sign up');closeM();say('Logged out')},
 msg:function(x){openM('<h2>Message '+esc(x.dataset.t||x.dataset.n.split(' ')[0])+'</h2><form id="mf" data-n="'+esc(x.dataset.n)+'"><textarea class="fi" rows="4" required placeholder="Your message"></textarea><button class="sub">Send</button></form>')}
};
document.addEventListener('click',function(e){
 var t=e.target,x;
 if(t===modal||t.closest('.mx')){closeM();return}
 if(x=t.closest('[data-add]')){st.items.push(+x.dataset.add);sync();flash(x);say('Added “'+B[x.dataset.add].t+'” to cart');return}
 if(x=t.closest('[data-cat]')){st.cat=x.dataset.cat;st.apply=1;if(x.classList.contains('hit')||x.closest('#land')){st.q='';go('shop')}else go('shop');return}
 if(x=t.closest('[data-go]')){closeM();go(x.dataset.go);return}
 if(x=t.closest('[data-act]')){acts[x.dataset.act](x);return}
 if(x=t.closest('.post'))x.classList.toggle('open');
});
document.addEventListener('submit',function(e){
 e.preventDefault();var f=e.target;
 if(f.id==='sf'){st.q=f.elements.q.value.trim();st.cat='all';st.apply=1;closeM();go('shop')}
 else if(f.id==='su'){var n=f.elements.nm.value.trim();st.user=n;setBtn('Hi, '+n.split(' ')[0]);closeM();say('Welcome, '+n+'!')}
 else if(f.id==='qf'){closeM();say('Question sent to '+STORE.name)}
 else if(f.id==='of'){var on=f.elements.nm.value.trim();st.items=[];sync();closeM();say('Order request received, '+on.split(' ')[0]+'!')}
 else if(f.id==='joinf'){var jn=f.elements.nm.value.trim();closeM();say('Thanks, '+jn.split(' ')[0]+'! We will be in touch')}
 else if(f.id==='coachf'){var cn=f.elements.nm.value.trim();closeM();say('Thanks, '+cn.split(' ')[0]+'! We got your coaching request')}
 else if(f.id==='donf'){var dn=f.elements.nm.value.trim();closeM();say('Thank you, '+dn.split(' ')[0]+'! We got your donation details')}
 else if(f.id==='sellf'){var bt=f.elements.t.value.trim();closeM();say('Thanks! We got the details for “'+bt+'”')}
 else if(f.id==='mf'){closeM();say('Message sent to '+f.dataset.n)}
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){if(!modal.hidden)closeM();else if(typeof shEsc==='function'&&shEsc())return;else if(view&&!view.hidden)go('home')}
 else if(e.key==='Enter'&&e.target.matches&&e.target.matches('#vnavd [data-go],#vnavd [data-act],#stage [data-go],#stage [data-act],#stage .hit,.mbooks .hit,.mh,.meyebrow,.post')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}
});
/* show restored cart count and signed-in name */
document.querySelectorAll('.cc').forEach(function(e){e.textContent=st.items.length});document.querySelectorAll('.bn-n').forEach(function(e){e.hidden=!st.items.length});
if(st.user)setBtn('Hi, '+st.user.split(' ')[0]);
