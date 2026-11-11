import type { Metadata } from "next";
import StudyApp from "@/components/StudyApp";

export const metadata: Metadata = { title: "Study | Books for All" };

export default function StudyPage() {
  return <StudyApp />;
}
