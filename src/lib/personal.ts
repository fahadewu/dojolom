// ─── Personal study profile ──────────────────────────────────────────────────
// How this person studies right now, and what the app changes because of it.
// The evidence (docs/personality-learning-rd.md) is clear on two points. Matching
// lessons to personality "types" has no support for learning, so nothing here
// changes *what* is taught or how hard it is gated. What does help is support
// aimed at how someone studies: if-then plans for people who struggle to
// follow through, mastery experiences for low confidence, a calmer frame for
// test nerves, and room to go deeper for the curious.
//
// So the profile is four study-specific dimensions, not a Big Five label. Each
// comes from two short statements, one of them reversed so a learner who agrees
// with everything is not mis-scored. It is optional, never asked of children,
// editable at any time, and it fades as behaviour accumulates: what the learner
// actually does outweighs what they said within a couple of weeks.
//
// Pure: no clock, no storage.

import { daysBetween, isDayKey, type DayKey } from "@/lib/clock";

export type StudyDim = "followThrough" | "nerves" | "confidence" | "curiosity";

export interface StudyItem { id: string; dim: StudyDim; text: string; reverse?: boolean }

export const studyItems: StudyItem[] = [
  { id: "ft1", dim: "followThrough", text: "When I plan to study, I usually start on time." },
  { id: "nv1", dim: "nerves", text: "Tests make me so nervous that I forget things I know." },
  { id: "cf1", dim: "confidence", text: "If I keep at it, I can understand even the hard parts of a subject." },
  { id: "cu1", dim: "curiosity", text: "I like to know why something works, not just the answer." },
  { id: "ft2", dim: "followThrough", text: "I often leave studying until the last minute.", reverse: true },
  { id: "nv2", dim: "nerves", text: "I stay calm when I'm being tested.", reverse: true },
  { id: "cf2", dim: "confidence", text: "When something is new, I doubt I'll manage to learn it.", reverse: true },
  { id: "cu2", dim: "curiosity", text: "Once I have the answer, I'm happy to move on.", reverse: true },
];

export const agreeScale = [
  { value: 1, label: "Not like me" },
  { value: 2, label: "A little" },
  { value: 3, label: "Somewhat" },
  { value: 4, label: "Mostly" },
  { value: 5, label: "Very like me" },
] as const;

export type StudyProfile = Partial<Record<StudyDim, number>>; // 0..1, 0.5 is the middle; a dimension is absent until answered

/** The four dimensions from whichever statements were answered (1 to 5), each scaled to 0..1. */
export function studyProfile(answers: Record<string, number> | undefined): StudyProfile {
  const out: StudyProfile = {};
  if (!answers) return out;
  const sums: Partial<Record<StudyDim, { total: number; n: number }>> = {};
  for (const item of studyItems) {
    const raw = answers[item.id];
    if (typeof raw !== "number" || !Number.isFinite(raw) || raw < 1 || raw > 5) continue;
    const v = item.reverse ? 6 - raw : raw;
    const s = (sums[item.dim] ??= { total: 0, n: 0 });
    s.total += v; s.n++;
  }
  for (const [dim, s] of Object.entries(sums) as [StudyDim, { total: number; n: number }][]) out[dim] = (s.total / s.n - 1) / 4;
  return out;
}

// ─── Behaviour: what the learner actually does ───────────────────────────────

export interface FollowThrough { value: number; days: number } // share of planned study days kept, over the days observed

/**
 * How well study plans have held lately: sittings on distinct days over the
 * last two weeks (or since the first sitting), against what the pace asks for
 * (daily, or three a week for the long pace). An abandoned sitting counts
 * against it. Null until there are three days to judge.
 */
export function followThroughFromBehaviour(
  sessionDates: DayKey[],
  abandonedDates: DayKey[],
  today: DayKey,
  pace: "sprint" | "steady" | "deep" | "",
): FollowThrough | null {
  const valid = sessionDates.filter((d) => isDayKey(d) && daysBetween(d, today) >= 0);
  if (!valid.length) return null;
  const first = valid.reduce((a, b) => (a < b ? a : b));
  const days = Math.min(14, daysBetween(first, today) + 1);
  if (days < 3) return null;
  const within = (d: DayKey) => { const gap = daysBetween(d, today); return gap >= 0 && gap < days; };
  const studied = new Set(valid.filter(within)).size;
  const abandoned = abandonedDates.filter((d) => isDayKey(d) && within(d)).length;
  const expected = pace === "deep" ? Math.max(1, (days * 3) / 7) : days;
  return { value: Math.max(0, Math.min(1, (studied - 0.5 * abandoned) / expected)), days };
}

