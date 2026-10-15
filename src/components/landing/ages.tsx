"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Listen, ReadAloudProvider, Spoken, speechSupported, useSpeaking } from "@/components/study/read-aloud";
import { ageDefaults, ageLines } from "@/lib/age";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/study-store";

/* What changes with age, straight from the app's own rules (src/lib/age.ts), so
   the page cannot promise something the sessions do not do. The sample lesson
   card changes with the age picked: text size, how the idea is said back, and
   whether it is read aloud. The voice tile's lights move only while something
   is actually being read. */

const AGES = [6, 9, 15, 30, 70] as const;
const SENTENCE = "The digit 7 can mean seven, seventy or seven hundred. Where it sits decides everything.";

export function Ages() {
  const [age, setAge] = useState<(typeof AGES)[number]>(9);
  const d = ageDefaults({ age, track: "everyday", bdStage: "" });
  const lines = ageLines(d, d.readAloud);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28" data-testid="ages">
      <SectionHeading
        title="Set up for whoever is learning"
        lede="Type an age when you start. It sets a comfortable beginning, then how the learner actually reads and answers takes over. Pick an age to see what changes."
      />
      <div className="grid lg:grid-cols-2 gap-x-14 gap-y-7 items-start">
        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1">
          <p className="text-sm font-semibold" id="age-pick">Age</p>
          <div role="radiogroup" aria-labelledby="age-pick" className="inline-flex flex-wrap gap-1.5 rounded-full bg-muted p-1.5 self-start">
            {AGES.map((a) => (
              <button
                key={a}
                type="button"
                role="radio"
                aria-checked={age === a}
                data-testid={`age-${a}`}
                onClick={() => setAge(a)}
                className={cn(
                  "min-w-14 rounded-full px-4 py-2 font-display text-lg font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-200",
                  age === a ? "bg-card text-foreground shadow-[var(--shadow-card)]" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* On a phone the card comes straight after the picker that changes it. */}
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <ReadAloudProvider value={{ on: false, autoQuestions: false, rate: age <= 7 ? 0.85 : age >= 60 ? 0.92 : 1 }}>
            <SampleCard age={age} large={d.largeText} chips={d.sayBack === "build"} readAloud={d.readAloud} explainFirst={!d.tryFirst} />
          </ReadAloudProvider>
        </div>

        <ul key={age} className="flex flex-col gap-3 lg:col-start-1 lg:row-start-2" data-testid="age-changes">
          {lines.map((l, i) => (
            <li key={l.key} className="move-enter rounded-2xl bg-card p-4 md:p-5 shadow-[var(--shadow-hairline)] text-[15px] leading-7" style={{ "--m-delay": `${i * 60}ms` } as React.CSSProperties}>
              <span className="font-semibold">{l.title}. </span>
              <span className="text-muted-foreground">{l.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SampleCard({ age, large, chips, readAloud, explainFirst }: { age: number; large: boolean; chips: boolean; readAloud: boolean; explainFirst: boolean }) {
  const mounted = useMounted(); // speech exists only in the browser: decide after hydration
  const canSpeak = mounted && speechSupported();
  return (
    <div className="surface-raised rounded-[30px] p-6 md:p-8 flex flex-col gap-6" data-testid="age-sample" data-large={large}>
      <div className="flex items-center gap-4">
        <VoiceTile />
        <div className="flex flex-col gap-1">
          <p className="font-semibold leading-tight">Read aloud {readAloud ? "is on" : "is one tap away"}</p>
          <p className="text-sm text-muted-foreground leading-snug">
            {readAloud ? `At ${age}, lessons are read out with each sentence lit up, until reading is quick and sure.` : "On for anyone whose reading is measured as slow, at any age."}
          </p>
          {canSpeak && <Listen label="Hear it" className="mt-1" chunks={() => [{ key: "age-sample", text: SENTENCE }]} />}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-5 border-t border-border">
        <p className="text-sm font-semibold text-focus">{explainFirst ? "Explained first, then tried" : "Tried first, once the topic is under way"}</p>
        <p className={cn("font-display font-semibold leading-snug transition-[font-size] duration-300", large ? "text-[1.7rem]" : "text-[1.35rem]")}>
          <Spoken k="age-sample" text={SENTENCE} />
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-5 border-t border-border" data-testid="age-say" data-mode={chips ? "chips" : "type"}>
        <p className="text-sm font-semibold text-sprout">Then it is said back</p>
        {chips ? (
          <div className="flex flex-wrap gap-2">
            {["Where a digit sits", "decides", "what it is worth"].map((c) => (
              <span key={c} className={cn("rounded-full border border-input bg-card px-4 font-semibold", large ? "py-3 text-[17px]" : "py-2 text-[15px]")}>{c}</span>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-input bg-card px-4 py-3 text-[15px] text-muted-foreground">
            In your own words: a digit is worth more the further left it sits…
            <span className="block mt-2 text-sm font-semibold text-focus">Or build it from word chips</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* The voice: a dark tile with a grid of lights that rise and fall only while something is being read. */
function VoiceTile() {
  const speaking = useSpeaking() !== null;
  const cols = [0.62, 0.9, 0.74, 1.05, 0.68, 0.84, 0.58];
  return (
    <div className={cn("voice-tile relative shrink-0 size-[88px] rounded-[24px] p-3.5", speaking && "is-speaking")} aria-hidden>
      <div className="relative z-10 grid grid-cols-7 gap-[3px] h-full items-end">
        {cols.map((dur, c) => (
          <div key={c} className="relative h-full">
            <div className="absolute inset-0 flex flex-col justify-end gap-[3px]">
              {[0, 1, 2, 3, 4, 5].map((r) => <span key={r} className="block size-[6px] rounded-full bg-white/10" />)}
            </div>
            <div className="voice-lit absolute inset-0 flex flex-col justify-end gap-[3px]" style={{ "--dur": `${dur}s`, "--delay": `${c * -0.13}s` } as React.CSSProperties}>
              {[0, 1, 2, 3, 4, 5].map((r) => <span key={r} className="block size-[6px] rounded-full bg-sun shadow-[0_0_6px_rgb(247_197_72/0.9)]" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
