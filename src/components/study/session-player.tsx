"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, LockSimple, Plant, WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip } from "@/components/subject-icon";
import { ClientGate, SessionFrame, StudySkeleton } from "@/components/study/shell";
import { SegmentDots } from "@/components/study/effects";
import { LearnSegment, FormatChip, Kicker } from "@/components/study/segments/learn";
import { RewindSegment } from "@/components/study/segments/rewind";
import { CheckSegment, CheckpointSegment } from "@/components/study/segments/check";
import { PlaySegment } from "@/components/study/segments/play";
import { DoneSegment, IntroSegment, type DoneSummary } from "@/components/study/segments/done";
import { useLearner, useNow, useReducedMotion, useStudy } from "@/lib/study-store";
import { authoredUnitsFor, useConcepts } from "@/content/load";
import { paceOptions } from "@/lib/learning";
import {
  abandonDay,
  answered,
  buildPlan,
  buildSession,
  checkpointResult,
  completeDay,
  dayStatus,
  effectiveToday,
  isSecured,
  learned,
  motionFor,
  playedGame,
  rankFormats,
  replaceSegment,
  saidInOwnWords,
  seedFor,
  segmentDone,
  setPretest,
  setSegment,
  setWhen,
  snapshotProfile,
  startDay,
  streak,
  subjectById,
  switchedFormat,
  deriveSignals,
  type GameId,
  type LearnFormat,
  type Segment,
  type StudyState,
} from "@/lib/study";
import type { Concept } from "@/content/types";

function hashDay(): number | null {
  const m = /day=(\d+)/.exec(window.location.hash);
  return m ? Number(m[1]) : null;
}

export function SessionPlayer({ subject }: { subject: string }) {
  return (
    <ClientGate fallback={<StudySkeleton bare />}>
      <Player subject={subject} />
    </ClientGate>
  );
}

