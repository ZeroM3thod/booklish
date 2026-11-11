"use client";
import type { ReactNode } from "react";
import InnerShell from "./InnerShell";
import { useStore } from "./StoreContext";
import { BOOKS, COL } from "@/lib/data";
import "@/app/free-books.css";

type Combo = { t: string; a: string; c: string; cond: string; items: number[] };
type Ebook = { t: string; a: string; c: string; fmt: string; n: string; u: string };

const FC: Combo[] = [
  { t: "Adventure Starter Pack", a: "3 books", c: "combo", cond: "Mixed condition", items: [15, 16, 18] },
  { t: "Thinker’s Free Pack", a: "3 books", c: "combo", cond: "Mixed condition", items: [17, 20, 19] },
];
const FEB: Ebook[] = [
  { t: "Pride and Prejudice", a: "Jane Austen", c: "classic", fmt: "EPUB · PDF", n: "432 pages", u: "https://www.gutenberg.org/ebooks/1342" },
  { t: "Jane Eyre", a: "Charlotte Brontë", c: "classic", fmt: "EPUB · PDF", n: "532 pages", u: "https://www.gutenberg.org/ebooks/1260" },
  { t: "Frankenstein", a: "Mary Shelley", c: "modern", fmt: "EPUB · PDF", n: "280 pages", u: "https://www.gutenberg.org/ebooks/84" },
  { t: "The Adventures of Sherlock Holmes", a: "Arthur Conan Doyle", c: "nonfiction", fmt: "EPUB · PDF", n: "307 pages", u: "https://www.gutenberg.org/ebooks/1661" },
  { t: "A Tale of Two Cities", a: "Charles Dickens", c: "classic", fmt: "EPUB · PDF", n: "448 pages", u: "https://www.gutenberg.org/ebooks/98" },
  { t: "Moby-Dick", a: "Herman Melville", c: "modern", fmt: "EPUB · PDF", n: "720 pages", u: "https://www.gutenberg.org/ebooks/2701" },
];

/* badges: [label, right-side?] */
function Cover({ t, c, badges }: { t: string; c: string; badges: [string, boolean?][] }) {
  return (
    <div className="cover" style={{ backgroundColor: COL[c], color: c === "nonfiction" ? "#1c1c1c" : "#fff" }}>
      {badges.map((b) => <span key={b[0]} className={"cb" + (b[1] ? " of" : "")}>{b[0]}</span>)}
      {t}
    </div>
  );
}

export default function FreeBooks() {
  const { setModal } = useStore();
  const fr = BOOKS.filter((b) => !b.items && b.p === 0);

  const reqBook = (i: number) => setModal({ k: "req", t: BOOKS[i].t, sub: BOOKS[i].a });
  const reqCombo = (x: Combo) => setModal({ k: "req", t: x.t, sub: x.items.length + " books", list: x.items.map((k) => BOOKS[k].t + " — " + BOOKS[k].a) });

  const Card = ({ title, c, badges, meta, onReq, label }: { title: string; c: string; badges: [string, boolean?][]; meta: ReactNode; onReq: () => void; label: string }) => (
    <div className="pc">
      <button className="pcb" onClick={onReq} aria-label={title + ", request this " + label}>
        <Cover t={title} c={c} badges={badges} />
        <div className="meta"><b>{title}</b><br />{meta}</div>
      </button>
      <div className="pr"><span><b>Free</b></span><button className="add" onClick={onReq}>Request</button></div>
    </div>
  );

  return (
    <InnerShell bodyClass="freepg">
      <div className="tmpage">
        <section className="abhero">
          <div className="abt">
            <div className="abey">FREE BOOKS</div>
            <h1 className="abh1">Books that<br />cost nothing.</h1>
            <p className="abp">Donated books and free e-books for anyone who needs them. Pick one up, read it, and pass it on when you are done.</p>
            <div className="abrow">
              <button className="sub abbtn" data-act="donate">Donate books</button>
              <button className="lnk" data-go="shop">Browse all books</button>
            </div>
          </div>
        </section>

        <section className="abstats">
          <div><b>{fr.length}</b><span>free printed books</span></div>
          <div><b>{FEB.length}</b><span>free e-books</span></div>
          <div><b>৳0</b><span>to pick up or read</span></div>
          <div><b>0</b><span>sign-ups needed</span></div>
        </section>

        <section className="absec">
          <div className="abeyb">FREE PRINTED BOOKS</div>
          <h2 className="abh2">Take one home</h2>
          {fr.length ? (
            <div className="grid" id="lfree">
              {fr.map((b) => {
                const i = BOOKS.indexOf(b);
                return <Card key={i} title={b.t} c={b.c} badges={[["DONATED"]]} meta={<>{b.a} · {b.cond}</>} onReq={() => reqBook(i)} label="book" />;
              })}
            </div>
          ) : (
            <div className="abfeat" style={{ backgroundColor: COL.nonfiction, color: "#1c1c1c" }}>
              <div>
                <div className="abeyb">NOTHING ON THE SHELF YET</div>
                <h2>No free books right now</h2>
                <p>Free books come from donations, so the shelf changes often. Ask us and we will let you know when new ones arrive.</p>
                <button className="abw dkb" data-act="msg" data-n="our team" data-t="our team">Ask our team</button>
              </div>
            </div>
          )}
        </section>

        <section className="absec">
          <div className="abeyb">FREE COMBOS</div>
          <h2 className="abh2">Take the whole set</h2>
          <div className="grid" id="lfcombo">
            {FC.map((x) => <Card key={x.t} title={x.t} c={x.c} badges={[["COMBO"], ["FREE", true]]} meta={<>{x.items.length} books · {x.cond}</>} onReq={() => reqCombo(x)} label="combo" />)}
          </div>
        </section>

        <section className="absec">
          <div className="abeyb">FREE E-BOOKS</div>
          <h2 className="abh2">Read now, on any screen</h2>
          <div className="grid" id="lfeb">
            {FEB.map((e, k) => (
              <div className="pc ebc" key={e.t} style={{ animationDelay: k * 60 + "ms" }}>
                <a className="pcb" href={e.u} target="_blank" rel="noopener" aria-label={e.t + ", read free e-book"}>
                  <Cover t={e.t} c={e.c} badges={[["E-BOOK"], ["FREE", true]]} />
                  <div className="meta"><b>{e.t}</b><br />{e.a} · {e.fmt}</div>
                </a>
                <div className="pr">
                  <span><b>Free</b> <s style={{ opacity: 0.5 }}>{e.n}</s></span>
                  <a className="add" href={e.u} target="_blank" rel="noopener">Read free</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </InnerShell>
  );
}
