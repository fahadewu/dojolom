process.env.TZ = "Europe/London";

import { describe, expect, it } from "vitest";
import { addDays, dayKey, dayKeyToMs, daysBetween } from "@/lib/clock";
import { buildProfile, emptyLearner, type LearnerInput } from "@/lib/learning";
import {
  answered,
  buildPlan,
  buildReviewSession,
  buildSession,
  chooseGame,
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
  recordAnswer,
  REVIEW_CAP,
  segmentDone,
  shuffle,
  startDay,
  streak,
  supportFor,
  type Segment,
  type StudyState,
} from "@/lib/study";

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner,
  name: "Test",
  age: "adult",
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

describe("memory (Leitner)", () => {
  const today = "2026-09-23";
  it("a fresh idea is due tomorrow", () => {
    expect(freshMemory(today).due).toBe("2026-09-24");
  });
  it("same-day answers never promote, but a wrong one drops to box 0", () => {
    let m = { ...freshMemory(today), box: 2 };
    m = recordAnswer(m, true, today);
    expect(m.box).toBe(2);
    m = recordAnswer(m, false, today);
    expect(m.box).toBe(0);
    expect(m.due).toBe("2026-09-24");
  });
  it("a delayed correct and sure answer climbs a box with a longer interval", () => {
    let m = freshMemory(today);
    m = recordAnswer(m, true, "2026-09-24");
    expect(m.box).toBe(1);
    expect(m.due).toBe("2026-09-26");
    m = recordAnswer(m, true, "2026-09-26");
    expect(m.box).toBe(2);
    expect(m.due).toBe("2026-09-30");
  });
  it("a delayed correct but unsure answer holds its box", () => {
    const m = recordAnswer({ ...freshMemory(today), box: 2 }, true, "2026-09-25", "unsure");
    expect(m.box).toBe(2);
  });
  it("a delayed wrong answer halves the box and comes back tomorrow, counting confident mistakes", () => {
    const m = recordAnswer({ ...freshMemory(today), box: 4 }, false, "2026-10-01", "sure");
    expect(m.box).toBe(2);
    expect(m.due).toBe("2026-10-02");
    expect(m.sureWrong).toBe(1);
    expect(m.last).toBe(false);
  });
  it("orders due ideas: recent mistakes first, then most overdue, then weakest", () => {
    const memory = {
      a: { ...freshMemory("2026-09-01"), box: 3, due: "2026-09-20" },
      b: { ...freshMemory("2026-09-01"), box: 1, due: "2026-09-22", last: false },
      c: { ...freshMemory("2026-09-01"), box: 5, due: "2026-09-10" },
      d: { ...freshMemory("2026-09-01"), box: 2, due: "2026-09-30" }, // not due
    };
    expect(dueConcepts(memory, ["a", "b", "c", "d"], "2026-09-23")).toEqual(["b", "c", "a"]);
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
  it("ranks formats from the profile, hides the long read from kids and from sprint sessions", () => {
    const kid = learner({ age: "kid", answers: { a: "reader", b: "reader", c: "reader", d: "reader", e: "reader" } });
    expect(rankFormats(buildProfile(kid), kid, base).ranked).not.toContain("reading");
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
  it("gives kids and seniors untimed games and scales support with accuracy", () => {
    const kid = learner({ age: "kid" });
    expect(supportFor(kid, base, false)).toMatchObject({ blitzSeconds: null, pairsCount: 4 });
    expect(supportFor(kid, base, true).blitzSeconds).not.toBeNull();
    const adult = learner();
    const shaky = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "x", correct: i < 4, ms: 0, source: "check" as const, delayed: false })));
    expect(supportFor(adult, shaky, false)).toMatchObject({ rung: 0, pairsCount: 4, blitzSeconds: null, orderPreplaced: true });
    const strong = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "x", correct: true, ms: 0, source: "check" as const, delayed: false })));
    expect(supportFor(adult, strong, false)).toMatchObject({ rung: 2, pairsCount: 6, blitzSeconds: 8 });
  });
  it("derives motion from age and style, and honours reduced motion and the override", () => {
    const l = learner();
    const p = buildProfile(l);
    expect(motionFor(l, p, "auto")).toBe("lively");
    expect(motionFor(learner({ age: "senior" }), p, "auto")).toBe("calm");
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
    const boxes = Object.values(state.memory).map((m) => m.box);
    expect(boxes).toHaveLength(54);
    const median = [...boxes].sort((a, b) => a - b)[Math.floor(boxes.length / 2)];
    expect(median).toBeGreaterThanOrEqual(1);
    expect(state.events.length).toBeLessThanOrEqual(600);
    expect(streak(state.sessions, "2026-09-18").current).toBe(18); // every path finished on day 18
    // A catch-up sitting is always bounded.
    expect(buildReviewSession(state, plans, "2026-10-15").length).toBeLessThanOrEqual(6);
  });
});
