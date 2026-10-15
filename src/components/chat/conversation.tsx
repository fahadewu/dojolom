"use client";

// One conversation with the tutor. The model talks; the learner's device does
// everything that is marked or recorded: cards are marked against stored keys
// and recorded through the study engine (FSRS memory), profile answers and
// learned ideas are saved here. docs/ai-tutor-rd.md.

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { ChatCircleDots, PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Listen, stopSpeaking } from "@/components/study/read-aloud";
import { CheckCard, ChoicesCard, GuessCard, RecordLine, ShowCard, SourceLine, StepsCard, TryCard, showFormat } from "@/components/chat/cards";
import { MessageText, plainText } from "@/components/chat/message-text";
import { getStudy, invalidateLearner, updateStudy, useStudy } from "@/lib/study-store";
import { authoredUnitsFor, isAuthored, useConcepts } from "@/content/load";
import { nowMs } from "@/lib/clock";
import { ageView } from "@/lib/age";
import { bdStage } from "@/lib/curriculum-bd";
import { loadLearner, saveLearner, type LearnerInput } from "@/lib/learning";
import { cleanInterests, cleanSeeWays, isTone, styleAnswersFrom } from "@/lib/tutor/profile";
import { buildTutorContext } from "@/lib/tutor/context";
import { flagOwnIdea, isOwnId, loadOwnIdeas, makeOwnIdea, saveOwnIdea } from "@/lib/tutor/ideas";
import { reviewItemText } from "@/lib/tutor/items";
import { KICKOFF_TEXT, isKickoff } from "@/lib/tutor/threads";
import { AUTO_TOOLS, SERVER_TOOLS, type TutorToolName, type TutorUIMessage } from "@/lib/tutor/tools";
import {
  answered,
  answeredCq,
  effectiveToday,
  guessRate,
  learned,
  parseConceptId,
  pickReviewItem,
  saidInOwnWords,
  seedFor,
  subjectById,
  thinkFirst,
  type Confidence,
  type LearnFormat,
  type ReadSample,
  type ReviewItem,
} from "@/lib/study";

const API = `${(process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "")}/api/chat/`;

type ToolPart = { type: string; toolCallId: string; state: string; input?: Record<string, unknown>; output?: Record<string, unknown> };
const toolName = (p: { type: string }) => p.type.slice(5) as TutorToolName;
const isTool = (p: { type: string }) => p.type.startsWith("tool-");
const asTool = (p: unknown) => p as ToolPart;

/** A checked idea that exists in this copy of the app. */
export function isAuthoredIdea(id: string): boolean {
  if (!/^[a-z0-9-]+-\d+-\d+$/.test(id)) return false;
  const { subject, unit, n } = parseConceptId(id);
  return n >= 1 && n <= 3 && isAuthored(subject, unit);
}

/** Checked ideas the conversation's cards refer to. */
function ideasIn(messages: TutorUIMessage[]): string[] {
  const ids = new Set<string>();
  for (const m of messages) for (const part of m.parts) {
    const id = asTool(part).input?.ideaId;
    if (typeof id === "string" && isAuthoredIdea(id)) ids.add(id);
  }
  return [...ids];
}

/** The context for the turn about to be sent, read from the stores as they are at that moment (never from render). */
function contextNow() {
  const learner = loadLearner();
  if (!learner) return null;
  const s = getStudy();
  const at = nowMs();
  return buildTutorContext({ learner, state: s, ownIdeas: loadOwnIdeas(), today: effectiveToday(s, at), now: at, authoredUnitsFor });
}

/** The format a checked idea was first shown in, for judging later which formats stuck. */
function firstShown(messages: TutorUIMessage[], idea: string): LearnFormat | undefined {
  for (const m of messages) for (const part of m.parts) {
    const p = asTool(part);
    if (p.type === "tool-show" && p.input?.ideaId === idea && p.input.as && p.input.as !== "keyPoints") return showFormat[p.input.as as keyof typeof showFormat];
  }
  return undefined;
}

/** The learner's most recent words (typed, or typed in place of a choice): their own words for the explain-back, never the tutor's summary. */
function lastLearnerText(messages: TutorUIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "user" && !isKickoff(m)) return m.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ").trim();
    for (let j = m.parts.length - 1; j >= 0; j--) {
      const p = asTool(m.parts[j]);
      if (p.type === "tool-choices" && p.state === "output-available" && Array.isArray(p.output?.chose)) return (p.output.chose as string[]).join(", ");
      if (p.type === "tool-show" || p.type === "tool-steps") return "";
    }
  }
  return "";
}

