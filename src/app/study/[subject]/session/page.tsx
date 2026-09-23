import type { Metadata } from "next";
import { SessionPlayer } from "@/components/study/session-player";
import { subjects } from "@/lib/learning";

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params;
  const name = subjects.find((s) => s.id === subject)?.name ?? "Subject";
  return { title: `${name} session — Dojolom` };
}

export default async function SessionPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SessionPlayer subject={subject} />;
}
