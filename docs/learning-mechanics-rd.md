# Learning mechanics R&D: making the session interactive

*Dojolom study module, September 2026.*

## Why this work

Dojolom already had the structural pieces the learning-science literature asks for: spaced retrieval with a Leitner schedule, interleaving of earlier ideas into games and rewinds, a misconception guess before each idea, confidence ratings, and adaptation of format and game to the learner. What it did not have was enough *production*. Most of the time in a session, the learner was reading, tapping through, or recognising an answer among options. This document records the evidence review, the audit of the old session against it, the design decisions, and what shipped.

The Open Executive instance was unreachable when this was planned, so prioritisation below is the engineering team's judgement and should be checked with the CPO persona when it is back (`oe status`, `oe start`).

## What the evidence says

The review looked for techniques with (a) meta-analytic support, (b) a mechanism that survives in a single-user, offline, static app, and (c) a way to run from content we already have. Effect sizes are Hedges' *g* unless stated.

| Technique | Evidence | What it means for a session |
|---|---|---|
| **Pretesting / prequestions** (guess before instruction) | *g* = 0.34 (Boustani & Shanks 2022, k = 45) to 0.54 (St. Hilaire et al. 2024, k = 97); *g* = 0.66 on the pretested content itself. Robust across adulthood. | Guessing before the explanation is worth doing on the *actual* idea, not only the misconception. Learners need to be told why it helps, because they believe it does not. |
| **Hypercorrection** (confident errors, once corrected, are remembered best) | Butterfield & Metcalfe 2001; Butler, Fazio & Marsh 2011: high-confidence errors are corrected most, *but* return after a week unless tested again soon after feedback. | Ask for confidence on the guess, correct it, and re-test the same idea before the sitting ends. Confident misses should lead the next rewind. |
| **Problem solving before instruction** (productive failure) | *g* = 0.36 (Sinha & Kapur 2021, 53 studies, 166 comparisons), up to *d* = 0.58 with high design fidelity. Reverses for young children (grades 2 to 5), where instruction first works better. | Adults, teens and over-40s try the example problem before the explanation. Children do not; they keep instruction first. |
| **Self-explanation and learning by teaching** (generative production) | Self-explanation *g* = 0.55 (Bisra et al. 2018, 69 effects); *g* = 0.46 in digital environments (2025 three-level meta-analysis, 204 effects). Explaining to others beats restudy, summarising and practice tests (Fiorella; Kobayashi meta-analysis). | Put a generative step *inside* the lesson, before the model answer is shown, and give feedback on it. An optional box on the finish screen is too late and too easy to skip. |
| **ICAP** (Interactive > Constructive > Active > Passive) | Chi & Wylie 2014. The ordering is contested at the margins (npj Science of Learning 2023) but the passive-to-constructive step is well supported. | Every segment should have a constructive move: predicting, producing, explaining, rebuilding. Reading and tapping "next" are the floor, not the lesson. |
| **Retrieval effort** (recall over recognition) | Cued and free recall produce better later retention than recognition (retrieval effort hypothesis; desirable difficulties, Bjork). Covert retrieval is as effective as overt. | Once an idea is holding, hide the options until the learner has produced an answer in their head. Multiple choice then checks rather than prompts. |
| **Calibration feedback** (metacognition) | Feedback on confidence-versus-outcome reduces miscalibration (2025 CHI RCT; Steyvers & Peters 2026 review). | Confidence ratings only pay off if the learner is shown what they meant. One line per sitting is enough. |
| **Faded worked examples** | Scaffolding *g* = 0.78 with fading as the moderator that matters (2025 meta-analysis, 55 effects); concept-oriented fading beats position-oriented. | Not built yet: it needs authored step-by-step solutions. Listed under next steps. |

Product reference points: Brilliant's lessons pretest on the material and reveal the procedure only after the learner has tried, then make wrong-answer explanations interactive. Duolingo pairs interleaving within a session with spacing across days, which Dojolom already does.

## Audit of the old session

Steady pace, one idea a day, about fifteen minutes.

