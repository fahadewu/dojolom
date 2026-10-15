import { describe, expect, it } from "vitest";
import { curvePath, memoryJourney } from "@/lib/landing";

describe("the landing page's memory demo", () => {
  const j = memoryJourney(60);

  it("rewinds the next day, then at widening gaps", () => {
    expect(j.rewinds[0]).toBe(1);
    const gaps = j.rewinds.slice(1).map((d, i) => d - j.rewinds[i]);
    expect(gaps.length).toBeGreaterThanOrEqual(2);
    gaps.forEach((g, i) => { if (i > 0) expect(g).toBeGreaterThanOrEqual(gaps[i - 1]); });
    expect(j.rewinds.at(-1)).toBeLessThanOrEqual(60);
  });

  it("keeps recall near 90% or better with rewinds, and lets it fade without them", () => {
    for (let d = 0; d <= 60; d += 0.5) expect(j.recallAt(d)).toBeGreaterThan(0.85);
    expect(j.recallAt(0)).toBe(1);
    expect(j.unrewoundAt(60)).toBeLessThan(j.recallAt(60));
    expect(j.unrewoundAt(30)).toBeLessThan(0.7);
    // Recall resets to full at a rewind.
    expect(j.recallAt(j.rewinds[1])).toBeCloseTo(1, 5);
  });

  it("counts rewinds and finds the next one", () => {
    expect(j.rewindsBy(0)).toBe(0);
    expect(j.rewindsBy(1)).toBe(1);
    expect(j.nextRewindAfter(0)).toBe(1);
    expect(j.nextRewindAfter(1)).toBe(j.rewinds[1]);
    expect(j.nextRewindAfter(1000)).toBeNull();
  });

  it("draws a path across the full width, top at full recall", () => {
    const p = curvePath(j.recallAt, 60, 600, 200, 60);
    expect(p.startsWith("M0.0 0.0")).toBe(true);
    expect(p).toContain("L600.0 ");
    expect(p.split("L")).toHaveLength(61);
  });
});
