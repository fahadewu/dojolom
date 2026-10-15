"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ArrowCounterClockwise, Clock, CalendarCheck, ChatCircleDots } from "@phosphor-icons/react";
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
import { bdGroups, bdStage, bdStages, bdSubjectsFor } from "@/lib/curriculum-bd";
import { studyProfile, tuningFor, tuningLines } from "@/lib/personal";
import { StudyStatements } from "@/components/study/plan";
import { ageDefaults, ageLines, allowedPace, tutorAccess, validAge } from "@/lib/age";
import { MINORS_ALLOWED } from "@/lib/tutor/context";
import { INTEREST_MAX, SEE_MAX, seeInfo, seeWays, styleAnswersFrom, toneInfo, tutorTones, type SeeWay } from "@/lib/tutor/profile";
import { InterestPicker } from "@/components/chat/interest-picker";
import { AgeInput } from "@/components/age-input";
import {
  everydaySubjects,
  goals,
  paceOptions,
  subjects,
  styleQuestions,
  emptyLearner,
  loadLearner,
  saveLearner,
  clearLearner,
  type LearnerInput,
} from "@/lib/learning";

// Steps: 0 name+age · 1 subjects · 2 goal · 3 pace · 4 interests · 5 how you like it explained · 6 the tutor's voice
// · 7 how you study (optional, never under 12) · 8 results. Interests and voice are asked only when the tutor is open to this learner.
const INTEREST_STEP = 4;
const SEE_STEP = 5;
const TONE_STEP = 6;
const STUDY_STEP = 7;
const TOTAL = STUDY_STEP + 1; // number of question screens
const TARGETS = ["A+", "A", "A-", "B", "C"] as const;

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
  return (l.seeWays.length > 0 || Object.keys(l.answers).length === styleQuestions.length) && l.subjects.length > 0 && validAge(l.age);
}

