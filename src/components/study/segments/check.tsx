"use client";

import { useMemo, useState } from "react";
import { ArrowRight, SealCheck, Plant } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ChoiceQuestion, TrueFalseQuestion } from "@/components/study/question-card";
import { Kicker } from "@/components/study/segments/learn";
import { cn } from "@/lib/utils";
import { mulberry32, shuffle, type Confidence, type Segment } from "@/lib/study";
import type { Concept, Question } from "@/content/types";

type CheckSeg = Extract<Segment, { kind: "check" }>;
type CheckpointSeg = Extract<Segment, { kind: "checkpoint" }>;

type Item =
  | { conceptId: string; kind: "quiz"; q: Question }
  | { conceptId: string; kind: "misconception"; statement: string; why: string };

function QuizRunner({
  items,
  seed,
  confidence,
  largeTargets,
  kicker,
  onAnswer,
  onFinished,
  children,
}: {
  items: Item[];
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  kicker: (i: number, n: number) => React.ReactNode;
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence, item: Item) => void;
  onFinished: (correct: number) => void;
  children: (correct: number) => React.ReactNode; // the end card
}) {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const item = items[step];

  if (!item) return <>{children(correct)}</>;

  const record = (c: boolean, conf: Confidence) => {
    setAnswered(true);
    if (c) setCorrect((n) => n + 1);
    onAnswer(item.conceptId, c, conf, item);
  };
  const next = () => {
    setAnswered(false);
    if (step + 1 >= items.length) onFinished(correct);
    setStep((s) => s + 1);
  };

  return (
    <div className="flex flex-col gap-6" key={step}>
      <div className="surface rounded-[28px] p-6 md:p-8 m-enter">
        {item.kind === "quiz" ? (
          <ChoiceQuestion kicker={kicker(step, items.length)} prompt={item.q.question} options={item.q.options} answer={item.q.answer} why={item.q.why} seed={seed + step} confidence={confidence} largeTargets={largeTargets} onAnswer={record} />
        ) : (
          <TrueFalseQuestion kicker={kicker(step, items.length)} statement={item.statement} truth={false} why={item.why} confidence={confidence} largeTargets={largeTargets} onAnswer={record} />
        )}
      </div>
      {answered && (
        <div className="flex justify-end">
          <Button size="lg" onClick={next} data-testid="check-next">
            {step + 1 < items.length ? "Next" : "See how it went"}
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
  onAnswer,
  onDone,
}: {
  segment: CheckSeg;
  concept: Concept;
  pretestSaidTrue: boolean | undefined;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence) => void;
  onDone: () => void;
}) {
  const items = useMemo<Item[]>(() => {
    const qs: Item[] = shuffle(concept.quiz, mulberry32(seed)).slice(0, segment.count).map((q) => ({ conceptId: concept.id, kind: "quiz" as const, q }));
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
        kicker={(i, n) => (
          <Kicker>
            <span className="inline-flex items-center gap-2 text-sprout"><SealCheck size={16} weight="bold" /> Quick check {i + 1} of {n}</span>
          </Kicker>
        )}
        onAnswer={(id, c, conf, item) => { if (item.kind === "misconception") setLastRight(c); onAnswer(id, c, conf); }}
        onFinished={() => {}}
      >
        {(correct) => (
          <div className="flex flex-col gap-6 m-enter" data-testid="check-summary">
            <Kicker>Quick check</Kicker>
            <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
              {correct === items.length ? "All of them." : correct >= items.length / 2 ? "Most of it is in." : "The idea is still settling."}
            </h1>
            <p className="lede">{correct} of {items.length} right. {correct < items.length ? "The ones you missed come back in tomorrow's rewind." : "Tomorrow's rewind will check it stuck."}</p>
            {segment.withPretest && lastMisconceptionRight !== null && (
              <div className={cn("rounded-2xl p-5 text-[15px] leading-7", lastMisconceptionRight ? "bg-sprout-soft" : "bg-sun-soft/70")}>
                {pretestSaidTrue && lastMisconceptionRight
                  ? <><span className="font-semibold">You changed your mind. </span>At the start you thought “{concept.misconception.belief}”. Now you know why that is not so.</>
                  : pretestSaidTrue === false && lastMisconceptionRight
                    ? <><span className="font-semibold">You already knew this one. </span>The misconception never caught you.</>
                    : <><span className="font-semibold">This one is sticky. </span>{concept.misconception.correction}</>}
              </div>
            )}
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
   secures the unit on the path; failing names the ideas to revisit. */
export function CheckpointSegment({
  segment,
  concepts,
  seed,
  confidence,
  largeTargets,
  onAnswer,
  onResult,
  onDone,
}: {
  segment: CheckpointSeg;
  concepts: Record<string, Concept>;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  onAnswer: (conceptId: string, correct: boolean, confidence: Confidence) => void;
  onResult: (score: number, of: number, passed: boolean) => void;
  onDone: () => void;
}) {
  const items = useMemo<Item[]>(() => {
    const rng = mulberry32(seed + 11);
    const all: Item[] = [];
    segment.conceptIds.forEach((id, i) => {
      const c = concepts[id];
      if (!c) return;
      shuffle(c.quiz, mulberry32(seed + i)).slice(0, segment.perConcept).forEach((q) => all.push({ conceptId: id, kind: "quiz", q }));
    });
    return shuffle(all, rng);
  }, [segment, concepts, seed]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [reported, setReported] = useState(false);
  const passMark = Math.min(segment.passMark, items.length);

  return (
    <section data-testid="segment-checkpoint" className="flex flex-col gap-6">
      <QuizRunner
        items={items}
        seed={seed}
        confidence={confidence}
        largeTargets={largeTargets}
        kicker={(i, n) => (
          <Kicker>
            <span className="inline-flex items-center gap-2 text-sun-deep"><Plant size={16} weight="bold" /> Unit {segment.unit} checkpoint · {i + 1} of {n}</span>
          </Kicker>
        )}
        onAnswer={(id, c, conf) => { if (!c) setWrongIds((w) => (w.includes(id) ? w : [...w, id])); onAnswer(id, c, conf); }}
        onFinished={(correct) => { if (!reported) { setReported(true); onResult(correct, items.length, correct >= passMark); } }}
      >
        {(correct) => {
          const passed = correct >= passMark;
          return (
            <div className="flex flex-col gap-6 m-enter" data-testid="checkpoint-summary" data-passed={passed}>
              <Kicker>Unit {segment.unit} checkpoint</Kicker>
              <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
                {passed ? "Unit secured." : "Nearly there."}
              </h1>
              <p className="lede">
                {correct} of {items.length} right{passed ? ". These three ideas now hold together." : `. ${passMark} was the mark. The rewind will bring the wobbly ones back until they stick.`}
              </p>
              {!passed && wrongIds.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {wrongIds.map((id) => (
                    <li key={id} className="rounded-full bg-sun-soft text-sun-deep px-3 py-1.5 text-sm font-semibold">{concepts[id]?.title}</li>
                  ))}
                </ul>
              )}
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
