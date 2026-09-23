// ─── Dojolom study engine ─────────────────────────────────────────────────────
// Pure functions only. Given the learner, their profile, what they have done so
// far and today's date, these decide what a session contains, how each concept
// is scheduled for review, and how formats, games and motion adapt to the
// learner's behaviour. Nothing here touches the browser or the clock: every
// function takes `today` (a local YYYY-MM-DD key) or `now` (ms) as an input, so
// tests can replay any calendar deterministically.

import {
  learningStyles,
  subjects,
  type FormatId,
  type LearnerInput,
  type LearnerProfile,
  type PaceId,
  type StyleId,
} from "@/lib/learning";
import { addDays, dayKey, daysBetween, type DayKey } from "@/lib/clock";

export const CONCEPTS_PER_UNIT = 3;
export const UNITS_PER_SUBJECT = 6;

export type GameId = "pairs" | "order" | "blitz" | "blanks";
export const games: Record<GameId, { name: string; blurb: string; colour: "focus" | "sun" | "sprout" | "play" }> = {
  pairs:  { name: "Match pairs",     blurb: "Pair each term with its meaning.",                     colour: "play" },
  order:  { name: "Put it in order", blurb: "Arrange the steps into the sequence that makes sense.", colour: "sun" },
  blitz:  { name: "True or false",   blurb: "Quick calls, one statement at a time.",                colour: "focus" },
  blanks: { name: "Fill the gap",    blurb: "Pick the word that completes the sentence.",           colour: "sprout" },
};

export type LearnFormat = Exclude<FormatId, "game">;
export const learnFormats: LearnFormat[] = ["infographic", "video", "story", "reading", "challenge"];

export type MotionProfile = "lively" | "balanced" | "calm";
export type MotionSetting = MotionProfile | "auto";
export type Confidence = "sure" | "unsure";

// ─── Deterministic randomness ────────────────────────────────────────────────
// Shuffles and picks are seeded from the subject and session so a reload
// rebuilds the same session and tests are repeatable.

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function seedFor(...parts: (string | number)[]) {
  return hashString(parts.join(":"));
}

// ─── Plan: which concepts in which session ───────────────────────────────────

export function conceptId(subject: string, unit: number, n: number) {
  return `${subject}-${unit}-${n}`;
}

export function parseConceptId(id: string): { subject: string; unit: number; n: number } {
  const parts = id.split("-");
  const n = Number(parts.pop());
  const unit = Number(parts.pop());
  return { subject: parts.join("-"), unit, n };
}

export function unitConceptIds(subject: string, unit: number): string[] {
  return Array.from({ length: CONCEPTS_PER_UNIT }, (_, i) => conceptId(subject, unit, i + 1));
}

export interface DayPlan {
  day: number;          // 1-based session index ("Session 4 of 18")
  unit: number;         // 1-based
  conceptIds: string[]; // taught in this session, in order
  isUnitEnd: boolean;   // the session closes a unit, so it ends with a checkpoint
}

export interface SubjectPlan {
  subject: string;
  pace: PaceId;
  days: DayPlan[];
  authoredUnits: number[]; // units with content on disk
  totalUnits: number;
}

export function effectivePace(pace: PaceId | ""): PaceId {
  return pace || "steady";
}

/** Deterministic. Only authored units are scheduled, so the path never dead-ends silently. */
export function buildPlan(subject: string, pace: PaceId | "", authoredUnits: number[] | "all" = "all"): SubjectPlan {
  const p = effectivePace(pace);
  const units = authoredUnits === "all"
    ? Array.from({ length: UNITS_PER_SUBJECT }, (_, i) => i + 1)
    : [...authoredUnits].sort((a, b) => a - b);
  // Units must be contiguous from 1: a gap would teach unit 4 before unit 3 exists.
  const contiguous: number[] = [];
  for (let u = 1; u <= UNITS_PER_SUBJECT; u++) { if (units.includes(u)) contiguous.push(u); else break; }

  const days: DayPlan[] = [];
  let day = 1;
  for (const u of contiguous) {
    if (p === "deep") {
      days.push({ day: day++, unit: u, conceptIds: unitConceptIds(subject, u), isUnitEnd: true });
    } else {
      for (let n = 1; n <= CONCEPTS_PER_UNIT; n++) {
        days.push({ day: day++, unit: u, conceptIds: [conceptId(subject, u, n)], isUnitEnd: n === CONCEPTS_PER_UNIT });
      }
    }
  }
  return { subject, pace: p, days, authoredUnits: contiguous, totalUnits: UNITS_PER_SUBJECT };
}

export function planPreview(subject: string, pace: PaceId | ""): { sessions: number; minutes: number; perSession: number } {
  const plan = buildPlan(subject, pace, "all");
  const per = plan.pace === "sprint" ? 5 : plan.pace === "deep" ? 35 : 15;
  return { sessions: plan.days.length, minutes: plan.days.length * per, perSession: per };
}

// ─── Memory: Leitner boxes with a spacing schedule ────────────────────────────

export const INTERVALS = [1, 2, 4, 7, 15, 30]; // days until next review, indexed by box
export const SECURED_BOX = 3;                  // "an idea you hold" for the dashboard

export interface MemoryState {
  box: number;          // 0 (just met) to 5 (solid)
  due: DayKey;          // next review date
  learnedOn: DayKey;    // first taught; same-day answers never promote
  format?: LearnFormat; // how it was first taught, so formats can be judged by what stuck
  seen: number;         // times taught or reviewed
  right: number;
  wrong: number;
  sureWrong: number;    // confident mistakes, reviewed first
  last?: boolean;       // last delayed answer
  lastAsked: string[];  // recent review-item keys, to avoid repeats
}

export function freshMemory(today: DayKey, format?: LearnFormat): MemoryState {
  return { box: 0, due: addDays(today, INTERVALS[0]), learnedOn: today, format, seen: 1, right: 0, wrong: 0, sureWrong: 0, lastAsked: [] };
}

