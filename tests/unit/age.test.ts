import { describe, expect, it } from "vitest";
import {
  ageDefaults,
  ageFromLegacyBand,
  ageLines,
  ageView,
  allowedPace,
  FLUENT_WPM,
  parseAge,
  protectionAge,
  readAloudOn,
  readingPace,
  SLOW_WPM,
  stageOf,
  supportAge,
} from "@/lib/age";
import { emptyLearner, migrateLearner, type LearnerInput } from "@/lib/learning";
import { answered, emptyStudy, migrateStudy, setGuardianHabits, setReadAloud, tuningOf, type StudyEvent, type StudyState } from "@/lib/study";

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner, name: "Mitu", age: 30, subjects: ["math"], goal: "curious", pace: "steady",
  answers: { "new-gadget": "reader", remember: "visual", "free-hour": "reader", stuck: "visual", motivation: "reader" }, ...over,
});

/** A right answer the learner read for themselves: `words` in `seconds`. */
const read = (words: number, seconds: number, correct = true, t = 0): Extract<StudyEvent, { type: "answer" }> =>
  ({ t, type: "answer", subject: "math", concept: "math-1-1", correct, ms: 0, source: "check", delayed: false, words, readMs: seconds * 1000 });

describe("identifying age", () => {
  it("takes a typed whole number from 4 to 110 and nothing else", () => {
    expect(["9", " 14 ", "4", "110"].map(parseAge)).toEqual([9, 14, 4, 110]);
    expect(["", "3", "111", "9.5", "nine", "-9", "1e2"].map(parseAge)).toEqual([null, null, null, null, null, null, null]);
  });

  it("maps ages to stages at the evidence lines: 8, 12, 15, 18 and 60 (not 40)", () => {
    expect([5, 7, 8, 11, 12, 14, 15, 17, 18, 45, 59, 60, 80].map(stageOf)).toEqual([
      "early", "early", "primary", "primary", "youngTeen", "youngTeen", "teen", "teen", "adult", "adult", "adult", "older", "older",
    ]);
  });

  it("protects by the younger of age and class, but supports by the age given", () => {
    // A parent of 34 set up Class 3 for themselves: content is Class 3, protections are a child's, support is an adult's.
    const parent = learner({ age: 34, track: "nctb", bdStage: "c3" });
    expect(protectionAge(parent)).toBe(8);
    expect(supportAge(parent)).toBe(34);
    expect(ageDefaults(parent)).toMatchObject({ stage: "adult", child: true, minor: true, tryFirst: true, timers: "hidden", studyQuestions: false });
    // An over-age SSC student of 17: class says 14, the age given is older, so 14 sets the protections.
    expect(protectionAge(learner({ age: 17, track: "nctb", bdStage: "ssc" }))).toBe(14);
    // Everyday subjects have no class to compare.
    expect(protectionAge(learner({ age: 30, track: "everyday", bdStage: "c3" }))).toBe(30);
  });

  it("migrates the old bands to a representative age, using the class when it fits", () => {
    expect(ageFromLegacyBand("kid")).toBe(9);
    expect(ageFromLegacyBand("kid", "c1")).toBe(6);
    expect(ageFromLegacyBand("kid", "ssc")).toBe(9); // a class that does not fit the band is ignored
    expect(ageFromLegacyBand("teen", "hsc")).toBe(16);
    expect(ageFromLegacyBand("adult")).toBe(30);
    expect(ageFromLegacyBand("senior")).toBe(60);
    expect(ageFromLegacyBand("wizard")).toBeNull();
    const saved = { ...learner(), age: "kid", bdStage: "c1", track: "nctb", pace: "deep" };
    expect(migrateLearner(saved)).toMatchObject({ age: 6, pace: "sprint" }); // a six-year-old's sittings are short
    expect(migrateLearner({ ...learner(), age: "teen", pace: "deep" })).toMatchObject({ age: 15, pace: "deep" });
    expect(migrateLearner({ ...learner(), age: 3 })?.age).toBeNull(); // out of range: asked again
    expect(migrateLearner(null)).toBeNull();
  });
});

describe("what age changes", () => {
  it("gives pre-readers narration, chips, short sittings, no guess and no timers", () => {
    expect(ageDefaults(learner({ age: 6 }))).toMatchObject({
      stage: "early", readAloud: true, autoReadQuestions: true, sayBack: "build", guessFirst: false, tryFirst: false, confidence: false,
      largeText: true, largeTargets: true, tapHold: true, paces: ["sprint"], noFormats: ["reading", "challenge"], noGames: ["blitz"],
      timers: "hidden", streakCount: false, studyQuestions: false, habitsByDefault: false, motion: "balanced",
    });
  });

  it("gives 8 to 11 the guess, confidence ratings and reading, explained first, chips until 10", () => {
    expect(ageDefaults(learner({ age: 8 }))).toMatchObject({ stage: "primary", guessFirst: true, confidence: true, tryFirst: false, sayBack: "build", noFormats: ["challenge"], noGames: [], paces: ["sprint", "steady"], streakCount: true, timers: "hidden" });
    expect(ageDefaults(learner({ age: 10 })).sayBack).toBe("type");
  });

  it("treats 12 to 17 as minors for privacy but not as children for teaching", () => {
    expect(ageDefaults(learner({ age: 15 }))).toMatchObject({ stage: "teen", minor: true, child: false, tryFirst: true, timers: "offered", studyQuestions: true, habitsByDefault: false, motion: null });
  });

  it("starts older-adult support at 60: larger text and calm, clocks available but never suggested", () => {
    expect(ageDefaults(learner({ age: 45 }))).toMatchObject({ stage: "adult", largeText: false, timers: "offered", motion: null });
    expect(ageDefaults(learner({ age: 72 }))).toMatchObject({ stage: "older", largeText: true, largeTargets: true, timers: "quiet", motion: "calm", tryFirst: true, guessFirst: true });
  });

  it("keeps a pace the age allows and otherwise falls back to the longest on offer", () => {
    expect(allowedPace(ageDefaults(learner({ age: 9 })), "deep")).toBe("steady");
    expect(allowedPace(ageDefaults(learner({ age: 9 })), "sprint")).toBe("sprint");
    expect(allowedPace(ageDefaults(learner({ age: 6 })), "steady")).toBe("sprint");
    expect(allowedPace(ageDefaults(learner()), "")).toBe("");
  });

  it("says what it set up in plain words, never a label", () => {
    const lines = ageLines(ageDefaults(learner({ age: 6 })), true).map((l) => `${l.title} ${l.text}`).join(" ");
    expect(lines).toMatch(/Read aloud/);
    expect(lines).toMatch(/explain/);
    expect(lines).not.toMatch(/senior|kid|child|your age|at your age/i);
    const older = ageLines(ageDefaults(learner({ age: 70 })), false).map((l) => `${l.title} ${l.text}`).join(" ");
    expect(older).not.toMatch(/senior|elderly|old/i);
  });
});

