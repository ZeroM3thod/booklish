export type Book = {
  t: string; a: string; c: string; p: number; old?: number; cond: string; items?: number[];
};
export type Deal = { p: number; end: string };
export type LiveBook = Book & { reg: number; dl: Deal | null };

export const CUR = "৳";
export const COL: Record<string, string> = {
  classic: "#fd7b2e", modern: "#2a4577", nonfiction: "#fbbc58", combo: "#1c1c1c",
};

export const BOOKS: Book[] = [
  { t: "Pride and Prejudice", a: "Jane Austen", c: "classic", p: 220, cond: "Good" },
  { t: "Great Expectations", a: "Charles Dickens", c: "classic", p: 260, cond: "Fair" },
  { t: "Moby-Dick", a: "Herman Melville", c: "classic", p: 280, cond: "Good" },
  { t: "Jane Eyre", a: "Charlotte Brontë", c: "classic", p: 240, cond: "Like new" },
  { t: "Shapes of Now", a: "Lena Ortiz", c: "modern", p: 520, cond: "Like new" },
  { t: "Colour in Motion", a: "Daniel Reyes", c: "modern", p: 580, cond: "Good" },
  { t: "The Bold Line", a: "Mira Kapoor", c: "modern", p: 480, cond: "Good" },
  { t: "Gallery Without Walls", a: "Tom Hale", c: "modern", p: 540, cond: "Fair" },
  { t: "Deep Habits", a: "Sara Quinn", c: "nonfiction", p: 320, cond: "Like new" },
  { t: "The Quiet Economy", a: "Omar Siddiq", c: "nonfiction", p: 350, cond: "Good" },
  { t: "Mapping the Mind", a: "Priya Nair", c: "nonfiction", p: 380, cond: "Good" },
  { t: "Small Steps", a: "Ben Carter", c: "nonfiction", p: 290, cond: "Fair" },
  { t: "Classic Starter Combo", a: "3 books", c: "combo", p: 620, old: 740, cond: "Mixed condition", items: [0, 2, 3] },
  { t: "Art Lover Pack", a: "3 books", c: "combo", p: 1290, old: 1580, cond: "Mixed condition", items: [4, 5, 6] },
  { t: "Think Better Bundle", a: "3 books", c: "combo", p: 820, old: 990, cond: "Mixed condition", items: [8, 10, 11] },
  { t: "Treasure Island", a: "Robert Louis Stevenson", c: "classic", p: 0, cond: "Good" },
  { t: "The Time Machine", a: "H. G. Wells", c: "classic", p: 0, cond: "Fair" },
  { t: "Walden", a: "Henry David Thoreau", c: "nonfiction", p: 0, cond: "Good" },
  { t: "The Jungle Book", a: "Rudyard Kipling", c: "classic", p: 0, cond: "Good" },
  { t: "Little Women", a: "Louisa May Alcott", c: "classic", p: 0, cond: "Fair" },
  { t: "Meditations", a: "Marcus Aurelius", c: "nonfiction", p: 0, cond: "Like new" },
];

export const DEALS: Record<number, Deal> = {
  0: { p: 170, end: "2026-11-12T23:59:59+06:00" },
  5: { p: 450, end: "2026-11-15T23:59:59+06:00" },
  8: { p: 250, end: "2026-11-12T23:59:59+06:00" },
  12: { p: 499, end: "2026-11-20T23:59:59+06:00" },
  13: { p: 990, end: "2026-11-30T23:59:59+06:00" },
};

/* where each old .html page lives now; change these when you build the pages */
const ROUTES: Record<string, string> = {
  home: "/", shop: "/shop", free: "/free-books", ebooks: "/ebooks",
  study: "/study", about: "/about", team: "/team",
};
export function targetOf(r: string): string | null {
  if (/^book-\d+$/.test(r)) return "/shop";
  if (/^study-/.test(r)) return "/study";
  return ROUTES[r] ?? null;
}

/* pure version of applyDeals(): pass the current time, get books with live prices */
export function liveBooks(now: number | null): LiveBook[] {
  return BOOKS.map((b, i) => {
    const d = DEALS[i];
    const on = !!d && now !== null && Date.parse(d.end) > now;
    return { ...b, reg: b.p, dl: on ? d : null, p: on ? d.p : b.p };
  });
}
export const price = (b: Book) => (b.p === 0 ? "Free" : CUR + b.p);
export const was = (b: LiveBook) => (b.dl ? b.reg : b.old);

export const STORE = {
  name: "Books for All",
  city: "Dhaka, Bangladesh",
  delivery: "Delivery across Bangladesh, usually 2–4 days",
  pay: "Cash on delivery",
  ret: "Return within 7 days if the book is not as described",
  pack: "Wrapped in paper with a protective sleeve",
};
