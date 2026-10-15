// Round builder for Spot it, kept pure so it can be tested without the DOM.
import { mulberry32, shuffle } from "@/lib/study";
import { pairVisuals, type Visual } from "@/lib/visuals";
import type { Concept } from "@/content/types";

export interface SpotItem {
  conceptId: string;
  term: string;
  meaning: string;
  visual: Visual;
  options: string[]; // shuffled, includes term
}

export const SPOT_OPTIONS = 4;

/** Three pictured terms from today's idea and one from each earlier idea; distractors are other real terms from the round. */
export function buildSpotRound(concepts: Concept[], seed: number): SpotItem[] {
  const rng = mulberry32(seed);
  const pool: { conceptId: string; term: string; meaning: string; visual: Visual | null }[] = [];
  concepts.forEach((c) => {
    const vis = pairVisuals(c);
    c.pairs.forEach((p, i) => pool.push({ conceptId: c.id, term: p.term, meaning: p.match, visual: vis[i] }));
  });
  const pictured = pool.filter((p): p is typeof p & { visual: Visual } => p.visual !== null);
  const items: SpotItem[] = [];
  concepts.forEach((c, ci) => {
    const mine = shuffle(pictured.filter((p) => p.conceptId === c.id), rng).slice(0, ci === 0 ? 3 : 1);
    for (const p of mine) {
      const others = [...new Set(shuffle(pool.filter((o) => o.term !== p.term).map((o) => o.term), rng))];
      const distractors = others.slice(0, SPOT_OPTIONS - 1);
      items.push({ conceptId: p.conceptId, term: p.term, meaning: p.meaning, visual: p.visual, options: shuffle([p.term, ...distractors], rng) });
    }
  });
  return shuffle(items, rng);
}
