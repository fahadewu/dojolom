// ─── Memory model: FSRS-6, plus a per-learner calibration ─────────────────────
// How long an idea will stay with this learner, and when to ask about it again.
// It is the DSR model behind the Free Spaced Repetition Scheduler: each memory
// has a stability S (days until the chance of recall falls to 90%) and a
// difficulty D (1..10); retrievability R is the chance of recall right now and
// follows a power forgetting curve. Each review moves S and D according to the
// grade the evidence earned. Formulas and default weights are FSRS-6, trained
// on hundreds of millions of reviews; see docs/how-people-learn-rd.md for the
// sources and the benchmark it was chosen on.
//
// Pure: no clock, no randomness, no storage. Time is passed in whole days.

/** 1 Again (forgot), 2 Hard (recalled with doubt), 3 Good, 4 Easy (fluent). */
export type Grade = 1 | 2 | 3 | 4;

/** FSRS-6 default parameters w[0..20]. */
export const W = [
  0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483,
  0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542,
] as const;

const DECAY = -W[20];
const FACTOR = Math.pow(0.9, 1 / DECAY) - 1; // so that R(S, S) = 0.9
export const S_MIN = 0.001;
export const S_MAX = 36500;
// The default weights come from adult flashcard users; on Dojolom's questions they would schedule a steady learner's
// fourth review five months out. Until the weights are fitted to Dojolom's own items, no gap exceeds three months.
export const MAX_INTERVAL = 90;

/** The share of reviews the schedule aims to have remembered. */
export const DESIRED_RETENTION = 0.9;

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

export interface DSR { stability: number; difficulty: number }

/** Chance of recall after `days` for a memory of stability `stability`. */
export function retrievability(days: number, stability: number): number {
  return Math.pow(1 + (FACTOR * Math.max(0, days)) / Math.max(S_MIN, stability), DECAY);
}

/** Whole days until recall is expected to fall to `retention`, at least one and at most a year. */
export function intervalFor(stability: number, retention = DESIRED_RETENTION): number {
  const days = (stability / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
  return clamp(Math.round(days), 1, MAX_INTERVAL);
}

const initialDifficulty = (g: Grade) => W[4] - Math.exp(W[5] * (g - 1)) + 1;

/** The memory left by a first encounter graded `g`. */
export function initialState(g: Grade): DSR {
  return { stability: clamp(W[g - 1], S_MIN, S_MAX), difficulty: clamp(initialDifficulty(g), 1, 10) };
}

function nextDifficulty(d: number, g: Grade): number {
  const delta = -W[6] * (g - 3);
  const damped = d + (delta * (10 - d)) / 9; // linear damping: changes shrink as D nears 10
  return clamp(W[7] * initialDifficulty(4) + (1 - W[7]) * damped, 1, 10); // mean reversion towards an easy default
}

function recallStability(s: number, d: number, r: number, g: Grade, weak: boolean): number {
  const hard = g === 2 || weak ? W[15] : 1;
  const easy = g === 4 ? W[16] : 1;
  return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.exp(W[10] * (1 - r)) - 1) * hard * easy);
}

function lapseStability(s: number, d: number, r: number): number {
  const forgot = W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r));
  return Math.min(forgot, s / Math.exp(W[17] * W[18])); // a lapse never leaves a memory stronger than it was
}

/**
 * A review `days` after the last one. `scale` is the learner's personal
 * forgetting calibration (see fitScale): their effective stability is S x scale.
 * `weak` marks a Good that was recognised among visible options rather than
 * recalled first. That is weaker evidence than the self-graded recall FSRS was
 * trained on, so it earns the Hard-sized stability gain, without Hard's rise in
 * difficulty (the idea is not harder; the evidence is thinner). A Dojolom
 * extension, not part of FSRS.
 */
export function review(m: DSR, days: number, g: Grade, scale = 1, weak = false): DSR {
  const r = retrievability(days, m.stability * scale);
  const stability = g === 1 ? lapseStability(m.stability, m.difficulty, r) : recallStability(m.stability, m.difficulty, r, g, weak && g === 3);
  return { stability: clamp(stability, S_MIN, S_MAX), difficulty: nextDifficulty(m.difficulty, g) };
}

// ─── Personal calibration ────────────────────────────────────────────────────
// The default weights describe an average flashcard user. This learner, on these
// questions, may forget faster or slower. One multiplier on stability is fitted
// to their own delayed answers by maximum a posteriori, with a prior that pulls
// it to 1 until the evidence is there. Multiple choice can be guessed, so the
// chance of a right answer is c + (1 - c) R, where c is the item's guess rate.

export interface Observation {
  days: number;      // since the memory's last review
  stability: number; // before this answer
  correct: boolean;
  guess: number;     // chance of a right answer by guessing alone
}

// The power curve is flat and multiple choice can be guessed, so each answer says little about the scale. Simulated
// learners (tests/unit/memory.test.ts) show a weak prior lets a hundred answers drag an average learner to 0.6; this
// one keeps that within about 20% while still moving a learner who truly forgets twice as slowly in the right direction.
export const MIN_OBSERVATIONS = 20;
const PRIOR_SD = 0.35; // on log(scale)

export function logLikelihood(obs: Observation[], scale: number): number {
  let ll = 0;
  for (const o of obs) {
    const p = clamp(o.guess + (1 - o.guess) * retrievability(o.days, o.stability * scale), 1e-6, 1 - 1e-6);
    ll += o.correct ? Math.log(p) : Math.log(1 - p);
  }
  return ll;
}

/** The learner's stability multiplier, between 0.4 and 4, shrunk towards 1. Exactly 1 until there are enough delayed answers to say otherwise. */
export function fitScale(obs: Observation[]): number {
  const usable = obs.filter((o) => Number.isFinite(o.days) && o.days > 0 && o.stability > 0 && o.guess >= 0 && o.guess < 1);
  if (usable.length < MIN_OBSERVATIONS) return 1;
  let best = 1, bestScore = -Infinity;
  for (let i = 0; i <= 60; i++) {
    const logK = Math.log(0.4) + (i / 60) * (Math.log(4) - Math.log(0.4));
    const score = logLikelihood(usable, Math.exp(logK)) - (logK * logK) / (2 * PRIOR_SD * PRIOR_SD);
    if (score > bestScore) { bestScore = score; best = Math.exp(logK); }
  }
  return Math.round(best * 100) / 100;
}
