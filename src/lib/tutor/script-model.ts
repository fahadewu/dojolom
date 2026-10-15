// ─── A scripted tutor for end-to-end tests ───────────────────────────────────
// Used only when the server runs with DOJOLOM_TUTOR_SCRIPT=1 (Playwright sets it).
// It plays the part the real model plays, deterministically, from the same
// context and conversation: gets to know a newcomer with choices, reviews what
// is due, looks a topic up, teaches it from the checked lesson (or with steps
// when there is none), records it and checks it. The real tutor's judgement is
// not tested here; the plumbing around it is.

import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { stillToFindOut } from "@/lib/tutor/brief";
import { seeInfo, seeWays, toneInfo, tutorTones } from "@/lib/tutor/profile";
import { KICKOFF_TEXT } from "@/lib/tutor/threads";
import type { TutorContext } from "@/lib/tutor/context";

type Msg = { role: string; content: unknown };
type Part = { type?: string; toolName?: string; input?: unknown; output?: unknown; text?: string };
const parts = (m?: Msg): Part[] => (m && Array.isArray(m.content) ? (m.content as Part[]) : []);
const valueOf = (o: unknown): Record<string, unknown> => {
  const v = (o && typeof o === "object" && "value" in (o as object) ? (o as { value: unknown }).value : o) as unknown;
  return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
};

type Move = { text: string; tool?: { name: string; input: unknown } };

const goals = [["Just curious", "curious"], ["School or exams", "school"], ["Work or career", "work"]] as const;

export function scriptedMove(ctx: TutorContext, prompt: Msg[]): Move {
  const last = prompt.at(-1);
  const lastText = parts(last).map((p) => p.text ?? "").join(" ").trim();
  const result = last?.role === "tool" ? parts(last).find((p) => p.type === "tool-result") : undefined;
  const calls = prompt.filter((m) => m.role === "assistant").flatMap(parts).filter((p) => p.type === "tool-call");
  const lastCall = calls.at(-1);
  const out = valueOf(result?.output);

  // The learner answered a choices card: save what it was about, or act on it.
  if (result?.toolName === "choices") {
    const chose = (out.chose as string[] | undefined) ?? [];
    const asked = ((lastCall?.input as { options?: string[] })?.options ?? []).join("|");
    if (asked.includes(seeInfo.pictures.label)) return { text: "Noted.", tool: { name: "saveProfile", input: { seeWays: seeWays.filter((w) => chose.includes(seeInfo[w].label)).slice(0, 2) } } };
    if (asked.includes(toneInfo.calm.label)) return { text: "Noted.", tool: { name: "saveProfile", input: { tone: tutorTones.find((t) => chose.includes(toneInfo[t].label)) ?? "calm" } } };
    if (asked.includes(goals[0][0])) return { text: "Noted.", tool: { name: "saveProfile", input: { goal: goals.find(([l]) => chose.includes(l))?.[1] ?? "curious" } } };
    return { text: "Great. What would you like to learn? Type a topic." };
  }

  // Getting to know a newcomer, one field at a time.
  const missing = stillToFindOut(ctx.learner);
  const opening = last?.role === "user" && lastText === KICKOFF_TEXT;
  const asking = opening || result?.toolName === "saveProfile";
  const needs = (start: string) => missing.some((m) => m.startsWith(start));
  if (asking && needs("how they like")) {
    return { text: "Hi, I'm your AI tutor. How do you like things explained?", tool: { name: "choices", input: { options: seeWays.map((w) => seeInfo[w].label), multi: true } } };
  }
  if (asking && needs("which voice")) return { text: "Which voice should I use?", tool: { name: "choices", input: { options: tutorTones.map((t) => toneInfo[t].label), multi: false } } };
  if (asking && needs("why")) return { text: "What brings you here?", tool: { name: "choices", input: { options: goals.map(([l]) => l), multi: false } } };

  // A returning learner with ideas due: review first.
  if (opening && ctx.memory.due.length) return { text: "Welcome back. A quick one from last time.", tool: { name: "quickCheck", input: { ideaId: ctx.memory.due[0].id } } };
  if (asking) return { text: "What would you like to learn today?" };
  if (result?.toolName === "quickCheck") return { text: out.right ? "Right." : `Not quite: ${String(out.why ?? "")}`, tool: { name: "choices", input: { options: ["Teach me something new", "Another question"], multi: false } } };

  // Teaching: look it up, read it, show it, hear it back, record it, check it.
  if (last?.role === "user") {
    const teaching = calls.findLast((c) => c.toolName === "show" || c.toolName === "steps");
    const recorded = calls.findLast((c) => c.toolName === "learned");
    if (teaching && calls.lastIndexOf(teaching) > (recorded ? calls.lastIndexOf(recorded) : -1)) {
      const input = teaching.input as { ideaId?: string; title?: string; steps?: { label: string; text: string }[] };
      if (teaching.toolName === "show") return { text: "Well put.", tool: { name: "learned", input: { ideaId: input.ideaId } } };
      const own = { title: input.title, topic: input.title, keyPoint: input.steps?.[0]?.text ?? "A key point.", check: { question: `What comes first in ${input.title}?`, options: [input.steps?.[0]?.label ?? "First", "Last", "Neither"], answer: 0, why: "It is the first step." } };
      return { text: "Well put.", tool: { name: "learned", input: { own } } };
    }
    return { text: "Let me look that up.", tool: { name: "lookUp", input: { query: lastText.slice(0, 120) } } };
  }
  if (result?.toolName === "lookUp") {
    const hit = ((out.hits as { kind: string; id: string; checked: boolean }[] | undefined) ?? []).find((h) => h.kind === "idea" && h.checked);
    if (hit) return { text: "", tool: { name: "lesson", input: { ideaId: hit.id } } };
    const topic = String((lastCall?.input as { query?: string })?.query ?? "it").replace(/^teach me( about)?\s*/i, "").slice(0, 60) || "it";
    return { text: "Here it is step by step.", tool: { name: "steps", input: { title: topic, steps: [{ label: "Start", text: `How ${topic} begins.` }, { label: "Then", text: "What happens next." }] } } };
  }
  if (result?.toolName === "lesson") return { text: "Here is the idea.", tool: { name: "show", input: { ideaId: (lastCall?.input as { ideaId?: string })?.ideaId ?? "", as: "picture" } } };
  if (result?.toolName === "show" || result?.toolName === "steps") return { text: "Now explain it back to me in your own words." };
  if (result?.toolName === "learned") return { text: "Saved. A quick check.", tool: { name: "quickCheck", input: { ideaId: String(out.id ?? "") } } };
  return { text: "Go on." };
}

const usage = {
  inputTokens: { total: 1, noCache: 1, cacheRead: undefined, cacheWrite: undefined },
  outputTokens: { total: 1, text: 1, reasoning: undefined },
};

export function scriptedModel(ctx: TutorContext) {
  return new MockLanguageModelV4({
    doStream: async ({ prompt }) => {
      const move = scriptedMove(ctx, prompt as unknown as Msg[]);
      const chunks: unknown[] = [];
      if (move.text) chunks.push({ type: "text-start", id: "t" }, { type: "text-delta", id: "t", delta: move.text }, { type: "text-end", id: "t" });
      if (move.tool) chunks.push({ type: "tool-call", toolCallId: `call-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, toolName: move.tool.name, input: JSON.stringify(move.tool.input) });
      chunks.push({ type: "finish", finishReason: { unified: move.tool ? "tool-calls" : "stop", raw: undefined }, usage });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { stream: simulateReadableStream({ chunks: chunks as any[] }) };
    },
  });
}