/** Self-report as a prior that a week of behaviour equals and two weeks outweigh. */
export function blend(prior: number | undefined, behaviour: FollowThrough | null, weight = 7): number | undefined {
  if (!behaviour) return prior;
  if (prior === undefined) return behaviour.value;
  return (prior * weight + behaviour.value * behaviour.days) / (weight + behaviour.days);
}

// ─── What changes ────────────────────────────────────────────────────────────

export interface Tuning {
  planFirst: boolean;       // follow-through is low: the if-then plan is asked for up front, and again after a lapse
  startSmall: boolean;      // ...and a day was missed: today starts with just the rewind, framed as enough
  steadyNerves: boolean;    // tests feel stressful: a reappraisal line before tests, warmer words after a miss
  buildConfidence: boolean; // confidence is low: the first games start one rung more supported; progress against past self
  goDeeper: boolean;        // curious: an optional deeper explanation on every lesson, and new formats tried more often
}

export const LOW = 0.4;
export const HIGH = 0.65;

export const noTuning: Tuning = { planFirst: false, startSmall: false, steadyNerves: false, buildConfidence: false, goDeeper: false };

export function tuningFor(
  profile: StudyProfile,
  ctx: { isKid: boolean; behaviour: FollowThrough | null; daysSinceLast: number | null },
): Tuning {
  // Children are never profiled from questions (profiling is off by default for children); only behaviour tunes their sessions.
  const p = ctx.isKid ? {} : profile;
  const follow = blend(p.followThrough, ctx.behaviour);
  const planFirst = follow !== undefined && follow < LOW;
  return {
    planFirst,
    startSmall: planFirst && ctx.daysSinceLast !== null && ctx.daysSinceLast >= 2,
    steadyNerves: (p.nerves ?? 0) > HIGH,
    buildConfidence: p.confidence !== undefined && p.confidence < LOW,
    goDeeper: (p.curiosity ?? 0) > HIGH,
  };
}

/** Plain-language lines for the profile and settings pages: what the app does for this learner, never a label for them. */
export function tuningLines(t: Tuning): { key: keyof Tuning; title: string; text: string }[] {
  const lines: { key: keyof Tuning; title: string; text: string }[] = [];
  if (t.planFirst) lines.push({ key: "planFirst", title: "A plan with a trigger", text: "We'll ask you to tie each session to something you already do every day, like after dinner. Plans with a fixed cue are kept far more often." });
  if (t.steadyNerves) lines.push({ key: "steadyNerves", title: "Calmer tests", text: "Checks stay untimed, and before a test we'll remind you that a racing heart is your body getting ready. Practice tests also make the real ones less stressful." });
  if (t.buildConfidence) lines.push({ key: "buildConfidence", title: "Wins first", text: "Your first games start with a little more help, and we'll show how far you've come against your own past, never against anyone else." });
  if (t.goDeeper) lines.push({ key: "goDeeper", title: "Room to go deeper", text: "Every lesson has an optional deeper explanation, and we'll try new formats with you more often." });
  return lines;
}

// ─── Grades (Bangladesh SSC and HSC) ─────────────────────────────────────────

export type BdGrade = "A+" | "A" | "A-" | "B" | "C" | "D" | "F";
export const bdGradeBands: { grade: BdGrade; min: number; point: number }[] = [
  { grade: "A+", min: 80, point: 5 },
  { grade: "A", min: 70, point: 4 },
  { grade: "A-", min: 60, point: 3.5 },
  { grade: "B", min: 50, point: 3 },
  { grade: "C", min: 40, point: 2 },
  { grade: "D", min: 33, point: 1 },
  { grade: "F", min: 0, point: 0 },
];

/** The letter grade a percentage would earn on the board's scale. */
export function gradeFor(percent: number): BdGrade {
  return (bdGradeBands.find((b) => percent >= b.min) ?? bdGradeBands[bdGradeBands.length - 1]).grade;
}

export function meetsGrade(percent: number, target: BdGrade): boolean {
  return percent >= (bdGradeBands.find((b) => b.grade === target)?.min ?? 0);
}
