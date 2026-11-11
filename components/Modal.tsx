"use client";
import type { FormEvent, ReactNode } from "react";
import { useBooks, useStore } from "./StoreContext";
import { CUR, price } from "@/lib/data";

type F = { n: string; ph?: string; type?: string; ac?: string; req?: boolean; min?: number; minLen?: number; rows?: number; opts?: string[]; def?: string; label?: string };
const first = (s: string) => s.trim().split(" ")[0];

function Form({ id, title, intro, fields, btn, done }: {
  id: string; title: string; intro?: string; fields: F[]; btn: string; done: (v: Record<string, string>) => void;
}) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((x, k) => { v[k] = String(x); });
    done(v);
  };
  return (
    <>
      <h2>{title}</h2>
      {intro && <p style={{ marginBottom: 8 }}>{intro}</p>}
      <form id={id} onSubmit={onSubmit}>
        {fields.map((f, i) =>
          f.opts ? (
            <select key={f.n} className="fi" name={f.n} aria-label={f.label} defaultValue={f.def}>
              {f.opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : f.rows ? (
            <textarea key={f.n} className="fi" name={f.n} rows={f.rows} placeholder={f.ph} required={f.req} autoFocus={i === 0} />
          ) : (
            <input key={f.n} className="fi" name={f.n} type={f.type} placeholder={f.ph} required={f.req}
              autoComplete={f.ac} min={f.min} minLength={f.minLen} autoFocus={i === 0} />
          ),
        )}
        <button className="sub">{btn}</button>
      </form>
    </>
  );
}

export default function Modal() {
  const { modal, setModal, items, user, remove, placeOrder, login, logout, say, search } = useStore();
  const { books } = useBooks();
  const close = () => setModal(null);
  let body: ReactNode = null;

  if (modal) {
    switch (modal.k) {
      case "cart":
        if (!items.length) {
          body = (<><h2>Your cart</h2><p style={{ marginBottom: 10 }}>Your cart is empty. Add some books first.</p><button className="sub" data-go="shop">Browse books</button></>);
        } else {
          const total = items.reduce((t, i) => t + books[i].p, 0);
          body = (
            <>
              <h2>Your cart</h2>
              {items.map((i, k) => (
                <div className="crow" key={k}>
                  <span>{books[i].t}{books[i].items && <>{" "}<small>(combo)</small></>}</span>
                  <b>{price(books[i])}</b>
                  <button className="rm" aria-label="Remove" onClick={() => remove(k)}>×</button>
                </div>
              ))}
              <div className="crow tot"><span>Total</span><b>{CUR + total}</b></div>
              <button className="sub" onClick={() => setModal({ k: "checkout" })}>Checkout</button>
            </>
          );
        }
        break;
      case "checkout":
        body = <Form id="of" title="Checkout" btn="Place order"
          fields={[{ n: "nm", ph: "Full name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" }, { n: "ad", rows: 3, ph: "Delivery address", req: true }]}
          done={(v) => { placeOrder(); close(); say("Order request received, " + first(v.nm) + "!"); }} />;
        break;
      case "search":
        body = <Form id="sf" title="Search" btn="Search" fields={[{ n: "q", ph: "Search books or authors", ac: "off" }]}
          done={(v) => { close(); search(v.q); }} />;
        break;
      case "signup":
        body = user ? (
          <><h2>Your account</h2><p style={{ marginBottom: 10 }}>Signed in as {user}.</p>
            <button className="sub" onClick={() => { logout(); close(); say("Logged out"); }}>Log out</button></>
        ) : (
          <Form id="su" title="Sign up" btn="Create account"
            fields={[{ n: "nm", ph: "Full name", req: true, ac: "name" }, { n: "em", type: "email", ph: "Email", req: true, ac: "email" }, { n: "pw", type: "password", ph: "Password (6+ characters)", minLen: 6, req: true, ac: "new-password" }]}
            done={(v) => { const n = v.nm.trim(); login(n); close(); say("Welcome, " + n + "!"); }} />
        );
        break;
      case "join":
        body = <Form id="joinf" title="Join the team" intro="Tell us how you would like to help and we will get in touch." btn="Send"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "rl", opts: ["Volunteer reader", "Campus ambassador", "Collection partner", "Something else"], label: "How you would like to help" },
            { n: "ms", rows: 3, ph: "A few words about you (optional)" }]}
          done={(v) => { close(); say("Thanks, " + first(v.nm) + "! We will be in touch"); }} />;
        break;
      case "coach":
        body = <Form id="coachf" title="Admission coaching" intro="Tell us what you are preparing for and our team will get in touch." btn="Send request"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "lv", opts: ["School admission", "College admission", "University admission", "Medical or engineering admission", "Other"], def: "University admission", label: "Level" },
            { n: "ms", rows: 3, ph: "Anything we should know? (optional)" }]}
          done={(v) => { close(); say("Thanks, " + first(v.nm) + "! We got your coaching request"); }} />;
        break;
      case "donate":
        body = <Form id="donf" title="Donate books" intro="Tell us what you would like to give and we will get in touch." btn="Submit donation"
          fields={[{ n: "nm", ph: "Your name", req: true, ac: "name" }, { n: "ph", type: "tel", ph: "Phone number", req: true, ac: "tel" },
            { n: "ar", ph: "Your area or city", req: true }, { n: "bk", rows: 3, ph: "Which books would you like to donate?", req: true }]}
          done={(v) => { close(); say("Thank you, " + first(v.nm) + "! We got your donation details"); }} />;
        break;
      case "sell":
        body = <Form id="sellf" title="Post your old book" intro="Tell us about the book you want to sell." btn="Submit book"
          fields={[{ n: "t", ph: "Book title", req: true }, { n: "a", ph: "Author" },
            { n: "c", opts: ["Like new", "Good", "Fair"], def: "Good", label: "Condition" },
            { n: "p", type: "number", min: 0, ph: "Your price (৳)", req: true }, { n: "ct", ph: "Your phone or email", req: true }]}
          done={(v) => { close(); say("Thanks! We got the details for “" + v.t.trim() + "”"); }} />;
        break;
      case "msg": {
        const { n, t } = modal;
        body = <Form id="mf" title={"Message " + (t || n.split(" ")[0])} btn="Send"
          fields={[{ n: "m", rows: 4, ph: "Your message", req: true }]}
          done={() => { close(); say("Message sent to " + n); }} />;
        break;
      }
    }
  }

  return (
    <div id="modal" hidden={!modal} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="mbox">
        <button className="mx" aria-label="Close" onClick={close}>×</button>
        <div id="mc">{body}</div>
      </div>
    </div>
  );
}
