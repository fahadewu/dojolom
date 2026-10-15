process.env.TZ = "Europe/London";

import { describe, expect, it } from "vitest";
import { addDays, dayKey, dayKeyToMs, daysBetween } from "@/lib/clock";
import { buildProfile, emptyLearner, type LearnerInput } from "@/lib/learning";
import {
  answered,
  buildPlan,
  buildReviewSession,
  buildSession,
  buildChips,
  calibrationNote,
  coverage,
  saidBack,
  sittingCalibration,
  thinkFirst,
  chooseGame,
  CLOCK_GUARD_DAYS,
  completeDay,
  dayStatus,
  deriveSignals,
  dueConcepts,
  effectiveToday,
  emptyStudy,
  exportStudy,
  freshMemory,
  importStudy,
  learned,
  migrateStudy,
  motionFor,
  mulberry32,
  rankFormats,
  reconcilePlan,
  recordAnswer,
  REVIEW_CAP,
  segmentDone,
  shuffle,
  startDay,
  streak,
  supportFor,
  touch,
  gradeAnswer,
  checkpointResult,
  forgettingObservations,
  guessRate,
  pendingCorrective,
  recalibrate,
  retryItem,
  reviewLoad,
  isSecured,
  strength,
  type MemoryState,
  type Segment,
  type StudyEvent,
  type StudyState,
} from "@/lib/study";
import { initialState } from "@/lib/memory";

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner,
  name: "Test",
  age: 30,
  subjects: ["math"],
  goal: "curious",
  pace: "steady",
  answers: { a: "player", b: "player", c: "visual", d: "player", e: "storyteller" },
  ...over,
});

const at = (key: string, hour = 9) => dayKeyToMs(key) - 12 * 3600_000 + hour * 3600_000;

describe("clock", () => {
  it("uses local calendar days", () => {
    expect(dayKey(at("2026-09-23", 23))).toBe("2026-09-23");
    expect(dayKey(at("2026-09-23", 0))).toBe("2026-09-23");
    expect(addDays("2026-09-30", 1)).toBe("2026-10-01");
    expect(daysBetween("2026-09-23", "2026-09-30")).toBe(7);
    expect(daysBetween("2026-09-30", "2026-09-23")).toBe(-7);
  });
  it("survives the autumn clock change", () => {
    // 2026-10-25 is when British Summer Time ends.
    expect(addDays("2026-10-24", 1)).toBe("2026-10-25");
    expect(addDays("2026-10-25", 1)).toBe("2026-10-26");
    expect(daysBetween("2026-10-24", "2026-10-26")).toBe(2);
    const lateNight = new Date(2026, 9, 25, 0, 30).getTime();
    expect(dayKey(lateNight)).toBe("2026-10-25");
  });
});

describe("plan", () => {
  it("schedules one idea per session for sprint and steady, a unit per session for deep", () => {
    expect(buildPlan("math", "steady").days).toHaveLength(18);
    expect(buildPlan("math", "sprint").days).toHaveLength(18);
    const deep = buildPlan("math", "deep");
    expect(deep.days).toHaveLength(6);
    expect(deep.days[0].conceptIds).toEqual(["math-1-1", "math-1-2", "math-1-3"]);
    expect(deep.days.every((d) => d.isUnitEnd)).toBe(true);
  });
  it("marks the last idea of each unit as the checkpoint session", () => {
    const plan = buildPlan("math", "steady");
    expect(plan.days.filter((d) => d.isUnitEnd).map((d) => d.day)).toEqual([3, 6, 9, 12, 15, 18]);
    expect(plan.days[4]).toMatchObject({ day: 5, unit: 2, conceptIds: ["math-2-2"] });
  });
  it("only schedules authored units, and never past a gap", () => {
    expect(buildPlan("math", "steady", [1, 2, 4]).days).toHaveLength(6);
    expect(buildPlan("math", "steady", []).days).toHaveLength(0);
    expect(buildPlan("math", "steady", [2, 3]).days).toHaveLength(0);
  });
  it("defaults an empty pace to steady", () => {
    expect(buildPlan("math", "").pace).toBe("steady");
  });
});

/** A memory of the given stability, last reviewed on `reviewedOn`. */
const held = (stability: number, reviewedOn = "2026-09-01", over: Partial<MemoryState> = {}): MemoryState => ({
  ...freshMemory("2026-08-20"),
  stability,
  difficulty: 5,
  reviewedOn,
  due: addDays(reviewedOn, Math.max(1, Math.round(stability))),
  lastGrade: undefined,
  ...over,
});

describe("memory (stability model)", () => {
  const today = "2026-09-23";
  it("a fresh idea starts as a Good first impression and is due tomorrow, after a night's sleep", () => {
    const m = freshMemory(today);
    expect(m.due).toBe("2026-09-24");
    expect(m.stability).toBeCloseTo(initialState(3).stability);
  });
  it("on the learning day the worst answer sets the starting point, but the first review stays tomorrow", () => {
    let m = recordAnswer(freshMemory(today), true, today, { confidence: "unsure" });
    expect(m.stability).toBeCloseTo(initialState(2).stability);
    m = recordAnswer(m, true, today); // a later sure answer cannot lift it back
    expect(m.stability).toBeCloseTo(initialState(2).stability);
    m = recordAnswer(m, false, today);
    expect(m.stability).toBeCloseTo(initialState(1).stability);
    expect(m.due).toBe("2026-09-24");
    // and never above Good on the learning day, however fluent
    expect(recordAnswer(freshMemory(today), true, today, { grade: 4 }).stability).toBeCloseTo(initialState(3).stability);
  });
  it("a delayed right answer makes the memory last longer and pushes the next review out", () => {
    let m = freshMemory(today);
    m = recordAnswer(m, true, "2026-09-24");
    expect(m.stability).toBeGreaterThan(initialState(3).stability);
    expect(daysBetween("2026-09-24", m.due)).toBeGreaterThanOrEqual(2);
    const s1 = m.stability;
    m = recordAnswer(m, true, m.due);
    expect(m.stability).toBeGreaterThan(s1);
  });
  it("sure beats unsure, and fluent beats sure", () => {
    const base = held(6, "2026-09-17");
    const hard = recordAnswer(base, true, today, { confidence: "unsure" });
    const good = recordAnswer(base, true, today);
    const easy = recordAnswer(base, true, today, { grade: 4 });
    expect(hard.stability).toBeLessThan(good.stability);
    expect(good.stability).toBeLessThan(easy.stability);
    expect(hard.difficulty).toBeGreaterThan(good.difficulty);
  });
  it("a delayed miss shortens the memory, raises its difficulty, comes back tomorrow and counts the confident mistake", () => {
    const m = recordAnswer(held(20, "2026-09-10"), false, "2026-10-01", { confidence: "sure" });
    expect(m.stability).toBeLessThan(20);
    expect(m.difficulty).toBeGreaterThan(5);
    expect(m.due).toBe("2026-10-02");
    expect(m.sureWrong).toBe(1);
    expect(m.last).toBe(false);
  });
  it("orders due ideas: missed last time, then confident mistakes, then lowest chance of recall", () => {
    const memory = {
      a: held(10, "2026-09-10"),                      // 13 days on a 10-day memory
      b: held(3, "2026-09-20", { last: false }),      // missed last time
      c: held(4, "2026-09-10"),                       // 13 days on a 4-day memory: the most faded
      d: held(30, "2026-09-20"),                      // not due
    };
    expect(dueConcepts(memory, ["a", "b", "c", "d"], "2026-09-23")).toEqual(["b", "c", "a"]);
  });
  it("the path's strength grows with how long an idea lasts and drains when it is overdue", () => {
    expect(strength(held(30, "2026-09-20"), today)).toBeGreaterThan(strength(held(3, "2026-09-20"), today));
    expect(strength(held(10, "2026-09-20"), today)).toBeGreaterThan(strength(held(10, "2026-08-01"), today));
    expect(isSecured(held(7))).toBe(true);
    expect(isSecured(held(6.9))).toBe(false);
    expect(isSecured(held(4), 2)).toBe(true); // a learner who forgets half as fast holds it
  });
});

