# How people learn, and the algorithms that schedule it: R&D for Dojolom

*Dojolom study module, October 2026. Builds on `learning-mechanics-rd.md` (learn by doing) and `game-visuals-rd.md` (games and pictures).*

## Why this work

The brief was to research how people learn, using the strongest published evidence. Then the outcomes of the learning algorithms built on that research were to be implemented in Dojolom. The two earlier R&D passes changed *what happens inside a lesson*: guess, try, see, say, and games by choice. This pass is about *how memory is managed across days*:

- when an idea comes back,
- what an answer is taken to mean,
- what happens straight after a miss,
- what happens when a unit is not yet mastered.

That layer was still the first engine's Leitner box with fixed intervals.

Effect sizes are Hedges' *g* or Cohen's *d*, as reported. Each number was checked against the abstract or full text; anything confirmed only through a later paper that cites it is marked "(secondary)".

The Open Executive instance was unreachable during this pass (connection refused). Prioritisation is the engineering team's judgement and should be checked with the CPO persona when it is back.

## Part 1. How people learn: what the evidence says

### The five findings to build on, ranked by strength of evidence

1. **Retrieval with corrective feedback beats restudy.**
   - Lab: *g* = 0.50 across 159 effects (Rowland 2014), and *g* = 0.73 with feedback against 0.39 without. With no feedback and initial success at or below 50%, the benefit vanishes (*g* = 0.03).
   - Classrooms: *g* = 0.50 across 222 classroom studies and 48,478 students (Yang et al. 2021). Corrective feedback adds to it, and so do repeated quizzes.
   - Benefits grow with delays of a day or more, and transfer to new questions at *d* = 0.40 (Pan & Rickard 2018).
   - Learners predict the opposite (Karpicke & Blunt 2011: 84% benefited, 75% predicted they would not).
2. **Spacing across days.**
   - Spaced recall beats massed recall (Cepeda et al. 2006: 839 assessments; 47% vs 37%). Spaced *retrieval* reaches *g* = 0.74 after correcting for publication bias (Latimier, Peyre & Ramus 2021).
   - The best gap grows with how long the memory must last: about 3, 8, 12 and 27 days for 7, 35, 70 and 350 days of retention (Cepeda et al. 2008, 1,350+ learners).
   - A gap that is too short costs far more than one that is too long.
   - Expanding schedules add nothing over uniform ones (*g* = 0.03, k = 54). What matters is not taking the first retrieval too early.
3. **Successive relearning.**
   - Retrieve until correct in one session, then relearn to one correct recall in each of several spaced sessions (Rawson & Dunlosky 2011).
   - In courses: about a letter grade on exams, and over 60% vs under 20% recall weeks later (Rawson, Dunlosky & Sciartelli 2013, secondary).
   - Time to criterion falls with each relearning session, which is the efficiency argument.
4. **Mastery learning: formative test, correctives in a different form, parallel retest.**
   - Mean effect 0.52 across 103 studies, 0.71 at follow-up (Kulik, Kulik & Bangert-Drowns 1990).
   - Larger for weaker students and for higher mastery standards. Bloom's (1984) "1 sigma" for mastery learning rests on this loop.
5. **Interleaving confusable kinds of problem after first exposure.**
   - *g* = 0.42 overall (Brunmair & Richter 2019), and *d* = 0.83 in a preregistered maths classroom trial a month later (Rohrer et al. 2020).
   - It *hurts* for word lists (*g* = −0.39) and does nothing for expository text.

Across all five, judge learning by delayed recall, never by accuracy within the session. Practice performance is an unreliable index of what lasts, and fluency is mistaken for learning (Soderstrom & Bjork 2015).

### The wider picture

| Finding | Evidence | Implication | In Dojolom |
|---|---|---|---|
| Technique utility | Dunlosky et al. (2013): practice testing and distributed practice rated high utility; rereading, highlighting and summarising low. Donoghue & Hattie (2021): distributed practice *d* = 0.85, practice testing 0.74, self-explanation 0.54, interleaving 0.47; deep outcomes 0.26 vs surface 0.60. | Build on spacing and retrieval and let the app schedule them. Expect near transfer, not deep transfer. | Already the spine; this pass makes the schedule evidence-driven. |
| Forgetting follows a power curve | Wixted & Ebbesen (1991, 1997): a power function fits, including for individuals. Murre & Dros (2015): Ebbinghaus replicated; a single exponential fits "far worse". | Model decay as a power law. Forgetting is steepest early, so the first review matters most. | **Built**: FSRS-6 uses a power curve. |
| Sleep consolidates | Diekelmann & Born (2010). Mazza et al. (2016): relearning after a night's sleep halved the practice needed and improved retention at a week and six months. | First relearning the next day, after sleep. | **Built**: the first review is always the next day. One sitting per day was already the rule. |
| Feedback | Wisniewski, Zierer & Hattie (2020): *d* = 0.48 overall, 0.99 for high-information feedback. Van der Kleij et al. (2015): explanation 0.49, correct answer 0.32, right-or-wrong only 0.05. Kluger & DeNisi (1996): over a third of feedback interventions *lowered* performance, worst when aimed at the self. | Explain every answer at once, and bring misses back later for the delayed-feedback benefit. Never praise the person. | Every answer already shows its "why". **Built**: second goes later in the step, and next-day returns. |
| Generation | Bertsch et al. (2007): *d* = 0.40. | Producing beats reading. | Learn-by-doing pass (say it back, type it). |
| Worked examples, fading, expertise reversal | Barbieri et al. (2023): *g* = 0.48 in maths. Renkl & Atkinson (2003): fade the worked steps. Kalyuga (2007): support that helps novices hurts experts. | Example, then completion problem, then independent problem; skip for learners who pass. | Not built; needs authored solution steps (see next steps). |
| Self-explanation | Bisra et al. (2018): *g* = 0.55. | Prompted explanation. | The say-back step. |
| Doing beats watching | Koedinger et al. (2015, 2016): about six times the benefit per unit of doing vs reading, across 12,500+ students. | Short text, frequent questions. | Learn-by-doing pass. |
| Tutoring systems | VanLehn (2011): step-based tutoring *d* = 0.76, close to human tutoring 0.79; answer-based about 0.31 (secondary). Kulik & Fletcher (2016): median 0.66. Ma et al. (2014): *g* = 0.42 vs whole-class teaching. | Step-level help on multi-step items is where the larger gains are. | Dojolom gives answer-level feedback. Step-level hints are a next step. |

