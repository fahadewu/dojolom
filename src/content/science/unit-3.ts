import type { UnitContent } from "@/content/types";

const unit = {
  subject: "science",
  unit: 3,
  title: "Living things",
  summary: "After this unit you can tell whether something is alive, explain that every living thing is built from cells, and trace the energy in your food back to sunlight caught by a plant.",
  concepts: [
    {
      id: "science-3-1",
      title: "What makes something alive",
      hook: "A fire grows, moves and eats up wood, yet it isn't alive. Living things share a checklist that nothing else passes in full.",
      steps: [
        { label: "Checklist", text: "Every living thing does seven jobs. It moves, feeds, grows, senses, gets rid of waste, releases energy from food, and makes more of its kind." },
        { label: "All seven", text: "A thing has to do the whole list to count as alive. A car moves and uses fuel, but it never grows or makes baby cars." },
        { label: "Look closely", text: "Some jobs are hidden. A tree doesn't walk, but its leaves turn towards the light and its roots push through soil. That counts as movement." },
        { label: "Plants too", text: "Plants, animals, fungi and tiny bacteria are all alive. Rocks, water, fire and robots are not, however busy they seem." },
      ],
      analogy: "Think of a club with seven rules for joining. A robot follows a few of them, like moving and using energy, so it gets close. But only members who follow all seven get the badge, and only living things follow all seven.",
      story: [
        "Amara's little brother Kofi was sure his robot dog was alive. It walked across the kitchen floor, barked when you clapped, and needed feeding every night at its charger. 'It does everything Biscuit does,' he said, pointing at the real dog asleep by the radiator.",
        "Amara fetched the checklist from her science book and they went through it together. The robot moved, yes. It sensed a clap, yes. It used energy, sort of. But did it grow? Kofi shook his head. Did it get rid of waste, or make baby robots? No and no.",
        "Then Biscuit stretched, wandered over and nudged his empty bowl. He had grown from a tiny puppy, he ate every day, and he certainly left waste in the garden. Every box had a tick. 'Close,' said Amara, 'but a robot only does some of the jobs. Being alive means doing all of them.'",
      ],
      deepRead: [
        "Biologists describe life by what it does rather than what it is made of. Every living thing carries out seven life processes. It moves, even if only by turning a leaf towards the light. It respires, releasing energy from food inside its cells. It senses and responds to its surroundings. It grows. It reproduces, making more of its kind. It excretes, getting rid of waste its body has made. And it feeds, taking in food or making its own. A common memory aid is MRS GREN: movement, respiration, sensitivity, growth, reproduction, excretion, nutrition.",
        "The test is that a living thing does all seven at some point in its life. Non-living things can manage a few. A river moves. A crystal grows. A car takes in fuel and gives out exhaust. None of them does the rest, so none is alive. Take a bean seed as a worked example. It sits in a packet for months doing almost nothing. Is it alive? Give it water and warmth and it swells, splits, pushes out a root and a shoot, and turns its first leaves to the window. Its processes were slowed right down, not absent. The seed passes.",
        "The seven processes apply to every kind of living thing: animals, plants, fungi and bacteria too small to see. A mushroom never walks and a bacterium has no eyes, yet each one moves, senses, grows, feeds, respires, excretes and reproduces in its own way.",
      ],
      example: {
        question: "Which of these is alive?",
        options: ["A flickering candle flame", "Mould on old bread", "A fast flowing river"],
        answer: 1,
        why: "Mould is a fungus: it feeds on the bread, grows and makes spores to reproduce, so it passes the checklist.",
      },
      keyPoints: [
        "Living things do seven jobs: move, respire, sense, grow, reproduce, excrete and feed.",
        "Something is alive only if it does all seven, not just a few of them.",
        "Plants, fungi and bacteria are alive too, even when they don't seem to move.",
      ],
      misconception: {
        belief: "Plants aren't really alive like animals are, because they don't move or eat anything.",
        correction: "Plants do move: shoots bend towards light and roots grow downwards. They also feed, but they make their own food from sunlight, air and water instead of eating. They grow, respire, respond, reproduce with seeds or spores and get rid of waste gases, so they pass the whole checklist.",
      },
      quiz: [
        {
          question: "A car moves and uses fuel. Why isn't it alive?",
          options: ["It never grows or reproduces", "It isn't warm like an animal", "It is made of metal, not flesh"],
          answer: 0,
          why: "A living thing must do all seven life processes, and a car only manages a couple of them.",
        },
        {
          question: "Which of these is one of the seven life processes?",
          options: ["Sleeping", "Excretion", "Thinking"],
          answer: 1,
          why: "Excretion means getting rid of waste, and every living thing does it.",
        },
        {
          question: "A dry seed sits in a packet for a year. Is it alive?",
          options: ["No, because nothing is happening inside it", "Only after it has been planted", "Yes, its processes are slowed, not gone"],
          answer: 2,
          why: "Give it water and warmth and it sprouts, which shows it was alive all along.",
        },
      ],
      pairs: [
        { term: "Respiration", match: "Releasing energy from food inside the body" },
        { term: "Excretion", match: "Getting rid of waste the body has made" },
        { term: "Sensitivity", match: "Noticing and responding to changes around you" },
        { term: "Reproduction", match: "Making more living things of the same kind" },
        { term: "Nutrition", match: "Taking in food or making your own" },
      ],
      order: {
        prompt: "Put the stages of a bean plant's life in order.",
        items: [
          "A dry seed takes in water and swells",
          "A root pushes down and a shoot pushes up",
          "Leaves open and the plant grows taller",
          "Flowers form and make new seeds",
        ],
      },
      blitz: [
        { statement: "A living thing has to do all seven life processes, not just some.", truth: true, why: "Non-living things can do a few, like a river moving, but never all seven." },
        { statement: "Fire is alive because it grows and spreads.", truth: false, why: "Fire does a few of the jobs but not all seven, so it fails the checklist." },
        { statement: "Mushrooms are living things.", truth: true, why: "A mushroom is a fungus: it feeds, grows, respires and makes spores." },
        { statement: "Only things that can walk or swim count as moving.", truth: false, why: "A plant turning its leaves to the light is movement too." },
      ],
      blanks: [
        { sentence: "Plants make their own food, so they still carry out ___.", options: ["movement", "nutrition", "sensitivity"], answer: 1 },
        { sentence: "Getting rid of waste from the body is called ___.", options: ["excretion", "digestion", "respiration"], answer: 0 },
      ],
    },
    {
      id: "science-3-2",
      title: "Cells: the building blocks of life",
      hook: "Your body is made of trillions of tiny living units called cells. Almost all are too small to see, yet each one is alive.",
      steps: [
        { label: "Tiny units", text: "Every living thing is made of cells. Most are far too small to see, so you need a microscope. Dozens of your cells in a row would fit across a printed full stop." },
        { label: "Inside a cell", text: "A cell has a thin outer skin called the membrane. Inside is a watery jelly called cytoplasm. The nucleus is the control centre and holds the cell's instructions." },
        { label: "Plant extras", text: "Plant cells have three extras. A stiff cell wall holds the shape. Green chloroplasts catch sunlight to make food. A large vacuole stores water and keeps the cell firm." },
        { label: "One or many", text: "Some living things are a single cell, like bacteria and yeast. You are made of tens of trillions. Cells divide to make new cells, which is how you grow and heal." },
      ],
      analogy: "A brick house. Each brick is small and plain on its own, but thousands of bricks together make walls, rooms and a roof. Cells are the bricks of a living body, except that each brick is alive and can copy itself.",
      story: [
        "Hugo peeled a see-through layer from an onion and laid it flat on a glass slide. Under the microscope it looked like a brick wall, tiny boxes packed in neat rows. 'Each box is one cell,' said Ms Okafor. 'The whole onion is made of millions of them.'",
        "Then she handed out cotton buds. Hugo rubbed one gently inside his cheek and smeared it on a fresh slide. A drop of blue dye, and there they were: pale blobs, each with a darker dot in the middle. His own cells, each with its own nucleus.",
        "He looked from one slide to the other. The onion cells had straight walls and sat in rows. His cheek cells were rounder and softer, with no wall at all. Different shapes, same idea. Everything alive, from a kitchen onion to Hugo himself, was built from tiny living boxes.",
      ],
      deepRead: [
        "A cell is the smallest unit that is alive on its own. Every living thing is either a single cell or a community of cells working together, a rule called cell theory. Robert Hooke gave cells their name in 1665, when thin slices of cork under an early microscope showed him rows of tiny boxes like the small rooms, or cells, where monks slept. Most cells are between 10 and 100 micrometres across; a micrometre is a thousandth of a millimetre. A human red blood cell is about 8 micrometres wide, so roughly 60 of them could line up across a half-millimetre full stop.",
        "Animal and plant cells share three main parts. The cell membrane is a thin outer layer that controls what enters and leaves. The cytoplasm is the watery jelly where most of the cell's chemistry happens. The nucleus holds the DNA, the coded instructions that direct the cell. Plant cells add a rigid cell wall of cellulose outside the membrane, chloroplasts that carry out photosynthesis, and a large central vacuole of watery sap that keeps the cell firm. Bacteria are simpler still: a single cell with no nucleus and its DNA loose in the cytoplasm.",
        "Cells make new cells by dividing in two, and the numbers climb fast. One cell becomes 2, then 4, then 8. After 10 rounds there are 1,024 cells; after 20, more than a million. A human begins as one fertilised egg cell and grows into a body of roughly 30 trillion cells, all descended from that first one. Division carries on throughout life to replace worn-out skin, blood and gut lining.",
      ],
      example: {
        question: "Which part of a cell holds the instructions that control it?",
        options: ["Cell membrane", "Cytoplasm", "Nucleus", "Cell wall"],
        answer: 2,
        why: "The nucleus stores the DNA, the coded instructions the cell follows.",
      },
      keyPoints: [
        "Every living thing is made of one or more cells.",
        "Animal and plant cells both have a membrane, cytoplasm and a nucleus.",
        "Plant cells also have a cell wall, chloroplasts and a large vacuole.",
      ],
      misconception: {
        belief: "Cells are only in animals. Plants are made of wood and leaves, not cells.",
        correction: "Plants are made of cells too. Wood is mostly the stiff walls of old plant cells, and a leaf is a thin sandwich of living cells full of green chloroplasts. Look at onion skin under a microscope and the rows of cells are easy to see.",
      },
      quiz: [
        {
          question: "Which of these is found in plant cells but not in animal cells?",
          options: ["Nucleus", "Cell membrane", "Chloroplast"],
          answer: 2,
          why: "Chloroplasts catch sunlight to make food, and animal cells have none.",
        },
        {
          question: "How many cells is a bacterium made of?",
          options: ["One", "About a hundred", "Millions"],
          answer: 0,
          why: "A bacterium is a single cell that does all its life processes on its own.",
        },
        {
          question: "Why can a cut on your skin heal?",
          options: ["The skin around the cut stretches over the gap", "Nearby cells divide to make new cells", "Dried blood slowly turns into new skin"],
          answer: 1,
          why: "Cells make new cells by dividing, and the new cells fill in the wound.",
        },
      ],
      pairs: [
        { term: "Cell membrane", match: "Thin outer layer that controls what goes in and out" },
        { term: "Nucleus", match: "Control centre that holds the cell's instructions" },
        { term: "Cytoplasm", match: "Watery jelly where most of the cell's work happens" },
        { term: "Cell wall", match: "Stiff outer layer that gives a plant cell its shape" },
        { term: "Chloroplast", match: "Green part that catches sunlight to make food" },
      ],
      order: {
        prompt: "Put the steps for looking at onion cells under a microscope in order.",
        items: [
          "Peel a thin layer of skin from the onion",
          "Lay it flat on a glass slide with a drop of water",
          "Add a drop of dye and lower a cover slip on top",
          "Focus the microscope and count the cells you see",
        ],
      },
      blitz: [
        { statement: "Every living thing is made of at least one cell.", truth: true, why: "That is the first rule of cell theory." },
        { statement: "Animal cells have a stiff cell wall.", truth: false, why: "Animal cells have only a thin membrane on the outside; a stiff wall is a plant cell feature." },
        { statement: "You can see most cells clearly with just your eyes.", truth: false, why: "Most cells are far smaller than a full stop, so you need a microscope." },
        { statement: "Cells make new cells by splitting in two.", truth: true, why: "That is how you grow and how cuts heal." },
      ],
      blanks: [
        { sentence: "The ___ is the control centre of a cell and holds its instructions.", options: ["nucleus", "membrane", "vacuole"], answer: 0 },
        { sentence: "Green ___ in plant cells catch sunlight to make food.", options: ["vacuoles", "nuclei", "chloroplasts"], answer: 2 },
      ],
    },
    {
      id: "science-3-3",
      title: "How living things get their energy",
      hook: "The energy in almost every meal you eat was once sunlight, caught by a leaf. Plants store it, and everything else borrows it.",
      steps: [
        { label: "Plants make food", text: "Leaves take in carbon dioxide from the air, and roots draw up water. Using light energy, the plant turns them into sugar and gives off oxygen. This is photosynthesis." },
        { label: "Animals eat", text: "Animals can't make food, so they eat plants or other animals. The sugar and other nutrients in food carry the energy the plant first stored." },
        { label: "Respiration", text: "Every living cell, plant or animal, releases that stored energy. It joins sugar with oxygen and gives off carbon dioxide and water. This is respiration, and it never stops." },
        { label: "A loop", text: "Photosynthesis and respiration are a pair. One takes in carbon dioxide and gives out oxygen; the other does the reverse. The gases go round and round while the energy passes through." },
      ],
      analogy: "A plant is a solar charger that stores sunshine in batteries called sugar. Eating the plant means taking the charged batteries. Respiration runs them down to power your body, and the carbon dioxide you breathe out is the empty battery, ready for a plant to recharge.",
      story: [
        "Mei forgot about the basil plant she had tucked into the cupboard under the stairs. Two weeks later she found it pale and floppy, its new leaves yellow instead of green. Its twin on the windowsill, planted the same day, was bushy and dark.",
        "'Same water, same soil,' she told her dad. 'The only difference is light.' He asked what light does for a plant. Mei thought back to her lesson. Light is how a plant makes its food. In the dark cupboard the basil couldn't make any, so it had slowly used up its stores.",
        "She moved it to the window beside its twin. Within a week the new leaves came through green and the stems firmed up. That evening Mei tore a leaf from the healthy plant for her pasta and chewed slowly. Stored sunshine, she thought. Tomorrow, running for the bus, she would burn it.",
      ],
      deepRead: [
        "Photosynthesis is how plants, algae and some bacteria make their own food. In a plant this happens inside chloroplasts, where the green pigment chlorophyll absorbs light energy and uses it to combine carbon dioxide from the air with water drawn up from the soil. The products are glucose, a simple sugar, and oxygen, which escapes through tiny pores in the leaf. As a word equation: carbon dioxide plus water, using light energy, makes glucose plus oxygen. The plant uses some glucose at once, stores some as starch, and builds the rest into cellulose for cell walls and the other materials it needs to grow.",
        "Respiration runs the other way, and happens in every living cell, plant or animal, all the time. Glucose reacts with oxygen to release the stored energy, producing carbon dioxide and water: glucose plus oxygen makes carbon dioxide plus water plus energy. Breathing is not respiration. Breathing moves air in and out to supply oxygen and remove carbon dioxide; respiration is the chemistry inside the cell. The energy released powers muscle movement, builds new cells and keeps warm-blooded bodies warm.",
        "Follow one loop as a worked example. On a sunny day an oak leaf makes more glucose than it uses, and the surplus feeds the roots, thickens the trunk and fills the acorns. In autumn a squirrel eats an acorn. Over winter its cells respire the sugars from that acorn, taking in oxygen and giving out carbon dioxide. In spring the oak's new leaves capture that carbon dioxide and start again. The energy arrived as sunlight and finally leaves as heat, while the atoms go round.",
      ],
      example: {
        question: "Which gas do plants take in for photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide"],
        answer: 2,
        why: "Leaves take in carbon dioxide and join it with water to make sugar, giving off oxygen.",
      },
      keyPoints: [
        "Plants make sugar from carbon dioxide and water using light, and give off oxygen.",
        "Respiration releases energy from sugar using oxygen, and happens in every living cell.",
        "Animals get their energy by eating plants, or by eating animals that ate plants.",
      ],
      misconception: {
        belief: "Plants breathe in carbon dioxide and breathe out oxygen, and animals do the opposite. So plants don't need oxygen.",
        correction: "Plants respire just like animals do, using oxygen to release energy from sugar in every cell, day and night. In daylight they also photosynthesise, which takes in carbon dioxide and gives out more oxygen than they use. So plants do need oxygen; they simply make more of it than they take.",
      },
      quiz: [
        {
          question: "What does a plant need for photosynthesis?",
          options: ["Light, water and carbon dioxide", "Light, soil and oxygen", "Warmth, water and carbon dioxide"],
          answer: 0,
          why: "Photosynthesis needs light energy, so any list without light is wrong; oxygen is a product of photosynthesis, not an ingredient.",
        },
        {
          question: "Do plants respire?",
          options: ["No, plants only photosynthesise", "Yes, all the time, day and night", "Only at night, when there is no light for photosynthesis"],
          answer: 1,
          why: "Plants need energy too, so their cells respire day and night; photosynthesis only happens in the light.",
        },
        {
          question: "Where does the energy in a beef burger first come from?",
          options: ["The sun", "The cow", "The grill"],
          answer: 0,
          why: "Grass caught sunlight and stored it as sugar; the cow ate the grass and you eat the cow.",
        },
      ],
      pairs: [
        { term: "Photosynthesis", match: "Making sugar from carbon dioxide and water using light" },
        { term: "Chlorophyll", match: "Green pigment in leaves that catches light" },
        { term: "Glucose", match: "The simple sugar that plants make and cells burn for energy" },
        { term: "Oxygen", match: "Gas that leaves give off and respiring cells use up" },
        { term: "Carbon dioxide", match: "Gas that leaves take in and respiring cells give out" },
      ],
      order: {
        prompt: "Put the journey of energy from the sun to a running child in order.",
        items: [
          "Sunlight lands on the leaves of a wheat plant",
          "The plant makes sugar and stores it as starch in the grain",
          "The child eats bread made from the wheat",
          "The child's muscle cells respire the sugar to power the run",
        ],
      },
      blitz: [
        { statement: "Plants make their own food from sunlight, water and carbon dioxide.", truth: true, why: "That is photosynthesis, which happens in the green parts of a plant." },
        { statement: "Plants don't respire; only animals do.", truth: false, why: "Every living cell respires to release energy, including plant cells." },
        { statement: "Breathing and respiration are the same thing.", truth: false, why: "Breathing moves air in and out; respiration releases energy inside cells." },
        { statement: "Leaves give off oxygen during photosynthesis.", truth: true, why: "Leaves release oxygen as they make sugar, and that is the oxygen animals breathe." },
      ],
      blanks: [
        { sentence: "Plants take in ___ from the air to make sugar.", options: ["oxygen", "nitrogen", "carbon dioxide"], answer: 2 },
        { sentence: "In respiration, cells combine sugar with ___ to release energy.", options: ["light", "oxygen", "carbon dioxide"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