export function isDelayed(mem: MemoryState, today: DayKey) {
  return daysBetween(mem.learnedOn, today) >= 1;
}

/**
 * Same-day answers (the Check right after learning) count for accuracy but do
 * not move the box: only remembering after a night is evidence of memory.
 * A correct but unsure delayed answer holds its box; a confident wrong one is
 * flagged so tomorrow's Rewind opens with it.
 */
export function recordAnswer(mem: MemoryState | undefined, correct: boolean, today: DayKey, confidence: Confidence = "sure"): MemoryState {
  const m = mem ?? freshMemory(today);
  const delayed = isDelayed(m, today);
  let box = m.box;
  let due = m.due;
  if (delayed) {
    if (correct) {
      box = confidence === "sure" ? Math.min(m.box + 1, INTERVALS.length - 1) : m.box;
      due = addDays(today, INTERVALS[box]);
    } else {
      box = Math.floor(m.box / 2);
      due = addDays(today, 1);
    }
  } else if (!correct) {
    box = 0;
    due = addDays(today, 1);
  } else if (daysBetween(today, m.due) < 1) {
    due = addDays(today, 1);
  }
  return {
    ...m,
    box,
    due,
    seen: m.seen + 1,
    right: m.right + (correct ? 1 : 0),
    wrong: m.wrong + (correct ? 0 : 1),
    sureWrong: m.sureWrong + (!correct && confidence === "sure" ? 1 : 0),
    last: delayed ? correct : m.last,
  };
}

/** 0..1, how well the concept is held. Overdue memories are shown as fading. */
export function strength(mem: MemoryState | undefined, today: DayKey): number {
  if (!mem) return 0;
  const base = mem.box / (INTERVALS.length - 1);
  const overdue = daysBetween(mem.due, today);
  if (overdue <= 0) return Math.max(0.12, base);
  return Math.max(0.08, base * Math.max(0.35, 1 - overdue * 0.08));
}

export function isSecured(mem: MemoryState | undefined) {
  return !!mem && mem.box >= SECURED_BOX;
}

/** Concepts due for review today, most urgent first: confident mistakes, then any mistake, then most overdue, then weakest. */
export function dueConcepts(memory: Record<string, MemoryState>, ids: string[], today: DayKey): string[] {
  return ids
    .filter((id) => memory[id] && daysBetween(memory[id].due, today) >= 0)
    .sort((a, b) => {
      const A = memory[a], B = memory[b];
      if ((A.last === false) !== (B.last === false)) return A.last === false ? -1 : 1;
      if (A.sureWrong !== B.sureWrong) return B.sureWrong - A.sureWrong;
      if (A.wrong !== B.wrong) return B.wrong - A.wrong;
      const overdue = daysBetween(B.due, today) - daysBetween(A.due, today);
      if (overdue !== 0) return overdue;
      return A.box - B.box;
    });
}

// ─── Behaviour log and the signals derived from it ───────────────────────────

export type SegmentKind = "intro" | "rewind" | "learn" | "play" | "check" | "checkpoint" | "done";
export type AnswerSource = "rewind" | "check" | "checkpoint" | "game" | "challenge" | "review";

export type StudyEvent =
  | { t: number; type: "segment"; subject: string; day: number; kind: SegmentKind; outcome: "complete" | "skip"; ms: number; format?: LearnFormat; game?: GameId }
  | { t: number; type: "answer"; subject: string; concept: string; correct: boolean; ms: number; source: AnswerSource; confidence?: Confidence; delayed: boolean }
  | { t: number; type: "game"; subject: string; game: GameId; score: number; accuracy: number; ms: number; finished: boolean }
  | { t: number; type: "rating"; format: LearnFormat; up: boolean }   // "Show me another way" logs a down
  | { t: number; type: "session"; subject: string; day: number; minutes: number };

export interface Signals {
  formatScore: Record<LearnFormat, number>;       // engagement, roughly -1 .. +1, shrunk toward 0 on little data
  formatSeen: Record<LearnFormat, number>;
  formatDelayed: Record<LearnFormat, { right: number; wrong: number }>; // delayed accuracy on concepts learned in this format
  gameScore: Record<GameId, number>;
  gameSeen: Record<GameId, number>;
  gameRecentAccuracy: Record<GameId, number | null>; // last 3 plays
  rollingAccuracy: number | null;                 // last 10 answers, for the support ladder
  totalAnswers: number;
  sessionsCompleted: number;
  avgSessionMinutes: number | null;
}

function shrink(n: number, k = 5) { return n / (n + k); }

