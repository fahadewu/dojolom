"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowCounterClockwise, Clock, GearSix, LockSimple, Plant } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip } from "@/components/subject-icon";
import { ClientGate, StudyPage, StudySkeleton } from "@/components/study/shell";
import { ProgressRing, StreakFlame } from "@/components/study/effects";
import { useLearner, useNow, useReducedMotion, useStudy } from "@/lib/study-store";
import { authoredUnitsFor, useConcepts } from "@/content/load";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { subjectTint } from "@/components/subject-icon";
import {
  buildPlan,
  dayStatus,
  dueAcross,
  effectiveToday,
  learnedIds,
  motionFor,
  planPreview,
  securedCount,
  streak,
  subjectById,
  subjectPercent,
  type DayStatus,
  type SubjectPlan,
} from "@/lib/study";

export function StudyDashboard() {
  return (
    <ClientGate>
      <Dashboard />
    </ClientGate>
  );
}

function greeting(hour: number, name: string) {
  const part = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return name ? `${part}, ${name}.` : `${part}.`;
}

function Dashboard() {
  const router = useRouter();
  const bundle = useLearner();
  const [state] = useStudy();
  const now = useNow();
  const reduced = useReducedMotion();
  useEffect(() => { if (bundle === null) router.replace("/start/"); }, [bundle, router]);

  const learner = bundle?.learner;
  const plans = useMemo(
    () => (learner?.subjects ?? []).map((s) => buildPlan(s, learner?.pace ?? "", authoredUnitsFor(s))),
    [learner?.subjects, learner?.pace],
  );
  const today = effectiveToday(state, now);
  const rows = plans.map((plan) => ({ plan, status: dayStatus(plan, state.subjects[plan.subject], today) }));
  const primary = rows.find((r) => r.status.kind === "in-progress") ?? rows.find((r) => r.status.kind === "ready" || r.status.kind === "not-started");
  const lockedFirst = rows.find((r) => r.status.kind === "locked");
  const primaryConcept = primary && "day" in primary.status ? primary.plan.days.find((d) => d.day === (primary.status as { day: number }).day)?.conceptIds[0] : undefined;
  const tomorrowConcept = lockedFirst && lockedFirst.status.kind === "locked" ? lockedFirst.plan.days.find((d) => d.day === (lockedFirst.status as { day: number }).day)?.conceptIds[0] : undefined;
  const { data: concepts } = useConcepts([primaryConcept, tomorrowConcept].filter((x): x is string => !!x));

  if (!bundle || !learner) return <StudySkeleton />;
  const { profile } = bundle;
  const motion = motionFor(learner, profile, state.motion, reduced);
  const largeTargets = learner.age === "kid" || learner.age === "senior";
  const streakInfo = streak(state.sessions, today);
  const due = dueAcross(state, plans, today);
  const deep = (learner.pace || "steady") === "deep";
  const firstName = learner.name.trim().split(" ")[0];
  const everStudied = state.sessions.length > 0;

  return (
    <StudyPage motion={motion} largeTargets={largeTargets}>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-muted-foreground">My study</p>
          <h1 className="text-[2.25rem] md:text-[3rem] font-semibold leading-[1.05]">{greeting(new Date(now).getHours(), firstName)}</h1>
          <p className="lede">
            {!everStudied
              ? "Your first session is ready. Short, in your format, and it ends with a quick check."
              : primary
                ? "Today's session is ready when you are."
                : "Today's sessions are done. Tomorrow's rewind will check what stuck."}
            {state.when && <span className="block text-[15px] mt-1">Your plan: {state.when}s.</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {deep ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-sun-soft text-sun-deep px-3.5 py-1.5 text-sm font-semibold" data-testid="streak">
              {streakInfo.thisWeek} {streakInfo.thisWeek === 1 ? "session" : "sessions"} this week
            </span>
          ) : (
            <StreakFlame count={streakInfo.current} active={streakInfo.activeToday} rest={streakInfo.restUsed} motion={motion} />
          )}
          <Button variant="outline" size="icon" asChild aria-label="Study settings">
            <Link href="/study/settings/"><GearSix size={18} weight="bold" /></Link>
          </Button>
        </div>
      </header>

      {/* Today */}
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5 items-stretch" data-testid="today">
        {primary ? (
          <ContinueCard plan={primary.plan} status={primary.status} title={primaryConcept ? concepts?.[primaryConcept]?.title : undefined} />
        ) : (
          <div className="rounded-[28px] bg-focus text-white p-7 md:p-9 flex flex-col gap-4" data-testid="done-today">
            <p className="text-sm font-semibold text-white/70 inline-flex items-center gap-2"><LockSimple size={16} weight="bold" /> Done for today</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-semibold leading-[1.1]">
              {tomorrowConcept && concepts?.[tomorrowConcept] ? `Tomorrow: ${concepts[tomorrowConcept].title}` : rows.every((r) => r.status.kind === "finished") ? "Every path is finished." : "Tomorrow's session is lined up."}
            </h2>
            {tomorrowConcept && concepts?.[tomorrowConcept] && <p className="text-lg text-white/80 leading-8">{concepts[tomorrowConcept].hook}</p>}
            {lockedFirst && (
              <Link href={`/study/${lockedFirst.plan.subject}/session/`} className="self-start text-sm font-semibold text-white/80 hover:text-white underline-offset-4 hover:underline">
                I have time, continue anyway
              </Link>
            )}
          </div>
        )}

        <div className={cn("surface rounded-[28px] p-7 flex flex-col gap-4", due.length === 0 && "justify-center")} data-testid="catch-up">
          <p className="text-sm font-semibold text-play inline-flex items-center gap-2"><ArrowCounterClockwise size={16} weight="bold" /> Rewind</p>
          {due.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold leading-tight">{due.length} {due.length === 1 ? "idea is" : "ideas are"} due for review</h2>
              <p className="text-[15px] text-muted-foreground leading-7">Your next session opens with {Math.min(due.length, 3)} of them. Or do a short catch-up now, about {Math.min(6, due.length) + 1} minutes, weakest first.</p>
              <Button variant="outline" className="self-start mt-auto" asChild>
                <Link href="/study/review/">Catch-up review <ArrowRight size={16} weight="bold" /></Link>
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold leading-tight">Nothing due right now</h2>
              <p className="text-[15px] text-muted-foreground leading-7">Every idea you have learned is scheduled for the day it is most likely to slip. Sessions open with those.</p>
            </>
          )}
        </div>
      </section>

      {/* Subjects */}
      <section className="flex flex-col gap-5" data-testid="subjects">
        <h2 className="text-[1.5rem] font-semibold">Your paths</h2>
        <div className="flex flex-col gap-3">
          {rows.map(({ plan, status }) => <SubjectRow key={plan.subject} plan={plan} status={status} secured={securedCount(state, learnedIds(plan, state.subjects[plan.subject]))} due={due.filter((id) => id.startsWith(`${plan.subject}-`)).length} />)}
        </div>
        <p className="text-sm text-muted-foreground">
          Want a different subject or pace? <Link href="/start/" className="font-semibold text-foreground underline-offset-4 hover:underline">Retake your profile</Link>. Your progress stays.
        </p>
      </section>
    </StudyPage>
  );
}

