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
