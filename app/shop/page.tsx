import type { Metadata } from "next";
import ShopApp from "@/components/ShopApp";

export const metadata: Metadata = { title: "Shop | Books for All" };

export default function ShopPage() {
  return <ShopApp />;
}
