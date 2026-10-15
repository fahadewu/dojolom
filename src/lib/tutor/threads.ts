// ─── The learner's conversations ─────────────────────────────────────────────
// The whole app is a conversation with the tutor; a learner can keep several
// (one per topic, or one a day), listed in the sidebar. Kept on this device
// only. Pure functions plus a small browser store.

import { AUTO_TOOLS, type TutorToolName, type TutorUIMessage } from "@/lib/tutor/tools";

export interface Thread { id: string; title: string; createdAt: number; updatedAt: number; messages: TutorUIMessage[] }

const KEY = "dojolom.chats";
export const MAX_THREADS = 30;
const MAX_SAVED = 120;

export function newThread(now: number): Thread {
  return { id: `t${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, title: "New conversation", createdAt: now, updatedAt: now, messages: [] };
}

/** What a new conversation opens with: never shown, it lets the tutor speak first. */
export const KICKOFF_TEXT = "(The learner opened the conversation.)";

export const isKickoff = (m: TutorUIMessage) => m.role === "user" && (m.metadata as { kickoff?: boolean } | undefined)?.kickoff === true;

/** What the learner first asked about, as the conversation's name. */
export function titleOf(messages: TutorUIMessage[], fallback = "New conversation"): string {
  for (const m of messages) {
    if (m.role !== "user" || isKickoff(m)) continue;
    const t = m.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ").replace(/\s+/g, " ").trim();
    if (t) return t.length > 42 ? `${t.slice(0, 40).trimEnd()}…` : t;
  }
  return fallback;
}

/**
 * Messages safe to resume from: a turn cut off mid-stream, or one whose
 * automatic tool calls were never answered, is dropped so the next turn starts cleanly.
 */
export function resumable(messages: TutorUIMessage[]): TutorUIMessage[] {
  const out = [...messages];
  while (out.length) {
    const last = out[out.length - 1];
    if (last.role !== "assistant") break;
    const broken = last.parts.some((p) => {
      if (!p.type.startsWith("tool-")) return false;
      const state = (p as { state?: string }).state;
      return state === "input-streaming" || (state === "input-available" && AUTO_TOOLS.includes(p.type.slice(5) as TutorToolName));
    });
    if (!broken) break;
    out.pop();
  }
  return out;
}

export function loadThreads(): Thread[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Thread[];
    return Array.isArray(raw) ? raw.filter((t) => t && typeof t.id === "string" && Array.isArray(t.messages)).map((t) => ({ ...t, messages: resumable(t.messages) })).sort((a, b) => b.updatedAt - a.updatedAt) : [];
  } catch { return []; }
}

export function saveThreads(threads: Thread[]) {
  const kept = [...threads].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_THREADS).map((t) => ({ ...t, messages: t.messages.slice(-MAX_SAVED) }));
  try { localStorage.setItem(KEY, JSON.stringify(kept)); } catch {}
}

export function clearThreads() {
  try { localStorage.removeItem(KEY); } catch {}
}