/** Profile answers the tutor heard, checked and saved. Returns the fields that were saved. */
function saveProfileFrom(input: Record<string, unknown>): string[] {
  const l = loadLearner();
  if (!l) return [];
  const next: LearnerInput = { ...l };
  const saved: string[] = [];
  if (typeof input.name === "string" && input.name.trim()) { next.name = input.name.replace(/[^\p{L}\p{N} .'-]/gu, "").trim().slice(0, 40); saved.push("name"); }
  if (input.track === "everyday" || input.track === "nctb") { next.track = input.track; saved.push("track"); }
  if (typeof input.bdStage === "string" && bdStage(input.bdStage as never)) { next.bdStage = input.bdStage as LearnerInput["bdStage"]; next.track = "nctb"; if (!bdStage(next.bdStage)?.grouped) next.bdGroup = ""; saved.push("class"); }
  if (input.bdGroup === "science" || input.bdGroup === "humanities" || input.bdGroup === "business") { next.bdGroup = input.bdGroup; saved.push("group"); }
  if (Array.isArray(input.books)) { const books = input.books.filter((b): b is string => typeof b === "string" && !!subjectById(b)).slice(0, 3); if (books.length) { next.subjects = books; saved.push("books"); } }
  if (typeof input.goal === "string" && ["curious", "school", "work", "hobby", "family"].includes(input.goal)) { next.goal = input.goal as LearnerInput["goal"]; saved.push("goal"); }
  if (typeof input.targetGrade === "string" && ["A+", "A", "A-", "B", "C"].includes(input.targetGrade)) { next.targetGrade = input.targetGrade as LearnerInput["targetGrade"]; saved.push("target grade"); }
  if (Array.isArray(input.interests)) { next.interests = cleanInterests([...input.interests, ...next.interests]); saved.push("interests"); }
  if (Array.isArray(input.seeWays)) { const ways = cleanSeeWays(input.seeWays); if (ways.length) { next.seeWays = ways; next.answers = styleAnswersFrom(ways); saved.push("how you like things explained"); } }
  if (isTone(input.tone)) { next.tutorTone = input.tone; saved.push("voice"); }
  if (saved.length) { saveLearner(next); invalidateLearner(); }
  return saved;
}

export function Conversation({ threadId, initial, learner, onSave }: {
  threadId: string;
  initial: TutorUIMessage[];
  learner: LearnerInput;
  onSave: (messages: TutorUIMessage[]) => void;
}) {
  const [state, update] = useStudy();
  const age = ageView(learner, state);
  const [restored] = useState(initial.length);
  const live = useRef<{ messages: TutorUIMessage[]; concepts: Record<string, { title: string }> | null }>({ messages: initial, concepts: null });
  const [transport] = useState(() => new DefaultChatTransport<TutorUIMessage>({ api: API, body: () => ({ context: contextNow() }) }));

  const chat = useChat<TutorUIMessage>({
    id: threadId,
    messages: initial,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onToolCall: ({ toolCall }) => {
      if (toolCall.dynamic) return;
      const answer = autoAnswer(toolCall.toolName as TutorToolName, (toolCall.input ?? {}) as Record<string, unknown>);
      if (!answer) return;
      if ("error" in answer) chat.addToolOutput({ tool: toolCall.toolName, toolCallId: toolCall.toolCallId, state: "output-error", errorText: answer.error });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else chat.addToolOutput({ tool: toolCall.toolName, toolCallId: toolCall.toolCallId, output: answer.output as any });
    },
  });
  const { messages, sendMessage, addToolOutput, status, error, regenerate, clearError } = chat;

  // Keep the conversation once each turn settles.
  useEffect(() => { if (status === "ready" && messages.length) onSave(messages); }, [status, messages, onSave]);

  // A new conversation opens with the tutor speaking: an unseen first message lets it.
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current || initial.length) return;
    opened.current = true;
    void sendMessage({ text: KICKOFF_TEXT, metadata: { kickoff: true } });
  }, [initial.length, sendMessage]);

  const bottom = useRef<HTMLDivElement>(null);
  const lastLen = messages.at(-1)?.parts.length ?? 0;
  useEffect(() => { bottom.current?.scrollIntoView({ block: "end" }); }, [messages.length, lastLen, status]);

  // Checked ideas the conversation's cards show: loaded once each.
  const idList = ideasIn(messages).join(",");
  const ideaIds = useMemo(() => (idList ? idList.split(",") : []), [idList]);
  const { data: concepts } = useConcepts(ideaIds);
  useEffect(() => { live.current = { messages, concepts: concepts ?? null }; });

  /** What the device answers at once, after checking it makes sense. Null for the cards the learner answers, and for lookups the server answered. */
  function autoAnswer(tool: TutorToolName, input: Record<string, unknown>): { output: unknown } | { error: string } | null {
    if (SERVER_TOOLS.includes(tool)) return null;
    const at = nowMs();
    const id = typeof input.ideaId === "string" ? input.ideaId : "";
    const own = loadOwnIdeas();
    switch (tool) {
      case "show":
      case "guess":
      case "tryIt":
        return isAuthoredIdea(id) ? (tool === "show" ? { output: { shown: true } } : null) : { error: `"${id}" is not a checked idea. Use one from lookUp, chapter or the notes.` };
      case "quickCheck":
        if (isAuthoredIdea(id)) return null;
        return own[id] && !own[id].flagged ? null : { error: `There is no check for "${id}". Only ideas in the notes, or saved with learned, can be checked.` };
      case "choices":
        return null;
      case "steps":
        return { output: { shown: true } };
      case "saveProfile":
        return { output: { saved: saveProfileFrom(input) } };
      case "learned": {
        const words = lastLearnerText(live.current.messages);
        if (typeof input.ideaId === "string" && input.ideaId) {
          if (!isAuthoredIdea(input.ideaId)) return { error: `"${input.ideaId}" is not a checked idea. For anything else, give own.` };
          const ideaId = input.ideaId;
          const format = firstShown(live.current.messages, ideaId) ?? "infographic";
          updateStudy((s) => { let n = learned(s, ideaId, format, at); if (words) n = saidInOwnWords(n, ideaId, words); return n; });
          return { output: { id: ideaId, title: live.current.concepts?.[ideaId]?.title ?? ideaId } };
        }
        const idea = makeOwnIdea((input.own ?? {}) as Record<string, unknown>, effectiveToday(getStudy(), at), (x) => !!own[x] || !!getStudy().memory[x]);
        if (!idea) return { error: "own needs a title, a key point and a check with three or four different options and the index of the right one." };
        saveOwnIdea(idea);
        updateStudy((s) => { let n = learned(s, idea.id, "reading", at); if (words) n = saidInOwnWords(n, idea.id, words); return n; });
        return { output: { id: idea.id, title: idea.title } };
      }
      case "markCq": {
        const book = typeof input.book === "string" ? input.book : "";
        const number = Number(input.number);
        const marks = Array.isArray(input.marks) ? input.marks.map((m) => Number(m) || 0) : [];
        if (!subjectById(book) || !Number.isInteger(number) || marks.length !== 4) return { error: "Give the book id, the chapter number and four marks." };
        updateStudy((s) => answeredCq(s, book, number, marks, at));
        return { output: { recorded: true } };
      }
    }
    return null;
  }

  const confidence = age.d.confidence;
  const largeTargets = age.largeTargets;
  const busy = status === "submitted" || status === "streaming";
  const lastMsg = messages.at(-1);
  const waiting = lastMsg?.role === "assistant"
    ? lastMsg.parts.filter((p) => isTool(p) && asTool(p).state === "input-available" && !AUTO_TOOLS.includes(toolName(p)) && !SERVER_TOOLS.includes(toolName(p))).map(asTool)
    : [];
  // Offered choices wait for an answer, but typing is always allowed: what they type becomes the answer.
  const choicesCall = waiting.find((p) => p.type === "tool-choices");
  const pending = waiting.some((p) => p.type !== "tool-choices");

  const record = (ideaId: string, correct: boolean, source: "review" | "try", conf: Confidence, extra: { item?: ReviewItem; thinkMs?: number; guess?: number; read?: ReadSample } = {}) => {
    const at = nowMs();
    const subject = isOwnId(ideaId) ? "own" : parseConceptId(ideaId).subject;
    update((s) => answered(s, subject, ideaId, correct, at, { source, confidence: conf, ...extra }));
  };

  const send = (text: string) => {
    stopSpeaking();
    if (choicesCall) addToolOutput({ tool: "choices", toolCallId: choicesCall.toolCallId, output: { chose: [text] } });
    else void sendMessage({ text });
  };

  const ownIdeas = loadOwnIdeas();

  return (
    <div className="flex-1 flex flex-col gap-6 pb-4" data-testid="tutor-chat" data-status={status}>
      <div className="flex flex-col gap-6" role="log" aria-live="polite" aria-label="Conversation with your tutor">
        {messages.map((m, mi) => {
          const isLast = mi === messages.length - 1;
          if (m.role === "user") {
            if (isKickoff(m)) return null;
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("").trim();
            return text ? <LearnerBubble key={m.id} text={text} /> : null;
          }
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("\n\n").trim();
          return (
            <div key={m.id} className="flex flex-col gap-4" data-testid="tutor-message">
              {m.parts.map((part, pi) => {
                const k = `${m.id}-${pi}`;
                if (part.type === "text") return part.text.trim() ? <TutorBubble key={k} text={part.text} /> : null;
                if (!isTool(part)) return null;
                const p = asTool(part);
                if (p.state === "input-streaming" || p.state === "output-error") return null;
                const input = p.input ?? {};
                const out = p.state === "output-available" ? (p.output ?? {}) : null;
                const id = typeof input.ideaId === "string" ? input.ideaId : "";
                const concept = concepts?.[id];
                const seed = seedFor(p.toolCallId);
                switch (toolName(p)) {
                  case "lesson":
                    return out && concept ? <SourceLine key={k} text={`From the checked lesson: ${concept.title}`} /> : null;
                  case "chapter": {
                    const book = subjectById(String(input.book ?? ""));
                    return out && book ? <SourceLine key={k} text={`Opened ${book.name}, ${book.curriculum ? "chapter" : "unit"} ${String(input.number)}`} /> : null;
                  }
                  case "show":
                    return concept ? <ShowCard key={k} concept={concept} as={input.as as Parameters<typeof ShowCard>[0]["as"]} isKid={age.d.stage === "early"} /> : null;
                  case "steps": {
                    const steps = Array.isArray(input.steps) ? (input.steps as { label: string; text: string }[]).filter((s) => s && typeof s.label === "string" && typeof s.text === "string") : [];
                    return steps.length ? <StepsCard key={k} title={String(input.title ?? "")} steps={steps} /> : null;
                  }
                  case "guess":
                    return concept ? (
                      <GuessCard key={k} concept={concept} largeTargets={largeTargets} answered={out ? Boolean(out.saidTrue) : null}
                        onGuess={(v) => addToolOutput({ tool: "guess", toolCallId: p.toolCallId, output: { belief: concept.misconception.belief, saidTrue: v, right: !v, correction: concept.misconception.correction } })} />
                    ) : null;
                  case "tryIt":
                    return concept ? (
                      <TryCard key={k} concept={concept} seed={seed} confidence={confidence} largeTargets={largeTargets}
                        done={out ? { chose: String(out.chose ?? ""), right: Boolean(out.right) } : null}
                        onAnswer={(right, conf, meta) => {
                          record(concept.id, right, "try", conf, { read: meta?.read });
                          const ex = concept.example;
                          // A beat to read the explanation the card shows before the tutor speaks.
                          setTimeout(() => addToolOutput({ tool: "tryIt", toolCallId: p.toolCallId, output: { question: ex.question, chose: meta?.picked ?? "", answer: ex.options[ex.answer], right, why: ex.why } }), 1200);
                        }} />
                    ) : null;
                  case "quickCheck": {
                    const own = isOwnId(id) ? ownIdeas[id] : undefined;
                    if (!concept && !own) return null;
                    const mem = state.memory[id];
                    const item = concept ? pickReviewItem(id, mem, seed % 97, false, state.memoryScale) : undefined;
                    const done = out ? { question: String(out.question ?? ""), chose: String(out.chose ?? ""), right: Boolean(out.right) } : null;
                    return (
                      <CheckCard key={k} concept={concept} item={item} own={own} seed={seed} confidence={confidence} largeTargets={largeTargets} thinkFirst={thinkFirst(mem, state.memoryScale)} done={done}
                        onFlag={own ? () => flagOwnIdea(id) : undefined}
                        onAnswer={(right, conf, meta) => {
                          const asked = concept && item ? reviewItemText(concept, item) : { question: own!.check.question, answer: own!.check.options[own!.check.answer] };
                          const options = concept && item?.source === "quiz" ? concept.quiz[item.index % concept.quiz.length]?.options.length : own?.check.options.length;
                          record(id, right, "review", conf, { item, thinkMs: meta?.thinkMs, guess: item ? guessRate(item.source, options) : 1 / (options ?? 3), read: meta?.read });
                          setTimeout(() => addToolOutput({ tool: "quickCheck", toolCallId: p.toolCallId, output: { question: asked.question, chose: meta?.picked ?? "", answer: asked.answer, right, why: concept ? (item?.source === "quiz" ? concept.quiz[item.index % concept.quiz.length]?.why ?? "" : concept.keyPoints[0]) : own!.check.why } }), 1200);
                        }} />
                    );
                  }
                  case "choices": {
                    if (out) return Array.isArray(out.chose) && out.chose.length ? <LearnerBubble key={k} text={(out.chose as string[]).join(", ")} /> : null;
                    const options = Array.isArray(input.options) ? input.options.map(String) : [];
                    return isLast ? <ChoicesCard key={k} options={options} multi={input.multi === true} disabled={busy} largeTargets={largeTargets} onChoose={(chose) => { stopSpeaking(); addToolOutput({ tool: "choices", toolCallId: p.toolCallId, output: { chose } }); }} /> : null;
                  }
                  case "saveProfile":
                    return out && Array.isArray(out.saved) && out.saved.length ? <RecordLine key={k} testId="tutor-saved" text={`Noted: ${(out.saved as string[]).join(", ")}`} /> : null;
                  case "learned":
                    return out ? <RecordLine key={k} testId="tutor-learned" text={`${String(out.title ?? "")}: I'll bring this back tomorrow`} /> : null;
                  case "markCq":
                    return out ? <RecordLine key={k} testId="tutor-cq" text="Marks saved" /> : null;
                  default:
                    return null;
                }
              })}
              {isLast && status === "ready" && text && (
                <Listen auto={age.readAloud && messages.length > restored} chunks={() => [{ key: `say-${m.id}`, text: plainText(text) }]} className="-mt-1" />
              )}
            </div>
          );
        })}
        {busy && <Typing />}
        {error && (
          <div className="surface rounded-[24px] p-5 flex flex-col gap-3" data-testid="tutor-error">
            <p className="text-[16px] font-semibold">The tutor couldn&apos;t reply just now.</p>
            <p className="text-[15px] text-muted-foreground">Everything you have learned is saved. Try again in a moment.</p>
            <Button className="self-start" onClick={() => { clearError(); void regenerate(); }} data-testid="tutor-retry">Try again</Button>
          </div>
        )}
      </div>
      <div ref={bottom} />
      {/* While a card waits for an answer, the card is the conversation, so the message box steps aside. */}
      {!pending && <Composer disabled={busy || !!error} placeholder={busy ? "Your tutor is replying…" : choicesCall ? "Tap an answer, or type your own" : "Type a message"} large={largeTargets} onSend={send} />}
    </div>
  );
}