describe("grading the evidence", () => {
  it("wrong is Again, unsure is Hard, sure is Good, sure and quicker than usual before the options is Easy", () => {
    expect(gradeAnswer({ correct: false, source: "rewind", confidence: "sure" })).toBe(1);
    expect(gradeAnswer({ correct: true, source: "rewind", confidence: "unsure" })).toBe(2);
    expect(gradeAnswer({ correct: true, source: "rewind", confidence: "sure", thinkMs: 9000 }, 4000)).toBe(3);
    expect(gradeAnswer({ correct: true, source: "rewind", confidence: "sure", thinkMs: 3000 }, 4000)).toBe(4);
    expect(gradeAnswer({ correct: true, source: "rewind", confidence: "sure", thinkMs: 3000 }, null)).toBe(3); // no baseline yet
  });
  it("a game tap never moves a memory, but a delayed game miss asks for a proper check tomorrow", () => {
    expect(gradeAnswer({ correct: true, source: "game", confidence: "unsure" })).toBeNull();
    expect(gradeAnswer({ correct: false, source: "game", confidence: "unsure" })).toBeNull();
    const m = held(20, "2026-09-20");
    const after = recordAnswer(m, false, "2026-09-23", { grade: null, confidence: "unsure" });
    expect(after.stability).toBe(20);
    expect(after.due).toBe("2026-09-24");
  });
  it("learns what fast means for this learner from their own think-first answers", () => {
    const events: StudyEvent[] = [3000, 5000, 4000, 9000, 7000, 6000].map((thinkMs, i) => ({ t: i, type: "answer", subject: "math", concept: "math-1-1", correct: true, ms: 1, source: "rewind", confidence: "sure", delayed: true, thinkMs }));
    expect(deriveSignals(events.slice(0, 5)).fastThinkMs).toBeNull();
    expect(deriveSignals(events).fastThinkMs).toBe(4000); // the quickest fifth: Easy stays rare
  });
});

describe("streak", () => {
  it("counts consecutive days and allows one rest day a week", () => {
    const sessions = ["2026-09-18", "2026-09-19", "2026-09-21", "2026-09-22", "2026-09-23"].map((date) => ({ date }));
    const s = streak(sessions, "2026-09-23");
    expect(s.current).toBe(5);
    expect(s.restUsed).toBe(true);
    expect(s.activeToday).toBe(true);
    expect(s.thisWeek).toBe(5);
  });
  it("keeps yesterday's streak alive until today is missed", () => {
    const s = streak([{ date: "2026-09-21" }, { date: "2026-09-22" }], "2026-09-23");
    expect(s.current).toBe(2);
    expect(s.activeToday).toBe(false);
    expect(streak([{ date: "2026-09-20" }], "2026-09-23").current).toBe(0);
  });
  it("does not allow two rest days in one week", () => {
    const sessions = ["2026-09-17", "2026-09-19", "2026-09-21", "2026-09-22", "2026-09-23"].map((date) => ({ date }));
    expect(streak(sessions, "2026-09-23").current).toBe(4); // 23, 22, 21, rest, 19; the 18th cannot be a second rest
  });
});

describe("daily gate", () => {
  const plan = buildPlan("math", "steady");
  it("walks not-started, ready, locked, finished", () => {
    const today = "2026-09-23";
    expect(dayStatus(plan, undefined, today)).toEqual({ kind: "not-started", day: 1 });
    let state: StudyState = startDay(emptyStudy, "math", 1, at(today));
    expect(dayStatus(plan, state.subjects.math, today).kind).toBe("in-progress");
    state = completeDay(state, "math", at(today, 10))!.state;
    expect(dayStatus(plan, state.subjects.math, today)).toMatchObject({ kind: "locked", day: 2, unlocksOn: "2026-09-24", canOverride: true });
    expect(dayStatus(plan, state.subjects.math, "2026-09-24")).toEqual({ kind: "ready", day: 2 });
    // Override once, then the second sitting of the day closes the gate for good.
    state = completeDay(startDay(state, "math", 2, at(today, 11), true), "math", at(today, 12))!.state;
    expect(dayStatus(plan, state.subjects.math, today)).toMatchObject({ kind: "locked", canOverride: false });
  });
  it("reports finished once every session is done", () => {
    const progress = { startedOn: "2026-09-01", completedDays: plan.days.map((d) => d.day), sessionsToday: 0, checkpoints: {} };
    expect(dayStatus(plan, progress, "2026-10-20")).toEqual({ kind: "finished" });
  });
  it("never lets a clock going backwards move today earlier", () => {
    const state = { ...emptyStudy, lastSeen: "2026-09-25" };
    expect(effectiveToday(state, at("2026-09-23"))).toBe("2026-09-25");
    expect(effectiveToday(state, at("2026-09-26"))).toBe("2026-09-26");
  });
});

