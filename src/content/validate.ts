// Structural and readability checks for authored study content. Used by the
// vitest content suite and by authors while writing, so a wrong answer index or
// an unbalanced true/false set is caught before it can teach something false.

import { subjects } from "@/lib/learning";
import type { Concept, Question, UnitContent } from "./types";

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s: string) => s.split(/(?<=[.!?])\s+/).filter((x) => x.trim().length > 0);
const PLACEHOLDER = /\b(todo|tbd|lorem|ipsum|placeholder|fixme)\b|\[[^\]]*\]/i;

/** Every string value inside a concept, so structural brackets from arrays are never mistaken for placeholders. */
function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => strings(v, out));
  return out;
}

function checkQuestion(q: Question, where: string, errors: string[], minOptions = 3) {
  if (!q.question?.trim()) errors.push(`${where}: empty question`);
  if (!Array.isArray(q.options) || q.options.length < minOptions || q.options.length > 4) errors.push(`${where}: needs 3 or 4 options`);
  else {
    const set = new Set(q.options.map((o) => o.trim().toLowerCase()));
    if (set.size !== q.options.length) errors.push(`${where}: duplicate options`);
    if (q.options.some((o) => /\b(all|none) of the above\b/i.test(o))) errors.push(`${where}: no "all/none of the above"`);
    if (q.options.some((o) => !o.trim())) errors.push(`${where}: empty option`);
  }
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) errors.push(`${where}: answer index out of range`);
  if (!q.why?.trim()) errors.push(`${where}: missing why`);
  if (words(q.question ?? "") > 40) errors.push(`${where}: question longer than 40 words`);
}

