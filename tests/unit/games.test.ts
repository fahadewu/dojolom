import { afterEach, describe, expect, it } from "vitest";
import mathUnit1 from "@/content/math/unit-1";
import mathUnit2 from "@/content/math/unit-2";
import { buildProfile, emptyLearner, type LearnerInput } from "@/lib/learning";
import {
  buildPlan,
  buildSession,
  chooseGame,
  chooseGames,
  deriveSignals,
  emptyStudy,
  gameChoiceCount,
  gameIds,
  gameOfferReason,
  games,
  matchesTyped,
  migrateStudy,
  normalizeTyped,
  pickedGame,
  playedGame,
  setNudge,
  setPictures,
  startDay,
  supportFor,
  type GameId,
  type Segment,
  type StudyEvent,
  type StudyState,
} from "@/lib/study";
import { conceptsHaveVisuals, hasPairVisuals, pairVisuals, setVisualManifest, stepVisuals, visualFor, visualUrl, type VisualManifest } from "@/lib/visuals";
import { buildSpotRound } from "@/lib/spot";
import { pickPairs } from "@/components/study/games/pairs";

const styleAnswers = (style: string) => Object.fromEntries(["new-gadget", "remember", "free-hour", "stuck", "motivation"].map((k) => [k, style])) as LearnerInput["answers"];
const learnerOf = (style: string, extra: Partial<LearnerInput> = {}): LearnerInput => ({ ...emptyLearner, name: "A", age: 30, subjects: ["math"], goal: "curious", pace: "steady", answers: styleAnswers(style), ...extra });
const NOW = Date.UTC(2026, 8, 23, 9, 0);
const TODAY = "2026-09-23";
const concepts = [...mathUnit1.concepts, ...mathUnit2.concepts];

/** A manifest that pictures every pair and step of the given concepts. */
function manifestFor(ids: string[]): VisualManifest {
  const m: VisualManifest = {};
  for (const id of ids) {
    const c = concepts.find((x) => x.id === id)!;
    m[id] = { scene: { src: `visuals/${id}/scene.webp`, alt: c.hook, w: 512, h: 256 } };
    c.pairs.forEach((p, i) => { m[id][`pair-${i}`] = { src: `visuals/${id}/pair-${i}.webp`, alt: p.match, w: 512, h: 512 }; });
    c.order.items.forEach((s, i) => { m[id][`step-${i}`] = { src: `visuals/${id}/step-${i}.webp`, alt: s, w: 512, h: 512 }; });
  }
  return m;
}

afterEach(() => setVisualManifest(null));

