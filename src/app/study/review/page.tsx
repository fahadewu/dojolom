import type { Metadata } from "next";
import { ReviewSession } from "@/components/study/review-session";

export const metadata: Metadata = { title: "Catch-up review — Dojolom" };

export default function ReviewPage() {
  return <ReviewSession />;
}
