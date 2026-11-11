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
