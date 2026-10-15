# Personality-based learning: R&D for Dojolom

*October 2026. Companion to `how-people-learn-rd.md` and `bangladesh-curriculum-rd.md`.*

## Why this work

The brief was a "personal specification" for each learner and a learning process tailored person to person, built on research into personality-based learning. The learner chose *each learner gets their own path* (not peer learning).

Dojolom already personalised a lot:
- a five-question style quiz used as a presentation prior;
- adaptive formats and games;
- the 85% difficulty band;
- pace and motion;
- FSRS memory with a personal forgetting scale.

The question for this pass was what *personality* adds, and what the evidence lets it change.

The Open Executive instance was unreachable, so prioritisation is the engineering team's judgement.

## What the evidence says

### Personality predicts attainment, but only one trait does it at every age

- **Big Five and grades.** Across 267 samples and 413,074 students (Mammadov 2022):
  - Conscientiousness correlates with grades at ρ = .27, stable from primary school to university (.31 / .27 / .26).
  - Openness is .16, declining with age.
  - Agreeableness .09, Extraversion .01, Neuroticism −.02.
- **Conscientiousness versus intelligence.** Poropat (2009) found the same pattern, with Conscientiousness (.22) close to intelligence (.25) and almost independent of it.
- **Self-report is a weak signal.** Ratings of a student by others predict grades better than the student's own ratings (Poropat 2014). So what a learner *does* is a stronger signal than a questionnaire.
- **Study-specific beliefs predict more.** Among university students (Richardson, Abraham & Bond 2012):
  - performance self-efficacy r = .59;
  - grade goal .35;
  - effort regulation .32;
  - academic self-efficacy .31;
  - test anxiety −.24;
  - procrastination −.22;
  - Conscientiousness itself .19, and the other traits under .10.
- **Grit is mostly Conscientiousness renamed.** It correlates ρ = .84 with Conscientiousness and predicts performance at only ρ = .18 (Credé et al. 2017).
- **Procrastination.** It tracks low Conscientiousness at r = −.62 (Steel 2007).
- **Neuroticism and anxiety.** Neuroticism is about zero for grades, while test anxiety costs (von der Embse 2018). The target is the anxious *state* at test time, not the trait.

### Matching teaching to personality does not improve learning

- **The test it must pass.** The learning-styles lesson applies directly. A valid "matching" claim needs a crossover: each type learns best with a different method. That has not been found for styles (Pashler et al. 2008). A 2024 meta-analysis found the claimed benefit "too small and too infrequent".
- **No study shows it for personality.** No study we found shows personality-matched instruction improving learning.
- **What tailoring does move is engagement, not learning:**
  - Personality-matched messages raise ratings and clicks (Hirsh 2012; Matz 2017, contested).
  - A 702-experiment meta-analysis finds matching to *context* stronger than matching to individual differences.
  - Tailored gamification studies lack evidence on learning performance (Oliveira et al. 2023).
  - Feedback adapted to personality has only been judged by teachers, not tested on learners (Dennis et al. 2016).

### What does help, by profile

| Profile signal | What helps | Evidence |
|---|---|---|
| Low follow-through (low Conscientiousness, procrastination) | If-then plans tied to a daily cue; a small first step; a restart with no shame attached | Implementation intentions *d* = .65 (Gollwitzer & Sheeran 2006). Mental contrasting with implementation intentions *g* = .34 (2021). They helped low-Conscientiousness students *more* than high (Webb et al. 2007). Habits explain how self-control turns into grades (Galla & Duckworth 2015). |
| Low confidence (self-efficacy) | Mastery experiences: early wins, progress against one's own past | Self-efficacy is the strongest correlate of grades (r .31 to .59). The evidence is correlational. |
| Test nerves | Reappraising arousal as readiness; low stakes; untimed practice; retrieval practice | Reappraisal *d* = .23 overall, .20 on written tasks (2024 meta-analysis). Retrieval protects memory under stress (Smith et al. 2016). Expressive writing failed to replicate (Camerer 2018). |
| Curiosity (Openness) | Optional depth and elaboration | Openness predicts deep learning (Chamorro-Premuzic & Furnham 2009) and grades at young ages. No tailoring RCT exists. |
| Concrete goals | A target grade and visible progress towards it | Grade goal r = .35. Progress monitoring *d* = .40 (Harkin et al. 2016). |

### Measurement and ethics

- **Short self-report scales are noisy for teenagers in low- and middle-income settings:**
  - They "generally fail to measure the intended traits" in face-to-face surveys across 23 low- and middle-income countries (Laajaj 2019).
  - Reverse-keyed Openness items performed poorly in South Asia (Schmitt 2007).
  - Young respondents differ in acquiescence, the tendency to agree regardless of content (Soto 2008).
  - A Bangla BFI-10 exists (Chittagong University), but adolescent validity is unknown.
