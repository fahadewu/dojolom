"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { games, mulberry32, shuffle } from "@/lib/study";
import type { Concept } from "@/content/types";
import type { GameProps } from "./types";

// ─── Match pairs ─────────────────────────────────────────────────────────────
// A grid of shuffled tiles: one carries a term, another its meaning. Tap two.
// A pair locks in the game colour; a miss is a brief coral flash and both
// tiles clear. Every second tap is one judgement the engine can score.

interface Pair { id: string; conceptId: string; term: string; match: string }
interface Tile { id: string; pairId: string; conceptId: string; side: "term" | "match"; text: string }

const FLASH_MS = 320;
const colour = tint[games.pairs.colour];

/** Up to five pairs from today's concept; a sixth, when asked for, borrows the first pair of the next concept. */
function pickPairs(concepts: Concept[], count: number): Pair[] {
  const [today, earlier] = concepts;
  const pairs: Pair[] = today.pairs.slice(0, Math.min(count, 5)).map((p, i) => ({
    id: `${today.id}:${i}`,
    conceptId: today.id,
    term: p.term,
    match: p.match,
  }));
  if (count > pairs.length && earlier?.pairs[0]) {
    const p = earlier.pairs[0];
    pairs.push({ id: `${earlier.id}:0`, conceptId: earlier.id, term: p.term, match: p.match });
  }
  return pairs;
}

function buildTiles(pairs: Pair[], seed: number): Tile[] {
  const tiles = pairs.flatMap<Tile>((p) => [
    { id: `${p.id}:term`, pairId: p.id, conceptId: p.conceptId, side: "term", text: p.term },
    { id: `${p.id}:match`, pairId: p.id, conceptId: p.conceptId, side: "match", text: p.match },
  ]);
  return shuffle(tiles, mulberry32(seed));
}

export default function PairsGame(props: GameProps) {
  // A new seed, pair count or concept set is a new round; keying resets every piece of state.
  const roundKey = `${props.seed}:${props.support.pairsCount}:${props.concepts.map((c) => c.id).join(",")}`;
  return <PairsRound key={roundKey} {...props} />;
}

function PairsRound({ concepts, support, seed, motion, largeTargets, onAnswer, onComplete }: GameProps) {
  const { pairs, tiles } = useMemo(() => {
    const picked = pickPairs(concepts, support.pairsCount);
    return { pairs: picked, tiles: buildTiles(picked, seed) };
  }, [concepts, support.pairsCount, seed]);
  const byId = useMemo(() => new Map(tiles.map((t) => [t.id, t])), [tiles]);
  const total = pairs.length;

  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<ReadonlySet<string>>(() => new Set());
  const [wrong, setWrong] = useState<readonly [string, string] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [announce, setAnnounce] = useState("");
  const doneRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const done = total > 0 && matched.size === total;

  function tap(tile: Tile) {
    if (wrong || matched.has(tile.pairId)) return;
    if (selected === null) { setSelected(tile.id); return; }
    if (selected === tile.id) { setSelected(null); return; }
    const first = byId.get(selected);
    if (!first) { setSelected(tile.id); return; }

    const tries = attempts + 1;
    setAttempts(tries);

    if (first.pairId === tile.pairId) {
      const next = new Set(matched).add(tile.pairId);
      const pair = pairs.find((p) => p.id === tile.pairId);
      setMatched(next);
      setSelected(null);
      setAnnounce(pair ? `Matched: ${pair.term} and ${pair.match}` : "Matched");
      onAnswer(tile.conceptId, true);
      if (next.size === total && !doneRef.current) {
        doneRef.current = true;
        const accuracy = total / tries;
        onComplete({ score: Math.round(100 * accuracy), accuracy, finished: true });
      }
      return;
    }

    setWrong([first.id, tile.id]);
    setAnnounce("Not a pair, try again");
    onAnswer(first.conceptId, false);
    timer.current = setTimeout(() => {
      timer.current = null;
      setWrong(null);
      setSelected(null);
    }, FLASH_MS);
  }

  return (
    <div data-testid="game-pairs" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-[15px] leading-6">{games.pairs.blurb} Tap a term, then the meaning that goes with it.</p>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground tabular-nums">
          <span>{matched.size} of {total} matched</span>
          <span aria-hidden>·</span>
          <span>{attempts} {attempts === 1 ? "try" : "tries"}</span>
        </p>
      </div>

      <div role="group" aria-label={games.pairs.name} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile, i) => {
          const isMatched = matched.has(tile.pairId);
          const isWrong = wrong?.includes(tile.id) ?? false;
          const state = isMatched ? "matched" : isWrong ? "wrong" : selected === tile.id ? "selected" : "idle";
          return (
            // The entrance lives on a wrapper so state changes on the button never replay it.
            <div key={tile.id} className="m-enter flex" style={{ "--m-delay": `${i * 30}ms` } as CSSProperties}>
              <button
                type="button"
                data-testid="tile"
                data-state={state}
                data-side={tile.side}
                aria-pressed={selected === tile.id}
                aria-label={`${tile.side === "term" ? "Term" : "Meaning"}: ${tile.text}`}
                disabled={isMatched}
                onClick={() => tap(tile)}
                className={cn(
                  "tap flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl border bg-card px-4 py-3 text-center leading-snug shadow-[var(--shadow-hairline)] transition-[border-color,box-shadow,background-color,color] duration-200",
                  tile.side === "term" ? "text-[16px] font-semibold" : "text-[15px]",
                  largeTargets && "min-h-[72px] text-[17px]",
                  state === "idle" && "border-input hover:border-foreground/35",
                  state === "selected" && "border-focus ring-4 ring-focus/12 shadow-[var(--shadow-card)]",
                  state === "wrong" && "border-input m-flash-ember",
                  state === "matched" && cn(colour.chip, colour.border, motion === "lively" && "m-pop"),
                )}
              >
                {isMatched && <Check size={16} weight="bold" className="shrink-0" aria-hidden />}
                <span>{tile.text}</span>
              </button>
            </div>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">{announce}</p>

      {done && (
        <div data-testid="game-summary" className="surface rounded-2xl p-5 m-pop flex items-center gap-4">
          <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full", colour.chip)} aria-hidden>
            <Check size={18} weight="bold" />
          </span>
          <p className="text-[15px] leading-6">
            <span className="font-semibold">All {total} matched in {attempts} tries.</span>
            {attempts === total && <span className="text-muted-foreground"> A clean run, no misses.</span>}
          </p>
        </div>
      )}
    </div>
  );
}
