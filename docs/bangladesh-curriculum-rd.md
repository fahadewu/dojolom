# Bangladesh national curriculum: R&D for Dojolom

*October 2026. Companion to `how-people-learn-rd.md` and `personality-learning-rd.md`.*

## Why this work

The brief:

1. Research the Bangladeshi school subjects properly.
2. Compile them into the app.
3. Make each learner's path their own.

Three scoping answers set the frame:

- **Levels:** all class levels.
- **Language:** lessons written in English, as in NCTB's English Version books, with the Bangla term beside each key word.
- **Personalisation:** "person to person" means *each learner gets their own path*, not peer learning.

The Open Executive instance was unreachable (connection refused), so prioritisation is the engineering team's judgement.

## What the curriculum is in 2026

- **Structure.**
  - Primary: Class 1–5.
  - Junior secondary: Class 6–8.
  - Secondary: Class 9–10, ending in the SSC.
  - Higher secondary: Class 11–12, ending in the HSC.
- **What is in force.**
  - In September 2024 the interim government withdrew the 2021 National Curriculum Framework from secondary schools, and the Science, Humanities and Business Studies groups returned to Class 9–10 (DSHE, 16 October 2024).
  - In 2026, Classes 6–12 use the 2012 curriculum. Their books were revised in October 2025, and each preface says the last 2012 version "has been taken as the basis".
  - Primary uses a revised version of the newer curriculum. Its Class 4–5 Maths, Science and BGS books are new experimental editions for 2026.
- **What is coming.**
  - 2027: revised books, including an AI section in ICT and changes to History and BGS.
  - 2028: an "extensive" new curriculum is planned.
- **Exams.**
  - SSC 2027 returns to the full syllabus and adds a short-answer section.
  - PEC and JSC have not been held since 2019. A Class 8 scholarship exam returned in December 2025.
- **Versions.** NCTB publishes an English Version of every Class 6–10 book and English editions of the primary Maths, Science and BGS books. HSC science and commerce subjects are taught from NCTB-approved private textbooks against NCTB's syllabus.

### How the chapter lists were verified

Every chapter list in the app came from NCTB's own 2026 PDFs. These are image-only scans, so each contents page was rendered and read. The sources were:

- **Class 9–10:** the 2026 Class 9–10 page (`nctb.gov.bd/pages/static-pages/695b99afc4774958d7b70612`).
- **Classes 1–8:** the class pages linked from the 2026 index (`695b97ffc4774958d7b70329`).
- **HSC ICT:** the NCTB textbook, read from the 2025 copy because the 2026 Google Drive links were over quota. It was cross-checked against NCTB's 2026–27 prescribed syllabus.
- **HSC Physics, Chemistry, Biology, Higher Mathematics and Accounting:** the "chapter arrangement and period allocation" table of NCTB's *National Curriculum 2012, Classes XI–XII* subject documents. Their English titles are our translations, except Higher Mathematics, which prints its own.

Bangla chapter titles come from three places:

- **SSC books:** the Bangla edition's wording where the writers checked it, otherwise our translation.
- **HSC:** the NCTB syllabus documents.
- **Classes 1–8:** our translations, because only the English editions' contents pages were read. They should be checked against the Bangla-edition PDFs, whose IDs are recorded in the research notes.

## What the app now holds: the catalogue

`src/lib/curriculum-bd.ts` holds 54 books and 602 chapters, each a subject whose units are its textbook chapters in book order. Students choose a class, then a group from Class 9, then up to three books.

| Stage | Books |
|---|---|
| Class 1–2 | Elementary Mathematics |
| Class 3–5 | Elementary Mathematics, Elementary Science, Bangladesh and Global Studies |
| Class 6–7 | Mathematics, Science, BGS, ICT, English Grammar |
| Class 8 | Mathematics, Science, BGS, ICT, English Grammar |
| Class 9–10, compulsory | Mathematics, ICT, English Grammar (2nd paper), Bangla Grammar (2nd paper) |
| Class 9–10, Science | Physics, Chemistry, Biology, Higher Mathematics, BGS |
| Class 9–10, Humanities | Science, History of Bangladesh and World Civilization, Geography and Environment, Economics, Civics and Citizenship |
| Class 9–10, Business Studies | Science, Accounting, Finance and Banking, Business Entrepreneurship |
| Class 11–12 | ICT; Physics, Chemistry, Biology and Higher Mathematics (1st and 2nd papers, Science); Accounting (1st and 2nd papers, Business Studies) |

