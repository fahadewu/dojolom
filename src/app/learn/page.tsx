import type { Metadata } from "next";
import { ChatApp } from "@/components/chat/chat-app";

export const metadata: Metadata = {
  title: "Dojolom — your tutor",
  description: "Learn anything by talking it through with an AI tutor that remembers what you know.",
};

export default function LearnPage() {
  return <ChatApp />;
}
