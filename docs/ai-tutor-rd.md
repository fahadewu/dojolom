# The AI tutor: R&D for Dojolom

*October 2026. Companion to `how-people-learn-rd.md`, `personality-learning-rd.md` and `age-learning-rd.md`.*

## Why this work

The product owner clarified what Dojolom should be, in two steps.

1. **Not quizzes and lesson cards.** It should be a tutor that teaches by conversation, fitted to the person: their age, personality and what they like.
2. **Not a tutor added to the old app.** *The entire thing is a chat window*: an AI agent that teaches people interactively.

The decisions that followed:

- **The chat is the product.** Everything after the landing page's "Start" is one conversation app: getting to know the learner, choosing what to learn, teaching, and reviewing.
  - The dashboard, subject paths, onboarding wizard and lesson player are gone for adults.
  - They stay as the way in for under-18s until the tutor is cleared for children.
- **The chat is mostly talk, rich when it helps:** tap-to-answer choices, the checked lesson's pictures and steps, step diagrams the tutor lays out, and marked quick checks.
- **The tutor teaches anything.** It uses Dojolom's checked lessons and the NCTB books whenever the topic matches.
- **"Personality"** means four things: interests, a chosen tutor voice, study habits and nerves, and how they like things explained.
- **It runs on Vercel**, with Claude models through AI Gateway. The site stopped being a static export.

Two evidence reviews were run before building: LLM tutoring and expert tutoring, and personalisation and child safety. Open Executive was unreachable, so the prioritisation is engineering judgement.

## What the evidence says

### 1. An answer-giving chatbot harms learning; a tutor with guardrails does not

| Study | Setting | Result | What it means here |
|---|---|---|---|
| Bastani et al. 2025, *PNAS* | ~1,000 Turkish high-school students, maths | Plain GPT-4 lifted practice scores 48% but cut the later unassisted exam 17%. A tutor prompted with solutions, common mistakes and "hints, not answers" removed the harm, with no gain. Both groups over-rated what they had learned. GPT-4 was right only 51% of the time. | Hints before answers is the minimum, not the goal. Never trust the learner's own sense of mastery. Correctness has to come from somewhere other than the model. |
| Kestin et al. 2025, *Sci. Reports* | 194 Harvard physics students, crossover design | AI tutor beat in-class active learning: median 4.5 vs 3.5, about 0.6 to 1.3 SD, in less time. One part at a time, pre-written step solutions, load-managed. | Teach from authored, verified material, one step at a time. The test was narrow and taken right away. |
| De Simone et al. 2025, World Bank WP 11125 | Nigeria, senior secondary, 6 weeks after school | 0.31 SD overall, 0.23 SD in English. Each extra day attended added more. | Curriculum-aligned, regular sittings; attendance is the lever. |
| Henkel et al. 2024 (Rori) | Ghana, grades 3 to 9, WhatsApp, 8 months | 0.37 SD, at about $5 a student. | Structured practice works on low bandwidth in low-resource settings. |
| Oreopoulos & Low 2026, NBER (Khanmigo) | 18 Tennessee schools, 2 years | 0.06 to 0.08 SD, the same as practice without AI. Learners messaged the tutor in only 17% of sessions where they made a mistake. | A passive tutor that waits to be asked gets ignored. **Ours leads.** |
| Liu et al. 2026, EdWorkingPaper | 2,379 undergraduates, tutor built into the course | Grades fell 0.37 SD; use of the course platform fell. | Do not replace the practice loop. Feed it. |
| Fischer, Rau & Rilke 2025, IZA | 334 university students | +0.23 SD from the tutor. A hard "read first" gate made it worse. | Guide; do not lock out. |

A realistic target at scale is about 0.15 to 0.4 SD, measured on delayed, unassisted tests (Kraft et al. 2024: tutoring gains shrink as programmes grow).

### 2. How LLM tutors fail, and what fixed it