Details worth knowing:

- **Physics has 13 chapters, not 14.** The old "Physics to Save Life" chapter was removed, so older guidebooks will not match.
- **Bangla Grammar (2nd paper)** is grouped into 10 units the way its 30 MCQs test it, rather than the book's 43 grammar chapters.
- **English Grammar** follows the grammar part of each book. The composition part needs written answers marked against a model, which the app does not auto-check.
- **Class 1 Mathematics** has two chapters called "Let us do". The app names them "Let us do (1)" and "Let us do (2)".

### Deliberately not in the catalogue

- **Literature papers** (Bangla and English 1st paper):
  - They are close study of set texts, which are copyrighted, rather than concepts to drill.
  - The app's lesson shape (guess, try, see, say, retrieve) teaches ideas, not passages.
- **Religion:** four separate books, a sensitive area best authored with the communities concerned.
- **Continuous-assessment subjects:** Career Education, and Physical Education, Health Science and Sports.
- **HSC Humanities and the other Business Studies subjects:** their textbooks are private and no chapter list was verified from a primary source.
- **Madrasah (Dakhil, Alim) and technical streams:** separate boards and books. They are a natural next step once the general stream has content.

## How a chapter is taught

Every chapter is a unit of three ideas, taught with the same evidence-based loop as everyday subjects: guess, try, see, say, then retrieval spaced by the FSRS memory model. Three additions make it a Bangladeshi school book.

1. **Bangla terms beside the English.**
   - Every concept carries a glossary of 2 to 8 key words, each with the exact term used in the Bangla-medium book (for example velocity · বেগ). It is shown under the lesson title before the idea uses the words.
   - Every unit carries its Bangla chapter title.
   - The validator rejects a glossary entry without Bangla script, so a missing translation cannot ship.
2. **The board's own question format.**
   - A creative question (সৃজনশীল প্রশ্ন) is a scenario (উদ্দীপক) followed by four parts marked 1, 2, 3 and 4: ক knowledge, খ comprehension, গ application, ঘ higher-order. CQs carry most of the marks in SSC and HSC.
   - Every curriculum unit carries one. It is practised right after the unit checkpoint, except at the five-minute pace.
   - The learner answers each part in writing or in their head, sees the answer a marker would accept, and marks themselves.
   - Self-marks are logged as signals and never as memory evidence. The summary names the part to practise. National assessments find students weakest on application and higher-order items, so those are the parts the feedback targets.
3. **Grades in the board's scale.** Checkpoints in curriculum subjects show the grade a score would earn:
   - A+ ≥ 80, A ≥ 70, A- ≥ 60, B ≥ 50, C ≥ 40, D ≥ 33.
   - When the learner set a target grade at sign-up, the line compares the score with it. Setting a concrete grade goal is among the stronger correlates of attainment (r ≈ .35, Richardson et al. 2012).

The MCQ checks, think-first rewinds and short retakes already match the MCQ and short-answer sections of the exam.

## Content written in this pass

The writers worked from the NCTB textbooks themselves, English and Bangla editions, mostly by reading the rendered page images. They followed a fixed brief, `docs/bd-chapter-brief.md`:

- textbook-accurate facts and notation;
- Bangladeshi settings and names;
- Bangla glossary terms copied from the Bangla-medium book;
- a board-style creative question with full-marks answers and working;
- the validator passing with no errors.

**First chapters authored:**

