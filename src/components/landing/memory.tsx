"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { curvePath, memoryJourney } from "@/lib/landing";
import { useReducedMotion } from "@/lib/study-store";
import { useInView } from "@/components/landing/use-in-view";

/* Two months of one idea, run through the same memory model the app uses.
   Drag the day along the ruler and the ring shows the chance of recalling it
   that day: its glow is the strength of the memory, nothing else. When the
   section first comes into view the marker walks from day 0 to day 14 once,
   to show it can be moved; after that it moves only when the visitor moves it. */

const HORIZON = 60;
const START_DAY = 14;
const FLOOR = 0.5;          // the chart's y axis runs from 50% to 100% recall
const W = 640;
const H = 220;
const GREEN = "#4cc58c";    // progress green, lifted for an ink background
const GOLD = "#f7c548";
const PAD_L = 34;           // room for the axis labels left of the plot
const PAD_R = 10;

const journey = memoryJourney(HORIZON);
const scaled = (f: (d: number) => number) => (d: number) => Math.max(0, (f(d) - FLOOR) / (1 - FLOOR));
const xOf = (d: number) => (W * d) / HORIZON;
const yOf = (r: number) => H * (1 - Math.max(0, (r - FLOOR) / (1 - FLOOR)));

function useTween(target: number, ms = 420) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const x = a + (target - a) * (1 - Math.pow(1 - t, 3));
      from.current = x;
      setValue(x);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

