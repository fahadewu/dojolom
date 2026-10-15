import type { UnitContent } from "@/content/types";

// NCTB Mathematics, Class 8 (English Version, revised for 2026), Chapter One: Patterns.
// Sections followed: 1.1 Patterns, 1.2 Patterns of natural numbers (sieve of Eratosthenes,
// next number in a list, Fibonacci numbers, sum of consecutive natural numbers, sum of odd
// numbers), 1.3 Sums of squares, 1.4 Magic squares and 1.6 Geometric pattern.
const unit = {
  subject: "bd-c8-math",
  unit: 1,
  title: "Patterns",
  titleBn: "প্যাটার্ন",
  summary: "After this chapter you can find the rule behind a number pattern, add a long run of numbers with one formula, and write a geometric pattern as an algebraic expression to find any term.",
  concepts: [
    {
      id: "bd-c8-math-1-1",
      title: "Finding the rule in a number pattern",
      hook: "Every number pattern hides a rule. Find the rule and you can name the next number without guessing.",
      steps: [
        { label: "Write the list", text: "Write the numbers in a row with space between them. Take 3, 10, 17, 24, 31, … as an example." },
        { label: "Find differences", text: "Subtract each number from the one after it and write the differences underneath. Here every difference is 7, so the rule is add 7 each time." },
        { label: "Check the change", text: "If the differences are not equal, see how they change. In 1, 4, 9, 16, 25 the differences 3, 5, 7, 9 grow by 2 each time." },
        { label: "Try sums", text: "If the differences show no rule, add neighbouring numbers. In 1, 5, 6, 11, 17, 28 each number is the sum of the two before it." },
      ],
      analogy: "Like the beat of a dhol at a Pohela Boishakh rally. After a few beats you can clap before the next one comes, because you have caught the rhythm. A number pattern works the same way: catch the rule, and the next number is no surprise.",
      story: [
        "At the district maths fair in Khulna, Rafi's team got a card with six numbers: 1, 5, 6, 11, 17, 28. They had to write the next one. Rafi did what his teacher had taught and wrote the differences underneath. He got 4, 1, 5, 6, 11. There was no steady jump, and no steady change in the jumps either.",
        "His teammate Mitu stared at the card. 'Look, 1 and 5 make 6,' she said. 'And 5 and 6 make 11.' Rafi checked the rest. 6 and 11 made 17, and 11 and 17 made 28. Every number was the sum of the two before it.",
        "They wrote 45, because 17 + 28 = 45. The judge nodded and showed them a famous list built the same way, the Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13.",
      ],
      deepRead: [
        "A pattern is an arrangement that follows a fixed rule. In a number pattern, the rule tells you how to get each number from the ones before it. The first thing to try is the difference between consecutive numbers. In 3, 10, 17, 24, 31, … every difference is 7, so the next two numbers are 31 + 7 = 38 and 38 + 7 = 45. A pattern that grows by the same amount each time is called a linear pattern.",
        "Sometimes the differences change, but in a regular way. In 1, 4, 9, 16, 25, … the differences are 3, 5, 7 and 9, so each difference is 2 more than the last. The next difference is 11, and the next number is 25 + 11 = 36. Other patterns use sums. In the Fibonacci numbers 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, … each number is the sum of the two before it, so 21 + 34 = 55 comes next. Some patterns multiply: in 2, 4, 8, 16, 32 each number is double the one before.",
        "Patterns also sort natural numbers. With the sieve of Eratosthenes you write 1 to 100, keep 2 and cross out its multiples, then do the same for 3, 5 and 7. The numbers left uncrossed, apart from 1, are the primes. In a magic square of order 3, the numbers 1 to 9 fill a 3 by 3 grid with 5 in the centre. Every row, column and diagonal adds to 15, the magic number.",
      ],
      example: {
        question: "What is the next number in the pattern 2, 6, 12, 20, 30, …?",
        options: ["40", "42", "38"],
        answer: 1,
        why: "The differences 4, 6, 8, 10 grow by 2, so the next difference is 12 and 30 + 12 = 42.",
      },
      keyPoints: [
        "A number pattern follows a fixed rule, and finding the rule lets you work out the numbers that come next.",
        "Start with the differences between consecutive numbers, then check whether those differences change by a rule.",
        "In the Fibonacci numbers, each number is the sum of the two numbers before it.",
      ],
      misconception: {
        belief: "To get the next number, I just add the last difference again.",
        correction: "That only works when every difference is the same. In 1, 4, 9, 16, 25 the last difference is 9, but the differences grow by 2 each time. The next difference is 11, so the next number is 36, not 34. Always check how the differences change before you use them.",
      },
      quiz: [
        {
          question: "Find the next two numbers in the pattern 7, 12, 17, 22, 27, …",
          options: ["32 and 37", "31 and 36", "32 and 42"],
          answer: 0,
          why: "Each difference is 5, so 27 + 5 = 32 and 32 + 5 = 37.",
        },
        {
          question: "Which number comes next in the Fibonacci numbers 0, 1, 1, 2, 3, 5, 8, 13, 21, …?",
          options: ["29", "34", "42"],
          answer: 1,
          why: "Each Fibonacci number is the sum of the two before it, and 13 + 21 = 34.",
        },
        {
          question: "In a magic square of order 3 made with the numbers 1 to 9, which number goes in the centre?",
          options: ["1", "5", "9", "15"],
          answer: 1,
          why: "5 sits in the centre, and every row, column and diagonal then adds to the magic number 15.",
        },
      ],
      pairs: [
        { term: "Pattern", match: "An arrangement of numbers or shapes that follows a fixed rule" },
        { term: "Difference", match: "What you get by subtracting a number from the next one" },
        { term: "Fibonacci numbers", match: "Each number is the sum of the two before it" },
        { term: "Sieve of Eratosthenes", match: "Crossing out multiples on a 1 to 100 chart to find primes" },
        { term: "Magic number", match: "The equal sum of every row, column and diagonal of a magic square" },
      ],
      order: {
        prompt: "Put the steps for finding the next number in a pattern in order.",
        items: [
          "Write the given numbers in a row",
          "Find the difference between each pair of consecutive numbers",
          "See whether the differences stay the same or change by a rule",
          "Use the rule to add the next difference to the last number",
        ],
      },
      blitz: [
        { statement: "In 3, 10, 17, 24, 31, … the next number is 38.", truth: true, why: "Every difference is 7, and 31 + 7 = 38." },
        { statement: "In 1, 4, 9, 16, 25, … the next number is 34.", truth: false, why: "The differences grow by 2, so the next difference is 11 and the next number is 36." },
        { statement: "In 2, 4, 8, 16, 32 each number is double the one before.", truth: true, why: "2 × 2 = 4, 4 × 2 = 8 and so on, so the rule is doubling." },
        { statement: "91 is left uncrossed on the sieve of Eratosthenes, so it is a prime number.", truth: false, why: "91 = 7 × 13, so it is crossed out with the multiples of 7." },
      ],
      blanks: [
        { sentence: "In 0, 1, 1, 2, 3, 5, 8, … each number is the ___ of the two numbers before it.", options: ["sum", "product", "difference"], answer: 0 },
        { sentence: "In a magic square of order 3 using 1 to 9, the magic number is ___.", options: ["9", "15", "45"], answer: 1 },
      ],
      sayPrompt: "Explain to a friend how you would find the next number in 1, 4, 9, 16, 25.",
      glossary: [
        { term: "pattern", bn: "প্যাটার্ন" },
        { term: "natural number", bn: "স্বাভাবিক সংখ্যা" },
        { term: "difference", bn: "পার্থক্য" },
        { term: "Fibonacci numbers", bn: "ফিবোনাক্কি সংখ্যা" },
        { term: "prime number", bn: "মৌলিক সংখ্যা" },
        { term: "sieve of Eratosthenes", bn: "ইরাটোস্থিনিস ছাঁকনি" },
        { term: "magic square", bn: "ম্যাজিক বর্গ" },
        { term: "magic number", bn: "ম্যাজিক সংখ্যা" },
      ],
    },
    {
      id: "bd-c8-math-1-2",
      title: "Adding consecutive numbers with a formula",
      hook: "Adding 1 to 100 one by one takes ages. Pair the numbers from both ends and the answer, 5050, takes seconds.",
      steps: [
        { label: "Pair the ends", text: "Write the sum, then pair the first number with the last. In 1 + 2 + … + 10, the pairs 1 + 10, 2 + 9 and 3 + 8 all make 11." },
        { label: "Count the pairs", text: "Ten numbers make five pairs. Each pair is worth 11, so the sum is 11 × 5 = 55." },
        { label: "Use the formula", text: "Sum = (first number + last number) × number of terms ÷ 2. It works for any list that grows by the same amount each time." },
        { label: "Odd numbers", text: "The first n odd numbers add up to n². So 1 + 3 + 5 + … + 19, which is 10 odd numbers, makes 10² = 100." },
      ],
      analogy: "Like two identical staircases of bricks from a brickfield, one turned upside down on top of the other. Together they make a neat rectangle that is easy to count. One staircase is half the rectangle, which is exactly why the formula divides by 2.",
      story: [
        "Mitu in Chattogram wanted to buy a gift for her mother on Pohela Boishakh. She planned to save ৳1 on the first day, ৳2 on the second, and one taka more each day for 30 days. 'How much will I have?' she asked her brother Tanvir.",
        "Tanvir began adding on his phone calculator: 1, 3, 6, 10, 15. 'This will take all evening,' he groaned. Mitu wrote the numbers 1 to 30 in a line, then wrote them again backwards underneath.",
        "Each column added to 31: 1 and 30, 2 and 29, 3 and 28. There were 30 columns, so both rows together came to 31 × 30 = 930. One row was half of that. 'I will have ৳465,' she said, and the calculator agreed.",
      ],
      deepRead: [
        "The textbook finds the sum of the first ten natural numbers with a neat trick. Let S = 1 + 2 + 3 + … + 10. Write the same sum in reverse order underneath, S = 10 + 9 + … + 1, and add the two lines. Every column gives 11 and there are 10 columns, so 2S = 11 × 10 and S = 55. In general, Sum = (first number + last number) × number of terms ÷ 2. For 1 to 40, the sum is (1 + 40) × 40 ÷ 2 = 820.",
        "The same formula works for any list where the difference stays the same. For 1 + 4 + 7 + … + 31, the difference is 3 and there are 11 terms, so the sum is (1 + 31) × 11 ÷ 2 = 176. Count the terms carefully, because the last number is not the number of terms.",
        "Odd numbers give a special case. 1 + 3 = 4, 1 + 3 + 5 = 9 and 1 + 3 + 5 + 7 = 16, which are all perfect squares. Each new odd number wraps an L-shape of small squares around the last square and makes a bigger square. So the sum of the first n odd numbers is n², and the first ten odd numbers, 1 to 19, add up to 10² = 100. Squares appear in sums another way too: 13 = 2² + 3² is a sum of squares of two natural numbers.",
      ],
      example: {
        question: "What is the sum 1 + 2 + 3 + … + 20?",
        options: ["200", "210", "420"],
        answer: 1,
        why: "(1 + 20) × 20 ÷ 2 = 21 × 10 = 210.",
      },
      keyPoints: [
        "To add a list with a constant difference, use Sum = (first number + last number) × number of terms ÷ 2.",
        "The formula comes from writing the sum forwards and backwards, so every column has the same total.",
        "The sum of the first n odd numbers is n², so the first ten odd numbers add up to 100.",
      ],
      misconception: {
        belief: "1 + 3 + 5 + … + 19 must be 19², because 19 is the last number.",
        correction: "In the n² rule, n is how many odd numbers you add, not the last one. From 1 to 19 there are 10 odd numbers, so the sum is 10² = 100, not 19² = 361. Count the terms first, then use the rule.",
      },
      quiz: [
        {
          question: "What is the sum of the first six odd natural numbers?",
          options: ["36", "21", "49"],
          answer: 0,
          why: "There are 6 odd numbers, so the sum is 6² = 36, and 1 + 3 + 5 + 7 + 9 + 11 = 36 too.",
        },
        {
          question: "Using the formula, what is 1 + 2 + 3 + … + 40?",
          options: ["800", "1640", "820"],
          answer: 2,
          why: "(1 + 40) × 40 ÷ 2 = 41 × 20 = 820.",
        },
        {
          question: "The list 6 + 11 + 16 + … + 51 has 10 terms. What is its sum?",
          options: ["285", "570", "255"],
          answer: 0,
          why: "(6 + 51) × 10 ÷ 2 = 57 × 5 = 285.",
        },
      ],
      pairs: [
        { term: "Number of terms", match: "How many numbers are being added in the list" },
        { term: "Sum of 1 to 10", match: "(1 + 10) × 10 ÷ 2, which is 55" },
        { term: "First n odd numbers", match: "Their sum is n squared" },
        { term: "Perfect square", match: "A number such as 16 that equals 4 × 4" },
        { term: "Reverse order trick", match: "Writing the sum backwards so each column has the same total" },
      ],
      order: {
        prompt: "Put the steps for finding 1 + 2 + … + 10 in order.",
        items: [
          "Write the sum S = 1 + 2 + … + 10",
          "Write the same sum again in reverse order underneath",
          "Add the two lines column by column to get 2S = 11 × 10",
          "Divide by 2 to get S = 55",
        ],
      },
      blitz: [
        { statement: "1 + 2 + 3 + … + 100 = 5050.", truth: true, why: "(1 + 100) × 100 ÷ 2 = 101 × 50 = 5050." },
        { statement: "The sum of the first 8 odd numbers is 15², because the 8th odd number is 15.", truth: false, why: "n is the count of odd numbers, so the sum is 8² = 64." },
        { statement: "50 can be written as 1² + 7² and also as 5² + 5².", truth: true, why: "1 + 49 = 50 and 25 + 25 = 50." },
        { statement: "In the formula, the number of terms is always the last number in the list.", truth: false, why: "In 6 + 11 + … + 51 the last number is 51, but there are only 10 terms." },
      ],
      blanks: [
        { sentence: "Sum = (first number + last number) × number of terms ÷ ___.", options: ["2", "4", "10"], answer: 0 },
        { sentence: "The sum of the first n odd numbers is ___.", options: ["2n", "n²", "n + 1"], answer: 1 },
      ],
      sayPrompt: "Tell a friend how writing a sum backwards helps you add 1 to 10 quickly.",
      glossary: [
        { term: "consecutive natural numbers", bn: "স্বাভাবিক ক্রমিক সংখ্যা" },
        { term: "sum", bn: "যোগফল" },
        { term: "number of terms", bn: "পদ সংখ্যা" },
        { term: "odd number", bn: "বিজোড় সংখ্যা" },
        { term: "perfect square", bn: "পূর্ণবর্গ সংখ্যা" },
        { term: "formula", bn: "সূত্র" },
        { term: "sum of squares", bn: "বর্গের সমষ্টি" },
      ],
    },
    {
      id: "bd-c8-math-1-3",
      title: "Writing a geometric pattern as an algebraic expression",
      hook: "A rule like 3n + 1 tells you the sticks in any figure of a pattern, even the hundredth, without drawing a single one.",
      steps: [
        { label: "Count sticks", text: "Count the sticks in the first few figures and list them. Squares in a row need 4, 7, 10, 13, … sticks." },
        { label: "Find the jump", text: "Find how many sticks each new figure adds. Each new square shares a side with the last one, so it adds 3 sticks." },
        { label: "Write the rule", text: "Write each count using the figure number n: 4 = 3 × 1 + 1, 7 = 3 × 2 + 1. So the n-th figure needs 3n + 1 sticks." },
        { label: "Use the rule", text: "Put any value of n into the rule. The 100th figure needs 3 × 100 + 1 = 301 sticks. Check the rule against a figure you drew." },
      ],
      analogy: "Like a bus fare chart that says ৳10 to get on and ৳2 for every kilometre. You do not need to ride 15 km to know the fare: 2 × 15 + 10 = ৳40. An algebraic expression is the fare chart of a pattern.",
      story: [
        "Load-shedding had cut the lights in Tanvir's house in Rajshahi, so he and his cousin Nusrat played with matchsticks by candlelight. Nusrat built a little house: a square with a triangle roof, 6 sticks. Then two houses side by side, 11 sticks. Then three, 16 sticks.",
        "'How many for twenty houses?' she asked. Tanvir saw that each new house shared a wall with the last one. It needed only 3 sticks for the square and 2 for the roof, so 5 more each time.",
        "He wrote it as a rule. One house: 5 × 1 + 1. Two houses: 5 × 2 + 1. So n houses need 5n + 1 sticks. 'Twenty houses need 5 × 20 + 1 = 101 sticks,' he said. When the lights came back, they counted the box. It held only 40, enough for 7 houses.",
      ],
      deepRead: [
        "In a geometric pattern, figures are built from equal line segments or sticks by a fixed rule. For squares in a row, the figures need 4, 7, 10, 13, … sticks. The first square needs 4, and each new square adds 3 because it shares a side. So the counts are 3 × 1 + 1, 3 × 2 + 1, 3 × 3 + 1, and the n-th figure needs 3n + 1 sticks. Here n is a variable standing for the figure number, and 3n + 1 is the algebraic expression of the pattern.",
        "The expression lets you jump to any term. For 2n + 1, the 1st term is 3, the 10th is 21 and the 100th is 201. You can also work backwards: if a figure in the 3n + 1 pattern has 61 sticks, then 3n + 1 = 61, so n = 20. Not every pattern is linear. For n² − 1 the terms are 0, 3, 8, 15, 24, and the differences 3, 5, 7, 9 are not equal.",
        "To find the total sticks in many figures, join the expression to the sum formula. In the textbook's houses pattern, the n-th figure needs 5n + 1 sticks, so the 50th needs 251. The first 50 figures need 6 + 11 + … + 251 = (6 + 251) × 50 ÷ 2 = 6425 sticks.",
      ],
      example: {
        question: "A pattern of figures needs 5, 9, 13, 17, … sticks. Which expression gives the number of sticks in the n-th figure?",
        options: ["4n + 1", "5n + 4", "4n + 5"],
        answer: 0,
        why: "Each figure adds 4 sticks, and 4 × 1 + 1 = 5 matches the first figure.",
      },
      keyPoints: [
        "The number of sticks each new figure adds is the number that multiplies n in the expression.",
        "Always check the expression with n = 1, so squares in a row give 3n + 1, not 3n + 4.",
        "Put a figure number into the expression to find its term, and use the sum formula for totals.",
      ],
      misconception: {
        belief: "For 4, 7, 10, 13, … the expression is 3n + 4, because each figure adds 3 and the first figure has 4.",
        correction: "Test it with n = 1: 3 × 1 + 4 = 7, but the first figure has 4 sticks. The 3n part already counts one jump of 3 in the first figure, so the constant is 4 − 3 = 1. The correct expression is 3n + 1, which gives 4, 7, 10, 13.",
      },
      quiz: [
        {
          question: "Which term of the pattern 4n − 3 is 33?",
          options: ["8th", "9th", "10th"],
          answer: 1,
          why: "4n − 3 = 33 gives 4n = 36, so n = 9.",
        },
        {
          question: "What is the 55th term of the pattern 3n + 2?",
          options: ["167", "165", "170"],
          answer: 0,
          why: "3 × 55 + 2 = 165 + 2 = 167.",
        },
        {
          question: "In which algebraic expression is 9999 the 100th term?",
          options: ["99n + 1", "n² + 1", "n² − 1"],
          answer: 2,
          why: "100² − 1 = 10000 − 1 = 9999.",
        },
      ],
      pairs: [
        { term: "Variable n", match: "Stands for the figure number in the pattern" },
        { term: "Algebraic expression", match: "A rule like 3n + 1 that gives any term" },
        { term: "Linear pattern", match: "Grows by the same amount from each figure to the next" },
        { term: "Line segment", match: "One equal stick used to build a geometric figure" },
        { term: "Term", match: "One number in a pattern, such as the 5th or the 100th" },
      ],
      order: {
        prompt: "Put the steps for writing a stick pattern as an algebraic expression in order.",
        items: [
          "Count the sticks in the first three or four figures",
          "Find how many sticks each new figure adds",
          "Write each count as the jump times the figure number plus a constant",
          "Check that the expression gives the right count for the first figure",
        ],
      },
      blitz: [
        { statement: "The pattern 3n + 1 gives 4, 7, 10, 13 for n = 1, 2, 3, 4.", truth: true, why: "3 × 1 + 1 = 4, 3 × 2 + 1 = 7, and so on." },
        { statement: "The 100th term of 4n + 3 is 400.", truth: false, why: "4 × 100 + 3 = 403, because the + 3 must not be dropped." },
        { statement: "The pattern 0, 3, 8, 15, 24, … is a linear pattern.", truth: false, why: "Its differences 3, 5, 7, 9 are not equal; it follows n² − 1." },
        { statement: "In the houses pattern 5n + 1, the 50th figure needs 251 sticks.", truth: true, why: "5 × 50 + 1 = 250 + 1 = 251." },
      ],
      blanks: [
        { sentence: "Squares in a row need 4, 7, 10, … sticks, so the n-th figure needs ___ sticks.", options: ["3n + 1", "4n", "n + 3"], answer: 0 },
        { sentence: "If 3n + 1 = 61, the figure number n is ___.", options: ["21", "20", "62"], answer: 1 },
      ],
      sayPrompt: "Explain to a friend why squares in a row need 3n + 1 sticks, not 4n.",
      glossary: [
        { term: "geometric pattern", bn: "জ্যামিতিক প্যাটার্ন" },
        { term: "linear pattern", bn: "রৈখিক প্যাটার্ন" },
        { term: "algebraic expression", bn: "বীজগাণিতিক রাশি" },
        { term: "variable", bn: "চলক" },
        { term: "term", bn: "পদ" },
        { term: "line segment", bn: "রেখাংশ" },
        { term: "stick", bn: "কাঠি" },
      ],
    },
  ],
  cq: {
    stem: "During load-shedding in Sylhet, Sadia makes figures with matchsticks of equal length. Her 1st figure is one square made of 4 sticks. Each new figure adds one more square to the right, sharing a side with the last square, so the figures need 4, 7, 10, 13, … sticks. Her brother Arif says the 30th figure will need 120 sticks, because 4 × 30 = 120.",
    knowledge: {
      q: "What is a linear pattern?",
      a: "A linear pattern is a number pattern that grows by the same amount each time, so it can be written as an algebraic expression such as 3n + 1.",
    },
    comprehension: {
      q: "Explain why each new figure in Sadia's pattern needs 3 more sticks, not 4.",
      a: "A new square has four sides, but its left side is the right side of the square before it. That side is already in place, so Sadia only adds the top, the bottom and the right side. So each figure needs 3 more sticks than the one before: 4, 7, 10, 13, …",
    },
    application: {
      q: "Find an algebraic expression for the number of sticks in the n-th figure, and use it to find the number of sticks in the 30th figure.",
      a: "In the 1st figure, number of sticks = 4 = 3 × 1 + 1. In the 2nd figure, number of sticks = 7 = 3 × 2 + 1. In the 3rd figure, number of sticks = 10 = 3 × 3 + 1. In the same way, in the n-th figure, number of sticks = 3 × n + 1 = 3n + 1. In the 30th figure, number of sticks = 3 × 30 + 1 = 90 + 1 = 91. So the 30th figure needs 91 sticks.",
    },
    higherOrder: {
      q: "Judge Arif's claim about the 30th figure. Then find how many sticks Sadia needs to make all of the first 30 figures.",
      a: "Arif's claim is wrong. He gave every square 4 new sticks, but each square after the first shares a side, so it adds only 3. By the expression 3n + 1, the 30th figure needs 91 sticks, not 120. Total sticks for the first 30 figures = 4 + 7 + 10 + … + 91. Here the first term = 4, the last term = 91 and the number of terms = 30. Sum = (first term + last term) × number of terms ÷ 2 = (4 + 91) × 30 ÷ 2 = 95 × 15 = 1425. So Sadia needs 1425 sticks to make the first 30 figures.",
    },
  },
} satisfies UnitContent;

export default unit;