### Motivation, habit and metacognition

| Finding | Evidence | Implication | In Dojolom |
|---|---|---|---|
| Lapses must be recoverable | Lally et al. (2010): habits take a median 66 days (18 to 254), and one missed day did not materially affect it. Silverman & Barasch (2023): seeing a broken streak lowers later engagement, less when the streak can be repaired. Sharif & Shu (2017): goals with "emergency reserves" sustain persistence. Milkman et al. (2021, N = 61,293): the best of 54 nudges rewarded *returning* after a miss. | A rest-day reserve; comebacks celebrated, losses never shown. | The rest day existed. **Built**: "Fresh start today" for a returning learner (fresh-start effect, Dai, Milkman & Riis 2014). |
| Learners misjudge what works | Bjork, Dunlosky & Kornell (2013). Kornell & Bjork (2008): 78% did better with spacing, yet 78% rated massing as good or better. Deslauriers et al. (2019): active learners learned more but felt they learned less. | Say why the harder thing is worth it; show prediction against delayed outcome. | Think-first copy and the calibration line. |
| Delayed judgements are accurate | Rhodes & Tauber (2011): judging learning after a delay from the cue alone improves accuracy, *g* = 0.93. | Ask for confidence after a delay, before the options. | Rewind confidence is asked before the options when think-first is on. |
| Autonomy and competence | Patall et al. (2008): choice *d* = 0.30 on intrinsic motivation, best with 2 to 4 choices. Bureau et al. (2022): competence is the strongest correlate (ρ = .58). Deci, Koestner & Ryan (1999): rewards for taking part lower intrinsic motivation (*d* = −0.40). | Small choices; visible mastery; no points for showing up. | Game choice existed. **Built**: the memory strength on the path now reflects a real model. |
| Progress monitoring | Harkin et al. (2016): *d* = 0.40, k = 138. | Show progress towards near goals. | Path, rings and secured ideas. |
| Nudges at scale | Kizilcec et al. (2020, N = 269,169): plan-making had no effect on completion. Gollwitzer & Sheeran (2006): implementation intentions *d* = 0.65 in smaller studies. | Keep plan prompts optional and light. | "When will you study?" stays optional. |
| Growth mindset | Sisk et al. (2018): *d* = 0.08. Macnamara & Burgoyne (2023): *d* = 0.02 in the best studies. Burnette et al. (2023): up to 0.14 for targeted groups. | Effort-and-strategy wording costs nothing; no mindset module. | Not built, deliberately. |
| Retrieval and stress | Smith, Floerke & Thomas (2016): retrieved material survives acute stress; restudied material does not. Agarwal et al. (2014): 72% of students less nervous. | Present checks as low-stakes practice. | Already the tone. |

## Part 2. The learning algorithms and what they achieved

Two families of algorithm turn the findings above into a schedule. *Memory models* predict the chance a learner still recalls an item and decide when to ask again. *Learner models* estimate what has been mastered.

### Memory models

