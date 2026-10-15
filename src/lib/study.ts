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
import { addDays, dayKey, daysBetween, isDayKey, type DayKey } from "@/lib/clock";
import { DESIRED_RETENTION, fitScale, initialState, intervalFor, retrievability, review, type Grade, type Observation } from "@/lib/memory";
import { followThroughFromBehaviour, studyProfile, tuningFor, type Tuning } from "@/lib/personal";
import { ageDefaults, habitsOn, type Setting } from "@/lib/age";

export const CONCEPTS_PER_UNIT = 3;
/** Units in an everyday subject. Curriculum subjects have one unit per textbook chapter, so ask unitsIn(). */
export const UNITS_PER_SUBJECT = 6;

/** How many units a subject has: six for everyday subjects, the chapter count for a curriculum book. */
export function unitsIn(subject: string): number {
  return subjects.find((s) => s.id === subject)?.units.length ?? UNITS_PER_SUBJECT;
}

export type GameId = "pairs" | "order" | "blitz" | "blanks" | "spot";
export const games: Record<GameId, { name: string; blurb: string; colour: "focus" | "sun" | "sprout" | "play"; needsVisuals: boolean }> = {
  pairs:  { name: "Match pairs",     blurb: "Pair each term with its meaning.",                     colour: "play",   needsVisuals: false },
  order:  { name: "Put it in order", blurb: "Arrange the steps into the sequence that makes sense.", colour: "sun",    needsVisuals: false },
  blitz:  { name: "True or false",   blurb: "Quick calls, one statement at a time.",                colour: "focus",  needsVisuals: false },
  blanks: { name: "Fill the gap",    blurb: "Pick the word that completes the sentence.",           colour: "sprout", needsVisuals: false },
  spot:   { name: "Spot it",         blurb: "A picture, four terms. Which one does it show?",       colour: "play",   needsVisuals: true },
};
export const gameIds = Object.keys(games) as GameId[];
/** How far the learner has nudged the support ladder: -1 more help, +1 push me. */
export type Nudge = -1 | 0 | 1;

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
  const total = unitsIn(subject);
  const units = authoredUnits === "all"
    ? Array.from({ length: total }, (_, i) => i + 1)
    : [...authoredUnits].sort((a, b) => a - b);
  // Units must be contiguous from 1: a gap would teach unit 4 before unit 3 exists.
  const contiguous: number[] = [];
  for (let u = 1; u <= total; u++) { if (units.includes(u)) contiguous.push(u); else break; }

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
  return { subject, pace: p, days, authoredUnits: contiguous, totalUnits: total };
}

export function planPreview(subject: string, pace: PaceId | ""): { sessions: number; minutes: number; perSession: number } {
  const plan = buildPlan(subject, pace, "all");
  const per = plan.pace === "sprint" ? 5 : plan.pace === "deep" ? 35 : 15;
  return { sessions: plan.days.length, minutes: plan.days.length * per, perSession: per };
}

// ─── Memory: stability and difficulty per idea, scheduled for 90% recall ─────
// Each idea carries an FSRS memory (src/lib/memory.ts): stability, the days
// until the chance of recalling it falls to 90%, and difficulty. Answers are
// graded from the evidence they carry (right or wrong, how sure, how fluent),
// a review moves the memory once per day at most, and the next review is set
// for when recall is expected to dip to the target. The first review is always
// the next day, after a night's sleep.

/** Stability, in days, at which the path shows an idea one level stronger (0 just met .. 5 solid). */
export const LEVELS = [2, 4, 7, 15, 30];
/** "An idea you hold": still 90% likely to be recalled a week after its last review. */
export const SECURED_DAYS = 7;

export interface MemorySnapshot { stability: number; difficulty: number; reviewedOn: DayKey; due: DayKey }

export interface MemoryState extends MemorySnapshot {
  learnedOn: DayKey;    // first taught; that day's answers set the starting point but never schedule past tomorrow
  /** The worst grade the idea has earned on its latest day of answers, and the memory as it stood before that day's first one. */
  lastGrade?: { on: DayKey; grade: Grade; before: MemorySnapshot | null };
  format?: LearnFormat; // how it was first taught, so formats can be judged by what stuck
  seen: number;         // times taught or reviewed
  right: number;
  wrong: number;
  sureWrong: number;    // confident mistakes, reviewed first
  last?: boolean;       // last delayed answer
  lastAsked: string[];  // recent review-item keys, to avoid repeats
}

export function freshMemory(today: DayKey, format?: LearnFormat): MemoryState {
  return {
    ...initialState(3),
    reviewedOn: today,
    due: addDays(today, 1),
    learnedOn: today,
    lastGrade: { on: today, grade: 3, before: null },
    format, seen: 1, right: 0, wrong: 0, sureWrong: 0, lastAsked: [],
  };
}

export function isDelayed(mem: MemoryState, today: DayKey) {
  return daysBetween(mem.learnedOn, today) >= 1;
}

export function isDue(mem: MemoryState, today: DayKey) {
  return daysBetween(mem.due, today) >= 0;
}

/** Chance the learner recalls the idea today, with their personal forgetting scale applied. */
export function recallChance(mem: MemoryState, today: DayKey, scale = 1): number {
  return retrievability(Math.max(0, daysBetween(mem.reviewedOn, today)), mem.stability * scale);
}

/**
 * The grade an answer earns as evidence of memory. A wrong answer is a lapse.
 * A right one is Hard when the learner was unsure, Easy when they produced it
 * before seeing the options, were sure, and were among their own quickest fifth
 * (fluent retrieval), and Good otherwise. A tap in a game is too weak to move a
 * memory either way: null.
 */
export function gradeAnswer(a: { correct: boolean; source: AnswerSource; confidence: Confidence; thinkMs?: number }, fastThinkMs: number | null = null): Grade | null {
  if (a.source === "game") return null;
  if (!a.correct) return 1;
  if (a.confidence === "unsure") return 2;
  if (a.thinkMs !== undefined && fastThinkMs !== null && a.thinkMs <= fastThinkMs) return 4;
  return 3;
}

const snapshot = (m: MemoryState): MemorySnapshot => ({ stability: m.stability, difficulty: m.difficulty, reviewedOn: m.reviewedOn, due: m.due });

/**
 * One answer about an idea. The memory moves at most once per day, on the
 * worst grade earned that day, recomputed from the state before the day's first
 * answer: a later right answer the same day (a game, a checkpoint, a second go)
 * cannot push the schedule out, and a later miss still counts.
 * On the learning day the grade only sets the starting point (never above Good)
 * and the first review stays tomorrow, because performance minutes after a
 * lesson says little about what will last. A miss brings the idea back tomorrow.
 * A missed game tap changes nothing in the model but asks for a proper check tomorrow.
 */
export function recordAnswer(
  mem: MemoryState | undefined,
  correct: boolean,
  today: DayKey,
  opts: { grade?: Grade | null; confidence?: Confidence; scale?: number; weak?: boolean } = {},
): MemoryState {
  const m = mem ?? freshMemory(today);
  const confidence = opts.confidence ?? "sure";
  const grade = opts.grade === undefined ? (correct ? (confidence === "sure" ? 3 : 2) : 1) : opts.grade;
  const delayed = isDelayed(m, today);
  const next: MemoryState = {
    ...m,
    seen: m.seen + 1,
    right: m.right + (correct ? 1 : 0),
    wrong: m.wrong + (correct ? 0 : 1),
    sureWrong: m.sureWrong + (!correct && confidence === "sure" ? 1 : 0),
    last: delayed ? correct : correct ? m.last : false,
  };
  if (grade === null) {
    return !correct && daysBetween(today, m.due) > 1 ? { ...next, due: addDays(today, 1) } : next;
  }
  const sameDay = m.lastGrade?.on === today;
  const worst = (sameDay ? Math.min(m.lastGrade!.grade, grade) : grade) as Grade;
  if (sameDay && worst === m.lastGrade!.grade) return next;
  if (!delayed) {
    const start = Math.min(worst, 3) as Grade;
    return { ...next, ...initialState(start), reviewedOn: m.learnedOn, due: addDays(today, 1), lastGrade: { on: today, grade: start, before: null } };
  }
  const scale = opts.scale ?? 1;
  const before = (sameDay && m.lastGrade!.before) || snapshot(m);
  const dsr = review(before, Math.max(0, daysBetween(before.reviewedOn, today)), worst, scale, opts.weak === true && worst === grade);
  const due = addDays(today, worst === 1 ? 1 : intervalFor(dsr.stability * scale));
  return { ...next, ...dsr, reviewedOn: today, due, lastGrade: { on: today, grade: worst, before } };
}

/** 0 (just met) to 5 (solid), from how long the memory lasts. */
export function memoryLevel(mem: MemoryState | undefined, scale = 1): number {
  if (!mem) return 0;
  return LEVELS.filter((d) => mem.stability * scale >= d).length;
}