export function deriveSignals(events: StudyEvent[], memory: Record<string, MemoryState> = {}): Signals {
  const raw = { infographic: 0, video: 0, story: 0, reading: 0, challenge: 0 } as Record<LearnFormat, number>;
  const formatSeen = { ...raw };
  const formatDelayed = {} as Signals["formatDelayed"];
  for (const f of learnFormats) formatDelayed[f] = { right: 0, wrong: 0 };
  const gRaw = { pairs: 0, order: 0, blitz: 0, blanks: 0 } as Record<GameId, number>;
  const gameSeen = { ...gRaw };
  const gameAcc: Record<GameId, number[]> = { pairs: [], order: [], blitz: [], blanks: [] };
  const answers: boolean[] = [];
  const minutes: number[] = [];

  for (const e of events) {
    if (e.type === "segment" && e.kind === "learn" && e.format) {
      formatSeen[e.format]++;
      raw[e.format] += e.outcome === "skip" ? -1 : 0.5;
    }
    if (e.type === "segment" && e.kind === "play" && e.game && e.outcome === "skip") gRaw[e.game] -= 1;
    if (e.type === "rating") raw[e.format] += e.up ? 1 : -1;
    if (e.type === "answer") {
      answers.push(e.correct);
      if (e.delayed) {
        const f = memory[e.concept]?.format;
        if (f) { if (e.correct) formatDelayed[f].right++; else formatDelayed[f].wrong++; }
      }
    }
    if (e.type === "game") {
      gameSeen[e.game]++;
      gRaw[e.game] += e.finished ? 0.5 : -0.5;
      gameAcc[e.game].push(e.accuracy);
    }
    if (e.type === "session") minutes.push(e.minutes);
  }

  const formatScore = {} as Record<LearnFormat, number>;
  for (const f of learnFormats) formatScore[f] = formatSeen[f] ? Math.max(-1, Math.min(1, raw[f] / formatSeen[f])) * shrink(formatSeen[f]) : 0;
  const gameScore = {} as Record<GameId, number>;
  const gameRecentAccuracy = {} as Record<GameId, number | null>;
  for (const g of Object.keys(gRaw) as GameId[]) {
    gameScore[g] = gameSeen[g] ? Math.max(-1, Math.min(1, gRaw[g] / gameSeen[g])) * shrink(gameSeen[g], 3) : 0;
    const recent = gameAcc[g].slice(-3);
    gameRecentAccuracy[g] = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : null;
  }
  const rolling = answers.slice(-10);
  return {
    formatScore,
    formatSeen,
    formatDelayed,
    gameScore,
    gameSeen,
    gameRecentAccuracy,
    rollingAccuracy: rolling.length ? rolling.filter(Boolean).length / rolling.length : null,
    totalAnswers: answers.length,
    sessionsCompleted: minutes.length,
    avgSessionMinutes: minutes.length ? minutes.reduce((a, b) => a + b, 0) / minutes.length : null,
  };
}

// ─── Adaptation: formats, games, review load, motion ─────────────────────────

export interface FormatChoice { ranked: LearnFormat[]; exploring: boolean }

/**
 * Learn formats ranked for this learner right now. The profile is a prior on
 * presentation; what actually stuck (delayed accuracy by format) and explicit
 * signals ("show me another way", skips) adjust it, shrunk toward the prior
 * while data is thin. Every fourth session tries a lower-ranked format so the
 * ordering can never lock in on two sessions of noise.
 */
export function rankFormats(
  profile: LearnerProfile,
  learner: LearnerInput,
  signals: Signals,
  opts: { last?: LearnFormat; sessionIndex?: number; pace?: PaceId } = {},
): FormatChoice {
  const w: Record<LearnFormat, number> = { infographic: 0.5, video: 0.5, story: 0.5, reading: 0.5, challenge: 0.5 };
  const prior = (formats: FormatId[], scale: number) =>
    formats.forEach((f, i) => { if (f !== "game") w[f] += (formats.length - i) * scale; });
  prior(profile.primary.formats, 2);
  prior(profile.secondary.formats, 0.5);

  if (learner.age === "kid") { w.story += 0.8; w.infographic += 0.4; }
  if (learner.age === "teen") { w.video += 0.4; w.challenge += 0.3; }
  if (learner.age === "senior") { w.reading += 0.6; w.video += 0.2; }
  if (learner.goal === "work") w.challenge += 0.8;
  if (learner.goal === "school") w.challenge += 0.4;

  // What stuck: delayed accuracy for concepts first taught in each format, against the learner's mean.
  const totals = learnFormats.reduce((acc, f) => ({ r: acc.r + signals.formatDelayed[f].right, w: acc.w + signals.formatDelayed[f].wrong }), { r: 0, w: 0 });
  const mean = totals.r + totals.w ? totals.r / (totals.r + totals.w) : null;
  for (const f of learnFormats) {
    const d = signals.formatDelayed[f];
    const n = d.right + d.wrong;
    if (mean !== null && n >= 4) w[f] += 8 * (d.right / n - mean) * shrink(n, 4);
    w[f] += 2 * signals.formatScore[f];
  }
  if (opts.last) w[opts.last] -= 2.2;

  let allowed = [...learnFormats];
  if (learner.age === "kid") allowed = allowed.filter((f) => f !== "reading");
  if (opts.pace === "sprint") allowed = allowed.filter((f) => f !== "reading" && f !== "challenge");

  const ranked = allowed.sort((a, b) => w[b] - w[a] || learnFormats.indexOf(a) - learnFormats.indexOf(b));
  const exploring = (opts.sessionIndex ?? 0) % 4 === 3 && ranked.length > 2;
  if (exploring) {
    const fresh = [...ranked].reverse().find((f) => signals.formatSeen[f] < 2 && f !== opts.last);
    if (fresh) return { ranked: [fresh, ...ranked.filter((f) => f !== fresh)], exploring: true };
  }
  return { ranked, exploring: false };
}

const gamePrior: Record<StyleId, Record<GameId, number>> = {
  player:      { pairs: 1,   order: 1,   blitz: 3,   blanks: 1 },
  visual:      { pairs: 3,   order: 2,   blitz: 0.5, blanks: 1 },
  storyteller: { pairs: 1,   order: 3,   blitz: 0.5, blanks: 1.5 },
  tinkerer:    { pairs: 1,   order: 1.5, blitz: 1.5, blanks: 3 },
  reader:      { pairs: 1.5, order: 1,   blitz: 0.3, blanks: 2.5 },
  watcher:     { pairs: 2.5, order: 2,   blitz: 1,   blanks: 1 },
};

export interface GameSupport {
  rung: 0 | 1 | 2;            // 0 = most support, 2 = least
  pairsCount: 4 | 5 | 6;
  blitzSeconds: number | null; // null = untimed
  orderPreplaced: boolean;    // one item already in place
}

/** Support ladder: same content at every rung, more or less scaffolding. Target is 80-90% success. */
export function supportFor(learner: LearnerInput, signals: Signals, beatClock: boolean): GameSupport {
  let rung: 0 | 1 | 2 = 1;
  const acc = signals.rollingAccuracy;
  if (acc !== null && signals.totalAnswers >= 6) rung = acc < 0.7 ? 0 : acc > 0.9 ? 2 : 1;
  const gentle = learner.age === "kid" || learner.age === "senior";
  const pairsCount: 4 | 5 | 6 = rung === 0 ? 4 : rung === 1 ? (gentle ? 4 : 5) : gentle ? 5 : 6;
  const timed = gentle ? beatClock : rung > 0 || beatClock;
  const blitzSeconds = !timed ? null : rung === 2 ? 8 : 12;
  return { rung, pairsCount, blitzSeconds, orderPreplaced: rung === 0 };
}

