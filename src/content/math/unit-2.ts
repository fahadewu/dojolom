import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 2,
  title: "Fractions and ratios",
  summary: "Rename, compare and add fractions with confidence, then use ratios to scale recipes and split amounts into agreed shares.",
  concepts: [
    {
      id: "math-2-1",
      title: "Equivalent fractions: one amount, many names",
      hook: "Half a pizza and two quarters of a pizza are the same amount of pizza. Fractions can wear different names.",
      steps: [
        {
          label: "Cut again",
          text: "Take a bar split into 2 equal parts. Shade 1 part. That's 1/2. Now cut every part in half. You have 4 parts, and 2 are shaded. That's 2/4, the same shaded amount.",
        },
        {
          label: "The rule",
          text: "Multiply the top and the bottom by the same number. The fraction looks different but its value stays the same. Multiply the top and bottom of 1/2 by 3 and you get 3/6.",
        },
        {
          label: "Go backwards",
          text: "Dividing works too. In 6/8, both 6 and 8 can be divided by 2. That gives 3/4. No number bigger than 1 divides both 3 and 4, so 3/4 is the simplest form.",
        },
        {
          label: "Check it",
          text: "To test if two fractions are equal, simplify both. If they land on the same simplest form, they match. 4/6 becomes 2/3, and 6/9 becomes 2/3, so 4/6 equals 6/9.",
        },
      ],
      analogy: "A ribbon that is 1 metre long is also 100 centimetres long. Nothing about the ribbon changed, only the way you named its length. Equivalent fractions work the same way.",
      story: [
        "Priya was making flapjacks with her grandad. The recipe asked for 3/4 of a cup of oats, but the only measure they could find was a tiny 1/8 cup. 'That's no good,' Priya said. 'It's the wrong size.'",
        "Her grandad shook his head. 'How many eighths make a quarter?' Priya thought about the pizza they'd shared last week, cut into eight. Two slices had been a quarter. So 3/4 was three lots of 2/8, which is 6/8.",
        "She counted six small scoops into the bowl. Later, the flapjacks came out exactly right. The amount hadn't changed at all. Only the name on the measure had.",
      ],
      deepRead: [
        "Two fractions are equivalent when they name the same point on the number line. Multiplying the numerator and the denominator by the same non-zero number does not change the value, because you are really multiplying by 1 in disguise. 3/3, 5/5 and 10/10 are all just 1. So 2/5 times 3/3 gives 6/15, and 6/15 sits exactly where 2/5 sits.",
        "Going the other way is called simplifying, or cancelling. Divide the top and bottom by a common factor until no factor bigger than 1 remains. Take 18/24. Both numbers are even, so divide by 2 to get 9/12. Both divide by 3, giving 3/4. Nothing above 1 divides both 3 and 4, so 3/4 is the fraction in its lowest terms. You reach the same place faster by dividing by the highest common factor straight away: 18 and 24 share 6, and dividing both parts of 18/24 by 6 gives 3/4 in one move.",
        "Equivalence is the tool that makes fractions comparable. To decide whether 5/8 or 7/12 is larger, rewrite both with the same denominator. The smallest number that both 8 and 12 divide into is 24. 5/8 becomes 15/24 and 7/12 becomes 14/24. Now the numerators can be compared directly, and 5/8 is larger by exactly 1/24.",
      ],
      example: {
        question: "Which fraction is equivalent to 2/3?",
        options: ["4/9", "6/9", "3/4"],
        answer: 1,
        why: "Multiply the top and bottom of 2/3 by 3 and you get 6/9.",
      },
      keyPoints: [
        "Multiplying the top and bottom by the same number gives an equivalent fraction.",
        "Dividing the top and bottom by the same number simplifies a fraction without changing its value.",
        "A fraction is in its simplest form when no number bigger than 1 divides both parts.",
      ],
      misconception: {
        belief: "If I add the same number to the top and the bottom, the fraction stays the same. So 1/2 equals 2/3.",
        correction: "Adding changes the value. 1/2 is exactly half, but 2/3 is more than half. Only multiplying or dividing both parts by the same number keeps the value, because that is the same as multiplying by 1.",
      },
      quiz: [
        {
          question: "Which fraction is 3/4 written in a different form?",
          options: ["9/12", "6/7", "4/5"],
          answer: 0,
          why: "Multiply the top and bottom of 3/4 by 3 to get 9/12.",
        },
        {
          question: "What is 10/15 in its simplest form?",
          options: ["5/10", "2/3", "1/5"],
          answer: 1,
          why: "Both 10 and 15 divide by 5, which gives 2/3.",
        },
        {
          question: "Which fraction does not equal 1/2?",
          options: ["5/10", "7/14", "6/11"],
          answer: 2,
          why: "Doubling 6 gives 12, not 11, so 6/11 is a little more than half.",
        },
      ],
      pairs: [
        { term: "Equivalent fractions", match: "Different fractions that name the same amount" },
        { term: "Numerator", match: "The top number, how many parts you have" },
        { term: "Denominator", match: "The bottom number, how many equal parts make the whole" },
        { term: "Simplest form", match: "No number above 1 divides both top and bottom" },
        { term: "Common factor", match: "A number that divides exactly into two other numbers" },
      ],
      order: {
        prompt: "Put the steps for simplifying 12/18 in order.",
        items: [
          "Write down the fraction 12/18",
          "Find the largest number that divides both 12 and 18, which is 6",
          "Divide the top and the bottom by 6 to get 2/3",
          "Check that no number above 1 divides both 2 and 3",
        ],
      },
      blitz: [
        { statement: "3/6 is the same amount as 1/2.", truth: true, why: "Divide both 3 and 6 by 3 and you get 1/2." },
        { statement: "Adding 1 to the top and bottom of a fraction keeps its value.", truth: false, why: "1/2 would become 2/3, which is a bigger amount." },
        { statement: "4/8 is already in its simplest form.", truth: false, why: "Both 4 and 8 divide by 4, so it simplifies to 1/2." },
        { statement: "Multiplying the top and bottom by 5 gives an equivalent fraction.", truth: true, why: "You are multiplying by 5/5, which is 1, so the value stays put." },
      ],
      blanks: [
        { sentence: "To find an equivalent fraction, ___ the top and bottom by the same number.", options: ["add to", "multiply", "subtract from"], answer: 1 },
        { sentence: "A fraction is in its simplest form when the top and bottom share no ___ bigger than 1.", options: ["factor", "digit", "total"], answer: 0 },
      ],
    },
    {
      id: "math-2-2",
      title: "Adding fractions with different bottoms",
      hook: "You can't add halves to thirds until they're cut into the same size pieces. Make the bottoms match, then the tops just add.",
      steps: [
        {
          label: "Same size",
          text: "You can only add pieces that are the same size. 1/4 plus 2/4 is 3/4, because all the pieces are quarters. Add the tops and keep the bottom.",
        },
        {
          label: "Find a match",
          text: "For 1/2 plus 1/3, the bottoms differ. Look for a number that both 2 and 3 fit into. Their times tables first meet at 6, so 6 is your new bottom.",
        },
        {
          label: "Rename",
          text: "Turn each fraction into sixths. 1/2 is 3/6, because 2 times 3 is 6 and 1 times 3 is 3. 1/3 is 2/6, because 3 times 2 is 6 and 1 times 2 is 2.",
        },
        {
          label: "Add the tops",
          text: "3/6 plus 2/6 is 5/6. The bottom stays 6, because the pieces are still sixths. Finally, check whether the answer can be simplified. 5/6 can't, so you're done.",
        },
      ],
      analogy: "Adding 2 metres to 30 centimetres doesn't give 32 of anything. Change both to centimetres first, then add. Fractions with different bottoms need the same kind of fix.",
      story: [
        "Marcus was painting the garden fence with his aunt. On Saturday morning he finished 1/2 of it before the rain came. On Sunday he managed another 1/3. 'So how much is done?' his aunt asked. Marcus started to say 2/5, then stopped. That felt wrong, because 2/5 is less than a half, and he'd already done a half on Saturday.",
        "He pictured the fence split into six equal panels. Half of six panels is three. A third of six panels is two. Three panels plus two panels made five panels out of six.",
        "'Five sixths,' he said. 'One panel left.' His aunt handed him the brush. It took twenty minutes, and the fence was finally one whole fence again.",
      ],
      deepRead: [
        "Fractions can only be added when they share a denominator, because the denominator tells you the size of each piece. A common denominator is any number that both denominators divide into. The lowest common denominator is the smallest such number, and using it keeps the arithmetic small. For 3/4 plus 5/6, list the multiples: 4, 8, 12, 16 and 6, 12, 18. The first number in both lists is 12.",
        "Now rename each fraction with 12 on the bottom. To turn 4 into 12 you multiply by 3, so multiply the top by 3 as well, and 3/4 becomes 9/12. To turn 6 into 12 you multiply by 2, so 5/6 becomes 10/12. Adding the numerators gives 19/12. That is more than one whole, since 12/12 is 1, so it can also be written as the mixed number 1 and 7/12. Both forms are correct, and which one you use depends on what the question asks for.",
        "Subtraction follows the same path: match the denominators, then subtract the numerators. 5/6 minus 3/4 becomes 10/12 minus 9/12, which is 1/12. The one trap to avoid is adding the denominators. 1/2 plus 1/2 is clearly one whole, not 2/4, and any method that says otherwise has treated the denominator as a count rather than a size.",
      ],
      example: {
        question: "What is 1/2 plus 1/4?",
        options: ["3/4", "2/6", "2/4"],
        answer: 0,
        why: "1/2 is the same as 2/4, and 2/4 plus 1/4 is 3/4.",
      },
      keyPoints: [
        "Fractions can only be added when their bottoms are the same.",
        "To make the bottoms match, find a number both of them divide into and rename each fraction.",
        "Once the bottoms match, add the tops and keep the bottom the same.",
      ],
      misconception: {
        belief: "To add fractions you add the tops and add the bottoms. So 1/2 plus 1/2 is 2/4.",
        correction: "Half plus half is one whole, and 2/4 is only a half, so that method must be wrong. The bottom tells you the size of the pieces, not how many you have, so it never gets added.",
      },
      quiz: [
        {
          question: "What is 1/3 plus 1/6?",
          options: ["2/9", "2/6", "1/2"],
          answer: 2,
          why: "1/3 is 2/6, and 2/6 plus 1/6 is 3/6, which simplifies to 1/2.",
        },
        {
          question: "Which is the smallest number that both 4 and 6 divide into?",
          options: ["24", "12", "10"],
          answer: 1,
          why: "12 is the first number in both the 4 and 6 times tables; 24 works too but isn't the smallest.",
        },
        {
          question: "What is 2/3 plus 3/4?",
          options: ["1 and 5/12", "5/7", "1 and 1/12"],
          answer: 0,
          why: "2/3 is 8/12 and 3/4 is 9/12, so the total is 17/12, which is 1 and 5/12.",
        },
      ],
      pairs: [
        { term: "Common denominator", match: "A bottom number that both fractions can share" },
        { term: "Lowest common denominator", match: "The smallest shared bottom number" },
        { term: "Like fractions", match: "Fractions that already have the same bottom" },
        { term: "Mixed number", match: "A whole number and a fraction together, such as 1 and 1/2" },
        { term: "Improper fraction", match: "A fraction whose top is as big as or bigger than its bottom" },
      ],
      order: {
        prompt: "Put the steps for working out 1/2 plus 1/5 in order.",
        items: [
          "Notice the bottoms, 2 and 5, are different",
          "Find the smallest number both divide into, which is 10",
          "Rename the fractions as 5/10 and 2/10",
          "Add the tops to get 7/10",
        ],
      },
      blitz: [
        { statement: "1/2 plus 1/3 equals 2/5.", truth: false, why: "It equals 3/6 plus 2/6, which is 5/6." },
        { statement: "When the bottoms match, you add only the tops.", truth: true, why: "The bottom tells you the piece size, and that doesn't change." },
        { statement: "1/4 plus 1/4 is 2/8.", truth: false, why: "Two quarters make 2/4, which is one half, not 2/8." },
        { statement: "Any number both bottoms divide into can work as a common bottom.", truth: true, why: "The lowest one keeps numbers small, but a larger one gives the same answer after simplifying." },
      ],
      blanks: [
        { sentence: "Before adding 1/3 and 1/4, rewrite both fractions so they have the same ___.", options: ["top", "bottom", "sign"], answer: 1 },
        { sentence: "When the bottoms already match, add the ___ and keep the bottom the same.", options: ["tops", "bottoms", "wholes"], answer: 0 },
      ],
    },
    {
      id: "math-2-3",
      title: "Ratios: comparing one amount with another",
      hook: "A ratio says how much of one thing there is for every bit of another. Knowing it lets you scale a recipe up or share a prize in agreed parts.",
      steps: [
        {
          label: "Write it",
          text: "Mix 2 cups of orange juice with 3 cups of water. The ratio of juice to water is 2:3, said as 'two to three'. Order matters, so water to juice is 3:2.",
        },
        {
          label: "Scale it",
          text: "Ratios behave like fractions. Multiply both parts by the same number and the mix tastes the same. 2:3 doubled is 4:6. For a party you might use 10:15.",
        },
        {
          label: "Count the parts",
          text: "2:3 has 2 plus 3, which is 5 parts in total. So juice is 2/5 of the drink and water is 3/5. A ratio compares part to part, a fraction compares part to whole.",
        },
        {
          label: "Share it",
          text: "To share 20 sweets in the ratio 2:3, first find one part: 20 divided by 5 parts is 4. Then 2 parts is 8 and 3 parts is 12. Check: 8 plus 12 is 20.",
        },
      ],
      analogy: "A ratio is like a recipe card. It doesn't say how big the cake is, only how the ingredients balance. Make one cake or ten, the balance stays the same.",
      story: [
        "Finn was helping paint a mural at the community centre. The colour they wanted was a soft sky blue, made by mixing 1 pot of blue with 4 pots of white. Finn mixed the first batch and it looked perfect. Then the leader said they'd need 15 pots of paint in total to cover the wall.",
        "Finn nearly poured in 15 pots of white and 1 of blue. He stopped. That would be 1:15, far paler than the test patch. The ratio was 1:4, so every 5 pots contained 1 blue and 4 white. 15 divided by 5 was 3, so he needed three lots: 3 pots of blue and 12 pots of white.",
        "He mixed it in a big tub and held the test patch beside it. The two blues matched exactly. The wall took all afternoon, but every stroke was the same sky.",
      ],
      deepRead: [
        "A ratio compares two or more quantities of the same kind and is written with a colon. 3:2 means three of the first for every two of the second. Like a fraction, a ratio can be simplified by dividing every part by a common factor, so 12:8 is the same ratio as 3:2. Unlike a fraction, it compares part with part rather than part with whole. In a class of 12 girls and 8 boys, the ratio of girls to boys is 3:2, but the fraction of the class that is girls is 12/20, which simplifies to 3/5.",
        "Sharing an amount in a ratio takes three moves. Add the parts to find the total number of shares. Divide the amount by that total to find one share. Multiply to find each portion. Suppose 45 stickers are shared in the ratio 4:5. There are 9 shares, so one share is 45 divided by 9, which is 5. The first person gets 4 times 5, which is 20, and the second gets 5 times 5, which is 25. Checking that 20 plus 25 returns 45 catches most slips.",
        "Scaling works in both directions. If a recipe uses flour and butter in the ratio 5:3 and you have 15 of flour, multiply both parts by 3 and you need 9 of butter. If you only have 6 of butter, that is 3 doubled, so double the flour too and use 10. Ratios sit quietly behind map scales, paint mixing and unit prices, wherever two quantities are meant to grow together.",
      ],
      example: {
        question: "Share 30 marbles between Ali and Bea in the ratio 1:2. How many does Bea get?",
        options: ["15", "10", "20"],
        answer: 2,
        why: "There are 3 parts, so one part is 10, and Bea has 2 parts, which is 20.",
      },
      keyPoints: [
        "A ratio like 2:3 compares one part with another, and the order of the numbers matters.",
        "Multiplying or dividing every part of a ratio by the same number keeps the mix the same.",
        "To share in a ratio, add the parts, divide the amount by that total, then multiply for each share.",
      ],
      misconception: {
        belief: "If the ratio is 1:3, the first person gets 1/3 of the total.",
        correction: "1:3 means 4 parts altogether, so the first person gets 1/4 and the second gets 3/4. A ratio compares part with part; to get a fraction of the whole you must add up all the parts first.",
      },
      quiz: [
        {
          question: "A recipe uses 2 eggs for every 3 cups of flour. You use 6 eggs. How many cups of flour do you need?",
          options: ["7", "9", "12"],
          answer: 1,
          why: "6 eggs is 2 times 3, so multiply the flour by 3 as well to get 9 cups.",
        },
        {
          question: "Which ratio is the same as 6:9?",
          options: ["2:3", "3:2", "1:3"],
          answer: 0,
          why: "Divide both parts by 3 to get 2:3; 3:2 has the parts the wrong way round.",
        },
        {
          question: "60 sweets are shared in the ratio 3:1. How many does the person with the smaller share get?",
          options: ["20", "45", "15"],
          answer: 2,
          why: "3 plus 1 is 4 parts, and one part is 60 divided by 4, which is 15.",
        },
      ],
      pairs: [
        { term: "Ratio", match: "Compares one part with another part" },
        { term: "Fraction", match: "Compares a part with the whole" },
        { term: "Simplest ratio", match: "Every part divided by the largest number they all share" },
        { term: "One share", match: "The total amount divided by the number of parts" },
        { term: "Scaling up", match: "Multiplying every part of a ratio by the same number" },
      ],
      order: {
        prompt: "Put the steps for sharing 35 in the ratio 2:5 in order.",
        items: [
          "Add the parts: 2 plus 5 is 7",
          "Divide 35 by 7 to find one share, which is 5",
          "Multiply: 2 shares is 10 and 5 shares is 25",
          "Check that 10 plus 25 makes 35",
        ],
      },
      blitz: [
        { statement: "The ratio 3:1 means the first amount is three times the second.", truth: true, why: "Three parts to one part is three times as much." },
        { statement: "In the ratio 1:4, the first person gets 1/4 of the total.", truth: false, why: "There are 5 parts in total, so the first person gets 1/5." },
        { statement: "4:6 and 2:3 describe the same mix.", truth: true, why: "Divide both parts of 4:6 by 2 and you get 2:3." },
        { statement: "Swapping the numbers in a ratio doesn't change what it means.", truth: false, why: "2:3 juice to water is a different drink from 3:2 juice to water." },
      ],
      blanks: [
        { sentence: "To find the value of one share, divide the total by the number of ___.", options: ["parts", "people", "colons"], answer: 0 },
        { sentence: "In the ratio 3:2, the first amount is 3/5 of the ___.", options: ["second", "whole", "difference"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
