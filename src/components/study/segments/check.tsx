"use client";

import { useMemo, useState } from "react";
import { ArrowRight, SealCheck, Plant } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ChoiceQuestion, ReviewItemCard, TrueFalseQuestion, type CardMeta } from "@/components/study/question-card";
import { Kicker } from "@/components/study/segments/learn";
import { SteadyNote } from "@/components/study/tuning";
import { gradeFor, meetsGrade, type BdGrade } from "@/lib/personal";
import { cn } from "@/lib/utils";
import { guessRate, mulberry32, retryItem, shuffle, type Confidence, type MemoryState, type ReadSample, type ReviewItem, type Segment } from "@/lib/study";
import type { Concept, Question } from "@/content/types";
import { reviewItemText, type Asked } from "@/lib/tutor/items";

type CheckSeg = Extract<Segment, { kind: "check" }>;
type CheckpointSeg = Extract<Segment, { kind: "checkpoint" }>;

type Item =
  | { conceptId: string; kind: "quiz"; q: Question; index: number }
  | { conceptId: string; kind: "misconception"; statement: string; why: string }
  | { conceptId: string; kind: "retry"; item: ReviewItem; concept: Concept }; // a second go after a miss, from another angle

export interface AnswerMeta { item?: ReviewItem; thinkMs?: number; guess: number; read?: ReadSample; asked?: Asked }

const metaFor = (item: Item, card?: CardMeta): AnswerMeta => {
  const thinkMs = card?.thinkMs;
  const base = item.kind === "quiz" ? { guess: guessRate("quiz", item.q.options.length), thinkMs }
    : item.kind === "misconception" ? { guess: guessRate("misconception") }
      : { item: item.item, thinkMs, guess: guessRate(item.item.source, item.item.source === "quiz" ? item.concept.quiz[item.item.index % item.concept.quiz.length]?.options.length : undefined) };
  const asked: Asked = item.kind === "quiz" ? { question: item.q.question, answer: item.q.options[item.q.answer] }
    : item.kind === "misconception" ? { question: `True or false: ${item.statement}`, answer: "False" }
      : reviewItemText(item.concept, item.item);
  return { ...base, read: card?.read, asked };
};

function QuizRunner({
  items,
  seed,
  confidence,
  largeTargets,
  kicker,
  retryFor,
  onAnswer,
  onFinished,
  children,
}: {
  items: Item[];
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  kicker: (i: number, n: number, retry: boolean) => React.ReactNode;
  retryFor?: (item: Item) => Item | null; // a second go for a missed question, asked before the closing misconception
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence, item: Item, meta: AnswerMeta) => void;
  onFinished: (correct: number) => void;
  children: (correct: number, fixed: number) => React.ReactNode; // the end card
}) {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [fixed, setFixed] = useState(0);
  const [retries, setRetries] = useState<Item[]>([]);
  const queue = [...items.filter((i) => i.kind !== "misconception"), ...retries, ...items.filter((i) => i.kind === "misconception")];
  const item = queue[step];

  if (!item) return <>{children(correct, fixed)}</>;
  const isRetry = item.kind === "retry";

  const record = (c: boolean, conf: Confidence, meta?: CardMeta) => {
    setAnswered(true);
    if (c && isRetry) setFixed((n) => n + 1);
    else if (c) setCorrect((n) => n + 1);
    onAnswer(item.conceptId, c, conf, item, metaFor(item, meta));
    const again = !c && !isRetry && retryFor?.(item);
    if (again && retries.length < 2) setRetries((r) => [...r, again]);
  };
  const next = () => {
    setAnswered(false);
    if (step + 1 >= queue.length) onFinished(correct);
    setStep((s) => s + 1);
  };
  const shownStep = isRetry ? step : step - (item.kind === "misconception" ? retries.length : 0);

  return (
    <div className="flex flex-col gap-6" key={step}>
      <div className="surface rounded-[28px] p-6 md:p-8 m-enter">
        {item.kind === "quiz" ? (
          <ChoiceQuestion kicker={kicker(shownStep, items.length, false)} prompt={item.q.question} options={item.q.options} answer={item.q.answer} why={item.q.why} seed={seed + step} confidence={confidence} largeTargets={largeTargets} onAnswer={record} />
        ) : item.kind === "retry" ? (
          <ReviewItemCard kicker={kicker(shownStep, items.length, true)} item={item.item} concept={item.concept} seed={seed + step} confidence={confidence} largeTargets={largeTargets} onAnswer={record} />
        ) : (
          <TrueFalseQuestion kicker={kicker(shownStep, items.length, false)} statement={item.statement} truth={false} why={item.why} confidence={confidence} largeTargets={largeTargets} onAnswer={record} />
        )}
      </div>
      {answered && (
        <div className="flex justify-end">
          <Button size="lg" onClick={next} data-testid="check-next">
            {step + 1 < queue.length ? "Next" : "See how it went"}
            <ArrowRight size={18} weight="bold" />
          </Button>
        </div>
      )}
    </div>
  );
}