export function chooseGame(profile: LearnerProfile, learner: LearnerInput, signals: Signals, last?: GameId): GameId {
  const w: Record<GameId, number> = { pairs: 0, order: 0, blitz: 0, blanks: 0 };
  for (const g of Object.keys(w) as GameId[]) {
    w[g] += gamePrior[profile.primary.id][g] + 0.5 * gamePrior[profile.secondary.id][g];
    w[g] += 2 * signals.gameScore[g];
    const acc = signals.gameRecentAccuracy[g];
    if (acc !== null && signals.gameSeen[g] >= 2) w[g] += acc >= 0.8 ? 1.5 : acc < 0.4 ? -1 : 0; // what they win at can beat the style prior
  }
  if (learner.age === "kid") { w.blitz -= 1; w.pairs += 1; }
  if (learner.age === "senior") { w.blitz -= 1.5; }
  if (last) w[last] -= 2.5;
  const order: GameId[] = ["pairs", "order", "blitz", "blanks"];
  return order.sort((a, b) => w[b] - w[a])[0];
}

export const REVIEW_CAP: Record<PaceId, number> = { sprint: 2, steady: 3, deep: 4 };

/** How many retrieval items open a session. Grows when recent answers were shaky. */
export function reviewLoad(pace: PaceId, signals: Signals, dueCount: number): number {
  let n = pace === "sprint" ? 1 : 2;
  if (signals.rollingAccuracy !== null && signals.rollingAccuracy < 0.7) n++;
  return Math.max(0, Math.min(REVIEW_CAP[pace], n, dueCount));
}

export function motionFor(learner: LearnerInput, profile: LearnerProfile, setting: MotionSetting, reducedMotion = false): MotionProfile {
  if (reducedMotion) return "calm";
  if (setting !== "auto") return setting;
  if (learner.age === "kid") return "lively";
  if (learner.age === "senior") return "calm";
  const ids = [profile.primary.id, profile.secondary.id];
  if (ids[0] === "player" || ids[0] === "tinkerer") return "lively";
  if (ids[0] === "reader") return "calm";
  if (ids.includes("player")) return "lively";
  return "balanced";
}

export function motionDescription(m: MotionProfile) {
  return m === "lively"
    ? "Confetti when you finish, a pulse on your streak, springy transitions."
    : m === "balanced"
      ? "Soft slides and fills. Celebration without fireworks."
      : "Fades only. Progress is shown, never shouted.";
}

// ─── Session: the segments of one sitting ────────────────────────────────────

export type ReviewSource = "quiz" | "blitz" | "blank" | "pair";

export interface ReviewItem {
  conceptId: string;
  source: ReviewSource;
  index: number;        // into that pool
  crossSubject: boolean;
}

export type Segment =
  | { kind: "intro" }
  | { kind: "rewind"; items: ReviewItem[]; recapIds: string[] }
  | { kind: "learn"; conceptId: string; format: LearnFormat; exploring: boolean; pretest: boolean; compact: boolean }
  | { kind: "play"; conceptIds: string[]; game: GameId; support: GameSupport }
  | { kind: "check"; conceptId: string; count: number; withPretest: boolean }
  | { kind: "checkpoint"; unit: number; conceptIds: string[]; perConcept: number; passMark: number }
  | { kind: "done" };

export interface SessionPlan {
  day: DayPlan;
  segments: Segment[];
  estMinutes: number;
}

export const POOL_SIZES: Record<ReviewSource, number> = { quiz: 3, blitz: 4, blank: 2, pair: 5 };

export function reviewKey(item: Pick<ReviewItem, "source" | "index">) {
  return `${item.source}:${item.index}`;
}

/** Recognition items while a memory is new, cued recall once it is holding. Rotates so repeats are rare. */
export function pickReviewItem(conceptId: string, mem: MemoryState | undefined, salt: number, crossSubject = false): ReviewItem {
  const box = mem?.box ?? 0;
  const sources: ReviewSource[] = box <= 1 ? ["quiz", "blitz"] : box <= 3 ? ["blank", "pair", "quiz"] : ["pair", "blank", "quiz"];
  const seen = mem?.seen ?? 0;
  const avoid = new Set(mem?.lastAsked ?? []);
  const candidates: ReviewItem[] = [];
  for (let s = 0; s < sources.length; s++) {
    const source = sources[(seen + s + salt) % sources.length];
    const size = POOL_SIZES[source];
    for (let k = 0; k < size; k++) candidates.push({ conceptId, source, index: (seen * 7 + salt + k) % size, crossSubject });
  }
  return candidates.find((c) => !avoid.has(reviewKey(c))) ?? candidates[0];
}

function lastEvent<K extends StudyEvent["type"]>(events: StudyEvent[], pred: (e: StudyEvent) => boolean): Extract<StudyEvent, { type: K }> | undefined {
  for (let i = events.length - 1; i >= 0; i--) if (pred(events[i])) return events[i] as Extract<StudyEvent, { type: K }>;
  return undefined;
}

export function learnedIds(plan: SubjectPlan, progress: SubjectProgress | undefined, beforeDay = Infinity): string[] {
  return plan.days
    .filter((d) => d.day < beforeDay && (progress?.completedDays.includes(d.day) ?? false))
    .flatMap((d) => d.conceptIds);
}

