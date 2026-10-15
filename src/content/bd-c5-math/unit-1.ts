import type { UnitContent } from "@/content/types";

// NCTB Elementary Mathematics, Class 5 (English Version, experimental edition for 2026), Chapter 1:
// Multiplication and Division. Sections followed: vertical and horizontal multiplication (multiplicand,
// multiplier, product; breaking the multiplier or multiplicand into place values), the simple method
// (zeros at the end, and 99/999/9999 as 100/1000/10000 − 1), and division by two- and three-digit
// divisors with the method of verification, division by 10 and 100, and word problems answered in
// ordinal numbers. Bangla terms checked against the Bangla edition of the same book.
const unit = {
  subject: "bd-c5-math",
  unit: 1,
  title: "Multiplication and Division",
  titleBn: "গুণ ও ভাগ",
  summary: "After this chapter you can multiply big numbers one place at a time, use quick ways for zeros and numbers like 99, and divide by a big number and check your answer.",
  concepts: [
    {
      id: "bd-c5-math-1-1",
      title: "Multiplying by a big number, one place at a time",
      hook: "A big multiplication is a few small ones added together. Multiply by the ones, the tens and the hundreds, then add.",
      steps: [
        { label: "Line them up", text: "Write the multiplicand on top and the multiplier below it. Put ones under ones and tens under tens. Let us work out 213 × 123." },
        { label: "Multiply the ones", text: "Multiply 213 by the ones digit of 123, which is 3. 213 × 3 = 639. Write 639 on the first line." },
        { label: "Tens, then hundreds", text: "The 2 in 123 means 20, so 213 × 20 = 4260. The 1 means 100, so 213 × 100 = 21300. Write each one on its own line." },
        { label: "Add the lines", text: "Add the three lines. 639 + 4260 + 21300 = 26199. So 213 × 123 = 26199. This answer is the product." },
      ],
      analogy: "Like buying 23 mangoes at ৳15 each. First pay for 20 mangoes, which is ৳300. Then pay for 3 more, which is ৳45. Together you pay ৳345. Splitting 23 into 20 and 3 does not change the total.",
      story: [
        "Mitu helps her father at his fruit shop in Rajshahi. One morning a truck brings 135 crates of mangoes. Each crate holds 24 mangoes. 'How many mangoes is that?' asks her father.",
        "Mitu writes 135 × 24 in her notebook. First she multiplies by the 4. 135 × 4 = 540. Then she remembers that the 2 means 20. 135 × 20 = 2700.",
        "She adds the two lines. 540 + 2700 = 3240. 'There are 3240 mangoes,' she says. Her father checks on his phone. The phone also says 3240. He smiles and gives her the first mango of the day.",
      ],
      deepRead: [
        "In a multiplication, the number we multiply is the multiplicand. The number we multiply by is the multiplier. The answer is the product. In 213 × 123 = 26199, the multiplicand is 213, the multiplier is 123 and the product is 26199. To multiply vertically, we multiply the multiplicand by one digit of the multiplier at a time. 213 × 3 = 639, 213 × 20 = 4260 and 213 × 100 = 21300. Then we add the lines to get 26199.",
        "The textbook uses the same steps for bigger numbers. About 4614 vehicles cross a bridge every day. A year has 365 days, so the mathematical sentence is 4614 × 365. The lines are 4614 × 5 = 23070, 4614 × 60 = 276840 and 4614 × 300 = 1384200. They add up to 1684110 vehicles in a year.",
        "We can also multiply horizontally, side by side. Break the multiplier into its place values, then multiply each part. 213 × 123 = 213 × (100 + 20 + 3) = 21300 + 4260 + 639 = 26199. We can break the multiplicand instead. The product does not change.",
      ],
      example: {
        question: "What is 21 × 13?",
        options: ["273", "84", "63"],
        answer: 0,
        why: "21 × 3 = 63 and 21 × 10 = 210, so 21 × 13 = 63 + 210 = 273.",
      },
      keyPoints: [
        "In a multiplication, the multiplicand is multiplied by the multiplier, and the answer is the product.",
        "To multiply by a big number, multiply by its ones, tens and hundreds one at a time, then add the lines.",
        "Breaking the multiplicand or the multiplier into parts does not change the product.",
      ],
      misconception: {
        belief: "In 213 × 123, the second line is 213 × 2 = 426.",
        correction: "The 2 is in the tens place, so it means 20. The second line is 213 × 20 = 4260. If you write 426, your product will be far too small. The tens line always ends in 0, and the hundreds line ends in 00.",
      },
      quiz: [
        {
          question: "In 4614 × 365 = 1684110, which number is the multiplier?",
          options: ["4614", "365", "1684110"],
          answer: 1,
          why: "The multiplier is the number we multiply by, and here that is 365.",
        },
        {
          question: "What is 312 × 21?",
          options: ["6552", "936", "6542"],
          answer: 0,
          why: "312 × 1 = 312 and 312 × 20 = 6240, and 312 + 6240 = 6552.",
        },
        {
          question: "Which is the same as 245 × 132?",
          options: ["245 × 1 + 245 × 3 + 245 × 2", "245 × 100 + 30 + 2", "245 × 100 + 245 × 30 + 245 × 2"],
          answer: 2,
          why: "132 = 100 + 30 + 2, so we multiply 245 by each part and add.",
        },
      ],
      pairs: [
        { term: "Multiplicand", match: "The number that is multiplied, like 213 in 213 × 123" },
        { term: "Multiplier", match: "The number we multiply by, like 123 in 213 × 123" },
        { term: "Product", match: "The answer we get from a multiplication" },
        { term: "Vertical multiplication", match: "One line for each digit of the multiplier, then add the lines" },
        { term: "Horizontal multiplication", match: "Break a number into parts and multiply side by side" },
      ],
      order: {
        prompt: "Put the steps for 213 × 123 in order.",
        items: [
          "Write 213 on top and 123 below it, ones under ones",
          "Multiply 213 by 3 and write 639",
          "Multiply 213 by 20 and by 100 and write 4260 and 21300",
          "Add the three lines to get 26199",
        ],
      },
      blitz: [
        { statement: "In 25 × 12 = 300, the product is 300.", truth: true, why: "The product is the answer of a multiplication." },
        { statement: "In 312 × 21, the second line is 312 × 2 = 624.", truth: false, why: "The 2 is in the tens place, so the line is 312 × 20 = 6240." },
        { statement: "45 × 12 is the same as 45 × 10 + 45 × 2.", truth: true, why: "12 = 10 + 2, and 450 + 90 = 540, which is 45 × 12." },
        { statement: "If we break 123 into 100 + 20 + 3, the product of 213 × 123 changes.", truth: false, why: "Breaking a number into parts never changes the product. It only makes the working easier." },
      ],
      blanks: [
        { sentence: "In 213 × 123, the number 213 is the ___.", options: ["multiplicand", "multiplier", "product"], answer: 0 },
        { sentence: "When we multiply by the tens digit, the line always ends in ___.", options: ["1", "0", "10"], answer: 1 },
      ],
      sayPrompt: "Tell a friend how you would work out 213 × 123, one line at a time.",
      glossary: [
        { term: "multiplication", bn: "গুণ" },
        { term: "multiplicand", bn: "গুণ্য" },
        { term: "multiplier", bn: "গুণক" },
        { term: "product", bn: "গুণফল" },
        { term: "vertical multiplication", bn: "উপর-নিচে গুণ" },
        { term: "horizontal multiplication", bn: "পাশাপাশি গুণ" },
        { term: "place value", bn: "স্থানীয় মান" },
        { term: "mathematical sentence", bn: "গাণিতিক বাক্য" },
      ],
    },
    {
      id: "bd-c5-math-1-2",
      title: "The simple method for zeros and numbers like 99",
      hook: "Some multiplications look huge but are quick. 7400 × 2900 is just 74 × 29 with four zeros on the end.",
      steps: [
        { label: "Cover the zeros", text: "Look for zeros at the end of both numbers. In 300 × 40, cover them up. You are left with 3 × 4." },
        { label: "Multiply the rest", text: "Multiply the numbers that are left. 3 × 4 = 12. This is a small, easy sum." },
        { label: "Put zeros back", text: "Count all the zeros you covered. 300 has two and 40 has one, so there are three. Write them after 12 to get 12000." },
        { label: "Use round numbers", text: "For 99 × 24, think of 99 as 100 − 1. 100 × 24 = 2400. Now take away one 24. 2400 − 24 = 2376." },
      ],
      analogy: "Like a batter on 99 runs in cricket. Everyone says he is one run short of a hundred, because 100 is easy to think with. The simple method does the same. It treats 99 as 100 − 1.",
      story: [
        "For Victory Day, Tuli's school bought 99 small flags. Each flag cost ৳25. The teacher asked the class, 'How much did the flags cost?'",
        "Rafi began to multiply 99 × 25 line by line. Tuli smiled. 'Think of 99 as 100 − 1,' she said. 'If we bought 100 flags, they would cost ৳2500. But we bought one flag less.'",
        "'So we take away the price of one flag,' Tuli said. 2500 − 25 = 2475. Rafi finished his long working. He also got ৳2475. 'Your way took ten seconds,' he laughed. 'Mine took two minutes.'",
      ],
      deepRead: [
        "When both numbers end in zeros, the textbook shows a simple method. Take 7400 × 2900. Leave out the zeros and multiply 74 × 29 = 2146. 7400 has two zeros and 2900 has two zeros, so there are four zeros in all. Write them at the end. 7400 × 2900 = 21460000. In the same way, 49730 × 9800 uses 4973 × 98 = 487354. There are three zeros in all, so the product is 487354000.",
        "Numbers like 99, 999 and 9999 are just below 100, 1000 and 10000. So 99 = 100 − 1 and 999 = 1000 − 1. The rule is (100 − 1) × 24 = 100 × 24 − 1 × 24. That gives 2400 − 24 = 2376. In the same way, 999 × 32 = 32000 − 32 = 31968.",
        "Numbers just above a round number use plus instead. 101 × 45 = (100 + 1) × 45 = 4500 + 45 = 4545. Always take away or add the whole other number, not just 1.",
      ],
      example: {
        question: "What is 300 × 20?",
        options: ["600", "6000", "60000"],
        answer: 1,
        why: "3 × 2 = 6, and there are three zeros in all, so 300 × 20 = 6000.",
      },
      keyPoints: [
        "When both numbers end in zeros, multiply the other digits, then write all the zeros at the end.",
        "To multiply by 99, 999 or 9999, think of it as 100, 1000 or 10000 minus 1.",
        "For 99 × 24, take away one whole 24 from 2400, not just 1.",
      ],
      misconception: {
        belief: "99 × 24 is 100 × 24 take away 1, so it is 2399.",
        correction: "99 × 24 means 99 groups of 24. That is one group of 24 less than 100 groups. So take away 24, not 1. 99 × 24 = 2400 − 24 = 2376.",
      },
      quiz: [
        {
          question: "What is 3400 × 200?",
          options: ["68000", "680000", "6800000"],
          answer: 1,
          why: "34 × 2 = 68, and there are four zeros in all, so the product is 680000.",
        },
        {
          question: "Which is the same as 999 × 32?",
          options: ["1000 × 32 − 32", "1000 × 32 − 1", "999 × 30 − 2"],
          answer: 0,
          why: "999 = 1000 − 1, so we take away one whole 32 from 1000 × 32.",
        },
        {
          question: "What is 101 × 45?",
          options: ["4505", "4555", "4545"],
          answer: 2,
          why: "101 × 45 = 100 × 45 + 1 × 45 = 4500 + 45 = 4545.",
        },
      ],
      pairs: [
        { term: "Simple method", match: "A quick way to multiply using zeros or round numbers" },
        { term: "99", match: "100 − 1" },
        { term: "999", match: "1000 − 1" },
        { term: "101", match: "100 + 1" },
        { term: "7400 × 2900", match: "74 × 29 with four zeros written at the end" },
      ],
      order: {
        prompt: "Put the steps for 7400 × 2900 in order.",
        items: [
          "Leave out the zeros to get 74 × 29",
          "Multiply 74 × 29 to get 2146",
          "Count the zeros in both numbers, which makes four",
          "Write four zeros after 2146 to get 21460000",
        ],
      },
      blitz: [
        { statement: "40 × 300 = 12000.", truth: true, why: "4 × 3 = 12, and there are three zeros in all." },
        { statement: "99 × 24 = 2400 − 1 = 2399.", truth: false, why: "We must take away a whole 24, so 99 × 24 = 2400 − 24 = 2376." },
        { statement: "999 × 32 is the same as 32000 − 32.", truth: true, why: "999 = 1000 − 1, so 999 × 32 = 1000 × 32 − 1 × 32." },
        { statement: "7400 × 2900 = 2146000.", truth: false, why: "There are four zeros in all, so the product is 21460000." },
      ],
      blanks: [
        { sentence: "99 × 24 is the same as (100 − ___) × 24.", options: ["1", "9", "24"], answer: 0 },
        { sentence: "In 3400 × 200, we write ___ zeros at the end of the product.", options: ["2", "4", "3"], answer: 1 },
      ],
      sayPrompt: "Explain to a friend why 99 × 24 is 2400 − 24 and not 2400 − 1.",
      glossary: [
        { term: "simple method", bn: "সহজ পদ্ধতি" },
        { term: "zero", bn: "শূন্য" },
        { term: "multiplicand", bn: "গুণ্য" },
        { term: "multiplier", bn: "গুণক" },
        { term: "product", bn: "গুণফল" },
        { term: "subtraction", bn: "বিয়োগ" },
      ],
    },
    {
      id: "bd-c5-math-1-3",
      title: "Dividing by a big number and checking the answer",
      hook: "Sharing money fairly needs division. One rule then checks your answer: divisor × quotient + remainder = dividend.",
      steps: [
        { label: "Look left first", text: "Take 785 ÷ 25. The divisor 25 has two digits. So look at the first two digits of 785, which make 78." },
        { label: "Find the digit", text: "How many 25s fit in 78? 25 × 3 = 75 and 25 × 4 = 100. 100 is too big, so write 3 in the quotient." },
        { label: "Subtract, bring down", text: "78 − 75 = 3. Bring down the 5 to make 35. 25 fits in 35 once, so write 1 in the quotient. 35 − 25 = 10." },
        { label: "Check the answer", text: "The quotient is 31 and the remainder is 10. Check: 25 × 31 + 10 = 775 + 10 = 785. That is the dividend, so the answer is right." },
      ],
      analogy: "Like sharing 785 marbles equally among 25 friends. Each friend gets 31 marbles. Then 10 marbles are left. That is too few to give everyone one more. The left-over marbles are the remainder.",
      story: [
        "Teachers at Sadia's school in Khulna collected ৳4275. They wanted to share it equally among 45 students to buy books. 'How much will each student get?' asked the head teacher.",
        "Sadia wrote 4275 ÷ 45 on the board. 42 is smaller than 45, so she looked at 427. 45 × 9 = 405, so she wrote 9 in the quotient. 427 − 405 = 22.",
        "She brought down the 5 to make 225. 45 × 5 = 225, so she wrote 5. The remainder was 0. 'Each student gets ৳95,' she said. Then she checked. 45 × 95 = 4275. It matched the money they collected.",
      ],
      deepRead: [
        "In 6674 ÷ 214, the dividend is 6674 and the divisor is 214. The divisor has three digits, so look at the first three digits of the dividend, 667. 214 × 3 = 642 is smaller than 667, and 214 × 4 = 856 is too big. So write 3 in the quotient. 667 − 642 = 25. Bring down the 4 to make 254. 214 goes into 254 once, and 254 − 214 = 40. The quotient is 31 and the remainder is 40.",
        "Always check with the method of verification: divisor × quotient + remainder = dividend. Here 214 × 31 + 40 = 6634 + 40 = 6674, so the answer is correct. The remainder must always be smaller than the divisor. When the remainder is 0, the dividend is exactly divisible by the divisor.",
        "Dividing by 10 or 100 is quick. Cover as many digits on the right as the divisor has zeros. In 3264 ÷ 100, cover 64. The quotient is 32 and the remainder is 64. In word problems, think about the remainder. One round of a track is 900 metres. 10000 ÷ 900 = 11, remainder 100. So 100 metres are left after 11 rounds, and a runner finishes 10000 metres in the 12th round.",
      ],
      example: {
        question: "What is 75 ÷ 12?",
        options: ["6, remainder 3", "5, remainder 15", "6, remainder 13"],
        answer: 0,
        why: "12 × 6 = 72 and 75 − 72 = 3, which is smaller than 12.",
      },
      keyPoints: [
        "In a division, the dividend is divided by the divisor to give a quotient and a remainder.",
        "Check every division with divisor × quotient + remainder = dividend.",
        "The remainder is always smaller than the divisor, and a remainder of 0 means exactly divisible.",
      ],
      misconception: {
        belief: "Mitu reads 15 pages a day from a 100-page book. 100 ÷ 15 = 6, remainder 10, so she finishes on the 6th day.",
        correction: "After 6 days she has read 15 × 6 = 90 pages. 10 pages are still left, so she needs one more day. She finishes on the 7th day. When a question asks 'on which day', a remainder means one more.",
      },
      quiz: [
        {
          question: "In 6674 ÷ 214, the quotient is 31 and the remainder is 40. Which number is the divisor?",
          options: ["6674", "214", "31", "40"],
          answer: 1,
          why: "The divisor is the number we divide by, and here that is 214.",
        },
        {
          question: "Which check shows that 785 ÷ 25 = 31, remainder 10?",
          options: ["25 × 10 + 31 = 785", "785 × 25 + 10 = 31", "25 × 31 + 10 = 785"],
          answer: 2,
          why: "Divisor × quotient + remainder = dividend, and 775 + 10 = 785.",
        },
        {
          question: "200 children are going to a cricket match. One bus holds 45 children. How many buses are needed?",
          options: ["4", "5", "20"],
          answer: 1,
          why: "200 ÷ 45 = 4, remainder 20, and the 20 children left over need one more bus.",
        },
      ],
      pairs: [
        { term: "Dividend", match: "The number being divided, like 6674 in 6674 ÷ 214" },
        { term: "Divisor", match: "The number we divide by, like 214 in 6674 ÷ 214" },
        { term: "Quotient", match: "How many times the divisor fits into the dividend" },
        { term: "Remainder", match: "The amount left over, always smaller than the divisor" },
        { term: "Method of verification", match: "Divisor × quotient + remainder = dividend" },
      ],
      order: {
        prompt: "Put the steps for 6674 ÷ 214 in order.",
        items: [
          "Look at 667, the first three digits, because the divisor has three digits",
          "Write 3 in the quotient, because 214 × 3 = 642",
          "Subtract 642 from 667 and bring down 4 to make 254",
          "Write 1 in the quotient and find the remainder, 40",
        ],
      },
      blitz: [
        { statement: "In 6674 ÷ 214, the quotient is 31 and the remainder is 40.", truth: true, why: "214 × 31 + 40 = 6634 + 40 = 6674." },
        { statement: "785 ÷ 25 = 30, remainder 35.", truth: false, why: "35 is bigger than 25, so one more 25 fits. The answer is 31, remainder 10." },
        { statement: "3264 ÷ 100 gives quotient 32 and remainder 64.", truth: true, why: "100 has two zeros, so cover the last two digits, 64." },
        { statement: "2412 ÷ 10 gives quotient 24 and remainder 12.", truth: false, why: "10 has only one zero, so cover one digit. The quotient is 241 and the remainder is 2." },
      ],
      blanks: [
        { sentence: "Divisor × quotient + ___ = dividend.", options: ["remainder", "divisor", "product"], answer: 0 },
        { sentence: "The remainder must always be ___ the divisor.", options: ["bigger than", "smaller than", "equal to"], answer: 1 },
      ],
      sayPrompt: "Tell a friend how you would check that 785 ÷ 25 is 31, remainder 10.",
      glossary: [
        { term: "division", bn: "ভাগ" },
        { term: "dividend", bn: "ভাজ্য" },
        { term: "divisor", bn: "ভাজক" },
        { term: "quotient", bn: "ভাগফল" },
        { term: "remainder", bn: "ভাগশেষ" },
        { term: "method of verification", bn: "যাচাই পদ্ধতি" },
        { term: "exactly divisible", bn: "নিঃশেষে বিভাজ্য" },
        { term: "ordinal number", bn: "ক্রমবাচক সংখ্যা" },
      ],
    },
  ],
  cq: {
    stem: "Tuli's school in Rajshahi is planning a picnic and needs 250 mangoes. Market A sells mangoes at ৳15 each. Market B sells a basket of 25 mangoes for ৳350. Rafi says Market A is better, because ৳15 for one mango sounds cheap.",
    knowledge: {
      q: "What is a remainder?",
      a: "A remainder is the number left over after a division. It is always smaller than the divisor.",
    },
    comprehension: {
      q: "Explain why 250 mangoes fill exactly 10 baskets from Market B.",
      a: "Each basket holds 25 mangoes. 250 ÷ 25 = 10, and the remainder is 0. A remainder of 0 means 250 is exactly divisible by 25. So 10 full baskets hold all 250 mangoes, and none are left over. Check: 25 × 10 + 0 = 250.",
    },
    application: {
      q: "How much will the school pay if it buys all 250 mangoes from Market A? Show your working.",
      a: "Mathematical sentence: 250 × 15. Break the multiplier into parts: 15 = 10 + 5. 250 × 10 = 2500. 250 × 5 = 1250. 2500 + 1250 = 3750. So the school will pay ৳3750 at Market A.",
    },
    higherOrder: {
      q: "Which market is better for the school? Say whether Rafi is right, and show every step of your working.",
      a: "At Market A, 250 mangoes cost ৳3750, as found in গ. At Market B, the school needs 250 ÷ 25 = 10 baskets. 10 baskets cost 10 × 350 = ৳3500. 3750 − 3500 = 250, so Market B costs ৳250 less. We can also find the price of one mango at Market B: 350 ÷ 25 = 14. One mango there costs ৳14, which is less than ৳15. So Rafi is not right. Market B is better, because the school gets the same 250 mangoes and saves ৳250.",
    },
  },
} satisfies UnitContent;

export default unit;
