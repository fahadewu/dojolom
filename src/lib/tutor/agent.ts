// ─── The tutor agent (server only: imported by the route, never by a component) ─
// One agent per request: the model, the instructions for this learner, and the
// tools. Lookups run here, inside the turn, so the tutor can read checked
// material before it speaks; every other tool is answered by the learner's
// device, so the turn ends at the first of those.

import { ToolLoopAgent, type LanguageModel } from "ai";
import { subjectById } from "@/lib/study";
import { RULES, learnerBrief, type Resolved } from "@/lib/tutor/brief";
import { chapterText, lessonText, loadConcepts, lookUp, titlesFor } from "@/lib/tutor/catalogue";
import type { TutorContext } from "@/lib/tutor/context";
import { tutorTools } from "@/lib/tutor/tools";

/** AI Gateway model ids (checked against https://ai-gateway.vercel.sh/v1/models on 2026-10-15). */
export const FAST_MODEL = "anthropic/claude-haiku-5.5";
export const STRONG_MODEL = "anthropic/claude-sonnet-5.5";

/** The learner is stuck on an idea: the stronger model. Everything else: the fast one (cost: docs/ai-tutor-rd.md). */
export function modelFor(ctx: TutorContext): string {
  return ctx.strong ? STRONG_MODEL : FAST_MODEL;
}

/** Titles for the ids in the learner's notes, and names for their books: the browser sends ids only. */
export async function resolve(ctx: TutorContext): Promise<Resolved> {
  const ids = [...ctx.memory.due, ...ctx.memory.recent].filter((i) => !i.title).map((i) => i.id).concat(ctx.memory.next.map((n) => n.ideaId));
  const titles = await titlesFor([...new Set(ids)]);
  const books = Object.fromEntries([...ctx.learner.books, ...ctx.memory.next.map((n) => n.book)].map((b) => [b, subjectById(b)?.name ?? ""]).filter(([, n]) => n));
  return { titles, books };
}

const serverTools = {
  lookUp: { ...tutorTools.lookUp, execute: async ({ query }: { query: string }) => ({ hits: (await lookUp(query)).map((h) => ({ kind: h.kind, id: h.id, title: h.title, book: h.book, chapter: h.chapter, checked: h.checked })) }) },
  lesson: {
    ...tutorTools.lesson,
    execute: async ({ ideaId }: { ideaId: string }) => {
      const c = (await loadConcepts([ideaId]))[ideaId];
      return { text: c ? lessonText(c) : `No checked idea "${ideaId}". Use lookUp to find one, or teach from your own knowledge and save it with learned (own).` };
    },
  },
  chapter: { ...tutorTools.chapter, execute: async ({ book, number }: { book: string; number: number }) => ({ text: await chapterText(book, number) }) },
};

export function tutorAgent(ctx: TutorContext, resolved: Resolved, opening: { first: boolean } | null, model?: LanguageModel) {
  return new ToolLoopAgent({
    model: model ?? modelFor(ctx),
    instructions: [
      // The same for every learner and turn: a cache breakpoint after it keeps it (and the tools) cheap to resend.
      { role: "system", content: RULES, providerOptions: { anthropic: { cacheControl: { type: "ephemeral" } } } },
      { role: "system", content: learnerBrief(ctx, resolved, opening) },
    ],
    tools: { ...tutorTools, ...serverTools },
    // Short turns by design (one move, one question); marking four exam answers in one message needs a little more.
    maxOutputTokens: 800,
  });
}