export function buildSession(
  plan: SubjectPlan,
  day: number,
  learner: LearnerInput,
  profile: LearnerProfile,
  state: StudyState,
  today: DayKey,
  otherPlans: SubjectPlan[] = [],
): SessionPlan {
  const dp = plan.days.find((d) => d.day === day);
  if (!dp) throw new Error(`No session ${day} in plan for ${plan.subject}`);
  const progress = state.subjects[plan.subject];
  const signals = deriveSignals(state.events, state.memory);
  const segments: Segment[] = [];
  let minutes = 0;
  const sessionIndex = signals.sessionsCompleted;

  const learned = learnedIds(plan, progress, day);
  const previous = plan.days.filter((d) => d.day < day && (progress?.completedDays.includes(d.day) ?? false)).at(-1);

  if (!learned.length && !progress?.completedDays.length) {
    segments.push({ kind: "intro" });
    minutes += 0.5;
  }

  if (learned.length) {
    const due = dueConcepts(state.memory, learned, today);
    const load = reviewLoad(plan.pace, signals, Math.max(due.length, 1));
    const recapIds = previous?.conceptIds ?? [];
    const pool = due.length ? due : recapIds;
    const items = pool.slice(0, load).map((id, i) => pickReviewItem(id, state.memory[id], day + i));
    // Interleave at most one overdue idea from another subject, clearly labelled in the UI.
    const otherLearned = otherPlans.filter((p) => p.subject !== plan.subject).flatMap((p) => learnedIds(p, state.subjects[p.subject]));
    const otherDue = dueConcepts(state.memory, otherLearned, today);
    if (otherDue.length && items.length < REVIEW_CAP[plan.pace] && plan.pace !== "sprint") {
      items.push(pickReviewItem(otherDue[0], state.memory[otherDue[0]], day + 99, true));
    }
    segments.push({ kind: "rewind", items, recapIds });
    minutes += 0.75 + items.length * 0.5;
  }

  const lastLearn = lastEvent<"segment">(state.events, (e) => e.type === "segment" && e.kind === "learn");
  const lastPlay = lastEvent<"segment">(state.events, (e) => e.type === "segment" && e.kind === "play");
  const { ranked, exploring } = rankFormats(profile, learner, signals, { last: lastLearn?.format, sessionIndex, pace: plan.pace });
  const game = chooseGame(profile, learner, signals, lastPlay?.game);
  const support = supportFor(learner, signals, state.beatClock);
  const passMark = learner.goal === "school" ? 5 : 4;

  if (plan.pace === "deep") {
    dp.conceptIds.forEach((c, i) => {
      segments.push({ kind: "learn", conceptId: c, format: ranked[i % ranked.length], exploring: exploring && i === 0, pretest: true, compact: false });
      segments.push({ kind: "check", conceptId: c, count: 2, withPretest: true });
      minutes += 5 + 1.5;
    });
    segments.push({ kind: "play", conceptIds: dp.conceptIds, game, support });
    segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: dp.conceptIds, perConcept: 2, passMark });
    minutes += 4 + 5;
  } else if (plan.pace === "sprint") {
    const c = dp.conceptIds[0];
    segments.push({ kind: "learn", conceptId: c, format: ranked[0], exploring, pretest: true, compact: true });
    minutes += 2.5;
    if (dp.isUnitEnd) {
      segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: unitConceptIds(plan.subject, dp.unit), perConcept: 1, passMark: 2 });
      minutes += 2;
    } else if (day % 2 === 1) {
      segments.push({ kind: "play", conceptIds: [c, ...learned.slice(-1)], game, support });
      minutes += 2;
    } else {
      segments.push({ kind: "check", conceptId: c, count: 2, withPretest: true });
      minutes += 1.5;
    }
  } else {
    const c = dp.conceptIds[0];
    segments.push({ kind: "learn", conceptId: c, format: ranked[0], exploring, pretest: true, compact: false });
    minutes += 4.5;
    if (dp.isUnitEnd) {
      segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: unitConceptIds(plan.subject, dp.unit), perConcept: 2, passMark });
      minutes += 5;
    } else {
      segments.push({ kind: "play", conceptIds: [c, ...learned.slice(-2)], game, support });
      segments.push({ kind: "check", conceptId: c, count: 3, withPretest: true });
      minutes += 3.5 + 2;
    }
  }
  segments.push({ kind: "done" });
  return { day: dp, segments, estMinutes: Math.max(1, Math.round(minutes)) };
}

/** A catch-up sitting: only retrieval on the weakest ideas across every started subject. */
export function buildReviewSession(state: StudyState, plans: SubjectPlan[], today: DayKey, max = 6): ReviewItem[] {
  const learned = plans.flatMap((p) => learnedIds(p, state.subjects[p.subject]));
  const due = dueConcepts(state.memory, learned, today);
  const weak = learned
    .filter((id) => !due.includes(id))
    .sort((a, b) => strength(state.memory[a], today) - strength(state.memory[b], today));
  return [...due, ...weak].slice(0, max).map((id, i) => pickReviewItem(id, state.memory[id], 500 + i, false));
}

// ─── Progress, streaks and the daily gate ────────────────────────────────────

export interface SessionRecord {
  subject: string; // subject id, or "review" for a catch-up sitting
  day: number;
  date: DayKey;
  minutes: number;
  correct: number;
  asked: number;
}

export interface CurrentSession {
  day: number;
  segment: number;      // index into the session's segments
  startedAt: number;    // ms
  correct: number;
  asked: number;
  stuck: string[];      // concept ids answered wrong this sitting
  sureWrong: string[];  // confident mistakes this sitting
  pretest: Record<string, boolean>; // conceptId -> learner said the misconception was true
  switched: boolean;    // used "show me another way"
  override: boolean;    // continued past the daily gate
  segments?: Segment[]; // the session as built at start, so a reload resumes the same sitting
}

export interface CheckpointResult { passed: boolean; score: number; of: number; on: DayKey }

export interface SubjectProgress {
  startedOn: DayKey;
  completedDays: number[];
  lastCompletedOn?: DayKey;
  sessionsToday: number;
  checkpoints: Record<string, CheckpointResult>; // by unit number
  current?: CurrentSession;
}

