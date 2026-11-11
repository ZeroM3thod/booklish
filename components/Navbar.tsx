"use client";
import Logo from "./Logo";
import { useStore } from "./StoreContext";

const link = (r: string) => ({ "data-go": r, tabIndex: 0, role: "link" });
const label = (user: string | null) => (user ? "Hi, " + user.split(" ")[0] : "Sign up");

const LINKS: [string, string, number, number][] = [
  ["shop", "Shop", 330, 250], ["free", "Free Books", 488, 412], ["ebooks", "E-Books", 699, 623],
  ["study", "Study", 890, 814], ["about", "About us", 1046, 970], ["team", "Team", 1228, 1147],
];

export function NavDesktop() {
  const { user } = useStore();
  return (
    <>
      <Logo className="abs" {...link("home")} aria-label="Home" style={{ left: 112, top: 52 }} width={86} height={60} />
      {LINKS.map(([r, t, left, div]) => (
        <span key={r} style={{ display: "contents" }}>
          <div className="abs vdiv" style={{ left: div }} />
          <div className="abs link" {...link(r)} style={{ left }}>{t}</div>
        </span>
      ))}
      <div className="abs vdiv" style={{ left: 1399 }} />
      <svg className="abs" data-act="search" tabIndex={0} role="button" aria-label="Search" style={{ left: 1451, top: 52 }}
        width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#1c1c1c" strokeWidth="1.6">
        <circle cx="16" cy="16" r="12" /><path d="M25 25l3 3" strokeLinecap="round" />
      </svg>
      <div className="abs vdiv" style={{ left: 1537 }} />
      <div className="abs btn" data-act="signup" tabIndex={0} role="button">{label(user)}</div>
      <div className="abs nav-line" />
    </>
  );
}

export function NavMobile() {
  const { user, menuOpen } = useStore();
  return (
    <nav className={"mnav" + (menuOpen ? " open" : "")} id="mnav">
      <div className="mbar">
        <Logo data-go="home" aria-label="Home" width={52} height={36} />
        <span className="sp" />
        <button className="mi" data-act="search" aria-label="Search">
          <svg width="26" height="26" viewBox="0 0 36 36" fill="none" stroke="#1c1c1c" strokeWidth="2"><circle cx="16" cy="16" r="12" /><path d="M25 25l4 4" strokeLinecap="round" /></svg>
        </button>
        <button className="mbtn" data-act="signup">{label(user)}</button>
        <button className="mi" data-act="menu" aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#1c1c1c" strokeWidth="2.2" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg>
        </button>
      </div>
      <div className="mpanel">
        <button data-go="shop">Shop</button><button data-go="free">Free Books</button><button data-go="ebooks">E-Books</button>
        <button data-go="study">Study</button><button data-go="about">About us</button><button data-go="team">Team</button>
      </div>
    </nav>
  );
}
