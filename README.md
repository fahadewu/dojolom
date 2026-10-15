# Dojolom

A general learning platform that starts with the learner, not the lesson.

Dojolom is a conversation with an AI tutor. After the landing page there is one chat window, `/learn`, that does everything:

1. **It gets to know you**: your age (asked by the device itself, before any AI is involved), what you want to learn, why, how you like things explained, the voice you want it to have, and what you are into. One question at a time, mostly with tap answers.
2. **It teaches anything, by talking it through**: it asks what you think before explaining, makes you explain the idea back, and never hands over answers you could work out. When the topic is in Dojolom's checked lessons or the Bangladesh school books, it teaches from that material.
3. **It remembers**: everything you learn joins your memory model and comes back as a quick check just before you would forget it. Each day opens with a short review.

The lesson player (the day-by-day sessions below) is the way in for under-18s until the tutor is cleared for children.

## The tutor

`/learn` (`src/components/chat/*`, `src/lib/tutor/*`, `src/app/api/chat/route.ts`). Evidence, design decisions, cost, what is deliberately not built and what blocks opening it to children: `docs/ai-tutor-rd.md`.

- **Conversations, kept on the device.** A sidebar lists them; each new day opens a new one that starts with what is due. Conversations (`dojolom.chats`) and ideas taught outside the checked lessons (`dojolom.ideas`) live in localStorage like everything else.
- **Grounded when possible.** Before teaching a topic the tutor searches the books, chapters and authored ideas (`src/lib/tutor/catalogue.ts`) and reads the checked lesson on the server inside the same turn. Anything else it teaches from its own knowledge under stricter accuracy rules, and saves with one multiple-choice check it writes while teaching; a learner can flag a check that looks wrong.
- **The model never marks anything that moves a memory.** Quick checks are marked on the device against the authored item or the stored check, and recorded through the study engine (FSRS memory).
- **Guardrails from the evidence.** Hints before answers (hint → smaller question → a similar worked example → the answer only after two tries), diagnose before explaining, one move and one question per message, lead after a miss, explain-back against the key words, no verdict changes under push-back, AI not a friend, no personal details, crisis → trusted adult, 999 and 1098.
- **Personal, within what the evidence allows.** Interests set the story of the tutor's own examples (never the numbers or the method, never tangents); the voice (calm, coach, playful, curious) changes how it sounds, not how it teaches; the preferred explanation is where it starts, not a rule; study-habit support carries over from `src/lib/personal.ts`.
- **Models.** `anthropic/claude-haiku-5.5` through AI Gateway; `anthropic/claude-sonnet-5.5` once an idea has been missed twice in the hour. Rules and tools are cached.
- **Children.** Under 18 (by protection age), the device says the tutor is for adults for now and sends them to their lessons; the route refuses them too. `NEXT_PUBLIC_TUTOR_MINORS=1` opens it behind a guardian's consent; do not set it in production before the legal and safety checks in `docs/ai-tutor-rd.md`.

## The study module

`/study` is the lesson player: day-by-day sessions as cards and screens, no AI. Since the tutor became the product it is the way in for under-18s; the same engine (memory, curriculum, age rules) runs behind the tutor.

