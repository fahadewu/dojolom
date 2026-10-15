import { afterEach, describe, expect, it } from "vitest";
import mathUnit1 from "@/content/math/unit-1";
import { ageDefaults, tutorAccess } from "@/lib/age";
import { buildProfile, emptyLearner, migrateLearner, type LearnerInput } from "@/lib/learning";
import { answered, emptyStudy, learned, setGuardianHabits, type StudyState } from "@/lib/study";
import { addDays } from "@/lib/clock";
import { cleanInterests, cleanSeeWays, styleAnswersFrom } from "@/lib/tutor/profile";
import { buildTutorContext, learnerForTutor, nextInBooks, stuckTwice, tutorContextSchema, type TutorContext } from "@/lib/tutor/context";
import { RULES, learnerBrief, showOrder, stillToFindOut, type Resolved } from "@/lib/tutor/brief";
import { FAST_MODEL, STRONG_MODEL, modelFor, resolve } from "@/lib/tutor/agent";
import { chapterText, lessonText, lookUp } from "@/lib/tutor/catalogue";
import { cleanCheck, isOwnId, makeOwnIdea, type OwnIdea } from "@/lib/tutor/ideas";
import { KICKOFF_TEXT, resumable, titleOf } from "@/lib/tutor/threads";
import { reviewItemText } from "@/lib/tutor/items";
import type { TutorUIMessage } from "@/lib/tutor/tools";
import { POST } from "@/app/api/chat/route";

const T0 = Date.UTC(2026, 8, 23, 8, 0);
const TODAY = "2026-09-23";
const units = (book: string) => (book === "math" ? [1, 2] : []);

const learner = (over: Partial<LearnerInput> = {}): LearnerInput => ({
  ...emptyLearner, name: "Nadia Rahman", age: 30, subjects: ["math"], goal: "curious",
  seeWays: ["stories"], answers: styleAnswersFrom(["stories"]), tutorTone: "coach", interests: ["Cricket"], ...over,
});

const own = (title = "How bees make honey"): OwnIdea => makeOwnIdea({ title, topic: "Bees", keyPoint: "Bees turn nectar into honey by evaporating its water.", check: { question: "What do bees remove from nectar?", options: ["Water", "Sugar", "Pollen"], answer: 0, why: "Evaporating water thickens it." } }, TODAY, () => false)!;

const ctxOf = (l: LearnerInput, state: StudyState = emptyStudy, ideas: Record<string, OwnIdea> = {}, now = T0, today = TODAY): TutorContext =>
  buildTutorContext({ learner: l, state, ownIdeas: ideas, today, now, authoredUnitsFor: units });

const resolved: Resolved = { titles: Object.fromEntries(mathUnit1.concepts.map((c) => [c.id, c.title])), books: { math: "Math" } };
const user = (text: string, kickoff = false): TutorUIMessage => ({ id: `u${text.length}${kickoff}`, role: "user", parts: [{ type: "text", text }], ...(kickoff ? { metadata: { kickoff: true } } : {}) });

describe("what the learner tells the tutor", () => {
  it("cleans interests: trimmed, de-duplicated, symbols dropped, five at most", () => {
    expect(cleanInterests(["  Cricket ", "cricket", "<script>Football</script>", "", 4, "a".repeat(50), "Music", "Art", "Space", "Cooking"]))
      .toEqual(["Cricket", "script Football script", "a".repeat(32), "Music", "Art"]);
  });

  it("keeps at most two ways of explaining, and only known ones; the first chosen leads the lesson player's formats", () => {
    expect(cleanSeeWays(["steps", "pictures", "steps", "dance", "stories"])).toEqual(["steps", "pictures"]);
    expect(buildProfile(learner({ answers: styleAnswersFrom(["steps", "pictures"]) })).primary.id).toBe("watcher");
  });

  it("migrates older saved learners: missing tutor fields become empty, junk is dropped", () => {
    expect(migrateLearner({ name: "A", age: 20, interests: ["Cricket", 7], tutorTone: "shouty", seeWays: ["steps", "x"] })).toMatchObject({ interests: ["Cricket"], tutorTone: "", seeWays: ["steps"] });
  });

  it("sends only a first name to the AI service", () => {
    expect(learnerForTutor(learner(), 30).name).toBe("Nadia");
  });
});

