// ─── Who the tutor is talking to, and how it talks ───────────────────────────
// docs/ai-tutor-rd.md. The learner shapes three things about the tutor, and the
// evidence says what each may change:
//   interests  → the examples and word problems (context personalisation helps
//                novices most, and only when the maths stays the same);
//   tone       → the voice: warmth, humour, directness (engagement, not the method);
//   see ways   → which of the authored explanations the tutor opens with, a
//                preference only: if it does not land, the tutor switches.
// None of them changes what is taught, the order, or how hard the checks are.
//
// Pure: no clock, no storage. Shared by the browser and the tutor route.

import type { StyleId } from "@/lib/learning";
import type { LearnFormat } from "@/lib/study";

// ─── Tone ────────────────────────────────────────────────────────────────────

export type TutorTone = "calm" | "coach" | "playful" | "curious";
export const tutorTones: TutorTone[] = ["calm", "coach", "playful", "curious"];

export const toneInfo: Record<TutorTone, { label: string; blurb: string; sample: string; colour: "focus" | "sun" | "sprout" | "play" }> = {
  calm: {
    label: "Calm and patient",
    blurb: "Takes it slowly, never rushes you, and checks you're comfortable before moving on.",
    sample: "No rush. Let's look at it one piece at a time.",
    colour: "focus",
  },
  coach: {
    label: "Straight-talking coach",
    blurb: "Expects a lot, tells you plainly what to fix, and is sure you can do it.",
    sample: "Close, but not yet. Fix the second step and you've got it.",
    colour: "sprout",
  },
  playful: {
    label: "Playful and funny",
    blurb: "Silly examples and the odd joke, and the work still gets done.",
    sample: "Imagine a cow trying to share 3 rotis between 4 friends…",
    colour: "sun",
  },
  curious: {
    label: "Curious explorer",
    blurb: "Asks \"what if?\" and links each idea to how the world works.",
    sample: "Here's a puzzle: why does a cricket ball curve more on a humid day?",
    colour: "play",
  },
};

export function isTone(v: unknown): v is TutorTone {
  return typeof v === "string" && (tutorTones as string[]).includes(v);
}

// ─── Interests ───────────────────────────────────────────────────────────────

export const INTEREST_MAX = 5;
export const INTEREST_LEN = 32;

/** Suggestions only; the learner can type their own. */
export const interestSuggestions = [
  "Cricket", "Football", "Cooking", "Drawing", "Music", "Phones and games", "Films and stories",
  "Animals", "Nature and farming", "Building and fixing things", "Business and money", "Space",
  "Fashion", "Travel",
] as const;

/** Trimmed, de-duplicated (case-insensitive), capped in count and length, and free of anything but plain words. */
export function cleanInterests(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of list) {
    if (typeof raw !== "string") continue;
    const t = raw.replace(/[^\p{L}\p{N} &'’,.-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, INTEREST_LEN).trim();
    const k = t.toLowerCase();
    if (!t || seen.has(k)) continue;
    seen.add(k);
    out.push(t);
    if (out.length === INTEREST_MAX) break;
  }
  return out;
}

// ─── How they like things explained ──────────────────────────────────────────

export type SeeWay = "pictures" | "steps" | "stories" | "doing" | "explained";
export const seeWays: SeeWay[] = ["pictures", "steps", "stories", "doing", "explained"];
export const SEE_MAX = 2;

export const seeInfo: Record<SeeWay, { label: string; hint: string; format: LearnFormat; style: StyleId }> = {
  pictures: { label: "Pictures and diagrams", hint: "The whole idea on one screen", format: "infographic", style: "visual" },
  steps: { label: "Step by step", hint: "One small step at a time", format: "video", style: "watcher" },
  stories: { label: "Stories and comparisons", hint: "A real scene, an everyday picture", format: "story", style: "storyteller" },
  doing: { label: "Trying it myself", hint: "A problem first, help when I need it", format: "challenge", style: "tinkerer" },
  explained: { label: "A clear explanation", hint: "Precise, with a worked example", format: "reading", style: "reader" },
};

export function isSeeWay(v: unknown): v is SeeWay {
  return typeof v === "string" && (seeWays as string[]).includes(v);
}

export function cleanSeeWays(list: unknown): SeeWay[] {
  if (!Array.isArray(list)) return [];
  return [...new Set(list.filter(isSeeWay))].slice(0, SEE_MAX);
}

/**
 * The older engine still ranks lesson formats from scenario answers. The new
 * onboarding asks the question straight, so its answer is written in the same
 * shape: each chosen way counts as two answers (the first choice three).
 */
export function styleAnswersFrom(ways: SeeWay[]): Record<string, StyleId> {
  const out: Record<string, StyleId> = {};
  ways.forEach((w, i) => {
    const style = seeInfo[w].style;
    const n = i === 0 ? 3 : 2;
    for (let k = 0; k < n; k++) out[`see-${w}-${k}`] = style;
  });
  return out;
}
