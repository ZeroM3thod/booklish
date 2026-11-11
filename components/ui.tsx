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
