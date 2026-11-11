"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import InnerShell from "./InnerShell";
import { Ic, NoneArt, SH_P } from "./ui";
import { useStore } from "./StoreContext";
import { COL } from "@/lib/data";
import { SD_SECS, SD_USER, SY_CM, SY_COLS, SY_I, type SYItem } from "@/lib/study";
import "@/app/study.css";

const SD_IC: Record<string, ReactNode> = {
  uni: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path d="M22 9v6" /></>,
  med: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></>,
  eng: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  col: <><path d="M3 21h18M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" /></>,
  ssc: <><path d="M2 5h7a3 3 0 013 3v13a2 2 0 00-2-2H2z" /><path d="M22 5h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z" /></>,
  hsc: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  board: <><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6M9 13h8M9 17h6" /></>,
  mat: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  mcq: <path d="M4 6l2 2 3-3M4 14l2 2 3-3M12 7h8M12 15h8" />,
  mock: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></>,
  res: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3" />,
  vid: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9l5 3-5 3z" /></>,
  com: <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />,
  plan: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  ok: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  free: <><path d="M20 12v9H4v-9" /><path d="M2 7h20v5H2zM12 21V7" /><path d="M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z" /></>,
};
const SdIc = ({ k, s = 26 }: { k: string; s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{SD_IC[k]}</svg>
);

const hay = (b: SYItem) => (b.t + " " + b.lvl + " " + b.sub + " " + b.kind + " " + b.board + " " + b.year + " " + SY_CM[b.c][1]).toLowerCase();
const metaOf = (b: SYItem) => [b.lvl, b.sub, b.kind, b.board, b.year || ""].filter(Boolean).join(" · ");
const dkOf = (col: string) => (col === "nonfiction" ? "#1c1c1c" : "#fff");
const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, "");

function useOpen() {
  const { setModal } = useStore();
  return (b: SYItem) => {
    const cm = SY_CM[b.c];
    setModal({ k: "study", t: b.t, meta: metaOf(b), cat: cm[1], list: cm[3] });
  };
}

/* quick-access tiles shown right under the hero */
const QUICK: [string, string, string][] = [
  ["mcq", "MCQ Practice", "Quick questions with instant answers"],
  ["board", "Board Questions", "Past papers sorted by board and year"],
  ["mock", "Mock Exams", "Full-length timed exam practice"],
  ["plan", "Study Planner", "Organise your week and your goals"],
];

