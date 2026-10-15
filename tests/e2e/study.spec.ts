import { test, expect, type Page } from "@playwright/test";
import mathUnit1 from "../../src/content/math/unit-1";
import mathUnit2 from "../../src/content/math/unit-2";
import type { Concept } from "../../src/content/types";

/* End-to-end coverage of the study module against the static export.
   Time is pinned through localStorage["dojolom.clock"], which the app's clock
   seam reads, so "tomorrow" is one assignment away. */

const DAY1 = Date.UTC(2026, 8, 23, 8, 0); // 09:00 in London
const DAY = 24 * 3600_000;
const concepts: Concept[] = [...mathUnit1.concepts, ...mathUnit2.concepts];

const SAY = "It is what you actually see, not what you think it means.";

const answers: Record<string, string> = { "new-gadget": "player", remember: "player", "free-hour": "player", stuck: "player", motivation: "player" };
const base = { name: "Ada", age: 30, subjects: ["math"], goal: "curious", pace: "steady", answers };

async function seed(page: Page, learner: Record<string, unknown>, clock = DAY1) {
  await page.goto("/");
  await page.evaluate(([l, c]) => {
    localStorage.clear();
    localStorage.setItem("dojolom.learner", JSON.stringify(l));
    localStorage.setItem("dojolom.clock", String(c));
  }, [learner, clock] as const);
}

/* Under 12 the app drops a tap that follows another within 300 ms (a child's tap landing on the next screen),
   so tests driving a young learner pause between taps. Reset after every test. */
let tapGap = 0;
const pause = (page: Page) => (tapGap ? page.waitForTimeout(tapGap) : Promise.resolve());

async function setClock(page: Page, clock: number) {
  await page.evaluate((c) => localStorage.setItem("dojolom.clock", String(c)), clock);
}

const truthOf = (statement: string) => concepts.flatMap((c) => c.blitz).find((b) => b.statement === statement)?.truth;
const meaningOf = (term: string) => concepts.flatMap((c) => c.pairs).find((p) => p.term === term)?.match;
const blankAnswer = (sentence: string) => {
  const b = concepts.flatMap((c) => c.blanks).find((x) => x.sentence.replace("___", "").replace(/\s+/g, " ").trim() === sentence.replace(/\s+/g, " ").trim());
  return b ? b.options[b.answer] : undefined;
};

async function playBlitz(page: Page, viaKeyboardFirst = false) {
  const game = page.getByTestId("game-blitz");
  for (let i = 0; i < 12; i++) {
    if (await game.getByTestId("game-summary").isVisible()) return;
    const statement = (await game.getByTestId("statement").textContent()) ?? "";
    const truth = truthOf(statement.trim());
    expect(truth, `unknown statement: ${statement}`).not.toBeUndefined();
    if (viaKeyboardFirst && i === 0) await page.keyboard.press(truth ? "t" : "f");
    else await game.getByTestId(truth ? "answer-true" : "answer-false").click();
    await game.getByTestId("next").click();
  }
}

async function playPairs(page: Page) {
  const game = page.getByTestId("game-pairs");
  const tiles = game.getByTestId("tile");
  const labels = await tiles.evaluateAll((els) => els.map((e) => e.getAttribute("aria-label") ?? ""));
  for (const [i, label] of labels.entries()) {
    if (!label.startsWith("Term:")) continue;
    const term = label.replace("Term:", "").trim();
    const meaning = meaningOf(term);
    expect(meaning, `unknown term ${term}`).toBeTruthy();
    const j = labels.findIndex((l) => l.startsWith("Meaning:") && l.replace("Meaning:", "").trim() === meaning);
    expect(j, `no meaning tile for ${term}`).toBeGreaterThanOrEqual(0);
    await tiles.nth(i).click();
    await tiles.nth(j).click();
  }
  await expect(game.getByTestId("game-summary")).toBeVisible();
}

async function playBlanks(page: Page) {
  const game = page.getByTestId("game-blanks");
  for (let i = 0; i < 8; i++) {
    if (await game.getByTestId("game-summary").isVisible()) return;
    const sentence = (await game.locator("p.font-display").first().textContent()) ?? "";
    const want = blankAnswer(sentence.replace(/ /g, " "));
    const options = game.getByTestId("option");
    const texts = await options.allTextContents();
    const idx = want ? texts.findIndex((t) => t.trim() === want) : 0;
    await options.nth(Math.max(0, idx)).click();
    await game.getByTestId("next").click();
  }
}