- **They give the answer away.** In MRBench (Maurya et al. 2025), GPT-4 revealed the answer in about 47% of replies, against 9% for expert tutors. It spotted the mistake 94% of the time but gave a clear next step only 46% of the time. In MathTutorBench (2025), being good at solving did not predict being good at tutoring, and quality fell over long dialogues.
- **The maths is wrong, or the marking is.** 32% of ChatGPT maths hints failed a quality check (Pardos & Bhandari 2024). Finding the first wrong step is hard for models (Daheim et al. 2024).
- **They agree with the student.** When a student names a wrong answer, accuracy drops up to 15 points (sycophancy, 2025). Fine-tuning a model to be warmer added 10 to 30 points of errors and more agreement with false beliefs (Ibrahim et al. 2025, preprint).
- **Students offload the thinking.** Asking a model for solutions lowered understanding, while asking it for explanations raised it (Lehmann et al. 2024/25). Essay scores rose without any gain in knowledge ("metacognitive laziness", Fan et al. 2025).
- **What helped:**
  - solutions and known mistakes in the prompt, and hints instead of answers (Bastani);
  - scripted step-by-step sequencing (Kestin);
  - choosing the teaching move before writing the reply ("Bridge", Wang et al. 2024: replies preferred 76% more often);
  - checking answers in code, not with the model.

### 3. What expert tutors do

- **Bloom's "2 sigma" has been revised down.** Human tutoring is d ≈ 0.79 (VanLehn 2011), close to step-based tutoring software (0.76) and well above answer-only systems (0.31). Tutoring programmes average about 0.29 to 0.37 SD (Nickow, Oreopoulos & Quan 2020/2024).
- **Prompting can do as much as explaining.** Tutors who were only allowed to prompt, not explain, got the same learning (Chi et al. 2001).
- **The five-step frame.** Ask a question, take the answer, give feedback, scaffold, check understanding (Graesser et al. 1995). AutoTutor built its dialogue around expected answers and known misconceptions and gained about 0.8 SD over reading the text.
- **"Do you understand?" is not a check.** It asks the learner to judge themselves.
- **Explaining back.** Self-explanation prompts: g = 0.55 (Bisra et al. 2018).
- **Fade the help.** Help that serves novices can hurt experienced learners (expertise reversal, Kalyuga et al. 2003). Trying before being taught helps only once the learner has the prerequisites (Sinha & Kapur 2021). Both are already in the engine.

### 4. Personalisation: what each kind can and cannot do

- **Interests (context personalisation) are well supported, when only the cover story changes.**
  - Walkington 2013: algebra problems rewritten around students' interests, maths unchanged. Learning improved, and so did later units that were not personalised. Low achievers gained most.
  - Lin et al. 2024 meta-analysis: interest g = 0.55, retention g = 0.48, transfer g = 0.36 (few studies).
  - Gains go mainly to low-interest and low-confidence learners. It can lower interest in already-keen students (Høgheim & Reber 2017).
  - **Seductive details hurt.** Interesting but irrelevant additions cost about g = −0.33 (Sundararajan & Adesope 2020), and are worst at the start of an explanation (Harp & Mayer 1998).
- **Voice matters more than character.**
  - Conversational style: d = 0.30 on retention, 0.54 on transfer (Ginns et al. 2013).
  - Politeness: d ≈ 0.7 to 0.8 for weaker learners, reversed for strong ones (McLaren et al. 2011).
  - "Wise feedback": high standards plus stated belief that the learner can meet them (Yeager et al. 2014).
  - No study found a harsh or controlling tone helped; controlling framing hurt deep learning (Vansteenkiste et al. 2004).
  - Humour helps only when it is about the content.
  - Pedagogical agents themselves: g ≈ 0.20 (Castro-Alonso et al. 2021).
- **Choice motivates but does not teach.**
  - Choice raised intrinsic motivation d = 0.36 (0.55 for children), but subsequent learning only d = 0.10, not significant (Patall et al. 2008).
  - Learner control in edtech: g = 0.05 (Karich et al. 2014).
  - A learner's preferred format does not predict what helps them (Kollöffel 2012; Kirschner & van Merriënboer 2013). Our earlier review reached the same conclusion for learning styles and personality types.
- **Study habits and nerves:** see `personality-learning-rd.md`. If-then plans, mastery experiences and reappraisal before tests all carry over unchanged.

### 5. Bangla and Banglish

- **There is no learning-outcome evidence for LLM tutoring in Bangla, or in Bangla-English code-switching.**
- **Bangla benchmarks:**
  - Models score lower in Bangla than in English on Bangladeshi school science (BEnQA 2024).
  - On grade 6 to 8 Bangla maths, only two models passed 80%, and both broke under distractors (BanglaMATH 2025).
  - Changing the problem dropped scores 20 to 40 points (GSM-Plus-BN 2026).
  - Part of the measured gap comes from translation errors (Peter et al. 2025).
