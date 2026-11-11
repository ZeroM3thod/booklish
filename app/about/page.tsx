import type { Metadata } from "next";
import InnerShell from "@/components/InnerShell";
import { BOOKS, COL, STORE } from "@/lib/data";

export const metadata: Metadata = { title: "About us | Books for All" };

const Star = () => (
  <span className="bdg">
    <svg width="28" height="28" viewBox="-22 -22 44 44" aria-hidden="true">
      <path d="M0,-20 Q2.5,-2.5 20,0 Q2.5,2.5 0,20 Q-2.5,2.5 -20,0 Q-2.5,-2.5 0,-20Z" fill="#1c1c1c" />
    </svg>
  </span>
);
const Li = ({ a }: { a: string[] }) => (
  <ul className="abl">{a.map((t) => <li key={t}>{t}</li>)}</ul>
);
const Steps = ({ a }: { a: [string, string][] }) => (
  <ol className="abstp">
    {a.map((t, k) => (
      <li key={t[0]}><span className="abn">{k + 1}</span><span><b>{t[0]}</b><br />{t[1]}</span></li>
    ))}
  </ol>
);

/* [tag, title, text, button label, "go" | "act", target] */
const offers: [string, string, string, string, string, string][] = [
  ["BOOKS", "Old books, sell and buy", "Post the books you have finished, or pick up pre-loved ones at friendly prices.", "Browse books", "go", "shop"],
  ["EDUCATION", "Academic and educational books", "School, college and university books, admission guides, reference and exam preparation, all in one place.", "Browse books", "go", "shop"],
  ["COACHING", "Admission coaching", "Guidance and preparation support to help students get ready for admission.", "Ask about coaching", "act", "coach"],
  ["DONATE", "Book donation", "Give the books you no longer need to students who need them.", "Donate books", "act", "donate"],
  ["BUNDLES", "Combos and bundles", "Study sets and reading bundles at a lower price than buying one by one.", "Browse books", "go", "shop"],
  ["GUIDANCE", "Help choosing a book", "Not sure what to pick? Our team of professionals will help you make up your mind.", "Meet the team", "go", "team"],
];
const lv = ["School books", "SSC and HSC", "College books", "University books", "Admission test guides", "Medical and engineering", "Competitive exams", "Language and IELTS", "Reference and notes", "Novels and general reading", "Art and hobby books"];
const vals = [
  ["01", "Fair prices", "Pre-loved books cost far less than new ones, and combo deals save even more."],
  ["02", "Honest condition", "Every book has a clear grade and detailed notes, so there are no surprises."],
  ["03", "Made for students", "Textbooks, guides and reading that students and curious readers actually need."],
  ["04", "A second life", "Books that are already printed get read again instead of sitting on a shelf."],
];

