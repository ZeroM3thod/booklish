I've converted the Study page (the dashboard and the `#study-…` list pages) to Next.js. Nothing has been run, so please check `/study` in the browser. It needs a small fix in `go` and a new popup in `Modal`.

## 1. Copy `study.css` unchanged to `app/study.css`

## 2. `components/StoreProvider.tsx` – one-line fix in `go`

Navbar "Study" on `/study#study-uni` has to go back to the dashboard. Change the regex in the same-page branch:

```ts
if (/^(book|study)-|^(shop|study)$/.test(r)) {
```

## 3. `components/StoreContext.ts` – add one kind to `ModalKind`

```ts
  | { k: "study"; t: string; meta: string; cat: string; list: string[] };
```

## 4. `components/Modal.tsx` – add this case before `case "msg"`

```tsx
      case "study":
        body = (
          <>
            <h2>{modal.t}</h2>
            <p style={{ marginBottom: 8 }}>{modal.meta}</p>
            <p style={{ marginBottom: 10 }}><span className="tag o">FREE FOR EVERY STUDENT</span></p>
            <p><b>{modal.cat}</b></p>
            <ul className="abl">{modal.list.map((t) => <li key={t}>{t}</li>)}</ul>
            <button className="sub" data-act="msg" data-n="our team" data-t="our team">Ask our team about this</button>
          </>
        );
        break;
```

## 5. `components/ui.tsx` (new)

The shared icon helper and the empty-shelf art, which the old `common.js` provided.

```tsx
import type { ReactNode } from "react";

export const SH_P = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
};

export const Ic = ({ d, s = 18 }: { d: ReactNode; s?: number | string }) => (
  <svg className="ci" viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

export const NoneArt = () => (
  <svg className="nart" viewBox="0 0 240 190" role="img" aria-label="Empty bookshelf with a magnifying glass" fill="none">
    <ellipse cx="116" cy="172" rx="100" ry="8" fill="#1c1c1c" opacity=".12" />
    <rect x="14" y="166" width="212" height="6" rx="3" fill="#1c1c1c" />
    <g className="nbk"><rect x="38" y="62" width="40" height="104" rx="3" fill="#000" /><rect x="30" y="62" width="40" height="104" rx="3" fill="#fd7b2e" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M30 84h40M30 144h40" stroke="#1c1c1c" strokeWidth="2.5" /><circle cx="50" cy="114" r="6" fill="#fff" stroke="#1c1c1c" strokeWidth="2" /></g>
    <g className="nbk b2"><rect x="94" y="40" width="36" height="126" rx="3" fill="#000" /><rect x="86" y="40" width="36" height="126" rx="3" fill="#2a4577" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M86 62h36M86 148h36" stroke="#fff" strokeWidth="2.5" /><path d="M98 90h12M98 100h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></g>
    <g className="nbk b3"><rect x="144" y="74" width="34" height="92" rx="3" fill="#000" /><rect x="136" y="74" width="34" height="92" rx="3" fill="#fbbc58" stroke="#1c1c1c" strokeWidth="2.5" /><path d="M136 96h34M136 138h34" stroke="#1c1c1c" strokeWidth="2.5" /></g>
    <g className="nlens"><circle cx="178" cy="62" r="26" fill="#fefdfb" fillOpacity=".85" stroke="#1c1c1c" strokeWidth="4" /><path d="M196 82l22 24" stroke="#1c1c1c" strokeWidth="9" strokeLinecap="round" /><path d="M168 54a14 14 0 0 1 12-6" stroke="#f47c2c" strokeWidth="4" strokeLinecap="round" /><path d="M171 63l14 0M178 56l0 14" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" opacity="0" /><text x="178" y="72" textAnchor="middle" fontFamily="Outfit,sans-serif" fontWeight="700" fontSize="28" fill="#1c1c1c">?</text></g>
  </svg>
);
```

## 6. `lib/study.ts` (new)

