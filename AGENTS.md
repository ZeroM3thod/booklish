

## ⚠️ Before you start
`index.html` links `css/common.css`, but **that file wasn't in your upload.** It defines `--bg`, `--ink`, `--orange`, `.abs`, `.pc`, the modal, the toast and more. Copy it into the project **unchanged**; I haven't rewritten any CSS.

## Step-by-step guide
1. Copy `css/common.css` to `app/common.css` and `css/home.css` to `app/home.css`, both unchanged.
2. **Delete `app/globals.css`.** Tailwind's reset and its dark-mode body colours would change your design.
3. Create or replace the files below.
4. Run `npm run dev`.

```
app/layout.tsx          (replace)
app/page.tsx            (replace)
lib/data.ts             (new)
lib/shelf.ts            (new, your shelf.js ported)
components/StoreContext.ts
components/StoreProvider.tsx
components/Modal.tsx
components/ThemePicker.tsx
components/Ripple.tsx
components/Logo.tsx
components/Navbar.tsx
components/Shelf.tsx
components/Hero.tsx
components/Landing.tsx
components/Footer.tsx
```

---

## `app/layout.tsx`
```tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./common.css";
import "./home.css";
import StoreProvider from "@/components/StoreProvider";

export const metadata: Metadata = { title: "Books for All" };
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* applies the saved page colour before first paint (no flash) */
const themeBoot = `try{var h=localStorage.getItem('bfa-bg');if(/^#[0-9a-f]{6}$/i.test(h||'')){var r=document.documentElement,n=parseInt(h.slice(1),16),c=[n>>16&255,n>>8&255,n&255].map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}),l=.2126*c[0]+.7152*c[1]+.0722*c[2],a=(n>>16&255)-244,b=(n>>8&255)-124,d=(n&255)-44;r.style.setProperty('--bg',h);if(l<.18)r.classList.add('dk');if(Math.sqrt(a*a+b*b+d*d)<90)r.style.setProperty('--orange','#1c4fa0')}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
```

## `app/page.tsx`
```tsx
import Hero from "@/components/Hero";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Hero />
      <Landing />
    </>
  );
}
```

---

## `lib/data.ts`
```ts
export type Book = {
  t: string; a: string; c: string; p: number; old?: number; cond: string; items?: number[];
};
export type Deal = { p: number; end: string };
export type LiveBook = Book & { reg: number; dl: Deal | null };

export const CUR = "৳";
export const COL: Record<string, string> = {
  classic: "#fd7b2e", modern: "#2a4577", nonfiction: "#fbbc58", combo: "#1c1c1c",
};

export const BOOKS: Book[] = [
  { t: "Pride and Prejudice", a: "Jane Austen", c: "classic", p: 220, cond: "Good" },
  { t: "Great Expectations", a: "Charles Dickens", c: "classic", p: 260, cond: "Fair" },
  { t: "Moby-Dick", a: "Herman Melville", c: "classic", p: 280, cond: "Good" },
  { t: "Jane Eyre", a: "Charlotte Brontë", c: "classic", p: 240, cond: "Like new" },
  { t: "Shapes of Now", a: "Lena Ortiz", c: "modern", p: 520, cond: "Like new" },
  { t: "Colour in Motion", a: "Daniel Reyes", c: "modern", p: 580, cond: "Good" },
  { t: "The Bold Line", a: "Mira Kapoor", c: "modern", p: 480, cond: "Good" },
  { t: "Gallery Without Walls", a: "Tom Hale", c: "modern", p: 540, cond: "Fair" },
  { t: "Deep Habits", a: "Sara Quinn", c: "nonfiction", p: 320, cond: "Like new" },
  { t: "The Quiet Economy", a: "Omar Siddiq", c: "nonfiction", p: 350, cond: "Good" },
  { t: "Mapping the Mind", a: "Priya Nair", c: "nonfiction", p: 380, cond: "Good" },
  { t: "Small Steps", a: "Ben Carter", c: "nonfiction", p: 290, cond: "Fair" },
  { t: "Classic Starter Combo", a: "3 books", c: "combo", p: 620, old: 740, cond: "Mixed condition", items: [0, 2, 3] },
  { t: "Art Lover Pack", a: "3 books", c: "combo", p: 1290, old: 1580, cond: "Mixed condition", items: [4, 5, 6] },
  { t: "Think Better Bundle", a: "3 books", c: "combo", p: 820, old: 990, cond: "Mixed condition", items: [8, 10, 11] },
  { t: "Treasure Island", a: "Robert Louis Stevenson", c: "classic", p: 0, cond: "Good" },
  { t: "The Time Machine", a: "H. G. Wells", c: "classic", p: 0, cond: "Fair" },
  { t: "Walden", a: "Henry David Thoreau", c: "nonfiction", p: 0, cond: "Good" },
  { t: "The Jungle Book", a: "Rudyard Kipling", c: "classic", p: 0, cond: "Good" },
  { t: "Little Women", a: "Louisa May Alcott", c: "classic", p: 0, cond: "Fair" },
  { t: "Meditations", a: "Marcus Aurelius", c: "nonfiction", p: 0, cond: "Like new" },
];

export const DEALS: Record<number, Deal> = {
  0: { p: 170, end: "2026-11-12T23:59:59+06:00" },
  5: { p: 450, end: "2026-11-15T23:59:59+06:00" },
  8: { p: 250, end: "2026-11-12T23:59:59+06:00" },
  12: { p: 499, end: "2026-11-20T23:59:59+06:00" },
  13: { p: 990, end: "2026-11-30T23:59:59+06:00" },
};

/* where each old .html page lives now; change these when you build the pages */
const ROUTES: Record<string, string> = {
  home: "/", shop: "/shop", free: "/free-books", ebooks: "/ebooks",
  study: "/study", about: "/about", team: "/team",
};
export function targetOf(r: string): string | null {
  if (/^book-\d+$/.test(r)) return "/shop";
  if (/^study-/.test(r)) return "/study";
  return ROUTES[r] ?? null;
}