| Book | Chapter 1 concepts |
|---|---|
| SSC Mathematics | Rational and irrational numbers; recurring decimals and fractions; adding recurring decimals |
| SSC Physics | Fundamental and derived quantities; dimensions; slide calipers and screw gauge |
| SSC Chemistry | What chemistry studies; hazard symbols; the six steps of an investigation |
| SSC Biology | Branches of biology; the five kingdoms; taxonomic ranks and binomial names |
| SSC ICT | The knowledge age; e-learning and e-governance; e-services and e-commerce |
| Class 8 Mathematics | Number patterns; sums of consecutive numbers; geometric patterns as algebra |
| SSC Higher Mathematics | Power sets and the number of subsets; domain, range and inverse relations; one-one, onto and inverse functions |
| SSC Bangladesh and Global Studies | The Language Movement and Bengali nationalism; the United Front, martial law and discrimination; the Six-Point Programme, the 1969 uprising and the 1970 election |
| SSC Science (Humanities, Business) | Food, nutrition and its components; vitamins, minerals, water and fibre; body mass index and a balanced diet |
| SSC English Grammar | Five kinds of nouns; number and gender; possessives and apposition |
| SSC Accounting | What accounting is and why; users of accounting information; accounting for society, values and accountability |
| Class 5 Mathematics | Multiplying by a big number; the simple method for zeros and numbers like 99; dividing by a big number and checking |
| Class 6 Science | Science and the scientific process; units and the SI system; measuring length, mass, time and volume |
| HSC Physics 1st Paper | Zero error, backlash and the spherometer; dimensional analysis; errors, their propagation and significant figures |

That is 14 chapters across 14 books, each added once it passed the validator. The scheduler only plays a book's chapters from chapter 1 onward, so each of these books is usable from its first chapter.

**Notes from the writers that a reviewer should know:**

- **Chemistry:** the textbook's ammonium chloride figures are illustrative. A real 5 g portion in 250 mL cools the water by about 1.3 °C, so the creative question uses 50 mL to keep its readings realistic.
- **Physics:** the textbook still defines the kilogram by the platinum-iridium cylinder, which is no longer the SI definition. The lesson does not state either definition.
- **ICT:** the English edition dates Babbage's Difference Engine to 1991. That is when the Science Museum built it, as the Bangla edition makes clear.
- **BGS:** written from the 2013 English Version (the current PDF was not reachable), so wording may differ from the 2026 print. The textbook's "6 September 1956" for the Indo-Pak war is corrected to 1965, its "Chief Minister of Pakistan" for Nazimuddin in 1948 is left out, and the 1954 seat count follows the textbook (223 of 237), though some sources give 228.
- **SSC Science:** three concepts cover food, vitamins and BMI; the chapter's later sections (preservatives such as formalin and carbide, tobacco, drugs, AIDS, exercise and rest) are not yet taught. The book's own "25 is a healthy BMI" contradicts its chart, so the chart's thresholds are used.
- **Class 6 Science:** the English edition names the fundamental SI quantity as "electric charge, culomb"; its own later lesson and the Bangla edition give electric current and the ampere, which the lesson follows. As with SSC Physics, the outdated metre and kilogram definitions are not stated.
- **SSC Higher Mathematics:** the English Version PDF could not be opened, so the content comes from Bangladeshi study sources and the textbook's exercise solutions (sattacademy, schoolmathbd, teachers.gov.bd). Check against the book. The Bangla for codomain, image and pre-image was not confirmed, so those terms are left out of the glossary.
- **HSC Physics 1st Paper:** built from syllabus pages, teachers.gov.bd lessons and HSC question sets rather than the textbook itself. Check its glossary term তাৎপর্যপূর্ণ অঙ্ক (significant figures) against the Bangla-medium book.
- **SSC English Grammar:** the Bangla term সমানাধিকরণ (apposition) rests on the writer's knowledge, not a source.
- **Accounting:** amounts are written with ৳ rather than "Tk.", because the validator reads the full stop in "Tk." as a sentence end. The chapter does not teach the accounting equation (it starts in chapter 2).
- **Best source:** nctb.gov.bd's 2026 class pages link English and Bangla Version PDFs on drive.egovcloud.gov.bd (used for Class 5 Mathematics and Class 6 Science). The chapter brief now sends writers there first.