/** 0..1 for the path: how long the idea lasts (on a log scale, full at two months), drained as recall fades past the target. */
export function strength(mem: MemoryState | undefined, today: DayKey, scale = 1): number {
  if (!mem) return 0;
  const lasts = Math.min(1, Math.log1p(mem.stability * scale) / Math.log1p(60));
  const fading = Math.min(1, recallChance(mem, today, scale) / DESIRED_RETENTION);
  return Math.max(0.08, lasts * fading);
}

export function isSecured(mem: MemoryState | undefined, scale = 1) {
  return !!mem && mem.stability * scale >= SECURED_DAYS;
}

/** Concepts due for review today, most urgent first: missed last time, then confident mistakes (they return unless re-tested), then lowest chance of recall. */
export function dueConcepts(memory: Record<string, MemoryState>, ids: string[], today: DayKey, scale = 1): string[] {
  return ids
    .filter((id) => memory[id] && isDue(memory[id], today))
    .sort((a, b) => {
      const A = memory[a], B = memory[b];
      if ((A.last === false) !== (B.last === false)) return A.last === false ? -1 : 1;
      if (A.sureWrong !== B.sureWrong) return B.sureWrong - A.sureWrong;
      return recallChance(A, today, scale) - recallChance(B, today, scale) || ids.indexOf(a) - ids.indexOf(b);
    });
}

// ─── Behaviour log and the signals derived from it ───────────────────────────

export type SegmentKind = "intro" | "rewind" | "learn" | "play" | "check" | "checkpoint" | "cq" | "done";
export type AnswerSource = "rewind" | "check" | "checkpoint" | "game" | "challenge" | "review" | "try" | "say";
/** A guess before the explanation and a teach-back attempt are signals about the sitting, never evidence of memory. */
export const SIGNAL_SOURCES: AnswerSource[] = ["try", "say"];
/** How the learner says today's idea back: typed in their own words, rebuilt from chips, or not at all (sprint). */
export type SayMode = "type" | "build" | "none";

export type StudyEvent =
  | { t: number; type: "segment"; subject: string; day: number; kind: SegmentKind; outcome: "complete" | "skip"; ms: number; format?: LearnFormat; game?: GameId }
  // grade: the evidence the answer carried. el, s, guess: on the first graded answer of a day after the learning day only,
  // the days since the last review, the stability before it, and the item's guess rate, which is what calibrates forgetting.
  // words, readMs: the question's length and the time to answer it, only when the learner read it themselves (src/lib/age.ts readingPace).
  | { t: number; type: "answer"; subject: string; concept: string; correct: boolean; ms: number; source: AnswerSource; confidence?: Confidence; delayed: boolean; thinkMs?: number; grade?: Grade; el?: number; s?: number; guess?: number; words?: number; readMs?: number }
  | { t: number; type: "game"; subject: string; game: GameId; score: number; accuracy: number; ms: number; finished: boolean }
  | { t: number; type: "rating"; format: LearnFormat; up: boolean }   // "Show me another way" logs a down
  | { t: number; type: "session"; subject: string; day: number; minutes: number }
  | { t: number; type: "say"; subject: string; concept: string; mode: Exclude<SayMode, "none">; words: number; correct?: boolean; skipped: boolean } // teach-back, typed or built
  | { t: number; type: "pick"; subject: string; game: GameId; offered: GameId[] } // the learner chose a game from the ones offered
  | { t: number; type: "cq"; subject: string; unit: number; marks: number[] }; // a board-style creative question, self-marked part by part (signal only)

export interface Signals {
  formatScore: Record<LearnFormat, number>;       // engagement, roughly -1 .. +1, shrunk toward 0 on little data
  formatSeen: Record<LearnFormat, number>;
  formatDown: Record<LearnFormat, number>;        // explicit "show me another way" switches away from the format
  formatDelayed: Record<LearnFormat, { right: number; wrong: number }>; // delayed accuracy on concepts learned in this format
  gameScore: Record<GameId, number>;
  gameSeen: Record<GameId, number>;
  gameRecentAccuracy: Record<GameId, number | null>; // last 3 plays
  gamePicked: Record<GameId, number>;             // times the learner chose this game when offered
  gamePassed: Record<GameId, number>;             // times it was offered and another was chosen
  rollingAccuracy: number | null;                 // last 10 answers, for the support ladder
  totalAnswers: number;
  sessionsCompleted: number;
  avgSessionMinutes: number | null;
  saySkipStreak: number;                          // typed teach-backs skipped in a row, most recent first
  fastThinkMs: number | null;                     // the quickest fifth of this learner's sure, right think-first answers: faster than this is fluent
}

export const FLUENCY_MIN_SAMPLES = 6;

function shrink(n: number, k = 5) { return n / (n + k); }

export function deriveSignals(events: StudyEvent[], memory: Record<string, MemoryState> = {}): Signals {
  const raw = { infographic: 0, video: 0, story: 0, reading: 0, challenge: 0 } as Record<LearnFormat, number>;
  const formatSeen = { ...raw };
  const formatDelayed = {} as Signals["formatDelayed"];
  for (const f of learnFormats) formatDelayed[f] = { right: 0, wrong: 0 };
  const gRaw = Object.fromEntries(gameIds.map((g) => [g, 0])) as Record<GameId, number>;
  const gameSeen = { ...gRaw };
  const gamePicked = { ...gRaw };
  const gamePassed = { ...gRaw };
  const gameAcc = Object.fromEntries(gameIds.map((g) => [g, [] as number[]])) as Record<GameId, number[]>;
  const answers: boolean[] = [];
  const minutes: number[] = [];
  const thinks: number[] = [];
  let saySkipStreak = 0;

  const rated = { ...raw }; // explicit ratings, so "show me another way" counts even before a format was ever completed
  const formatDown = { ...raw };
  const isFormat = (f: unknown): f is LearnFormat => typeof f === "string" && f in raw;
  const isGame = (g: unknown): g is GameId => typeof g === "string" && g in gRaw;

  for (const e of events) {
    if (!e || typeof e !== "object") continue;
    if (e.type === "segment" && e.kind === "learn" && isFormat(e.format)) {
      formatSeen[e.format]++;
      raw[e.format] += e.outcome === "skip" ? -1 : 0.5;
    }
    if (e.type === "segment" && e.kind === "play" && isGame(e.game) && e.outcome === "skip") gRaw[e.game] -= 1;
    if (e.type === "rating" && isFormat(e.format)) { raw[e.format] += e.up ? 1 : -1; rated[e.format]++; if (!e.up) formatDown[e.format]++; }
    if (e.type === "answer") {
      answers.push(!!e.correct);
      if (e.correct && e.confidence === "sure" && typeof e.thinkMs === "number" && e.thinkMs > 0) thinks.push(e.thinkMs);
      if (e.delayed) {
        const f = memory[e.concept]?.format;
        if (isFormat(f)) { if (e.correct) formatDelayed[f].right++; else formatDelayed[f].wrong++; }
      }
    }
    if (e.type === "game" && isGame(e.game)) {
      gameSeen[e.game]++;
      gRaw[e.game] += e.finished ? 0.5 : -0.5;
      gameAcc[e.game].push(Number.isFinite(e.accuracy) ? e.accuracy : 0);
    }
    if (e.type === "session" && Number.isFinite(e.minutes)) minutes.push(e.minutes);
    if (e.type === "say" && e.mode === "type") saySkipStreak = e.skipped ? saySkipStreak + 1 : 0;
    if (e.type === "pick" && isGame(e.game)) {
      gamePicked[e.game]++;
      for (const g of Array.isArray(e.offered) ? e.offered : []) if (isGame(g) && g !== e.game) gamePassed[g]++;
    }
  }

  const formatScore = {} as Record<LearnFormat, number>;
  for (const f of learnFormats) {
    const n = formatSeen[f] + rated[f];
    formatScore[f] = n ? Math.max(-1, Math.min(1, raw[f] / n)) * shrink(n) : 0;
  }
  const gameScore = {} as Record<GameId, number>;
  const gameRecentAccuracy = {} as Record<GameId, number | null>;
  for (const g of Object.keys(gRaw) as GameId[]) {
    gameScore[g] = gameSeen[g] ? Math.max(-1, Math.min(1, gRaw[g] / gameSeen[g])) * shrink(gameSeen[g], 3) : 0;
    const recent = gameAcc[g].slice(-3);
    gameRecentAccuracy[g] = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : null;
  }
  const rolling = answers.slice(-10);
  const recentThinks = thinks.slice(-40).sort((a, b) => a - b);
  return {
    fastThinkMs: recentThinks.length >= FLUENCY_MIN_SAMPLES ? recentThinks[Math.floor(recentThinks.length / 5)] : null, // Easy stays rare
    formatScore,
    formatSeen,
    formatDown,
    formatDelayed,
    gameScore,
    gameSeen,
    gameRecentAccuracy,
    gamePicked,
    gamePassed,
    rollingAccuracy: rolling.length ? rolling.filter(Boolean).length / rolling.length : null,
    totalAnswers: answers.length,
    sessionsCompleted: minutes.length,
    avgSessionMinutes: minutes.length ? minutes.reduce((a, b) => a + b, 0) / minutes.length : null,
    saySkipStreak,
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
  opts: { last?: LearnFormat; sessionIndex?: number; pace?: PaceId; curious?: boolean; novice?: boolean } = {},
): FormatChoice {
  const w: Record<LearnFormat, number> = { infographic: 0.5, video: 0.5, story: 0.5, reading: 0.5, challenge: 0.5 };
  const prior = (formats: FormatId[], scale: number) =>
    formats.forEach((f, i) => { if (f !== "game") w[f] += (formats.length - i) * scale; });
  prior(profile.primary.formats, 2);
  prior(profile.secondary.formats, 0.5);

  // No age nudges here: age-matched formats have no evidence behind them (docs/age-learning-rd.md). Age only rules some out.
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
    // Asking for another way is the learner overruling the prior: three switches outweigh the strongest style preference.
    w[f] -= Math.min(8, 2.5 * signals.formatDown[f]);
  }
  if (opts.last) w[opts.last] -= 2.2;

  const off = ageDefaults(learner).noFormats;
  let allowed = learnFormats.filter((f) => !off.includes(f));
  if (opts.novice) allowed = allowed.filter((f) => f !== "challenge"); // a problem before any teaching only once the topic is not new
  if (opts.pace === "sprint") allowed = allowed.filter((f) => f !== "reading" && f !== "challenge");

  const ranked = allowed.sort((a, b) => w[b] - w[a] || learnFormats.indexOf(a) - learnFormats.indexOf(b));
  const every = opts.curious ? 3 : 4; // the curious try a new format every third session
  const exploring = (opts.sessionIndex ?? 0) % every === every - 1 && ranked.length > 2;
  if (exploring) {
    const fresh = [...ranked].reverse().find((f) => signals.formatSeen[f] < 2 && f !== opts.last);
    if (fresh) return { ranked: [fresh, ...ranked.filter((f) => f !== fresh)], exploring: true };
  }
  return { ranked, exploring: false };
}

