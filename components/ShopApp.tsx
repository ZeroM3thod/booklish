"use client";
/* eslint-disable @next/next/no-img-element, react-hooks/set-state-in-effect */
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import InnerShell from "./InnerShell";
import Countdown from "./Countdown";
import { useBooks, useStore } from "./StoreContext";
import { BOOKS, COL, CUR, STORE, price, was, type LiveBook } from "@/lib/data";
import "@/app/shop.css";

/* ---------- types & data ---------- */
type Grade = { c: string; k: string; s: string; p: string; d: string; o: string; m: string; w: string; sum: string };
type BK = LiveBook & { img?: string; imgs?: string[]; lang?: string; fmt?: string; pages?: string | number; pub?: string; year?: string | number; isbn?: string; note?: string; cdx?: Partial<Grade> };
type SHs = { q: string; qraw: string; cat: string[]; cond: string[]; au: string[]; min: number | ""; max: number | ""; offer: boolean; sort: string };
type Wish = Record<number, number>;

const DESC = ["A sharp, witty novel of manners about family pressure, first impressions and learning to understand another person. A friendly first classic.", "A coming-of-age story about ambition, class and loyalty, following a young man whose life changes when an unknown benefactor appears.", "A sea voyage and an obsession: a captain’s hunt for one whale, mixed with long, curious chapters on life aboard a whaling ship.", "The story of an orphaned governess who holds on to her independence and self-respect while facing a secretive household.", "An illustrated look at how contemporary artists use shape, scale and space, with plenty of full-page images to browse.", "Explores how colour creates energy and mood in modern work, with side-by-side examples you can compare.", "A study of line, from quick sketches to confident graphic work, with examples and short notes from the artists.", "Looks at art made outside traditional galleries, in public spaces and online, and why it matters to everyday viewers.", "A practical guide to building routines that last, with simple weekly exercises you can start right away.", "Explains everyday money ideas such as saving, trade and value in plain language for general readers.", "An accessible introduction to how memory, attention and emotion work, written for curious beginners.", "Short chapters on making real change through tiny, repeatable actions.", "Three easy-to-start classics bundled at a lower price than buying them one by one. A good starter shelf or gift.", "Three art books that pair well together: shapes, colour and line in one set. Great for students and art lovers.", "Three practical nonfiction reads on habits, thinking and everyday change, bundled to save money.", "A classic pirate adventure of a map, a hidden treasure and a young cabin boy. A donated copy, free to request.", "A pioneering tale of a time traveller who journeys far into the future. A donated copy, free to request.", "A quiet account of living simply beside a pond, and of paying close attention to the world. A donated copy, free to request.", "Mowgli’s stories of the jungle, told in short, lively chapters. A donated copy, free to request.", "Four sisters grow up together, each finding her own way. A donated copy, free to request.", "Short, calm notes on living well, written as a personal journal by a Roman emperor. A donated copy, free to request."];
const FOR: Record<string, string> = { classic: "First-time classic readers, students and gifts", modern: "Art lovers, students and anyone who likes browsing pictures", nonfiction: "Self-learners, curious readers and gifts", combo: "Gifts, starter collections and readers who want more for less" };
const GR: Record<string, Grade> = {
  "Like new": { c: "Clean, no visible wear", k: "Sharp, no bends", s: "Tight and uncracked", p: "Crisp and clean", d: "None", o: "Fresh, no odour", m: "None, book is complete", w: "None", sum: "Looks almost unread. Ready to read, or to gift as it is." },
  Good: { c: "Light shelf wear on the edges", k: "Light rubbing on a few corners", s: "Intact with minor creases", p: "Slight yellowing, nothing missing", d: "None or a few tiny spots", o: "Normal old-book smell", m: "None, book is complete", w: "None or very light pencil marks", sum: "A clean, well-kept copy with normal signs of use. Fully readable." },
  Fair: { c: "Visible wear and rubbed corners", k: "Rubbed or slightly bent corners", s: "Creased but firmly bound", p: "Yellowed, may have light marks", d: "Light spotting possible", o: "Noticeable old-book smell", m: "None, book is complete", w: "Some underlining or notes possible", sum: "Shows its age but is complete and fully readable. Priced lower for that." },
};
const LABS = ["Front cover", "Back cover", "Spine", "Inside pages", "Flaws close-up"];
const CN: Record<string, string> = { classic: "Classic", modern: "Modern Art", nonfiction: "Nonfiction", combo: "Combo deal" };

