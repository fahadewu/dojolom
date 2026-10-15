"use client";

// Dojolom is a conversation with the tutor. This is the whole app after the
// landing page: a list of conversations, and the one in hand.
// Before anything reaches the AI service, the device asks one thing itself:
// the learner's age, because age decides who the tutor is open to
// (src/lib/age.ts tutorAccess). Under-18s keep the lesson player until the
// tutor is cleared for children (docs/ai-tutor-rd.md).

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowCounterClockwise, GearSix, List, NotePencil, ShieldCheck, Sparkle, SpeakerHigh, SpeakerSlash, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { AgeInput } from "@/components/age-input";
import { cn } from "@/lib/utils";
import { ClientGate, StudyRoot } from "@/components/study/shell";
import { ReadAloudProvider, SayOnTap, speechSupported, stopSpeaking } from "@/components/study/read-aloud";
import { TuningProvider } from "@/components/study/tuning";
import { Conversation, TutorBubble } from "@/components/chat/conversation";
import { invalidateLearner, useLearnerRecord, useNow, useReducedMotion, useStudy } from "@/lib/study-store";
import { ageView, tutorAccess, validAge } from "@/lib/age";
import { dayKey, nowMs } from "@/lib/clock";
import { buildProfile, emptyLearner, loadLearner, saveLearner } from "@/lib/learning";
import { dueConcepts, effectiveToday, isSecured, motionFor, setGuardianTutor, setReadAloud, tuningOf } from "@/lib/study";
import { MINORS_ALLOWED } from "@/lib/tutor/context";
import { isOwnId, loadOwnIdeas } from "@/lib/tutor/ideas";
import { loadThreads, newThread, saveThreads, titleOf, type Thread } from "@/lib/tutor/threads";
import type { TutorUIMessage } from "@/lib/tutor/tools";

export function ChatApp() {
  return (
    <ClientGate fallback={<div className="h-dvh bg-background" aria-busy="true" />}>
      <App />
    </ClientGate>
  );
}

/** The conversations, with the one to open: today's latest, or a new one (a new day opens with a review). */
function initialThreads(): { threads: Thread[]; active: string } {
  const threads = loadThreads();
  const now = nowMs();
  const latest = threads[0];
  if (latest && dayKey(latest.updatedAt) === dayKey(now)) return { threads, active: latest.id };
  const fresh = newThread(now);
  return { threads: [fresh, ...threads], active: fresh.id };
}

