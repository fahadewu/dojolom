"use client";

import { useState } from "react";
import { ArrowRight, ArrowCounterClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip } from "@/components/subject-icon";
import { ReviewItemCard } from "@/components/study/question-card";
import { Kicker, StepsGrid } from "@/components/study/segments/learn";
import { guessRate, parseConceptId, retryItem, subjectById, thinkFirst, type Confidence, type MemoryState, type ReadSample, type ReviewItem, type Segment } from "@/lib/study";
import type { Concept } from "@/content/types";

type RewindSeg = Extract<Segment, { kind: "rewind" }>;

/* Ask first, then show: retrieval questions on what is due, then the recap of
   last time as feedback. The learner's own one-line summary from yesterday is
   replayed beside the key idea. A miss earns one second go at the end, on the
   same idea from another angle (successive relearning: retrieve until right
   once); an idea missed twice joins the recap so it is restudied, not just
   marked wrong. */
export function RewindSegment({
  segment,
  concepts,
  memory,
  memoryScale = 1,
  said,
  seed,
  confidence,
  largeTargets,
  onAnswer,
  onDone,
}: {
  segment: RewindSeg;
  concepts: Record<string, Concept>;
  memory: Record<string, MemoryState>;
  memoryScale?: number;
  said: Record<string, string>;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  onAnswer: (item: ReviewItem, correct: boolean, confidence: Confidence, thinkMs?: number, guess?: number, read?: ReadSample) => void;
  onDone: () => void;
}) {
  const first = segment.items.filter((it) => concepts[it.conceptId]);
  const [retries, setRetries] = useState<ReviewItem[]>([]);
  const [stillMissed, setStillMissed] = useState<string[]>([]);
  const items = [...first, ...retries];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showAgain, setShowAgain] = useState<string | null>(null);
  const item = items[step];

  if (item) {
    const concept = concepts[item.conceptId];
    const subj = subjectById(parseConceptId(item.conceptId).subject);
    const isRetry = step >= first.length;
    const answer = (c: boolean, conf: Confidence, thinkMs?: number, read?: ReadSample) => {
      setAnswered(true);
      onAnswer(item, c, conf, thinkMs, guessRate(item.source, item.source === "quiz" ? concept.quiz[item.index % concept.quiz.length]?.options.length : undefined), read);
      if (c) return;
      if (!isRetry && !retries.some((r) => r.conceptId === item.conceptId)) setRetries((r) => [...r, retryItem(item, memory[item.conceptId])]);
      if (isRetry && !stillMissed.includes(item.conceptId)) setStillMissed((m) => [...m, item.conceptId]);
    };
    return (
      <section data-testid="segment-rewind" data-step={step} className="flex flex-col gap-6 m-enter" key={step}>
        <div className="flex items-center justify-between gap-4">
          <Kicker>
            <span className="inline-flex items-center gap-2 text-play" data-retry={isRetry || undefined}>
              <ArrowCounterClockwise size={16} weight="bold" /> {isRetry ? "Second go, another angle" : `Rewind ${step + 1} of ${first.length}`}
            </span>
          </Kicker>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            {subj && <SubjectChip id={subj.id} size="sm" />}
            <span className="font-semibold" data-testid="rewind-title">{item.crossSubject && subj ? `${subj.name} · ` : ""}{concept.title}</span>
          </span>
        </div>
        <div className="surface rounded-[28px] p-6 md:p-8">
          <ReviewItemCard
            item={item}
            concept={concept}
            seed={seed + step}
            confidence={confidence}
            largeTargets={largeTargets}
            thinkFirst={!isRetry && thinkFirst(memory[item.conceptId], memoryScale)}
            onAnswer={(c, conf, meta) => answer(c, conf, meta?.thinkMs, meta?.read)}
          />
        </div>
        {answered && (
          <div className="flex justify-end">
            <Button size="lg" data-testid="rewind-next" onClick={() => { setAnswered(false); setStep((s) => s + 1); }}>
              {step + 1 < items.length ? "Next" : "See last time"}
              <ArrowRight size={18} weight="bold" />
            </Button>
          </div>
        )}
      </section>
    );
  }

  const recaps = [...new Set([...segment.recapIds, ...stillMissed])].map((id) => concepts[id]).filter(Boolean);
  return (
    <section data-testid="segment-rewind" data-step="recap" className="flex flex-col gap-6 m-enter">
      <Kicker>
        <span className="inline-flex items-center gap-2 text-play">
          <ArrowCounterClockwise size={16} weight="bold" /> {stillMissed.some((id) => !segment.recapIds.includes(id)) ? "Look again" : "Last time"}
        </span>
      </Kicker>
      <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
        {recaps.length === 1 ? recaps[0].title : stillMissed.some((id) => !segment.recapIds.includes(id)) ? "Worth another look" : "What you learned last time"}
      </h1>
      <div className="flex flex-col gap-4">
        {recaps.map((c) => (
          <article key={c.id} className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="recap">
            {recaps.length > 1 && <h2 className="text-xl font-semibold">{c.title}</h2>}
            {said[c.id] && (
              <div className="rounded-2xl bg-play-soft/70 p-4 text-[15px] leading-7">
                <span className="font-semibold text-play">You said: </span>“{said[c.id]}”
              </div>
            )}
            <ol className="flex flex-col gap-2.5">
              {c.keyPoints.map((k, i) => (
                <li key={i} className="flex gap-3 text-[16px] leading-7">
                  <span className="font-display text-sprout font-semibold tabular-nums">{i + 1}</span>
                  {k}
                </li>
              ))}
            </ol>
            {showAgain === c.id ? (
              <StepsGrid concept={c} className="pt-2" />
            ) : (
              <button type="button" className="self-start text-[15px] font-semibold text-focus hover:underline underline-offset-4" onClick={() => setShowAgain(c.id)} data-testid="show-again">
                Show me again
              </button>
            )}
          </article>
        ))}
      </div>
      <div className="flex justify-end pt-2 border-t border-border">
        <Button size="lg" className="mt-4" onClick={onDone} data-testid="rewind-done">
          Got it, on to today
          <ArrowRight size={18} weight="bold" />
        </Button>
      </div>
    </section>
  );
}
