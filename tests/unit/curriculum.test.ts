process.env.TZ = "Europe/London";

import { describe, expect, it } from "vitest";
import { bdGroups, bdStages, bdSubjectId, bdSubjects, bdSubjectsFor } from "@/lib/curriculum-bd";
import { buildProfile, emptyLearner, everydaySubjects, subjects, type LearnerInput } from "@/lib/learning";
import { answeredCq, buildPlan, buildSession, emptyStudy, migrateStudy, unitsIn, type StudyState } from "@/lib/study";
import { validateUnit } from "@/content/validate";
import type { UnitContent } from "@/content/types";

const BANGLA = /[ঀ-৿]/;

describe("the NCTB catalogue", () => {
  it("names every book and chapter in English and Bangla, with ids that cannot collide with concept ids", () => {
    expect(bdSubjects.length).toBeGreaterThan(0);
    for (const s of bdSubjects) {
      expect(s.id).toMatch(/^bd-(c[1-8]|ssc|hsc)-[a-z0-9]+$/);
      expect(s.id).not.toMatch(/-\d+$/); // a trailing number would be read as a unit by parseConceptId
      expect(s.nameBn && BANGLA.test(s.nameBn), `${s.id} Bangla name`).toBe(true);
      expect(s.units.length, `${s.id} chapters`).toBeGreaterThan(0);
      expect(s.unitsBn).toHaveLength(s.units.length);
      s.unitsBn!.forEach((t, i) => expect(BANGLA.test(t), `${s.id} chapter ${i + 1} Bangla title`).toBe(true));
      expect(new Set(s.units).size, `${s.id} duplicate chapter titles`).toBe(s.units.length);
      expect(bdStages.some((st) => st.id === s.stage)).toBe(true);
      for (const g of s.groups ?? []) expect(bdGroups.some((x) => x.id === g)).toBe(true);
    }
    expect(new Set(subjects.map((s) => s.id)).size).toBe(subjects.length);
    expect(subjects.slice(0, everydaySubjects.length)).toEqual(everydaySubjects);
  });

  it("gives each SSC group the compulsory books plus its own, compulsory first", () => {
    const sci = bdSubjectsFor("ssc", "science").map((s) => s.id);
    const hum = bdSubjectsFor("ssc", "humanities").map((s) => s.id);
    const bus = bdSubjectsFor("ssc", "business").map((s) => s.id);
    for (const id of ["math", "ict", "english2", "bangla2"].map((k) => bdSubjectId("ssc", k))) {
      expect(sci).toContain(id); expect(hum).toContain(id); expect(bus).toContain(id);
    }
    expect(sci).toContain("bd-ssc-physics");
    expect(hum).not.toContain("bd-ssc-physics");
    expect(hum).toContain("bd-ssc-science");
    expect(bus).toContain("bd-ssc-accounting");
    expect(sci.indexOf("bd-ssc-math")).toBeLessThan(sci.indexOf("bd-ssc-physics"));
    // before a group is chosen, only the compulsory books show
    expect(bdSubjectsFor("ssc").every((s) => !s.groups)).toBe(true);
    expect(bdSubjectsFor("")).toEqual([]);
  });

  it("follows the 2026 textbooks' chapter counts", () => {
    expect(unitsIn("bd-ssc-math")).toBe(17);
    expect(unitsIn("bd-ssc-physics")).toBe(13);
    expect(unitsIn("bd-ssc-chemistry")).toBe(12);
    expect(unitsIn("bd-c8-math")).toBe(11);
    expect(unitsIn("math")).toBe(6);
  });
});

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner, name: "Nusrat", age: 15, track: "nctb", bdStage: "ssc", bdGroup: "science",
  subjects: ["bd-ssc-physics"], goal: "school", pace: "steady",
  answers: { "new-gadget": "reader", remember: "visual", "free-hour": "reader", stuck: "visual", motivation: "reader" }, ...over,
});

