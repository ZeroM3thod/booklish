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
        /* eslint-disable react-hooks/set-state-in-effect -- restore saved session after mount (SSR-safe) */
        setItems(s.items || []);
        setUser(s.user || null);
        /* eslint-enable react-hooks/set-state-in-effect */
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
    if (!t) return;
    if (t === window.location.pathname) {
      if (/^(book|study)-|^(shop|study)$/.test(r)) {
        if (window.location.hash === "#" + r) window.dispatchEvent(new HashChangeEvent("hashchange"));
        else window.location.hash = r;
      }
      return;
    }
    persist();
    router.push(t + (/^(book|study)-/.test(r) ? "#" + r : ""));
  }, [persist, router]);

  const takeFilter = useCallback(() => {
    const s = shared.current;
    if (!s.apply) return null;
    s.apply = 0; persist();
    return { cat: s.cat, q: s.q };
  }, [persist]);
  const getWish = useCallback(() => shared.current.wish as Record<number, number>, []);
  const setWish = useCallback((w: Record<number, number>) => { shared.current.wish = w; persist(); }, [persist]);

  const bump = () => {
    const el = cartBtn.current; if (!el) return;
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  };

  const store = useMemo<Store>(() => ({
    items, user, menuOpen, modal, ready, takeFilter, getWish, setWish,
    add: (i) => { setItems((a) => [...a, i]); bump(); },
    remove: (k) => { setItems((a) => a.filter((_, j) => j !== k)); bump(); },
    placeOrder: () => { setItems([]); bump(); },
    login: (n) => setUser(n),
    logout: () => setUser(null),
    say, go, setModal,
    search: (q) => { shared.current = { ...shared.current, cat: "all", q: q.trim(), apply: 1 }; go("shop"); },
  }), [items, user, menuOpen, modal, ready, takeFilter, getWish, setWish, say, go]);

  const booksValue = useMemo(() => ({ now, books: liveBooks(now) }), [now]);

  /* global-click + keyboard handling (same data-go / data-act / data-cat attributes as before) */
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
