"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUp, Check, Lock } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { games, mulberry32, shuffle } from "@/lib/study";
import type { Concept } from "@/content/types";
import type { GameProps } from "./types";

/* Put it in order. The steps of a concept arrive shuffled and the learner
   restores the sequence, either by tapping two rows to swap them or with the
   arrow buttons on each row. There is no drag, so a keyboard alone is enough.
   Rows are keyed by the step they hold, so a row's DOM node (and any focus
   inside it) travels with the step when it moves. */

const MAX_ROUNDS = 2;
const STAGGER_MS = 40;

type Status = "arranging" | "retry" | "solved" | "revealed";

interface RoundState {
  index: number;           // into rounds
  slots: number[];         // slots[i] = the step (its correct position) shown in slot i
  selected: number | null; // slot picked for a tap-to-swap
  status: Status;
  confirmed: number[];     // steps that sat in the right slot at the last check
  wrong: number[];         // steps that did not, for the coral flash
}

interface RoundResult { score: number; correct: boolean }

function identity(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

/** Shuffling the step indices gives the same permutation `shuffle(items, rng)` would. */
function startingSlots(count: number, seed: number, preplaced: boolean): number[] {
  const fixed = preplaced && count > 1 ? 1 : 0;
  const free = identity(count).slice(fixed);
  let mixed = shuffle(free, mulberry32(seed));
  // A shuffle that lands on the answer would make the round trivial: rotate it by one.
  if (mixed.length > 1 && mixed.every((v, i) => v === free[i])) mixed = [...mixed.slice(1), mixed[0]];
  return [...identity(fixed), ...mixed];
}

function freshRound(index: number, concept: Concept, seed: number, preplaced: boolean): RoundState {
  return {
    index,
    slots: startingSlots(concept.order.items.length, seed + index, preplaced),
    selected: null,
    status: "arranging",
    confirmed: [],
    wrong: [],
  };
}

const emptyRound: RoundState = { index: 0, slots: [], selected: null, status: "arranging", confirmed: [], wrong: [] };

export default function OrderGame(props: GameProps) {
  const { concepts, support, seed, largeTargets, onComplete } = props;
  const preplaced = support.orderPreplaced;
  const rounds = useMemo(
    () => concepts.filter((c) => c.order && c.order.items.length >= 2).slice(0, MAX_ROUNDS),
    [concepts],
  );

  const [round, setRound] = useState<RoundState>(() => (rounds.length ? freshRound(0, rounds[0], seed, preplaced) : emptyRound));
  const [results, setResults] = useState<RoundResult[]>([]);
  const completed = useRef(false);
  const arrows = useRef(new Map<string, HTMLButtonElement>());
  const lastMove = useRef<{ step: number; dir: "up" | "down" } | null>(null);
  const uid = useId();

  // No concept carried a sequence: nothing to play, report an empty round once.
  useEffect(() => {
    if (rounds.length || completed.current) return;
    completed.current = true;
    onComplete({ score: 0, accuracy: 0, finished: true });
  }, [rounds.length, onComplete]);

  // When an arrow press moves a row to an end, that arrow becomes disabled and
  // would drop focus. Hand focus to the row's other arrow so the keyboard user
  // stays on the same step.
  useEffect(() => {
    const m = lastMove.current;
    if (!m) return;
    lastMove.current = null;
    const pressed = arrows.current.get(`${m.step}:${m.dir}`);
    if (pressed?.disabled) arrows.current.get(`${m.step}:${m.dir === "up" ? "down" : "up"}`)?.focus();
  }, [round]);

  const concept = rounds[round.index];
  if (!concept) {
    return (
      <div data-testid="game-order" data-motion={props.motion} className="flex flex-col gap-5">
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop">
          <p className="font-display text-lg font-semibold">Nothing to put in order yet.</p>
        </div>
      </div>
    );
  }

  const items = concept.order.items;
  const n = items.length;
  const lo = preplaced && n > 1 ? 1 : 0; // first movable slot
  const live = round.status === "arranging" || round.status === "retry";
  const done = !live;
  const last = round.index === rounds.length - 1;
  const body = largeTargets ? "text-[17px]" : "text-[15px]";

  function finish(all: RoundResult[]) {
    if (completed.current) return;
    completed.current = true;
    const score = Math.round(all.reduce((sum, r) => sum + r.score, 0) / all.length);
    const right = all.filter((r) => r.correct).length;
    onComplete({ score, accuracy: right / all.length, finished: true });
  }

  function resolve(next: RoundState, result: RoundResult) {
    const all = [...results, result];
    setRound(next);
    setResults(all);
    if (all.length === rounds.length) finish(all);
  }

  function select(i: number) {
    if (!live || i < lo) return;
    setRound((r) => {
      if (r.selected === null) return { ...r, selected: i };
      if (r.selected === i) return { ...r, selected: null };
      const slots = [...r.slots];
      [slots[r.selected], slots[i]] = [slots[i], slots[r.selected]];
      return { ...r, slots, selected: null };
    });
  }

  function move(i: number, dir: "up" | "down") {
    const j = dir === "up" ? i - 1 : i + 1;
    if (!live || i < lo || j < lo || j >= n) return;
    lastMove.current = { step: round.slots[i], dir };
    setRound((r) => {
      const slots = [...r.slots];
      [slots[i], slots[j]] = [slots[j], slots[i]];
      return { ...r, slots, selected: null };
    });
  }

  function check() {
    if (!live) return;
    const confirmed = round.slots.filter((step, i) => step === i);
    const wrong = round.slots.filter((step, i) => step !== i);
    if (wrong.length === 0) {
      props.onAnswer(concept.id, true);
      resolve(
        { ...round, selected: null, status: "solved", confirmed, wrong: [] },
        { score: round.status === "arranging" ? 100 : 60, correct: true },
      );
    } else if (round.status === "arranging") {
      setRound({ ...round, selected: null, status: "retry", confirmed, wrong });
    } else {
      props.onAnswer(concept.id, false);
      resolve(
        { ...round, slots: identity(n), selected: null, status: "revealed", confirmed: identity(n), wrong: [] },
        { score: 20, correct: false },
      );
    }
  }

  function nextRound() {
    const idx = round.index + 1;
    if (idx < rounds.length) setRound(freshRound(idx, rounds[idx], seed, preplaced));
  }

  const feedback =
    round.status === "retry" ? `${round.confirmed.length} in the right place. Try once more.`
    : round.status === "solved" ? `All ${n} in the right place.`
    : round.status === "revealed" ? "Here is the order."
    : "";
  const roundsCorrect = results.filter((r) => r.correct).length;

  return (
    <div data-testid="game-order" data-motion={props.motion} className="flex flex-col gap-5">
      {/* Keyed by round so every row and the prompt re-enter on a new round. */}
      <div key={round.index} className="flex flex-col gap-5">
        <div className="m-enter flex flex-col gap-2">
          <p className="text-sm font-semibold text-muted-foreground">
            {games.order.name}
            {rounds.length > 1 && ` · Round ${round.index + 1} of ${rounds.length}`}
          </p>
          <h2 className="font-display text-xl font-semibold leading-snug">{concept.order.prompt}</h2>
          <p className={cn("leading-6 text-muted-foreground", body)}>
            Tap two steps to swap them, or use the arrows.
            {lo > 0 && " The first step is already in place."}
          </p>
        </div>

        <ol className="flex flex-col gap-3" aria-label="Steps to put in order">
          {round.slots.map((step, i) => {
            const locked = i < lo;
            const selected = round.selected === i;
            const right = done || (round.confirmed.includes(step) && step === i);
            const flash = round.status === "retry" && round.wrong.includes(step);
            const canSelect = live && !locked;
            const textId = `${uid}-step-${step}`;
            return (
              <li
                key={step}
                data-testid="order-item"
                data-state={right ? "right" : selected ? "selected" : locked ? "locked" : "idle"}
                className={cn(
                  "tap m-enter relative flex items-stretch rounded-2xl border bg-card transition-[border-color,box-shadow,background-color] duration-200",
                  largeTargets ? "min-h-[64px]" : "min-h-14",
                  right
                    ? "border-sprout/40 bg-sprout-soft"
                    : selected
                      ? "border-focus ring-4 ring-focus/12"
                      : locked
                        ? "border-input bg-muted/60"
                        : "border-input",
                  canSelect && !selected && !right && "hover:border-foreground/35",
                )}
                style={{ "--m-delay": `${i * STAGGER_MS}ms` } as CSSProperties}
              >
                {flash && <span aria-hidden className="m-flash-ember pointer-events-none absolute inset-0 rounded-2xl" />}

                <button
                  type="button"
                  aria-pressed={selected}
                  disabled={!canSelect}
                  onClick={() => select(i)}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3 rounded-2xl py-3 pl-3 pr-2 text-left outline-none",
                    "focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-focus/20 disabled:cursor-default",
                    body,
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tabular-nums",
                      largeTargets ? "size-9 text-[15px]" : "size-8 text-sm",
                      right ? "bg-sprout text-white" : locked ? "bg-muted text-muted-foreground" : "bg-sun-soft text-sun-deep",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="sr-only">Position {i + 1}:</span>
                  <span id={textId} className={cn("min-w-0 flex-1 font-medium leading-snug", locked && !right && "text-muted-foreground")}>
                    {items[step]}
                  </span>
                  {right ? (
                    <>
                      <Check weight="bold" aria-hidden className="size-5 shrink-0 text-sprout" />
                      <span className="sr-only">In place</span>
                    </>
                  ) : locked ? (
                    <>
                      <Lock weight="bold" aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                      <span className="sr-only">Fixed in place</span>
                    </>
                  ) : null}
                </button>

                <div className="flex shrink-0 items-center gap-0.5 pr-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(largeTargets && "size-12")}
                    aria-label="Move up"
                    aria-describedby={textId}
                    disabled={!live || locked || i <= lo}
                    onClick={() => move(i, "up")}
                    ref={(el) => {
                      const key = `${step}:up`;
                      if (el) arrows.current.set(key, el); else arrows.current.delete(key);
                    }}
                  >
                    <ArrowUp weight="bold" className={largeTargets ? "size-6" : "size-5"} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(largeTargets && "size-12")}
                    aria-label="Move down"
                    aria-describedby={textId}
                    disabled={!live || locked || i >= n - 1}
                    onClick={() => move(i, "down")}
                    ref={(el) => {
                      const key = `${step}:down`;
                      if (el) arrows.current.set(key, el); else arrows.current.delete(key);
                    }}
                  >
                    <ArrowDown weight="bold" className={largeTargets ? "size-6" : "size-5"} />
                  </Button>
                </div>
              </li>
            );
          })}
        </ol>

        <p
          role="status"
          aria-live="polite"
          className={cn("min-h-6 leading-6", body, round.status === "retry" ? "text-muted-foreground" : "font-medium")}
        >
          {feedback}
        </p>
      </div>

      {live && (
        <div>
          <Button data-testid="check-order" size={largeTargets ? "lg" : "default"} onClick={check}>
            Check order
          </Button>
        </div>
      )}

      {done && !last && (
        <div>
          <Button variant="outline" size={largeTargets ? "lg" : "default"} onClick={nextRound}>
            Next round
          </Button>
        </div>
      )}

      {done && last && (
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop flex items-center gap-4">
          <span
            aria-hidden
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
              roundsCorrect === rounds.length ? "bg-sprout text-white" : "bg-sun-soft text-sun-deep",
            )}
          >
            <Check weight="bold" className="size-5" />
          </span>
          <p className={cn("font-display font-semibold leading-snug", largeTargets ? "text-xl" : "text-lg")}>
            {roundsCorrect} of {rounds.length} sequences right.
          </p>
        </div>
      )}
    </div>
  );
}