describe("sessions", () => {
  const l = learner();
  const profile = buildProfile(l);
  const plan = buildPlan("math", "steady");

  it("session 1 explains itself and has no rewind; unit-end sessions replace play and check with a checkpoint", () => {
    const s1 = buildSession(plan, 1, l, profile, emptyStudy, "2026-09-23");
    expect(s1.segments.map((s) => s.kind)).toEqual(["intro", "learn", "play", "check", "done"]);
    const state = completeDay(startDay(emptyStudy, "math", 1, at("2026-09-23")), "math", at("2026-09-23", 10))!.state;
    const s3 = buildSession(buildPlan("math", "steady"), 3, l, profile, { ...state, subjects: { math: { ...state.subjects.math, completedDays: [1, 2] } } }, "2026-09-25");
    expect(s3.segments.map((s) => s.kind)).toEqual(["rewind", "learn", "checkpoint", "done"]);
    expect(s3.estMinutes).toBeGreaterThan(5);
  });

  it("day 2 rewinds day 1's idea with a retrieval question before the recap", () => {
    let state = startDay(emptyStudy, "math", 1, at("2026-09-23"));
    state = learned(state, "math-1-1", "infographic", at("2026-09-23"));
    state = answered(state, "math", "math-1-1", true, at("2026-09-23"), { source: "check" });
    state = completeDay(state, "math", at("2026-09-23", 10))!.state;
    const s2 = buildSession(plan, 2, l, profile, state, "2026-09-24");
    const rewind = s2.segments[0] as Extract<Segment, { kind: "rewind" }>;
    expect(rewind.kind).toBe("rewind");
    expect(rewind.items.map((i) => i.conceptId)).toEqual(["math-1-1"]);
    expect(rewind.recapIds).toEqual(["math-1-1"]);
    expect(rewind.items[0].source === "quiz" || rewind.items[0].source === "blitz").toBe(true);
  });

  it("sprint alternates play and check and keeps the review load to one", () => {
    const sprint = buildPlan("math", "sprint");
    const ls = learner({ pace: "sprint" });
    const s1 = buildSession(sprint, 1, ls, buildProfile(ls), emptyStudy, "2026-09-23").segments.map((s) => s.kind);
    expect(s1).toEqual(["intro", "learn", "play", "done"]);
    const state = { ...emptyStudy, subjects: { math: { startedOn: "2026-09-23", completedDays: [1], sessionsToday: 0, checkpoints: {} } }, memory: { "math-1-1": freshMemory("2026-09-23") } };
    const s2 = buildSession(sprint, 2, ls, buildProfile(ls), state, "2026-09-24");
    expect(s2.segments.map((s) => s.kind)).toEqual(["rewind", "learn", "check", "done"]);
    expect((s2.segments[0] as Extract<Segment, { kind: "rewind" }>).items).toHaveLength(1);
    expect((s2.segments[1] as Extract<Segment, { kind: "learn" }>).compact).toBe(true);
  });

  it("deep pace learns three ideas with a check after each, then a game and a checkpoint", () => {
    const ld = learner({ pace: "deep" });
    const s = buildSession(buildPlan("math", "deep"), 1, ld, buildProfile(ld), emptyStudy, "2026-09-23");
    expect(s.segments.map((x) => x.kind)).toEqual(["intro", "learn", "check", "learn", "check", "learn", "check", "play", "checkpoint", "done"]);
  });

  it("interleaves at most one due idea from another subject", () => {
    const l2 = learner({ subjects: ["math", "money"] });
    const p2 = buildProfile(l2);
    const money = buildPlan("money", "steady");
    const state: StudyState = {
      ...emptyStudy,
      subjects: {
        math: { startedOn: "2026-09-20", completedDays: [1, 2], sessionsToday: 0, checkpoints: {} },
        money: { startedOn: "2026-09-20", completedDays: [1, 2], sessionsToday: 0, checkpoints: {} },
      },
      memory: {
        "math-1-1": { ...freshMemory("2026-09-20"), due: "2026-09-22" },
        "math-1-2": { ...freshMemory("2026-09-21"), due: "2026-09-22" },
        "money-1-1": { ...freshMemory("2026-09-20"), due: "2026-09-21" },
        "money-1-2": { ...freshMemory("2026-09-21"), due: "2026-09-21" },
      },
    };
    const s = buildSession(plan, 3, l2, p2, state, "2026-09-23", [money]);
    const rewind = s.segments[0] as Extract<Segment, { kind: "rewind" }>;
    expect(rewind.items.filter((i) => i.crossSubject)).toHaveLength(1);
    expect(rewind.items.length).toBeLessThanOrEqual(REVIEW_CAP.steady);
  });

  it("the running sitting records answers, confident mistakes and stuck ideas", () => {
    let state = startDay(emptyStudy, "math", 1, at("2026-09-23"));
    state = answered(state, "math", "math-1-1", false, at("2026-09-23"), { source: "check", confidence: "sure" });
    state = answered(state, "math", "math-1-1", true, at("2026-09-23"), { source: "check" });
    expect(state.subjects.math.current).toMatchObject({ asked: 2, correct: 1, stuck: ["math-1-1"], sureWrong: ["math-1-1"] });
    const done = completeDay(state, "math", at("2026-09-23", 9, ) + 7 * 60_000)!;
    expect(done.record).toMatchObject({ subject: "math", day: 1, minutes: 7, correct: 1, asked: 2 });
    expect(done.state.subjects.math.completedDays).toEqual([1]);
    expect(done.state.subjects.math.current).toBeUndefined();
    expect(done.state.events.at(-1)).toMatchObject({ type: "session", day: 1 });
  });
});

describe("adaptation", () => {
  const base = deriveSignals([]);
  it("ranks formats from the profile, hides the long read from pre-readers and from sprint sessions", () => {
    const reader = { a: "reader", b: "reader", c: "reader", d: "reader", e: "reader" } as const;
    const early = learner({ age: 6, answers: reader });
    expect(rankFormats(buildProfile(early), early, base).ranked).not.toContain("reading");
    // From 8 the long read is back (with read aloud until reading is fluent), but never a problem before teaching under 12.
    const primary = learner({ age: 9, answers: reader });
    expect(rankFormats(buildProfile(primary), primary, base).ranked[0]).toBe("reading");
    expect(rankFormats(buildProfile(primary), primary, base).ranked).not.toContain("challenge");
    const adult = learner({ answers: { a: "reader", b: "reader", c: "reader", d: "reader", e: "reader" } });
    expect(rankFormats(buildProfile(adult), adult, base).ranked[0]).toBe("reading");
    expect(rankFormats(buildProfile(adult), adult, base, { pace: "sprint" }).ranked).not.toContain("reading");
    expect(rankFormats(buildProfile(adult), adult, base, { pace: "sprint" }).ranked).not.toContain("challenge");
  });
  it("pushes yesterday's format down and explores every fourth session", () => {
    const l = learner();
    const p = buildProfile(l);
    const first = rankFormats(p, l, base).ranked[0];
    expect(rankFormats(p, l, base, { last: first }).ranked[0]).not.toBe(first);
    expect(rankFormats(p, l, base, { sessionIndex: 3 }).exploring).toBe(true);
    expect(rankFormats(p, l, base, { sessionIndex: 2 }).exploring).toBe(false);
  });
  it("what stuck moves a format up once there is enough evidence", () => {
    const l = learner({ answers: { a: "visual", b: "visual", c: "watcher", d: "visual", e: "watcher" } });
    const p = buildProfile(l);
    const memory = { a: { ...freshMemory("2026-09-01"), format: "story" as const }, b: { ...freshMemory("2026-09-01"), format: "infographic" as const } };
    const events = [
      ...Array.from({ length: 8 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "a", correct: true, ms: 0, source: "rewind" as const, delayed: true })),
      ...Array.from({ length: 8 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "b", correct: false, ms: 0, source: "rewind" as const, delayed: true })),
    ];
    const before = rankFormats(p, l, base).ranked;
    const after = rankFormats(p, l, deriveSignals(events, memory)).ranked;
    expect(before.indexOf("story")).toBeGreaterThan(after.indexOf("story"));
  });
  it("picks the game from the style, varies it, and lets results beat the prior", () => {
    const player = learner();
    expect(chooseGame(buildProfile(player), player, base)).toBe("blitz");
    expect(chooseGame(buildProfile(player), player, base, "blitz")).not.toBe("blitz");
    const tinkerer = learner({ answers: { a: "tinkerer", b: "tinkerer", c: "tinkerer", d: "tinkerer", e: "tinkerer" } });
    expect(chooseGame(buildProfile(tinkerer), tinkerer, base)).toBe("blanks");
    const wins = deriveSignals(Array.from({ length: 3 }, (_, i) => ({ t: i, type: "game" as const, subject: "math", game: "pairs" as const, score: 95, accuracy: 0.95, ms: 0, finished: true })));
    expect(chooseGame(buildProfile(tinkerer), tinkerer, wins, "blanks")).toBe("pairs");
  });
  it("never times children, keeps the clock opt-in for everyone else, and scales support with accuracy", () => {
    const kid = learner({ age: 9 });
    expect(supportFor(kid, base, false)).toMatchObject({ blitzSeconds: null, pairsCount: 4 });
    expect(supportFor(kid, base, true).blitzSeconds).toBeNull();
    expect(supportFor(learner({ age: 70 }), base, true).blitzSeconds).toBe(12);
    const adult = learner();
    const shaky = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "x", correct: i < 4, ms: 0, source: "check" as const, delayed: false })));
    expect(supportFor(adult, shaky, false)).toMatchObject({ rung: 0, pairsCount: 4, blitzSeconds: null, orderPreplaced: true });
    const strong = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "x", correct: true, ms: 0, source: "check" as const, delayed: false })));
    // The clock is opt-in for everyone (a timer nobody can turn off fails WCAG 2.2.1); once on, it tightens with the rung.
    expect(supportFor(adult, strong, false)).toMatchObject({ rung: 2, pairsCount: 6, blitzSeconds: null });
    expect(supportFor(adult, strong, true)).toMatchObject({ rung: 2, blitzSeconds: 8 });
    expect(supportFor(adult, base, true).blitzSeconds).toBe(12);
  });
  it("derives motion from age and style, and honours reduced motion and the override", () => {
    const l = learner();
    const p = buildProfile(l);
    expect(motionFor(l, p, "auto")).toBe("lively");
    expect(motionFor(learner({ age: 70 }), p, "auto")).toBe("calm");
    expect(motionFor(learner({ age: 9 }), p, "auto")).toBe("balanced"); // no confetti or bounce pulling young attention off the lesson
    expect(motionFor(l, p, "auto", true)).toBe("calm");
    expect(motionFor(l, p, "balanced")).toBe("balanced");
  });
  it("shuffles deterministically from a seed", () => {
    const a = shuffle([1, 2, 3, 4, 5, 6], mulberry32(42));
    const b = shuffle([1, 2, 3, 4, 5, 6], mulberry32(42));
    expect(a).toEqual(b);
    expect([...a].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(shuffle([1, 2, 3, 4, 5, 6], mulberry32(43))).not.toEqual(a);
  });
});