## Reaching every chapter

The catalogue holds 602 chapters, so writing all of them is a pipeline, not one pass:

1. Fill in `docs/bd-chapter-brief.md` with the subject, chapter and Bangla title.
2. Give it to a writer (one agent per chapter; 8 at a time stays under the account rate limit).
3. Validate it: `UNIT_FILE=… npx vitest run tests/unit/content-file.test.ts`.
4. Run `node scripts/gen-content-index.mjs`.

Units are scheduled only when they are contiguous from chapter 1, so a book becomes usable chapter by chapter. Write in this order:

1. Chapters 2–4 of the SSC science-group books and Mathematics.
2. The rest of SSC.
3. Class 8 and HSC.
4. Classes 6–7.
5. Primary.

Primary needs a child-reviewed pass for language level.

## Context that shaped the design

- **Learning levels:**
  - Grade 5: about 10% at grade level in Bangla and 16% in Mathematics (NSA 2017).
  - Grade 8: "poor" mathematics results rose from about 22% in 2019 to 47% in 2023.
  - Learning poverty: about 51% (World Bank).
  - Students do worst on application and higher-order items.
- **Private tuition and guidebooks:** more than three quarters of Class 5–9 students use tutors or coaching (CAMPE 2023). Guidebooks drive rote learning. The app's emphasis on retrieval, explanation and the higher-order CQ parts is the counterweight.
- **Devices:**
  - 75% of households have a smartphone, but only about 9% have a computer.
  - Mobile data is cheap but slow.
  - The app is already a static, offline-first site. Units load lazily per subject, so a learner downloads only the books they chose.
- **Evidence that remote, structured practice works in Bangladesh:**
  - Free phone audio lessons: +0.60 SD (RCT, 1,763 children).
  - Phone tutoring of children and mothers: large gains that lasted a year.
  - Self-paced Kumon mathematics in BRAC schools: +0.78 to +1.22 SD.
  - No impact evaluations exist for 10 Minute School, Muktopaath or Shikkhok Batayon.

## How to tell whether it works

- **Per book:** completion of chapter paths and checkpoint pass rate, and their trend from chapter to chapter.
- **Creative questions:** self-marks per part (ক to ঘ), and whether the higher-order share rises over a learner's first month.
- **Grade gap:** checkpoint scores against target grade, and how quickly the gap closes after correctives.
- **Bangla terms:** a later check asking for the Bangla term should show whether the glossary sticks.

## Sources

- NCTB 2026 textbook pages: Class 9–10 `nctb.gov.bd/pages/static-pages/695b99afc4774958d7b70612`; Class 8 `695b9858c4774958d7b703d8`; index `695b97ffc4774958d7b70329`; HSC `6922e145933eb65569e2b37b`; National Curriculum 2012 (XI–XII) files `nctb.gov.bd/pages/files/6922dbc6933eb65569e0c702`.
- NCTB, *SSC subject-wise assessment guidelines and mark distribution, effective 2027* (6 February 2025).
- Reporting on the 2024 curriculum decision and 2027–28 plans: bdnews24 (28 and 29 December 2024), Ittefaq (16 October 2024), Dhaka Tribune (July 2025), Prothom Alo (22 September 2026), The Business Standard and Prothom Alo on SSC 2026.
- Learning outcomes: World Bank, *Whither Quality?* (Bhatta & Sharma 2019); ACER on NSA 2022; DSHE National Assessment of Secondary Students 2023 (Prothom Alo, October 2025); World Bank learning poverty brief (April 2024); CAMPE Education Watch 2023.
- Access: BBS ICT Access and Use Survey 2026 (UNB); GSMA Bangladesh report.
- Evaluations:
  - Wang, Vlassopoulos, Islam & Hassan, IZA DP 15920 / *JPE Micro* 2024.
  - Hassan, Islam, Siddique & Wang, *Economic Journal* 2024.
  - Sawada et al. 2017, Kumon in BRAC schools.
- Richardson, Abraham & Bond (2012). Psychological correlates of university students' academic performance. *Psychological Bulletin*, 138(2).
