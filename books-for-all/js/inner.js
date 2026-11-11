/* Books for All - inner pages: navbar scaling + view mounting */
(function(){
 var d=document.getElementById('vnavd'),n=document.getElementById('vnav');
 function fit(){var k=window.innerWidth/1906;n.style.transform='scale('+k+')';d.style.height=(133*k)+'px'}
 window.addEventListener('resize',fit);fit();
})();
function mountView(render,bk){
 view.classList.add('isbook');
 document.body.classList.toggle('bkopen',!!bk);
 vb.className='vbody';
 render();
 paintCd();
 view.hidden=false;view.scrollTop=0;document.body.style.overflow='hidden';
}
