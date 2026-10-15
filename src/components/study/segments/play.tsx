"use client";

import { useState } from "react";
import { ArrowRight, ArrowsLeftRight, GameController, Image as ImageIcon, ListNumbers, Lightning, TextT, type Icon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/study/segments/learn";
import PairsGame from "@/components/study/games/pairs";
import OrderGame from "@/components/study/games/order";
import BlitzGame from "@/components/study/games/blitz";
import BlanksGame from "@/components/study/games/blanks";
import SpotGame from "@/components/study/games/spot";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { games, gameOfferReason, type GameId, type MotionProfile, type Nudge, type Segment, type Signals } from "@/lib/study";
import type { LearnerProfile } from "@/lib/learning";
import type { Concept } from "@/content/types";

type PlaySeg = Extract<Segment, { kind: "play" }>;

const components: Record<GameId, typeof PairsGame> = { pairs: PairsGame, order: OrderGame, blitz: BlitzGame, blanks: BlanksGame, spot: SpotGame };
export const gameIcons: Record<GameId, Icon> = { pairs: ArrowsLeftRight, order: ListNumbers, blitz: Lightning, blanks: TextT, spot: ImageIcon };

export const nudgeLabels: Record<Nudge, { label: string; hint: string }> = {
  [-1]: { label: "More help", hint: "Fewer pieces, a head start, the chips stay." },
  0: { label: "Just right", hint: "The engine sets the level from your recent answers." },
  1: { label: "Push me", hint: "More pieces, type the word instead of picking it." },
};

/* One mini-game on today's idea mixed with one or two earlier ones. When the
   engine offers a choice, the learner picks first; the pick is a preference the
   engine remembers, and the round then runs exactly as a single game would. */
export function PlaySegment({
  segment,
  concepts,
  seed,
  motion,
  largeTargets,
  pictures,
  signals,
  profile,
  nudge,
  onPick,
  onNudge,
  onAnswer,
  onComplete,
  onSkip,
  onDone,
}: {
  segment: PlaySeg;
  concepts: Record<string, Concept>;
  seed: number;
  motion: MotionProfile;
  largeTargets: boolean;
  pictures: boolean;
  signals: Signals;
  profile: LearnerProfile;
  nudge: Nudge;
  onPick: (game: GameId) => void;
  onNudge: (nudge: Nudge) => void;
  onAnswer: (conceptId: string, correct: boolean) => void;
  onComplete: (result: { score: number; accuracy: number; finished: boolean }) => void;
  onSkip: () => void;
  onDone: () => void;
}) {
  const [finished, setFinished] = useState(false);
  const list = segment.conceptIds.map((id) => concepts[id]).filter(Boolean);
  const meta = games[segment.game];
  const t = tint[meta.colour];
  const Game = components[segment.game];
  const choosing = (segment.options?.length ?? 0) > 1 && !segment.picked;

  if (!list.length) {
    return (
      <section data-testid="segment-play" className="flex flex-col gap-6">
        <p className="lede">This game needs content that has not loaded.</p>
        <Button onClick={onSkip}>Skip for now</Button>
      </section>
    );
  }

  if (choosing) {
    const options = segment.options ?? [];
    return (
      <section data-testid="segment-play" data-choosing="true" className="flex flex-col gap-6 m-enter">
        <div className="flex flex-col gap-3">
          <Kicker>
            <span className="inline-flex items-center gap-2 text-play"><GameController size={16} weight="bold" /> Play</span>
          </Kicker>
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Pick today&apos;s game</h1>
          <p className="lede">
            {list.length > 1 ? `Today's idea plus ${list.length - 1 === 1 ? "one you met before" : "two you met before"}. ` : ""}
            Either one drills the same ideas. Your choice teaches the engine what you enjoy.
          </p>
        </div>
        <div className={cn("grid gap-3", options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")} role="group" aria-label="Choose a game">
          {options.map((g, i) => {
            const m = games[g];
            const c = tint[m.colour];
            const GIcon = gameIcons[g];
            return (
              <button
                key={g}
                type="button"
                data-testid="pick-game"
                data-game={g}
                onClick={() => onPick(g)}
                className={cn(
                  "tap surface group flex flex-col gap-4 rounded-[24px] p-5 text-left transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-raised)] active:scale-[0.99] outline-none focus-visible:ring-4 focus-visible:ring-focus/20 m-enter",
                  largeTargets && "p-6",
                )}
                style={{ "--m-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", c.chip)} aria-hidden>
                  <GIcon size={26} weight="duotone" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className={cn("font-display font-semibold leading-snug", largeTargets ? "text-2xl" : "text-xl")}>{m.name}</span>
                  <span className="text-[15px] leading-6 text-muted-foreground">{m.blurb}</span>
                </span>
                <span className={cn("mt-auto inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", i === 0 ? c.chip : "bg-muted text-muted-foreground")}>
                  {gameOfferReason(g, signals, profile)}
                </span>
              </button>
            );
          })}
        </div>
        <NudgeControl value={nudge} onChange={onNudge} largeTargets={largeTargets} />
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button variant="ghost" className="mt-4 -ml-3" onClick={onSkip} data-testid="play-skip">Skip the game today</Button>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="segment-play" data-game={segment.game} className="flex flex-col gap-6 m-enter">
      <div className="flex flex-col gap-3">
        <Kicker>
          <span className={cn("inline-flex items-center gap-2", t.text)}><GameController size={16} weight="bold" /> Play</span>
        </Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{meta.name}</h1>
        <p className="lede">
          {segment.game === "blanks" && segment.support.blanksTyped ? "Type the word that completes the sentence." : meta.blurb}{" "}
          {list.length > 1 ? `Today's idea, plus ${list.length - 1 === 1 ? "one you met before" : "two you met before"}.` : ""}
        </p>
      </div>
      <Game
        concepts={list}
        support={segment.support}
        seed={seed}
        motion={motion}
        largeTargets={largeTargets}
        pictures={pictures}
        onAnswer={onAnswer}
        onComplete={(r) => { setFinished(true); onComplete(r); }}
      />
      <div className="flex items-center justify-between pt-2 border-t border-border">
        {!finished ? (
          <Button variant="ghost" className="mt-4 -ml-3" onClick={onSkip} data-testid="play-skip">Skip this game</Button>
        ) : <span />}
        {finished && (
          <Button size="lg" className="mt-4" onClick={onDone} data-testid="play-done">Continue <ArrowRight size={18} weight="bold" /></Button>
        )}
      </div>
    </section>
  );
}

/* More help, just right, push me: one rung either way on the support ladder. Shared by the picker and the settings page. */
export function NudgeControl({ value, onChange, largeTargets, className }: { value: Nudge; onChange: (n: Nudge) => void; largeTargets?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-sm font-semibold text-muted-foreground">How hard should games be?</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Game difficulty">
        {([-1, 0, 1] as Nudge[]).map((n) => {
          const on = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={on}
              data-testid={`nudge-${n === -1 ? "help" : n === 0 ? "even" : "push"}`}
              title={nudgeLabels[n].hint}
              onClick={() => onChange(n)}
              className={cn(
                "tap rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                largeTargets && "px-5 py-3 text-base",
                on ? "border-foreground bg-foreground text-white" : "border-input bg-card text-muted-foreground hover:border-foreground/35",
              )}
            >
              {nudgeLabels[n].label}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">{nudgeLabels[value].hint}</p>
    </div>
  );
}