describe("who the tutor is open to", () => {
  it("is open to adults, closed to under-18s unless the deployment allows it, and then needs a guardian", () => {
    expect(tutorAccess(ageDefaults(learner()), undefined, false)).toBe("open");
    const teen = ageDefaults(learner({ age: 15 }));
    expect(tutorAccess(teen, true, false)).toBe("closed");
    expect(tutorAccess(teen, undefined, true)).toBe("guardian");
    expect(tutorAccess(teen, true, true)).toBe("open");
    // Naming a school class protects as that class's age, whatever age was typed.
    expect(tutorAccess(ageDefaults(learner({ track: "nctb", bdStage: "c8" })), undefined, false)).toBe("closed");
  });
});

describe("ideas taught outside the checked lessons", () => {
  it("are kept only with a check that can be marked", () => {
    expect(cleanCheck({ question: "Pick one?", options: ["A", "B"], answer: 0 })).toBeNull();
    expect(cleanCheck({ question: "Pick one?", options: ["A", "a", "B"], answer: 0 })).toBeNull();
    expect(cleanCheck({ question: "Pick one?", options: ["A", "B", "C"], answer: 3 })).toBeNull();
    expect(cleanCheck({ question: "Pick one?", options: ["A", "B", "C"], answer: 2, why: "C." })).toEqual({ question: "Pick one?", options: ["A", "B", "C"], answer: 2, why: "C." });
    expect(makeOwnIdea({ title: "Bees", keyPoint: "x", check: { question: "q", options: ["a"], answer: 0 } }, TODAY, () => false)).toBeNull();
  });

  it("get ids that can never be mistaken for an authored idea, unique per device", () => {
    const a = own();
    expect(a.id).toBe("own-how-bees-make-honey");
    expect(isOwnId(a.id)).toBe(true);
    expect(a.id).not.toMatch(/-\d+-\d+$/);
    const b = makeOwnIdea({ title: "How bees make honey", keyPoint: a.keyPoint, check: a.check }, TODAY, (id) => id === a.id)!;
    expect(b.id).toBe("own-how-bees-make-honey-v2");
  });
});

describe("conversations", () => {
  it("are named after what the learner first asked, never the hidden opening", () => {
    expect(titleOf([user(KICKOFF_TEXT, true), user("Teach me how fractions work when you add them")])).toBe("Teach me how fractions work when you add…");
    expect(titleOf([user(KICKOFF_TEXT, true)])).toBe("New conversation");
  });

  it("drop a resumed turn that was cut off or whose automatic record was never answered", () => {
    const cut = { id: "a", role: "assistant", parts: [{ type: "tool-learned", toolCallId: "1", state: "input-available", input: { ideaId: "math-1-1" } }] } as unknown as TutorUIMessage;
    const waiting = { id: "b", role: "assistant", parts: [{ type: "tool-quickCheck", toolCallId: "2", state: "input-available", input: { ideaId: "math-1-1" } }] } as unknown as TutorUIMessage;
    expect(resumable([user("hi"), cut])).toEqual([user("hi")]);
    expect(resumable([user("hi"), waiting])).toHaveLength(2);
  });
});