| Algorithm | How it works | Measured outcome |
|---|---|---|
| Pimsleur (1967) graduated intervals | A fixed ladder from seconds to years. | MAE 0.445 on Duolingo data, worse than predicting the average (0.175) (Settles & Meeder 2016). |
| Leitner (1972) boxes | Move up a box when right, down when wrong; fixed interval per box. This is what Dojolom used. | MAE 0.235 on 12.9M Duolingo traces, also worse than the constant baseline (Settles & Meeder 2016). No outcome trial found. |
| SM-2 (Wozniak 1990) | An ease factor multiplies the interval. | On the open benchmark (10k users) log loss 0.72, worse than the constant baseline (0.39). |
| Half-life regression (Settles & Meeder 2016, Duolingo) | Recall = 2^(−Δ/h), half-life learned from features. | MAE 0.128, at least 45% below Leitner. A/B: a later HLR variant gained +12% next-day activity over an earlier one. The often-quoted 12% is *not* a gain over Leitner. |
| ACT-R spacing model (Pavlik & Anderson 2005, 2008) | Activation with decay that depends on spacing; practise items when activation drops to a threshold. | 66% vs 35% recall for flashcards a week later (*d* = 0.98). |
| DASH (Lindsey et al. 2014) | Logistic model of ability, difficulty and practice history, fitted across students. | In a semester-long classroom study: +16.5% over massed review and +10.0% over generic spacing on a test 28 days after the semester (*d* = 1.42 and 0.88). |
| ARTS (Mettler, Massey & Kellman 2016) | Within-session priority from errors and response time: a slow right answer comes back sooner, a fast one later. | Adaptive 0.42 vs fixed schedules 0.30 to 0.31 a week later (*d* ≈ 0.56). |
| MEMORIZE (Tabibian et al. 2019) | Optimal review intensity from an exponential memory model. | Lower forgetting in a Duolingo natural experiment; no randomised trial. |
| **FSRS** (Ye, Su & Cao 2022; Su et al. 2023; the open-source FSRS-6) | Difficulty, Stability, Retrievability. A power forgetting curve; each review updates stability by how hard recall was. Schedules for a target chance of recall. | Best non-neural scheduler on the open benchmark: FSRS-6 log loss 0.346, RMSE 0.065, AUC 0.70, over 350M reviews from 10k users. DASH scores 0.368, ACT-R 0.403, HLR 0.469 and the constant 0.395. **With default weights alone** FSRS-6 scores 0.366, still better than SM-2, HLR, ACT-R and the constant. |

Three outcomes shaped the design:

1. **FSRS-6 with its published default weights beats every simpler model, even unfitted.** The full optimiser needs data Dojolom does not have: the reference implementation returns the defaults below 8 training items and only fits the first four weights below 64.
2. **FSRS-6 is not calibrated for same-day reviews.** Including them, it falls below the constant baseline (0.384 vs 0.382). Same-day answers should not drive the model.
3. **Personalised parameters help** (0.346 fitted vs 0.366 default). Most of the gain comes from fitting a few weights.

### Learner models

| Model | What it does | Measured outcome, and fit for Dojolom |
|---|---|---|
| Bayesian Knowledge Tracing (Corbett & Anderson 1995) | Four parameters (prior, learn, guess, slip). Mastery at P(known) ≥ 0.95 in Cognitive Tutors. | Assumes no forgetting. On nine datasets it trails logistic models (Gervet et al. 2020). |
| Performance Factors Analysis (Pavlik, Cen & Koedinger 2009) | A logistic model over counts of successes and failures. | Competitive on moderate data; needs population fitting. |
| Elo (Pelánek 2016) | Ability and item difficulty updated after each answer; for multiple choice, P = 1/k + (1 − 1/k)σ(θ − d). | Good cold start *across learners*. With one learner offline, item difficulty cannot be learned. |
| Deep Knowledge Tracing (Piech et al. 2015) | An LSTM over the answer sequence. | Early gains were partly a data artefact. Classic models extended with forgetting match it (Khajah, Lindsey & Mozer 2016). It leads only on large datasets (Gervet et al. 2020). |
| IRT, 3PL | P = c + (1 − c)σ(a(θ − b)); c is the guessing floor. | The standard correction for multiple choice. |

The outcome for a single-learner, offline app: no population model can be fitted. Learner-level estimates must come from the memory model and the learner's own answers, corrected for guessing.

### Choice

**FSRS-6, ported into the pure engine** (about 60 lines, no dependency, deterministic, on the pinnable clock). It runs with the published default weights and is adapted to how Dojolom gathers evidence:

- **Same-day answers** never drive the model beyond setting the first impression.
- **Recognition is weaker evidence than recall.** A right answer picked from visible options is not the self-graded recall FSRS was trained on.
- **Guessing is corrected** when fitting the learner.
- **Personalisation is cautious**: one stability multiplier, shrunk towards 1.

## Audit of the engine before this pass