export interface ProfileSnapshot { primary: StyleId; secondary: StyleId; formats: FormatId[] }

export interface StudyState {
  version: 2;
  motion: MotionSetting;
  beatClock: boolean;     // learner opted into timers (kids and seniors are untimed by default)
  when?: "morning" | "afternoon" | "evening";
  profile?: ProfileSnapshot;
  lastSeen: DayKey | "";
  subjects: Record<string, SubjectProgress>;
  memory: Record<string, MemoryState>;
  said: Record<string, string>; // the learner's own one-line summaries, replayed in Rewind
  events: StudyEvent[];
  sessions: SessionRecord[];
}

export const emptyStudy: StudyState = {
  version: 2,
  motion: "auto",
  beatClock: false,
  lastSeen: "",
  subjects: {},
  memory: {},
  said: {},
  events: [],
  sessions: [],
};

const MAX_EVENTS = 600;
const MAX_SESSIONS_PER_DAY = 2;

export interface StreakInfo { current: number; best: number; activeToday: boolean; restUsed: boolean; thisWeek: number }

/**
 * Consecutive days with a completed sitting, allowing one rest day in any
 * rolling seven so a single miss does not zero the count. Deep-pace learners
 * are shown sessions this week instead.
 */
export function streak(sessions: { date: DayKey }[], today: DayKey): StreakInfo {
  const set = new Set(sessions.map((s) => s.date));
  const activeToday = set.has(today);
  const thisWeek = [...set].filter((d) => { const gap = daysBetween(d, today); return gap >= 0 && gap < 7; }).length;

  const walk = (start: DayKey) => {
    let count = 0, cursor = start, restUsed = false, lastRest = -99, i = 0;
    while (true) {
      if (set.has(cursor)) count++;
      else if (count > 0 && i - lastRest >= 7 && set.has(addDays(cursor, -1))) { restUsed = true; lastRest = i; }
      else break;
      cursor = addDays(cursor, -1);
      i++;
    }
    return { count, restUsed };
  };
  const from = activeToday ? today : addDays(today, -1);
  const cur = set.has(from) ? walk(from) : { count: 0, restUsed: false };

  const days = [...set].sort();
  let best = 0;
  for (const d of days) best = Math.max(best, walk(d).count);
  return { current: cur.count, best: Math.max(best, cur.count), activeToday, restUsed: cur.restUsed, thisWeek };
}

export type DayStatus =
  | { kind: "not-started"; day: 1 }
  | { kind: "in-progress"; day: number }
  | { kind: "ready"; day: number }
  | { kind: "locked"; day: number; unlocksOn: DayKey; canOverride: boolean }
  | { kind: "finished" }
  | { kind: "empty" };

/** Where a learner stands in a subject today. One sitting per calendar day, with an override capped at two. */
export function dayStatus(plan: SubjectPlan, progress: SubjectProgress | undefined, today: DayKey): DayStatus {
  if (!plan.days.length) return { kind: "empty" };
  if (!progress) return { kind: "not-started", day: 1 };
  if (progress.current && plan.days.some((d) => d.day === progress.current!.day)) return { kind: "in-progress", day: progress.current.day };
  const next = plan.days.find((d) => !progress.completedDays.includes(d.day));
  if (!next) return { kind: "finished" };
  if (progress.lastCompletedOn === today) {
    return { kind: "locked", day: next.day, unlocksOn: addDays(today, 1), canOverride: progress.sessionsToday < MAX_SESSIONS_PER_DAY };
  }
  return { kind: "ready", day: next.day };
}

export function subjectPercent(plan: SubjectPlan, progress: SubjectProgress | undefined) {
  if (!plan.days.length) return 0;
  return Math.round(((progress?.completedDays.length ?? 0) / plan.days.length) * 100);
}

export function securedCount(state: StudyState, ids: string[]) {
  return ids.filter((id) => isSecured(state.memory[id])).length;
}

/** All concepts due for review across every subject the learner has started. */
export function dueAcross(state: StudyState, plans: SubjectPlan[], today: DayKey): string[] {
  return dueConcepts(state.memory, plans.flatMap((p) => learnedIds(p, state.subjects[p.subject])), today);
}

/** Guard against a clock that went backwards: never let "today" precede the last day we saw. */
export function effectiveToday(state: StudyState, now: number): DayKey {
  const today = dayKey(now);
  return state.lastSeen && daysBetween(today, state.lastSeen) > 0 ? state.lastSeen : today;
}

// ─── Reducers: every change to the state goes through one of these ───────────

function pushEvent(state: StudyState, e: StudyEvent): StudyState {
  const events = [...state.events, e];
  return { ...state, events: events.length > MAX_EVENTS ? events.slice(events.length - MAX_EVENTS) : events };
}

function withProgress(state: StudyState, subject: string, fn: (p: SubjectProgress) => SubjectProgress, today: DayKey): StudyState {
  const prev = state.subjects[subject] ?? { startedOn: today, completedDays: [], sessionsToday: 0, checkpoints: {} };
  return { ...state, subjects: { ...state.subjects, [subject]: fn(prev) } };
}

export function touch(state: StudyState, now: number): StudyState {
  const today = effectiveToday(state, now);
  return state.lastSeen === today ? state : { ...state, lastSeen: today };
}

export function snapshotProfile(state: StudyState, profile: LearnerProfile): StudyState {
  return { ...state, profile: { primary: profile.primary.id, secondary: profile.secondary.id, formats: profile.formats } };
}

export function startDay(state: StudyState, subject: string, day: number, now: number, override = false, segments?: Segment[]): StudyState {
  const today = effectiveToday(state, now);
  return withProgress(state, subject, (p) => ({
    ...p,
    sessionsToday: p.lastCompletedOn === today ? p.sessionsToday : 0,
    current: { day, segment: 0, startedAt: now, correct: 0, asked: 0, stuck: [], sureWrong: [], pretest: {}, switched: false, override, segments },
  }), today);
}

