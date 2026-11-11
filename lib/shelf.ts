/* eslint-disable */
// @ts-nocheck
/* Books for All - home page book shelf physics (ported from shelf.js) */
var PY = 1220, CL = .6;

function makeShelf(B, X0, X1, PY, CL) {
  var GAP = .3, N = B.length, i;
  function rotP(px, p, a) { var c = Math.cos(a), s = Math.sin(a), dx = p[0] - px, dy = p[1] - PY; return [px + dx * c - dy * s, PY + dx * s + dy * c] }
  function exAt(px, e, y, a) { var A = rotP(px, e[0], a), Z = rotP(px, e[1], a); if (A[1] === Z[1]) return null; var t = (y - A[1]) / (Z[1] - A[1]); return t < 0 || t > 1 ? null : A[0] + (Z[0] - A[0]) * t }
  function gap(L, aL, R, aR) {
    var lo = Math.max(L.top, R.top) + 8, hi = 1205, n = 12, g = 1e9, k, y, xl, xr, c;
    for (k = 0; k <= n; k++) { y = hi - (hi - lo) * k / n; xl = exAt(L.px, L.R, y, aL); xr = exAt(R.px, R.L, y, aR); if (xl !== null && xr !== null && xr - xl < g) g = xr - xl }
    c = rotP(L.px, L.R[0], aL); xr = exAt(R.px, R.L, c[1], aR); if (xr !== null && xr - c[0] < g) g = xr - c[0];
    c = rotP(R.px, R.L[0], aR); xl = exAt(L.px, L.R, c[1], aL); if (xl !== null && c[0] - xl < g) g = c[0] - xl;
    return g;
  }
  function minR(i, aL) {
    var L = B[i], R = B[i + 1], lo = -CL, hi = CL, k, m;
    if (gap(L, aL, R, -CL) >= GAP) return -CL;
    if (gap(L, aL, R, CL) < GAP) return 9;
    for (k = 0; k < 24; k++) { m = (lo + hi) / 2; if (gap(L, aL, R, m) >= GAP) hi = m; else lo = m }
    return hi;
  }
  function maxL(i, aR) {
    var L = B[i], R = B[i + 1], lo = -CL, hi = CL, k, m;
    if (gap(L, CL, R, aR) >= GAP) return CL;
    if (gap(L, -CL, R, aR) < GAP) return -9;
    for (k = 0; k < 24; k++) { m = (lo + hi) / 2; if (gap(L, m, R, aR) >= GAP) lo = m; else hi = m }
    return lo;
  }
  function okL(b, a) { return Math.min(rotP(b.px, b.wl[0], a)[0], rotP(b.px, b.wl[1], a)[0]) >= X0 - .6 }
  function okR(b, a) { return Math.max(rotP(b.px, b.wr[0], a)[0], rotP(b.px, b.wr[1], a)[0]) <= X1 + .6 }
  B.forEach(function (b) {
    var lo, hi, k, m, l, h;
    if (okL(b, -CL)) lo = -CL; else if (!okL(b, 0)) lo = 0; else { l = -CL; h = 0; for (k = 0; k < 30; k++) { m = (l + h) / 2; if (okL(b, m)) h = m; else l = m } lo = h }
    if (okR(b, CL)) hi = CL; else if (!okR(b, 0)) hi = 0; else { l = 0; h = CL; for (k = 0; k < 30; k++) { m = (l + h) / 2; if (okR(b, m)) l = m; else h = m } hi = l }
    b.lo = lo; b.hi = hi; b.a = 0;
  });
  B[0].lb = B[0].lo;
  for (i = 1; i < N; i++) B[i].lb = Math.min(B[i].hi, Math.max(B[i].lo, minR(i - 1, B[i - 1].lb)));
  B[N - 1].ub = B[N - 1].hi;
  for (i = N - 2; i >= 0; i--) B[i].ub = Math.max(B[i].lo, Math.min(B[i].hi, maxL(i, B[i + 1].ub)));
  function pushR(j) { var v = minR(j - 1, B[j - 1].a); if (v > B[j].a + 1e-6) { B[j].a = Math.min(v, B[j].hi); return true } return false }
  function pushL(j) { var v = maxL(j, B[j + 1].a); if (v < B[j].a - 1e-6) { B[j].a = Math.max(v, B[j].lo); return true } return false }
  function fromDragged(d) { var j; for (j = d + 1; j < N; j++) if (!pushR(j)) break; for (j = d - 1; j >= 0; j--) if (!pushL(j)) break }
  function relax() { var r, j; for (r = 0; r < 2; r++) { for (j = N - 2; j >= 0; j--) pushL(j); for (j = 1; j < N; j++) pushR(j) } }
  return { fromDragged: fromDragged, relax: relax, gap: gap };
}

