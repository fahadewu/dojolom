import { test, expect, type Page } from "@playwright/test";
import { memoryJourney } from "../../src/lib/landing";
import { bdSubjects } from "../../src/lib/curriculum-bd";

/* End-to-end coverage of the landing page against the static export: every
   section renders and answers the visitor, the numbers shown come from the
   app's own models, nothing overflows a phone, and reduced motion stops the
   page moving by itself. */

async function fresh(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
  return errors;
}

const learner = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem("dojolom.learner") ?? "null"));

test.describe("landing page", () => {
  test("renders every section, with the anchors the navigation links to, and no errors", async ({ page }) => {
    const errors = await fresh(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Learn it today\.\s*Know it next month\./);
    for (const id of ["hero", "loop", "memory", "ages", "books", "subjects", "try", "cta"]) await expect(page.getByTestId(id)).toBeVisible();
    for (const anchor of ["how", "books", "subjects", "try", "waitlist"]) await expect(page.locator(`#${anchor}`)).toHaveCount(1);
    // The session stack names its four layers in session order.
    await expect(page.getByTestId("session-stack").locator("li")).toHaveText([/Rewind/, /Learn/, /Play/, /Check/]);
    expect(errors).toEqual([]);
  });

  test("the hero starts onboarding", async ({ page }) => {
    await fresh(page);
    await page.getByTestId("hero-start").click();
    await expect(page).toHaveURL(/\/start\/?$/);
  });

  test("four moves: steps by itself until picked, answers clicks and arrow keys, and each preview works", async ({ page }) => {
    await fresh(page);
    await page.getByTestId("loop").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("move-guess")).toHaveAttribute("aria-selected", "true");
    // While on screen and untouched, it moves on by itself.
    await expect(page.getByTestId("move-try")).toHaveAttribute("aria-selected", "true", { timeout: 9000 });

    // Picking a move stops the stepping for good.
    await page.getByTestId("move-guess").click();
    await page.mouse.move(0, 0);
    await page.getByTestId("demo-true").click();
    await expect(page.getByTestId("loop")).toContainText("why air, not weight");
    await page.waitForTimeout(6000);
    await expect(page.getByTestId("move-guess")).toHaveAttribute("aria-selected", "true");

    // Arrow keys move between moves.
    await page.getByTestId("move-guess").focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByTestId("move-try")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("move-try")).toBeFocused();
    await page.getByTestId("demo-option").filter({ hasText: "They land together" }).click();
    await expect(page.getByTestId("loop")).toContainText("Right.");

    // Say: a wrong chip is caught, the right order builds the idea.
    await page.getByTestId("move-say").click();
    await page.getByTestId("demo-chip").filter({ hasText: "heavier falls faster" }).click();
    await expect(page.getByTestId("loop")).toContainText("Not that piece yet");
    for (const c of ["With no air,", "everything falls", "at the same rate."]) await page.getByTestId("demo-chip").filter({ hasText: c }).click();
    await expect(page.getByTestId("demo-built")).toHaveText("With no air, everything falls at the same rate.");
  });

  test("memory: the ring and stats follow the day ruler, with the app's own model", async ({ page }) => {
    await fresh(page);
    const j = memoryJourney(60);
    const memory = page.getByTestId("memory");
    await memory.scrollIntoViewIfNeeded();
    // On first sight the marker walks to day 14 once.
    await expect(memory).toContainText("Day 14", { timeout: 5000 });
    const day = page.getByTestId("day");
    await day.focus();
    await page.keyboard.press("Home");
    await expect(page.getByTestId("recall")).toHaveText("100%");
    await expect(memory).toContainText(`Day ${j.rewinds[0]}`);
    await page.keyboard.press("End");
    await expect(page.getByTestId("recall")).toHaveText(`${Math.round(j.recallAt(60) * 100)}%`);
    await expect(memory).toContainText("After day 60");
    await expect(memory).toContainText(`${Math.round(j.unrewoundAt(60) * 100)}%`);
    await expect(day).toHaveAttribute("aria-valuetext", new RegExp(`Day 60: ${Math.round(j.recallAt(60) * 100)} percent`));
  });

  test("ages: what changes comes from the app's own rules", async ({ page }) => {
    await fresh(page);
    await page.getByTestId("ages").scrollIntoViewIfNeeded();
    await page.getByTestId("age-6").click();
    const changes = page.getByTestId("age-changes");
    await expect(changes).toContainText("About five minutes");
    await expect(changes).toContainText("We explain first");
    await expect(page.getByTestId("age-sample")).toHaveAttribute("data-large", "true");
    await expect(page.getByTestId("age-say")).toHaveAttribute("data-mode", "chips");
    await page.getByTestId("age-30").click();
    await expect(changes).not.toContainText("Read aloud");
    await expect(changes).toContainText("Try first, when it helps");
    await expect(page.getByTestId("age-sample")).toHaveAttribute("data-large", "false");
    await expect(page.getByTestId("age-say")).toHaveAttribute("data-mode", "type");
    await expect(page.getByTestId("ages")).not.toContainText(/senior|at your age/i);
  });

  test("school books: classes switch the list, a book starts onboarding with its class, and the creative question opens part by part", async ({ page }) => {
    await fresh(page);
    const books = page.getByTestId("books");
    await books.scrollIntoViewIfNeeded();
    await expect(books).toContainText(`${bdSubjects.length} NCTB books`);
    // SSC opens on eight books, with the rest one tap away.
    const ssc = bdSubjects.filter((s) => s.stage === "ssc");
    await expect(page.getByTestId("book-list").locator("li")).toHaveCount(8);
    await page.getByTestId("books-all").click();
    await expect(page.getByTestId("book-list").locator("li")).toHaveCount(ssc.length);

    await page.getByTestId("class-c5").click();
    const c5 = bdSubjects.filter((s) => s.stage === "c5");
    await expect(page.getByTestId("book-list").locator("li")).toHaveCount(c5.length);
    await expect(page.getByTestId("book-list")).toContainText(c5[0].nameBn!);

    await page.getByTestId("cq-part-0").click();
    await expect(page.getByTestId("cq-part-0")).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("cq-demo")).toContainText("pitch divided by the number of divisions");

    await page.getByTestId("book-list").locator("a").first().click();
    await expect(page).toHaveURL(/\/start\/?$/);
    expect(await learner(page)).toMatchObject({ track: "nctb", bdStage: "c5", subjects: [c5[0].id] });
  });

  test("everyday subjects and the sample lesson", async ({ page }) => {
    await fresh(page);
    await page.getByTestId("try").scrollIntoViewIfNeeded();
    await page.getByTestId("try").getByRole("button").filter({ hasText: "On the far side of Earth from the sun" }).click();
    await expect(page.getByTestId("try")).toContainText("Yes.");
    await page.getByTestId("subjects").getByRole("link").filter({ hasText: "Money" }).first().click();
    await expect(page).toHaveURL(/\/start\/?$/);
    expect(await learner(page)).toMatchObject({ track: "everyday", subjects: ["money"] });
  });

  test("the close: the mark settles, and the email form checks what it is given", async ({ page }) => {
    await fresh(page);
    const cta = page.getByTestId("cta");
    await cta.scrollIntoViewIfNeeded();
    await expect(cta.locator(".orbit")).toHaveClass(/is-seen/);
    await page.getByLabel("Get an email when new chapters land").fill("not-an-email");
    await page.getByRole("button", { name: "Keep me posted" }).click();
    await expect(page.getByText("That email doesn't look right", { exact: true })).toBeVisible();
    await page.getByLabel("Get an email when new chapters land").fill("rafi@example.com");
    await page.getByRole("button", { name: "Keep me posted" }).click();
    await expect(page.getByText("You're on the list", { exact: true })).toBeVisible();
    await page.getByTestId("cta-start").click();
    await expect(page).toHaveURL(/\/start\/?$/);
  });

  test("reduced motion: nothing moves by itself, and everything is in its final place", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await fresh(page);
    // The stack's names are shown at once, not after the load sequence.
    await expect(page.getByTestId("session-stack").locator("li").first()).toHaveCSS("opacity", "1", { timeout: 1000 });
    await page.getByTestId("loop").scrollIntoViewIfNeeded();
    await page.waitForTimeout(6000);
    await expect(page.getByTestId("move-guess")).toHaveAttribute("aria-selected", "true");
  });

  for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]] as const) {
    test(`fits a ${w}px screen with no sideways scroll`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await fresh(page);
      for (const id of ["memory", "books", "cta"]) await page.getByTestId(id).scrollIntoViewIfNeeded();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBe(0);
    });
  }
});