const SH0: SHs = { q: "", qraw: "", cat: [], cond: [], au: [], min: "", max: "", offer: false, sort: "feat" };
const SH_CATS: [string, string][] = [["classic", "Classic"], ["modern", "Modern Art"], ["nonfiction", "Nonfiction"], ["combo", "Combos"]];
const SH_CONDS = ["Like new", "Good", "Fair", "Mixed condition"];
const SH_RNG: [string, number | "", number | ""][] = [["Under ৳300", "", 300], ["৳300 – ৳500", 300, 500], ["৳500 – ৳1,000", 500, 1000], ["Over ৳1,000", 1000, ""]];
const SH_SORTS: [string, string, string][] = [["feat", "Featured", "Our default order"], ["price", "Price: low to high", ""], ["price-d", "Price: high to low", ""], ["title", "Title: A to Z", ""], ["save", "Biggest saving", "Best discounts first"], ["end", "Offer ending soonest", "Closing deals first"]];
const SH_AU = Array.from(new Set(BOOKS.filter((b) => !b.items).map((b) => b.a))).sort();

const SH_P = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 8H6" /><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></>,
  srt: <path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4" />,
  filt: <path d="M4 6h16M7 12h10M10 18h4" />,
};

/* ---------- small helpers ---------- */
const Ic = ({ d, s = 18 }: { d: ReactNode; s?: number | string }) => (
  <svg className="ci" viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const dk = (x: BK) => (x.c === "nonfiction" ? "#1c1c1c" : "#fff");
const pic = (b: BK, k: number) => (b.imgs && b.imgs[k]) || (k === 0 ? b.img : "") || "";
const Rows = ({ a }: { a: [string, unknown][] }) => (
  <>{a.filter((r) => r[1]).map((r) => <Fragment key={r[0]}><dt>{r[0]}</dt><dd>{String(r[1])}</dd></Fragment>)}</>
);

function Cover({ b, img }: { b: BK; img?: string }) {
  const im = img || b.img;
  return (
    <div className="cover" style={{ backgroundColor: COL[b.c], color: dk(b) }}>
      {im ? <img src={im} alt={b.t} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
      {b.items && <span className="cb">COMBO</span>}
      {b.dl && <span className="cb of">OFFER</span>}
      {b.t}
    </div>
  );
}

function AddBtn({ i, className, style, label = "Add to cart" }: { i: number; className: string; style?: CSSProperties; label?: string }) {
  const { add, say } = useStore();
  const { books } = useBooks();
  const [ok, setOk] = useState(false);
  const click = () => {
    add(i); say("Added “" + books[i].t + "” to cart");
    if (!ok) { setOk(true); setTimeout(() => setOk(false), 1100); }
  };
  return <button className={className + (ok ? " ok" : "")} style={style} onClick={click}>{ok ? "✓ Added" : label}</button>;
}

/* ---------- filter logic ---------- */
const aus = (b: BK, bs: BK[]) => (b.items ? b.items.map((k) => bs[k].a) : [b.a]);
const hay = (b: BK, bs: BK[]) => (b.t + " " + (b.items ? b.items.map((k) => bs[k].t + " " + bs[k].a).join(" ") : b.a)).toLowerCase();
const pct = (b: BK) => { const w = was(b); return w ? Math.round(((w - b.p) / w) * 100) : 0; };
type X = "cat" | "cond" | "au" | "price" | "off";
const ok = (b: BK, bs: BK[], s: SHs, x?: X) => {
  if (x !== "cat" && s.cat.length && !s.cat.includes(b.c)) return false;
  if (x !== "cond" && s.cond.length && !s.cond.includes(b.cond)) return false;
  if (x !== "au" && s.au.length && !aus(b, bs).some((a) => s.au.includes(a))) return false;
  if (x !== "price" && ((s.min !== "" && b.p < s.min) || (s.max !== "" && b.p > s.max))) return false;
  if (x !== "off" && s.offer && !b.dl) return false;
  if (s.q && !hay(b, bs).includes(s.q)) return false;
  return true;
};
const res = (bs: BK[], s: SHs, x?: X) => bs.filter((b) => ok(b, bs, s, x));
const sorted = (l: BK[], sort: string) => {
  const f: Record<string, (a: BK, b: BK) => number> = {
    price: (a, b) => a.p - b.p, "price-d": (a, b) => b.p - a.p, title: (a, b) => a.t.localeCompare(b.t),
    save: (a, b) => pct(b) - pct(a),
    end: (a, b) => (a.dl ? Date.parse(a.dl.end) : 9e15) - (b.dl ? Date.parse(b.dl.end) : 9e15),
  };
  return f[sort] ? l.slice().sort(f[sort]) : l;
};
const without = (s: SHs, t: string, v: string): SHs => {
  const n: SHs = { ...s, cat: [...s.cat], cond: [...s.cond], au: [...s.au] };
  if (t === "cat" || t === "cond" || t === "au") { const i = n[t].indexOf(v); if (i > -1) n[t].splice(i, 1); }
  else if (t === "price") { n.min = ""; n.max = ""; }
  else if (t === "offer") n.offer = false;
  else if (t === "q") { n.q = ""; n.qraw = ""; }
  return n;
};
const toggled = (a: string[], v: string) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);
const priceLab = (s: SHs) => (s.min !== "" && s.max !== "" ? CUR + s.min + " – " + CUR + s.max : s.min !== "" ? "Over " + CUR + s.min : "Under " + CUR + s.max);

/* ---------- empty state ---------- */
const NoneArt = () => (
  <svg className="nart" viewBox="0 0 240 190" role="img" aria-label="Empty bookshelf with a magnifying glass" fill="none">
    <ellipse cx="116" cy="172" rx="100" ry="8" fill="#1c1c1c" opacity=".12" />
    <rect x="14" y="166" width="212" height="6" rx="3" fill="#1c1c1c" />
    <g className="nbk"><rect x="38" y="62" width="40" height="104" rx="3" fill="#000" /><rect x="30" y="62" width="40" height="104" rx="3" fill="#fd7b2e" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M30 84h40M30 144h40" stroke="#1c1c1c" strokeWidth="2.5" /><circle cx="50" cy="114" r="6" fill="#fff" stroke="#1c1c1c" strokeWidth="2" /></g>
    <g className="nbk b2"><rect x="94" y="40" width="36" height="126" rx="3" fill="#000" /><rect x="86" y="40" width="36" height="126" rx="3" fill="#2a4577" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M86 62h36M86 148h36" stroke="#fff" strokeWidth="2.5" /><path d="M98 90h12M98 100h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></g>
    <g className="nbk b3"><rect x="144" y="74" width="34" height="92" rx="3" fill="#000" /><rect x="136" y="74" width="34" height="92" rx="3" fill="#fbbc58" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M136 96h34M136 138h34" stroke="#1c1c1c" strokeWidth="2.5" /></g>
    <g className="nlens"><circle cx="178" cy="62" r="26" fill="#fefdfb" fillOpacity=".85" stroke="#1c1c1c" strokeWidth="4" /><path d="M196 82l22 24" stroke="#1c1c1c" strokeWidth="9" strokeLinecap="round" /><path d="M168 54a14 14 0 0 1 12-6" stroke="#f47c2c" strokeWidth="4" strokeLinecap="round" /><path d="M171 63l14 0M178 56l0 14" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" opacity="0" /><text x="178" y="72" textAnchor="middle" fontFamily="Outfit,sans-serif" fontWeight="700" fontSize="28" fill="#1c1c1c">?</text></g>
  </svg>
);

function None({ sh, books, onClear, onRm }: { sh: SHs; books: BK[]; onClear: () => void; onRm: (t: string, v: string) => void }) {
  const tags: string[] = [];
  const opts: { t: string; v: string; lab: string; n: number }[] = [];
  const add = (t: string, v: string, lab: string) => {
    const n = res(books, without(sh, t, v)).length;
    tags.push(lab);
    if (n > 0) opts.push({ t, v, lab, n });
  };
  if (sh.q) add("q", "", "Search: “" + sh.qraw.trim() + "”");
  sh.cat.forEach((v) => add("cat", v, SH_CATS.find((c) => c[0] === v)?.[1] ?? v));
  sh.cond.forEach((v) => add("cond", v, v));
  sh.au.forEach((v) => add("au", v, v));
  if (sh.min !== "" || sh.max !== "") add("price", "", priceLab(sh));
  if (sh.offer) add("offer", "", "Offers only");
  opts.sort((a, b) => b.n - a.n);
  const only = !!sh.q && tags.length === 1;
  return (
    <div className="none" role="status">
      <NoneArt />
      <h3>{only ? <>No books found for <em>“{sh.qraw.trim()}”</em></> : <>No books match these <em>filters</em></>}</h3>
      <p>{only ? "Check the spelling, or try a shorter title or the author’s name." : "Your shelf is empty with this exact mix. Loosen a filter below, or start fresh and browse everything."}</p>
      {(tags.length > 1 || !only) && <div className="nact" aria-label="Active filters">{tags.map((t) => <span className="ntag" key={t}>{t}</span>)}</div>}
      <button className="add nbtn" onClick={onClear}><Ic d={SH_P.x} s={16} /> Clear all filters</button>
      {opts.length > 0 && (
        <div className="nsg"><small>Or loosen just one</small>
          <div>{opts.slice(0, 4).map((o) => <button className="chip" key={o.t + o.v} onClick={() => onRm(o.t, o.v)}>Remove {o.lab} · <b>{o.n} {o.n === 1 ? "book" : "books"}</b></button>)}</div>
        </div>
      )}
    </div>
  );
}

const Opt = ({ l, n, on, onChange }: { l: string; n: number; on: boolean; onChange: () => void }) => (
  <label className={"opt" + (n || on ? "" : " z")}><input type="checkbox" checked={on} onChange={onChange} />{l}<i>{n}</i></label>
);
const Group = ({ t, open, children }: { t: string; open?: boolean; children: ReactNode }) => (
  <details className="fs" open={open}><summary>{t}</summary><div className="fb">{children}</div></details>
);

/* ---------- shop list ---------- */
function ShopList({ sh, setSh, books }: { sh: SHs; setSh: (f: (s: SHs) => SHs) => void; books: BK[] }) {
  const { items, add, remove, say } = useStore();
  const [drawer, setDrawer] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const sortBtn = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  /* nav height -> --h (shH) */
  useEffect(() => {
    const shH = () => {
      const r = root.current; if (!r) return;
      const n = document.querySelector(window.innerWidth >= 1200 ? "#view .vnavd" : "#view .vnavm") as HTMLElement | null;
      const h = n ? n.offsetHeight : 0;
      r.style.setProperty("--h", (h > 40 ? h : 84) + "px");
    };
    shH(); requestAnimationFrame(shH);
    const t = setTimeout(shH, 60);
    window.addEventListener("resize", shH);
    document.fonts?.ready.then(shH);
    return () => { clearTimeout(t); window.removeEventListener("resize", shH); };
  }, []);

  /* Escape closes the sort sheet, then the filter drawer */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (sortOpen) setSortOpen(false); else if (drawer) setDrawer(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sortOpen, drawer]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (sortOpen) (root.current?.querySelector("#sl .on") as HTMLElement | null)?.focus();
    else sortBtn.current?.focus();
  }, [sortOpen]);

  const l = sorted(res(books, sh), sh.sort);
  const tg = (k: "cat" | "cond" | "au", v: string) => setSh((s) => ({ ...s, [k]: toggled(s[k], v) }) as SHs);
  const rm = (t: string, v: string) => setSh((s) => {
    if (t === "q") return { ...s, q: "", qraw: "" };
    if (t === "price") return { ...s, min: "", max: "" };
    if (t === "offer") return { ...s, offer: false };
    const k = t as "cat" | "cond" | "au";
    return { ...s, [k]: toggled(s[k], v) } as SHs;
  });
  const clear = () => setSh((s) => ({ ...SH0, sort: s.sort }));
  const sp = (k: number) => setSh((s) => { const g = SH_RNG[k], on = s.min === g[1] && s.max === g[2]; return { ...s, min: on ? "" : g[1], max: on ? "" : g[2] }; });
  const commit = (k: "min" | "max") => (e: FocusEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSh((s) => ({ ...s, [k]: v === "" ? "" : Math.max(0, +v) }));
  };
  const enter = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") e.currentTarget.blur(); };
  const toggleCart = (i: number) => {
    const k = items.indexOf(i);
    if (k < 0) { add(i); say(books[i].t + " added to cart"); } else { remove(k); say("Removed from cart"); }
  };

  const act: { t: string; v: string; lab: string }[] = [];
  sh.cat.forEach((v) => act.push({ t: "cat", v, lab: SH_CATS.find((c) => c[0] === v)?.[1] ?? v }));
  sh.cond.forEach((v) => act.push({ t: "cond", v, lab: v }));
  sh.au.forEach((v) => act.push({ t: "au", v, lab: v }));
  if (sh.min !== "" || sh.max !== "") act.push({ t: "price", v: "", lab: priceLab(sh) });
  if (sh.offer) act.push({ t: "offer", v: "", lab: "Offers only" });

  return (
    <div id="shopv" ref={root}>
      <main className="wrap">
        <section className="hero"><small>SHOP</small><h1>All our books,<br />one shelf</h1></section>
        <div className="shopgrid">
          <aside id="side" aria-label="Filters" className={drawer ? "open" : undefined}>
            <div className="dh"><span>Filters</span><button className="x" onClick={() => setDrawer(false)} aria-label="Close"><Ic d={SH_P.x} s={24} /></button></div>
            <Group t="Category" open>
              {SH_CATS.map((c) => <Opt key={c[0]} l={c[1]} n={res(books, sh, "cat").filter((b) => b.c === c[0]).length} on={sh.cat.includes(c[0])} onChange={() => tg("cat", c[0])} />)}
            </Group>
            <Group t="Condition" open>
              {SH_CONDS.map((c) => <Opt key={c} l={c} n={res(books, sh, "cond").filter((b) => b.cond === c).length} on={sh.cond.includes(c)} onChange={() => tg("cond", c)} />)}
            </Group>
            <Group t="Price (৳)" open>
              <div className="pin">
                <input id="pmin" key={"a" + sh.min} type="number" min={0} inputMode="numeric" placeholder="Min" defaultValue={sh.min} aria-label="Minimum price" onBlur={commit("min")} onKeyDown={enter} />
                <span>–</span>
                <input id="pmax" key={"b" + sh.max} type="number" min={0} inputMode="numeric" placeholder="Max" defaultValue={sh.max} aria-label="Maximum price" onBlur={commit("max")} onKeyDown={enter} />
              </div>
              <div className="chips">{SH_RNG.map((r, k) => <button key={k} className={"chip" + (sh.min === r[1] && sh.max === r[2] ? " on" : "")} onClick={() => sp(k)}>{r[0]}</button>)}</div>
            </Group>
            <Group t="Author">
              {SH_AU.map((a) => <Opt key={a} l={a} n={res(books, sh, "au").filter((b) => aus(b, books).includes(a)).length} on={sh.au.includes(a)} onChange={() => tg("au", a)} />)}
            </Group>
            <Group t="Offers" open>
              <Opt l="Limited-time offers only" n={res(books, sh, "off").filter((b) => b.dl).length} on={sh.offer} onChange={() => setSh((s) => ({ ...s, offer: !s.offer }))} />
            </Group>
            <div className="df"><button className="sub" onClick={() => setDrawer(false)}>Show {l.length} items</button></div>
          </aside>

          <div>
            <div className="sq">
              <span id="si"><Ic d={SH_P.search} /></span>
              <input id="shq" type="search" placeholder="Search books or authors" autoComplete="off" aria-label="Search" value={sh.qraw}
                onChange={(e) => { const v = e.target.value; setSh((s) => ({ ...s, qraw: v, q: v.trim().toLowerCase() })); }} />
            </div>
            <div className="tb">
              <button className="chip" id="fbtn" onClick={() => setDrawer(true)}><Ic d={SH_P.filt} /> Filters{act.length ? <> <b>{act.length}</b></> : null}</button>
              <p className="cnt" id="cnt">Showing <b>{l.length}</b> of {books.length} items</p>
              <button className="chip" id="sortb" ref={sortBtn} aria-haspopup="dialog" aria-controls="sd" onClick={() => setSortOpen(true)}>
                <Ic d={SH_P.srt} /> Sort<span className="sl">: <b>{SH_SORTS.find((o) => o[0] === sh.sort)?.[1]}</b></span>
              </button>
            </div>
            <div id="act">
              {act.length ? <>
                {act.map((a) => <button key={a.t + a.v} className="chip on" onClick={() => rm(a.t, a.v)}>{a.lab} <Ic d={SH_P.x} s={14} /></button>)}
                <button className="lk" onClick={clear}>Clear all</button>
              </> : null}
            </div>
            <div className="grid" id="grid">
              {l.length ? l.map((b) => {
                const i = books.indexOf(b), inn = items.includes(i), w = was(b), p = pct(b);
                return (
                  <article className="pc" key={i}>
                    <button className="pcb" data-go={"book-" + i} aria-label={b.t + ", view details"}><Cover b={b} /></button>
                    <div className="meta"><b>{b.t}</b><br />{b.items ? b.items.length + " books" : b.a} · {b.cond}</div>
                    <div className="pr">
                      <span><b>{price(b)}</b>{w ? <> <s>{CUR + w}</s></> : null}{p ? <em className="sv">-{p}%</em> : null}</span>
                      <button className={"add" + (inn ? " in" : "")} onClick={() => toggleCart(i)}>{inn ? "In cart" : "Add to cart"}</button>
                    </div>
                    {b.dl
                      ? <div className="dl" title="Offer ends in" aria-label="Offer countdown"><Ic d={SH_P.clock} s="1em" /><Countdown end={b.dl.end} /></div>
                      : <div className="dl st"><i></i>1 {b.items ? "set" : "copy"} available</div>}
                  </article>
                );
              }) : <None sh={sh} books={books} onClear={clear} onRm={rm} />}
            </div>
          </div>
        </div>
      </main>

      <button className="fcart" id="fcart" data-act="cart"><Ic d={SH_P.cart} /> Cart (<b className="cc">{items.length}</b>)</button>
      <div id="bk" hidden={!drawer} onClick={() => setDrawer(false)} />
      <div id="sd" hidden={!sortOpen} onClick={(e) => { if (e.target === e.currentTarget) setSortOpen(false); }}>
        <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sdt">
          <div className="sh"><span id="sdt">Sort by</span><button className="x" onClick={() => setSortOpen(false)} aria-label="Close"><Ic d={SH_P.x} s={24} /></button></div>
          <div id="sl" role="radiogroup" aria-label="Sort by">
            {SH_SORTS.map((x) => {
              const on = x[0] === sh.sort;
              return (
                <button key={x[0]} className={"so" + (on ? " on" : "")} role="radio" aria-checked={on} onClick={() => { setSh((s) => ({ ...s, sort: x[0] })); setSortOpen(false); }}>
                  <i></i>{x[1]}{x[2] ? <small>{x[2]}</small> : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- book detail ---------- */
function PriceRow({ b, sv, pc }: { b: BK; sv: number; pc: number }) {
  if (b.dl) {
    const s2 = b.reg - b.p, p2 = Math.round((s2 / b.reg) * 100);
    return (
      <div className="ofr">
        <div className="ofh"><Ic d={SH_P.clock} s="1em" /> LIMITED-TIME OFFER · ends in <Countdown end={b.dl.end} /></div>
        <div><span className="big">{price(b)}</span><s>{CUR + b.reg}</s><span className="save">Save {CUR + s2} ({p2}%)</span></div>
        <p className="ofn">Order before the timer ends to get this special price. After that it goes back to {CUR + b.reg}.</p>
      </div>
    );
  }
  return (
    <div>
      <span className="big">{price(b)}</span>
      {b.old ? <><s>{CUR + b.old}</s><span className="save">Save {CUR + sv} ({pc}%)</span></> : null}
    </div>
  );
}

const Meter = ({ c }: { c: string }) => {
  const n = ({ "Like new": 3, Good: 2, Fair: 1 } as Record<string, number>)[c] || 2;
  return <span className="mt" aria-label={"Condition level " + n + " of 3"}>{[1, 2, 3].map((k) => <i key={k} className={k <= n ? "on" : undefined} />)}</span>;
};
const Scale = ({ c }: { c: string }) => (
  <div className="scale">{["Fair", "Good", "Like new"].map((s) => <span key={s} className={s === c ? "on" : undefined}>{s}</span>)}</div>
);

function RelCard({ b, i }: { b: BK; i: number }) {
  const w = was(b);
  return (
    <div className="pc">
      <button className="pcb" data-go={"book-" + i}>
        <Cover b={b} />
        <div className="meta"><b>{b.t}</b><br />{b.items ? b.items.length + " books" : b.a} · {b.cond}</div>
      </button>
      <div className="pr">
        <span><b>{price(b)}</b>{w ? <> <s>{CUR + w}</s></> : null}</span>
        <AddBtn i={i} className="add" />
      </div>
      {b.dl && <div className="dl"><Ic d={SH_P.clock} s="1em" /> Ends in <Countdown end={b.dl.end} /></div>}
    </div>
  );
}

function BookView({ i, books, on, onWish }: { i: number; books: BK[]; on: boolean; onWish: () => void }) {
  const { say, setModal, add } = useStore();
  const [thumb, setThumb] = useState(0);
  const [pop, setPop] = useState(0);
  const b = books[i], cb = !!b.items, n = cb ? b.items!.length : 0;
  const sv = b.old ? b.old - b.p : 0, pc = b.old ? Math.round((sv / b.old) * 100) : 0;
  const gof = (x: BK): Grade => ({ ...(GR[x.cond] || GR.Good), ...(x.cdx || {}) } as Grade);

  const buy = () => { add(i); setModal({ k: "checkout" }); };
  const wishClick = () => { setPop((p) => p + 1); onWish(); };
  const share = () => {
    const u = window.location.href;
    if (navigator.share) navigator.share({ title: document.title, url: u }).catch(() => { });
    else if (navigator.clipboard) navigator.clipboard.writeText(u).then(() => say("Link copied"), () => say("Copy the link from the address bar"));
    else say("Copy the link from the address bar");
  };
  const scroll = (d: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const c = e.currentTarget.closest(".bs")?.querySelector(".cscroll") as HTMLElement | null;
    if (c) c.scrollBy({ left: d * c.clientWidth * 0.8, behavior: "smooth" });
  };

  let cond: ReactNode;
  if (cb) {
    cond = (
      <>
        <p>Every book in this combo has its own condition grade. Swipe to see each one.</p>
        <div className="cscroll">
          {b.items!.map((k) => {
            const x = books[k], gx = gof(x);
            return (
              <div className="ccd w" key={k}>
                <div className="cbh"><b>{x.t}</b><span className={"tag" + (x.cond === "Like new" ? " o" : "")}>{x.cond}</span></div>
                <Scale c={x.cond} />
                <p className="csum">{gx.sum}</p>
                <dl className="spec"><Rows a={[["Cover", gx.c], ["Corners", gx.k], ["Spine", gx.s], ["Pages", gx.p], ["Stains / water damage", gx.d], ["Writing / markings", gx.w], ["Smell", gx.o], ["Missing pages", gx.m], ["Seller’s note", x.note]]} /></dl>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    const gx = gof(b);
    const cds: [string, number | null, [string, unknown][]][] = [
      ["Overall", null, [["Grade", b.cond], ["Summary", gx.sum]]],
      ["Cover and corners", 1, [["Cover", gx.c], ["Corners", gx.k]]],
      ["Spine and binding", 1, [["Spine", gx.s]]],
      ["Pages", 1, [["Pages", gx.p], ["Missing pages", gx.m]]],
      ["Marks and stains", 1, [["Writing / markings", gx.w], ["Stains / water damage", gx.d], ["Smell", gx.o]]],
    ];
    if (b.note) cds.push(["Seller’s note", null, [["Note", b.note]]]);
    cond = (
      <div className="cscroll">
        {cds.map((c, k) => (
          <div className="ccd" key={c[0]}>
            <div className="cbh"><b>{c[0]}</b>{c[1] ? <Meter c={b.cond} /> : null}</div>
            {k === 0 ? <Scale c={b.cond} /> : null}
            <dl className="spec"><Rows a={c[2].filter((r) => !(k === 0 && r[0] === "Grade"))} /></dl>
          </div>
        ))}
      </div>
    );
  }

  const spec: [string, unknown][] = cb
    ? [["Type", "Combo · " + n + " books"], ["Condition", "Mixed, see each book"], ["Separate price", CUR + b.old], ["Combo price", CUR + b.p], ["You save", CUR + sv + " (" + pc + "%)"]]
    : [["Author", b.a], ["Category", CN[b.c]], ["Condition", b.cond], ["Language", b.lang || "English"], ["Format", b.fmt], ["Pages", b.pages], ["Publisher", b.pub], ["Year", b.year], ["ISBN", b.isbn]];

  const all = books.map((x, k) => ({ x, k }));
  const rel = all.filter((o) => o.k !== i && o.x.c === b.c).concat(all.filter((o) => o.k !== i && o.x.c !== b.c && !!o.x.items === cb)).slice(0, 4);
  const faq: [string, string][] = [
    ["Is this a used book?", "Yes. Every book here is pre-loved, and the condition grade and photos show its exact state."],
    ["Will I get the copy in the photos?", "Yes, the photos show the exact copy you will receive."],
    ["How long does delivery take?", STORE.delivery + "."],
    ["How can I pay?", STORE.pay + "."],
    ["Can I return it?", STORE.ret + "."],
  ];
  if (cb) faq.push(["Can I buy one book from the combo?", "Yes. Every book in the combo has its own page and price."]);

  return (
    <>
      <p className="crumb"><a href="#shop">Shop</a> / {CN[b.c]} / {b.t}</p>
      <div className="bk">
        <div className="gal">
          <div id="gmain"><Cover b={b} img={pic(b, thumb) || undefined} /></div>
          <div className="gcap" id="gcap">{LABS[thumb]}{pic(b, thumb) ? "" : " · photo not added yet"}</div>
          <div className="thumbs">
            {LABS.map((lb, k) => {
              const im = pic(b, k);
              return (
                <button key={lb} className={"th" + (k === thumb ? " on" : "")} aria-label={lb} style={{ backgroundColor: COL[b.c], color: dk(b) }} onClick={() => setThumb(k)}>
                  {im ? <img src={im} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
                  <span>{lb}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="binfo">
          <div className="tags">
            {cb && <span className="tag o">COMBO · {n} BOOKS</span>}
            <span className="tag">{cb ? "Mixed condition" : b.cond}</span>
            <span className="tag">{CN[b.c]}</span>
          </div>
          <h1>{b.t}</h1>
          <p className="by">{cb ? n + " books bundled together" : "by " + b.a}</p>
          <PriceRow b={b} sv={sv} pc={pc} />
          <p className="stock">● {cb ? "1 set available" : "1 copy available"}</p>
          <div className="brow"><AddBtn i={i} className="sub" /><button className="lnk" onClick={buy}>Buy now</button></div>
          <div className="brow">
            <button className={"lnk wish" + (on ? " on" : "") + (pop ? " pop" : "")} onClick={wishClick} aria-pressed={on}>
              <svg className="hrt" key={pop} width="17" height="17" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" /></svg>
              <span>{on ? "Saved" : "Save"}</span>
            </button>
            <button className="lnk" onClick={share}>Share</button>
          </div>

          <div className="bs"><h3>About this {cb ? "combo" : "book"}</h3><p>{DESC[i] || ""}</p><p><b>Good for:</b> {FOR[b.c]}</p></div>

          <div className="bs">
            <div className="bsh">
              <h3>Condition</h3>
              <div className="carrs">
                <button className="carr" onClick={scroll(-1)} aria-label="Scroll left">←</button>
                <button className="carr" onClick={scroll(1)} aria-label="Scroll right">→</button>
              </div>
            </div>
            {cond}
          </div>

          {cb && (
            <div className="bs">
              <h3>What’s inside this combo</h3>
              {b.items!.map((k) => {
                const x = books[k];
                return (
                  <button className="inc" data-go={"book-" + k} key={k}>
                    <span className="mini" style={{ backgroundColor: COL[x.c], color: dk(x) }}>{x.t}</span>
                    <span><b>{x.t}</b><br />{x.a} · {x.cond}<br />Sold separately: {CUR + x.p}</span>
                  </button>
                );
              })}
              <p style={{ marginTop: 14 }}>Buying separately: <b>{CUR + b.old}</b> · Combo price: <b>{price(b)}</b> · You save <b>{CUR + sv} ({pc}%)</b></p>
            </div>
          )}

          <div className="bs"><h3>{cb ? "Combo" : "Book"} details</h3><dl className="spec"><Rows a={spec} /></dl></div>

          <div className="bs">
            <h3>Sold by</h3>
            <div className="store">
              <b style={{ fontSize: 20 }}>{STORE.name}</b><br />{STORE.city}
              <dl className="spec" style={{ marginTop: 10 }}>
                <Rows a={[["Delivery", STORE.delivery], ["Payment", STORE.pay], ["Returns", STORE.ret], ["Packing", STORE.pack]]} />
              </dl>
            </div>
          </div>

          <div className="bs">
            <h3>Questions buyers ask</h3>
            {faq.map((f) => <details className="faq" key={f[0]}><summary>{f[0]}</summary><p>{f[1]}</p></details>)}
          </div>
        </div>
      </div>

      <div className="bs"><h3>You may also like</h3><div className="grid">{rel.map((o) => <RelCard key={o.k} b={o.x} i={o.k} />)}</div></div>

      <div className="buybar">
        <div><b className="big" style={{ fontSize: 26 }}>{price(b)}</b>{was(b) ? <> <s style={{ opacity: 0.5 }}>{CUR + was(b)}</s></> : null}</div>
        <AddBtn i={i} className="sub" style={{ width: "auto", margin: 0, padding: "12px 26px" }} />
      </div>
    </>
  );
}

/* ---------- page ---------- */
export default function ShopApp() {
  const { ready, takeFilter, getWish, setWish, say } = useStore();
  const books = useBooks().books as BK[];
  const [hash, setHash] = useState<string | null>(null);
  const [sh, setSh] = useState<SHs>(SH0);
  const [wish, setWishS] = useState<Wish>({});

  const mm = hash ? /^book-(\d+)$/.exec(hash) : null;
  const bi = mm && books[+mm[1]] ? +mm[1] : -1;

  /* #book-N / #shop routing + pending filter from home, footer or search (was route()/shop()) */
  useEffect(() => {
    if (!ready) return;
    const read = () => {
      setHash(window.location.hash.slice(1));
      document.getElementById("view")?.scrollTo(0, 0);
      const f = takeFilter();
      if (f) setSh({ ...SH0, cat: f.cat && f.cat !== "all" ? [f.cat] : [], qraw: f.q, q: f.q.trim().toLowerCase() });
    };
    setWishS({ ...getWish() });
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [ready, takeFilter, getWish]);

  useEffect(() => {
    document.body.classList.toggle("bkopen", bi >= 0);
    return () => document.body.classList.remove("bkopen");
  }, [bi]);

  const toggleWish = (i: number) => {
    const on = !wish[i];
    const w = { ...wish };
    if (on) w[i] = 1; else delete w[i];
    setWishS(w); setWish(w);
    say(on ? "Saved “" + books[i].t + "”" : "Removed from saved");
  };

  if (hash === null) return <InnerShell bodyClass="shopv" />;
  return (
    <InnerShell bodyClass={bi >= 0 ? "bkpage" : "shopv"}>
      {bi >= 0
        ? <BookView key={bi} i={bi} books={books} on={!!wish[bi]} onWish={() => toggleWish(bi)} />
        : <ShopList sh={sh} setSh={setSh} books={books} />}
    </InnerShell>
  );
}
