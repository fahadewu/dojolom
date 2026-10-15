// ─── The tutor's moves ───────────────────────────────────────────────────────
// Three kinds:
//   lookups (lookUp, lesson, chapter) run on the server inside the same turn,
//     so the tutor can find and read checked material before it speaks;
//   cards (choices, quickCheck, guess, tryIt) wait for the learner, and are
//     marked on their device against an answer key, never by the model;
//   records (show, steps, saveProfile, learned, markCq) are answered by the
//     device at once, after checking they make sense.
// The schemas here are shared: the route adds the lookups' execute functions,
// the chat reads the types. docs/ai-tutor-rd.md.

import { z } from "zod";
import type { InferUITools, UIMessage } from "ai";

const ideaId = z.string().regex(/^[a-z0-9-]{1,64}$/).describe("An idea id exactly as lookUp, lesson, chapter or the learner notes gave it.");
const bookId = z.string().regex(/^[a-z0-9-]{1,48}$/);

export const SHOW_AS = ["picture", "steps", "story", "explanation", "keyPoints"] as const;
export type ShowAs = (typeof SHOW_AS)[number];

const check = z.object({
  question: z.string().min(5).max(240),
  options: z.array(z.string().min(1).max(120)).min(3).max(4),
  answer: z.number().int().min(0).max(3).describe("Index of the right option."),
  why: z.string().max(240).describe("One sentence on why the answer is right."),
});

