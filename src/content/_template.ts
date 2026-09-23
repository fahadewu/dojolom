// Copy this file to src/content/<subject>/unit-<n>.ts and fill every field.
// Keep `satisfies UnitContent` so mistakes surface as type errors while writing,
// then run: UNIT_FILE=src/content/<subject>/unit-<n>.ts npx vitest run tests/unit/content-file.test.ts
import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 1,
  title: "Number sense",
  summary: "One sentence on what the learner can do after this unit.",
  concepts: [
    {
      id: "math-1-1",
      title: "Concept title in sentence case",
      hook: "One sentence that makes the idea worth knowing.",
      steps: [
        { label: "First", text: "Plain, concrete, one idea. Under 45 words." },
        { label: "Then", text: "..." },
        { label: "Next", text: "..." },
        { label: "Finally", text: "..." },
      ],
      analogy: "One everyday comparison.",
      story: ["A named character in a real scene meets the idea.", "The idea resolves something for them. 80 to 180 words in total."],
      deepRead: ["Precise explanation with a worked example.", "Second paragraph. 120 to 270 words in total."],
      example: { question: "A small problem to try.", options: ["...", "...", "..."], answer: 0, why: "One sentence." },
      keyPoints: ["Full sentence.", "Full sentence.", "Full sentence."],
      misconception: { belief: "A common wrong belief, stated as a learner would.", correction: "Why it is wrong and what is true." },
      quiz: [
        { question: "...", options: ["...", "...", "..."], answer: 0, why: "..." },
        { question: "...", options: ["...", "...", "..."], answer: 1, why: "..." },
        { question: "...", options: ["...", "...", "..."], answer: 2, why: "..." },
      ],
      pairs: [
        { term: "Term", match: "Its meaning in a few words" },
        { term: "Term", match: "..." },
        { term: "Term", match: "..." },
        { term: "Term", match: "..." },
        { term: "Term", match: "..." },
      ],
      order: { prompt: "Put these in order.", items: ["First", "Second", "Third", "Fourth"] },
      blitz: [
        { statement: "...", truth: true, why: "..." },
        { statement: "...", truth: false, why: "..." },
        { statement: "...", truth: true, why: "..." },
        { statement: "...", truth: false, why: "..." },
      ],
      blanks: [
        { sentence: "A sentence with one ___ to fill.", options: ["right", "wrong", "wrong"], answer: 0 },
        { sentence: "Another ___ sentence.", options: ["wrong", "right", "wrong"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