describe("persistence", () => {
  it("migrates garbage to an empty state and round-trips a backup", () => {
    expect(migrateStudy(null)).toBe(emptyStudy);
    expect(migrateStudy({ version: 1, subjects: {} })).toBe(emptyStudy);
    expect(migrateStudy("nope")).toBe(emptyStudy);
    let state = startDay(emptyStudy, "math", 1, at("2026-09-23"));
    state = completeDay(state, "math", at("2026-09-23", 10))!.state;
    const restored = importStudy(exportStudy(state));
    expect(restored?.sessions).toEqual(state.sessions);
    expect(restored?.subjects.math.completedDays).toEqual([1]);
    expect(importStudy("{}")).toBeNull();
    expect(importStudy("not json")).toBeNull();
  });
  it("repairs a partially damaged subject record", () => {
    const s = migrateStudy({ version: 2, subjects: { math: { completedDays: [1, "x", 2] } } });
    expect(s.subjects.math.completedDays).toEqual([1, 2]);
    expect(s.subjects.math.sessionsToday).toBe(0);
    expect(s.subjects.math.checkpoints).toEqual({});
  });
});

/* A learner at 80% accuracy on three subjects, steady pace, for 40 days.
   The scheduler must keep the daily load bounded and memory must build. */
describe("simulation", () => {
  it("keeps review load under the cap and grows memory over a full path", () => {
    const l = learner({ subjects: ["math", "money", "science"] });
    const profile = buildProfile(l);
    const plans = l.subjects.map((s) => buildPlan(s, l.pace));
    const rng = mulberry32(2026);
    let state: StudyState = emptyStudy;
    let maxRewind = 0;
    for (let dayN = 0; dayN < 40; dayN++) {
      const key = addDays("2026-09-01", dayN);
      const now = at(key, 19);
      for (const plan of plans) {
        const status = dayStatus(plan, state.subjects[plan.subject], key);
        if (status.kind !== "ready" && status.kind !== "not-started") continue;
        const session = buildSession(plan, status.day, l, profile, state, key, plans);
        state = startDay(state, plan.subject, status.day, now, false, session.segments);
        for (const seg of session.segments) {
          if (seg.kind === "rewind") {
            maxRewind = Math.max(maxRewind, seg.items.length);
            for (const item of seg.items) state = answered(state, plan.subject, item.conceptId, rng() < 0.8, now, { source: "rewind", item, confidence: rng() < 0.7 ? "sure" : "unsure" });
          }
          if (seg.kind === "learn") state = learned(state, seg.conceptId, seg.format, now);
          if (seg.kind === "check") for (let i = 0; i < seg.count; i++) state = answered(state, plan.subject, seg.conceptId, rng() < 0.85, now, { source: "check" });
          if (seg.kind === "checkpoint") for (const id of seg.conceptIds) for (let i = 0; i < seg.perConcept; i++) state = answered(state, plan.subject, id, rng() < 0.85, now, { source: "checkpoint" });
          if (seg.kind === "play") for (const id of seg.conceptIds) state = answered(state, plan.subject, id, rng() < 0.8, now, { source: "game" });
          state = segmentDone(state, plan.subject, status.day, seg.kind, "complete", 60_000, now, seg.kind === "learn" ? { format: seg.format } : seg.kind === "play" ? { game: seg.game } : {});
        }
        state = completeDay(state, plan.subject, now + 12 * 60_000)!.state;
      }
    }
    expect(maxRewind).toBeLessThanOrEqual(REVIEW_CAP.steady + 1); // plus one interleaved idea from another subject
    for (const plan of plans) expect(state.subjects[plan.subject].completedDays).toHaveLength(18);
    expect(state.sessions).toHaveLength(54);
    const stabilities = Object.values(state.memory).map((m) => m.stability);
    expect(stabilities).toHaveLength(54);
    const median = [...stabilities].sort((a, b) => a - b)[Math.floor(stabilities.length / 2)];
    expect(median).toBeGreaterThan(initialState(3).stability); // reviews made most ideas last longer than a first impression
    expect(state.memoryScale).toBeGreaterThanOrEqual(0.4);
    expect(state.memoryScale).toBeLessThanOrEqual(4);
    expect(state.events.length).toBeLessThanOrEqual(600);
    expect(streak(state.sessions, "2026-09-18").current).toBe(18); // every path finished on day 18
    // A catch-up sitting is always bounded.
    expect(buildReviewSession(state, plans, "2026-10-15").length).toBeLessThanOrEqual(6);
  });
});