export default function AboutPage() {
  const sg = BOOKS.filter((b) => !b.items).length;
  const cm = BOOKS.filter((b) => b.items).length;

  return (
    <InnerShell>
      <section className="abhero">
        <div className="abt">
          <div className="abey">ABOUT US</div>
          <h1 className="abh1">Old books,<br />new readers.</h1>
          <p className="abp">Books for All is a small shop in {STORE.city.split(",")[0]} where people sell, donate and buy old books, from school and college textbooks to admission guides and general reading. We also offer admission coaching, so students find the right books and the right guidance in one place.</p>
          <div className="abrow">
            <button className="sub abbtn" data-act="sell">Post your old books</button>
            <button className="lnk" data-go="shop">Browse books</button>
          </div>
        </div>
        <div className="abk" aria-hidden="true">
          <div className="cover" style={{ backgroundColor: COL.classic }}>Classic</div>
          <div className="cover" style={{ backgroundColor: COL.modern }}>Modern Art</div>
          <div className="cover" style={{ backgroundColor: COL.nonfiction, color: "#1c1c1c" }}>Non{"\u00AD"}fiction</div>
        </div>
      </section>

      <section className="abstats">
        <div><b>{sg}</b><span>single books on the shelf</span></div>
        <div><b>{cm}</b><span>combo deals to save more</span></div>
        <div><b>2–4</b><span>days delivery across Bangladesh</span></div>
        <div><b>7</b><span>days to return a book</span></div>
      </section>

      <section className="absec">
        <div className="abeyb">WHAT WE OFFER</div>
        <h2 className="abh2">Books, coaching<br />and a way to give back</h2>
        <div className="abof abvals">
          {offers.map((o, k) => (
            <div className="abv" key={o[0]} style={{ animationDelay: k * 60 + "ms" }}>
              <i>{o[0]}</i><h4>{o[1]}</h4><p>{o[2]}</p>
              <button className="lnk" {...{ ["data-" + o[4]]: o[5] }}>{o[3]}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="absec">
        <div className="abeyb">EVERY TYPE OF EDUCATIONAL BOOK</div>
        <h2 className="abh2">For every class,<br />every course, every reader</h2>
        <div className="abchips">{lv.map((t) => <span className="abchip" key={t}>{t}</span>)}</div>
      </section>

      <section className="absec">
        <div className="abeyb">TWO WAYS TO USE BOOKS FOR ALL</div>
        <h2 className="abh2">Sell what you’ve read.<br />Buy what you need.</h2>
        <div className="abtwo">
          <article className="abc" style={{ backgroundColor: COL.classic, color: "#fff" }}>
            <Star />
            <h3>For sellers</h3>
            <p className="abcl">Got finished books gathering dust? Post them here and pass them on to someone who will read them.</p>
            <Li a={["Tell us the title, author, condition and your price", "Pick an honest grade: Fair, Good or Like new", "Sell a book on its own or bundle several into a combo", "Your book goes to a reader who will really use it"]} />
            <button className="abw" data-act="sell">Post a book</button>
          </article>
          <article className="abc" style={{ backgroundColor: COL.nonfiction, color: "#1c1c1c" }}>
            <Star />
            <h3>For readers</h3>
            <p className="abcl">Students and book lovers, find great reads for less and know exactly what you are getting.</p>
            <Li a={["Academic, college and general books at pre-loved prices", "Every book shows its condition, details and photos", "Combo deals when you want more books for less", "Cash on delivery, with 7 days to return a book that is not as described"]} />
            <button className="abw" data-go="shop">Browse books</button>
          </article>
        </div>
      </section>

      <section className="absec">
        <div className="abfeat" style={{ backgroundColor: COL.nonfiction, color: "#1c1c1c" }}>
          <div>
            <div className="abeyb">ADMISSION COACHING</div>
            <h2>Getting ready for admission?</h2>
            <p>Our team helps students prepare for school, college and university admission, and picks the right books for the job.</p>
            <button className="abw dkb" data-act="coach">Ask about coaching</button>
          </div>
          <Li a={["Help choosing the right books for your exam", "Preparation guidance for school, college and university admission", "Study material matched to your level", "Your questions answered by our team"]} />
        </div>
      </section>

      <section className="absec">
        <div className="abfeat" style={{ backgroundColor: COL.modern, color: "#fff" }}>
          <div>
            <div className="abeyb">BOOK DONATION</div>
            <h2>Donate books, help a student</h2>
            <p>Finished with your books? Don’t let them gather dust. Donate them and help students who can’t afford new ones.</p>
            <button className="abw" data-act="donate">Donate books</button>
          </div>
          <Li a={["School, college and university books are all welcome", "Story books and general reading too", "Tell us what you have and we’ll get in touch", "Your books go to students who need them"]} />
        </div>
      </section>

      <section className="absec">
        <div className="abeyb">HOW IT WORKS</div>
        <h2 className="abh2">Simple for everyone</h2>
        <div className="abhow">
          <div>
            <h3>If you sell or donate</h3>
            <Steps a={[
              ["Tell us about your books", "Add the title, author, condition and your price, or tell us you want to donate."],
              ["Your book gets listed", "Sold books get their own page with condition details, photos and delivery information."],
              ["A reader gets it", "The book is wrapped in paper with a protective sleeve and sent on its way."],
            ]} />
          </div>
          <div>
            <h3>If you buy</h3>
            <Steps a={[
              ["Find your book", "Search by title or author, or browse Classic, Modern Art and Nonfiction."],
              ["Check the condition", "Read the grade, the details and the photos so you know the exact copy you will receive."],
              ["Order and relax", "Pay cash on delivery. " + STORE.delivery + "."],
            ]} />
          </div>
        </div>
      </section>

      <section className="absec">
        <div className="abeyb">WHY BOOKS FOR ALL</div>
        <h2 className="abh2">Good books, honest deals</h2>
        <div className="abvals">
          {vals.map((v, k) => (
            <div className="abv" key={v[0]} style={{ animationDelay: k * 70 + "ms" }}>
              <i>{v[0]}</i><h4>{v[1]}</h4><p>{v[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="abband">
        <div className="abeyb">OUR IDEA</div>
        <h2>Regular reading helps you formulate your own thoughts.</h2>
        <p>That is why we keep good books affordable and easy to pass on. When one reader finishes a book, the next reader should be able to pick it up without paying a fortune.</p>
        <button className="abw" data-go="shop">Start reading</button>
      </section>

      <section className="abcta">
        <h2>Ready to give a book a second life?</h2>
        <div className="abrow">
          <button className="sub abbtn" data-act="sell">Post your old books</button>
          <button className="lnk" data-act="donate">Donate books</button>
          <button className="lnk" data-go="shop">Browse books</button>
        </div>
      </section>
    </InnerShell>
  );
}