- **Profiling children should be off by default** unless there is a compelling interest (UK Children's Code, standard 12). Bangladesh's Personal Data Protection Ordinance 2025 requires explicit consent and child safeguards.
- **Labels harm.** Labels stick, and teens' trait estimates move. Name situations ("tests feel stressful"), never people ("you are anxious").

## Design decisions

1. **No personality types, no Big Five label, no matching of content.**
   - Nothing personality-related changes *what* is taught, how hard it is, or what is unlocked.
   - The existing style quiz stays as a presentation prior, as before, because formats are judged by what sticks.
2. **A short "how you study right now" profile instead.**
   - It covers the four dimensions with evidence for a support response: follow-through, test nerves, confidence and curiosity.
   - Each dimension has two study-specific statements, one of them reverse-keyed, so a learner who agrees with everything scores in the middle.
   - It is rated on five steps from "Not like me" to "Very like me".
   - The wording is our own, not a copyrighted inventory.
   - It is optional and skippable, editable in settings, and can be forgotten with one button.
   - It is **never asked of children** (the under-12 group).
3. **Behaviour outweighs the questionnaire.**
   - Follow-through is measured from the log: sittings on distinct days against what the pace asks for, with an abandoned sitting counting against.
   - A week of behaviour equals the questionnaire, and two weeks outweigh it.
   - Children are tuned from behaviour only.
   - *Superseded 2026-10-15 (docs/age-learning-rd.md):* Bangladesh's 2025 ordinance treats everyone under 18 as a child and bars profiling a child from behaviour. Behaviour-based habit tuning is now off by default under 18 (by age or class, whichever is younger) until a parent or guardian turns it on in settings. Teens 12–17 may still answer the statements.
4. **Each signal turns into support only:**
   - **Low follow-through → a plan with a trigger.**
     - The finish screen asks for an if-then plan ("After dinner, I do one session") alongside the time of day.
     - After a lapse the plan is asked for again, firmly, with "missing days is normal" framing.
     - The dashboard offers "start small: just the rewind today".
     - A broken streak shows as "Fresh start today".
   - **Test nerves → calmer tests.**
     - Before a checkpoint, retake or creative question, a short note reframes a racing heart as readiness and names the stakes as low.
     - Feedback after a miss reads "Not yet, and that is useful: now we know what to bring back".
     - Timers stay opt-in.
   - **Low confidence → wins first.**
     - Until there is accuracy to go on, games start on the most supported rung.
     - Every finish screen shows progress against the learner's own past ("6 ideas learned this week, 14 in all"), never against others.
   - **Curiosity → room to go deeper.**
     - Every lesson in a format other than the deep read offers "Go deeper: why it works", which reveals the precise explanation.
     - New formats are explored every third session instead of every fourth.
   - **School-book learners → a target grade.** Checkpoints show the board grade their score would earn and compare it with the target.
5. **The profile page explains, in plain words, what is adjusted and why.** It never says what the learner *is*.

## What shipped

- **`src/lib/personal.ts`** (new):
  - the statements and scale, and `studyProfile`;
  - `followThroughFromBehaviour` and `blend`;
  - `tuningFor`, returning `{ planFirst, startSmall, steadyNerves, buildConfidence, goDeeper }`, and `tuningLines`;
  - the board grade scale: `gradeFor`, `meetsGrade`.
  - It is pure.
- **Engine (`src/lib/study.ts`):**
  - `tuningOf(learner, state, today)`;
  - `baseRung` and `supportFor` take `buildConfidence`;
  - `rankFormats` takes `curious`;
  - `setPlan` and the `cue`/`planOn` state, with migration;
  - `ideasProgress`.
- **Learner model (`src/lib/learning.ts`):** `study` answers and `targetGrade` on the learner.
- **UI:**
  - **Onboarding:** an optional statements step, skipped for children; a target-grade choice for school-book learners; "Tuned to how you study" on the results page.
  - **Settings:** the plan cue, the statements, what is adjusted, and "Forget these answers".
  - **Session screens:** the steady-nerves note (checkpoint and creative question) and the warmer miss feedback (question card), shared through a tuning context; "Go deeper" (learn); the if-then plan card and progress line (finish screen); start small (dashboard); the grade line (checkpoint).
- **Bug found on the way:**
  - The session timer was read inside state-updater functions, which React may re-run during render. It is now read once in the handler.
  - The store now re-renders same-tab readers when the learner profile changes.
- **Tests:** `tests/unit/personal.test.ts` covers scoring with reverse keys, behaviour against pace, the blend, tuning (including children and behaviour overriding self-report), grades, and the engine hooks.

## Deliberately not built

- **A Big Five questionnaire or personality "type".** Short forms are noisy for teens and unvalidated in Bangla for this age, and matching on them has no learning evidence. A Bangla-validated Mini-IPIP could be an optional research instrument later, never a driver.
- **Grit training, mindset modules, expressive writing before tests, values affirmation.** These are near-zero, unreplicated or context-bound effects.
- **Personality-targeted persuasion to raise minors' engagement.** It is manipulative and legally exposed.
- **Emotion or personality inferred from camera, voice or typing.** It is prohibited in education under the EU AI Act and unjustified here.
- **Peer learning.** The learner chose individual paths. Peer tutoring and study partners need accounts and a server. If they come, the evidence favours structured roles (explain, then check) over open chat.
- **Deadlines as a lever.** A 2026 replication found negligible effects.

## How to tell whether it works

- **Plans:** the share of learners who set an if-then plan, and their seven-day return rate against learners with only a time of day. Return after a lapse when the replan prompt was shown.
- **Start small:** sittings started after a gap of two days or more, and the share completed past the rewind.
- **Confidence:** for buildConfidence learners, accuracy in their first five games and their rolling accuracy after two weeks, against similar learners before this shipped.
- **Nerves:** checkpoint accuracy for steady-nerves learners with and without the note (it could be A/B tested by alternating units). Skipped checkpoints.
- **Curiosity:** taps on "Go deeper", and delayed accuracy on ideas where it was opened.
- **Calibration of the profile:** how often self-reported follow-through disagrees with behaviour after two weeks. If it is usually wrong, ask fewer statements.

## Sources

- Mammadov, S. (2022). Big Five personality traits and academic performance: a meta-analysis. *Journal of Personality*, 90. https://doi.org/10.1111/jopy.12663
- Poropat, A. E. (2009). A meta-analysis of the five-factor model of personality and academic performance. *Psychological Bulletin*, 135(2). https://doi.org/10.1037/a0014996; and Poropat (2014), *Learning and Individual Differences*. https://doi.org/10.1016/j.lindif.2014.05.013
- Richardson, M., Abraham, C. & Bond, R. (2012). Psychological correlates of university students' academic performance. *Psychological Bulletin*, 138(2).
- Credé, M., Tynan, M. C. & Harms, P. D. (2017). Much ado about grit. *JPSP*, 113(3). https://doi.org/10.1037/pspp0000102
- Steel, P. (2007). The nature of procrastination. *Psychological Bulletin*, 133(1). https://doi.org/10.1037/0033-2909.133.1.65
- von der Embse, N. et al. (2018). Test anxiety effects, predictors, and correlates. *Journal of Affective Disorders*, 227. https://doi.org/10.1016/j.jad.2017.11.048
- Chamorro-Premuzic, T. & Furnham, A. (2009). Mainly Openness: the relationship between the Big Five and learning approaches. *Learning and Individual Differences*, 19.
- Pashler, H., McDaniel, M., Rohrer, D. & Bjork, R. (2008). Learning styles: concepts and evidence. *PSPI*, 9(3).
- Hirsh, J. B., Kang, S. K. & Bodenhausen, G. V. (2012). *Psychological Science*, 23(6); Matz, S. C. et al. (2017). *PNAS*, 114(48); Joyal-Desmarais, K. et al. (2022). *Psychological Bulletin*, 148.
- Dennis, M., Masthoff, J. & Mellish, C. (2016). Adapting progress feedback and emotional support to learner personality. *IJAIED*, 26.
- Oliveira, W. et al. (2023). Tailored gamification in education: a literature review. *Education and Information Technologies*, 28.
- Gollwitzer, P. M. & Sheeran, P. (2006). Implementation intentions and goal achievement. *Advances in Experimental Social Psychology*, 38; Webb, T. L., Christian, J. & Armitage, C. J. (2007), helping students turn up for class; Duckworth, A. L. et al. (2013), MCII with fifth graders; MCII meta-analysis (2021), *Frontiers in Psychology*, 12:565202.
- Galla, B. M. & Duckworth, A. L. (2015). More than resisting temptation. *JPSP*, 109(3).
- Jamieson, J. P. et al. (2010), *JESP*, 46; Brooks, A. W. (2014), *JEP: General*, 143; reappraisal meta-analysis (2024), *Scientific Reports*, 14.
- Smith, A. M., Floerke, V. A. & Thomas, A. K. (2016). Retrieval practice protects memory against acute stress. *Science*, 354.
- Camerer, C. F. et al. (2018). Evaluating the replicability of social science experiments in *Nature* and *Science*. *Nature Human Behaviour*, 2.
- Harkin, B. et al. (2016). Does monitoring goal progress promote goal attainment? *Psychological Bulletin*, 142(2).
- Laajaj, R. et al. (2019). Challenges to capture the big five personality traits in non-WEIRD populations. *Science Advances*, 5. https://doi.org/10.1126/sciadv.aaw5226
- Schmitt, D. P. et al. (2007). The geographic distribution of Big Five personality traits. *JCCP*, 38.
- Soto, C. J. et al. (2008). The developmental psychometrics of Big Five self-reports. *JPSP*, 94(4).
- Information Commissioner's Office, *Age appropriate design code*, standard 12 (profiling); Bangladesh Personal Data Protection Ordinance 2025 (The Daily Star summary).
