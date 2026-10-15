"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { SubjectChip } from "@/components/subject-icon";
import { authoredUnitsFor } from "@/content/load";
import { bdGroups, bdStages, bdSubjects, type BdGroup, type BdStageId } from "@/lib/curriculum-bd";
import { emptyLearner, loadLearner, saveLearner } from "@/lib/learning";
import { cn } from "@/lib/utils";

/* The Bangladesh curriculum track. Bangla is set as type here (Anek Bangla),
   not left to a fallback font: book names lead in Bangla, and the creative
   question's four parts are marked with the letters students see in the
   board exam. The class picker and the parts answer to the visitor; nothing
   here moves on its own. */

const TOTAL_BOOKS = bdSubjects.length;
const FIRST = 8; // books shown before "show all"
const TOTAL_CHAPTERS = bdSubjects.reduce((n, s) => n + s.units.length, 0);

const cq = {
  stem: "Nusrat measures a wire with a screw gauge. Its pitch is 1 mm and its circular scale has 100 divisions. The linear scale reads 2 mm and the circular scale reads 45 divisions.",
  parts: [
    { letter: "ক", marks: 1, q: "What is the least count of a screw gauge?", a: "The smallest length it can measure: the pitch divided by the number of divisions on the circular scale." },
    { letter: "খ", marks: 2, q: "Why is a screw gauge better than a metre rule for a wire?", a: "A metre rule reads to 1 mm, and the wire is only a few millimetres thick. A screw gauge reads to 0.01 mm, so its reading is a hundred times finer." },
    { letter: "গ", marks: 3, q: "Find the diameter of the wire.", a: "Least count = 1 mm ÷ 100 = 0.01 mm. Diameter = 2 mm + 45 × 0.01 mm = 2.45 mm." },
    { letter: "ঘ", marks: 4, q: "Nusrat then finds a zero error of +0.02 mm. Is her answer still good enough? Explain.", a: "Corrected diameter = 2.45 − 0.02 = 2.43 mm. The difference is under 1%, small for most uses, but a careful measurement always removes the zero error before reporting." },
  ],
};