async function playOrder(page: Page) {
  const game = page.getByTestId("game-order");
  for (let round = 0; round < 2; round++) {
    if (await game.getByTestId("game-summary").isVisible()) return;
    // Bubble the rows into the authored order using the keyboard-accessible move buttons.
    const clean = (t: string) => t.replace(/Position \d+:?/g, "").replace(/Move up|Move down|Locked/g, "").replace(/^\s*\d+\s*/, "").replace(/\s+/g, " ").trim();
    const current = async () => (await game.getByTestId("order-item").allTextContents()).map(clean);
    const correctFor = (items: string[]) => concepts.map((c) => c.order.items).find((o) => o.every((x) => items.some((y) => y.includes(x.slice(0, 20)))));
    const items = await current();
    const correct = correctFor(items);
    expect(correct, `unknown sequence: ${items.join(" | ")}`).toBeTruthy();
    for (let pass = 0; pass < 6; pass++) {
      const now = await current();
      let moved = false;
      for (let i = 0; i < now.length - 1; i++) {
        const rank = (s: string) => correct!.findIndex((x) => s.includes(x.slice(0, 20)));
        if (rank(now[i]) > rank(now[i + 1])) {
          const down = game.getByTestId("order-item").nth(i).getByRole("button", { name: "Move down" });
          if (await down.isEnabled()) { await down.click(); moved = true; break; }
        }
      }
      if (!moved) break;
    }
    await game.getByTestId("check-order").click();
    const nextRound = game.getByRole("button", { name: /Next round/ });
    if (await nextRound.isVisible({ timeout: 1500 }).catch(() => false)) await nextRound.click();
  }
}

/* The chip rebuild in "say it back": tap the real pieces in order, then check. */
async function buildSentence(page: Page) {
  const pieces = (await page.getByTestId("build-chip").evaluateAll((els) => els.map((e) => Number(e.getAttribute("data-piece"))))).filter((p) => p >= 0).sort((a, b) => a - b);
  for (const p of pieces) { await pause(page); await page.locator(`[data-testid="build-chip"][data-piece="${p}"]`).click(); }
  await pause(page);
  await page.getByTestId("build-check").click();
}

/* The "try it before we explain" phase, when the format asks for one. */
async function passTry(page: Page, wrong = false) {
  if ((await page.getByTestId("segment-learn").getAttribute("data-phase")) !== "try") return;
  await page.locator(`[data-testid="choice"][data-correct="${wrong ? "false" : "true"}"]`).first().click();
  await page.getByTestId("try-continue").click();
}

/* The "say it back" step: type for a friend, or rebuild from chips. */
async function sayBack(page: Page, text = SAY) {
  const say = page.getByTestId("say-back");
  if (!(await say.isVisible())) return;
  if ((await say.getAttribute("data-mode")) === "type") { await page.getByTestId("say-input").fill(text); await page.getByTestId("say-submit").click(); }
  else await buildSentence(page);
}

/* Play opens with a choice of games when the pace allows one; take the engine's first offer. */
async function pickGame(page: Page, game?: string) {
  const picker = page.getByTestId("pick-game");
  if (!(await picker.first().isVisible())) return;
  const card = game ? page.locator(`[data-testid="pick-game"][data-game="${game}"]`) : picker.first();
  await card.click();
}

/* One step of a session: whatever single action runSession would take next (used to stop at a given segment). */
async function runStep(page: Page) {
  await pause(page);
  for (const id of ["intro-done", "pretest-false", "try-continue", "think-reveal", "learn-done", "rewind-done", "rewind-next", "check-done", "check-next", "checkpoint-done"]) {
    if (await page.getByTestId(id).isVisible()) { await page.getByTestId(id).click(); return; }
  }
  if (await page.getByTestId("build-chip").first().isVisible()) { await buildSentence(page); return; }
  if (await page.getByTestId("say-input").isVisible()) { await sayBack(page); return; }
  const correct = page.locator('[data-testid="choice"][data-correct="true"]').first();
  if (await correct.isVisible()) { await correct.click(); return; }
  if (await page.getByTestId("play-skip").isVisible()) { await page.getByTestId("play-skip").click(); return; }
  await page.waitForTimeout(150);
}

