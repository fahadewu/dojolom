import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 3,
  title: "Patterns and algebra",
  summary: "Find the rule behind a number pattern, write it with a letter so it works for any position, and solve simple equations by keeping both sides balanced.",
  concepts: [
    {
      id: "math-3-1",
      title: "Spotting the rule in a number pattern",
      hook: "Once you find the rule behind a pattern, you can predict what comes next without counting anything.",
      steps: [
        {
          label: "Look at gaps",
          text: "Write the numbers in a row: 4, 7, 10, 13. Now find the gap between each pair of neighbours. 7 minus 4 is 3, 10 minus 7 is 3, 13 minus 10 is 3. The gap is the same each time.",
        },
        {
          label: "Say the rule",
          text: "A steady gap means the rule is 'add 3 each time'. This is called the term-to-term rule. It tells you how to get from one number to the next.",
        },
        {
          label: "Continue it",
          text: "Use the rule to carry on. 13 plus 3 is 16, then 19, then 22. Check each new number by taking away 3 to land back on the one before.",
        },
        {
          label: "Other rules",
          text: "Not every pattern adds. 2, 4, 8, 16 doubles each time. 20, 17, 14, 11 takes away 3. Always test your rule on every pair of numbers, not just the first one.",
        },
      ],
      analogy: "A pattern is like a staircase. Once you know each step is the same height, you can tell how high the tenth step is without climbing it.",
      story: [
        "Leila was saving for a telescope. She put coins in a jar every Sunday and wrote the total on a chart: 6, 11, 16, 21. Her brother glanced at it and said, 'You'll have 46 in five more weeks.' Leila frowned. He hadn't even touched the jar.",
        "She looked at the numbers again. From 6 to 11 was 5. From 11 to 16 was 5. Every gap was 5, so the rule was add 5 each Sunday. Five more Sundays meant five more lots of 5, which is 25. And 21 plus 25 was 46.",
        "Leila copied the rule at the top of her chart. Now she could work out any week she liked. The telescope cost 76, so she counted on from 46: 51, 56, 61, 66, 71, 76. Six more after that, eleven in all. She circled the date.",
      ],
      deepRead: [
        "A sequence is an ordered list of numbers, and each number in it is called a term. The most common sequences are arithmetic: the same amount, called the common difference, is added or subtracted each time. To find it, subtract any term from the one after it, then confirm the gap is the same all the way along. In 5, 9, 13, 17 the common difference is 4. One check is not enough, because 1, 2, 4, 8 also starts with a gap of 1 but then doubles.",
        "Once the rule is known, you can extend the sequence in either direction. Continuing 5, 9, 13, 17 gives 21, 25, 29. Going backwards, 5 minus 4 is 1, and 1 minus 4 is negative 3, so a sequence can pass below zero. Not every rule is a fixed gap. In 3, 6, 12, 24 each term is double the one before. That is a geometric sequence, and its gaps of 3, 6 and 12 grow rather than stay fixed.",
        "Worked example: a sequence begins 40, 34, 28, 22. The gaps are all minus 6, so the rule is subtract 6. The next three terms are 16, 10 and 4. Asked whether 0 is a term, you continue: 4 minus 6 is negative 2, which skips past 0. So 0 is not in the sequence. The term-to-term rule is fine for near neighbours, but finding the fortieth term this way means thirty-nine subtractions. The next concept fixes that with a rule that jumps straight to any position.",
      ],
      example: {
        question: "What is the next number in the pattern 3, 8, 13, 18?",
        options: ["21", "23", "24"],
        answer: 1,
        why: "The gap is 5 each time, and 18 plus 5 is 23.",
      },
      keyPoints: [
        "To find the rule of a pattern, look at the gap between each number and the next.",
        "If the gap is the same every time, the rule is add or subtract that gap.",
        "Always test the rule on every pair of numbers before you use it to predict.",
      ],
      misconception: {
        belief: "The first two numbers go up by 3, so the rule is add 3 and I don't need to check the rest.",
        correction: "A rule must work for every pair. 1, 4, 16, 64 goes up by 3 at first, but then it multiplies by 4 each time. Checking every gap stops you predicting the wrong number.",
      },
      quiz: [
        {
          question: "A pattern goes 50, 45, 40, 35. What is the rule?",
          options: ["Subtract 5 each time", "Add 5 each time", "Halve each time"],
          answer: 0,
          why: "Each number is 5 less than the one before it.",
        },
        {
          question: "In the pattern 7, 11, ?, 19, 23, which number is missing?",
          options: ["14", "15", "16"],
          answer: 1,
          why: "The gap is 4, so 11 plus 4 is 15, and 15 plus 4 is 19.",
        },
        {
          question: "Which pattern follows the rule 'double each time'?",
          options: ["2, 4, 6, 8", "1, 3, 9, 27", "3, 6, 12, 24"],
          answer: 2,
          why: "Each number in 3, 6, 12, 24 is twice the one before; 2, 4, 6, 8 adds 2 and 1, 3, 9, 27 triples.",
        },
      ],
      pairs: [
        { term: "Sequence", match: "A list of numbers in a set order" },
        { term: "Term", match: "One number in a sequence" },
        { term: "Term-to-term rule", match: "How to get from one number to the next" },
        { term: "Common difference", match: "The fixed gap between neighbours in an adding pattern" },
        { term: "Doubling pattern", match: "Each number is twice the one before" },
      ],
      order: {
        prompt: "Put the steps for finding the next number in 9, 14, 19, 24 in order.",
        items: [
          "Subtract 9 from 14 to find the first gap, which is 5",
          "Check that 19 minus 14 and 24 minus 19 are also 5",
          "Say the rule: add 5 each time",
          "Add 5 to 24 to get the next number, 29",
        ],
      },
      blitz: [
        { statement: "In 6, 10, 14, 18 the rule is add 4 each time.", truth: true, why: "Each number is 4 more than the one before." },
        { statement: "The next number after 1, 2, 4, 8 is 10.", truth: false, why: "This pattern doubles, so the next number is 16." },
        { statement: "A pattern can go down as well as up.", truth: true, why: "30, 25, 20, 15 takes away 5 each time." },
        { statement: "You only need to check the first two numbers to find the rule.", truth: false, why: "The rule must fit every pair, or you might predict the wrong number." },
      ],
      blanks: [
        { sentence: "To find the rule, look at the ___ between each number and the next.", options: ["gap", "sum", "product"], answer: 0 },
        { sentence: "In the pattern 2, 4, 8, 16, each number is ___ the one before.", options: ["half", "two more than", "double"], answer: 2 },
      ],
    },
    {
      id: "math-3-2",
      title: "Letters that stand for numbers",
      hook: "In algebra a letter is just a number you don't know yet, or one that keeps changing. Writing n instead of a number lets one rule cover every case.",
      steps: [
        {
          label: "A letter",
          text: "Say a box holds some pencils, but you don't know how many. Call that number p. If you add 2 more, the box now holds p + 2. That is an expression: letters and numbers joined by signs like plus or times.",
        },
        {
          label: "Times is hidden",
          text: "3n means 3 times n. The times sign is left out so it isn't confused with the letter x. So 3n + 1 means multiply n by 3, then add 1.",
        },
        {
          label: "Swap it in",
          text: "Working out an expression when you know the letter's value is called substitution. If n is 4, then 3n + 1 is 3 times 4 plus 1, which is 13. Do the times before the add.",
        },
        {
          label: "Any position",
          text: "Take the pattern 4, 7, 10, 13. It adds 3, so it grows like the 3 times table, but each term is 1 more. The rule is 3n + 1. For the 20th term, let n be 20, which gives 61.",
        },
      ],
      analogy: "A letter in algebra is like a name card that just says 'guest'. You don't know who will sit there yet, but you can still lay a plate and plan the meal.",
      story: [
        "Tomas was hiring a bike at the seaside. The sign said 'pay 2 to start, then 3 for every hour'. His dad asked him how much four hours would cost, then six, then the whole eight-hour day. Tomas got tired of starting again each time.",
        "So he wrote the sign as a rule. Let h be the number of hours. The cost is 3h + 2, because it's 3 times the hours, plus the 2 to start. For four hours, 3 times 4 is 12, plus 2 makes 14. Six hours made 20 and eight hours made 26.",
        "'That's the same as my working,' his dad said, 'but you only did the thinking once.' Tomas chose the full day. Whoever hired a bike after him could use the same little rule, whatever number of hours they wanted.",
      ],
      deepRead: [
        "In algebra a letter, called a variable, stands for a number. It may be a number you have not found yet, or one that is allowed to change, such as the position of a term in a sequence. Letters and numbers joined by operations form an expression. Writing conventions keep expressions short: 3n means 3 multiplied by n, and n divided by 4 is usually written as a fraction. An expression has no equals sign, so it does not claim anything. It is a recipe for a number.",
        "Substitution means replacing the letter with a value and working out the result in the usual order: brackets, then powers, then multiplying and dividing, then adding and subtracting. For 5n - 2 with n equal to 7, multiply first to get 35, then subtract 2 for 33. Expressions can also be simplified before any value is known. 2n + 3n is 5n, because two lots of something plus three lots of the same thing is five lots. But 2n + 3 cannot be joined into 5n, since 3 is not a number of n's.",
        "The link to patterns is the position-to-term rule, often called the nth term. For the sequence 7, 12, 17, 22 the common difference is 5, so the rule starts with 5n. Compare with the 5 times table, 5, 10, 15, 20: each term is 2 more, so the nth term is 5n + 2. Check with n equal to 3: 15 plus 2 is 17, which matches. Now the 100th term is 5 times 100 plus 2, which is 502, found in one move rather than ninety-nine additions.",
      ],
      example: {
        question: "If n is 6, what is 4n + 3?",
        options: ["13", "49", "27"],
        answer: 2,
        why: "4n means 4 times 6, which is 24, and 24 plus 3 is 27.",
      },
      keyPoints: [
        "A letter in algebra stands for a number you don't know yet or one that can change.",
        "Writing 3n means 3 times n, and the times sign is left out.",
        "To substitute, swap the letter for its value, then multiply before you add or take away.",
      ],
      misconception: {
        belief: "3n + 2 means the digit 3 next to n, so if n is 4 that's 34 plus 2, which is 36.",
        correction: "A number next to a letter means multiply, not join the digits. 3n with n equal to 4 is 3 times 4, which is 12, so 3n + 2 is 14.",
      },
      quiz: [
        {
          question: "Which expression means 'double a number, then take away 5'?",
          options: ["5 - 2n", "2n - 5", "2n + 5"],
          answer: 1,
          why: "2n is double the number, and the minus 5 takes 5 away afterwards.",
        },
        {
          question: "If p is 10, what is 2p - 7?",
          options: ["13", "5", "27"],
          answer: 0,
          why: "2 times 10 is 20, and 20 minus 7 is 13.",
        },
        {
          question: "The pattern 5, 8, 11, 14 has the rule 3n + 2. What is the 10th term?",
          options: ["29", "35", "32"],
          answer: 2,
          why: "Let n be 10: 3 times 10 is 30, plus 2 is 32.",
        },
      ],
      pairs: [
        { term: "Variable", match: "A letter that stands for a number" },
        { term: "Expression", match: "Letters and numbers joined by signs, with no equals sign" },
        { term: "Substitution", match: "Swapping a letter for its value and working it out" },
        { term: "3n", match: "3 times n" },
        { term: "nth term", match: "A rule that gives the number at any position in a pattern" },
      ],
      order: {
        prompt: "Put the steps for working out 4n + 3 when n is 5 in order.",
        items: [
          "Write down the expression 4n + 3",
          "Replace n with 5 to get 4 times 5 plus 3",
          "Multiply 4 by 5 to get 20",
          "Add 3 to get 23",
        ],
      },
      blitz: [
        { statement: "In algebra, 5n means 5 times n.", truth: true, why: "The times sign is left out when a number sits next to a letter." },
        { statement: "If n is 2, then 3n + 4 equals 10.", truth: true, why: "3 times 2 is 6, and 6 plus 4 is 10." },
        { statement: "If n is 3, then 2n means 23.", truth: false, why: "2n is 2 times n, so it is 6, not the digits 2 and 3 side by side." },
        { statement: "You add before you multiply when working out 3n + 1.", truth: false, why: "Multiply first to get 3n, then add the 1." },
      ],
      blanks: [
        { sentence: "In algebra, a letter that stands for a number is called a ___.", options: ["total", "digit", "variable"], answer: 2 },
        { sentence: "To ___ a value into an expression, swap the letter for the number and work it out.", options: ["substitute", "simplify", "estimate"], answer: 0 },
      ],
    },
    {
      id: "math-3-3",
      title: "Solving equations by keeping the balance",
      hook: "An equation is a set of scales that balance. Whatever you do to one side, do to the other, and the hidden number shows itself.",
      steps: [
        {
          label: "Two sides",
          text: "An equation has an equals sign, and both sides are worth the same. In x + 4 = 11, the left side and the right side balance. Your job is to find what x must be.",
        },
        {
          label: "Undo it",
          text: "To get x on its own, undo what has been done to it. x has had 4 added, so take 4 away. But take it from both sides, or the scales tip. x + 4 - 4 = 11 - 4, so x = 7.",
        },
        {
          label: "Two steps",
          text: "For 3x + 2 = 17, undo the add first. Take 2 from both sides: 3x = 15. Now undo the times by dividing both sides by 3. That gives x = 5.",
        },
        {
          label: "Check",
          text: "Put your answer back into the original equation. 3 times 5 is 15, plus 2 is 17. It matches, so x really is 5. A check takes ten seconds and catches most slips.",
        },
      ],
      analogy: "Think of old kitchen scales with a mystery parcel on one pan. Take the same weights off both pans and the scales stay level, until only the parcel is left, next to its matching weight.",
      story: [
        "Amara and her grandmother were unpacking a delivery of 24 tins for the food bank. The tins had come in 3 identical boxes, plus 6 loose tins in a bag. 'How many in each box?' her grandmother asked, before either of them opened one.",
        "Amara pictured the unknown number as a letter. If each box held b tins, then 3b + 6 = 24. She took the 6 loose tins out of the picture on both sides: 3b = 18. Three boxes held 18, so one box held 6.",
        "She opened the nearest box and counted. Six tins. 'You guessed,' her grandmother teased. 'I didn't,' Amara said, 'I balanced.' Then they checked together: three boxes of 6 is 18, plus the 6 in the bag makes 24. Every tin was accounted for.",
      ],
      deepRead: [
        "An equation states that two expressions are equal. Solving it means finding the value of the unknown that makes the statement true. The guiding principle is balance: any operation applied to one side must be applied to the other, so the equality is preserved. Adding, subtracting, multiplying and dividing both sides by the same non-zero number all keep an equation true. This is why 'moving a number across and changing its sign' works: it is just subtracting the same number from both sides, written quickly.",
        "For a two-step equation, undo the operations in the reverse order from how they were built. In 4x - 7 = 21, x was multiplied by 4 and then had 7 subtracted. So add 7 to both sides first: 4x = 28. Then divide both sides by 4: x = 7. Dividing by 4 first is allowed, but it produces fractions, since 7 divided by 4 is not a whole number, so it is rarely the easier path.",
        "Unknowns can appear on both sides. Take 5x + 3 = 2x + 18. Subtract 2x from both sides to gather the letters: 3x + 3 = 18. Subtract 3: 3x = 15. Divide by 3: x = 5. Substituting back, the left side is 25 + 3 = 28 and the right side is 10 + 18 = 28, so the solution checks. A solution that fails this check is wrong somewhere, and the check is far quicker than redoing the solving.",
      ],
      example: {
        question: "Solve x + 9 = 15. What is x?",
        options: ["24", "6", "7"],
        answer: 1,
        why: "Take 9 from both sides and you are left with x = 6.",
      },
      keyPoints: [
        "An equation has two sides that are worth the same, like balanced scales.",
        "Whatever you do to one side, you must do to the other side too.",
        "Undo the adding or taking away first, then undo the multiplying, and check your answer.",
      ],
      misconception: {
        belief: "To solve 3x = 12, I take 3 away from both sides, so x is 9.",
        correction: "3x means 3 times x, so the opposite is dividing, not taking away. Divide both sides by 3 and x is 4. Check: 3 times 4 is 12, but 3 times 9 is 27.",
      },
      quiz: [
        {
          question: "Solve 2x = 14. What is x?",
          options: ["12", "16", "7"],
          answer: 2,
          why: "2x means 2 times x, so divide both sides by 2 to get 7.",
        },
        {
          question: "Solve 3x + 5 = 20. What is x?",
          options: ["5", "15", "25"],
          answer: 0,
          why: "Take 5 from both sides to get 3x = 15, then divide by 3 to get 5.",
        },
        {
          question: "Which first step keeps the equation x - 6 = 10 balanced?",
          options: ["Take 6 from both sides", "Add 6 to both sides", "Add 6 to the left side only"],
          answer: 1,
          why: "x has had 6 taken away, so add 6 to both sides to undo it, giving x = 16.",
        },
      ],
      pairs: [
        { term: "Equation", match: "Two expressions joined by an equals sign" },
        { term: "Unknown", match: "The letter whose value you are trying to find" },
        { term: "Solve", match: "Find the value that makes both sides equal" },
        { term: "Inverse operation", match: "The opposite step that undoes another, like subtract undoes add" },
        { term: "Check", match: "Put the answer back in and see if both sides match" },
      ],
      order: {
        prompt: "Put the steps for solving 2x + 3 = 11 in order.",
        items: [
          "Take 3 from both sides to get 2x = 8",
          "Divide both sides by 2 to get x = 4",
          "Put 4 back in: 2 times 4 plus 3",
          "Confirm that 8 plus 3 is 11, so the answer works",
        ],
      },
      blitz: [
        { statement: "In x + 5 = 12, x is 7.", truth: true, why: "Take 5 from both sides, and 12 minus 5 is 7." },
        { statement: "To solve 4x = 20, take 4 from both sides.", truth: false, why: "4x means 4 times x, so divide both sides by 4 to get 5." },
        { statement: "You can add the same number to both sides and the equation stays true.", truth: true, why: "Both sides grow by the same amount, so they still balance." },
        { statement: "In 2x + 1 = 9, x is 5.", truth: false, why: "Take 1 from both sides for 2x = 8, then divide by 2 for x = 4." },
      ],
      blanks: [
        { sentence: "Whatever you do to one side of an equation, you must do to the ___ side.", options: ["other", "left", "bigger"], answer: 0 },
        { sentence: "To undo multiplying by 3, ___ both sides by 3.", options: ["multiply", "divide", "reduce"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