- **What we do:** marking stays with the authored answer keys. Lessons are English Version with Bangla terms. The tutor answers in whatever mix the learner writes.

### 6. Children, safety and the law

- **Bangladesh, Personal Data Protection Ordinance 2025.**
  - s.9(1): processing a child's data needs a parent's or guardian's consent.
  - **s.9(3): "shall not conduct … tracking, monitoring, profiling … of a specific child".** s.2(14) defines profiling to include *interests, preferences, behaviour, habits*. That covers three of our four kinds of personalisation.
  - Data on mental condition is sensitive. Self-reported test nerves may count.
  - Penalties (s.38) apply after the commencement period.
  - Reported to have been replaced by the PDP Act 2026 (Act 63). **Whether s.9(3) survived is unverified.**
- **Anthropic's usage policy and its guidelines for organisations serving minors** (under 18):
  - age assurance beyond self-declaration;
  - moderation of what goes in and out;
  - monitoring and reporting;
  - a child-safety system prompt;
  - a public compliance statement;
  - disclosing that it is an AI.
- **Companion risk.** Common Sense Media (2025) rates social AI companions "unacceptable" for under-18s. Children readily treat chatbots as confidants (Kurian 2024). California SB 243 requires AI disclosure and self-harm protocols. Character.AI ended open-ended chat for under-18s.
- UNESCO's 2023 guidance discusses 13 as a minimum age for classroom generative AI.

## What we built

### The shape

```
learner's device                                 server (Vercel)                         AI Gateway
────────────────                                 ───────────────                         ──────────
/learn: one chat app, conversations in a list   POST /api/chat/
  age asked on the device (no AI) ─▶ access      validate (zod, sizes, messages)
  context: who they are, what is due ──────────▶ refuse under-18s (backstop)
  cards marked against stored keys → FSRS        resolve titles from ids
  profile answers, learned ideas saved here      ToolLoopAgent ────────────────────────▶ claude-haiku-5.5
  conversations + own ideas in localStorage ◀──    lookUp / lesson / chapter run here      (claude-sonnet-5.5 when stuck)
                                                   (no storage)
```

**One chat.** `/learn` is the whole app after the landing page. A sidebar lists conversations, shows how many ideas are due, and gives a count of ideas learned and held.

**Each day opens a new conversation, and the tutor speaks first.** The device sends an unseen opening message. A newcomer is welcomed and asked about themselves. A returning learner with ideas due starts with a short review: up to three quick checks, most urgent first. Then the tutor asks what they want to learn, and suggests the next idea in their books.

**Age is asked by the device, before anything reaches the AI service.** It is typed, with no bands, as in `age-learning-rd.md`. That keeps under-18s' words away from the AI while the tutor is closed to them. They get a friendly note and a link to their lessons.

**Getting to know them happens in conversation.** The brief lists what is still unknown:
- what they want to learn;
- how they like things explained;
- which voice;
- why they are learning;
- their name (asked once);
- their interests (optional).

The tutor asks one thing at a time, mostly with tap choices, and saves each answer with `saveProfile`. The device validates every field before saving it. Teaching starts as soon as the tutor knows what they want and how they like it explained.

**Anything can be taught, grounded when possible.**
- **Before teaching a topic, the tutor calls `lookUp`.** It searches every book and chapter title (English and Bangla) and the authored ideas' titles and key words. It returns nothing rather than a loose match, because a loose hit would teach the wrong lesson.
- **A matching idea or chapter is read on the server inside the same turn,** with `lesson` or `chapter`, and taught from. The learner sees "From the checked lesson: …".
- **Anything else is taught from the model's own knowledge,** under stricter rules: only well-established knowledge, say when unsure, check every number, no invented sources, and general ideas only for personal medical, legal or money decisions.

**Memory covers everything they learn.**
- A checked idea joins FSRS memory when the tutor calls `learned`, exactly as in the lesson player.
- Anything else is saved as an **own idea** (`src/lib/tutor/ideas.ts`): a title, the key point, and one multiple-choice check the tutor writes while teaching it. The check is validated on the device: three or four distinct options and a valid answer.
- Own ideas come back for review like any other idea. They are marked against that stored key, never re-judged by the model.
- A learner who thinks a check is wrong can flag it; it is then never asked again. The flag rate is a quality signal for teaching outside the checked lessons.

