"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChatCircleText, Check, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { buildChips, coverage, mulberry32, SAID_MAX, shuffle, type SayMode } from "@/lib/study";
import type { Concept } from "@/content/types";

export interface SayResult { mode: Exclude<SayMode, "none">; text?: string; correct?: boolean; skipped: boolean }

/** The words a good explanation would use: authored, or the matching-game terms. */
export function termsFor(concept: Concept): string[] {
  return concept.terms ?? concept.pairs.map((p) => p.term);
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/* Say it back: the generative step between seeing the idea and being shown the
   key points. Typing it for a friend, or rebuilding a key point from chips,
   both make the learner produce the idea rather than recognise it. */
export function SayBack({ mode, concept, seed, largeTargets, initialText = "", onDone }: {
  mode: Exclude<SayMode, "none">;
  concept: Concept;
  seed: number;
  largeTargets: boolean;
  initialText?: string;
  onDone: (result: SayResult) => void;
}) {
  // Typing is never the only way: chips are one tap away (phone keyboards are slow for children and for 60+).
  const [now, setNow] = useState(mode);
  return now === "type"
    ? <TypeIt concept={concept} largeTargets={largeTargets} initialText={initialText} onDone={onDone} onChips={() => setNow("build")} />
    : <BuildIt concept={concept} seed={seed} largeTargets={largeTargets} onDone={onDone} />;
}

function Heading({ children }: { children?: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-muted-foreground">
      <span className="inline-flex items-center gap-2 text-play"><ChatCircleText size={16} weight="bold" /> Say it back</span>
      {children}
    </p>
  );
}

function TypeIt({ concept, largeTargets, initialText, onDone, onChips }: { concept: Concept; largeTargets: boolean; initialText: string; onDone: (r: SayResult) => void; onChips: () => void }) {
  const [text, setText] = useState(initialText);
  const [submitted, setSubmitted] = useState(false);
  const terms = termsFor(concept);
  const cov = coverage(text, terms);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = words >= 5;

  return (
    <div className="surface rounded-[24px] p-6 flex flex-col gap-4" data-testid="say-back" data-mode="type">
      <Heading />
      <p className="font-display text-xl font-semibold leading-snug">{concept.sayPrompt ?? <>Explain “{lower(concept.title)}” to a friend who missed today.</>}</p>
      {!submitted ? (
        <>
          <p className="text-[15px] text-muted-foreground leading-6">One or two lines. Putting it in your own words is what moves it into memory. Tomorrow&apos;s rewind shows it back to you.</p>
          <Textarea
            value={text}
            maxLength={SAID_MAX}
            rows={3}
            placeholder="It is…"
            onChange={(e) => setText(e.target.value)}
            className={cn(largeTargets && "text-lg")}
            data-testid="say-input"
            aria-label="Your explanation"
          />
          <div className="flex flex-wrap items-center gap-2" aria-label="Words that help">
            <span className="text-sm text-muted-foreground mr-1">Words that help:</span>
            {terms.map((t) => {
              const hit = cov.hit.includes(t);
              return (
                <span key={t} data-testid="term" data-hit={hit} className={cn("rounded-full px-3 py-1 text-sm font-semibold border transition-colors", hit ? "bg-sprout text-white border-sprout" : "bg-card border-input text-muted-foreground")}>
                  {hit && <Check size={12} weight="bold" className="inline mr-1 -mt-0.5" />}{t}
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex flex-wrap items-center gap-1">
              <Button variant="ghost" className="-ml-3" onClick={() => onDone({ mode: "type", skipped: true })} data-testid="say-skip">Skip this time</Button>
              <Button variant="ghost" onClick={onChips} data-testid="say-chips">Build it from words instead</Button>
            </span>
            <Button onClick={() => { setSubmitted(true); onDone({ mode: "type", text, skipped: false }); }} disabled={!canSubmit} data-testid="say-submit">
              Compare with ours <ArrowRight size={16} weight="bold" />
            </Button>
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-sprout-soft/70 p-5 text-[15px] leading-7 m-enter" data-testid="say-feedback">
          <p><span className="font-semibold">You said: </span>“{text.trim()}”</p>
          <p className="mt-2">
            {cov.hit.length ? `You used ${cov.hit.length} of ${terms.length} key terms. ` : "You put it your own way. "}
            {cov.missed.length ? `Worth working in next time: ${cov.missed.slice(0, 2).join(", ")}. ` : "Nothing missing. "}
            Now compare it with the three points below.
          </p>
        </div>
      )}
    </div>
  );
}

type Status = "building" | "retry" | "solved" | "revealed";

function BuildIt({ concept, seed, largeTargets, onDone }: { concept: Concept; seed: number; largeTargets: boolean; onDone: (r: SayResult) => void }) {
  const target = concept.keyPoints[seed % concept.keyPoints.length];
  const chips = useMemo(() => {
    const set = buildChips(target, concept.misconception.belief, seed);
    const all = [...set.pieces.map((text, piece) => ({ text, piece })), ...set.distractors.map((text) => ({ text, piece: -1 }))];
    return { pieces: set.pieces.length, all: shuffle(all, mulberry32(seed + 3)) };
  }, [target, concept.misconception.belief, seed]);
  const [placed, setPlaced] = useState<number[]>([]); // indexes into chips.all, in the order tapped
  const [status, setStatus] = useState<Status>("building");
  const [wrongAt, setWrongAt] = useState<number | null>(null);
  const live = status === "building" || status === "retry";
  const full = placed.length === chips.pieces;

  const place = (i: number) => { if (live && !placed.includes(i)) { setPlaced((p) => [...p, i]); setWrongAt(null); } };
  const remove = (i: number) => { if (live) { setPlaced((p) => p.filter((x) => x !== i)); setWrongAt(null); } };

  function check() {
    const seq = placed.map((i) => chips.all[i].piece);
    const firstWrong = seq.findIndex((p, idx) => p !== idx);
    if (firstWrong === -1) { setStatus("solved"); onDone({ mode: "build", correct: status === "building", skipped: false }); return; }
    if (status === "building") { setStatus("retry"); setWrongAt(firstWrong); return; }
    setStatus("revealed");
    onDone({ mode: "build", correct: false, skipped: false });
  }

  const rightSoFar = placed.map((i) => chips.all[i].piece).filter((p, idx) => p === idx).length;
  const chipClass = cn("tap rounded-full border px-4 py-2 text-[15px] font-medium transition-colors", largeTargets && "text-[17px] px-5 py-3");

  return (
    <div className="surface rounded-[24px] p-6 flex flex-col gap-4" data-testid="say-back" data-mode="build" data-status={status}>
      <Heading />
      <p className="font-display text-xl font-semibold leading-snug">Build the sentence</p>
      <p className="text-[15px] text-muted-foreground leading-6">Tap the pieces in order to say one of today&apos;s points. Two pieces do not belong.</p>

      <div className={cn("min-h-16 rounded-2xl border border-dashed p-3 flex flex-wrap gap-2 items-center", wrongAt !== null ? "border-ember/50" : "border-focus/40 bg-focus-soft/30")} data-testid="build-line" aria-label="Your sentence">
        {placed.length === 0 && <span className="text-[15px] text-muted-foreground px-2">Your sentence appears here</span>}
        {placed.map((i, idx) => {
          const wrong = wrongAt !== null && idx === wrongAt;
          const settled = !live;
          const right = settled && chips.all[i].piece === idx;
          return (
            <button key={i} type="button" disabled={!live} onClick={() => remove(i)} data-testid="placed" aria-label={`Remove: ${chips.all[i].text}`}
              className={cn(chipClass, "bg-card border-input", wrong && "m-flash-ember border-ember/60", right && "bg-sprout text-white border-sprout", settled && !right && "text-muted-foreground/70")}>
              {chips.all[i].text}
            </button>
          );
        })}
      </div>

      {live && (
        <div className="flex flex-wrap gap-2" aria-label="Pieces">
          {chips.all.map((c, i) => placed.includes(i) ? null : (
            <button key={i} type="button" onClick={() => place(i)} data-testid="build-chip" data-piece={c.piece}
              className={cn(chipClass, "bg-card border-input hover:border-foreground/35 hover:shadow-[var(--shadow-card)]")}>
              {c.text}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {status === "retry" && <p className="text-[15px] leading-7 text-muted-foreground" data-testid="build-feedback">{rightSoFar} in the right place. The first slip is marked. Fix it and check once more.</p>}
        {status === "solved" && <p className="rounded-2xl bg-sprout-soft/70 p-4 text-[15px] leading-7 m-enter" data-testid="build-feedback"><span className="font-semibold inline-flex items-center gap-1"><Check size={16} weight="bold" /> That is it.</span> Now see it beside the other two points below.</p>}
        {status === "revealed" && (
          <div className="rounded-2xl bg-sun-soft/70 p-4 text-[15px] leading-7 m-enter" data-testid="build-feedback">
            <p className="font-semibold inline-flex items-center gap-1"><X size={16} weight="bold" /> Not this time. Here it is in full:</p>
            <p className="mt-1">{target}</p>
          </div>
        )}
      </div>

      {live && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" className="-ml-3" onClick={() => onDone({ mode: "build", skipped: true })} data-testid="say-skip">Skip this time</Button>
          <Button onClick={check} disabled={!full} data-testid="build-check">{status === "retry" ? "Check again" : "Check"} <ArrowRight size={16} weight="bold" /></Button>
        </div>
      )}
    </div>
  );
}
