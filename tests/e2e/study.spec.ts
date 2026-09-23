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

const answers: Record<string, string> = { "new-gadget": "player", remember: "player", "free-hour": "player", stuck: "player", motivation: "player" };
const base = { name: "Ada", age: "adult", subjects: ["math"], goal: "curious", pace: "steady", answers };

async function seed(page: Page, learner: Record<string, unknown>, clock = DAY1) {
  await page.goto("/");
  await page.evaluate(([l, c]) => {
    localStorage.clear();
    localStorage.setItem("dojolom.learner", JSON.stringify(l));
    localStorage.setItem("dojolom.clock", String(c));
  }, [learner, clock] as const);
}

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

/* Drives any session to its Done screen, answering everything correctly. */
async function runSession(page: Page, opts: { skipGames?: boolean; keyboardBlitz?: boolean } = {}) {
  for (let i = 0; i < 60; i++) {
    if (await page.getByTestId("segment-done").isVisible()) return;
    if (await page.getByTestId("intro-done").isVisible()) { await page.getByTestId("intro-done").click(); continue; }
    if (await page.getByTestId("pretest-false").isVisible()) { await page.getByTestId("pretest-false").click(); continue; }
    if (await page.getByTestId("learn-done").isVisible()) { await page.getByTestId("learn-done").click(); continue; }
    for (const [done, next] of [["rewind-done", "rewind-next"], ["check-done", "check-next"], ["checkpoint-done", ""]] as const) {
      if (await page.getByTestId(done).isVisible()) { await page.getByTestId(done).click(); break; }
      if (next && (await page.getByTestId(next).isVisible())) { await page.getByTestId(next).click(); break; }
    }
    const correct = page.locator('[data-testid="choice"][data-correct="true"]').first();
    if (await correct.isVisible()) { await correct.click(); continue; }
    if (await page.getByTestId("play-done").isVisible()) { await page.getByTestId("play-done").click(); continue; }
    if (await page.getByTestId("segment-play").isVisible()) {
      const game = await page.getByTestId("segment-play").getAttribute("data-game");
      if (opts.skipGames) await page.getByTestId("play-skip").click();
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
    await expect(page.getByTestId("misconception")).toContainText("You already had this right");
    await expect(page.getByTestId("key-points")).toContainText(mathUnit1.concepts[0].keyPoints[0]);
    await expect(page.getByTestId("another-way")).toBeEnabled();
    await page.getByTestId("learn-done").click();

    await expect(page.getByTestId("segment-play")).toHaveAttribute("data-game", "blitz");
    await playBlitz(page, true);
    await expect(page.getByTestId("game-summary")).toContainText(/of \d+ right/);
    await page.getByTestId("play-done").click();

    await expect(page.getByTestId("segment-check")).toBeVisible();
    await runSession(page);
    await expect(page.getByTestId("segment-done")).toContainText("Session 1 of 18 done");
    await expect(page.getByTestId("streak")).toContainText("1 day streak");
    await expect(page.getByTestId("tomorrow")).toContainText(mathUnit1.concepts[1].title);
    await page.getByTestId("say-it-input").fill("It is about what each digit is worth.");
    await page.getByTestId("say-it-input").blur();
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
    await runSession(page, { skipGames: true });
    await page.getByTestId("say-it-input").fill("Each place is worth ten of the one to its right.");
    await page.getByTestId("say-it-input").blur();

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
      await page.getByTestId("learn-done").click();
      await expect(page.getByTestId("segment-play"), `${style} should get ${game}`).toHaveAttribute("data-game", game);
      await play(page);
      await expect(page.getByTestId("game-summary")).toBeVisible();
      await page.getByTestId("play-done").click();
      await expect(page.getByTestId("segment-check")).toBeVisible();
    }
  });

  test("a child gets large targets, no confidence chips, untimed games, and no confetti under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await seed(page, { ...base, age: "kid" });
    await page.goto("/study/math/session/");
    await expect(page.locator('[data-motion][data-tap="large"]')).toBeVisible();
    await page.getByTestId("start-session").click();
    await page.getByTestId("intro-done").click();
    await page.getByTestId("pretest-false").click();
    await expect(page.getByTestId("segment-learn")).not.toHaveAttribute("data-format", "reading");
    await page.getByTestId("learn-done").click();
    await expect(page.getByTestId("segment-play")).toBeVisible();
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

  test("the profile results page leads into the study", async ({ page }) => {
    await seed(page, base);
    await page.goto("/start/");
    await expect(page.getByTestId("path-card")).toHaveCount(1);
    await expect(page.getByText("Formats you will start with")).toBeVisible();
    await page.getByTestId("go-to-study").click();
    await expect(page).toHaveURL(/\/study\/$/);
  });
});
