import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 5,
  title: "Data and chance",
  summary: "After this unit you can turn a pile of answers into a clear bar chart, sum up a set of numbers with the right average, and put a fraction on how likely something is.",
  concepts: [
    {
      id: "math-5-1",
      title: "Bar charts: counts you can see",
      hook: "A list of 40 answers is hard to read. Sort them into a table and draw bars, and the answer jumps out.",
      steps: [
        { label: "Ask and tally", text: "Ask everyone the same question, such as 'What is your favourite fruit?'. Make a tally mark for each answer. Group the marks in fives so they are quick to count." },
        { label: "Frequency table", text: "Count each group of tallies and write the total next to it. That total is the frequency. Apple 12, banana 9, grape 4 is a frequency table." },
        { label: "Draw the bars", text: "Each answer gets one bar. The height of the bar shows the frequency. Leave equal gaps between bars and label both axes." },
        { label: "Read the scale", text: "Before you compare bars, check what each grid line is worth. If the scale goes up in twos, a bar six lines high means 12, not 6." },
      ],
      analogy: "A bar chart is like a row of stacked blocks. Every time someone picks apple, you add one block to the apple pile. When you stand back, the tallest pile wins without you counting a thing.",
      story: [
        "Amara helped Mr Okafor decide which new books the school library should buy. She asked every child in Year 5 to name their favourite kind of story. Forty answers came back on scraps of paper: mystery, animals, space, mystery, funny, space, and on and on.",
        "The pile told her nothing, so she drew five columns and made a tally mark for each scrap. Then she counted the tallies and drew a bar for each kind. Mystery towered above the rest at 14. Funny stories came second with 10, then animals with 8, space with 6 and sport with just 2.",
        "Mr Okafor glanced at the chart for about two seconds. 'Mystery it is,' he said, and ordered a whole shelf of them. Amara noticed that nobody had needed to read the forty scraps. The bars had done the talking.",
      ],
      deepRead: [
        "Data is just a collection of answers or measurements. On its own it is a jumble, so the first job is to organise it. A tally chart does this as you go: one stroke per answer, with every fifth stroke drawn across the group so the marks can be counted in fives. Adding up each group gives the frequency, which simply means how many times that answer appeared. Written as a list, the answers and their frequencies form a frequency table. It is small, exact and easy to check, because the frequencies should add up to the number of people you asked.",
        "A bar chart shows the same table as a picture. Each category gets a bar of the same width, and the height of the bar is its frequency, read against a numbered scale on the vertical axis. Bars for separate categories do not touch, which reminds you that 'apple' and 'banana' are labels, not points on a number line. Suppose 30 children were asked how they travel to school: walk 12, car 9, bus 6, bicycle 3. Check the total first: 12 + 9 + 6 + 3 = 30. With a scale marked in threes, the walk bar reaches the fourth line, the car bar sits at three lines, the bus at two and the bicycle at one.",
        "That scale is where most reading mistakes happen. A bar that looks half as tall as another really is half its value, but only if the scale starts at zero. Charts that begin at 5 or 10 make small differences look dramatic. Always read the axis, then compare.",
      ],
      example: {
        question: "In a bar chart the scale goes up in fives. The 'dog' bar reaches the fourth grid line. How many people chose dog?",
        options: ["4", "20", "9"],
        answer: 1,
        why: "Each grid line is worth 5, so four lines is 4 times 5, which is 20.",
      },
      keyPoints: [
        "A tally chart collects answers one mark at a time, grouped in fives.",
        "The frequency is how many times an answer appears, and all the frequencies add up to the number asked.",
        "On a bar chart, read the height of each bar against the scale before you compare.",
      ],
      misconception: {
        belief: "The tallest bar means the most, so I don't need to look at the numbers on the side.",
        correction: "The tallest bar is the most common answer, but its value depends on the scale. A bar reaching the third line is 3 if the scale goes in ones and 30 if it goes in tens. Read the axis first, or the picture will fool you.",
      },
      quiz: [
        {
          question: "A tally chart shows four groups of five marks and three more. What is the frequency?",
          options: ["7", "23", "43"],
          answer: 1,
          why: "Four groups of five make 20, plus 3 loose marks gives 23.",
        },
        {
          question: "A frequency table says: red 7, blue 5, green 8. How many people were asked?",
          options: ["20", "8", "3"],
          answer: 0,
          why: "Add every frequency: 7 + 5 + 8 = 20 people.",
        },
        {
          question: "A bar chart scale goes 0, 2, 4, 6, 8. The cat bar stops halfway between 4 and 6. What is its frequency?",
          options: ["4", "6", "5"],
          answer: 2,
          why: "Halfway between 4 and 6 is 5, so 5 people chose cat.",
        },
      ],
      pairs: [
        { term: "Tally", match: "One stroke per answer, grouped in fives" },
        { term: "Frequency", match: "How many times an answer appears" },
        { term: "Frequency table", match: "A list of answers with their counts" },
        { term: "Bar chart", match: "Shows each count as the height of a bar" },
        { term: "Scale", match: "The numbers along the axis that give each bar its value" },
      ],
      order: {
        prompt: "Put the steps for making a bar chart of favourite pets in order.",
        items: [
          "Ask everyone the same question and record each answer with a tally mark",
          "Count the tallies to find the frequency of each pet",
          "Draw and label a bar for each pet, with its height set by the frequency",
          "Read the finished chart to see which pet is most popular",
        ],
      },
      blitz: [
        { statement: "In a tally chart, the fifth mark is usually drawn across the other four.", truth: true, why: "Grouping in fives makes tallies quick to count." },
        { statement: "The bars on a bar chart must always touch each other.", truth: false, why: "Bars for separate categories are drawn with gaps between them." },
        { statement: "The frequencies in a table should add up to the number of people asked.", truth: true, why: "Each person gives one answer, so the counts total the group size." },
        { statement: "A bar at the third grid line always stands for 3.", truth: false, why: "It stands for 3 only if the scale goes up in ones." },
      ],
      blanks: [
        { sentence: "The number of times an answer appears is called its ___.", options: ["scale", "frequency", "axis"], answer: 1 },
        { sentence: "Before comparing bars, always check the ___ on the side of the chart.", options: ["scale", "title", "gaps"], answer: 0 },
      ],
    },
    {
      id: "math-5-2",
      title: "Mean, median and mode",
      hook: "One number can speak for a whole group. The mean, median and mode are three different ways to choose it.",
      steps: [
        { label: "Mean", text: "Add up all the values, then divide by how many there are. For 3, 5 and 7, the total is 15, and 15 divided by 3 is 5." },
        { label: "Median", text: "Put the values in order from smallest to largest. The median is the one in the middle. For 2, 9, 4 the order is 2, 4, 9, so the median is 4." },
        { label: "Mode", text: "The mode is the value that appears most often. In 3, 7, 3, 8, 3 the mode is 3. A set can have no mode or more than one." },
        { label: "Range", text: "The range is not an average. It is the largest value minus the smallest, and it tells you how spread out the data is." },
      ],
      analogy: "The mean is like pouring everyone's juice into one jug and sharing it out equally. The median is the person standing in the middle of a line sorted by height. The mode is the shoe size the shop sells most.",
      story: [
        "Jonah kept a chart of how many minutes he practised the trumpet each day for a week: 20, 20, 25, 20, 30, 5 and 20. His teacher had asked for 'about twenty minutes a day', and Jonah wanted proof that he had done it.",
        "His dad added the seven numbers and got 140. 'Divide by 7 and your mean is 20. Spot on.' Jonah's sister Ruth, who liked to argue, pointed at the 5. 'That was the day you played for five minutes and went outside.' Jonah put the numbers in order: 5, 20, 20, 20, 20, 25, 30. The middle value, the median, was 20 too. And 20 appeared four times, so it was the mode as well.",
        "'Three averages, all 20,' Jonah said. Ruth had to admit that the short day had been balanced by the long one. The numbers agreed with him, whichever way you looked at them.",
      ],
      deepRead: [
        "An average is one number chosen to stand for a whole set of data. The mean is the most familiar: add every value, then divide by how many values there are. It uses all the data, but one unusual value can drag it a long way. Take the ages at a small family party: 8, 9, 10, 11 and 62. The total is 100, so the mean is 100 ÷ 5 = 20. Yet nobody at the party is 20. The median, the middle value once the ages are in order, is 10, and that fits four of the five people far better.",
        "With an odd number of values there is exactly one middle. With an even number there are two middles, and the median is halfway between them: for 3, 5, 8, 10 the middle pair is 5 and 8, so the median is 6.5. The mode is the value that appears most often. It is the only average that works for words as well as numbers, so it is the right tool for a favourite colour or the most common shoe size.",
        "Choose the average to fit the question. The mean is best when every value should count and none is wildly out of line. The median is safer when a few extreme values would distort the picture, which is why typical wages and house prices are often reported as medians. The range, largest minus smallest, is not an average at all. It measures spread. For the party it is 62 - 8 = 54, a warning that the ages are far from similar.",
      ],
      example: {
        question: "Find the mean of 4, 8 and 12.",
        options: ["8", "12", "24"],
        answer: 0,
        why: "The total is 24 and there are 3 values, so 24 ÷ 3 = 8.",
      },
      keyPoints: [
        "The mean is the total of the values divided by how many there are.",
        "The median is the middle value after the data has been put in order.",
        "The mode is the value that appears most often, and the range measures spread.",
      ],
      misconception: {
        belief: "The median of 7, 2, 9 is 2, because 2 is in the middle of the list.",
        correction: "The median is the middle value only after sorting. In order the list is 2, 7, 9, so the median is 7. Skipping the sorting step is the most common median mistake.",
      },
      quiz: [
        {
          question: "What is the median of 12, 3, 15, 8, 6?",
          options: ["15", "8", "6"],
          answer: 1,
          why: "In order the values are 3, 6, 8, 12, 15, and the middle one is 8.",
        },
        {
          question: "Five children scored 6, 6, 9, 10 and 4 on a spelling test. What is the mode?",
          options: ["6", "7", "9"],
          answer: 0,
          why: "6 is the only score that appears twice; 7 is the mean, not the mode.",
        },
        {
          question: "A set of four numbers has a mean of 10. What is their total?",
          options: ["14", "2.5", "40"],
          answer: 2,
          why: "Mean times count gives the total: 10 × 4 = 40.",
        },
      ],
      pairs: [
        { term: "Mean", match: "Total of the values divided by how many there are" },
        { term: "Median", match: "The middle value once the data is in order" },
        { term: "Mode", match: "The value that appears most often" },
        { term: "Range", match: "Largest value minus smallest value" },
        { term: "Outlier", match: "One value far away from all the others" },
      ],
      order: {
        prompt: "Put the steps for finding the median of 9, 2, 7, 4, 5 in order.",
        items: [
          "Write the values in order: 2, 4, 5, 7, 9",
          "Count the ordered list: 5 values, an odd number, so there is one middle",
          "Find the middle position: with 5 values it is the third",
          "Read off the third value: the median is 5",
        ],
      },
      blitz: [
        { statement: "The mean of 2, 4 and 9 is 5.", truth: true, why: "2 + 4 + 9 = 15, and 15 ÷ 3 = 5." },
        { statement: "A set of data can only ever have one mode.", truth: false, why: "If two values tie for most frequent, both are modes." },
        { statement: "The range is a kind of average.", truth: false, why: "The range measures how spread out the data is, not what is typical." },
        { statement: "One very large value can pull the mean above most of the data.", truth: true, why: "The mean uses every value, so an outlier drags it towards itself." },
      ],
      blanks: [
        { sentence: "To find the ___, put the values in order and take the middle one.", options: ["mean", "median", "mode"], answer: 1 },
        { sentence: "The value that appears most often in a set is the ___.", options: ["mode", "range", "mean"], answer: 0 },
      ],
    },
    {
      id: "math-5-3",
      title: "Probability: measuring chance",
      hook: "Probability puts a number on 'maybe'. Impossible is 0, certain is 1, and a coin toss sits right in the middle.",
      steps: [
        { label: "The scale", text: "Chance runs from 0 to 1. An impossible event scores 0, a certain event scores 1, and an even chance is a half." },
        { label: "Count outcomes", text: "List every result that could happen, making sure each is equally likely. A fair dice has six outcomes: 1, 2, 3, 4, 5 and 6." },
        { label: "Make a fraction", text: "Probability equals the number of outcomes you want divided by the total number of outcomes. Rolling an even number is 3 out of 6, which is one half." },
        { label: "No memory", text: "A fair coin has no memory. After three heads in a row, the chance of heads next is still one half." },
      ],
      analogy: "Probability is like a bag of marbles. If 3 of the 10 marbles are red, then about 3 in every 10 picks will be red in the long run, but any single pick is still a surprise.",
      story: [
        "Freya was in charge of the spinner stall at the village fete. The wheel had eight equal sections. Three were painted gold and five silver, and a gold spin won a bar of chocolate. Her grandmother asked how many bars she needed for the afternoon.",
        "Freya thought about it. Three gold sections out of eight meant the chance of a win was 3 out of 8 on every spin. If about 200 people had a go, she should expect roughly 200 × 3 ÷ 8 = 75 winners. She packed 80 bars to be safe.",
        "By the end of the afternoon 71 people had won. Freya's little brother Kit stayed convinced that the wheel had been due a gold after five silvers in a row. Freya showed him the wheel. It looked exactly the same before every spin, and so did the chance.",
      ],
      deepRead: [
        "Probability measures how likely something is on a scale from 0 to 1. A probability of 0 means the event cannot happen, 1 means it is certain, and a half means it is as likely as not. Fractions, decimals and percentages are interchangeable here: 1/4, 0.25 and 25% all say the same thing. When every outcome is equally likely, the probability of an event is the number of successful outcomes divided by the total number of outcomes. A pack has 52 cards and 13 are hearts, so the chance of drawing a heart is 13/52, which simplifies to 1/4.",
        "Worked example: a bag holds 4 red, 5 blue and 3 green counters, 12 in all. The probability of picking green is 3/12 = 1/4. The probability of not picking green is 9/12 = 3/4, and the two add up to 1, because either you pick green or you do not. The probabilities of all the possible outcomes always sum to 1, which gives you a quick way to check your working.",
        "Two ideas trip people up. First, a probability describes the long run, not the next go. A 1/4 chance of green does not promise one green in every four picks; it means the share of greens settles near a quarter over many picks. Second, independent events have no memory. A fair coin that has just landed heads five times is still fair, and the chance of heads on the sixth toss is exactly 1/2. Believing a result is 'due' is called the gambler's fallacy, and it has emptied a great many wallets.",
      ],
      example: {
        question: "A bag holds 2 red and 6 blue marbles. What is the probability of picking a red one?",
        options: ["2/6", "2/8", "6/8"],
        answer: 1,
        why: "There are 8 marbles in total and 2 are red, so the chance is 2 out of 8, or one quarter.",
      },
      keyPoints: [
        "Probability runs from 0 for impossible to 1 for certain.",
        "With equally likely outcomes, probability is successful outcomes divided by total outcomes.",
        "A fair coin or dice has no memory, so past results do not change the next chance.",
      ],
      misconception: {
        belief: "The coin has landed heads four times in a row, so tails is due next.",
        correction: "Each toss is independent. The coin does not know what happened before, so the chance of tails is still one half. Runs of heads happen more often than people expect, and they tell you nothing about the next toss.",
      },
      quiz: [
        {
          question: "What is the probability of rolling a 5 or a 6 on a fair six-sided dice?",
          options: ["1/6", "2/6", "5/6"],
          answer: 1,
          why: "Two of the six faces count as a success, so the chance is 2 out of 6, or one third.",
        },
        {
          question: "Which of these has a probability of 0?",
          options: ["Rolling a 7 on a normal dice", "Rolling a 1 on a normal dice", "Rolling an odd number on a normal dice"],
          answer: 0,
          why: "A normal dice only shows 1 to 6, so a 7 can never happen.",
        },
        {
          question: "A spinner has 10 equal sections, 4 red and 6 yellow. In 100 spins, about how many reds should you expect?",
          options: ["4", "60", "40"],
          answer: 2,
          why: "The chance of red is 4/10, and 4/10 of 100 spins is about 40.",
        },
      ],
      pairs: [
        { term: "Probability", match: "A number from 0 to 1 that measures chance" },
        { term: "Certain", match: "Sure to happen, with probability 1" },
        { term: "Impossible", match: "Cannot happen, with probability 0" },
        { term: "Even chance", match: "As likely to happen as not, one half" },
        { term: "Independent events", match: "Results that do not affect each other, like separate coin tosses" },
      ],
      order: {
        prompt: "Put the steps for finding the chance of picking a red sock from a drawer in order.",
        items: [
          "List every outcome: 5 red, 3 blue and 2 white socks",
          "Add them up to find the total number of outcomes: 10",
          "Write the red outcomes over the total: 5/10, which is one half",
          "Check: the chance of not red is also 5/10, and the two add up to 1",
        ],
      },
      blitz: [
        { statement: "A probability of 1 means the event is certain to happen.", truth: true, why: "1 is the top of the scale, where there is no doubt at all." },
        { statement: "After five heads in a row, tails is more likely on the next toss.", truth: false, why: "Each toss is independent, so the chance of tails stays at one half." },
        { statement: "The chances of all the possible outcomes add up to 1.", truth: true, why: "One of the outcomes must happen, so together they cover the whole scale." },
        { statement: "A probability can be bigger than 1 if the event is very likely.", truth: false, why: "Nothing is more than certain, so 1 is the highest probability there is." },
      ],
      blanks: [
        { sentence: "An event that cannot happen has a probability of ___.", options: ["0", "1", "a half"], answer: 0 },
        { sentence: "On a fair dice, the chance of rolling a 3 is 1 out of ___.", options: ["3", "5", "6"], answer: 2 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
