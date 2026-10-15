"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb, Pause, Play, Sparkle, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useTuning } from "@/components/study/tuning";
import { ChoiceQuestion } from "@/components/study/question-card";
import { cn } from "@/lib/utils";
import { tint, tintOrder } from "@/lib/tint";
import { formatLabel, type Confidence, type LearnFormat, type ReadSample, type Segment } from "@/lib/study";
import { SayBack, type SayResult } from "@/components/study/segments/say-back";
import { Listen, Spoken, useReadAloud, type Chunk } from "@/components/study/read-aloud";
import { visualFor, visualUrl } from "@/lib/visuals";
import type { Concept } from "@/content/types";

type LearnSeg = Extract<Segment, { kind: "learn" }>;

/* Today's idea, presented in the format the engine chose, inside a fixed loop
   of doing: Guess (the misconception, true or false), Try (a go at the example
   before it is explained), See (the format body, then the misconception named
   and corrected), Say (the idea said back before the key points appear). Only
   the See wrapper changes with the format. */
export function LearnSegment({
  segment,
  concept,
  seed,
  largeTargets,
  isKid,
  confidence,
  pretestAnswer,
  said,
  pictures = false,
  onPretest,
  onTry,
  onSay,
  onSwitch,
  onAnswer,
  onDone,
}: {
  segment: LearnSeg;
  concept: Concept;
  seed: number;
  largeTargets: boolean;
  isKid: boolean;
  confidence: boolean;
  pictures?: boolean;      // show the idea's illustration when one exists
  pretestAnswer?: boolean; // what the learner guessed, kept by the session so a format switch does not lose it
  said?: string;           // what they said last time, if they are replaying
  onPretest: (saidTrue: boolean) => void;
  onTry: (correct: boolean, confidence: Confidence, read?: ReadSample) => void;  // the go at the example before the explanation
  onSay: (result: SayResult) => void;                         // the teach-back
  onSwitch: (() => void) | null; // null once the learner has already switched this sitting
  onAnswer: (correct: boolean) => void; // the "try it" example inside the challenge format
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"pretest" | "try" | "learn">(segment.pretest ? "pretest" : segment.tryFirst ? "try" : "learn");
  const [tried, setTried] = useState(false);
  const [saidDone, setSaidDone] = useState(segment.sayBack === "none");
  const [deeper, setDeeper] = useState(false);
  const { goDeeper } = useTuning();
  const { on: readOn, autoQuestions } = useReadAloud();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [phase]); // guess, try and lesson each open at their top
  const saidTrue = pretestAnswer ?? null;
  const scene = pictures ? visualFor(concept.id, "scene") : null;

  if (phase === "pretest") {
    return (
      <section data-testid="segment-learn" data-phase="pretest" className="flex flex-col gap-6 m-enter">
        <Kicker>Before we start</Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">True or false?</h1>
        <div className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-6">
          <p className="font-display text-2xl font-semibold leading-snug"><Spoken k="belief" text={concept.misconception.belief} /></p>
          <Listen auto={autoQuestions} chunks={() => [{ key: "belief", text: concept.misconception.belief }]} />
          <p className="text-[15px] text-muted-foreground">A guess is fine. Guessing first makes the idea stick better, even when the guess is wrong.</p>
          <div className="flex gap-3">
            {[true, false].map((v) => (
              <Button
                key={String(v)}
                size="lg"
                variant="outline"
                className={cn("tap flex-1 text-base", largeTargets && "h-16 text-lg")}
                data-testid={v ? "pretest-true" : "pretest-false"}
                // A wrong guess means the idea is new: explain it first rather than ask them to try (docs/age-learning-rd.md).
                onClick={() => { onPretest(v); setPhase(segment.tryFirst && !v ? "try" : "learn"); }}
              >
                {v ? "True" : "False"}
              </Button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (phase === "try") {
    return (
      <section data-testid="segment-learn" data-phase="try" className="flex flex-col gap-6 m-enter">
        <Kicker>Have a go first</Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Try it before we explain</h1>
        <div className="surface rounded-[28px] p-6 md:p-8">
          <ChoiceQuestion
            kicker={<p className="text-[15px] text-muted-foreground">Wrong is fine. A guess now is what makes the explanation land.</p>}
            prompt={concept.example.question}
            options={concept.example.options}
            answer={concept.example.answer}
            why={concept.example.why}
            seed={seed}
            confidence={confidence}
            largeTargets={largeTargets}
            onAnswer={(c, conf, meta) => { setTried(true); onTry(c, conf, meta?.read); }}
          />
        </div>
        {tried && (
          <div className="flex justify-end">
            <Button size="lg" onClick={() => setPhase("learn")} data-testid="try-continue">
              See how it works
              <ArrowRight size={18} weight="bold" />
            </Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section data-testid="segment-learn" data-phase="learn" data-format={segment.format} className="flex flex-col gap-8 m-enter">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <FormatChip format={segment.format} />
          {segment.exploring && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-play-soft text-play px-3 py-1 text-sm font-semibold">
              <Sparkle size={14} weight="fill" /> Trying something new
            </span>
          )}
          {segment.corrective && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-soft text-sun-deep px-3 py-1 text-sm font-semibold" data-testid="corrective">
              <Sparkle size={14} weight="fill" /> Second look, a different way in
            </span>
          )}
        </div>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{concept.title}</h1>
        <p className="lede"><Spoken k="hook" text={concept.hook} /></p>
        <Listen auto={readOn} label="Read it to me" chunks={() => lessonChunks(concept, segment.format, segment.compact)} />
        {/* Curriculum lessons: the key words with the Bangla term from the Bangla-medium book, before the idea uses them. */}
        {concept.glossary && (
          <div className="flex flex-col gap-2" data-testid="glossary">
            <p className="text-sm font-semibold text-muted-foreground">Key words <span lang="bn">· মূল শব্দ</span></p>
            <ul className="flex flex-wrap gap-2">
              {concept.glossary.map((g) => (
                <li key={g.term} className="rounded-full bg-card px-3 py-1.5 text-sm font-semibold shadow-[var(--shadow-hairline)]">
                  {g.term} <span className="font-medium text-muted-foreground" lang="bn">· {g.bn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* The idea pictured, when a generated illustration exists for it. Alt text is the authored hook, never model output. */}
      {scene && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={visualUrl(scene.src)}
          alt={scene.alt}
          width={scene.w}
          height={scene.h}
          data-testid="scene-visual"
          className="m-enter aspect-[2/1] w-full rounded-[24px] bg-muted object-cover shadow-[var(--shadow-hairline)]"
        />
      )}

      <FormatBody format={segment.format} concept={concept} compact={segment.compact} isKid={isKid} onAnswer={onAnswer} />

      {/* For the curious: the precise explanation, one tap away in every format that is not already the deep read. */}
      {goDeeper && segment.format !== "reading" && !isKid && (
        deeper ? (
          <div className="surface rounded-[24px] p-6 md:p-8 flex flex-col gap-4 m-enter" data-testid="go-deeper-text">
            <p className="text-sm font-semibold text-muted-foreground">The deeper version</p>
            {concept.deepRead.map((p, i) => <p key={i} className="text-[16px] leading-8">{p}</p>)}
          </div>
        ) : (
          <button type="button" onClick={() => setDeeper(true)} className="self-start text-[15px] font-semibold text-focus hover:underline underline-offset-4" data-testid="go-deeper">
            Go deeper: why it works
          </button>
        )
      )}

      {/* Refutation: the misconception, named and corrected. */}
      <div className="rounded-[24px] bg-sun-soft/70 p-6 flex gap-4" data-testid="misconception">
        <Warning size={24} weight="duotone" className="shrink-0 text-sun-deep mt-0.5" />
        <div className="flex flex-col gap-2 text-[15px] leading-7">
          <p>
            <span className="font-semibold">Many people think: </span>
            <span className="italic">“<Spoken k="mis-belief" text={concept.misconception.belief} />”</span>
          </p>
          <p><Spoken k="mis-fix" text={concept.misconception.correction} /></p>
          {saidTrue !== null && (
            <p className="text-sm font-semibold text-sun-deep">
              {saidTrue ? "You said true earlier. This is the catch." : "You already had this right."}
            </p>
          )}
        </div>
      </div>

      {/* Say it back: produce the idea before the key points are shown, then compare. */}
      {segment.sayBack !== "none" && (
        <SayBack
          mode={segment.sayBack}
          concept={concept}
          seed={seed}
          largeTargets={largeTargets}
          initialText={said ?? ""}
          onDone={(r) => { onSay(r); setSaidDone(true); }}
        />
      )}

      {saidDone && (
        <div className="surface rounded-[24px] p-6 flex flex-col gap-3 m-enter" data-testid="key-points">
          <p className="text-sm font-semibold text-muted-foreground">{segment.sayBack === "none" ? "Three things to remember" : "Compare with ours: three things to remember"}</p>
          <ol className="flex flex-col gap-2.5">
            {concept.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-7">
                <span className="font-display text-sprout font-semibold tabular-nums">{i + 1}</span>
                {k}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
        <Button variant="ghost" onClick={onSwitch ?? undefined} disabled={!onSwitch} className="mt-4 -ml-3" data-testid="another-way">
          Show me another way
        </Button>
        {saidDone && (
          <Button size="lg" onClick={onDone} className="mt-4" data-testid="learn-done">
            Got it
            <ArrowRight size={18} weight="bold" />
          </Button>
        )}
      </div>
    </section>
  );
}

/* What "Read it to me" reads: the lesson as this format shows it, then the misconception and its correction.
   Keys match the Spoken wrappers below, so the sentence being read lights up where it is shown. */
export function lessonChunks(concept: Concept, format: LearnFormat, compact: boolean): Chunk[] {
  const steps = concept.steps.flatMap((st, i) => [{ key: `step-label-${i}`, text: st.label }, { key: `step-${i}`, text: st.text }]);
  const analogy = { key: "analogy", text: concept.analogy };
  const body: Chunk[] =
    format === "story" ? [...concept.story.map((p, i) => ({ key: `story-${i}`, text: p })), ...(compact ? [] : steps), analogy]
      : format === "reading" ? [...concept.deepRead.map((p, i) => ({ key: `deep-${i}`, text: p })), ...steps]
        : format === "challenge" ? []
          : [...steps, analogy];
  return [
    { key: "hook", text: concept.hook },
    ...body,
    { key: "mis-intro", text: "Many people think:" },
    { key: "mis-belief", text: concept.misconception.belief },
    { key: "mis-fix", text: concept.misconception.correction },
  ];
}

export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm font-semibold text-muted-foreground", className)}>{children}</p>;
}

export function FormatChip({ format }: { format: LearnFormat }) {
  const colour = format === "story" ? "sun" : format === "reading" || format === "challenge" ? "sprout" : "focus";
  const t = tint[colour];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold", t.chip)}>
      <span className={cn("size-2 rounded-full", t.bar)} aria-hidden />
      {formatLabel(format)}
    </span>
  );
}

export function FormatBody({ format, concept, compact, isKid, onAnswer }: { format: LearnFormat; concept: Concept; compact: boolean; isKid: boolean; onAnswer: (correct: boolean) => void }) {
  if (format === "video") return <Walkthrough concept={concept} />;
  if (format === "story") return <Story concept={concept} compact={compact} />;
  if (format === "reading") return <DeepRead concept={concept} isKid={isKid} />;
  if (format === "challenge") return <Challenge concept={concept} onAnswer={onAnswer} />;
  return <Infographic concept={concept} />;
}

export function StepsGrid({ concept, className }: { concept: Concept; className?: string }) {
  return (
    <ol className={cn("grid sm:grid-cols-2 gap-3", className)} data-testid="steps">
      {concept.steps.map((st, i) => {
        const t = tint[tintOrder[i % 4]];
        return (
          <li key={i} className={cn("rounded-2xl p-4 md:p-5 flex gap-4 m-enter", t.soft)} style={{ "--m-delay": `${i * 70}ms` } as React.CSSProperties}>
            <span className={cn("font-display text-2xl font-semibold leading-none tabular-nums", t.text)}>{i + 1}</span>
            <div>
              <p className="text-[15px] font-semibold leading-snug"><Spoken k={`step-label-${i}`} text={st.label} /></p>
              <p className="text-[15px] text-ink/75 leading-7 mt-1"><Spoken k={`step-${i}`} text={st.text} /></p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Analogy({ text }: { text: string }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-muted/80 p-5">
      <Lightbulb size={22} weight="duotone" className="shrink-0 text-sun-deep mt-0.5" />
      <p className="text-[15px] leading-7">
        <span className="font-semibold">Picture it. </span>
        <Spoken k="analogy" text={text} />
      </p>
    </div>
  );
}

function Infographic({ concept }: { concept: Concept }) {
  return (
    <div className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-4">
      <StepsGrid concept={concept} />
      <Analogy text={concept.analogy} />
    </div>
  );
}

/* One step at a time, learner-paced, with an optional autoplay. Reads like a
   short video without pretending to be one. */
function Walkthrough({ concept }: { concept: Concept }) {
  const total = concept.steps.length + 1; // steps, then the analogy as the closing line
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((x) => (x + 1 >= total ? (setAuto(false), x) : x + 1)), 6000);
    return () => clearInterval(id);
  }, [auto, total]);
  const step = concept.steps[i];
  const t = tint[tintOrder[i % 4]];
  return (
    <div className="rounded-[28px] bg-ink text-white p-6 md:p-8 flex flex-col gap-6 overflow-hidden" data-testid="walkthrough">
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-white/60">
        <span>Step {Math.min(i + 1, concept.steps.length)} of {concept.steps.length}</span>
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          aria-pressed={auto}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 hover:bg-white/10"
        >
          {auto ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
          {auto ? "Pause" : "Autoplay"}
        </button>
      </div>
      <div key={i} className="min-h-[180px] flex flex-col gap-3 m-enter">
        {step ? (
          <>
            <p className={cn("font-display text-sm font-semibold", t.text === "text-sun-deep" ? "text-sun" : t.text.replace("text-", "text-"))}>{step.label}</p>
            <p className="font-display text-2xl md:text-[2rem] font-semibold leading-[1.2]"><Spoken k={`step-${i}`} text={step.text} /></p>
          </>
        ) : (
          <>
            <p className="font-display text-sm font-semibold text-sun">Picture it</p>
            <p className="font-display text-2xl md:text-[2rem] font-semibold leading-[1.2]"><Spoken k="analogy" text={concept.analogy} /></p>
          </>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-white/15 overflow-hidden" aria-hidden>
        <span className="block h-full rounded-full bg-sun m-fill" style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" disabled={i === 0} onClick={() => setI((x) => Math.max(0, x - 1))}>
          <ArrowLeft size={16} weight="bold" /> Back
        </Button>
        <Button variant="white" disabled={i + 1 >= total} onClick={() => setI((x) => Math.min(total - 1, x + 1))} data-testid="walk-next">
          Next <ArrowRight size={16} weight="bold" />
        </Button>
      </div>
    </div>
  );
}

function Story({ concept, compact }: { concept: Concept; compact: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[28px] bg-sun-soft/60 p-6 md:p-8 prose-tight text-[17px] leading-8" data-testid="story">
        {concept.story.map((p, i) => <p key={i}><Spoken k={`story-${i}`} text={p} /></p>)}
      </div>
      {!compact && <StepsGrid concept={concept} />}
      <Analogy text={concept.analogy} />
    </div>
  );
}

function DeepRead({ concept, isKid }: { concept: Concept; isKid: boolean }) {
  // Pre-readers never get the long read (the engine rules it out); a corrective that lands here shows the story instead.
  const paragraphs = isKid ? concept.story : concept.deepRead;
  const k = isKid ? "story" : "deep";
  return (
    <div className="flex flex-col gap-4">
      <div className="surface rounded-[28px] p-6 md:p-8 prose-tight text-[16px] leading-8 max-w-prose" data-testid="deep-read">
        {paragraphs.map((p, i) => <p key={i}><Spoken k={`${k}-${i}`} text={p} /></p>)}
      </div>
      <StepsGrid concept={concept} />
    </div>
  );
}

function Challenge({ concept, onAnswer }: { concept: Concept; onAnswer: (correct: boolean) => void }) {
  const [answered, setAnswered] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="surface rounded-[28px] p-6 md:p-8" data-testid="challenge">
        <ChoiceQuestion
          kicker={<Kicker>Try it first</Kicker>}
          prompt={concept.example.question}
          options={concept.example.options}
          answer={concept.example.answer}
          why={concept.example.why}
          seed={concept.id.length}
          onAnswer={(c) => { setAnswered(true); onAnswer(c); }}
        />
      </div>
      {answered && (
        <div className="flex flex-col gap-4 m-enter">
          <StepsGrid concept={concept} />
          <Analogy text={concept.analogy} />
        </div>
      )}
    </div>
  );
}
