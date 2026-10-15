# Age-based learning: R&D for Dojolom

Prepared 2026-10-15. This covers how learning changes with age, how the app should find out a learner's age, and what it should do differently because of it.

## Why this work

Dojolom serves Class 1 children in Bangladesh (about 6) through SSC and HSC students to adults learning everyday subjects. Before this pass, the app asked for one of four bands: Under 12, 12 to 17, 18 to 40, and 40 and over. About ten scattered rules then changed formats, games, timers, try-first, typing and motion. None of those rules was written down with its evidence. Class and age were never compared.

## What the evidence says

### Age is a weak proxy, especially in Bangladesh

- **Reading tracks level, not age.** In MICS 2019, the share of children who could read a Grade-2 story with understanding was:
  - by class: 7.6% in Class 1, 32.7% in Class 3, 63.5% in Class 5 and 83.8% in Class 8;
  - by age: 51.3% at age 10, while 27.5% of 14-year-olds still could not.

  Only 27.9% of 7–14-year-olds had foundational numeracy. *Strong.*
- **Class predicts age poorly.** The official entry age for Class 1 is 6. Only 48% of Class 5 pupils and 47% of Class 8 pupils are the official age for their class, and 9% of primary pupils are two or more years over-age (MICS 2019, Table LN.2.5; Hossain 2010). *Strong.*
- **Within one age, ability varies by years** (MICS 2019; Cockcroft 1982). *Strong.*

So age can only be a starting guess. Measured performance has to override it within a session or two.

### What changes with age

- **Working memory and processing speed rise through childhood and fall slowly from early adulthood.** Knowledge keeps growing: vocabulary peaks in the late 60s (Hartshorne & Germine 2015; Gathercole et al. 2004; Salthouse 1996). *Strong.*
- **Reading moves from decoding to comprehension.** Decoding comes at about 6–7, fluency at 7–8, and "reading to learn" from about 9 (Chall 1983). Comprehension needs both decoding and language (Gough & Tunmer 1986). *Strong.*
- **There is no fixed attention span, but young children drift sooner.**
  - The ability to sustain attention rises through adolescence and peaks in the early 40s (Fortenbaugh et al. 2015, n = 10,430).
  - In K–4 classrooms, time on task falls as lessons run from 10 to 30 minutes (Godwin et al. 2016).
  - The "8 seconds" figure has no source (Bradbury 2016).

  *Moderate.*
- **Metacognition develops late but works early.** Six-year-olds are overconfident, yet their confidence still tells right answers from wrong ones better than chance (Destan & Roebers 2015). Confidence accuracy improves from 11 to 17 (Weil et al. 2013). Older adults keep their self-monitoring (Hertzog & Dunlosky 2011). *Moderate to strong.*
- **Children and older adults miss small targets, and both type slowly on phones.** Children aged 7–10 miss more 6 mm targets. They also make "holdover" taps, which land on the next screen after it changes (Anthony et al. 2013). Adults aged 60–84 make more errors on on-screen keyboards (Smith & Chaparro 2015). WCAG 2.2 sets 24 px as the minimum target and 44 px as the enhanced target. *Moderate.*
- **Motivation shifts with age.**
  - Tangible rewards undermine children's intrinsic motivation more than adults'. Praise does not raise children's intrinsic motivation (Deci, Koestner & Ryan 1999).
  - Teenagers are sensitive to status and respect, and messages that talk down to them fail (Yeager, Dahl & Dweck 2018).
  - Reminding older adults of age stereotypes lowers their scores (Lamont et al. 2015).

  *Moderate.*

### The core techniques work at every age; the support around them changes

