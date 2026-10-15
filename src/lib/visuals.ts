// ─── Illustrations of the content ─────────────────────────────────────────────
// Every image is generated at build time by scripts/gen-visuals.mjs from the
// authored text, in one house style, and recorded in src/content/visuals.json.
// The app only ever reads that manifest: where an entry is missing the game
// falls back to words, never to a placeholder. Nothing here calls a model.
import manifestJson from "@/content/visuals.json";
import type { Concept } from "@/content/types";

/** What a concept can be pictured as: the idea itself, each pair term, each sequence step. */
export type VisualKind = "scene" | `pair-${number}` | `step-${number}`;

export interface Visual {
  src: string; // path under public/, without the base path
  alt: string; // from the authored content, never from the model
  w: number;
  h: number;
}

export type VisualManifest = Record<string, Partial<Record<string, Visual>>>; // conceptId -> kind -> visual

let manifest: VisualManifest = manifestJson as VisualManifest;

/** Tests inject a manifest; the app never calls this. */
export function setVisualManifest(m: VisualManifest | null) {
  manifest = m ?? (manifestJson as VisualManifest);
}

const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/** URL for a manifest path, honouring the GitHub project-site base path. */
export function visualUrl(src: string): string {
  return `${base}/${src.replace(/^\/+/, "")}`;
}

export function visualFor(conceptId: string, kind: VisualKind): Visual | null {
  return manifest[conceptId]?.[kind] ?? null;
}

export function pairVisuals(concept: Concept): (Visual | null)[] {
  return concept.pairs.map((_, i) => visualFor(concept.id, `pair-${i}`));
}

export function stepVisuals(concept: Concept): (Visual | null)[] {
  return concept.order.items.map((_, i) => visualFor(concept.id, `step-${i}`));
}

/** Every pair term of the concept has a picture, so picture games can run on it. */
export function hasPairVisuals(concept: Concept): boolean {
  return concept.pairs.length > 0 && pairVisuals(concept).every(Boolean);
}

export function hasStepVisuals(concept: Concept): boolean {
  return concept.order.items.length > 0 && stepVisuals(concept).every(Boolean);
}

/** Manifest-only check for the session builder, which runs before the concepts are loaded: five pair pictures per concept. */
export function conceptsHaveVisuals(conceptIds: string[]): boolean {
  return conceptIds.length > 0 && conceptIds.every((id) => {
    const entry = manifest[id];
    if (!entry) return false;
    for (let i = 0; i < 5; i++) if (!entry[`pair-${i}`]) return false;
    return true;
  });
}

/** How many concepts in the manifest have at least one picture. */
export function visualCount(): number {
  return Object.values(manifest).filter((e) => Object.keys(e ?? {}).length > 0).length;
}