function App() {
  const learner = useLearnerRecord();
  const [state, update] = useStudy();
  const now = useNow();
  const reduced = useReducedMotion();
  const [{ threads, active }, setThreads] = useState(initialThreads);
  const [menu, setMenu] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const hasAge = !!learner && validAge(learner.age);
  const view = hasAge ? ageView(learner, state) : null;
  const access = view ? tutorAccess(view.d, state.guardianTutor, MINORS_ALLOWED) : null;
  const today = effectiveToday(state, now);

  const save = useCallback((id: string, messages: TutorUIMessage[]) => {
    setThreads((s) => {
      const next = s.threads.map((t) => (t.id === id ? { ...t, messages, title: titleOf(messages, t.title), updatedAt: nowMs() } : t));
      saveThreads(next.filter((t) => t.messages.length));
      return { ...s, threads: next };
    });
  }, []);
  const saveActive = useCallback((messages: TutorUIMessage[]) => save(active, messages), [save, active]);
  const startNew = () => {
    const fresh = newThread(nowMs());
    stopSpeaking();
    setThreads((s) => ({ threads: [fresh, ...s.threads.filter((t) => t.messages.length)], active: fresh.id }));
    setMenu(false);
  };
  const open = (id: string) => { stopSpeaking(); setThreads((s) => ({ ...s, active: id })); setMenu(false); };

  const ownIdeas = useMemo(() => loadOwnIdeas(), [state.memory]); // eslint-disable-line react-hooks/exhaustive-deps
  const known = Object.keys(state.memory).filter((id) => (isOwnId(id) ? ownIdeas[id] && !ownIdeas[id].flagged : true));
  const due = dueConcepts(state.memory, known, today, state.memoryScale).length;
  const held = known.filter((id) => isSecured(state.memory[id], state.memoryScale)).length;

  const motion = learner ? motionFor(learner, buildProfile(learner), state.motion, reduced) : "balanced";
  const readAloud = view ? { on: view.readAloud, autoQuestions: view.readAloud && view.d.autoReadQuestions, rate: view.d.stage === "early" ? 0.85 : view.d.stage === "older" ? 0.92 : 1 } : { on: false, autoQuestions: false, rate: 1 };
  const thread = threads.find((t) => t.id === active);
  const listed = threads.filter((t) => t.messages.length || t.id === active);

  const readToggle = view && speechSupported() ? (
    <button type="button" aria-pressed={view.readAloud} aria-label={`Read aloud ${view.readAloud ? "on" : "off"}`} data-testid="read-aloud-toggle"
      onClick={() => { stopSpeaking(); update((s) => setReadAloud(s, view.readAloud ? "off" : "on")); }}
      className={cn("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-sm font-semibold", view.readAloud ? "border-foreground bg-foreground text-white" : "border-input text-muted-foreground hover:text-foreground")}>
      {view.readAloud ? <SpeakerHigh size={16} weight="fill" /> : <SpeakerSlash size={16} weight="bold" />}
      <span className="hidden sm:inline">Read aloud</span>
    </button>
  ) : null;

  const sidebar = (
    <nav className="flex flex-col gap-6 h-full p-4" aria-label="Your conversations">
      <div className="flex items-center justify-between gap-3 px-1">
        <Logo />
        <button type="button" className="lg:hidden rounded-full p-2 hover:bg-muted" onClick={() => setMenu(false)} aria-label="Close menu"><X size={18} weight="bold" /></button>
      </div>
      {access === "open" && (
        <Button onClick={startNew} className="justify-start" data-testid="new-chat"><NotePencil size={18} weight="bold" /> New conversation</Button>
      )}
      {access === "open" && due > 0 && (
        <button type="button" onClick={startNew} className="text-left rounded-2xl bg-play-soft/70 p-4 flex flex-col gap-1" data-testid="due-chip">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-play"><ArrowCounterClockwise size={15} weight="bold" /> {due} {due === 1 ? "idea is" : "ideas are"} due</span>
          <span className="text-[13px] text-muted-foreground leading-5">A new conversation starts with a quick review.</span>
        </button>
      )}
      <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 flex flex-col gap-1" data-testid="threads">
        {access === "open" && listed.map((t) => (
          <button key={t.id} type="button" onClick={() => open(t.id)} aria-current={t.id === active ? "page" : undefined} data-testid="thread"
            className={cn("text-left rounded-xl px-3 py-2.5 text-[15px] transition-colors", t.id === active ? "bg-card shadow-[var(--shadow-hairline)] font-semibold" : "text-muted-foreground hover:bg-card/70 hover:text-foreground")}>
            <span className="block truncate">{t.title}</span>
            <span className="block text-xs text-muted-foreground font-normal mt-0.5">{dayKey(t.updatedAt) === dayKey(now) ? "Today" : new Date(t.updatedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-1">
        {access === "open" && <p className="text-sm text-muted-foreground" data-testid="memory-summary">{known.length} {known.length === 1 ? "idea" : "ideas"} learned · {held} held for a week</p>}
        <div className="flex items-center gap-2">
          {readToggle}
          {hasAge && <Link href="/study/settings/" className="inline-flex items-center gap-1.5 rounded-full border border-input px-2.5 py-1 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="settings-link"><GearSix size={16} weight="bold" /> Settings</Link>}
        </div>
      </div>
    </nav>
  );

  let main: React.ReactNode;
  if (!hasAge) {
    main = <Intake onAge={(age) => { saveLearner({ ...(loadLearner() ?? emptyLearner), age }); invalidateLearner(); }} />;
  } else if (access === "closed") {
    main = (
      <div className="flex flex-col gap-5" data-testid="tutor-closed">
        <TutorBubble>
          <p>Thanks{learner!.name ? `, ${learner!.name.split(" ")[0]}` : ""}. The AI tutor is for adults for now, while we make sure it meets the rules for children&apos;s data and safety.</p>
          <p>Your lessons are ready, with games, checks and reviews that remember what you learn.</p>
        </TutorBubble>
        <Button asChild className="self-start ml-11"><Link href="/start/" data-testid="to-lessons">Go to my lessons <ArrowRight size={16} weight="bold" /></Link></Button>
      </div>
    );
  } else if (access === "guardian") {
    main = <ConsentCard name={learner!.name} agreed={agreed} onAgree={setAgreed} onStart={() => update((s) => setGuardianTutor(s, true))} />;
  } else if (thread) {
    main = <Conversation key={thread.id} threadId={thread.id} initial={thread.messages} learner={learner!} onSave={saveActive} />;
  }

  return (
    <StudyRoot motion={motion} largeTargets={view?.largeTargets ?? false} largeText={view?.largeText ?? false} tapHold={view?.d.tapHold ?? false} className="h-dvh min-h-0 flex-row overflow-hidden">
      <TuningProvider value={learner && hasAge ? tuningOf(learner, state, today) : { planFirst: false, startSmall: false, steadyNerves: false, buildConfidence: false, goDeeper: false }}>
        <ReadAloudProvider value={readAloud}>
          <aside className="hidden lg:block w-72 shrink-0 bg-muted/40 shadow-[var(--shadow-hairline)]">{sidebar}</aside>
          {menu && (
            <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Your conversations">
              <div className="w-72 max-w-[85vw] bg-background shadow-[var(--shadow-raised)]">{sidebar}</div>
              <button type="button" className="flex-1 bg-foreground/20" aria-label="Close menu" onClick={() => setMenu(false)} />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col">
            <header className="flex items-center justify-between gap-3 px-4 md:px-6 h-[60px] shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <button type="button" className="lg:hidden rounded-full p-2 -ml-2 hover:bg-muted" onClick={() => setMenu(true)} aria-label="Open menu" data-testid="menu"><List size={20} weight="bold" /></button>
                <span className="lg:hidden"><Logo /></span>
                <p className="hidden lg:block truncate text-[15px] font-semibold text-muted-foreground" data-testid="thread-title">{access === "open" && thread ? thread.title : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-focus-soft text-focus px-2.5 py-1 text-xs font-semibold whitespace-nowrap" data-testid="ai-label"><Sparkle size={12} weight="fill" /> AI tutor</span>
                {access === "open" && <button type="button" onClick={startNew} className="lg:hidden rounded-full p-2 hover:bg-muted" aria-label="New conversation"><NotePencil size={19} weight="bold" /></button>}
              </div>
            </header>
            <main className="flex-1 min-h-0 overflow-y-auto" id="chat-scroll">
              <div className="max-w-3xl mx-auto px-4 md:px-6 pt-4 md:pt-8 min-h-full flex flex-col">
                <SayOnTap>{main}</SayOnTap>
              </div>
            </main>
          </div>
        </ReadAloudProvider>
      </TuningProvider>
    </StudyRoot>
  );
}

/* The one thing the device asks itself, before any AI is involved: age, typed, with no bands and no hint of what it unlocks. */
function Intake({ onAge }: { onAge: (age: number) => void }) {
  const [age, setAge] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-6 pb-10" data-testid="intake">
      <TutorBubble>
        <p>Hi, I&apos;m Dojolom&apos;s tutor. I&apos;m an AI, and I teach by talking things through with you: you think, you explain, you practise, and I bring ideas back just before you&apos;d forget them.</p>
        <p>First, so I can pitch things right: how old are you?</p>
      </TutorBubble>
      <form className="ml-11 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (age !== null) onAge(age); }}>
        <AgeInput value={age} onChange={setAge} label="Your age" />
        <Button type="submit" className="self-start" disabled={age === null} data-testid="intake-continue">Continue <ArrowRight size={16} weight="bold" /></Button>
      </form>
    </div>
  );
}

/* Once the deployment allows the tutor for under-18s: a parent or guardian agrees first. */
function ConsentCard({ name, agreed, onAgree, onStart }: { name: string; agreed: boolean; onAgree: (v: boolean) => void; onStart: () => void }) {
  const who = name.trim().split(/\s+/)[0] || "your child";
  return (
    <div className="surface rounded-[28px] p-6 md:p-8 flex flex-col gap-5" data-testid="tutor-consent">
      <div className="flex items-center gap-3">
        <span className="size-11 rounded-2xl bg-focus-soft text-focus inline-flex items-center justify-center"><ShieldCheck size={24} weight="duotone" /></span>
        <h2 className="text-2xl font-semibold leading-tight">For a parent or guardian</h2>
      </div>
      <div className="flex flex-col gap-3 text-[15px] leading-7">
        <p>The tutor is an AI, not a person. To reply, it sends what {who} types, with their first name, age, class and interests, to an AI service (Anthropic&apos;s Claude, through Vercel). Dojolom does not keep the conversation: it stays on this device.</p>
        <p>The tutor is told to keep to learning, never to ask for personal details, and, if anything worrying comes up, to tell {who} to talk to a trusted adult and give the child helpline (1098). It can still make mistakes, and for children under 13 we suggest an adult stays nearby.</p>
      </div>
      <label className="flex items-start gap-3 rounded-2xl bg-muted/70 p-4 cursor-pointer">
        <input type="checkbox" className="mt-1 size-5 accent-[var(--color-focus)]" checked={agreed} onChange={(e) => onAgree(e.target.checked)} data-testid="tutor-consent-check" />
        <span className="text-[15px] font-semibold leading-6">I am {who === "your child" ? "this learner's" : `${who}'s`} parent or guardian, and I agree. I can turn this off any time in settings.</span>
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/start/" className="text-[15px] font-semibold text-muted-foreground hover:text-foreground">Use the lessons without the tutor</Link>
        <Button size="lg" disabled={!agreed} onClick={onStart} data-testid="tutor-consent-start">Start with the tutor <ArrowRight size={18} weight="bold" /></Button>
      </div>
    </div>
  );
}