describe("the context sent each turn", () => {
  it("passes the route's validation and carries what the learner knows", () => {
    const bees = own();
    let s = learned(emptyStudy, "math-1-1", "infographic", T0);
    s = learned(s, bees.id, "reading", T0);
    const tomorrow = addDays(TODAY, 1);
    const ctx = ctxOf(learner(), s, { [bees.id]: bees }, T0 + 86_400_000, tomorrow);
    expect(tutorContextSchema.safeParse(ctx).success).toBe(true);
    expect(ctx.memory.due.map((i) => i.id).sort()).toEqual(["math-1-1", bees.id].sort());
    expect(ctx.memory.due.find((i) => i.id === bees.id)).toMatchObject({ title: bees.title, keyPoint: bees.keyPoint });
    expect(ctx.memory.due.find((i) => i.id === "math-1-1")!.title).toBeUndefined(); // the server reads authored titles itself
    expect(ctx.memory.next).toEqual([{ book: "math", ideaId: "math-1-2" }]);
    expect(ctx.memory.learned).toBe(2);
  });

  it("never offers an own idea whose check was flagged, or one this device no longer has", () => {
    const bees = own();
    const s = learned(emptyStudy, bees.id, "reading", T0);
    const tomorrow = addDays(TODAY, 1);
    expect(ctxOf(learner(), s, { [bees.id]: { ...bees, flagged: true } }, T0, tomorrow).memory.due).toEqual([]);
    expect(ctxOf(learner(), s, {}, T0, tomorrow).memory.due).toEqual([]);
  });

  it("keeps an under-18's study habits away from the AI service until a guardian turns habit tuning on", () => {
    const teen = learner({ age: 15, study: { nv1: 5, nv2: 1 } });
    expect(ctxOf(teen).tuning.steadyNerves).toBe(false);
    expect(ctxOf(teen, setGuardianHabits(emptyStudy, true)).tuning.steadyNerves).toBe(true);
    expect(ctxOf(learner({ study: { nv1: 5, nv2: 1 } })).tuning.steadyNerves).toBe(true);
  });

  it("asks for the stronger model once an idea has been missed twice in the hour, not for one slip or a guess", () => {
    let s = answered(emptyStudy, "math", "math-1-1", false, T0, { source: "review" });
    s = answered(s, "math", "math-1-1", false, T0 + 1000, { source: "try" });
    expect(stuckTwice(s, T0 - 1)).toBe(false);
    s = answered(s, "math", "math-1-1", false, T0 + 2000, { source: "review" });
    const ctx = ctxOf(learner(), s, {}, T0 + 3000);
    expect(ctx.strong).toBe(true);
    expect(modelFor(ctx)).toBe(STRONG_MODEL);
    expect(modelFor(ctxOf(learner()))).toBe(FAST_MODEL);
  });

  it("finds the next checked idea in each book, in teaching order", () => {
    expect(nextInBooks(["math", "history"], {}, units)).toEqual([{ book: "math", ideaId: "math-1-1" }]);
  });
});

describe("what the tutor can look up", () => {
  it("finds a checked idea by its title, and a class's chapter by number", async () => {
    expect((await lookUp("place value"))[0]).toMatchObject({ kind: "idea", id: "math-1-1", checked: true });
    expect((await lookUp("class 8 math chapter 2"))[0]).toMatchObject({ kind: "chapter", id: "bd-c8-math#2" });
  });

  it("offers nothing rather than a loose match", async () => {
    expect(await lookUp("how bees make honey")).toEqual([]);
  });

  it("reads a checked idea and a chapter, and says when a chapter is not written yet", async () => {
    const c = mathUnit1.concepts[0];
    expect(lessonText(c)).toContain(c.keyPoints[0]);
    expect(lessonText(c)).toContain(c.misconception.belief);
    expect(await chapterText("math", 1)).toContain(`1. ${c.id}: ${c.title}`);
    expect(await chapterText("history", 1)).toMatch(/Not written as checked lessons yet/);
  });

  it("resolves titles and book names for the ids the browser sent", async () => {
    const r = await resolve(ctxOf(learner(), learned(emptyStudy, "math-1-1", "infographic", T0)));
    expect(r.titles["math-1-1"]).toBe(mathUnit1.concepts[0].title);
    expect(r.books.math).toBe("Math");
  });
});

