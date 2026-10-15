// ─── What the tutor can look up (server only) ────────────────────────────────
// The tutor teaches anything, but when a topic is one of Dojolom's books or
// authored ideas it teaches from that checked material (docs/ai-tutor-rd.md:
// models get school maths wrong often enough that grounding is the guardrail).
// Search runs over every subject and chapter title (English and Bangla) and
// over the authored ideas' titles and key words. Content is read through the
// generated index, never through src/content/load.ts (that file carries hooks).

import { contentIndex } from "@/content/index";
import type { Concept, UnitContent } from "@/content/types";
import { bdStage } from "@/lib/curriculum-bd";
import { parseConceptId, subjectById } from "@/lib/study";
import { subjects } from "@/lib/learning";

export async function loadUnit(subject: string, unit: number): Promise<UnitContent | null> {
  const loader = contentIndex[`${subject}-${unit}`];
  return loader ? (await loader()).default : null;
}

export async function loadConcepts(ids: string[]): Promise<Record<string, Concept>> {
  const units = new Map<string, { subject: string; unit: number }>();
  for (const id of ids) {
    if (!/^[a-z0-9-]+-\d+-\d+$/.test(id)) continue;
    const p = parseConceptId(id);
    units.set(`${p.subject}-${p.unit}`, p);
  }
  const out: Record<string, Concept> = {};
  for (const u of await Promise.all([...units.values()].map((p) => loadUnit(p.subject, p.unit)))) {
    for (const c of u?.concepts ?? []) if (ids.includes(c.id)) out[c.id] = c;
  }
  return out;
}

let authored: Promise<UnitContent[]> | null = null;
const allAuthored = () => (authored ??= Promise.all(Object.values(contentIndex).map((l) => l().then((m) => m.default))));

const words = (s: string) => s.toLowerCase().normalize("NFKC").split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1);
const STOP = new Set(["the", "and", "of", "to", "in", "on", "for", "a", "an", "me", "my", "teach", "learn", "about", "what", "how", "is", "are", "want", "i", "with", "chapter", "class", "book"]);

export interface Hit { kind: "idea" | "chapter" | "book"; id: string; title: string; book: string; chapter?: string; checked: boolean; score: number }

/** The best matches for what the learner asked about, checked material first among equals. */
export async function lookUp(query: string, opts: { stage?: string } = {}): Promise<Hit[]> {
  const q = words(query).filter((w) => !STOP.has(w));
  const classNo = /\bclass\s*(\d{1,2})\b|\bc(\d{1,2})\b/i.exec(query);
  const stage = opts.stage || (classNo ? (Number(classNo[1] ?? classNo[2]) >= 11 ? "hsc" : Number(classNo[1] ?? classNo[2]) >= 9 ? "ssc" : `c${classNo[1] ?? classNo[2]}`) : /\bssc\b/i.test(query) ? "ssc" : /\bhsc\b/i.test(query) ? "hsc" : "");
  const chapterNo = /\bchapter\s*(\d{1,2})\b/i.exec(query);
  if (!q.length && !chapterNo) return [];
  const score = (text: string, weight: number) => {
    const t = new Set(words(text));
    return q.reduce((n, w) => n + (t.has(w) ? weight : [...t].some((x) => x.startsWith(w) && w.length > 3) ? weight / 2 : 0), 0);
  };
  const hits: Hit[] = [];
  // A class named in the request means the national curriculum: only that class's books.
  const stageOk = (s: { stage?: string }) => !stage || s.stage === stage;
  for (const s of subjects) {
    if (!stageOk(s)) continue;
    const bookScore = score(`${s.name} ${s.nameBn ?? ""} ${s.kind ?? ""}`, 3) + (s.stage && s.stage === stage ? 1 : 0);
    if (bookScore > 0 && !chapterNo) hits.push({ kind: "book", id: s.id, title: s.name, book: s.name, checked: false, score: bookScore });
    s.units.forEach((u, i) => {
      const n = i + 1;
      const sc = score(`${u} ${s.unitsBn?.[i] ?? ""}`, 3) + (bookScore > 0 ? 1 : 0) + (chapterNo && Number(chapterNo[1]) === n && bookScore > 0 ? 4 : 0);
      if (sc > 1) hits.push({ kind: "chapter", id: `${s.id}#${n}`, title: u, book: s.name, chapter: s.curriculum ? `Chapter ${n}` : `Unit ${n}`, checked: `${s.id}-${n}` in contentIndex, score: sc });
    });
  }
  for (const u of await allAuthored()) {
    const s = subjectById(u.subject);
    if (!s || !stageOk(s)) continue;
    for (const c of u.concepts) {
      const inTitle = score(c.title, 4);
      const sc = inTitle + score(`${(c.terms ?? c.pairs.map((p) => p.term)).join(" ")} ${c.glossary?.map((g) => g.bn).join(" ") ?? ""}`, 1) + score(s.name, 1);
      // A checked idea is offered only on a real match: a word of its title, or several of its key words. A loose hit would teach the wrong lesson.
      if (inTitle > 0 ? sc > 2 : sc >= 3) hits.push({ kind: "idea", id: c.id, title: c.title, book: s.name, chapter: `${s.curriculum ? "Chapter" : "Unit"} ${u.unit}: ${u.title}`, checked: true, score: sc + 0.5 });
    }
  }
  return hits.sort((a, b) => b.score - a.score || Number(b.checked) - Number(a.checked)).slice(0, 6);
}

