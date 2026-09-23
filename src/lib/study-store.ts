// Browser-side store for the study state: one module-level copy, persisted on
// every change, shared across components with useSyncExternalStore, and kept in
// step with other tabs through the storage event.
import { useEffect, useState, useSyncExternalStore } from "react";
import { buildProfile, loadLearner, styleQuestions, type LearnerInput, type LearnerProfile } from "@/lib/learning";
import { emptyStudy, expireStale, loadStudy, saveStudy, STUDY_KEY, touch, type StudyState } from "@/lib/study";
import { nowMs } from "@/lib/clock";

let cache: StudyState | null = null;
const listeners = new Set<() => void>();

function read(): StudyState {
  if (cache === null) cache = expireStale(loadStudy(), nowMs());
  return cache;
}

function notify() { listeners.forEach((l) => l()); }

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STUDY_KEY || e.key === null) { cache = loadStudy(); notify(); }
  };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
}

export type Update = (fn: (s: StudyState) => StudyState) => void;

export function updateStudy(fn: (s: StudyState) => StudyState) {
  const next = fn(read());
  if (next === cache) return;
  cache = next;
  saveStudy(next);
  notify();
}

export function resetStudyStore() {
  cache = emptyStudy;
  saveStudy(emptyStudy);
  notify();
}

export function replaceStudy(state: StudyState) {
  cache = state;
  saveStudy(state);
  notify();
}

export function useStudy(): [StudyState, Update] {
  const state = useSyncExternalStore(subscribe, read, () => emptyStudy);
  return [state, updateStudy];
}

/** Current time in ms. Refreshes when the tab becomes visible again and every half minute, so an open tab rolls over at midnight. */
export function useNow(): number {
  const [now, setNow] = useState(() => nowMs());
  useEffect(() => {
    const tick = () => setNow(nowMs());
    const id = setInterval(tick, 30_000);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", tick); };
  }, []);
  useEffect(() => { updateStudy((s) => touch(s, now)); }, [now]);
  return now;
}

export interface LearnerBundle { learner: LearnerInput; profile: LearnerProfile }

export function learnerComplete(l: LearnerInput | null): l is LearnerInput {
  return !!l && Object.keys(l.answers).length === styleQuestions.length && l.subjects.length > 0 && l.age !== "";
}

let learnerCache: LearnerBundle | null | undefined;
function readLearner(): LearnerBundle | null {
  if (learnerCache === undefined) {
    const l = loadLearner();
    learnerCache = learnerComplete(l) ? { learner: l, profile: buildProfile(l) } : null;
  }
  return learnerCache;
}
function subscribeLearner(cb: () => void) {
  const onStorage = (e: StorageEvent) => { if (e.key === "dojolom.learner" || e.key === null) { learnerCache = undefined; cb(); } };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
/** Forget the cached learner after this tab changes it (the wizard calls this on save). */
export function invalidateLearner() { learnerCache = undefined; }

/** The saved learner and their profile, or null when onboarding is incomplete. Client only. */
export function useLearner(): LearnerBundle | null {
  return useSyncExternalStore(subscribeLearner, readLearner, () => null);
}

const noop = () => () => {};
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);
}
