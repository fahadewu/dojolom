"use client";

import { createContext, useContext, useEffect, useId, useRef, useSyncExternalStore } from "react";
import { SpeakerHigh, Stop } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* Read aloud with the device's own voices (the browser's speech synthesis): no
   network, nothing leaves the device. Text is spoken a sentence at a time, and
   the sentence being read is lit up where it is shown, which is what helps an
   early reader tie the sound to the print (docs/age-learning-rd.md). One voice
   at a time across the page: starting anything stops what was playing. */

export interface Chunk { key: string; text: string }

export interface ReadAloud {
  on: boolean;            // read lessons as they appear
  autoQuestions: boolean; // read questions as they appear too (pre-readers); otherwise they wait for Listen
  rate: number;
}

const ReadAloudContext = createContext<ReadAloud>({ on: false, autoQuestions: false, rate: 1 });
export const ReadAloudProvider = ReadAloudContext.Provider;
export function useReadAloud(): ReadAloud { return useContext(ReadAloudContext); }

// ── The one voice ──

let speaking: string | null = null; // the key of the sentence being read
let owner: string | null = null;    // which Listen started it
let generation = 0;
const listeners = new Set<() => void>();
function setSpeaking(k: string | null) { speaking = k; listeners.forEach((l) => l()); }
function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

/** Sentences, kept with their closing punctuation, so what is spoken and what is lit up split the same way. */
export function sentences(text: string): string[] {
  return (text.match(/[^.!?।]+(?:[.!?।]+["'”’)]*|$)/g) ?? []).map((s) => s.trim()).filter(Boolean);
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  return en.find((v) => /en[-_]in/i.test(v.lang) && v.localService) ?? en.find((v) => v.localService) ?? en[0];
}

export function stopSpeaking() {
  generation++;
  owner = null;
  if (speechSupported()) window.speechSynthesis.cancel();
  setSpeaking(null);
}

export function speak(chunks: Chunk[], opts: { rate?: number; by?: string } = {}) {
  if (!speechSupported()) return;
  stopSpeaking();
  const mine = generation;
  owner = opts.by ?? null;
  const lines = chunks.flatMap((c) => sentences(c.text).map((text, i) => ({ key: `${c.key}.${i}`, text })));
  const voice = pickVoice();
  const next = (i: number) => {
    if (mine !== generation) return;
    if (i >= lines.length) { owner = null; setSpeaking(null); return; }
    const u = new SpeechSynthesisUtterance(lines[i].text);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
    u.rate = opts.rate ?? 1;
    u.onstart = () => { if (mine === generation) setSpeaking(lines[i].key); };
    u.onend = () => next(i + 1);
    u.onerror = () => { if (mine === generation) { owner = null; setSpeaking(null); } };
    window.speechSynthesis.speak(u);
  };
  next(0);
}

export function useSpeaking(): string | null {
  return useSyncExternalStore(subscribe, () => speaking, () => null);
}

// ── What a screen uses ──

/* Text that lights up sentence by sentence while it is read. `k` must match the key of the chunk that reads it. */
export function Spoken({ k, text }: { k: string; text: string }) {
  const now = useSpeaking();
  if (!now?.startsWith(`${k}.`)) return <>{text}</>;
  return (
    <>
      {sentences(text).map((s, i) => (
        <span key={i} className={cn(now === `${k}.${i}` && "rounded-md bg-sun-soft text-foreground shadow-[0_0_0_3px_var(--color-sun-soft)]")}>
          {s}{" "}
        </span>
      ))}
    </>
  );
}

/* Listen / Stop. With `auto`, it starts by itself when it appears (read aloud on) and stops when it goes. */
export function Listen({
  chunks,
  auto = false,
  label = "Listen",
  onPlay,
  className,
}: {
  chunks: () => Chunk[];
  auto?: boolean;
  label?: string;
  onPlay?: () => void;
  className?: string;
}) {
  const id = useId();
  const { rate } = useReadAloud();
  const now = useSpeaking();
  const playing = now !== null && owner === id;
  const latest = useRef({ chunks, onPlay, rate });
  useEffect(() => { latest.current = { chunks, onPlay, rate }; });

  useEffect(() => {
    if (!auto || !speechSupported()) return;
    const t = setTimeout(() => { latest.current.onPlay?.(); speak(latest.current.chunks(), { rate: latest.current.rate, by: id }); }, 350);
    return () => clearTimeout(t);
  }, [auto, id]);
  useEffect(() => () => { if (owner === id) stopSpeaking(); }, [id]);

  if (!speechSupported()) return null;
  return (
    <button
      type="button"
      data-testid="listen"
      aria-pressed={playing}
      onClick={() => { if (playing) { stopSpeaking(); return; } onPlay?.(); speak(chunks(), { rate, by: id }); }}
      className={cn(
        "tap inline-flex items-center gap-1.5 self-start rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
        playing ? "bg-foreground text-white border-foreground" : "bg-card border-input text-muted-foreground hover:border-foreground/35 hover:text-foreground",
        className,
      )}
    >
      {playing ? <Stop size={15} weight="fill" /> : <SpeakerHigh size={15} weight="fill" />}
      {playing ? "Stop" : label}
    </button>
  );
}

/* Wraps a sitting: when read aloud is on, tapping anything marked data-say reads its words (game cards, chips). */
export function SayOnTap({ children }: { children: React.ReactNode }) {
  const { on, rate } = useReadAloud();
  return (
    <div
      className="contents"
      onClickCapture={(e) => {
        if (!on) return;
        const el = (e.target as HTMLElement).closest<HTMLElement>("[data-say]");
        const text = el?.getAttribute("data-say") || el?.textContent?.trim();
        if (text) speak([{ key: "tap", text }], { rate });
      }}
    >
      {children}
    </div>
  );
}
