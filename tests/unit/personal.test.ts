process.env.TZ = "Europe/London";

import { describe, expect, it } from "vitest";
import { blend, followThroughFromBehaviour, gradeFor, meetsGrade, studyItems, studyProfile, tuningFor, tuningLines } from "@/lib/personal";
import { baseRung, deriveSignals, emptyStudy, migrateStudy, rankFormats, setPlan, tuningOf, type StudyState } from "@/lib/study";
import { buildProfile, emptyLearner, type LearnerInput } from "@/lib/learning";

const all = (v: number) => Object.fromEntries(studyItems.map((i) => [i.id, v]));

describe("the study profile", () => {
  it("scores each dimension 0..1 with reversed items flipped, so agreeing with everything lands in the middle", () => {
    expect(studyProfile(all(5))).toEqual({ followThrough: 0.5, nerves: 0.5, confidence: 0.5, curiosity: 0.5 });
    expect(studyProfile({ ft1: 5, ft2: 1 }).followThrough).toBe(1);
    expect(studyProfile({ nv1: 5, nv2: 1 }).nerves).toBe(1);
    expect(studyProfile({ cf1: 1, cf2: 5 }).confidence).toBe(0);
    expect(studyProfile({})).toEqual({});
    expect(studyProfile({ ft1: 9, cu1: Number.NaN })).toEqual({}); // out-of-range answers are ignored
  });

  it("reads follow-through from behaviour: sittings kept against the pace, abandoned ones counting against", () => {
    const days = (n: number, from = 1) => Array.from({ length: n }, (_, i) => `2026-10-${String(from + i).padStart(2, "0")}`);
    expect(followThroughFromBehaviour(days(2, 13), [], "2026-10-14", "steady")).toBeNull(); // too early to judge
    expect(followThroughFromBehaviour(days(14), [], "2026-10-14", "steady")).toEqual({ value: 1, days: 14 });
    expect(followThroughFromBehaviour(days(7, 8).filter((_, i) => i % 2 === 0), [], "2026-10-14", "steady")!.value).toBeCloseTo(4 / 7);
    expect(followThroughFromBehaviour(["2026-10-08", "2026-10-10", "2026-10-12"], [], "2026-10-14", "deep")!.value).toBe(1); // three a week is the deep pace
    expect(followThroughFromBehaviour(days(14), days(4), "2026-10-14", "steady")!.value).toBeCloseTo(12 / 14);
  });

  it("lets a week of behaviour equal the questionnaire and two weeks outweigh it", () => {
    expect(blend(0.9, null)).toBe(0.9);
    expect(blend(undefined, { value: 0.2, days: 5 })).toBe(0.2);
    expect(blend(0.9, { value: 0.1, days: 7 })).toBeCloseTo(0.5);
    expect(blend(0.9, { value: 0.1, days: 14 })).toBeLessThan(0.4);
  });

  it("turns the profile into support, never into labels, and never from a child's answers", () => {
    const anxiousLowFollow = { followThrough: 0.2, nerves: 0.9, confidence: 0.2, curiosity: 0.9 };
    const t = tuningFor(anxiousLowFollow, { isKid: false, behaviour: null, daysSinceLast: 3 });
    expect(t).toEqual({ planFirst: true, startSmall: true, steadyNerves: true, buildConfidence: true, goDeeper: true });
    expect(tuningLines(t).map((l) => l.key)).toEqual(["planFirst", "steadyNerves", "buildConfidence", "goDeeper"]);
    for (const l of tuningLines(t)) expect(l.text).not.toMatch(/\byou are (anxious|lazy|neurotic|introvert)/i);
    // a child's answers are ignored; only what they do counts
    expect(tuningFor(anxiousLowFollow, { isKid: true, behaviour: null, daysSinceLast: 3 })).toEqual({ planFirst: false, startSmall: false, steadyNerves: false, buildConfidence: false, goDeeper: false });
    expect(tuningFor({}, { isKid: true, behaviour: { value: 0.1, days: 10 }, daysSinceLast: 4 }).planFirst).toBe(true);
    // good behaviour overrides a pessimistic self-report
    expect(tuningFor({ followThrough: 0.1 }, { isKid: false, behaviour: { value: 1, days: 14 }, daysSinceLast: 0 }).planFirst).toBe(false);
  });

  it("maps a percentage to the board's letter grade", () => {
    expect([95, 80, 79.9, 70, 65, 55, 45, 35, 20].map(gradeFor)).toEqual(["A+", "A+", "A", "A", "A-", "B", "C", "D", "F"]);
    expect(meetsGrade(72, "A")).toBe(true);
    expect(meetsGrade(72, "A+")).toBe(false);
  });
});

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner, name: "Rafi", age: 15, subjects: ["math"], goal: "school", pace: "steady",
  answers: { "new-gadget": "reader", remember: "visual", "free-hour": "reader", stuck: "visual", motivation: "reader" }, ...over,
});

describe("the engine uses the tuning", () => {
  it("starts a low-confidence learner on the most supported rung until there is accuracy to go on", () => {
    const empty = deriveSignals([]);
    expect(baseRung(empty)).toBe(1);
    expect(baseRung(empty, true)).toBe(0);
    const steady = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "m", correct: true, ms: 1, source: "check" as const, delayed: false })));
    expect(baseRung(steady, true)).toBe(2); // evidence wins
  });

  it("tries a new format every third session for the curious, every fourth otherwise", () => {
    const l = learner();
    const p = buildProfile(l);
    const s = deriveSignals([]);
    expect(rankFormats(p, l, s, { sessionIndex: 2, curious: true }).exploring).toBe(true);
    expect(rankFormats(p, l, s, { sessionIndex: 2 }).exploring).toBe(false);
    expect(rankFormats(p, l, s, { sessionIndex: 3 }).exploring).toBe(true);
  });

  it("derives tuning from the saved profile and the session log", () => {
    const l = learner({ study: { ft1: 1, ft2: 5, cf1: 2, cf2: 4 } });
    const state: StudyState = { ...emptyStudy, sessions: [{ subject: "math", day: 1, date: "2026-10-05", minutes: 10, correct: 3, asked: 4 }] };
    const t = tuningOf(l, state, "2026-10-14");
    expect(t.planFirst).toBe(true);
    expect(t.startSmall).toBe(true); // nine days since the last sitting
    expect(t.buildConfidence).toBe(true);
    expect(tuningOf(learner({ age: 9, study: { ft1: 1, ft2: 5 } }), emptyStudy, "2026-10-14").planFirst).toBe(false);
  });

  it("keeps an if-then plan, trimmed, through storage", () => {
    const s = setPlan(emptyStudy, "  dinner  ", Date.UTC(2026, 9, 14, 9));
    expect(s).toMatchObject({ cue: "dinner", planOn: "2026-10-14" });
    expect(migrateStudy(JSON.parse(JSON.stringify(s)))).toMatchObject({ cue: "dinner", planOn: "2026-10-14" });
    expect(setPlan(s, "", 0).cue).toBeUndefined();
  });
});