/* Drives any session to its Done screen, answering everything correctly. */
async function runSession(page: Page, opts: { skipGames?: boolean; keyboardBlitz?: boolean; say?: string } = {}) {
  for (let i = 0; i < 80; i++) {
    if (await page.getByTestId("segment-done").isVisible()) return;
    await pause(page);
    if (await page.getByTestId("intro-done").isVisible()) { await page.getByTestId("intro-done").click(); continue; }
    if (await page.getByTestId("pretest-false").isVisible()) { await page.getByTestId("pretest-false").click(); continue; }
    if (await page.getByTestId("try-continue").isVisible()) { await page.getByTestId("try-continue").click(); continue; }
    if (await page.getByTestId("think-reveal").isVisible()) { await page.getByTestId("think-reveal").click(); continue; }
    if (await page.getByTestId("say-input").isVisible()) { await sayBack(page, opts.say); continue; }
    if (await page.getByTestId("build-chip").first().isVisible()) { await buildSentence(page); continue; }
    if (await page.getByTestId("learn-done").isVisible()) { await page.getByTestId("learn-done").click(); continue; }
    if (await page.getByTestId("cq-show").isVisible()) { await page.getByTestId("cq-show").click(); continue; }
    if (await page.getByTestId("cq-mark-1").isVisible()) { await page.getByTestId("cq-mark-1").click(); continue; }
    if (await page.getByTestId("cq-done").isVisible()) { await page.getByTestId("cq-done").click(); continue; }
    for (const [done, next] of [["rewind-done", "rewind-next"], ["check-done", "check-next"], ["checkpoint-done", ""]] as const) {
      if (await page.getByTestId(done).isVisible()) { await page.getByTestId(done).click(); break; }
      if (next && (await page.getByTestId(next).isVisible())) { await page.getByTestId(next).click(); break; }
    }
    const correct = page.locator('[data-testid="choice"][data-correct="true"]').first();
    if (await correct.isVisible()) { await correct.click(); continue; }
    if (await page.getByTestId("play-done").isVisible()) { await page.getByTestId("play-done").click(); continue; }
    if (await page.getByTestId("segment-play").isVisible()) {
      if (opts.skipGames) { await page.getByTestId("play-skip").click(); continue; }
      if (await page.getByTestId("pick-game").first().isVisible()) { await pickGame(page); continue; }
      const game = await page.getByTestId("segment-play").getAttribute("data-game");
      if (game === "spot") await page.getByTestId("play-skip").click();
      else if (game === "blitz") await playBlitz(page, opts.keyboardBlitz);
      else if (game === "pairs") await playPairs(page);
      else if (game === "blanks") await playBlanks(page);
      else if (game === "order") await playOrder(page);
      await expect(page.locator('[data-testid^="segment-"]').first()).toBeVisible();
      continue;
    }
    await page.waitForTimeout(150);
  }
  throw new Error("session did not reach Done");
}

