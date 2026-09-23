"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowCounterClockwise, BookOpen, GameController, SealCheck, Plant, Trophy } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Confetti, CountUp, SecuredChip, StreakFlame } from "@/components/study/effects";
import { Kicker } from "@/components/study/segments/learn";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import type { MotionProfile, Segment, StreakInfo, StudyState } from "@/lib/study";
import type { Concept } from "@/content/types";

export interface DoneSummary {
  correct: number;
  asked: number;
  stuck: string[];
  securedNow: string[];
  checkpointPassed: boolean | null;
  day: number;
  totalDays: number;
  minutes: number;
}

/* First session only: what a sitting looks like, so the shape is never a surprise. */
export function IntroSegment({ segments, estMinutes, onDone }: { segments: Segment[]; estMinutes: number; onDone: () => void }) {
  const parts = segments.filter((s) => s.kind !== "intro" && s.kind !== "done");
  const label: Record<string, { name: string; icon: React.ReactNode; colour: "focus" | "sun" | "sprout" | "play" }> = {
    rewind: { name: "Rewind", icon: <ArrowCounterClockwise size={16} weight="bold" />, colour: "play" },
    learn: { name: "Learn", icon: <BookOpen size={16} weight="bold" />, colour: "focus" },
    play: { name: "Play", icon: <GameController size={16} weight="bold" />, colour: "play" },
    check: { name: "Quick check", icon: <SealCheck size={16} weight="bold" />, colour: "sprout" },
    checkpoint: { name: "Checkpoint", icon: <Plant size={16} weight="bold" />, colour: "sun" },
  };
  const seen = new Set<string>();
  return (
    <section data-testid="segment-intro" className="flex flex-col gap-8 m-enter">
      <div className="flex flex-col gap-4">
        <Kicker>Your first session</Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">Here is how a session works</h1>
        <p className="lede">About {estMinutes} minutes. Each part is short, and the order is always the same.</p>
      </div>
      <ol className="flex flex-col gap-3">
        {parts.filter((s) => (seen.has(s.kind) ? false : (seen.add(s.kind), true))).map((s, i) => {
          const l = label[s.kind];
          const t = tint[l.colour];
          const text = s.kind === "rewind" ? "A few quick questions on what you learned before, then a recap."
            : s.kind === "learn" ? "Today's idea in the format that suits you. Guess first, then see it laid out."
            : s.kind === "play" ? "A short game that mixes today's idea with earlier ones."
            : s.kind === "check" ? "Two or three questions to see what stuck."
            : "A mixed quiz that closes the unit.";
          return (
            <li key={s.kind} className="surface rounded-2xl p-5 flex gap-4 m-enter" style={{ "--m-delay": `${i * 80}ms` } as React.CSSProperties}>
              <span className={cn("size-10 rounded-xl inline-flex items-center justify-center shrink-0", t.chip)}>{l.icon}</span>
              <div>
                <p className="font-semibold">{l.name}</p>
                <p className="text-[15px] text-muted-foreground leading-6">{text}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-[15px] text-muted-foreground">The first session has no rewind because there is nothing to rewind yet. From tomorrow there always is.</p>
      <div className="flex justify-end pt-2 border-t border-border">
        <Button size="lg" className="mt-4" onClick={onDone} data-testid="intro-done">Let&apos;s begin <ArrowRight size={18} weight="bold" /></Button>
      </div>
    </section>
  );
}

export function DoneSegment({
  summary,
  subject,
  subjectName,
  todays,
  next,
  streakInfo,
  motion,
  isKid,
  when,
  said,
  deepPace,
  onSaid,
  onWhen,
}: {
  summary: DoneSummary;
  subject: string;
  subjectName: string;
  todays: Concept[];
  next: Concept | undefined;
  streakInfo: StreakInfo;
  motion: MotionProfile;
  isKid: boolean;
  when: StudyState["when"];
  said: Record<string, string>;
  deepPace: boolean;
  onSaid: (conceptId: string, text: string) => void;
  onWhen: (when: NonNullable<StudyState["when"]>) => void;
}) {
  const [text, setText] = useState(todays[0] ? said[todays[0].id] ?? "" : "");
  const finishedPath = summary.day >= summary.totalDays;
  const celebrate = motion === "lively" || summary.checkpointPassed === true || finishedPath;

  return (
    <section data-testid="segment-done" className="flex flex-col gap-8 m-enter">
      <Confetti active={celebrate} motion={summary.checkpointPassed || finishedPath ? "lively" : motion} />
      <div className="flex flex-col gap-4">
        <Kicker>
          <span className="inline-flex items-center gap-2 text-sprout"><Trophy size={16} weight="bold" /> Session {summary.day} of {summary.totalDays} done</span>
        </Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
          {finishedPath ? `You finished ${subjectName}.` : summary.checkpointPassed ? "Unit secured. Well done." : summary.asked > 0 && summary.correct === summary.asked ? "Clean sweep." : "That is today done."}
        </h1>
        <p className="lede">{Math.max(1, summary.minutes)} {summary.minutes === 1 ? "minute" : "minutes"} well spent{deepPace ? "." : `. Come back tomorrow and the rewind will check what stuck.`}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="Answers right" colour="sprout"><CountUp value={summary.correct} motion={motion} /><span className="text-muted-foreground text-lg font-medium"> / {summary.asked}</span></Stat>
        <Stat label="Ideas secured today" colour="sun"><CountUp value={summary.securedNow.length} motion={motion} /></Stat>
        <Stat label={deepPace ? "Sessions this week" : "Day streak"} colour="play"><CountUp value={deepPace ? streakInfo.thisWeek : streakInfo.current} motion={motion} /></Stat>
      </div>

      {!deepPace && <StreakFlame count={streakInfo.current} active={streakInfo.activeToday} rest={streakInfo.restUsed} motion={motion} className="self-start" />}

      {summary.securedNow.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {summary.securedNow.map((t) => <SecuredChip key={t} title={t} />)}
        </div>
      )}

      {summary.stuck.length > 0 && (
        <div className="rounded-[24px] bg-sun-soft/70 p-6 flex flex-col gap-2" data-testid="stuck">
          <p className="font-semibold">Worth another look</p>
          <p className="text-[15px] text-muted-foreground leading-7">These come back first in your next rewind:</p>
          <ul className="flex flex-wrap gap-2 mt-1">
            {summary.stuck.map((t) => <li key={t} className="rounded-full bg-card px-3 py-1.5 text-sm font-semibold shadow-[var(--shadow-hairline)]">{t}</li>)}
          </ul>
        </div>
      )}

      {!isKid && todays[0] && (
        <div className="surface rounded-[24px] p-6 flex flex-col gap-3" data-testid="say-it">
          <label className="flex flex-col gap-2">
            <span className="font-semibold">In your own words, one line: what is {todays[0].title.charAt(0).toLowerCase() + todays[0].title.slice(1)}?</span>
            <span className="text-[15px] text-muted-foreground">Optional. Tomorrow&apos;s rewind will show it back to you. Nobody else sees it.</span>
            <Textarea
              value={text}
              maxLength={140}
              rows={2}
              placeholder="It is…"
              onChange={(e) => setText(e.target.value)}
              onBlur={() => onSaid(todays[0].id, text)}
              data-testid="say-it-input"
            />
          </label>
        </div>
      )}

      {!when && !finishedPath && (
        <div className="surface rounded-[24px] p-6 flex flex-col gap-3" data-testid="plan-when">
          <p className="font-semibold">When will you do {deepPace ? "your next session" : "tomorrow's session"}?</p>
          <p className="text-[15px] text-muted-foreground">People who pick a time are about twice as likely to show up.</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {(["morning", "afternoon", "evening"] as const).map((w) => (
              <Button key={w} variant="outline" onClick={() => onWhen(w)} className="capitalize" data-testid={`when-${w}`}>{w}</Button>
            ))}
          </div>
        </div>
      )}

      {next && !finishedPath && (
        <div className="rounded-[24px] bg-focus text-white p-6 md:p-8 flex flex-col gap-2" data-testid="tomorrow">
          <p className="text-sm font-semibold text-white/70">{deepPace ? "Next session" : "Tomorrow"}: {next.title}</p>
          <p className="font-display text-xl md:text-2xl font-semibold leading-snug">{next.hook}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
        <Button variant="outline" className="mt-4" asChild>
          <Link href={`/study/${subject}/`}>See my path</Link>
        </Button>
        <Button size="lg" className="mt-4" asChild>
          <Link href="/study/" data-testid="back-to-study">Back to my study <ArrowRight size={18} weight="bold" /></Link>
        </Button>
      </div>
    </section>
  );
}

function Stat({ label, colour, children }: { label: string; colour: "focus" | "sun" | "sprout" | "play"; children: React.ReactNode }) {
  const t = tint[colour];
  return (
    <div className="surface rounded-2xl p-5 flex flex-col gap-1">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className={cn("font-display text-3xl font-semibold leading-none", t.text)}>{children}</p>
    </div>
  );
}
