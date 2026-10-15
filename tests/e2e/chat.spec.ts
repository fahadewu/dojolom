import { test, expect, type Page } from "@playwright/test";
import mathUnit1 from "../../src/content/math/unit-1";

/* End-to-end coverage of Dojolom as a conversation. The server runs the tutor on
   a scripted model (DOJOLOM_TUTOR_SCRIPT=1, src/lib/tutor/script-model.ts), so
   these tests check the plumbing a real model relies on: the device asks the age
   itself, the tutor gets to know a newcomer with choices and the answers are
   saved, lookups read checked lessons on the server, cards are marked and
   recorded on the device, ideas come back for review the next day, and the
   conversations survive a reload. */

const DAY1 = Date.UTC(2026, 8, 23, 8, 0); // 09:00 in London
const DAY = 24 * 3600_000;
const known = {
  name: "Ada Lovelace", age: 30, track: "everyday", subjects: ["math"], goal: "curious",
  seeWays: ["pictures"], answers: { "see-pictures-0": "visual", "see-pictures-1": "visual", "see-pictures-2": "visual" },
  tutorTone: "playful", interests: ["Cricket"],
};
const placeValue = mathUnit1.concepts[0];

async function fresh(page: Page, learner?: Record<string, unknown>, clock = DAY1) {
  await page.goto("/");
  await page.evaluate(([l, c]) => {
    localStorage.clear();
    if (l) localStorage.setItem("dojolom.learner", JSON.stringify(l));
    localStorage.setItem("dojolom.clock", String(c));
  }, [learner ?? null, clock] as const);
}

const stored = (page: Page, key: string) => page.evaluate((k) => JSON.parse(localStorage.getItem(k) ?? "null"), key);

/** Teach place value through the chat: ask, see the checked lesson, explain it back, and answer the check. */
async function learnPlaceValue(page: Page, explain = "Each place is worth ten times the place to its right.") {
  const chat = page.getByTestId("tutor-chat");
  await page.getByTestId("tutor-input").fill("place value");
  await page.getByTestId("tutor-send").click();
  await expect(chat.getByTestId("tutor-source")).toContainText(`From the checked lesson: ${placeValue.title}`);
  await expect(chat.getByTestId("tutor-show")).toHaveAttribute("data-as", "picture");
  await expect(chat.getByTestId("tutor-text").last()).toContainText("explain it back");
  await page.getByTestId("tutor-input").fill(explain);
  await page.getByTestId("tutor-send").click();
  await expect(chat.getByTestId("tutor-learned")).toContainText(`${placeValue.title}: I'll bring this back tomorrow`);
  const check = chat.getByTestId("tutor-check").last();
  await expect(check).toBeVisible();
  await expect(page.getByTestId("tutor-input")).toHaveCount(0); // a card is waiting: it is the conversation
  if (await check.getByTestId("think-reveal").isVisible()) await check.getByTestId("think-reveal").click();
  await check.locator('[data-testid="choice"][data-correct="true"]').first().click();
  await expect(chat.getByTestId("tutor-text").last()).toHaveText("Right.");
}