/* ---------- dashboard ---------- */
function Dash({ onSeeAll }: { onSeeAll: (q: string) => void }) {
  const { user, go } = useStore();
  const open = useOpen();
  const [dq, setDq] = useState("");
  const [show, setShow] = useState(false);
  const U = SD_USER;
  const nm = user ? user.split(" ")[0] : "";
  const hits = dq.trim() ? SY_I.filter((b) => hay(b).includes(dq.trim().toLowerCase())) : [];

  const seeAll = () => { onSeeAll(dq); go("study-all"); };

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };
  const jumps = [
    { id: "sec-continue", l: "Continue studying" },
    ...SD_SECS.map((s, i) => ({ id: "sec-" + i, l: s[0] })),
    { id: "sec-progress", l: "Your progress" },
  ];

  const stat = (ic: string, l: string, v: string | number, sub: string, bar?: number) => (
    <div className="dsh-stat" key={l}>
      <div className="dsh-sl"><span className="dsh-si"><SdIc k={ic} s={20} /></span><span>{l}</span></div>
      <b>{v}</b><small>{sub}</small>
      {bar != null ? <div className="dsh-bar" role="progressbar" aria-label={l} aria-valuenow={bar} aria-valuemin={0} aria-valuemax={100}><i style={{ width: bar + "%" }} /></div> : null}
    </div>
  );

  const first = U.recent[0];
  const rest = U.recent.slice(1, 3);
  const R = 34, C = 2 * Math.PI * R;
  const wk = U.week;
  const wmax = Math.max(...wk.map((d) => d[1]), 1);
  const wtot = wk.reduce((a, d) => a + d[1], 0);
  const wpeak = wk.find((d) => d[1] === wmax);

  return (
    <div className="dsh" onClick={(e) => { if (!(e.target as Element).closest(".dsh-search")) setShow(false); }}>
      {/* hero */}
      <div className="dsh-hero">
        <header className="dsh-head">
          <div>
            <h1>Study</h1>
            <p>{nm ? "Welcome back, " + nm + "." : "Welcome back."} Pick up where you left off, or find an exam, subject or study material.</p>
          </div>
          <div className="dsh-search">
            <div className="dsh-sbox">
              <Ic d={SH_P.search} />
              <input id="dq" type="search" placeholder="Search exams, subjects, questions and study materials" autoComplete="off" aria-label="Search study" value={dq}
                onChange={(e) => { setDq(e.target.value); setShow(true); }}
                onFocus={() => { if (dq.trim()) setShow(true); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && dq.trim()) { e.preventDefault(); seeAll(); }
                  else if (e.key === "Escape" && show) { setShow(false); e.stopPropagation(); }
                }} />
            </div>
            <div className="dsh-res" id="dres" hidden={!show || !dq.trim()}>
              {hits.length ? <>
                {hits.slice(0, 6).map((b) => (
                  <button className="dsh-hit" key={b.t} onClick={() => { setShow(false); open(b); }}>
                    <b>{b.t}</b><small>{[b.lvl, b.sub, b.kind].join(" · ")}</small>
                  </button>
                ))}
                <button className="dsh-all" onClick={seeAll}>See all {hits.length} result{hits.length === 1 ? "" : "s"} →</button>
              </> : <div className="dsh-no">No matches. Try a subject, exam or board name.</div>}
            </div>
          </div>
          <div className="dsh-pop">
            <span>Popular:</span>
            {QUICK.map((q) => <button className="dsh-chip" key={q[0]} data-go={"study-" + q[0]}>{q[1]}</button>)}
          </div>
        </header>

        {first ? (
          <aside className="dsh-side" aria-label="Pick up where you left off">
            <button className="dsh-resume" data-go={"study-" + first[3]}>
              <span className="dsh-rtop">
                <svg className="dsh-ring" viewBox="0 0 80 80" width="84" height="84" aria-hidden="true">
                  <circle cx="40" cy="40" r={R} fill="none" strokeWidth="9" className="rt" />
                  <circle cx="40" cy="40" r={R} fill="none" strokeWidth="9" strokeLinecap="round" className="rp"
                    strokeDasharray={C} strokeDashoffset={C * (1 - first[4] / 100)} transform="rotate(-90 40 40)" />
                  <text x="40" y="45" textAnchor="middle" className="rn">{first[4]}%</text>
                </svg>
                <span className="dsh-rtx">
                  <small>{first[0]}</small>
                  <strong>{first[1]}</strong>
                </span>
              </span>
              <span className="dsh-rdesc">{first[2]}</span>
              <span className="dsh-rgo">Resume studying <SdIc k="arrow" s={18} /></span>
            </button>
            {rest.length ? (
              <div className="dsh-queue">
                {rest.map((r) => (
                  <button className="dsh-qrow" key={r[1]} data-go={"study-" + r[3]}>
                    <span className="dsh-qt"><b>{r[1]}</b><small>{r[0]}</small></span>
                    <span className="dsh-qp"><span className="dsh-bar" aria-hidden="true"><i style={{ width: r[4] + "%" }} /></span><em>{r[4]}%</em></span>
                  </button>
                ))}
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>

      {/* quick access */}
      <div className="dsh-quick">
        {QUICK.map((q) => (
          <button className="dsh-tile" key={q[0]} data-go={"study-" + q[0]}>
            <span className="dsh-tic"><SdIc k={q[0]} s={24} /></span>
            <span className="dsh-ttx"><b>{q[1]}</b><small>{q[2]}</small></span>
            <span className="dsh-tar"><SdIc k="arrow" s={16} /></span>
          </button>
        ))}
      </div>

      {/* jump bar */}
      <nav className="dsh-jump" aria-label="Sections on this page">
        {jumps.map((j) => <button className="dsh-chip" key={j.id} onClick={() => jump(j.id)}>{j.l}</button>)}
      </nav>

      <section className="dsh-sec" id="sec-continue">
        <div className="dsh-sh">
          <div className="dsh-shl">
            <span className="dsh-sw" style={{ background: "var(--orange)" }} />
            <div><h2>Continue Studying</h2><p>Your recent subjects and ongoing courses.</p></div>
          </div>
          <span className="dsh-n">{U.recent.length} in progress</span>
        </div>
        <div className="dsh-grid">
          {U.recent.map((r) => (
            <button className="dsh-card dsh-cont" key={r[1]} data-go={"study-" + r[3]}>
              <span className="dsh-tag">{r[0]}</span>
              <h3>{r[1]}</h3>
              <p>{r[2]}</p>
              <div className="dsh-bar" role="progressbar" aria-label={r[1] + " progress"} aria-valuenow={r[4]} aria-valuemin={0} aria-valuemax={100}><i style={{ width: r[4] + "%" }} /></div>
              <span className="dsh-pc"><b>{r[4]}% complete</b><span className="dsh-ex">Resume <i>→</i></span></span>
            </button>
          ))}
        </div>
      </section>

      {SD_SECS.map((s, i) => {
        const col = SY_COLS[s[2]];
        return (
          <section className="dsh-sec" key={s[0]} id={"sec-" + i}>
            <div className="dsh-sh">
              <div className="dsh-shl">
                <span className="dsh-sw" style={{ background: COL[col] }} />
                <div><h2>{s[0]}</h2><p>{s[1]}</p></div>
              </div>
              <span className="dsh-n">{s[3].length} {s[3].length === 1 ? "topic" : "topics"}</span>
            </div>
            <div className="dsh-grid">
              {s[3].map((c) => (
                <button className="dsh-card dsh-cat" key={c[0]} data-go={"study-" + c[0]} style={{ "--cc": COL[col] } as CSSProperties}>
                  <span className="dsh-cap">
                    <span className="dsh-ic" style={{ background: COL[col], color: dkOf(col) }}><SdIc k={c[0]} /></span>
                    <span className="dsh-go"><SdIc k="arrow" s={16} /></span>
                  </span>
                  <h3>{c[1]}</h3><p>{c[2]}</p>
                  <span className="dsh-ex">Explore <i>→</i></span>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <section className="dsh-sec" id="sec-progress">
        <div className="dsh-sh">
          <div className="dsh-shl">
            <span className="dsh-sw" style={{ background: "var(--orange)" }} />
            <div><h2>Personal Progress</h2><p>How you are doing this week.</p></div>
          </div>
          <span className="dsh-n">{fmt(wtot)} h logged</span>
        </div>
        <div className="dsh-prog">
          <div className="dsh-stats">
            {stat("ok", "Completed exams", U.done, U.doneWeek + " this week")}
            {stat("target", "Practice accuracy", U.acc + "%", "Correct answers in MCQ practice", U.acc)}
            {stat("clock", "Study time", U.time, "This week")}
            {stat("trend", "Learning progress", U.prog + "%", "Across your current courses", U.prog)}
          </div>
          <div className="dsh-stat dsh-week">
            <div className="dsh-sl"><span className="dsh-si"><SdIc k="clock" s={20} /></span><span>Study time by day</span></div>
            <p className="dsh-wsum">
              <b>{fmt(wtot)} hours</b> this week
              {wpeak ? <> · best day is {wpeak[0]} with {fmt(wpeak[1])} h</> : null}
            </p>
            <div className="dsh-bars" role="img" aria-label={"Study hours per day: " + wk.map((d) => d[0] + " " + d[1]).join(", ")}>
              {wk.map((d) => (
                <div key={d[0]} className={d[1] === wmax ? "pk" : ""}>
                  <div className="dsh-area">
                    <span title={d[1] + " hours"}>{fmt(d[1])}h</span>
                    <i style={{ "--h": Math.round((d[1] / wmax) * 100) + "%" } as CSSProperties} title={d[1] + " hours"} />
                  </div>
                  <em>{d[0]}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <aside className="dsh-free">
        <span className="dsh-fic"><SdIc k="free" s={30} /></span>
        <div className="dsh-ftx">
          <h2>Every resource here is free</h2>
          <p>No sign-up, no payment. Open any exam, subject or study material and start.</p>
        </div>
        <button className="dsh-fbtn" onClick={() => { onSeeAll(""); go("study-all"); }}>Browse all resources <SdIc k="arrow" s={18} /></button>
      </aside>
    </div>
  );
}

/* ---------- list of resources (#study-xxx) ---------- */
function ListView({ id, q0, onUsed }: { id: string; q0: string; onUsed: () => void }) {
  const open = useOpen();
  const { go } = useStore();
  const [lvl, setLvl] = useState<string[]>([]);
  const [kind, setKind] = useState<string[]>([]);
  const [qraw, setQraw] = useState(q0);
  const [view, setView] = useState<"grid" | "list">("grid");
  const q = qraw.trim().toLowerCase();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onUsed(); }, []);

  const ttl = id === "all" ? "All Study Resources" : SY_CM[id][1];
  const desc = id === "all"
    ? "Every exam, subject and resource on this page is completely free for every student — no sign-up, no payment."
    : SY_CM[id][3].join(" ") + " Completely free for every student.";

  const res = (x?: "lvl" | "kind") => SY_I.filter((b) =>
    (id === "all" || b.c === id) &&
    (x === "lvl" || !lvl.length || lvl.includes(b.lvl)) &&
    (x === "kind" || !kind.length || kind.includes(b.kind)) &&
    (!q || hay(b).includes(q)));
  const l = res();
  const active = !!(lvl.length || kind.length || q);
  const lvls = Array.from(new Set(res("lvl").map((b) => b.lvl)));
  const kinds = Array.from(new Set(res("kind").map((b) => b.kind)));
  const tg = (a: string[], set: (v: string[]) => void, v: string) => set(a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);
  const clear = () => { setLvl([]); setKind([]); setQraw(""); };
  const showChips = lvls.length > 1 || kinds.length > 1;
  const cats = Object.keys(SY_CM);

  const chip = (k: "lvl" | "kind", v: string) => {
    const arr = k === "lvl" ? lvl : kind, set = k === "lvl" ? setLvl : setKind;
    const n = res(k).filter((b) => b[k] === v).length;
    return <button key={k + v} className={"dsh-chip" + (arr.includes(v) ? " on" : "")} aria-pressed={arr.includes(v)} onClick={() => tg(arr, set, v)}>{v} <b>{n}</b></button>;
  };

  return (
    <div className="dsh resv">
      <nav className="rv-crumb" aria-label="Breadcrumb">
        <button onClick={() => { window.location.hash = ""; }}>Study</button>
        <span aria-hidden="true">/</span>
        <b aria-current="page">{ttl}</b>
      </nav>

      <header className="dsh-head rv-head">
        <div><h1>{ttl}</h1><p>{desc}</p></div>
        <div className="dsh-search">
          <div className="dsh-sbox">
            <Ic d={SH_P.search} />
            <input id="rq" type="search" placeholder="Search by subject, board, type or year" autoComplete="off" aria-label={"Search " + ttl} value={qraw} onChange={(e) => setQraw(e.target.value)} />
          </div>
        </div>
      </header>

      <div className="rv-tabs" role="tablist" aria-label="Categories">
        <button role="tab" aria-selected={id === "all"} className={"rv-tab" + (id === "all" ? " on" : "")} onClick={() => go("study-all")}>
          All <b>{SY_I.length}</b>
        </button>
        {cats.map((k) => {
          const col = SY_COLS[SY_CM[k][2]];
          const n = SY_I.filter((b) => b.c === k).length;
          return (
            <button key={k} role="tab" aria-selected={id === k} className={"rv-tab" + (id === k ? " on" : "")} onClick={() => go("study-" + k)}>
              <i style={{ background: COL[col] }} />{SY_CM[k][1]} <b>{n}</b>
            </button>
          );
        })}
      </div>

      <div className="rv-filters" id="rchips" hidden={!showChips}>
        {showChips ? <>
          {lvls.length > 1 && (
            <div className="rv-fg"><span className="rv-fl">Level</span><div className="rv-chips">{lvls.map((v) => chip("lvl", v))}</div></div>
          )}
          {kinds.length > 1 && (
            <div className="rv-fg"><span className="rv-fl">Type</span><div className="rv-chips">{kinds.map((v) => chip("kind", v))}</div></div>
          )}
          {active && <button className="dsh-chip rv-clear" onClick={clear}>Clear filters <Ic d={SH_P.x} s={12} /></button>}
        </> : null}
      </div>

      <div className="rv-bar">
        <p className="cnt" id="rcnt"><b>{l.length}</b> free resource{l.length === 1 ? "" : "s"}{active ? " found" : " available"} · nothing here is paid</p>
        <div className="rv-view" role="group" aria-label="Layout">
          <button className={view === "grid" ? "on" : ""} aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")}><SdIc k="grid" s={18} /></button>
          <button className={view === "list" ? "on" : ""} aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")}><SdIc k="list" s={18} /></button>
        </div>
      </div>

      <div className={"dsh-grid" + (view === "list" ? " is-list" : "")} id="rgrid">
        {l.length ? l.map((b) => {
          const col = SY_COLS[SY_CM[b.c][2]];
          const tags = [b.lvl, b.sub, b.board, b.year || ""].filter(Boolean);
          return (
            <button className="dsh-card res-card" key={b.t} onClick={() => open(b)} aria-label={b.t + ", view details"}>
              <span className="rc-top" style={{ background: COL[col], color: dkOf(col) }}>
                <SdIc k={b.c} s={28} />
                <span className="rc-kind">{b.kind}</span>
              </span>
              <span className="rc-body">
                <h3>{b.t}</h3>
                <span className="rc-tags">
                  <span className="rc-kt">{b.kind}</span>
                  {tags.map((t) => <span key={t}>{t}</span>)}
                </span>
                <span className="dsh-ex">Open <i>→</i></span>
              </span>
            </button>
          );
        }) : (
          <div className="rnone" role="status">
            <NoneArt />
            <h3>No matching resources</h3>
            <p>Try a shorter word, or clear the filters below — everything here is free, so there is always something to browse.</p>
            <button className="add nbtn" onClick={clear}><Ic d={SH_P.x} s={16} /> Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function StudyApp() {
  const [hash, setHash] = useState<string | null>(null);
  const [pq, setPq] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      setHash(window.location.hash.slice(1));
      document.getElementById("view")?.scrollTo(0, 0);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  if (hash === null) return <InnerShell />;
  const sm = /^study-([a-z]+)$/.exec(hash);
  const sid = sm && (sm[1] === "all" || SY_CM[sm[1]]) ? sm[1] : null;
  return (
    <InnerShell>
      {sid ? <ListView key={sid} id={sid} q0={pq ?? ""} onUsed={() => setPq(null)} /> : <Dash onSeeAll={setPq} />}
    </InnerShell>
  );
}