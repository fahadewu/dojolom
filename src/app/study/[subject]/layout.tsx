import { subjects } from "@/lib/learning";

/* Every subject page is prerendered, and unknown ids are a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.id }));
}

export default function SubjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
