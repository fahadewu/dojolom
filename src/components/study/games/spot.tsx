"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { games } from "@/lib/study";
import { visualUrl } from "@/lib/visuals";
import { buildSpotRound } from "@/lib/spot";
import type { GameProps } from "./types";

/* Spot it: one illustration of a term, four terms below it, tap the one the
   picture shows. Three pictures from today's idea and one from each earlier
   idea; the wrong options come from the same pool, so every distractor is a
   real term the learner has met. Only offered when the pictures exist. */

export default function SpotGame(props: GameProps) {
  const roundKey = `${props.seed}:${props.concepts.map((c) => c.id).join(",")}`;
  return <SpotRound key={roundKey} {...props} />;
}

function SpotRound({ concepts, seed, motion, largeTargets, onAnswer, onComplete }: GameProps) {
  const items = useMemo(() => buildSpotRound(concepts, seed), [concepts, seed]);
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const completed = useRef(false);
  const colour = tint[games.spot.colour];

  function complete(correct: number) {
    if (completed.current) return;
    completed.current = true;
    const accuracy = n ? correct / n : 0;
    onComplete({ score: Math.round(100 * accuracy), accuracy, finished: true });
  }

  // Nothing pictured: report an empty round once rather than leave the segment stuck.
  useEffect(() => {
    if (n === 0) complete(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (n === 0) {
    return (
      <div data-testid="game-spot" className="flex flex-col gap-5">
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop"><p className="font-semibold">No pictures for these ideas yet.</p></div>
      </div>
    );
  }

  if (done) {
    return (
      <div data-testid="game-spot" data-motion={motion} className="flex flex-col gap-5">
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop flex items-center gap-4">
          <span className={cn("size-11 shrink-0 rounded-full inline-flex items-center justify-center", colour.chip)} aria-hidden><Check size={22} weight="bold" /></span>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-muted-foreground">{games.spot.name}</p>
            <p className="font-display text-xl font-semibold leading-snug">{correctCount} of {n} pictures spotted.</p>
          </div>
        </div>
      </div>
    );
  }

  const item = items[index];
  const answered = picked !== null;
  const wasCorrect = picked === item.term;
  const last = index + 1 === n;

  function choose(term: string) {
    if (answered) return;
    const correct = term === item.term;
    setPicked(term);
    if (correct) setCorrectCount((c) => c + 1);
    onAnswer(item.conceptId, correct);
  }

  function next() {
    if (!answered) return;
    if (last) { setDone(true); complete(correctCount); return; }
    setIndex(index + 1);
    setPicked(null);
  }

  return (
    <div data-testid="game-spot" data-motion={motion} className="flex flex-col gap-5">
      <section key={index} className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-6 m-enter">
        <header className="flex items-center justify-between gap-4 text-sm font-semibold text-muted-foreground">
          <p>Picture {index + 1} of {n}</p>
          <p className="inline-flex items-center gap-2"><span className={cn("size-2 rounded-full", colour.bar)} aria-hidden />{games.spot.name}</p>
        </header>

        <figure className="flex flex-col items-center gap-3">
          {/* The alt names the meaning, not the term, so a screen reader plays the same game sighted learners do. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visualUrl(item.visual.src)}
            alt={answered ? item.term : `Picture of: ${item.meaning}`}
            width={item.visual.w}
            height={item.visual.h}
            data-testid="spot-picture"
            className="aspect-square w-full max-w-[320px] rounded-[20px] bg-muted object-cover shadow-[var(--shadow-hairline)]"
          />
          {answered && <figcaption className="text-[15px] text-muted-foreground text-center m-enter">{item.meaning}</figcaption>}
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Which term does the picture show?">
          {item.options.map((option) => {
            const isRight = option === item.term;
            const isPicked = picked === option;
            return (
              <button
                key={option}
                type="button"
                data-testid="spot-option"
                data-state={!answered ? "idle" : isRight ? "right" : isPicked ? "wrong" : "dim"}
                disabled={answered}
                onClick={() => choose(option)}
                className={cn(
                  "tap flex min-h-14 items-center justify-center rounded-2xl border border-input bg-card px-4 py-3 text-center text-[16px] font-semibold leading-snug outline-none",
                  "transition-[border-color,background-color,color,opacity,box-shadow] duration-200 focus-visible:ring-4 focus-visible:ring-focus/20 disabled:cursor-default",
                  largeTargets && "min-h-[64px] text-[17px]",
                  !answered && "hover:border-foreground/35",
                  answered && isRight && "border-sprout bg-sprout text-white",
                  answered && isPicked && !isRight && "m-flash-ember opacity-60 line-through",
                  answered && !isPicked && !isRight && "opacity-50",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 min-h-11">
          <p aria-live="polite" className={cn("text-[15px] font-semibold inline-flex items-center gap-2", wasCorrect ? "text-sprout" : "text-foreground")}>
            {answered && (wasCorrect ? (<><Check size={16} weight="bold" aria-hidden /> Right.</>) : `Not quite. This is ${item.term}.`)}
          </p>
          {answered && (
            <Button data-testid="next" onClick={next} className="m-enter">
              {last ? "Finish" : "Next"}
              {last ? <Check size={16} weight="bold" /> : <ArrowRight size={16} weight="bold" />}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