- **Retrieval practice** helps from preschool to 65+ (Yang et al. 2021, g = 0.50 over 222 studies; Fazio & Marsh 2019; Meyer & Logan 2013). **Spacing** helps 5–7-year-olds and adults with a mean age of 77 (Vlach & Sandhofer 2012; Kornell et al. 2010). *Strong.*
- **Children need the right answer straight away.** Second graders who answered multiple-choice items without feedback later repeated the wrong options. Immediate feedback removed the effect (Marsh, Fazio & Goswick 2012). *Moderate.*
- **Try-first depends on age and prior knowledge.** Problem-solving before instruction wins overall (g = 0.36), but instruction first is better for Grades 2–5 (Sinha & Kapur 2021). It is also better for novices on complex material (Ashman, Kalyuga & Sweller 2020). *Moderate.*
- **Healthy older adults learn from meaningful errors.** Errorless learning mainly helps people with memory impairment (Cyr & Anderson 2015; Clare & Jones 2008). *Moderate.*
- **Self-explanation helps with scaffolding** (Bisra et al. 2018, g = 0.55). The child studies used spoken explanations, not typed ones (Rittle-Johnson 2006). *Moderate.*
- **Narration helps early readers; tappable extras distract them.** Narration with visuals beats on-screen text. Animations and hotspots in e-books distract, most of all for disadvantaged children (Takacs, Swart & Bus 2015). A heavily decorated room reduced kindergartners' learning (Fisher, Godwin & Seltman 2014). *Moderate to strong.*
- **Gamification helps a little; pressure costs children more.**
  - Gamification's effects are small (Sailer & Homner 2020).
  - About 80% of apps used by 3–5-year-olds have manipulative designs, such as fake time pressure (Radesky et al. 2022).
  - Broken streaks lower later engagement, and repairable streaks soften the effect (Silverman & Barasch 2023).
  - Evidence on timers is thin, and maths anxiety appears by Grades 1–2.

  *Moderate on harms, weak on timers.*

### Identifying age

- **Ask neutrally.**
  - The UK Children's Code and FTC guidance on COPPA ask for free entry of age, no default and no visible cut-off.
  - A picker labelled "Under 12" invites misreporting: 32% of UK 8–17-year-olds on social media had set an adult age (Ofcom 2022).
  - Self-declaration is acceptable for low-risk processing.

  *Strong (primary texts).*
- **Use behaviour to set level, never to estimate age.** Reading rate, response time and accuracy vary with age but vary more with skill. No validated method infers age from behaviour in a learning app. *Strong as a signal of level; weak as an age estimate.*
- **Bangladesh law treats everyone under 18 as a child.** The Personal Data Protection Ordinance 2025 defines a child as under 18. Section 9 bars "tracking, monitoring, profiling or targeted advertising of a specific child using his/her behavior". The UK code wants non-core profiling off by default for children. This needs Bangladeshi legal review, in particular on whether processing that never leaves the device counts. *Strong (primary text); its application is open.*

### Myths left out

- **Learning styles** (Pashler et al. 2008).
- **"Digital natives"** (Kirschner & De Bruyckere 2017).
- **Andragogy as a separate science** (Taylor & Kroth 2009).
- **Fixed attention spans.**
- **"The brain stops learning after X."**

No age gets a different pedagogy. Every age gets the same retrieval, spacing and feedback, with different support around them.

## Audit of the old rules

| Old rule | Verdict |
|---|---|
| "Under 12" as one band | Too wide. Reading, metacognition and touch accuracy change sharply between 6 and 11. |
| "40 and over" as seniors | Not supported. Attention peaks in the early 40s. Only near vision reliably changes in the 40s. |
| Four-band picker with hints ("Short, playful, lots of pictures") | Signals the "kid mode" and invites misreporting. |
| Class and age never compared | Class sets content, but says little about age in Bangladesh. |
| No reading format for under-12s | Most 8–11-year-olds read and need practice. Reading level, not age, should decide. |
| No confidence ratings for under-12s | Ratings carry signal from 6, and training in self-monitoring works in primary school. |
| Teens nudged toward video and challenge, seniors toward reading | No evidence that age-matched formats help. This is close to learning styles. |
| Lively motion for kids | Decorative motion distracts young children. |
| Try-first for everyone over 12 | Novices on complex material do better with instruction first, at any age. |
| Children tuned from behaviour; 12–17 treated as adults | Bangladesh's ordinance covers everyone under 18. |
| Timers "off by default" for kids, with a prompt to turn them on | Children should never be invited into time pressure. |

## Design decisions

