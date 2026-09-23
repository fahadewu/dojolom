import type { Concept } from "@/content/types";
import type { GameSupport, MotionProfile } from "@/lib/study";

/* Every mini-game is a self-contained client component with this contract.
   The session player picks the game, passes the concepts (today's first, then
   one or two earlier ones for interleaving) and records what comes back. */
export interface GameProps {
  concepts: Concept[];          // never empty; concepts[0] is today's
  support: GameSupport;         // scaffolding level: pair count, timer, pre-placed item
  seed: number;                 // all shuffles must come from mulberry32(seed), never Math.random
  motion: MotionProfile;
  largeTargets: boolean;        // kids and seniors: 56px minimum tap targets
  /** One call per atomic judgement the learner makes, so the engine can score the concept. */
  onAnswer: (conceptId: string, correct: boolean) => void;
  /** Exactly once, when the round ends. score 0..100, accuracy 0..1. */
  onComplete: (result: { score: number; accuracy: number; finished: boolean }) => void;
}