describe("review findings (regressions)", () => {
  const l = learner();
  const profile = buildProfile(l);
  const plan = buildPlan("math", "steady");

  it("a memory moves at most once a day: a game and a checkpoint after the rewind cannot push the schedule out", () => {
    let m = freshMemory("2026-09-23"); // due 09-24
    m = recordAnswer(m, true, "2026-09-24"); // rewind
    const moved = { stability: m.stability, difficulty: m.difficulty, due: m.due };
    m = recordAnswer(m, true, "2026-09-24", { grade: null }); // a game tap
    m = recordAnswer(m, true, "2026-09-24", { grade: 4 }); // a checkpoint, even a fluent one
    expect(m).toMatchObject({ ...moved, right: 3 });
    // A later miss the same day still counts, recomputed from the memory as it stood that morning, not on top of the morning's gain.
    m = recordAnswer(m, false, "2026-09-24");
    expect(m.stability).toBeLessThan(initialState(3).stability);
    expect(m.due).toBe("2026-09-25");
    // A review the next day starts from the corrected memory.
    const next = recordAnswer(m, true, "2026-09-25");
    expect(next.reviewedOn).toBe("2026-09-25");
    expect(next.stability).toBeGreaterThan(m.stability);
  });

  it("a same-day miss opens tomorrow's rewind, and an unsure miss is not a confident mistake", () => {
    const missed = recordAnswer(freshMemory("2026-09-23"), false, "2026-09-23");
    expect(missed.last).toBe(false);
    expect(dueConcepts({ a: missed, b: freshMemory("2026-09-23") }, ["b", "a"], "2026-09-24")).toEqual(["a", "b"]);
    const unsure = recordAnswer(held(20, "2026-09-03"), false, "2026-09-23", { confidence: "unsure" });
    expect(unsure).toMatchObject({ sureWrong: 0, due: "2026-09-24" });
    expect(unsure.stability).toBeLessThan(20);
  });

  it("game answers are weak evidence: never a confident mistake, never a promotion", () => {
    let state: StudyState = { ...emptyStudy, memory: { "math-1-1": freshMemory("2026-09-20") } };
    state = startDay(state, "math", 2, at("2026-09-23"));
    state = answered(state, "math", "math-1-1", false, at("2026-09-23"), { source: "game" });
    expect(state.memory["math-1-1"].sureWrong).toBe(0);
    expect(state.subjects.math.current?.sureWrong).toEqual([]);
    expect(state.events.at(-1)).toMatchObject({ type: "answer", confidence: "unsure" });
    state = answered(state, "math", "math-1-1", true, at("2026-09-23"), { source: "game" });
    expect(state.memory["math-1-1"].stability).toBe(freshMemory("2026-09-20").stability);
  });

  it("a catch-up review does not count towards a subject's running sitting", () => {
    let state = startDay(emptyStudy, "math", 1, at("2026-09-23"));
    state = answered(state, "math", "math-1-1", true, at("2026-09-23"), { source: "review" });
    expect(state.subjects.math.current).toMatchObject({ asked: 0, correct: 0 });
    expect(state.memory["math-1-1"]).toBeDefined();
  });

  it("replaying a finished session counts for the streak but never consumes the daily gate", () => {
    let state = completeDay(startDay(emptyStudy, "math", 1, at("2026-09-20")), "math", at("2026-09-20", 10))!.state;
    state = completeDay(startDay(state, "math", 2, at("2026-09-21")), "math", at("2026-09-21", 10))!.state;
    const today = "2026-09-22";
    state = completeDay(startDay(state, "math", 1, at(today)), "math", at(today, 10))!.state; // replay
    expect(dayStatus(plan, state.subjects.math, today)).toEqual({ kind: "ready", day: 3 });
    expect(streak(state.sessions, today).activeToday).toBe(true);
    state = completeDay(startDay(state, "math", 3, at(today, 11)), "math", at(today, 12))!.state;
    expect(dayStatus(plan, state.subjects.math, today)).toMatchObject({ kind: "locked", day: 4, canOverride: true });
    state = completeDay(startDay(state, "math", 4, at(today, 13), true), "math", at(today, 14))!.state;
    expect(dayStatus(plan, state.subjects.math, today)).toMatchObject({ kind: "locked", day: 5, canOverride: false });
    state = completeDay(startDay(state, "math", 2, at(today, 15)), "math", at(today, 16))!.state; // replay after the gate closed
    expect(dayStatus(plan, state.subjects.math, today)).toMatchObject({ kind: "locked", day: 5, canOverride: false });
    expect(state.subjects.math.sessionsToday).toBe(2);
    expect(state.subjects.math.completedDays).toEqual([1, 2, 3, 4]);
  });

  it("a device clock set far ahead cannot lock the app: the guard is bounded and touch() recovers", () => {
    let state = touch(emptyStudy, at("2027-01-01"));
    expect(state.lastSeen).toBe("2027-01-01");
    expect(effectiveToday(state, at("2026-09-23"))).toBe("2026-09-23");
    state = touch(state, at("2026-09-23"));
    expect(state.lastSeen).toBe("2026-09-23");
    // Small backwards jumps are still held to the last day seen.
    const recent = { ...emptyStudy, lastSeen: addDays("2026-09-23", CLOCK_GUARD_DAYS) };
    expect(effectiveToday(recent, at("2026-09-23"))).toBe(recent.lastSeen);
    expect(effectiveToday({ ...emptyStudy, lastSeen: addDays("2026-09-23", CLOCK_GUARD_DAYS + 1) }, at("2026-09-23"))).toBe("2026-09-23");
    // A backup from a forward-clocked device heals on import as well.
    const poisoned = importStudy(exportStudy(touch(emptyStudy, at("2027-06-01"))))!;
    expect(effectiveToday(poisoned, at("2026-09-23"))).toBe("2026-09-23");
  });

  it("'show me another way' counts against a format that was never completed", () => {
    const state = switchedFormatState();
    const signals = deriveSignals(state.events, state.memory);
    expect(signals.formatScore.challenge).toBeLessThan(0);
    const work = learner({ goal: "work", answers: { a: "tinkerer", b: "tinkerer", c: "tinkerer", d: "tinkerer", e: "tinkerer" } });
    const p = buildProfile(work);
    expect(rankFormats(p, work, deriveSignals([])).ranked[0]).toBe("challenge");
    const after = rankFormats(p, work, signals).ranked;
    expect(after.indexOf("challenge")).toBeGreaterThan(0);
    function switchedFormatState() {
      let s = startDay(emptyStudy, "math", 1, at("2026-09-23"));
      for (let i = 0; i < 3; i++) s = { ...s, events: [...s.events, { t: i, type: "rating", format: "challenge", up: false }] };
      return s;
    }
  });

  it("a pace change re-cuts completed days instead of reinterpreting them", () => {
    // Steady learner finished units 1 and 2 (days 1..6), then retakes the profile as deep.
    let state: StudyState = emptyStudy;
    for (let d = 1; d <= 6; d++) {
      const key = addDays("2026-09-01", d);
      state = completeDay(startDay(state, "math", d, at(key), false, undefined, "steady"), "math", at(key, 10))!.state;
    }
    const deep = buildPlan("math", "deep");
    const moved = reconcilePlan(state, deep);
    expect(moved.subjects.math).toMatchObject({ pace: "deep", completedDays: [1, 2] });
    expect(dayStatus(deep, moved.subjects.math, "2026-09-23")).toEqual({ kind: "ready", day: 3 });
    expect(reconcilePlan(moved, deep)).toBe(moved);
    // Deep learner finished unit 1 in one sitting, then goes steady: three sessions are done, session 4 is next.
    let d2: StudyState = completeDay(startDay(emptyStudy, "math", 1, at("2026-09-20"), false, undefined, "deep"), "math", at("2026-09-20", 10))!.state;
    d2 = reconcilePlan(d2, buildPlan("math", "steady"));
    expect(d2.subjects.math.completedDays).toEqual([1, 2, 3]);
    expect(dayStatus(buildPlan("math", "steady"), d2.subjects.math, "2026-09-23")).toEqual({ kind: "ready", day: 4 });
    // Legacy progress without a pace is adopted as-is.
    const legacy: StudyState = { ...emptyStudy, subjects: { math: { startedOn: "2026-09-01", completedDays: [1], sessionsToday: 0, checkpoints: {} } } };
    expect(reconcilePlan(legacy, deep).subjects.math).toMatchObject({ pace: "deep", completedDays: [1] });
  });

  it("imports and migrations drop or repair damaged records instead of crashing the engine later", () => {
    const s = migrateStudy({
      version: 2,
      lastSeen: "not a day",
      memory: { "math-1-1": { box: 9, learnedOn: "2026-09-20", seen: 2 }, "math-1-2": {}, "math-1-3": { box: 1, due: "2026-09-22", learnedOn: "2026-09-20", seen: 2, right: 1, wrong: 0, sureWrong: 0 } },
      events: [null, { t: 1, type: "game", subject: "math", game: "chess", score: 1, accuracy: 1, ms: 1, finished: true }, { t: 2, type: "rating", format: "story", up: true }, "x"],
      sessions: [null, { subject: "math", day: 1, date: "NaN-NaN-NaN", minutes: 1, correct: 1, asked: 1 }, { subject: "math", day: 1, date: "2026-09-22", minutes: 3, correct: 2, asked: 3 }],
      subjects: { math: { startedOn: "2026-09-20", completedDays: [1, 1, 0, "x", 2], sessionsToday: -3, checkpoints: { 1: { passed: true, score: 5, of: 6, on: "2026-09-22" }, 2: "bad" }, current: { day: 3 } } },
      said: { "math-1-1": 42, "math-1-2": "in my words" },
    });
    expect(s.lastSeen).toBe("");
    expect(Object.keys(s.memory)).toEqual(["math-1-1", "math-1-3"]);
    // A Leitner box becomes a stability of its interval, the clock starting one interval before it was due.
    expect(s.memory["math-1-1"]).toMatchObject({ stability: 30, due: "2026-10-20", reviewedOn: "2026-09-20", lastAsked: [] });
    expect(s.memory["math-1-3"]).toMatchObject({ stability: 2, due: "2026-09-22", reviewedOn: "2026-09-20" });
    expect(s.memoryScale).toBe(1);
    expect(s.events).toEqual([{ t: 2, type: "rating", format: "story", up: true }]);
    expect(s.sessions).toHaveLength(1);
    expect(s.subjects.math).toMatchObject({ completedDays: [1, 2], sessionsToday: 0, current: undefined });
    expect(Object.keys(s.subjects.math.checkpoints)).toEqual(["1"]);
    expect(s.said).toEqual({ "math-1-2": "in my words" });
    // Everything downstream now runs.
    expect(streak(s.sessions, "2026-09-23")).toMatchObject({ current: 1, activeToday: false });
    expect(() => deriveSignals(s.events, s.memory)).not.toThrow();
    const next = answered(s, "math", "math-1-3", true, at("2026-09-23"), { source: "rewind", item: { conceptId: "math-1-3", source: "quiz", index: 0, crossSubject: false } });
    expect(next.memory["math-1-3"].lastAsked).toEqual(["quiz:0"]);
    expect(() => buildSession(plan, 3, l, profile, next, "2026-09-23")).not.toThrow();
    // A bad date in a session record can no longer send the streak walk into an endless loop.
    expect(streak([{ date: "NaN-NaN-NaN" }, { date: "2026-09-23" }], "2026-09-23").current).toBe(1);
  });
});

