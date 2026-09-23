"use client";

import { useState } from "react";
import { ArrowRight, GameController } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/study/segments/learn";
import PairsGame from "@/components/study/games/pairs";
import OrderGame from "@/components/study/games/order";
import BlitzGame from "@/components/study/games/blitz";
import BlanksGame from "@/components/study/games/blanks";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { games, type MotionProfile, type Segment } from "@/lib/study";
import type { Concept } from "@/content/types";

type PlaySeg = Extract<Segment, { kind: "play" }>;

const components = { pairs: PairsGame, order: OrderGame, blitz: BlitzGame, blanks: BlanksGame };

/* One mini-game on today's idea mixed with one or two earlier ones. */
export function PlaySegment({
  segment,
  concepts,
  seed,
  motion,
  largeTargets,
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

  if (!list.length) {
    return (
      <section data-testid="segment-play" className="flex flex-col gap-6">
        <p className="lede">This game needs content that has not loaded.</p>
        <Button onClick={onSkip}>Skip for now</Button>
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
          {meta.blurb} {list.length > 1 ? `Today's idea, plus ${list.length - 1 === 1 ? "one you met before" : "two you met before"}.` : ""}
        </p>
      </div>
      <Game
        concepts={list}
        support={segment.support}
        seed={seed}
        motion={motion}
        largeTargets={largeTargets}
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