export function validateConcept(c: Concept, subject: string, unit: number, n: number): string[] {
  const e: string[] = [];
  const at = `${subject}-${unit}-${n}`;
  if (c.id !== at) e.push(`${at}: id is "${c.id}"`);
  if (!c.title?.trim()) e.push(`${at}: empty title`);
  if (c.title?.trim().endsWith(".")) e.push(`${at}: title ends with a full stop`);
  if ((c.title ?? "").length > 72) e.push(`${at}: title longer than 72 characters`);
  if (!c.hook?.trim()) e.push(`${at}: empty hook`);
  if (sentences(c.hook ?? "").length > 2) e.push(`${at}: hook should be one or two sentences`);
  if (words(c.hook ?? "") > 32) e.push(`${at}: hook longer than 32 words`);

  if (!Array.isArray(c.steps) || c.steps.length !== 4) e.push(`${at}: needs exactly 4 steps`);
  else c.steps.forEach((s, i) => {
    if (!s.label?.trim() || words(s.label) > 3 || s.label.length > 22) e.push(`${at}: step ${i + 1} label must be 1-3 words, at most 22 characters`);
    if (!s.text?.trim()) e.push(`${at}: step ${i + 1} text empty`);
    if (words(s.text ?? "") > 45) e.push(`${at}: step ${i + 1} longer than 45 words`);
    if (sentences(s.text ?? "").some((x) => words(x) > 26)) e.push(`${at}: step ${i + 1} has a sentence over 26 words`);
  });

  if (!c.analogy?.trim()) e.push(`${at}: empty analogy`);
  if (words(c.analogy ?? "") > 50) e.push(`${at}: analogy longer than 50 words`);

  if (!Array.isArray(c.story) || c.story.length < 2 || c.story.length > 4) e.push(`${at}: story needs 2 to 4 paragraphs`);
  else {
    const w = c.story.reduce((s, p) => s + words(p), 0);
    if (w < 80 || w > 180) e.push(`${at}: story is ${w} words, wanted 80 to 180`);
    if (c.story.some((p) => sentences(p).some((x) => words(x) > 30))) e.push(`${at}: story has a sentence over 30 words`);
  }

  if (!Array.isArray(c.deepRead) || c.deepRead.length < 2 || c.deepRead.length > 3) e.push(`${at}: deepRead needs 2 to 3 paragraphs`);
  else {
    const w = c.deepRead.reduce((s, p) => s + words(p), 0);
    if (w < 120 || w > 270) e.push(`${at}: deepRead is ${w} words, wanted 120 to 270`);
  }

  checkQuestion(c.example, `${at} example`, e);
  if (!Array.isArray(c.keyPoints) || c.keyPoints.length !== 3) e.push(`${at}: needs exactly 3 keyPoints`);
  else c.keyPoints.forEach((k, i) => { if (!k.trim() || words(k) > 30) e.push(`${at}: keyPoint ${i + 1} empty or over 30 words`); });
  if (!c.misconception?.belief?.trim() || !c.misconception?.correction?.trim()) e.push(`${at}: misconception needs belief and correction`);

  if (!Array.isArray(c.quiz) || c.quiz.length !== 3) e.push(`${at}: needs exactly 3 quiz questions`);
  else c.quiz.forEach((q, i) => checkQuestion(q, `${at} quiz ${i + 1}`, e));

  if (!Array.isArray(c.pairs) || c.pairs.length !== 5) e.push(`${at}: needs exactly 5 pairs`);
  else {
    const terms = new Set(c.pairs.map((p) => p.term?.trim().toLowerCase()));
    const matches = new Set(c.pairs.map((p) => p.match?.trim().toLowerCase()));
    if (terms.size !== 5 || matches.size !== 5) e.push(`${at}: pair terms and matches must be unique`);
    c.pairs.forEach((p, i) => {
      if (!p.term?.trim() || !p.match?.trim()) e.push(`${at}: pair ${i + 1} empty`);
      if (words(p.term ?? "") > 5) e.push(`${at}: pair ${i + 1} term longer than 5 words`);
      if (words(p.match ?? "") > 14) e.push(`${at}: pair ${i + 1} match longer than 14 words`);
    });
  }

  if (!c.order?.prompt?.trim()) e.push(`${at}: order needs a prompt`);
  if (!Array.isArray(c.order?.items) || c.order.items.length !== 4) e.push(`${at}: order needs exactly 4 items`);
  else {
    if (new Set(c.order.items.map((x) => x.trim().toLowerCase())).size !== 4) e.push(`${at}: order items must be unique`);
    if (c.order.items.some((x) => words(x) > 16)) e.push(`${at}: an order item is longer than 16 words`);
  }

  if (!Array.isArray(c.blitz) || c.blitz.length !== 4) e.push(`${at}: needs exactly 4 blitz statements`);
  else {
    const t = c.blitz.filter((b) => b.truth === true).length;
    if (t !== 2) e.push(`${at}: blitz must have 2 true and 2 false (has ${t} true)`);
    c.blitz.forEach((b, i) => {
      if (!b.statement?.trim() || !b.why?.trim()) e.push(`${at}: blitz ${i + 1} needs statement and why`);
      if (words(b.statement ?? "") > 24) e.push(`${at}: blitz ${i + 1} longer than 24 words`);
    });
  }

  if (!Array.isArray(c.blanks) || c.blanks.length !== 2) e.push(`${at}: needs exactly 2 blanks`);
  else c.blanks.forEach((b, i) => {
    const gaps = (b.sentence?.match(/___/g) ?? []).length;
    if (gaps !== 1) e.push(`${at}: blank ${i + 1} must contain exactly one ___`);
    if (!Array.isArray(b.options) || b.options.length !== 3) e.push(`${at}: blank ${i + 1} needs exactly 3 options`);
    else {
      if (new Set(b.options.map((o) => o.trim().toLowerCase())).size !== 3) e.push(`${at}: blank ${i + 1} duplicate options`);
      if (!Number.isInteger(b.answer) || b.answer < 0 || b.answer > 2) e.push(`${at}: blank ${i + 1} answer out of range`);
    }
  });

  const bad = strings(c).find((t) => PLACEHOLDER.test(t));
  if (bad) e.push(`${at}: contains placeholder text or square brackets: "${bad.slice(0, 60)}"`);
  return e;
}

export function validateUnit(u: UnitContent): string[] {
  const e: string[] = [];
  const subject = subjects.find((s) => s.id === u.subject);
  if (!subject) return [`unknown subject "${u.subject}"`];
  if (!Number.isInteger(u.unit) || u.unit < 1 || u.unit > subject.units.length) return [`${u.subject}: unit ${u.unit} out of range`];
  const expected = subject.units[u.unit - 1];
  if (u.title !== expected) e.push(`${u.subject}-${u.unit}: title must be "${expected}", got "${u.title}"`);
  if (!u.summary?.trim()) e.push(`${u.subject}-${u.unit}: empty summary`);
  if (!Array.isArray(u.concepts) || u.concepts.length !== 3) return [...e, `${u.subject}-${u.unit}: needs exactly 3 concepts`];
  u.concepts.forEach((c, i) => e.push(...validateConcept(c, u.subject, u.unit, i + 1)));
  const titles = new Set(u.concepts.map((c) => c.title.trim().toLowerCase()));
  if (titles.size !== 3) e.push(`${u.subject}-${u.unit}: concept titles must differ`);
  return e;
}