/* call with an <svg> containing g.bk groups; returns a cleanup function */
export function setupShelf(svg) {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;
  var suppress = false;
  function swallow(e) { if (suppress) { e.stopPropagation(); e.preventDefault() } }
  document.addEventListener("click", swallow, true);

  var gs = [].slice.call(svg.querySelectorAll("g.bk"));
  if (!gs.length) return function () { document.removeEventListener("click", swallow, true) };

  var vb = svg.viewBox && svg.viewBox.baseVal, X0 = vb && vb.width ? vb.x : 0, X1 = vb && vb.width ? vb.x + vb.width : 1906;
  var pp = function (s) { return s.trim().split(/\s+/).map(function (t) { var a = t.split(","); return [+a[0], +a[1]] }) };
  var B = gs.map(function (g) {
    var q = pp(g.querySelector("polygon[filter]").getAttribute("points")), hp = pp(g.querySelector(".hit").getAttribute("points"));
    var t0 = (PY - hp[0][1]) / (hp[3][1] - hp[0][1]), t1 = (PY - hp[1][1]) / (hp[2][1] - hp[1][1]);
    return {
      g: g, px: +g.dataset.px, top: +g.dataset.top, a: 0, L: [q[0], q[3]], R: [q[1], q[2]],
      wl: [hp[0], [hp[0][0] + (hp[3][0] - hp[0][0]) * t0, PY]], wr: [hp[1], [hp[1][0] + (hp[2][0] - hp[1][0]) * t1, PY]]
    };
  });
  var S = makeShelf(B, X0, X1, PY, CL), raf = 0, last = 0, drag = null, intro = null, io = null;
  function pt(e) { var m = svg.getScreenCTM(); if (!m) return null; var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(m.inverse()) }
  function ang(b, p) { return Math.atan2(p.x - b.px, Math.max(40, PY - p.y)) }
  function draw() { B.forEach(function (b) { b.g.style.transform = b.a ? "translate(" + b.px + "px," + PY + "px) rotate(" + b.a + "rad) translate(" + (-b.px) + "px," + (-PY) + "px)" : "" }) }
  function introStep() {
    var done = true;
    B.forEach(function (b, i) {
      var tt = intro.t - i * .11, v = 0;
      if (tt > 0) { v = -(.05 + .008 * i) * Math.exp(-2.4 * tt) * (.5 - .5 * Math.cos(6.2832 * 1.6 * tt)); if (tt < 2.2) done = false } else done = false;
      b.a = Math.max(b.lo, v);
    });
    if (done) { B.forEach(function (b) { b.a = 0 }); intro = null; return false }
    S.relax(); return true;
  }
  function frame(t) {
    raf = 0; var dt = Math.min(.05, (t - last) / 1000), go = false; last = t;
    if (intro) { intro.t += dt; if (introStep()) go = true }
    if (drag) {
      var b = drag.b, k = reduce ? 1 : 1 - Math.exp(-dt * 30);
      b.a += (drag.tg - b.a) * k; if (Math.abs(drag.tg - b.a) < 1e-5) b.a = drag.tg;
      S.fromDragged(drag.i);
      if (drag.down || b.a !== drag.tg) go = true; else drag = null;
    }
    draw();
    if (go) { raf = requestAnimationFrame(frame) }
  }
  function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
  function down(e) {
    if (e.button > 0) return;
    var h = e.target.closest && e.target.closest(".hit"); if (!h) return;
    var i = gs.indexOf(h.closest("g.bk")), b = B[i], p = pt(e); if (!b || !p) return;
    intro = null;
    drag = { b: b, i: i, id: e.pointerId, down: true, x: e.clientX, y: e.clientY, moved: false, g0: ang(b, p), a0: b.a, tg: b.a };
    suppress = false;
    try { h.setPointerCapture(e.pointerId) } catch (_) { }
    start();
  }
  function move(e) {
    if (!drag || !drag.down || e.pointerId !== drag.id) return;
    var p = pt(e); if (!p) return;
    if (!drag.moved && Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 6) drag.moved = true;
    if (drag.moved) drag.tg = Math.max(drag.b.lb, Math.min(drag.b.ub, drag.a0 + ang(drag.b, p) - drag.g0));
    start();
  }
  function end(e) {
    if (!drag || !drag.down || e.pointerId !== drag.id) return;
    drag.down = false;
    if (drag.moved) { suppress = true; setTimeout(function () { suppress = false }, 120) }
    start();
  }
  svg.addEventListener("pointerdown", down);
  svg.addEventListener("pointermove", move);
  svg.addEventListener("pointerup", end);
  svg.addEventListener("pointercancel", end);
  if (!reduce && "IntersectionObserver" in window) {
    io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { io.disconnect(); if (!drag) { intro = { t: 0 }; start() } }
    }, { threshold: .3 });
    io.observe(svg);
  }
  return function cleanup() {
    cancelAnimationFrame(raf); raf = 0;
    if (io) io.disconnect();
    svg.removeEventListener("pointerdown", down);
    svg.removeEventListener("pointermove", move);
    svg.removeEventListener("pointerup", end);
    svg.removeEventListener("pointercancel", end);
    document.removeEventListener("click", swallow, true);
  };
}
