"use client";

import { createContext, useContext } from "react";
import { Heartbeat } from "@phosphor-icons/react";
import { noTuning, type Tuning } from "@/lib/personal";

/* What the app changes for this learner (src/lib/personal.ts), shared with the
   question cards and segments of a sitting without threading it through every prop. */
const TuningContext = createContext<Tuning>(noTuning);

export const TuningProvider = TuningContext.Provider;

export function useTuning(): Tuning {
  return useContext(TuningContext);
}

/* Before a test, for learners who find tests stressful: arousal reappraised as readiness, and the stakes named as low. */
export function SteadyNote({ className = "" }: { className?: string }) {
  const { steadyNerves } = useTuning();
  if (!steadyNerves) return null;
  return (
    <p className={`rounded-2xl bg-focus-soft/60 p-5 text-[15px] leading-7 flex gap-3 ${className}`} data-testid="steady-note">
      <Heartbeat size={20} weight="duotone" className="shrink-0 text-focus mt-1" />
      <span>
        <span className="font-semibold">If your heart is racing, good. </span>
        That is your body getting ready to think, not a sign that you will forget. This is practice: a miss here only shows what to bring back, and it costs you nothing.
      </span>
    </p>
  );
}