describe("games: choice", () => {
  const none = deriveSignals([]);

  it("offers the games ranked from the style prior, and Spot it only when the pictures exist", () => {
    const visual = buildProfile(learnerOf("visual"));
    expect(chooseGames(visual, learnerOf("visual"), none, { n: 2 })).toEqual(["pairs", "order"]);
    expect(chooseGames(visual, learnerOf("visual"), none, { n: 2, hasVisuals: true }).sort()).toEqual(["pairs", "spot"]);
    expect(chooseGames(visual, learnerOf("visual"), none, { n: 9 })).not.toContain("spot");
    expect(chooseGame(visual, learnerOf("visual"), none)).toBe("pairs");
    for (const g of gameIds) expect(games[g].needsVisuals).toBe(g === "spot");
  });

  it("offers none to choose under sprint, two under steady, three under deep", () => {
    expect(gameChoiceCount("sprint")).toBe(1);
    expect(gameChoiceCount("steady")).toBe(2);
    expect(gameChoiceCount("deep")).toBe(3);
    for (const pace of ["sprint", "steady", "deep"] as const) {
      const learner = learnerOf("player", { pace });
      const plan = buildPlan("math", pace, [1, 2]);
      const session = buildSession(plan, pace === "sprint" ? 1 : 1, learner, buildProfile(learner), emptyStudy, TODAY);
      const play = session.segments.find((s): s is Extract<Segment, { kind: "play" }> => s.kind === "play");
      if (pace === "steady") { expect(play).toBeDefined(); expect(play!.options).toHaveLength(2); expect(play!.game).toBe(play!.options![0]); }
      if (pace === "deep") expect(play!.options).toHaveLength(3);
      if (pace === "sprint") expect(play?.options).toBeUndefined();
    }
  });

  it("what the learner picks moves up and what they pass over drifts down, within bounds", () => {
    const player = buildProfile(learnerOf("player"));
    const events: StudyEvent[] = Array.from({ length: 4 }, (_, i) => ({ t: i, type: "pick" as const, subject: "math", game: "blanks" as GameId, offered: ["blitz", "blanks"] as GameId[] }));
    const s = deriveSignals(events);
    expect(s.gamePicked.blanks).toBe(4);
    expect(s.gamePassed.blitz).toBe(4);
    expect(chooseGames(player, learnerOf("player"), none, { n: 1 })[0]).toBe("blitz");
    expect(chooseGames(player, learnerOf("player"), s, { n: 1 })[0]).toBe("blanks");
    // Bounded: a hundred picks cannot outweigh everything else forever.
    const many = deriveSignals(Array.from({ length: 100 }, (_, i) => ({ t: i, type: "pick" as const, subject: "math", game: "order" as GameId, offered: ["order", "blitz"] as GameId[] })));
    const ranked = chooseGames(player, learnerOf("player"), many, { n: 5 });
    expect(ranked[0]).toBe("order");
    expect(ranked.indexOf("blitz")).toBeLessThan(3);
  });

  it("explains an offer in one line", () => {
    const visual = buildProfile(learnerOf("visual"));
    expect(gameOfferReason("pairs", none, visual)).toBe("New to you");
    const won: StudyEvent[] = [1, 2].map((t) => ({ t, type: "game", subject: "math", game: "order", score: 100, accuracy: 1, ms: 1000, finished: true }));
    expect(gameOfferReason("order", deriveSignals(won), visual)).toBe("Your best game lately");
    const picks: StudyEvent[] = [1, 2].map((t) => ({ t, type: "pick", subject: "math", game: "blitz", offered: ["blitz", "pairs"] }));
    expect(gameOfferReason("blitz", deriveSignals(picks), visual)).toBe("You keep choosing this one");
    const seen = deriveSignals([{ t: 1, type: "game", subject: "math", game: "pairs", score: 50, accuracy: 0.5, ms: 1000, finished: true }]);
    expect(gameOfferReason("pairs", seen, visual)).toMatch(/Suits/);
  });

  it("the pick replaces the segment's game for the rest of the sitting and is logged once", () => {
    const learner = learnerOf("player");
    const plan = buildPlan("math", "steady", [1, 2]);
    const session = buildSession(plan, 1, learner, buildProfile(learner), emptyStudy, TODAY);
    let state: StudyState = startDay(emptyStudy, "math", 1, NOW, false, session.segments, "steady");
    const idx = session.segments.findIndex((s) => s.kind === "play");
    const seg = session.segments[idx] as Extract<Segment, { kind: "play" }>;
    const other = seg.options!.find((g) => g !== seg.game)!;
    state = pickedGame(state, "math", idx, other, NOW);
    const after = state.subjects.math.current!.segments![idx] as Extract<Segment, { kind: "play" }>;
    expect(after.game).toBe(other);
    expect(after.picked).toBe(true);
    expect(state.events.filter((e) => e.type === "pick")).toHaveLength(1);
    // A game that was not offered cannot be picked; a non-play index is ignored.
    expect(pickedGame(state, "math", idx, "spot", NOW)).toBe(state);
    expect(pickedGame(state, "math", 0, other, NOW)).toBe(state);
  });
});

describe("games: support and the nudge", () => {
  const steady = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "math-1-1", correct: true, ms: 1, source: "check" as const, delayed: false })));
  const shaky = deriveSignals(Array.from({ length: 10 }, (_, i) => ({ t: i, type: "answer" as const, subject: "math", concept: "math-1-1", correct: i % 2 === 0, ms: 1, source: "check" as const, delayed: false })));

  it("the nudge moves one rung either way and stays on the ladder", () => {
    const adult = learnerOf("reader");
    expect(supportFor(adult, deriveSignals([]), false).rung).toBe(1);
    expect(supportFor(adult, deriveSignals([]), false, 1).rung).toBe(2);
    expect(supportFor(adult, deriveSignals([]), false, -1).rung).toBe(0);
    expect(supportFor(adult, steady, false, 1).rung).toBe(2);
    expect(supportFor(adult, shaky, false, -1).rung).toBe(0);
    expect(supportFor(adult, shaky, false, 1).rung).toBe(1);
  });

  it("the gap is typed at the top rung or under push me, never for children", () => {
    const adult = learnerOf("reader");
    expect(supportFor(adult, deriveSignals([]), false).blanksTyped).toBe(false);
    expect(supportFor(adult, steady, false).blanksTyped).toBe(true);
    expect(supportFor(adult, deriveSignals([]), false, 1).blanksTyped).toBe(true);
    expect(supportFor(learnerOf("reader", { age: 9 }), steady, false, 1).blanksTyped).toBe(false);
  });

  it("typed answers ignore case, accents and punctuation, and forgive one typo in longer words", () => {
    expect(normalizeTyped("  Éxpanded-Form! ")).toBe("expanded form");
    expect(matchesTyped("Zero", "zero")).toBe(true);
    expect(matchesTyped("hundreds", "hundred")).toBe(true);   // one letter over, seven letters
    expect(matchesTyped("hundrd", "hundred")).toBe(true);     // one missing
    expect(matchesTyped("hunderd", "hundred")).toBe(false);   // a swap is two edits
    expect(matchesTyped("ten", "tens")).toBe(false);          // short words must be exact
    expect(matchesTyped("", "zero")).toBe(false);
    expect(matchesTyped("place", "place value")).toBe(false);
  });

  it("nudge and pictures persist, migrate with defaults, and reject garbage", () => {
    let s = setNudge(emptyStudy, 1);
    s = setPictures(s, false);
    const back = migrateStudy(JSON.parse(JSON.stringify(s)));
    expect(back.nudge).toBe(1);
    expect(back.pictures).toBe(false);
    const old = migrateStudy({ version: 2, subjects: {}, memory: {}, events: [{ t: 1, type: "pick", subject: "math", game: "blitz", offered: ["blitz", "nope"] }, { t: 2, type: "pick", subject: "math", game: "nope" }] });
    expect(old.nudge).toBe(0);
    expect(old.pictures).toBe(true);
    expect(old.events).toEqual([{ t: 1, type: "pick", subject: "math", game: "blitz", offered: ["blitz"] }]);
    expect(migrateStudy({ version: 2, nudge: 5 }).nudge).toBe(0);
  });

  it("a played spot round is scored like any other game", () => {
    const s = playedGame(emptyStudy, "math", "spot", { score: 75, accuracy: 0.75, ms: 3000, finished: true }, NOW);
    expect(deriveSignals(s.events).gameSeen.spot).toBe(1);
    expect(deriveSignals(s.events).gameRecentAccuracy.spot).toBe(0.75);
  });
});