const gamePrior: Record<StyleId, Record<GameId, number>> = {
  player:      { pairs: 1,   order: 1,   blitz: 3,   blanks: 1,   spot: 2 },
  visual:      { pairs: 3,   order: 2,   blitz: 0.5, blanks: 1,   spot: 3 },
  storyteller: { pairs: 1,   order: 3,   blitz: 0.5, blanks: 1.5, spot: 1.5 },
  tinkerer:    { pairs: 1,   order: 1.5, blitz: 1.5, blanks: 3,   spot: 1 },
  reader:      { pairs: 1.5, order: 1,   blitz: 0.3, blanks: 2.5, spot: 0.5 },
  watcher:     { pairs: 2.5, order: 2,   blitz: 1,   blanks: 1,   spot: 2.5 },
};

export interface GameSupport {
  rung: 0 | 1 | 2;            // 0 = most support, 2 = least
  pairsCount: 4 | 5 | 6;
  blitzSeconds: number | null; // null = untimed
  orderPreplaced: boolean;    // one item already in place
  blanksTyped: boolean;       // fill the gap asks for the word to be typed, not picked
}

/**
 * The engine's rung from recent accuracy, before the learner's nudge. Target is 80-90% success.
 * Until there is accuracy to go on, a learner low on confidence starts on the most supported rung:
 * early wins (mastery experiences) are the strongest source of self-efficacy.
 */
export function baseRung(signals: Signals, buildConfidence = false): 0 | 1 | 2 {
  const acc = signals.rollingAccuracy;
  if (acc !== null && signals.totalAnswers >= 6) return acc < 0.7 ? 0 : acc > 0.9 ? 2 : 1;
  return buildConfidence ? 0 : 1;
}

/** Support ladder: same content at every rung, more or less scaffolding. The learner's nudge moves one rung, within the ladder. Timers are opt-in for everyone. */
export function supportFor(learner: LearnerInput, signals: Signals, beatClock: boolean, nudge: Nudge = 0, buildConfidence = false): GameSupport {
  const rung = Math.max(0, Math.min(2, baseRung(signals, buildConfidence) + nudge)) as 0 | 1 | 2;
  const age = ageDefaults(learner);
  const gentle = age.fewerItems;
  const pairsCount: 4 | 5 | 6 = rung === 0 ? 4 : rung === 1 ? (gentle ? 4 : 5) : gentle ? 5 : 6;
  // The clock is always opt-in, tighter once answers are steady, and never there for children.
  const blitzSeconds = !beatClock || age.timers === "hidden" ? null : rung === 2 ? 8 : 12;
  // Producing the word beats picking it once answers are steady, or when the learner asks to be pushed. Young children keep the chips.
  const blanksTyped = age.sayBack === "type" && (rung === 2 || nudge > 0);
  return { rung, pairsCount, blitzSeconds, orderPreplaced: rung === 0, blanksTyped };
}

export interface GameChoiceOptions {
  last?: GameId;        // yesterday's game, pushed down for variety
  hasVisuals?: boolean; // every concept in the round has illustrations, so picture games are possible
  n?: number;           // how many to offer
}

/** Ranks the games for this learner: style prior, what they chose and won at, age, variety. Picture games need the pictures. */
export function chooseGames(profile: LearnerProfile, learner: LearnerInput, signals: Signals, opts: GameChoiceOptions = {}): GameId[] {
  const w = Object.fromEntries(gameIds.map((g) => [g, 0])) as Record<GameId, number>;
  for (const g of gameIds) {
    w[g] += gamePrior[profile.primary.id][g] + 0.5 * gamePrior[profile.secondary.id][g];
    w[g] += 2 * signals.gameScore[g];
    const acc = signals.gameRecentAccuracy[g];
    if (acc !== null && signals.gameSeen[g] >= 2) w[g] += acc >= 0.8 ? 1.5 : acc < 0.4 ? -1 : 0; // what they win at can beat the style prior
    // What they choose when offered is a preference in its own right; passing a game over counts against it, more gently.
    w[g] += Math.max(-1.5, Math.min(1.5, 0.5 * signals.gamePicked[g] - 0.25 * signals.gamePassed[g]));
  }
  if (opts.last) w[opts.last] -= 2.5;
  // Pre-readers skip the true/false blitz: false statements without a reader's grip on them can stick (Marsh et al. 2012).
  const off = ageDefaults(learner).noGames;
  const ranked = gameIds.filter((g) => !off.includes(g) && (!games[g].needsVisuals || opts.hasVisuals)).sort((a, b) => w[b] - w[a]);
  return ranked.slice(0, Math.max(1, opts.n ?? 1));
}

export function chooseGame(profile: LearnerProfile, learner: LearnerInput, signals: Signals, last?: GameId): GameId {
  return chooseGames(profile, learner, signals, { last })[0];
}

