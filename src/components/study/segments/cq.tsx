"use client";

import { useState } from "react";
import { ArrowRight, Exam } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Kicker } from "@/components/study/segments/learn";
import { SteadyNote } from "@/components/study/tuning";
import { cn } from "@/lib/utils";
import type { CreativeQuestion } from "@/content/types";

const PARTS = [
  { key: "knowledge", letter: "ক", label: "Knowledge", marks: 1 },
  { key: "comprehension", letter: "খ", label: "Comprehension", marks: 2 },
  { key: "application", letter: "গ", label: "Application", marks: 3 },
  { key: "higherOrder", letter: "ঘ", label: "Higher-order thinking", marks: 4 },
] as const;

/* The board exam's creative question (সৃজনশীল প্রশ্ন), practised after a chapter's
   checkpoint: a scenario, then four parts of rising demand. The learner answers
   each in writing or in their head, sees the answer a marker would accept, and
   marks themselves. Self-marking is practice and a signal, never memory evidence. */
export function CqSegment({
  cq,
  unit,
  largeTargets,
  onDone,
}: {
  cq: CreativeQuestion;
  unit: number;
  largeTargets: boolean;
  onDone: (marks: number[]) => void;
}) {
  const [part, setPart] = useState(0);
  const [shown, setShown] = useState(false);
  const [draft, setDraft] = useState("");
  const [marks, setMarks] = useState<number[]>([]);
  const total = marks.reduce((a, b) => a + b, 0);

  const stem = (
    <div className="surface rounded-[24px] p-6 md:p-7 flex flex-col gap-2" data-testid="cq-stem">
      <p className="text-sm font-semibold text-muted-foreground">Scenario <span lang="bn">· উদ্দীপক</span></p>
      <p className="text-[16px] leading-7">{cq.stem}</p>
    </div>
  );

  if (part >= PARTS.length) {
    const weakest = PARTS.map((p, i) => ({ ...p, share: (marks[i] ?? 0) / p.marks })).sort((a, b) => a.share - b.share)[0];
    return (
      <section className="flex flex-col gap-6 m-enter" data-testid="segment-cq" data-step="summary">
        <Kicker><span className="inline-flex items-center gap-2 text-focus"><Exam size={16} weight="bold" /> Creative question · chapter {unit}</span></Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">You marked yourself {total} of 10.</h1>
        <p className="lede">
          {weakest.share >= 1
            ? "Full marks on every part. Board questions on this chapter should hold no surprises."
            : `The part to practise is ${weakest.letter}, ${weakest.label.toLowerCase()}. ${weakest.key === "higherOrder" ? "Higher-order answers earn their marks by giving a judgement and the reasons for it." : weakest.key === "application" ? "Application answers earn their marks by showing each step on the scenario's numbers." : "Learn the definitions word for word; the rest of the question builds on them."}`}
        </p>
        <div className="flex justify-end pt-2 border-t border-border">
          <Button size="lg" className="mt-4" onClick={() => onDone(marks)} data-testid="cq-done">Continue <ArrowRight size={18} weight="bold" /></Button>
        </div>
      </section>
    );
  }

  const p = PARTS[part];
  const item = cq[p.key];
  const mark = (m: number) => { setMarks((ms) => [...ms, m]); setPart((x) => x + 1); setShown(false); setDraft(""); };

  return (
    <section className="flex flex-col gap-6 m-enter" data-testid="segment-cq" data-step={part} key={part}>
      <Kicker><span className="inline-flex items-center gap-2 text-focus"><Exam size={16} weight="bold" /> Creative question · <span lang="bn">সৃজনশীল প্রশ্ন</span> · part {part + 1} of 4</span></Kicker>
      {part === 0 && !shown && <SteadyNote />}
      {stem}
      <div className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5">
        <p className="text-sm font-semibold text-muted-foreground"><span lang="bn">{p.letter}</span> · {p.label} · {p.marks} {p.marks === 1 ? "mark" : "marks"}</p>
        <p className="font-display text-xl md:text-2xl font-semibold leading-snug">{item.q}</p>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write your answer, or answer it in your head"
          rows={p.marks >= 3 ? 5 : 3}
          disabled={shown}
          data-testid="cq-input"
          className="text-[16px]"
        />
        {!shown ? (
          <Button variant="outline" className="self-start" onClick={() => setShown(true)} data-testid="cq-show">Show the model answer</Button>
        ) : (
          <div className="flex flex-col gap-4 m-enter">
            <div className="rounded-2xl bg-sprout-soft/70 p-5 text-[15px] leading-7" data-testid="cq-answer">
              <span className="font-semibold">A full-marks answer: </span>{item.a}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">How many of the {p.marks} {p.marks === 1 ? "mark" : "marks"} would yours get?</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Mark your answer">
                {Array.from({ length: p.marks + 1 }, (_, m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => mark(m)}
                    data-testid={`cq-mark-${m}`}
                    className={cn("tap rounded-full border border-input bg-card px-4 py-2 text-[15px] font-semibold tabular-nums hover:border-foreground/35", largeTargets && "px-5 py-3 text-[17px]")}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
