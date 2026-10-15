"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react";
import { SubjectChip } from "@/components/subject-icon";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { tint, type Tint } from "@/lib/tint";
import { useReducedMotion } from "@/lib/study-store";
import { useInView } from "@/components/landing/use-in-view";

/* Every new idea is learned in four moves, in this order. The list is a real
   sequence, so it is numbered. While it is on screen it steps through by
   itself, with a bar showing when the next move comes; the first time the
   visitor picks a move it stops for good. Each move's icon draws itself as
   it becomes current, and the preview beside it is the move itself, small
   and working. */

const DWELL = 5200;

const moves: { id: string; title: string; text: string; tint: Tint; icon: string[] }[] = [
  {
    id: "guess", title: "Guess", tint: "play",
    text: "A common belief, true or false. Guessing first makes the idea stick, even when the guess is wrong.",
    icon: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.7.3-1.2.9-1.2 1.6v.6", "M12 17.2v.1"],
  },
  {
    id: "try", title: "Try", tint: "sun",
    text: "A go at a real question before it is explained. Children and newcomers are shown first, then try.",
    icon: ["M4 20l1.2-4.4L16.4 4.4a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z", "M14.5 6.3l3.2 3.2"],
  },
  {
    id: "see", title: "See", tint: "focus",
    text: "The idea as a picture, a walkthrough, a story or a careful read. If one way does not land, ask for another.",
    icon: ["M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  },
  {
    id: "say", title: "Say", tint: "sprout",
    text: "Put it in your own words, or rebuild it from word chips. Then compare with the three key points.",
    icon: ["M4 5h16v11H9.5L4 20.5z", "M8 9h8", "M8 12.5h5"],
  },
];

export function Loop() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const running = auto && !paused && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % moves.length), DWELL);
    return () => clearTimeout(t);
  }, [running, active]);

  const pick = (i: number, focus = false) => {
    setAuto(false);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  return (
    <section id="how" className="max-w-6xl mx-auto px-6 py-20 md:py-28 scroll-mt-16" data-testid="loop">
      <SectionHeading
        title="Every new idea, in four moves"
        lede="The same order every time, because doing something with an idea is what makes it stay."
      />
      <div
        ref={ref}
        className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          role="tablist"
          aria-label="The four moves"
          aria-orientation="vertical"
          className="grid grid-cols-4 gap-1.5 lg:flex lg:flex-col lg:gap-2"
          onKeyDown={(e) => {
            const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
            if (!next) return;
            e.preventDefault();
            pick((active + next + moves.length) % moves.length, true);
          }}
        >
          {moves.map((m, i) => {
            const on = active === i;
            const t = tint[m.tint];
            return (
              <button
                key={m.id}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`move-${m.id}`}
                aria-selected={on}
                aria-controls="move-panel"
                tabIndex={on ? 0 : -1}
                data-testid={`move-${m.id}`}
                onClick={() => pick(i)}
                className={cn(
                  "group relative rounded-[22px] p-3 pb-4 flex flex-col items-center text-center gap-2 lg:flex-row lg:items-start lg:text-left lg:p-5 lg:pr-6 lg:gap-4 transition-[background-color,box-shadow] duration-300",
                  on ? "surface-raised" : "hover:bg-card/70",
                )}
              >
                <span className={cn("shrink-0 size-12 rounded-2xl inline-flex items-center justify-center transition-colors duration-300", on ? t.solid : "bg-muted text-muted-foreground")}>
                  <MoveIcon paths={m.icon} drawing={on} />
                </span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="flex items-baseline gap-2.5">
                    <span className={cn("font-display text-sm font-semibold tabular-nums", on ? t.text : "text-muted-foreground")}>{i + 1}</span>
                    <span className="font-display text-base lg:text-xl font-semibold">{m.title}</span>
                  </span>
                  <span className={cn("hidden lg:block text-[15px] leading-6 transition-colors", on ? "text-foreground/80" : "text-muted-foreground")}>{m.text}</span>
                </span>
                {on && (
                  <span className="absolute left-3 right-3 lg:left-5 lg:right-6 bottom-1.5 lg:bottom-2 h-[3px] rounded-full bg-muted overflow-hidden" aria-hidden>
                    <span key={`${active}-${running}`} className={cn("block h-full rounded-full", t.bar, running ? "loop-progress" : "w-full opacity-0")} style={{ "--dwell": `${DWELL}ms` } as React.CSSProperties} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div id="move-panel" role="tabpanel" aria-labelledby={`move-${moves[active].id}`} className="surface-raised rounded-[30px] p-6 md:p-8 lg:min-h-[420px] flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SubjectChip id="science" size="sm" />
              <div>
                <p className="text-sm text-muted-foreground leading-tight">Physics, chapter 1</p>
                <p className="font-semibold leading-tight">Why things fall together</p>
              </div>
            </div>
            <ol className="flex items-center gap-1.5" aria-label={`Move ${active + 1} of 4`}>
              {moves.map((m, i) => (
                <li key={m.id} className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? cn("w-6", tint[m.tint].bar) : i < active ? "w-1.5 bg-foreground/40" : "w-1.5 bg-muted")} />
              ))}
            </ol>
          </div>
          {/* On a phone the tabs carry only names; the move's description leads the panel instead. */}
          <p key={`text-${active}`} className="move-enter lg:hidden text-[15px] leading-6 text-muted-foreground -mt-2">{moves[active].text}</p>
          <div key={moves[active].id} className="flex-1 flex flex-col move-enter">
            {active === 0 && <GuessPreview />}
            {active === 1 && <TryPreview />}
            {active === 2 && <SeePreview />}
            {active === 3 && <SayPreview />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* A line icon that draws itself when its move becomes current. */
function MoveIcon({ paths, drawing }: { paths: string[]; drawing: boolean }) {
  return (
    <svg key={String(drawing)} viewBox="0 0 24 24" className={cn("size-6", drawing && "icon-draw")} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths.map((d, i) => <path key={i} d={d} pathLength={1} style={{ "--d": `${i * 160}ms` } as React.CSSProperties} />)}
    </svg>
  );
}

function Prompt({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-[1.6rem] md:text-[1.85rem] font-semibold leading-[1.15]">{children}</p>;
}

function Feedback({ tone, children }: { tone: "right" | "wrong" | "note"; children: React.ReactNode }) {
  return (
    <p className={cn("move-enter rounded-2xl p-4 text-[15px] leading-7", tone === "right" ? "bg-sprout-soft" : tone === "wrong" ? "bg-ember-soft" : "bg-muted")} aria-live="polite">
      {children}
    </p>
  );
}

function GuessPreview() {
  const [said, setSaid] = useState<boolean | null>(null);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-play">True or false?</p>
      <Prompt>Heavier things fall faster than light ones.</Prompt>
      <div className="flex gap-3">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={said !== null}
            onClick={() => setSaid(v)}
            data-testid={v ? "demo-true" : "demo-false"}
            className={cn(
              "flex-1 rounded-2xl border px-5 py-3.5 font-semibold transition-colors",
              said === null ? "border-input bg-card hover:border-foreground/35" : said === v ? "border-foreground bg-foreground text-white" : "border-border text-muted-foreground",
            )}
          >
            {v ? "True" : "False"}
          </button>
        ))}
      </div>
      {said !== null && (
        <Feedback tone="note">
          {said ? "Most people say true, which is exactly why it is asked first. " : "You already doubt it. "}
          The lesson shows why air, not weight, makes the difference.
        </Feedback>
      )}
    </div>
  );
}

function TryPreview() {
  const options = ["The hammer", "The feather", "They land together"];
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-sun-deep">Have a go before we explain</p>
      <Prompt>On the Moon, an astronaut drops a hammer and a feather at the same moment. Which lands first?</Prompt>
      <div className="grid gap-2.5">
        {options.map((o, i) => {
          const right = i === 2;
          const answered = picked !== null;
          return (
            <button
              key={o}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              data-testid="demo-option"
              className={cn(
                "text-left rounded-2xl border px-5 py-3 font-medium flex items-center justify-between transition-colors",
                !answered && "border-input bg-card hover:border-foreground/35",
                answered && right && "border-sprout bg-sprout text-white",
                answered && picked === i && !right && "border-ember/50 bg-ember-soft",
                answered && picked !== i && !right && "border-border text-muted-foreground/70",
              )}
            >
              {o}
              {answered && right && <Check size={18} weight="bold" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <Feedback tone={picked === 2 ? "right" : "wrong"}>
          {picked === 2 ? "Right. " : "A wrong guess here costs nothing. "}
          With no air to push back, everything falls at the same rate. An astronaut tried it on the Moon in 1971.
        </Feedback>
      )}
    </div>
  );
}

function SeePreview() {
  const formats = ["Picture", "Walkthrough", "Story"] as const;
  const [format, setFormat] = useState<(typeof formats)[number]>("Picture");
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Gravity", text: "Pulls every object down at the same rate.", tint: "focus" as Tint },
    { label: "Air", text: "Pushes back on wide, light things the most.", tint: "sun" as Tint },
    { label: "No air", text: "Nothing pushes back, so all fall together.", tint: "sprout" as Tint },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Format">
        {formats.map((f) => (
          <button key={f} type="button" role="radio" aria-checked={format === f} onClick={() => { setFormat(f); setStep(0); }}
            className={cn("rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", format === f ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}>
            {f}
          </button>
        ))}
      </div>
      <div key={format} className="move-enter">
        {format === "Picture" && (
          <ol className="grid sm:grid-cols-3 gap-3">
            {steps.map((s, i) => (
              <li key={s.label} className={cn("rounded-2xl p-4 flex flex-col gap-2", tint[s.tint].soft)}>
                <span className={cn("font-display text-2xl font-semibold tabular-nums", tint[s.tint].text)}>{i + 1}</span>
                <span className="font-semibold leading-snug">{s.label}</span>
                <span className="text-sm text-ink/75 leading-6">{s.text}</span>
              </li>
            ))}
          </ol>
        )}
        {format === "Walkthrough" && (
          <div className="rounded-[22px] bg-ink text-white p-6 flex flex-col gap-5">
            <p className="text-sm font-semibold text-white/60">Step {step + 1} of {steps.length}</p>
            <p key={step} className="move-enter font-display text-2xl font-semibold leading-snug min-h-[4.5rem]">{steps[step].text}</p>
            <div className="flex justify-between">
              <button type="button" className="text-sm font-semibold text-white/70 disabled:opacity-30" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</button>
              <button type="button" className="rounded-full bg-white text-ink px-4 py-1.5 text-sm font-semibold disabled:opacity-40" disabled={step === steps.length - 1} onClick={() => setStep((s) => s + 1)}>Next</button>
            </div>
          </div>
        )}
        {format === "Story" && (
          <p className="rounded-[22px] bg-sun-soft/70 p-6 text-[17px] leading-8">
            In 1971, astronaut David Scott stood on the Moon with a hammer in one hand and a falcon feather in the other. He let go of
            both at once. With no air to slow the feather, they touched the grey dust together.
          </p>
        )}
      </div>
    </div>
  );
}

function SayPreview() {
  const pieces = ["With no air,", "everything falls", "at the same rate."];
  const chips = [pieces[2], "heavier falls faster", pieces[0], pieces[1]];
  const [built, setBuilt] = useState<string[]>([]);
  const [miss, setMiss] = useState<string | null>(null);
  const done = built.length === pieces.length;
  const tap = (c: string) => {
    if (done || built.includes(c)) return;
    if (c === pieces[built.length]) { setBuilt((b) => [...b, c]); setMiss(null); }
    else setMiss(c);
  };
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-sprout">Say it back</p>
      <Prompt>Rebuild the idea from the chips.</Prompt>
      <p className="min-h-[3.5rem] rounded-2xl border border-dashed border-input px-4 py-3 text-lg font-semibold leading-snug" aria-live="polite" data-testid="demo-built">
        {built.length ? built.join(" ") : <span className="text-muted-foreground font-normal text-base">Tap the pieces in order</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const used = built.includes(c);
          return (
            <button key={c} type="button" onClick={() => tap(c)} disabled={used || done} data-testid="demo-chip"
              className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-all", used ? "opacity-30" : "bg-card border-input hover:border-foreground/35", miss === c && "m-flash-ember")}>
              {c}
            </button>
          );
        })}
      </div>
      {done ? (
        <Feedback tone="right">That is the idea in your own hands. Now it is compared with the three key points.</Feedback>
      ) : miss ? (
        <Feedback tone="wrong">Not that piece yet. Which part comes first?</Feedback>
      ) : null}
      {(done || built.length > 0) && (
        <button type="button" className="self-start text-sm font-semibold text-focus hover:underline underline-offset-4" onClick={() => { setBuilt([]); setMiss(null); }}>
          Start again
        </button>
      )}
    </div>
  );
}