```ts
export type SYItem = { c: string; t: string; lvl: string; sub: string; kind: string; acc: string; board: string; year: number };

/* [id, title, colour index, three bullet lines] */
export const SY_CATS: [string, string, number, string[]][] = [
  ["uni", "University Admission", 0, ["Previous admission questions.", "University-wise and unit-wise preparation.", "MCQ practice and mock tests."]],
  ["med", "Medical Admission", 0, ["Biology, Chemistry, Physics and other subjects.", "Previous questions and explanations.", "Practice tests and model exams."]],
  ["eng", "Engineering Admission", 0, ["BUET, KUET, RUET, CUET and other universities.", "Math, Physics and Chemistry preparation.", "Previous questions and mock tests."]],
  ["ssc", "SSC Preparation", 1, ["Subject-wise and chapter-wise questions.", "Board questions with answers.", "MCQ practice and model tests."]],
  ["hsc", "HSC Preparation", 1, ["Science, Humanities and Business Studies.", "Chapter-wise questions and explanations.", "Board questions and model tests."]],
  ["col", "College Admission", 0, ["College admission information.", "Preparation questions and practice tests.", "Admission notices and requirements."]],
  ["board", "Board Questions", 1, ["SSC and HSC previous board questions.", "Search by year, board and subject.", "Answers and explanations."]],
  ["mcq", "MCQ Practice", 2, ["Practice questions by subject and chapter.", "Instant answers and explanations.", "Track correct and incorrect answers."]],
  ["mock", "Mock Exams", 2, ["Take timed online examinations.", "Get automatic results after submission.", "Review mistakes and improve performance."]],
  ["res", "Results and Rankings", 2, ["Check exam and mock exam results.", "See how you rank among other students.", "Track your improvement over time."]],
  ["mat", "Study Materials", 3, ["Notes, summaries and important formulas.", "Subject-wise learning materials.", "100% free resources for every student."]],
  ["vid", "Video Lessons", 3, ["Watch subject-wise video lessons.", "Learn from teachers and educators.", "Save lessons and track progress."]],
  ["com", "Study Community", 3, ["Ask questions and share knowledge.", "Discuss subjects with other students.", "Learn from teachers and other learners."]],
  ["plan", "Study Planner", 2, ["Create daily and weekly study plans.", "Set study goals and exam countdowns.", "Track study progress."]],
];
export const SY_COLS = ["classic", "modern", "nonfiction", "combo"];
export const SY_CM: Record<string, (typeof SY_CATS)[number]> = Object.fromEntries(SY_CATS.map((c) => [c[0], c]));

const ROWS = [
  "uni|DU admission questions|University|All units|Question bank|Free||2024", "uni|DU unit-wise preparation|University|Unit-wise|Study guide|Free||2025", "uni|JU admission questions|University|All units|Question bank|Free||2024", "uni|RU admission questions|University|All units|Question bank|Free||2024", "uni|CU admission questions|University|All units|Question bank|Free||2024", "uni|GST cluster preparation|University|Cluster|Study guide|Free||2025", "uni|University MCQ practice|University|Mixed|MCQ set|Free||2025", "uni|University mock test|University|Mixed|Mock exam|Free||2025",
  "med|Medical Biology practice|Medical|Biology|MCQ set|Free||2025", "med|Medical Chemistry practice|Medical|Chemistry|MCQ set|Free||2025", "med|Medical Physics practice|Medical|Physics|MCQ set|Free||2025", "med|Previous medical questions|Medical|All subjects|Question bank|Free||2024", "med|Medical model exam|Medical|All subjects|Mock exam|Free||2025",
  "eng|BUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|KUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|RUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|CUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|Engineering Math preparation|Engineering|Math|Study guide|Free||2025", "eng|Engineering Physics preparation|Engineering|Physics|Study guide|Free||2025", "eng|Engineering Chemistry preparation|Engineering|Chemistry|Study guide|Free||2025", "eng|Engineering mock test|Engineering|Mixed|Mock exam|Free||2025",
  "ssc|SSC Physics questions|SSC|Physics|Question bank|Free||2025", "ssc|SSC Chemistry questions|SSC|Chemistry|Question bank|Free||2025", "ssc|SSC Biology questions|SSC|Biology|Question bank|Free||2025", "ssc|SSC Higher Math questions|SSC|Higher Math|Question bank|Free||2025", "ssc|SSC General Math questions|SSC|General Math|Question bank|Free||2025", "ssc|SSC English questions|SSC|English|Question bank|Free||2025", "ssc|SSC Bangla questions|SSC|Bangla|Question bank|Free||2025", "ssc|SSC ICT questions|SSC|ICT|Question bank|Free||2025", "ssc|SSC model test|SSC|All subjects|Mock exam|Free||2025",
  "hsc|HSC Physics questions|HSC|Physics|Question bank|Free||2025", "hsc|HSC Chemistry questions|HSC|Chemistry|Question bank|Free||2025", "hsc|HSC Biology questions|HSC|Biology|Question bank|Free||2025", "hsc|HSC Higher Math questions|HSC|Higher Math|Question bank|Free||2025", "hsc|HSC ICT questions|HSC|ICT|Question bank|Free||2025", "hsc|HSC Accounting (Business Studies)|HSC|Accounting|Question bank|Free||2025", "hsc|HSC Economics (Humanities)|HSC|Economics|Question bank|Free||2025", "hsc|HSC Bangla questions|HSC|Bangla|Question bank|Free||2025", "hsc|HSC model test|HSC|All subjects|Mock exam|Free||2025",
  "col|College admission information|College|Admission info|Guide|Free||2026", "col|College admission practice test|College|Mixed|Practice test|Free||2025", "col|Admission notices|College|Notices|Notice|Free||2026", "col|Admission requirements|College|Requirements|Guide|Free||2026", "col|Preparation questions|College|Mixed|Question bank|Free||2025",
  "board|SSC Dhaka Board questions|SSC|All subjects|Board questions|Free|Dhaka|2024", "board|SSC Rajshahi Board questions|SSC|All subjects|Board questions|Free|Rajshahi|2024", "board|SSC Chattogram Board questions|SSC|All subjects|Board questions|Free|Chattogram|2024", "board|SSC Comilla Board questions|SSC|All subjects|Board questions|Free|Comilla|2023", "board|SSC Jashore Board questions|SSC|All subjects|Board questions|Free|Jashore|2023", "board|HSC Dhaka Board questions|HSC|All subjects|Board questions|Free|Dhaka|2024", "board|HSC Rajshahi Board questions|HSC|All subjects|Board questions|Free|Rajshahi|2024", "board|HSC Chattogram Board questions|HSC|All subjects|Board questions|Free|Chattogram|2023", "board|HSC Barishal Board questions|HSC|All subjects|Board questions|Free|Barishal|2023",
  "mcq|SSC Physics MCQ|SSC|Physics|MCQ set|Free||2025", "mcq|SSC Chemistry MCQ|SSC|Chemistry|MCQ set|Free||2025", "mcq|SSC Math MCQ|SSC|General Math|MCQ set|Free||2025", "mcq|HSC Physics MCQ|HSC|Physics|MCQ set|Free||2025", "mcq|HSC Chemistry MCQ|HSC|Chemistry|MCQ set|Free||2025", "mcq|HSC Biology MCQ|HSC|Biology|MCQ set|Free||2025", "mcq|HSC ICT MCQ|HSC|ICT|MCQ set|Free||2025", "mcq|Daily admission MCQ|University|Mixed|MCQ set|Free||2026",
  "mock|SSC full mock exam|SSC|All subjects|Mock exam|Free||2025", "mock|HSC full mock exam|HSC|All subjects|Mock exam|Free||2025", "mock|Weekly subject quiz|All levels|Mixed|Mock exam|Free||2026", "mock|Timed practice exam|All levels|Mixed|Mock exam|Free||2026", "mock|Admission full mock|University|Mixed|Mock exam|Free||2025",
  "res|SSC results|SSC|All subjects|Results|Free||2025", "res|HSC results|HSC|All subjects|Results|Free||2025", "res|Admission results|University|Mixed|Results|Free||2026", "res|Mock exam results|All levels|Mixed|Results|Free||2026", "res|National rankings|All levels|Mixed|Rankings|Free||2026", "res|Weekly leaderboard|All levels|Mixed|Rankings|Free||2026",
  "mat|Physics formula sheet|HSC|Physics|Notes|Free||2025", "mat|Chemistry short notes|HSC|Chemistry|Notes|Free||2025", "mat|Biology summaries|HSC|Biology|Notes|Free||2025", "mat|Higher Math important formulas|SSC|Higher Math|Notes|Free||2025", "mat|English grammar summary|SSC|English|Notes|Free||2025", "mat|ICT quick notes|HSC|ICT|Notes|Free||2025", "mat|Admission formula book|University|Mixed|Notes|Free||2026",
  "vid|Physics video lessons|HSC|Physics|Video lessons|Free||2025", "vid|Chemistry video lessons|HSC|Chemistry|Video lessons|Free||2025", "vid|Math video lessons|SSC|General Math|Video lessons|Free||2025", "vid|Biology video lessons|HSC|Biology|Video lessons|Free||2025", "vid|English video lessons|SSC|English|Video lessons|Free||2025", "vid|Admission math lessons|University|Math|Video lessons|Free||2026",
  "com|Ask a question|All levels|Mixed|Community|Free||", "com|Physics discussion|All levels|Physics|Community|Free||", "com|Admission discussion|All levels|Mixed|Community|Free||", "com|Ask a teacher|All levels|Mixed|Community|Free||", "com|Share your notes|All levels|Mixed|Community|Free||",
  "plan|Daily study planner|All levels|Planner|Planner|Free||", "plan|Weekly study planner|All levels|Planner|Planner|Free||", "plan|Exam countdown|All levels|Planner|Planner|Free||", "plan|Study goal tracker|All levels|Planner|Planner|Free||",
];
export const SY_I: SYItem[] = ROWS.map((r) => {
  const p = r.split("|");
  return { c: p[0], t: p[1], lvl: p[2], sub: p[3], kind: p[4], acc: p[5], board: p[6], year: +p[7] || 0 };
});

export const SD_USER = {
  recent: [["SUBJECT", "HSC Physics", "Chapter 5 · Video lesson", "vid", 64], ["COURSE", "Medical Biology course", "Lesson 12 of 30", "med", 38], ["COURSE", "SSC Higher Math", "Chapter 3 of 10", "ssc", 30]] as [string, string, string, string, number][],
  done: 12, doneWeek: 3, acc: 78, time: "24h 30m",
  week: [["Sat", 3], ["Sun", 4], ["Mon", 2.5], ["Tue", 5], ["Wed", 3.5], ["Thu", 4.5], ["Fri", 2]] as [string, number][],
  prog: 62,
};

/* [title, subtitle, colour index, [[id, title, text], ...]] */
export const SD_SECS: [string, string, number, [string, string, string][]][] = [
  ["Admission Preparation", "Get ready for the admission test you are aiming for.", 0, [["uni", "University Admission", "Previous questions, unit-wise preparation and mock tests."], ["med", "Medical Admission", "Biology, Chemistry and Physics practice with explanations."], ["eng", "Engineering Admission", "BUET, KUET, RUET and CUET preparation in Math, Physics and Chemistry."], ["col", "College Admission", "Admission information, practice tests, notices and requirements."]]],
  ["Board Examination", "Everything for SSC and HSC in one place.", 1, [["ssc", "SSC Preparation", "Subject-wise and chapter-wise questions with answers."], ["hsc", "HSC Preparation", "Science, Humanities and Business Studies."], ["board", "Board Questions", "Previous SSC and HSC questions by year, board and subject."], ["mat", "Study Materials", "Notes, summaries and important formulas."]]],
  ["Practice & Exams", "Practice often, test yourself, track your rank.", 2, [["mcq", "MCQ Practice", "Practice by subject and chapter with instant answers."], ["mock", "Mock Exams", "Timed online exams with automatic results."], ["res", "Results and Rankings", "Check your results and see how you rank."]]],
  ["Learning Resources", "Learn at your own pace.", 3, [["vid", "Video Lessons", "Subject-wise lessons from teachers and educators."], ["com", "Study Community", "Ask questions and discuss with other students."], ["plan", "Study Planner", "Daily and weekly plans, goals and exam countdowns."]]],
];
```

