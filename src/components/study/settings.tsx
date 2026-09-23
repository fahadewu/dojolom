"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
import { ArrowLeft, DownloadSimple, UploadSimple, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ClientGate, StudyPage, StudySkeleton } from "@/components/study/shell";
import { replaceStudy, resetStudyStore, useLearner, useReducedMotion, useStudy } from "@/lib/study-store";
import { cn } from "@/lib/utils";
import { exportStudy, importStudy, motionDescription, motionFor, setBeatClock, setMotion, setWhen, type MotionSetting } from "@/lib/study";

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
  const largeTargets = learner.age === "kid" || learner.age === "senior";
  const gentle = largeTargets;

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
    <StudyPage motion={motion} largeTargets={largeTargets} wide={false}>
      <Link href="/study/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground -mb-6"><ArrowLeft size={16} weight="bold" /> My study</Link>
      <header className="flex flex-col gap-3">
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Study settings</h1>
        <p className="lede">How sessions look and move. Everything here is saved on this device.</p>
      </header>

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="motion-settings">
        <div>
          <h2 className="text-xl font-semibold">Animations</h2>
          <p className="text-[15px] text-muted-foreground mt-1">Auto picks from your profile and age group. Right now that means <span className="font-semibold text-foreground">{auto}</span>.{reduced && " Your system asks for reduced motion, so everything stays calm regardless."}</p>
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
          <p className="text-[15px] text-muted-foreground mt-1">{gentle ? "Timers are off for your age group by default." : "True or false gets a timer once your answers are steady."} Turn the clock on if you enjoy the pressure.</p>
        </div>
        <button type="button" role="switch" aria-checked={state.beatClock} data-testid="beat-clock" onClick={() => update((s) => setBeatClock(s, !s.beatClock))}
          className={cn("tap self-start inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-semibold", state.beatClock ? "border-focus bg-focus-soft text-focus" : "border-input bg-card")}>
          <span className={cn("size-5 rounded-full border-2 inline-flex items-center justify-center", state.beatClock ? "bg-focus border-focus" : "border-input")} aria-hidden />
          Beat the clock {state.beatClock ? "on" : "off"}
        </button>
      </section>

      <section className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold">Your plan</h2>
          <p className="text-[15px] text-muted-foreground mt-1">When do you usually study? We show it back to you so the habit has a home.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["morning", "afternoon", "evening"] as const).map((w) => (
            <Button key={w} variant={state.when === w ? "default" : "outline"} className="capitalize" onClick={() => update((s) => setWhen(s, w))}>{w}</Button>
          ))}
        </div>
      </section>

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