test.describe("Dojolom as a conversation", () => {
  test("a newcomer: the landing page opens the chat, age is asked on the device, then the tutor gets to know them and teaches", async ({ page }) => {
    await fresh(page);
    await page.goto("/");
    await page.getByTestId("hero-start").click();
    await expect(page).toHaveURL(/\/learn\/$/);

    // Age first, asked by the device before anything reaches the AI service: typed, no bands.
    await expect(page.getByTestId("intake")).toContainText("I'm an AI");
    await expect(page.getByTestId("intake-continue")).toBeDisabled();
    await page.getByTestId("age-input").fill("24");
    await page.getByTestId("intake-continue").click();

    // Getting to know them, in conversation, with choices; every answer saved as it comes.
    const chat = page.getByTestId("tutor-chat");
    await expect(page.getByTestId("ai-label")).toBeVisible();
    await expect(chat.getByTestId("tutor-choices")).toHaveAttribute("data-multi", "true");
    await chat.getByTestId("tutor-choice").filter({ hasText: "Step by step" }).click();
    await chat.getByTestId("choices-done").click();
    await expect(chat.getByTestId("tutor-saved").first()).toContainText("how you like things explained");
    await chat.getByTestId("tutor-choice").filter({ hasText: "Playful and funny" }).click();
    await expect(chat.getByTestId("tutor-saved").nth(1)).toContainText("voice");
    // Typing instead of tapping answers the card too.
    await expect(chat.getByTestId("tutor-choices")).toBeVisible();
    await page.getByTestId("tutor-input").fill("School or exams");
    await page.getByTestId("tutor-send").click();
    await expect(chat.getByTestId("tutor-saved").nth(2)).toContainText("goal");
    expect(await stored(page, "dojolom.learner")).toMatchObject({ age: 24, seeWays: ["steps"], tutorTone: "playful", goal: "school" });

    await learnPlaceValue(page);
    const study = await stored(page, "dojolom.study");
    expect(study.memory[placeValue.id]).toBeTruthy();
    expect(study.said[placeValue.id]).toBe("Each place is worth ten times the place to its right.");
    expect(study.events.some((e: { type: string; source?: string; concept?: string }) => e.type === "answer" && e.source === "review" && e.concept === placeValue.id)).toBe(true);
    await expect(page.getByTestId("memory-summary")).toContainText("1 idea learned");
  });

  test("anything else is taught too, saved with its own check, and the check can be flagged", async ({ page }) => {
    await fresh(page, known);
    await page.goto("/learn/");
    const chat = page.getByTestId("tutor-chat");
    await expect(chat.getByTestId("tutor-text").first()).toContainText("What would you like to learn today?");
    await page.getByTestId("tutor-input").fill("how bees make honey");
    await page.getByTestId("tutor-send").click();
    await expect(chat.getByTestId("tutor-steps")).toContainText("how bees make honey");
    await expect(chat.getByTestId("tutor-source")).toHaveCount(0); // nothing checked matched: no claim that it was
    await page.getByTestId("tutor-input").fill("Bees start with nectar and dry it out.");
    await page.getByTestId("tutor-send").click();
    await expect(chat.getByTestId("tutor-learned")).toContainText("how bees make honey");
    const ideas = await stored(page, "dojolom.ideas");
    expect(Object.keys(ideas)).toEqual(["own-how-bees-make-honey"]);
    await expect(chat.getByTestId("flag-check")).toBeVisible();
    await chat.getByTestId("flag-check").click();
    expect((await stored(page, "dojolom.ideas"))["own-how-bees-make-honey"].flagged).toBe(true);
  });

  test("the next day opens a new conversation that starts with a review of what is due", async ({ page }) => {
    await fresh(page, known);
    await page.goto("/learn/");
    await learnPlaceValue(page);
    await page.evaluate((c) => localStorage.setItem("dojolom.clock", String(c)), DAY1 + DAY);
    await page.reload();
    await expect(page.getByTestId("due-chip")).toContainText("1 idea is due");
    const chat = page.getByTestId("tutor-chat");
    await expect(chat.getByTestId("tutor-text").first()).toContainText("Welcome back");
    const check = chat.getByTestId("tutor-check");
    await expect(check).toContainText(placeValue.title);
    if (await check.getByTestId("think-reveal").isVisible()) await check.getByTestId("think-reveal").click();
    await check.locator('[data-testid="choice"][data-correct="true"]').first().click();
    await expect(chat.getByTestId("tutor-text").last()).toHaveText("Right.");
    // Yesterday's conversation is still in the list.
    await expect(page.getByTestId("thread")).toHaveCount(2);
  });

  test("a reload picks the conversation up, and a new conversation can be started from the list", async ({ page }) => {
    await fresh(page, known);
    await page.goto("/learn/");
    await page.getByTestId("tutor-input").fill("place value");
    await page.getByTestId("tutor-send").click();
    await expect(page.getByTestId("tutor-show")).toBeVisible();
    await expect(page.getByTestId("tutor-text").last()).toContainText("explain it back");
    await page.reload();
    await expect(page.getByTestId("tutor-show")).toBeVisible();
    await expect(page.getByTestId("learner-text").first()).toHaveText("place value");
    await expect(page.getByTestId("thread-title")).toHaveText("place value");
    await page.getByTestId("new-chat").click();
    await expect(page.getByTestId("tutor-text").first()).toContainText("What would you like to learn today?");
    await expect(page.getByTestId("thread")).toHaveCount(2);
  });

  test("an under-18 is not sent to the AI: the device says so and points to their lessons", async ({ page }) => {
    await fresh(page);
    await page.goto("/learn/");
    await page.getByTestId("age-input").fill("15");
    await page.getByTestId("intake-continue").click();
    await expect(page.getByTestId("tutor-closed")).toContainText("for adults for now");
    await expect(page.getByTestId("tutor-chat")).toHaveCount(0);
    await page.getByTestId("to-lessons").click();
    await expect(page).toHaveURL(/\/start\/$/);
    await expect(page.getByTestId("age-input")).toHaveValue("15");
  });

  test("adults who open the old dashboard are taken to the tutor; settings lead back to it", async ({ page }) => {
    await fresh(page, known);
    await page.goto("/study/");
    await expect(page).toHaveURL(/\/learn\/$/);
    await page.goto("/study/settings/");
    const section = page.getByTestId("tutor-settings");
    await section.getByTestId("tone-curious").click();
    expect((await stored(page, "dojolom.learner")).tutorTone).toBe("curious");
    await page.getByTestId("back-to-tutor").click();
    await expect(page).toHaveURL(/\/learn\/$/);
  });
});
