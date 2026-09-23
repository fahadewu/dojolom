import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 6,
  title: "Functions and change",
  summary: "After this unit you can read a rule as a machine that turns inputs into outputs, see its starting value and rate on a straight-line graph, and tell steady growth from doubling before it runs away.",
  concepts: [
    {
      id: "math-6-1",
      title: "Function machines: one input, one output",
      hook: "Put a number in, a rule works on it, a number comes out. That's a function, and the same input always gives the same output.",
      steps: [
        { label: "Input", text: "A function is a rule that turns one number into another. The number you put in is the input. The number that comes out is the output." },
        { label: "Rule", text: "The rule is fixed. It might be add 4, double, or multiply by 3 then subtract 1. Put 5 into 'multiply by 3 then subtract 1' and out comes 14." },
        { label: "Table", text: "Write inputs and outputs side by side in a table. To find a hidden rule, ask what change turns each input into its output. Then check it works for every row." },
        { label: "Reverse", text: "To find the input from an output, run the machine backwards. Undo the last step first. With the rule 'times 3, subtract 1' and output 20, add 1 to get 21, then divide by 3 to get 7." },
      ],
      analogy: "A toaster is a function machine for bread. Put a slice in, the fixed setting does its work, and toast comes out. The same setting on the same bread always gives the same shade, never two different shades at once.",
      story: [
        "Hugo's big sister Maya ran the same game on every long car journey. 'Give me a number,' she said, 'and I'll give you one back. Work out my rule.' Hugo tried 3 and got 7. He tried 5 and got 11. He tried 10 and got 21.",
        "He wrote the pairs on the back of a receipt. 3 to 7, 5 to 11, 10 to 21. Each output was a bit more than double the input. Double 3 is 6, plus 1 is 7. Double 5 is 10, plus 1 is 11. Double 10 is 20, plus 1 is 21. 'Double it and add one,' he said.",
        "Maya smiled and turned it round. 'I got 41. What did I put in?' Hugo ran the machine backwards: take off the 1 to get 40, then halve it to get 20. 'Twenty,' he said, before the next junction. Maya declared the game over, which Hugo took as a win.",
      ],
      deepRead: [
        "A function is a rule that pairs every input with exactly one output. Picture a machine: a number goes in, the rule acts on it, and a number comes out. The rule 'multiply by 3 then add 2' sends 1 to 5, 2 to 8, 3 to 11 and 4 to 14. Because the rule is fixed, the same input always produces the same output, which is what lets you predict the output for any input you like.",
        "A table of inputs and outputs is the usual way to hunt for a hidden rule. Look at how the outputs change when the inputs go up by 1. If they rise by the same amount each time, that amount is the multiplier. The outputs 5, 8, 11, 14 rise by 3, so the rule multiplies by 3. Then find what is left over: 3 times 1 is 3, and the output is 5, so the rule adds 2. Test the finished rule on every row before you trust it, because one failing row means the rule is wrong.",
        "Running the machine backwards finds an input from its output. Undo each step in reverse order, so the last thing the rule did is the first thing you undo. For 'multiply by 3 then add 2' with output 26, subtract 2 to get 24, then divide by 3 to get 8. Check forwards: 3 times 8 is 24, plus 2 is 26. In shorthand the rule is output = 3 × input + 2, and in algebra the input is usually called x and the output y.",
      ],
      example: {
        question: "A function machine uses the rule 'multiply by 4 then subtract 3'. What comes out when 6 goes in?",
        options: ["21", "27", "24"],
        answer: 0,
        why: "4 times 6 is 24, and 24 minus 3 is 21.",
      },
      keyPoints: [
        "A function is a fixed rule that turns each input into exactly one output.",
        "To find a hidden rule, check what change turns every input into its output.",
        "To run a function backwards, undo the steps in reverse order.",
      ],
      misconception: {
        belief: "If the rule sends 3 to 9, it must be 'multiply by 3', because 3 times 3 is 9.",
        correction: "One pair is never enough to pin down a rule. 'Add 6' also sends 3 to 9, and so does 'multiply by 2 then add 3'. Test at least two more inputs. If 4 goes to 12 the rule is probably multiply by 3, but if 4 goes to 10 it is add 6.",
      },
      quiz: [
        {
          question: "A table shows 2 goes to 7, 3 goes to 9 and 4 goes to 11. What is the rule?",
          options: ["Add 5", "Multiply by 2 then add 3", "Multiply by 3 then add 1"],
          answer: 1,
          why: "Add 5 only works for 2, and multiply by 3 then add 1 sends 3 to 10, but doubling then adding 3 fits every row.",
        },
        {
          question: "The rule is 'subtract 5 then double'. The output is 12. What was the input?",
          options: ["1", "29", "11"],
          answer: 2,
          why: "Undo the last step first: halve 12 to get 6, then add back the 5 to get 11.",
        },
        {
          question: "Which of these can't be a function?",
          options: ["A rule sending 4 to both 8 and 9", "A rule sending 4 to 8 and 5 to 8", "A rule sending every input to 0"],
          answer: 0,
          why: "A function gives each input exactly one output, so 4 can't go to two different numbers. Two inputs sharing an output is fine.",
        },
      ],
      pairs: [
        { term: "Input", match: "The number you put into the machine" },
        { term: "Output", match: "The number that comes out after the rule" },
        { term: "Rule", match: "The fixed set of steps the machine follows" },
        { term: "Function", match: "A rule giving each input exactly one output" },
        { term: "Reverse", match: "Undoing the steps to get the input back" },
      ],
      order: {
        prompt: "Put the steps in order to find the input when the rule is 'multiply by 5 then add 4' and the output is 39.",
        items: [
          "Start with the output, 39",
          "Undo the last step: subtract 4 to get 35",
          "Undo the first step: divide by 5 to get 7",
          "Check forwards: 5 times 7 is 35, plus 4 is 39",
        ],
      },
      blitz: [
        { statement: "With the rule 'add 6 then double', the input 4 gives 20.", truth: true, why: "Add 6 to 4 to get 10, then double it to get 20." },
        { statement: "A function can give two different outputs for the same input.", truth: false, why: "Each input has exactly one output; that is what makes it a function." },
        { statement: "To reverse 'multiply by 2 then add 3', you subtract 3 first, then halve.", truth: true, why: "Undo the last step first, so subtract 3 and then divide by 2." },
        { statement: "If 2 goes to 6, the rule must be multiply by 3.", truth: false, why: "Add 4 also sends 2 to 6; you need more rows to be sure." },
      ],
      blanks: [
        { sentence: "A function gives each input exactly ___ output.", options: ["one", "two", "no"], answer: 0 },
        { sentence: "To run a machine backwards, undo the ___ step first.", options: ["first", "last", "middle"], answer: 1 },
      ],
    },
    {
      id: "math-6-2",
      title: "Straight-line graphs: starting value and rate of change",
      hook: "A straight line on a graph tells you two things at once. It shows where something started and how fast it changes.",
      steps: [
        { label: "Plot", text: "Put the input along the bottom and the output up the side. Each pair from the table becomes one dot. If the rule adds the same amount each step, the dots line up straight." },
        { label: "Starting value", text: "Where the line meets the vertical axis is the output when the input is 0. That's the starting value. A phone at 90 per cent before you leave the house starts at 90." },
        { label: "Rate", text: "The rate of change is how much the output moves for each step of 1 in the input. Go along 1, then count how far the line goes up or down. Steeper means faster change." },
        { label: "Predict", text: "Output = starting value + rate × input. A battery starting at 90 that loses 10 an hour is at 90 - 60 = 30 after 6 hours. It reaches 0 after 9 hours." },
      ],
      analogy: "A hill on a walk. The height where you start is the starting value, and the steepness is the rate: a steep path gains a lot of height for every step forward, a gentle one gains little, and flat ground gains none.",
      story: [
        "Zainab's phone was on 90 per cent when she left for the school trip at 8 o'clock. By 10 o'clock it showed 70. Her friend Amir laughed and said it would be fine all day. Zainab wasn't so sure, so she drew a quick graph on the back of the coach itinerary.",
        "She put hours along the bottom and per cent up the side. The dot at 0 hours sat at 90. The dot at 2 hours sat at 70. She joined them with a ruler. The line dropped 20 in 2 hours, so it dropped 10 every hour.",
        "She ran the ruler on down. The line hit 0 at 9 hours, which meant 5 o'clock, an hour before the coach home. She turned her screen brightness down. Amir stopped laughing when his own phone died in the museum cafe at half past three.",
      ],
      deepRead: [
        "When a rule adds or takes away the same amount for every step, its graph is a straight line, and two numbers describe it completely. The starting value is the output when the input is 0; on the graph it is the height where the line crosses the vertical axis. The rate of change is how much the output rises or falls for each increase of 1 in the input; on the graph it is the steepness. A line that climbs 3 for every 1 across has a rate of 3, a line that falls 10 for every 1 across has a rate of -10, and a flat line has a rate of 0.",
        "To read the rate from a table, take two rows, find the change in output and divide by the change in input. A taxi meter shows 3 at the start, 5 after 1 kilometre and 9 after 3 kilometres. From 1 to 3 kilometres it rises by 4 over 2 kilometres, so the rate is 4 divided by 2, which is 2 per kilometre. The first two rows agree: 3 to 5 is a rise of 2 over 1 kilometre. The starting value is 3, so the rule is output = 3 + 2 × input, and a 12 kilometre journey costs 3 + 24 = 27.",
        "The rule also lets you compare. A second firm charging 7 to start and 1 per kilometre starts higher but climbs more gently, and the two lines cross at 4 kilometres, where both cost 11. Before that the first firm is cheaper; after it, the second.",
      ],
      example: {
        question: "A candle is 30 cm tall and burns down 2 cm every hour. How tall is it after 8 hours?",
        options: ["16 cm", "14 cm", "22 cm"],
        answer: 1,
        why: "It loses 2 × 8 = 16 cm, and 30 - 16 leaves 14 cm.",
      },
      keyPoints: [
        "A rule that adds the same amount each step makes a straight-line graph.",
        "The starting value is the output at input 0, on the vertical axis.",
        "Steepness shows the rate: how much the output moves for each step across.",
      ],
      misconception: {
        belief: "The taxi that charges more per kilometre must always be higher on the graph.",
        correction: "Steepness and height are different things. A firm with a high starting charge and a low rate starts higher but climbs slowly. The steeper line can begin below it and only overtake later, where the two lines cross. Compare start value and rate separately.",
      },
      quiz: [
        {
          question: "A graph shows a pool being filled. At 0 minutes it holds 20 litres. At 5 minutes it holds 70 litres. What is the rate?",
          options: ["50 litres a minute", "14 litres a minute", "10 litres a minute"],
          answer: 2,
          why: "It gains 50 litres over 5 minutes, and 50 divided by 5 is 10 litres a minute.",
        },
        {
          question: "Two lines on the same graph. Line A starts at 10 and rises 2 per step. Line B starts at 2 and rises 4 per step. Which is true?",
          options: ["Line A stays above line B at every step", "Line B overtakes line A after 4 steps", "The lines never cross because A starts higher"],
          answer: 1,
          why: "After 4 steps both reach 18, and from then on B's steeper line is above A's.",
        },
        {
          question: "A line on a graph is flat. What does that tell you?",
          options: ["The output is not changing", "The input is not changing", "The output is 0"],
          answer: 0,
          why: "Flat means the output stays the same as the input moves along, so the rate is 0.",
        },
      ],
      pairs: [
        { term: "Starting value", match: "The output when the input is 0" },
        { term: "Rate of change", match: "How much the output moves for each step of 1" },
        { term: "Steeper line", match: "A faster rate of change" },
        { term: "Flat line", match: "The output stays the same; the rate is 0" },
        { term: "Crossing point", match: "Where two rules give the same output for one input" },
      ],
      order: {
        prompt: "Put the steps in order to find the rule from a straight-line graph.",
        items: [
          "Find where the line crosses the vertical axis: that's the starting value",
          "From that crossing point, go along 1 and see how far the line rises or falls",
          "Write that rise or fall as the rate of change",
          "Combine them: output = starting value + rate × input",
        ],
      },
      blitz: [
        { statement: "A steeper line means the output changes faster.", truth: true, why: "Steepness is the rate: more change for each step across." },
        { statement: "The starting value is where the line crosses the horizontal axis.", truth: false, why: "It's where the line crosses the vertical axis, when the input is 0." },
        { statement: "A rule that adds 3 every step gives a straight-line graph.", truth: true, why: "Adding the same amount each step keeps the steepness constant." },
        { statement: "A line that starts higher on the graph stays higher for ever.", truth: false, why: "A steeper line starting lower can catch up and overtake it." },
      ],
      blanks: [
        { sentence: "On a straight-line graph, the ___ shows the rate of change.", options: ["steepness", "height", "length"], answer: 0 },
        { sentence: "A tank holds 40 litres and gains 5 a minute. After 6 minutes it holds ___ litres.", options: ["30", "70", "45"], answer: 1 },
      ],
    },
    {
      id: "math-6-3",
      title: "Steady growth or doubling: telling the two apart",
      hook: "Some things grow by the same amount each step, and others double. The doubling kind starts slowly, then races away from everything else.",
      steps: [
        { label: "Same amount", text: "Steady growth adds the same amount every step: 2, 4, 6, 8, 10. The differences between neighbours are all equal. Its graph is a straight line." },
        { label: "Same multiplier", text: "Doubling multiplies by the same number every step: 2, 4, 8, 16, 32. Each number is twice the one before. The differences grow too: 2, 4, 8, 16." },
        { label: "Test it", text: "Given a list, subtract neighbours. Equal differences mean steady growth. If the differences grow, divide neighbours instead. Equal answers mean multiplying growth." },
        { label: "Long run", text: "Doubling always wins in the end. After 10 steps, adding 2 reaches 22 while doubling from 2 reaches 2,048. Its graph curves upwards, getting steeper with every step." },
      ],
      analogy: "Pocket money versus a rumour. Pocket money arrives in the same size chunk every week, so your savings climb like stairs. Everyone who knows a rumour tells one new person a day, so the number who know doubles daily, and a thousand-pupil school has all heard within ten days.",
      story: [
        "Kwame's class kept a tank of duckweed by the window. On Monday there were 2 tiny leaves. Kwame counted every morning and wrote it on the board: 4 on Tuesday, 8 on Wednesday, 16 on Thursday. 'It grows a bit more every day,' said his friend Sofia.",
        "Kwame looked closer. The leaves didn't add the same amount each day. They doubled. If the pattern held there would be 32 on Friday, then 64 and 128 over the weekend. By the second Sunday, day 14, there would be 16,384. Sofia said that couldn't be right. The tank was tiny.",
        "That was the point, Kwame said. A tank that is half covered on one day is completely covered the next. When they came in on Monday the surface was a solid green carpet. Their teacher pinned Kwame's list to the wall under the heading 'Doubling is sneaky'.",
      ],
      deepRead: [
        "Two kinds of change turn up everywhere. In steady, or linear, change the same amount is added every step, so the differences between neighbouring values are constant and the graph is a straight line. In multiplying, or exponential, change each value is the previous one times a fixed number, so the ratios between neighbours are constant and the graph curves upwards ever more steeply. Doubling is the simplest case, with a multiplier of 2. To tell them apart from a table, subtract neighbours first. Equal differences mean steady change. If the differences grow, divide neighbours instead, and a constant answer confirms multiplying change.",
        "Compare two savings plans that both start at 100. Plan A adds 50 every year. Plan B grows by 10 per cent a year, so it multiplies by 1.1. After 1 year A has 150 and B has 110. After 5 years A has 350 and B about 161. After 20 years A has 1,100 and B about 673, so A is still ahead. But after 40 years A has 2,100 while B has about 4,526, and the gap widens every year after that. Multiplying growth starts slowly and looks harmless, then overtakes any steady growth and never gives the lead back.",
        "The same test works for things that shrink, such as a medicine dose in the body, which halves over a fixed time rather than doubling. Constant differences mean a straight line and a steady rate. Constant ratios mean a curve whose rate keeps changing. Knowing which kind of change is in front of you is the habit this whole course has been building towards.",
      ],
      example: {
        question: "Which list shows doubling?",
        options: ["3, 6, 9, 12", "3, 6, 12, 24", "3, 5, 7, 9"],
        answer: 1,
        why: "Each number is twice the one before. The other lists add 3 or add 2 each time.",
      },
      keyPoints: [
        "Steady growth adds the same amount each step and makes a straight-line graph.",
        "Doubling multiplies by 2 each step, so the differences themselves keep growing.",
        "Doubling starts slowly but overtakes any steady growth in the end.",
      ],
      misconception: {
        belief: "The list 5, 10, 15, 20 is doubling, because 5 became 10.",
        correction: "Only the first step doubles. Check the next one: 10 to 15 adds 5, it doesn't double to 20. The differences are all 5, so this is steady growth. A doubling list from 5 would run 5, 10, 20, 40. Always test every step, not just the first.",
      },
      quiz: [
        {
          question: "A number list goes 4, 8, 16, 32. What comes next?",
          options: ["36", "48", "64"],
          answer: 2,
          why: "Each number is double the one before, so 32 doubles to 64.",
        },
        {
          question: "How can you tell from a table that growth is steady, not doubling?",
          options: ["Neighbours always differ by the same amount", "The numbers get bigger every single step", "Every number in the list is above zero"],
          answer: 0,
          why: "Equal differences are the mark of steady growth; doubling lists also get bigger, but by more each step.",
        },
        {
          question: "A pond weed doubles every day and covers the whole pond on day 30. On which day was it half covered?",
          options: ["Day 15", "Day 28", "Day 29"],
          answer: 2,
          why: "One doubling takes it from half to full, so it was half covered the day before, day 29.",
        },
      ],
      pairs: [
        { term: "Steady growth", match: "Adds the same amount every step" },
        { term: "Doubling", match: "Multiplies by 2 every step" },
        { term: "Difference", match: "What you get by subtracting neighbouring numbers" },
        { term: "Multiplier", match: "The fixed number each value is multiplied by" },
        { term: "Curve", match: "The graph shape when the rate keeps changing" },
      ],
      order: {
        prompt: "Put the steps in order to decide whether the list 3, 6, 12, 24 grows steadily or by multiplying.",
        items: [
          "Subtract each number from the next: the differences are 3, 6, 12",
          "Notice the differences are not equal, so the growth isn't steady",
          "Divide neighbours instead: every answer is 2",
          "Conclude the list doubles, so its graph will curve upwards",
        ],
      },
      blitz: [
        { statement: "The list 5, 10, 20, 40 grows by doubling.", truth: true, why: "Each number is twice the one before." },
        { statement: "The list 5, 10, 15, 20 grows by doubling.", truth: false, why: "It adds 5 each step; only the first step happens to double." },
        { statement: "Steady growth makes a straight-line graph.", truth: true, why: "Adding the same amount each step keeps the steepness constant." },
        { statement: "A list that adds 100 each step stays ahead of one that doubles from 1 for ever.", truth: false, why: "Doubling from 1 reaches 1,024 after 10 steps, and by step 20 it is over a million." },
      ],
      blanks: [
        { sentence: "In steady growth, the ___ between neighbouring numbers stays the same.", options: ["difference", "multiplier", "total"], answer: 0 },
        { sentence: "The graph of a doubling list is a ___ that gets steeper and steeper.", options: ["straight line", "flat line", "curve"], answer: 2 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