## 7. `components/StudyApp.tsx` (new)

```tsx
"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, type ReactNode } from "react";
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
};
const SdIc = ({ k, s = 26 }: { k: string; s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{SD_IC[k]}</svg>
);

const hay = (b: SYItem) => (b.t + " " + b.lvl + " " + b.sub + " " + b.kind + " " + b.board + " " + b.year + " " + SY_CM[b.c][1]).toLowerCase();
const metaOf = (b: SYItem) => [b.lvl, b.sub, b.kind, b.board, b.year || ""].filter(Boolean).join(" · ");
const dkOf = (col: string) => (col === "nonfiction" ? "#1c1c1c" : "#fff");

function useOpen() {
  const { setModal } = useStore();
  return (b: SYItem) => {
    const cm = SY_CM[b.c];
    setModal({ k: "study", t: b.t, meta: metaOf(b), cat: cm[1], list: cm[3] });
  };
}

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
  const stat = (ic: string, l: string, v: string | number, sub: string, bar?: number) => (
    <div className="dsh-stat" key={l}>
      <div className="dsh-sl"><span className="dsh-si"><SdIc k={ic} s={20} /></span><span>{l}</span></div>
      <b>{v}</b><small>{sub}</small>
      {bar != null ? <div className="dsh-bar"><i style={{ width: bar + "%" }} /></div> : null}
    </div>
  );

  return (
    <div className="dsh" onClick={(e) => { if (!(e.target as Element).closest(".dsh-search")) setShow(false); }}>
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
          <button className="dsh-chip" data-go="study-mcq">MCQ Practice</button>
          <button className="dsh-chip" data-go="study-board">Board Questions</button>
          <button className="dsh-chip" data-go="study-mock">Mock Exams</button>
          <button className="dsh-chip" data-go="study-plan">Study Planner</button>
        </div>
      </header>

      <section className="dsh-sec">
        <div className="dsh-sh"><h2>Continue Studying</h2><p>Your recent subjects and ongoing courses.</p></div>
        <div className="dsh-grid">
          {U.recent.map((r) => (
            <button className="dsh-card dsh-cont" key={r[1]} data-go={"study-" + r[3]}>
              <span className="dsh-tag">{r[0]}</span>
              <h3>{r[1]}</h3>
              <p>{r[2]}</p>
              <div className="dsh-bar" role="progressbar" aria-valuenow={r[4]} aria-valuemin={0} aria-valuemax={100}><i style={{ width: r[4] + "%" }} /></div>
              <span className="dsh-pc"><b>{r[4]}% complete</b><span className="dsh-ex">Resume <i>→</i></span></span>
            </button>
          ))}
        </div>
      </section>

      {SD_SECS.map((s) => (
        <section className="dsh-sec" key={s[0]}>
          <div className="dsh-sh"><h2>{s[0]}</h2><p>{s[1]}</p></div>
          <div className="dsh-grid">
            {s[3].map((c) => {
              const col = SY_COLS[s[2]];
              return (
                <button className="dsh-card" key={c[0]} data-go={"study-" + c[0]}>
                  <span className="dsh-ic" style={{ background: COL[col], color: dkOf(col) }}><SdIc k={c[0]} /></span>
                  <h3>{c[1]}</h3><p>{c[2]}</p><span className="dsh-ex">Explore <i>→</i></span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <section className="dsh-sec">
        <div className="dsh-sh"><h2>Personal Progress</h2><p>How you are doing this week.</p></div>
        <div className="dsh-stats">
          {stat("ok", "Completed exams", U.done, U.doneWeek + " this week")}
          {stat("target", "Practice accuracy", U.acc + "%", "Correct answers in MCQ practice", U.acc)}
          {stat("clock", "Study time", U.time, "This week")}
          {stat("trend", "Learning progress", U.prog + "%", "Across your current courses", U.prog)}
          <div className="dsh-stat dsh-week">
            <div className="dsh-sl"><span className="dsh-si"><SdIc k="clock" s={20} /></span><span>Study time by day</span></div>
            <div className="dsh-bars">
              {U.week.map((d) => <div key={d[0]}><i style={{ height: Math.round(d[1] * 20) + "px" }} title={d[1] + " hours"} /><em>{d[0]}</em></div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- list of resources (#study-xxx) ---------- */
function ListView({ id, q0, onUsed }: { id: string; q0: string; onUsed: () => void }) {
  const open = useOpen();
  const [lvl, setLvl] = useState<string[]>([]);
  const [kind, setKind] = useState<string[]>([]);
  const [qraw, setQraw] = useState(q0);
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

  const chip = (k: "lvl" | "kind", v: string) => {
    const arr = k === "lvl" ? lvl : kind, set = k === "lvl" ? setLvl : setKind;
    const n = res(k).filter((b) => b[k] === v).length;
    return <button key={k + v} className={"dsh-chip" + (arr.includes(v) ? " on" : "")} onClick={() => tg(arr, set, v)}>{v} <b>{n}</b></button>;
  };

  return (
    <div className="dsh resv">
      <header className="dsh-head">
        <div><h1>{ttl}</h1><p>{desc}</p></div>
        <div className="dsh-search">
          <div className="dsh-sbox">
            <Ic d={SH_P.search} />
            <input id="rq" type="search" placeholder="Search by subject, board, type or year" autoComplete="off" aria-label={"Search " + ttl} value={qraw} onChange={(e) => setQraw(e.target.value)} />
          </div>
        </div>
      </header>
      <div className="dsh-pop" id="rchips" hidden={!showChips}>
        {showChips ? <>
          {lvls.length > 1 && lvls.map((v) => chip("lvl", v))}
          {kinds.length > 1 && kinds.map((v) => chip("kind", v))}
          {active && <button className="dsh-chip" onClick={clear}>Clear filters <Ic d={SH_P.x} s={12} /></button>}
        </> : null}
      </div>
      <p className="cnt" id="rcnt"><b>{l.length}</b> free resource{l.length === 1 ? "" : "s"}{active ? " found" : " available"} · nothing here is paid</p>
      <div className="dsh-grid" id="rgrid">
        {l.length ? l.map((b) => {
          const col = SY_COLS[SY_CM[b.c][2]];
          return (
            <button className="dsh-card res-card" key={b.t} onClick={() => open(b)} aria-label={b.t + ", view details"}>
              <span className="dsh-ic" style={{ background: COL[col], color: dkOf(col) }}><SdIc k={b.c} s={24} /></span>
              <h3>{b.t}</h3><p>{metaOf(b)}</p><span className="dsh-ex">Open <i>→</i></span>
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
```

## 8. `app/study/page.tsx` (new)

```tsx
import type { Metadata } from "next";
import StudyApp from "@/components/StudyApp";

export const metadata: Metadata = { title: "Study | Books for All" };

export default function StudyPage() {
  return <StudyApp />;
}
```

## Notes

- **Routes:** `/study` is the dashboard and `/study#study-mcq` (or `study-all`, `study-uni` and so on) is a resource list, same as the old hash links. The navbar "Study" link, the popular chips and the cards all work from either view.
- **Search box:** typing shows up to 6 hits. Enter or "See all" opens `#study-all` with your search text filled in. Escape closes the dropdown.
- **Resource popup:** clicking a result opens the "Free for every student" popup from step 3, with the same text and "Ask our team" button.
- **Filters:** the Level and Type chips and "Clear filters" behave as before, and filters reset each time you open a list.
- **Shop page:** `ShopApp.tsx` keeps its own copy of the icon and empty-shelf art, so it needs no change.