/** How many games to offer at the start of Play: none to choose under the five-minute pace, three when there is time. */
/** Lower-case, accents and punctuation stripped, spaces collapsed: what two typed answers are compared as. */
export function normalizeTyped(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function editDistance(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

/** A typed answer counts when it matches the word ignoring case, accents and punctuation, with one typo forgiven in words of five letters or more. */
export function matchesTyped(guess: string, answer: string): boolean {
  const g = normalizeTyped(guess);
  const a = normalizeTyped(answer);
  if (!g || !a) return false;
  if (g === a) return true;
  return a.length >= 5 && editDistance(g, a) <= 1;
}

export function gameChoiceCount(pace: PaceId): number {
  return pace === "sprint" ? 1 : pace === "deep" ? 3 : 2;
}

/** One line on why a game is offered, shown on its card. */
export function gameOfferReason(game: GameId, signals: Signals, profile: LearnerProfile): string {
  const acc = signals.gameRecentAccuracy[game];
  if (acc !== null && signals.gameSeen[game] >= 2 && acc >= 0.8) return "Your best game lately";
  if (signals.gamePicked[game] >= 2) return "You keep choosing this one";
  if (signals.gameSeen[game] === 0) return "New to you";
  const prior = gamePrior[profile.primary.id];
  const best = gameIds.filter((g) => prior[g] === Math.max(...gameIds.map((x) => prior[x])));
  if (best.includes(game)) return `Suits ${profile.primary.name.toLowerCase()}s`;
  return "A change of pace";
}

export const REVIEW_CAP: Record<PaceId, number> = { sprint: 2, steady: 3, deep: 4 };

/** How many retrieval items open a session. Grows when recent answers were shaky, or when reviews are backing up (new ideas arriving faster than reviews clear them is where learning collapses: Reddy et al. 2016). */
export function reviewLoad(pace: PaceId, signals: Signals, dueCount: number): number {
  let n = pace === "sprint" ? 1 : 2;
  if (signals.rollingAccuracy !== null && signals.rollingAccuracy < 0.7) n++;
  if (dueCount > 2 * REVIEW_CAP[pace]) n++;
  return Math.max(0, Math.min(REVIEW_CAP[pace], n, dueCount));
}

export function motionFor(learner: LearnerInput, profile: LearnerProfile, setting: MotionSetting, reducedMotion = false): MotionProfile {
  if (reducedMotion) return "calm";
  if (setting !== "auto") return setting;
  // Children get balanced, not lively: decorative motion pulls young attention off the lesson (Fisher et al. 2014).
  const byAge = ageDefaults(learner).motion;
  if (byAge) return byAge;
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
  // corrective: a second way in to an idea a failed checkpoint showed was not yet mastered
  | { kind: "learn"; conceptId: string; format: LearnFormat; exploring: boolean; pretest: boolean; compact: boolean; tryFirst: boolean; sayBack: SayMode; corrective?: boolean }
  | { kind: "play"; conceptIds: string[]; game: GameId; support: GameSupport; options?: GameId[]; picked?: boolean } // options: what the learner may choose from; picked: they have
  | { kind: "check"; conceptId: string; count: number; withPretest: boolean }
  // retake: the parallel test after the corrective, on the ideas the first attempt missed
  | { kind: "checkpoint"; unit: number; conceptIds: string[]; perConcept: number; passMark: number; retake?: boolean }
  // a board-style creative question on a curriculum chapter, after its checkpoint
  | { kind: "cq"; unit: number }
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
export function pickReviewItem(conceptId: string, mem: MemoryState | undefined, salt: number, crossSubject = false, scale = 1): ReviewItem {
  const level = memoryLevel(mem, scale);
  const sources: ReviewSource[] = level <= 1 ? ["quiz", "blitz"] : level <= 3 ? ["blank", "pair", "quiz"] : ["pair", "blank", "quiz"];
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

/**
 * A second go after a miss: the same idea asked from another angle, so the
 * retry is retrieved rather than remembered from the feedback a moment ago.
 * Successive relearning: retrieve until right once in the sitting.
 */
export function retryItem(missed: Pick<ReviewItem, "conceptId" | "source" | "index" | "crossSubject">, mem: MemoryState | undefined): ReviewItem {
  const avoid = new Set([reviewKey(missed), ...(mem?.lastAsked ?? [])]);
  const order: ReviewSource[] = (["quiz", "blank", "pair", "blitz"] as ReviewSource[]).filter((s) => s !== missed.source);
  for (const source of [...order, missed.source]) {
    for (let k = 0; k < POOL_SIZES[source]; k++) {
      const item: ReviewItem = { conceptId: missed.conceptId, source, index: (missed.index + 1 + k) % POOL_SIZES[source], crossSubject: missed.crossSubject };
      if (!avoid.has(reviewKey(item))) return item;
    }
  }
  return { ...missed, index: (missed.index + 1) % POOL_SIZES[missed.source] };
}

/** The chance of a right answer by guessing alone, for weighing what a right answer says about memory. */
export function guessRate(source: ReviewSource | "misconception", options?: number): number {
  if (options && options > 1) return 1 / options;
  return source === "blitz" || source === "misconception" ? 1 / 2 : source === "quiz" ? 1 / 4 : 1 / 3;
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

/**
 * Mastery learning's corrective loop. A unit checkpoint that was failed, and not
 * yet retaken, is corrected at the start of the next new session in the subject:
 * the ideas it missed are taught again a different way, then tested again with
 * fresh questions. One retake per unit: whatever still slips after it is left
 * to the spaced rewinds rather than holding the path back.
 */
export function pendingCorrective(plan: SubjectPlan, progress: SubjectProgress | undefined, day: number): { unit: number; conceptIds: string[] } | null {
  if (!progress || progress.completedDays.includes(day)) return null; // replays never carry correctives
  const unitEnd = plan.days.filter((d) => d.day < day && d.isUnitEnd && progress.completedDays.includes(d.day)).at(-1);
  if (!unitEnd) return null;
  const cp = progress.checkpoints[unitEnd.unit];
  if (!cp || cp.passed || cp.retake) return null;
  const unitIds = unitConceptIds(plan.subject, unitEnd.unit);
  const missed = (cp.missed ?? []).filter((id) => unitIds.includes(id));
  return { unit: unitEnd.unit, conceptIds: missed.length ? missed : unitIds };
}

export function buildSession(
  plan: SubjectPlan,
  day: number,
  learner: LearnerInput,
  profile: LearnerProfile,
  state: StudyState,
  today: DayKey,
  otherPlans: SubjectPlan[] = [],
  caps: { hasVisuals?: (conceptIds: string[]) => boolean } = {},
): SessionPlan {
  const dp = plan.days.find((d) => d.day === day);
  if (!dp) throw new Error(`No session ${day} in plan for ${plan.subject}`);
  const progress = state.subjects[plan.subject];
  const signals = deriveSignals(state.events, state.memory);
  const scale = state.memoryScale;
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
    const due = dueConcepts(state.memory, learned, today, scale);
    const load = reviewLoad(plan.pace, signals, Math.max(due.length, 1));
    const recapIds = previous?.conceptIds ?? [];
    const pool = due.length ? due : recapIds;
    const items = pool.slice(0, load).map((id, i) => pickReviewItem(id, state.memory[id], day + i, false, scale));
    // Interleave at most one overdue idea from another subject, clearly labelled in the UI.
    const otherLearned = otherPlans.filter((p) => p.subject !== plan.subject).flatMap((p) => learnedIds(p, state.subjects[p.subject]));
    const otherDue = dueConcepts(state.memory, otherLearned, today, scale);
    if (otherDue.length && items.length < REVIEW_CAP[plan.pace] && plan.pace !== "sprint") {
      items.push(pickReviewItem(otherDue[0], state.memory[otherDue[0]], day + 99, true, scale));
    }
    segments.push({ kind: "rewind", items, recapIds });
    minutes += 0.75 + items.length * 0.5;
  }

  const lastLearn = lastEvent<"segment">(state.events, (e) => e.type === "segment" && e.kind === "learn");
  const lastPlay = lastEvent<"segment">(state.events, (e) => e.type === "segment" && e.kind === "play");
  const tuning = tuningOf(learner, state, today);
  const age = ageDefaults(learner);
  // New to the topic (the chapter's first idea), or answers are shaky: explain first at any age (Ashman, Kalyuga & Sweller 2020).
  const unitIds = unitConceptIds(plan.subject, dp.unit);
  const shaky = signals.rollingAccuracy !== null && signals.rollingAccuracy < 0.6;
  const novice = (c: string) => shaky || unitIds.indexOf(c) <= 0;
  const { ranked, exploring } = rankFormats(profile, learner, signals, { last: lastLearn?.format, sessionIndex, pace: plan.pace, curious: tuning.goDeeper, novice: novice(dp.conceptIds[0]) });
  const support = supportFor(learner, signals, state.beatClock, state.nudge, tuning.buildConfidence);
  // Mastery bar: 5 of 6. Mastery programmes gain more with a high standard (Kulik, Kulik & Bangert-Drowns 1990), and the
  // corrective loop below is what makes a high bar fair. The three-question sprint checkpoint keeps 2 of 3.
  const passMark = 5;
  // Play offers a small choice of games (two, three under the deep pace, none under sprint); the engine's favourite comes first.
  const play = (conceptIds: string[]): Segment => {
    const hasVisuals = state.pictures && (caps.hasVisuals?.(conceptIds) ?? false);
    const options = chooseGames(profile, learner, signals, { last: lastPlay?.game, hasVisuals, n: gameChoiceCount(plan.pace) });
    return { kind: "play", conceptIds, game: options[0], support, options: options.length > 1 ? options : undefined };
  };

  // Learn by doing. Guess: the misconception, true or false (not before about 8). Try: a go at the example before it is
  // explained, which primes the explanation; not under 12, where instruction first works better (Sinha & Kapur 2021), not
  // for a novice at any age, and not in a 5-minute sitting. Say: the idea said back before the key points are shown, typed
  // in their own words or rebuilt from chips. Chips until about 10; a learner who keeps skipping the typing gets them too.
  const typed: SayMode = age.sayBack === "build" || signals.saySkipStreak >= 2 ? "build" : "type";
  type LearnSeg = Extract<Segment, { kind: "learn" }>;
  const learnSegment = (c: string, format: LearnFormat, exploring: boolean, compact: boolean, sayBack: SayMode): LearnSeg => ({
    kind: "learn", conceptId: c, format, exploring, pretest: age.guessFirst, compact, sayBack,
    tryFirst: age.tryFirst && !novice(c) && !compact && format !== "challenge",
  });
  const learnMinutes = (s: LearnSeg) => (s.tryFirst ? 0.5 : 0) + (s.sayBack === "type" ? 1 : s.sayBack === "build" ? 0.75 : 0);

  // Correct before moving on: the weakest missed ideas taught again in a format they were not first taught in, then a retake.
  // The game makes room for it, so the sitting keeps roughly its length.
  const fix = pendingCorrective(plan, progress, day);
  if (fix) {
    const weakest = [...fix.conceptIds].sort((a, b) => (state.memory[a] ? recallChance(state.memory[a], today, scale) : 0) - (state.memory[b] ? recallChance(state.memory[b], today, scale) : 0));
    for (const c of weakest.slice(0, plan.pace === "deep" ? 2 : 1)) {
      const first = state.memory[c]?.format;
      const format = ranked.find((f) => f !== first) ?? ranked[0];
      segments.push({ kind: "learn", conceptId: c, format, exploring: false, pretest: false, compact: true, tryFirst: false, sayBack: plan.pace === "sprint" ? "none" : "build", corrective: true });
      minutes += plan.pace === "sprint" ? 2 : 2.75;
    }
    const perConcept = plan.pace === "sprint" ? 1 : 2;
    const count = fix.conceptIds.length * perConcept;
    segments.push({ kind: "checkpoint", unit: fix.unit, conceptIds: fix.conceptIds, perConcept, passMark: count - Math.floor(count / 4), retake: true }); // at most one miss in four
    minutes += 0.5 + count * 0.5;
  }

  if (plan.pace === "deep") {
    dp.conceptIds.forEach((c, i) => {
      const seg = learnSegment(c, ranked[i % ranked.length], exploring && i === 0, false, i === 0 ? typed : "build");
      segments.push(seg);
      segments.push({ kind: "check", conceptId: c, count: 2, withPretest: true });
      minutes += 5 + learnMinutes(seg) + 1.5;
    });
    if (!fix) { segments.push(play(dp.conceptIds)); minutes += 4; }
    segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: dp.conceptIds, perConcept: 2, passMark });
    minutes += 5;
  } else if (plan.pace === "sprint") {
    const c = dp.conceptIds[0];
    segments.push(learnSegment(c, ranked[0], exploring, true, "none"));
    minutes += 2.5;
    if (dp.isUnitEnd) {
      segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: unitConceptIds(plan.subject, dp.unit), perConcept: 1, passMark: 2 });
      minutes += 2;
    } else if (fix) {
      // the retake was today's check
    } else if (day % 2 === 1) {
      segments.push(play([c, ...learned.slice(-1)]));
      minutes += 2;
    } else {
      segments.push({ kind: "check", conceptId: c, count: 2, withPretest: true });
      minutes += 1.5;
    }
  } else {
    const c = dp.conceptIds[0];
    const seg = learnSegment(c, ranked[0], exploring, false, typed);
    segments.push(seg);
    minutes += 4.5 + learnMinutes(seg);
    if (dp.isUnitEnd) {
      segments.push({ kind: "checkpoint", unit: dp.unit, conceptIds: unitConceptIds(plan.subject, dp.unit), perConcept: 2, passMark });
      minutes += 5;
    } else {
      if (!fix) { segments.push(play([c, ...learned.slice(-2)])); minutes += 3.5; }
      segments.push({ kind: "check", conceptId: c, count: 3, withPretest: true });
      minutes += 2;
    }
  }
  // A curriculum chapter ends the way the board exam asks about it: one creative question, self-marked against model answers.
  if (dp.isUnitEnd && plan.pace !== "sprint" && subjectById(plan.subject)?.curriculum) {
    segments.push({ kind: "cq", unit: dp.unit });
    minutes += 6;
  }
  segments.push({ kind: "done" });
  return { day: dp, segments, estMinutes: Math.max(1, Math.round(minutes)) };
}