describe("games: pictures", () => {
  it("the manifest answers per concept and kind, and honours the base path", () => {
    expect(visualFor("math-1-1", "scene")).toBeNull();
    expect(hasPairVisuals(mathUnit1.concepts[0])).toBe(false);
    expect(conceptsHaveVisuals(["math-1-1"])).toBe(false);
    setVisualManifest(manifestFor(["math-1-1"]));
    expect(visualFor("math-1-1", "scene")?.alt).toBe(mathUnit1.concepts[0].hook);
    expect(pairVisuals(mathUnit1.concepts[0]).every(Boolean)).toBe(true);
    expect(stepVisuals(mathUnit1.concepts[0])).toHaveLength(4);
    expect(hasPairVisuals(mathUnit1.concepts[0])).toBe(true);
    expect(hasPairVisuals(mathUnit1.concepts[1])).toBe(false);
    expect(conceptsHaveVisuals(["math-1-1"])).toBe(true);
    expect(conceptsHaveVisuals(["math-1-1", "math-1-2"])).toBe(false);
    expect(conceptsHaveVisuals([])).toBe(false);
    expect(visualUrl("visuals/x.webp")).toBe("/visuals/x.webp");
  });

  it("match pairs pictures a round only when every pair in it is pictured", () => {
    const [a, b] = mathUnit1.concepts;
    expect(pickPairs([a, b], 5, true).every((p) => p.visual === null)).toBe(true);
    setVisualManifest(manifestFor([a.id]));
    const five = pickPairs([a, b], 5, true);
    expect(five).toHaveLength(5);
    expect(five.every((p) => p.visual)).toBe(true);
    expect(pickPairs([a, b], 5, false).every((p) => p.visual === null)).toBe(true); // pictures off
    const six = pickPairs([a, b], 6, true); // the sixth pair borrows from an unpictured concept: the whole round goes to words
    expect(six).toHaveLength(6);
    expect(six.every((p) => p.visual === null)).toBe(true);
    setVisualManifest(manifestFor([a.id, b.id]));
    expect(pickPairs([a, b], 6, true).every((p) => p.visual)).toBe(true);
  });

  it("Spot it builds three pictures from today and one from each earlier idea, with real distractors, seeded", () => {
    const [a, b, c] = mathUnit1.concepts;
    expect(buildSpotRound([a, b], 7)).toEqual([]);
    setVisualManifest(manifestFor([a.id, b.id, c.id]));
    const round = buildSpotRound([a, b, c], 7);
    expect(round).toHaveLength(5);
    expect(round.filter((i) => i.conceptId === a.id)).toHaveLength(3);
    const terms = new Set([a, b, c].flatMap((x) => x.pairs.map((p) => p.term)));
    for (const item of round) {
      expect(item.options).toHaveLength(4);
      expect(item.options).toContain(item.term);
      expect(new Set(item.options).size).toBe(4);
      for (const o of item.options) expect(terms.has(o)).toBe(true);
      expect(item.visual.src).toContain(item.conceptId);
    }
    expect(buildSpotRound([a, b, c], 7)).toEqual(round);
    expect(buildSpotRound([a, b, c], 8)).not.toEqual(round);
  });

  it("the session builder only offers Spot it when the pictures exist and pictures are on", () => {
    const learner = learnerOf("visual");
    const profile = buildProfile(learner);
    const plan = buildPlan("math", "steady", [1, 2]);
    const yes = { hasVisuals: () => true };
    const play = (state: StudyState, caps?: { hasVisuals: (ids: string[]) => boolean }) =>
      buildSession(plan, 1, learner, profile, state, TODAY, [], caps).segments.find((s): s is Extract<Segment, { kind: "play" }> => s.kind === "play")!;
    expect(play(emptyStudy).options).not.toContain("spot");
    expect(play(emptyStudy, yes).options).toContain("spot");
    expect(play(setPictures(emptyStudy, false), yes).options).not.toContain("spot");
  });
});