| Area | What it did | What the evidence says | Gap |
|---|---|---|---|
| Review schedule | Leitner boxes with fixed intervals 1, 2, 4, 7, 15, 30 days. A correct, sure answer on or after the due date moved one box up; a sure miss halved the box. | On 12.9M Duolingo traces, Leitner predicted recall worse than simply guessing the average (Settles & Meeder 2016), and every fitted model since does better. Recall depends on how long the memory lasts *and* how long since it was last used. A success when recall was already hard builds more than an early one. | Every idea climbed the same ladder at the same speed. An answer three weeks overdue counted the same as one on the due day. Difficulty was ignored. |
| Evidence weighting | Right or wrong, plus "sure" or "not sure". | Retrieval fluency (response time) predicts later retention and drives the best adaptive sequencers. Multiple choice can be guessed. | Fluency (`thinkMs`) was logged but never used. A true-or-false guess counted as much as a four-option answer. |
| Personalisation of memory | None. Every learner forgot at the same rate. | Personalised parameters beat defaults once there is enough data. | The schedule could not learn that this learner forgets slowly, or quickly. |
| Same-day answers | Never promoted, and a miss dropped the box to 0. | Performance during a session is a poor index of what lasts (learning vs performance). | Kept. The new model encodes the same rule: one move a day, on the worst evidence. |
| Rewind misses | The question was answered wrong, the "why" was shown, and the learner moved on. The idea came back tomorrow. | Successive relearning: retrieve after feedback until right once, every session. Repeated retrieval, not restudy, drives the benefit. | No second retrieval in the sitting. The recap only covered yesterday's ideas, not the one just missed. |
| Quick check misses | Same: the miss was noted and the check moved on. | Same. | Same. |
| Failed unit checkpoint | The result was stored and the path moved on. The rewind would pick the ideas up eventually. | Mastery learning (formative test, correctives in a *different* form, parallel retest) is one of the most effective classroom structures measured. | No corrective and no retest. "Nearly there" had no follow-through. |
| Review order | Last missed, confident mistakes, most mistakes, most overdue, lowest box. | Review what is closest to being forgotten. Confident errors return unless retested soon. | The order used raw counts and days, not the chance of recall. |
| Broken streak | "Start a streak" (no loss shown). | Show comebacks, never lost counts. A fresh start helps people return. | Already close. A returning learner now sees "Fresh start today". |

## Design decisions

1. **An FSRS-6 memory per idea replaces the Leitner box.** Stability, difficulty and the date of the last review are stored. The chance of recall right now is computed from them with FSRS-6's power forgetting curve. The next review is set for when that chance is expected to fall to 90%. The default weights are the published FSRS-6 defaults, so the model starts from hundreds of millions of real reviews rather than a hand-made ladder.
2. **Answers are graded from the evidence they carry.**
   - Wrong is *Again* (a lapse). Right but "not sure" is *Hard*. Right and sure is *Good*.
   - Right, sure, produced before the options were shown, and among the quickest fifth of the learner's own past think-first answers, is *Easy*: fluent retrieval, as in ARTS, kept rare.
   - A *Good* picked from options that were visible from the start is *recognised*, not recalled. It earns the Hard-sized stability gain but keeps Good's difficulty: the evidence is thinner, the idea is not harder. This is a Dojolom extension to FSRS, and it matters because FSRS's weights were fitted to recall that learners graded themselves.
   - A tap in a game is too weak to move a memory either way. A game miss on a later day asks for a proper check tomorrow without touching the model.
3. **One move a day, on the worst evidence.** The memory moves at most once per day. Every graded answer that day is folded in as "the worst grade so far", recomputed from the state before the day's first answer. A later right answer (a game, a checkpoint, a second go) cannot push the schedule out. A later miss still counts, without stacking penalties.
4. **The learning day only sets the starting point.** Answers on the day an idea is taught choose its initial stability (worst grade, never above *Good*). The first review is always the next day, after sleep. A miss on any later day also comes back the next day, so a confident error is retested soon after its correction. No gap exceeds 90 days until the weights are fitted to Dojolom's own items. The flat FSRS-6 curve would otherwise schedule a fourth review five months out from flashcard-trained defaults.

   An idea answered right each time now comes back after 1, 5, 24 and 90 days. One that is missed on its second review comes back after 1, 2, 4, 11 and 25 days. This matches the spacing evidence: the right gap grows with how long the idea must last, and erring long is the cheaper mistake.
5. **A personal forgetting scale, fitted conservatively.** The day's first graded answer after the learning day is a clean test of forgetting. It is logged with the days elapsed, the stability before, and the item's guess rate. When a sitting ends, one multiplier on stability is fitted to those tests by maximum a posteriori, using P(right) = guess + (1 − guess) × R. The prior pulls it to 1 and nothing moves before 20 tests. Simulations in the unit tests set those numbers: a weaker prior let a hundred answers drag an average learner to 0.6. The scale stretches or shrinks intervals and is used when computing recall at review time.
6. **Retrieve until right once, in every sitting.** A missed rewind question returns at the end of the rewind as a different kind of question on the same idea. If that is missed too, the idea joins the recap so it is restudied, not just marked wrong. The quick check does the same for missed questions, at most two, before its closing misconception item. The checkpoint does not, because it is the test.
7. **Mastery learning's corrective loop after a failed checkpoint, with a higher bar.** The checkpoint pass mark is now 5 of 6 for everyone (it was 4 of 6 unless the goal was school). Mastery programmes gain more with a high standard, and the corrective is what makes a high bar fair. The three-question sprint checkpoint keeps 2 of 3. The retake allows at most one miss in four. The checkpoint records which ideas it missed. The next new session in the subject opens, after the rewind, with a short re-teach of the weakest missed idea (two under the deep pace). It uses a format the idea was *not* first taught in, then asks the learner to rebuild a key point. A retake follows on the missed ideas only, with fresh questions. Passing secures the unit. The game makes room, so the sitting stays about the same length. There is one retake per unit: what still slips is left to the spaced rewinds, so the path is never blocked.
8. **Review what is closest to being forgotten, and do not let reviews pile up.** The rewind grows by one item, within the pace's cap, when more than twice the cap is due. New ideas arriving faster than reviews clear them is where learning collapses (Reddy et al. 2016). The rewind and the catch-up review take ideas missed last time first, then confident mistakes, then the lowest chance of recall. The path's strength bar shows how long an idea lasts (log scale, full at two months), drained as recall falls below the target. "Secured" means the idea would still be recalled nine times in ten a week after its last review.
9. **Comebacks, not losses.** A learner who has studied before and is back at zero sees "Fresh start today" instead of a lost count.

