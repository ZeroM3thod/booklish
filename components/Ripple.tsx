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
