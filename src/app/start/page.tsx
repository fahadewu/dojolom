"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ArrowCounterClockwise, Clock, CalendarCheck } from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubjectChip, SubjectIcon, subjectTint } from "@/components/subject-icon";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { planPreview } from "@/lib/study";
import { authoredUnitsFor } from "@/content/load";
import { invalidateLearner } from "@/lib/study-store";
import {
  ageGroups,
  goals,
  paceOptions,
  subjects,
  styleQuestions,
  formats,
  learningStyles,
  emptyLearner,
  buildProfile,
  loadLearner,
  saveLearner,
  clearLearner,
  type LearnerInput,
  type StyleId,
} from "@/lib/learning";

// Steps: 0 name+age · 1 subjects · 2 goal · 3 pace · 4..8 style questions · 9 results
const STYLE_START = 4;
const TOTAL = STYLE_START + styleQuestions.length; // number of question screens

function OptionButton({
  on, onClick, children, hint,
}: { on: boolean; onClick: () => void; children: React.ReactNode; hint?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl border bg-card px-5 py-4 flex items-center justify-between gap-4 transition-[border-color,box-shadow,background-color] duration-200",
        on
          ? "border-focus ring-4 ring-focus/12 shadow-[var(--shadow-card)]"
          : "border-input hover:border-foreground/35 hover:shadow-[var(--shadow-card)]"
      )}
    >
      <span>
        <span className="block text-[17px] font-semibold leading-snug">{children}</span>
        {hint && <span className="block text-[15px] text-muted-foreground mt-1">{hint}</span>}
      </span>
      <span
        className={cn(
          "size-6 shrink-0 rounded-full border-2 inline-flex items-center justify-center transition-colors",
          on ? "bg-focus border-focus text-white" : "border-input"
        )}
        aria-hidden
      >
        {on && <Check size={13} weight="bold" />}
      </span>
    </button>
  );
}

function QuestionHeader({ kicker, title, text }: { kicker?: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col gap-3">
      {kicker}
      <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{title}</h1>
      <p className="lede">{text}</p>
    </div>
  );
}

const noop = () => () => {};

/* localStorage is browser-only, so the wizard mounts after hydration and
   reads the saved learner once, as its initial state. */
export default function StartPage() {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1" aria-busy="true" />
        <Footer />
      </div>
    );
  }
  return <Wizard />;
}

function isComplete(l: LearnerInput) {
  return Object.keys(l.answers).length === styleQuestions.length && l.subjects.length > 0 && l.age !== "";
}