/* The quick check after learning: a few questions on today's idea, ending with
   the misconception asked again so the learner sees what changed. */
export function CheckSegment({
  segment,
  concept,
  pretestSaidTrue,
  seed,
  confidence,
  largeTargets,
  note,
  memory,
  onAnswer,
  onDone,
}: {
  segment: CheckSeg;
  concept: Concept;
  pretestSaidTrue: boolean | undefined;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  note?: string | null; // calibration feedback for the sitting so far
  memory?: Record<string, MemoryState>;
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence, meta: AnswerMeta) => void;
  onDone: () => void;
}) {
  const items = useMemo<Item[]>(() => {
    const qs: Item[] = shuffle(concept.quiz.map((q, index) => ({ q, index })), mulberry32(seed)).slice(0, segment.count).map(({ q, index }) => ({ conceptId: concept.id, kind: "quiz" as const, q, index }));
    if (segment.withPretest) qs.push({ conceptId: concept.id, kind: "misconception", statement: concept.misconception.belief, why: concept.misconception.correction });
    return qs;
  }, [concept, seed, segment.count, segment.withPretest]);
  const [lastMisconceptionRight, setLastRight] = useState<boolean | null>(null);

  return (
    <section data-testid="segment-check" className="flex flex-col gap-6">
      <QuizRunner
        items={items}
        seed={seed}
        confidence={confidence}
        largeTargets={largeTargets}
        kicker={(i, n, retry) => (
          <Kicker>
            <span className="inline-flex items-center gap-2 text-sprout" data-retry={retry || undefined}><SealCheck size={16} weight="bold" /> {retry ? "Second go, another angle" : `Quick check ${i + 1} of ${n}`}</span>
          </Kicker>
        )}
        retryFor={(item) => item.kind === "quiz" ? { conceptId: concept.id, kind: "retry", concept, item: retryItem({ conceptId: concept.id, source: "quiz", index: item.index, crossSubject: false }, memory?.[concept.id]) } : null}
        onAnswer={(id, c, conf, item, meta) => { if (item.kind === "misconception") setLastRight(c); onAnswer(id, c, conf, meta); }}
        onFinished={() => {}}
      >
        {(correct, fixed) => (
          <div className="flex flex-col gap-6 m-enter" data-testid="check-summary">
            <Kicker>Quick check</Kicker>
            <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
              {correct === items.length ? "All of them." : correct >= items.length / 2 ? "Most of it is in." : "The idea is still settling."}
            </h1>
            <p className="lede">{correct} of {items.length} right{fixed > 0 ? `, and ${fixed === 1 ? "one" : fixed} more on the second go` : ""}. {correct < items.length ? "The ones you missed come back in tomorrow's rewind." : "Tomorrow's rewind will check it stuck."}</p>
            {segment.withPretest && lastMisconceptionRight !== null && (
              <div className={cn("rounded-2xl p-5 text-[15px] leading-7", lastMisconceptionRight ? "bg-sprout-soft" : "bg-sun-soft/70")}>
                {pretestSaidTrue && lastMisconceptionRight
                  ? <><span className="font-semibold">You changed your mind. </span>At the start you thought “{concept.misconception.belief}”. Now you know why that is not so.</>
                  : pretestSaidTrue === false && lastMisconceptionRight
                    ? <><span className="font-semibold">You already knew this one. </span>The misconception never caught you.</>
                    : <><span className="font-semibold">This one is sticky. </span>{concept.misconception.correction}</>}
              </div>
            )}
            {note && <CalibrationNote note={note} />}
            <div className="flex justify-end pt-2 border-t border-border">
              <Button size="lg" className="mt-4" onClick={onDone} data-testid="check-done">Continue <ArrowRight size={18} weight="bold" /></Button>
            </div>
          </div>
        )}
      </QuizRunner>
    </section>
  );
}

/* The unit checkpoint: mixed questions across the unit's three ideas. Passing
   secures the unit on the path; failing names the ideas to revisit, and the
   next session teaches those again another way and retakes them (mastery
   learning: test, correct, test again). No second goes here: it is the test. */