export function TutorBubble({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="size-8 shrink-0 rounded-xl bg-focus-soft text-focus inline-flex items-center justify-center mt-0.5" aria-hidden><ChatCircleDots size={18} weight="duotone" /></span>
      <div className="text-[16px] leading-7 flex flex-col gap-3 min-w-0 pt-0.5 flex-1" data-testid="tutor-text">{text ? <MessageText text={text} /> : children}</div>
    </div>
  );
}

function LearnerBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-[20px] rounded-br-md bg-foreground text-white px-4 py-2.5 text-[16px] leading-7 whitespace-pre-wrap break-words" data-testid="learner-text">{text}</p>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex gap-3 items-center" data-testid="tutor-typing" aria-label="Your tutor is replying">
      <span className="size-8 shrink-0 rounded-xl bg-focus-soft text-focus inline-flex items-center justify-center" aria-hidden><ChatCircleDots size={18} weight="duotone" /></span>
      <span className="inline-flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-muted-foreground/50 m-typing" style={{ "--m-delay": `${i * 140}ms` } as React.CSSProperties} />)}
      </span>
    </div>
  );
}

function Composer({ disabled, placeholder, large, onSend }: { disabled: boolean; placeholder: string; large: boolean; onSend: (text: string) => void }) {
  const [text, setText] = useState("");
  const submit = () => {
    const t = text.trim();
    if (!t || disabled) return;
    onSend(t);
    setText("");
  };
  return (
    <div className="sticky bottom-0 mt-auto pt-3 pb-1 bg-background/90 backdrop-blur-xl">
      <form className="flex items-end gap-2 rounded-[24px] border border-input bg-card p-2 pl-4 shadow-[var(--shadow-card)] focus-within:border-focus" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
          rows={1}
          maxLength={2000}
          placeholder={placeholder}
          aria-label="Your message"
          data-testid="tutor-input"
          className={cn("flex-1 resize-none bg-transparent py-2 text-[16px] leading-6 outline-none placeholder:text-muted-foreground max-h-40 field-sizing-content", large && "text-[17px]")}
        />
        <Button type="submit" size="icon" disabled={disabled || !text.trim()} aria-label="Send" data-testid="tutor-send" className={cn("rounded-full shrink-0", large && "size-12")}>
          <PaperPlaneRight size={18} weight="fill" />
        </Button>
      </form>
    </div>
  );
}

