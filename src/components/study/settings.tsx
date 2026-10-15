"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
import { ArrowLeft, DownloadSimple, UploadSimple, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ClientGate, StudyPage, StudySkeleton } from "@/components/study/shell";
import { invalidateLearner, replaceStudy, resetStudyStore, useLearnerRecord, useReducedMotion, useStudy } from "@/lib/study-store";
import { clearThreads } from "@/lib/tutor/threads";
import { buildProfile, saveLearner, type LearnerInput } from "@/lib/learning";
import { ageDefaults, ageLines, ageView, allowedPace, habitsOn, readAloudOn, tutorAccess, validAge, type Setting, type TutorAccess } from "@/lib/age";
import { MINORS_ALLOWED } from "@/lib/tutor/context";
import { SEE_MAX, seeInfo, seeWays, styleAnswersFrom, toneInfo, tutorTones, type SeeWay } from "@/lib/tutor/profile";
import { InterestPicker } from "@/components/chat/interest-picker";
import { AgeInput } from "@/components/age-input";
import { speechSupported } from "@/components/study/read-aloud";
import { CueChips, StudyStatements } from "@/components/study/plan";
import { tuningLines } from "@/lib/personal";
import { cn } from "@/lib/utils";
import { effectiveToday, exportStudy, importStudy, motionDescription, motionFor, setBeatClock, setGuardianHabits, setGuardianTutor, setLargeText, setMotion, setNudge, setPictures, setPlan, setReadAloud, setWhen, tuningOf, type MotionSetting } from "@/lib/study";
import { nowMs } from "@/lib/clock";
import { NudgeControl } from "@/components/study/segments/play";
import { visualCount } from "@/lib/visuals";

export function StudySettings() {
  return (
    <ClientGate>
      <Settings />
    </ClientGate>
  );
}

