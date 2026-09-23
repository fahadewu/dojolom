// Class bundles for the four learning colours, so every component paints them the same way.
export type Tint = "focus" | "sun" | "sprout" | "play";

export const tint: Record<Tint, { chip: string; bar: string; text: string; soft: string; border: string; rule: string; solid: string }> = {
  focus:  { chip: "bg-focus-soft text-focus",     bar: "bg-focus",  text: "text-focus",    soft: "bg-focus-soft",  border: "border-focus/40",  rule: "border-focus",  solid: "bg-focus text-white" },
  sun:    { chip: "bg-sun-soft text-sun-deep",    bar: "bg-sun",    text: "text-sun-deep", soft: "bg-sun-soft",    border: "border-sun",       rule: "border-sun",    solid: "bg-sun text-ink" },
  sprout: { chip: "bg-sprout-soft text-sprout",   bar: "bg-sprout", text: "text-sprout",   soft: "bg-sprout-soft", border: "border-sprout/40", rule: "border-sprout", solid: "bg-sprout text-white" },
  play:   { chip: "bg-play-soft text-play",       bar: "bg-play",   text: "text-play",     soft: "bg-play-soft",   border: "border-play/40",   rule: "border-play",   solid: "bg-play text-white" },
};

export const tintOrder: Tint[] = ["focus", "sun", "sprout", "play"];

export function tintAt(i: number): Tint {
  return tintOrder[i % tintOrder.length];
}
