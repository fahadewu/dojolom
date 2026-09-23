"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
import {
  ArrowRight,
  Check,
  ChatCircleDots,
  Compass,
  MapTrifold,
  GameController,
  Lightbulb,
  SealCheck,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/section-heading";
import { SubjectChip, SubjectIcon, subjectIdByName, subjectTint } from "@/components/subject-icon";
import { FounderCards } from "@/components/founders";
import { InfographicArt, GameArt, VideoArt } from "@/components/format-art";
import { cn } from "@/lib/utils";
import { tint, tintOrder } from "@/lib/tint";
import { subjects, learningStyles, emptyLearner, saveLearner, loadLearner } from "@/lib/learning";
import { demoLessons } from "@/lib/lessons";

// ─── Static content ──────────────────────────────────────────────────────────

const steps = [
  {
    icon: ChatCircleDots,
    title: "Tell us about you",
    text: "Your age, what you want to learn, why, and how much time you have. Two minutes, no account.",
    tint: "focus",
  },
  {
    icon: Compass,
    title: "We find how you learn",
    text: "Five everyday scenarios reveal whether you learn through pictures, play, stories, watching, reading or doing.",
    tint: "play",
  },
  {
    icon: MapTrifold,
    title: "You get a personal syllabus",
    text: "Your subject in the order that makes sense, in the formats that match you. Every unit ends with a quick check.",
    tint: "sun",
  },
  {
    icon: GameController,
    title: "You learn by playing",
    text: "Infographics, mini-games, stories and guided walkthroughs instead of lectures. Progress you can see, not just feel.",
    tint: "sprout",
  },
] as const;

const formatShowcase = [
  {
    art: InfographicArt,
    name: "Infographics",
    text: "One screen that holds the whole idea. Colour marks what belongs together, position marks what comes first.",
  },
  {
    art: GameArt,
    name: "Mini-games",
    text: "Short rounds that drill one idea until it is automatic. Streaks and levels, tuned to your pace.",
  },
  {
    art: VideoArt,
    name: "Guided walkthroughs",
    text: "One step at a time with a line of narration, at your pace. Then try it yourself with instant feedback.",
  },
];

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
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const lesson = demoLessons[lessonIdx];

  function togglePick(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 3 ? [...p, id] : p));
  }

  function startWithPicks() {
    const existing = loadLearner() ?? emptyLearner;
    saveLearner({ ...existing, subjects: picked });
    router.push("/start");
  }

  function joinWaitlist() {
    if (!email.trim() || !email.includes("@")) {
      gooeyToast.error("That email doesn't look right", {
        description: "Check for a typo and try again.",
        preset: "subtle",
      });
      return;
    }
    setEmail("");
    gooeyToast.success("You're on the list", {
      description: "We'll write when Dojolom opens its doors.",
      preset: "bouncy",
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* ── Hero: the first question is the hero ── */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_75%_40%,rgb(47_91_234/0.08),transparent_70%)]"
            aria-hidden
          />
          <div className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1fr_0.95fr] gap-14 lg:gap-20 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="rise text-[2.75rem] sm:text-6xl lg:text-[4.5rem] font-semibold leading-[1.02]">
                Tell us about you.
                <br />
                We&apos;ll build the way you learn.
              </h1>
              <p className="rise lede max-w-lg" style={{ "--rise-delay": "80ms" } as React.CSSProperties}>
                Dojolom starts by listening. Then it turns any subject, from fractions to French to how
                money works, into infographics, mini-games, stories and guided walkthroughs that fit how your mind
                actually works.
              </p>
              <div className="rise flex flex-wrap items-center gap-3" style={{ "--rise-delay": "160ms" } as React.CSSProperties}>
                <Button size="lg" asChild>
                  <Link href="/start">
                    Start in two minutes
                    <ArrowRight size={18} weight="bold" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#try">Try a lesson first</a>
                </Button>
              </div>
              <p className="rise text-[15px] text-muted-foreground" style={{ "--rise-delay": "220ms" } as React.CSSProperties}>
                Free while we build. No account needed to begin.
              </p>
            </div>

            {/* Live first step */}
            <div className="rise surface-raised rounded-[28px] p-6 md:p-8" style={{ "--rise-delay": "140ms" } as React.CSSProperties}>
              <div className="flex items-center justify-between gap-6 mb-6">
                <p className="text-sm font-semibold text-muted-foreground">Question 1 of 9</p>
                <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden" aria-hidden>
                  <span className="block h-full w-[11%] rounded-full bg-focus" />
                </div>
              </div>
              <h2 className="text-[1.65rem] md:text-3xl font-semibold leading-tight mb-2">What would you like to learn?</h2>
              <p className="text-[15px] text-muted-foreground mb-6">Pick up to three. You can change your mind later.</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => {
                  const on = picked.includes(s.id);
                  const t = tint[subjectTint(s.id)];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePick(s.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border pl-2.5 pr-3.5 py-1.5 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-200",
                        on
                          ? "bg-foreground text-white border-foreground"
                          : "bg-card border-input hover:border-foreground/40"
                      )}
                    >
                      <span className={cn("size-6 rounded-full inline-flex items-center justify-center", on ? "bg-white/15 text-white" : t.chip)} aria-hidden>
                        {on ? <Check size={13} weight="bold" /> : <SubjectIcon id={s.id} size={14} />}
                      </span>
                      {s.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 pt-6 border-t border-border flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {picked.length === 0 ? "Choose at least one to continue." : `${picked.length} of 3 chosen`}
                </p>
                <Button onClick={startWithPicks} disabled={picked.length === 0}>
                  Continue
                  <ArrowRight size={16} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="max-w-6xl mx-auto px-6 py-20 md:py-28 scroll-mt-16">
          <SectionHeading
            title="Most platforms pick the lesson. We start with the learner."
            lede="Four steps, in this order, every time."
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {steps.map((s, i) => {
              const t = tint[s.tint];
              return (
                <li key={s.title} className={cn("border-t-2 pt-7 flex flex-col gap-5", t.rule)}>
                  <div className="flex items-center justify-between">
                    <span className={cn("size-11 rounded-xl inline-flex items-center justify-center", t.chip)}>
                      <s.icon size={24} weight="duotone" />
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-7">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── Subjects ── */}
        <section id="subjects" className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 scroll-mt-16">
          <SectionHeading
            title="Any subject. Same care."
            lede="Twelve areas to begin with, each broken into six units that build on each other."
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
                  saveLearner({ ...existing, subjects: [s.id] });
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

        {/* ── Try a lesson ── */}
        <section id="try" className="bg-ink text-white scroll-mt-16">
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

        {/* ── Learning styles ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <SectionHeading
            title="Six ways people learn. We find yours."
            lede="Nobody is only one of these. Your profile is a primary and a secondary, and your syllabus mixes both."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden shadow-[var(--shadow-hairline)]">
            {Object.values(learningStyles).map((st) => {
              const t = tint[st.colour];
              return (
                <div key={st.id} className="bg-card p-7 md:p-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className={cn("h-6 w-1.5 rounded-full", t.bar)} aria-hidden />
                    <h3 className="text-xl font-semibold">{st.name}</h3>
                  </div>
                  <p className={cn("text-[15px] font-semibold", t.text)}>{st.short}</p>
                  <p className="text-[15px] text-muted-foreground leading-7">{st.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Formats ── */}
        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <SectionHeading
            title="No lectures. Formats that fit you instead."
            lede="Every unit is delivered in the formats your profile favours, and always ends with a quick check."
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {formatShowcase.map((f) => (
              <div key={f.name} className="flex flex-col gap-6">
                <f.art />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{f.name}</h3>
                  <p className="text-[15px] text-muted-foreground leading-7">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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

        {/* ── Waitlist ── */}
        <section id="waitlist" className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 scroll-mt-16">
          <div className="relative overflow-hidden rounded-[32px] bg-focus text-white p-8 md:p-14 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-white/10" aria-hidden />
            <div className="pointer-events-none absolute -right-10 -bottom-16 size-44 rounded-full bg-sun" aria-hidden />
            <div className="relative flex flex-col gap-4 max-w-xl">
              <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Be told when the doors open</h2>
              <p className="text-lg text-white/80 leading-8">
                Build your profile today, and we will write when full syllabi, games and videos go live for your subjects.
              </p>
            </div>
            <form
              className="relative flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto"
              onSubmit={(e) => { e.preventDefault(); joinWaitlist(); }}
              noValidate
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[52px] sm:w-72 bg-white text-ink border-transparent shadow-none focus-visible:ring-white/40"
                aria-label="Email address"
              />
              <Button size="lg" type="submit" variant="sun" className="shrink-0">
                Keep me posted
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