| Segment | What the learner did | ICAP mode | Gap |
|---|---|---|---|
| Rewind | Multiple-choice on due ideas, then a recap | Active (recognition) | Options were visible from the start, so the answer could be recognised without being retrieved. The recap was read. |
| Learn: guess | True or false on the misconception | Constructive | Good, but the only guess in the lesson. |
| Learn: body | Infographic, walkthrough, story or deep read | Passive to Active | The one "try it" format (challenge) was the only format that asked for anything. |
| Learn: key points | Read three sentences | Passive | The model answer was handed over before the learner had produced one. |
| Play | A mini-game on today's idea and earlier ones | Active | Fine as a drill. |
| Quick check | Multiple-choice, then the misconception again | Active | Recognition only; confidence was collected but never reflected back. |
| Done | Optional "in your own words" box | Constructive (rarely used) | Too late in the sitting, no feedback, easy to skip. |

## Design decisions

1. **Every Learn is a loop of doing: Guess, Try, See, Say.** Guess the misconception (kept). Try the example before it is explained (new, not for children, not in the five-minute pace). See the idea in the chosen format with the misconception corrected (kept). Say it back before the key points are shown, then compare (new).
2. **Two ways to say it back.** Typed, for a friend who missed today, with live feedback on which key terms the explanation uses. Or rebuilt from chips: a key point cut into four to seven pieces with two decoys cut from the misconception, checked once, corrected once, then revealed. Children always get chips. A learner who skips the typing twice in a row gets chips next time, so the generative step happens either way.
3. **Guesses and teach-backs are signals, not memory evidence.** A wrong guess before instruction must not count against the sitting or drop the idea's box, otherwise the mechanism punishes the behaviour it exists to encourage. They are logged for adaptation only.
4. **Retrieve before you recognise.** Once an idea is in box 2 or higher, the rewind hides the options until the learner says they have an answer in mind. The time taken is recorded for later adaptation.
5. **Confidence gets reflected back.** After the quick check, the checkpoint and on the finish screen, one line reports how confidence matched outcome for the sitting.
6. **No new required content.** Everything above runs from fields every concept already has. Two optional fields (`terms`, `sayPrompt`) let authors sharpen the teach-back where the defaults are weak.

## What shipped

- Engine (`src/lib/study.ts`): learn segments carry `tryFirst` and `sayBack`; `buildSession` sets them by age, pace and format; `answered` treats the `try` and `say` sources as signal-only; `saidBack` records the teach-back and keeps typed words for the next rewind; `deriveSignals` tracks skipped typed teach-backs; pure helpers `thinkFirst`, `coverage`, `buildChips`, `sittingCalibration` and `calibrationNote`; migrations accept the new events and default old sittings safely.
- Learn segment (`src/components/study/segments/learn.tsx`): the try phase, and the key points held back until the teach-back is done or skipped.
- Say it back (`src/components/study/segments/say-back.tsx`): the typed and chip variants.
- Question card (`src/components/study/question-card.tsx`): the think-first gate and reveal latency.
- Rewind, quick check, checkpoint, finish screen and catch-up review wired to the above.
- Content schema (`src/content/types.ts`, `validate.ts`): optional `terms` and `sayPrompt`, validated when present.

## Deliberately not built

- **Branching stories and simulated peer dialogue.** The closest thing to ICAP's "interactive" mode in a single-user app, but it needs authored dialogue per concept. Worth a pilot on one unit before committing 216 concepts to it.
- **Faded worked examples for maths.** Strong evidence, but needs authored solution steps. The content schema can take an optional `worked` field later.
- **Free-recall with self-grading.** Highest retrieval effort, but self-grading is gamed and cannot be verified offline. The think-first gate keeps the effort and the verification.
- **A conversational tutor.** The app is a static export with no server. An on-device or API-backed tutor is a product decision, not a lesson-mechanics one.

## How to tell whether it works

The event log now carries what is needed. Look at:

- accuracy on `try` answers versus the same idea's quick check the same day, and its rewind the next day (the pretesting gain);
- the share of typed teach-backs skipped, and whether it falls once chips are offered;
- key-term coverage in typed teach-backs over a learner's first two weeks;
- the distribution of `thinkMs` on think-first items, and delayed accuracy for items with a long think versus an instant reveal;
- the calibration counts per sitting, and whether sure-but-wrong falls over time.

## Next steps