describe("learn by doing: guess, try, see, say", () => {
  const today = "2026-09-23";
  type LearnSeg = Extract<Segment, { kind: "learn" }>;
  const learnSegs = (l: LearnerInput, state: StudyState = emptyStudy, day = 1) => {
    const plan = buildPlan("math", l.pace);
    return buildSession(plan, day, l, buildProfile(l), state, today).segments.filter((x): x is LearnSeg => x.kind === "learn");
  };

  it("adults try the example first once a topic is under way and type the idea back; children get instruction first and rebuild from chips", () => {
    const adult = learnSegs(learner(), emptyStudy, 2)[0];
    expect(adult.tryFirst).toBe(adult.format !== "challenge");
    expect(adult.sayBack).toBe("type");
    const kid = learnSegs(learner({ age: 9 }), emptyStudy, 2)[0];
    expect(kid.tryFirst).toBe(false);
    expect(kid.sayBack).toBe("build");
  });

  it("explains first at any age when the topic is new or answers are shaky", () => {
    // The chapter's first idea is new to everyone: no try-first, and no problem-first challenge format.
    const first = learnSegs(learner(), emptyStudy, 1)[0];
    expect(first.tryFirst).toBe(false);
    expect(first.format).not.toBe("challenge");
    // Shaky recent answers (under 60%) switch a later idea back to explain-first too.
    const shaky = { ...emptyStudy, events: Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "x", correct: i < 5, ms: 0, source: "check" as const, delayed: false })) };
    expect(learnSegs(learner(), shaky, 2)[0].tryFirst).toBe(false);
  });

  it("pre-readers skip the true/false guess and say ideas back with chips; from 10 typing returns", () => {
    expect(learnSegs(learner({ age: 6, pace: "sprint" }))[0].pretest).toBe(false);
    expect(learnSegs(learner({ age: 8 }))[0].pretest).toBe(true);
    expect(learnSegs(learner({ age: 11 }), emptyStudy, 2)[0].sayBack).toBe("type");
  });

  it("the five-minute pace keeps the lesson lean: no try, no say", () => {
    const s = learnSegs(learner({ pace: "sprint" }))[0];
    expect(s.tryFirst).toBe(false);
    expect(s.sayBack).toBe("none");
  });

  it("deep pace types the first idea back and rebuilds the other two", () => {
    expect(learnSegs(learner({ pace: "deep" })).map((s) => s.sayBack)).toEqual(["type", "build", "build"]);
  });

  it("a learner who skips the typing twice in a row gets the chips instead", () => {
    const now = at(today);
    let state: StudyState = saidBack(emptyStudy, "math", "math-1-1", now, { mode: "type", skipped: true });
    expect(learnSegs(learner(), state)[0].sayBack).toBe("type");
    state = saidBack(state, "math", "math-1-2", now + 1, { mode: "type", skipped: true });
    expect(deriveSignals(state.events, state.memory).saySkipStreak).toBe(2);
    expect(learnSegs(learner(), state)[0].sayBack).toBe("build");
    state = saidBack(state, "math", "math-1-3", now + 2, { mode: "type", text: "  Each place is worth ten of the one to its right. ", skipped: false });
    expect(deriveSignals(state.events, state.memory).saySkipStreak).toBe(0);
    expect(state.said["math-1-3"]).toBe("Each place is worth ten of the one to its right.");
    expect(state.events.at(-1)).toMatchObject({ type: "say", mode: "type", words: 11, skipped: false });
  });

  it("a guess before the explanation and a teach-back are signals only: no memory, no mark against the sitting", () => {
    const now = at(today);
    let state = startDay(emptyStudy, "math", 1, now, false, undefined, "steady");
    state = answered(state, "math", "math-1-1", false, now, { source: "try", confidence: "sure" });
    expect(state.memory["math-1-1"]).toBeUndefined();
    expect(state.subjects.math.current).toMatchObject({ asked: 0, correct: 0, stuck: [], sureWrong: [] });
    expect(state.events.at(-1)).toMatchObject({ type: "answer", source: "try", correct: false, confidence: "sure", delayed: false });
    state = learned(state, "math-1-1", "infographic", now);
    const before = state.memory["math-1-1"];
    state = answered(state, "math", "math-1-1", false, now, { source: "say" });
    expect(state.memory["math-1-1"]).toEqual(before);
    expect(state.subjects.math.current?.asked).toBe(0);
  });

  it("the rewind asks for the answer before showing options once an idea is holding", () => {
    expect(thinkFirst(undefined)).toBe(false);
    expect(thinkFirst(freshMemory(today))).toBe(false);
    expect(thinkFirst(held(3))).toBe(false);
    expect(thinkFirst(held(4))).toBe(true);
    expect(thinkFirst(held(2), 2)).toBe(true); // it lasts four days for a learner who forgets half as fast
  });

  it("the think time travels with the answer and survives a round trip through storage", () => {
    const now = at(today);
    let state: StudyState = { ...emptyStudy, memory: { "math-1-1": held(4, "2026-09-19") } };
    state = answered(state, "math", "math-1-1", true, now, { source: "rewind", confidence: "sure", thinkMs: 4200 });
    expect(state.events.at(-1)).toMatchObject({ type: "answer", thinkMs: 4200 });
    expect(migrateStudy(JSON.parse(JSON.stringify(state))).events.at(-1)).toMatchObject({ thinkMs: 4200 });
  });

  it("coverage matches key terms loosely and never by a short prefix", () => {
    const terms = ["Observation", "Inference", "Measurement", "Testable question"];
    const c = coverage("My observations are what I saw; the inference is my guess about them. I asked a testable question.", terms);
    expect(c.hit).toEqual(["Observation", "Inference", "Testable question"]);
    expect(c.missed).toEqual(["Measurement"]);
    expect(coverage("the the the", ["theory"]).hit).toEqual([]);
    expect(coverage("DNA carries the code", ["DNA"]).hit).toEqual(["DNA"]);
    expect(coverage("", terms).missed).toEqual(terms);
  });

  it("build chips cut a key point into 4 to 7 ordered pieces plus decoys that are not pieces", () => {
    const point = "An observation is what you see, hear or measure, not what it means.";
    const belief = "I saw it with my own eyes, so it's a fact, and my explanation of it must be right too.";
    const set = buildChips(point, belief, 7);
    expect(set.pieces.length).toBeGreaterThanOrEqual(4);
    expect(set.pieces.length).toBeLessThanOrEqual(7);
    expect(set.pieces.join(" ")).toBe(point);
    expect(set.distractors).toHaveLength(2);
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    for (const d of set.distractors) expect(set.pieces.map(norm)).not.toContain(norm(d));
    expect(new Set(set.distractors.map(norm)).size).toBe(2);
    expect(buildChips(point, belief, 7)).toEqual(set);
    expect(buildChips("Two words.", belief, 1).pieces).toEqual(["Two", "words."]);
    expect(buildChips("", belief, 1)).toEqual({ pieces: [], distractors: [] });
  });

  it("calibration counts the rated answers of one sitting and says something useful", () => {
    const now = at(today);
    let state: StudyState = { ...emptyStudy, memory: { a: held(2, "2026-09-21") } };
    const ans = (concept: string, correct: boolean, confidence: "sure" | "unsure", source: "rewind" | "check" | "game", dt: number) => {
      state = answered(state, "math", concept, correct, now + dt, { source, confidence });
    };
    ans("a", true, "sure", "rewind", 1);
    ans("b", false, "sure", "check", 2);
    ans("c", false, "sure", "check", 3);
    ans("d", true, "unsure", "check", 4);
    ans("e", true, "sure", "game", 5);
    const c = sittingCalibration(state.events, now);
    expect(c).toEqual({ sureRight: 1, sureWrong: 2, unsureRight: 1, unsureWrong: 0 });
    expect(calibrationNote(c)).toMatch(/2 answers felt sure and were wrong/);
    expect(calibrationNote({ sureRight: 3, sureWrong: 0, unsureRight: 0, unsureWrong: 0 })).toMatch(/worth trusting/);
    expect(calibrationNote({ sureRight: 1, sureWrong: 0, unsureRight: 2, unsureWrong: 0 })).toMatch(/knew more than you thought/);
    expect(calibrationNote({ sureRight: 1, sureWrong: 1, unsureRight: 0, unsureWrong: 0 })).toBeNull();
    expect(sittingCalibration(state.events, now + 3).sureRight).toBe(0);
  });

  it("sittings saved before the flags existed, and odd imported logs, migrate to the plain flow instead of crashing", () => {
    const raw = {
      ...emptyStudy,
      subjects: { math: { startedOn: today, completedDays: [], sessionsToday: 0, checkpoints: {}, current: { day: 1, segment: 1, startedAt: 1, correct: 0, asked: 0, stuck: [], sureWrong: [], pretest: {}, switched: false, override: false, segments: [{ kind: "intro" }, { kind: "learn", conceptId: "math-1-1", format: "story", exploring: false, pretest: true, compact: false }, { kind: "done" }] } } },
      events: [
        { t: 1, type: "say", subject: "math", concept: "math-1-1", mode: "type", words: 9, skipped: false },
        { t: 2, type: "say", subject: "math", concept: "x", mode: "shout", skipped: false },
        { t: 3, type: "answer", subject: "math", concept: "math-1-1", correct: true, ms: 0, source: "try", delayed: false },
      ],
    } as unknown;
    const m = migrateStudy(JSON.parse(JSON.stringify(raw)));
    expect(m.subjects.math.current?.segments?.[1]).toMatchObject({ kind: "learn", tryFirst: false, sayBack: "none" });
    expect(m.events.map((e) => e.type)).toEqual(["say", "answer"]);
    expect(() => deriveSignals(m.events, m.memory)).not.toThrow();
  });
});

