"use client";

// What the tutor can put into the conversation besides words. Checked ideas
// come from the app's own lessons (src/content); a check is always marked
// against a stored key on this device, never by the model. The tutor chooses
// which card and when; the card does the showing, asking and marking.

import { useState } from "react";
import { BookOpen, Check, Flag } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { ChoiceQuestion, ReviewItemCard, type CardMeta } from "@/components/study/question-card";
import { FormatBody, Kicker, lessonChunks } from "@/components/study/segments/learn";
import { Listen } from "@/components/study/read-aloud";
import type { Confidence, LearnFormat, ReviewItem } from "@/lib/study";
import type { ShowAs } from "@/lib/tutor/tools";
import type { OwnIdea } from "@/lib/tutor/ideas";
import type { Concept } from "@/content/types";

export const showFormat: Record<Exclude<ShowAs, "keyPoints">, LearnFormat> = { picture: "infographic", steps: "video", story: "story", explanation: "reading" };

export function CardShell({ children, className, testId }: { children: React.ReactNode; className?: string; testId?: string }) {
  return <div className={cn("surface rounded-[24px] p-5 md:p-6 flex flex-col gap-4 m-enter", className)} data-testid={testId}>{children}</div>;
}

/* One of a checked idea's ready-made explanations, as the lesson player shows it. */
export function ShowCard({ concept, as, isKid }: { concept: Concept; as: ShowAs; isKid: boolean }) {
  if (as === "keyPoints") {
    return (
      <CardShell testId="tutor-show" className="gap-3">
        <p className="text-sm font-semibold text-muted-foreground">Three things to remember</p>
        <ol className="flex flex-col gap-2.5">
          {concept.keyPoints.map((k, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-7">
              <span className="font-display text-sprout font-semibold tabular-nums">{i + 1}</span>
              {k}
            </li>
          ))}
        </ol>
      </CardShell>
    );
  }
  const format = showFormat[as];
  return (
    <div className="flex flex-col gap-3 m-enter" data-testid="tutor-show" data-as={as}>
      <div className="flex items-center justify-between gap-3">
        <Kicker>{concept.title}</Kicker>
        <Listen chunks={() => lessonChunks(concept, format, false).filter((c) => !c.key.startsWith("mis-") && c.key !== "hook")} />
      </div>
      <FormatBody format={format} concept={concept} compact={false} isKid={isKid} onAnswer={() => {}} />
    </div>
  );
}

const stepTints = ["focus", "sun", "sprout", "play"] as const;