1. **One age, asked neutrally.** "How old are you?" takes a typed number, with no default and no bands or hints on screen. Someone setting the app up for another person enters that person's age. Ages from 4 to 110 are accepted. Older saved learners are migrated from their band to a representative age, which they can change in settings.
2. **Two ages, two jobs.**
   - **Support age.** The age the learner gives sets the starting support: narration, chips or typing, try-first, confidence ratings and sitting length.
   - **Protection age.** The younger of the stated age and the typical age for the chosen class sets the protections: timers, streak counts, the "how you study" questions, and habit tuning from behaviour.

   Applying child-safe protections to an adult who picked a child's book costs almost nothing. Class always decides the content.
3. **Six stages, mapped to the evidence.** Stages are internal and never shown as labels.

   | Stage | Ages | Starting defaults |
   |---|---|---|
   | Early | Under 8 | Read aloud on. Instruction first. No true/false guess. Chips with few pieces. No confidence rating. Larger text and targets. Taps held for 300 ms after a screen changes. 5-minute sittings. No timers or day-streak counts. No blitz game or reading format. |
   | Primary | 8–11 | Read aloud on until reading is measured as fluent. All formats, including reading, but no problem-first challenge. Instruction first. Chips until 10, then typing. Two-choice confidence. Larger targets with the tap hold. Sittings of up to 15 minutes. No timers. |
   | Young teen | 12–14 | Try-first unless the learner is new to the subject or missed the warm-up guess. Typing. Read aloud available. |
   | Teen | 15–17 | As for young teens. |
   | Adult | 18–59 | As for young teens. |
   | Older | 60+ | As for adults, plus larger text and targets, calm motion, and timers available but never suggested. |

   The 60 line replaces 40. Large text becomes a setting anyone can turn on.
4. **Behaviour sets the level.**
   - **Reading pace.** This is measured from the words on each question and the time taken to answer it correctly, taking the median of recent answers.
     - Fluent (about 80+ words a minute, including thinking time): read aloud stops by default.
     - Slow (under 45): read aloud starts by default, at any age.
     - The learner's own choice always wins.
   - **Instruction first.** Try-first switches off when the learner is new to the subject, when recent accuracy is below 60%, or when they missed the warm-up guess.
   - **Existing switches** carry on as before: skipped typing turns into chips, and steady answers bring typed blanks.

   The thresholds are engineering starting points, to tune against the measures below.
5. **Read aloud uses the device's own voices.** The browser's speech synthesis needs no network and no new dependency.
   - When read aloud is on, lessons are read automatically, with the sentence being read highlighted.
   - Questions are read automatically only under 8. Older learners tap "Listen", so the questions they read themselves keep measuring their reading.
   - Anyone can tap "Listen" on any lesson or question.
6. **No age-matched formats.** The teen and senior format nudges are removed, and so are the age priors on the learning-style profile. Variety and measured results decide formats.
7. **Instant correct-answer feedback for children.** Checks, blitz and challenge already show the right answer at once. Children under 8 skip the true/false misconception guess. From 8, the guess is answered before the lesson starts.
8. **No pressure for children.**
   - Timers are hidden under 12. From 60 they are available but never suggested.
   - Under 8, no day-streak count is shown, only sessions this week.
   - Streaks never show a loss for anyone (unchanged).
   - Motion defaults to balanced under 12, so there is no confetti or bounce.
9. **Habit tuning from behaviour is off by default under 18.** This covers the follow-through measure behind "plan first" and "start small". A parent or guardian can turn it on in settings.
   - The engine's teaching adaptations stay on, because they are the service itself: spaced scheduling, the support ladder and reading pace.
   - All data stays on the device.
   - Legal review in Bangladesh is still needed.
10. **The app shows what it set up and why**, in plain words on the profile and settings pages, never as a label ("Read aloud is on", "We explain first, then you try"). No screen ever says "senior" or "at your age".

## What shipped

- **`src/lib/age.ts`**, pure, with no clock or storage, holds:
  - `stageOf`, plus `supportAge` and `protectionAge` (the second against `classAge`, the official age for each class);
  - `ageDefaults`, the defaults table above, with `allowedPace`;
  - `readingPace`, the median words per minute over the 15 latest right answers the learner read themselves, after at least 6;
  - `readAloudOn`, which applies the learner's choice first, then reading pace, then age;
  - `ageView`, which every screen uses;
  - `ageLines`, the plain-language "what we set up" list;
  - migration of the old bands (`ageFromLegacyBand`: kid to 9 or the class age, teen to 15 or the class age, adult to 30, senior to 60).
