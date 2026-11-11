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
    /* eslint-disable react-hooks/set-state-in-effect -- paint the saved colour after mount (SSR-safe) */
    apply(saved || DEF, false);
    /* eslint-enable react-hooks/set-state-in-effect */
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