describe("the tutor's instructions", () => {
  it("hold the guardrails the evidence asks for", () => {
    for (const rule of [/Never give the answer to a question you asked/, /hint, then a smaller question, then a worked example of a similar problem/, /explain it back in their own words/, /never change a verdict because they push back/, /Before teaching a topic, call lookUp/, /Never make up a formula/, /You are an AI tutor, not a person/, /1098/, /never mark a card yourself/, /Never ask their age/]) {
      expect(RULES).toMatch(rule);
    }
  });

  it("list what is still to find out about a newcomer, and nothing once it is known", () => {
    const newcomer = learnerForTutor({ ...emptyLearner, age: 30 }, 30);
    expect(stillToFindOut(newcomer)).toEqual(["what they want to learn", "how they like things explained", "which voice they want you to use", "why they are learning", expect.stringMatching(/^what to call them/), expect.stringMatching(/^what they are into/)]);
    expect(stillToFindOut(learnerForTutor(learner(), 30))).toEqual([]);
  });

  it("welcome a first-timer, and open a returning learner's day with a review of what is due", () => {
    const first = learnerBrief(ctxOf({ ...emptyLearner, age: 30 }), resolved, { first: true });
    expect(first).toMatch(/opened Dojolom for the first time/);
    expect(first).toMatch(/STILL TO FIND OUT: what they want to learn/);
    const s = learned(emptyStudy, "math-1-1", "infographic", T0);
    const back = learnerBrief(ctxOf(learner(), s, {}, T0, addDays(TODAY, 1)), resolved, { first: false });
    expect(back).toMatch(/start with a short review of what is due/);
    expect(back).toContain(`- math-1-1: ${mathUnit1.concepts[0].title}`);
    expect(back).toContain("First name: Nadia");
    expect(back).not.toContain("Rahman");
  });

  it("set examples in the learner's world by changing only the story, and never add tangents", () => {
    const brief = learnerBrief(ctxOf(learner()), resolved, null);
    expect(brief).toMatch(/Into: Cricket\. .*change only the names and the setting, keep the numbers, the steps and the difficulty/);
    expect(brief).toMatch(/Never add facts, trivia or tangents about their interests/);
    expect(learnerBrief(ctxOf(learner({ interests: [] })), resolved, null)).not.toContain("Into:");
  });

  it("start with the way the learner picked, and keep a strict coach's standards but soften it for a young child", () => {
    expect(showOrder(["stories"]).slice(0, 2)).toEqual(["story", "picture"]);
    expect(learnerBrief(ctxOf(learner()), resolved, null)).toMatch(/try show as "story" first/);
    expect(learnerBrief(ctxOf(learner({ age: 9 })), resolved, null)).toMatch(/soften the delivery/);
    expect(learnerBrief(ctxOf(learner()), resolved, null)).not.toMatch(/soften the delivery/);
  });
});

describe("helpers", () => {
  it("describe a practice question and its answer in words", () => {
    const c = mathUnit1.concepts[0];
    expect(reviewItemText(c, { source: "quiz", index: 0 })).toEqual({ question: c.quiz[0].question, answer: c.quiz[0].options[c.quiz[0].answer] });
  });
});

describe("the chat route", () => {
  const env = { ...process.env };
  afterEach(() => { process.env = { ...env }; });
  const post = (body: unknown) => POST(new Request("http://localhost/api/chat/", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } }));

  it("rejects a malformed request before any model is called", async () => {
    expect((await post({ messages: [] })).status).toBe(400);
    expect((await post({ context: { ...ctxOf(learner()), learner: { ...ctxOf(learner()).learner, books: ["../x"] } }, messages: [user("hi")] })).status).toBe(400);
    expect((await post({ context: ctxOf(learner()), messages: [user("x".repeat(2001))] })).status).toBe(400);
  });

  it("refuses an under-18 unless the deployment allows the tutor for them", async () => {
    expect((await post({ context: ctxOf(learner({ age: 15 })), messages: [user("hi")] })).status).toBe(403);
  });

  it("opens a newcomer's conversation by getting to know them (scripted model)", async () => {
    process.env.DOJOLOM_TUTOR_SCRIPT = "1";
    const res = await post({ context: ctxOf({ ...emptyLearner, age: 30 }), messages: [user(KICKOFF_TEXT, true)] });
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/"toolName":"choices"/);
    expect(text).toContain("Pictures and diagrams");
  });

  it("looks a topic up and reads the checked lesson on the server, inside the turn (scripted model)", async () => {
    process.env.DOJOLOM_TUTOR_SCRIPT = "1";
    const text = await (await post({ context: ctxOf(learner()), messages: [user("place value")] })).text();
    expect(text).toMatch(/"toolName":"lookUp"/);
    expect(text).toMatch(/"toolName":"lesson"/);
    expect(text).toContain(mathUnit1.concepts[0].keyPoints[0].slice(0, 30)); // the lesson text came back to the model
    expect(text).toMatch(/"toolName":"show"/);
  });
});
