"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
import { ArrowLeft, DownloadSimple, UploadSimple, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ClientGate, StudyPage, StudySkeleton } from "@/components/study/shell";
import { invalidateLearner, replaceStudy, resetStudyStore, useLearner, useReducedMotion, useStudy } from "@/lib/study-store";
import { saveLearner, type LearnerInput } from "@/lib/learning";
import { ageDefaults, ageLines, ageView, allowedPace, habitsOn, readAloudOn, type Setting } from "@/lib/age";
import { AgeInput } from "@/components/age-input";
import { speechSupported } from "@/components/study/read-aloud";
import { CueChips, StudyStatements } from "@/components/study/plan";
import { tuningLines } from "@/lib/personal";
import { cn } from "@/lib/utils";
import { effectiveToday, exportStudy, importStudy, motionDescription, motionFor, setBeatClock, setGuardianHabits, setLargeText, setMotion, setNudge, setPictures, setPlan, setReadAloud, setWhen, tuningOf, type MotionSetting } from "@/lib/study";
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
  const bundle = useLearner();
  const [state, update] = useStudy();
  const reduced = useReducedMotion();
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => { if (bundle === null) router.replace("/start/"); }, [bundle, router]);
  if (!bundle) return <StudySkeleton />;
  const { learner, profile } = bundle;
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
      <Link href="/study/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground -mb-6"><ArrowLeft size={16} weight="bold" /> My study</Link>
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
        <Button variant="destructive" className="self-start" data-testid="reset" onClick={() => { if (window.confirm("Clear all study progress on this device?")) { resetStudyStore(); gooeyToast.success("Progress cleared", { preset: "subtle" }); } }}>
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
