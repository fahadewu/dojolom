import type { UnitContent } from "@/content/types";

const unit = {
  subject: "math",
  unit: 1,
  title: "Number sense",
  summary: "After this unit you can read any whole number by its places, round it to check an answer quickly, and place numbers below zero on a number line.",
  concepts: [
    {
      id: "math-1-1",
      title: "Place value: what each digit is worth",
      hook: "The digit 7 can mean seven, seventy or seven hundred. Where it sits decides everything.",
      steps: [
        { label: "Places", text: "Read a number from the right. The last digit counts ones, the next counts tens, then hundreds, then thousands." },
        { label: "Worth", text: "In 3,472 the 3 is worth 3,000, the 4 is worth 400, the 7 is worth 70 and the 2 is worth 2." },
        { label: "Zero", text: "Zero keeps a place open. In 304 the zero says there are no tens, so the 3 stays in the hundreds." },
        { label: "Compare", text: "To compare two numbers with the same number of digits, start from the left. The first place that differs decides which is bigger." },
      ],
      analogy: "Imagine eggs packed in tens: ten eggs fill a box, ten boxes fill a crate, ten crates fill a van. Saying 2 vans, 3 crates, 4 boxes and 5 loose eggs is exactly what 2,345 means.",
      story: [
        "Priya's uncle works at the football stadium. On Saturday he let her write the attendance on the big board by the gates. The announcer read it out: forty thousand, three hundred and eighteen. Priya wrote 4318 and stepped back, pleased.",
        "Her uncle asked her to read it back. 'Four thousand, three hundred and eighteen,' she said, and stopped. The crowd had just shrunk by 36,000. Without a zero in the thousands place, every digit had slid one step to the right.",
        "She rubbed it out and wrote 40,318. Now the 4 sat in the ten thousands place, worth forty thousand, and the zero kept the thousands place empty. 'One little zero,' said her uncle, 'and 36,000 people come back.'",
      ],
      deepRead: [
        "Our number system is built on ten. Ten ones make a ten, ten tens make a hundred, ten hundreds make a thousand, and so on without end. That is why each place is worth ten times the place to its right. Writing a number is really writing a list of how many of each size you have, biggest first. The number 3,472 means 3 thousands, 4 hundreds, 7 tens and 2 ones, which you can write out as 3,000 + 400 + 70 + 2. This is called expanded form, and it is the quickest way to see what each digit is doing.",
        "Zero matters because a place cannot simply be left blank. In 507 there are 5 hundreds, no tens and 7 ones. Drop the zero and you get 57, which has 5 tens and 7 ones and is 450 smaller. The zero does no counting of its own, but it keeps the 5 in the hundreds place where it belongs.",
        "Place value also gives you a reliable way to compare whole numbers. First count the digits: a number with more digits is bigger, so 1,000 beats 999. If the digit counts match, compare from the left, one place at a time, and stop at the first place where they differ. Take 5,289 and 5,314. The thousands are both 5. The hundreds are 2 and 3, so 5,314 is bigger, and the 8 and 9 further along never get a say. Large digits on the right cannot make up for a small digit on the left.",
      ],
      example: {
        question: "What is the 6 worth in the number 2,608?",
        options: ["6", "60", "600", "6,000"],
        answer: 2,
        why: "The 6 sits in the hundreds place, third from the right, so it counts six hundreds.",
      },
      keyPoints: [
        "Each place in a number is worth ten times the place to its right.",
        "A digit's place sets its value, so 7 can mean 7, 70 or 700.",
        "Zero holds a place open so the other digits keep their correct value.",
      ],
      misconception: {
        belief: "The zero in 4,018 isn't doing anything, so I can leave it out and write 418.",
        correction: "That zero holds the hundreds place. Take it out and the 4 slides from thousands to hundreds, so 4,018 turns into 418, which is 3,600 smaller. Zero counts nothing itself, but it keeps every other digit in the right place.",
      },
      quiz: [
        {
          question: "Which of these numbers is the largest?",
          options: ["4,089", "3,950", "4,105"],
          answer: 2,
          why: "All have four digits and 4,089 and 4,105 share 4 thousands, so the hundreds decide: 1 beats 0.",
        },
        {
          question: "In 5,073, what does the 0 tell you?",
          options: ["There are no tens", "There are no hundreds", "You can leave it out and write 573"],
          answer: 1,
          why: "The 0 is third from the right, in the hundreds place, so the number has no hundreds.",
        },
        {
          question: "Write four thousand and six as digits.",
          options: ["4,006", "4,060", "406"],
          answer: 0,
          why: "Four thousands, no hundreds, no tens and six ones needs two zeros to hold the empty places.",
        },
      ],
      pairs: [
        { term: "Place value", match: "How much a digit is worth because of where it sits" },
        { term: "Digit", match: "One of the ten symbols from 0 to 9" },
        { term: "Zero", match: "Holds a place open so the other digits stay put" },
        { term: "Expanded form", match: "Writing 352 as 300 + 50 + 2" },
        { term: "Ten times", match: "How much bigger each place is than the one to its right" },
      ],
      order: {
        prompt: "Put these steps in order to compare 6,482 with 6,439.",
        items: [
          "Check both numbers have the same number of digits",
          "Compare the thousands: both are 6, so move on",
          "Compare the hundreds: both are 4, so move on",
          "Compare the tens: 8 beats 3, so 6,482 is bigger",
        ],
      },
      blitz: [
        { statement: "In 528, the 2 is worth 20.", truth: true, why: "The 2 sits in the tens place, so it counts two tens." },
        { statement: "Taking the zero out of 3,052 doesn't change its value.", truth: false, why: "The zero holds the hundreds place; without it the number becomes 352." },
        { statement: "For whole numbers, more digits always means a bigger number.", truth: true, why: "Every extra digit adds a place ten times bigger, so 1,000 beats 999." },
        { statement: "Each place is worth twice the place to its right.", truth: false, why: "Each place is worth ten times the place to its right, not twice." },
      ],
      blanks: [
        { sentence: "In the number 4,713 the digit 7 is worth ___.", options: ["7", "70", "700"], answer: 2 },
        { sentence: "Each place in a number is worth ___ times the place to its right.", options: ["two", "ten", "a hundred"], answer: 1 },
      ],
    },
    {
      id: "math-1-2",
      title: "Rounding and estimating",
      hook: "You don't need the exact answer to know that 38 times 21 is about 800. Rounding gets you close, fast.",
      steps: [
        { label: "Pick a place", text: "Decide how rough you want to be: nearest ten, hundred or thousand. That is the place you keep." },
        { label: "Look right", text: "Look at the digit just to the right of that place. It decides whether you go up or stay put." },
        { label: "Five and up", text: "If that digit is 5, 6, 7, 8 or 9, round up. If it is 0 to 4, keep the place as it is. Everything after it becomes zero." },
        { label: "Estimate", text: "Round each number first, then do the sum. 47 + 38 is about 50 + 40, so the answer should be near 90. It is 85." },
      ],
      analogy: "Telling a friend your journey took 'about an hour' when it took 58 minutes. You lose a little detail, but the message is quicker and still true enough to be useful.",
      story: [
        "Marcus was adding up the scores at the school quiz night. His team had 289 points from the first half and 634 from the second. He tapped the numbers into his phone and read out 1,923.",
        "His teammate Dev frowned. 'That can't be right. 289 is about 300 and 634 is about 600. Together that's about 900, nowhere near 2,000.' Marcus looked again. He had typed 1,289 by mistake.",
        "He cleared it and tried once more: 289 + 634 = 923. Close to Dev's rough 900, and this time it made sense. From then on Marcus rounded every total in his head first. It took two seconds and caught his slips before anyone else did.",
      ],
      deepRead: [
        "Rounding replaces a number with a nearby one that is easier to say, remember and calculate with. You choose a place to round to, such as the nearest ten, hundred or thousand, and keep everything to the left of that place. The digit immediately to the right decides the direction. If it is 5 or more, the place you are rounding to goes up by one. If it is 4 or less, it stays the same. Every digit to the right of that place then becomes zero. Take 3,748. To the nearest hundred, the tens digit is 4, so the hundreds stay at 7 and you get 3,700. To the nearest thousand, the hundreds digit is 7, so the 3 becomes 4 and you get 4,000.",
        "The 5 rule is a convention. A 5 sits exactly halfway, and schools agree to round it up so that everyone gets the same answer. Rounding is also the engine of estimation. Before you work out 3,748 - 1,262, round both to the nearest hundred: 3,700 - 1,300 = 2,400. The exact answer is 2,486, so 2,400 is close enough to confirm you are in the right region. If a calculator showed 1,486 or 24,860 you would spot the slip at once.",
        "Estimates can drift when several numbers all round the same way. Ten numbers that each rounded up by 40 leave you 400 too high. So treat an estimate as a check rather than a final answer, and round to a finer place when the numbers are close together.",
      ],
      example: {
        question: "Round 2,650 to the nearest hundred.",
        options: ["2,600", "2,700", "3,000"],
        answer: 1,
        why: "Keep the hundreds and look at the tens digit, which is 5, so the 6 goes up to 7.",
      },
      keyPoints: [
        "To round, keep one place and check the digit to its right.",
        "A 5 or more rounds up and a 4 or less stays put.",
        "Estimating first tells you what a sensible answer should look like.",
      ],
      misconception: {
        belief: "To round 3,748 to the nearest hundred, I look at the 7 in the hundreds. It's more than 5, so I round up to 3,800.",
        correction: "You keep the hundreds and look at the digit to its right, the tens. That is a 4, so the hundreds stay at 7 and the answer is 3,700. The digit you are keeping never decides its own fate; its right-hand neighbour does.",
      },
      quiz: [
        {
          question: "Round 86 to the nearest ten.",
          options: ["80", "90", "100"],
          answer: 1,
          why: "The ones digit is 6, which is 5 or more, so the 8 tens become 9 tens.",
        },
        {
          question: "Which is the best quick estimate for 512 + 297?",
          options: ["500 + 300 = 800", "600 + 300 = 900", "500 + 200 = 700"],
          answer: 0,
          why: "512 rounds down to 500 and 297 rounds up to 300, and the exact answer is 809.",
        },
        {
          question: "Round 7,499 to the nearest thousand.",
          options: ["8,000", "7,500", "7,000"],
          answer: 2,
          why: "Only the hundreds digit matters, and 4 is less than 5, so the 7 thousands stay.",
        },
      ],
      pairs: [
        { term: "Rounding", match: "Replacing a number with a nearby, simpler one" },
        { term: "Estimate", match: "A quick rough answer that is close but not exact" },
        { term: "Nearest ten", match: "Rounding so the number ends in a single zero" },
        { term: "Round up", match: "What you do when the digit to the right is 5 or more" },
        { term: "Exact", match: "The precise answer with nothing rounded away" },
      ],
      order: {
        prompt: "Put the steps for rounding 4,362 to the nearest hundred in order.",
        items: [
          "Find the hundreds digit, which is 3",
          "Look at the digit to its right, the tens digit 6",
          "Since 6 is 5 or more, the 3 goes up to 4",
          "Replace the tens and ones with zeros to get 4,400",
        ],
      },
      blitz: [
        { statement: "Rounded to the nearest ten, 45 becomes 50.", truth: true, why: "The ones digit is 5, and 5 rounds up." },
        { statement: "Rounded to the nearest hundred, 149 becomes 200.", truth: false, why: "The tens digit is 4, so it rounds down to 100." },
        { statement: "An estimate should be close to the exact answer but is not the exact answer.", truth: true, why: "That is what estimating means: quick and close, not precise." },
        { statement: "You should always round every number up, just to be safe.", truth: false, why: "Rounding goes up or down depending on the digit to the right." },
      ],
      blanks: [
        { sentence: "To round 5,832 to the nearest hundred, look at the ___ digit.", options: ["hundreds", "tens", "ones"], answer: 1 },
        { sentence: "Rounded to the nearest ten, 74 becomes ___.", options: ["70", "75", "80"], answer: 0 },
      ],
    },
    {
      id: "math-1-3",
      title: "Numbers below zero",
      hook: "Zero isn't the end of the numbers. Step left of it and you find the negatives, which tell you how far below zero you are.",
      steps: [
        { label: "Number line", text: "Picture a ruler with zero in the middle. Positive numbers go right, negative numbers go left. Each step is the same size." },
        { label: "The minus sign", text: "A minus sign in front means 'below zero'. So -3 is three steps left of zero, and 3 is three steps right." },
        { label: "Bigger or smaller", text: "Further right is always bigger. So -2 is bigger than -7, because -2 is closer to zero and further to the right." },
        { label: "Crossing zero", text: "From -4, going up 6 steps lands on 2. Count 4 steps to reach zero, then 2 more. The line doesn't stop at zero." },
      ],
      analogy: "A lift in a tall building. Ground floor is zero, the floors above are positive and the car park levels below are -1, -2, -3. Going down from floor 2 to level -1 is three floors, and you pass the ground floor on the way.",
      story: [
        "Tomasz checked the forecast before the early bus to the ski slopes. The overnight low was -6 and the afternoon high was 4. 'So it only warms up by 2 degrees,' said his sister Lena, pulling on a second pair of socks.",
        "Tomasz wasn't so sure. He drew a line on the steamed-up window with zero in the middle. He marked -6 on the left and 4 on the right. From -6 up to zero was six steps. From zero up to 4 was four more.",
        "'Ten degrees,' he said. 'Not two. You have to cross zero on the way.' Lena looked at the line and nodded slowly. By lunchtime the snow had gone soft in the sun, and she was carrying the extra socks in her pocket.",
      ],
      deepRead: [
        "The whole numbers 0, 1, 2, 3 and so on stretch to the right along a number line, but the line does not stop at zero. Continue to the left and you reach -1, -2, -3 and onwards. The minus sign is a label for position: -3 is three steps to the left of zero, exactly as far from zero as 3 is to the right. Because the line runs from small on the left to large on the right, every negative number is smaller than zero and smaller than every positive number. Between two negatives, the one closer to zero is larger, so -2 is greater than -7.",
        "Negative numbers describe real things that go below a starting point. Temperatures drop below freezing, the shore of the Dead Sea lies about 430 metres below sea level, and a lift can stop at -2 in an underground car park. Working with them is mostly a matter of counting steps. Suppose the temperature is -6 in the morning and 4 in the afternoon. The rise is not 6 - 4 = 2. Count from -6 up to zero, which is 6 steps, then from zero up to 4, which is 4 more: 10 degrees in total.",
        "Subtraction that goes past zero works the same way. For 3 - 5, start at 3 and move 5 steps left: 2, 1, 0, -1, -2. You land on -2. The answer is negative because you took away more than you had.",
      ],
      example: {
        question: "The temperature falls from 5 to -3. How many degrees did it fall?",
        options: ["2", "8", "3"],
        answer: 1,
        why: "It drops 5 steps to reach zero, then 3 more below it, so the fall is 8 degrees.",
      },
      keyPoints: [
        "Negative numbers sit to the left of zero on the number line.",
        "Further left means smaller, so -7 is smaller than -2.",
        "To find the gap across zero, count to zero and then keep counting.",
      ],
      misconception: {
        belief: "-7 is bigger than -2 because 7 is bigger than 2.",
        correction: "The minus sign tells you where a number is, not how big the digit looks. -7 sits seven steps left of zero and -2 only two, so -7 is further left and smaller. Think of temperatures: -7 is colder than -2.",
      },
      quiz: [
        {
          question: "Put these in order from smallest to largest: -4, 3, -1.",
          options: ["-1, -4, 3", "3, -1, -4", "-4, -1, 3"],
          answer: 2,
          why: "-4 is furthest left on the line, then -1, and the positive 3 is furthest right.",
        },
        {
          question: "A submarine is at -40 metres. It rises 25 metres. Where is it now?",
          options: ["-65 metres", "-15 metres", "15 metres"],
          answer: 1,
          why: "Rising means moving up the line: from -40, 25 steps up is still 15 below the surface.",
        },
        {
          question: "Start at 2 on the number line and move 6 steps to the left. Where do you land?",
          options: ["-4", "4", "-8"],
          answer: 0,
          why: "Two steps take you to zero and the other four carry you below it, to -4.",
        },
      ],
      pairs: [
        { term: "Negative number", match: "Any number to the left of zero" },
        { term: "Positive number", match: "Any number to the right of zero" },
        { term: "Number line", match: "A straight line with numbers spaced evenly along it" },
        { term: "Minus sign", match: "The small dash that marks a number as below zero" },
        { term: "Distance from zero", match: "How many steps a number is from zero, ignoring its sign" },
      ],
      order: {
        prompt: "Put the steps in order to work out how much the temperature rises from -5 to 3.",
        items: [
          "Draw a number line with zero in the middle and mark -5 and 3",
          "Count the steps from -5 up to zero: that is 5",
          "Count the steps from zero up to 3: that is 3",
          "Add the two parts: 5 + 3 = 8 degrees",
        ],
      },
      blitz: [
        { statement: "-6 is smaller than -1.", truth: true, why: "-6 is further left on the number line, so it is smaller." },
        { statement: "-5 plus 5 is -10.", truth: false, why: "Start at -5 and move 5 to the right and you land on zero." },
        { statement: "Any negative number is smaller than any positive number.", truth: true, why: "Negatives are all left of zero and positives are all right of it." },
        { statement: "The temperature change from -3 to 3 is 0 degrees.", truth: false, why: "It is 6 degrees: 3 steps up to zero, then 3 more." },
      ],
      blanks: [
        { sentence: "On a number line, negative numbers sit to the ___ of zero.", options: ["left", "right", "top"], answer: 0 },
        { sentence: "Start at -4 and move 6 steps to the right. You land on ___.", options: ["-10", "2", "10"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
