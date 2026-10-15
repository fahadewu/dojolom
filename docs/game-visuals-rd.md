# Games R&D: interaction by choice, and generated visuals that carry meaning

*Dojolom study module, September 2026. Companion to `learning-mechanics-rd.md`.*

## Why this work

The four mini-games (match pairs, put it in order, true or false, fill the gap) drill every idea, interleave earlier ones, and adapt which game is picked and how much support it gives. But they are text on tiles. The learner never chooses anything about the game, every game looks the same for a child and a forty-year-old, and none of the material is pictured. This document reviews what the evidence says about pictures, choice and difficulty in learning games, audits the games against it, records the design decisions, and describes what shipped, including a pipeline for AI-generated illustrations of the content.

The Open Executive instance was not registered in this session, so prioritisation is the engineering team's judgement and should be checked with the CPO persona (`oe status`, `oe start`).

## What the evidence says

Effect sizes are Hedges' *g* or Cohen's *d* as reported.

| Question | Evidence | What it means for the games |
|---|---|---|
| **Do pictures help, and which ones?** | Multimedia principle: words plus relevant pictures beat words alone across dozens of Mayer-tradition experiments; Cohen et al.'s meta-analysis of multimedia learning puts the average near *d* = 0.50. Picture superiority: pictured items are recalled better than words (Paivio's dual coding; distinctiveness is a live alternative explanation, Higdon et al. 2025, but the effect itself is robust). **Coherence and seductive details:** decorative material that does not carry the idea *hurts*, small-to-moderate negative effects (Sundararajan & Adesope 2020), worst when sitting next to informative diagrams or fixed on screen. | Picture the *content* (the term, the step), never the mood. One representational illustration per pair term and per sequence step; no backdrops, no mascots, no scene art behind statements. If an image cannot be generated for an item, show words, not a placeholder. |
| **Do learning games work at all, and what makes one better?** | Digital games beat non-game instruction, *g* = 0.33 (Clark, Tanner-Smith & Killingsworth 2016, k = 57); augmented game designs beat plain ones by about the same, *g* = 0.34 (value-added comparisons). Gamification: cognitive *g* = 0.49, motivational *g* = 0.36, behavioural *g* = 0.25 (Sailer & Homner 2020); game fiction and social play moderate the behavioural effect. Wouters et al. (2013): serious games are more effective (*d* = 0.29) but *not* more motivating than conventional instruction, and work best across several sessions with other instruction around them. | Games are the drill, not the lesson: keep them short and wrapped in Learn and Check, which is already the structure. Spend design effort on the mechanics that add value (feedback with an explanation, retrieval over recognition, adaptive support), not on fiction or points. |
| **Does letting the learner choose help?** | Choice raises intrinsic motivation, effort, task performance and perceived competence (Patall, Cooper & Robinson 2008, 41 studies); the effect is strongest for **two to four** successive choices and weakens with more. Cordova & Lepper (1996): in an educational game, contextualisation, personalisation and even instructionally irrelevant choices raised both motivation and learning in children. Self-determination theory: autonomy and competence are the needs that make play absorbing (Ryan, Rigby & Przybylski 2006). | Offer a **small** choice at the start of Play: two games the engine ranks highest, each with one line on why it is offered. Record the pick as a preference signal. Never offer all four, and never make the learner choose under the five-minute pace. |
| **Should "learning style" decide the game?** | The meshing hypothesis (teach to the preferred modality and outcomes improve) has no credible support (Pashler et al. 2008). Preferences do predict what people *enjoy and persist with*. | Preferences and profile choose what is *offered* and in what order. Measured outcomes (delayed accuracy, game results) drive what is *adapted*, as the engine already does. Pictures are on for everyone who has them, not gated by style. |
| **How hard should a round be?** | The optimal error rate for a broad class of learners is about 15%: training accuracy near 85% is where learning progresses fastest (Wilson et al. 2019). Dynamic difficulty adjustment keeps players in that band; self-set difficulty improves felt autonomy but learners often pick too easy. | Keep the support ladder aiming at 80 to 90%. Let the learner nudge it one rung either way ("more help" / "push me"), bounded, so autonomy is real but the engine still holds the target. |
| **Recall or recognition?** | Cued and free recall beat recognition for later retention (retrieval effort; see the companion document). | Fill the gap gains a **type it** mode once answers are steady, or when the learner asks to be pushed: the word is produced, not picked. Tolerant matching so a typo is not a miss. |
| **Does drawing or gesture help?** | The drawing effect: drawn words are recalled roughly twice as well as written ones across seven experiments (Wammes, Meade & Fernandes 2016), driven by elaborative, motoric and pictorial encoding together. | Not built: it needs a canvas and self-grading. Noted under next steps as a teach-back variant, where a signal-only score is acceptable. |
| **Are AI-generated pictures acceptable to learners?** | Students report high acceptance and trust of AI images for academic use, limited by prompt fidelity on accuracy-dependent tasks (Creativity & Cognition 2025). Classroom studies of AI-illustrated narratives in primary English are under way (Springer 2025). No meta-analytic evidence yet either way. | Generate in a fixed house style, in one batch, reviewed as an asset set rather than at run time. Alt text comes from the authored content, never from the model. Digits and letters are kept out of prompts because image models garble them. |

