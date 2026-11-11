"use client";
import { memo, useEffect, useRef } from "react";
import { setupShelf } from "@/lib/shelf";

type Bk = { px: number; top: number; fill: string; sh: string; face: string; cx: number; cy: number; rot: number; tx: string; txt: string; hit: string; cat?: string; act?: string; aria: string };
const BOOKS: Bk[] = [
  { px: 954, top: 294, fill: "#fd7b2e", sh: "1181,306 1191,328 1015,1330 1001,1330", face: "1053,283 1181,306 1001,1330 873,1307", cx: 1101, cy: 385, rot: -15, tx: "translate(988,1135) rotate(-80)", txt: "CLASSIC", hit: "1053,283 1195,328 1015,1330 873,1307", cat: "classic", aria: "Classic books" },
  { px: 1128, top: 289, fill: "#fbbc58", sh: "1323,298 1333,320 1193,1328 1179,1328", face: "1195,280 1323,298 1179,1328 1050,1310", cx: 1246, cy: 380, rot: -12, tx: "translate(1160,1134) rotate(-82)", txt: "COMBO", hit: "1195,280 1337,320 1193,1328 1050,1310", cat: "combo", aria: "Combo deals" },
  { px: 1302, top: 285, fill: "#2a4577", sh: "1465,292 1475,314 1371,1326 1357,1326", face: "1336,278 1465,292 1357,1326 1227,1313", cx: 1391, cy: 377, rot: -9, tx: "translate(1331,1132) rotate(-84)", txt: "MODERN ART", hit: "1336,278 1479,314 1371,1326 1227,1313", cat: "modern", aria: "Modern Art books" },
  { px: 1477, top: 282, fill: "#fd7b2e", sh: "1607,287 1617,309 1548,1324 1534,1324", face: "1477,278 1607,287 1534,1324 1405,1315", cx: 1536, cy: 374, rot: -6, tx: "translate(1502,1132) rotate(-86)", txt: "ALL BOOKS", hit: "1477,278 1621,309 1548,1324 1405,1315", cat: "all", aria: "All books" },
  { px: 1651, top: 281, fill: "#fbbc58", sh: "1749,283 1759,305 1726,1322 1712,1322", face: "1619,278 1749,283 1712,1322 1582,1318", cx: 1680, cy: 373, rot: -3, tx: "translate(1673,1131) rotate(-88)", txt: "NONFICTION", hit: "1619,278 1763,305 1726,1322 1582,1318", cat: "nonfiction", aria: "Nonfiction books" },
  { px: 1825, top: 280, fill: "#2a4577", sh: "1890,280 1900,302 1904,1320 1890,1320", face: "1760,280 1890,280 1890,1320 1760,1320", cx: 1825, cy: 372, rot: 0, tx: "translate(1844,1130) rotate(-90)", txt: "COACHING", hit: "1760,280 1904,302 1904,1320 1760,1320", act: "coach", aria: "Admission coaching" },
];

function Shelf({ mobile }: { mobile?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => setupShelf(ref.current), []);
  const s = mobile ? "2" : ""; /* mobile copy needs its own filter/star ids, like the old clone */
  const size = mobile ? { viewBox: "888 261 1016 959" } : { width: 1906, height: 1220, viewBox: "0 0 1906 1220" };
  return (
    <svg ref={ref} className={mobile ? "mbooks" : "books"} {...size}>
      <defs>
        <filter id={"grain" + s} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.25" result="speck" />
          <feComposite in="speck" in2="SourceGraphic" operator="in" result="s2" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 0.95" result="dark" />
          <feComposite in="dark" in2="SourceGraphic" operator="in" result="d2" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="s2" /><feMergeNode in="d2" /></feMerge>
        </filter>
        <path id={"star" + s} d="M0,-20 Q2.5,-2.5 20,0 Q2.5,2.5 0,20 Q-2.5,2.5 -20,0 Q-2.5,-2.5 0,-20Z" />
      </defs>
      {BOOKS.map((b) => (
        <g className="bk" data-px={b.px} data-top={b.top} key={b.px}>
          <polygon fill="#000" points={b.sh} />
          <polygon filter={`url(#grain${s})`} fill={b.fill} points={b.face} />
          <circle cx={b.cx} cy={b.cy} r="30" fill="#fff" />
          <use href={`#star${s}`} x={b.cx} y={b.cy} fill="#1c1c1c" transform={`rotate(${b.rot} ${b.cx} ${b.cy})`} />
          <text className="bt" transform={b.tx}>{b.txt}</text>
          <polygon className="hit" points={b.hit} aria-label={b.aria} tabIndex={0} role="button"
            {...(b.act ? { "data-act": b.act } : { "data-cat": b.cat })} />
        </g>
      ))}
    </svg>
  );
}
export default memo(Shelf);