/* A process or worked example the tutor laid out, for a topic with no checked lesson. */
export function StepsCard({ title, steps }: { title: string; steps: { label: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-3 m-enter" data-testid="tutor-steps">
      <Kicker>{title}</Kicker>
      <ol className="grid sm:grid-cols-2 gap-3">
        {steps.map((st, i) => {
          const t = tint[stepTints[i % 4]];
          return (
            <li key={i} className={cn("rounded-2xl p-4 md:p-5 flex gap-4", t.soft)}>
              <span className={cn("font-display text-2xl font-semibold leading-none tabular-nums", t.text)}>{i + 1}</span>
              <div>
                <p className="text-[15px] font-semibold leading-snug">{st.label}</p>
                <p className="text-[15px] text-ink/75 leading-7 mt-1">{st.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* True or false on a checked idea's common mistake, before it is taught. A guess, never a mark. */
export function GuessCard({ concept, answered, largeTargets, onGuess }: { concept: Concept; answered: boolean | null; largeTargets: boolean; onGuess: (saidTrue: boolean) => void }) {
  return (
    <CardShell testId="tutor-guess">
      <p className="text-sm font-semibold text-muted-foreground">True or false? A guess is fine</p>
      <p className="font-display text-xl md:text-2xl font-semibold leading-snug">{concept.misconception.belief}</p>
      {answered === null ? (
        <div className="flex gap-3">
          {[true, false].map((v) => (
            <Button key={String(v)} size="lg" variant="outline" className={cn("tap flex-1 text-base", largeTargets && "h-16 text-lg")} data-testid={v ? "guess-true" : "guess-false"} onClick={() => onGuess(v)}>
              {v ? "True" : "False"}
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-[15px] text-muted-foreground">You guessed <span className="font-semibold text-foreground">{answered ? "true" : "false"}</span>.</p>
      )}
    </CardShell>
  );
}

/* A finished multiple-choice card: what was asked and what they chose. */
function Answered({ question, chose, right, testId }: { question: string; chose: string; right: boolean; testId: string }) {
  return (
    <CardShell testId={testId} className="gap-2">
      <p className="text-[16px] font-semibold leading-snug">{question}</p>
      <p className={cn("text-[15px] inline-flex items-center gap-1.5", right ? "text-sprout" : "text-muted-foreground")}>
        {right && <Check size={16} weight="bold" />}You chose: {chose || "—"}
      </p>
    </CardShell>
  );
}

/* A checked idea's example problem. Practice: the engine logs it as a try, never as memory evidence. */
export function TryCard({ concept, seed, confidence, largeTargets, done, onAnswer }: {
  concept: Concept; seed: number; confidence: boolean; largeTargets: boolean;
  done: { chose: string; right: boolean } | null;
  onAnswer: (right: boolean, conf: Confidence, meta?: CardMeta) => void;
}) {
  if (done) return <Answered question={concept.example.question} chose={done.chose} right={done.right} testId="tutor-try" />;
  return (
    <CardShell testId="tutor-try">
      <ChoiceQuestion kicker={<p className="text-sm font-semibold text-muted-foreground">Have a go. Wrong is fine</p>} prompt={concept.example.question} options={concept.example.options} answer={concept.example.answer} why={concept.example.why} seed={seed} confidence={confidence} largeTargets={largeTargets} onAnswer={onAnswer} />
    </CardShell>
  );
}

/* One marked question on a learned idea: a checked idea's review item, or the check the tutor stored with an idea of its own. */
export function CheckCard({ concept, item, own, seed, confidence, largeTargets, thinkFirst, done, onAnswer, onFlag }: {
  concept?: Concept; item?: ReviewItem; own?: OwnIdea;
  seed: number; confidence: boolean; largeTargets: boolean; thinkFirst: boolean;
  done: { question: string; chose: string; right: boolean } | null;
  onAnswer: (right: boolean, conf: Confidence, meta?: CardMeta) => void;
  onFlag?: () => void;
}) {
  const [flagged, setFlagged] = useState(false);
  if (done) return <Answered question={done.question} chose={done.chose} right={done.right} testId="tutor-check" />;
  const kicker = <p className="text-sm font-semibold text-muted-foreground">{concept?.title ?? own?.title}</p>;
  return (
    <CardShell testId="tutor-check">
      {concept && item ? (
        <ReviewItemCard item={item} concept={concept} seed={seed} confidence={confidence} largeTargets={largeTargets} thinkFirst={thinkFirst} kicker={kicker} onAnswer={onAnswer} />
      ) : own ? (
        <>
          <ChoiceQuestion kicker={kicker} prompt={own.check.question} options={own.check.options} answer={own.check.answer} why={own.check.why || own.keyPoint} seed={seed} confidence={confidence} largeTargets={largeTargets} thinkFirst={thinkFirst} onAnswer={onAnswer} />
          {onFlag && (
            flagged
              ? <p className="text-sm text-muted-foreground">Thanks. This question won&apos;t be asked again.</p>
              : <button type="button" onClick={() => { setFlagged(true); onFlag(); }} className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="flag-check"><Flag size={14} weight="bold" /> This question looks wrong</button>
          )}
        </>
      ) : null}
    </CardShell>
  );
}

/* Tap-to-answer options. One tap answers; with several allowed, tap all that fit, then Done. Typing instead always works. */
export function ChoicesCard({ options, multi, disabled, largeTargets, onChoose }: { options: string[]; multi: boolean; disabled: boolean; largeTargets: boolean; onChoose: (chose: string[]) => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const chip = (o: string, on: boolean) => cn(
    "tap rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors disabled:opacity-50 inline-flex items-center gap-1.5",
    on ? "bg-focus text-white border-focus" : "border-focus/40 bg-focus-soft/60 text-focus hover:bg-focus-soft",
    largeTargets && "px-5 py-3 text-base",
  );
  return (
    <div className="flex flex-col gap-3 m-enter" data-testid="tutor-choices" data-multi={multi}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = picked.includes(o);
          return (
            <button key={o} type="button" disabled={disabled} aria-pressed={multi ? on : undefined} data-testid="tutor-choice" className={chip(o, on)}
              onClick={() => (multi ? setPicked((p) => (on ? p.filter((x) => x !== o) : [...p, o])) : onChoose([o]))}>
              {multi && on && <Check size={14} weight="bold" />}{o}
            </button>
          );
        })}
      </div>
      {multi && <Button className="self-start" size="sm" disabled={disabled || !picked.length} onClick={() => onChoose(picked)} data-testid="choices-done">Done</Button>}
    </div>
  );
}

/* A quiet line where the tutor read checked material, so the learner can see it was not made up. */
export function SourceLine({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground" data-testid="tutor-source">
      <BookOpen size={15} weight="duotone" className="text-sprout" /> {text}
    </p>
  );
}

/* What the tutor recorded. */
export function RecordLine({ text, testId }: { text: string; testId: string }) {
  return <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-sprout" data-testid={testId}><Check size={15} weight="bold" /> {text}</p>;
}