/** Swap one segment of the running sitting, e.g. after "show me another way" picks a new format. */
export function replaceSegment(state: StudyState, subject: string, index: number, segment: Segment): StudyState {
  const p = state.subjects[subject];
  if (!p?.current?.segments) return state;
  const segments = p.current.segments.map((s, i) => (i === index ? segment : s));
  return { ...state, subjects: { ...state.subjects, [subject]: { ...p, current: { ...p.current, segments } } } };
}

export function setSegment(state: StudyState, subject: string, segment: number): StudyState {
  const p = state.subjects[subject];
  if (!p?.current) return state;
  return { ...state, subjects: { ...state.subjects, [subject]: { ...p, current: { ...p.current, segment } } } };
}

/** A concept was taught: it enters memory and is due for its first review tomorrow. */
export function learned(state: StudyState, conceptId: string, format: LearnFormat, now: number): StudyState {
  const today = effectiveToday(state, now);
  const m = state.memory[conceptId];
  const memory = m ? { ...m, seen: m.seen + 1, format: m.format ?? format } : freshMemory(today, format);
  return { ...state, memory: { ...state.memory, [conceptId]: memory } };
}

export function setPretest(state: StudyState, subject: string, conceptId: string, saidTrue: boolean): StudyState {
  const p = state.subjects[subject];
  if (!p?.current) return state;
  return { ...state, subjects: { ...state.subjects, [subject]: { ...p, current: { ...p.current, pretest: { ...p.current.pretest, [conceptId]: saidTrue } } } } };
}

export function answered(
  state: StudyState,
  subject: string,
  concept: string,
  correct: boolean,
  now: number,
  opts: { ms?: number; source: AnswerSource; confidence?: Confidence; item?: ReviewItem },
): StudyState {
  const today = effectiveToday(state, now);
  const existing = state.memory[concept];
  const delayed = existing ? isDelayed(existing, today) : false;
  let mem = recordAnswer(existing, correct, today, opts.confidence ?? "sure");
  if (opts.item) mem = { ...mem, lastAsked: [...mem.lastAsked, reviewKey(opts.item)].slice(-4) };
  let next: StudyState = { ...state, memory: { ...state.memory, [concept]: mem } };
  next = pushEvent(next, { t: now, type: "answer", subject, concept, correct, ms: opts.ms ?? 0, source: opts.source, confidence: opts.confidence, delayed });
  const p = next.subjects[subject];
  if (p?.current) {
    const cur = p.current;
    next = {
      ...next,
      subjects: {
        ...next.subjects,
        [subject]: {
          ...p,
          current: {
            ...cur,
            asked: cur.asked + 1,
            correct: cur.correct + (correct ? 1 : 0),
            stuck: correct || cur.stuck.includes(concept) ? cur.stuck : [...cur.stuck, concept],
            sureWrong: !correct && opts.confidence === "sure" && !cur.sureWrong.includes(concept) ? [...cur.sureWrong, concept] : cur.sureWrong,
          },
        },
      },
    };
  }
  return next;
}

export function playedGame(
  state: StudyState,
  subject: string,
  game: GameId,
  result: { score: number; accuracy: number; ms: number; finished: boolean },
  now: number,
): StudyState {
  return pushEvent(state, { t: now, type: "game", subject, game, ...result });
}

export function segmentDone(
  state: StudyState,
  subject: string,
  day: number,
  kind: SegmentKind,
  outcome: "complete" | "skip",
  ms: number,
  now: number,
  extra: { format?: LearnFormat; game?: GameId } = {},
): StudyState {
  return pushEvent(state, { t: now, type: "segment", subject, day, kind, outcome, ms, ...extra });
}

/** "Show me another way": a strong signal against the format, plus a note on the sitting. */
export function switchedFormat(state: StudyState, subject: string, from: LearnFormat, now: number): StudyState {
  let next = pushEvent(state, { t: now, type: "rating", format: from, up: false });
  const p = next.subjects[subject];
  if (p?.current) next = { ...next, subjects: { ...next.subjects, [subject]: { ...p, current: { ...p.current, switched: true } } } };
  return next;
}

export function rated(state: StudyState, format: LearnFormat, up: boolean, now: number): StudyState {
  return pushEvent(state, { t: now, type: "rating", format, up });
}

export function saidInOwnWords(state: StudyState, conceptId: string, text: string): StudyState {
  const trimmed = text.trim().slice(0, 140);
  const said = { ...state.said };
  if (trimmed) said[conceptId] = trimmed; else delete said[conceptId];
  return { ...state, said };
}

export function checkpointResult(state: StudyState, subject: string, unit: number, score: number, of: number, passMark: number, now: number): StudyState {
  const today = effectiveToday(state, now);
  return withProgress(state, subject, (p) => ({
    ...p,
    checkpoints: { ...p.checkpoints, [unit]: { passed: score >= passMark, score, of, on: today } },
  }), today);
}

export function completeDay(state: StudyState, subject: string, now: number): { state: StudyState; record: SessionRecord } | null {
  const p = state.subjects[subject];
  if (!p?.current) return null;
  const today = effectiveToday(state, now);
  const cur = p.current;
  const minutes = Math.max(1, Math.round((now - cur.startedAt) / 60_000));
  const record: SessionRecord = { subject, day: cur.day, date: today, minutes, correct: cur.correct, asked: cur.asked };
  let next: StudyState = {
    ...state,
    lastSeen: today,
    sessions: [...state.sessions, record],
    subjects: {
      ...state.subjects,
      [subject]: {
        ...p,
        completedDays: p.completedDays.includes(cur.day) ? p.completedDays : [...p.completedDays, cur.day].sort((a, b) => a - b),
        lastCompletedOn: today,
        sessionsToday: (p.lastCompletedOn === today ? p.sessionsToday : 0) + 1,
        current: undefined,
      },
    },
  };
  next = pushEvent(next, { t: now, type: "session", subject, day: cur.day, minutes });
  return { state: next, record };
}

