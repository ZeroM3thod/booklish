"use client";
import { useBooks } from "./StoreContext";

export default function Countdown({ end, id }: { end: string; id?: string }) {
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
