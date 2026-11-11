"use client";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { NavDesktop, NavMobile } from "./Navbar";
import "@/app/inner.css";
import "@/app/about.css";
import "@/app/team.css";

export default function InnerShell({ children, bodyClass }: { children?: ReactNode; bodyClass?: string }) {
  const d = useRef<HTMLDivElement>(null);
  const n = useRef<HTMLDivElement>(null);

  /* scales the 1906px navbar to the window width (inner.js fit()) */
  useLayoutEffect(() => {
    const fit = () => {
      const k = window.innerWidth / 1906;
      n.current!.style.transform = "scale(" + k + ")";
      d.current!.style.height = 133 * k + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  /* #view is a fixed full-screen layer, so lock the body scroll like before */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div id="view" className="isbook">
      <div className="vnavd" id="vnavd" ref={d}>
        <div id="vnav" ref={n}><NavDesktop /></div>
      </div>
      <header className="mhero vnavm"><NavMobile /></header>
      <div className={"vbody" + (bodyClass ? " " + bodyClass : "")} id="vb">{children}</div>
    </div>
  );
}