describe("learning algorithms: relearning, mastery correctives, personal forgetting", () => {
  const today = "2026-09-23";
  const l = learner();
  const profile = buildProfile(l);
  const plan = buildPlan("math", "steady");

  it("a second go asks the same idea from another angle, never the item just missed or asked lately", () => {
    const missed = { conceptId: "math-1-1", source: "quiz" as const, index: 1, crossSubject: false };
    const again = retryItem(missed, held(5, "2026-09-18", { lastAsked: ["blank:2", "blank:0"] }));
    expect(again.conceptId).toBe("math-1-1");
    expect(again.source).not.toBe("quiz");
    expect(["blank:2", "blank:0", "quiz:1"]).not.toContain(`${again.source}:${again.index}`);
    expect(retryItem(missed, undefined)).toEqual(retryItem(missed, undefined)); // deterministic
  });

  it("weighs right answers by how guessable the item was", () => {
    expect(guessRate("blitz")).toBe(0.5);
    expect(guessRate("misconception")).toBe(0.5);
    expect(guessRate("quiz", 3)).toBeCloseTo(1 / 3);
    expect(guessRate("quiz")).toBe(0.25);
    expect(guessRate("blank")).toBeCloseTo(1 / 3);
  });

  it("logs a clean test of forgetting only for the day's first graded answer after the learning day", () => {
    let state: StudyState = { ...emptyStudy, memory: { "math-1-1": held(4, "2026-09-19") } };
    state = answered(state, "math", "math-1-1", true, at(today), { source: "rewind", confidence: "sure", guess: 0.25 });
    expect(state.events.at(-1)).toMatchObject({ grade: 3, el: 4, s: 4, guess: 0.25 });
    state = answered(state, "math", "math-1-1", true, at(today, 10), { source: "checkpoint", confidence: "sure" });
    expect(state.events.at(-1)).not.toHaveProperty("el"); // after feedback, not a clean test
    state = answered(state, "math", "math-1-1", false, at(today, 11), { source: "game" });
    expect(state.events.at(-1)).not.toHaveProperty("grade");
    // learning-day answers never calibrate
    let fresh: StudyState = { ...emptyStudy, memory: { "math-1-2": freshMemory(today) } };
    fresh = answered(fresh, "math", "math-1-2", true, at(today), { source: "check" });
    expect(fresh.events.at(-1)).not.toHaveProperty("el");
    expect(forgettingObservations(state.events)).toEqual([{ days: 4, stability: 4, correct: true, guess: 0.25 }]);
  });

  it("an answer recalled before the options counts for more than one picked from options shown at once", () => {
    const base: StudyState = { ...emptyStudy, memory: { "math-1-1": held(5, "2026-09-18") } };
    const recognised = answered(base, "math", "math-1-1", true, at(today), { source: "rewind", confidence: "sure" });
    const recalled = answered(base, "math", "math-1-1", true, at(today), { source: "rewind", confidence: "sure", thinkMs: 6000 });
    expect(recalled.memory["math-1-1"].stability).toBeGreaterThan(recognised.memory["math-1-1"].stability);
    expect(recalled.memory["math-1-1"].difficulty).toBe(recognised.memory["math-1-1"].difficulty);
  });

  it("the rewind grows when reviews back up, within the pace's cap", () => {
    const signals = deriveSignals([]);
    expect(reviewLoad("steady", signals, 3)).toBe(2);
    expect(reviewLoad("steady", signals, 7)).toBe(3);
    expect(reviewLoad("sprint", signals, 5)).toBe(2);
    expect(reviewLoad("steady", signals, 40)).toBeLessThanOrEqual(REVIEW_CAP.steady);
  });

  it("refits the forgetting scale when a sitting ends, and the scale stretches the schedule", () => {
    // A learner who keeps remembering long after the model expects them to forget.
    const events: StudyEvent[] = Array.from({ length: 60 }, (_, i) => ({ t: i, type: "answer", subject: "math", concept: `math-1-${(i % 3) + 1}`, correct: true, ms: 1, source: "rewind", confidence: "sure", delayed: true, grade: 3, el: 12, s: 3, guess: 0.25 }));
    let state: StudyState = { ...emptyStudy, events };
    state = startDay(state, "math", 1, at(today));
    state = completeDay(state, "math", at(today, 10))!.state;
    expect(state.memoryScale).toBeGreaterThan(1.2);
    const plain = recordAnswer(held(10, "2026-09-13"), true, today);
    const stretched = recordAnswer(held(10, "2026-09-13"), true, today, { scale: state.memoryScale });
    expect(daysBetween(today, stretched.due)).toBeGreaterThan(daysBetween(today, plain.due));
    expect(recalibrate({ ...emptyStudy })).toEqual({ ...emptyStudy }); // no evidence, no change
  });

  it("a failed checkpoint records what it missed; the next new session re-teaches it another way and retakes it, instead of the game", () => {
    let state: StudyState = {
      ...emptyStudy,
      subjects: { math: { startedOn: "2026-09-20", pace: "steady", completedDays: [1, 2, 3], lastCompletedOn: "2026-09-22", sessionsToday: 0, checkpoints: {} } },
      memory: {
        "math-1-1": held(5, "2026-09-22", { format: "story" }),
        "math-1-2": held(1.2, "2026-09-22", { format: "infographic" }),
        "math-1-3": held(0.4, "2026-09-22", { format: "story" }),
      },
    };
    state = checkpointResult(state, "math", 1, { score: 3, of: 6, passed: false, missed: ["math-1-2", "math-1-3", "math-1-3"] }, at("2026-09-22"));
    expect(state.subjects.math.checkpoints[1]).toMatchObject({ passed: false, missed: ["math-1-2", "math-1-3"] });
    expect(pendingCorrective(plan, state.subjects.math, 4)).toEqual({ unit: 1, conceptIds: ["math-1-2", "math-1-3"] });

    const s = buildSession(plan, 4, l, profile, state, today);
    expect(s.segments.map((x) => x.kind)).toEqual(["rewind", "learn", "checkpoint", "learn", "check", "done"]);
    const fix = s.segments[1] as Extract<Segment, { kind: "learn" }>;
    expect(fix).toMatchObject({ conceptId: "math-1-3", corrective: true, pretest: false, tryFirst: false, compact: true, sayBack: "build" });
    expect(fix.format).not.toBe("story"); // a different way in from how it was first taught
    expect(s.segments[2]).toMatchObject({ kind: "checkpoint", unit: 1, retake: true, conceptIds: ["math-1-2", "math-1-3"], perConcept: 2, passMark: 3 });
    expect(s.segments[3]).toMatchObject({ kind: "learn", conceptId: "math-2-1" });

    // One retake per unit, whatever its result; replays never carry correctives; a passed checkpoint needs none.
    const retaken = checkpointResult(state, "math", 1, { score: 2, of: 4, passed: false, missed: ["math-1-3"], retake: true }, at(today));
    expect(retaken.subjects.math.checkpoints[1]).toMatchObject({ retake: true, passed: false });
    expect(pendingCorrective(plan, retaken.subjects.math, 4)).toBeNull();
    expect(buildSession(plan, 4, l, profile, retaken, today).segments.map((x) => x.kind)).toEqual(["rewind", "learn", "play", "check", "done"]);
    expect(pendingCorrective(plan, state.subjects.math, 3)).toBeNull();
    const passed = checkpointResult(state, "math", 1, { score: 5, of: 6, passed: true }, at("2026-09-22"));
    expect(pendingCorrective(plan, passed.subjects.math, 4)).toBeNull();
  });

  it("correctives fit every pace: sprint keeps it to one short re-teach and a one-question-per-idea retake", () => {
    const sprint = buildPlan("math", "sprint");
    const state: StudyState = {
      ...emptyStudy,
      subjects: { math: { startedOn: "2026-09-20", pace: "sprint", completedDays: [1, 2, 3], lastCompletedOn: "2026-09-22", sessionsToday: 0, checkpoints: { 1: { passed: false, score: 1, of: 3, on: "2026-09-22", missed: ["math-1-1", "math-1-2"] } } } },
      memory: { "math-1-1": held(1, "2026-09-22"), "math-1-2": held(2, "2026-09-22"), "math-1-3": held(3, "2026-09-22") },
    };
    const s = buildSession(sprint, 4, learner({ pace: "sprint" }), profile, state, today);
    expect(s.segments.map((x) => x.kind)).toEqual(["rewind", "learn", "checkpoint", "learn", "done"]);
    expect(s.segments[1]).toMatchObject({ corrective: true, sayBack: "none" });
    expect(s.segments[2]).toMatchObject({ retake: true, perConcept: 1, passMark: 2 });
    expect(s.estMinutes).toBeLessThanOrEqual(10);
  });

  it("correctives, retakes and grades survive storage, and damaged ones are dropped", () => {
    const raw = {
      ...emptyStudy,
      memoryScale: 9,
      subjects: { math: { startedOn: today, completedDays: [1, 2, 3], sessionsToday: 0, checkpoints: { 1: { passed: false, score: 2, of: 6, on: today, missed: ["math-1-1", 4], retake: true } }, current: { day: 4, segment: 0, startedAt: 1, correct: 0, asked: 0, stuck: [], sureWrong: [], pretest: {}, switched: false, override: false, segments: [{ kind: "learn", conceptId: "math-1-1", format: "story", exploring: false, pretest: false, compact: true, tryFirst: false, sayBack: "build", corrective: true }, { kind: "checkpoint", unit: 1, conceptIds: ["math-1-1"], perConcept: 2, passMark: 2, retake: true }, { kind: "done" }] } } },
      events: [
        { t: 1, type: "answer", subject: "math", concept: "math-1-1", correct: true, ms: 1, source: "rewind", delayed: true, grade: 4, el: 3, s: 2.5, guess: 0.25 },
        { t: 2, type: "answer", subject: "math", concept: "math-1-1", correct: true, ms: 1, source: "rewind", delayed: true, grade: 7, el: -1, s: 2, guess: 2 },
      ],
      memory: { "math-1-1": { ...held(6, "2026-09-20"), lastGrade: { on: "2026-09-20", grade: 3, before: { stability: 2, difficulty: 5, reviewedOn: "2026-09-18", due: "2026-09-20" } } } },
    };
    const m = migrateStudy(JSON.parse(JSON.stringify(raw)));
    expect(m.memoryScale).toBe(1);
    expect(m.subjects.math.checkpoints[1]).toEqual({ passed: false, score: 2, of: 6, on: today, missed: ["math-1-1"], retake: true });
    expect(m.subjects.math.current?.segments?.[0]).toMatchObject({ corrective: true });
    expect(m.subjects.math.current?.segments?.[1]).toMatchObject({ retake: true });
    expect(m.events[0]).toMatchObject({ grade: 4, el: 3, s: 2.5, guess: 0.25 });
    expect(m.events[1]).not.toHaveProperty("grade");
    expect(m.events[1]).not.toHaveProperty("el");
    expect(m.memory["math-1-1"]).toMatchObject({ stability: 6, lastGrade: { grade: 3, before: { stability: 2, reviewedOn: "2026-09-18" } } });
  });
});