## What shipped

- **Memory model** (`src/lib/memory.ts`, new): the FSRS-6 forgetting curve, intervals at a target retention (capped at 90 days), initial state, review update with the recognition extension, and the personal calibration (`fitScale`, `logLikelihood`). Pure; no clock, randomness or storage. The 21 default weights and every formula were checked against py-fsrs 6.3.2, ts-fsrs 5.4.2, fsrs-rs and the algorithm wiki; all agree.
- **Engine** (`src/lib/study.ts`):
  - `MemoryState` now holds `stability`, `difficulty`, `reviewedOn`, `due` and `lastGrade` instead of `box`.
  - `gradeAnswer` turns evidence into a grade, and `recordAnswer` applies the once-a-day, worst-grade rule.
  - `recallChance`, `memoryLevel`, `strength` and `isSecured` are rebuilt on the new model, and `dueConcepts` sorts by chance of recall.
  - `retryItem` and `guessRate` support second goes and guess correction. `reviewLoad` grows with the backlog.
  - `pendingCorrective`, and `buildSession` correctives (a corrective `learn` and a `retake` checkpoint).
  - `checkpointResult` records `missed` and `retake`.
  - Answer events carry `grade` and, on clean tests, `el`, `s` and `guess`. `Signals.fastThinkMs` holds the learner's fluency threshold.
  - `forgettingObservations` and `recalibrate` run when a sitting or catch-up ends, and `state.memoryScale` holds the result.
  - Migrations translate every saved Leitner memory (box interval becomes stability, miss rate becomes difficulty, the clock starts one interval before the due date) and validate the new fields.
- **Rewind** (`segments/rewind.tsx`): second goes from another angle, and twice-missed ideas added to the recap.
- **Quick check and checkpoint** (`segments/check.tsx`): second goes in the check, missed ideas reported by the checkpoint, and retake wording.
- **Learn** (`segments/learn.tsx`): a "Second look, a different way in" label on corrective lessons.
- **Session player, path, catch-up review, dashboard**: pass the guess rate, think time and personal scale through; label "Second look" and "Unit N retake" on the start screen; fresh-start streak wording.
- **Tests**:
  - Unit tests: `tests/unit/memory.test.ts` (new: curve, updates, calibration recovery on simulated learners, guess discounting, bounds); `tests/unit/study.test.ts` (memory rules rewritten, plus grading, second-go items, calibration logging and refit, correctives at every pace, migrations).
  - End-to-end: a new test misses a rewind question, takes the second go, sees the corrective in a different format and the retake, and finds the unit secured on the path.

## Deliberately not built

- **Training the full FSRS parameter vector per learner.** The reference optimiser keeps the defaults below 8 training items and fits only the four initial stabilities below 64. Dojolom has a few reviews per idea across tens of ideas. One shrunk multiplier is what the data can support. If a server-side dataset ever exists, population parameters fitted to Dojolom's own items (concept-level multiple choice, not flashcards) are the next step.
- **Knowledge tracing (BKT, DKT).** BKT with fixed, bounded parameters could judge whether a brand-new idea is mastered within its first sitting. But it assumes nothing is forgotten, and an in-session verdict is exactly the performance measure the learning-vs-performance evidence warns against. The next-day review and the unit checkpoint already judge mastery from delayed evidence. Deep models need large populations and, on small data, do no better than simpler ones.
- **Elo or IRT item difficulty.** Estimating how hard each question is needs answers from many learners. A single-learner, offline app cannot calibrate items. The support ladder keeps aiming at the 85% band from the learner's own rolling accuracy.
- **A hard mastery gate.** Bloom-style programmes hold learners until they reach mastery. Here, a second failure does not block the path: blocking a self-paced, voluntary learner risks losing them altogether (habit and motivation evidence), and spaced rewinds keep returning to the idea.
- **Confidence scales finer than sure / not sure, and free-recall self-grading.** These give more signal but are gamed offline and add friction. Fluency from the think-first gate provides the extra grade instead.
- **Growth-mindset messaging, streak wagers and planning-prompt nudges.** Mindset interventions average near zero on achievement. Planning prompts had no effect on completion at MOOC scale. Wagers need stakes the app does not hold.

## How to tell whether it works

The event log now carries what is needed:

