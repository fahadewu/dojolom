import { describe, expect, it } from "vitest";
import { contentIndex } from "@/content/index";
import { validateUnit } from "@/content/validate";
import { subjects } from "@/lib/learning";
import { UNITS_PER_SUBJECT } from "@/lib/study";

const keys = Object.keys(contentIndex);

describe("authored content", () => {
  it("has at least one unit", () => {
    expect(keys.length).toBeGreaterThan(0);
  });

  it.each(keys)("%s is structurally valid", async (key) => {
    const unit = (await contentIndex[key]()).default;
    const errors = validateUnit(unit);
    expect(errors, errors.join("\n")).toEqual([]);
    const [subject, n] = [key.slice(0, key.lastIndexOf("-")), Number(key.slice(key.lastIndexOf("-") + 1))];
    expect(unit.subject).toBe(subject);
    expect(unit.unit).toBe(n);
  });

  it("uses globally unique concept ids and titles within a subject", async () => {
    const ids = new Set<string>();
    const titlesBySubject = new Map<string, Set<string>>();
    for (const key of keys) {
      const unit = (await contentIndex[key]()).default;
      for (const c of unit.concepts) {
        expect(ids.has(c.id), `duplicate id ${c.id}`).toBe(false);
        ids.add(c.id);
        const titles = titlesBySubject.get(unit.subject) ?? new Set<string>();
        expect(titles.has(c.title.toLowerCase()), `duplicate title "${c.title}" in ${unit.subject}`).toBe(false);
        titles.add(c.title.toLowerCase());
        titlesBySubject.set(unit.subject, titles);
      }
    }
  });

  it("authors each subject's units in order, with no gaps", () => {
    for (const s of subjects) {
      const units = keys.filter((k) => k.startsWith(`${s.id}-`)).map((k) => Number(k.slice(k.lastIndexOf("-") + 1))).sort((a, b) => a - b);
      units.forEach((u, i) => expect(u, `${s.id} has a gap before unit ${u}`).toBe(i + 1));
    }
  });
});

describe("coverage", () => {
  it("every subject has all six units", () => {
    const missing = subjects.flatMap((s) => Array.from({ length: UNITS_PER_SUBJECT }, (_, i) => `${s.id}-${i + 1}`)).filter((k) => !keys.includes(k));
    expect(missing, `missing units: ${missing.join(", ")}`).toEqual([]);
  });
});