- **Engine (`src/lib/study.ts`).** Every `age === "kid"` or `"senior"` check now goes through `ageDefaults`.
  - Format nudges by age and the age priors on the style profile are gone.
  - Try-first now also checks for a novice: the chapter's first idea, or under 60% on the last ten answers. A novice also gets no problem-first challenge format.
  - The guess is skipped under 8, and blitz is ruled out under 8.
  - Timers are forced off under 12.
  - Motion is balanced under 12 and calm from 60.
  - Habit tuning from behaviour follows `habitsOn`.
  - Answer events carry `words` and `readMs` when the learner read the question themselves.
  - The study state gains `readAloud`, `largeText` and `guardianHabits`.
- **Learner (`src/lib/learning.ts`).** `age` is a number, or null until it is given. `migrateLearner` converts saved bands and moves a pace the age no longer offers to the nearest one that is.
- **Read aloud (`src/components/study/read-aloud.tsx`).**
  - The device's speech synthesis reads one sentence at a time, with the spoken sentence lit up through `Spoken`.
  - A `Listen` button sits on every lesson and question. It plays by itself for lessons when read aloud is on, and for questions as well under 8.
  - Tapping a game card reads it when read aloud is on (`data-say`).
  - A header toggle turns read aloud on or off during a sitting.
  - A question read aloud gives no reading sample.
- **Screens.**
  - **Onboarding** asks age as a typed number, offers only the paces the age allows, and lists what was set up on the results page.
  - **Settings** gains:
    - an "Age and reading" section: age, the set-up lines, and read aloud and large text, each auto, on or off;
    - the clock switch, hidden under 12;
    - a parent or guardian switch for habit tuning under 18;
    - the study statements, shown from 12.
  - **Large text** zooms the content area by 1.125. **Large targets** are 56 px.
  - **Tap hold.** Under 12, a tap within 300 ms of the previous one is dropped.
  - **Say-back** typing always has a "Build it from words instead" switch.
  - **Day-streak counts** become sessions this week under 8.
  - **Scrolling.** Every segment, and every phase within a lesson, now opens at the top of the page. Before this, a long segment left the next one opening part-way down.
- **Tests.**
  - `tests/unit/age.test.ts` (15 tests) covers:
    - parsing and stages;
    - support and protection ages;
    - migration;
    - the defaults at each stage;
    - reading pace and how it overrides age;
    - storage;
    - guardian-gated habit tuning.
  - `tests/unit/study.test.ts` adds explain-first for novices, pre-reader rules and no clock for children.
  - **E2E**, one test covers:
    - the neutral age question;
    - a 6-year-old's sitting;
    - settings at ages 6, 15 and 30.

    The test for a 9-year-old checks that a holdover tap is dropped.

## Deliberately not built

- **Inferring age from behaviour.** It has no validated basis. Behaviour adjusts support only and never moves anyone into an older privacy band.
- **Spoken say-back.** Speech recognition needs a network on most browsers and would send a child's voice off the device. It is worth testing later on-device.
- **Reminders and notifications.** The app has none. If added, they should never go to under-18s at night, should default teens to the afternoon and should default 60+ to the morning.
- **Leaderboards.** None exist. None should be shown to under-18s.
- **Bangla narration.** Lessons are in English. Bangla voices are missing on many devices, so the glossary is not read aloud.

## How to tell whether it works

- **Narration:** for learners with read aloud on, compare check accuracy against learners who turned it off at the same measured reading pace, and track how often it is switched off by hand.
- **Try-first switch:** compare delayed accuracy for concepts taught try-first against instruction-first, split by age stage and by novice or not.
- **Sitting length:** track completion and abandonment for under-12s against the old 15- and 35-minute paces.
- **Self-report:** the share of learners whose stated age is far from their class's typical age, as a check on how often parents set up for children.
- **Confidence (8–11):** calibration, meaning sure-and-wrong against unsure-and-right, by age.

## Sources

