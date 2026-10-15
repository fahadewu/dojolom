import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-chemistry",
  unit: 1,
  title: "Concepts of Chemistry",
  titleBn: "রসায়নের ধারণা",
  summary: "After this unit you can say what chemistry studies and how it grew out of alchemy, read the hazard symbols on laboratory chemicals and work safely, and follow the six steps of a chemistry investigation.",
  concepts: [
    {
      id: "bd-ssc-chemistry-1-1",
      title: "What chemistry studies and where it began",
      hook: "Why is a green mango sour but a ripe one sweet? Chemistry answers questions like this by studying what matter is made of and how it changes.",
      steps: [
        { label: "Define it", text: "Chemistry is the branch of science that discusses the structure, properties and changes of matter. Living or non-living, all matter is its subject." },
        { label: "See it daily", text: "A green mango is sour because it holds organic acids. As it ripens, these acids change into glucose and fructose. Kerosene, natural gas and candle wax burn in oxygen, giving carbon dioxide, water vapour, light and heat." },
        { label: "Trace its roots", text: "Medieval Arab alchemists tried to turn cheap metals into gold. They failed, but they recorded their experiments. Alchemy comes from the Arabic al-kimiya, which came from Chemi, the root of the word chemistry." },
        { label: "Link the sciences", text: "Photosynthesis is a chemical reaction, so biology depends on chemistry. Batteries that supply electricity come from chemistry, while physical chemistry is built on the laws of physics. Chemical calculations use mathematics." },
      ],
      analogy: "Chemistry is like a recipe book for the whole world. It tells you what each dish is made of, how each ingredient behaves, and what happens when you heat, mix or cook them together. Structure, properties and changes, all in one book.",
      story: [
        "Tanvir was eating a green mango with salt and chilli on his grandmother's veranda in Rajshahi. It was so sour that his eyes watered. His sister Mitu bit into a ripe one from the same tree and smiled at its sweetness.",
        "'Same tree, same fruit, so why the difference?' Tanvir asked. Mitu, a Class 10 science student, opened her chemistry book. 'A green mango is full of organic acids,' she read. 'When it ripens, those acids change chemically into glucose and fructose.'",
        "That evening their father took an antacid tablet after a spicy dinner. Mitu pointed at the packet. 'Aluminium hydroxide and magnesium hydroxide,' she said. 'They neutralise the extra acid in his stomach. That is chemistry too.' Tanvir began to wonder what else in the house was chemistry.",
      ],
      deepRead: [
        "Chemistry is a branch of natural science. It discusses three things about matter: its structure, its properties and its changes. Take coal. Chemistry asks how the carbon atoms are arranged inside coal, and what happens when it burns. On burning, the carbon reacts with oxygen in the air to form carbon dioxide and give out heat. Air, drinking water, fertiliser, medicines, soap and paper made from the cellulose in bamboo and sugarcane waste all fall within the scope of chemistry.",
        "People used chemistry long before they named it. According to the evidence found so far, gold was the first metal people used. Around 3500 BC, people melted copper and tin, mixed them and cooled the mixture to make bronze, an alloy hard enough for good tools and weapons. Around 380 BC the Greek philosopher Democritus said that if matter is broken again and again, it ends in a tiny particle that cannot be divided. He named it the atom. Aristotle opposed the idea, believing all matter was made of earth, fire, water and air.",
        "In the Middle Ages, Muslim scholars in Arabia tried to turn copper, tin and lead into gold and to make a medicine for long life. They failed, but their written experiments were the first systematic chemistry. Jabir ibn Hayyan first did chemical research in a laboratory, so he is sometimes called the father of chemistry. Antoine Lavoisier is called the father of modern chemistry.",
      ],
      example: {
        question: "Which of these questions belongs most clearly to chemistry?",
        options: ["Why does an iron bicycle chain rust in the rain?", "How fast does a rickshaw roll down a slope?", "How many legs does a spider have?"],
        answer: 0,
        why: "Rusting is a change in the matter of iron, and the changes of matter are a subject of chemistry.",
      },
      keyPoints: [
        "Chemistry is the branch of science that discusses the structure, properties and changes of matter.",
        "The word chemistry comes from Chemi, through the Arabic al-kimiya and the alchemy of medieval Arab scholars.",
        "Jabir ibn Hayyan first did chemical research in a laboratory, and Antoine Lavoisier is called the father of modern chemistry.",
      ],
      misconception: {
        belief: "Jabir ibn Hayyan is the father of modern chemistry, because he was the first to do chemistry in a laboratory.",
        correction: "Jabir was the first to research chemistry in a laboratory, so he is sometimes called the father of chemistry. But he believed all matter was made of earth, water, fire and air, so the real secrets of chemistry stayed hidden from him. Lavoisier, Boyle, Dalton and others uncovered them, and Antoine Lavoisier is called the father of modern chemistry.",
      },
      quiz: [
        {
          question: "Who is called the father of modern chemistry?",
          options: ["Jabir ibn Hayyan", "Antoine Lavoisier", "Democritus", "Aristotle"],
          answer: 1,
          why: "Lavoisier and other scientists uncovered the real secrets of chemistry, so he is called the father of modern chemistry.",
        },
        {
          question: "Bronze, first made around 3500 BC, is an alloy of which two metals?",
          options: ["Copper and tin", "Iron and carbon", "Gold and silver", "Copper and zinc"],
          answer: 0,
          why: "People melted copper and tin, mixed them and cooled the mixture to make bronze.",
        },
        {
          question: "Why does an antacid tablet relieve acidity in the stomach?",
          options: ["It adds more hydrochloric acid to help digestion", "It kills the germs that make the acid", "Its aluminium and magnesium hydroxides neutralise the extra acid"],
          answer: 2,
          why: "Excess hydrochloric acid causes acidity, and the hydroxides in an antacid neutralise it.",
        },
      ],
      pairs: [
        { term: "Chemistry", match: "Discusses the structure, properties and changes of matter" },
        { term: "Alchemy", match: "The chemistry practised by medieval Arab scholars" },
        { term: "Bronze", match: "An alloy of copper and tin, made around 3500 BC" },
        { term: "Democritus", match: "Named the indivisible particle of matter the atom" },
        { term: "Antoine Lavoisier", match: "Called the father of modern chemistry" },
      ],
      order: {
        prompt: "Put these events in the history of chemistry in time order.",
        items: [
          "People make bronze by melting copper and tin together",
          "Democritus names the smallest particle of matter the atom",
          "Arab alchemists record experiments while trying to make gold",
          "Lavoisier and others uncover the real secrets of chemistry",
        ],
      },
      blitz: [
        { statement: "The word chemistry comes from Chemi, through the Arabic word al-kimiya.", truth: true, why: "Alchemy came from al-kimiya, and al-kimiya came from Chemi, the root of chemistry." },
        { statement: "Democritus proved by experiment that all matter is made of atoms.", truth: false, why: "His idea had no experimental basis, and Aristotle opposed it, so people did not accept it for a long time." },
        { statement: "Photosynthesis links biology and chemistry because it is a chemical reaction.", truth: true, why: "Plants react carbon dioxide with water in sunlight, using chlorophyll, to make glucose." },
        { statement: "Medieval alchemists succeeded in turning copper and lead into gold.", truth: false, why: "They failed, though they made gold-looking substances and wrote down their experiments." },
      ],
      blanks: [
        { sentence: "A green mango is sour because it contains organic ___.", options: ["acids", "salts", "bases"], answer: 0 },
        { sentence: "Jabir ibn Hayyan believed all matter was made of earth, water, fire and ___.", options: ["gold", "air", "carbon"], answer: 1 },
      ],
      terms: ["matter", "structure", "properties", "changes", "alchemy", "Lavoisier"],
      sayPrompt: "Tell a friend what chemistry studies, with one example from your kitchen and one name from its history.",
      glossary: [
        { term: "Chemistry", bn: "রসায়ন" },
        { term: "Matter", bn: "পদার্থ" },
        { term: "Natural science", bn: "প্রাকৃতিক বিজ্ঞান" },
        { term: "Alchemy", bn: "আলকেমি" },
        { term: "Alloy", bn: "সংকর ধাতু" },
        { term: "Atom", bn: "পরমাণু" },
        { term: "Photosynthesis", bn: "সালোকসংশ্লেষণ" },
      ],
    },
    {
      id: "bd-ssc-chemistry-1-2",
      title: "Working safely with hazard symbols",
      hook: "Almost every chemical in a laboratory can harm you or the environment. A small symbol on the bottle tells you how, before you open it.",
      steps: [
        { label: "Dress safely", text: "Wear a white apron with sleeves to the wrist and a length below the knee. Use hand gloves for your hands and safety goggles for your eyes. Most apparatus is glass, so move carefully." },
        { label: "Read the label", text: "Before using any chemical, find out its nature. Is it explosive, flammable, toxic or radioactive? The hazard symbol on the bottle answers this at a glance." },
        { label: "Know the symbols", text: "The symbols follow the Globally Harmonized System, set at a United Nations conference on environment and development. The same picture warns of the same danger everywhere." },
        { label: "Act on it", text: "Keep flammable liquids like alcohol and ether away from fire and heat. Handle explosives gently. Never throw lead or mercury waste just anywhere, but keep it in a fixed place and recover it if possible." },
      ],
      analogy: "Hazard symbols work like road signs on the Dhaka to Chattogram highway. A driver does not need to read a paragraph to know a sharp bend is coming. One picture names the danger and tells you to take care.",
      story: [
        "Nusrat's class in Sylhet had its first chemistry practical. On her bench sat two bottles. One label showed a flame. The other showed liquid dripping from test tubes onto a hand.",
        "Her partner Rafi picked up the first bottle and moved it next to the lit spirit lamp to save time. Nusrat pulled it back. 'That flame means flammable,' she said. 'It is alcohol. It has to stay away from fire and heat.'",
        "The second bottle held concentrated sulphuric acid, a corrosive. Everyone put on aprons, gloves and goggles before Mr Haque poured it. One drop fell on the wooden bench and slowly turned it black. Rafi looked at his bare wrist and pulled his apron sleeve down.",
      ],
      deepRead: [
        "A chemistry laboratory is the place where chemical experiments and research are done. Almost every chemical in it is harmful to us or to the environment to some degree. Some are explosive, some catch fire easily, some damage the body directly and some harm the environment. Most apparatus is made of glass. So precautions are needed from the moment you enter until you leave. A white apron with sleeves to the wrist and a length below the knee protects the body, hand gloves protect the hands and safety goggles protect the eyes.",
        "Bottles carry hazard symbols agreed under the Globally Harmonized System. Explosive substances such as TNT and nitroglycerine can blow up if struck or set alight. Flammable substances such as alcohol and ether must be kept away from fire and heat. Toxic substances such as benzene and methanol harm the body through the skin or the breath. Irritants such as cement dust, dilute acids and alkalis hurt the skin, eyes and breathing system. Health hazard substances such as benzene, toluene and xylene can cause long-term harm, even cancer. Radioactive substances such as uranium and radium give out harmful rays. Substances dangerous for the environment, such as lead and mercury, must be kept in a fixed place after use. Corrosive substances such as hydrochloric acid, sulphuric acid and concentrated sodium hydroxide solution cause wounds on contact.",
      ],
      example: {
        question: "A bottle of ether in the laboratory shows a flame symbol. Where should Mitu keep it?",
        options: ["Next to the spirit lamp so it stays warm", "Away from fire and heat", "On a sunny window sill"],
        answer: 1,
        why: "A flame symbol means flammable, and a flammable liquid like ether can catch fire quickly.",
      },
      keyPoints: [
        "In a chemistry laboratory, wear an apron, hand gloves and safety goggles to protect your body, hands and eyes.",
        "Hazard symbols show at a glance whether a chemical is explosive, flammable, toxic, corrosive, radioactive or dangerous for the environment.",
        "Waste such as lead and mercury must be kept in a fixed place and recovered, never thrown just anywhere.",
      ],
      misconception: {
        belief: "Dilute acids are weak, so it is fine to handle them with bare hands and no goggles.",
        correction: "Dilute acids carry the irritant symbol. They can still hurt the skin, the eyes and the breathing system, so the textbook says to wear an apron, hand gloves and safety goggles when using them. Diluting an acid lowers the danger, but it does not remove the need for care.",
      },
      quiz: [
        {
          question: "Which of these substances carries the corrosive symbol?",
          options: ["Concentrated sulphuric acid", "Ether", "Uranium", "Cement dust"],
          answer: 0,
          why: "Concentrated sulphuric acid causes wounds on contact, while ether is flammable, uranium radioactive and cement dust an irritant.",
        },
        {
          question: "A bottle shows a dead tree and a dead fish. What should you do with its waste after the experiment?",
          options: ["Pour it down the sink with plenty of water", "Keep it in a fixed place and try to recover it", "Burn it in the open air", "Bury it in the school field"],
          answer: 1,
          why: "The symbol means dangerous for the environment, like lead and mercury, so the waste must be stored and recovered, not spread.",
        },
        {
          question: "Why should a laboratory apron have sleeves that reach the wrist?",
          options: ["So the apron looks neat in class", "To keep spilled chemicals off the arms", "To keep the hands warm in winter"],
          answer: 1,
          why: "Long sleeves stop acids and other chemicals from touching the skin of the arms.",
        },
      ],
      pairs: [
        { term: "Explosive", match: "TNT and nitroglycerine, which may blow up if struck or heated" },
        { term: "Flammable", match: "Alcohol and ether, which catch fire quickly" },
        { term: "Radioactive", match: "Uranium and radium, which give out harmful rays" },
        { term: "Irritant", match: "Cement dust and dilute acids, which hurt skin and eyes" },
        { term: "Corrosive", match: "Concentrated acids and alkalis that cause wounds on contact" },
      ],
      order: {
        prompt: "Put these laboratory safety actions in the order you do them.",
        items: [
          "Put on an apron, hand gloves and safety goggles",
          "Read the hazard symbol on the chemical's label",
          "Carry out the experiment with the care that symbol demands",
          "Put harmful waste in its fixed place before leaving",
        ],
      },
      blitz: [
        { statement: "Alcohol and ether carry the flammable symbol and must be kept away from fire and heat.", truth: true, why: "Flammable substances catch fire quickly, so they are kept away from flames and heat." },
        { statement: "Hazard symbols change from country to country, so a label from abroad cannot be trusted.", truth: false, why: "They follow the Globally Harmonized System, so a symbol warns of the same danger everywhere." },
        { statement: "Benzene, toluene and xylene are health hazards that can cause cancer over time.", truth: true, why: "They can harm the body in the short or long term, so they are stored and handled carefully." },
        { statement: "Lead and mercury waste can be poured into a drain once the experiment is over.", truth: false, why: "They are dangerous for the environment, so the waste is kept in a fixed place and recovered." },
      ],
      blanks: [
        { sentence: "A skull and crossbones on a label marks a ___ substance such as methanol.", options: ["toxic", "flammable", "radioactive"], answer: 0 },
        { sentence: "Safety ___ protect the eyes from splashes in the laboratory.", options: ["gloves", "goggles", "aprons"], answer: 1 },
      ],
      terms: ["apron", "safety goggles", "hazard symbol", "flammable", "corrosive", "toxic"],
      sayPrompt: "Explain to a classmate what three hazard symbols mean and how you would handle a chemical carrying each one.",
      glossary: [
        { term: "Laboratory", bn: "পরীক্ষাগার" },
        { term: "Hazard symbol", bn: "সাংকেতিক চিহ্ন" },
        { term: "Explosive substance", bn: "বিস্ফোরক পদার্থ" },
        { term: "Flammable substance", bn: "দাহ্য পদার্থ" },
        { term: "Toxic substance", bn: "বিষাক্ত পদার্থ" },
        { term: "Irritant substance", bn: "উত্তেজক পদার্থ" },
        { term: "Corrosive", bn: "ক্ষত সৃষ্টিকারী" },
        { term: "Radioactive substance", bn: "তেজস্ক্রিয় পদার্থ" },
      ],
    },
    {
      id: "bd-ssc-chemistry-1-3",
      title: "The six steps of a chemistry investigation",
      hook: "Does dissolving a salt make water hotter or colder? Chemists answer such questions by following six fixed steps, from choosing the topic to discussing the result.",
      steps: [
        { label: "Choose and read", text: "First select the topic: does ammonium chloride give out or take in heat when it dissolves in water? Then read books or earlier research papers and form an expected result, a hypothesis." },
        { label: "Plan the method", text: "Decide the materials and the method. You need a beaker, water, ammonium chloride, a thermometer, a glass rod and a balance. Plan to add weighed portions and read the temperature each time." },
        { label: "Do the experiment", text: "Take 250 mL of water and note its temperature. Dissolve 5 g of ammonium chloride with the glass rod and read the thermometer again. Repeat twice more, writing every reading in your notebook." },
        { label: "Analyse, conclude", text: "Arrange the data in a table. In the textbook's sample data, the temperature falls from 25°C to 20°C, 15°C and 10°C. So ammonium chloride absorbs heat from the water as it dissolves." },
      ],
      analogy: "An investigation is like a cricket team preparing for a big match. They pick the question, study old match videos, plan the batting order, play the match, read the scorecard and then discuss what happened. Skip a step and the lesson is lost.",
      story: [
        "Rafi's Class 9 group in Khulna had one question to test: does ammonium chloride heat or cool water when it dissolves? Rafi had read that calcium oxide makes water hot. 'Ammonium chloride will do the same,' he said. That was their hypothesis.",
        "They planned the method together. Mitu poured water into a beaker and read the thermometer. Tanvir weighed out 5 g of ammonium chloride on the balance and stirred it in with a glass rod.",
        "The thermometer reading went down. Rafi frowned. They added two more weighed portions, and each time the reading fell further. Mitu wrote every number in their table and touched the beaker. It felt cold. 'Your guess was wrong,' she said, 'but the data are right. Ammonium chloride takes in heat.' Rafi wrote the result and their discussion in the report.",
      ],
      deepRead: [
        "Science is the orderly knowledge gained through experiment and a systematic method. Trying to learn something through experiments done by a proper method is called research, and anyone who does it is a scientist. A chemistry investigation follows six steps: selecting the topic; gaining an idea about it from books or earlier research papers; deciding the materials and method; doing the experiment; collecting and analysing the data; and stating and discussing the result.",
        "The textbook example asks whether heat is produced or absorbed when ammonium chloride dissolves in water. A research paper may show that calcium oxide gives out heat in water, and how that test was done. From it you choose a beaker, water, ammonium chloride, a thermometer, a glass rod and a balance. You might also expect heat to be given out. That expectation is your hypothesis.",
        "Suppose 250 mL of water starts at 25°C. After 5 g of ammonium chloride dissolves, the reading is 20°C. After 10 g in total it is 15°C, and after 15 g it is 10°C. Each 5 g lowers the temperature by 5°C. Since the solution gets colder, the dissolving salt must be absorbing heat from the water. The hypothesis was wrong, and that is still useful, because the data, not the guess, decide the result.",
      ],
      example: {
        question: "Sumaiya wants to know whether sugar dissolves faster in hot tea than in cold. She has selected her topic. What should she do next?",
        options: ["Write down her conclusion", "Read books or earlier research about it", "Start adding sugar at once", "Present her result to the class"],
        answer: 1,
        why: "After selecting the topic, the next step is to gain an idea about it from books or earlier research papers.",
      },
      keyPoints: [
        "Research means learning something through experiments carried out by a proper method.",
        "The six steps are: select the topic, read about it, decide materials and method, experiment, collect and analyse data, then state and discuss the result.",
        "When ammonium chloride dissolves in water the temperature falls, which shows that it absorbs heat.",
      ],
      misconception: {
        belief: "If the result goes against my hypothesis, the experiment has failed.",
        correction: "A hypothesis is only an expected result. In the textbook example you might expect ammonium chloride to give out heat, but the thermometer shows the water getting colder. The data decide. A wrong hypothesis that is tested honestly still gives a correct result: ammonium chloride absorbs heat as it dissolves.",
      },
      quiz: [
        {
          question: "In the chemistry investigation process, which step comes right after doing the experiment?",
          options: ["Selecting the topic", "Collecting and analysing the data", "Deciding the materials and method", "Reading earlier research papers"],
          answer: 1,
          why: "Doing the experiment is step four, and collecting and analysing the data is step five.",
        },
        {
          question: "Water at 25°C falls to 20°C after 5 g of ammonium chloride dissolves in it. What does this show?",
          options: ["Ammonium chloride gives out heat", "Ammonium chloride absorbs heat from the water", "No change has taken place"],
          answer: 1,
          why: "A falling temperature means the dissolving salt is taking heat from the water.",
        },
        {
          question: "How many steps does the textbook give for the investigation process in chemistry?",
          options: ["Four", "Five", "Six", "Eight"],
          answer: 2,
          why: "Topic, prior idea, materials and method, experiment, data analysis, and result with discussion make six steps.",
        },
      ],
      pairs: [
        { term: "Research", match: "Learning something through experiments done by a proper method" },
        { term: "Hypothesis", match: "An expected result formed before the experiment" },
        { term: "Data", match: "Readings recorded at each stage of the experiment" },
        { term: "Ammonium chloride", match: "Absorbs heat when it dissolves in water" },
        { term: "Calcium oxide", match: "Gives out heat when it is added to water" },
      ],
      order: {
        prompt: "Put the stages of a chemistry investigation in order.",
        items: [
          "Select the topic and read books or earlier research about it",
          "Decide the materials and the method",
          "Do the experiment and record the data",
          "Analyse the data, then state and discuss the result",
        ],
      },
      blitz: [
        { statement: "Reading earlier research papers can help you form a hypothesis before an experiment.", truth: true, why: "Earlier work suggests a likely result as well as the apparatus and method to use." },
        { statement: "Deciding the materials and method is the first step of a chemistry investigation.", truth: false, why: "Selecting the topic comes first; materials and method are decided in step three." },
        { statement: "In the textbook example, the solution gets colder as more ammonium chloride dissolves.", truth: true, why: "The temperature falls from 25°C to 10°C, so heat is being absorbed." },
        { statement: "If an experiment disproves the hypothesis, its data should be thrown away.", truth: false, why: "The data decide the result, so a disproved hypothesis still leads to a valid conclusion." },
      ],
      blanks: [
        { sentence: "Learning something through experiments done by a proper method is called ___.", options: ["research", "alchemy", "observation"], answer: 0 },
        { sentence: "Ammonium chloride ___ heat when it dissolves in water.", options: ["releases", "absorbs", "produces"], answer: 1 },
      ],
      terms: ["topic", "hypothesis", "experiment", "data", "analysis", "result"],
      sayPrompt: "Walk a friend through the six steps of a chemistry investigation, using the ammonium chloride experiment as your example.",
      glossary: [
        { term: "Science", bn: "বিজ্ঞান" },
        { term: "Research", bn: "গবেষণা" },
        { term: "Investigation", bn: "অনুসন্ধান" },
        { term: "Hypothesis", bn: "অনুমিত সিদ্ধান্ত" },
        { term: "Experiment", bn: "পরীক্ষণ" },
        { term: "Data", bn: "তথ্য" },
        { term: "Result", bn: "ফলাফল" },
      ],
    },
  ],
  cq: {
    stem: "Nusrat, a Class 9 student in Rajshahi, wanted to know whether a white salt P gives out or takes in heat when it dissolves in water. After reading her textbook, she guessed that heat would be given out. She took 50 mL of water at 25°C in a beaker and dissolved P in it 5 g at a time, stirring with a glass rod. The thermometer read 21°C after 5 g, 17°C after 10 g and 13°C after 15 g. The label on the bottle of P showed an X-shaped cross, and she wore an apron but no goggles or gloves.",
    knowledge: {
      q: "What is research?",
      a: "Learning something through experiments and observation carried out by a proper method is called research.",
    },
    comprehension: {
      q: "Why did Nusrat read her textbook before starting the experiment?",
      a: "Reading books or earlier research papers is the second step of a chemistry investigation. It gives an idea about the topic, so an expected result, the hypothesis, can be formed. It also shows which apparatus, chemicals and method suit the experiment. Nusrat's guess that heat would be given out was her hypothesis, and her choice of beaker, thermometer and glass rod came from this reading.",
    },
    application: {
      q: "Analyse Nusrat's data. Find the fall in temperature for each 5 g portion and for each gram of P, and state what the result shows.",
      a: "Data: 0 g, 25°C; 5 g, 21°C; 10 g, 17°C; 15 g, 13°C. Fall for each 5 g portion: 25 − 21 = 4°C, 21 − 17 = 4°C and 17 − 13 = 4°C. Total fall = 25 − 13 = 12°C for 15 g. Fall per gram = 12 ÷ 15 = 0.8°C. The temperature falls steadily as more P dissolves. So P takes in heat from the water when it dissolves, just as ammonium chloride does in the textbook experiment.",
    },
    higherOrder: {
      q: "Nusrat says that her guess was wrong, so the experiment failed, but at least she worked safely. Evaluate both parts of her statement.",
      a: "The first part is not right. Her hypothesis said heat would be given out, but the temperature fell by 12°C, so P absorbs heat. A hypothesis is only an expected result, and testing it honestly still gives a valid conclusion. She should state the result and discuss why her guess was wrong, which completes the sixth step. The second part is not right either. An X-shaped cross marks an irritant, like cement dust, dilute acids and alkalis, which harm the skin, eyes and breathing system. The textbook says to wear an apron, hand gloves and safety goggles with such substances. Nusrat wore only an apron, so her eyes and hands were unprotected. Her experiment succeeded as science but was not done safely.",
    },
  },
} satisfies UnitContent;

export default unit;