function Wizard() {
  const [learner, setLearner] = useState<LearnerInput>(() => loadLearner() ?? emptyLearner);
  const [step, setStep] = useState(() => (isComplete(loadLearner() ?? emptyLearner) ? TOTAL : 0));

  useEffect(() => {
    saveLearner(learner);
    invalidateLearner();
  }, [learner]);

  const update = (patch: Partial<LearnerInput>) => setLearner((l) => ({ ...l, ...patch }));
  const age = ageDefaults(learner);
  // A new age can rule out the pace already chosen (no long sittings for young children): keep the nearest one on offer.
  const setAge = (n: number | null) => setLearner((l) => ({ ...l, age: n, pace: n === null ? l.pace : allowedPace(ageDefaults({ ...l, age: n }), l.pace) }));

  const canContinue = useMemo(() => {
    if (step === 0) return validAge(learner.age);
    if (step === 1) return learner.subjects.length > 0 && (learner.track === "everyday" || (learner.bdStage !== "" && (!bdStage(learner.bdStage)?.grouped || learner.bdGroup !== "")));
    if (step === 2) return learner.goal !== "";
    if (step === 3) return learner.pace !== "" && age.paces.includes(learner.pace);
    if (step === SEE_STEP) return learner.seeWays.length > 0;
    if (step === TONE_STEP) return learner.tutorTone !== "";
    return true;
  }, [step, learner, age]);

  // Under 12 (by age or by class), the study-profile statements are never asked: profiling stays off by default for children.
  // Interests and the tutor's voice only matter to the tutor, so they are not asked of anyone it is closed to (src/lib/age.ts).
  const tutorOpen = tutorAccess(age, undefined, MINORS_ALLOWED) !== "closed";
  const skips = (s: number) => (s === STUDY_STEP && !age.studyQuestions) || ((s === INTEREST_STEP || s === TONE_STEP) && !tutorOpen);
  const setWays = (ways: SeeWay[]) => update({ seeWays: ways, answers: styleAnswersFrom(ways) });
  function next() { if (canContinue) setStep((s) => { let n = s + 1; while (n < TOTAL && skips(n)) n++; return Math.min(n, TOTAL); }); }
  function back() { setStep((s) => { let p = s - 1; while (p > 0 && skips(p)) p--; return Math.max(p, 0); }); }
  let lastStep = TOTAL - 1;
  while (lastStep > 0 && skips(lastStep)) lastStep--;
  function restart() { clearLearner(); setLearner(emptyLearner); setStep(0); }

  const firstName = learner.name.trim().split(" ")[0];

  // ── Results ──
  if (step >= TOTAL) {
    const chosen = subjects.filter((s) => learner.subjects.includes(s.id));
    const pace = paceOptions.find((p) => p.id === learner.pace);
    const tuned = [
      ...ageLines(age, age.readAloud),
      ...(age.studyQuestions ? tuningLines(tuningFor(studyProfile(learner.study), { isKid: false, behaviour: null, daysSinceLast: null })) : []),
    ];
    const tone = toneInfo[learner.tutorTone || "calm"];
    const ways = learner.seeWays.length ? learner.seeWays : (["pictures"] as SeeWay[]);
    const studyHref = (id: string) => (tutorOpen ? "/learn/" : `/study/${id}/session/`);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-14 md:py-24 flex flex-col gap-20 md:gap-28">
          {/* Who will teach them, and how */}
          <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start" data-testid="profile-summary">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold text-muted-foreground">
                {firstName ? `${firstName}, you're set up` : "You're set up"}
              </p>
              <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.02]">
                {tutorOpen ? <>Meet your tutor: <span className={tint[tone.colour].text}>{tone.label.toLowerCase()}</span>.</> : <>Your lessons, <span className="text-focus">your way in</span>.</>}
              </h1>
              <p className="lede max-w-xl">
                {tutorOpen
                  ? "It teaches by asking, not lecturing: you think, you explain it back, you practise, and it remembers what you're about to forget."
                  : "Every idea comes with pictures, steps, a story and a clear explanation; we start with the way you picked and switch when another works better."}
              </p>
              {tutorOpen && <p className="text-base text-muted-foreground leading-7 max-w-xl italic">&ldquo;{tone.sample}&rdquo;</p>}
            </div>

            <div className="surface rounded-[28px] p-7 md:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-muted-foreground">Explains with</p>
                <div className="flex flex-wrap gap-2">
                  {ways.map((w) => (
                    <span key={w} className="inline-flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-1.5 text-sm font-semibold bg-card shadow-[var(--shadow-hairline)]">
                      <span className="size-2.5 rounded-full bg-focus" aria-hidden />
                      {seeInfo[w].label}
                    </span>
                  ))}
                </div>
              </div>
              {tutorOpen && learner.interests.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-muted-foreground">Examples from</p>
                  <div className="flex flex-wrap gap-2">
                    {learner.interests.map((i) => <span key={i} className="rounded-full bg-sun-soft text-sun-deep px-3 py-1.5 text-sm font-semibold">{i}</span>)}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-6">
                These set where we start and how it sounds, never what you learn or how hard the checks are. What actually works for you soon counts for more. Change any of it in settings.
              </p>
            </div>
          </section>

          {/* How sessions are tuned to this person */}
          <section className="flex flex-col gap-6" data-testid="tuned">
            <div className="max-w-2xl flex flex-col gap-3">
              <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Tuned to how you study</h2>
              <p className="lede">
                From your age and anything you told us about how you study. It only changes the support around each lesson, never what you learn, and how you actually read and answer soon counts for more.
                {learner.targetGrade && ` You are aiming for ${learner.targetGrade}; every unit checkpoint shows where you stand against it.`}
              </p>
            </div>
            {tuned.length > 0 && (
              <ul className="grid md:grid-cols-2 gap-4">
                {tuned.map((l) => (
                  <li key={l.key} className="surface rounded-[24px] p-6 flex flex-col gap-2">
                    <p className="text-lg font-semibold">{l.title}</p>
                    <p className="text-[15px] text-muted-foreground leading-7">{l.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Path */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl flex flex-col gap-4">
                <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Your path, one session a day</h2>
                <p className="lede">
                  {chosen.length === 1 ? "One subject" : `${chosen.length} subjects`}, {learner.track === "nctb" ? "one unit per textbook chapter" : "six units each"}, three ideas per unit.
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
                        {subject.nameBn && <p className="text-[15px] font-medium text-muted-foreground" lang="bn">{subject.nameBn}</p>}
                        <p className="text-[15px] text-muted-foreground mt-0.5">{subject.blurb}</p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2 text-[15px]">
                      <li className="flex items-center gap-2.5"><CalendarCheck size={18} weight="duotone" className={t.text} /> {preview.sessions} sessions, about {preview.perSession} minutes each</li>
                      <li className="flex items-center gap-2.5"><Clock size={18} weight="duotone" className={t.text} /> about {Math.round(preview.minutes / 6) / 10} hours in total</li>
                    </ul>
                    <ol className="flex flex-col gap-1.5">
                      {subject.units.slice(0, 6).map((u, i) => (
                        <li key={u} className="flex items-center gap-3 text-[15px]">
                          <span className={cn("size-6 shrink-0 rounded-full inline-flex items-center justify-center text-xs font-semibold", authored > i ? t.chip : "bg-muted text-muted-foreground")}>{i + 1}</span>
                          <span className={cn(authored <= i && "text-muted-foreground")}>{u}{authored <= i ? " · coming soon" : ""}</span>
                        </li>
                      ))}
                      {subject.units.length > 6 && <li className="text-[15px] text-muted-foreground pl-9">and {subject.units.length - 6} more chapters</li>}
                    </ol>
                    <Button className="mt-auto self-start" asChild>
                      <Link href={studyHref(subject.id)}>{tutorOpen ? "Start with my tutor" : "Start session 1"} <ArrowRight size={16} weight="bold" /></Link>
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
                <Link href={tutorOpen ? "/learn/" : "/study/"} data-testid="go-to-study">{tutorOpen ? "Talk to my tutor" : "Go to my study"} <ArrowRight size={18} weight="bold" /></Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Questionnaire ──
  const asked = Array.from({ length: TOTAL }, (_, i) => i).filter((i) => !skips(i));
  const shown = asked.indexOf(step) + 1;
  const progress = Math.round((shown / asked.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 md:py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
            <p>Question {shown} of {asked.length}</p>
            <p className="tabular-nums">{progress}%</p>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={shown} aria-valuemin={1} aria-valuemax={asked.length}>
            <span className="block h-full rounded-full bg-focus transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div key={step} className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {step === 0 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="First, who are we building this for?" text="Age sets a comfortable starting point, and how you get on soon takes over. Your name is optional." />
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">What should we call you?</span>
                <Input
                  value={learner.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Your first name"
                  autoComplete="given-name"
                />
              </label>
              <AgeInput value={learner.age} onChange={setAge} />
            </section>
          )}

          {step === 1 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="What would you like to learn?" text="Pick up to three. Each one becomes its own syllabus." />
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5" role="radiogroup" aria-label="What kind of learning">
                {([["nctb", "School books", "Bangladesh national curriculum"], ["everyday", "Everyday subjects", "Learn anything, at any age"]] as const).map(([id, label, hint]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={learner.track === id}
                    data-testid={`track-${id}`}
                    onClick={() => learner.track !== id && update({ track: id, subjects: [] })}
                    className={cn("rounded-xl px-4 py-3 text-left transition-[background-color,box-shadow]", learner.track === id ? "bg-card shadow-[var(--shadow-card)]" : "hover:bg-card/60")}
                  >
                    <span className="block text-[16px] font-semibold">{label}</span>
                    <span className="block text-sm text-muted-foreground">{hint}</span>
                  </button>
                ))}
              </div>
              {learner.track === "nctb" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold">Which class are you in? <span className="font-medium text-muted-foreground" lang="bn">· তুমি কোন শ্রেণিতে পড়ো?</span></p>
                    <div className="flex flex-wrap gap-2">
                      {bdStages.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          aria-pressed={learner.bdStage === st.id}
                          data-testid={`stage-${st.id}`}
                          onClick={() => update({ bdStage: st.id, bdGroup: st.grouped ? learner.bdGroup : "", subjects: [] })}
                          className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors", learner.bdStage === st.id ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {bdStage(learner.bdStage)?.grouped && (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-semibold">Your group <span className="font-medium text-muted-foreground" lang="bn">· বিভাগ</span></p>
                      <div className="flex flex-wrap gap-2">
                        {bdGroups.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            aria-pressed={learner.bdGroup === g.id}
                            data-testid={`group-${g.id}`}
                            onClick={() => update({ bdGroup: g.id, subjects: [] })}
                            className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors", learner.bdGroup === g.id ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}
                          >
                            {g.label} <span className="font-medium opacity-70" lang="bn">{g.labelBn}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {(learner.track === "nctb" ? bdSubjectsFor(learner.bdStage, learner.bdGroup) : everydaySubjects).map((s) => {
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
                      <span className="flex flex-col">
                        <span className="text-[16px] font-semibold">{s.name}</span>
                        {s.nameBn && <span className="text-sm text-muted-foreground" lang="bn">{s.nameBn} · {s.units.length} chapters</span>}
                      </span>
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
              {learner.track === "nctb" && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold">The grade you are aiming for <span className="font-medium text-muted-foreground">· optional</span></p>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Target grade">
                    {TARGETS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        role="radio"
                        aria-checked={learner.targetGrade === g}
                        data-testid={`target-${g}`}
                        onClick={() => update({ targetGrade: learner.targetGrade === g ? "" : g })}
                        className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold tabular-nums transition-colors", learner.targetGrade === g ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">A concrete target helps. Checkpoints will show the grade your score would earn.</p>
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="flex flex-col gap-8">
              <QuestionHeader title="How much time, honestly?" text="We size each unit to fit. Small and steady beats big and abandoned." />
              <div className="grid gap-3">
                {paceOptions.filter((p) => age.paces.includes(p.id)).map((p) => (
                  <OptionButton key={p.id} on={learner.pace === p.id} onClick={() => update({ pace: p.id })}>
                    {p.label}
                  </OptionButton>
                ))}
              </div>
            </section>
          )}

          {step === STUDY_STEP && (
            <section className="flex flex-col gap-8">
              <QuestionHeader
                kicker={<p className="inline-flex items-center gap-2 text-sm font-semibold text-sprout"><span className="size-2 rounded-full bg-sprout" aria-hidden />How you study right now · optional</p>}
                title="Eight quick statements. How like you is each?"
                text="These only adjust the support around each lesson: a study plan, calmer tests, early wins, room to go deeper. Skip any you like, and change them later in settings."
              />
              <StudyStatements answers={learner.study ?? {}} onChange={(id, v) => update({ study: { ...(learner.study ?? {}), [id]: v } })} />
            </section>
          )}

          {step === INTEREST_STEP && (
            <section className="flex flex-col gap-8">
              <QuestionHeader
                kicker={<p className="inline-flex items-center gap-2 text-sm font-semibold text-sun-deep"><span className="size-2 rounded-full bg-sun" aria-hidden />Your tutor · optional</p>}
                title="What are you into?"
                text={`Your tutor can set word problems and examples in your world: the maths stays the same, the story is yours. Pick up to ${INTEREST_MAX}, or add your own.`}
              />
              <InterestPicker value={learner.interests} onChange={(interests) => update({ interests })} />
            </section>
          )}

          {step === SEE_STEP && (
            <section className="flex flex-col gap-8">
              <QuestionHeader
                title="How do you like things explained?"
                text={`Pick one or two. We start there, and switch when another way works better for you. Every idea has all of them.`}
              />
              <div className="grid gap-3" data-testid="see-ways">
                {seeWays.map((w) => {
                  const on = learner.seeWays.includes(w);
                  const full = !on && learner.seeWays.length >= SEE_MAX;
                  return (
                    <OptionButton key={w} on={on} hint={seeInfo[w].hint} onClick={() => setWays(on ? learner.seeWays.filter((x) => x !== w) : full ? [...learner.seeWays.slice(1), w] : [...learner.seeWays, w])}>
                      {seeInfo[w].label}
                    </OptionButton>
                  );
                })}
              </div>
            </section>
          )}

          {step === TONE_STEP && (
            <section className="flex flex-col gap-8">
              <QuestionHeader
                kicker={<p className="inline-flex items-center gap-2 text-sm font-semibold text-focus"><ChatCircleDots size={16} weight="duotone" />Your tutor</p>}
                title="Who should teach you?"
                text="Your tutor is an AI. Pick the voice you'd like; it teaches the same way whichever you choose, and you can change it any time."
              />
              <div className="grid gap-3" data-testid="tones">
                {tutorTones.map((t) => (
                  <OptionButton key={t} on={learner.tutorTone === t} onClick={() => update({ tutorTone: t })} hint={toneInfo[t].blurb}>
                    {toneInfo[t].label}
                  </OptionButton>
                ))}
              </div>
              {learner.tutorTone && <p className="text-[15px] text-muted-foreground italic" data-testid="tone-sample">&ldquo;{toneInfo[learner.tutorTone].sample}&rdquo;</p>}
            </section>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
          <Button variant="ghost" onClick={back} disabled={step === 0} className="mt-4 -ml-3">
            <ArrowLeft size={16} weight="bold" />
            Back
          </Button>
          <Button size="lg" onClick={next} disabled={!canContinue} className="mt-4">
            {step === lastStep
              ? (step === STUDY_STEP && !Object.keys(learner.study ?? {}).length ? "Skip and finish" : "Finish")
              : step === INTEREST_STEP && !learner.interests.length ? "Skip" : "Continue"}
            <ArrowRight size={18} weight="bold" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