test.describe("study module", () => {
  test.afterEach(() => { tapGap = 0; });

  test("dashboard redirects to onboarding when there is no profile", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.goto("/study/");
    await expect(page).toHaveURL(/\/start\/?$/);
  });

  test("first session: intro, pretest, learn, blitz game, quick check, done, then the daily gate", async ({ page }) => {
    await seed(page, base);
    await page.goto("/study/");
    await expect(page.getByTestId("continue-card")).toContainText("Session 1 of 18");
    await page.getByTestId("continue").click();
    await expect(page).toHaveURL(/\/study\/math\/session\/$/);
    await expect(page.getByTestId("session-start")).toContainText(mathUnit1.concepts[0].title);
    await page.getByTestId("start-session").click();

    await expect(page.getByTestId("segment-intro")).toBeVisible();
    await page.getByTestId("intro-done").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "pretest");
    await expect(page.getByTestId("segment-learn")).toContainText(mathUnit1.concepts[0].misconception.belief);
    await page.getByTestId("pretest-false").click();
    await passTry(page);
    await expect(page.getByTestId("misconception")).toContainText("You already had this right");
    await expect(page.getByTestId("another-way")).toBeEnabled();
    // The key points wait until the idea has been said back.
    await expect(page.getByTestId("key-points")).toHaveCount(0);
    await expect(page.getByTestId("say-back")).toHaveAttribute("data-mode", "type");
    await expect(page.getByTestId("say-submit")).toBeDisabled();
    await page.getByTestId("say-input").fill(SAY);
    await page.getByTestId("say-submit").click();
    await expect(page.getByTestId("say-feedback")).toContainText(/key terms|your own way/);
    await expect(page.getByTestId("key-points")).toContainText(mathUnit1.concepts[0].keyPoints[0]);
    await page.getByTestId("learn-done").click();

    // Play offers two games, the engine's favourite first, each with a reason.
    await expect(page.getByTestId("pick-game")).toHaveCount(2);
    await expect(page.getByTestId("pick-game").first()).toHaveAttribute("data-game", "blitz");
    await expect(page.getByTestId("pick-game").first()).toContainText(/New to you|Suits/);
    await pickGame(page);
    await expect(page.getByTestId("segment-play")).toHaveAttribute("data-game", "blitz");
    await playBlitz(page, true);
    await expect(page.getByTestId("game-summary")).toContainText(/of \d+ right/);
    await page.getByTestId("play-done").click();

    await expect(page.getByTestId("segment-check")).toBeVisible();
    await runSession(page);
    await expect(page.getByTestId("segment-done")).toContainText("Session 1 of 18 done");
    await expect(page.getByTestId("streak")).toContainText("1 day streak");
    await expect(page.getByTestId("tomorrow")).toContainText(mathUnit1.concepts[1].title);
    await expect(page.getByTestId("said-back")).toContainText(SAY);
    await page.getByTestId("when-evening").click();

    // The same day again: gated, with an override.
    await page.reload();
    await expect(page.getByTestId("gate")).toContainText("Session 2 unlocks tomorrow");
    await page.getByTestId("gate-override").click();
    await expect(page.getByTestId("session-start")).toContainText("Session 2 of 18");

    await page.goto("/study/");
    await expect(page.getByTestId("done-today")).toContainText(mathUnit1.concepts[1].title);
    await expect(page.getByText("Your plan: evenings.")).toBeVisible();
    await expect(page.getByTestId("catch-up")).toContainText("Nothing due right now");

    await page.goto("/study/math/");
    await expect(page.locator('[data-testid="path-node"][data-state="done"]')).toHaveCount(1);
    await expect(page.locator('[data-testid="path-node"][data-state="next"]')).toContainText("Session 2");
  });

  test("day two opens with a rewind of day one, shows what the learner said, and resumes after a reload", async ({ page }) => {
    await seed(page, base);
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    await runSession(page, { skipGames: true, say: "Each place is worth ten of the one to its right." });

    await setClock(page, DAY1 + DAY);
    await page.goto("/study/");
    await expect(page.getByTestId("catch-up")).toContainText("1 idea is due");
    await expect(page.getByTestId("continue-card")).toContainText("Session 2 of 18");
    await page.getByTestId("continue").click();
    await page.getByTestId("start-session").click();

    const rewind = page.getByTestId("segment-rewind");
    await expect(rewind).toContainText("Rewind 1 of 1");
    await expect(rewind).toContainText(mathUnit1.concepts[0].title);
    await page.locator('[data-testid="choice"][data-correct="true"]').first().click();
    await expect(page.getByTestId("why")).toBeVisible();
    await page.getByTestId("rewind-next").click();
    await expect(page.getByTestId("recap")).toContainText("Each place is worth ten of the one to its right.");
    await page.getByTestId("show-again").click();
    await expect(page.getByTestId("recap").getByTestId("steps")).toBeVisible();
    await page.getByTestId("rewind-done").click();

    await expect(page.getByTestId("segment-learn")).toBeVisible();
    await page.reload();
    await expect(page.getByTestId("segment-learn")).toBeVisible(); // resumed on the same segment
    await runSession(page, { skipGames: true });
    await expect(page.getByTestId("segment-done")).toContainText("Session 2 of 18 done");
    await expect(page.getByTestId("streak")).toContainText("2 day streak");

    await page.goto("/study/math/");
    await expect(page.locator('[data-testid="path-node"][data-state="done"]')).toHaveCount(2);
  });

  test("show me another way swaps the format once", async ({ page }) => {
    await seed(page, base);
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    await page.getByTestId("intro-done").click();
    await page.getByTestId("pretest-true").click();
    await passTry(page);
    const before = await page.getByTestId("segment-learn").getAttribute("data-format");
    await page.getByTestId("another-way").click();
    const after = await page.getByTestId("segment-learn").getAttribute("data-format");
    expect(after).not.toBe(before);
    await expect(page.getByTestId("another-way")).toBeDisabled();
    await expect(page.getByTestId("misconception")).toContainText("You said true earlier");
  });

  test("a matcher plays pairs, a storyteller orders, a tinkerer fills gaps", async ({ page }) => {
    for (const [style, game, play] of [["visual", "pairs", playPairs], ["storyteller", "order", playOrder], ["tinkerer", "blanks", playBlanks]] as const) {
      const a = Object.fromEntries(Object.keys(answers).map((k) => [k, style]));
      await seed(page, { ...base, answers: a });
      await page.goto("/study/math/session/");
      await page.getByTestId("start-session").click();
      await page.getByTestId("intro-done").click();
      await page.getByTestId("pretest-false").click();
      await passTry(page);
      await sayBack(page);
      await page.getByTestId("learn-done").click();
      await expect(page.getByTestId("pick-game").first(), `${style} should be offered ${game} first`).toHaveAttribute("data-game", game);
      await pickGame(page);
      await expect(page.getByTestId("segment-play"), `${style} should get ${game}`).toHaveAttribute("data-game", game);
      await play(page);
      await expect(page.getByTestId("game-summary")).toBeVisible();
      await page.getByTestId("play-done").click();
      await expect(page.getByTestId("segment-check")).toBeVisible();
    }
  });

  test("age is asked neutrally, and a six-year-old is read to, explained to first, and never timed or streak-counted", async ({ page }) => {
    // The question is a typed number: no bands, no default, no hint of what an age unlocks.
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.goto("/start/");
    await expect(page.getByTestId("age-input")).toHaveValue("");
    await expect(page.getByText("Under 12")).toHaveCount(0);
    await page.getByTestId("age-input").fill("abc");
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
    await page.getByTestId("age-input").fill("6");
    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();

    await seed(page, { ...base, age: 6, pace: "sprint" });
    tapGap = 350;
    await page.goto("/study/");
    await expect(page.getByTestId("streak")).toContainText("this week"); // no day-streak count under 8
    await page.goto("/study/math/session/");
    await expect(page.locator('[data-text="large"][data-tap="large"]')).toBeVisible();
    await page.getByTestId("start-session").click();
    await pause(page);
    await page.getByTestId("intro-done").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "learn"); // no true/false guess for pre-readers
    if (await page.evaluate(() => "speechSynthesis" in window)) {
      await expect(page.getByTestId("read-aloud-toggle")).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByTestId("listen").first()).toBeVisible();
    }

    await page.goto("/study/settings/");
    await expect(page.getByTestId("beat-clock")).toHaveCount(0);           // never offered a clock
    await expect(page.getByTestId("study-profile")).toHaveCount(0);        // never asked the study statements
    await expect(page.getByTestId("guardian-habits")).toBeVisible();       // habit tuning waits for a guardian
    await expect(page.getByTestId("age-lines")).toContainText("Read aloud");

    // A 15-year-old: a minor for privacy, so the guardian switch stays; the clock and the statements are back.
    await seed(page, { ...base, age: 15 });
    await page.goto("/study/settings/");
    await expect(page.getByTestId("beat-clock")).toBeVisible();
    await expect(page.getByTestId("study-profile")).toBeVisible();
    await expect(page.getByTestId("guardian-habits")).toBeVisible();
    // An adult: none of it.
    await seed(page, base);
    await page.goto("/study/settings/");
    await expect(page.getByTestId("guardian-habits")).toHaveCount(0);
  });

  test("a child of 9 gets large targets, explanation first, word chips, untimed games, and no confetti under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await seed(page, { ...base, age: 9 });
    await page.goto("/study/math/session/");
    await expect(page.locator('[data-motion][data-tap="large"]')).toBeVisible();
    await page.getByTestId("start-session").click();
    await page.waitForTimeout(350);
    await page.getByTestId("intro-done").click();
    // A second tap straight after the first lands on the new screen by accident: it is dropped.
    await page.getByTestId("pretest-false").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "pretest");
    tapGap = 350;
    await pause(page);
    await page.getByTestId("pretest-false").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "learn"); // no try-first for children
    await expect(page.getByTestId("segment-learn")).not.toHaveAttribute("data-format", "reading");
    await expect(page.getByTestId("say-back")).toHaveAttribute("data-mode", "build");
    await buildSentence(page);
    await expect(page.getByTestId("say-back")).toHaveAttribute("data-status", "solved");
    await pause(page);
    await page.getByTestId("learn-done").click();
    await expect(page.getByTestId("segment-play")).toBeVisible();
    await pause(page);
    await pickGame(page);
    await expect(page.getByTestId("segment-play").locator(".bg-focus.h-full")).toHaveCount(0); // no timer bar
    await runSession(page, { skipGames: true });
    await expect(page.getByTestId("segment-done")).toBeVisible();
    await expect(page.getByTestId("confidence-sure")).toHaveCount(0);
    await expect(page.getByTestId("confetti")).toHaveCount(0);
    await expect(page.getByTestId("say-it")).toHaveCount(0);
  });

  test("deep pace teaches a whole unit in one sitting with a checkpoint", async ({ page }) => {
    await seed(page, { ...base, pace: "deep" });
    await page.goto("/study/");
    await expect(page.getByTestId("continue-card")).toContainText("Session 1 of 6");
    await page.getByTestId("continue").click();
    await page.getByTestId("start-session").click();
    await runSession(page, { skipGames: true });
    await expect(page.getByTestId("segment-done")).toContainText("Unit secured");
    await page.goto("/study/math/");
    await expect(page.getByTestId("path")).toContainText("Secured");
  });

  test("two subjects get independent paths and one interleaved rewind", async ({ page }) => {
    await seed(page, { ...base, subjects: ["math", "languages"] });
    await page.goto("/study/");
    await expect(page.getByTestId("subject-row")).toHaveCount(2);
    for (const subject of ["math", "languages"]) {
      await page.goto(`/study/${subject}/session/`);
      await page.getByTestId("start-session").click();
      await runSession(page, { skipGames: true });
    }
    await page.goto("/study/");
    await expect(page.getByTestId("done-today")).toBeVisible();
    await setClock(page, DAY1 + DAY);
    await page.goto("/study/");
    await expect(page.getByTestId("catch-up")).toContainText("2 ideas are due");
    await page.goto("/study/review/");
    await expect(page.getByTestId("review-item")).toBeVisible();
    for (let i = 0; i < 6; i++) {
      if (await page.getByTestId("review-summary").isVisible()) break;
      if (await page.getByTestId("think-reveal").isVisible()) await page.getByTestId("think-reveal").click();
      await page.locator('[data-testid="choice"][data-correct="true"]').first().click();
      await page.getByTestId("review-next").click();
    }
    await expect(page.getByTestId("review-summary")).toContainText("2 of 2 right");
  });

  test("settings: motion override, backup download, and a full reset", async ({ page }) => {
    await seed(page, base);
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    await runSession(page, { skipGames: true });
    await page.goto("/study/settings/");
    await page.getByTestId("motion-calm").click();
    await expect(page.getByTestId("motion-calm")).toHaveAttribute("aria-checked", "true");
    await expect(page.locator('[data-motion="calm"]')).toBeVisible();
    const download = page.waitForEvent("download");
    await page.getByTestId("export").click();
    expect((await download).suggestedFilename()).toMatch(/dojolom-progress-.*\.json/);
    page.once("dialog", (d) => d.accept());
    await page.getByTestId("reset").click();
    await page.goto("/study/");
    await expect(page.getByTestId("continue-card")).toContainText("Session 1 of 18");
  });

  test("a wrong guess before the explanation is not held against the learner, and a holding idea is asked before it is shown", async ({ page }) => {
    await seed(page, { ...base, answers: Object.fromEntries(Object.keys(answers).map((k) => [k, "visual"])) }); // an infographic, so there is a try phase
    // The chapter's first idea is always explained first; the second, once the topic is under way, is tried first.
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    await page.getByTestId("intro-done").click();
    await page.getByTestId("pretest-false").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "learn");
    await runSession(page, { skipGames: true });
    await setClock(page, DAY1 + DAY);
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    for (let i = 0; i < 30 && !(await page.getByTestId("pretest-false").isVisible()); i++) await runStep(page);
    await page.getByTestId("pretest-false").click();
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "try");
    await expect(page.getByTestId("segment-learn")).toContainText(mathUnit1.concepts[1].example.question);
    await passTry(page, true);
    await expect(page.getByTestId("segment-learn")).toHaveAttribute("data-phase", "learn");
    await page.getByTestId("say-skip").click();
    await expect(page.getByTestId("key-points")).toBeVisible();
    await page.getByTestId("learn-done").click();
    await runSession(page, { skipGames: true });
    await expect(page.getByTestId("stuck")).toHaveCount(0); // the wrong guess is not "worth another look"
    await expect(page.getByTestId("say-it")).toBeVisible();  // nothing was said, so the finish screen still offers the line

    // A holding idea (box 2) in the rewind hides the options until the learner has an answer in mind.
    await page.evaluate(([day1, day2]) => {
      localStorage.setItem("dojolom.study", JSON.stringify({
        version: 2, motion: "auto", beatClock: false, lastSeen: day1, profile: undefined, said: {}, events: [],
        subjects: { math: { startedOn: day1, pace: "steady", completedDays: [1], lastCompletedOn: day1, sessionsToday: 1, checkpoints: {} } },
        memory: { "math-1-1": { box: 2, due: day2, learnedOn: day1, format: "infographic", seen: 2, right: 1, wrong: 0, sureWrong: 0, last: true, lastAsked: [] } },
        sessions: [{ subject: "math", day: 1, date: day1, minutes: 5, correct: 3, asked: 3 }],
      }));
    }, ["2026-09-23", "2026-09-24"]);
    await setClock(page, DAY1 + DAY);
    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    const rewind = page.getByTestId("segment-rewind");
    await expect(rewind.getByTestId("think-first")).toBeVisible();
    await expect(rewind.getByTestId("choice")).toHaveCount(0);
    await rewind.getByTestId("think-reveal").click();
    await expect(rewind.getByTestId("choice").first()).toBeVisible();
    await rewind.locator('[data-testid="choice"][data-correct="true"]').first().click();
    await expect(page.getByTestId("why")).toBeVisible();
  });

  test("push me: the pick sticks through a reload, the gap is typed, and a typo is forgiven", async ({ page }) => {
    const tinkerer = Object.fromEntries(Object.keys(answers).map((k) => [k, "tinkerer"]));
    await seed(page, { ...base, answers: tinkerer });
    await page.goto("/study/settings/");
    await page.getByTestId("nudge-push").click();
    await expect(page.getByTestId("nudge-push")).toHaveAttribute("aria-checked", "true");
    await expect(page.getByTestId("pictures")).toHaveAttribute("aria-checked", "true");

    await page.goto("/study/math/session/");
    await page.getByTestId("start-session").click();
    await page.getByTestId("intro-done").click();
    await page.getByTestId("pretest-false").click();
    await passTry(page);
    await sayBack(page);
    await page.getByTestId("learn-done").click();

    await expect(page.getByTestId("pick-game")).toHaveCount(2);
    await expect(page.getByTestId("nudge-push")).toHaveAttribute("aria-checked", "true"); // the nudge is on the picker too
    await pickGame(page, "blanks");
    await expect(page.getByTestId("segment-play")).toHaveAttribute("data-game", "blanks");
    await page.reload();
    await expect(page.getByTestId("segment-play")).toHaveAttribute("data-game", "blanks"); // the pick is part of the sitting
    await expect(page.getByTestId("pick-game")).toHaveCount(0);

    const game = page.getByTestId("game-blanks");
    await expect(game).toHaveAttribute("data-mode", "type");
    // First gap: type the word with one letter wrong; longer words forgive a typo.
    const sentence = (await game.locator("p.font-display").first().textContent()) ?? "";
    const want = blankAnswer(sentence.replace(/ /g, " "));
    expect(want, `unknown sentence: ${sentence}`).toBeTruthy();
    const typo = want!.length >= 5 ? want!.slice(0, -1) + (want!.endsWith("x") ? "y" : "x") : want!;
    await game.getByTestId("gap-input").fill(typo);
    await game.getByTestId("gap-submit").click();
    await expect(game).toContainText("Right.");
    await game.getByTestId("next").click();
    // Second gap: ask for the choices instead, which is still a pick.
    await game.getByTestId("gap-choices").click();
    await expect(game).toHaveAttribute("data-mode", "pick");
    await expect(game.getByTestId("option")).toHaveCount(3);
    await playBlanks(page);
    await expect(game.getByTestId("game-summary")).toContainText(/of \d+ gaps/);
  });

  test("a missed rewind gets a second go from another angle, and a failed checkpoint is taught again and retaken", async ({ page }) => {
    await seed(page, base, DAY1 + 3 * DAY);
    await page.evaluate(([d1, d2, d3, d4]) => {
      const mem = (learnedOn: string) => ({ stability: 1, difficulty: 5, reviewedOn: d3, due: d4, learnedOn, format: "infographic", seen: 3, right: 2, wrong: 1, sureWrong: 0, last: true, lastAsked: [] });
      localStorage.setItem("dojolom.study", JSON.stringify({
        version: 2, motion: "auto", beatClock: false, nudge: 0, pictures: true, lastSeen: d3, said: {}, events: [],
        subjects: { math: { startedOn: d1, pace: "steady", completedDays: [1, 2, 3], lastCompletedOn: d3, sessionsToday: 1, checkpoints: { 1: { passed: false, score: 3, of: 6, on: d3, missed: ["math-1-2"] } } } },
        memory: { "math-1-1": mem(d1), "math-1-2": mem(d2), "math-1-3": mem(d3) },
        sessions: [1, 2, 3].map((day, i) => ({ subject: "math", day, date: [d1, d2, d3][i], minutes: 12, correct: 3, asked: 4 })),
      }));
    }, ["2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26"]);
    await page.goto("/study/math/session/");
    const start = page.getByTestId("session-start");
    await expect(start).toContainText("Second look");
    await expect(start).toContainText("Unit 1 retake");
    await page.getByTestId("start-session").click();

    // Miss the first rewind question: it comes back at the end as a different kind of question on the same idea.
    const rewind = page.getByTestId("segment-rewind");
    const firstTitle = (await rewind.getByTestId("rewind-title").textContent())?.trim();
    if (await rewind.getByTestId("think-reveal").isVisible()) await rewind.getByTestId("think-reveal").click();
    await rewind.locator('[data-testid="choice"][data-correct="false"]').first().click();
    await expect(page.getByTestId("why")).toContainText("Not quite");
    for (let i = 0; i < 6 && !(await rewind.locator("[data-retry]").isVisible()); i++) {
      await page.getByTestId("rewind-next").click();
      if (await rewind.locator("[data-retry]").isVisible()) break;
      if (await rewind.getByTestId("think-reveal").isVisible()) await rewind.getByTestId("think-reveal").click();
      await rewind.locator('[data-testid="choice"][data-correct="true"]').first().click();
    }
    await expect(rewind.locator("[data-retry]")).toContainText("Second go");
    await expect(rewind.getByTestId("rewind-title")).toHaveText(firstTitle ?? "");
    await rewind.locator('[data-testid="choice"][data-correct="true"]').first().click();
    await page.getByTestId("rewind-next").click();
    await page.getByTestId("rewind-done").click();

    // The corrective: the missed idea, taught a different way in, then a retake on it alone.
    const learn = page.getByTestId("segment-learn");
    await expect(learn.getByTestId("corrective")).toBeVisible();
    await expect(learn).toContainText(mathUnit1.concepts[1].title);
    await expect(learn).not.toHaveAttribute("data-format", "infographic");
    await buildSentence(page);
    await page.getByTestId("learn-done").click();
    const retake = page.getByTestId("segment-checkpoint");
    await expect(retake.locator("[data-retake]")).toContainText("Unit 1 retake");
    await runSession(page, { skipGames: true });

    await page.goto("/study/math/");
    await expect(page.getByTestId("path")).toContainText("Secured");
  });

  test("a school-book path: Bangla key words in the lesson, and the chapter closes with a board-style creative question", async ({ page }) => {
    const school = { ...base, age: 15, goal: "school", track: "nctb", bdStage: "ssc", bdGroup: "science", subjects: ["bd-ssc-physics"], targetGrade: "A+" };
    await seed(page, school);
    await page.goto("/study/bd-ssc-physics/session/");
    await expect(page.locator("main")).toContainText("Unit 1: Physical Quantities and Their Measurements");
    await page.getByTestId("start-session").click();
    await page.getByTestId("intro-done").click();
    await page.getByTestId("pretest-false").click();
    await passTry(page);
    await expect(page.getByTestId("glossary")).toContainText(/[\u0980-\u09FF]/);
    await runSession(page, { skipGames: true });

    // Session 3 ends unit 1: checkpoint, then the creative question with its four parts.
    await page.evaluate(([d1, d2]) => {
      const s = JSON.parse(localStorage.getItem("dojolom.study") ?? "{}");
      s.subjects["bd-ssc-physics"] = { ...s.subjects["bd-ssc-physics"], completedDays: [1, 2], lastCompletedOn: d2, startedOn: d1, sessionsToday: 1, current: undefined };
      localStorage.setItem("dojolom.study", JSON.stringify(s));
    }, ["2026-09-23", "2026-09-24"]);
    await setClock(page, DAY1 + 2 * DAY);
    await page.goto("/study/bd-ssc-physics/session/");
    await expect(page.getByTestId("session-start")).toContainText("Creative question");
    await page.getByTestId("start-session").click();
    for (let i = 0; i < 60 && !(await page.getByTestId("segment-cq").isVisible()); i++) {
      if (await page.getByTestId("checkpoint-summary").isVisible()) await expect(page.getByTestId("grade-line")).toContainText(/on the board's scale/);
      await runStep(page);
    }
    const cq = page.getByTestId("segment-cq");
    await expect(page.getByTestId("cq-stem")).toBeVisible();
    for (let part = 0; part < 4; part++) {
      await page.getByTestId("cq-input").fill("My answer.");
      await page.getByTestId("cq-show").click();
      await expect(page.getByTestId("cq-answer")).toBeVisible();
      await page.getByTestId(`cq-mark-${part === 0 ? 1 : 2}`).click();
    }
    await expect(cq).toHaveAttribute("data-step", "summary");
    await expect(cq).toContainText("You marked yourself 7 of 10");
    await page.getByTestId("cq-done").click();
    await expect(page.getByTestId("segment-done")).toBeVisible();
  });

  test("the profile results page leads into the study", async ({ page }) => {
    await seed(page, base);
    await page.goto("/start/");
    await expect(page.getByTestId("path-card")).toHaveCount(1);
    await expect(page.getByText("Formats you will start with")).toBeVisible();
    await page.getByTestId("go-to-study").click();
    await expect(page).toHaveURL(/\/study\/$/);
  });
});