- BBS/UNICEF (2021). *Bangladesh Multiple Indicator Cluster Survey 2019*. Tables LN.2.5 and LN.4.1.
- Hossain, A. (2010). Age in grade congruence and progression in basic education in Bangladesh. CREATE Monograph 40.
- Hartshorne, J. K., & Germine, L. T. (2015). When does cognitive functioning peak? *Psychological Science*.
- Fortenbaugh, F. C., et al. (2015). Sustained attention across the life span. *Psychological Science*.
- Godwin, K. E., et al. (2016). Off-task behavior in elementary school children. *Learning and Instruction*.
- Destan, N., & Roebers, C. M. (2015). What are the metacognitive costs of young children's overconfidence? *Metacognition and Learning*.
- Weil, L. G., et al. (2013). The development of metacognitive ability in adolescence. *Consciousness and Cognition*.
- Hertzog, C., & Dunlosky, J. (2011). Metacognition in later adulthood. *Current Directions in Psychological Science*.
- Anthony, L., et al. (2013). Designing smarter touch-based interfaces for educational contexts. *Personal and Ubiquitous Computing*.
- Smith, A. L., & Chaparro, B. S. (2015). Smartphone text input method performance, usability, and preference with younger and older adults. *Human Factors*.
- Deci, E. L., Koestner, R., & Ryan, R. M. (1999). A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation. *Psychological Bulletin*.
- Yeager, D. S., Dahl, R. E., & Dweck, C. S. (2018). Why interventions to influence adolescent behavior often fail but could succeed. *Perspectives on Psychological Science*.
- Lamont, R. A., Swift, H. J., & Abrams, D. (2015). A review and meta-analysis of age-based stereotype threat. *Psychology and Aging*.
- Yang, C., et al. (2021). Testing (quizzing) boosts classroom learning. *Psychological Bulletin*.
- Fazio, L. K., & Marsh, E. J. (2019). Retrieval-based learning in children. *Current Directions in Psychological Science*.
- Meyer, A. N. D., & Logan, J. M. (2013). Taking the testing effect beyond the college freshman. *Psychology and Aging*.
- Vlach, H. A., & Sandhofer, C. M. (2012). Distributing learning over time. *Child Development*.
- Kornell, N., et al. (2010). Spacing as the friend of both memory and induction in young and older adults. *Psychology and Aging*.
- Marsh, E. J., Fazio, L. K., & Goswick, A. E. (2012). Memorial consequences of testing school-aged children. *Memory*.
- Sinha, T., & Kapur, M. (2021). When problem solving followed by instruction works. *Review of Educational Research*.
- Ashman, G., Kalyuga, S., & Sweller, J. (2020). Problem-solving or explicit instruction: which should go first? *Educational Psychology Review*.
- Cyr, A.-A., & Anderson, N. D. (2015). Mistakes as stepping stones. *Journal of Experimental Psychology: Learning, Memory, and Cognition*.
- Bisra, K., et al. (2018). Inducing self-explanation: a meta-analysis. *Educational Psychology Review*.
- Takacs, Z. K., Swart, E. K., & Bus, A. G. (2015). Benefits and pitfalls of multimedia and interactive features in technology-enhanced storybooks. *Review of Educational Research*.
- Fisher, A. V., Godwin, K. E., & Seltman, H. (2014). Visual environment, attention allocation, and learning in young children. *Psychological Science*.
- Sailer, M., & Homner, L. (2020). The gamification of learning: a meta-analysis. *Educational Psychology Review*.
- Radesky, J., et al. (2022). Prevalence and characteristics of manipulative design in mobile applications used by children. *JAMA Network Open*.
- Silverman, J., & Barasch, A. (2023). On or off track: how (broken) streaks affect consumer decisions. *Journal of Consumer Research*.
- Information Commissioner's Office. *Age appropriate design: a code of practice for online services*, Standards 3, 5 and 12, and Annex B.
- Federal Trade Commission. *Complying with COPPA: Frequently Asked Questions* (checked through secondary summaries).
- Government of Bangladesh (2025). *Personal Data Protection Ordinance*, sections 2, 9 and 38.
- Pashler, H., et al. (2008). Learning styles: concepts and evidence. *Psychological Science in the Public Interest*.
- Kirschner, P. A., & De Bruyckere, P. (2017). The myths of the digital native and the multitasker. *Teaching and Teacher Education*.
- Bradbury, N. A. (2016). Attention span during lectures: 8 seconds, 10 minutes, or more? *Advances in Physiology Education*.
