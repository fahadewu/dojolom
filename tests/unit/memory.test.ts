import { describe, expect, it } from "vitest";
import {
  DESIRED_RETENTION,
  MAX_INTERVAL,
  MIN_OBSERVATIONS,
  W,
  fitScale,
  initialState,
  intervalFor,
  logLikelihood,
  retrievability,
  review,
  type Observation,
} from "@/lib/memory";
import { mulberry32 } from "@/lib/study";

describe("FSRS-6 forgetting curve", () => {
  it("stability is the day recall falls to 90%", () => {
    for (const s of [0.5, 2, 7, 30, 200]) expect(retrievability(s, s)).toBeCloseTo(0.9, 10);
    expect(retrievability(0, 5)).toBe(1);
  });
  it("forgets monotonically and more slowly for stronger memories", () => {
    expect(retrievability(10, 5)).toBeLessThan(retrievability(5, 5));
    expect(retrievability(10, 20)).toBeGreaterThan(retrievability(10, 5));
  });
  it("schedules at the target retention: the interval for 90% is the stability, within the clamps", () => {
    expect(intervalFor(12)).toBe(12);
    expect(intervalFor(0.2)).toBe(1);
    expect(intervalFor(100_000)).toBe(MAX_INTERVAL);
    expect(intervalFor(12, 0.8)).toBeGreaterThan(intervalFor(12, DESIRED_RETENTION)); // aiming lower waits longer
  });
});

describe("FSRS-6 memory updates", () => {
  it("first impressions start from the default weights, easier grades lasting longer", () => {
    expect(initialState(1).stability).toBe(W[0]);
    expect(initialState(3).stability).toBe(W[2]);
    const [a, h, g, e] = ([1, 2, 3, 4] as const).map(initialState);
    expect(a.stability).toBeLessThan(h.stability);
    expect(h.stability).toBeLessThan(g.stability);
    expect(g.stability).toBeLessThan(e.stability);
    expect(a.difficulty).toBeGreaterThan(e.difficulty);
    for (const s of [a, h, g, e]) { expect(s.difficulty).toBeGreaterThanOrEqual(1); expect(s.difficulty).toBeLessThanOrEqual(10); }
  });
  it("a success grows stability, more when recall was harder to reach (the spacing effect)", () => {
    const m = { stability: 5, difficulty: 5 };
    const early = review(m, 1, 3);
    const onTime = review(m, 5, 3);
    const late = review(m, 15, 3);
    expect(early.stability).toBeGreaterThan(5);
    expect(onTime.stability).toBeGreaterThan(early.stability);
    expect(late.stability).toBeGreaterThan(onTime.stability);
  });
  it("Hard grows less than Good, Easy more; a lapse never leaves the memory stronger", () => {
    const m = { stability: 10, difficulty: 5 };
    expect(review(m, 10, 2).stability).toBeLessThan(review(m, 10, 3).stability);
    expect(review(m, 10, 4).stability).toBeGreaterThan(review(m, 10, 3).stability);
    expect(review(m, 10, 1).stability).toBeLessThan(10);
    expect(review({ stability: 0.3, difficulty: 5 }, 1, 1).stability).toBeLessThanOrEqual(0.3);
  });
  it("a Good recognised among visible options grows like Hard but leaves difficulty where Good would", () => {
    const m = { stability: 6, difficulty: 5 };
    const recalled = review(m, 6, 3);
    const recognised = review(m, 6, 3, 1, true);
    const hard = review(m, 6, 2);
    expect(recognised.stability).toBeLessThan(recalled.stability);
    expect(recognised.difficulty).toBe(recalled.difficulty);
    expect(recognised.difficulty).toBeLessThan(hard.difficulty);
    expect(review(m, 6, 2, 1, true)).toEqual(hard); // weakness never stacks on Hard
  });
  it("difficulty rises after a lapse, falls after an easy recall, and stays within 1..10", () => {
    const m = { stability: 10, difficulty: 5 };
    expect(review(m, 10, 1).difficulty).toBeGreaterThan(5);
    expect(review(m, 10, 4).difficulty).toBeLessThan(5);
    let hard = m;
    for (let i = 0; i < 50; i++) hard = review(hard, 1, 1);
    expect(hard.difficulty).toBeLessThanOrEqual(10);
    let easy = m;
    for (let i = 0; i < 50; i++) easy = review(easy, 1, 4);
    expect(easy.difficulty).toBeGreaterThanOrEqual(1);
  });
  it("a learner who forgets more slowly gains less from a review at the same gap, because recall was easier", () => {
    const m = { stability: 5, difficulty: 5 };
    expect(review(m, 10, 3, 2).stability).toBeLessThan(review(m, 10, 3, 1).stability);
  });
});

describe("personal forgetting calibration", () => {
  /** Simulate a learner whose memories really last `trueScale` times the model's stability, reviewed near when due, on items guessed at rate `guess`. */
  const simulate = (trueScale: number, n: number, guess = 0.3, seed = 7): Observation[] => {
    const rng = mulberry32(seed);
    return Array.from({ length: n }, () => {
      const stability = 1 + rng() * 20;
      const days = 1 + Math.floor(rng() * 1.5 * stability);
      const p = guess + (1 - guess) * retrievability(days, stability * trueScale);
      return { days, stability, guess, correct: rng() < p };
    });
  };
  it("stays at 1 until there is enough evidence", () => {
    expect(fitScale([])).toBe(1);
    expect(fitScale(simulate(3, MIN_OBSERVATIONS - 1))).toBe(1);
  });
  it("moves towards a learner who forgets slower or faster than average, and leaves an average learner near 1", () => {
    const median = (trueScale: number, n: number) => {
      const fits = Array.from({ length: 31 }, (_, i) => fitScale(simulate(trueScale, n, 0.3, 100 + i))).sort((a, b) => a - b);
      return { lo: fits[3], mid: fits[15], hi: fits[27] };
    };
    const slow = median(2.5, 300), fast = median(0.5, 300), average = median(1, 100);
    expect(slow.mid).toBeGreaterThan(1.3);
    expect(fast.mid).toBeLessThan(0.8);
    expect(average.lo).toBeGreaterThan(0.75); // a hundred answers never drag an average learner far off
    expect(average.hi).toBeLessThan(1.3);
  });
  it("discounts lucky guesses: right answers on true-or-false say less than right answers on four options", () => {
    const allRight = (guess: number): Observation[] => Array.from({ length: 30 }, (_, i) => ({ days: 10 + i, stability: 3, correct: true, guess }));
    expect(fitScale(allRight(0.5))).toBeLessThan(fitScale(allRight(0.25)));
  });
  it("the likelihood prefers the true scale", () => {
    const obs = simulate(2, 4000);
    expect(logLikelihood(obs, 2)).toBeGreaterThan(logLikelihood(obs, 1));
    expect(logLikelihood(obs, 2)).toBeGreaterThan(logLikelihood(obs, 4));
  });
  it("stays within its bounds whatever the data", () => {
    const allWrong: Observation[] = Array.from({ length: 50 }, () => ({ days: 1, stability: 50, correct: false, guess: 0 }));
    const allRight: Observation[] = Array.from({ length: 50 }, () => ({ days: 300, stability: 1, correct: true, guess: 0 }));
    expect(fitScale(allWrong)).toBeGreaterThanOrEqual(0.4);
    expect(fitScale(allRight)).toBeLessThanOrEqual(4);
  });
});