export const tutorTools = {
  // ── Lookups (server) ──
  lookUp: {
    description: "Search Dojolom's books, chapters and checked lessons for what the learner wants to learn. Use it whenever a topic might be in the national curriculum or our subjects, before teaching it.",
    inputSchema: z.object({ query: z.string().min(2).max(120).describe("The topic in a few words, with the class or book if known, e.g. \"class 8 math chapter 2\", \"photosynthesis\".") }),
    outputSchema: z.object({ hits: z.array(z.object({ kind: z.string(), id: z.string(), title: z.string(), book: z.string(), chapter: z.string().optional(), checked: z.boolean() })) }),
  },
  lesson: {
    description: "Read one checked idea (from lookUp, chapter or the learner notes): its steps, comparison, explanation, key points, common mistake and key words. Teach from this whenever it exists.",
    inputSchema: z.object({ ideaId }),
    outputSchema: z.object({ text: z.string() }),
  },
  chapter: {
    description: "Read a book's chapter or a subject's unit: its ideas in teaching order, and its board-style creative question when it has one.",
    inputSchema: z.object({ book: bookId, number: z.number().int().min(1).max(40) }),
    outputSchema: z.object({ text: z.string() }),
  },

  // ── Cards (the learner answers) ──
  choices: {
    description: "Offer two to six tap-to-answer options under your message, when the likely answers are few (getting to know them, picking a topic, a quick either-or). Set multi to let them pick several. They can always type instead.",
    inputSchema: z.object({ options: z.array(z.string().min(1).max(60)).min(2).max(6), multi: z.boolean().default(false) }),
    outputSchema: z.object({ chose: z.array(z.string()) }),
  },
  quickCheck: {
    description: "Ask one marked question on an idea the learner has learned (a checked idea or one saved with learned). The card asks it and marks it against its key; you get the result. Use it for reviews of due ideas, and after teaching.",
    inputSchema: z.object({ ideaId }),
    outputSchema: z.object({ question: z.string(), chose: z.string(), answer: z.string(), right: z.boolean(), why: z.string() }),
  },
  guess: {
    description: "Before teaching a checked idea, ask them to guess whether its common mistake is true or false. A guess is never held against them.",
    inputSchema: z.object({ ideaId }),
    outputSchema: z.object({ belief: z.string(), saidTrue: z.boolean(), right: z.boolean(), correction: z.string() }),
  },
  tryIt: {
    description: "Give a checked idea's example problem as a card, to try before you explain (when they already know a little) or to use the idea after. Practice: it never counts against them.",
    inputSchema: z.object({ ideaId }),
    outputSchema: z.object({ question: z.string(), chose: z.string(), answer: z.string(), right: z.boolean(), why: z.string() }),
  },

  // ── Records (the device answers at once) ──
  show: {
    description: "Put one of a checked idea's ready-made explanations on screen: picture (four steps and an everyday comparison), steps (a walkthrough), story (a short scene), explanation (precise, with a worked example) or keyPoints. Then talk about it in a sentence or two; do not repeat it.",
    inputSchema: z.object({ ideaId, as: z.enum(SHOW_AS) }),
    outputSchema: z.object({ shown: z.boolean() }),
  },
  steps: {
    description: "Lay out a process or a worked example as two to six numbered steps on screen, for a topic with no checked lesson (with a checked idea, use show). Each step: a short label and one or two sentences.",
    inputSchema: z.object({ title: z.string().min(2).max(80), steps: z.array(z.object({ label: z.string().min(1).max(40), text: z.string().min(1).max(280) })).min(2).max(6) }),
    outputSchema: z.object({ shown: z.boolean() }),
  },
  saveProfile: {
    description: "Save what the learner has told you about themselves, as soon as they say it. Only the fields you learned; keep their own words for interests.",
    inputSchema: z.object({
      name: z.string().max(40).optional().describe("First name, or what they want to be called."),
      track: z.enum(["everyday", "nctb"]).optional().describe("nctb: Bangladesh national curriculum school books; everyday: anything else."),
      bdStage: z.enum(["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "ssc", "hsc"]).optional().describe("Their class: c1..c8, ssc (Class 9-10), hsc (Class 11-12)."),
      bdGroup: z.enum(["science", "humanities", "business"]).optional(),
      books: z.array(bookId).max(3).optional().describe("Book or subject ids from lookUp hits of kind book."),
      goal: z.enum(["curious", "school", "work", "hobby", "family"]).optional(),
      targetGrade: z.enum(["A+", "A", "A-", "B", "C"]).optional(),
      interests: z.array(z.string().max(32)).max(5).optional(),
      seeWays: z.array(z.enum(["pictures", "steps", "stories", "doing", "explained"])).max(2).optional(),
      tone: z.enum(["calm", "coach", "playful", "curious"]).optional(),
    }),
    outputSchema: z.object({ saved: z.array(z.string()) }),
  },
  learned: {
    description: "Record an idea as learned once you have taught it and they have explained it back (or tried to). For a checked idea give ideaId. For anything else give own: a short title, the topic, the one key point, and one multiple-choice check you are certain of, used for their reviews. It then comes back for review just before they would forget it.",
    inputSchema: z.object({
      ideaId: ideaId.optional(),
      own: z.object({ title: z.string().min(2).max(80), topic: z.string().max(60), keyPoint: z.string().min(5).max(240), check }).optional(),
    }),
    outputSchema: z.object({ id: z.string(), title: z.string() }),
  },
  markCq: {
    description: "Record your marks for a creative question once all four parts are answered: ka out of 1, kha out of 2, ga out of 3, gha out of 4, as a board examiner would.",
    inputSchema: z.object({ book: bookId, number: z.number().int().min(1).max(40), marks: z.tuple([z.number().int().min(0).max(1), z.number().int().min(0).max(2), z.number().int().min(0).max(3), z.number().int().min(0).max(4)]) }),
    outputSchema: z.object({ recorded: z.boolean() }),
  },
} as const;

export type TutorTools = typeof tutorTools;
export type TutorToolName = keyof TutorTools;
export type TutorMetadata = { kickoff?: boolean };
export type TutorUIMessage = UIMessage<TutorMetadata, never, InferUITools<TutorTools>>;

/** Answered on the server inside the turn. */
export const SERVER_TOOLS: TutorToolName[] = ["lookUp", "lesson", "chapter"];
/** Answered by the device as soon as they are called. */
export const AUTO_TOOLS: TutorToolName[] = ["show", "steps", "saveProfile", "learned", "markCq"];
/** Everything else waits for the learner. */