/** A catch-up sitting finished: it counts for the streak but not for any subject's path. */
export function completeReview(state: StudyState, now: number, correct: number, asked: number, startedAt: number): StudyState {
  const today = effectiveToday(state, now);
  const minutes = Math.max(1, Math.round((now - startedAt) / 60_000));
  const record: SessionRecord = { subject: "review", day: 0, date: today, minutes, correct, asked };
  return pushEvent({ ...state, lastSeen: today, sessions: [...state.sessions, record] }, { t: now, type: "session", subject: "review", day: 0, minutes });
}

export function abandonDay(state: StudyState, subject: string, now: number): StudyState {
  const p = state.subjects[subject];
  if (!p?.current) return state;
  const next = pushEvent(state, { t: now, type: "segment", subject, day: p.current.day, kind: "done", outcome: "skip", ms: now - p.current.startedAt });
  return { ...next, subjects: { ...next.subjects, [subject]: { ...p, current: undefined } } };
}

/** An unfinished sitting older than a day is stale: log it and let the learner start fresh. */
export function expireStale(state: StudyState, now: number): StudyState {
  let next = state;
  for (const [subject, p] of Object.entries(state.subjects)) {
    if (p.current && now - p.current.startedAt > 24 * 3600_000) next = abandonDay(next, subject, now);
  }
  return next;
}

export function setMotion(state: StudyState, motion: MotionSetting): StudyState { return { ...state, motion }; }
export function setBeatClock(state: StudyState, beatClock: boolean): StudyState { return { ...state, beatClock }; }
export function setWhen(state: StudyState, when: StudyState["when"]): StudyState { return { ...state, when }; }

// ─── Persistence (browser only) ──────────────────────────────────────────────

export const STUDY_KEY = "dojolom.study";

/** Total: any input yields a usable state. Unknown versions start fresh rather than crash. */
export function migrateStudy(raw: unknown): StudyState {
  if (!raw || typeof raw !== "object") return emptyStudy;
  const r = raw as Record<string, unknown>;
  if (r.version !== 2) return emptyStudy;
  const subjectsIn = (r.subjects && typeof r.subjects === "object" ? r.subjects : {}) as Record<string, Partial<SubjectProgress>>;
  const subjectsOut: Record<string, SubjectProgress> = {};
  for (const [k, v] of Object.entries(subjectsIn)) {
    if (!v || typeof v !== "object") continue;
    subjectsOut[k] = {
      startedOn: typeof v.startedOn === "string" ? v.startedOn : "",
      completedDays: Array.isArray(v.completedDays) ? v.completedDays.filter((d) => Number.isInteger(d)) : [],
      lastCompletedOn: typeof v.lastCompletedOn === "string" ? v.lastCompletedOn : undefined,
      sessionsToday: typeof v.sessionsToday === "number" ? v.sessionsToday : 0,
      checkpoints: v.checkpoints && typeof v.checkpoints === "object" ? v.checkpoints : {},
      current: v.current && typeof v.current === "object" ? { ...v.current, pretest: v.current.pretest ?? {}, stuck: v.current.stuck ?? [], sureWrong: v.current.sureWrong ?? [] } as CurrentSession : undefined,
    };
  }
  const motion = r.motion;
  return {
    version: 2,
    motion: motion === "lively" || motion === "balanced" || motion === "calm" ? motion : "auto",
    beatClock: r.beatClock === true,
    when: r.when === "morning" || r.when === "afternoon" || r.when === "evening" ? r.when : undefined,
    profile: r.profile && typeof r.profile === "object" ? (r.profile as ProfileSnapshot) : undefined,
    lastSeen: typeof r.lastSeen === "string" ? r.lastSeen : "",
    subjects: subjectsOut,
    memory: r.memory && typeof r.memory === "object" ? (r.memory as Record<string, MemoryState>) : {},
    said: r.said && typeof r.said === "object" ? (r.said as Record<string, string>) : {},
    events: Array.isArray(r.events) ? (r.events as StudyEvent[]) : [],
    sessions: Array.isArray(r.sessions) ? (r.sessions as SessionRecord[]) : [],
  };
}

export function loadStudy(): StudyState {
  try {
    const raw = localStorage.getItem(STUDY_KEY);
    return raw ? migrateStudy(JSON.parse(raw)) : emptyStudy;
  } catch {
    return emptyStudy;
  }
}

export function saveStudy(state: StudyState) {
  try { localStorage.setItem(STUDY_KEY, JSON.stringify(state)); } catch {}
}

export function clearStudy() {
  try { localStorage.removeItem(STUDY_KEY); } catch {}
}

export function exportStudy(state: StudyState): string {
  return JSON.stringify({ app: "dojolom", exported: state.lastSeen, study: state }, null, 2);
}

export function importStudy(json: string): StudyState | null {
  try {
    const parsed = JSON.parse(json) as { study?: unknown; version?: unknown };
    const candidate = parsed && typeof parsed === "object" && "study" in parsed ? parsed.study : parsed;
    const state = migrateStudy(candidate);
    return state === emptyStudy && (candidate as { version?: unknown })?.version !== 2 ? null : state;
  } catch {
    return null;
  }
}

// ─── Small helpers the UI shares ─────────────────────────────────────────────

export function subjectById(id: string) {
  return subjects.find((s) => s.id === id);
}

export function styleName(id: StyleId) {
  return learningStyles[id].name;
}

export function formatLabel(f: LearnFormat) {
  return f === "video" ? "Guided walkthrough" : f === "infographic" ? "Infographic" : f === "story" ? "Story" : f === "reading" ? "Deep read" : "Try it yourself";
}

export function formatVerb(f: LearnFormat) {
  return f === "video" ? "Walk through it" : f === "infographic" ? "See the whole picture" : f === "story" ? "Follow the story" : f === "reading" ? "Read it in full" : "Try it yourself";
}