function Player({ subject }: { subject: string }) {
  const router = useRouter();
  const bundle = useLearner();
  const [state, update] = useStudy();
  const now = useNow();
  const reduced = useReducedMotion();
  const [requestedDay] = useState<number | null>(() => hashDay());
  const [override, setOverride] = useState(false);
  const [done, setDone] = useState<{ summary: DoneSummary; todays: Concept[]; next?: Concept } | null>(null);
  const securedAtStart = useRef<Set<string> | null>(null);
  const segmentStart = useRef<number>(0);

  useEffect(() => { if (bundle === null) router.replace("/start/"); }, [bundle, router]);

  const info = subjectById(subject);
  const learner = bundle?.learner;
  const profile = bundle?.profile;
  const plan = useMemo(() => buildPlan(subject, learner?.pace ?? "", authoredUnitsFor(subject)), [subject, learner?.pace]);
  const otherPlans = useMemo(
    () => (learner?.subjects ?? []).filter((s) => s !== subject).map((s) => buildPlan(s, learner?.pace ?? "", authoredUnitsFor(s))),
    [learner?.subjects, learner?.pace, subject],
  );
  const today = effectiveToday(state, now);
  const progress = state.subjects[subject];
  const status = dayStatus(plan, progress, today);
  const current = progress?.current;
  const segments: Segment[] | undefined = current?.segments;
  const segIndex = current?.segment ?? 0;
  const seg = segments?.[segIndex];

  // Everything the running sitting will need, loaded once per sitting.
  const nextDayFirst = current ? plan.days.find((d) => d.day === current.day + 1)?.conceptIds[0] : undefined;
  const ids = useMemo(() => {
    const set = new Set<string>();
    for (const s of segments ?? []) {
      if (s.kind === "rewind") { s.items.forEach((i) => set.add(i.conceptId)); s.recapIds.forEach((id) => set.add(id)); }
      if (s.kind === "learn") set.add(s.conceptId);
      if (s.kind === "play") s.conceptIds.forEach((id) => set.add(id));
      if (s.kind === "check") set.add(s.conceptId);
      if (s.kind === "checkpoint") s.conceptIds.forEach((id) => set.add(id));
    }
    if (nextDayFirst) set.add(nextDayFirst);
    return [...set];
  }, [segments, nextDayFirst]);
  const { data: concepts, error, retry } = useConcepts(ids);

  // Reset the segment clock whenever the segment changes.
  useEffect(() => { segmentStart.current = performance.now(); }, [segIndex, current?.startedAt]);
  useEffect(() => {
    if (current && securedAtStart.current === null) {
      securedAtStart.current = new Set(Object.keys(state.memory).filter((id) => isSecured(state.memory[id])));
    }
    if (!current) securedAtStart.current = null;
  }, [current, state.memory]);

  if (!bundle || !learner || !profile || !info) return <StudySkeleton bare />;

  const motion = motionFor(learner, profile, state.motion, reduced);
  const largeTargets = learner.age === "kid" || learner.age === "senior";
  const isKid = learner.age === "kid";
  const confidence = !isKid;
  const pace = paceOptions.find((p) => p.id === plan.pace);
  const elapsed = () => Math.round(performance.now() - segmentStart.current);
  const day = current?.day ?? 0;

  // ── Handlers ──
  const advance = (extra: { format?: LearnFormat; game?: GameId } = {}) => {
    if (!seg || !segments) return;
    const ms = elapsed();
    update((s) => {
      let next: StudyState = segmentDone(s, subject, day, seg.kind, "complete", ms, now, extra);
      if (seg.kind === "learn") next = learned(next, seg.conceptId, seg.format, now);
      return setSegment(next, subject, segIndex + 1);
    });
    const following = segments[segIndex + 1];
    if (following?.kind === "done") finish();
  };

  const skip = () => {
    if (!seg) return;
    const ms = elapsed();
    update((s) => setSegment(segmentDone(s, subject, day, seg.kind, "skip", ms, now, seg.kind === "play" ? { game: seg.game } : {}), subject, segIndex + 1));
    if (segments?.[segIndex + 1]?.kind === "done") finish();
  };

  function finish() {
    if (!current || !segments) return;
    const before = securedAtStart.current ?? new Set<string>();
    const summary: DoneSummary = {
      correct: current.correct,
      asked: current.asked,
      stuck: current.stuck.map((id) => concepts?.[id]?.title ?? id),
      securedNow: Object.keys(state.memory).filter((id) => isSecured(state.memory[id]) && !before.has(id)).map((id) => concepts?.[id]?.title ?? id),
      checkpointPassed: segments.some((s) => s.kind === "checkpoint") ? (progress?.checkpoints[plan.days.find((d) => d.day === current.day)?.unit ?? 0]?.passed ?? null) : null,
      day: current.day,
      totalDays: plan.days.length,
      minutes: Math.max(1, Math.round((now - current.startedAt) / 60_000)),
    };
    const dp = plan.days.find((d) => d.day === current.day);
    const todays = (dp?.conceptIds ?? []).map((id) => concepts?.[id]).filter((c): c is Concept => !!c);
    setDone({ summary, todays, next: nextDayFirst ? concepts?.[nextDayFirst] : undefined });
    update((s) => completeDay(s, subject, now)?.state ?? s);
  }

  const start = (targetDay: number, withOverride: boolean) => {
    const session = buildSession(plan, targetDay, learner, profile, state, today, otherPlans);
    setDone(null);
    update((s) => startDay(state.profile ? s : snapshotProfile(s, profile), subject, targetDay, now, withOverride, session.segments));
  };

  // ── Done screen ──
  if (done) {
    return (
      <SessionFrame motion={motion} largeTargets={largeTargets} backHref="/study/">
        <DoneSegment
          summary={done.summary}
          subject={subject}
          subjectName={info.name}
          todays={done.todays}
          next={done.next}
          streakInfo={streak(state.sessions, today)}
          motion={motion}
          isKid={isKid}
          when={state.when}
          said={state.said}
          deepPace={plan.pace === "deep"}
          onSaid={(id, text) => update((s) => saidInOwnWords(s, id, text))}
          onWhen={(w) => update((s) => setWhen(s, w))}
        />
      </SessionFrame>
    );
  }

  // ── Running sitting ──
  if (current && segments && seg) {
    const seed = seedFor(subject, current.day, current.startedAt, segIndex);
    const header = (
      <>
        <SegmentDots total={segments.length - 1} index={Math.min(segIndex, segments.length - 2)} className="hidden sm:inline-flex" />
        <span className="text-sm font-semibold text-muted-foreground">Session {current.day} of {plan.days.length}</span>
      </>
    );
    if (error) {
      return (
        <SessionFrame motion={motion} largeTargets={largeTargets} backHref="/study/" aside={header}>
          <div className="surface rounded-[28px] p-8 flex flex-col gap-4 items-start">
            <WarningCircle size={28} weight="duotone" className="text-ember" />
            <h1 className="text-2xl font-semibold">The lesson did not load</h1>
            <p className="lede">Check your connection and try again. Your progress so far is saved.</p>
            <div className="flex gap-3"><Button onClick={retry}>Try again</Button><Button variant="outline" onClick={() => location.reload()}>Reload</Button></div>
          </div>
        </SessionFrame>
      );
    }
    if (!concepts) return <StudySkeleton bare />;

    const record = (conceptId: string, correct: boolean, source: "rewind" | "check" | "checkpoint" | "game" | "challenge", conf?: "sure" | "unsure", item?: Extract<Segment, { kind: "rewind" }>["items"][number]) =>
      update((s) => answered(s, subject, conceptId, correct, now, { source, confidence: conf, item, ms: elapsed() }));

    let body: React.ReactNode = null;
    if (seg.kind === "intro") body = <IntroSegment segments={segments} estMinutes={pace?.minutes ?? 15} onDone={() => advance()} />;
    if (seg.kind === "rewind") body = (
      <RewindSegment
        segment={seg}
        concepts={concepts}
        said={state.said}
        seed={seed}
        confidence={confidence}
        largeTargets={largeTargets}
        onAnswer={(item, c, conf) => record(item.conceptId, c, "rewind", conf, item)}
        onDone={() => advance()}
      />
    );
    if (seg.kind === "learn") {
      const concept = concepts[seg.conceptId];
      const learnSeg = seg;
      body = concept ? (
        <LearnSegment
          key={`${segIndex}-${learnSeg.format}`}
          segment={learnSeg}
          concept={concept}
          largeTargets={largeTargets}
          isKid={isKid}
          pretestAnswer={current.pretest[learnSeg.conceptId]}
          onPretest={(v) => update((s) => setPretest(s, subject, learnSeg.conceptId, v))}
          onAnswer={(c) => record(learnSeg.conceptId, c, "challenge")}
          onSwitch={current.switched ? null : () => {
            const signals = deriveSignals(state.events, state.memory);
            const alt = rankFormats(profile, learner, signals, { last: learnSeg.format, pace: plan.pace }).ranked.find((f) => f !== learnSeg.format);
            if (!alt) return;
            update((s) => replaceSegment(switchedFormat(s, subject, learnSeg.format, now), subject, segIndex, { ...learnSeg, format: alt, exploring: false, pretest: false }));
          }}
          onDone={() => advance({ format: learnSeg.format })}
        />
      ) : null;
    }
    if (seg.kind === "play") {
      const playSeg = seg;
      body = (
        <PlaySegment
          segment={playSeg}
          concepts={concepts}
          seed={seed}
          motion={motion}
          largeTargets={largeTargets}
          onAnswer={(id, c) => record(id, c, "game")}
          onComplete={(r) => update((s) => playedGame(s, subject, playSeg.game, { ...r, ms: elapsed() }, now))}
          onSkip={skip}
          onDone={() => advance({ game: playSeg.game })}
        />
      );
    }
    if (seg.kind === "check") {
      const concept = concepts[seg.conceptId];
      body = concept ? (
        <CheckSegment
          segment={seg}
          concept={concept}
          pretestSaidTrue={current.pretest[seg.conceptId]}
          seed={seed}
          confidence={confidence}
          largeTargets={largeTargets}
          onAnswer={(id, c, conf) => record(id, c, "check", conf)}
          onDone={() => advance()}
        />
      ) : null;
    }
    if (seg.kind === "checkpoint") {
      const cp = seg;
      body = (
        <CheckpointSegment
          segment={cp}
          concepts={concepts}
          seed={seed}
          confidence={confidence}
          largeTargets={largeTargets}
          onAnswer={(id, c, conf) => record(id, c, "checkpoint", conf)}
          onResult={(score, of, passed) => update((s) => checkpointResult(s, subject, cp.unit, score, of, passed ? score : of + 1, now))}
          onDone={() => advance()}
        />
      );
    }
    return (
      <SessionFrame motion={motion} largeTargets={largeTargets} backHref="/study/" aside={header}>
        {body}
      </SessionFrame>
    );
  }

  // ── Start screen, gate, finished, or nothing to study ──
  const target = requestedDay && plan.days.some((d) => d.day === requestedDay) && (progress?.completedDays.includes(requestedDay) || (status.kind !== "finished" && status.kind !== "empty" && status.kind !== "not-started" && "day" in status && status.day === requestedDay) || (status.kind === "not-started" && requestedDay === 1))
    ? requestedDay
    : status.kind === "finished" || status.kind === "empty" ? null : status.day;
  const dp = target ? plan.days.find((d) => d.day === target) : undefined;
  const replaying = !!target && (progress?.completedDays.includes(target) ?? false);
  const locked = status.kind === "locked" && !replaying && !override;
  const preview = dp ? buildSession(plan, dp.day, learner, profile, state, today, otherPlans) : null;
  const firstLearn = preview?.segments.find((s): s is Extract<Segment, { kind: "learn" }> => s.kind === "learn");
  const authored = authoredUnitsFor(subject).length;

  return (
    <SessionFrame motion={motion} largeTargets={largeTargets} backHref="/study/">
      <div className="flex items-center gap-3">
        <SubjectChip id={subject} size="md" />
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{info.name}</p>
          {dp && <p className="font-semibold">Unit {dp.unit}: {info.units[dp.unit - 1]}</p>}
        </div>
      </div>

      {status.kind === "empty" && (
        <div className="surface rounded-[28px] p-8 flex flex-col gap-4">
          <h1 className="text-[2rem] font-semibold leading-tight">{info.name} is still being written</h1>
          <p className="lede">The first units land soon. Your profile is saved, so nothing is lost.</p>
          <Button asChild className="self-start"><Link href="/study/">Back to my study</Link></Button>
        </div>
      )}

      {status.kind === "finished" && !target && (
        <div className="surface rounded-[28px] p-8 flex flex-col gap-4" data-testid="finished">
          <Plant size={28} weight="duotone" className="text-sprout" />
          <h1 className="text-[2rem] font-semibold leading-tight">You have finished every session in {info.name}</h1>
          <p className="lede">Your rewinds keep going from the dashboard, so the ideas stay held. Replay any session from your path.</p>
          <div className="flex gap-3"><Button asChild><Link href={`/study/${subject}/`}>See my path</Link></Button><Button variant="outline" asChild><Link href="/study/">My study</Link></Button></div>
        </div>
      )}

      {dp && locked && (
        <div className="surface rounded-[28px] p-8 flex flex-col gap-5" data-testid="gate">
          <LockSimple size={28} weight="duotone" className="text-muted-foreground" />
          <div className="flex flex-col gap-2">
            <h1 className="text-[2rem] font-semibold leading-tight">Session {dp.day} unlocks tomorrow</h1>
            <p className="lede">You already did today&apos;s session. A night&apos;s sleep between ideas is part of how they stick, so tomorrow&apos;s rewind will mean more.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link href="/study/">Back to my study</Link></Button>
            {status.kind === "locked" && status.canOverride && (
              <Button variant="outline" onClick={() => setOverride(true)} data-testid="gate-override">I have time, continue anyway</Button>
            )}
          </div>
        </div>
      )}

      {dp && !locked && preview && (
        <div className="flex flex-col gap-8 m-enter" data-testid="session-start">
          <div className="flex flex-col gap-4">
            <Kicker>{replaying ? `Replaying session ${dp.day}` : `Session ${dp.day} of ${plan.days.length}`}</Kicker>
            <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">
              {dp.conceptIds.length === 1 ? (concepts?.[dp.conceptIds[0]]?.title ?? <PreviewTitle id={dp.conceptIds[0]} />) : `Unit ${dp.unit}: ${info.units[dp.unit - 1]}`}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[15px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Clock size={16} weight="bold" /> about {preview.estMinutes} min</span>
              {firstLearn && <FormatChip format={firstLearn.format} />}
              {dp.isUnitEnd && <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-soft text-sun-deep px-3 py-1 text-sm font-semibold"><Plant size={14} weight="bold" /> Unit checkpoint</span>}
            </div>
          </div>
          <ol className="flex flex-wrap gap-2">
            {preview.segments.filter((s) => s.kind !== "done" && s.kind !== "intro").map((s, i) => (
              <li key={i} className="rounded-full bg-card px-3 py-1.5 text-sm font-semibold shadow-[var(--shadow-hairline)] capitalize">
                {s.kind === "rewind" ? `Rewind · ${s.items.length}` : s.kind === "play" ? "Play" : s.kind === "check" ? "Quick check" : s.kind === "checkpoint" ? "Checkpoint" : "Learn"}
              </li>
            ))}
          </ol>
          <div className="flex justify-end pt-2 border-t border-border">
            <Button size="lg" className="mt-4" onClick={() => start(dp.day, override)} data-testid="start-session">
              {replaying ? "Replay session" : dp.day === 1 ? "Start session 1" : "Start session"}
              <ArrowRight size={18} weight="bold" />
            </Button>
          </div>
          {authored < plan.totalUnits && (
            <p className="text-sm text-muted-foreground">{authored} of {plan.totalUnits} units are written so far. More sessions appear as they land.</p>
          )}
        </div>
      )}

      {current && !segments && (
        <div className="surface rounded-[28px] p-8 flex flex-col gap-4">
          <p className="lede">An older sitting was left open. Start it again to continue.</p>
          <Button onClick={() => update((s) => abandonDay(s, subject, now))}>Reset this session</Button>
        </div>
      )}
    </SessionFrame>
  );
}

/* Title for a concept the page has not loaded yet; loads just that one. */
function PreviewTitle({ id }: { id: string }) {
  const { data } = useConcepts([id]);
  return <>{data?.[id]?.title ?? " "}</>;
}