/* pure version of applyDeals(): pass the current time, get books with live prices */
export function liveBooks(now: number | null): LiveBook[] {
  return BOOKS.map((b, i) => {
    const d = DEALS[i];
    const on = !!d && now !== null && Date.parse(d.end) > now;
    return { ...b, reg: b.p, dl: on ? d : null, p: on ? d.p : b.p };
  });
}
export const price = (b: Book) => (b.p === 0 ? "Free" : CUR + b.p);
export const was = (b: LiveBook) => (b.dl ? b.reg : b.old);
```

## `lib/shelf.ts` (your shelf.js, same physics, now with cleanup)
```ts
// @ts-nocheck
/* eslint-disable */
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
```

---

## `components/StoreContext.ts`
```ts
"use client";
import { createContext, useContext } from "react";
import type { LiveBook } from "@/lib/data";

export type ModalKind =
  | { k: "cart" | "search" | "signup" | "join" | "coach" | "donate" | "sell" | "checkout" }
  | { k: "msg"; n: string; t: string };

export type Store = {
  items: number[]; user: string | null; menuOpen: boolean; modal: ModalKind | null;
  add(i: number): void; remove(k: number): void; placeOrder(): void;
  login(n: string): void; logout(): void;
  say(m: string): void; go(r: string): void; search(q: string): void;
  setModal(m: ModalKind | null): void;
};

export const StoreCtx = createContext<Store | null>(null);
export const BooksCtx = createContext<{ now: number | null; books: LiveBook[] }>({ now: null, books: [] });

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be used inside <StoreProvider>");
  return c;
};
export const useBooks = () => useContext(BooksCtx);
```

## `components/StoreProvider.tsx` (cart, session state, toast, navigation, global click handling)
```tsx
"use client";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { DEALS, liveBooks, targetOf } from "@/lib/data";
import { BooksCtx, StoreCtx, type ModalKind, type Store } from "./StoreContext";
import Modal from "./Modal";
import ThemePicker from "./ThemePicker";
import Ripple from "./Ripple";

const KEY = "bfa-state"; /* same sessionStorage key/shape as your old pages */