1. Author `terms` and `sayPrompt` for the units where pair terms make a weak checklist, starting with languages.
2. Pilot a branching story on one science unit and measure completion and next-day rewind accuracy against the plain story.
3. Add optional worked-example steps to maths units 1 to 3 and a faded-example segment that uses them.
4. Once a few weeks of events exist, let `thinkMs` and teach-back coverage feed the format ranking alongside delayed accuracy.

## Sources

- Boustani, S. & Shanks, D. R. (2022). Heterogeneity and publication bias in research on test-potentiated new learning. *Collabra: Psychology*. Summarised in [Testing before learning: exploring the robustness of the pretesting effect](https://link.springer.com/article/10.3758/s13421-025-01813-x).
- St. Hilaire, K. J. et al. (2024). [Guessing as a learning intervention: a meta-analytic review of the prequestion effect](https://link.springer.com/article/10.3758/s13423-023-02353-8). *Psychonomic Bulletin & Review*.
- [The effect of prequestions on learning: a multilevel meta-analysis](https://link.springer.com/article/10.1007/s10648-025-10075-7). *Educational Psychology Review* (2025).
- [The pretesting effect is robust throughout adulthood, but metacognitive beliefs about pretesting and challenge differ](https://www.sciencedirect.com/science/article/abs/pii/S1041608025000597) (2025).
- Butler, A. C., Fazio, L. K. & Marsh, E. J. (2011). [The hypercorrection effect persists over a week, but high-confidence errors return](https://link.springer.com/article/10.3758/s13423-011-0173-y). *Psychonomic Bulletin & Review*.
- Sinha, T. & Kapur, M. (2021). [When problem solving followed by instruction works: evidence for productive failure](https://journals.sagepub.com/doi/10.3102/00346543211019105). *Review of Educational Research*, 91(5).
- Bisra, K. et al. (2018). [Inducing self-explanation: a meta-analysis](https://www.researchgate.net/publication/324214361_Inducing_Self-Explanation_a_Meta-Analysis). *Educational Psychology Review*.
- [Enhancing academic performance through self-explanation in digital learning environments: a three-level meta-analysis](https://link.springer.com/article/10.1007/s10648-025-10001-x). *Educational Psychology Review* (2025).
- Fiorella, L. [Learning by teaching](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-learning-by-teaching-fiorella.pdf); Fiorella, L. & Mayer, R. E. (2016). [Eight ways to promote generative learning](https://bootcampmilitaryfitnessinstitute.com/wp-content/uploads/2016/01/eight-ways-to-promote-generative-learning-fiorella-mayer-2015.pdf).
- Kobayashi, K. [Learning by preparing-to-teach and teaching: a meta-analysis](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/jpr.12221). *Japanese Psychological Research*.
- Chi, M. T. H. & Wylie, R. (2014). [The ICAP framework: linking cognitive engagement to active learning outcomes](https://www.semanticscholar.org/paper/The-ICAP-Framework:-Linking-Cognitive-Engagement-to-Chi-Wylie/9f30b9a4796209ea5ae872ff8959247ebeb15742). *Educational Psychologist*; and the critique [Questioning central assumptions of the ICAP framework](https://www.nature.com/articles/s41539-023-00197-4), *npj Science of Learning* (2023).
- [Does difficulty moderate learning? A comparative analysis of the desirable difficulties framework and cognitive load theory](https://pmc.ncbi.nlm.nih.gov/articles/PMC12432286/) (2025).
- [Learning behaviors mediate the effect of AI-powered support for metacognitive calibration on learning outcomes](https://dl.acm.org/doi/full/10.1145/3706598.3713960). *CHI 2025*.
- [How can scaffolding effectively promote students' problem-solving ability: a meta-analysis](https://link.springer.com/article/10.1007/s40299-025-01022-9). *The Asia-Pacific Education Researcher* (2025).
- [Exploring the impact of concept-oriented faded worked examples and metacognitive scaffolding on transfer](https://link.springer.com/article/10.1007/s11409-023-09362-x). *Metacognition and Learning* (2024).
- [Brilliant: learn by doing](https://brilliant.org/about/) and [Duolingo research](https://research.duolingo.com/), as product reference points.