function ContinueCard({ plan, status, title }: { plan: SubjectPlan; status: DayStatus; title?: string }) {
  const info = subjectById(plan.subject)!;
  const day = "day" in status ? status.day : 1;
  const dp = plan.days.find((d) => d.day === day);
  const preview = planPreview(plan.subject, plan.pace);
  const inProgress = status.kind === "in-progress";
  return (
    <div className="surface-raised rounded-[28px] p-7 md:p-9 flex flex-col gap-6" data-testid="continue-card">
      <div className="flex items-center gap-4">
        <SubjectChip id={plan.subject} size="lg" />
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{info.name} · Session {day} of {plan.days.length}</p>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold leading-tight">{title ?? (dp ? `Unit ${dp.unit}: ${info.units[dp.unit - 1]}` : info.name)}</h2>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[15px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Clock size={16} weight="bold" /> about {preview.perSession} min</span>
        {dp?.isUnitEnd && <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-soft text-sun-deep px-3 py-1 text-sm font-semibold"><Plant size={14} weight="bold" /> Unit checkpoint</span>}
        {inProgress && <span className="rounded-full bg-focus-soft text-focus px-3 py-1 text-sm font-semibold">In progress</span>}
      </div>
      <Button size="lg" className="self-start" asChild>
        <Link href={`/study/${plan.subject}/session/`} data-testid="continue">
          {inProgress ? "Pick up where you left off" : day === 1 && status.kind === "not-started" ? "Start session 1" : "Start today's session"}
          <ArrowRight size={18} weight="bold" />
        </Link>
      </Button>
    </div>
  );
}

function SubjectRow({ plan, status, secured, due }: { plan: SubjectPlan; status: DayStatus; secured: number; due: number }) {
  const info = subjectById(plan.subject)!;
  const t = tint[subjectTint(plan.subject)];
  const pct = subjectPercent(plan, undefined);
  void pct;
  const label = status.kind === "ready" || status.kind === "not-started" ? "Ready" : status.kind === "in-progress" ? "In progress" : status.kind === "locked" ? "Done today" : status.kind === "finished" ? "Finished" : "Coming soon";
  const done = status.kind === "finished" ? plan.days.length : "day" in status ? status.day - 1 : 0;
  return (
    <Link href={`/study/${plan.subject}/`} className="surface rounded-[24px] p-5 md:p-6 flex items-center gap-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]" data-testid="subject-row">
      <ProgressRing value={plan.days.length ? done / plan.days.length : 0} size={64} stroke={6} tint={subjectTint(plan.subject)} label={`${done} of ${plan.days.length} sessions`}>
        <SubjectChip id={plan.subject} size="sm" className="rounded-full" />
      </ProgressRing>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold leading-tight">{info.name}</h3>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", status.kind === "locked" || status.kind === "finished" ? "bg-sprout-soft text-sprout" : status.kind === "empty" ? "bg-muted text-muted-foreground" : t.chip)}>{label}</span>
        </div>
        <p className="text-[15px] text-muted-foreground">
          {plan.days.length ? `${done} of ${plan.days.length} sessions` : "No sessions yet"} · {secured} {secured === 1 ? "idea" : "ideas"} secured{due > 0 ? ` · ${due} due for review` : ""}
        </p>
        <div className="mt-1 flex gap-1" aria-hidden>
          {plan.days.map((d) => <span key={d.day} className={cn("h-1.5 flex-1 rounded-full", d.day <= done ? t.bar : "bg-muted")} />)}
        </div>
      </div>
      <ArrowRight size={18} weight="bold" className="text-muted-foreground shrink-0" />
    </Link>
  );
}
