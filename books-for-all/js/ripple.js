/* Books for All - button ripple effect */
(function(){
 var SEL='.sub,.lnk,.add,.chip,.vback,.nbtn,.mbtn,.carr,.fcart,.btn,.mgo,.go,.mi,.bn-i,.fb,.mshop,.abw,.mpanel button,.bn-panel button,.bn-links button';
 document.addEventListener('click',function(e){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var b=e.target.closest&&e.target.closest(SEL);if(!b)return;
  var r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,cx=e.detail?e.clientX-r.left:r.width/2,cy=e.detail?e.clientY-r.top:r.height/2;
  if(getComputedStyle(b).position==='static')b.style.position='relative';
  b.style.overflow='hidden';
  var s=document.createElement('span');s.className='rip';
  s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(cx-d/2)+'px;top:'+(cy-d/2)+'px';
  b.appendChild(s);setTimeout(function(){s.remove()},650);
 });
})();