export function Books() {
  const [stage, setStage] = useState<BdStageId>("ssc");
  const [all, setAll] = useState(false);
  const books = bdSubjects.filter((s) => s.stage === stage);
  const shown = all ? books : books.slice(0, FIRST);
  const info = bdStages.find((s) => s.id === stage)!;

  // Picking a book starts onboarding with the class (and the book's group, when it belongs to one) already chosen.
  const startWith = (id: string, group?: BdGroup) => {
    const existing = loadLearner() ?? emptyLearner;
    saveLearner({ ...existing, track: "nctb", bdStage: stage, bdGroup: info.grouped ? group ?? "" : "", subjects: [id] });
  };

  return (
    <section id="books" className="max-w-6xl mx-auto px-6 py-20 md:py-28 scroll-mt-16" data-testid="books">
      <SectionHeading
        title="Your school books, chapter by chapter"
        lede={`${TOTAL_BOOKS} NCTB books from Class 1 to HSC, ${TOTAL_CHAPTERS} chapters in all. Lessons are in English with the Bangla term beside every key word, and each chapter ends the way the board exam asks.`}
      />

      <div className="-mx-6 px-6 overflow-x-auto pb-2 mb-8 [scrollbar-width:none]">
        <div role="radiogroup" aria-label="Class" className="inline-flex gap-1.5 rounded-full bg-muted p-1.5">
          {bdStages.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={stage === s.id}
              data-testid={`class-${s.id}`}
              onClick={() => { setStage(s.id); setAll(false); }}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold transition-[background-color,color,box-shadow] duration-200",
                stage === s.id ? "bg-card text-foreground shadow-[var(--shadow-card)]" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.id === "ssc" ? "SSC" : s.id === "hsc" ? "HSC" : s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
        <div className="flex flex-col gap-4">
          <p className="text-[15px] text-muted-foreground">
            <span className="font-semibold text-foreground">{info.label}</span> <span lang="bn">{info.labelBn}</span>
            {info.grouped && <span>. Pick a group when you start: {bdGroups.map((g) => g.label).join(", ")}.</span>}
          </p>
          <ul key={stage} className="grid sm:grid-cols-2 gap-3" data-testid="book-list">
            {shown.map((b, i) => {
              const ready = authoredUnitsFor(b.id).length;
              return (
                <li key={b.id} className="move-enter" style={{ "--m-delay": `${Math.min(i, 8) * 35}ms` } as React.CSSProperties}>
                  <Link
                    href="/start"
                    onClick={() => startWith(b.id, b.groups?.[0])}
                    className="group surface rounded-2xl p-4 flex gap-3.5 h-full transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]"
                  >
                    <SubjectChip id={b.id} size="sm" className="shrink-0 mt-0.5" />
                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span lang="bn" className="text-[1.2rem] font-semibold leading-tight">{b.nameBn}</span>
                      <span className="text-[15px] font-semibold leading-snug">{b.name}</span>
                      <span className="text-[13px] text-muted-foreground leading-5">
                        {b.units.length} chapters
                        {b.groups && <>, {b.groups.map((g) => bdGroups.find((x) => x.id === g)?.label).join(" and ")}</>}
                        {ready > 0 && <span className="ml-1.5 inline-block rounded-full bg-sprout-soft text-sprout px-2 py-px font-semibold">{ready === 1 ? "chapter 1 ready" : `${ready} ready`}</span>}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {books.length > FIRST && (
            <Button variant="outline" className="self-start" onClick={() => setAll((v) => !v)} aria-expanded={all} data-testid="books-all">
              {all ? "Show fewer" : `Show all ${books.length} books`}
            </Button>
          )}
        </div>

        <CreativeQuestion />
      </div>
    </section>
  );
}

function CreativeQuestion() {
  const [open, setOpen] = useState<number | null>(2);
  return (
    <aside className="surface-raised rounded-[30px] p-6 md:p-8 flex flex-col gap-5 lg:sticky lg:top-24" data-testid="cq-demo">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold">Every chapter ends with a creative question</h3>
        <span lang="bn" className="shrink-0 text-[15px] text-muted-foreground">সৃজনশীল প্রশ্ন</span>
      </div>
      <p className="rounded-2xl bg-muted/80 p-4 text-[15px] leading-7">{cq.stem}</p>
      <ol className="flex flex-col gap-2">
        {cq.parts.map((p, i) => {
          const on = open === i;
          return (
            <li key={p.letter} className={cn("rounded-2xl transition-colors", on ? "bg-focus-soft/60" : "")}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                className="w-full text-left flex items-start gap-4 p-3"
                data-testid={`cq-part-${i}`}
              >
                <span lang="bn" className="cq-letter shrink-0 size-12 rounded-2xl bg-ink text-white inline-flex items-center justify-center text-[1.6rem] leading-none" aria-label={`Part ${i + 1}`}>
                  {p.letter}
                </span>
                <span className="flex-1 flex flex-col gap-0.5 pt-0.5">
                  <span className="text-[15px] font-semibold leading-snug">{p.q}</span>
                  <span className="text-[13px] text-muted-foreground">{p.marks} {p.marks === 1 ? "mark" : "marks"}</span>
                </span>
                <CaretDown size={16} weight="bold" className={cn("mt-1.5 shrink-0 text-muted-foreground transition-transform duration-300", on && "rotate-180")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <p className="overflow-hidden px-3 pl-[4.75rem] text-[15px] leading-7 text-foreground/80">
                  <span className="block pb-3">{p.a}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-sm text-muted-foreground leading-6">
        Learners answer each part, then mark themselves against the model answer, and the summary names the part to practise next.
      </p>
      <Button variant="outline" className="self-start" asChild>
        <Link href="/start">Choose my class</Link>
      </Button>
    </aside>
  );
}
