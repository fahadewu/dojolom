"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mulberry32, shuffle, type Confidence, type ReadSample, type ReviewItem } from "@/lib/study";
import { useTuning } from "@/components/study/tuning";
import { Listen, Spoken, stopSpeaking, useReadAloud } from "@/components/study/read-aloud";
import type { Concept, Question } from "@/content/types";

/** What a card reports with an answer: time to an answer in mind, and a reading sample when the learner read it themselves. */
export interface CardMeta { thinkMs?: number; read?: ReadSample; picked?: string }

const wordCount = (t: string) => t.split(/\s+/).filter((w) => /\w/.test(w)).length;

/* One multiple-choice question. Options are shuffled deterministically from the
   seed, the first tap is the answer, and the explanation is always shown so a
   wrong answer becomes the moment the idea gets filed properly. With thinkFirst
   the options stay hidden until the learner says they have an answer in mind,
   so the memory is produced before it is recognised. */
export function ChoiceQuestion({
  prompt,
  options,
  answer,
  why,
  seed,
  confidence = false,
  largeTargets = false,
  thinkFirst = false,
  kicker,
  onAnswer,
}: {
  prompt: React.ReactNode;
  options: string[];
  answer: number;
  why: string;
  seed: number;
  confidence?: boolean;
  largeTargets?: boolean;
  thinkFirst?: boolean;
  kicker?: React.ReactNode;
  onAnswer: (correct: boolean, confidence: Confidence, meta?: CardMeta) => void;
}) {
  const order = useMemo(() => shuffle(options.map((_, i) => i), mulberry32(seed)), [options, seed]);
  const [picked, setPicked] = useState<number | null>(null);
  const [sure, setSure] = useState<Confidence>("sure");
  const [revealed, setRevealed] = useState(!thinkFirst);
  const { steadyNerves } = useTuning();
  const { autoQuestions } = useReadAloud();
  const uid = useId();
  const promptRef = useRef<HTMLParagraphElement>(null);
  const listened = useRef(false); // read to them: the answer time says nothing about their reading
  const shownAt = useRef(0);
  const thinkMs = useRef<number | undefined>(undefined);
  useEffect(() => { shownAt.current = performance.now(); }, []);
  const answered = picked !== null;

  function reveal() {
    thinkMs.current = Math.round(performance.now() - shownAt.current);
    setRevealed(true);
  }

  function choose(i: number, at: number) {
    if (answered) return;
    setPicked(i);
    if (listened.current) stopSpeaking();
    const words = wordCount(promptRef.current?.textContent ?? "") + (revealed ? options.reduce((n, o) => n + wordCount(o), 0) : 0);
    const read = listened.current ? undefined : { words, ms: Math.round(at - shownAt.current) };
    onAnswer(i === answer, sure, { thinkMs: thinkMs.current, read, picked: options[i] });
  }

  return (
    <div className="flex flex-col gap-5" data-testid="question" data-answered={answered}>
      {kicker}
      <p ref={promptRef} className="font-display text-xl md:text-2xl font-semibold leading-snug">{typeof prompt === "string" ? <Spoken k={`${uid}q`} text={prompt} /> : prompt}</p>
      {!answered && (
        <Listen
          auto={autoQuestions}
          onPlay={() => { listened.current = true; }}
          chunks={() => [
            { key: `${uid}q`, text: promptRef.current?.textContent ?? "" },
            ...(revealed ? order.map((i) => ({ key: `${uid}o${i}`, text: options[i] })) : []),
          ]}
        />
      )}
      {confidence && !answered && (
        <div className="flex items-center gap-2" role="radiogroup" aria-label="How sure are you?">
          <span className="text-sm text-muted-foreground mr-1">Before you answer:</span>
          {(["sure", "unsure"] as Confidence[]).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={sure === c}
              data-testid={`confidence-${c}`}
              onClick={() => setSure(c)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold border transition-colors",
                sure === c ? "bg-foreground text-white border-foreground" : "bg-card border-input text-muted-foreground hover:border-foreground/35"
              )}
            >
              {c === "sure" ? "Sure" : "Not sure"}
            </button>
          ))}
        </div>
      )}
      {!revealed && (
        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-focus/40 bg-focus-soft/40 p-5" data-testid="think-first">
          <p className="text-[15px] leading-7"><span className="font-semibold">Answer in your head first.</span> Pulling it out of memory is what makes it stick. The options only check.</p>
          <Button variant="outline" className="self-start" onClick={reveal} data-testid="think-reveal">I have an answer in mind</Button>
        </div>
      )}
      {revealed && <div className="grid gap-2.5">
        {order.map((i) => {
          const correct = i === answer;
          const selected = picked === i;
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              data-testid="choice"
              data-correct={correct}
              data-state={!answered ? "idle" : correct ? "correct" : selected ? "wrong" : "muted"}
              onClick={(e) => choose(i, e.timeStamp)}
              className={cn(
                "tap text-left rounded-2xl border px-5 py-3.5 text-[16px] font-medium transition-colors flex items-center justify-between gap-3",
                largeTargets && "text-[17px]",
                !answered && "bg-card border-input hover:border-foreground/35 hover:shadow-[var(--shadow-card)]",
                answered && correct && "bg-sprout text-white border-sprout",
                answered && selected && !correct && "m-flash-ember border-ember/50 text-foreground",
                answered && !correct && !selected && "border-border text-muted-foreground/70"
              )}
            >
              <span><Spoken k={`${uid}o${i}`} text={options[i]} /></span>
              {answered && correct && <Check size={18} weight="bold" />}
              {answered && selected && !correct && <X size={18} weight="bold" className="text-ember" />}
            </button>
          );
        })}
      </div>}
      <div aria-live="polite">
        {answered && (
          <div className="m-enter rounded-2xl bg-muted/80 p-5 text-[15px] leading-7" data-testid="why">
            <p>
              <span className="font-semibold">{picked === answer ? "Right. " : steadyNerves ? "Not yet, and that is useful: now we know what to bring back. " : "Not quite. "}</span>
              {why}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function TrueFalseQuestion({
  statement,
  truth,
  why,
  confidence = false,
  largeTargets = false,
  kicker,
  onAnswer,
}: {
  statement: string;
  truth: boolean;
  why: string;
  confidence?: boolean;
  largeTargets?: boolean;
  kicker?: React.ReactNode;
  onAnswer: (correct: boolean, confidence: Confidence, meta?: CardMeta) => void;
}) {
  return (
    <ChoiceQuestion
      prompt={statement}
      options={["True", "False"]}
      answer={truth ? 0 : 1}
      why={why}
      seed={1}
      confidence={confidence}
      largeTargets={largeTargets}
      kicker={kicker}
      onAnswer={onAnswer}
    />
  );
}

/* A sentence with its gap drawn as an underlined slot. */
export function GapSentence({ sentence, fill }: { sentence: string; fill?: string }) {
  const [before, after] = sentence.split("___");
  return (
    <>
      {before}
      <span className={cn("inline-block min-w-[5ch] border-b-2 border-focus/60 text-center align-baseline", fill && "text-sprout")}>
        {fill ?? " "}
      </span>
      {after}
    </>
  );
}

/* Renders one spaced-repetition item from whichever pool the engine picked. */
export function ReviewItemCard({
  item,
  concept,
  seed,
  confidence,
  largeTargets,
  thinkFirst = false,
  kicker,
  onAnswer,
}: {
  item: ReviewItem;
  concept: Concept;
  seed: number;
  confidence: boolean;
  largeTargets: boolean;
  thinkFirst?: boolean; // hide the options until the learner has an answer in mind (not for true/false, where there is nothing to hide)
  kicker?: React.ReactNode;
  onAnswer: (correct: boolean, confidence: Confidence, meta?: CardMeta) => void;
}) {
  if (item.source === "quiz") {
    const q: Question = concept.quiz[item.index % concept.quiz.length];
    return <ChoiceQuestion prompt={q.question} options={q.options} answer={q.answer} why={q.why} seed={seed} confidence={confidence} largeTargets={largeTargets} thinkFirst={thinkFirst} kicker={kicker} onAnswer={onAnswer} />;
  }
  if (item.source === "blitz") {
    const b = concept.blitz[item.index % concept.blitz.length];
    return <TrueFalseQuestion statement={b.statement} truth={b.truth} why={b.why} confidence={confidence} largeTargets={largeTargets} kicker={kicker} onAnswer={onAnswer} />;
  }
  if (item.source === "blank") {
    const b = concept.blanks[item.index % concept.blanks.length];
    return (
      <ChoiceQuestion
        prompt={<GapSentence sentence={b.sentence} />}
        options={b.options}
        answer={b.answer}
        why={`The word is "${b.options[b.answer]}". ${concept.keyPoints[0]}`}
        seed={seed}
        confidence={confidence}
        largeTargets={largeTargets}
        thinkFirst={thinkFirst}
        kicker={kicker}
        onAnswer={onAnswer}
      />
    );
  }
  // pair: which meaning belongs to this term? Two distractors come from the concept's other pairs.
  const pair = concept.pairs[item.index % concept.pairs.length];
  const others = concept.pairs.filter((p) => p !== pair).map((p) => p.match);
  const distractors = shuffle(others, mulberry32(seed + 7)).slice(0, 2);
  const options = [pair.match, ...distractors];
  return (
    <ChoiceQuestion
      prompt={<>Which one describes <span className="text-focus">{pair.term}</span>?</>}
      options={options}
      answer={0}
      why={`${pair.term}: ${pair.match}.`}
      seed={seed}
      confidence={confidence}
      largeTargets={largeTargets}
      thinkFirst={thinkFirst}
      kicker={kicker}
      onAnswer={onAnswer}
    />
  );
}