Product reference points: Duolingo's picture-to-word exercises for vocabulary; Brilliant's choice of "give me a hint" versus "let me try"; Kahoot's per-round choice of game type.

## Audit of the old games

| Game | What the learner did | Preference or choice | Visual | Gap |
|---|---|---|---|---|
| Match pairs | Tap a term, tap its meaning | None. Engine picks the game | Text tiles | Meaning-to-picture matching is the classic use of dual coding and is missing. |
| Put it in order | Tap to swap or arrow steps | None | Text rows | Sequence with a storyboard is more memorable than four sentences. |
| True or false | Two buttons; optional timer | Timer opt-in in settings | Text card | Fine as a drill. Touch learners have no gesture. |
| Fill the gap | Pick one of three chips | None | Text | Recognition only; never asks the learner to produce the word. |
| Play segment | Plays the one game the engine chose | Skip only | Icon | No autonomy. The learner cannot say "not this one" except by skipping, which counts against the game. |

## Design decisions

1. **Choose your game, from two.** Play opens with the engine's top two games (three only for the deep pace, where there is time). Each card says why: your best game lately, new to you, suits how you learn. The pick is a preference event and lifts that game's weight; the passed-over game drops a little. Sprint pace keeps the single engine choice. Children get the choice too.
2. **A bounded difficulty nudge.** "More help", "Just right" or "Push me" moves the support rung one step, within the ladder. It lives in settings and on the game picker. The engine's accuracy-driven rung still moves underneath it.
3. **Pictures carry meaning or are absent.** An illustration exists per pair term, per sequence step and per idea, generated at build time in one house style from the authored text. Where an image exists, match pairs pairs the term with the *picture* (meaning revealed on match, and shown alongside at the most supportive rung), and put it in order shows each step as a storyboard frame. Where none exists, the game is exactly the text game that shipped before. Nothing decorative is ever added.
4. **A fifth game that only exists when the pictures do.** *Spot it*: a picture, four terms, pick the one it shows, mixing today's terms with an earlier idea's. It is offered only when every concept in the round has illustrations, so a build without generated assets never shows it.
5. **Produce the word once you can.** Fill the gap becomes *type it* at the top support rung or under "push me": a text field, tolerant of case, accents and one typo in longer words, with the chips still one tap away for anyone stuck. Children keep chips.
6. **Touch has a gesture.** True or false accepts a swipe on the card, right for true and left for false, with the buttons kept for keyboards and switches. Motion follows the learner's profile and reduced-motion preference.
7. **Generation happens at build time, never in the browser.** The site is a static export with no server. A script reads the authored units, writes one prompt per asset in the house style, calls an image model through the Vercel AI Gateway (or Gemini or OpenAI directly), resizes to a small WebP, and records the asset in a manifest the app imports. Missing assets degrade to text. No API key is ever shipped.

