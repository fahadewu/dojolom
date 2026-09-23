"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, LockSimple, Plant, ArrowCounterClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip, subjectTint } from "@/components/subject-icon";
import { ClientGate, StudyPage, StudySkeleton } from "@/components/study/shell";
import { ProgressRing } from "@/components/study/effects";
import { useLearner, useNow, useReducedMotion, useStudy } from "@/lib/study-store";
import { authoredUnitsFor, conceptFrom, useSubjectUnits } from "@/content/load";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tint";
import { buildPlan, dayStatus, effectiveToday, isSecured, learnedIds, motionFor, securedCount, strength, subjectById, unitConceptIds, UNITS_PER_SUBJECT } from "@/lib/study";

export function SubjectPath({ subject }: { subject: string }) {
  return (
    <ClientGate>
      <Path subject={subject} />
    </ClientGate>
  );
}

function Path({ subject }: { subject: string }) {
  const router = useRouter();
  const bundle = useLearner();
  const [state] = useStudy();
  const now = useNow();
  const reduced = useReducedMotion();
  const { data: units } = useSubjectUnits(subject);
  useEffect(() => { if (bundle === null) router.replace("/start/"); }, [bundle, router]);

  const learner = bundle?.learner;
  const plan = useMemo(() => buildPlan(subject, learner?.pace ?? "", authoredUnitsFor(subject)), [subject, learner?.pace]);
  const info = subjectById(subject);
  if (!bundle || !learner || !info) return <StudySkeleton />;

  const motion = motionFor(learner, bundle.profile, state.motion, reduced);
  const largeTargets = learner.age === "kid" || learner.age === "senior";
  const today = effectiveToday(state, now);
  const progress = state.subjects[subject];
  const status = dayStatus(plan, progress, today);
  const done = progress?.completedDays ?? [];
  const t = tint[subjectTint(subject)];
  const learned = learnedIds(plan, progress);
  const secured = securedCount(state, learned);
  const nextDay = "day" in status ? status.day : null;

  return (
    <StudyPage motion={motion} largeTargets={largeTargets} wide={false}>
      <Link href="/study/" className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground -mb-6">
        <ArrowCounterClockwise size={16} weight="bold" className="rotate-45" /> My study
      </Link>
      <header className="flex items-start gap-5">
        <ProgressRing value={plan.days.length ? done.length / plan.days.length : 0} size={84} stroke={8} tint={subjectTint(subject)} label={`${done.length} of ${plan.days.length} sessions`}>
          <SubjectChip id={subject} size="md" className="rounded-full" />
        </ProgressRing>
        <div className="flex flex-col gap-2">
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{info.name}</h1>
          <p className="lede">{done.length} of {plan.days.length} sessions · {secured} {secured === 1 ? "idea" : "ideas"} secured</p>
          {nextDay && status.kind !== "locked" && (
            <Button className="self-start mt-1" asChild>
              <Link href={`/study/${subject}/session/`}>{status.kind === "in-progress" ? "Continue session" : `Start session ${nextDay}`} <ArrowRight size={16} weight="bold" /></Link>
            </Button>
          )}
          {status.kind === "locked" && <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5"><LockSimple size={14} weight="bold" /> Next session unlocks tomorrow</p>}
        </div>
      </header>

      <ol className="flex flex-col gap-8" data-testid="path">
        {Array.from({ length: UNITS_PER_SUBJECT }, (_, i) => i + 1).map((unit) => {
          const authored = plan.authoredUnits.includes(unit);
          const days = plan.days.filter((d) => d.unit === unit);
          const cp = progress?.checkpoints[unit];
          return (
            <li key={unit} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold"><span className="text-muted-foreground font-display text-sm mr-2">Unit {unit}</span>{info.units[unit - 1]}</h2>
                {cp ? (
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", cp.passed ? "bg-sprout-soft text-sprout" : "bg-sun-soft text-sun-deep")}>
                    <Plant size={14} weight="bold" /> {cp.passed ? "Secured" : `${cp.score} of ${cp.of}`}
                  </span>
                ) : !authored ? (
                  <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground">Coming soon</span>
                ) : null}
              </div>
              {authored && (
                <ul className="surface rounded-[24px] divide-y divide-border overflow-hidden">
                  {days.map((d) => {
                    const isDone = done.includes(d.day);
                    const isNext = nextDay === d.day;
                    const titles = d.conceptIds.map((id) => conceptFrom(units, id)?.title ?? "");
                    const href = isDone || (isNext && status.kind !== "locked") ? `/study/${subject}/session/#day=${d.day}` : null;
                    const row = (
                      <div className={cn("flex items-center gap-4 p-4 md:p-5", href && "hover:bg-muted/50 transition-colors")}>
                        <span className={cn("size-9 shrink-0 rounded-full inline-flex items-center justify-center text-sm font-semibold", isDone ? "bg-sprout text-white" : isNext ? cn(t.chip, "ring-4 ring-focus/12") : "bg-muted text-muted-foreground")} aria-hidden>
                          {isDone ? <Check size={16} weight="bold" /> : d.day}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-muted-foreground">Session {d.day}{isNext ? " · next" : ""}{d.isUnitEnd ? " · checkpoint" : ""}</p>
                          <p className="font-semibold leading-snug truncate">{titles.filter(Boolean).join(" · ") || " "}</p>
                          {isDone && (
                            <div className="mt-2 flex gap-1.5" aria-label="Memory strength">
                              {d.conceptIds.map((id) => {
                                const s = strength(state.memory[id], today);
                                return (
                                  <span key={id} className="h-1.5 w-16 rounded-full bg-muted overflow-hidden" title={`${Math.round(s * 100)}% held`}>
                                    <span className={cn("block h-full rounded-full", isSecured(state.memory[id]) ? "bg-sprout" : "bg-sun")} style={{ width: `${Math.round(s * 100)}%` }} />
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {href && <ArrowRight size={16} weight="bold" className="text-muted-foreground shrink-0" />}
                      </div>
                    );
                    return (
                      <li key={d.day} data-testid="path-node" data-state={isDone ? "done" : isNext ? "next" : "upcoming"}>
                        {href ? <Link href={href}>{row}</Link> : row}
                      </li>
                    );
                  })}
                </ul>
              )}
              {authored && unitConceptIds(subject, unit).every((id) => isSecured(state.memory[id])) && (
                <p className="text-sm font-semibold text-sprout inline-flex items-center gap-1.5"><Plant size={14} weight="bold" /> All three ideas in this unit are held.</p>
              )}
            </li>
          );
        })}
      </ol>
    </StudyPage>
  );
}