describe("behaviour sets the level", () => {
  it("measures reading pace as the median of recent right answers the learner read for themselves", () => {
    expect(readingPace([])).toBeNull();
    const fast = Array.from({ length: 6 }, (_, i) => read(40, 15, true, i)); // 160 words a minute
    expect(readingPace(fast)).toEqual({ wpm: 160, n: 6 });
    // Wrong answers, short items and items read aloud (no words logged) do not count.
    const noisy: StudyEvent[] = [...fast.slice(0, 5), read(40, 600, false), read(4, 30), { ...read(40, 15), words: undefined, readMs: undefined }];
    expect(readingPace(noisy)).toBeNull();
    // One long think does not make a reader slow.
    expect(readingPace([...fast.slice(0, 5), read(40, 300)])?.wpm).toBe(160);
  });

  it("lets measured reading override age, and the learner's choice override both", () => {
    const kid = ageDefaults(learner({ age: 9 }));
    const adult = ageDefaults(learner());
    const fluent = { wpm: FLUENT_WPM + 20, n: 8 };
    const slow = { wpm: SLOW_WPM - 10, n: 8 };
    expect(readAloudOn(kid, "auto", null)).toBe(true);
    expect(readAloudOn(kid, "auto", fluent)).toBe(false); // a fluent 9-year-old reads for themselves
    expect(readAloudOn(adult, "auto", null)).toBe(false);
    expect(readAloudOn(adult, "auto", slow)).toBe(true);  // and a 14- or 40-year-old who reads slowly is read to
    expect(readAloudOn(adult, "auto", { wpm: 60, n: 8 })).toBe(false); // in between: age decides
    expect(readAloudOn(kid, "off", slow)).toBe(false);
    expect(readAloudOn(adult, "on", fluent)).toBe(true);
  });

  it("resolves a screen's view from age, settings and the event log", () => {
    const state: StudyState = { ...emptyStudy, events: Array.from({ length: 6 }, (_, i) => read(40, 10, true, i)) };
    expect(ageView(learner({ age: 9 }), state)).toMatchObject({ readAloud: false, largeText: false, largeTargets: true });
    expect(ageView(learner({ age: 9 }), setReadAloud(state, "on")).readAloud).toBe(true);
    expect(ageView(learner(), { ...emptyStudy, largeText: "on" })).toMatchObject({ largeText: true, largeTargets: true });
  });

  it("logs a reading sample with an answer and keeps it, and the new settings, through storage", () => {
    const s = answered(emptyStudy, "math", "math-1-1", true, Date.UTC(2026, 9, 15, 9), { source: "check", confidence: "sure", read: { words: 30.4, ms: 9000.6 } });
    const e = s.events.at(-1);
    expect(e).toMatchObject({ type: "answer", words: 30, readMs: 9001 });
    const back = migrateStudy(JSON.parse(JSON.stringify(setGuardianHabits(setReadAloud(s, "off"), true))));
    expect(back.events.at(-1)).toMatchObject({ words: 30, readMs: 9001 });
    expect(back).toMatchObject({ readAloud: "off", largeText: "auto", guardianHabits: true });
    expect(migrateStudy({ ...JSON.parse(JSON.stringify(emptyStudy)), readAloud: "loud" }).readAloud).toBe("auto");
    // A bad sample is dropped rather than stored.
    expect(answered(emptyStudy, "math", "math-1-1", true, 0, { source: "check", read: { words: 0, ms: 100 } }).events.at(-1)).not.toHaveProperty("words");
  });

  it("tunes an under-18's plans from behaviour only once a parent or guardian turns it on", () => {
    // One sitting nine days ago: follow-through from behaviour is low.
    const lapsed: StudyState = { ...emptyStudy, sessions: [{ subject: "math", day: 1, date: "2026-10-05", minutes: 10, correct: 3, asked: 4 }] };
    expect(tuningOf(learner(), lapsed, "2026-10-14").planFirst).toBe(true);
    expect(tuningOf(learner({ age: 15 }), lapsed, "2026-10-14").planFirst).toBe(false);
    expect(tuningOf(learner({ age: 15 }), setGuardianHabits(lapsed, true), "2026-10-14").planFirst).toBe(true);
    // An adult who chose a Class 5 book is protected like a child, so the same applies.
    expect(tuningOf(learner({ age: 40, track: "nctb", bdStage: "c5" }), lapsed, "2026-10-14").planFirst).toBe(false);
  });
});