- **Sessions.** Each subject is a path of sessions (18 for the 5 and 15 minute paces, 6 for the long pace). A session is a fixed sequence of segments: *Rewind* (retrieval questions on ideas that are due, then a recap of last time), *Learn*, *Play* (one of four mini-games mixing today's idea with earlier ones), *Quick check*, and *Done*. The last session of a unit ends with a mixed **checkpoint** instead.
- **Learn by doing.** Every Learn is a loop of *Guess* (the common misconception, true or false), *Try* (a go at the example problem before it is explained; not under 12, where instruction-first works better, not for an idea that opens a chapter or after a wrong guess or shaky answers, and not in the 5-minute pace), *See* (today's idea as an infographic, guided walkthrough, story, deep read or try-it challenge, then the misconception named and corrected) and *Say* (the idea said back before the key points appear: typed for a friend with live feedback on the key terms used, or rebuilt from chips with two decoys; under-10s get chips, so does anyone who skips the typing twice, and chips are one tap away for everyone). Guesses and teach-backs are logged as signals but never count against the sitting or the idea's memory. Once an idea is holding, rewind questions hide their options until the learner says they have an answer in mind. After the quick check and on the finish screen, one line reports how confidence matched outcome. The evidence and design notes are in `docs/learning-mechanics-rd.md`.
- **Games by choice, with pictures that carry meaning.** Play opens with a choice of two games (three on the long pace, none on the 5-minute pace), the engine's favourite first, each with one line on why it is offered; the pick is remembered as a preference and lifts that game's ranking. A bounded difficulty nudge (more help, just right, push me) moves the support ladder one rung. Where generated illustrations exist for an idea, match pairs pairs each term with its *picture*, put it in order becomes a storyboard, the Learn screen shows the idea, and a fifth game, *Spot it* (a picture, four terms), joins the offer. Fill the gap asks for the word to be *typed* at the top support rung or under "push me", tolerant of case, accents and one typo, with the chips one tap away. True or false accepts a swipe. Illustrations are generated at build time from the authored text in one house style (`node scripts/gen-visuals.mjs`, see below); where none exists the game is the text game. The evidence and design notes are in `docs/game-visuals-rd.md`.
- **Rewind and memory.** Every idea carries an FSRS-6 memory (`src/lib/memory.ts`): a stability (days until recall drops to 90%) and a difficulty. Each answer is graded from the evidence it carries (wrong is a lapse; unsure is Hard; sure is Good; sure, recalled before the options and faster than the learner's own usual is Easy; game taps do not count), the memory moves at most once a day on the worst grade that day, and the next review is set for when recall is expected to dip to 90%. The first review is always the next day, after sleep, and a miss comes back tomorrow. A personal forgetting scale, fitted to the learner's own delayed answers (corrected for guessing) when a sitting ends, stretches or shortens the schedule. Rewinds open with ideas missed last time, then confident mistakes, then the lowest chance of recall. A missed rewind or quick-check question gets one second go at the end of the step, asked from another angle; an idea missed twice joins the recap. A failed unit checkpoint is corrected at the start of the next session: the missed ideas are taught again in a different format, then retaken (once). A catch-up review (`/study/review`) drills what is due, then the ideas least likely to be recalled. The evidence and design notes are in `docs/how-people-learn-rd.md`.
- **Behaviour tracking and adaptation.** A bounded event log records segments, answers, games and format switches. From it the engine adapts: which format to teach in (profile prior, then what actually stuck per format, shrunk toward the prior while data is thin, with an exploration slot every fourth session), which game to play (style prior, variety, and results that can beat the prior), how much support a game gives (pair count, timers, a pre-placed item; timers are opt-in, and never offered under 12), and how many review items open a session.
- **Age.** Learners type their age (no bands, no default). The age they give sets the starting support; the younger of that and their class's usual age sets the protections; measured reading pace and answers take over within a session or two. Six internal stages (under 8, 8–11, 12–14, 15–17, 18–59, 60+) set read aloud (the device's own voice, a sentence lit up at a time; on under 12 until reading is measured as fluent, and for slow readers at any age), explain-first, the true/false guess (from 8), confidence ratings (from 8), chips or typing, sitting lengths (5 minutes under 8, up to 15 under 12), larger text and targets (under 12 and 60+, or anyone in settings), a 300 ms tap hold under 12, no clock under 12, no day-streak count under 8, and habit tuning from behaviour only with a guardian's consent under 18. Formats are never matched to age. Evidence and design notes: `docs/age-learning-rd.md` (`src/lib/age.ts`, `src/components/study/read-aloud.tsx`).
- **Motion.** A `data-motion` attribute (lively, balanced or calm) is derived from the profile and age (balanced under 12, calm from 60), can be overridden in settings, and always yields to `prefers-reduced-motion`. Confetti is reserved for the lively profile, checkpoint passes and finished paths.
- **Bangladesh school books (NCTB).** Onboarding offers "School books" next to everyday subjects: pick your class (Class 1 to 11–12), your group from Class 9 (Science, Humanities, Business Studies), then up to three books. The catalogue (`src/lib/curriculum-bd.ts`) holds 54 NCTB books and their 602 chapters, read from NCTB's 2026 textbook PDFs; each book is a subject and each chapter a unit. Lessons are written in English (as the English Version) with a glossary of the Bangla-medium terms; every chapter ends, after its checkpoint, with a board-style creative question (ক knowledge, খ comprehension, গ application, ঘ higher-order) that the learner answers and self-marks against model answers; checkpoints show the board grade a score earns against the learner's target grade. Writing a chapter follows `docs/bangladesh-curriculum-rd.md`; units are validated (Bangla script required in glossaries, a creative question per unit) and scheduled contiguously from chapter 1.
- **Tuned to how you study.** An optional "how you study right now" step (eight statements; never asked under 12) and, above all, what the learner actually does tune the *support* around lessons, never what is taught: an if-then study plan for low follow-through (re-asked after a lapse, with a "start small" prompt), a calmer frame before tests and warmer feedback after misses for test nerves, early wins and progress against one's own past for low confidence, and "Go deeper" plus more format exploration for the curious. Behaviour outweighs the answers within two weeks. Evidence and design notes: `docs/personality-learning-rd.md` (`src/lib/personal.ts`).
- **Habit.** One session per subject per calendar day, with an explicit override capped at two. Streaks allow one rest day a week and a broken streak is shown as a fresh start, never as a lost count; the long pace shows sessions per week instead. Learners can say when they will study, write a one-line summary that is replayed in tomorrow's rewind, and export or import their progress as JSON.

All learner state is client-side, in `localStorage` (`dojolom.learner`, `dojolom.study`, `dojolom.chats`, `dojolom.ideas`). The only server code is the tutor's route, which stores nothing. Setting `dojolom.clock` to a millisecond timestamp pins "now", which the tests use to move between days.

## Structure

- `src/app/page.tsx` – landing page; the hero is the first onboarding question.
- `src/app/start/page.tsx` – the onboarding wizard and the profile + path results view.
- `src/app/study/**` – dashboard, per-subject path, session player, catch-up review and settings (thin route files over `src/components/study/*`).
- `src/lib/learning.ts` – subjects, the learner record, and the legacy style scoring that ranks lesson formats.
- `src/app/learn/page.tsx`, `src/components/chat/*` – the chat app: conversations, the age intake, cards.
- `src/lib/tutor/*` – the tutor: what the learner shapes (`profile.ts`), the per-turn context and its schema (`context.ts`), the tools (`tools.ts`), the instructions (`brief.ts`), the agent and models (`agent.ts`, server only), the catalogue search and lesson reader (`catalogue.ts`, server only), conversations (`threads.ts`), ideas taught outside the checked lessons (`ideas.ts`) and the scripted model the end-to-end tests use (`script-model.ts`).
- `src/lib/study.ts` – the pure study engine: plan builder, memory scheduling and grading, behaviour signals, adaptation, session builder (including mastery correctives), reducers and persistence. `src/lib/memory.ts` is the FSRS-6 memory model and the personal forgetting calibration. `src/lib/clock.ts` is the injectable clock.
- `src/lib/study-store.ts` – the browser store (useSyncExternalStore, storage-event sync) and learner hooks.
- `src/components/study/games/*` – the five mini-games (match pairs, put it in order, true or false, fill the gap, spot it), all keyboard operable and seeded, never random. `src/lib/spot.ts` builds the Spot it round.
- `src/lib/visuals.ts`, `src/content/visuals.json`, `public/visuals/` – the illustration manifest and files, written by `scripts/gen-visuals.mjs`. The app only reads the manifest; a missing picture means words.
- `src/content/<subject>/unit-<n>.ts` – authored content: three concepts per unit, each with steps, story, deep read, example, key points, misconception, quiz, pairs, sequence, true/false and gap-fill material, plus optional `terms` (the words a good explanation uses) and `sayPrompt` for the teach-back. `src/content/validate.ts` enforces the structure; `node scripts/gen-content-index.mjs` regenerates the lazy-import index.
- `src/app/globals.css` – design tokens and the study motion system. Colours each have a job: blue for focus, yellow for attention, green for progress, violet for play, coral for mistakes.

## Run

```bash
npm install
echo "AI_GATEWAY_API_KEY=..." > .env.local   # or link the Vercel project, which authenticates with OIDC
npm run dev
```

Without a key the chat shows that the tutor could not reply (with a retry); the landing page and the lesson player work as before. `DOJOLOM_TUTOR_SCRIPT=1` runs the tutor on a scripted model with no AI calls.

### Illustrations

The content pictures are generated once, at build time, never in the browser:

```bash
node scripts/gen-visuals.mjs --dry-run                          # the plan and the prompts, no model call
AI_GATEWAY_API_KEY=... node scripts/gen-visuals.mjs --subject math --unit 1   # one unit to review the style
AI_GATEWAY_API_KEY=... node scripts/gen-visuals.mjs             # every authored unit not yet pictured
node scripts/gen-visuals.mjs --check                            # every manifest entry has its file
```

`GEMINI_API_KEY` or `OPENAI_API_KEY` work in place of the gateway key; `VISUALS_MODEL` picks the model. Ten images per idea (the idea, five pair terms, four sequence steps), resized to 512 px WebP under `public/visuals/<conceptId>/`, recorded in `src/content/visuals.json`. Re-running fills gaps only; delete a file to regenerate it. Commit the files and the manifest together.

The site needs a server for the tutor's route, so it deploys to Vercel (or any Node host running `next start`), no longer as a static export. `NEXT_PUBLIC_BASE_PATH` still mounts it under a sub-path.

## Test

```bash
npm test            # vitest: engine (scheduler, adaptation, streaks, gate, persistence, a 40-day simulation) and content validation
npm run test:e2e    # builds, runs next start, and drives Playwright through the chat (scripted model), the lesson player, onboarding, rewinds, games, settings
npm run test:all    # lint, typecheck, unit, e2e
```

Validate one content file while writing it:

```bash
UNIT_FILE=src/content/math/unit-1.ts npx vitest run tests/unit/content-file.test.ts
```
