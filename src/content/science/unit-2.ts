import type { UnitContent } from "@/content/types";

const unit = {
  subject: "science",
  unit: 2,
  title: "Matter and energy",
  summary: "After this unit you can explain the three states of matter with moving particles, tell a physical change from a chemical one, and follow energy as it changes form without ever being lost.",
  concepts: [
    {
      id: "science-2-1",
      title: "Solids, liquids and gases: particles on the move",
      hook: "Ice, water and steam are the very same stuff. The only difference is how much energy its tiny particles have, and how closely they are packed.",
      steps: [
        { label: "Particles", text: "Everything around you is made of tiny particles, far too small to see. A single drop of water holds more particles than there are people on Earth." },
        { label: "Three states", text: "In a solid the particles are packed tight and only vibrate in place. In a liquid they slide past each other. In a gas they fly about with lots of space between them." },
        { label: "Heat moves them", text: "Heating gives particles more energy, so they move faster and spread out a little. Cooling slows them down, and they pack closer together." },
        { label: "Changing state", text: "Heat ice and it melts into water. Heat water enough and it boils into a gas. Cool that gas and it condenses back into liquid. Cool water and it freezes. Same particles, different state." },
      ],
      analogy: "Think of a school hall. Children sitting in tidy rows and wriggling in their seats are a solid. Let them wander round the hall, bumping shoulders, and they are a liquid. Open the doors and they run off in every direction: that is a gas.",
      story: [
        "Amara woke early on the first morning of the camping trip. The inside of the tent was covered in tiny drops of water, though it hadn't rained. Outside, her dad was boiling a kettle on the little stove, and a white cloud puffed from its spout.",
        "'Where did the water on the tent come from?' she asked. Her dad nodded at her breath, hanging in the cold air. 'From us. All night we breathed out water as a gas. You can't see it until it meets something cold. Then it turns back into liquid drops.'",
        "Her dad held a cold spoon by the tip of its long handle just above the spout, in the clear gap before the white cloud began. In seconds it was wet. The invisible gas had touched the cold metal and become water again. Same water, Amara realised, just visiting different states. Later the sun warmed the tent, and the drops slowly vanished back into the air.",
      ],
      deepRead: [
        "The particle model says all matter is made of tiny particles in constant motion, and a substance's state depends on how much energy they have. In a solid the particles are held in fixed positions by strong attractions, so they can only vibrate. In a liquid the particles have enough energy to slip past one another but not to escape each other's pull, so a liquid keeps its volume yet flows into the shape of its container. In a gas the particles move fast and sit far apart with almost nothing holding them together, so a gas spreads to fill whatever space it has and can be squashed into a smaller one.",
        "Changing state is a matter of adding or removing energy. Take 100 grams of ice at minus 10 degrees Celsius and warm it. The particles vibrate faster until, at 0 degrees, they break out of their fixed positions and the ice melts. Keep heating and the water reaches 100 degrees at normal air pressure, where particles throughout the liquid gain enough energy to fly off as gas. Cool that steam on a cold surface and it condenses back into liquid, which is why a cold window streams on a winter morning.",
        "Two details trip people up. First, water vapour is invisible. The white cloud above a kettle is tiny liquid droplets that have already condensed, and right at the spout there is a clear gap of true gas. Second, a liquid does not need to boil to become a gas. Evaporation happens only at the surface, at any temperature, as the fastest particles escape.",
      ],
      example: {
        question: "You leave a glass of cold water on the table on a warm day. Soon the outside of the glass is covered in drops. Where did they come from?",
        options: ["Water seeped through tiny holes in the glass", "Water vapour from the air condensed on the cold glass", "The cold water inside climbed up and over the rim"],
        answer: 1,
        why: "The air holds invisible water vapour, and when it touches the cold glass it cools and condenses into liquid drops.",
      },
      keyPoints: [
        "Everything is made of tiny particles that are always moving.",
        "In a solid the particles only vibrate, in a liquid they slide, and in a gas they fly about freely.",
        "Heating makes particles move faster, which can melt a solid or boil a liquid, and cooling does the reverse.",
      ],
      misconception: {
        belief: "The bubbles in a pan of boiling water are air that was trapped in the water.",
        correction: "The big bubbles at a rolling boil are water itself, turned into gas. At the bottom of the pan the water gets hot enough to change state, and the gas rises in bubbles. A few tiny bubbles of dissolved air do appear as the water first warms, but they are soon gone. Keep boiling and the water level drops, because water is leaving the pan as gas.",
      },
      quiz: [
        {
          question: "Which state of matter keeps its volume but takes the shape of its container?",
          options: ["Solid", "Gas", "Liquid"],
          answer: 2,
          why: "A liquid's particles slide past each other, so it flows into any shape, but they stay close together, so its volume stays the same.",
        },
        {
          question: "What happens to the particles in a pan of water as it is heated?",
          options: ["They move faster and spread out a little", "They grow bigger as they soak up the heat", "They break apart into smaller particles"],
          answer: 0,
          why: "Heat gives particles more energy, so they move faster and take up a little more room, which is why things expand when warmed.",
        },
        {
          question: "Wet washing dries on a line even on a cool day. What is happening to the water?",
          options: ["It soaks into the ground beneath the line", "It evaporates slowly into the air as water vapour", "It boils away because the sun heats it"],
          answer: 1,
          why: "Evaporation happens at the surface of a liquid at any temperature, so the water leaves as gas without ever boiling.",
        },
      ],
      pairs: [
        { term: "Solid", match: "Keeps its own shape; the particles only vibrate in place" },
        { term: "Liquid", match: "Flows to fit its container but keeps the same volume" },
        { term: "Gas", match: "Spreads out to fill any space and can be squashed" },
        { term: "Melting", match: "A solid turning into a liquid as it warms" },
        { term: "Condensing", match: "A gas turning back into a liquid as it cools" },
      ],
      order: {
        prompt: "Put in order what happens as a block of ice is heated steadily.",
        items: [
          "The ice stays solid while its particles vibrate faster and faster",
          "At 0 degrees the particles break free of their fixed places and the ice melts",
          "The water warms as its particles slide past each other more quickly",
          "At 100 degrees the water boils and its particles fly apart as gas",
        ],
      },
      blitz: [
        { statement: "Air has mass: a litre of it weighs about as much as a paperclip.", truth: true, why: "Air is made of particles, and a litre of it weighs roughly a gram." },
        { statement: "When ice melts, the water weighs less than the ice did.", truth: false, why: "Melting changes the state, not the amount; the same particles are all still there." },
        { statement: "A gas can be squashed into a smaller space, but a solid cannot.", truth: true, why: "Gas particles have lots of empty space between them; solid particles are already packed tight." },
        { statement: "A puddle can only dry up if the water gets hot enough to boil.", truth: false, why: "Water evaporates from its surface at any temperature, which is how puddles dry." },
      ],
      blanks: [
        { sentence: "At sea level, water boils at ___ degrees Celsius.", options: ["0", "50", "100"], answer: 2 },
        { sentence: "In a solid, the particles are packed tightly and ___ in fixed positions.", options: ["vibrate", "fly about", "slide"], answer: 0 },
      ],
    },
    {
      id: "science-2-2",
      title: "Physical and chemical changes: same stuff or new stuff",
      hook: "Melted chocolate is still chocolate, but burnt toast is a new substance altogether. That difference tells you which changes can be undone.",
      steps: [
        { label: "Two kinds", text: "Some changes only alter how a substance looks, or what shape or state it is in. Others turn it into a completely new substance. Scientists call these physical changes and chemical changes." },
        { label: "Physical", text: "Melting, freezing, cutting, crushing and dissolving are physical changes. The stuff is still the same stuff. Melted chocolate is still chocolate, and it can be set hard again." },
        { label: "Chemical", text: "Burning, rusting and baking are chemical changes. The particles join up in new ways and make new substances. A baked cake can never be turned back into eggs and flour." },
        { label: "Mass stays", text: "Whatever the change, nothing vanishes. Weigh everything before and everything after, gases included, and the total mass is exactly the same." },
      ],
      analogy: "Building with toy bricks. Lining your models up in rows, then scattering them across the floor, is a physical change: each is still the same model. Pulling one apart and snapping its bricks into a new shape is a chemical change: a new thing from the same bricks, none lost.",
      story: [
        "On Bonfire Night, Kwame helped his aunt stack a pile of old fence panels and branches as tall as he was. By ten o'clock the fire had burned down to a heap of grey ash that he could have carried in a bucket.",
        "'Where did it all go?' he asked. His aunt said that nothing had gone anywhere. The wood had joined up with oxygen from the air and turned into new things: carbon dioxide, water vapour and smoke. They were drifting away over the rooftops. Add all of that to the ash, she said, and it would weigh exactly as much as the wood plus the oxygen it had used.",
        "Kwame thought about the marshmallow he had toasted earlier. That had changed too, going brown and gooey, and there was no way to turn it back. But the ice melting in his glass of water was different. Freeze it again and it would be ice, the same as before.",
      ],
      deepRead: [
        "A physical change alters a substance's form, size or state but not what it is. Melting, freezing, boiling, dissolving, tearing and bending are physical. The particles are the same before and after, just arranged differently, and the change can usually be undone. Dissolve 10 grams of salt in 100 grams of water and the salt seems to vanish, but the solution weighs 110 grams and tastes salty. Let the water evaporate and 10 grams of salt crystals are left behind.",
        "A chemical change, also called a chemical reaction, rearranges the particles themselves. Atoms that were joined one way let go and join in new combinations, producing substances with different properties. Iron is grey, hard and strong; rust, made when iron reacts with oxygen and water, is orange, flaky and weak. Signs of a chemical change include a colour change, a gas given off, heat or light, or a new solid. These are clues rather than proof: boiling water also gives off a gas. The surest test is whether a new substance with new properties has appeared. Reversibility is only a rough guide: smashing a glass is physical, yet cannot be undone. Still, you cannot unburn a match or unbake a cake.",
        "Through every change, mass is conserved. In the 1700s the chemist Antoine Lavoisier weighed sealed flasks before and after reactions and found no difference. Everyday exceptions are illusions. A burnt log seems lighter because carbon dioxide and water vapour escaped into the air; a rusted nail is heavier because oxygen from the air has joined it. Catch every gas and count every ingredient, and the books always balance.",
      ],
      example: {
        question: "You stir a spoonful of sugar into hot tea and it disappears. What kind of change is this?",
        options: ["A chemical change, because the sugar has vanished", "A chemical change, because the tea was hot", "A physical change, because the sugar is still sugar"],
        answer: 2,
        why: "The sugar has spread out among the water particles but it is still sugar, and you could get it back by letting the tea dry out.",
      },
      keyPoints: [
        "A physical change alters how a substance looks or feels, but it is still the same substance.",
        "A chemical change makes a new substance with new properties, and it is usually hard to reverse.",
        "In any change, the total mass of everything stays the same, as long as you count the gases.",
      ],
      misconception: {
        belief: "When a log burns, most of it is destroyed. That's why the ash weighs so much less than the log did.",
        correction: "Matter is never destroyed in a fire. Most of the wood turns into carbon dioxide and water vapour, which drift away into the air where you can't see them. Add those gases to the ash and the total is exactly the log plus the oxygen it used. Burning changes matter into new substances; it doesn't make it disappear.",
      },
      quiz: [
        {
          question: "Which of these is a chemical change?",
          options: ["Iron slowly turning to rust", "Ice melting in a drink", "Crushing a biscuit into crumbs"],
          answer: 0,
          why: "Rust is a new orange substance made from iron and oxygen; melting and crushing leave the substance unchanged.",
        },
        {
          question: "A candle is weighed, burned for ten minutes and weighed again. It is lighter. Why?",
          options: ["Some of the wax was destroyed by the flame", "Some wax became gases that drifted into the air", "The heat made the wax weigh less"],
          answer: 1,
          why: "Burning joins the wax with oxygen to make carbon dioxide and water vapour, which escape into the air.",
        },
        {
          question: "A sealed jar holds bicarbonate of soda and a small cup of vinegar. You tip the jar so they mix, and they fizz. How does the jar's mass compare with before?",
          options: ["Less, because the fizz made gas", "More, because a new substance formed", "Exactly the same as before"],
          answer: 2,
          why: "The new gas is still inside the sealed jar, so nothing has left or arrived and the mass is unchanged.",
        },
      ],
      pairs: [
        { term: "Physical change", match: "The same substance in a new form, such as melted or crushed" },
        { term: "Chemical change", match: "Particles rearrange to make a brand new substance" },
        { term: "Dissolving", match: "A solid spreads through a liquid and seems to vanish" },
        { term: "Rusting", match: "Iron slowly joining with oxygen and water to make an orange flaky solid" },
        { term: "Conservation of mass", match: "The total mass before a change equals the total after" },
      ],
      order: {
        prompt: "Put the steps of this kitchen experiment in order.",
        items: [
          "Stir 10 grams of salt into 100 grams of water until it disappears",
          "Weigh the salty water and find it comes to 110 grams",
          "Leave the dish somewhere warm so the water slowly evaporates",
          "Weigh the white crystals left behind and find 10 grams of salt",
        ],
      },
      blitz: [
        { statement: "Melting chocolate is a physical change.", truth: true, why: "The chocolate is still chocolate, just runny, and it will set again when cooled." },
        { statement: "When a log burns, most of its matter is destroyed.", truth: false, why: "The wood becomes carbon dioxide, water vapour and ash; none of it is destroyed." },
        { statement: "A rusty nail weighs a little more than it did before it rusted.", truth: true, why: "Oxygen from the air has joined the iron, so there is more stuff in the nail." },
        { statement: "Any change that makes bubbles must be a chemical change.", truth: false, why: "Boiling water makes bubbles too, and boiling is a physical change." },
      ],
      blanks: [
        { sentence: "Rust forms when iron reacts with ___ and water.", options: ["carbon", "oxygen", "nitrogen"], answer: 1 },
        { sentence: "Dissolving sugar in tea is a ___ change, because the sugar is still sugar.", options: ["physical", "chemical", "permanent"], answer: 0 },
      ],
    },
    {
      id: "science-2-3",
      title: "Energy changes form but is never lost",
      hook: "Energy is never made and never destroyed. It only moves from thing to thing and changes form, so every bit of it can be tracked.",
      steps: [
        { label: "What energy is", text: "Energy is what it takes to make something happen: to move, to heat up, to light up or to make a sound. Nothing happens without it." },
        { label: "Many forms", text: "Energy can be stored in food, fuel and batteries, in a stretched spring, or in a book lifted onto a high shelf. It shows up as movement, heat, light, sound and electricity." },
        { label: "It moves", text: "Energy passes from one thing to another and changes form on the way. A torch turns stored energy in its battery into electricity, then into light and heat." },
        { label: "Never lost", text: "The total amount of energy never changes. It is never made from nothing and never destroyed. It just spreads out, mostly ending up as gentle heat that is hard to gather again." },
      ],
      analogy: "Energy is like money that can never be printed or burned, only passed around and swapped into other currencies. Spend it on a bike ride and it hasn't disappeared. It has been handed over to the road and the air as warmth, in coins too small to pick back up.",
      story: [
        "Elif pushed her bike to the top of Mill Lane, the longest hill in town. Her legs ached. 'All that effort,' said her friend Sam, 'just to sit and roll back down.'",
        "'The effort isn't wasted,' said Elif. 'It's stored.' Her breakfast porridge had given her the energy to climb, and some of that was now held in her height above the bottom of the hill. She pushed off. The stored energy turned into speed, more and more of it, until the wind roared in her ears.",
        "At the bottom she squeezed the brakes and rolled to a stop. Sam asked where all that speed had gone. Elif touched her brake blocks. They were warm. The energy hadn't vanished. It had turned into heat in the brakes, in the tyres and in the air she had pushed through. Spread out and gone quiet, but still there, every joule of it.",
      ],
      deepRead: [
        "Energy is the capacity to make things happen, and it is measured in joules. One joule is roughly the energy needed to lift an apple through one metre. Physicists describe energy as held in stores: a kinetic store in anything moving, a gravitational store in anything raised up, an elastic store in anything stretched or squashed, a chemical store in food, fuel and batteries, and a thermal store in anything warm. Energy moves between stores by way of forces, electric currents, light, sound and heating.",
        "The law of conservation of energy states that the total never changes: energy cannot be created or destroyed, only transferred or transformed. Take a 200 gram ball lifted one metre onto a shelf. It has gained about 2 joules in its gravitational store. Knock it off and, just before it lands, those 2 joules are almost all kinetic. It hits the floor, bounces a few times and stops. The 2 joules have not vanished. They are now spread as a tiny bit of extra warmth in the ball, the floor and the air, plus the sound you heard, which itself ended up as heat.",
        "That spreading out is the catch. Energy is never used up, but it does become less useful as it disperses into low-grade heat that cannot easily be gathered back. Heat flows naturally only from hotter things to colder ones, never the other way on its own. An old filament bulb turns less than a tenth of the electrical energy it receives into light; the rest warms the room. Everything is accounted for, but only the light was what you wanted.",
      ],
      example: {
        question: "A girl on a swing reaches the highest point of her swing and, for a moment, hangs still. What kind of energy does she have most of right then?",
        options: ["Energy stored by her height", "Movement energy from swinging", "Sound energy from the creaking chains"],
        answer: 0,
        why: "At the very top she is still for an instant, so her energy is stored in her height, ready to become movement as she falls.",
      },
      keyPoints: [
        "Energy is what it takes to make anything happen, and it is measured in joules.",
        "Energy moves from one thing to another and changes form, such as from stored to movement to heat.",
        "The total amount of energy never changes, but it tends to spread out as heat that is hard to use again.",
      ],
      misconception: {
        belief: "When my phone battery is flat, the energy has been used up and is gone for good.",
        correction: "The energy hasn't gone anywhere; it has changed form. It left the phone as light from the screen, sound from the speaker and, most of all, warmth passing into your hand and the air. It is now spread so thinly through the room that you can't gather it back to do anything useful, but every joule of it still exists.",
      },
      quiz: [
        {
          question: "A torch is switched on. Which is the right order of energy changes?",
          options: ["Light in the bulb, then electrical, then chemical in the battery", "Chemical in the battery, then electrical, then light and heat", "Electrical in the wires, then chemical, then light in the bulb"],
          answer: 1,
          why: "The battery is a chemical store, the wires carry electricity, and the bulb gives out light and heat.",
        },
        {
          question: "A ball rolls across grass and slowly stops. What happened to its movement energy?",
          options: ["It was used up and no longer exists", "It went back into the person who rolled it", "It became heat in the ball, the grass and the air"],
          answer: 2,
          why: "Rubbing against the grass and the air warmed them very slightly; the energy spread out but did not disappear.",
        },
        {
          question: "An old-style filament bulb gets very hot while it is on. What does that tell you?",
          options: ["Most of the electrical energy becomes heat, not light", "The bulb is making extra energy out of nothing", "The bulb is storing up energy to use later on"],
          answer: 0,
          why: "A hot bulb shows that most of the energy it receives is leaving as heat, and only a small share as light.",
        },
      ],
      pairs: [
        { term: "Kinetic energy", match: "The energy of anything that is moving" },
        { term: "Chemical energy", match: "Energy stored in food, fuel and batteries" },
        { term: "Joule", match: "The unit that energy is measured in" },
        { term: "Energy transfer", match: "Energy passing from one object to another" },
        { term: "Conservation of energy", match: "The total amount of energy never changes" },
      ],
      order: {
        prompt: "Follow the energy from the Sun to a child running in the playground.",
        items: [
          "Sunlight falls on a wheat field and the plants store its energy in their grain",
          "The grain is milled and baked into a loaf of bread",
          "A child eats a slice of the bread at breakfast",
          "She runs across the playground, turning the stored energy into movement and heat",
        ],
      },
      blitz: [
        { statement: "Energy can be made from nothing if you have the right machine.", truth: false, why: "No machine can create energy; it can only change energy from one form to another." },
        { statement: "A book on a high shelf stores more energy than the same book on the floor.", truth: true, why: "Lifting the book gave it energy, stored by its height, which is released if it falls." },
        { statement: "When a torch is switched on, its battery's stored energy becomes light and heat.", truth: true, why: "The chemical store in the battery is transferred by electricity to the bulb as light and heat." },
        { statement: "Heat can flow on its own from a cold drink into a warmer room.", truth: false, why: "Heat only flows by itself from hotter to colder, so the room warms the drink." },
      ],
      blanks: [
        { sentence: "Energy is measured in units called ___.", options: ["watts", "degrees", "joules"], answer: 2 },
        { sentence: "Heat always flows on its own from a ___ object to a colder one.", options: ["bigger", "hotter", "heavier"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
