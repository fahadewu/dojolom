import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-c6-science",
  unit: 1,
  title: "Scientific Process and Measurement",
  titleBn: "বৈজ্ঞানিক প্রক্রিয়া ও পরিমাপ",
  summary: "After this unit you can list the steps of the scientific process, write any measurement with a number and the right unit, and measure length, mass, time, area and volume with simple tools.",
  concepts: [
    {
      id: "bd-c6-science-1-1",
      title: "Science and the steps of the scientific process",
      hook: "Science is not just facts in a book. It is a careful way of finding things out, one step at a time.",
      steps: [
        { label: "Ask a question", text: "Science starts with a question or a problem. Why do new flower plants die after planting? Then find out what is already known from books, teachers or parents." },
        { label: "Make a hypothesis", text: "Use what you know to guess a probable result. This careful guess is called a hypothesis. For example, the plants die because they get no water." },
        { label: "Test it", text: "Plan an experiment that changes only one thing. Keep everything else the same. Watch carefully and write down what you see. This record is your data." },
        { label: "Decide and share", text: "Study the data. Does it support the hypothesis? Accept it or reject it. Then share what you found, for example on the school bulletin board." },
      ],
      analogy: "The scientific process is like a rickshaw puller whose tyre keeps going flat. He guesses there is a tiny hole. He dips the tube in a bucket of water and watches. Bubbles rise from one spot, so his guess was right.",
      story: [
        "Tanvir's mother planted marigold seedlings on their roof in Khulna. Two days later, some of them drooped and died. 'Why do new plants die?' Tanvir asked his science teacher, Mrs Sultana. 'That is your problem,' she said. 'Now find out like a scientist.'",
        "Tanvir read his science book and asked his grandfather. Both said that plants need water. So he made a hypothesis: the seedlings die without water. He filled two clay pots with the same dry soil. He planted one seedling in each pot. He watered only one pot and kept both in the shade.",
        "Next morning, the dry seedling hung limp. The watered one stood fresh and green. Water was the only difference, so water must be the reason. Tanvir wrote his result on a sheet of paper. He pinned it on the school bulletin board for everyone to read.",
      ],
      deepRead: [
        "The word science means special knowledge. Science is knowledge about nature and natural events, such as how rain forms or how plants make food. But not every idea about nature is science. A made-up story about rain is not science. Scientific knowledge must come from observation or experiment, or be supported by them. Scientists also need a scientific attitude. This means thinking logically, respecting other people's opinions and admitting your own mistakes.",
        "Different scientists work in different ways, but their methods are alike in many steps. First, they select a question or problem and collect what is already known. Next, they make a probable result, called a hypothesis. Then they plan an experiment and make tools, such as a checklist, to record data. After observing and collecting data, they analyse it. They accept or reject the result, and finally they share their findings.",
        "Here is a worked example. Rafi asks whether bean seeds need water to sprout. His hypothesis is that they do. He puts ten seeds on wet cotton in one dish and ten seeds on dry cotton in another. Both dishes stay in the same room. After three days, eight seeds on wet cotton have sprouted, but none on dry cotton. Water was the only change, so Rafi accepts his hypothesis. The thing you change is called a variable. A good experiment changes only one variable.",
      ],
      example: {
        question: "Nusrat wants to test whether sunlight helps a plant grow. Which plan is a fair test?",
        options: [
          "Two same plants with the same soil and water, one in sun and one in shade",
          "One plant in sun with water and one plant in shade with no water",
          "One big plant in sun and one small plant in shade",
        ],
        answer: 0,
        why: "Only the sunlight is different, so any difference in growth must come from sunlight.",
      },
      keyPoints: [
        "Science is knowledge about nature that comes from observation and experiment, or is supported by them.",
        "The scientific process starts with a question, then a hypothesis, an experiment, analysis of data and sharing the result.",
        "A good experiment changes only one thing and keeps everything else the same.",
      ],
      misconception: {
        belief: "A hypothesis is a fact, so once I have made one, I already know the answer.",
        correction: "A hypothesis is only a probable result, a careful guess. It must be tested by an experiment. If the data do not support it, the scientist rejects it, makes a new hypothesis and tests again.",
      },
      quiz: [
        {
          question: "What is the first step of the scientific process?",
          options: ["Selecting a question or problem", "Analysing the data", "Sharing the findings"],
          answer: 0,
          why: "Every investigation begins by choosing the question or problem to answer.",
        },
        {
          question: "What do we call the probable result a scientist makes before doing an experiment?",
          options: ["Data", "Hypothesis", "Conclusion"],
          answer: 1,
          why: "A hypothesis is a probable result made from known information, and the experiment tests it.",
        },
        {
          question: "Which of these is part of a scientific attitude?",
          options: ["Believing a story because it is old", "Ignoring ideas you do not like", "Admitting your own mistakes"],
          answer: 2,
          why: "A scientific attitude means thinking logically, respecting others' opinions and admitting your own mistakes.",
        },
      ],
      pairs: [
        { term: "Science", match: "Knowledge about nature from observation and experiment" },
        { term: "Hypothesis", match: "A probable result made before testing" },
        { term: "Experiment", match: "A planned test that changes only one thing" },
        { term: "Data", match: "Facts and numbers collected while observing" },
        { term: "Scientific attitude", match: "Thinking logically and admitting your own mistakes" },
      ],
      order: {
        prompt: "Put the steps of the scientific process in order.",
        items: [
          "Select a question or problem",
          "Make a hypothesis from what is already known",
          "Do the experiment and collect data",
          "Analyse the data and share the findings",
        ],
      },
      blitz: [
        { statement: "Admitting your own mistakes is part of a scientific attitude.", truth: true, why: "A scientific attitude means thinking logically, valuing other people's opinions and admitting your own mistakes." },
        { statement: "A made-up story about how rain forms counts as science.", truth: false, why: "Science must come from observation or experiment, or be supported by them." },
        { statement: "In the plant experiment, only the water supply is different between the two pots.", truth: true, why: "Both pots have the same soil and place, so water is the only change." },
        { statement: "To save time, one experiment can change the soil and the water together.", truth: false, why: "Then you could not tell whether the soil or the water caused the result." },
      ],
      blanks: [
        { sentence: "A probable result that is tested by an experiment is called a ___.", options: ["hypothesis", "unit", "finding"], answer: 0 },
        { sentence: "In a fair experiment, only one ___ is changed.", options: ["result", "variable", "conclusion"], answer: 1 },
      ],
      terms: ["question", "hypothesis", "experiment", "data", "variable", "findings"],
      sayPrompt: "Tell a friend the steps a scientist follows to find out whether a plant needs water",
      glossary: [
        { term: "science", bn: "বিজ্ঞান" },
        { term: "scientific process", bn: "বৈজ্ঞানিক প্রক্রিয়া" },
        { term: "experiment", bn: "পরীক্ষণ" },
        { term: "observation", bn: "পর্যবেক্ষণ" },
        { term: "hypothesis", bn: "অনুমিত সিদ্ধান্ত" },
        { term: "data", bn: "উপাত্ত" },
        { term: "variable", bn: "চলক" },
        { term: "scientific attitude", bn: "বিজ্ঞানসম্মত দৃষ্টিভঙ্গি" },
      ],
    },
    {
      id: "bd-c6-science-1-2",
      title: "Units of measurement and the SI system",
      hook: "Measure a rope with your hand and a friend gets a different answer. A standard unit makes everyone's answer the same.",
      steps: [
        { label: "Why measure", text: "We measure when we buy rice, make clothes or cook. Guessing is not good enough. A wrong amount of medicine can even harm a patient." },
        { label: "Use a standard", text: "A unit is a fixed, known amount used as a standard. Every measurement needs a number and a unit. '10 m' has a meaning, but '10' alone does not." },
        { label: "Fundamental units", text: "Seven units do not depend on any other unit. They are the units of length, mass, time, temperature, electric current, luminous intensity and amount of substance." },
        { label: "Derived units", text: "Units made by combining fundamental units are derived units. Area uses metre × metre, so its unit is the square metre. Volume uses three lengths, so it is the cubic metre." },
      ],
      analogy: "A unit is like the measuring cup at a rice shop. If every shop used a different cup, one cup of rice would mean different amounts. When every shop uses the same cup, one cup means the same everywhere.",
      story: [
        "At school in Sylhet, Mr Karim gave Nusrat's group a long rope. 'Measure it with your hands,' he said. Nusrat counted 16 hands. Rafi, who is taller, counted only 15. Mitu counted 17. Soon they were arguing about who was right.",
        "'You all measured carefully,' said Mr Karim. 'But your hands are different sizes.' He took out a measuring tape. 'This tape is marked in metres. A metre is the same in Sylhet, in Dhaka and in every country.'",
        "This time everyone got the same answer, 6 metres. Nusrat wrote '6 m' in her notebook. Then she looked at it again. 'Six alone would tell nobody anything,' she said. 'The unit tells you what the six means.'",
      ],
      deepRead: [
        "We measure things every day. We buy rice and dal by the kilogram, and a tailor measures cloth before making a dress. To measure, we compare a thing with a fixed, known amount called a standard. That known amount is the unit. Every measurement has two parts, a number and a unit. A room that is 10 metres long is written as 10 m.",
        "Anything we measure is called a quantity. Seven units are fundamental units, because they do not depend on any other unit. They are the units of length, mass, time, temperature, electric current, luminous intensity and amount of substance. Units made by combining fundamental units are derived units. Area needs two lengths, so its unit is the square metre, m². Volume needs three lengths, so its unit is the cubic metre, m³.",
        "Countries once used different systems, such as FPS (foot, pound, second), CGS (centimetre, gram, second) and MKS (metre, kilogram, second). In 1960 the world agreed on one system, SI, the International System of Units. In SI, length is in metres, mass in kilograms, time in seconds and temperature in kelvin. We also use bigger and smaller units: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm and 1 kg = 1000 g. Worked example: a trader in Faridpur sells 2 metric tons of jute. 1 metric ton = 10 quintals and 1 quintal = 100 kg, so 1 metric ton = 1000 kg. So 2 metric tons = 2 × 1000 kg = 2000 kg.",
      ],
      example: {
        question: "Which of these is a complete measurement?",
        options: ["The table is 2", "The table is 2 m long", "The table is very long"],
        answer: 1,
        why: "A measurement needs both a number and a unit, and only '2 m' has both.",
      },
      keyPoints: [
        "A unit is a fixed, known amount used as a standard, and every measurement needs a number and a unit.",
        "There are seven fundamental units, such as the metre, kilogram and second, which do not depend on other units.",
        "Derived units, such as the square metre for area and the cubic metre for volume, are made by combining fundamental units.",
      ],
      misconception: {
        belief: "The square metre is a fundamental unit, because it has the word metre in its name.",
        correction: "The square metre is metre × metre, so it is made from two units. That makes it a derived unit. Only seven units are fundamental, such as the metre, kilogram and second. Units built from them are derived.",
      },
      quiz: [
        {
          question: "What is the SI unit of mass?",
          options: ["Gram", "Kilogram", "Quintal"],
          answer: 1,
          why: "In the International System of Units, mass is measured in kilograms, kg.",
        },
        {
          question: "Which of these is a derived unit?",
          options: ["Square metre", "Ampere", "Kilogram", "Candela"],
          answer: 0,
          why: "The square metre is metre × metre, while the other three are fundamental units.",
        },
        {
          question: "A jute exporter sends 5 metric tons of jute abroad. How many kilograms is that?",
          options: ["50 kg", "500 kg", "5000 kg"],
          answer: 2,
          why: "1 metric ton = 1000 kg, so 5 metric tons = 5 × 1000 kg = 5000 kg.",
        },
      ],
      pairs: [
        { term: "Metre", match: "SI unit of length" },
        { term: "Kilogram", match: "SI unit of mass" },
        { term: "Second", match: "SI unit of time" },
        { term: "Kelvin", match: "SI unit of temperature" },
        { term: "Cubic metre", match: "Derived unit of volume" },
      ],
      order: {
        prompt: "Put these steps in order, from the rope problem to a proper measurement.",
        items: [
          "Notice that hand measurements give different answers",
          "Agree on a fixed standard amount, the unit",
          "Measure the rope against that standard unit",
          "Write the answer as a number with its unit, like 6 m",
        ],
      },
      blitz: [
        { statement: "Every measurement needs both a number and a unit.", truth: true, why: "A number alone, like 10, does not say 10 of what." },
        { statement: "The square metre is a fundamental unit.", truth: false, why: "It is metre × metre, so it is a derived unit." },
        { statement: "1 metric ton is equal to 10 quintals.", truth: true, why: "1 metric ton = 10 quintals, and each quintal is 100 kg." },
        { statement: "1 kilogram is equal to 100 grams.", truth: false, why: "1 kilogram is equal to 1000 grams." },
      ],
      blanks: [
        { sentence: "One common system of units, SI, was agreed for all countries in ___.", options: ["1875", "1960", "1990"], answer: 1 },
        { sentence: "1 kilometre is equal to ___ metres.", options: ["10", "100", "1000"], answer: 2 },
      ],
      terms: ["unit", "standard", "number", "fundamental unit", "derived unit", "SI"],
      sayPrompt: "Explain to a friend why we need standard units and why the square metre is a derived unit",
      glossary: [
        { term: "measurement", bn: "পরিমাপ" },
        { term: "unit", bn: "একক" },
        { term: "quantity", bn: "রাশি" },
        { term: "fundamental unit", bn: "মৌলিক একক" },
        { term: "derived unit", bn: "যৌগিক একক" },
        { term: "SI system", bn: "এসআই পদ্ধতি" },
        { term: "metric ton", bn: "মেট্রিক টন" },
        { term: "quintal", bn: "কুইন্টাল" },
      ],
    },
    {
      id: "bd-c6-science-1-3",
      title: "Measuring length, mass, time and volume",
      hook: "A ruler, a balance, a clock and a measuring flask answer most everyday questions. You just need to use each one the right way.",
      steps: [
        { label: "Length", text: "Lay the ruler along the line. Keep your eye straight above the mark you read. Looking from the side gives a wrong reading." },
        { label: "Mass", text: "Use a balance. Put a 100 g weight on one pan. Add marbles to the other pan until the two pans balance. Then divide 100 g by the number of marbles." },
        { label: "Time", text: "Clocks and watches measure time. You can even make a sun clock. Mark the end of a stick's shadow every hour. Later, the shadow tells you the time." },
        { label: "Area and volume", text: "Area of a rectangle = length × breadth. Volume of a box shape = length × breadth × height. For an odd-shaped stone, see how far water rises in a measuring flask." },
      ],
      analogy: "Finding a stone's volume with water is like stepping into a bucket of water. The water level goes up, because your foot pushes water out of the way. A bigger foot pushes the level higher. A stone in a measuring flask does the same.",
      story: [
        "Mitu, who lives in Rajshahi, wanted to know how thick one of her grandfather's old coins was. A single coin was too thin to measure with her ruler. So she stacked 20 coins in a neat pile. The pile was 3 cm tall, which is 30 mm. She divided 30 mm by 20 and got 1.5 mm for each coin.",
        "Next she picked up a small stone from the bank of the Padma. It had no straight sides, so her ruler could not help. Her teacher gave her a measuring flask. Mitu poured in water up to the 50 cc mark.",
        "She tied the stone with a thread and lowered it in. The water rose to 58 cc. She kept her eye level with the water to read it. 'The stone pushed the water up by 8 cc,' she said. 'So the stone's volume is 8 cc.'",
      ],
      deepRead: [
        "Measuring tools only help if you use them correctly. To measure length, lay a ruler along the line and read it with your eye straight above the mark. To measure something very thin, like a coin, stack many coins, measure the pile and divide by the number of coins. To measure mass, use a balance. Put a 100 g weight on one pan and add marbles to the other until the pans balance. If 20 marbles balance 100 g, one marble is 100 g ÷ 20 = 5 g. To measure time, we use clocks. A sun clock uses a stick's moving shadow.",
        "Area tells how much surface something covers. For a rectangle, area = length × breadth. A table 2 m long and 1 m wide has an area of 2 m × 1 m = 2 m². Volume is the space an object takes up. For a box shape, volume = length × breadth × height. A wooden block 10 cm long, 5 cm wide and 4 cm high has a volume of 10 × 5 × 4 = 200 cc. Liquids are measured in litres. 1 litre = 1000 cc = 1000 millilitres.",
        "A stone has an odd shape, so you cannot measure its sides. Instead, use a measuring flask, a tall glass marked in cc. Pour in some water and read the level. Lower the stone in on a thread and read the level again. The difference is the stone's volume. Keep the flask upright on a flat table, and keep your eye level with the water surface.",
      ],
      example: {
        question: "A stone is lowered into a measuring flask. The water rises from 10 cc to 15 cc. What is the volume of the stone?",
        options: ["5 cc", "10 cc", "25 cc"],
        answer: 0,
        why: "The stone's volume is the rise in water level, 15 cc − 10 cc = 5 cc.",
      },
      keyPoints: [
        "Read a ruler or a measuring flask with your eye straight in line with the mark, not from the side.",
        "The area of a rectangle is length × breadth, and the volume of a box shape is length × breadth × height.",
        "The volume of an odd-shaped solid is the rise in water level when it is lowered into a measuring flask.",
      ],
      misconception: {
        belief: "When the water rises from 50 cc to 58 cc, the stone's volume is 58 cc.",
        correction: "58 cc is the water and the stone together. The stone's volume is only the rise in the level. Take the first reading away from the second: 58 cc − 50 cc = 8 cc.",
      },
      quiz: [
        {
          question: "Rafi's table is 2 m long and 1.5 m wide. What is its area?",
          options: ["3 m²", "3.5 m²", "3 m"],
          answer: 0,
          why: "Area = length × breadth = 2 m × 1.5 m = 3 m², and area is written in square metres.",
        },
        {
          question: "Which tool would you use to find the mass of a marble?",
          options: ["Thermometer", "Balance", "Measuring flask"],
          answer: 1,
          why: "A balance compares a mass with a known weight, such as 100 g.",
        },
        {
          question: "A box is 10 cm long, 5 cm wide and 2 cm high. What is its volume?",
          options: ["17 cc", "50 cc", "100 cc"],
          answer: 2,
          why: "Volume = length × breadth × height = 10 × 5 × 2 = 100 cc.",
        },
      ],
      pairs: [
        { term: "Ruler", match: "Measures length" },
        { term: "Balance", match: "Measures mass by comparing it with a known weight" },
        { term: "Clock", match: "Measures time" },
        { term: "Measuring flask", match: "Measures the volume of a liquid" },
        { term: "Thermometer", match: "Measures temperature" },
      ],
      order: {
        prompt: "Put the steps for finding the volume of a stone in order.",
        items: [
          "Pour some water into the measuring flask",
          "Read the water level with your eye level to the surface",
          "Lower the stone into the water on a thread",
          "Read the new level and take away the first reading",
        ],
      },
      blitz: [
        { statement: "1 litre is equal to 1000 cc.", truth: true, why: "1 litre = 1000 cc = 1000 millilitres." },
        { statement: "To read a ruler correctly, you should look at the mark from the side.", truth: false, why: "Looking from the side gives a wrong reading, so keep your eye straight above the mark." },
        { statement: "The area of a rectangle is its length × its breadth.", truth: true, why: "Area = length × breadth, measured in square units such as m²." },
        { statement: "The volume of a box shape is its length × its breadth.", truth: false, why: "That gives only the area of its base. Volume also multiplies by the height." },
      ],
      blanks: [
        { sentence: "1 litre is equal to ___ millilitres.", options: ["100", "1000", "10"], answer: 1 },
        { sentence: "When reading a measuring flask, keep your eye ___ with the water surface.", options: ["level", "above", "below"], answer: 0 },
      ],
      terms: ["ruler", "balance", "measuring flask", "area", "volume", "water level"],
      sayPrompt: "Explain to a friend how to find the volume of a small stone using water and a measuring flask",
      glossary: [
        { term: "length", bn: "দৈর্ঘ্য" },
        { term: "mass", bn: "ভর" },
        { term: "balance", bn: "দাঁড়ি পাল্লা" },
        { term: "area", bn: "ক্ষেত্রফল" },
        { term: "volume", bn: "আয়তন" },
        { term: "measuring flask", bn: "মাপচোঙ" },
        { term: "thermometer", bn: "থার্মোমিটার" },
        { term: "sun clock", bn: "সূর্যঘড়ি" },
      ],
    },
  ],
  cq: {
    stem: "Rafi lives in Rajshahi. His study room is 4 m long and 3 m wide, and his study table is 1.5 m long and 1 m wide. For a class task, he pours water into a measuring flask up to the 30 cc mark. Then he lowers a small stone into the water on a thread, and the water rises to the 42 cc mark.",
    knowledge: {
      q: "What is the SI unit of volume?",
      a: "The SI unit of volume is the cubic metre, m³.",
    },
    comprehension: {
      q: "Why is the unit of area called a derived unit? Explain.",
      a: "A fundamental unit, such as the metre, does not depend on any other unit. To find area, we multiply length by breadth. So the unit of area is metre × metre, which is the square metre, m². It is made by combining two units of length. A unit made by combining fundamental units is called a derived unit. So the unit of area is a derived unit.",
    },
    application: {
      q: "Find how much of the floor of Rafi's room is left free after his table is placed in it.",
      a: "Area of the room = length × breadth = 4 m × 3 m = 12 m². Area of the table = length × breadth = 1.5 m × 1 m = 1.5 m². Free floor area = area of the room − area of the table = 12 m² − 1.5 m² = 10.5 m². So 10.5 m² of the floor is left free.",
    },
    higherOrder: {
      q: "Rafi's sister says he should measure the stone with a ruler, as he did for his table. Do you agree? Give reasons using the stem.",
      a: "I do not agree. A ruler works for a box shape, because its volume = length × breadth × height. A stone has an odd shape with no straight sides, so its length, breadth and height cannot be measured properly. Rafi used the better method. The stone pushed the water up, so its volume equals the rise in the water level. Volume of the stone = 42 cc − 30 cc = 12 cc, which is 12 millilitres. For a correct reading, the flask must stand upright on a flat surface, and his eye must be level with the water surface. So the measuring flask method is the right choice for an odd-shaped stone.",
    },
  },
} satisfies UnitContent;

export default unit;