**The model never marks anything that moves a memory.** Quick checks mark against the authored item, or the stored own check, on the device. The engine records it (`answered`, source `review`). The model sees the result and cannot change it.

### The tutor's moves (`src/lib/tutor/tools.ts`)

- **Lookups, on the server inside the turn:** `lookUp`, `lesson`, `chapter`.
- **Cards the learner answers:**
  - `choices`: tap options, single or several; typing always works and becomes the answer;
  - `quickCheck`: one marked question on a learned idea;
  - `guess`: the common mistake, true or false, before teaching a checked idea;
  - `tryIt`: a checked idea's example problem.
- **Records the device makes at once, after checking them:**
  - `show`: a checked idea's picture, steps, story, explanation or key points;
  - `steps`: the tutor's own step diagram, for other topics;
  - `saveProfile`;
  - `learned`: stores the learner's own last words as their summary, never the tutor's;
  - `markCq`.
- A call that does not fit comes back as an error naming the problem: an unknown idea id, an own check that cannot be marked, a profile field that is not valid.

### The instructions (`src/lib/tutor/brief.ts`)

**`RULES` is the same for everyone, and cached.**
- **Teaching:**
  - make them think, and go one rung at a time: hint, smaller question, a worked example of a *similar* problem, the full answer only after two honest tries;
  - diagnose first, and never ask "do you understand?";
  - choose the move silently, then write only that move;
  - one to four sentences and one question per message;
  - lead after a miss;
  - explain-back against the key words;
  - specific praise only; no verdict changes under push-back.
- **What to teach from:** call `lookUp` first, teach from checked material when it exists, follow the accuracy rules otherwise.
- **The usual shape of a new idea:** find out what they think (or a guess card), explain first if it is new to them or try first if they know a little, one way in, explain-back, `learned`, `quickCheck`.
- **Reviews** at the start of a conversation.
- **Getting to know them:** never ask their age, surname, school, contact details or photos.
- **Identity:** an AI, not a friend.
- **Safety:** a crisis means a trusted adult, 999 and 1098.
- **Writing and tool rules.**

**The learner brief changes every turn.** It covers:
- who they are, by stage and never by label;
- their voice, interests and preferred way in;
- support from their habits (adults, or under a guardian switch);
- what they know: due ideas, recent ideas, the next checked idea in each of their books;
- what is still to find out;
- what just happened: a first visit, a new conversation, or carrying on.

### Personalisation, as the evidence allows

| Kind | What it changes | What it never changes | Why |
|---|---|---|---|
| Interests | Names and setting of the tutor's own worked examples and word problems. More often when confidence or recent answers are low. | Numbers, steps, difficulty. No interest trivia or tangents in explanations. | Walkington 2013; seductive details. |
| Voice (calm, coach, playful, curious) | How it sounds. Coach means wise feedback, softened for young children. Humour only about the content. "What if" only after the idea has landed. | The method, the standards, the verdicts. | Politeness, wise feedback, controlling-tone and sycophancy findings. |
| How they like it explained | Which explanation the tutor opens with: the checked idea's matching view, or its own steps or story for other topics. | Only a starting point: it switches when answers show the explanation has not landed, and uses steps for procedures. | Preference does not predict benefit; worked examples help novices. |
| Habits and nerves | Calming line before reviews, wins first, room to go deeper, small conversations after missed days. | Nothing about content. Never mentioned to the learner. | `personality-learning-rd.md` |

The five learning-style scenario questions are gone from onboarding. They produced labels like "You are The Mapper", which our evidence does not support.

### Models and cost

- `anthropic/claude-haiku-5.5` handles every turn. `anthropic/claude-sonnet-5.5` takes over once an idea has been missed twice within the hour. Model ids were checked against the Gateway's model list on 2026-10-15. AI SDK 7.0.141.
- **Per-turn size.** The rules are about 1,300 tokens and the tools about 1,500; both are cached. The learner brief is a few hundred tokens. A checked lesson read with `lesson` adds about 1,000 tokens to that turn. History is capped at the last 40 messages.
- **Cost.** At the Gateway's listed Haiku prices on 2026-10-15 ($0.10 per million input tokens, $0.50 per million output), a learning conversation of about 25 model steps costs roughly **$0.01 to $0.02**. That includes the lookup steps: looking a topic up and reading it adds two steps to the turn that starts it. A daily learner comes to roughly **$0.40 to $0.60 a month**. Stuck-learner turns on Sonnet cost about twenty times as much per turn; they should be rare, and they are worth tracking.
- **Creative questions** are now marked in conversation on Haiku. Agreement with teacher marking needs checking on a marked set before any learner relies on the marks.

