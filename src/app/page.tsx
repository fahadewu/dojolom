"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { SubjectChip } from "@/components/subject-icon";
import { FounderCards } from "@/components/founders";
import { Hero } from "@/components/landing/hero";
import { Loop } from "@/components/landing/loop";
import { Memory } from "@/components/landing/memory";
import { Ages } from "@/components/landing/ages";
import { Books } from "@/components/landing/books";
import { TryLesson } from "@/components/landing/try-lesson";
import { Cta } from "@/components/landing/cta";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { everydaySubjects as subjects, emptyLearner, saveLearner, loadLearner } from "@/lib/learning";

/* The landing page, in the order a visitor's questions come: what is it (hero),
   how does a lesson work (four moves), will I remember it (memory), is it for
   me (age, school books, everyday subjects), can I see one (try a lesson), who
   made it, and how do I start. Sections live in src/components/landing. */

// ─── Static content ──────────────────────────────────────────────────────────

const earlyVoices = [
  {
    initials: "AL",
    name: "Amir L.",
    role: "Learning Spanish, 34",
    quote: "It figured out I need a story before a rule. Every lesson since has felt like it was written for me.",
    tint: "sun",
  },
  {
    initials: "SK",
    name: "Sara K.",
    role: "Exam prep, 16",
    quote: "Fractions as a game instead of a worksheet. I did not notice I was revising.",
    tint: "play",
  },
  {
    initials: "RT",
    name: "Remi T.",
    role: "Learning to budget, 41",
    quote: "The syllabus was short, honest, and in an order that made sense. I finished a unit on my lunch break.",
    tint: "sprout",
  },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <Hero />
        <Loop />
        <Memory />
        <Ages />
        <Books />

        {/* ── Subjects ── */}
        <section id="subjects" className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 scroll-mt-16" data-testid="subjects">
          <SectionHeading
            title="Or learn anything else"
            lede="Twelve everyday subjects, from fractions to French to how money works, each in six units that build on each other."
            action={
              <Button variant="outline" asChild>
                <Link href="/start">Build my path <ArrowRight size={16} weight="bold" /></Link>
              </Button>
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjects.map((s) => (
              <Link
                key={s.id}
                href="/start"
                onClick={() => {
                  const existing = loadLearner() ?? emptyLearner;
                  saveLearner({ ...existing, track: "everyday", subjects: [s.id] });
                }}
                className="group surface rounded-2xl p-4 sm:p-5 md:p-6 flex flex-row items-center sm:items-stretch sm:flex-col gap-3 sm:gap-5 sm:min-h-44 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]"
              >
                <div className="flex items-start justify-between">
                  <SubjectChip id={s.id} size="md" className="max-sm:size-9 max-sm:rounded-lg" />
                  <ArrowRight size={16} weight="bold" className="hidden sm:block text-muted-foreground/0 group-hover:text-muted-foreground -translate-x-1 group-hover:translate-x-0 transition-all duration-300 mt-1" />
                </div>
                <div className="sm:mt-auto min-w-0">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold leading-snug">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-6 mt-1 hidden sm:block">{s.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <TryLesson />

        {/* ── Early voices ── */}
        <section className="border-y border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <SectionHeading
              title="From the first testers"
              lede="Different ages, different subjects, same starting question."
            />
            <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
              {earlyVoices.map((v) => {
                const t = tint[v.tint];
                return (
                  <figure key={v.name} className="flex flex-col gap-6">
                    <blockquote className="font-display text-[1.35rem] font-medium leading-[1.4] text-foreground">
                      “{v.quote}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3 mt-auto">
                      <span className={cn("size-10 rounded-full inline-flex items-center justify-center text-sm font-bold", t.chip)}>
                        {v.initials}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold leading-tight">{v.name}</p>
                        <p className="text-sm text-muted-foreground">{v.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <SectionHeading
            title="Who is building this"
            lede="Two people who kept meeting learners with the wrong resources for the right questions."
            action={
              <Button variant="outline" asChild>
                <Link href="/about">Our story <ArrowRight size={16} weight="bold" /></Link>
              </Button>
            }
          />
          <FounderCards />
        </section>

        <Cta />
      </main>

      <Footer />
    </div>
  );
}