## What shipped

- **Engine** (`src/lib/study.ts`): `GameId` gains `spot`; `chooseGames` ranks candidates and `chooseGame` takes its head; a `pick` event and `gamePicked` / `gamePassed` signals feed the ranking; `supportFor` takes the learner's nudge and reports `blanksTyped`; play segments carry `options`; reducers `pickedGame`, `setNudge`, `setPictures`; state fields `nudge` and `pictures` with migration defaults; `buildSession` accepts a `hasVisuals` capability so pure code never touches the manifest.
- **Visuals** (`src/lib/visuals.ts`, `src/content/visuals.json`, `public/visuals/`): the manifest, lookups per concept and kind, base-path aware URLs, and a test hook to inject a manifest.
- **Generation** (`scripts/gen-visuals.mjs`): prompts in the house style per pair term, sequence step and idea; provider adapters for the AI Gateway images endpoint, Gemini and OpenAI; WebP output through `sharp`; `--dry-run`, `--check`, `--subject`, `--unit`, `--kinds` and `--limit` flags; idempotent, so a re-run only fills gaps.
- **Games**: match pairs with picture tiles, put it in order with storyboard frames, *Spot it*, fill the gap with *type it*, true or false with swipe. Every game still reports one `onAnswer` per judgement and one `onComplete` per round, uses the session seed for every shuffle, and keeps 56 px targets for children and over-40s.
- **Play segment**: the game picker with the why-lines and the nudge control; the picked game replaces the segment's game so a reload resumes the same round.
- **Settings**: pictures on or off, and the difficulty nudge.
- **Learn**: the idea's illustration heads the See phase when it exists.
- **Tests**: unit coverage for ranking, picks, nudge, typed matching, Spot it rounds and the visuals helpers; end-to-end coverage of the picker and the type-it mode.

## How to generate the visuals

```bash
# see the plan and the prompts without calling any model
node scripts/gen-visuals.mjs --dry-run

# one unit first, to review the style before spending on all of them
AI_GATEWAY_API_KEY=... node scripts/gen-visuals.mjs --subject math --unit 1

# everything that is authored and not yet generated
AI_GATEWAY_API_KEY=... node scripts/gen-visuals.mjs

# confirm every manifest entry has its file
node scripts/gen-visuals.mjs --check
```

`GEMINI_API_KEY` or `OPENAI_API_KEY` work in place of the gateway key; `VISUALS_MODEL` overrides the model id. Ten assets per idea, thirty per unit, so an authored subject of six units is 180 images. Review the first unit's output as a set: the style must read as one system, no text or digits in frame, and every pair image must depict the *term*, not the sentence around it. Regenerate a single asset by deleting its file and re-running.

No images were generated while this was built: the pipeline was run in dry-run mode only, and the app was verified in its text-only degradation. The first real batch is the next step.

## Deliberately not built

- **Run-time generation or a bring-your-own-key setting.** Both put a key in the browser or need a server; the product is a static export by design.
- **Procedural placeholder art.** A deterministic abstract glyph per term would be decorative, which the seductive-details evidence says costs learning. Words are the right fallback.
- **Draw it back.** Strong evidence, but it belongs in the teach-back step as a signal-only variant, not in a scored game.
- **Competition and leaderboards.** Social features need accounts; the behavioural effect in the gamification literature came from fiction *and* social play together.

## How to tell whether it works

The event log now carries what is needed:

- the share of Play segments where the learner picks the engine's first candidate versus the second, and whether skips of Play fall after the picker shipped;
- accuracy and finish rate per game with pictures on versus off, for the same learner;
- *type it* accuracy versus chip accuracy on the same blanks, and the next-day rewind on those ideas;
- the distribution of the nudge setting, and rolling accuracy under each value (the engine should keep the band near 85% regardless);
- Spot it results per concept, as a check on which illustrations fail to depict their term.