- **Calibration of the memory model.** On clean tests (`el`, `s`, `guess` present), compare predicted P(right) with observed accuracy, binned by predicted value. Track log loss over time. The scale should move the curve towards the diagonal.
- **Retention at target.** The share of clean tests answered right should sit near 90%, adjusted for guessing. Well above that means reviews are too early (wasted time); well below means they are too late.
- **Workload.** Reviews per idea per month, compared with the Leitner baseline, at equal or better delayed accuracy.
- **Second goes.** Accuracy on second goes, and next-day accuracy on ideas that had a second go versus ideas missed before second goes existed.
- **Correctives.** Retake pass rate. Delayed accuracy on corrected ideas over the following two weeks, compared with ideas that failed a checkpoint before correctives shipped. The share of correctives abandoned mid-sitting.
- **Comebacks.** Return rate within seven days after a broken streak.

## Next steps

1. **Fit the weights to Dojolom's own items.** Once the event log of a few hundred learners exists (export or opt-in sync), fit the four initial stabilities first and then the full vector. Multiple-choice concepts are not flashcards. Lift the 90-day cap once that is done.
2. **Add worked examples with fading to maths units 1 to 3.** Use an optional `worked` field: example, then completion problem, then independent problem. Skip it for learners who pass the check. This is the step-level support behind the strongest tutoring results.
3. **Interleave confusable problem types in maths.** Once two units are learned, mix their problem types in the check. Do not interleave vocabulary in languages, where blocking wins.
4. **Raise the first-day criterion towards three correct recalls.** Successive relearning recommends it. The quick check already asks three questions plus the misconception; making the second goes a criterion rather than a single retry is the next increment.
5. **Show predictions against delayed results.** Show "you felt sure on Tuesday; on Friday you remembered it", built from the calibration log.
6. **Ask Open Executive (the CPO persona) for prioritisation** when it is running again.

## Sources

