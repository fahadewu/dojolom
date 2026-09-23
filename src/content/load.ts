// Lazy loading of authored units through the generated content index, plus a
// React hook. A learner only downloads the units of the subjects they study.
import { useCallback, useEffect, useState } from "react";
import { contentIndex } from "./index";
import type { Concept, UnitContent } from "./types";
import { parseConceptId, UNITS_PER_SUBJECT } from "@/lib/study";

const cache = new Map<string, Promise<UnitContent>>();

export function unitKey(subject: string, unit: number) {
  return `${subject}-${unit}`;
}

export function isAuthored(subject: string, unit: number) {
  return unitKey(subject, unit) in contentIndex;
}

export function authoredUnitsFor(subject: string): number[] {
  const out: number[] = [];
  for (let u = 1; u <= UNITS_PER_SUBJECT; u++) if (isAuthored(subject, u)) out.push(u);
  return out;
}

export function loadUnit(subject: string, unit: number): Promise<UnitContent> {
  const key = unitKey(subject, unit);
  const loader = contentIndex[key];
  if (!loader) return Promise.reject(new Error(`Unit ${key} is not authored yet`));
  let p = cache.get(key);
  if (!p) {
    p = loader().then((m) => m.default).catch((err) => { cache.delete(key); throw err; });
    cache.set(key, p);
  }
  return p;
}

export function loadSubject(subject: string): Promise<UnitContent[]> {
  return Promise.all(authoredUnitsFor(subject).map((u) => loadUnit(subject, u)));
}

/** Loads whatever units the given concept ids live in and returns the concepts by id. */
export async function loadConcepts(ids: string[]): Promise<Record<string, Concept>> {
  const keys = new Set(ids.map((id) => { const p = parseConceptId(id); return unitKey(p.subject, p.unit); }));
  const units = await Promise.all([...keys].map((k) => { const [subject, unit] = splitKey(k); return loadUnit(subject, unit); }));
  const out: Record<string, Concept> = {};
  for (const u of units) for (const c of u.concepts) if (ids.includes(c.id)) out[c.id] = c;
  return out;
}

function splitKey(key: string): [string, number] {
  const i = key.lastIndexOf("-");
  return [key.slice(0, i), Number(key.slice(i + 1))];
}

export function conceptFrom(units: UnitContent[] | null | undefined, id: string): Concept | undefined {
  if (!units) return undefined;
  for (const u of units) { const c = u.concepts.find((x) => x.id === id); if (c) return c; }
  return undefined;
}

export interface Loaded<T> { data: T | null; error: boolean; retry: () => void }

interface Result<T> { key: string; data: T | null; error: boolean }

/* Shared shape for the two loader hooks: state only changes inside promise
   callbacks, and a result for a stale key simply reads as "still loading". */
function useLoader<T>(key: string, load: (key: string) => Promise<T>): Loaded<T> {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<T>>({ key: "", data: null, error: false });
  const fullKey = `${key}#${attempt}`;
  useEffect(() => {
    let live = true;
    load(key)
      .then((data) => { if (live) setResult({ key: fullKey, data, error: false }); })
      .catch(() => { if (live) setResult({ key: fullKey, data: null, error: true }); });
    return () => { live = false; };
  }, [key, fullKey, load]);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  const fresh = result.key === fullKey;
  return { data: fresh ? result.data : null, error: fresh ? result.error : false, retry };
}

const loadConceptsByKey = (key: string) => (key ? loadConcepts(key.split(",")) : Promise.resolve({} as Record<string, Concept>));

/** Loads the concepts behind a set of ids (any subjects). Re-fetches when the ids change. */
export function useConcepts(ids: string[]): Loaded<Record<string, Concept>> {
  return useLoader(ids.join(","), loadConceptsByKey);
}

export function useSubjectUnits(subject: string): Loaded<UnitContent[]> {
  return useLoader(subject, loadSubject);
}
