#!/usr/bin/env node
// Generates the content illustrations and the manifest the app reads.
//
//   node scripts/gen-visuals.mjs --dry-run                 # print the plan, call nothing
//   node scripts/gen-visuals.mjs --subject math --unit 1   # one unit, to review the style first
//   node scripts/gen-visuals.mjs                           # everything authored and not yet generated
//   node scripts/gen-visuals.mjs --check                   # every manifest entry has its file
//
// Flags: --kinds scene,pair,step   --limit N   --force (regenerate existing)   --concurrency N (default 3)
// Keys (one of): AI_GATEWAY_API_KEY (Vercel AI Gateway), GEMINI_API_KEY, OPENAI_API_KEY. VISUALS_MODEL overrides the model.
//
// Every prompt is built from the authored text in one house style, with no letters or digits asked for
// (image models garble them). Alt text comes from the content, never from the model. Images are resized
// to 512px WebP so a whole subject stays a few megabytes. Output: public/visuals/<conceptId>/<kind>.webp
// and src/content/visuals.json. Re-running only fills gaps, so a bad image is fixed by deleting its file.

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const contentDir = join(root, "src", "content");
const outDir = join(root, "public", "visuals");
const manifestPath = join(contentDir, "visuals.json");
const SIZE = 512;

// ─── Arguments ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback; };
const dryRun = flag("dry-run");
const check = flag("check");
const force = flag("force");
const onlySubject = opt("subject", null);
const onlyUnit = opt("unit", null) ? Number(opt("unit")) : null;
const kinds = new Set(opt("kinds", "scene,pair,step").split(",").map((s) => s.trim()));
const limit = opt("limit", null) ? Number(opt("limit")) : Infinity;
const concurrency = Number(opt("concurrency", "3"));

// ─── House style ──────────────────────────────────────────────────────────────
// One look for every image so the set reads as one system and matches the app's palette.
const STYLE = [
  "Flat vector illustration, clean geometric shapes with soft rounded corners, gentle paper texture.",
  "Limited palette: deep blue #2f5bea, warm yellow #f7c548, leaf green #2a9d68, violet #7657e0, soft coral #d94f39 used sparingly, on an off-white #f7f8fb background.",
  "Centered single subject, generous margins, no border, no frame, no drop shadow.",
  "Absolutely no text, letters, numbers, labels, captions or watermarks anywhere in the image.",
  "Educational, friendly, precise. Not photorealistic, not 3D, not clip-art, not cartoon faces.",
].join(" ");

// Subject notes keep the pictures honest where a literal reading would need digits or symbols.
const SUBJECT_NOTES = {
  math: "Use counters, blocks, bars, pie slices, number lines without digits, balance scales and grids to stand for quantities. Never draw digits or equations.",
  science: "Show the physical situation: apparatus, materials, arrows for forces and flows, simple cross-sections. Keep it accurate.",
  languages: "Show the everyday situation the word or phrase belongs to: people greeting, a market, a family at a table, a street sign with no letters on it. Diverse, contemporary people, no speech bubbles with text.",
  history: "Period-accurate objects, clothing and architecture, no dates or inscriptions.",
  money: "Coins, notes without denominations, jars, wallets, simple bar and pie charts with no labels.",
  coding: "Blocks, arrows, switches, conveyor belts and boxes stand for instructions and values. No code, no letters on screens.",
  music: "Instruments, hands, sound waves, dots on a staff with no clef letters.",
  art: "Palettes, brushes, light and shadow on simple objects, composition grids.",
  health: "Simple anatomical diagrams, food, sleep and movement scenes, no labels.",
  life: "Kitchens, calendars without numbers, tools, conversations, everyday rooms.",
  thinking: "Brains as simple shapes, puzzle pieces, paths and forks, lightbulbs, magnifying glasses.",
  world: "Maps without place names, landscapes, cities, weather, people from many cultures.",
};

// ─── Content ──────────────────────────────────────────────────────────────────
async function loadUnits() {
  const units = [];
  for (const subject of readdirSync(contentDir).sort()) {
    const dir = join(contentDir, subject);
    if (!statSync(dir).isDirectory()) continue;
    if (onlySubject && subject !== onlySubject) continue;
    for (const f of readdirSync(dir).sort()) {
      const m = f.match(/^unit-(\d)\.ts$/);
      if (!m) continue;
      if (onlyUnit !== null && Number(m[1]) !== onlyUnit) continue;
      // Node strips the types natively; unit files carry only a type import, which is erased.
      const mod = await import(pathToFileURL(join(dir, f)).href);
      units.push(mod.default);
    }
  }
  return units;
}

/** One entry per image the content asks for. */
function plan(units) {
  const jobs = [];
  for (const unit of units) {
    const note = SUBJECT_NOTES[unit.subject] ?? "";
    for (const c of unit.concepts) {
      if (kinds.has("scene")) {
        jobs.push({
          conceptId: c.id, kind: "scene", w: SIZE, h: Math.round(SIZE / 2), aspect: "2:1",
          alt: c.hook,
          prompt: `${STYLE} ${note} Illustrate this idea for a learner: "${c.title}". The scene: ${c.analogy}`,
        });
      }
      if (kinds.has("pair")) {
        c.pairs.forEach((p, i) => jobs.push({
          conceptId: c.id, kind: `pair-${i}`, w: SIZE, h: SIZE, aspect: "1:1",
          alt: p.match,
          prompt: `${STYLE} ${note} A single clear picture of the concept "${p.term}", meaning: ${p.match}. Show the thing itself, as one recognisable image a learner could match to the term "${p.term}".`,
        }));
      }
      if (kinds.has("step")) {
        c.order.items.forEach((s, i) => jobs.push({
          conceptId: c.id, kind: `step-${i}`, w: SIZE, h: SIZE, aspect: "1:1",
          alt: s,
          prompt: `${STYLE} ${note} One storyboard frame from a sequence about: ${c.order.prompt} This frame shows the step: "${s}". Same characters and objects as the other frames of the sequence, seen from the same angle.`,
        }));
      }
    }
  }
  return jobs;
}

