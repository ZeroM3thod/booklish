import type { Metadata } from "next";
import InnerShell from "@/components/InnerShell";
import { BOOKS, COL, STORE } from "@/lib/data";

export const metadata: Metadata = { title: "Team | Books for All" };

const T: [string, string, string, string[], string, number][] = [
  ["Alina Rahman", "Head curator", "Decides what goes on our shelves and checks every book’s condition before it is listed.", ["Curation", "Condition grading", "Classics"], "classic", 3],
  ["Marcus Lee", "Classics specialist", "Knows the old favourites inside out and helps first-time readers find an easy way in.", ["Classics", "First-time readers"], "modern", 2],
  ["Sofia Alvarez", "Art book editor", "Looks after the modern art shelf and writes the notes that help you compare books.", ["Modern art", "Illustrated books"], "nonfiction", 4],
  ["Tariq Hossain", "Nonfiction advisor", "Helps self-learners pick practical reads on habits, thinking and everyday change.", ["Nonfiction", "Study habits"], "combo", 8],
  ["Nusrat Jahan", "Admission coaching lead", "Guides students on which books to study and how to get ready for admission.", ["Admission coaching", "Study material"], "classic", 10],
  ["Imran Khan", "Donations coordinator", "Looks after book donations and makes sure they reach students who need them.", ["Donations", "Students"], "modern", 11],
];
const D = [
  ["8 years", "English, Bangla", "Condition and grading questions", "Sat–Thu, 10 am – 6 pm"],
  ["6 years", "English, Bangla", "Finding a first classic", "Sat–Thu, 12 – 8 pm"],
  ["5 years", "English, Spanish, Bangla", "Choosing art and illustrated books", "Sun–Thu, 10 am – 5 pm"],
  ["7 years", "English, Bangla", "Practical nonfiction picks", "Sat–Wed, 11 am – 7 pm"],
  ["9 years", "English, Bangla", "Admission preparation advice", "Sat–Thu, 9 am – 5 pm"],
  ["4 years", "English, Bangla", "Donation pickups and questions", "Sat–Thu, 10 am – 6 pm"],
];
const DL = ["Experience", "Speaks", "Ask about", "Available"];
const dk = (c: string) => (c === "nonfiction" ? "#1c1c1c" : "#fff");
const ini = (n: string) => n.split(" ").map((w) => w[0]).join("");
const pr = [
  ["01", "Collect", "Books come to us from sellers and donors who want their books to be read again."],
  ["02", "Check", "We look through the cover, spine and pages of every single book."],
  ["03", "Grade", "Each book gets an honest grade: Fair, Good or Like new."],
  ["04", "Pack", STORE.pack + "."],
];
const know = [
  ["01", "Delivery", STORE.delivery + "."],
  ["02", "Payment", STORE.pay + "."],
  ["03", "Returns", STORE.ret + "."],
  ["04", "Packing", STORE.pack + "."],
];

export default function TeamPage() {
  return (
    <InnerShell>
      <div className="tmpage">
        <section className="abhero">
          <div className="abt">
            <div className="abey">TEAM</div>
            <h1 className="abh1">People who<br />love books.</h1>
            <p className="abp">We are a small team of readers, curators and mentors. We pick, check and grade every book, and we help students find the right ones for school, college and admission.</p>
            <div className="abrow">
              <button className="sub abbtn" data-act="msg" data-n="our team" data-t="our team">Message the team</button>
              <button className="lnk" data-act="join">Join us</button>
            </div>
          </div>
          <div className="tmcl" aria-hidden="true">
            {T.slice(0, 4).map((m) => (
              <div className="tmav" key={m[0]} style={{ backgroundColor: COL[m[4]], color: dk(m[4]) }}>{ini(m[0])}</div>
            ))}
          </div>
        </section>

        <section className="abstats">
          <div><b>{T.length}</b><span>people on the team</span></div>
          <div><b>3</b><span>book shelves we look after</span></div>
          <div><b>3</b><span>honest condition grades</span></div>
          <div><b>2–4</b><span>days delivery across Bangladesh</span></div>
        </section>

        <section className="absec">
          <div className="abeyb">MEET THE TEAM</div>
          <h2 className="abh2">The people behind<br />every shelf</h2>
          <div className="tmgrid">
            {T.map((m, k) => {
              const bk = BOOKS[m[5]];
              return (
                <article className="tmc" key={m[0]} style={{ animationDelay: k * 70 + "ms" }}>
                  <div className="tmp" style={{ backgroundColor: COL[m[4]], color: dk(m[4]) }}>
                    <span className="cb">{m[1].toUpperCase()}</span>
                    <b>{ini(m[0])}</b>
                  </div>
                  <div className="tmb">
                    <div className="tmn">{m[0]}</div>
                    <div className="tmr">{m[1]}</div>
                    <p className="tmbio">{m[2]}</p>
                    <dl className="tmd">
                      {D[k].map((v, j) => (
                        <div key={DL[j]}><dt>{DL[j]}</dt><dd>{v}</dd></div>
                      ))}
                    </dl>
                    <div className="tmtags">{m[3].map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                    <button className="inc tmpick" data-go={"book-" + m[5]}>
                      <span className="mini" style={{ backgroundColor: COL[bk.c], color: dk(bk.c) }}>{bk.t}</span>
                      <span><small>STAFF PICK</small><br /><b>{bk.t}</b><br />{bk.a}</span>
                    </button>
                    <button className="lnk" data-act="msg" data-n={m[0]}>Message {m[0].split(" ")[0]}</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="absec">
          <div className="abeyb">HOW WE WORK</div>
          <h2 className="abh2">Every book goes through<br />the same four steps</h2>
          <div className="abvals">
            {pr.map((v, k) => (
              <div className="abv" key={v[0]} style={{ animationDelay: k * 70 + "ms" }}>
                <i>{v[0]}</i><h4>{v[1]}</h4><p>{v[2]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="absec">
          <div className="abeyb">GOOD TO KNOW</div>
          <h2 className="abh2">How we look after<br />every order</h2>
          <div className="abvals">
            {know.map((v, k) => (
              <div className="abv" key={v[0]} style={{ animationDelay: k * 70 + "ms" }}>
                <i>{v[0]}</i><h4>{v[1]}</h4><p>{v[2]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="absec">
          <div className="abfeat" style={{ backgroundColor: COL.classic, color: "#fff" }}>
            <div>
              <div className="abeyb">JOIN THE TEAM</div>
              <h2>Love books? Help us pass them on.</h2>
              <p>We are always happy to hear from readers, students and volunteers who want to help old books find new homes.</p>
              <button className="abw" data-act="join">Get in touch</button>
            </div>
            <ul className="abl">
              {["Volunteer reader: help check and grade books", "Campus ambassador: spread the word at your school or college", "Collection partner: help gather donated books", "Something else? Tell us how you’d like to help"].map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        <section className="abcta">
          <h2>Got a question for the team?</h2>
          <div className="abrow">
            <button className="sub abbtn" data-act="msg" data-n="our team" data-t="our team">Message our team</button>
            <button className="lnk" data-go="shop">Browse books</button>
          </div>
        </section>
      </div>
    </InnerShell>
  );
}
