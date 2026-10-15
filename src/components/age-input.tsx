"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AGE_MAX, AGE_MIN, parseAge } from "@/lib/age";

/* A neutral age question: a typed number, no default, no bands and no hint of
   what any age unlocks (UK Children's Code; FTC guidance on age screens). A
   picker labelled "Under 12" invites children to choose the older box. */
export function AgeInput({
  value,
  onChange,
  id = "age",
  label = "How old are you?",
}: {
  value: number | null;
  onChange: (age: number | null) => void;
  id?: string;
  label?: string;
}) {
  const [text, setText] = useState(value === null ? "" : String(value));
  const parsed = parseAge(text);
  const invalid = text.trim() !== "" && parsed === null;
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-sm font-semibold">{label}</span>
      <Input
        id={id}
        value={text}
        inputMode="numeric"
        autoComplete="off"
        maxLength={3}
        placeholder="Age in years"
        aria-invalid={invalid || undefined}
        aria-describedby={`${id}-hint`}
        data-testid="age-input"
        className="max-w-40"
        onChange={(e) => {
          const t = e.target.value.replace(/[^\d]/g, "");
          setText(t);
          onChange(parseAge(t));
        }}
      />
      <span id={`${id}-hint`} className={invalid ? "text-sm text-ember" : "text-sm text-muted-foreground"}>
        {invalid
          ? `Enter an age from ${AGE_MIN} to ${AGE_MAX}.`
          : parsed !== null && parsed < 5
            ? "Dojolom is made for ages 5 and up. A grown-up can explore it alongside a younger child."
            : "Setting this up for someone else? Enter their age."}
      </span>
    </label>
  );
}
