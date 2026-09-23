import type { UnitContent } from "@/content/types";

const unit = {
  subject: "science",
  unit: 5,
  title: "Earth and space",
  summary: "After this unit you can explain why we have day, night and seasons, read the Moon's changing shape, and describe how Earth's slowly moving plates build mountains and shake the ground.",
  concepts: [
    {
      id: "science-5-1",
      title: "Day, night and the seasons",
      hook: "Earth spins once a day and leans slightly to one side as it circles the Sun. That spin and that lean give you every sunrise and every summer.",
      steps: [
        { label: "Spin", text: "Earth spins all the way round once every 24 hours. The side facing the Sun has day. The side facing away has night. Earth turns towards the east, so the Sun seems to rise in the east." },
        { label: "Orbit", text: "While it spins, Earth also travels around the Sun. One full trip takes a year, about 365 and a quarter days. That spare quarter day is why we add 29 February every four years." },
        { label: "Tilt", text: "Earth does not spin standing straight up. Its axis leans over by about 23.4 degrees. It keeps leaning the same way all year, so first one half of Earth tips towards the Sun, then the other." },
        { label: "Seasons", text: "The half tipped towards the Sun gets longer days and stronger, more direct sunlight. That is summer. The other half gets short days and slanting light. That is winter. Six months later they swap." },
      ],
      analogy: "A torch shining straight down on a table makes a small bright circle. Tilt the torch and the same light spreads into a big, dimmer oval. In summer your part of Earth faces the Sun squarely, like the straight torch. In winter it gets the slanting, spread-out light.",
      story: [
        "Amara's cousin Zoe lives in Sydney. On Christmas Day they video-called, and Amara held the phone up to the window to show the frost on the garden. Zoe laughed and turned her camera round. She was on the beach in a swimming costume, squinting in the sun.",
        "'How can it be summer for you and winter for me on the same day?' Amara asked. Her dad picked up an orange and a pencil. He pushed the pencil through the orange at a slant and held it beside the lamp. 'Earth leans like this,' he said. 'Right now the bottom half is tipped towards the Sun, so Australia gets long days and strong sunshine. We're tipped away.'",
        "He carried the orange halfway round the lamp, keeping the pencil pointing the same way. Now the top half leaned towards the light. 'That's us in June,' he said. Amara looked at the frost, then at Zoe's beach, and for the first time the two pictures fitted together.",
      ],
      deepRead: [
        "Earth has two motions that matter for daily life. It rotates on its axis once every 24 hours, which gives day and night, and it orbits the Sun once every 365.25 days, which gives the year. The axis is not upright relative to the orbit; it is tilted by about 23.4 degrees, and it points towards the same spot among the stars all year round. That means the Northern Hemisphere leans towards the Sun around June and away from it around December, while the Southern Hemisphere does the opposite.",
        "The lean changes two things. First, the hemisphere tilted towards the Sun spends more of each 24 hours in daylight: London gets about 16.5 hours of daylight in late June but under 8 in late December. Second, sunlight arrives more directly. A beam that hits the ground square on is concentrated in a small area. The same beam arriving at 30 degrees above the horizon is spread over twice the area, so each square metre gets half the energy. Longer days plus stronger light means warmer months.",
        "Distance from the Sun is not the cause. Earth's orbit is very nearly a circle, and we are actually closest to the Sun in early January, in the middle of the northern winter. The difference between nearest and farthest is only about 3 per cent, far too small to matter next to the tilt. If distance caused the seasons, the whole planet would have summer at the same time. Instead, Sydney has its hottest weather while Oslo has its coldest, which only the tilt explains.",
      ],
      example: {
        question: "In July, Australia has winter while the UK has summer. Why?",
        options: ["Australia is much further from the Sun than the UK in July", "Earth's southern half is tipped away from the Sun in July", "Australia is further from the equator than the UK is"],
        answer: 1,
        why: "The tilt makes Earth's southern half lean away from the Sun in July, so it gets short days and slanting light.",
      },
      keyPoints: [
        "Earth spins once every 24 hours, and the side facing the Sun has day.",
        "Earth's axis leans about 23.4 degrees and points the same way all year.",
        "The half tipped towards the Sun has summer: longer days and more direct light.",
      ],
      misconception: {
        belief: "It's summer when Earth is closer to the Sun and winter when it's further away.",
        correction: "Earth is actually closest to the Sun in early January, when the north is deep in winter. If distance were the cause, the whole planet would have the same season at once. Instead the two halves have opposite seasons, because the tilt tips one half towards the Sun and the other away.",
      },
      quiz: [
        {
          question: "What causes day and night?",
          options: ["The Sun moves around Earth once a day", "The Moon blocks the Sun each night", "Earth spins on its axis once a day"],
          answer: 2,
          why: "Earth turns, so each place faces the Sun for part of the day and faces away for the rest.",
        },
        {
          question: "Roughly how long does Earth take to travel once around the Sun?",
          options: ["About 365 days", "About 24 hours", "About 30 days"],
          answer: 0,
          why: "One orbit is a year, about 365 and a quarter days; 24 hours is one spin and 30 days is about one Moon cycle.",
        },
        {
          question: "In late June, London has about 16 and a half hours of daylight. What is the main reason?",
          options: ["Earth is closest to the Sun in the month of June", "The north of Earth is tipped towards the Sun", "Earth spins more slowly during the summer months"],
          answer: 1,
          why: "The tilt keeps the north in sunlight for more of each spin in June; Earth's spin speed and distance barely change.",
        },
      ],
      pairs: [
        { term: "Rotation", match: "Earth spinning on its axis, once every 24 hours" },
        { term: "Orbit", match: "Earth's year-long journey around the Sun" },
        { term: "Axis", match: "The imaginary line through the poles that Earth spins around" },
        { term: "Tilt", match: "The 23.4 degree lean that gives us seasons" },
        { term: "Leap year", match: "A year with 29 February, catching up the spare quarter days" },
      ],
      order: {
        prompt: "Put the steps in order to explain why June is warm in the UK.",
        items: [
          "Earth's axis stays tilted the same way as it orbits the Sun",
          "In June the northern half of Earth leans towards the Sun",
          "The UK gets long days and sunlight that arrives more directly",
          "More hours of stronger sunlight warm the land and air",
        ],
      },
      blitz: [
        { statement: "Earth spins once every 24 hours.", truth: true, why: "One full turn is one day; that is what a day means." },
        { statement: "Summer comes when Earth moves closer to the Sun.", truth: false, why: "Earth is actually closest to the Sun in early January; the tilt, not distance, makes the seasons." },
        { statement: "When it is summer in the UK, it is winter in Australia.", truth: true, why: "The two halves of Earth lean opposite ways, so their seasons are opposite." },
        { statement: "Earth's tilt points a different way each season.", truth: false, why: "The axis keeps pointing the same way all year; what changes is where Earth is on its orbit." },
      ],
      blanks: [
        { sentence: "Earth's axis is tilted by about ___ degrees.", options: ["23.4", "45", "90"], answer: 0 },
        { sentence: "The half of Earth tipped towards the Sun has ___.", options: ["winter", "night", "summer"], answer: 2 },
      ],
    },
    {
      id: "science-5-2",
      title: "Why the Moon changes shape",
      hook: "The Moon never actually changes shape. What changes is how much of its sunlit half you can see from where you stand.",
      steps: [
        { label: "Borrowed light", text: "The Moon makes no light of its own. It is a ball of rock lit by the Sun. Like Earth, it always has a bright day side facing the Sun and a dark night side facing away." },
        { label: "Moving round", text: "The Moon travels around Earth once every month or so. As it moves, we look at its lit half from a different angle each night. Sometimes we see all of it, sometimes only a slice." },
        { label: "The phases", text: "New moon: the Moon sits between us and the Sun, so its lit side faces away and we see nothing. A week later, first quarter: we see half. Two weeks in, full moon: we see the whole lit face." },
        { label: "Wax and wane", text: "From new to full the lit part grows each night. That is waxing. From full back to new it shrinks. That is waning. The whole cycle takes about 29 and a half days." },
      ],
      analogy: "Hold a tennis ball at arm's length in a dark room with one lamp on. Turn slowly on the spot. The lamp always lights half the ball, but you see a thin sliver, then a half, then a full bright circle as you turn.",
      story: [
        "Rosa's class had been told to draw the Moon every clear night for a month. By the second week her sketches went from a thin curve to a fat D shape, and she asked her mum why Earth's shadow kept sliding off it.",
        "Her mum switched off the kitchen light, turned on the lamp in the corner and handed Rosa a white football. 'The lamp is the Sun. Your head is Earth. Hold the ball up high and turn slowly.' Rosa turned. With the ball towards the lamp she saw only its dark side. A quarter turn later, half of it glowed. With her back to the lamp, the whole face shone.",
        "'Your head never once cast a shadow on it,' her mum said. 'You just saw the lit half from a new angle each time.' Rosa looked at her D-shaped sketch and grinned. Earth's shadow had nothing to do with it. The ball had simply gone round her head, and the Moon had gone round Earth.",
      ],
      deepRead: [
        "The Moon is a rocky ball about 3,470 kilometres across, roughly a quarter of Earth's width, about 384,000 kilometres away. It makes no light; we see it only because it reflects sunlight. At every moment the Sun lights exactly half of the Moon, just as it lights half of Earth. A phase is simply the fraction of that lit half which faces us, and it changes as the Moon moves along its orbit. The cycle from one new moon to the next takes about 29.5 days.",
        "A worked example makes the geometry clear. Picture the Sun far off to the left. At new moon the Moon lies between Earth and the Sun, so its dark half faces us and we see nothing. About 7.4 days later it has moved a quarter of the way round. Now we look at it side on and see half of its lit half: first quarter, a half-lit disc. Another 7.4 days brings it opposite the Sun, with Earth in the middle, and we see the whole lit face: full moon. The waning half of the cycle then mirrors the waxing half.",
        "Earth's shadow plays no part in ordinary phases. The Moon's orbit is tilted about 5 degrees to Earth's orbit around the Sun, so at most full moons the Moon passes above or below the shadow. Only when the line-up is exact does the shadow reach the Moon, and that is a lunar eclipse, a much rarer event. The Moon also spins exactly once per orbit, so the same face always points at Earth.",
      ],
      example: {
        question: "Tonight the Moon looks like a half circle. Why do we see only half of it lit?",
        options: ["We are seeing the Moon's lit half side on", "Earth's shadow is covering the other half", "The Moon has turned its far side towards us"],
        answer: 0,
        why: "The Sun always lights half the Moon; at first or last quarter we view that lit half from the side, so we see half of it.",
      },
      keyPoints: [
        "The Moon makes no light of its own; it reflects sunlight.",
        "A phase is how much of the Moon's sunlit half we can see.",
        "One new moon to the next takes about 29 and a half days.",
      ],
      misconception: {
        belief: "The Moon's phases happen because Earth's shadow covers part of it.",
        correction: "Earth's shadow only touches the Moon during a lunar eclipse, which happens a few times a year at most. The Moon's orbit is tilted, so it usually passes above or below the shadow. Phases come from angle: as the Moon circles Earth, we see more or less of whichever half is lit by the Sun at that moment.",
      },
      quiz: [
        {
          question: "Where is the Moon at new moon?",
          options: ["Between Earth and the Sun", "On the far side of Earth from the Sun", "Hidden inside Earth's shadow"],
          answer: 0,
          why: "At new moon the Moon sits between us and the Sun, so its lit side faces away from us.",
        },
        {
          question: "Roughly how long is it from one full moon to the next?",
          options: ["About 7 days", "About a year", "About 29.5 days"],
          answer: 2,
          why: "The full cycle of phases takes about 29.5 days, which is why a month is roughly one Moon cycle.",
        },
        {
          question: "The Moon is growing from a thin crescent towards a full moon. What is this called?",
          options: ["Waning", "Waxing", "Eclipsing"],
          answer: 1,
          why: "Waxing means growing; waning means shrinking, and an eclipse is a separate, rarer event.",
        },
      ],
      pairs: [
        { term: "New moon", match: "Moon between Earth and Sun, so we see none of the lit half" },
        { term: "Full moon", match: "Earth between Sun and Moon, so the whole lit face shows" },
        { term: "Waxing", match: "The lit part growing night by night" },
        { term: "Waning", match: "The lit part shrinking night by night" },
        { term: "Lunar eclipse", match: "Earth's shadow falling on the Moon, a rare line-up" },
      ],
      order: {
        prompt: "Put the Moon's phases in order, starting from new moon.",
        items: ["New moon", "Waxing crescent", "First quarter", "Full moon"],
      },
      blitz: [
        { statement: "The Moon makes its own light.", truth: false, why: "The Moon only reflects sunlight; it has no light of its own." },
        { statement: "Half of the Moon is lit by the Sun at any one time, just like Earth.", truth: true, why: "Like any ball in sunlight, one half is lit and one half is dark." },
        { statement: "Earth's shadow causes the Moon's phases.", truth: false, why: "Phases come from our viewing angle; Earth's shadow only matters during a lunar eclipse." },
        { statement: "The same side of the Moon always faces Earth.", truth: true, why: "The Moon spins once for every orbit, so one face stays pointed at us." },
      ],
      blanks: [
        { sentence: "The Moon shines because it reflects light from the ___.", options: ["Sun", "Earth", "stars"], answer: 0 },
        { sentence: "When the lit part of the Moon shrinks each night, we say it is ___.", options: ["waxing", "waning", "eclipsing"], answer: 1 },
      ],
    },
    {
      id: "science-5-3",
      title: "Inside the Earth and its moving plates",
      hook: "The ground under your feet is drifting, about as fast as your fingernails grow. Over millions of years that slow creep builds mountains and shakes cities.",
      steps: [
        { label: "Layers", text: "Earth is built in layers, like a peach. The thin crust is the skin we live on. Under it is the mantle, a deep layer of hot rock. At the centre is the core, mostly iron, hotter than 5,000 degrees Celsius." },
        { label: "Plates", text: "The crust and the very top of the mantle are cracked into huge pieces called tectonic plates. There are seven or eight very large ones and many smaller ones. Every continent and ocean floor is part of a plate." },
        { label: "Slow drift", text: "Heat from deep inside makes the mantle churn very slowly, and the plates ride along on top. They move a few centimetres a year. The Atlantic Ocean grows about 2.5 centimetres wider every year." },
        { label: "Where they meet", text: "Where plates pull apart, new rock rises to fill the gap. Where they push together, mountains rise, or one plate dives under the other and molten rock rises to feed volcanoes. Where they grind past, they stick and jerk, causing earthquakes." },
      ],
      analogy: "Picture a pan of thick soup heating on the stove with crackers floating on top. The soup below slowly churns, and the crackers drift, bump, crumple at the edges and pull apart to show soup between them. Plates on the mantle behave in the same slow way.",
      story: [
        "Elin and her mother walked down into a wide rocky valley at Thingvellir in Iceland. On one side rose a cliff of dark lava. On the other, far across the grass, rose another. 'That cliff is the edge of the North American plate,' her mother said. 'The one over there is the edge of the Eurasian plate. We're standing in the crack between them.'",
        "Elin stopped. The ground felt perfectly solid. 'It's moving?' she asked. 'About two centimetres a year,' her mother said. 'Roughly as fast as your fingernails grow. Hot rock from below wells up to fill the gap, which is why Iceland has so many volcanoes.'",
        "Elin spread her arms as wide as she could. Two centimetres a year, for ten thousand years, and the valley would be two hundred metres wider. The cliffs had looked like scenery. Now they looked like a slow-motion tear in the planet, still opening while she stood there.",
      ],
      deepRead: [
        "Earth's radius is about 6,370 kilometres, almost all of it rock and metal we will never see. The crust is thin: around 7 kilometres under the oceans and 30 to 50 under the continents. Below it the mantle extends down about 2,900 kilometres. It is solid rock, but so hot that over millions of years it creeps like a glacier. At the centre sits the core: a liquid outer layer of iron and nickel, whose churning produces Earth's magnetic field, and a solid inner core hotter than 5,000 degrees Celsius.",
        "The rigid outer shell, the crust plus the top of the mantle, is broken into plates moving at 2 to 10 centimetres a year. Where plates separate, as along the Mid-Atlantic Ridge, molten rock rises and hardens into new ocean floor. Where an ocean plate meets a continent, the denser ocean plate dives beneath it, and magma formed above it feeds volcanoes such as those in the Andes. Where two continents collide, neither sinks and the crust crumples upwards, which is how India's push into Asia raised the Himalayas. Where plates slide past each other, as at the San Andreas Fault, they stick, strain and then slip suddenly; that slip is an earthquake.",
        "A worked example shows the scale. The Atlantic widens by about 2.5 centimetres a year. Over one million years that is 2.5 million centimetres, or 25 kilometres. Over 100 million years it is 2,500 kilometres, the right order of size for an ocean. The matching coastlines and fossils of South America and West Africa are exactly what this slow separation predicts.",
      ],
      example: {
        question: "A plate moves 4 centimetres a year. How far does it move in 1,000 years?",
        options: ["400 metres", "4 metres", "40 metres"],
        answer: 2,
        why: "4 centimetres times 1,000 is 4,000 centimetres, and 100 centimetres make a metre, so that is 40 metres.",
      },
      keyPoints: [
        "Earth has a thin rocky crust, a thick hot mantle and an iron core.",
        "The crust is cracked into plates that drift a few centimetres a year.",
        "Earthquakes, volcanoes and mountains mostly happen where plates meet.",
      ],
      misconception: {
        belief: "Under the crust there's an ocean of liquid lava, and the continents float on it.",
        correction: "The mantle is almost entirely solid rock. It is so hot and squeezed so hard that it creeps very slowly, like ice in a glacier, but you could not pour it. Molten rock forms only in small pockets, mostly near plate edges, and that is what reaches the surface as lava.",
      },
      quiz: [
        {
          question: "Which layer of Earth do we live on?",
          options: ["The mantle", "The core", "The crust"],
          answer: 2,
          why: "The crust is the thin rocky outer layer; the mantle and core lie deep beneath it.",
        },
        {
          question: "Where are earthquakes most likely to happen?",
          options: ["Along the edges where plates meet", "Anywhere at all, completely at random", "Only in the middle of large continents"],
          answer: 0,
          why: "Plates stick and jerk where they grind against each other, so earthquakes cluster along their edges.",
        },
        {
          question: "The Himalayas formed when India pushed into Asia. What happened to the crust?",
          options: ["It melted away and left a flat plain", "It crumpled and was pushed upwards", "One plate slid down beneath the other"],
          answer: 1,
          why: "When two continents collide, neither sinks, so the crust crumples and rises into mountains.",
        },
      ],
      pairs: [
        { term: "Crust", match: "The thin rocky outer layer we live on" },
        { term: "Mantle", match: "Thick layer of hot rock that creeps very slowly" },
        { term: "Core", match: "The iron centre of Earth, partly liquid, partly solid" },
        { term: "Tectonic plate", match: "A huge slab of Earth's shell that drifts a few centimetres a year" },
        { term: "Earthquake", match: "The sudden jolt when stuck plates slip past each other" },
      ],
      order: {
        prompt: "Put these layers in order from Earth's surface down to its centre.",
        items: ["Crust", "Mantle", "Outer core", "Inner core"],
      },
      blitz: [
        { statement: "The mantle is a sea of liquid lava.", truth: false, why: "The mantle is nearly all solid rock that flows extremely slowly under heat and pressure." },
        { statement: "Tectonic plates move a few centimetres a year.", truth: true, why: "Most plates drift between 2 and 10 centimetres a year, about the speed fingernails grow." },
        { statement: "Earth's core is mostly iron.", truth: true, why: "The core is made mainly of iron with some nickel, liquid outside and solid inside." },
        { statement: "Volcanoes and earthquakes happen at random spots spread evenly over Earth.", truth: false, why: "They cluster along plate edges, such as the ring around the Pacific Ocean." },
      ],
      blanks: [
        { sentence: "The Atlantic Ocean gets about 2.5 ___ wider every year.", options: ["millimetres", "centimetres", "metres"], answer: 1 },
        { sentence: "Where two plates grind past each other and suddenly slip, we get an ___.", options: ["earthquake", "eruption", "avalanche"], answer: 0 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
