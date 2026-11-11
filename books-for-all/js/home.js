/* Books for All - home page */
(function(){
  var s=document.getElementById('stage'),w=document.getElementById('wrap');
  function fit(){var k=window.innerWidth/1906;s.style.transform='scale('+k+')';w.style.height=(1220*k)+'px';}
  window.addEventListener('resize',fit);fit();
})();
function land(){
 var n=function(c){return B.filter(function(b){return b.c===c}).length};
 var C=[['classic','Classic',n('classic')+' books'],['modern','Modern Art',n('modern')+' books'],['nonfiction','Nonfiction',n('nonfiction')+' books'],['combo','Combos',n('combo')+' deals']];
 $('#lcats').innerHTML=C.map(function(c){return '<button class="cbox" data-cat="'+c[0]+'" style="background-color:'+COL[c[0]]+';color:'+(c[0]==='nonfiction'?'#1c1c1c':'#fff')+'"><span class="bdg"><svg width="28" height="28" viewBox="-22 -22 44 44"><path d="M0,-20 Q2.5,-2.5 20,0 Q2.5,2.5 0,20 Q-2.5,2.5 -20,0 Q-2.5,-2.5 0,-20Z" fill="#1c1c1c"/></svg></span><span class="ct">'+c[1]+'</span><span class="cn">'+c[2]+' →</span></button>'}).join('');
 $('#lsingles').innerHTML=B.filter(function(b){return !b.items}).map(card).join('');
 $('#lcombos').innerHTML=B.filter(function(b){return b.items}).map(card).join('');
 var act=B.filter(function(b){return b.dl});$('#lofsec').hidden=!act.length;
 if(act.length){var f0=act.reduce(function(a,b){return Date.parse(b.dl.end)<Date.parse(a.dl.end)?b:a});$('#lofcd').dataset.end=f0.dl.end;$('#loffers').innerHTML=act.map(card).join('')}
}
function ccard(b){var i=B.indexOf(b);return '<div class="cmb"><div><span class="cb2">COMBO · SAVE '+Math.round((1-b.p/b.old)*100)+'%</span><h3>'+esc(b.t)+'</h3></div><ul>'+b.items.map(function(k){return '<li>'+esc(B[k].t)+' <span>'+esc(B[k].a)+'</span></li>'}).join('')+'</ul><div class="pr"><span><b>'+PR(b)+'</b> <s>'+CUR+b.old+'</s></span><button class="add" data-add="'+i+'">Add combo</button></div></div>'}
document.addEventListener('click',function(e){var l=e.target.closest&&e.target.closest('.ft-mark span');if(!l)return;l.classList.remove('flip');void l.offsetWidth;l.classList.add('flip');l.addEventListener('animationend',function(){l.classList.remove('flip')},{once:true})});
document.addEventListener('submit',function(e){var f=e.target;
 if(f.id==='qform'||f.id==='qform2'){st.q=f.querySelector('input').value.trim();st.cat='all';st.apply=1;go('shop')}
 else if(f.id==='nlf'){var ne=f.elements.em.value.trim();f.reset();say('You’re in! New arrivals will reach '+ne)}
});
document.querySelectorAll('#stage .eyebrow,#stage .h,#stage .pill').forEach(function(n){n.setAttribute('data-go','shop')});
document.querySelectorAll('#stage [data-go],#stage [data-act],#stage .hit').forEach(function(n){n.setAttribute('tabindex','0');n.setAttribute('role',n.hasAttribute('data-go')?'link':'button')});
(function(){var s=$('svg.books'),m=$('#mbk');if(!s||!m)return;var c=s.cloneNode(true);c.innerHTML=c.innerHTML.replace(/grain/g,'grain2').replace(/id="star"/g,'id="star2"').replace(/#star"/g,'#star2"');c.setAttribute('class','mbooks');c.setAttribute('viewBox','888 261 1016 959');c.removeAttribute('width');c.removeAttribute('height');m.appendChild(c);c.querySelectorAll('.hit').forEach(function(n){n.setAttribute('tabindex','0');n.setAttribute('role','button')})})();
applyDeals();land();tick();setInterval(tick,1000);
