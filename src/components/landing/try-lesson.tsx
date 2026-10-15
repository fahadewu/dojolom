"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Lightbulb, SealCheck } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip, SubjectIcon, subjectIdByName } from "@/components/subject-icon";
import { cn } from "@/lib/utils";
import { tint, tintOrder } from "@/lib/tint";
import { demoLessons } from "@/lib/lessons";

/* A 60-second lesson to try without signing up: one infographic and one quick check. */
export function TryLesson() {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const lesson = demoLessons[lessonIdx];

  return (
    <section id="try" className="bg-ink text-white scroll-mt-16" data-testid="try">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col gap-8 mb-10">
          <div className="max-w-2xl flex flex-col gap-4">
            <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Try a 60-second lesson</h2>
            <p className="text-lg text-white/65 leading-8 max-w-xl">
              This is the infographic format: the idea in four coloured steps, one analogy, one check.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a demo lesson">
            {demoLessons.map((l, i) => {
              const on = lessonIdx === i;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setLessonIdx(i); setQuizAnswer(null); }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full pl-2.5 pr-4 py-1.5 text-sm font-semibold transition-colors border",
                    on ? "bg-white text-ink border-white" : "border-white/15 text-white/75 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <SubjectIcon id={subjectIdByName(l.subject)} size={16} className={on ? "text-focus" : "text-white/70"} />
                  {l.subject}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5 items-stretch">
          {/* Infographic */}
          <article className="rounded-[28px] bg-white text-ink p-6 md:p-9 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <SubjectChip id={subjectIdByName(lesson.subject)} size="sm" />
              <span className="text-sm font-semibold text-muted-foreground">{lesson.subject}</span>
            </div>
            <h3 className="text-2xl md:text-[2rem] font-semibold leading-[1.15] mb-3">{lesson.title}</h3>
            <p className="text-base text-muted-foreground leading-7 mb-8 max-w-prose">{lesson.hook}</p>

            <ol className="grid sm:grid-cols-2 gap-3">
              {lesson.steps.map((st, i) => {
                const t = tint[tintOrder[i % 4]];
                return (
                  <li key={st.label} className={cn("rounded-2xl p-4 md:p-5 flex gap-4", t.soft)}>
                    <span className={cn("font-display text-2xl font-semibold leading-none tabular-nums", t.text)}>{i + 1}</span>
                    <div>
                      <p className="text-[15px] font-semibold leading-snug">{st.label}</p>
                      <p className="text-sm text-ink/70 leading-6 mt-1">{st.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 flex gap-4 rounded-2xl bg-muted/80 p-5">
              <Lightbulb size={22} weight="duotone" className="shrink-0 text-sun-deep mt-0.5" />
              <p className="text-[15px] leading-7">
                <span className="font-semibold">Picture it. </span>
                {lesson.analogy}
              </p>
            </div>
          </article>

          {/* Quiz */}
          <aside className="rounded-[28px] bg-white/[0.06] ring-1 ring-white/10 p-6 md:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2.5 text-white/60">
              <SealCheck size={18} weight="duotone" />
              <p className="text-sm font-semibold">Quick check</p>
            </div>
            <p className="text-xl font-display font-semibold leading-snug">{lesson.quiz.question}</p>
            <div className="flex flex-col gap-2.5">
              {lesson.quiz.options.map((opt, i) => {
                const correct = i === lesson.quiz.answer;
                const selected = quizAnswer === i;
                const answered = quizAnswer !== null;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={answered}
                    onClick={() => setQuizAnswer(i)}
                    className={cn(
                      "text-left rounded-2xl border px-5 py-3.5 text-[15px] font-medium transition-colors flex items-center justify-between gap-3",
                      !answered && "border-white/15 hover:bg-white/10 hover:border-white/30",
                      answered && correct && "border-sprout bg-sprout text-white",
                      answered && selected && !correct && "border-ember/60 bg-ember/15 text-white",
                      answered && !correct && !selected && "border-white/10 text-white/35"
                    )}
                  >
                    {opt}
                    {answered && correct && <Check size={18} weight="bold" />}
                  </button>
                );
              })}
            </div>
            {quizAnswer !== null && (
              <div className="rounded-2xl bg-white/10 p-5 text-[15px] leading-7 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <p className="font-semibold mb-1">
                  {quizAnswer === lesson.quiz.answer ? "Yes. " : "Not quite. "}
                  {lesson.quiz.why}
                </p>
                <p className="text-white/65">
                  {quizAnswer === lesson.quiz.answer
                    ? "One check like this closes every unit in your syllabus."
                    : "A wrong answer is the moment the idea gets filed properly. Pick another lesson or start your path."}
                </p>
              </div>
            )}
            <Button variant="white" size="lg" className="mt-auto w-full" asChild>
              <Link href="/start">
                Build my own syllabus
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
