"use client";
import type { FormEvent, MouseEvent } from "react";
import Logo from "./Logo";
import { useStore } from "./StoreContext";

const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const soc = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true } as const;

const EXPLORE: [string, string, string][] = [["go", "shop", "Shop"], ["go", "free", "Free Books"], ["go", "ebooks", "E-Books"], ["go", "study", "Study"], ["go", "about", "About us"], ["go", "team", "Team"], ["act", "signup", "Sign up"]];
const SHELVES: [string, string, string, string][] = [["classic", "Classic", "#fd7b2e", ""], ["modern", "Modern Art", "#2a4577", ""], ["nonfiction", "Nonfiction", "#fbbc58", ""], ["combo", "Combos", "#1c1c1c", ""], ["all", "All books", "transparent", ""]];
const INVOLVED: [string, string][] = [["sell", "Post your old books"], ["donate", "Donate books"], ["coach", "Admission coaching"], ["join", "Join the team"]];

export default function Footer() {
  const { say } = useStore();

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const em = (f.elements.namedItem("em") as HTMLInputElement).value.trim();
    f.reset();
    say("You’re in! New arrivals will reach " + em);
  };
  const flip = (e: MouseEvent) => {
    const l = (e.target as HTMLElement).closest("span") as HTMLElement | null; if (!l) return;
    l.classList.remove("flip"); void l.offsetWidth; l.classList.add("flip");
    l.addEventListener("animationend", () => l.classList.remove("flip"), { once: true });
  };

  return (
    <footer className="ft" id="footer">
      <div className="ft-cta">
        <div><small>STAY IN THE LOOP</small><h2>Every book<br />deserves a <em>second</em> reader.</h2></div>
        <div>
          <p>Get new arrivals, limited-time offers and combo deals in your inbox. No spam, just good books.</p>
          <form className="ft-form" id="nlf" onSubmit={subscribe}>
            <input name="em" type="email" placeholder="Your email address" aria-label="Email address" autoComplete="email" required />
            <button type="submit">Subscribe <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </form>
          <div className="ft-note">One email a week at most. Unsubscribe any time.</div>
        </div>
      </div>

      <div className="ft-trust">
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 10v.01M18 14v.01" /></svg></span><div><b>Cash on delivery</b><span>Pay when your books reach your door.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg></span><div><b>Delivery across Bangladesh</b><span>Usually 2–4 days.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg></span><div><b>7-day returns</b><span>If a book is not as described.</span></div></div>
        <div className="ft-ti"><span className="ft-ic"><svg {...ico}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg></span><div><b>Packed with care</b><span>Wrapped in paper, with a protective sleeve.</span></div></div>
      </div>

      <div className="ft-main">
        <div className="ft-brand">
          <button className="ft-logo" data-go="home" aria-label="Purono, home"><Logo mono className="ft-mk" width={86} height={60} aria-hidden="true" /><span>Purono</span></button>
          <p>A small shop where people sell, donate and buy old books, from school textbooks to admission guides and general reading.</p>
          <div className="ft-soc">
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook"><svg {...soc} fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.5 3.5 10.5 6.2v2.3H8v3.3h2.5V22H14v-10.2h2.6l.4-3.3z" /></svg></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" /></svg></a>
            <a href="https://wa.me/" target="_blank" rel="noopener" aria-label="WhatsApp"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" /><path d="M9 9.5c.3 2 2 3.8 4.5 4.5l1.3-1.3 1.7.8c-.2 1-1 1.7-2 1.7-3.3 0-6.5-3.2-6.5-6.5 0-1 .7-1.8 1.7-2l.8 1.7z" strokeWidth="1.4" /></svg></a>
            <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg></a>
          </div>
          <div className="ft-loc"><svg {...soc} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg><span id="ftcity">Dhaka, Bangladesh</span></div>
        </div>

        <nav className="ft-col" aria-label="Explore"><h3>Explore</h3><ul>
          {EXPLORE.map(([a, v, t]) => <li key={v}><button className="ft-lk" {...{ ["data-" + a]: v }}>{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Shelves"><h3>Shelves</h3><ul>
          {SHELVES.map(([c, t, col]) => <li key={c}><button className="ft-lk" data-cat={c}><i className="ft-dot" style={{ background: col }} />{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Get involved"><h3>Get involved</h3><ul>
          {INVOLVED.map(([a, t]) => <li key={a}><button className="ft-lk" data-act={a}>{t}</button></li>)}
        </ul></nav>

        <nav className="ft-col" aria-label="Help"><h3>Help</h3><ul>
          <li><button className="ft-lk" data-act="msg" data-n="our team" data-t="our team">Message our team</button></li>
          <li><button className="ft-lk" data-act="cart">Your cart</button></li>
          <li><button className="ft-lk" data-act="search">Search books</button></li>
        </ul></nav>
      </div>

      <div className="ft-mark" aria-hidden="true" onClick={flip}>
        <div><span>P</span><span>U</span><span>R</span><span>O</span><span>N</span><span>O</span></div>
      </div>

      <div className="ft-bot">
        <div>© 2026 Purono · Old books, singles and combos</div>
        <div className="ft-r">
          <span>Made with <span className="ft-heart" aria-label="love">♥</span> in Dhaka</span>
          <button className="ft-top" data-act="top">Back to top <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg></button>
        </div>
      </div>
    </footer>
  );
}