export function Memory() {
  const reduced = useReducedMotion();
  const [day, setDay] = useState(0);
  const touched = useRef(false);
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.35 });

  // The one unprompted motion here: the marker walks to day 14 the first time the chart is seen.
  useEffect(() => {
    if (!seen || touched.current) return;
    if (reduced) { const t = setTimeout(() => setDay(START_DAY), 0); return () => clearTimeout(t); }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = Math.min(1, (now - start) / 1500);
      setDay(Math.round(START_DAY * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced]);

  const recall = journey.recallAt(day);
  const without = journey.unrewoundAt(day);
  const shown = useTween(recall);
  const next = journey.nextRewindAfter(day);
  const done = journey.rewindsBy(day);
  const strength = Math.max(0, (shown - FLOOR) / (1 - FLOOR)); // 0..1
  const paths = useMemo(() => ({
    with: curvePath(scaled(journey.recallAt), HORIZON, W, H),
    without: curvePath(scaled(journey.unrewoundAt), HORIZON, W, H),
  }), []);
  const C = 2 * Math.PI * 86;

  return (
    <section className="bg-ink text-white" data-testid="memory">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl flex flex-col gap-4 mb-12 md:mb-14">
          <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Every idea comes back just before you would forget it</h2>
          <p className="text-lg text-white/65 leading-8 max-w-xl">
            A rewind is timed from how well you answered last time, so what you know well comes back less often. This is one idea
            over two months, scheduled by the model the app runs for every idea you learn.
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-[300px_1fr] gap-5">
          {/* The ring: recall on the chosen day. */}
          <div className="rounded-[28px] bg-white/[0.05] ring-1 ring-white/10 p-6 flex flex-col items-center gap-5">
            <div className="relative size-[220px]">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90 overflow-visible" aria-hidden>
                <circle cx="100" cy="100" r="86" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="10" />
                <circle
                  cx="100" cy="100" r="86" fill="none" stroke={GREEN} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - shown)}
                  style={{ filter: `drop-shadow(0 0 ${6 + 18 * strength}px rgb(76 197 140 / ${0.2 + 0.55 * strength}))` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-white/60">Day {day}</span>
                <span className="font-display text-[3.6rem] font-semibold leading-none tabular-nums tracking-[-0.04em]" data-testid="recall">
                  {Math.round(shown * 100)}%
                </span>
                <span className="text-sm text-white/60 mt-1">chance you recall it</span>
              </div>
            </div>
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-2 w-full">
              <Stat label="Rewinds so far" value={String(done)} />
              <Stat label="Next rewind" value={next === null ? "After day 60" : `Day ${next}`} note={next === null ? undefined : `in ${next - day} ${next - day === 1 ? "day" : "days"}`} />
              <Stat label="Without rewinds" value={`${Math.round(without * 100)}%`} dim />
            </dl>
          </div>

          {/* The curve, and the ruler that moves the day. */}
          <div className="rounded-[28px] bg-white/[0.05] ring-1 ring-white/10 p-6 md:p-8 flex flex-col gap-6 min-w-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2"><span className="h-[3px] w-6 rounded-full" style={{ background: GREEN }} /> With rewinds</span>
              <span className="inline-flex items-center gap-2 text-white/60"><span className="w-6 border-t-2 border-dashed border-white/40" /> Never rewound</span>
              <span className="inline-flex items-center gap-2 text-white/60"><span className="size-2.5 rounded-full" style={{ background: GOLD }} /> A rewind</span>
            </div>
            <svg viewBox={`${-PAD_L} -18 ${W + PAD_L + PAD_R} ${H + 40}`} className="w-full h-auto overflow-visible" role="img" aria-label={`Recall over 60 days. With rewinds on days ${journey.rewinds.join(", ")}, it stays above 90 percent; never rewound, it falls to ${Math.round(journey.unrewoundAt(HORIZON) * 100)} percent.`}>
              {[1, 0.9, 0.75, 0.5].map((r) => (
                <g key={r}>
                  <line x1="0" x2={W} y1={yOf(r)} y2={yOf(r)} stroke="white" strokeOpacity={r === 0.9 ? 0.22 : 0.08} strokeDasharray={r === 0.9 ? "4 5" : undefined} />
                  <text x="-10" y={yOf(r) + 4} textAnchor="end" className="chart-label" fill="white" fillOpacity="0.5">{Math.round(r * 100)}%</text>
                </g>
              ))}
              <path d={paths.without} fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="5 6" />
              <path d={paths.with} pathLength={1} fill="none" stroke={GREEN} strokeWidth="3" strokeLinejoin="round" className={cn("curve-draw", seen && "is-drawn")} />
              {journey.rewinds.map((d) => (
                <g key={d}>
                  <circle cx={xOf(d)} cy={yOf(1)} r="5.5" fill={GOLD} stroke="#141b2d" strokeWidth="2" />
                  <text x={xOf(d)} y={yOf(1) - 12} textAnchor="middle" className="chart-label" fontWeight="600" fill="white" fillOpacity="0.75">Day {d}</text>
                </g>
              ))}
              <line x1={xOf(day)} x2={xOf(day)} y1="0" y2={H} stroke="white" strokeOpacity="0.5" />
              <circle cx={xOf(day)} cy={yOf(recall)} r="6.5" fill="#141b2d" stroke={GREEN} strokeWidth="3" />
            </svg>

            <Ruler day={day} onChange={(d) => { touched.current = true; setDay(d); }} recall={recall} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, note, dim = false }: { label: string; value: string; note?: string; dim?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-4 py-3 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-0.5">
      <dt className="text-[13px] text-white/60">{label}</dt>
      <dd className={cn("font-display text-lg font-semibold tabular-nums", dim && "text-white/60")}>
        {value}
        {note && <span className="block lg:inline lg:ml-1.5 text-[13px] font-sans font-normal text-white/50">{note}</span>}
      </dd>
    </div>
  );
}

/* A day ruler: ticks for every day, a marker with its day on a pill, and a native range input over it for drag and keys. */
function Ruler({ day, onChange, recall }: { day: number; onChange: (d: number) => void; recall: number }) {
  const pct = (day / HORIZON) * 100;
  return (
    // Inset to the chart's plot area, so a day on the ruler sits under the same day on the curve.
    <div style={{ marginLeft: `${(PAD_L / (W + PAD_L + PAD_R)) * 100}%`, marginRight: `${(PAD_R / (W + PAD_L + PAD_R)) * 100}%` }} className="relative pt-9 pb-6 rounded-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-white/70" data-testid="ruler">
      <div
        className="h-8 w-full"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.22) 0 1px, transparent 1px calc(100% / 60))", backgroundSize: "100% 55%", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}
        aria-hidden
      />
      {[0, 10, 20, 30, 40, 50, 60].map((d) => (
        <span key={d} className="absolute bottom-0 -translate-x-1/2 text-[12px] text-white/45 tabular-nums" style={{ left: `${(d / HORIZON) * 100}%` }} aria-hidden>
          {d}
        </span>
      ))}
      <div className="absolute top-0 bottom-6 -translate-x-1/2 flex flex-col items-center pointer-events-none" style={{ left: `${pct}%` }} aria-hidden>
        <span className="rounded-full bg-white text-ink px-3 py-1 text-[13px] font-semibold whitespace-nowrap shadow-[0_6px_20px_-6px_rgb(0_0_0/0.6)]">Day {day}</span>
        <span className="mt-1 w-[2px] flex-1 rounded-full bg-sun" />
      </div>
      <input
        type="range"
        min={0}
        max={HORIZON}
        step={1}
        value={day}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Day"
        aria-valuetext={`Day ${day}: ${Math.round(recall * 100)} percent chance of recall`}
        data-testid="day"
        className="absolute inset-x-0 top-6 bottom-4 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
