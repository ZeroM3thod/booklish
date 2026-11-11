import type { Metadata } from "next";
import InnerShell from "@/components/InnerShell";
import { COL } from "@/lib/data";

export const metadata: Metadata = { title: "E-Books | Books for All" };

export default function EbooksPage() {
  return (
    <InnerShell>
      <div className="tmpage">
        <section className="abhero">
          <div className="abt">
            <div className="abey">E-BOOKS</div>
            <h1 className="abh1">Read on any<br />screen.</h1>
            <p className="abp">Digital books for school, college, admission and general reading. Our e-book shelf is on its way.</p>
            <div className="abrow">
              <button className="sub abbtn" data-act="msg" data-n="our team" data-t="our team">Ask about e-books</button>
              <button className="lnk" data-go="shop">Browse printed books</button>
            </div>
          </div>
        </section>
        <section className="absec">
          <div className="abfeat" style={{ backgroundColor: COL.modern, color: "#fff" }}>
            <div>
              <div className="abeyb">COMING SOON</div>
              <h2>E-books are on the way</h2>
              <p>Tell us which titles you would like to read digitally and we will add them first.</p>
              <button className="abw" data-act="msg" data-n="our team" data-t="our team">Request a title</button>
            </div>
          </div>
        </section>
      </div>
    </InnerShell>
  );
}
