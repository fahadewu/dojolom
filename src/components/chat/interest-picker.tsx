"use client";

import { useState } from "react";
import { Check, Plus, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { INTEREST_LEN, INTEREST_MAX, cleanInterests, interestSuggestions } from "@/lib/tutor/profile";

/* Suggestions to tap, plus their own words. Cleaned the same way the tutor will read them (src/lib/tutor/profile.ts). */
export function InterestPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const full = value.length >= INTEREST_MAX;
  const has = (t: string) => value.some((v) => v.toLowerCase() === t.toLowerCase());
  const add = (t: string) => { onChange(cleanInterests([...value, t])); setDraft(""); };
  const custom = value.filter((v) => !interestSuggestions.some((s) => s.toLowerCase() === v.toLowerCase()));
  return (
    <div className="flex flex-col gap-5" data-testid="interests">
      <div className="flex flex-wrap gap-2">
        {[...interestSuggestions, ...custom].map((t) => {
          const on = has(t);
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              disabled={!on && full}
              onClick={() => onChange(on ? value.filter((v) => v.toLowerCase() !== t.toLowerCase()) : cleanInterests([...value, t]))}
              className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors disabled:opacity-45 inline-flex items-center gap-1.5", on ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}
            >
              {on && <Check size={14} weight="bold" />}{t}
            </button>
          );
        })}
      </div>
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (draft.trim() && !full) add(draft); }}>
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={INTEREST_LEN} placeholder={full ? `That's ${INTEREST_MAX}: remove one to add another` : "Something else? e.g. Bike repair"} disabled={full} aria-label="Add your own interest" data-testid="interest-input" />
        <Button type="submit" variant="outline" disabled={!draft.trim() || full} aria-label="Add"><Plus size={16} weight="bold" /></Button>
      </form>
      {value.length > 0 && (
        <p className="text-sm text-muted-foreground inline-flex flex-wrap items-center gap-1.5">
          {value.length} of {INTEREST_MAX} chosen
          <button type="button" onClick={() => onChange([])} className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline underline-offset-4"><X size={12} weight="bold" /> Clear</button>
        </p>
      )}
    </div>
  );
}
