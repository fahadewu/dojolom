"use client";

import { cn } from "@/lib/utils";
import { agreeScale, studyItems } from "@/lib/personal";

/* If-then plans: tie the session to something that already happens every day. A cue beats a time of day
   because it fires on its own (implementation intentions; Gollwitzer & Sheeran 2006). */
export const planCues = ["I get home", "lunch", "my evening snack", "dinner", "I wake up"] as const;

export function planLine(cue: string | undefined, when: string | undefined): string | null {
  if (cue && when) return `After ${cue}, in the ${when}.`;
  if (cue) return `After ${cue}.`;
  if (when) return `${when}s.`;
  return null;
}

export function CueChips({ value, onChange }: { value: string | undefined; onChange: (cue: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Right after…">
      {planCues.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          data-testid={`cue-${c.split(" ").at(-1)}`}
          onClick={() => onChange(c)}
          className={cn("rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors", value === c ? "bg-foreground text-white border-foreground" : "bg-card border-input hover:border-foreground/35")}
        >
          After {c}
        </button>
      ))}
    </div>
  );
}

/* The "how you study right now" statements: one row each, five steps from "not like me" to "very like me". */
export function StudyStatements({ answers, onChange, largeTargets = false }: { answers: Record<string, number>; onChange: (id: string, value: number) => void; largeTargets?: boolean }) {
  return (
    <ul className="flex flex-col gap-5" data-testid="study-statements">
      {studyItems.map((item) => (
        <li key={item.id} className="flex flex-col gap-2.5">
          <p className="text-[16px] font-semibold leading-snug">{item.text}</p>
          <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label={item.text}>
            {agreeScale.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={answers[item.id] === o.value}
                data-testid={`study-${item.id}-${o.value}`}
                onClick={() => onChange(item.id, o.value)}
                className={cn(
                  "rounded-xl border px-1.5 py-2 text-xs sm:text-sm font-semibold leading-tight transition-colors",
                  largeTargets && "py-3",
                  answers[item.id] === o.value ? "bg-focus text-white border-focus" : "bg-card border-input hover:border-foreground/35 text-muted-foreground",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
