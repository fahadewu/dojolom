import type { UnitContent } from "@/content/types";

const unit = {
  subject: "science",
  unit: 1,
  title: "How we know things",
  summary: "After this unit you can tell an observation from an inference, set up a fair test that changes one thing at a time, and explain why scientists repeat and check results before trusting them.",
  concepts: [
    {
      id: "science-1-1",
      title: "Look closely before you explain",
      hook: "Science starts with looking carefully. What you actually see is not the same as what you think it means.",
      steps: [
        { label: "Notice", text: "Use your senses, or a tool that sharpens them. Say exactly what is there. Not 'the puddle is smaller' but 'the puddle was 40 cm wide at nine and 15 cm wide at noon'." },
        { label: "Record", text: "Write it down straight away, with numbers, times and units. Memory smooths things over and fills in gaps. A notebook keeps what you actually saw." },
        { label: "Separate", text: "An observation is what you saw. An inference is your explanation of it. 'The bread has green spots' is an observation. 'Someone left the bag open' is an inference." },
        { label: "Question", text: "Turn the puzzle into a question you could answer by looking or testing. Not 'why do puddles vanish?' but 'does this puddle shrink faster in sun or in shade?'" },
      ],
      analogy: "A detective at a crime scene. The muddy footprint on the carpet is what they can see. 'Someone came in from the garden' is their explanation. Good detectives keep the two apart, because the footprint stays true even if the explanation turns out to be wrong.",
      story: [
        "Amara's bird feeder was empty every morning, though she filled it each evening. 'Squirrels,' she said. 'They come at night.' Her grandad handed her a notebook. 'Write down what you've actually seen,' he said.",
        "She wrote: feeder full at 8 pm. Empty at 7 am. Husks on the grass. No squirrel seen. Looking at the list, she stopped at the last line. She hadn't seen anything at all. She had only guessed.",
        "The next day she set her alarm for five. In the grey light before sunrise, a flock of starlings dropped onto the feeder, forty at least, and stripped it in ten minutes. By half past five they were gone. Amara added a line: starlings, 5:10 am, feeder empty by 5:20. Her explanation had been wrong, but her observations had stayed true, and they had led her to the answer.",
      ],
      deepRead: [
        "Science begins with observation: noticing something about the world using your senses, or using an instrument that extends them. A thermometer, a ruler and a stopwatch all let you observe things your body cannot judge precisely. Observations come in two kinds. Qualitative observations describe: the leaf is yellow, the liquid smells sharp. Quantitative observations measure: the leaf is 6 cm long, the water is at 21 degrees Celsius. Both are useful, but numbers with units are easier to compare and harder to argue about. Good observers also note the time, the place and the conditions, because those details often turn out to matter.",
        "An inference is different. It is the step where you explain what you observed. Suppose you place a jar over a lit candle. You observe that the flame shrinks and goes out after about 12 seconds. You might infer that the flame used up something in the air. That is a sensible idea, but it is not something you saw. It is a claim that could be tested, for example by using a larger jar and timing again.",
        "Keeping observations and inferences apart is one of the most useful habits in science. The observation stays true whatever happens next. The inference can be tested, revised or dropped without losing anything. Mixing the two up is how people end up defending an explanation long after the evidence has moved on. So when you write in a notebook, record what happened first, and mark your explanations clearly as ideas.",
      ],
      example: {
        question: "Which of these is an observation rather than an inference?",
        options: ["The grass is wet, so it rained in the night", "The grass is wet", "Someone must have left the sprinkler on"],
        answer: 1,
        why: "'The grass is wet' says only what you saw, while the other two try to explain why.",
      },
      keyPoints: [
        "An observation is what you see, hear or measure, not what it means.",
        "An inference explains what you saw, and it can still be wrong.",
        "Writing observations down at once, with numbers and units, keeps them accurate.",
      ],
      misconception: {
        belief: "I saw it with my own eyes, so it's a fact, and my explanation of it must be right too.",
        correction: "What you saw may well be a fact, but your explanation is a separate step and can be wrong. Wet grass is a real observation; 'it rained' is an idea about it, and a bone-dry pavement outside the gate would count against that idea. Keeping the two apart lets you test the explanation without throwing away the good observation.",
      },
      quiz: [
        {
          question: "You hear a scratching sound behind the wall at night. Which of these is an inference?",
          options: ["There is a scratching sound behind the wall", "The sound happens at night", "A mouse is living behind the wall"],
          answer: 2,
          why: "The mouse is an explanation of the sound, not something you heard or saw.",
        },
        {
          question: "Which record of an observation would be most useful to a scientist?",
          options: ["The plant grew a lot", "The plant grew 4 cm in one week", "The plant looked much happier than before"],
          answer: 1,
          why: "A number with a unit and a time can be checked and compared; the others are vague.",
        },
        {
          question: "Why do scientists write observations down straight away?",
          options: ["Memories fade and change, but notes don't", "Writing it down turns a guess into a fact", "A written observation can never turn out to be wrong"],
          answer: 0,
          why: "Notes freeze what you saw at the time, before memory smooths or shifts it.",
        },
      ],
      pairs: [
        { term: "Observation", match: "What you notice with your senses or a measuring tool" },
        { term: "Inference", match: "Your explanation of what you observed" },
        { term: "Measurement", match: "An observation written as a number with a unit" },
        { term: "Record", match: "Notes made at the time so nothing is forgotten" },
        { term: "Testable question", match: "A question you could answer by looking or by experimenting" },
      ],
      order: {
        prompt: "Put the steps of careful observing in order.",
        items: [
          "Notice something puzzling, like a feeder that empties overnight",
          "Write down exactly what you saw, with times and numbers",
          "Suggest an explanation and label it as an idea, not a fact",
          "Look again to check whether the explanation fits what you see",
        ],
      },
      blitz: [
        { statement: "'The cup feels warm' is an observation.", truth: true, why: "It reports what you sensed, not why it happened." },
        { statement: "'The cup is warm because someone just made tea' is an observation.", truth: false, why: "It explains the warmth, so it is an inference." },
        { statement: "A thermometer lets you observe something your skin cannot judge exactly.", truth: true, why: "Instruments extend your senses and give numbers you can compare." },
        { statement: "An observation stops being true if your explanation turns out to be wrong.", truth: false, why: "The observation stands on its own; only the explanation needs changing." },
      ],
      blanks: [
        { sentence: "An ___ is an explanation of what you saw, and it might be wrong.", options: ["observation", "inference", "measurement"], answer: 1 },
        { sentence: "Writing '3 cm' instead of 'a bit' turns a description into a ___.", options: ["measurement", "guess", "question"], answer: 0 },
      ],
    },
    {
      id: "science-1-2",
      title: "A fair test changes one thing",
      hook: "Want to know if warm water dissolves sugar faster? Change the temperature and nothing else, or you'll never know what made the difference.",
      steps: [
        { label: "Predict", text: "Say what you expect before you start. 'Sugar will dissolve faster in warm water than in cold.' Now the test can prove you wrong, which is the point." },
        { label: "Change one thing", text: "Pick one thing to change: here, the water temperature. Keep everything else the same. Same amount of water, same spoonful of sugar, same number of stirs." },
        { label: "Measure", text: "Decide what you will measure and how. Here, the seconds until no grains are left. Use the same stopwatch and the same person watching for both cups." },
        { label: "Compare", text: "Put the results side by side. If the only difference between the cups was temperature, then temperature must be the reason one was faster." },
      ],
      analogy: "Tasting two batches of pancakes to find out whether an extra egg helps. If you also swapped the flour and cooked one batch longer, you can't say which change did it. Keep everything the same except the egg.",
      story: [
        "Jonas wanted his science fair project to settle an argument at home: which kitchen roll soaked up the most water. He dipped a sheet of each brand into a bowl, squeezed it out into a jug and wrote down the amounts. The cheap brand won easily.",
        "His teacher, Ms Okafor, looked at his table. 'How big was each sheet?' she asked. Jonas checked. The cheap brand came in bigger sheets. He had also dipped the first one for longer, because he was still setting up the stopwatch.",
        "He started again. This time he cut every sheet into a 10 cm square, dipped each for exactly five seconds and squeezed with the same firm press. Now the expensive brand held 9 ml and the cheap one 6 ml. The result had flipped. Only when everything else matched could he trust that the brand was the reason.",
      ],
      deepRead: [
        "An experiment is a question put to the world in a form that gives a clear answer. To get one, scientists control their variables. A variable is anything that could change. The independent variable is the one thing you change on purpose. The dependent variable is the result you measure. Every other variable is a controlled variable, which you keep the same. When only one thing differs between two set-ups, any difference in the result must be caused by that one thing. That is what makes the test fair.",
        "Take the question: does fertiliser make bean plants grow taller? Set up two groups of ten plants in identical pots, with the same soil, the same window and the same 100 ml of water every morning. Give one group a measured dose of fertiliser each week and give the other none. The group with no fertiliser is the control group. After three weeks, measure every plant and work out the average height for each group. If the fertilised plants average 24 cm and the control plants average 18 cm, the fertiliser is the likely cause, because nothing else was different.",
        "Two details matter. First, make your prediction before you start, so you cannot quietly adjust it to fit the result. Second, use more than one plant in each group, because any single plant might be a weak seed or sit in a slightly warmer spot. Averages smooth out that kind of luck.",
      ],
      example: {
        question: "Ella wants to know if a heavier ball rolls further down a ramp. Which of these should she keep the same?",
        options: ["The weight of the ball", "The height of the ramp", "The distance each ball rolls"],
        answer: 1,
        why: "Weight is the thing she changes and distance is the result she measures, so the ramp must stay the same.",
      },
      keyPoints: [
        "In a fair test you change one thing and keep everything else the same.",
        "Any change in the result must come from the one thing you changed.",
        "Making a prediction first means the test can prove you wrong.",
      ],
      misconception: {
        belief: "If I change lots of things at once, I'll learn more from a single experiment.",
        correction: "You'll learn less. If a plant given more light, more water and new soil grows taller, you cannot say which of the three helped, or whether one of them actually held it back. Changing one thing at a time is slower, but it gives an answer you can trust.",
      },
      quiz: [
        {
          question: "Sam tests whether salt makes water boil faster. What is the one thing he should change?",
          options: ["The amount of salt", "The size of the pan", "The heat of the cooker"],
          answer: 0,
          why: "Salt is the thing he is asking about, so only the salt should differ between the pans.",
        },
        {
          question: "In a fair test on plant growth, what is the point of the plant that gets no fertiliser?",
          options: ["It is a spare plant in case one of the others dies", "It shows what happens with no change, to compare", "It proves that fertiliser is bad for plants"],
          answer: 1,
          why: "Without a plant that got nothing, you have no way to tell what the fertiliser added.",
        },
        {
          question: "Leila finds sugar dissolves faster in the cup she both stirred and heated. What went wrong?",
          options: ["She should have used a bigger cup for the sugar", "Nothing, because faster is the result she predicted", "She changed two things at once"],
          answer: 2,
          why: "Stirring and heating both changed, so she cannot tell which one made the sugar dissolve faster.",
        },
      ],
      pairs: [
        { term: "Fair test", match: "A test where only one thing is changed" },
        { term: "Variable", match: "Anything in an experiment that could be changed" },
        { term: "Prediction", match: "What you expect to happen, said before you start" },
        { term: "Control group", match: "The group with nothing changed, kept for comparison" },
        { term: "Result", match: "What you measure at the end of the test" },
      ],
      order: {
        prompt: "Put the steps of a fair test in order.",
        items: [
          "Ask a question and predict what will happen",
          "Choose one thing to change and keep everything else the same",
          "Run the test and measure the result",
          "Compare the results and decide whether the prediction was right",
        ],
      },
      blitz: [
        { statement: "In a fair test you change only one thing.", truth: true, why: "If only one thing differs, it must be the cause of any difference." },
        { statement: "Making a prediction before the test is a waste of time.", truth: false, why: "A prediction gives the test something definite to check, so it can prove you wrong." },
        { statement: "If you change two things and get a result, either one could be the cause.", truth: true, why: "With two changes you cannot tell which one mattered." },
        { statement: "A fair test should change everything so you can see all the effects at once.", truth: false, why: "Changing everything hides which change caused what." },
      ],
      blanks: [
        { sentence: "In a fair test you change ___ thing at a time.", options: ["one", "two", "every"], answer: 0 },
        { sentence: "The group with nothing changed is called the ___ group.", options: ["test", "control", "sample"], answer: 1 },
      ],
    },
    {
      id: "science-1-3",
      title: "Why one result is never enough",
      hook: "A single result can be luck, a mistake or the truth. Science trusts an idea only when it survives repeating and checking by others.",
      steps: [
        { label: "Repeat", text: "Run the test again, several times. If the result jumps about, something you didn't control is at work. If it stays close, you're onto something real." },
        { label: "Bigger samples", text: "One plant might just be a weak seed. Ten plants even out the luck. The more you test, the less chance can fool you." },
        { label: "Others check", text: "Scientists write down exactly what they did and share it. Other teams try the same test. If they get the same result, the idea grows stronger." },
        { label: "Stay open", text: "An idea that fits all the evidence today may need changing tomorrow. Science is trusted because it updates, not because it never changes." },
      ],
      analogy: "Flipping a coin once and getting heads doesn't prove the coin is fixed. Flip it a hundred times and get a hundred heads, then let three friends try and get the same. Now you can say something.",
      story: [
        "Rosa's elastic-band car shot across the playground and stopped at 4 metres. 'New club record,' she said, already writing it on the board. Dani, who kept the records, shook his head. 'One run doesn't count. Do five.'",
        "Rosa grumbled but lined the car up again. The second run went 2.8 metres. The third 3.1, then 3.3, then 2.9. She stared at the numbers. The first run had been the odd one out, not the true one. Thinking back, she remembered a gust of wind at her back.",
        "Dani wrote 3.2 metres on the board, the average of all five. 'Still a good car,' he said. Rosa wasn't sure whether to be annoyed or impressed. The next week she made everyone else run five times too, and quietly checked their sums.",
      ],
      deepRead: [
        "Every measurement carries a little chance. A thumb on a stopwatch is early or late, a breeze pushes a car, one seed is stronger than another. So scientists repeat. If five runs of an elastic-band car travel 4.0, 2.8, 3.1, 3.3 and 2.9 metres, the average is 16.1 divided by 5, about 3.2 metres. The single high run is not the true value; it is the one that chance affected most. Bigger samples work the same way: ten plants tell you more than one, because individual luck averages out.",
        "Repeating your own test is only the first check. Scientists then publish exactly what they did so other teams can try it. When another team repeats the test and gets the same result, that is called replication. It is the strongest evidence there is, because their mistakes and hopes differ from yours. When a result cannot be replicated, the idea is doubted, however appealing it seemed.",
        "This is also how science changes its mind. For most of the twentieth century doctors believed stomach ulcers came from stress and excess acid, and that no bacterium could live in stomach acid. In 1982 two Australian doctors, Barry Marshall and Robin Warren, grew a bacterium, Helicobacter pylori, from the stomachs of ulcer patients. Few believed them, so Marshall drank a culture of it and fell ill within about a week. Other labs repeated the work, antibiotics were shown to cure most ulcers, and in 2005 the pair won the Nobel Prize. A scientific theory is an explanation that has passed many such tests, and it stays open to the next one.",
      ],
      example: {
        question: "Nadia gives one plant fertiliser and one none. The fertilised plant grows taller. What should she do before saying fertiliser works?",
        options: ["Tell everyone the result straight away", "Repeat the test with more plants", "Try a different fertiliser instead"],
        answer: 1,
        why: "One pair of plants could differ by luck, so more plants and repeats are needed before trusting it.",
      },
      keyPoints: [
        "One result can be luck or a mistake, so scientists repeat their tests.",
        "Bigger samples and averages stop a single odd result from misleading you.",
        "Scientists share their methods so others can check, and ideas change when the evidence does.",
      ],
      misconception: {
        belief: "Scientists changed their minds about that, so they clearly didn't know what they were talking about.",
        correction: "Changing your mind when better evidence appears is the whole point. Doctors once blamed stomach ulcers on stress; when tests showed a bacterium caused most of them and antibiotics cured people, they updated. An idea that can never change with evidence isn't science.",
      },
      quiz: [
        {
          question: "Why do scientists take several measurements and work out an average?",
          options: ["So they can pick the reading that best fits their prediction", "So one odd reading doesn't mislead them", "Because a single reading is against the rules"],
          answer: 1,
          why: "Any one reading can be thrown off by chance, and the average evens that out.",
        },
        {
          question: "Another team repeats an experiment and gets the same result. What does this do?",
          options: ["It makes the finding more trustworthy", "It proves the idea is now certain and can never change", "It means the experiment was too easy to be useful"],
          answer: 0,
          why: "A result that different people get in different places is much less likely to be luck or error.",
        },
        {
          question: "A well-tested idea in science is called a theory. What happens if new evidence goes against it?",
          options: ["The new evidence is ignored, because the theory came first", "The theory is promoted to a law so it cannot be questioned", "Scientists check the evidence and update the theory"],
          answer: 2,
          why: "Evidence always wins in the end; a theory survives only as long as it fits the evidence.",
        },
      ],
      pairs: [
        { term: "Repeat", match: "Doing the same test again to see if the result holds" },
        { term: "Sample size", match: "How many things or people you tested" },
        { term: "Average", match: "One typical value worked out from several measurements" },
        { term: "Replication", match: "Another team getting the same result with the same method" },
        { term: "Theory", match: "An explanation that has passed many tests" },
      ],
      order: {
        prompt: "Put the steps in order, from a first result to a trusted idea.",
        items: [
          "Get an interesting result from one experiment",
          "Repeat the experiment several times yourself",
          "Publish the method so other scientists can try it",
          "Other teams get the same result and the idea is trusted",
        ],
      },
      blitz: [
        { statement: "A result that happens once must be true.", truth: false, why: "Once could be luck or a slip; repeating shows whether it holds." },
        { statement: "Testing ten plants tells you more than testing one.", truth: true, why: "A bigger sample evens out the luck of any single plant." },
        { statement: "Scientists share their methods so other people can check them.", truth: true, why: "Replication by others is how a result earns trust." },
        { statement: "In science, a theory is just a guess.", truth: false, why: "A scientific theory is an explanation that has passed many tests." },
      ],
      blanks: [
        { sentence: "Taking the ___ of five runs stops one odd run from misleading you.", options: ["average", "longest", "first"], answer: 0 },
        { sentence: "When other teams get the same result, the idea becomes more ___.", options: ["popular", "trustworthy", "complicated"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
