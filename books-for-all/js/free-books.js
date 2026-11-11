/* Books for All - free books page */
var FC=[{t:'Adventure Starter Pack',a:'3 books',c:'combo',p:0,cond:'Mixed condition',items:[15,16,18]},{t:'Thinker’s Free Pack',a:'3 books',c:'combo',p:0,cond:'Mixed condition',items:[17,20,19]}];
var FEB=[{t:'Pride and Prejudice',a:'Jane Austen',c:'classic',fmt:'EPUB · PDF',n:'432 pages',u:'https://www.gutenberg.org/ebooks/1342'},{t:'Jane Eyre',a:'Charlotte Brontë',c:'classic',fmt:'EPUB · PDF',n:'532 pages',u:'https://www.gutenberg.org/ebooks/1260'},{t:'Frankenstein',a:'Mary Shelley',c:'modern',fmt:'EPUB · PDF',n:'280 pages',u:'https://www.gutenberg.org/ebooks/84'},{t:'The Adventures of Sherlock Holmes',a:'Arthur Conan Doyle',c:'nonfiction',fmt:'EPUB · PDF',n:'307 pages',u:'https://www.gutenberg.org/ebooks/1661'},{t:'A Tale of Two Cities',a:'Charles Dickens',c:'classic',fmt:'EPUB · PDF',n:'448 pages',u:'https://www.gutenberg.org/ebooks/98'},{t:'Moby-Dick',a:'Herman Melville',c:'modern',fmt:'EPUB · PDF',n:'720 pages',u:'https://www.gutenberg.org/ebooks/2701'}];

function ecard(e,k){var cv=cover(e).replace('>'+esc(e.t)+'</div>','><span class="cb">E-BOOK</span><span class="cb of">FREE</span>'+esc(e.t)+'</div>');return '<div class="pc ebc" style="animation-delay:'+(k*60)+'ms"><a class="pcb" href="'+e.u+'" target="_blank" rel="noopener" aria-label="'+esc(e.t)+', read free e-book">'+cv+'<div class="meta"><b>'+esc(e.t)+'</b><br>'+esc(e.a)+' · '+esc(e.fmt)+'</div></a><div class="pr"><span><b>Free</b> <s style="opacity:.5">'+esc(e.n)+'</s></span><a class="add" href="'+e.u+'" target="_blank" rel="noopener">Read free</a></div></div>'}
function fcard(b,k){var combo=!!b.items,i=B.indexOf(b),cv=cover(b);
 cv=combo?cv.replace('>'+esc(b.t)+'</div>','><span class="cb of">FREE</span>'+esc(b.t)+'</div>'):cv.replace('>'+esc(b.t)+'</div>','><span class="cb">DONATED</span>'+esc(b.t)+'</div>');
 var act=combo?'data-act="reqc" data-k="'+k+'"':'data-act="req" data-i="'+i+'"';
 return '<div class="pc"><button class="pcb" '+act+' aria-label="'+esc(b.t)+', request this '+(combo?'combo':'book')+'">'+cv+'<div class="meta"><b>'+esc(b.t)+'</b><br>'+(combo?b.items.length+' books':esc(b.a))+' · '+esc(b.cond)+'</div></button><div class="pr"><span><b>Free</b></span><button class="add" '+act+'>Request</button></div></div>'}
function reqM(b){var combo=!!b.items;
 openM('<h2>Request '+(combo?'this combo':'this book')+'</h2><p style="margin-bottom:6px"><b>'+esc(b.t)+'</b>'+(combo?' · '+b.items.length+' books':' · '+esc(b.a))+'</p>'+
 (combo?'<ul class="il">'+b.items.map(function(k){return '<li>'+esc(B[k].t)+' — '+esc(B[k].a)+'</li>'}).join('')+'</ul>':'')+
 '<p style="margin-bottom:8px;font-size:14px">This book is donated, so it is free. Tell us who you are and how you would like to get it. Copies go to the first requests we receive.</p>'+
 '<form id="reqf" data-t="'+esc(b.t)+'"><input class="fi" name="nm" placeholder="Your name" required autocomplete="name"><input class="fi" name="ph" type="tel" placeholder="Phone number" required autocomplete="tel">'+
 '<select class="fi" name="how" aria-label="How you want to get it"><option>I will pick it up</option><option>Please send it to me</option></select>'+
 '<textarea class="fi" name="ad" rows="2" placeholder="Address (only if you want it sent)"></textarea>'+
 '<textarea class="fi" name="why" rows="2" placeholder="Why do you need this book? (optional)"></textarea><button class="sub">Send request</button></form>')}
function freebooks(){
 vb.classList.add('freepg');
 var fr=B.filter(function(b){return !b.items&&b.p===0});
 var none='<div class="abfeat" style="background-color:'+COL.nonfiction+';color:#1c1c1c"><div><div class="abeyb">NOTHING ON THE SHELF YET</div><h2>No free books right now</h2><p>Free books come from donations, so the shelf changes often. Ask us and we will let you know when new ones arrive.</p><button class="abw dkb" data-act="msg" data-n="our team" data-t="our team">Ask our team</button></div></div>';
 vb.innerHTML='<div class="tmpage"><section class="abhero"><div class="abt"><div class="abey">FREE BOOKS</div><h1 class="abh1">Books that<br>cost nothing.</h1><p class="abp">Donated books and free e-books for anyone who needs them. Pick one up, read it, and pass it on when you are done.</p><div class="abrow"><button class="sub abbtn" data-act="donate">Donate books</button><button class="lnk" data-go="shop">Browse all books</button></div></div></section>'+
 '<section class="abstats"><div><b>'+fr.length+'</b><span>free printed books</span></div><div><b>'+FEB.length+'</b><span>free e-books</span></div><div><b>৳0</b><span>to pick up or read</span></div><div><b>0</b><span>sign-ups needed</span></div></section>'+
 '<section class="absec"><div class="abeyb">FREE PRINTED BOOKS</div><h2 class="abh2">Take one home</h2>'+(fr.length?'<div class="grid" id="lfree">'+fr.map(fcard).join('')+'</div>':none)+'</section>'+
 '<section class="absec"><div class="abeyb">FREE COMBOS</div><h2 class="abh2">Take the whole set</h2><div class="grid" id="lfcombo">'+FC.map(fcard).join('')+'</div></section>'+
 '<section class="absec"><div class="abeyb">FREE E-BOOKS</div><h2 class="abh2">Read now, on any screen</h2><div class="grid" id="lfeb">'+FEB.map(ecard).join('')+'</div></section></div>';
}
acts.req=function(x){var b=B[+x.dataset.i];reqM(b)};
acts.reqc=function(x){reqM(FC[+x.dataset.k])};
document.addEventListener('submit',function(e){var f=e.target;
 if(f.id==='reqf'){var rn=f.elements.nm.value.trim(),rt=f.dataset.t;closeM();say('Thanks, '+rn.split(' ')[0]+'! We got your request for “'+rt+'”')}
});
function route(){mountView(freebooks,false)}
function onDeals(){route()}
applyDeals();tick();setInterval(tick,1000);window.addEventListener('hashchange',route);route();
