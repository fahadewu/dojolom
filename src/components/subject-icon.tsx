import {
  Translate,
  MathOperations,
  Flask,
  Bank,
  Coins,
  Code,
  MusicNotes,
  PaintBrush,
  Heartbeat,
  Toolbox,
  Brain,
  GlobeHemisphereWest,
  Books,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import { subjects } from "@/lib/learning";
import { tint, tintAt, type Tint } from "@/lib/tint";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<IconProps>> = {
  languages: Translate,
  math: MathOperations,
  science: Flask,
  history: Bank,
  money: Coins,
  coding: Code,
  music: MusicNotes,
  art: PaintBrush,
  health: Heartbeat,
  life: Toolbox,
  thinking: Brain,
  world: GlobeHemisphereWest,
};

export function subjectTint(id: string): Tint {
  const i = subjects.findIndex((s) => s.id === id);
  return tintAt(i < 0 ? 0 : i);
}

export function subjectIdByName(name: string): string {
  return subjects.find((s) => s.name.toLowerCase() === name.toLowerCase())?.id ?? "thinking";
}

export function SubjectIcon({ id, ...props }: { id: string } & IconProps) {
  const Icon = icons[id] ?? Books;
  return <Icon weight="duotone" {...props} />;
}

/* A tinted square holding the subject's icon. The tint is fixed per subject
   so the same subject looks the same everywhere on the site. */
export function SubjectChip({ id, size = "md", className = "" }: { id: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const t = tint[subjectTint(id)];
  const box = size === "sm" ? "size-8 rounded-lg" : size === "lg" ? "size-14 rounded-2xl" : "size-11 rounded-xl";
  const icon = size === "sm" ? 16 : size === "lg" ? 28 : 22;
  return (
    <span className={cn(box, t.chip, "inline-flex shrink-0 items-center justify-center", className)} aria-hidden>
      <SubjectIcon id={id} size={icon} />
    </span>
  );
}