function Wizard() {
  const [learner, setLearner] = useState<LearnerInput>(() => loadLearner() ?? emptyLearner);
  const [step, setStep] = useState(() => (isComplete(loadLearner() ?? emptyLearner) ? TOTAL : 0));

  useEffect(() => {
    saveLearner(learner);
    invalidateLearner();
  }, [learner]);

  const update = (patch: Partial<LearnerInput>) => setLearner((l) => ({ ...l, ...patch }));

  const canContinue = useMemo(() => {
    if (step === 0) return learner.age !== "";
    if (step === 1) return learner.subjects.length > 0;
    if (step === 2) return learner.goal !== "";
    if (step === 3) return learner.pace !== "";
    const q = styleQuestions[step - STYLE_START];
    return q ? learner.answers[q.id] !== undefined : true;
  }, [step, learner]);

  function next() { if (canContinue) setStep((s) => Math.min(s + 1, TOTAL)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }
  function restart() { clearLearner(); setLearner(emptyLearner); setStep(0); }

  const firstName = learner.name.trim().split(" ")[0];

  // ── Results ──
  if (step >= TOTAL) {
    const profile = buildProfile(learner);
    const chosen = subjects.filter((s) => learner.subjects.includes(s.id));
    const pace = paceOptions.find((p) => p.id === learner.pace);
    const primary = tint[profile.primary.colour];
    const secondary = tint[profile.secondary.colour];
    const maxScore = Math.max(1, ...Object.values(profile.scores));

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-14 md:py-24 flex flex-col gap-20 md:gap-28">
          {/* Profile */}
          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold text-muted-foreground">
                {firstName ? `${firstName}, here is your learner profile` : "Your learner profile"}
              </p>
              <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.02]">
                You are <span className={primary.text}>{profile.primary.name}</span>, with a streak of{" "}
                <span className={secondary.text}>{profile.secondary.name}</span>.
              </h1>
              <p className="lede max-w-xl">{profile.primary.description}</p>
              <p className="text-base text-muted-foreground leading-7 max-w-xl">
                Your secondary side: {profile.secondary.description.charAt(0).toLowerCase() + profile.secondary.description.slice(1)}
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <p className="text-sm font-semibold text-muted-foreground">Formats you will start with</p>
                <div className="flex flex-wrap gap-2">
                  {profile.formats.map((f) => {
                    const c = tint[formats[f].colour];
                    return (
                      <span key={f} className={cn("inline-flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-1.5 text-sm font-semibold bg-card shadow-[var(--shadow-hairline)]")}>
                        <span className={cn("size-2.5 rounded-full", c.bar)} aria-hidden />
                        {formats[f].name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="surface rounded-[28px] p-7 md:p-8">
              <p className="text-sm font-semibold text-muted-foreground mb-6">How your answers leaned</p>
              <ul className="flex flex-col gap-4">
                {(Object.keys(profile.scores) as StyleId[])
                  .sort((a, b) => profile.scores[b] - profile.scores[a])
                  .map((id) => {
                    const style = learningStyles[id];
                    const top = id === profile.primary.id || id === profile.secondary.id;
                    const pct = Math.round((profile.scores[id] / maxScore) * 100);
                    const c = tint[style.colour];
                    return (
                      <li key={id} className="flex items-center gap-4">
                        <span className={cn("w-32 text-[15px] font-semibold truncate", !top && "text-muted-foreground")}>{style.name}</span>
                        <span className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                          <span
                            className={cn("block h-full rounded-full transition-[width] duration-700", top ? c.bar : "bg-input")}
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                      </li>
                    );
                  })}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 leading-6">
                Based on your five scenario answers, your age group and your goal. This is a starting point, not a label:
                the formats shift as we see what actually sticks for you.
              </p>
            </div>
          </section>

          {/* Path */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl flex flex-col gap-4">
                <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Your path, one session a day</h2>
                <p className="lede">
                  {chosen.length === 1 ? "One subject" : `${chosen.length} subjects`}, six units each, three ideas per unit.
                  {pace ? ` Sized for ${pace.label.toLowerCase()}.` : ""} Every session opens by rewinding what you learned before.
                </p>
              </div>
              <Button variant="outline" onClick={restart} className="shrink-0">
                <ArrowCounterClockwise size={16} weight="bold" />
                Start over
              </Button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {chosen.map((subject) => {
                const preview = planPreview(subject.id, learner.pace);
                const authored = authoredUnitsFor(subject.id).length;
                const t = tint[subjectTint(subject.id)];
                return (
                  <article key={subject.id} className="surface rounded-[28px] p-6 md:p-7 flex flex-col gap-5" data-testid="path-card">
                    <div className="flex items-center gap-4">
                      <SubjectChip id={subject.id} size="lg" />
                      <div>
                        <h3 className="text-2xl font-semibold leading-tight">{subject.name}</h3>
                        <p className="text-[15px] text-muted-foreground mt-0.5">{subject.blurb}</p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2 text-[15px]">
                      <li className="flex items-center gap-2.5"><CalendarCheck size={18} weight="duotone" className={t.text} /> {preview.sessions} sessions, about {preview.perSession} minutes each</li>
                      <li className="flex items-center gap-2.5"><Clock size={18} weight="duotone" className={t.text} /> about {Math.round(preview.minutes / 6) / 10} hours in total</li>
                    </ul>
                    <ol className="flex flex-col gap-1.5">
                      {subject.units.map((u, i) => (
                        <li key={u} className="flex items-center gap-3 text-[15px]">
                          <span className={cn("size-6 shrink-0 rounded-full inline-flex items-center justify-center text-xs font-semibold", authored > i ? t.chip : "bg-muted text-muted-foreground")}>{i + 1}</span>
                          <span className={cn(authored <= i && "text-muted-foreground")}>{u}{authored <= i ? " · coming soon" : ""}</span>
                        </li>
                      ))}
                    </ol>
                    <Button className="mt-auto self-start" asChild>
                      <Link href={`/study/${subject.id}/session/`}>Start session 1 <ArrowRight size={16} weight="bold" /></Link>
                    </Button>
                  </article>
                );
              })}
            </div>

            <div className="rounded-[32px] bg-focus text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-lg flex flex-col gap-3">
                <h3 className="text-[1.75rem] md:text-[2.25rem] font-semibold leading-[1.1]">Your profile and progress are saved on this device</h3>
                <p className="text-lg text-white/80 leading-8">
                  Head to your study to begin. Each session takes about {pace ? pace.minutes : 15} minutes, tracks what sticks, and adapts the format and the games to you.
                </p>
              </div>
              <Button size="lg" variant="sun" className="shrink-0" asChild>
                <Link href="/study/" data-testid="go-to-study">Go to my study <ArrowRight size={18} weight="bold" /></Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Questionnaire ──
  const q = step >= STYLE_START ? styleQuestions[step - STYLE_START] : null;
  const progress = Math.round(((step + 1) / TOTAL) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
            <p>Question {step + 1} of {TOTAL}</p>
            <p className="tabular-nums">{progress}%</p>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={TOTAL}>
            <span className="block h-full rounded-full bg-focus transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div key={step} className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {step === 0 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="First, who are we building this for?" text="Your age group changes the pace and the tone. Your name is optional." />
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">What should we call you?</span>
                <Input
                  value={learner.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Your first name"
                  autoComplete="given-name"
                />
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {ageGroups.map((a) => (
                  <OptionButton key={a.id} on={learner.age === a.id} onClick={() => update({ age: a.id })} hint={a.hint}>
                    {a.label}
                  </OptionButton>
                ))}
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="What would you like to learn?" text="Pick up to three. Each one becomes its own syllabus." />
              <div className="grid sm:grid-cols-2 gap-3">
                {subjects.map((s) => {
                  const on = learner.subjects.includes(s.id);
                  const full = !on && learner.subjects.length >= 3;
                  const t = tint[subjectTint(s.id)];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      disabled={full}
                      onClick={() =>
                        update({
                          subjects: on ? learner.subjects.filter((x) => x !== s.id) : [...learner.subjects, s.id],
                        })
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left transition-[border-color,box-shadow,opacity] duration-200",
                        on
                          ? "border-focus ring-4 ring-focus/12 shadow-[var(--shadow-card)]"
                          : "border-input hover:border-foreground/35 hover:shadow-[var(--shadow-card)]",
                        full && "opacity-45"
                      )}
                    >
                      <span className={cn("size-10 rounded-xl inline-flex items-center justify-center shrink-0", on ? "bg-focus text-white" : t.chip)} aria-hidden>
                        {on ? <Check size={18} weight="bold" /> : <SubjectIcon id={s.id} size={20} />}
                      </span>
                      <span className="text-[16px] font-semibold">{s.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground -mt-4">{learner.subjects.length} of 3 chosen</p>
            </section>
          )}

          {step === 2 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="Why now?" text="The reason shapes how practical or exploratory your path is." />
              <div className="grid gap-3">
                {goals.map((g) => (
                  <OptionButton key={g.id} on={learner.goal === g.id} onClick={() => update({ goal: g.id })} hint={g.hint}>
                    {g.label}
                  </OptionButton>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="How much time, honestly?" text="We size each unit to fit. Small and steady beats big and abandoned." />
              <div className="grid gap-3">
                {paceOptions.map((p) => (
                  <OptionButton key={p.id} on={learner.pace === p.id} onClick={() => update({ pace: p.id })}>
                    {p.label}
                  </OptionButton>
                ))}
              </div>
            </section>
          )}

          {q && (
            <section className="flex flex-col gap-8">
              <QuestionHeader
                kicker={
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-play">
                    <span className="size-2 rounded-full bg-play" aria-hidden />
                    How you learn, {step - STYLE_START + 1} of {styleQuestions.length}
                  </p>
                }
                title={q.prompt}
                text="Go with your gut. There are no wrong answers here."
              />
              <div className="grid gap-3">
                {q.options.map((o) => (
                  <OptionButton
                    key={o.label}
                    on={learner.answers[q.id] === o.style}
                    onClick={() => update({ answers: { ...learner.answers, [q.id]: o.style } })}
                  >
                    {o.label}
                  </OptionButton>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
          <Button variant="ghost" onClick={back} disabled={step === 0} className="mt-4 -ml-3">
            <ArrowLeft size={16} weight="bold" />
            Back
          </Button>
          <Button size="lg" onClick={next} disabled={!canContinue} className="mt-4">
            {step === TOTAL - 1 ? "Show my profile" : "Continue"}
            <ArrowRight size={18} weight="bold" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
