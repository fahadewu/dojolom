// A tiny clock seam. The study engine is pure and takes timestamps as inputs;
// the UI reads the current time through here so tests can pin "now" by setting
// localStorage["dojolom.clock"] to a millisecond timestamp before loading a page.

export const CLOCK_KEY = "dojolom.clock";

export function nowMs(): number {
  try {
    const pinned = typeof localStorage !== "undefined" ? localStorage.getItem(CLOCK_KEY) : null;
    if (pinned && /^\d+$/.test(pinned)) return Number(pinned);
  } catch {}
  return Date.now();
}

export type DayKey = string; // "YYYY-MM-DD" in the learner's local time

/** A well-formed local day key that maps to a real date. */
export function isDayKey(v: unknown): v is DayKey {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  const date = new Date(y, m - 1, d, 12);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function dayKey(ms: number): DayKey {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function dayKeyToMs(key: DayKey): number {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12).getTime(); // noon avoids DST edge cases when adding days
}

export function addDays(key: DayKey, n: number): DayKey {
  const d = new Date(dayKeyToMs(key));
  d.setDate(d.getDate() + n);
  return dayKey(d.getTime());
}

/** Whole calendar days from a to b (positive when b is later). */
export function daysBetween(a: DayKey, b: DayKey): number {
  return Math.round((dayKeyToMs(b) - dayKeyToMs(a)) / 86_400_000);
}
