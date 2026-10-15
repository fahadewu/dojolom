import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-math",
  unit: 1,
  title: "Real Numbers",
  titleBn: "বাস্তব সংখ্যা",
  summary: "After this unit you can sort real numbers into rational and irrational, prove that a number like √2 is irrational, change fractions and recurring decimals into each other, and add or subtract recurring decimals by making them similar.",
  concepts: [
    {
      id: "bd-ssc-math-1-1",
      title: "Rational and irrational numbers",
      hook: "The diagonal of a square table with 1 metre sides is exactly √2 metres long. Yet no fraction, however clever, is exactly equal to it.",
      steps: [
        { label: "Count", text: "Natural numbers 1, 2, 3, ... are for counting. Add 0 and the negative whole numbers −1, −2, −3, ... and you get the integers." },
        { label: "Divide", text: "A rational number can be written as p/q, where p and q are integers and q ≠ 0. So 3 = 3/1, 5.5 = 11/2 and 1.666... = 5/3 are all rational." },
        { label: "Test roots", text: "An irrational number cannot be written as p/q. The square root of any natural number that is not a perfect square, like √2, √3 or √5, is irrational." },
        { label: "Combine", text: "All rational and irrational numbers together form the real numbers. Every real number is either rational or irrational, never both." },
      ],
      analogy: "Rational numbers are like marks on a ruler cut into equal parts. Cut each metre into tenths, hundredths or sevenths, and √2 still falls between two marks. No equal cutting ever lands on it exactly.",
      story: [
        "Tanvir's father, a carpenter in Mirpur, Dhaka, was making a square table top exactly 1 metre on each side. He wanted a wooden strip from one corner to the opposite corner. 'How long must it be?' he asked.",
        "Tanvir used Pythagoras' theorem: the diagonal squared is 1² + 1² = 2, so the diagonal is √2 metres. His calculator showed 1.414213562. He tried to find a fraction for it. 7/5 squared gave 1.96, and 99/70 squared gave about 2.0002. Every guess came close to 2 but never landed on it.",
        "Next day, Mr Karim explained it in class. 'If √2 were p/q in lowest terms, a whole number would have to equal a number that is not whole,' he said. 'So √2 is irrational. The strip has an exact length, but no fraction can name it.' His father cut it at 141.4 cm, an approximate value that was close enough for wood.",
      ],
      deepRead: [
        "Natural numbers 1, 2, 3, ... are used for counting, and together with 0 and the negative whole numbers they make the integers. A rational number is any number of the form p/q, where p and q are integers and q ≠ 0, so every integer and every fraction is rational. A number that cannot be written in this form is irrational. The square root of a natural number that is not a perfect square is irrational, for example √2 = 1.414213... and √3 = 1.732... Rational and irrational numbers together are called real numbers.",
        "The textbook proves that √2 is irrational. Since 1² = 1 and 2² = 4, we have 1 < √2 < 2, so √2 is not an integer. Suppose √2 = p/q, where p and q are co-prime natural numbers and q > 1. Squaring gives 2 = p²/q², and multiplying both sides by q gives 2q = p²/q. Now 2q is an integer, but p²/q is not, because p and q have no common factor other than 1 and q > 1. The two sides cannot be equal, so √2 cannot be written as p/q. Hence √2 is irrational.",
        "Since the decimal of an irrational number never ends or repeats, we often use an approximate value. For √13 = 3.605551..., the value up to 3 decimal places is 3.605, but the approximate value up to 3 decimal places is 3.606, because the next digit is 5. There are irrational numbers between any two different real numbers too: between √3 and 4 lie √3 + 1 = 2.732... and √3 + 2 = 3.732...",
      ],
      example: {
        question: "Which of these numbers is irrational?",
        options: ["√16", "√7", "1.666...", "22/7"],
        answer: 1,
        why: "7 is not a perfect square, so √7 = 2.6457... never ends or repeats, while the others can all be written as p/q.",
      },
      keyPoints: [
        "A rational number can be written as p/q, where p and q are integers and q is not 0.",
        "The square root of a natural number that is not a perfect square, such as √2 or √5, is irrational.",
        "Rational and irrational numbers together make up the real numbers.",
      ],
      misconception: {
        belief: "√2 = 1.414, which is a terminating decimal, so √2 must be a rational number.",
        correction: "1.414 is only an approximate value of √2, because 1.414 × 1.414 = 1.999396, not 2. The decimal of √2 is 1.4142135... and it never ends or repeats, which is exactly why √2 is irrational.",
      },
      quiz: [
        {
          question: "Which of these numbers is rational?",
          options: ["√5", "√9", "√12"],
          answer: 1,
          why: "9 is a perfect square, so √9 = 3 = 3/1, which is rational.",
        },
        {
          question: "In the proof that √2 is irrational, p and q are taken to be co-prime. What does co-prime mean?",
          options: ["Both numbers are prime", "Their HCF is 1", "Both numbers are even"],
          answer: 1,
          why: "Co-prime numbers have no common factor other than 1, such as 6 and 35.",
        },
        {
          question: "Which of these is an irrational number between 2 and 3?",
          options: ["2.5", "√5", "√10", "2.333..."],
          answer: 1,
          why: "√5 = 2.236... lies between 2 and 3 and never ends or repeats, while √10 = 3.162... is greater than 3.",
        },
      ],
      pairs: [
        { term: "Natural number", match: "A counting number such as 1, 2 or 3" },
        { term: "Integer", match: "Zero together with the positive and negative whole numbers" },
        { term: "Rational number", match: "Can be written as p/q with integers p, q and q ≠ 0" },
        { term: "Irrational number", match: "Cannot be written as a ratio of two integers" },
        { term: "Co-prime numbers", match: "Two numbers whose HCF is 1" },
      ],
      order: {
        prompt: "Put the steps of the textbook proof that √2 is irrational in order.",
        items: [
          "Show that 1 < √2 < 2, so √2 is not an integer",
          "Suppose √2 = p/q, with p and q co-prime and q > 1",
          "Square both sides and multiply by q to get 2q = p²/q",
          "Note that 2q is an integer but p²/q is not, a contradiction",
        ],
      },
      blitz: [
        { statement: "Every integer is a rational number.", truth: true, why: "Any integer n can be written as n/1." },
        { statement: "√49 is an irrational number.", truth: false, why: "49 is a perfect square, so √49 = 7, which is rational." },
        { statement: "Every real number is either rational or irrational.", truth: true, why: "The real numbers are made of exactly these two groups, and no number is in both." },
        { statement: "The product of two irrational numbers is always irrational.", truth: false, why: "√2 × √2 = 2, which is rational." },
      ],
      blanks: [
        { sentence: "A number that can be written as p/q, where p and q are integers and q ≠ 0, is a ___ number.", options: ["rational", "irrational", "natural"], answer: 0 },
        { sentence: "The square root of a natural number that is not a perfect square is ___.", options: ["an integer", "irrational", "a recurring decimal"], answer: 1 },
      ],
      terms: ["rational", "irrational", "p/q form", "co-prime", "perfect square", "real number"],
      sayPrompt: "Explain to a friend why √2 cannot be written as a fraction p/q.",
      glossary: [
        { term: "Real number", bn: "বাস্তব সংখ্যা" },
        { term: "Natural number", bn: "স্বাভাবিক সংখ্যা" },
        { term: "Integer", bn: "পূর্ণসংখ্যা" },
        { term: "Rational number", bn: "মূলদ সংখ্যা" },
        { term: "Irrational number", bn: "অমূলদ সংখ্যা" },
        { term: "Co-prime numbers", bn: "সহমৌলিক সংখ্যা" },
        { term: "Perfect square", bn: "পূর্ণবর্গ সংখ্যা" },
        { term: "Approximate value", bn: "আসন্ন মান" },
      ],
    },
    {
      id: "bd-ssc-math-1-2",
      title: "Recurring decimals and simple fractions",
      hook: "Divide 23 by 6 and you get 3.8333..., with 3s that never stop. Yet this endless decimal is an exact fraction, and a short rule turns it back.",
      steps: [
        { label: "Divide", text: "Divide the numerator by the denominator. If the fraction in lowest terms has a prime factor other than 2 or 5 in its denominator, the digits start to repeat: 3/11 = 0.2727..." },
        { label: "Mark it", text: "The repeating digits are the recurring part. Put a recurring point over a single recurring digit, or over the first and last digits of a longer block: 3.124124... is written 3.1̇24̇." },
        { label: "Pure or mixed", text: "If only the recurring part follows the decimal point, the decimal is pure, like 0.3̇. If other digits come first, it is mixed, like 5.13̇45̇." },
        { label: "Convert back", text: "Numerator: the number without its points, minus the non-recurring part. Denominator: one 9 per recurring digit, then one 0 per non-recurring decimal digit. So 5.13̇45̇ = (51345 − 51)/9990." },
      ],
      analogy: "A recurring decimal is like a ceiling fan. The same blades keep coming round for ever, but once you know how many blades there are and where they start, you know the whole pattern. That is why one exact fraction can describe it.",
      story: [
        "Mitu and her two cousins in Khulna bought a ৳100 box of sweets to share at Eid. Mitu divided 100 by 3 on her phone. It showed 33.33333333. 'It just runs off the screen,' she said. 'Is there no exact share?'",
        "Her elder brother Rafi took a pencil. 'Call the decimal part x, so x = 0.333... Then 10x = 3.333... Take x away and the endless tails cancel: 9x = 3, so x = 1/3.' Each cousin owed exactly 33 1/3 taka, which is 100/3.",
        "Mitu tried one herself: 5 ÷ 6 = 0.8333..., where only the 3 repeats. Rafi showed her the rule. On top, 83 − 8 = 75. Below, 90: one 9 for the recurring 3 and one 0 for the 8. Then 75/90 = 5/6. 'Back where it started,' Mitu said.",
      ],
      deepRead: [
        "Every real number can be written as a decimal fraction, and there are three kinds. A terminating decimal has a finite number of digits after the point, like 0.12 or 7.832. A recurring decimal repeats some digits for ever, like 3.333... or 2.454545... A non-terminating decimal never ends and never repeats, like 1.4142135... Terminating and recurring decimals are rational, and non-terminating decimals are irrational. If a fraction's denominator has a prime factor other than 2 and 5, the division never ends. The remainders are always smaller than the denominator, so one soon comes back and the digits repeat. For example, 23/6 = 3.8333... = 3.83̇.",
        "To convert 5.13̇45̇ = 5.1345345... into a simple fraction, note that 345 recurs and 1 does not. Multiplying by 10000 gives 51345.345345..., and multiplying by 10 gives 51.345345... Subtracting, the endless tails cancel: 9990 × 5.13̇45̇ = 51345 − 51 = 51294. So 5.13̇45̇ = 51294/9990 = 8549/1665, or 5 and 224/1665.",
        "This gives the textbook rule. The numerator is the number formed by removing the decimal and recurring points, minus the number formed by the non-recurring digits (51345 − 51). The denominator has one 9 for each recurring digit, followed by one 0 for each non-recurring digit after the point (9990). A pure recurring decimal needs no zeros, so 0.2̇4̇ = 24/99 = 8/33.",
      ],
      example: {
        question: "Which fraction is equal to 0.2727..., where 27 repeats for ever?",
        options: ["27/100", "3/11", "27/90"],
        answer: 1,
        why: "Two digits recur, so 0.2727... = 27/99, which simplifies to 3/11.",
      },
      keyPoints: [
        "Terminating and recurring decimals are rational numbers, but non-terminating, non-recurring decimals are irrational.",
        "A fraction in lowest terms gives a recurring decimal when its denominator has a prime factor other than 2 and 5.",
        "To convert a recurring decimal, put one 9 for each recurring digit and one 0 for each non-recurring decimal digit in the denominator.",
      ],
      misconception: {
        belief: "To change 0.2̇4̇ into a fraction, I just write 24 over 100, the same as for 0.24.",
        correction: "24/100 = 0.24 stops after two places, but 0.2̇4̇ = 0.242424... goes on for ever. Multiplying by 100 and subtracting the original gives 99 × 0.2̇4̇ = 24, so 0.2̇4̇ = 24/99 = 8/33. A recurring part needs 9s in the denominator, not 0s.",
      },
      quiz: [
        {
          question: "Which of these is a mixed recurring decimal?",
          options: ["0.555...", "0.3636...", "2.1888..."],
          answer: 2,
          why: "In 2.1888... the digit 1 comes after the point before the recurring 8, so it is mixed; the other two are pure.",
        },
        {
          question: "Which fraction gives a terminating decimal?",
          options: ["7/12", "3/40", "5/6", "2/9"],
          answer: 1,
          why: "40 = 2 × 2 × 2 × 5 has no prime factor other than 2 and 5, so 3/40 = 0.075 terminates.",
        },
        {
          question: "Using the rule, which fraction equals 3.7878..., where 78 recurs?",
          options: ["378/99", "125/33", "189/50"],
          answer: 1,
          why: "The numerator is 378 − 3 = 375 and the denominator is 99, so 375/99 = 125/33.",
        },
      ],
      pairs: [
        { term: "Terminating decimal", match: "A finite number of digits after the point, like 0.52" },
        { term: "Recurring decimal", match: "Some digits after the point repeat for ever" },
        { term: "Recurring part", match: "The block of digits that keeps repeating" },
        { term: "Pure recurring decimal", match: "Only the recurring part comes after the decimal point" },
        { term: "Mixed recurring decimal", match: "Other decimal digits come before the recurring part" },
      ],
      order: {
        prompt: "Put the steps for turning 0.2̇4̇ into a simple fraction in order.",
        items: [
          "Write 0.2̇4̇ as 0.242424... to see that two digits recur",
          "Multiply by 100 to get 24.242424...",
          "Subtract the original number, so 99 times it equals 24",
          "Divide by 99 and simplify: 24/99 = 8/33",
        ],
      },
      blitz: [
        { statement: "All recurring decimals are rational numbers.", truth: true, why: "Every recurring decimal can be converted into a fraction p/q." },
        { statement: "Every non-terminating decimal is irrational.", truth: false, why: "0.333... never ends but it repeats, so it equals 1/3, which is rational." },
        { statement: "0.555..., with 5 recurring, is equal to 5/9.", truth: true, why: "One recurring digit gives one 9 in the denominator, so 0.5̇ = 5/9." },
        { statement: "5/16 gives a recurring decimal because 16 does not divide 10.", truth: false, why: "16 = 2 × 2 × 2 × 2 has no prime factor other than 2, so 5/16 = 0.3125 terminates." },
      ],
      blanks: [
        { sentence: "Terminating and recurring decimals are rational, but a non-terminating, non-recurring decimal is ___.", options: ["rational", "irrational", "an integer"], answer: 1 },
        { sentence: "In 5.1345345..., the recurring part is ___.", options: ["345", "1345", "134"], answer: 0 },
      ],
      terms: ["recurring part", "non-recurring part", "multiply", "subtract", "nines", "zeros"],
      sayPrompt: "Explain to a friend how to turn 0.2424... into a fraction, and why the denominator is 99.",
      glossary: [
        { term: "Decimal fraction", bn: "দশমিক ভগ্নাংশ" },
        { term: "Terminating decimal", bn: "সসীম দশমিক ভগ্নাংশ" },
        { term: "Recurring decimal", bn: "আবৃত্ত দশমিক ভগ্নাংশ" },
        { term: "Non-terminating decimal", bn: "অসীম দশমিক ভগ্নাংশ" },
        { term: "Recurring part", bn: "আবৃত্ত অংশ" },
        { term: "Pure recurring decimal", bn: "বিশুদ্ধ পৌনঃপুনিক ভগ্নাংশ" },
        { term: "Mixed recurring decimal", bn: "মিশ্র পৌনঃপুনিক ভগ্নাংশ" },
        { term: "Simple fraction", bn: "সাধারণ ভগ্নাংশ" },
      ],
    },
    {
      id: "bd-ssc-math-1-3",
      title: "Adding recurring decimals by making them similar",
      hook: "You cannot add 0.6̇ and 0.4̇5̇ by lining them up like prices at the bazar. Make them similar first, and they add almost like ordinary decimals.",
      steps: [
        { label: "Count digits", text: "For each decimal, count the non-recurring digits after the point and the recurring digits. Decimals with equal counts of both are similar recurring decimals." },
        { label: "Match the start", text: "Give every decimal the largest non-recurring count among them by writing out recurring digits. A terminating decimal is extended with zeros." },
        { label: "Match the length", text: "Make every recurring part as long as the LCM of the recurring lengths. Writing a recurring block again never changes the value: 0.4̇5̇ = 0.4̇545̇." },
        { label: "Add and fix", text: "Add as ordinary decimals. Any carry from the first recurring column is added to the last digit. In subtraction, a borrow there means taking 1 off the last digit." },
      ],
      analogy: "Think of two ferries at Daulatdia ghat on the Padma, one leaving every 2 hours and the other every 3. Their timetables only line up over a 6-hour cycle, the LCM. Similar recurring decimals put every repeating pattern on one shared cycle.",
      story: [
        "Nusrat was doing her maths homework in Sylhet when load-shedding began. By candlelight she added 0.6̇ and 0.4̇5̇. She wrote 0.66 and 0.45 under each other, added them, and got 1.1̇1̇.",
        "Her cousin Rafi checked with fractions. 'That is 2/3 + 5/11 = 37/33,' he said, 'which is 1.1212..., not 1.1111...' Nusrat frowned. Where had the missing 1 gone?",
        "Rafi wrote the next digits of each decimal after a line: 0.66|66 and 0.45|45. 'The 6 + 4 just past the line, with its own carry, makes 11 and sends 1 back into your last place,' he said. 'Whatever the first recurring column carries is added to the last digit.' The answer became 1.1̇2̇. When the lights came back, it still matched 37/33.",
      ],
      deepRead: [
        "Two or more recurring decimals are similar when they have the same number of non-recurring digits after the point and the same number of recurring digits. So 12.4̇5̇ and 6.3̇2̇ are similar, but 3.4̇5̇ and 2.1̇23̇ are not. Writing the recurring block again does not change a value, and the recurring part may start later: 0.4̇5̇, 0.4̇545̇ and 0.45̇4̇ are all 0.454545...",
        "To make decimals similar, give each the largest number of non-recurring digits found among them, and make each recurring part as long as the LCM of the recurring lengths. For 5.6̇, 7.34̇5̇ and 10.784̇23̇, the non-recurring counts are 0, 1 and 2, and the recurring lengths are 1, 2 and 3. So each gets 2 non-recurring digits and 6 recurring digits: 5.666̇66666̇, 7.345̇45454̇ and 10.784̇23423̇.",
        "Then add as ordinary decimals and fix the end. For 3.4̇5̇ + 2.1̇23̇, write 3.4̇54545̇ + 2.1̇23123̇ = 5.577668. Nothing is carried out of the first recurring column, so the sum is 5.5̇77668̇. For 0.6̇ + 0.4̇5̇, write 0.6̇6̇ + 0.4̇5̇ = 1.11. The first recurring column gives 6 + 4 + 1 = 11, so 1 is added to the last digit: 1.1̇2̇. In subtraction, a borrow in the first recurring column means taking 1 off the last digit: 5.3̇3̇ − 2.4̇5̇ gives 2.88, which becomes 2.8̇7̇.",
      ],
      example: {
        question: "Which pair are similar recurring decimals?",
        options: ["2.4545... and 6.3232...", "0.333... and 0.4545...", "1.2333... and 1.2323..."],
        answer: 0,
        why: "Both have no non-recurring digits and a 2-digit recurring part; the other pairs differ in one count or the other.",
      },
      keyPoints: [
        "Recurring decimals are similar when they have the same number of non-recurring digits and the same number of recurring digits.",
        "To make decimals similar, use the largest non-recurring count and the LCM of the recurring lengths.",
        "After adding, add any carry from the first recurring column to the last digit; after subtracting, take 1 off it if that column borrowed.",
      ],
      misconception: {
        belief: "To make 0.4̇5̇ and 0.1̇23̇ similar, I can just put zeros at the end, as with ordinary decimals.",
        correction: "Zeros change the value of a recurring decimal: 0.454545... is not 0.450000. Extend it by writing the recurring digits again, as 0.4̇54545̇ and 0.1̇23123̇, with recurring parts of 6 digits, the LCM of 2 and 3. Zeros only extend terminating decimals.",
      },
      quiz: [
        {
          question: "To add 1.222..., 3.4545... and 0.123123..., how many digits should each recurring part have?",
          options: ["3", "5", "6"],
          answer: 2,
          why: "The recurring lengths are 1, 2 and 3, and their LCM is 6.",
        },
        {
          question: "When subtracting similar recurring decimals, when do you take 1 off the last digit of the answer?",
          options: ["When the first recurring column needs a borrow", "Whenever the answer is less than 1", "When the recurring parts had different lengths"],
          answer: 0,
          why: "The next repeat of the block also borrows in its first column, and that borrow comes from the last digit, so it loses 1.",
        },
        {
          question: "What is 0.4545... + 0.333...?",
          options: ["0.7878...", "0.7888...", "0.78"],
          answer: 0,
          why: "Making both similar gives 0.4̇5̇ + 0.3̇3̇ = 0.7̇8̇ with no carry, and 5/11 + 1/3 = 26/33 = 0.7878...",
        },
      ],
      pairs: [
        { term: "Similar recurring decimals", match: "Same numbers of non-recurring and of recurring digits" },
        { term: "Non-similar recurring decimals", match: "Different numbers of non-recurring or of recurring digits" },
        { term: "LCM of recurring lengths", match: "The length every recurring part must have" },
        { term: "Largest non-recurring count", match: "How many digits come before every recurring part" },
        { term: "First-column carry", match: "Added to the last digit of the sum" },
      ],
      order: {
        prompt: "Put the steps for adding recurring decimals in order.",
        items: [
          "Count the non-recurring and recurring digits in each decimal",
          "Choose the largest non-recurring count and the LCM of the recurring lengths",
          "Rewrite every decimal in that similar form",
          "Add, then add the first-column carry to the last digit",
        ],
      },
      blitz: [
        { statement: "12.4545... and 6.3232... are similar recurring decimals.", truth: true, why: "Both have no non-recurring digits and a 2-digit recurring part." },
        { statement: "Writing 0.4̇5̇ as 0.4̇545̇ changes its value.", truth: false, why: "Both give 0.454545..., so the value is the same." },
        { statement: "To add 2.333... and 1.245245..., each recurring part should have 3 digits.", truth: true, why: "The recurring lengths are 1 and 3, and their LCM is 3." },
        { statement: "The recurring part of a sum is as long as the recurring lengths added together.", truth: false, why: "It uses the LCM, not the sum: lengths 2 and 3 give 6, but 2 and 4 give 4." },
      ],
      blanks: [
        { sentence: "Recurring decimals with equal numbers of non-recurring digits and equal numbers of recurring digits are called ___ recurring decimals.", options: ["similar", "pure", "terminating"], answer: 0 },
        { sentence: "To add recurring parts of 2 and 3 digits, extend each to the ___ of 2 and 3, which is 6.", options: ["sum", "LCM", "HCF"], answer: 1 },
      ],
      terms: ["similar", "non-recurring digits", "recurring digits", "LCM", "carry", "last digit"],
      sayPrompt: "Explain to a friend how to make 0.6̇ and 0.4̇5̇ similar, and why a carry goes to the last digit.",
      glossary: [
        { term: "Similar recurring decimals", bn: "সদৃশ আবৃত্ত দশমিক ভগ্নাংশ" },
        { term: "Non-similar recurring decimals", bn: "অসদৃশ আবৃত্ত দশমিক ভগ্নাংশ" },
        { term: "Non-recurring part", bn: "অনাবৃত্ত অংশ" },
        { term: "Recurring point", bn: "পৌনঃপুনিক বিন্দু" },
        { term: "LCM", bn: "ল.সা.গু." },
        { term: "Sum", bn: "যোগফল" },
        { term: "Difference", bn: "বিয়োগফল" },
      ],
    },
  ],
  cq: {
    stem: "In a maths club in Rajshahi, Mitu wrote two numbers on the board: x = √5 and y = 0.2̇4̇ (0.2424...). Tanvir added three recurring decimals: A = 2.3̇ (2.333...), B = 4.1̇23̇ (4.123123...) and C = 0.45̇6̇ (0.45656...). Mitu then said that x + y must be rational, because y is rational.",
    knowledge: {
      q: "What is an irrational number?",
      a: "A number that cannot be expressed in the form p/q, where p and q are integers and q ≠ 0, is an irrational number. For example, √5 is irrational.",
    },
    comprehension: {
      q: "Express y as a simple fraction and explain why y is a rational number.",
      a: "y = 0.2̇4̇ = 0.242424... Multiplying by 100 gives 100y = 24.242424... Subtracting y from 100y, the recurring tails cancel: 99y = 24, so y = 24/99 = 8/33. Since 8 and 33 are integers and 33 ≠ 0, y is of the form p/q, so y is a rational number.",
    },
    application: {
      q: "Find A + B + C by first converting them into similar recurring decimals.",
      a: "A = 2.3̇ has 0 non-recurring and 1 recurring digit, B = 4.1̇23̇ has 0 and 3, and C = 0.45̇6̇ has 1 and 2. So each needs 1 non-recurring digit and 6 recurring digits, since the LCM of 1, 3 and 2 is 6. A = 2.33̇33333̇, B = 4.12̇31231̇ and C = 0.45̇65656̇. Adding as ordinary decimals: 2.3333333 + 4.1231231 + 0.4565656 = 6.9130220. In the first recurring column, 3 + 2 + 5 plus the carried 1 makes 11, so 1 is carried over. Adding this 1 to the last digit gives 6.9130221. So A + B + C = 6.91̇30221̇, that is 6.9130221130221...",
    },
    higherOrder: {
      q: "Prove that x is an irrational number, and judge whether Mitu's statement about x + y is correct.",
      a: "Proof: 2² = 4 and 3² = 9, so 2 < √5 < 3 and √5 is not an integer. Suppose √5 = p/q, where p and q are co-prime natural numbers and q > 1. Squaring, 5 = p²/q², so 5q = p²/q. Here 5q is an integer, but p²/q is not, because p and q are co-prime and q > 1. This is impossible, so x = √5 is irrational. Judgement: suppose x + y = √5 + 8/33 were a rational number r. Then √5 = r − 8/33, and the difference of two rational numbers is rational. This contradicts the proof above. So x + y is irrational, and Mitu's statement is wrong: a rational number added to an irrational number always gives an irrational number.",
    },
  },
} satisfies UnitContent;

export default unit;