export default function StoreProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [now, setNow] = useState<number | null>(null);
  const [items, setItems] = useState<number[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalKind | null>(null);
  const [toast, setToast] = useState({ msg: "", on: false });
  const [ready, setReady] = useState(false);

  const shared = useRef<{ cat: string; q: string; apply: number; wish: object }>({ cat: "all", q: "", apply: 0, wish: {} });
  const live = useRef({ items, user, ready });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cartBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => { live.current = { items, user, ready }; }, [items, user, ready]);

  const persist = useCallback(() => {
    if (!live.current.ready) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ items: live.current.items, user: live.current.user, ...shared.current }));
    } catch { }
  }, []);

  /* restore cart / name / pending shop filter */
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (s) {
        setItems(s.items || []);
        setUser(s.user || null);
        shared.current = { cat: s.cat || "all", q: s.q || "", apply: s.apply || 0, wish: s.wish || {} };
      }
    } catch { }
    setReady(true);
  }, []);
  useEffect(() => { persist(); }, [items, user, ready, persist]);
  useEffect(() => {
    window.addEventListener("pagehide", persist);
    return () => window.removeEventListener("pagehide", persist);
  }, [persist]);

  const say = useCallback((msg: string) => {
    setToast({ msg, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);

  /* limited-time offers: tick every second, toast when one ends */
  useEffect(() => {
    let prev = -1;
    const tick = () => {
      const t = Date.now();
      const act = Object.values(DEALS).filter((d) => Date.parse(d.end) > t).length;
      if (prev >= 0 && act < prev) say("A special offer just ended");
      prev = act;
      setNow(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [say]);

  const go = useCallback((r: string) => {
    setMenuOpen(false);
    const t = targetOf(r);
    if (!t || t === window.location.pathname) return;
    persist();
    router.push(t + (/^(book|study)-/.test(r) ? "#" + r : ""));
  }, [persist, router]);

  const bump = () => {
    const el = cartBtn.current; if (!el) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  };

  const store = useMemo<Store>(() => ({
    items, user, menuOpen, modal,
    add: (i) => { setItems((a) => [...a, i]); bump(); },
    remove: (k) => { setItems((a) => a.filter((_, j) => j !== k)); bump(); },
    placeOrder: () => { setItems([]); bump(); },
    login: (n) => setUser(n),
    logout: () => setUser(null),
    say, go, setModal,
    search: (q) => { shared.current = { ...shared.current, cat: "all", q: q.trim(), apply: 1 }; go("shop"); },
  }), [items, user, menuOpen, modal, say, go]);

  const booksValue = useMemo(() => ({ now, books: liveBooks(now) }), [now]);

  /* global click + keyboard handling (same data-go / data-act / data-cat attributes as before) */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element; let x: HTMLElement | null;
      if ((x = t.closest("[data-cat]"))) {
        shared.current.cat = x.dataset.cat || "all"; shared.current.apply = 1;
        if (x.classList.contains("hit") || x.closest("#land")) shared.current.q = "";
        go("shop"); return;
      }
      if ((x = t.closest("[data-go]"))) { setModal(null); go(x.dataset.go!); return; }
      if ((x = t.closest("[data-act]"))) {
        const a = x.dataset.act!;
        if (["cart", "search", "signup", "join", "coach", "donate", "sell"].includes(a)) setModal({ k: a } as ModalKind);
        else if (a === "msg") setModal({ k: "msg", n: x.dataset.n || "", t: x.dataset.t || "" });
        else if (a === "detail") go("book-" + x.dataset.i);
        else if (a === "menu") setMenuOpen((o) => !o);
        else if (a === "top") window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" });
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
      else if (e.key === "Enter" && (e.target as Element).matches?.("#stage [data-go],#stage [data-act],#stage .hit,.mbooks .hit,.mh,.meyebrow")) {
        e.preventDefault();
        (e.target as HTMLElement).dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onKey); };
  }, [go]);

  return (
    <StoreCtx.Provider value={store}>
      <BooksCtx.Provider value={booksValue}>
        {children}
        <button ref={cartBtn} className="fcart" data-act="cart">Cart (<b className="cc">{items.length}</b>)</button>
        <Modal />
        <div id="toast" role="status" className={toast.on ? "on" : ""}>{toast.msg}</div>
        <ThemePicker />
        <Ripple />
      </BooksCtx.Provider>
    </StoreCtx.Provider>
  );
}
```

## `components/Modal.tsx`
```tsx
"use client";
import type { FormEvent, ReactNode } from "react";
import { useBooks, useStore } from "./StoreContext";
import { CUR, price } from "@/lib/data";

type F = { n: string; ph?: string; type?: string; ac?: string; req?: boolean; min?: number; minLen?: number; rows?: number; opts?: string[]; def?: string; label?: string };
const first = (s: string) => s.trim().split(" ")[0];

function Form({ id, title, intro, fields, btn, done }: {
  id: string; title: string; intro?: string; fields: F[]; btn: string; done: (v: Record<string, string>) => void;
}) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((x, k) => { v[k] = String(x); });
    done(v);
  };
  return (
    <>
      <h2>{title}</h2>
      {intro && <p style={{ marginBottom: 8 }}>{intro}</p>}
      <form id={id} onSubmit={onSubmit}>
        {fields.map((f, i) =>
          f.opts ? (
            <select key={f.n} className="fi" name={f.n} aria-label={f.label} defaultValue={f.def}>
              {f.opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : f.rows ? (
            <textarea key={f.n} className="fi" name={f.n} rows={f.rows} placeholder={f.ph} required={f.req} autoFocus={i === 0} />
          ) : (
            <input key={f.n} className="fi" name={f.n} type={f.type} placeholder={f.ph} required={f.req}
              autoComplete={f.ac} min={f.min} minLength={f.minLen} autoFocus={i === 0} />
          ),
        )}
        <button className="sub">{btn}</button>
      </form>
    </>
  );
}

export default function Modal() {
  const { modal, setModal, items, user, remove, placeOrder, login, logout, say, search } = useStore();
  const { books } = useBooks();
  const close = () => setModal(null);
  let body: ReactNode = null;

  if (modal) {
    switch (modal.k) {
      case "cart":
        if (!items.length) {
          body = (<><h2>Your cart</h2><p style={{ marginBottom: 10 }}>Your cart is empty. Add some books first.</p><button className="sub" data-go="shop">Browse books</button></>);
        } else {
          const total = items.reduce((t, i) => t + books[i].p, 0);
          body = (
            <>
              <h2>Your cart</h2>
              {items.map((i, k) => (
                <div className="crow" key={k}>
                  <span>{books[i].t}{books[i].items && <>{" "}<small>(combo)</small></>}</span>
                  <b>{price(books[i])}</b>
                  <button className="rm" aria-label="Remove" onClick={() => remove(k)}>×</button>
                </div>
              ))}
              <div className="crow tot"><span>Total</span><b>{CUR + total}</b></div>
              <button className="sub" onClick={() => setModal({ k: "checkout" })}>Checkout</button>
            </>
          );
        }
        break;
      case "checkout":
        body = <Form id="of" title="Checkout" btn="Place order"
          fields={[{ n: "nm", ph: "Full name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" }, { n: "ad", rows: 3, ph: "Delivery address", req: true }]}
          done={(v) => { placeOrder(); close(); say("Order request received, " + first(v.nm) + "!"); }} />;
        break;
      case "search":
        body = <Form id="sf" title="Search" btn="Search" fields={[{ n: "q", ph: "Search books or authors", ac: "off" }]}
          done={(v) => { close(); search(v.q); }} />;
        break;
      case "signup":
        body = user ? (
          <><h2>Your account</h2><p style={{ marginBottom: 10 }}>Signed in as {user}.</p>
            <button className="sub" onClick={() => { logout(); close(); say("Logged out"); }}>Log out</button></>
        ) : (
          <Form id="su" title="Sign up" btn="Create account"
            fields={[{ n: "nm", ph: "Full name", req: true, ac: "name" }, { n: "em", type: "email", ph: "Email", req: true, ac: "email" }, { n: "pw", type: "password", ph: "Password (6+ characters)", minLen: 6, req: true, ac: "new-password" }]}
            done={(v) => { const n = v.nm.trim(); login(n); close(); say("Welcome, " + n + "!"); }} />
        );
        break;
      case "join":
        body = <Form id="joinf" title="Join the team" intro="Tell us how you would like to help and we will get in touch." btn="Send"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "rl", opts: ["Volunteer reader", "Campus ambassador", "Collection partner", "Something else"], label: "How you would like to help" },
            { n: "ms", rows: 3, ph: "A few words about you (optional)" }]}
          done={(v) => { close(); say("Thanks, " + first(v.nm) + "! We will be in touch"); }} />;
        break;
      case "coach":
        body = <Form id="coachf" title="Admission coaching" intro="Tell us what you are preparing for and our team will get in touch." btn="Send request"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "lv", opts: ["School admission", "College admission", "University admission", "Medical or engineering admission", "Other"], def: "University admission", label: "Level" },
            { n: "ms", rows: 3, ph: "Anything we should know? (optional)" }]}
          done={(v) => { close(); say("Thanks, " + first(v.nm) + "! We got your coaching request"); }} />;
        break;
      case "donate":
        body = <Form id="donf" title="Donate books" intro="Tell us what you would like to give and we will get in touch." btn="Submit donation"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "ar", ph: "Your area or city", req: true }, { n: "bk", rows: 3, ph: "Which books would you like to donate?", req: true }]}
          done={(v) => { close(); say("Thank you, " + first(v.nm) + "! We got your donation details"); }} />;
        break;
      case "sell":
        body = <Form id="sellf" title="Post your old book" intro="Tell us about the book you want to sell." btn="Submit book"
          fields={[{ n: "t", ph: "Book title", req: true }, { n: "a", ph: "Author" },
            { n: "c", opts: ["Like new", "Good", "Fair"], def: "Good", label: "Condition" },
            { n: "p", type: "number", min: 0, ph: "Your price (৳)", req: true }, { n: "ct", ph: "Your phone or email", req: true }]}
          done={(v) => { close(); say("Thanks! We got the details for “" + v.t.trim() + "”"); }} />;
        break;
      case "msg": {
        const { n, t } = modal;
        body = <Form id="mf" title={"Message " + (t || n.split(" ")[0])} btn="Send"
          fields={[{ n: "m", rows: 4, ph: "Your message", req: true }]}
          done={() => { close(); say("Message sent to " + n); }} />;
        break;
      }
    }
  }

  return (
    <div id="modal" hidden={!modal} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="mbox">
        <button className="mx" aria-label="Close" onClick={close}>×</button>
        <div id="mc">{body}</div>
      </div>
    </div>
  );
}
```

## `components/ThemePicker.tsx` (theme.js)
```tsx
"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

