// ─── What the browser tells the tutor each turn ──────────────────────────────
// Everything about the learner lives on their device. Each turn sends a small,
// validated summary: who they are (first name only), what support their age
// and habits call for, and what they know: ideas due for review, ideas learned
// lately, and the next checked idea in each of their books. Authored ideas go
// as ids (the server reads their titles and lessons itself); ideas the tutor
// taught outside the checked lessons go with their title and key point.
//
// Pure: no clock, no storage. Shared by the browser and the route.

import { z } from "zod";
import { deriveSignals, dueConcepts, isSecured, tuningOf, unitConceptIds, SIGNAL_SOURCES, type StudyState } from "@/lib/study";
import { ageView, habitsOn, supportAge } from "@/lib/age";
import type { DayKey } from "@/lib/clock";
import { cleanInterests, cleanSeeWays, seeWays, tutorTones } from "@/lib/tutor/profile";
import { isOwnId, type OwnIdea } from "@/lib/tutor/ideas";
import type { LearnerInput } from "@/lib/learning";
import { noTuning, type Tuning } from "@/lib/personal";

const id = z.string().regex(/^[a-z0-9-]{1,64}$/);
const idea = z.object({ id, title: z.string().max(80).optional(), keyPoint: z.string().max(240).optional() });

export const tutorContextSchema = z.object({
  learner: z.object({
    name: z.string().max(40),
    age: z.number().int().min(4).max(110),
    track: z.enum(["everyday", "nctb"]),
    bdStage: z.enum(["", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "ssc", "hsc"]),
    bdGroup: z.enum(["", "science", "humanities", "business"]),
    books: z.array(id).max(6),
    goal: z.enum(["", "curious", "school", "work", "hobby", "family"]),
    targetGrade: z.enum(["", "A+", "A", "A-", "B", "C", "D", "F"]),
    interests: z.array(z.string().max(40)).max(8),
    tone: z.enum(["", ...tutorTones]),
    seeWays: z.array(z.enum(seeWays)).max(3),
  }),
  readAloud: z.boolean(),   // the tutor's words are read out: keep sentences short and speakable
  shaky: z.boolean(),       // recent answers under 60% right: explain first, smaller steps
  tuning: z.object({ planFirst: z.boolean(), startSmall: z.boolean(), steadyNerves: z.boolean(), buildConfidence: z.boolean(), goDeeper: z.boolean() }),
  memory: z.object({
    due: z.array(idea).max(6),     // most urgent first
    recent: z.array(idea).max(8),  // learned lately, newest first
    next: z.array(z.object({ book: id, ideaId: id })).max(3), // the next checked idea in each of their books
    learned: z.number().int().min(0),
    secured: z.number().int().min(0),
  }),
  strong: z.boolean(), // stuck on an idea: the route uses the stronger model
});

export type TutorContext = z.infer<typeof tutorContextSchema>;

/** Whether this deployment lets under-18s use the tutor (set NEXT_PUBLIC_TUTOR_MINORS=1 only after the checks in docs/ai-tutor-rd.md). */
export const MINORS_ALLOWED = process.env.NEXT_PUBLIC_TUTOR_MINORS === "1";

/** The learner as the tutor may know them: first name only, interests and ways cleaned again. */
export function learnerForTutor(l: LearnerInput, age: number): TutorContext["learner"] {
  return {
    name: l.name.trim().split(/\s+/)[0]?.slice(0, 40) ?? "",
    age,
    track: l.track,
    bdStage: l.bdStage,
    bdGroup: l.bdGroup,
    books: l.subjects.filter((s) => /^[a-z0-9-]{1,64}$/.test(s)).slice(0, 6),
    goal: l.goal,
    targetGrade: l.targetGrade,
    interests: cleanInterests(l.interests),
    tone: l.tutorTone,
    seeWays: cleanSeeWays(l.seeWays),
  };
}

export function tuningForTutor(t: Tuning): TutorContext["tuning"] {
  return { planFirst: t.planFirst, startSmall: t.startSmall, steadyNerves: t.steadyNerves, buildConfidence: t.buildConfidence, goDeeper: t.goDeeper };
}

/** Ideas answered wrong at least twice since `since` (guesses, tries and game taps do not count). */
export function stuckTwice(state: StudyState, since: number): boolean {
  const misses = new Map<string, number>();
  for (const e of state.events) {
    if (e.type !== "answer" || e.t < since || e.correct || SIGNAL_SOURCES.includes(e.source) || e.source === "game") continue;
    misses.set(e.concept, (misses.get(e.concept) ?? 0) + 1);
  }
  return [...misses.values()].some((n) => n >= 2);
}

/** The next checked idea not yet learned in each of the learner's books, in teaching order. */
export function nextInBooks(books: string[], memory: StudyState["memory"], authoredUnitsFor: (book: string) => number[]): { book: string; ideaId: string }[] {
  const out: { book: string; ideaId: string }[] = [];
  for (const book of books) {
    const next = authoredUnitsFor(book).flatMap((u) => unitConceptIds(book, u)).find((c) => !memory[c]);
    if (next) out.push({ book, ideaId: next });
  }
  return out.slice(0, 3);
}

/** The context for the next turn, from the learner, the study state and their own ideas as they stand now. */
export function buildTutorContext(a: {
  learner: LearnerInput;
  state: StudyState;
  ownIdeas: Record<string, OwnIdea>;
  today: DayKey;
  now: number;
  authoredUnitsFor: (book: string) => number[];
}): TutorContext {
  const { learner, state, ownIdeas } = a;
  const view = ageView(learner, state);
  const signals = deriveSignals(state.events, state.memory);
  // An own idea whose check was flagged as wrong is never asked again; one missing from this device cannot be asked.
  const known = Object.keys(state.memory).filter((id) => (isOwnId(id) ? !!ownIdeas[id] && !ownIdeas[id].flagged : true));
  const describe = (id: string) => (isOwnId(id) ? { id, title: ownIdeas[id]?.title, keyPoint: ownIdeas[id]?.keyPoint } : { id });
  const recent = [...known].sort((x, y) => state.memory[y].learnedOn.localeCompare(state.memory[x].learnedOn));
  return {
    learner: learnerForTutor(learner, supportAge(learner)),
    readAloud: view.readAloud,
    shaky: signals.rollingAccuracy !== null && signals.rollingAccuracy < 0.6,
    // How someone studies (nerves, confidence, follow-through) is personal: for an under-18 it reaches the AI service only once a guardian has turned habit tuning on.
    tuning: tuningForTutor(habitsOn(view.d, state.guardianHabits) ? tuningOf(learner, state, a.today) : noTuning),
    memory: {
      due: dueConcepts(state.memory, known, a.today, state.memoryScale).slice(0, 6).map(describe),
      recent: recent.slice(0, 8).map(describe),
      next: nextInBooks(learner.subjects, state.memory, a.authoredUnitsFor),
      learned: known.length,
      secured: known.filter((id) => isSecured(state.memory[id], state.memoryScale)).length,
    },
    strong: stuckTwice(state, a.now - 3_600_000),
  };
}