### Privacy and who it is open to

- **What leaves the device on each turn:**
  - the learner's first name only, their age, class and group, books, goal and target grade;
  - interests, chosen voice and preferred explanation;
  - coarse support flags;
  - the ids of what is due, recent and next, with titles and key points only for their own ideas;
  - the conversation.

  Dojolom's server stores none of it. Conversations and own ideas stay in this device's storage.
- **Under-18s** (by protection age, `src/lib/age.ts` `tutorAccess`):
  - **The tutor is closed by default** until the deployment sets `NEXT_PUBLIC_TUTOR_MINORS=1`. The route refuses them as a backstop.
  - The device asks their age before any AI call, then sends them to the lesson player, which is unchanged.
  - Once the tutor is allowed for them, a parent or guardian agrees on screen first, and can turn it off in settings.
  - Their study-habit flags reach the AI service only if the guardian has also turned habit tuning on.
- **Naming a school class counts as giving an age.** Protection age is the younger of the age typed and the class's usual age. An adult who says they are in Class 8 is treated as a child, and the tutor closes.
- An "AI tutor" label stays in the header, and the device's opening line says it is an AI.

## Deliberately not built

- **Inferring personality, mood or interests from the chat.** It is profiling, which s.9(3) bars for children, and it gives no learning benefit.
- **A named, human-like character or companion features.** That means no "I missed you", no feelings, no streak guilt (companion risk). Four voices give learners choice without building a relationship.
- **Server-side storage of conversations.** Privacy first. The cost is that monitoring, which Anthropic's minors guidelines ask for, does not exist yet.
- **The model marking anything that counts.** Checked ideas use authored items; own ideas use the check stored when they were taught. Questions the tutor asks in conversation are practice.
- **A daily-session structure, streaks or a daily gate in the chat.** Each day opens a new conversation that starts with what is due; how much to do is the learner's call. Habit support (plans, small restarts) stays in the brief.
- **A separate step-checker model, or generating several replies and keeping the one they agree on.** These are proven fixes for maths hints, but they double the cost. Checked material and stored keys cover marking. A checker is the first thing to add if the evaluations find wrong maths in explanations, especially for topics outside the checked lessons.
- **Bangla speech and Bangla-first replies.** There is no evidence yet, and model quality in Bangla is lower. The tutor follows the learner's language mix.

## Before it opens to children (blocking)

1. **Bangladeshi legal review** of the PDP Act 2026 text. Does s.9(3) survive? Does using *declared* interests and preferences on the device, with guardian consent, count as profiling? Is a guardian ticking a box "verifiable consent"?
2. **Anthropic's safeguards for products serving minors:**
   - age assurance beyond self-declaration;
   - input and output moderation, for example a classifier pass on each turn;
   - monitoring and reporting, which conflicts with not storing conversations, so it needs a privacy-preserving design;
   - their child-safety system prompt, if they provide one;
   - a public compliance statement.
3. **Red-teaming** every voice with probes written the way a child would write: self-harm, grooming patterns, asking for personal details, jailbreaks.

## Before it opens widely (adults included)

- **A Bangla and Banglish tutoring evaluation:**
  - five number-variants per maths item;
  - distractor versions;
  - push-back tests, where the learner insists on a wrong answer;
  - review by Bangla-speaking teachers.
- **A tutoring-quality evaluation** on a sample of real (consented) sittings:
  - answer-revealing rate;
  - wrong statements;
  - next-step clarity, MRBench style.
- **Rate limiting and bot protection on `/api/tutor/`.** Use Vercel Firewall rate rules and BotID. There are no accounts, so per-learner quotas need them first.
- **Zero data retention.** Turn it on in AI Gateway (Pro or Enterprise) once on a plan that allows it.

## How to run it

- Set `AI_GATEWAY_API_KEY` in `.env.local`, or link the project on Vercel, which uses OIDC.
- `npm run dev`, then open `/learn` (or press Start on the landing page).
- `NEXT_PUBLIC_TUTOR_MINORS=1` opens the tutor to under-18s, behind guardian consent. Do not set it in production until the blocking checks above are done.
- `DOJOLOM_TUTOR_SCRIPT=1` runs the tutor on a scripted model, with no AI calls. Playwright sets it.