export function CheckpointSegment({
  segment,
  concepts,
  seed,
  confidence,
  largeTargets,
  note,
  onAnswer,
  onResult,
  onDone,
  grading,
}: {
  segment: CheckpointSeg;
  concepts: Record<string, Concept>;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  note?: string | null;
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence, meta: AnswerMeta) => void;
  onResult: (score: number, of: number, passed: boolean, missed: string[]) => void;
  grading?: { target: BdGrade | "" }; // school-book learners: show the board grade the score would earn
  onDone: () => void;
}) {
  const items = useMemo<Item[]>(() => {
    const rng = mulberry32(seed + 11);
    const all: Item[] = [];
    segment.conceptIds.forEach((id, i) => {
      const c = concepts[id];
      if (!c) return;
      shuffle(c.quiz.map((q, index) => ({ q, index })), mulberry32(seed + i)).slice(0, segment.perConcept).forEach(({ q, index }) => all.push({ conceptId: id, kind: "quiz", q, index }));
    });
    return shuffle(all, rng);
  }, [segment, concepts, seed]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [reported, setReported] = useState(false);
  const [started, setStarted] = useState(false);
  const passMark = Math.min(segment.passMark, items.length);

  return (
    <section data-testid="segment-checkpoint" className="flex flex-col gap-6">
      {!started && <SteadyNote />}
      <QuizRunner
        items={items}
        seed={seed}
        confidence={confidence}
        largeTargets={largeTargets}
        kicker={(i, n) => (
          <Kicker>
            <span className="inline-flex items-center gap-2 text-sun-deep" data-retake={segment.retake || undefined}><Plant size={16} weight="bold" /> Unit {segment.unit} {segment.retake ? "retake" : "checkpoint"} · {i + 1} of {n}</span>
          </Kicker>
        )}
        onAnswer={(id, c, conf, _item, meta) => { setStarted(true); if (!c) setWrongIds((w) => (w.includes(id) ? w : [...w, id])); onAnswer(id, c, conf, meta); }}
        onFinished={(correct) => { if (!reported) { setReported(true); onResult(correct, items.length, correct >= passMark, wrongIds); } }}
      >
        {(correct) => {
          const passed = correct >= passMark;
          return (
            <div className="flex flex-col gap-6 m-enter" data-testid="checkpoint-summary" data-passed={passed}>
              <Kicker>Unit {segment.unit} {segment.retake ? "retake" : "checkpoint"}</Kicker>
              <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
                {passed ? (segment.retake ? "Now it holds." : "Unit secured.") : segment.retake ? "Still settling." : "Nearly there."}
              </h1>
              <p className="lede">
                {correct} of {items.length} right
                {passed
                  ? segment.retake ? ". The unit is secured." : ". These three ideas now hold together."
                  : segment.retake
                    ? ". The path goes on, and your rewinds keep bringing these back until they stick."
                    : `. ${passMark} was the mark. Next session opens with another way into the ones that slipped, then a short retake.`}
              </p>
              {grading && items.length > 0 && (() => {
                const pct = Math.round((correct / items.length) * 100);
                return (
                  <p className="text-[15px] font-semibold" data-testid="grade-line">
                    {pct}% is {gradeFor(pct)} on the board&apos;s scale
                    {grading.target ? (meetsGrade(pct, grading.target) ? `, at or above your ${grading.target} target.` : `. Your target is ${grading.target}: the rewinds and the retake are how you close the gap.`) : "."}
                  </p>
                );
              })()}
              {!passed && wrongIds.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {wrongIds.map((id) => (
                    <li key={id} className="rounded-full bg-sun-soft text-sun-deep px-3 py-1.5 text-sm font-semibold">{concepts[id]?.title}</li>
                  ))}
                </ul>
              )}
              {note && <CalibrationNote note={note} />}
              <div className="flex justify-end pt-2 border-t border-border">
                <Button size="lg" className="mt-4" onClick={onDone} data-testid="checkpoint-done">Continue <ArrowRight size={18} weight="bold" /></Button>
              </div>
            </div>
          );
        }}
      </QuizRunner>
    </section>
  );
}

/* Confidence against outcome: the metacognitive line that makes "sure" mean something. */
export function CalibrationNote({ note }: { note: string }) {
  return (
    <p className="rounded-2xl bg-focus-soft/60 p-5 text-[15px] leading-7" data-testid="calibration">
      <span className="font-semibold">Knowing what you know. </span>{note}
    </p>
  );
}