/** What the app changes for this learner today: their study profile as a prior, what they actually do as the evidence. */
export function tuningOf(learner: LearnerInput, state: StudyState, today: DayKey): Tuning {
  const dates = state.sessions.map((s) => s.date);
  const abandoned = state.events.filter((e) => e.type === "segment" && e.kind === "done" && e.outcome === "skip").map((e) => dayKey(e.t));
  const last = dates.filter((d) => isDayKey(d)).sort().at(-1);
  const age = ageDefaults(learner);
  // Under 18, plans are tuned from behaviour only once a parent or guardian turns it on (Bangladesh PDPO 2025, s.9).
  return tuningFor(studyProfile(learner.study), {
    isKid: !age.studyQuestions,
    behaviour: habitsOn(age, state.guardianHabits) ? followThroughFromBehaviour(dates, abandoned, today, learner.pace) : null,
    daysSinceLast: last ? daysBetween(last, today) : null,
  });
}

/** A catch-up sitting: only retrieval, on what is due and then the ideas least likely to be recalled, across every started subject. */
export function buildReviewSession(state: StudyState, plans: SubjectPlan[], today: DayKey, max = 6): ReviewItem[] {
  const scale = state.memoryScale;
  const learned = plans.flatMap((p) => learnedIds(p, state.subjects[p.subject])).filter((id) => state.memory[id]);
  const due = dueConcepts(state.memory, learned, today, scale);
  const weak = learned
    .filter((id) => !due.includes(id))
    .sort((a, b) => recallChance(state.memory[a], today, scale) - recallChance(state.memory[b], today, scale));
  return [...due, ...weak].slice(0, max).map((id, i) => pickReviewItem(id, state.memory[id], 500 + i, false, scale));
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

export interface CheckpointResult {
  passed: boolean;
  score: number;
  of: number;
  on: DayKey;
  missed?: string[]; // the ideas answered wrong, which the corrective teaches again
  retake?: boolean;  // this result is the retake after the corrective; there is no second one
}

export interface SubjectProgress {
  startedOn: DayKey;
  pace?: PaceId;              // the pace the completed days were counted under
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
  beatClock: boolean;     // learner opted into timers (untimed by default; never offered to children)
  readAloud: Setting;     // auto: from measured reading, then age (src/lib/age.ts)
  largeText: Setting;
  guardianHabits?: boolean; // a parent or guardian allowed habit tuning from behaviour for an under-18
  nudge: Nudge;           // the learner's push on the support ladder: more help, just right, push me
  pictures: boolean;      // illustrations in games where they exist
  when?: "morning" | "afternoon" | "evening";
  cue?: string;           // the if-then plan: "after <cue>, I do my session"
  planOn?: DayKey;        // when the plan was made, so a plan that slipped can be asked about again
  profile?: ProfileSnapshot;
  lastSeen: DayKey | "";
  subjects: Record<string, SubjectProgress>;
  memory: Record<string, MemoryState>;
  memoryScale: number;    // the learner's own forgetting, fitted to their delayed answers: 1 is the model's average, 2 forgets half as fast
  said: Record<string, string>; // the learner's own one-line summaries, replayed in Rewind
  events: StudyEvent[];
  sessions: SessionRecord[];
}

export const emptyStudy: StudyState = {
  version: 2,
  motion: "auto",
  beatClock: false,
  readAloud: "auto",
  largeText: "auto",
  nudge: 0,
  pictures: true,
  lastSeen: "",
  subjects: {},
  memory: {},
  memoryScale: 1,
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
  const set = new Set(sessions.filter((s) => s && isDayKey(s.date)).map((s) => s.date));
  const activeToday = set.has(today);
  const thisWeek = [...set].filter((d) => { const gap = daysBetween(d, today); return gap >= 0 && gap < 7; }).length;

  const walk = (start: DayKey) => {
    let count = 0, cursor = start, restUsed = false, lastRest = -99, i = 0;
    while (i < 4000) {
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

/** Ideas first learned in the last seven days, and in all: progress against the learner's own past, never against others. */
export function ideasProgress(memory: Record<string, MemoryState>, today: DayKey): { week: number; total: number } {
  const all = Object.values(memory);
  return { week: all.filter((m) => daysBetween(m.learnedOn, today) < 7).length, total: all.length };
}

export function securedCount(state: StudyState, ids: string[]) {
  return ids.filter((id) => isSecured(state.memory[id], state.memoryScale)).length;
}

/** All concepts due for review across every subject the learner has started. */
export function dueAcross(state: StudyState, plans: SubjectPlan[], today: DayKey): string[] {
  return dueConcepts(state.memory, plans.flatMap((p) => learnedIds(p, state.subjects[p.subject])), today, state.memoryScale);
}

export const CLOCK_GUARD_DAYS = 3;

/**
 * Guard against a clock that went backwards: never let "today" precede the
 * last day we saw. The guard is bounded: if the device is more than a few days
 * behind the last day seen, the earlier day was the wrong one (a clock set
 * ahead, or a backup from such a device), so the device wins and touch() pulls
 * lastSeen back. Otherwise one forward-dated visit would lock the app for months.
 */
export function effectiveToday(state: StudyState, now: number): DayKey {
  const today = dayKey(now);
  if (!state.lastSeen || !isDayKey(state.lastSeen)) return today;
  const ahead = daysBetween(today, state.lastSeen);
  return ahead > 0 && ahead <= CLOCK_GUARD_DAYS ? state.lastSeen : today;
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

export function startDay(state: StudyState, subject: string, day: number, now: number, override = false, segments?: Segment[], pace?: PaceId): StudyState {
  const today = effectiveToday(state, now);
  return withProgress(state, subject, (p) => ({
    ...p,
    pace: pace ?? p.pace,
    sessionsToday: p.lastCompletedOn === today ? p.sessionsToday : 0,
    current: { day, segment: 0, startedAt: now, correct: 0, asked: 0, stuck: [], sureWrong: [], pretest: {}, switched: false, override, segments },
  }), today);
}

/**
 * A pace change re-cuts the path into different sessions, so completed-day
 * numbers counted under the old pace would mean something else under the new
 * one. Translate them: a new session counts as done when every idea in it was
 * already taught. Ideas left over are taught again (their memory is kept).
 */
export function reconcilePlan(state: StudyState, plan: SubjectPlan): StudyState {
  const p = state.subjects[plan.subject];
  if (!p || p.pace === plan.pace) return state;
  if (!p.pace) return { ...state, subjects: { ...state.subjects, [plan.subject]: { ...p, pace: plan.pace } } };
  const before = buildPlan(plan.subject, p.pace, plan.authoredUnits);
  const taught = new Set(learnedIds(before, p));
  const completedDays = plan.days.filter((d) => d.conceptIds.every((c) => taught.has(c))).map((d) => d.day);
  // A sitting left open under the old pace refers to a session that no longer exists.
  return { ...state, subjects: { ...state.subjects, [plan.subject]: { ...p, pace: plan.pace, completedDays, current: undefined } } };
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

/** A question the learner read for themselves: its length in words and the time from showing it to the answer. */
export interface ReadSample { words: number; ms: number }

const readFields = (r?: ReadSample) =>
  r && Number.isFinite(r.words) && Number.isFinite(r.ms) && r.words > 0 && r.ms > 0 ? { words: Math.round(r.words), readMs: Math.round(r.ms) } : {};

export function answered(
  state: StudyState,
  subject: string,
  concept: string,
  correct: boolean,
  now: number,
  opts: { ms?: number; source: AnswerSource; confidence?: Confidence; item?: ReviewItem; thinkMs?: number; guess?: number; read?: ReadSample },
): StudyState {
  if (SIGNAL_SOURCES.includes(opts.source)) {
    // A guess before the explanation, or a teach-back attempt: logged for adaptation, but it neither moves a memory nor counts on the sitting.
    return pushEvent(state, { t: now, type: "answer", subject, concept, correct, ms: opts.ms ?? 0, source: opts.source, confidence: opts.confidence, delayed: false, thinkMs: opts.thinkMs, ...readFields(opts.read) });
  }
  const today = effectiveToday(state, now);
  const existing = state.memory[concept];
  const delayed = existing ? isDelayed(existing, today) : false;
  // A game tap or a timeout is weak evidence: it never counts as a confident mistake and never moves a memory.
  const confidence: Confidence = opts.source === "game" ? "unsure" : opts.confidence ?? "sure";
  const fast = opts.thinkMs !== undefined ? deriveSignals(state.events).fastThinkMs : null;
  const grade = gradeAnswer({ correct, source: opts.source, confidence, thinkMs: opts.thinkMs }, fast);
  // Picked from options that were visible all along: recognised, not recalled first, so weaker evidence (see review()).
  const weak = correct && opts.thinkMs === undefined;
  let mem = recordAnswer(existing, correct, today, { grade, confidence, scale: state.memoryScale, weak });
  if (opts.item) mem = { ...mem, lastAsked: [...mem.lastAsked, reviewKey(opts.item)].slice(-4) };
  let next: StudyState = { ...state, memory: { ...state.memory, [concept]: mem } };
  // The day's first graded answer after the learning day is a clean test of forgetting: keep what the calibration needs.
  const firstTest = existing && delayed && grade !== null && existing.lastGrade?.on !== today;
  const calib = firstTest
    ? { el: daysBetween(existing.reviewedOn, today), s: Math.round(existing.stability * 1000) / 1000, guess: opts.guess ?? guessRate(opts.item?.source ?? "quiz") }
    : {};
  next = pushEvent(next, { t: now, type: "answer", subject, concept, correct, ms: opts.ms ?? 0, source: opts.source, confidence, delayed, thinkMs: opts.thinkMs, ...(grade !== null ? { grade } : {}), ...calib, ...readFields(opts.read) });
  const p = next.subjects[subject];
  if (p?.current && opts.source !== "review") {
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

export const SAID_MAX = 220;

export function saidInOwnWords(state: StudyState, conceptId: string, text: string): StudyState {
  const trimmed = text.trim().slice(0, SAID_MAX);
  const said = { ...state.said };
  if (trimmed) said[conceptId] = trimmed; else delete said[conceptId];
  return { ...state, said };
}

/** A creative question was answered and self-marked (marks per part, out of 1, 2, 3 and 4). A signal about exam readiness, never memory evidence. */
export function answeredCq(state: StudyState, subject: string, unit: number, marks: number[], now: number): StudyState {
  return pushEvent(state, { t: now, type: "cq", subject, unit, marks });
}

/** Teach-back: the learner explained the idea in their own words, or rebuilt a key point from chips. Typed words are kept for tomorrow's rewind. */
export function saidBack(state: StudyState, subject: string, conceptId: string, now: number, r: { mode: Exclude<SayMode, "none">; text?: string; correct?: boolean; skipped: boolean }): StudyState {
  const text = r.mode === "type" && !r.skipped ? (r.text ?? "").trim() : "";
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  let next = pushEvent(state, { t: now, type: "say", subject, concept: conceptId, mode: r.mode, words, correct: r.correct, skipped: r.skipped });
  if (text) next = saidInOwnWords(next, conceptId, text);
  return next;
}

/** A unit checkpoint finished. A retake that passes secures the unit; one that does not is still recorded, so no further retake is set. */
export function checkpointResult(
  state: StudyState,
  subject: string,
  unit: number,
  r: { score: number; of: number; passed: boolean; missed?: string[]; retake?: boolean },
  now: number,
): StudyState {
  const today = effectiveToday(state, now);
  const result: CheckpointResult = { passed: r.passed, score: r.score, of: r.of, on: today };
  if (r.missed?.length) result.missed = [...new Set(r.missed)];
  if (r.retake) result.retake = true;
  return withProgress(state, subject, (p) => ({ ...p, checkpoints: { ...p.checkpoints, [unit]: result } }), today);
}

/** The delayed answers that test forgetting cleanly, for the calibration. */
export function forgettingObservations(events: StudyEvent[]): Observation[] {
  const out: Observation[] = [];
  for (const e of events) {
    if (e.type !== "answer" || e.el === undefined || e.s === undefined || e.guess === undefined) continue;
    out.push({ days: e.el, stability: e.s, correct: e.correct, guess: e.guess });
  }
  return out;
}

/** Refit the learner's forgetting scale from their log; done when a sitting ends, so it never shifts mid-session. */
export function recalibrate(state: StudyState): StudyState {
  const memoryScale = fitScale(forgettingObservations(state.events));
  return memoryScale === state.memoryScale ? state : { ...state, memoryScale };
}

export function completeDay(state: StudyState, subject: string, now: number): { state: StudyState; record: SessionRecord } | null {
  const p = state.subjects[subject];
  if (!p?.current) return null;
  const today = effectiveToday(state, now);
  const cur = p.current;
  const minutes = Math.max(1, Math.round((now - cur.startedAt) / 60_000));
  const record: SessionRecord = { subject, day: cur.day, date: today, minutes, correct: cur.correct, asked: cur.asked };
  const replay = p.completedDays.includes(cur.day); // counts for the streak, never for the daily gate
  let next: StudyState = {
    ...state,
    lastSeen: today,
    sessions: [...state.sessions, record],
    subjects: {
      ...state.subjects,
      [subject]: {
        ...p,
        completedDays: replay ? p.completedDays : [...p.completedDays, cur.day].sort((a, b) => a - b),
        lastCompletedOn: replay ? p.lastCompletedOn : today,
        sessionsToday: replay ? p.sessionsToday : (p.lastCompletedOn === today ? p.sessionsToday : 0) + 1,
        current: undefined,
      },
    },
  };
  next = pushEvent(next, { t: now, type: "session", subject, day: cur.day, minutes });
  return { state: recalibrate(next), record };
}

/** A catch-up sitting finished: it counts for the streak but not for any subject's path. */
export function completeReview(state: StudyState, now: number, correct: number, asked: number, startedAt: number): StudyState {
  const today = effectiveToday(state, now);
  const minutes = Math.max(1, Math.round((now - startedAt) / 60_000));
  const record: SessionRecord = { subject: "review", day: 0, date: today, minutes, correct, asked };
  return recalibrate(pushEvent({ ...state, lastSeen: today, sessions: [...state.sessions, record] }, { t: now, type: "session", subject: "review", day: 0, minutes }));
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
export function setReadAloud(state: StudyState, readAloud: Setting): StudyState { return { ...state, readAloud }; }
export function setLargeText(state: StudyState, largeText: Setting): StudyState { return { ...state, largeText }; }
export function setGuardianHabits(state: StudyState, on: boolean): StudyState { return { ...state, guardianHabits: on || undefined }; }
const isSetting = (v: unknown): v is Setting => v === "auto" || v === "on" || v === "off";
export function setNudge(state: StudyState, nudge: Nudge): StudyState { return { ...state, nudge }; }
export function setPictures(state: StudyState, pictures: boolean): StudyState { return { ...state, pictures }; }

/** The learner chose a game from the ones offered: the segment plays it (a reload resumes the same round) and the pick is remembered as a preference. */
export function pickedGame(state: StudyState, subject: string, index: number, game: GameId, now: number): StudyState {
  const p = state.subjects[subject];
  const seg = p?.current?.segments?.[index];
  if (!seg || seg.kind !== "play") return state;
  const offered = seg.options ?? [seg.game];
  if (!offered.includes(game)) return state;
  const next = replaceSegment(state, subject, index, { ...seg, game, picked: true });
  return pushEvent(next, { t: now, type: "pick", subject, game, offered });
}
export function setWhen(state: StudyState, when: StudyState["when"]): StudyState { return { ...state, when }; }
export const PLAN_CUE_MAX = 60;
/** The if-then plan: a cue the learner already meets every day, tied to the session. */
export function setPlan(state: StudyState, cue: string, now: number): StudyState {
  const c = cue.trim().slice(0, PLAN_CUE_MAX);
  return { ...state, cue: c || undefined, planOn: c ? effectiveToday(state, now) : undefined };
}

// ─── Persistence (browser only) ──────────────────────────────────────────────

export const STUDY_KEY = "dojolom.study";

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object";
const num = (v: unknown, fallback = 0) => (typeof v === "number" && Number.isFinite(v) ? v : fallback);
const isFormatId = (f: unknown): f is LearnFormat => typeof f === "string" && (learnFormats as string[]).includes(f);
const isGameId = (g: unknown): g is GameId => typeof g === "string" && g in games;
const isPace = (p: unknown): p is PaceId => p === "sprint" || p === "steady" || p === "deep";
const SEGMENT_KINDS: SegmentKind[] = ["intro", "rewind", "learn", "play", "check", "checkpoint", "cq", "done"];
const ANSWER_SOURCES: AnswerSource[] = ["rewind", "check", "checkpoint", "game", "challenge", "review", "try", "say"];

/** The Leitner intervals the first study engine used, in days by box; old saves are translated through them. */
const LEGACY_INTERVALS = [1, 2, 4, 7, 15, 30];
const isGrade = (g: unknown): g is Grade => g === 1 || g === 2 || g === 3 || g === 4;

function migrateSnapshot(v: unknown, learnedOn: DayKey): MemorySnapshot | null {
  if (!isObj(v) || !(num(v.stability) > 0)) return null;
  const reviewedOn = isDayKey(v.reviewedOn) ? v.reviewedOn : learnedOn;
  return {
    stability: Math.min(36500, num(v.stability)),
    difficulty: Math.max(1, Math.min(10, num(v.difficulty, 5))),
    reviewedOn,
    due: isDayKey(v.due) ? v.due : addDays(reviewedOn, 1),
  };
}

function migrateMemory(raw: unknown): Record<string, MemoryState> {
  const out: Record<string, MemoryState> = {};
  if (!isObj(raw)) return out;
  for (const [id, v] of Object.entries(raw)) {
    if (!isObj(v) || !isDayKey(v.learnedOn)) continue;
    const right = Math.max(0, Math.floor(num(v.right)));
    const wrong = Math.max(0, Math.floor(num(v.wrong)));
    let model = migrateSnapshot(v, v.learnedOn);
    if (!model) {
      // A Leitner memory: its interval stands in for stability, its miss rate for difficulty, and the clock starts one interval before it is due.
      const box = Math.max(0, Math.min(LEGACY_INTERVALS.length - 1, Math.floor(num(v.box))));
      const due = isDayKey(v.due) ? v.due : addDays(v.learnedOn, LEGACY_INTERVALS[box]);
      const back = addDays(due, -LEGACY_INTERVALS[box]);
      model = {
        stability: LEGACY_INTERVALS[box],
        difficulty: Math.max(1, Math.min(10, initialState(3).difficulty + (5 * wrong) / Math.max(1, right + wrong))),
        reviewedOn: daysBetween(v.learnedOn, back) > 0 ? back : v.learnedOn,
        due,
      };
    }
    const lg = isObj(v.lastGrade) ? v.lastGrade : null;
    out[id] = {
      ...model,
      learnedOn: v.learnedOn,
      lastGrade: lg && isDayKey(lg.on) && isGrade(lg.grade) ? { on: lg.on, grade: lg.grade, before: migrateSnapshot(lg.before, v.learnedOn) } : undefined,
      format: isFormatId(v.format) ? v.format : undefined,
      seen: Math.max(1, Math.floor(num(v.seen, 1))),
      right,
      wrong,
      sureWrong: Math.max(0, Math.floor(num(v.sureWrong))),
      last: typeof v.last === "boolean" ? v.last : undefined,
      lastAsked: Array.isArray(v.lastAsked) ? v.lastAsked.filter((k): k is string => typeof k === "string").slice(-4) : [],
    };
  }
  return out;
}

/** The grade and calibration fields of an answer event, kept only when they are well formed. */
function answerExtras(e: Record<string, unknown>): { grade?: Grade; el?: number; s?: number; guess?: number; words?: number; readMs?: number } {
  const out: { grade?: Grade; el?: number; s?: number; guess?: number; words?: number; readMs?: number } = {};
  if (num(e.words) > 0 && num(e.readMs) > 0) { out.words = num(e.words); out.readMs = num(e.readMs); }
  if (isGrade(e.grade)) out.grade = e.grade;
  if (num(e.el, -1) >= 0 && num(e.s) > 0 && num(e.guess, -1) >= 0 && num(e.guess) < 1) { out.el = num(e.el); out.s = num(e.s); out.guess = num(e.guess); }
  return out;
}

function migrateEvent(e: unknown): StudyEvent | null {
  if (!isObj(e) || typeof e.t !== "number") return null;
  const t = e.t;
  switch (e.type) {
    case "segment":
      if (typeof e.subject !== "string" || !SEGMENT_KINDS.includes(e.kind as SegmentKind)) return null;
      return { t, type: "segment", subject: e.subject, day: num(e.day), kind: e.kind as SegmentKind, outcome: e.outcome === "skip" ? "skip" : "complete", ms: num(e.ms), format: isFormatId(e.format) ? e.format : undefined, game: isGameId(e.game) ? e.game : undefined };
    case "answer":
      if (typeof e.subject !== "string" || typeof e.concept !== "string" || !ANSWER_SOURCES.includes(e.source as AnswerSource)) return null;
      return { t, type: "answer", subject: e.subject, concept: e.concept, correct: e.correct === true, ms: num(e.ms), source: e.source as AnswerSource, confidence: e.confidence === "sure" || e.confidence === "unsure" ? e.confidence : undefined, delayed: e.delayed === true, thinkMs: typeof e.thinkMs === "number" && Number.isFinite(e.thinkMs) ? e.thinkMs : undefined, ...answerExtras(e) };
    case "game":
      if (typeof e.subject !== "string" || !isGameId(e.game)) return null;
      return { t, type: "game", subject: e.subject, game: e.game, score: num(e.score), accuracy: Math.max(0, Math.min(1, num(e.accuracy))), ms: num(e.ms), finished: e.finished === true };
    case "rating":
      if (!isFormatId(e.format)) return null;
      return { t, type: "rating", format: e.format, up: e.up === true };
    case "session":
      if (typeof e.subject !== "string") return null;
      return { t, type: "session", subject: e.subject, day: num(e.day), minutes: num(e.minutes) };
    case "say":
      if (typeof e.subject !== "string" || typeof e.concept !== "string" || (e.mode !== "type" && e.mode !== "build")) return null;
      return { t, type: "say", subject: e.subject, concept: e.concept, mode: e.mode, words: Math.max(0, Math.floor(num(e.words))), correct: typeof e.correct === "boolean" ? e.correct : undefined, skipped: e.skipped === true };
    case "pick":
      if (typeof e.subject !== "string" || !isGameId(e.game)) return null;
      return { t, type: "pick", subject: e.subject, game: e.game, offered: Array.isArray(e.offered) ? e.offered.filter(isGameId) : [e.game] };
    case "cq":
      if (typeof e.subject !== "string" || !Array.isArray(e.marks)) return null;
      return { t, type: "cq", subject: e.subject, unit: num(e.unit), marks: e.marks.slice(0, 4).map((m) => Math.max(0, Math.min(4, num(m)))) };
    default:
      return null;
  }
}

function migrateSession(r: unknown): SessionRecord | null {
  if (!isObj(r) || typeof r.subject !== "string" || !isDayKey(r.date)) return null;
  return { subject: r.subject, day: num(r.day), date: r.date, minutes: num(r.minutes), correct: num(r.correct), asked: num(r.asked) };
}

function migrateCurrent(v: unknown): CurrentSession | undefined {
  if (!isObj(v) || typeof v.day !== "number" || typeof v.startedAt !== "number") return undefined;
  const strings = (x: unknown) => (Array.isArray(x) ? x.filter((s): s is string => typeof s === "string") : []);
  return {
    day: v.day,
    segment: Math.max(0, Math.floor(num(v.segment))),
    startedAt: v.startedAt,
    correct: num(v.correct),
    asked: num(v.asked),
    stuck: strings(v.stuck),
    sureWrong: strings(v.sureWrong),
    pretest: isObj(v.pretest) ? Object.fromEntries(Object.entries(v.pretest).filter(([, b]) => typeof b === "boolean")) as Record<string, boolean> : {},
    switched: v.switched === true,
    override: v.override === true,
    // Sittings saved before the learn-by-doing flags existed default to the plain flow rather than crashing the player.
    segments: Array.isArray(v.segments) && v.segments.every((s) => isObj(s) && SEGMENT_KINDS.includes(s.kind as SegmentKind))
      ? (v.segments as Segment[]).map((s) => (s.kind === "learn" ? { ...s, tryFirst: s.tryFirst === true, sayBack: s.sayBack === "type" || s.sayBack === "build" ? s.sayBack : "none" } : s))
      : undefined,
  };
}

/** Total: any input yields a usable state. Unknown versions start fresh rather than crash, and damaged records are repaired or dropped. */
export function migrateStudy(raw: unknown): StudyState {
  if (!isObj(raw)) return emptyStudy;
  const r = raw;
  if (r.version !== 2) return emptyStudy;
  const subjectsIn = isObj(r.subjects) ? r.subjects : {};
  const subjectsOut: Record<string, SubjectProgress> = {};
  for (const [k, v] of Object.entries(subjectsIn)) {
    if (!isObj(v)) continue;
    const checkpoints: Record<string, CheckpointResult> = {};
    if (isObj(v.checkpoints)) {
      for (const [unit, cp] of Object.entries(v.checkpoints)) {
        if (!isObj(cp) || !isDayKey(cp.on)) continue;
        const result: CheckpointResult = { passed: cp.passed === true, score: num(cp.score), of: num(cp.of), on: cp.on };
        const missed = Array.isArray(cp.missed) ? cp.missed.filter((id): id is string => typeof id === "string") : [];
        if (missed.length) result.missed = missed;
        if (cp.retake === true) result.retake = true;
        checkpoints[unit] = result;
      }
    }
    subjectsOut[k] = {
      startedOn: isDayKey(v.startedOn) ? v.startedOn : "",
      pace: isPace(v.pace) ? v.pace : undefined,
      completedDays: Array.isArray(v.completedDays) ? [...new Set(v.completedDays.filter((d): d is number => Number.isInteger(d) && (d as number) > 0))].sort((a, b) => a - b) : [],
      lastCompletedOn: isDayKey(v.lastCompletedOn) ? v.lastCompletedOn : undefined,
      sessionsToday: Math.max(0, Math.floor(num(v.sessionsToday))),
      checkpoints,
      current: migrateCurrent(v.current),
    };
  }
  const motion = r.motion;
  const profile = isObj(r.profile) && typeof r.profile.primary === "string" && typeof r.profile.secondary === "string" && Array.isArray(r.profile.formats) ? (r.profile as unknown as ProfileSnapshot) : undefined;
  const said: Record<string, string> = {};
  if (isObj(r.said)) for (const [k, v] of Object.entries(r.said)) if (typeof v === "string" && v.trim()) said[k] = v.slice(0, SAID_MAX);
  return {
    version: 2,
    motion: motion === "lively" || motion === "balanced" || motion === "calm" ? motion : "auto",
    beatClock: r.beatClock === true,
    readAloud: isSetting(r.readAloud) ? r.readAloud : "auto",
    largeText: isSetting(r.largeText) ? r.largeText : "auto",
    guardianHabits: r.guardianHabits === true ? true : undefined,
    nudge: r.nudge === -1 || r.nudge === 1 ? r.nudge : 0,
    pictures: r.pictures !== false,
    when: r.when === "morning" || r.when === "afternoon" || r.when === "evening" ? r.when : undefined,
    cue: typeof r.cue === "string" && r.cue.trim() ? r.cue.trim().slice(0, PLAN_CUE_MAX) : undefined,
    planOn: isDayKey(r.planOn) ? r.planOn : undefined,
    profile,
    lastSeen: isDayKey(r.lastSeen) ? r.lastSeen : "",
    subjects: subjectsOut,
    memory: migrateMemory(r.memory),
    memoryScale: num(r.memoryScale, 1) >= 0.4 && num(r.memoryScale, 1) <= 4 ? num(r.memoryScale, 1) : 1,
    said,
    events: Array.isArray(r.events) ? r.events.map(migrateEvent).filter((e): e is StudyEvent => e !== null).slice(-MAX_EVENTS) : [],
    sessions: Array.isArray(r.sessions) ? r.sessions.map(migrateSession).filter((x): x is SessionRecord => x !== null) : [],
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

// ─── Learn by doing: the helpers behind guess, try, see, say ─────────────────

/** Once an idea is holding (it lasts four days or more), the rewind hides the options first so the answer has to be produced, not recognised. */
export function thinkFirst(mem: MemoryState | undefined, scale = 1): boolean {
  return memoryLevel(mem, scale) >= 2;
}

const wordsOf = (s: string) => s.trim().split(/\s+/).filter(Boolean);
const stem = (w: string) => {
  const x = w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return x.length >= 5 ? x.replace(/(ing|ed|es|s)$/u, "") : x;
};

/** Which of a concept's key terms an explanation used. Loose stems, so "observations" counts for "observation" and "the" never counts for "theory". */
export function coverage(text: string, terms: string[]): { hit: string[]; missed: string[] } {
  const stems = wordsOf(text).map(stem).filter((s) => s.length >= 2);
  const close = (s: string, t: string) => s === t || (s.startsWith(t) && t.length >= 4) || (t.startsWith(s) && s.length >= 4);
  const has = (term: string) => {
    const parts = wordsOf(term).map(stem).filter((t) => t.length >= 2);
    return parts.length > 0 && parts.every((t) => stems.some((s) => close(s, t)));
  };
  const hit: string[] = [], missed: string[] = [];
  for (const term of terms) (has(term) ? hit : missed).push(term);
  return { hit, missed };
}

export interface ChipSet { pieces: string[]; distractors: string[] }

/**
 * Cut a key point into 4 to 7 chips the learner rebuilds in order, plus up to
 * two decoy chips cut from the misconception, so the rebuild takes meaning and
 * not pattern-matching. Deterministic from the seed.
 */
export function buildChips(sentence: string, decoySource: string, seed: number): ChipSet {
  const words = wordsOf(sentence);
  if (!words.length) return { pieces: [], distractors: [] };
  const k = Math.min(words.length, Math.max(4, Math.min(7, Math.round(words.length / 2.5))));
  const pieces: string[] = [];
  for (let i = 0; i < k; i++) pieces.push(words.slice(Math.floor((i * words.length) / k), Math.floor(((i + 1) * words.length) / k)).join(" "));
  const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const taken = new Set(pieces.map(norm));
  const size = Math.max(1, Math.round(words.length / k));
  const decoyWords = wordsOf(decoySource);
  const starts = shuffle(Array.from({ length: Math.max(0, decoyWords.length - size + 1) }, (_, i) => i), mulberry32(seed));
  const distractors: string[] = [];
  for (const s of starts) {
    const chunk = decoyWords.slice(s, s + size).join(" ").replace(/[.,;:!?]+$/u, "");
    const n = norm(chunk);
    if (!n || taken.has(n)) continue;
    taken.add(n);
    distractors.push(chunk);
    if (distractors.length === 2) break;
  }
  return { pieces, distractors };
}

export interface Calibration { sureRight: number; sureWrong: number; unsureRight: number; unsureWrong: number }

/** Confidence against outcome for the rated answers of one sitting (rewind, check and checkpoint; games and guesses are not rated). */
export function sittingCalibration(events: StudyEvent[], since: number): Calibration {
  const c: Calibration = { sureRight: 0, sureWrong: 0, unsureRight: 0, unsureWrong: 0 };
  for (const e of events) {
    if (e.type !== "answer" || e.t < since || !e.confidence) continue;
    if (e.source !== "rewind" && e.source !== "check" && e.source !== "checkpoint") continue;
    if (e.confidence === "sure") { if (e.correct) c.sureRight++; else c.sureWrong++; }
    else if (e.correct) c.unsureRight++; else c.unsureWrong++;
  }
  return c;
}

/** One line of feedback on how well the learner knows what they know, or null when there is too little to say. */
export function calibrationNote(c: Calibration): string | null {
  const rated = c.sureRight + c.sureWrong + c.unsureRight + c.unsureWrong;
  if (rated < 3) return null;
  if (c.sureWrong >= 2) return `${c.sureWrong} answers felt sure and were wrong. Slow down on the ones that feel obvious: those are the ideas most worth a second look.`;
  if (c.unsureRight >= 2 && c.unsureRight > c.unsureWrong) return `You knew more than you thought: ${c.unsureRight} of your "not sure" answers were right.`;
  if (c.sureWrong === 0 && c.sureRight >= 3) return "Every time you felt sure, you were right. That feeling is worth trusting.";
  if (c.sureWrong === 1) return "One answer felt sure and was wrong. Sure-but-wrong is the kind you remember best once it is fixed, and it comes back first tomorrow.";
  return null;
}