// ─── Providers ────────────────────────────────────────────────────────────────
function provider() {
  if (process.env.AI_GATEWAY_API_KEY) return { name: "gateway", model: process.env.VISUALS_MODEL ?? "google/gemini-2.5-flash-image", key: process.env.AI_GATEWAY_API_KEY };
  if (process.env.GEMINI_API_KEY) return { name: "gemini", model: process.env.VISUALS_MODEL ?? "gemini-2.5-flash-image", key: process.env.GEMINI_API_KEY };
  if (process.env.OPENAI_API_KEY) return { name: "openai", model: process.env.VISUALS_MODEL ?? "gpt-image-1", key: process.env.OPENAI_API_KEY };
  return null;
}

async function generate(p, job) {
  if (p.name === "gateway" || p.name === "openai") {
    const base = p.name === "gateway" ? "https://ai-gateway.vercel.sh/v1" : "https://api.openai.com/v1";
    const body = { model: p.model, prompt: job.prompt, n: 1 };
    if (p.name === "openai") { body.size = "1024x1024"; body.quality = "low"; }
    const res = await fetch(`${base}/images/generations`, {
      method: "POST",
      headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`${p.name} ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const json = await res.json();
    const img = json.data?.[0];
    if (img?.b64_json) return Buffer.from(img.b64_json, "base64");
    if (img?.url) { const r = await fetch(img.url); return Buffer.from(await r.arrayBuffer()); }
    throw new Error(`${p.name}: no image in response`);
  }
  // Gemini: generateContent with an image response modality.
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${p.model}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": p.key, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: job.prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: job.aspect } },
    }),
  });
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((x) => x.inlineData?.data);
  if (!part) throw new Error("gemini: no image in response");
  return Buffer.from(part.inlineData.data, "base64");
}

async function toWebp(buffer, w, h) {
  try {
    const sharp = (await import("sharp")).default;
    return { data: await sharp(buffer).resize(w, h, { fit: "cover", position: "centre" }).webp({ quality: 80 }).toBuffer(), ext: "webp" };
  } catch {
    // sharp missing: keep the model's PNG as-is (npm i -D sharp to get the small files).
    return { data: buffer, ext: "png" };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function readManifest() {
  try { return JSON.parse(readFileSync(manifestPath, "utf8")); } catch { return {}; }
}
function writeManifest(m) {
  const sorted = Object.fromEntries(Object.keys(m).sort().map((k) => [k, Object.fromEntries(Object.keys(m[k]).sort().map((kk) => [kk, m[k][kk]]))]));
  writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
}

async function main() {
  const manifest = readManifest();

  if (check) {
    let missing = 0;
    for (const [id, entry] of Object.entries(manifest)) {
      for (const [kind, v] of Object.entries(entry)) {
        if (!existsSync(join(root, "public", v.src))) { console.error(`missing file: ${id}/${kind} -> ${v.src}`); missing++; }
      }
    }
    console.log(missing ? `${missing} manifest entries have no file` : `manifest ok: ${Object.keys(manifest).length} concepts`);
    process.exit(missing ? 1 : 0);
  }

  const units = await loadUnits();
  const jobs = plan(units);
  const todo = jobs.filter((j) => force || !manifest[j.conceptId]?.[j.kind]).slice(0, limit);
  console.log(`${units.length} units, ${jobs.length} images planned, ${todo.length} to generate`);

  if (dryRun) {
    for (const j of todo.slice(0, 6)) console.log(`\n[${j.conceptId} ${j.kind}] alt: ${j.alt}\n  ${j.prompt}`);
    if (todo.length > 6) console.log(`\n… and ${todo.length - 6} more`);
    return;
  }

  const p = provider();
  if (!p) {
    console.error("No API key found. Set AI_GATEWAY_API_KEY, GEMINI_API_KEY or OPENAI_API_KEY, or use --dry-run.");
    process.exit(2);
  }
  console.log(`provider: ${p.name}, model: ${p.model}`);

  let done = 0, failed = 0;
  const queue = [...todo];
  async function worker() {
    while (queue.length) {
      const job = queue.shift();
      try {
        const raw = await generate(p, job);
        const { data, ext } = await toWebp(raw, job.w, job.h);
        const dir = join(outDir, job.conceptId);
        mkdirSync(dir, { recursive: true });
        const file = join(dir, `${job.kind}.${ext}`);
        writeFileSync(file, data);
        manifest[job.conceptId] ??= {};
        manifest[job.conceptId][job.kind] = { src: relative(join(root, "public"), file).split("\\").join("/"), alt: job.alt, w: job.w, h: job.h };
        writeManifest(manifest); // after every image, so an interrupted run keeps its work
        done++;
        console.log(`ok   ${job.conceptId} ${job.kind} (${done}/${todo.length})`);
      } catch (err) {
        failed++;
        console.error(`fail ${job.conceptId} ${job.kind}: ${err.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
  console.log(`\n${done} generated, ${failed} failed. Manifest: ${relative(root, manifestPath)}`);
  if (failed) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
