// ─── Ideas taught outside the checked lessons ────────────────────────────────
// The tutor teaches any topic. When it teaches one Dojolom has no authored
// lesson for, it saves the idea with a key point and one multiple-choice check
// it wrote while the idea was fresh. The idea then joins the learner's memory
// (FSRS, keyed by its id like any other idea) and comes back for review, marked
// against that stored key, never re-judged by the model. A learner who thinks
// the stored check is wrong can flag it: it is then never asked again.
// Kept on this device. Pure functions plus a small browser store.

export interface OwnCheck { question: string; options: string[]; answer: number; why: string }
export interface OwnIdea { id: string; title: string; topic: string; keyPoint: string; check: OwnCheck; on: string; flagged?: boolean }

export const OWN_PREFIX = "own-";
export const isOwnId = (id: string) => id.startsWith(OWN_PREFIX);

const clip = (s: unknown, n: number) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim().slice(0, n) : "");

/** A check that can be marked: a question, three or four distinct options, one valid answer. Null when it cannot be. */
export function cleanCheck(c: unknown): OwnCheck | null {
  if (!c || typeof c !== "object") return null;
  const r = c as Record<string, unknown>;
  const question = clip(r.question, 240);
  const options = Array.isArray(r.options) ? r.options.map((o) => clip(o, 120)).filter(Boolean) : [];
  const answer = typeof r.answer === "number" ? r.answer : -1;
  if (!question || options.length < 3 || options.length > 4 || new Set(options.map((o) => o.toLowerCase())).size !== options.length) return null;
  if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) return null;
  return { question, options, answer, why: clip(r.why, 240) };
}

function slug(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "idea";
}

/** A new own idea, or null when what the tutor gave cannot be checked. Its id never ends in -<n>-<n> (that shape is an authored concept). */
export function makeOwnIdea(input: { title?: unknown; topic?: unknown; keyPoint?: unknown; check?: unknown }, on: string, taken: (id: string) => boolean): OwnIdea | null {
  const title = clip(input.title, 80);
  const keyPoint = clip(input.keyPoint, 240);
  const check = cleanCheck(input.check);
  if (!title || !keyPoint || !check) return null;
  let id = `${OWN_PREFIX}${slug(title)}`;
  for (let n = 2; taken(id); n++) id = `${OWN_PREFIX}${slug(title)}-v${n}`;
  return { id, title, topic: clip(input.topic, 60) || title, keyPoint, check, on };
}

const KEY = "dojolom.ideas";

export function loadOwnIdeas(): Record<string, OwnIdea> {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, OwnIdea>;
    const out: Record<string, OwnIdea> = {};
    for (const [id, i] of Object.entries(raw)) {
      const check = cleanCheck(i?.check);
      if (isOwnId(id) && check && typeof i.title === "string") out[id] = { ...i, id, check };
    }
    return out;
  } catch { return {}; }
}

export function saveOwnIdea(idea: OwnIdea) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...loadOwnIdeas(), [idea.id]: idea })); } catch {}
}

export function flagOwnIdea(id: string) {
  const all = loadOwnIdeas();
  if (!all[id]) return;
  try { localStorage.setItem(KEY, JSON.stringify({ ...all, [id]: { ...all[id], flagged: true } })); } catch {}
}
