// What a practice question asked and what the right answer was, in words, so
// the tutor can talk about a miss. The cards keep the marking; this only
// describes. Pure.

import type { ReviewItem } from "@/lib/study";
import type { Concept } from "@/content/types";

export interface Asked { question: string; answer: string }

export function reviewItemText(concept: Concept, item: Pick<ReviewItem, "source" | "index">): Asked {
  if (item.source === "quiz") {
    const q = concept.quiz[item.index % concept.quiz.length];
    return { question: q.question, answer: q.options[q.answer] };
  }
  if (item.source === "blitz") {
    const b = concept.blitz[item.index % concept.blitz.length];
    return { question: `True or false: ${b.statement}`, answer: b.truth ? "True" : "False" };
  }
  if (item.source === "blank") {
    const b = concept.blanks[item.index % concept.blanks.length];
    return { question: `Fill the gap: ${b.sentence}`, answer: b.options[b.answer] };
  }
  const p = concept.pairs[item.index % concept.pairs.length];
  return { question: `Which describes "${p.term}"?`, answer: p.match };
}
