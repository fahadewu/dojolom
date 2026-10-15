// ─── Study content model ──────────────────────────────────────────────────────
// Every subject unit is authored as a file of three concepts. Each concept carries
// enough material to be taught in any of the six formats and drilled by any of
// the four mini-games, so the study engine can pick per learner without gaps.
// All content is static and shipped with the app; per-subject files are loaded
// on demand so a learner only downloads the subjects they chose.

export interface Question {
  question: string;
  options: string[]; // 3 or 4, exactly one correct
  answer: number;    // index into options
  why: string;       // one-sentence explanation shown after answering
}

export interface Concept {
  id: string;        // `${subject}-${unit}-${n}`, e.g. "math-2-1" (unit and n are 1-based)
  title: string;     // sentence case, no trailing full stop
  hook: string;      // one sentence that makes the idea feel worth knowing
  steps: { label: string; text: string }[];      // exactly 4: the infographic and the guided walkthrough
  analogy: string;                                // one everyday comparison
  story: string[];                                // 2 to 4 short paragraphs, a named character in a real scene
  deepRead: string[];                             // 2 to 3 paragraphs, precise, with a worked example
  example: Question;                              // the "try it" challenge: a small problem to solve
  keyPoints: string[];                            // exactly 3, each a full sentence a learner could recall
  misconception: { belief: string; correction: string };
  quiz: Question[];                               // exactly 3
  pairs: { term: string; match: string }[];       // exactly 5, for the matching game
  order: { prompt: string; items: string[] };     // exactly 4 items in the correct sequence
  blitz: { statement: string; truth: boolean; why: string }[]; // exactly 4, balanced true/false
  blanks: { sentence: string; options: string[]; answer: number }[]; // exactly 2; sentence contains "___"
  terms?: string[];     // optional, 2 to 8: the words a good explanation of the idea would use; defaults to the pair terms
  sayPrompt?: string;   // optional: how the teach-back asks for the idea, e.g. "Tell a friend why a fair test changes one thing"
  glossary?: { term: string; bn: string }[]; // curriculum books: 2 to 8 key words with the Bangla term students meet in Bangla-medium books
}

/** One part of a board-style creative question, with the answer a marker would accept. */
export interface CqPart { q: string; a: string }

/**
 * The SSC/HSC creative question (সৃজনশীল প্রশ্ন): a scenario (উদ্দীপক) and four parts
 * of rising demand, marked 1, 2, 3 and 4. Curriculum units carry one, practised
 * after the unit checkpoint.
 */
export interface CreativeQuestion {
  stem: string;          // the scenario: a short real situation, table or worked setup, 2 to 6 sentences
  knowledge: CqPart;     // ক (1 mark): recall a definition or fact
  comprehension: CqPart; // খ (2 marks): explain why or how
  application: CqPart;   // গ (3 marks): use the idea on the scenario, often a calculation
  higherOrder: CqPart;   // ঘ (4 marks): analyse, compare or judge, with reasons
}

export interface UnitContent {
  subject: string;   // subject id from src/lib/learning.ts
  unit: number;      // 1-based, matches the position in Subject.units
  title: string;     // must equal Subject.units[unit - 1]
  summary: string;   // one sentence: what the learner can do after this unit
  concepts: Concept[]; // exactly 3, ordered easiest to hardest
  titleBn?: string;  // curriculum books: the chapter title in Bangla
  cq?: CreativeQuestion; // curriculum books: one board-style creative question on the chapter
}

export type SubjectContent = UnitContent[]; // exactly 6 units, in order