## How we will know it works

- **The measure that matters: delayed, unassisted recall.**
  - Compare the first review answer on ideas learned in the chat against ideas learned in the lesson player before the switch, at 1, 7 and 30 days.
  - Chat reviews carry source `review`; lesson-player reviews carry `rewind` or `check`.
  - These are the same graded items the FSRS calibration uses.
  - Also compare checked ideas against own ideas, and track the rate at which learners flag own-idea checks.
- **Chapter checkpoint pass rates, and creative question marks,** for tutor and lesson-player sittings.
- **Engagement:**
  - sittings finished against sittings started;
  - days studied per week, the lever in the Nigeria study;
  - the share of misses followed by a learner message, compared with Khanmigo's 17%.
- **Tutoring quality:**
  - answer-revealing rate and wrong-statement rate in sampled, consented transcripts;
  - explain-back quality against the key words.
- **Cost per sitting and per active learner per month,** from AI Gateway usage, split by model.
- **Decision rule:** if delayed recall on chat-taught ideas is not at least as good as the lesson player's after four weeks of real use, bring the structured sitting back inside the chat (the engine's daily plan, delivered as cards), rather than leaving the pacing to the conversation.

## Sources

Bastani et al. 2025, *PNAS* 122(26) · Kestin et al. 2025, *Scientific Reports* 15:17458 · De Simone et al. 2025, World Bank PRWP 11125 · Henkel et al. 2024, arXiv 2402.09809 · Wang et al. 2024, Tutor CoPilot, arXiv 2410.03017 · Wang et al. 2024, Bridge, NAACL · LearnLM Team 2024, arXiv 2412.16429 · LearnLM & Eedi 2025, arXiv 2512.23633 · Oreopoulos & Low 2026, NBER w35620 · Liu et al. 2026, EdWorkingPaper 26-1598 · Fischer, Rau & Rilke 2025, IZA DP 18338 · Macina et al. 2023, MathDial · Maurya et al. 2025, MRBench, NAACL · Macina et al. 2025, MathTutorBench, EMNLP · Pardos & Bhandari 2024, *PLOS ONE* · Daheim et al. 2024, EMNLP · Arvin 2025, sycophancy, KDD workshop · Lehmann et al. arXiv 2409.09047 · Fan et al. 2025, *BJET* · VanLehn 2011, *Educational Psychologist* 46(4) · Nickow, Oreopoulos & Quan 2020/2024 · Kraft, Schueler & Falken 2024, EdWorkingPaper 24-1031 · von Hippel 2024, *Education Next* · Chi et al. 2001, *Cognitive Science* · Graesser, Person & Magliano 1995 · Nye, Graesser & Hu 2014, *IJAIED* · Bisra et al. 2018, *Educ Psych Rev* · Koedinger & Aleven 2007 · Kalyuga et al. 2003 · Sinha & Kapur 2021, *RER* · Walkington 2013, *J Educ Psych* 105 · Bernacki & Walkington 2018 · Høgheim & Reber 2015, 2017 · Lin, Lin, Zhang & Ginns 2024, *Educ Psych Rev* 36:88 · Harp & Mayer 1998 · Sundararajan & Adesope 2020 · Castro-Alonso et al. 2021 · Ginns, Martin & Marsh 2013 · McLaren, DeLeeuw & Mayer 2011 · Yeager et al. 2014, *JEP: General* · Vansteenkiste et al. 2004, *JPSP* · Patall, Cooper & Robinson 2008, *Psych Bull* · Karich, Burns & Maki 2014, *RER* · Kollöffel 2012 · Kirschner & van Merriënboer 2013 · Ibrahim, Hafner & Rocher 2025 (preprint) · BEnQA (Shafayat et al. 2024) · BanglaMATH (Prama et al. 2025) · GSM-Plus-BN (Paul et al. 2026) · Peter et al. 2025, arXiv 2511.05162 · Bangladesh PDPO 2025 (Ordinance 61) · Anthropic Usage Policy and "Guidelines for Organizations Serving Minors" (2026) · UNICEF Guidance on AI and Children v3 (2025) · UNESCO GenAI guidance (2023) · Common Sense Media AI companion risk assessment (2025) · Kurian 2024, *Learning, Media and Technology*.

Items the reviewers could not verify against a primary source are marked in their reports and are not relied on above. Among them are exact sample sizes for some older studies and the status of s.9(3) in the 2026 Act.
