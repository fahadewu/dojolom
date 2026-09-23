"use client";

import { useEffect, useRef, useState } from "react";
import { Fire, Plant } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { mulberry32, type MotionProfile } from "@/lib/study";
import { useReducedMotion } from "@/lib/study-store";
import type { Tint } from "@/lib/tint";

/* Forty pieces in the four learning colours. Only the lively profile ever sees
   them, and never when the system asks for reduced motion. */
export function Confetti({ active, motion }: { active: boolean; motion: MotionProfile }) {
  const reduced = useReducedMotion();
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setExpired(true), 2400);
    return () => clearTimeout(id);
  }, [active]);
  const show = active && !expired && motion === "lively" && !reduced;
  if (!show) return null;
  const rng = mulberry32(7);
  const colours = ["bg-focus", "bg-sun", "bg-sprout", "bg-play"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" data-testid="confetti" aria-hidden>
      {Array.from({ length: 40 }, (_, i) => {
        const left = 2 + rng() * 96;
        const dx = -120 + rng() * 240;
        const rot = 360 + rng() * 540;
        const dur = 1400 + rng() * 800;
        const delay = rng() * 350;
        return (
          <span
            key={i}
            className={cn("m-confetti", colours[i % 4])}
            style={{ left: `${left}%`, animationDelay: `${delay}ms`, "--dx": `${dx}px`, "--rot": `${rot}deg`, "--dur": `${dur}ms` } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

const tintVar: Record<Tint, string> = { focus: "var(--focus)", sun: "var(--sun)", sprout: "var(--sprout)", play: "var(--play)" };

export function ProgressRing({
  value,
  size = 72,
  stroke = 7,
  tint = "sprout",
  label,
  children,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tint?: Tint;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(1, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [offset, setOffset] = useState(c);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(c * (1 - clamped)));
    return () => cancelAnimationFrame(id);
  }, [c, clamped]);
  return (
    <span className={cn("relative inline-flex items-center justify-center shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${Math.round(clamped * 100)}%`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tintVar[tint]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="m-fill"
        />
      </svg>
      {children && <span className="absolute inset-0 flex items-center justify-center">{children}</span>}
    </span>
  );
}

export function CountUp({ value, motion, duration = 700, className }: { value: number; motion: MotionProfile; duration?: number; className?: string }) {
  const reduced = useReducedMotion();
  const animate = motion !== "calm" && !reduced;
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (!animate) { from.current = value; return; }
    const start = performance.now();
    const begin = from.current;
    let frame = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(begin + (value - begin) * eased));
      if (p < 1) frame = requestAnimationFrame(tick); else from.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, animate, duration]);
  return <span className={cn("tabular-nums", className)}>{animate ? shown : value}</span>;
}

export function StreakFlame({ count, active, rest = false, motion, className }: { count: number; active: boolean; rest?: boolean; motion: MotionProfile; className?: string }) {
  return (
    <span
      data-testid="streak"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold",
        active ? "bg-sun-soft text-sun-deep" : "bg-muted text-muted-foreground",
        className
      )}
    >
      <Fire size={16} weight={active ? "fill" : "duotone"} className={cn(active && motion === "lively" && "m-pulse")} />
      {count === 0 ? "Start a streak" : `${count} day streak`}
      {rest && <span className="text-muted-foreground font-medium">· rest day used</span>}
    </span>
  );
}

export function SecuredChip({ title, className }: { title: string; className?: string }) {
  return (
    <span data-testid="secured" className={cn("inline-flex items-center gap-2 rounded-full bg-sprout-soft text-sprout px-3 py-1.5 text-sm font-semibold m-enter", className)}>
      <Plant size={16} weight="duotone" />
      Secured: {title}
    </span>
  );
}

export function SegmentDots({ total, index, className }: { total: number; index: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)} aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("size-2 rounded-full transition-colors", i < index ? "bg-focus" : i === index ? "bg-focus ring-4 ring-focus/15" : "bg-input")}
        />
      ))}
    </span>
  );
}
