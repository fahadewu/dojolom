import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ear, Palette, UsersThree, Globe } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { FounderCards } from "@/components/founders";
import { tint } from "@/lib/tint";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — Dojolom",
  description: "Why Dojolom starts with the learner, not the lesson.",
};

const beliefs = [
  {
    icon: Ear,
    title: "Listen before teaching",
    text: "The same idea needs a different door for different minds. We ask first, then choose the door.",
    tint: "focus",
  },
  {
    icon: Palette,
    title: "Form is part of the lesson",
    text: "Colour, position and rhythm are not decoration. They are how memory files things away.",
    tint: "sun",
  },
  {
    icon: UsersThree,
    title: "Play is serious",
    text: "A game that drills one idea for five minutes beats an hour of nodding along to a lecture.",
    tint: "play",
  },
  {
    icon: Globe,
    title: "Any subject, any age",
    text: "A nine-year-old learning fractions and a forty-year-old learning to budget deserve the same care.",
    tint: "sprout",
  },
] as const;

const timeline = [
  { year: "2019", title: "Learning the hard way", text: "Leopard starts teaching himself, piecing together scattered resources and noticing which ones actually stuck and why." },
  { year: "2022", title: "The pattern", text: "Years of mentoring show the same thing over and over: people were not bad at subjects, they were given the wrong form of them." },
  { year: "2024", title: "Two founders", text: "Ronin joins with a curriculum-design mindset. The question shifts from what should we teach to how does this person learn." },
  { year: "2025", title: "From code to everything", text: "What began as a programming school becomes a general learning platform. First learner profiles and syllabus engine drafted." },
  { year: "2026", title: "Early access", text: "Dojolom opens the questionnaire to a first group of learners across a dozen subjects." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl flex flex-col gap-7">
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.02]">
              Built because learning kept being taught the wrong way round.
            </h1>
            <p className="lede max-w-2xl">
              Most platforms pick a lesson and hope it fits you. Dojolom asks about you first, works out
              how you learn, and only then decides what a lesson should look like. The result is a personal
              syllabus made of infographics, mini-games and short videos, for any subject you care about.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-[28px] bg-focus text-white p-8 md:p-10 flex flex-col gap-4 min-h-72">
              <p className="text-sm font-semibold text-white/70">Our mission</p>
              <p className="font-display text-2xl md:text-[1.75rem] font-medium leading-[1.3] mt-auto">
                To give anyone, at any age and any budget, a way to learn anything that fits how their
                mind works. Short, playful, honest, and in the right order.
              </p>
            </div>
            <div className="rounded-[28px] bg-sun text-ink p-8 md:p-10 flex flex-col gap-4 min-h-72">
              <p className="text-sm font-semibold text-ink/60">Our vision</p>
              <p className="font-display text-2xl md:text-[1.75rem] font-medium leading-[1.3] mt-auto">
                A world where nobody says &ldquo;I&rsquo;m just not a math person&rdquo; because the subject
                was finally shown to them in a form they could hold.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <SectionHeading title="What we believe" lede="Four ideas that every lesson on Dojolom is checked against." />
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
              {beliefs.map((b) => {
                const t = tint[b.tint];
                return (
                  <div key={b.title} className="flex gap-5">
                    <span className={cn("size-12 shrink-0 rounded-2xl inline-flex items-center justify-center", t.chip)}>
                      <b.icon size={26} weight="duotone" />
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{b.title}</h3>
                      <p className="text-[15px] text-muted-foreground leading-7 max-w-md">{b.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <SectionHeading title="How we got here" lede="Seven years, one question, and a slow change of mind about what a lesson is." className="mb-0" />
            <ol className="flex flex-col">
              {timeline.map((t, i) => {
                const last = i === timeline.length - 1;
                return (
                  <li key={t.year} className="grid grid-cols-[4.5rem_auto_1fr] gap-x-5">
                    <span className={cn("font-display text-lg font-semibold tabular-nums pt-0.5", last ? "text-sun-deep" : "text-focus")}>{t.year}</span>
                    <div className="flex flex-col items-center">
                      <span className={cn("mt-2 size-3 shrink-0 rounded-full ring-4 ring-background", last ? "bg-sun" : "bg-focus")} />
                      {!last && <span className="w-px flex-1 bg-border" />}
                    </div>
                    <div className={cn("flex flex-col gap-1.5", !last && "pb-10")}>
                      <h3 className="text-xl font-semibold leading-snug">{t.title}</h3>
                      <p className="text-[15px] text-muted-foreground leading-7 max-w-lg">{t.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <SectionHeading title="The team" lede="Two founders, one building the engine and one designing what it teaches." />
          <FounderCards />
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <div className="rounded-[32px] bg-ink text-white p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-lg">
              <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">See what we build for you</h2>
              <p className="text-lg text-white/65 leading-8">Two minutes of questions, then a profile and a syllabus you can keep.</p>
            </div>
            <Button size="lg" variant="sun" className="shrink-0" asChild>
              <Link href="/start">Start now <ArrowRight size={18} weight="bold" /></Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
