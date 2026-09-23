"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowCounterClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { SubjectChip } from "@/components/subject-icon";
import { ClientGate, SessionFrame, StudySkeleton } from "@/components/study/shell";
import { ReviewItemCard } from "@/components/study/question-card";
import { Kicker } from "@/components/study/segments/learn";
import { useLearner, useNow, useReducedMotion, useStudy } from "@/lib/study-store";
import { authoredUnitsFor, useConcepts } from "@/content/load";
import { answered, buildPlan, buildReviewSession, completeReview, effectiveToday, motionFor, parseConceptId, seedFor, subjectById, type ReviewItem } from "@/lib/study";

export function ReviewSession() {
  return (
    <ClientGate fallback={<StudySkeleton bare />}>
      <Review />
    </ClientGate>
  );
}

/* A catch-up sitting: retrieval only, weakest ideas first, across every subject. */
function Review() {
  const router = useRouter();
  const bundle = useLearner();
  const [state, update] = useStudy();
  const now = useNow();
  const reduced = useReducedMotion();
  useEffect(() => { if (bundle === null) router.replace("/start/"); }, [bundle, router]);

  const learner = bundle?.learner;
  const plans = useMemo(() => (learner?.subjects ?? []).map((s) => buildPlan(s, learner?.pace ?? "", authoredUnitsFor(s))), [learner?.subjects, learner?.pace]);
  // Built once when the sitting opens, so answering does not reshuffle the queue.
  const [sitting] = useState<{ items: ReviewItem[]; startedAt: number } | null>(() =>
    learner ? { items: buildReviewSession(state, plans, effectiveToday(state, now)), startedAt: now } : null,
  );
  const items = sitting?.items ?? null;
  const startedAt = sitting?.startedAt ?? now;
  const { data: concepts } = useConcepts((items ?? []).map((i) => i.conceptId));
  const [step, setStep] = useState(0);
  const [answeredNow, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!bundle || !learner || items === null) return <StudySkeleton bare />;
  const motion = motionFor(learner, bundle.profile, state.motion, reduced);
  const largeTargets = learner.age === "kid" || learner.age === "senior";
  const list = items.filter((i) => concepts?.[i.conceptId]);
  const item = list[step];

  const frame = (children: React.ReactNode) => (
    <SessionFrame motion={motion} largeTargets={largeTargets} backHref="/study/" aside={<span className="text-sm font-semibold text-muted-foreground">Catch-up review</span>}>
      {children}
    </SessionFrame>
  );

  if (items.length === 0) {
    return frame(
      <div className="surface rounded-[28px] p-8 flex flex-col gap-4">
        <h1 className="text-[2rem] font-semibold leading-tight">Nothing to review yet</h1>
        <p className="lede">Finish a session first. From the next day, every idea you learned is scheduled for review.</p>
        <Button asChild className="self-start"><Link href="/study/">Back to my study</Link></Button>
      </div>,
    );
  }
  if (!concepts) return <StudySkeleton bare />;

  if (finished || !item) {
    return frame(
      <div className="flex flex-col gap-6 m-enter" data-testid="review-summary">
        <Kicker>Catch-up review</Kicker>
        <h1 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1]">{correct} of {list.length} right.</h1>
        <p className="lede">Anything you missed comes back first in your next session. This counts towards your streak.</p>
        <Button size="lg" className="self-start" asChild><Link href="/study/">Back to my study <ArrowRight size={18} weight="bold" /></Link></Button>
      </div>,
    );
  }

  const concept = concepts[item.conceptId];
  const subj = subjectById(parseConceptId(item.conceptId).subject);
  return frame(
    <section className="flex flex-col gap-6 m-enter" key={step} data-testid="review-item">
      <div className="flex items-center justify-between gap-4">
        <Kicker><span className="inline-flex items-center gap-2 text-play"><ArrowCounterClockwise size={16} weight="bold" /> {step + 1} of {list.length}</span></Kicker>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">{subj && <SubjectChip id={subj.id} size="sm" />}<span className="font-semibold">{subj?.name} · {concept.title}</span></span>
      </div>
      <div className="surface rounded-[28px] p-6 md:p-8">
        <ReviewItemCard
          item={item}
          concept={concept}
          seed={seedFor("review", startedAt, step)}
          confidence={learner.age !== "kid"}
          largeTargets={largeTargets}
          onAnswer={(c, conf) => {
            setAnswered(true);
            if (c) setCorrect((n) => n + 1);
            update((s) => answered(s, subj?.id ?? "review", item.conceptId, c, now, { source: "review", confidence: conf, item }));
          }}
        />
      </div>
      {answeredNow && (
        <div className="flex justify-end">
          <Button size="lg" data-testid="review-next" onClick={() => {
            setAnswered(false);
            if (step + 1 >= list.length) {
              setFinished(true);
              update((s) => completeReview(s, now, correct, list.length, startedAt));
            } else setStep((x) => x + 1);
          }}>
            {step + 1 < list.length ? "Next" : "Finish"} <ArrowRight size={18} weight="bold" />
          </Button>
        </div>
      )}
    </section>,
  );
}
