/* Books for All - page colour picker */
(function(){
 var KEY='bfa-bg',DEF='#fefdfb',root=document.documentElement,cur=DEF;
 var PR=[['Cream','#fefdfb'],['Ivory','#f6efe0'],['Peach','#ffe7d6'],['Butter','#fff2c9'],['Mint','#dff3e4'],['Sky','#dcecff'],['Lavender','#e9e3ff'],['Rose','#ffe1ea'],['Slate','#1f2430'],['Navy','#14233f'],['Forest','#14352a'],['Black','#121212']];
 var btn=document.createElement('button');btn.className='fpick';btn.setAttribute('aria-label','Change page colour');btn.setAttribute('aria-expanded','false');
 btn.innerHTML='<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#1c1c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3C7 3 3 7.5 3 12.5S7 22 12 22c2 0 2.5-1 2-2.2-.6-1.4.2-2.8 2-2.8h2.5c2.2 0 4.5-1.2 4.5-4.5C23 7 18.5 3 13 3z"/><circle cx="8" cy="11" r="1.3" fill="#fd7b2e" stroke="none"/><circle cx="12" cy="7.5" r="1.3" fill="#2a4577" stroke="none"/><circle cx="17" cy="8.5" r="1.3" fill="#fbbc58" stroke="none"/></svg>';
 var pn=document.createElement('div');pn.id='picker';pn.hidden=true;pn.setAttribute('role','dialog');pn.setAttribute('aria-label','Page colour');
 pn.innerHTML='<div class="ph">Page colour</div><div class="sw">'+PR.map(function(p){return '<button type="button" data-c="'+p[1]+'" title="'+p[0]+'" aria-label="'+p[0]+'" style="background:'+p[1]+'"></button>'}).join('')+'</div><label class="hl" for="chex">Type a colour code</label><div class="pc2"><input type="text" id="chex" value="'+DEF.toUpperCase()+'" maxlength="7" spellcheck="false" autocomplete="off" placeholder="#FEFDFB"><input type="color" id="cpick" value="'+DEF+'" aria-label="Open colour picker"></div><button type="button" class="lnk" id="crst">Reset to default</button>';
 document.body.appendChild(btn);document.body.appendChild(pn);
 function lum(h){var n=parseInt(h.slice(1),16),c=[n>>16&255,n>>8&255,n&255].map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
 function apply(h,save){
  if(!/^#[0-9a-f]{6}$/i.test(h))return;h=h.toLowerCase();cur=h;
  root.style.setProperty('--bg',h);root.classList.toggle('dk',lum(h)<.18);
  var n=parseInt(h.slice(1),16),dr=(n>>16&255)-244,dg=(n>>8&255)-124,db=(n&255)-44;
  if(Math.sqrt(dr*dr+dg*dg+db*db)<90)root.style.setProperty('--orange','#1c4fa0');else root.style.removeProperty('--orange');
  document.getElementById('cpick').value=h;var hx=document.getElementById('chex');if(document.activeElement!==hx){hx.value=h.toUpperCase();hx.classList.remove('bad')}
  pn.querySelectorAll('.sw button').forEach(function(b){b.classList.toggle('on',b.dataset.c===h)});
  if(save){try{if(h===DEF)localStorage.removeItem(KEY);else localStorage.setItem(KEY,h)}catch(e){}}
 }
 function open(o){pn.hidden=!o;btn.setAttribute('aria-expanded',String(o))}
 btn.addEventListener('click',function(){open(pn.hidden)});
 pn.addEventListener('click',function(e){var b=e.target.closest('.sw button');if(b)apply(b.dataset.c,true);if(e.target.id==='crst')apply(DEF,true)});
 pn.addEventListener('input',function(e){
  if(e.target.id==='cpick'){apply(e.target.value,true);return}
  if(e.target.id==='chex'){var t=e.target,v=t.value.trim().replace(/^#/,'');if(/^[0-9a-f]{3}$/i.test(v))v=v.replace(/./g,'$&$&');var ok=/^[0-9a-f]{6}$/i.test(v);t.classList.toggle('bad',!ok&&v.length>0);if(ok)apply('#'+v,true)}
 });
 pn.addEventListener('focusout',function(e){if(e.target.id==='chex'){e.target.value=cur.toUpperCase();e.target.classList.remove('bad')}});
 document.addEventListener('click',function(e){if(!pn.hidden&&!pn.contains(e.target)&&!btn.contains(e.target))open(false)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pn.hidden){open(false);btn.focus()}});
 var saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
 apply(saved||DEF,false);
})();