/** One authored idea as teaching material. */
export function lessonText(c: Concept): string {
  const parts = [
    `IDEA ${c.id}: ${c.title}`,
    `Why it matters: ${c.hook}`,
    `Steps:\n${c.steps.map((s, i) => `${i + 1}. ${s.label}: ${s.text}`).join("\n")}`,
    `Everyday comparison: ${c.analogy}`,
    `Precise explanation:\n${c.deepRead.join("\n")}`,
    `Key points:\n${c.keyPoints.map((k) => `- ${k}`).join("\n")}`,
    `Common mistake: people believe "${c.misconception.belief}" ${c.misconception.correction}`,
    `Key words for the explain-back: ${(c.terms ?? c.pairs.map((p) => p.term)).join(", ")}`,
  ];
  if (c.sayPrompt) parts.push(`Explain-back prompt: ${c.sayPrompt}`);
  if (c.glossary?.length) parts.push(`Bangla terms: ${c.glossary.map((g) => `${g.term} = ${g.bn}`).join("; ")}`);
  parts.push(`Example problem (tryIt shows it; do not reveal its answer first): ${c.example.question}`);
  return parts.join("\n");
}

/** A chapter or unit: its ideas in teaching order when written, and its creative question when it has one. */
export async function chapterText(subject: string, unit: number): Promise<string> {
  const s = subjectById(subject);
  if (!s || unit < 1 || unit > s.units.length) return `There is no ${subject} unit ${unit}.`;
  const label = s.curriculum ? `${s.name}${bdStage(s.stage)?.label ? `, ${bdStage(s.stage)!.label}` : ""}, chapter ${unit}` : `${s.name}, unit ${unit}`;
  const u = await loadUnit(subject, unit);
  if (!u) {
    return `${label}: "${s.units[unit - 1]}"${s.unitsBn?.[unit - 1] ? ` (${s.unitsBn[unit - 1]})` : ""}. Not written as checked lessons yet: teach it from your own knowledge of this topic at this level, carefully (rule on facts you are unsure of), and save each idea you teach with learned (own).`;
  }
  const lines = [`${label}: "${u.title}"${u.titleBn ? ` (${u.titleBn})` : ""}. ${u.summary}`, `Ideas in teaching order (open each with lesson):`, ...u.concepts.map((c, i) => `${i + 1}. ${c.id}: ${c.title}`)];
  if (u.cq) {
    lines.push(
      `Creative question (board style), for the end of the chapter:`,
      `Scenario: ${u.cq.stem}`,
      `ka (1 mark): ${u.cq.knowledge.q}\n   Accepted answer: ${u.cq.knowledge.a}`,
      `kha (2 marks): ${u.cq.comprehension.q}\n   Accepted answer: ${u.cq.comprehension.a}`,
      `ga (3 marks): ${u.cq.application.q}\n   Accepted answer: ${u.cq.application.a}`,
      `gha (4 marks): ${u.cq.higherOrder.q}\n   Accepted answer: ${u.cq.higherOrder.a}`,
    );
  }
  return lines.join("\n");
}

/** Titles of authored ideas, for the brief's memory summary (the browser only sends ids). */
export async function titlesFor(ids: string[]): Promise<Record<string, string>> {
  const concepts = await loadConcepts(ids);
  return Object.fromEntries(Object.entries(concepts).map(([id, c]) => [id, c.title]));
}