**Learning science**
- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013). [Improving students' learning with effective learning techniques](https://doi.org/10.1177/1529100612453266). *Psychological Science in the Public Interest*, 14(1).
- Donoghue & Hattie (2021). [A meta-analysis of ten learning techniques](https://doi.org/10.3389/feduc.2021.581216). *Frontiers in Education*, 6.
- Carpenter, Pan & Butler (2022). [The science of effective learning with spacing and retrieval practice](https://doi.org/10.1038/s44159-022-00089-1). *Nature Reviews Psychology*, 1.
- Rowland (2014). [The effect of testing versus restudy on retention](https://doi.org/10.1037/a0037559). *Psychological Bulletin*, 140(6).
- Adesope, Trevisan & Sundararajan (2017). [Rethinking the use of tests](https://doi.org/10.3102/0034654316689306). *Review of Educational Research*, 87(3).
- Yang, Luo, Vadillo, Yu & Shanks (2021). [Testing (quizzing) boosts classroom learning](https://doi.org/10.1037/bul0000309). *Psychological Bulletin*, 147(4).
- Roediger & Karpicke (2006). [Test-enhanced learning](https://doi.org/10.1111/j.1467-9280.2006.01693.x). *Psychological Science*, 17(3).
- Karpicke & Blunt (2011). [Retrieval practice produces more learning than elaborative studying with concept mapping](https://doi.org/10.1126/science.1199327). *Science*, 331.
- Pan & Rickard (2018). [Transfer of test-enhanced learning](https://doi.org/10.1037/bul0000151). *Psychological Bulletin*, 144(7).
- Cepeda, Pashler, Vul, Wixted & Rohrer (2006). [Distributed practice in verbal recall tasks](https://doi.org/10.1037/0033-2909.132.3.354). *Psychological Bulletin*, 132(3).
- Cepeda, Vul, Rohrer, Wixted & Pashler (2008). [Spacing effects in learning: a temporal ridgeline of optimal retention](https://doi.org/10.1111/j.1467-9280.2008.02209.x). *Psychological Science*, 19(11).
- Latimier, Peyre & Ramus (2021). [A meta-analytic review of the benefit of spacing out retrieval practice episodes on retention](https://doi.org/10.1007/s10648-020-09572-8). *Educational Psychology Review*, 33.
- Karpicke & Roediger (2007). [Expanding retrieval practice promotes short-term retention, but equally spaced retrieval enhances long-term retention](https://doi.org/10.1037/0278-7393.33.4.704). *JEP: Learning, Memory, and Cognition*, 33(4).
- Rawson & Dunlosky (2011). [Optimizing schedules of retrieval practice for durable and efficient learning](https://doi.org/10.1037/a0023956). *JEP: General*, 140(3).
- Rawson, Dunlosky & Sciartelli (2013). [The power of successive relearning](https://doi.org/10.1007/s10648-013-9240-4). *Educational Psychology Review*, 25(4).
- Rawson & Dunlosky (2022). [Successive relearning: an underexplored but potent technique](https://doi.org/10.1177/09637214221100484). *Current Directions in Psychological Science*, 31(4).
- Brunmair & Richter (2019). [Similarity matters: a meta-analysis of interleaved learning and its moderators](https://doi.org/10.1037/bul0000209). *Psychological Bulletin*, 145(11).
- Rohrer, Dedrick, Hartwig & Cheung (2020). [A randomized controlled trial of interleaved mathematics practice](https://doi.org/10.1037/edu0000367). *Journal of Educational Psychology*, 112(1).
- Wisniewski, Zierer & Hattie (2020). [The power of feedback revisited](https://doi.org/10.3389/fpsyg.2019.03087). *Frontiers in Psychology*, 10.
- Kluger & DeNisi (1996). [The effects of feedback interventions on performance](https://doi.org/10.1037/0033-2909.119.2.254). *Psychological Bulletin*, 119(2).
- Hattie & Timperley (2007). [The power of feedback](https://doi.org/10.3102/003465430298487). *Review of Educational Research*, 77(1).
- Butler, Karpicke & Roediger (2007). [The effect of type and timing of feedback on learning from multiple-choice tests](https://doi.org/10.1037/1076-898X.13.4.273). *JEP: Applied*, 13(4).
- Van der Kleij, Feskens & Eggen (2015). [Effects of feedback in a computer-based learning environment on students' learning outcomes](https://doi.org/10.3102/0034654314564881). *Review of Educational Research*, 85(4).
- Bloom (1984). [The 2 sigma problem](https://doi.org/10.3102/0013189X013006004). *Educational Researcher*, 13(6).
- Kulik, Kulik & Bangert-Drowns (1990). [Effectiveness of mastery learning programs: a meta-analysis](https://doi.org/10.3102/00346543060002265). *Review of Educational Research*, 60(2).
- Soderstrom & Bjork (2015). [Learning versus performance: an integrative review](https://doi.org/10.1177/1745691615569000). *Perspectives on Psychological Science*, 10(2).
- Bjork & Bjork (2011). [Making things hard on yourself, but in a good way](https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf). In *Psychology and the Real World*.
- Bertsch, Pesta, Wiscott & McDaniel (2007). [The generation effect: a meta-analytic review](https://doi.org/10.3758/BF03193441). *Memory & Cognition*, 35(2).
- Barbieri, Miller-Cotto, Clerjuste & Chawla (2023). [A meta-analysis of the worked examples effect on mathematics performance](https://doi.org/10.1007/s10648-023-09745-1). *Educational Psychology Review*, 35.
- Renkl & Atkinson (2003). [Structuring the transition from example study to problem solving](https://doi.org/10.1207/S15326985EP3801_3). *Educational Psychologist*, 38(1).
- Kalyuga (2007). [Expertise reversal effect and its implications for learner-tailored instruction](https://doi.org/10.1007/s10648-007-9054-3). *Educational Psychology Review*, 19.
- Bisra, Liu, Nesbit, Salimi & Winne (2018). [Inducing self-explanation: a meta-analysis](https://doi.org/10.1007/s10648-018-9434-x). *Educational Psychology Review*, 30.
- Koedinger, Kim, Jia, McLaughlin & Bier (2015). [Learning is not a spectator sport](https://doi.org/10.1145/2724660.2724681). *L@S '15*; and Koedinger, McLaughlin, Jia & Bier (2016). [Is the doer effect a causal relationship?](https://doi.org/10.1145/2883851.2883957) *LAK '16*.
- VanLehn (2011). [The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems](https://doi.org/10.1080/00461520.2011.611369). *Educational Psychologist*, 46(4).
- Kulik & Fletcher (2016). [Effectiveness of intelligent tutoring systems](https://doi.org/10.3102/0034654315581420). *Review of Educational Research*, 86(1).
- Ma, Adesope, Nesbit & Liu (2014). [Intelligent tutoring systems and learning outcomes](https://doi.org/10.1037/a0037123). *Journal of Educational Psychology*, 106(4).
- Murre & Dros (2015). [Replication and analysis of Ebbinghaus' forgetting curve](https://doi.org/10.1371/journal.pone.0120644). *PLOS ONE*, 10(7).
- Wixted & Ebbesen (1991). [On the form of forgetting](https://doi.org/10.1111/j.1467-9280.1991.tb00175.x). *Psychological Science*, 2(6); and (1997). [Genuine power curves in forgetting](https://doi.org/10.3758/BF03211316). *Memory & Cognition*, 25(5).
- Diekelmann & Born (2010). [The memory function of sleep](https://doi.org/10.1038/nrn2762). *Nature Reviews Neuroscience*, 11.
- Mazza et al. (2016). [Relearn faster and retain longer: along with practice, sleep makes perfect](https://doi.org/10.1177/0956797616659930). *Psychological Science*, 27(10).

**Motivation, habit and metacognition**
- Gollwitzer & Sheeran (2006). [Implementation intentions and goal achievement](https://doi.org/10.1016/S0065-2601(06)38002-1). *Advances in Experimental Social Psychology*, 38.
- Lally, van Jaarsveld, Potts & Wardle (2010). [How are habits formed](https://doi.org/10.1002/ejsp.674). *European Journal of Social Psychology*, 40.
- Silverman & Barasch (2023). [On or off track: how (broken) streaks affect consumer decisions](https://doi.org/10.1093/jcr/ucac029). *Journal of Consumer Research*, 49.
- Sharif & Shu (2017). [The benefits of emergency reserves](https://doi.org/10.1509/jmr.15.0231). *Journal of Marketing Research*, 54.
- Milkman et al. (2021). [Megastudies improve the impact of applied behavioural science](https://doi.org/10.1038/s41586-021-04128-4). *Nature*, 600.
- Dai, Milkman & Riis (2014). [The fresh start effect](https://doi.org/10.1287/mnsc.2014.1901). *Management Science*, 60.
- Patall, Cooper & Robinson (2008). [The effects of choice on intrinsic motivation and related outcomes](https://doi.org/10.1037/0033-2909.134.2.270). *Psychological Bulletin*, 134(2).
- Bureau, Howard, Chong & Guay (2022). [Pathways to student motivation](https://doi.org/10.3102/00346543211042426). *Review of Educational Research*, 92(1).
- Deci, Koestner & Ryan (1999). [A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation](https://doi.org/10.1037/0033-2909.125.6.627). *Psychological Bulletin*, 125(6).
- Sisk et al. (2018). [To what extent and under which circumstances are growth mind-sets important to academic achievement?](https://doi.org/10.1177/0956797617739704) *Psychological Science*, 29; Macnamara & Burgoyne (2023), [*Psychological Bulletin*, 149](https://doi.org/10.1037/bul0000352); Burnette et al. (2023), [*Psychological Bulletin*, 149](https://doi.org/10.1037/bul0000368).
- Bjork, Dunlosky & Kornell (2013). [Self-regulated learning: beliefs, techniques, and illusions](https://doi.org/10.1146/annurev-psych-113011-143823). *Annual Review of Psychology*, 64.
- Kornell & Bjork (2008). [Learning concepts and categories: is spacing the "enemy of induction"?](https://doi.org/10.1111/j.1467-9280.2008.02127.x) *Psychological Science*, 19.
- Deslauriers et al. (2019). [Measuring actual learning versus feeling of learning](https://doi.org/10.1073/pnas.1821936116). *PNAS*, 116.
- Rhodes & Tauber (2011). [The influence of delaying judgments of learning on metacognitive accuracy](https://doi.org/10.1037/a0021705). *Psychological Bulletin*, 137(1).
- Harkin et al. (2016). [Does monitoring goal progress promote goal attainment?](https://doi.org/10.1037/bul0000025) *Psychological Bulletin*, 142(2).
- Kizilcec et al. (2020). [Scaling up behavioral science interventions in online education](https://doi.org/10.1073/pnas.1921417117). *PNAS*, 117.
- Smith, Floerke & Thomas (2016). [Retrieval practice protects memory against acute stress](https://doi.org/10.1126/science.aah5067). *Science*, 354; Agarwal et al. (2014), [*JARMAC*, 3](https://doi.org/10.1016/j.jarmac.2014.07.002).

**Algorithms**
- Settles & Meeder (2016). [A trainable spaced repetition model for language learning](https://aclanthology.org/P16-1174.pdf). *ACL*.
- Lindsey, Shroyer, Pashler & Mozer (2014). [Improving students' long-term knowledge retention through personalized review](https://doi.org/10.1177/0956797613504302). *Psychological Science*, 25(3).
- Tabibian et al. (2019). [Enhancing human learning via spaced repetition optimization](https://arxiv.org/abs/1712.01856). *PNAS*, 116(10).
- Reddy, Labutov, Banerjee & Joachims (2016). [Unbounded human learning: optimal scheduling for spaced repetition](https://arxiv.org/abs/1602.07032). *KDD*.
- Pavlik & Anderson (2008). [Using a model to compute the optimal schedule of practice](http://act-r.psy.cmu.edu/wordpress/wp-content/uploads/2012/12/791xap-14-2-101.pdf). *JEP: Applied*, 14(2).
- Mettler, Massey & Kellman (2016). [A comparison of adaptive and fixed schedules of practice](https://pmc.ncbi.nlm.nih.gov/articles/PMC6028005/). *JEP: General*, 145(7).
- Ye, Su & Cao (2022). [A stochastic shortest path algorithm for optimizing spaced repetition scheduling](https://doi.org/10.1145/3534678.3539081). *KDD*; Su, Ye et al. (2023), *IEEE TKDE*, 35(10).
- FSRS-6 formulas and default weights: [the algorithm wiki](https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm), [py-fsrs 6.3.2](https://github.com/open-spaced-repetition/py-fsrs/blob/9446cb06605c597a063aeee49f7d188d42e34dc2/fsrs/scheduler.py), ts-fsrs 5.4.2 and fsrs-rs, read 2026-10-15.
- [srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark), README of 2026-09-18 (9,999 collections, 349,923,850 reviews).
- Corbett & Anderson (1995). Knowledge tracing: modeling the acquisition of procedural knowledge. *User Modeling and User-Adapted Interaction*, 4(4).
- Pelánek (2016). [Applications of the Elo rating system in adaptive educational systems](https://www.fi.muni.cz/~xpelanek/publications/CAE-elo.pdf). *Computers & Education*, 98.
- Khajah, Lindsey & Mozer (2016). How deep is knowledge tracing? *EDM*; Gervet, Koedinger, Schneider & Mitchell (2020). When is deep learning the best approach to knowledge tracing? *Journal of Educational Data Mining*, 12(3).
