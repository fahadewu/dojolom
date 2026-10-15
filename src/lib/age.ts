// ─── Age: who the app is teaching, and what that changes ─────────────────────
// docs/age-learning-rd.md. Retrieval, spacing and feedback work at every age, so
// age never changes *what* is taught. It sets the support around the teaching
// (read aloud, chips or typing, explain-first or try-first, sitting length) and
// the protections a child is owed (no timers, no streak pressure, no habit
// profiling). Age is only a starting guess: in Bangladesh half of 10-year-olds
// read at grade level and half do not, so measured reading overrides it.
//
// Two ages, two jobs. The age the learner gives sets the starting support. The
// younger of that and the usual age for the class they chose sets the
// protections, because class says little about age (half of Class 5 pupils are
// over-age) and child-safe defaults cost an adult almost nothing.
//
// Pure: no clock, no storage.

import type { BdStageId } from "@/lib/curriculum-bd";
import type { LearnerInput, PaceId } from "@/lib/learning";
import type { GameId, LearnFormat, MotionProfile, StudyEvent, StudyState } from "@/lib/study";

export const AGE_MIN = 4;
export const AGE_MAX = 110;

/** Internal only: never shown to a learner as a label. */
export type AgeStage = "early" | "primary" | "youngTeen" | "teen" | "adult" | "older";

export function validAge(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= AGE_MIN && n <= AGE_MAX;
}

/** A typed age, or null while it is not yet a whole number in range. */
export function parseAge(text: string): number | null {
  const t = text.trim();
  if (!/^\d{1,3}$/.test(t)) return null;
  const n = Number(t);
  return validAge(n) ? n : null;
}

export function stageOf(age: number): AgeStage {
  if (age < 8) return "early";      // decoding: reads with help
  if (age < 12) return "primary";   // fluency to reading-to-learn; Grades 2–5 learn best taught first
  if (age < 15) return "youngTeen";
  if (age < 18) return "teen";
  if (age < 60) return "adult";
  return "older";                   // the line moved from 40: attention peaks in the early 40s
}

/** The official age at the start of each class: Class 1 at 6, Class 9 (SSC) at 14, Class 11 (HSC) at 16. */
export const classAge: Record<BdStageId, number> = {
  c1: 6, c2: 7, c3: 8, c4: 9, c5: 10, c6: 11, c7: 12, c8: 13, ssc: 14, hsc: 16,
};

type AgeInput = Pick<LearnerInput, "age" | "track" | "bdStage">;

/** The age the learner gave; falls back to their class, then to an adult, so a half-saved learner still renders. */
export function supportAge(l: AgeInput): number {
  if (validAge(l.age)) return l.age;
  if (l.track === "nctb" && l.bdStage) return classAge[l.bdStage];
  return 30;
}

/** The age that sets the protections: the younger of the age given and the usual age for the chosen class. */
export function protectionAge(l: AgeInput): number {
  const stated = supportAge(l);
  return l.track === "nctb" && l.bdStage ? Math.min(stated, classAge[l.bdStage]) : stated;
}

