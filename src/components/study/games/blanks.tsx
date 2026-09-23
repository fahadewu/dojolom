"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { games, mulberry32, shuffle } from "@/lib/study";
import type { GameProps } from "./types";

/* Fill the gap: one sentence at a time with a single "___", three word chips
   below it. Both blanks from today's concept come first, then both from each
   earlier concept, all shuffled from the session seed so a reload replays the
   same round. */

interface Item {
  conceptId: string;
  sentence: string;
  options: string[]; // shuffled
  answer: string;    // the correct option's text
}

export default function BlanksGame(props: GameProps) {
  const { concepts, seed, support, largeTargets, motion, onAnswer, onComplete } = props;

  const items = useMemo<Item[]>(() => {
    const raw: Item[] = concepts.flatMap((c) =>
      c.blanks.map((b) => ({ conceptId: c.id, sentence: b.sentence, options: b.options, answer: b.options[b.answer] ?? "" })),
    );
    return shuffle(raw, mulberry32(seed)).map((it, i) => ({
      ...it,
      options: shuffle(it.options, mulberry32(seed + i + 1)),
    }));
  }, [concepts, seed]);

  const n = items.length;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null); // index into the shuffled options
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const completedRef = useRef(false);

  const finished = done || n === 0;

  function complete(correct: number) {
    if (completedRef.current) return;
    completedRef.current = true;
    const accuracy = n ? correct / n : 0;
    onComplete({ score: Math.round(100 * accuracy), accuracy, finished: true });
  }

  // Content always carries two blanks per concept; this only guards a stuck screen if it ever does not.
  useEffect(() => {
    if (n === 0) complete(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const item = items[index];
  const wasCorrect = picked !== null && item !== undefined && item.options[picked] === item.answer;

  function choose(optionIndex: number) {
    if (picked !== null || !item) return;
    const correct = item.options[optionIndex] === item.answer;
    setPicked(optionIndex);
    if (correct) setCorrectCount((c) => c + 1);
    onAnswer(item.conceptId, correct);
  }

  function next() {
    if (picked === null) return;
    if (index + 1 < n) {
      setIndex(index + 1);
      setPicked(null);
    } else {
      setDone(true);
      complete(correctCount);
    }
  }

  const gameTint = tint[games.blanks.colour];

  if (finished) {
    return (
      <div data-testid="game-blanks" data-motion={motion} className="flex flex-col gap-5">
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop flex items-center gap-4">
          <span className={cn("size-11 shrink-0 rounded-full inline-flex items-center justify-center", gameTint.chip)} aria-hidden>
            <Check size={22} weight="bold" />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-muted-foreground">{games.blanks.name}</p>
            <p className="font-display text-xl font-semibold leading-snug">{`${correctCount} of ${n} gaps filled right.`}</p>
          </div>
        </div>
      </div>
    );
  }

  const at = item.sentence.indexOf("___");
  const before = at === -1 ? item.sentence : item.sentence.slice(0, at);
  const after = at === -1 ? "" : item.sentence.slice(at + 3);
  const last = index + 1 === n;

  return (
    <div data-testid="game-blanks" data-motion={motion} className="flex flex-col gap-5">
      <section key={index} className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-6 m-enter">
        <header className="flex items-center justify-between gap-4 text-sm font-semibold text-muted-foreground">
          <p>{`Sentence ${index + 1} of ${n}`}</p>
          <p className="inline-flex items-center gap-2">
            <span className={cn("size-2 rounded-full", gameTint.bar)} aria-hidden />
            {games.blanks.name}
          </p>
        </header>

        <p className="font-display text-2xl font-semibold leading-snug">
          {before}
          <span data-testid="gap" className="inline-block min-w-[5ch] border-b-2 border-focus/60 align-baseline text-center">
            {picked === null ? (
              support.rung === 0 ? (
                <span className="text-muted-foreground">{`${item.answer.charAt(0)}…`}</span>
              ) : (
                " "
              )
            ) : (
              <span className={cn("inline-block", wasCorrect ? "text-sprout m-pop" : "text-foreground")}>{item.answer}</span>
            )}
          </span>
          {after}
        </p>

        <div className="flex flex-wrap gap-3">
          {item.options.map((option, i) => {
            const isCorrectChip = option === item.answer;
            const isPicked = picked === i;
            const answered = picked !== null;
            return (
              <button
                key={`${index}-${i}`}
                type="button"
                data-testid="option"
                disabled={answered}
                onClick={() => choose(i)}
                className={cn(
                  "tap rounded-full border border-input bg-card px-5 py-3 text-[16px] font-semibold text-foreground",
                  "transition-[border-color,background-color,color,opacity,box-shadow,transform] duration-200 outline-none select-none",
                  "focus-visible:ring-4 focus-visible:ring-focus/20 disabled:cursor-default",
                  largeTargets && "min-h-[56px] text-[17px]",
                  !answered && "hover:border-foreground/35 active:scale-[0.985]",
                  answered && isPicked && isCorrectChip && "bg-sprout text-white border-sprout",
                  answered && isPicked && !isCorrectChip && "m-flash-ember opacity-50 line-through",
                  answered && !isPicked && isCorrectChip && "border-sprout ring-4 ring-sprout/12",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 min-h-11">
          <p aria-live="polite" className={cn("text-[15px] font-semibold inline-flex items-center gap-2", wasCorrect ? "text-sprout" : "text-foreground")}>
            {picked !== null && (wasCorrect ? (
              <>
                <Check size={16} weight="bold" aria-hidden />
                Right.
              </>
            ) : (
              `Not quite. The word is ${item.answer}.`
            ))}
          </p>
          {picked !== null && (
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
