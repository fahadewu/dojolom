import type { Metadata } from "next";
import { StudySettings } from "@/components/study/settings";

export const metadata: Metadata = { title: "Study settings — Dojolom" };

export default function SettingsPage() {
  return <StudySettings />;
}