const KEY = "bfa-bg", DEF = "#fefdfb";
const PR: [string, string][] = [["Cream", "#fefdfb"], ["Ivory", "#f6efe0"], ["Peach", "#ffe7d6"], ["Butter", "#fff2c9"], ["Mint", "#dff3e4"], ["Sky", "#dcecff"], ["Lavender", "#e9e3ff"], ["Rose", "#ffe1ea"], ["Slate", "#1f2430"], ["Navy", "#14233f"], ["Forest", "#14352a"], ["Black", "#121212"]];

function lum(h: string) {
  const n = parseInt(h.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
  return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
}
function paint(h: string) {
  const root = document.documentElement;
  root.style.setProperty("--bg", h);
  root.classList.toggle("dk", lum(h) < .18);
  const n = parseInt(h.slice(1), 16), dr = ((n >> 16) & 255) - 244, dg = ((n >> 8) & 255) - 124, db = (n & 255) - 44;
  if (Math.sqrt(dr * dr + dg * dg + db * db) < 90) root.style.setProperty("--orange", "#1c4fa0");
  else root.style.removeProperty("--orange");
}

export default function ThemePicker() {
  const [cur, setCur] = useState(DEF);
  const [hex, setHex] = useState(DEF.toUpperCase());
  const [bad, setBad] = useState(false);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pn = useRef<HTMLDivElement>(null);
  const hexRef = useRef<HTMLInputElement>(null);

  const apply = (h: string, save: boolean) => {
    if (!/^#[0-9a-f]{6}$/i.test(h)) return;
    h = h.toLowerCase();
    setCur(h); paint(h);
    if (document.activeElement !== hexRef.current) { setHex(h.toUpperCase()); setBad(false); }
    if (save) { try { if (h === DEF) localStorage.removeItem(KEY); else localStorage.setItem(KEY, h); } catch { } }
  };

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch { }
    apply(saved || DEF, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (open && !pn.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("click", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const onHex = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value; setHex(raw);
    let v = raw.trim().replace(/^#/, "");
    if (/^[0-9a-f]{3}$/i.test(v)) v = v.replace(/./g, "$&$&");
    const ok = /^[0-9a-f]{6}$/i.test(v);
    setBad(!ok && v.length > 0);
    if (ok) apply("#" + v, true);
  };

  return (
    <>
      <button ref={btn} className="fpick" aria-label="Change page colour" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 3C7 3 3 7.5 3 12.5S7 22 12 22c2 0 2.5-1 2-2.2-.6-1.4.2-2.8 2-2.8h2.5c2.2 0 4.5-1.2 4.5-4.5C23 7 18.5 3 13 3z" />
          <circle cx="8" cy="11" r="1.3" fill="#fd7b2e" stroke="none" />
          <circle cx="12" cy="7.5" r="1.3" fill="#2a4577" stroke="none" />
          <circle cx="17" cy="8.5" r="1.3" fill="#fbbc58" stroke="none" />
        </svg>
      </button>
      <div ref={pn} id="picker" hidden={!open} role="dialog" aria-label="Page colour">
        <div className="ph">Page colour</div>
        <div className="sw">
          {PR.map(([name, c]) => (
            <button key={c} type="button" title={name} aria-label={name} style={{ background: c }}
              className={cur === c ? "on" : undefined} onClick={() => apply(c, true)} />
          ))}
        </div>
        <label className="hl" htmlFor="chex">Type a colour code</label>
        <div className="pc2">
          <input ref={hexRef} type="text" id="chex" value={hex} maxLength={7} spellCheck={false} autoComplete="off"
            placeholder="#FEFDFB" className={bad ? "bad" : undefined} onChange={onHex}
            onBlur={() => { setHex(cur.toUpperCase()); setBad(false); }} />
          <input type="color" id="cpick" value={cur} aria-label="Open colour picker" onChange={(e) => apply(e.target.value, true)} />
        </div>
        <button type="button" className="lnk" id="crst" onClick={() => apply(DEF, true)}>Reset to default</button>
      </div>
    </>
  );
}
```

## `components/Ripple.tsx` (ripple.js)
```tsx
"use client";
import { useEffect } from "react";

const SEL = ".sub,.lnk,.add,.chip,.vback,.nbtn,.mbtn,.carr,.fcart,.btn,.mgo,.go,.mi,.bn-i,.fb,.mshop,.abw,.mpanel button,.bn-panel button,.bn-links button";

export default function Ripple() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
      const b = (e.target as Element).closest(SEL) as HTMLElement | null; if (!b) return;
      const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      const cx = e.detail ? e.clientX - r.left : r.width / 2, cy = e.detail ? e.clientY - r.top : r.height / 2;
      if (getComputedStyle(b).position === "static") b.style.position = "relative";
      b.style.overflow = "hidden";
      const s = document.createElement("span"); s.className = "rip";
      s.style.cssText = `width:${d}px;height:${d}px;left:${cx - d / 2}px;top:${cy - d / 2}px`;
      b.appendChild(s); setTimeout(() => s.remove(), 650);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
```

---

## `components/Logo.tsx` (the one logo SVG used in the navbar, hero and footer)
```tsx
import type { SVGProps } from "react";

export default function Logo({ mono, ...p }: SVGProps<SVGSVGElement> & { mono?: boolean }) {
  const K = mono ? "currentColor" : "#231f20";
  return (
    <svg viewBox="125 250 765 530" {...p}>
      <g stroke={K} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M310,260H750V288H310C275,288 250,315 250,351C250,387 275,415 310,415H750V443H310C260,443 222,402 222,351C222,300 260,260 310,260Z" fill="#f4573a" />
        <path d="M310,298H717V415H310C275,415 250,387 250,351C250,320 275,298 310,298Z" fill="#fbf0ea" />
        <path d="M310,288H717V298H310C280,298 262,318 255,340C255,310 280,288 310,288Z" fill={K} />
        <path d="M568,298H627V370L597,350L568,370Z" fill="#25695a" />
        <path d="M283,350H380M380,376H527M660,356H717" fill="none" strokeWidth="1.8" />
        <circle cx="751" cy="273" r="14" fill="#d41330" /><circle cx="751" cy="430" r="14" fill="#d41330" />
        <path d="M430,444H790C830,444 858,480 858,518C858,556 830,593 790,593H430Z" fill="#04a0d3" />
        <path d="M425,446C465,446 491,480 491,519C491,558 465,592 425,592Z" fill="#136b9b" />
        <path d="M492,505C492,550 470,585 430,593H470C505,585 522,550 522,515Z" fill={K} />
        <path d="M590,446C630,446 655,480 655,519C655,558 630,592 590,592C620,570 635,545 635,519C635,490 620,465 590,446Z" fill="#136b9b" />
        <path d="M655,505C676,525 676,555 650,592H640C660,560 662,535 655,505Z" fill={K} />
        <path d="M812,446C842,456 858,485 858,519C858,556 835,590 800,593C825,570 832,545 832,519C832,490 825,465 812,446Z" fill="#136b9b" />
        <path d="M832,519H858C858,556 835,590 800,593C822,570 832,545 832,519Z" fill={K} />
        <path d="M520,520C522,535 525,545 528,548H627M750,490C755,510 755,530 748,545M758,488C765,508 765,535 758,548M766,490C772,512 770,535 766,546" fill="none" strokeWidth="1.8" />
        <rect x="153" y="444" width="277" height="24" rx="12" fill="#fbf0ea" />
        <rect x="153" y="569" width="287" height="24" rx="12" fill="#fbf0ea" />
        <path d="M176,468H385C420,468 442,495 442,519C442,543 420,570 385,570H176Z" fill="#fbf0ea" />
        <path d="M178,468H395C425,470 440,490 442,505C425,485 405,478 385,478H178Z" fill={K} />
        <path d="M178,498H380M225,538H268" fill="none" strokeWidth="1.8" />
        <path d="M265,593H640V772H265C215,772 175,735 175,683C175,631 215,593 265,593Z" fill="#d41330" />
        <path d="M255,680C255,632 295,593 345,593H470V680Z" fill="#f0576a" />
        <path d="M255,680H470V772H345C295,772 255,735 255,680Z" fill={K} />
        <path d="M470,593C430,593 380,630 380,683C380,735 430,772 470,772H650V593Z" fill="#d41330" />
        <rect x="600" y="593" width="230" height="15" rx="7.5" fill="#fbf0ea" />
        <rect x="640" y="757" width="190" height="15" rx="7.5" fill="#fbf0ea" />
        <path d="M484,683C484,628 535,593 590,593H680V608H805V757H680V772H590C535,772 484,738 484,683Z" fill="#fbf0ea" />
        <path d="M500,683C500,640 540,610 590,610C612,610 622,618 628,625C640,614 655,608 680,608H805V757H680C655,757 640,752 628,742C622,752 610,764 590,764C540,764 500,730 500,683Z" fill="#fbf0ea" />
        <path d="M500,683C500,640 540,610 590,610C612,610 622,618 628,625C615,618 605,618 590,621C548,623 515,648 513,683Z" fill={K} />
        <path d="M628,625C640,614 655,608 680,608H805V620H690C660,620 645,625 632,632Z" fill={K} />
        <path d="M685,642H805M514,680H607M742,717H805" fill="none" strokeWidth="1.8" />
      </g>
    </svg>
  );
}
```

## `components/Navbar.tsx` (desktop bar lives inside the 1906px stage, mobile bar inside the header)
```tsx
"use client";
import Logo from "./Logo";
import { useStore } from "./StoreContext";

const link = (r: string) => ({ "data-go": r, tabIndex: 0, role: "link" });
const label = (user: string | null) => (user ? "Hi, " + user.split(" ")[0] : "Sign up");

const LINKS: [string, string, number, number][] = [
  ["shop", "Shop", 330, 250], ["free", "Free Books", 488, 412], ["ebooks", "E-Books", 699, 623],
  ["study", "Study", 890, 814], ["about", "About us", 1046, 970], ["team", "Team", 1228, 1147],
];

export function NavDesktop() {
  const { user } = useStore();
  return (
    <>
      <Logo className="abs" {...link("home")} aria-label="Home" style={{ left: 112, top: 52 }} width={86} height={60} />
      {LINKS.map(([r, t, left, div]) => (
        <span key={r} style={{ display: "contents" }}>
          <div className="abs vdiv" style={{ left: div }} />
          <div className="abs link" {...link(r)} style={{ left }}>{t}</div>
        </span>
      ))}
      <div className="abs vdiv" style={{ left: 1399 }} />
      <svg className="abs" data-act="search" tabIndex={0} role="button" aria-label="Search" style={{ left: 1451, top: 52 }}
        width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1c1c1c" strokeWidth="1.6">
        <circle cx="16" cy="16" r="12" /><path d="M25 25l3 3" strokeLinecap="round" />
      </svg>
      <div className="abs vdiv" style={{ left: 1537 }} />
      <div className="abs btn" data-act="signup" tabIndex={0} role="button">{label(user)}</div>
      <div className="abs nav-line" />
    </>
  );
}

export function NavMobile() {
  const { user, menuOpen } = useStore();
  return (
    <nav className={"mnav" + (menuOpen ? " open" : "")} id="mnav">
      <div className="mbar">
        <Logo data-go="home" aria-label="Home" width={52} height={36} />
        <span className="sp" />
        <button className="mi" data-act="search" aria-label="Search">
          <svg width="26" height="26" viewBox="0 0 36 36" fill="none" stroke="#1c1c1c" strokeWidth="2"><circle cx="16" cy="16" r="12" /><path d="M25 25l4 4" strokeLinecap="round" /></svg>
        </button>
        <button className="mbtn" data-act="signup">{label(user)}</button>
        <button className="mi" data-act="menu" aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#1c1c1c" strokeWidth="2.2" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg>
        </button>
      </div>
      <div className="mpanel">
        <button data-go="shop">Shop</button><button data-go="free">Free Books</button><button data-go="ebooks">E-Books</button>
        <button data-go="study">Study</button><button data-go="about">About us</button><button data-go="team">Team</button>
      </div>
    </nav>
  );
}
```
> `display: "contents"` on the wrapper spans keeps the absolutely-positioned items positioned relative to `#stage`, exactly as before.

## `components/Shelf.tsx` (the six books, used for both desktop and mobile)
```tsx
"use client";
import { memo, useEffect, useRef } from "react";
import { setupShelf } from "@/lib/shelf";

type Bk = { px: number; top: number; fill: string; sh: string; face: string; cx: number; cy: number; rot: number; tx: string; txt: string; hit: string; cat?: string; act?: string; aria: string };
const BOOKS: Bk[] = [
  { px: 954, top: 294, fill: "#fd7b2e", sh: "1181,306 1191,328 1015,1330 1001,1330", face: "1053,283 1181,306 1001,1330 873,1307", cx: 1101, cy: 385, rot: -15, tx: "translate(988,1135) rotate(-80)", txt: "CLASSIC", hit: "1053,283 1195,328 1015,1330 873,1307", cat: "classic", aria: "Classic books" },
  { px: 1128, top: 289, fill: "#fbbc58", sh: "1323,298 1333,320 1193,1328 1179,1328", face: "1195,280 1323,298 1179,1328 1050,1310", cx: 1246, cy: 380, rot: -12, tx: "translate(1160,1134) rotate(-82)", txt: "COMBO", hit: "1195,280 1337,320 1193,1328 1050,1310", cat: "combo", aria: "Combo deals" },
  { px: 1302, top: 285, fill: "#2a4577", sh: "1465,292 1475,314 1371,1326 1357,1326", face: "1336,278 1465,292 1357,1326 1227,1313", cx: 1391, cy: 377, rot: -9, tx: "translate(1331,1132) rotate(-84)", txt: "MODERN ART", hit: "1336,278 1479,314 1371,1326 1227,1313", cat: "modern", aria: "Modern Art books" },
  { px: 1477, top: 282, fill: "#fd7b2e", sh: "1607,287 1617,309 1548,1324 1534,1324", face: "1477,278 1607,287 1534,1324 1405,1315", cx: 1536, cy: 374, rot: -6, tx: "translate(1502,1132) rotate(-86)", txt: "ALL BOOKS", hit: "1477,278 1621,309 1548,1324 1405,1315", cat: "all", aria: "All books" },
  { px: 1651, top: 281, fill: "#fbbc58", sh: "1749,283 1759,305 1726,1322 1712,1322", face: "1619,278 1749,283 1712,1322 1582,1318", cx: 1680, cy: 373, rot: -3, tx: "translate(1673,1131) rotate(-88)", txt: "NONFICTION", hit: "1619,278 1763,305 1726,1322 1582,1318", cat: "nonfiction", aria: "Nonfiction books" },
  { px: 1825, top: 280, fill: "#2a4577", sh: "1890,280 1900,302 1904,1320 1890,1320", face: "1760,280 1890,280 1890,1320 1760,1320", cx: 1825, cy: 372, rot: 0, tx: "translate(1844,1130) rotate(-90)", txt: "COACHING", hit: "1760,280 1904,302 1904,1320 1760,1320", act: "coach", aria: "Admission coaching" },
];

function Shelf({ mobile }: { mobile?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => setupShelf(ref.current), []);
  const s = mobile ? "2" : ""; /* mobile copy needs its own filter/star ids, like the old clone */
  const size = mobile ? { viewBox: "888 261 1016 959" } : { width: 1906, height: 1220, viewBox: "0 0 1906 1220" };
  return (
    <svg ref={ref} className={mobile ? "mbooks" : "books"} {...size}>
      <defs>
        <filter id={"grain" + s} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.25" result="speck" />
          <feComposite in="speck" in2="SourceGraphic" operator="in" result="s2" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 0.95" result="dark" />
          <feComposite in="dark" in2="SourceGraphic" operator="in" result="d2" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="s2" /><feMergeNode in="d2" /></feMerge>
        </filter>
        <path id={"star" + s} d="M0,-20 Q2.5,-2.5 20,0 Q2.5,2.5 0,20 Q-2.5,2.5 -20,0 Q-2.5,-2.5 0,-20Z" />
      </defs>
      {BOOKS.map((b) => (
        <g className="bk" data-px={b.px} data-top={b.top} key={b.px}>
          <polygon fill="#000" points={b.sh} />
          <polygon filter={`url(#grain${s})`} fill={b.fill} points={b.face} />
          <circle cx={b.cx} cy={b.cy} r="30" fill="#fff" />
          <use href={`#star${s}`} x={b.cx} y={b.cy} fill="#1c1c1c" transform={`rotate(${b.rot} ${b.cx} ${b.cy})`} />
          <text className="bt" transform={b.tx}>{b.txt}</text>
          <polygon className="hit" points={b.hit} aria-label={b.aria} tabIndex={0} role="button"
            {...(b.act ? { "data-act": b.act } : { "data-cat": b.cat })} />
        </g>
      ))}
    </svg>
  );
}
export default memo(Shelf);
```

## `components/Hero.tsx` (mobile header + the scaled 1906px desktop stage)
```tsx
"use client";
import { useLayoutEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { NavDesktop, NavMobile } from "./Navbar";
import Shelf from "./Shelf";
import { useStore } from "./StoreContext";

const link = (r: string) => ({ "data-go": r, tabIndex: 0, role: "link" });
const arrow = (w: number, h: number) => (
  <svg width={w} height={h} viewBox="0 0 26 18" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h21M16 2l7 7-7 7" /></svg>
);

export default function Hero() {
  const { search } = useStore();
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  /* scales the 1906px design to the window width (home.js fit()) */
  useLayoutEffect(() => {
    const s = stage.current!, w = wrap.current!;
    const fit = () => { const k = window.innerWidth / 1906; s.style.transform = "scale(" + k + ")"; w.style.height = 1220 * k + "px"; };
    fit(); s.style.visibility = "visible";
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search((e.currentTarget.querySelector("input") as HTMLInputElement).value);
  };

  return (
    <>
      <header className="mhero" id="mhero">
        <NavMobile />
        <div className="mbody">
          <div className="mtxt">
            <div className="meyebrow" {...link("shop")}>BEST CHOICE</div>
            <div className="mh" {...link("shop")} aria-label="Books for all">
              <span className="pl" />
              <span className="t" style={{ left: 0, top: 0 }}>B</span>
              <span className="t" style={{ left: "1.418em", top: 0 }}>OKS</span>
              <span className="t" style={{ left: 0, top: ".903em" }}>F</span>
              <span className="t" style={{ left: "1.546em", top: ".903em" }}>R ALL</span>
            </div>
            <div className="mrow">
              <form className="mform" id="qform2" onSubmit={onSearch}>
                <input id="q2" type="text" placeholder="Enter" autoComplete="off" aria-label="Search books" />
                <button className="mgo" type="submit" aria-label="Search books">{arrow(24, 17)}</button>
              </form>
              <button className="mshop" data-go="shop">Go to shop</button>
            </div>
            <p className="mpara">Regular reading allows you to better formulate your own thoughts. Our <Link href="/team">team of professionals</Link> will always help you make up your mind and find a book for fun activities.</p>
          </div>
          <div className="mbk" id="mbk"><Shelf mobile /></div>
        </div>
      </header>

      <div id="wrap" ref={wrap}>
        <div id="stage" ref={stage} style={{ visibility: "hidden" }}>
          <NavDesktop />
          <div className="abs eyebrow" {...link("shop")}>BEST CHOICE</div>
          <div className="abs pill" {...link("shop")} />
          <div className="abs h" {...link("shop")} style={{ left: 136, top: 340 }}>B</div>
          <div className="abs h" {...link("shop")} style={{ left: 414, top: 340 }}>OKS</div>
          <div className="abs h" {...link("shop")} style={{ left: 136, top: 517 }}>F</div>
          <div className="abs h" {...link("shop")} style={{ left: 439, top: 517 }}>R ALL</div>
          <form className="abs input" id="qform" onSubmit={onSearch}>
            <input id="q" type="text" placeholder="Enter" autoComplete="off" aria-label="Search books" />
          </form>
          <button className="abs go" form="qform" type="submit" aria-label="Search books">{arrow(26, 18)}</button>
          <div className="abs shop" {...link("shop")}>Go to shop</div>
          <p className="abs para">Regular reading allows you to better formulate your own thoughts. Our <Link href="/team">team of professionals</Link> will always help you make up your mind and find a book for fun activities.</p>
          <Shelf />
        </div>
      </div>
    </>
  );
}
```

## `components/Landing.tsx` (offers, categories, singles, combos, then the footer inside `main#land`, same as your HTML)
```tsx
"use client";
import { useState } from "react";
import Footer from "./Footer";
import { useBooks, useStore } from "./StoreContext";
import { BOOKS, COL, CUR, price, was, type LiveBook } from "@/lib/data";

function Countdown({ end, id }: { end: string; id?: string }) {
  const { now } = useBooks();
  if (now === null || !end) return <b className="cd" id={id} data-end={end} />;
  const t = Math.max(0, Math.floor((Date.parse(end) - now) / 1000));
  const d = Math.floor(t / 86400), h = Math.floor((t % 86400) / 3600), m = Math.floor((t % 3600) / 60), x = t % 60;
  const p = (n: number) => String(n).padStart(2, "0"), C = 113.1;
  const U = (v: string, l: string, f: number) => {
    f = Math.min(1, Math.max(0, f));
    return (
      <span className="u" key={l}>
        <span className="r">
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle className="t" cx="22" cy="22" r="18" />
            <circle className="g" cx="22" cy="22" r="18" strokeDasharray={C} strokeDashoffset={(C * (1 - f)).toFixed(1)} />
          </svg>
          <em>{v}</em>
        </span>
        <small>{l}</small>
      </span>
    );
  };
  return (
    <b className="cd" id={id} data-end={end}>
      {d ? U(p(d), "Days", d / 30) : null}{U(p(h), "Hrs", h / 24)}{U(p(m), "Min", m / 60)}{U(p(x), "Sec", x / 60)}
    </b>
  );
}

function Card({ b, i }: { b: LiveBook; i: number }) {
  const { add, say } = useStore();
  const [ok, setOk] = useState(false);
  const w = was(b);
  const onAdd = () => {
    add(i); say("Added “" + BOOKS[i].t + "” to cart");
    if (!ok) { setOk(true); setTimeout(() => setOk(false), 1100); }
  };
  return (
    <div className="pc">
      <button className="pcb" data-act="detail" data-i={i}>
        <div className="cover" style={{ backgroundColor: COL[b.c], color: b.c === "nonfiction" ? "#1c1c1c" : "#fff" }}>
          {b.items && <span className="cb">COMBO</span>}
          {b.dl && <span className="cb of">OFFER</span>}
          {b.t}
        </div>
        <div className="meta"><b>{b.t}</b><br />{b.items ? b.items.length + " books" : b.a} · {b.cond}</div>
      </button>
      <div className="pr">
        <span><b>{price(b)}</b>{w ? <>{" "}<s>{CUR + w}</s></> : null}</span>
        <button className={"add" + (ok ? " ok" : "")} data-add={i} onClick={onAdd}>{ok ? "✓ Added" : "Add to cart"}</button>
      </div>
      {b.dl && (
        <div className="dl">
          <svg className="ci" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> Ends in <Countdown end={b.dl.end} />
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const { books } = useBooks();
  const n = (c: string) => books.filter((b) => b.c === c).length;
  const cats = [["classic", "Classic", n("classic") + " books"], ["modern", "Modern Art", n("modern") + " books"], ["nonfiction", "Nonfiction", n("nonfiction") + " books"], ["combo", "Combos", n("combo") + " deals"]];
  const all = books.map((b, i) => ({ b, i }));
  const act = all.filter((x) => x.b.dl);
  const soonest = act.length ? act.reduce((a, x) => (Date.parse(x.b.dl!.end) < Date.parse(a.b.dl!.end) ? x : a)).b.dl!.end : "";

  return (
    <main id="land">
      <section className="sec" id="lofsec" hidden={!act.length}>
        <div className="lh">
          <div><small>LIMITED-TIME OFFERS</small><h2>Special prices,<br />limited time</h2></div>
          <div className="bigcd"><span>Next offer ends in</span><Countdown id="lofcd" end={soonest} /></div>
        </div>
        <div className="grid" id="loffers">{act.map(({ b, i }) => <Card key={i} b={b} i={i} />)}</div>
      </section>

      <section className="sec">
        <div className="lh"><div><small>SHOP BY CATEGORY</small><h2>Pick a shelf</h2></div></div>
        <div className="cats" id="lcats">
          {cats.map((c) => (
            <button key={c[0]} className="cbox" data-cat={c[0]} style={{ backgroundColor: COL[c[0]], color: c[0] === "nonfiction" ? "#1c1c1c" : "#fff" }}>
              <span className="bdg"><svg width="28" height="28" viewBox="-22 -22 44 44"><path d="M0,-20 Q2.5,-2.5 20,0 Q2.5,2.5 0,20 Q-2.5,2.5 -20,0 Q-2.5,-2.5 0,-20Z" fill="#1c1c1c" /></svg></span>
              <span className="ct">{c[1]}</span><span className="cn">{c[2]} →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="lh">
          <div><small>SINGLE BOOKS</small><h2>Old books,<br />new stories</h2></div>
          <button className="lnk" data-go="shop">Browse all books</button>
        </div>
        <div className="grid" id="lsingles">{all.filter((x) => !x.b.items).map(({ b, i }) => <Card key={i} b={b} i={i} />)}</div>
      </section>

      <section className="sec">
        <div className="lh">
          <div><small>COMBO DEALS</small><h2>More books,<br />less money</h2></div>
          <button className="lnk" data-cat="combo">See all combos</button>
        </div>
        <div className="combos" id="lcombos">{all.filter((x) => x.b.items).map(({ b, i }) => <Card key={i} b={b} i={i} />)}</div>
      </section>

      <Footer />
    </main>
  );
}
```

## `components/Footer.tsx`
```tsx
"use client";
import type { FormEvent, MouseEvent } from "react";
import Logo from "./Logo";
import { useStore } from "./StoreContext";

const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const soc = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true } as const;

const EXPLORE: [string, string, string][] = [["go", "shop", "Shop"], ["go", "free", "Free Books"], ["go", "ebooks", "E-Books"], ["go", "study", "Study"], ["go", "about", "About us"], ["go", "team", "Team"], ["act", "signup", "Sign up"]];
const SHELVES: [string, string, string, string][] = [["classic", "Classic", "#fd7b2e", ""], ["modern", "Modern Art", "#2a4577", ""], ["nonfiction", "Nonfiction", "#fbbc58", ""], ["combo", "Combos", "#1c1c1c", ""], ["all", "All books", "transparent", ""]];
const INVOLVED: [string, string][] = [["sell", "Post your old books"], ["donate", "Donate books"], ["coach", "Admission coaching"], ["join", "Join the team"]];

export default function Footer() {
  const { say } = useStore();

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const em = (f.elements.namedItem("em") as HTMLInputElement).value.trim();
    f.reset();
    say("You’re in! New arrivals will reach " + em);
  };
  const flip = (e: MouseEvent) => {
    const l = (e.target as HTMLElement).closest("span") as HTMLElement | null; if (!l) return;
    l.classList.remove("flip"); void l.offsetWidth; l.classList.add("flip");
    l.addEventListener("animationend", () => l.classList.remove("flip"), { once: true });
  };

  return (
    <footer className="ft" id="footer">
      <div className="ft-cta">
        <div><small>STAY IN THE LOOP</small><h2>Every book<br />deserves a <em>second</em> reader.</h2></div>
        <div>
          <p>Get new arrivals, limited-time offers and combo deals in your inbox. No spam, just good books.</p>
          <form className="ft-form" id="nlf" onSubmit={subscribe}>
            <input name="em" type="email" placeholder="Your email address" aria-label="Email address" autoComplete="email" required />
            <button type="submit">Subscribe <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </form>
          <div className="ft-note">One email a week at most. Unsubscribe any time.</div>
        </div>
      </div>

      <div className="ft-trust">
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 10v.01M18 14v.01" /></svg></span><div><b>Cash on delivery</b><span>Pay when your books reach your door.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg></span><div><b>Delivery across Bangladesh</b><span>Usually 2–4 days.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg></span><div><b>7-day returns</b><span>If a book is not as described.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg></span><div><b>Packed with care</b><span>Wrapped in paper, with a protective sleeve.</span></div></div>
      </div>

      <div className="ft-main">
        <div className="ft-brand">
          <button className="ft-logo" data-go="home" aria-label="Purono, home"><Logo mono className="ft-mk" width={86} height={60} aria-hidden="true" /><span>Purono</span></button>
          <p>A small shop where people sell, donate and buy old books, from school textbooks to admission guides and general reading.</p>
          <div className="ft-soc">
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook"><svg {...soc} fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.5 3.5 10.5 6.2v2.3H8v3.3h2.5V22H14v-10.2h2.6l.4-3.3z" /></svg></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" /></svg></a>
            <a href="https://wa.me/" target="_blank" rel="noopener" aria-label="WhatsApp"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" /><path d="M9 9.5c.3 2 2 3.8 4.5 4.5l1.3-1.3 1.7.8c-.2 1-1 1.7-2 1.7-3.3 0-6.5-3.2-6.5-6.5 0-1 .7-1.8 1.7-2l.8 1.7z" strokeWidth="1.4" /></svg></a>
            <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg></a>
          </div>
          <div className="ft-loc"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg><span id="ftcity">Dhaka, Bangladesh</span></div>
        </div>

        <nav className="ft-col" aria-label="Explore"><h3>Explore</h3><ul>
          {EXPLORE.map(([a, v, t]) => <li key={v}><button className="ft-lk" {...{ ["data-" + a]: v }}>{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Shelves"><h3>Shelves</h3><ul>
          {SHELVES.map(([c, t, col]) => <li key={c}><button className="ft-lk" data-cat={c}><i className="ft-dot" style={{ background: col }} />{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Get involved"><h3>Get involved</h3><ul>
          {INVOLVED.map(([a, t]) => <li key={a}><button className="ft-lk" data-act={a}>{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Help"><h3>Help</h3><ul>
          <li><button className="ft-lk" data-act="msg" data-n="our team" data-t="our team">Message our team</button></li>
          <li><button className="ft-lk" data-act="cart">Your cart</button></li>
          <li><button className="ft-lk" data-act="search">Search books</button></li>
        </ul></nav>
      </div>

      <div className="ft-mark" aria-hidden="true" onClick={flip}>
        <div><span>P</span><span>U</span><span>R</span><span>O</span><span>N</span><span>O</span></div>
      </div>

      <div className="ft-bot">
        <div>© 2026 Purono · Old books, singles and combos</div>
        <div className="ft-r">
          <span>Made with <span className="ft-heart" aria-label="love">♥</span> in Dhaka</span>
          <button className="ft-top" data-act="top">Back to top <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></button>
        </div>
      </div>
    </footer>
  );
}
```

---

