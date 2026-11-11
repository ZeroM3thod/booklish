import type { Metadata } from "next";
import FreeBooks from "@/components/FreeBooks";

export const metadata: Metadata = { title: "Free Books | Books for All" };

export default function FreeBooksPage() {
  return <FreeBooks />;
}
