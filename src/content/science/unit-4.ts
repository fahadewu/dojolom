import type { UnitContent } from "@/content/types";

const unit = {
  subject: "science",
  unit: 4,
  title: "Forces and motion",
  summary: "After this unit you can name the forces acting on an everyday object, say whether they are balanced, and explain why it stays still, speeds up, slows down or keeps moving.",
  concepts: [
    {
      id: "science-4-1",
      title: "Forces are pushes and pulls",
      hook: "You can't see a force, only what it does. A ball starts rolling, a cart slows, a spring stretches.",
      steps: [
        { label: "Push or pull", text: "Every force is a push or a pull. Kicking a ball is a push. Lifting a bag is a pull. Nothing else counts as a force." },
        { label: "Size and direction", text: "A force has a size and a direction. We measure size in newtons, written N. A small apple weighs about 1 N. We draw a force as an arrow pointing the way it acts." },
        { label: "What forces do", text: "A force can start something moving, speed it up, slow it down or turn it. It can also change a shape, like squashing a sponge." },
        { label: "Balanced or not", text: "Two equal forces pulling opposite ways cancel out. They are balanced, so the motion does not change. If one side is stronger, the forces are unbalanced and the motion changes." },
      ],
      analogy: "A tug of war. When both teams pull equally hard the rope goes nowhere, even though everyone is straining. The moment one team pulls harder, the rope moves their way.",
      story: [
        "Ines and her brother Theo were moving the sofa so Dad could paint the wall. Ines pushed from one end. Theo, who hadn't been listening, pushed from the other. They both went red in the face. The sofa didn't move a centimetre.",
        "'It's stuck,' said Theo. Ines looked at where his hands were and started to laugh. 'We're pushing against each other. My push and your push are the same size, so they cancel out.'",
        "Theo came round to her end. Now two pushes pointed the same way, with nothing pushing back as hard. The sofa slid across the floorboards so fast they nearly ran into the paint tin. 'Same effort,' said Ines. 'The direction was the only thing we changed.'",
      ],
      deepRead: [
        "A force is a push or a pull that one object exerts on another. You never see the force itself, only its effect. A force can make an object start moving, stop, speed up, slow down or change direction, and it can change an object's shape. Force is measured in newtons, named after Isaac Newton. One newton is small: roughly the pull of gravity on a small apple. A firm handshake is a few tens of newtons. A car engine can push with thousands.",
        "Because a force has both a size and a direction, scientists draw forces as arrows. The arrow points the way the force acts and its length shows how strong it is. Once the arrows are drawn, adding forces up is simple. Forces in the same direction add together; forces in opposite directions subtract. Suppose two people push a broken-down car forwards with 300 N each while the road drags it backwards with 400 N. Forwards: 300 + 300 = 600 N. Backwards: 400 N. The overall force, called the resultant, is 600 - 400 = 200 N forwards, so the car begins to roll.",
        "If the resultant is zero, the forces are balanced and the motion does not change. A book resting on a table has its weight pulling down and the table pushing up by the same amount, so it stays put. Balanced does not have to mean still. A cyclist riding at a steady speed on a flat road is balanced too: her push forwards exactly matches the drag holding her back.",
      ],
      example: {
        question: "Two children pull a rope in opposite directions. One pulls with 50 N, the other with 30 N. What is the overall force?",
        options: ["80 N towards the stronger child", "20 N towards the stronger child", "20 N towards the weaker child", "0 N, they cancel out"],
        answer: 1,
        why: "Opposite forces subtract, so 50 - 30 = 20 N. The rope moves towards the stronger pull.",
      },
      keyPoints: [
        "A force is a push or a pull, measured in newtons.",
        "Every force has a size and a direction, shown by an arrow.",
        "Balanced forces leave motion unchanged, while unbalanced forces make it change.",
      ],
      misconception: {
        belief: "If something isn't moving, there can't be any forces acting on it.",
        correction: "A book on a table has two forces on it: its weight pulls it down and the table pushes it up. They are the same size in opposite directions, so they cancel out. Balanced forces, not zero forces, are why it stays still.",
      },
      quiz: [
        {
          question: "Which of these is a force?",
          options: ["The speed of a rolling ball", "A foot kicking the ball", "The distance the ball travels"],
          answer: 1,
          why: "A force is a push or a pull. Speed and distance describe the motion, not the force.",
        },
        {
          question: "A shopping trolley is pushed forwards with 40 N. The floor drags it back with 40 N. What happens to its motion?",
          options: ["It speeds up", "It stops at once", "Nothing changes"],
          answer: 2,
          why: "Equal forces in opposite directions are balanced. A still trolley stays still and a rolling one keeps rolling.",
        },
        {
          question: "What unit do we use to measure a force?",
          options: ["Newtons", "Kilograms", "Metres"],
          answer: 0,
          why: "Force is measured in newtons; kilograms measure mass and metres measure distance.",
        },
      ],
      pairs: [
        { term: "Force", match: "A push or a pull on an object" },
        { term: "Newton", match: "The unit used to measure force" },
        { term: "Balanced forces", match: "Equal and opposite forces that cancel out" },
        { term: "Unbalanced forces", match: "Forces that don't cancel, so motion changes" },
        { term: "Force arrow", match: "A drawing showing a force's size and direction" },
      ],
      order: {
        prompt: "Put the stages of a trolley journey in order.",
        items: [
          "The trolley stands still with no push on it",
          "You push harder than the floor drags, so it speeds up",
          "You push exactly as hard as the floor drags, so it rolls steadily",
          "You let go, only the drag remains, so it slows and stops",
        ],
      },
      blitz: [
        { statement: "A pull is a force but a push is not.", truth: false, why: "Both pushes and pulls are forces." },
        { statement: "Forces are measured in newtons.", truth: true, why: "The newton is the unit of force, named after Isaac Newton." },
        { statement: "Balanced forces always make an object stop moving.", truth: false, why: "Balanced forces leave motion unchanged, so a moving object keeps its speed." },
        { statement: "A force can change the shape of an object.", truth: true, why: "Squashing a sponge or stretching a spring is a force changing a shape." },
      ],
      blanks: [
        { sentence: "When two equal forces pull in opposite directions, they are ___.", options: ["balanced", "unbalanced", "doubled"], answer: 0 },
        { sentence: "The size of a force is measured in ___.", options: ["metres", "kilograms", "newtons"], answer: 2 },
      ],
    },
    {
      id: "science-4-2",
      title: "Gravity pulls down, friction holds back",
      hook: "Two forces shape every step you take. Gravity holds your feet to the ground, and friction lets them grip it.",
      steps: [
        { label: "Gravity", text: "Gravity pulls everything towards the centre of the Earth. That pull on an object is its weight. On Earth, each kilogram is pulled down with about 10 newtons." },
        { label: "Mass and weight", text: "Mass is how much stuff is in an object, in kilograms. Weight is the pull of gravity on it, in newtons. Your mass is the same everywhere, but your weight would be less on the Moon." },
        { label: "Friction", text: "Friction is a force between two touching surfaces. It pushes against sliding. Rough surfaces and heavy loads give more friction. Smooth, wet or oily surfaces give less." },
        { label: "Air resistance", text: "Air resistance is friction with the air. It grows as you go faster and as you make yourself wider. That is why cyclists crouch and parachutes are huge." },
      ],
      analogy: "Walking on an icy pavement. Gravity still pulls you down as usual, but the ice gives your shoes almost nothing to grip. Without friction, every step wants to turn into a slide.",
      story: [
        "Kenji's first go on the sledge ended after two metres. The snow at the top of the hill was soft and fluffy, and the sledge sank into it and stuck. His cousin Hana laughed from the bottom. 'Try the path,' she called.",
        "The path was where a hundred boots had packed the snow hard and shiny. Kenji sat down, pushed off, and the sledge shot away under him. Gravity pulled him down the slope just as before. The difference was the surface. Smooth, hard snow gave almost no friction, so very little held him back.",
        "At the bottom the path ran onto bare grass. The sledge slowed in a heartbeat and Kenji tumbled off into a drift. Same gravity, same sledge, same boy. Only the friction had changed, and it changed everything.",
      ],
      deepRead: [
        "Gravity is a pull between any two objects with mass. The Earth's pull on everything near it is what we call weight. Near the surface each kilogram is pulled down with about 10 newtons, so a 50 kg person weighs about 500 N. Mass and weight are different. Mass is the amount of matter in an object, measured in kilograms, and it is the same everywhere. Weight is the pull of gravity on that mass, measured in newtons, and it depends on where you are. On the Moon the pull is only about 1.6 N per kilogram, so the same person would weigh about 80 N while still having a mass of 50 kg.",
        "Friction is a contact force. It appears wherever two touching surfaces try to slide past each other, and it always acts against the sliding. Even smooth-looking surfaces are bumpy under a microscope, and the bumps catch on each other. Pressing the surfaces together harder, or using rougher materials, increases friction; oil or water fills the bumps and reduces it. Friction turns movement into heat, which is why rubbing your hands warms them and why brakes get hot.",
        "Without friction we could not walk, grip a pen or stop a car. Air resistance is friction with the air. It rises sharply with speed and with the area pushing through the air. A skydiver speeds up until air resistance grows to match her weight, then falls at a steady speed of roughly 200 kilometres per hour. Opening the parachute multiplies the area, so the air pushes back far harder and she slows to a safe landing speed.",
      ],
      example: {
        question: "A bag of potatoes has a mass of 2 kg. Roughly what is its weight on Earth?",
        options: ["20 N", "2 N", "200 N"],
        answer: 0,
        why: "Each kilogram is pulled down with about 10 N, so 2 kg weighs about 20 N.",
      },
      keyPoints: [
        "Gravity pulls everything towards the centre of the Earth.",
        "Weight is the pull of gravity on a mass, about 10 newtons per kilogram on Earth.",
        "Friction acts between touching surfaces and always pushes against sliding.",
      ],
      misconception: {
        belief: "Friction is just a nuisance that slows things down, so we'd be better off without it.",
        correction: "Without friction your shoes couldn't grip the ground, so you couldn't walk. Car brakes and tyres work by friction, and so does holding a pen. Friction costs energy as heat, but it is also what gives us grip and control.",
      },
      quiz: [
        {
          question: "An astronaut has a mass of 70 kg on Earth. What is her mass on the Moon?",
          options: ["About 12 kg", "About 700 kg", "70 kg"],
          answer: 2,
          why: "Mass is the amount of matter in her body, so it doesn't change. Only her weight would.",
        },
        {
          question: "Which surface would give a sliding box the most friction?",
          options: ["Rough concrete", "Polished ice", "Wet tiles"],
          answer: 0,
          why: "Rough, dry surfaces have more bumps to catch on, so they resist sliding the most.",
        },
        {
          question: "Why does a parachute slow a skydiver down?",
          options: ["It makes her weight smaller", "It greatly increases air resistance", "It switches off gravity for a while"],
          answer: 1,
          why: "Her weight doesn't change. The huge canopy pushes through much more air, so air resistance grows.",
        },
      ],
      pairs: [
        { term: "Gravity", match: "The attraction between any two objects with mass" },
        { term: "Weight", match: "The force of gravity on an object, in newtons" },
        { term: "Mass", match: "How much matter an object has, in kilograms" },
        { term: "Friction", match: "A force between touching surfaces that resists sliding" },
        { term: "Air resistance", match: "Friction between a moving object and the air" },
      ],
      order: {
        prompt: "Put the stages of a skydiver's fall in order.",
        items: [
          "She jumps out and gravity makes her speed up quickly",
          "As she falls faster, air resistance grows and she speeds up less",
          "Air resistance matches her weight, so she falls at a steady speed",
          "She opens the parachute, air resistance jumps, and she slows down",
        ],
      },
      blitz: [
        { statement: "Your mass would be smaller on the Moon than on Earth.", truth: false, why: "Mass is the amount of matter in you and stays the same; only weight changes." },
        { statement: "On Earth, each kilogram is pulled down with about 10 newtons.", truth: true, why: "Earth's gravity gives about 9.8 N per kilogram, which we round to 10." },
        { statement: "Friction between two sliding surfaces makes them warmer.", truth: true, why: "Friction turns movement into heat, which is why rubbing your hands warms them." },
        { statement: "Oil on a surface increases the friction on it.", truth: false, why: "Oil fills the tiny bumps between surfaces, so friction goes down." },
      ],
      blanks: [
        { sentence: "The pull of gravity on an object is called its ___.", options: ["mass", "weight", "friction"], answer: 1 },
        { sentence: "Friction always acts ___ the direction of sliding.", options: ["against", "along", "across"], answer: 0 },
      ],
    },
    {
      id: "science-4-3",
      title: "Why moving things keep moving",
      hook: "A rolling ball doesn't stop because its push runs out. It stops because friction drags on it, and without friction it would roll for ever.",
      steps: [
        { label: "Nothing changes", text: "Newton's first law: an object keeps doing what it's doing unless an unbalanced force acts. A still object stays still. A moving object keeps the same speed in a straight line." },
        { label: "Hidden brakes", text: "On Earth, things seem to slow down by themselves. They don't. Friction and air resistance are unbalanced forces quietly pushing back. On smooth ice a puck glides a very long way." },
        { label: "Inertia", text: "Inertia is how much an object resists a change in its motion. More mass means more inertia. A loaded trolley is harder to start and harder to stop than an empty one." },
        { label: "Force changes speed", text: "An unbalanced force changes speed or direction. A bigger force changes it faster. The same force changes a heavy object's speed less than a light one's." },
      ],
      analogy: "The tablecloth trick. Whip the cloth away fast enough and the plates stay where they were. They resist any change to what they are doing, which in this case is sitting still.",
      story: [
        "Yusuf put his shopping bag on the seat beside him and let go of the pole. The bus was moving smoothly and he was tired. Then the driver braked for a cyclist. An orange escaped from the bag and rolled straight down the aisle to the front.",
        "Yusuf fetched it, thinking. Nobody had pushed the orange forwards. The bus had slowed, but the orange hadn't. It had simply kept going at the speed it already had, and the floor was too smooth to stop it.",
        "He sat back down and watched for the next junction. This time he kept a hand on the pole and a foot against the bag. When the bus braked again his body wanted to keep going, exactly like the orange. The pole pushed back on his hand and stopped it. The orange stayed put.",
      ],
      deepRead: [
        "In 1687 Isaac Newton set out three laws of motion. The first says that an object stays at rest, or keeps moving at a steady speed in a straight line, unless an unbalanced force acts on it. That sounds wrong, because on Earth everything we push eventually stops. But friction and air resistance are always there, acting against the motion; they are the unbalanced force. Reduce them and the truth shows: a curling stone slides the length of the rink from one gentle push, and an air-hockey puck glides until it meets the side.",
        "The tendency of an object to resist any change in its motion is called inertia, and mass is the measure of it. Newton's second law puts numbers on this: force equals mass times acceleration, where acceleration is how quickly the speed changes. A steady unbalanced force of 10 N on a 2 kg trolley adds 5 metres per second to its speed every second. The same 10 N on a 4 kg trolley adds only 2.5 metres per second each second. Double the mass and you halve the effect; double the force and you double it.",
        "This is also why, without air, a hammer and a feather fall side by side. Gravity pulls the hammer far harder, but the hammer has exactly as much more inertia, so both speed up at the same rate. In 1971 an astronaut on the Moon dropped the two together, and they landed at the same moment.",
      ],
      example: {
        question: "A hockey puck slides across smooth ice. Why does it eventually stop?",
        options: ["Its push is used up", "Moving things naturally stop", "Friction from the ice"],
        answer: 2,
        why: "A push isn't stored inside the puck. The small friction force from the ice acts against its motion until it stops.",
      },
      keyPoints: [
        "Things keep their speed and direction unless an unbalanced force acts.",
        "Friction and air resistance are the hidden forces that slow things on Earth.",
        "More mass means more inertia, so motion is harder to change.",
      ],
      misconception: {
        belief: "When I stop pushing a box, it stops moving. So things need a force to keep them going.",
        correction: "The box stops because friction from the floor pushes against it, not because the push ran out. On ice, where friction is tiny, the same box would slide a long way. A force is needed to change motion, not to keep it going.",
      },
      quiz: [
        {
          question: "A skateboard rolls along a smooth, flat path with nobody pushing it. What slows it down?",
          options: ["Friction and air resistance", "Gravity pulling it down", "Its own inertia"],
          answer: 0,
          why: "Gravity pulls down and the ground pushes up, so they balance. Friction and air resistance act against the motion.",
        },
        {
          question: "Two trolleys are pushed with the same force. One is empty and one is full of bricks. Which speeds up faster?",
          options: ["The full one", "The empty one", "They speed up equally"],
          answer: 1,
          why: "The full trolley has more mass, so more inertia. The same force changes its speed less.",
        },
        {
          question: "You're standing on a bus when it brakes hard. Which way does your body tend to move?",
          options: ["Backwards, towards the rear", "It stays exactly still", "Forwards, towards the front"],
          answer: 2,
          why: "The bus slows but your body keeps its old speed. So you lurch towards the front.",
        },
      ],
      pairs: [
        { term: "Inertia", match: "An object's resistance to any change in its motion" },
        { term: "Newton's first law", match: "Motion stays the same unless an unbalanced force acts" },
        { term: "Acceleration", match: "How quickly speed or direction changes" },
        { term: "Steady speed", match: "Moving the same distance every second" },
        { term: "Resultant force", match: "The single overall force left after adding them all up" },
      ],
      order: {
        prompt: "Put the events in order when a car brakes hard.",
        items: [
          "The car and the passenger move forwards at the same speed",
          "The driver brakes and friction from the road slows the car",
          "The passenger's body keeps moving forwards at its old speed",
          "The seatbelt pushes back on the passenger and slows her too",
        ],
      },
      blitz: [
        { statement: "If no force at all acts on a moving object, it slows down and stops.", truth: false, why: "With no force acting, it keeps the same speed in a straight line for ever." },
        { statement: "Objects with more mass are harder to get moving.", truth: true, why: "More mass means more inertia, so the same force changes their speed less." },
        { statement: "Without air, a hammer and a feather dropped together land at the same time.", truth: true, why: "Gravity pulls the hammer harder but it has more inertia to match, so both speed up equally." },
        { statement: "A puck on ice stops because its push is used up.", truth: false, why: "Pushes aren't stored; the small friction from the ice slows the puck down." },
      ],
      blanks: [
        { sentence: "An object's resistance to a change in its motion is called ___.", options: ["inertia", "friction", "gravity"], answer: 0 },
        { sentence: "The same push changes the speed of a heavy trolley ___ than a light one.", options: ["more", "less", "faster"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