function Settings() {
  const router = useRouter();
  const record = useLearnerRecord();
  const [state, update] = useStudy();
  const reduced = useReducedMotion();
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => { if (record === null || !validAge(record.age)) router.replace("/learn/"); }, [record, router]);
  if (!record || !validAge(record.age)) return <StudySkeleton />;
  const learner = record;
  const profile = buildProfile(learner);
  const motion = motionFor(learner, profile, state.motion, reduced);
  const auto = motionFor(learner, profile, "auto", false);
  const age = ageView(learner, state);
  const largeTargets = age.largeTargets;
  const tuning = tuningOf(learner, state, effectiveToday(state, nowMs()));
  const lines = tuningLines(tuning);
  const setStudy = (study: Record<string, number>) => { saveLearner({ ...learner, study }); invalidateLearner(); };
  const setAge = (n: number | null) => {
    if (n === null || n === learner.age) return;
    const next: LearnerInput = { ...learner, age: n };
    saveLearner({ ...next, pace: allowedPace(ageDefaults(next), next.pace) });
    invalidateLearner();
  };
  const canSpeak = speechSupported();
  const readingNote = age.pace
    ? age.pace.wpm >= 80 ? "Reading is quick and sure, so auto keeps it off." : age.pace.wpm < 45 ? "Reading still takes a while, so auto keeps it on." : "Auto is going by age until reading is clearly quick or slow."
    : "Auto goes by age until there are a few answers to measure reading by.";

  function download() {
    const blob = new Blob([exportStudy(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dojolom-progress-${state.lastSeen || "backup"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function upload(file: File) {
    const imported = importStudy(await file.text());
    if (!imported) { gooeyToast.error("That file is not a Dojolom backup", { preset: "subtle" }); return; }
    replaceStudy(imported);
    gooeyToast.success("Progress restored", { description: `${imported.sessions.length} sessions and ${Object.keys(imported.memory).length} ideas.`, preset: "bouncy" });
  }

  return (
    <StudyPage motion={motion} largeTargets={largeTargets} largeText={age.largeText} wide={false}>
      {tutorAccess(age.d, state.guardianTutor, MINORS_ALLOWED) === "open"
        ? <Link href="/learn/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground -mb-6" data-testid="back-to-tutor"><ArrowLeft size={16} weight="bold" /> Back to your tutor</Link>
        : <Link href="/study/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground -mb-6"><ArrowLeft size={16} weight="bold" /> My study</Link>}
      <header className="flex flex-col gap-3">
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Study settings</h1>
        <p className="lede">How sessions look and move. Everything here is saved on this device.</p>
      </header>

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="age-settings">
        <div>
          <h2 className="text-xl font-semibold">Age and reading</h2>
          <p className="text-[15px] text-muted-foreground mt-1">Age sets a starting point. How reading and answers actually go takes over from it within a session or two.</p>
        </div>
        <AgeInput value={learner.age} onChange={setAge} id="settings-age" label="Age" />
        <ul className="flex flex-col gap-3" data-testid="age-lines">
          {ageLines(age.d, age.readAloud).map((l) => (
            <li key={l.key} className="rounded-2xl bg-muted/70 p-4 text-[15px] leading-7"><span className="font-semibold">{l.title}. </span>{l.text}</li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <h3 className="font-semibold">Read aloud</h3>
          <p className="text-[15px] text-muted-foreground">{canSpeak ? `Lessons read out with this device's own voice. ${state.readAloud === "auto" ? readingNote : ""}` : "This browser has no voice for reading aloud."}</p>
          {canSpeak && <ThreeWay name="read-aloud" value={state.readAloud} onChange={(v) => update((s) => setReadAloud(s, v))} auto={readAloudOn(age.d, "auto", age.pace)} />}
        </div>
        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <h3 className="font-semibold">Large text</h3>
          <p className="text-[15px] text-muted-foreground">Bigger text and buttons across your study pages.</p>
          <ThreeWay name="large-text" value={state.largeText} onChange={(v) => update((s) => setLargeText(s, v))} auto={age.d.largeText} />
        </div>
      </section>

      <TutorSettings learner={learner} access={tutorAccess(age.d, state.guardianTutor, MINORS_ALLOWED)} minor={age.d.minor} guardianOn={!!state.guardianTutor} onGuardian={(on) => update((s) => setGuardianTutor(s, on))} />

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="motion-settings">
        <div>
          <h2 className="text-xl font-semibold">Animations</h2>
          <p className="text-[15px] text-muted-foreground mt-1">Auto picks from your profile and age. Right now that means <span className="font-semibold text-foreground">{auto}</span>.{reduced && " Your system asks for reduced motion, so everything stays calm regardless."}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Animation level">
          {(["auto", "lively", "balanced", "calm"] as MotionSetting[]).map((m) => {
            const on = state.motion === m;
            return (
              <button key={m} type="button" role="radio" aria-checked={on} data-testid={`motion-${m}`} onClick={() => update((s) => setMotion(s, m))}
                className={cn("tap text-left rounded-2xl border bg-card px-5 py-4 transition-[border-color,box-shadow]", on ? "border-focus ring-4 ring-focus/12 shadow-[var(--shadow-card)]" : "border-input hover:border-foreground/35")}>
                <span className="block font-semibold capitalize">{m}</span>
                <span className="block text-[15px] text-muted-foreground mt-1">{m === "auto" ? "Let the profile decide." : motionDescription(m)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold">Games</h2>
          <p className="text-[15px] text-muted-foreground mt-1">
            {age.d.timers === "hidden" ? "Nothing is timed." : age.d.timers === "quiet" ? "Nothing is timed unless you turn the clock on." : "True or false gets a timer once your answers are steady. Turn the clock on if you enjoy the pressure."}
          </p>
        </div>
        {age.d.timers !== "hidden" && (
          <button type="button" role="switch" aria-checked={state.beatClock} data-testid="beat-clock" onClick={() => update((s) => setBeatClock(s, !s.beatClock))}
            className={cn("tap self-start inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-semibold", state.beatClock ? "border-focus bg-focus-soft text-focus" : "border-input bg-card")}>
            <span className={cn("size-5 rounded-full border-2 inline-flex items-center justify-center", state.beatClock ? "bg-focus border-focus" : "border-input")} aria-hidden />
            Beat the clock {state.beatClock ? "on" : "off"}
          </button>
        )}
        <NudgeControl value={state.nudge} onChange={(n) => update((s) => setNudge(s, n))} largeTargets={largeTargets} className="pt-2 border-t border-border" />
        <div className="flex flex-col gap-3 pt-2 border-t border-border">
          <div>
            <h3 className="font-semibold">Pictures</h3>
            <p className="text-[15px] text-muted-foreground mt-1">
              {visualCount() > 0
                ? "Ideas, terms and steps are illustrated where a picture exists. Match pairs pairs terms with pictures, put it in order becomes a storyboard, and Spot it joins the games."
                : "No illustrations are built into this copy yet. When they are, match pairs pairs terms with pictures, put it in order becomes a storyboard, and Spot it joins the games."}
            </p>
          </div>
          <button type="button" role="switch" aria-checked={state.pictures} data-testid="pictures" onClick={() => update((s) => setPictures(s, !s.pictures))}
            className={cn("tap self-start inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-semibold", state.pictures ? "border-focus bg-focus-soft text-focus" : "border-input bg-card")}>
            <span className={cn("size-5 rounded-full border-2 inline-flex items-center justify-center", state.pictures ? "bg-focus border-focus" : "border-input")} aria-hidden />
            Pictures in games {state.pictures ? "on" : "off"}
          </button>
        </div>
      </section>

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold">Your plan</h2>
          <p className="text-[15px] text-muted-foreground mt-1">When do you usually study, and right after what? A session tied to something you already do every day starts to happen on its own.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["morning", "afternoon", "evening"] as const).map((w) => (
            <Button key={w} variant={state.when === w ? "default" : "outline"} className="capitalize" onClick={() => update((s) => setWhen(s, w))}>{w}</Button>
          ))}
        </div>
        <CueChips value={state.cue} onChange={(c) => update((s) => setPlan(s, c, nowMs()))} />
        {age.d.minor && (
          <div className="flex flex-col gap-3 pt-2 border-t border-border" data-testid="guardian-habits">
            <div>
              <h3 className="font-semibold">For a parent or guardian: adjust to study habits</h3>
              <p className="text-[15px] text-muted-foreground mt-1">
                For learners under 18 this is off unless you turn it on. When on, the app notices missed days and suggests an easier plan. Teaching still adapts to answers either way, and everything stays on this device.
              </p>
            </div>
            <button type="button" role="switch" aria-checked={!!state.guardianHabits} data-testid="guardian-habits-switch" onClick={() => update((s) => setGuardianHabits(s, !s.guardianHabits))}
              className={cn("tap self-start inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-semibold", state.guardianHabits ? "border-focus bg-focus-soft text-focus" : "border-input bg-card")}>
              <span className={cn("size-5 rounded-full border-2 inline-flex items-center justify-center", state.guardianHabits ? "bg-focus border-focus" : "border-input")} aria-hidden />
              Adjust to habits {state.guardianHabits ? "on" : "off"}
            </button>
          </div>
        )}
      </section>

      {age.d.studyQuestions && (
        <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="study-profile">
          <div>
            <h2 className="text-xl font-semibold">How you study right now</h2>
            <p className="text-[15px] text-muted-foreground mt-1">
              Optional, and only ever used to adjust support: never what you are taught or how hard it is.{" "}
              {habitsOn(age.d, state.guardianHabits) ? "What you actually do counts for more than these answers within a couple of weeks." : "Until habit tuning is turned on above, only these answers count, never what you do."}{" "}
              Change them whenever they stop being true.
            </p>
          </div>
          {lines.length > 0 ? (
            <ul className="flex flex-col gap-3" data-testid="tuning-lines">
              {lines.map((l) => (
                <li key={l.key} className="rounded-2xl bg-muted/70 p-4 text-[15px] leading-7"><span className="font-semibold">{l.title}. </span>{l.text}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-muted-foreground">Nothing is adjusted for you at the moment: your sessions run on the defaults and your results.</p>
          )}
          <StudyStatements answers={learner.study ?? {}} onChange={(id, v) => setStudy({ ...(learner.study ?? {}), [id]: v })} largeTargets={largeTargets} />
          {Object.keys(learner.study ?? {}).length > 0 && (
            <Button variant="outline" className="self-start" onClick={() => setStudy({})} data-testid="study-clear">Forget these answers</Button>
          )}
        </section>
      )}

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold">Back up your progress</h2>
          <p className="text-[15px] text-muted-foreground mt-1">Progress lives in this browser only. Download a copy before switching devices or clearing site data.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={download} data-testid="export"><DownloadSimple size={16} weight="bold" /> Download backup</Button>
          <Button variant="outline" onClick={() => fileInput.current?.click()} data-testid="import"><UploadSimple size={16} weight="bold" /> Restore from file</Button>
          <input ref={fileInput} type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        </div>
      </section>

      <section className="rounded-[28px] bg-ember-soft/60 p-6 md:p-8 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold">Start again</h2>
          <p className="text-[15px] text-muted-foreground mt-1">Clears every session, review schedule and note on this device. Your learner profile stays.</p>
        </div>
        <Button variant="destructive" className="self-start" data-testid="reset" onClick={() => { if (window.confirm("Clear all study progress on this device?")) { resetStudyStore(); clearThreads(); try { localStorage.removeItem("dojolom.ideas"); } catch {} gooeyToast.success("Progress cleared", { preset: "subtle" }); } }}>
          <Trash size={16} weight="bold" /> Clear study progress
        </Button>
      </section>
    </StudyPage>
  );
}

/* Auto, on or off, with what auto means right now. */
function ThreeWay({ name, value, onChange, auto }: { name: string; value: Setting; onChange: (v: Setting) => void; auto: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name.replace("-", " ")}>
      {(["auto", "on", "off"] as Setting[]).map((v) => (
        <button key={v} type="button" role="radio" aria-checked={value === v} data-testid={`${name}-${v}`} onClick={() => onChange(v)}
          className={cn("tap rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors", value === v ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}>
          {v === "auto" ? `Auto (${auto ? "on" : "off"})` : v === "on" ? "On" : "Off"}
        </button>
      ))}
    </div>
  );
}

/* The tutor: its voice, where explanations start, and what examples are set in. For an under-18, the guardian's switch. */
function TutorSettings({ learner, access, minor, guardianOn, onGuardian }: { learner: LearnerInput; access: TutorAccess; minor: boolean; guardianOn: boolean; onGuardian: (on: boolean) => void }) {
  const save = (patch: Partial<LearnerInput>) => { saveLearner({ ...learner, ...patch }); invalidateLearner(); };
  const setWays = (ways: SeeWay[]) => save({ seeWays: ways, answers: ways.length ? styleAnswersFrom(ways) : learner.answers });
  const open = access !== "closed";
  return (
    <section id="tutor" className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-6 scroll-mt-24" data-testid="tutor-settings">
      <div>
        <h2 className="text-xl font-semibold">Your tutor</h2>
        <p className="text-[15px] text-muted-foreground mt-1">
          {open
            ? "The AI tutor teaches the same way whatever you pick here. These change how it sounds, where it starts, and the world its examples are set in."
            : "The AI tutor is for adults for now, while we make sure it meets the rules for children's data and safety. How you like things explained still shapes your lessons."}
        </p>
      </div>
      {open && (
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Voice</h3>
          <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Tutor voice">
            {tutorTones.map((t) => {
              const on = (learner.tutorTone || "calm") === t;
              return (
                <button key={t} type="button" role="radio" aria-checked={on} data-testid={`tone-${t}`} onClick={() => save({ tutorTone: t })}
                  className={cn("tap text-left rounded-2xl border bg-card px-5 py-4 transition-[border-color,box-shadow]", on ? "border-focus ring-4 ring-focus/12 shadow-[var(--shadow-card)]" : "border-input hover:border-foreground/35")}>
                  <span className="block font-semibold">{toneInfo[t].label}</span>
                  <span className="block text-[15px] text-muted-foreground mt-1">{toneInfo[t].blurb}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className={cn("flex flex-col gap-3", open && "pt-2 border-t border-border")}>
        <h3 className="font-semibold">How you like things explained</h3>
        <p className="text-[15px] text-muted-foreground">Pick one or two. It is only where we start: we switch when another way works better.</p>
        <div className="flex flex-wrap gap-2" data-testid="settings-see-ways">
          {seeWays.map((w) => {
            const on = learner.seeWays.includes(w);
            return (
              <button key={w} type="button" aria-pressed={on} onClick={() => setWays(on ? learner.seeWays.filter((x) => x !== w) : learner.seeWays.length >= SEE_MAX ? [...learner.seeWays.slice(1), w] : [...learner.seeWays, w])}
                className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors", on ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}>
                {seeInfo[w].label}
              </button>
            );
          })}
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-3 pt-2 border-t border-border">
          <h3 className="font-semibold">Examples from your world</h3>
          <p className="text-[15px] text-muted-foreground">Word problems and examples can be set in what you&apos;re into. Only the story changes, never the maths.</p>
          <InterestPicker value={learner.interests} onChange={(interests) => save({ interests })} />
        </div>
      )}
      {minor && access !== "closed" && (
        <div className="flex flex-col gap-3 pt-2 border-t border-border" data-testid="guardian-tutor">
          <div>
            <h3 className="font-semibold">For a parent or guardian: the AI tutor</h3>
            <p className="text-[15px] text-muted-foreground mt-1">When on, what this learner types, with their first name, age, class and interests, goes to an AI service to write the tutor&apos;s replies. Nothing is kept by Dojolom. Turn it off and lessons carry on in the lesson player.</p>
          </div>
          <button type="button" role="switch" aria-checked={guardianOn} data-testid="guardian-tutor-switch" onClick={() => onGuardian(!guardianOn)}
            className={cn("tap self-start inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-semibold", guardianOn ? "border-focus bg-focus-soft text-focus" : "border-input bg-card")}>
            <span className={cn("size-5 rounded-full border-2 inline-flex items-center justify-center", guardianOn ? "bg-focus border-focus" : "border-input")} aria-hidden />
            AI tutor {guardianOn ? "on" : "off"}
          </button>
        </div>
      )}
    </section>
  );
}