## Next steps

1. Generate the first unit's visuals, review the set, then run the full authored batch.
2. Author-side review of any pair term whose illustration cannot avoid text (dates, formulas), and a `noVisual` flag in content if needed.
3. Draw-it-back as a third teach-back mode for children and visual learners.
4. Once a few weeks of events exist, let picks and per-game delayed accuracy feed `chooseGames` alongside the style prior.

## Sources

- Sundararajan, N. & Adesope, O. (2020). [Keep it coherent: a meta-analysis of the seductive details effect](https://link.springer.com/article/10.1007/s10648-020-09522-4). *Educational Psychology Review*.
- Clark, D. B., Tanner-Smith, E. E. & Killingsworth, S. S. (2016). [Digital games, design, and learning: a systematic review and meta-analysis](https://journals.sagepub.com/doi/10.3102/0034654315582065). *Review of Educational Research*, 86(1).
- Sailer, M. & Homner, L. (2020). [The gamification of learning: a meta-analysis](https://eric.ed.gov/?id=EJ1245270). *Educational Psychology Review*, 32.
- Wouters, P., van Nimwegen, C., van Oostendorp, H. & van der Spek, E. D. (2013). A meta-analysis of the cognitive and motivational effects of serious games. *Journal of Educational Psychology*, 105(2).
- Patall, E. A., Cooper, H. & Robinson, J. C. (2008). [The effects of choice on intrinsic motivation and related outcomes: a meta-analysis](https://pubmed.ncbi.nlm.nih.gov/18298272/). *Psychological Bulletin*, 134(2).
- Cordova, D. I. & Lepper, M. R. (1996). Intrinsic motivation and the process of learning: beneficial effects of contextualization, personalization, and choice. *Journal of Educational Psychology*, 88(4).
- Ryan, R. M., Rigby, C. S. & Przybylski, A. (2006). The motivational pull of video games: a self-determination theory approach. *Motivation and Emotion*, 30.
- Pashler, H., McDaniel, M., Rohrer, D. & Bjork, R. (2008). Learning styles: concepts and evidence. *Psychological Science in the Public Interest*, 9(3).
- Wilson, R. C., Shenhav, A., Straccia, M. & Cohen, J. D. (2019). [The eighty five percent rule for optimal learning](https://www.nature.com/articles/s41467-019-12552-4). *Nature Communications*, 10, 4646.
- Wammes, J. D., Meade, M. E. & Fernandes, M. A. (2016). [The drawing effect: evidence for reliable and robust memory benefits in free recall](https://pubmed.ncbi.nlm.nih.gov/26444654/). *Quarterly Journal of Experimental Psychology*; and Fernandes, Wammes & Meade (2018). [The surprisingly powerful influence of drawing on memory](https://journals.sagepub.com/doi/abs/10.1177/0963721418755385). *Current Directions in Psychological Science*.
- Higdon, K. F., Neath, I., Surprenant, A. M. & Ensor, T. M. (2025). [Distinctiveness, not dual coding, explains the picture-superiority effect](https://journals.sagepub.com/doi/10.1177/17470218241235520). *Quarterly Journal of Experimental Psychology*.
- Mayer, R. E. *Multimedia Learning* (3rd ed., 2020), for the multimedia, coherence, signalling and personalisation principles.
- [Understanding students' acceptance, trust, and attitudes towards AI-generated images for educational purposes](https://dl.acm.org/doi/10.1145/3698061.3734405). *Creativity and Cognition 2025*.
- [The impact of AI-generated and non-AI-generated images on learning outcomes and attitudes](https://link.springer.com/chapter/10.1007/978-3-031-98185-2_12). Springer, 2025.
- [Vercel AI Gateway: image generation](https://vercel.com/docs/ai-gateway/modalities/image-generation/openai), for the endpoint the generation script uses.
