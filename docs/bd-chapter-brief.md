<!-- Brief given to one writer per NCTB chapter. Fill the {PLACEHOLDERS} from src/lib/curriculum-bd.ts, then hand it over. -->

You are writing ONE unit of lesson content for Dojolom, a learning app, covering ONE chapter of a Bangladesh national curriculum (NCTB) textbook. Work only inside the repository at /Users/leopard-workstation-office/Downloads/dojolom. Write exactly one new file and change nothing else.

## Your unit
- Subject id: `{SUBJECT}` ({BOOK}, {STAGE})
- Unit number: {UNIT} (this is chapter {UNIT} of the book)
- Unit title (must match exactly): `{TITLE}`
- Bangla chapter title for `titleBn`: `{TITLE_BN}`
- File to create: `src/content/{SUBJECT}/unit-{UNIT}.ts`
- Learners: {LEARNERS}

## How to work
1. Read these first:
   - `src/content/types.ts`: the schema. Note `glossary`, `titleBn` and `cq`, which curriculum units must fill.
   - `src/content/validate.ts`: every rule your file must pass.
   - `src/content/_template.ts`: the shape.
   - `src/content/science/unit-1.ts`: the quality and voice to match. Read at least the first concept fully.
2. Find out what this NCTB chapter actually teaches: its sections, definitions, formulas, standard examples and the terms the textbook uses. Use WebSearch and WebFetch. Start from NCTB's own 2026 textbook pages: nctb.gov.bd lists each class under `pages/static-pages/…` with English Version and Bangla Version PDFs hosted on drive.egovcloud.gov.bd. Many PDFs are scanned images, so render the pages and read them. Fall back to mirrors (nctbbooks.com) or reliable Bangladeshi study sources (teachers.gov.bd, sattacademy.com) only when the official PDF is unavailable, and say which edition you used. Keep downloads in the scratchpad, never in the repository. Do not invent curriculum content. If a source and your knowledge disagree, follow the textbook. If the English and Bangla editions disagree, or the textbook has a plain error, follow the correct version and report it.
3. Split the chapter into exactly 3 concepts, ordered from easiest to hardest. Each concept should be one of the chapter's main, most exam-relevant ideas. Concept ids are `{SUBJECT}-{UNIT}-1`, `-2` and `-3`.
4. Write the file with `satisfies UnitContent` and `export default unit`, following the template exactly.
5. Validate until it passes with zero errors:
   `UNIT_FILE=src/content/{SUBJECT}/unit-{UNIT}.ts npx vitest run tests/unit/content-file.test.ts`
   Also run `npx tsc --noEmit -p .` and fix any errors in your file.

## Content rules
These come on top of the validator.

**Accuracy**
- Every fact, number, formula, unit and answer must be correct. Check each quiz `answer` index against its options.
- Use SI units and the textbook's notation, for example "v = u + at". Write formulas in plain text, with no LaTeX.

**Bangladeshi context**
- Stories and examples are set in Bangladesh: named characters with Bangladeshi names (e.g., Rafi, Nusrat, Tanvir, Mitu), real places (Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Cox's Bazar, the Padma, the Jamuna), taka (৳ or "taka"; not "Tk.", whose full stop the validator counts as a sentence end), and everyday life (rickshaws, ferries, monsoon, load-shedding, markets, cricket).
- Stay respectful and avoid stereotypes.

**Language**
- Clear English at the level of the NCTB English Version for these learners.
- Short sentences, sentence case, no exclamation marks, and no square brackets anywhere.

**Glossary**
- Every concept needs 2 to 8 key words. Each entry is `{ term, bn }`, where `bn` is the exact term used in the Bangla-medium NCTB book, in Bangla script.
- Examples: velocity → বেগ, acceleration → ত্বরণ, photosynthesis → সালোকসংশ্লেষণ, set → সেট.
- Accuracy matters: students will meet these words in exams.

**Creative question (`cq`)**
- One per unit, in the SSC/HSC board style:
  - `stem`: a 2 to 6 sentence scenario set in Bangladesh, with the numbers or details the parts need.
  - `knowledge` (ক, 1 mark): recall a definition or fact.
  - `comprehension` (খ, 2 marks): explain why or how.
  - `application` (গ, 3 marks): use the chapter on the stem, usually a calculation with steps.
  - `higherOrder` (ঘ, 4 marks): analyse, compare or judge using the stem, with reasons.
- Each `a` is the answer an examiner would award full marks, with working shown for calculations.

**Teaching quality**
- `misconception` is a real mistake students make in this chapter.
- `example` is a small problem a student can try before being taught.
- `order` is a genuine sequence: steps of a method, a process, or a derivation.
- `blitz` holds 2 true and 2 false statements. False statements are plausible errors, not silly ones.

When finished, reply with: the file path, the 3 concept titles, the sources you used for the chapter content, and the final validator output line.