describe("a curriculum path", () => {
  it("runs chapter by chapter across all of a book's chapters", () => {
    const plan = buildPlan("bd-ssc-physics", "steady");
    expect(plan.totalUnits).toBe(13);
    expect(plan.days).toHaveLength(39);
    expect(plan.days.at(-1)).toMatchObject({ unit: 13, isUnitEnd: true });
    // only chapters with lessons are scheduled, contiguously from the first
    expect(buildPlan("bd-ssc-physics", "steady", [1, 2, 4]).days.map((d) => d.unit)).toEqual([1, 1, 1, 2, 2, 2]);
  });

  it("ends each chapter with the board's creative question, except at the five-minute pace", () => {
    const l = learner();
    const profile = buildProfile(l);
    const plan = buildPlan("bd-ssc-physics", "steady");
    const state: StudyState = { ...emptyStudy, subjects: { "bd-ssc-physics": { startedOn: "2026-10-10", completedDays: [1, 2], sessionsToday: 0, checkpoints: {} } } };
    const end = buildSession(plan, 3, l, profile, state, "2026-10-15");
    expect(end.segments.map((s) => s.kind)).toEqual(["rewind", "learn", "checkpoint", "cq", "done"]);
    expect(end.segments[3]).toEqual({ kind: "cq", unit: 1 });
    expect(buildSession(plan, 2, l, profile, state, "2026-10-15").segments.some((s) => s.kind === "cq")).toBe(false);
    const sprint = buildPlan("bd-ssc-physics", "sprint");
    expect(buildSession(sprint, 3, learner({ pace: "sprint" }), profile, state, "2026-10-15").segments.some((s) => s.kind === "cq")).toBe(false);
    // everyday subjects never get one
    expect(buildSession(buildPlan("math", "steady"), 3, l, profile, { ...emptyStudy, subjects: { math: state.subjects["bd-ssc-physics"] } }, "2026-10-15").segments.some((s) => s.kind === "cq")).toBe(false);
  });

  it("logs self-marked creative questions as signals, and they survive storage", () => {
    const s = answeredCq(emptyStudy, "bd-ssc-physics", 1, [1, 2, 1, 3], 1);
    expect(s.events.at(-1)).toEqual({ t: 1, type: "cq", subject: "bd-ssc-physics", unit: 1, marks: [1, 2, 1, 3] });
    expect(s.memory).toEqual({});
    const back = migrateStudy(JSON.parse(JSON.stringify({ ...s, events: [...s.events, { t: 2, type: "cq", subject: "x", unit: 1, marks: [9, -1, "a"] }] })));
    expect(back.events[0]).toEqual(s.events[0]);
    expect(back.events[1]).toMatchObject({ marks: [4, 0, 0] });
  });
});

describe("curriculum content rules", () => {
  const concept = (n: number) => ({
    id: `bd-ssc-physics-1-${n}`, title: `Idea ${n}`, hook: "A hook.", steps: [], analogy: "", story: [], deepRead: [],
    example: { question: "Q", options: ["a", "b", "c"], answer: 0, why: "w" }, keyPoints: [], misconception: { belief: "", correction: "" },
    quiz: [], pairs: [], order: { prompt: "", items: [] }, blitz: [], blanks: [],
  });
  const unit = (over: Partial<UnitContent> = {}): UnitContent => ({
    subject: "bd-ssc-physics", unit: 1, title: "Physical Quantities and Their Measurements", summary: "S.",
    concepts: [concept(1), concept(2), concept(3)] as unknown as UnitContent["concepts"], ...over,
  });

  it("asks for the Bangla chapter title, a glossary on every concept, and a creative question", () => {
    const errors = validateUnit(unit()).join("\n");
    expect(errors).toMatch(/titleBn needs the chapter title in Bangla/);
    expect(errors).toMatch(/needs a creative question/);
    expect(errors).toMatch(/bd-ssc-physics-1-1: needs a glossary of Bangla terms/);
  });

  it("checks the glossary is in Bangla script and the creative question has all four parts", () => {
    const withBad = unit({
      titleBn: "ভৌত রাশি ও পরিমাপ",
      cq: { stem: "Only one sentence.", knowledge: { q: "q", a: "a" }, comprehension: { q: "q", a: "a" }, application: { q: "", a: "a" }, higherOrder: { q: "q", a: "a" } },
      concepts: [{ ...concept(1), glossary: [{ term: "Mass", bn: "mass" }, { term: "Length", bn: "দৈর্ঘ্য" }] }, concept(2), concept(3)] as unknown as UnitContent["concepts"],
    });
    const errors = validateUnit(withBad).join("\n");
    expect(errors).not.toMatch(/titleBn/);
    expect(errors).toMatch(/glossary 1 needs the Bangla term in Bangla script/);
    expect(errors).not.toMatch(/glossary 2 /);
    expect(errors).toMatch(/cq: stem needs 2 to 6 sentences/);
    expect(errors).toMatch(/cq: application question empty/);
  });

  it("everyday subjects need none of it", () => {
    const errors = validateUnit({ ...unit(), subject: "science", title: "How we know things", concepts: unit().concepts.map((c, i) => ({ ...c, id: `science-1-${i + 1}` })) }).join("\n");
    expect(errors).not.toMatch(/titleBn|creative question|glossary/);
  });
});
