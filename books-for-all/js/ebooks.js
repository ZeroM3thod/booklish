/* Books for All - e-books page */
function ebooks(){
 vb.innerHTML='<div class="tmpage"><section class="abhero"><div class="abt"><div class="abey">E-BOOKS</div><h1 class="abh1">Read on any<br>screen.</h1><p class="abp">Digital books for school, college, admission and general reading. Our e-book shelf is on its way.</p><div class="abrow"><button class="sub abbtn" data-act="msg" data-n="our team" data-t="our team">Ask about e-books</button><button class="lnk" data-go="shop">Browse printed books</button></div></div></section>'+
 '<section class="absec"><div class="abfeat" style="background-color:'+COL.modern+';color:#fff"><div><div class="abeyb">COMING SOON</div><h2>E-books are on the way</h2><p>Tell us which titles you would like to read digitally and we will add them first.</p><button class="abw" data-act="msg" data-n="our team" data-t="our team">Request a title</button></div></div></section></div>';
}
function route(){mountView(ebooks,false)}
function onDeals(){route()}
applyDeals();tick();setInterval(tick,1000);window.addEventListener('hashchange',route);route();
