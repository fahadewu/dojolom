# Dojolom

A general learning platform that starts with the learner, not the lesson.

1. **Tell us about you** – age group, subjects, goal, time available.
2. **We find how you learn** – five everyday scenarios produce a learner profile (Mapper, Player, Storyteller, Watcher, Reader, Tinkerer).
3. **You get a personal path** – each subject broken into six units of three ideas, one short session a day.
4. **You learn by doing** – every session rewinds what you learned before, teaches today's idea in your format, drills it with a mini-game, and ends with a quick check. The app tracks what sticks and adapts.

## The study module

`/study` is where a learner actually learns, day by day.

- **Sessions.** Each subject is a path of sessions (18 for the 5 and 15 minute paces, 6 for the long pace). A session is a fixed sequence of segments: *Rewind* (retrieval questions on ideas that are due, then a recap of last time), *Learn* (a guess at the common misconception first, then today's idea as an infographic, guided walkthrough, story, deep read or try-it challenge), *Play* (one of four mini-games mixing today's idea with earlier ones), *Quick check*, and *Done*. The last session of a unit ends with a mixed **checkpoint** instead.
- **Rewind and memory.** Every idea has a Leitner box (0 to 5) and a due date. Correct delayed answers move it up with widening intervals (1, 2, 4, 7, 15, 30 days); mistakes bring it back tomorrow. Same-day answers never promote, because only remembering after a night is evidence. Confident mistakes are reviewed first. A catch-up review (`/study/review`) drills the weakest ideas across all subjects.
- **Behaviour tracking and adaptation.** A bounded event log records segments, answers, games and format switches. From it the engine adapts: which format to teach in (profile prior, then what actually stuck per format, shrunk toward the prior while data is thin, with an exploration slot every fourth session), which game to play (style prior, variety, and results that can beat the prior), how much support a game gives (pair count, timers, a pre-placed item; timers are off by default for children and over-40s), and how many review items open a session.
- **Motion.** A `data-motion` attribute (lively, balanced or calm) is derived from the profile and age group, can be overridden in settings, and always yields to `prefers-reduced-motion`. Confetti is reserved for the lively profile, checkpoint passes and finished paths.
- **Habit.** One session per subject per calendar day, with an explicit override capped at two. Streaks allow one rest day a week; the long pace shows sessions per week instead. Learners can say when they will study, write a one-line summary that is replayed in tomorrow's rewind, and export or import their progress as JSON.

Everything is client-side: the site is a static export and all state lives in `localStorage` (`dojolom.learner`, `dojolom.study`). Setting `dojolom.clock` to a millisecond timestamp pins "now", which the tests use to move between days.

## Structure

- `src/app/page.tsx` – landing page; the hero is the first onboarding question.
- `src/app/start/page.tsx` – the onboarding wizard and the profile + path results view.
- `src/app/study/**` – dashboard, per-subject path, session player, catch-up review and settings (thin route files over `src/components/study/*`).
- `src/lib/learning.ts` – subjects, learning styles, questionnaire and profile scoring.
- `src/lib/study.ts` – the pure study engine: plan builder, Leitner scheduler, behaviour signals, adaptation, session builder, reducers and persistence. `src/lib/clock.ts` is the injectable clock.
- `src/lib/study-store.ts` – the browser store (useSyncExternalStore, storage-event sync) and learner hooks.
- `src/components/study/games/*` – the four mini-games (match pairs, put it in order, true or false, fill the gap), all keyboard operable and seeded, never random.
- `src/content/<subject>/unit-<n>.ts` – authored content: three concepts per unit, each with steps, story, deep read, example, key points, misconception, quiz, pairs, sequence, true/false and gap-fill material. `src/content/validate.ts` enforces the structure; `node scripts/gen-content-index.mjs` regenerates the lazy-import index.
- `src/app/globals.css` – design tokens and the study motion system. Colours each have a job: blue for focus, yellow for attention, green for progress, violet for play, coral for mistakes.

## Run

```bash
npm install
npm run dev
```

`npm run build` produces a static export in `out/`.

## Test

```bash
npm test            # vitest: engine (scheduler, adaptation, streaks, gate, persistence, a 40-day simulation) and content validation
npm run test:e2e    # builds the export, serves it, and runs Playwright through onboarding, sessions, rewinds, games, settings
npm run test:all    # lint, typecheck, unit, e2e
```

Validate one content file while writing it:

```bash
UNIT_FILE=src/content/math/unit-1.ts npx vitest run tests/unit/content-file.test.ts
```