/** A saved learner from before ages were typed: the old band becomes a representative age they can change in settings. */
export function ageFromLegacyBand(band: string, bdStage: BdStageId | "" = ""): number | null {
  const fromClass = bdStage ? classAge[bdStage] : null;
  if (band === "kid") return fromClass !== null && fromClass < 12 ? fromClass : 9;
  if (band === "teen") return fromClass !== null && fromClass >= 12 ? fromClass : 15;
  if (band === "adult") return 30;
  if (band === "senior") return 60; // they chose "calm pace, clear text": the older defaults keep that
  return null;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

export interface AgeDefaults {
  stage: AgeStage;          // from the age given
  minor: boolean;           // protection age under 18: a child under Bangladesh's 2025 data ordinance
  child: boolean;           // protection age under 12
  readAloud: boolean;       // the starting point; measured reading pace and the learner's own choice override it
  autoReadQuestions: boolean; // read questions without a tap too (pre-readers); otherwise questions wait for "Listen"
  sayBack: "build" | "type"; // chips until about 10; typing after, with chips one tap away
  guessFirst: boolean;      // the true/false misconception guess before teaching
  tryFirst: boolean;        // a go at the example before it is explained (engine also checks the learner is not a novice)
  confidence: boolean;      // "sure / not sure" before answering
  largeText: boolean;
  largeTargets: boolean;    // 56 px tap targets
  tapHold: boolean;         // ignore a second tap within 300 ms: young children's taps land on the next screen
  fewerItems: boolean;      // smaller game boards
  paces: PaceId[];          // sitting lengths on offer
  noFormats: LearnFormat[];
  noGames: GameId[];
  timers: "hidden" | "quiet" | "offered"; // quiet: in settings, never suggested
  streakCount: boolean;     // show a day-streak count
  studyQuestions: boolean;  // the optional "how you study" statements
  habitsByDefault: boolean; // tune plans from behaviour (follow-through) without a guardian turning it on
  motion: MotionProfile | null; // the automatic motion profile, or null to let the learning profile decide
}

export function ageDefaults(l: AgeInput): AgeDefaults {
  const age = supportAge(l);
  const stage = stageOf(age);
  const guard = protectionAge(l);
  const early = stage === "early";
  const young = early || stage === "primary";
  const older = stage === "older";
  return {
    stage,
    minor: guard < 18,
    child: guard < 12,
    readAloud: young,
    autoReadQuestions: early,
    sayBack: age < 10 ? "build" : "type",
    guessFirst: !early,
    tryFirst: !young,
    confidence: !early,
    largeText: early || older,
    largeTargets: young || older,
    tapHold: young,
    fewerItems: young || older,
    paces: early ? ["sprint"] : young ? ["sprint", "steady"] : ["sprint", "steady", "deep"],
    noFormats: early ? ["reading", "challenge"] : young ? ["challenge"] : [], // challenge puts a problem before any teaching
    noGames: early ? ["blitz"] : [],
    timers: guard < 12 ? "hidden" : older ? "quiet" : "offered",
    streakCount: guard >= 8,
    studyQuestions: guard >= 12,
    habitsByDefault: guard >= 18,
    motion: guard < 12 ? "balanced" : older ? "calm" : null,
  };
}

/** A pace the age allows: the one asked for if it is on offer, else the longest that is. */
export function allowedPace(d: AgeDefaults, pace: PaceId | ""): PaceId | "" {
  if (!pace || d.paces.includes(pace)) return pace;
  return d.paces[d.paces.length - 1];
}

// ─── Reading pace: behaviour sets the level ──────────────────────────────────

export interface ReadingPace { wpm: number; n: number }

export const PACE_SAMPLES = 6;   // answers needed before pace overrides age
export const PACE_WINDOW = 15;   // most recent answers considered
export const MIN_READ_WORDS = 8; // shorter items measure thinking, not reading
export const FLUENT_WPM = 80;    // reading and deciding together; adults read about 240 words a minute silently
export const SLOW_WPM = 45;

/**
 * Words read per minute on recent right answers the learner read for themselves
 * (answers where the question was read aloud carry no reading time). The median,
 * so one long think does not count as slow reading. Null until there are enough.
 */
export function readingPace(events: StudyEvent[]): ReadingPace | null {
  const rates: number[] = [];
  for (let i = events.length - 1; i >= 0 && rates.length < PACE_WINDOW; i--) {
    const e = events[i];
    if (e.type !== "answer" || !e.correct || !e.words || !e.readMs) continue;
    if (e.words < MIN_READ_WORDS || e.readMs < 500) continue;
    rates.push(e.words / (e.readMs / 60_000));
  }
  if (rates.length < PACE_SAMPLES) return null;
  const sorted = [...rates].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  const wpm = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return { wpm: Math.round(wpm), n: rates.length };
}

export type Setting = "auto" | "on" | "off";

/** Read aloud: the learner's choice, else measured reading, else age. */
export function readAloudOn(d: AgeDefaults, setting: Setting, pace: ReadingPace | null): boolean {
  if (setting !== "auto") return setting === "on";
  if (pace) {
    if (pace.wpm >= FLUENT_WPM) return false;
    if (pace.wpm < SLOW_WPM) return true;
  }
  return d.readAloud;
}

export function largeTextOn(d: AgeDefaults, setting: Setting): boolean {
  return setting === "auto" ? d.largeText : setting === "on";
}

/** Habit tuning from behaviour: on for adults, off for under-18s until a parent or guardian turns it on. */
export function habitsOn(d: AgeDefaults, guardianOn: boolean | undefined): boolean {
  return d.habitsByDefault || guardianOn === true;
}

/**
 * The AI tutor (docs/ai-tutor-rd.md). Open to adults. For anyone under 18 by
 * protection age it stays closed until the deployment allows it, which waits on
 * a legal reading of the data ordinance (s.9(3) bars profiling a specific child)
 * and on Anthropic's safeguards for products serving minors; once allowed, a
 * parent or guardian agrees first.
 */
export type TutorAccess = "open" | "guardian" | "closed";

export function tutorAccess(d: AgeDefaults, guardianAgreed: boolean | undefined, minorsAllowed: boolean): TutorAccess {
  if (!d.minor) return "open";
  if (!minorsAllowed) return "closed";
  return guardianAgreed ? "open" : "guardian";
}

/** Everything a screen needs: the age defaults, resolved against the learner's own settings and measured reading. */
export interface AgeView {
  d: AgeDefaults;
  pace: ReadingPace | null;
  readAloud: boolean;
  largeText: boolean;
  largeTargets: boolean;
}

export function ageView(l: AgeInput, s: Pick<StudyState, "events" | "readAloud" | "largeText">): AgeView {
  const d = ageDefaults(l);
  const pace = readingPace(s.events);
  const largeText = largeTextOn(d, s.largeText);
  return { d, pace, readAloud: readAloudOn(d, s.readAloud, pace), largeText, largeTargets: d.largeTargets || largeText };
}

// ─── Saying what changed ─────────────────────────────────────────────────────

/** What the app set up because of age and reading, in plain words. Never a label for the learner, never "at your age". */
export function ageLines(d: AgeDefaults, readAloud: boolean): { key: string; title: string; text: string }[] {
  const lines: { key: string; title: string; text: string }[] = [];
  if (readAloud) lines.push({ key: "read", title: "Read aloud", text: "Lessons are read out, with each sentence lit up as it is read. Turn it off any time; once reading is quick and sure, it stops on its own." });
  if (!d.tryFirst) lines.push({ key: "explain", title: "We explain first", text: "Each new idea is shown and explained before you try it. That works best while ideas are new." });
  else lines.push({ key: "try", title: "Try first, when it helps", text: "Once you know a subject a little, you'll have a go before we explain. While it is new, we explain first." });
  if (d.paces.length < 3) lines.push({ key: "short", title: "Short sittings", text: d.paces.length === 1 ? "About five minutes, with a natural stop after every part." : "Up to fifteen minutes, with a natural stop after every part." });
  if (d.timers === "hidden") lines.push({ key: "calm", title: "No clocks, no pressure", text: "Nothing is timed, and missing a day is never shown as a loss." });
  if (d.largeText) lines.push({ key: "large", title: "Bigger text and buttons", text: "Easier to read and to tap. You can change it in settings." });
  return lines;
}
