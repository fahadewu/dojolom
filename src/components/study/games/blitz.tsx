"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Fire, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mulberry32, shuffle } from "@/lib/study";
import type { GameProps } from "./types";

interface Item { conceptId: string; statement: string; truth: boolean; why: string }

/* True or false: one statement at a time, two big buttons, an optional timer
   for answering only. Feedback always waits for Next, so the clock never
   rushes the explanation. */
export default function BlitzGame({ concepts, support, seed, motion, largeTargets, onAnswer, onComplete }: GameProps) {
  const items = useMemo<Item[]>(() => {
    const list: Item[] = [];
    concepts.forEach((c, ci) => {
      const take = ci === 0 ? c.blitz : c.blitz.slice(0, 2);
      take.forEach((b) => list.push({ conceptId: c.id, ...b }));
    });
    return shuffle(list, mulberry32(seed));
  }, [concepts, seed]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null); // learner's call
  const [timedOut, setTimedOut] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [remaining, setRemaining] = useState(1); // 0..1 of the timer
  const [finished, setFinished] = useState(false);
  const completed = useRef(false);

  const item = items[index];
  const answered = picked !== null || timedOut;
  const seconds = support.blitzSeconds;

  const settle = useCallback((call: boolean | null) => {
    if (answered || !item) return;
    const correct = call !== null && call === item.truth;
    if (call === null) setTimedOut(true); else setPicked(call);
    onAnswer(item.conceptId, correct);
    if (correct) {
      setCorrectCount((n) => n + 1);
      setStreak((s) => { const next = s + 1; setBestStreak((b) => Math.max(b, next)); return next; });
    } else {
      setStreak(0);
    }
  }, [answered, item, onAnswer]);

  // Timer for answering. Linear, 100ms ticks; absent when untimed.
  useEffect(() => {
    if (seconds === null || answered || !item) return;
    const started = performance.now();
    const total = seconds * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, 1 - (performance.now() - started) / total);
      setRemaining(left);
      if (left <= 0) { clearInterval(id); settle(null); }
    }, 100);
    return () => clearInterval(id);
  }, [seconds, answered, item, settle]);

  // Keyboard: T / F, arrow left / right.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (answered || finished) return;
      const k = e.key.toLowerCase();
      if (k === "t" || k === "arrowleft") settle(true);
      if (k === "f" || k === "arrowright") settle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, finished, settle]);

  function next() {
    if (index + 1 >= items.length) {
      setFinished(true);
      if (!completed.current) {
        completed.current = true;
        const accuracy = items.length ? correctCount / items.length : 0;
        onComplete({ score: Math.min(100, Math.round(100 * accuracy) + Math.min(10, 2 * bestStreak)), accuracy, finished: true });
      }
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setTimedOut(false);
    setRemaining(1);
  }

  if (finished) {
    return (
      <div data-testid="game-blitz" className="flex flex-col gap-5">
        <div className="surface rounded-2xl p-5 m-pop" data-testid="game-summary">
          <p className="font-semibold">{correctCount} of {items.length} right. Best streak {bestStreak}.</p>
        </div>
      </div>
    );
  }

  const correct = picked !== null && picked === item.truth;
  const isKid = largeTargets;

  return (
    <div data-testid="game-blitz" className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">Statement {index + 1} of {items.length}</p>
        {streak >= 2 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-soft text-sun-deep px-3 py-1 text-sm font-semibold">
            <Fire size={16} weight="fill" className={cn(motion === "lively" && "m-pulse")} />
            Streak {streak}
          </span>
        )}
      </div>

      <div key={index} className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-6 m-enter">
        {seconds !== null && !answered && (
          <div className="h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden>
            <span className="block h-full rounded-full bg-focus" style={{ width: `${remaining * 100}%` }} />
          </div>
        )}
        <p className="font-display text-2xl font-semibold leading-snug" data-testid="statement">{item.statement}</p>
        <div className="flex gap-3">
          {[true, false].map((call) => {
            const chosen = picked === call;
            const isRight = call === item.truth;
            return (
              <Button
                key={String(call)}
                type="button"
                size="lg"
                variant="outline"
                disabled={answered}
                data-testid={call ? "answer-true" : "answer-false"}
                onClick={() => settle(call)}
                className={cn(
                  "tap flex-1 text-base",
                  isKid && "h-16 text-lg",
                  answered && isRight && "bg-sprout text-white border-sprout hover:bg-sprout disabled:opacity-100",
                  answered && chosen && !isRight && "m-flash-ember text-muted-foreground",
                  answered && !chosen && !isRight && "text-muted-foreground/60"
                )}
              >
                {call ? "True" : "False"}
                {answered && isRight && <Check size={18} weight="bold" />}
                {answered && chosen && !isRight && <X size={18} weight="bold" className="text-ember" />}
              </Button>
            );
          })}
        </div>
        <div aria-live="polite">
          {answered && (
            <div className="m-enter rounded-2xl bg-muted/80 p-5 text-[15px] leading-7">
              <p>
                <span className="font-semibold">{timedOut ? "Time ran out. " : correct ? "Right. " : "Not quite. "}</span>
                {item.why}
              </p>
            </div>
          )}
        </div>
        {answered && (
          <div className="flex justify-end">
            <Button onClick={next} data-testid="next">{index + 1 >= items.length ? "Finish" : "Next"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
