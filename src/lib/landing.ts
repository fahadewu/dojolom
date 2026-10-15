// ─── The landing page's memory demo ──────────────────────────────────────────
// One idea, learned on day 0 and answered "good" at every rewind, run through
// the same FSRS-6 model the study engine uses (src/lib/memory.ts). The first
// rewind is always the next day; after that each comes when recall is expected
// to dip to 90%. Pure, so the curve the page draws is the curve the app runs.

import { initialState, intervalFor, retrievability, review, type DSR } from "@/lib/memory";

export interface Journey {
  rewinds: number[];                         // days a rewind happens, ascending
  recallAt: (day: number) => number;         // 0..1, chance of recall on that day with the rewinds
  unrewoundAt: (day: number) => number;      // 0..1, the same idea never rewound
  rewindsBy: (day: number) => number;        // rewinds done by that day
  nextRewindAfter: (day: number) => number | null;
}

export function memoryJourney(horizon = 60): Journey {
  const first = initialState(3);
  const states: { day: number; m: DSR }[] = [{ day: 0, m: first }];
  let m = first;
  let day = 0;
  let gap = 1; // the first rewind is always the next day, after sleep
  while (day + gap <= horizon) {
    m = review(m, gap, 3);
    day += gap;
    states.push({ day, m });
    gap = intervalFor(m.stability);
  }
  const rewinds = states.slice(1).map((s) => s.day);
  const before = (d: number) => [...states].reverse().find((s) => s.day <= d) ?? states[0];
  return {
    rewinds,
    recallAt: (d) => { const s = before(d); return retrievability(d - s.day, s.m.stability); },
    unrewoundAt: (d) => retrievability(d, first.stability),
    rewindsBy: (d) => rewinds.filter((r) => r <= d).length,
    nextRewindAfter: (d) => rewinds.find((r) => r > d) ?? null,
  };
}

/** An SVG path through `f` over 0..horizon days, `w` by `h`, recall 0..1 on the y axis (1 at the top). */
export function curvePath(f: (day: number) => number, horizon: number, w: number, h: number, steps = 240): string {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const d = (horizon * i) / steps;
    const x = (w * i) / steps;
    const y = h * (1 - f(d));
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
