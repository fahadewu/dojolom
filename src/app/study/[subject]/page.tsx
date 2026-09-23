import type { Metadata } from "next";
import { SubjectPath } from "@/components/study/subject-path";
import { subjects } from "@/lib/learning";

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params;
  const name = subjects.find((s) => s.id === subject)?.name ?? "Subject";
  return { title: `${name} path — Dojolom` };
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return <SubjectPath subject={subject} />;
}
