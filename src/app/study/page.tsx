import type { Metadata } from "next";
import { StudyDashboard } from "@/components/study/dashboard";

export const metadata: Metadata = { title: "My study — Dojolom" };

export default function StudyPage() {
  return <StudyDashboard />;
}
