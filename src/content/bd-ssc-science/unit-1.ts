import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-science",
  unit: 1,
  title: "Healthy Life, Better Living",
  titleBn: "উন্নততর জীবনধারা",
  summary: "After this unit you can name the seven components of food and what each does, link common deficiency diseases to the vitamins and minerals behind them, and calculate and judge a BMI to plan a balanced diet.",
  concepts: [
    {
      id: "bd-ssc-science-1-1",
      title: "Food, nutrition and the components of food",
      hook: "Not everything we eat is food. Food is only what gives the body energy, helps it grow and protects it from disease.",
      steps: [
        { label: "Food", text: "Food is any edible item that gives energy, builds immunity and helps the body grow and repair worn-out tissue. Nutrition is the whole process of taking in food, digesting it and using it." },
        { label: "Seven parts", text: "Food has seven components. Carbohydrates, proteins and fats are the main components. Vitamins, minerals, water and fibre are the supplementary components that keep body processes running." },
        { label: "Fuel and bricks", text: "Carbohydrates and fats are energy-giving foods. Proteins are body-building foods, because bone, muscle, hair and nails are made of protein." },
        { label: "Count calories", text: "Food energy is measured in kilocalories, or kcal. One gram of carbohydrate or protein gives about 4 kcal, while one gram of fat gives about 9 kcal." },
      ],
      analogy: "A bus needs a strong body, diesel to move, and small things like engine oil and water to run smoothly. Proteins build the body, carbohydrates and fats are the fuel, and vitamins, minerals, water and fibre keep everything running.",
      story: [
        "Mitu was helping her mother cook dinner in their flat in Rajshahi. On the table were rice, masoor dal, rui fish, a bottle of mustard oil, a bunch of red amaranth and some guavas. 'Tell me what each one gives your body,' her mother said.",
        "Mitu sorted them. Rice gives carbohydrate for energy. Dal and fish give protein to build the body. Mustard oil gives fat. The red amaranth and guavas give vitamins, minerals and fibre, and the jug of water completes the seven.",
        "Then her mother poured a spoon of oil into the pan. 'Gram for gram, this oil gives more energy than rice,' she said. Mitu checked her science book. Fat gives about 9 kcal per gram, more than twice the 4 kcal of carbohydrate.",
      ],
      deepRead: [
        "According to nutrition science, food is the edible items that produce energy and immunity and help the body grow. Nutrition means getting food from the environment, digesting and absorbing it, and using it for energy, immunity and growth. The substances in food that do this, such as glucose, minerals and vitamins, are called nutrients. Food builds and repairs the body, produces heat and energy, and protects it from disease.",
        "Carbohydrates, made of carbon, hydrogen and oxygen, are our main food: rice, wheat and potato give starch, and milk gives lactose. Proteins also contain nitrogen and are broken into amino acids. Of the 20 amino acids in the body, 8 are essential, because the body cannot make them. Fish, egg and milk are richer in them than most plant foods. Fats are made of fatty acids and glycerol. Solid fats, like the fat of meat, are saturated, while liquid oils like mustard and soybean oil are unsaturated.",
        "One calorie is the heat needed to raise the temperature of 1 g of water by 1 °C, and 1000 calories make one kilocalorie, or food calorie. Worked example: a plate of khichuri has 60 g carbohydrate, 15 g protein and 10 g fat. Its energy is 60 × 4 + 15 × 4 + 10 × 9 = 240 + 60 + 90 = 390 kcal. An adult man needs about 2500 kcal a day and a woman about 2000 kcal.",
      ],
      example: {
        question: "A snack contains 10 g of carbohydrate and 10 g of fat. About how much energy does it give?",
        options: ["130 kcal", "80 kcal", "200 kcal"],
        answer: 0,
        why: "Carbohydrate gives about 4 kcal per gram and fat about 9 kcal per gram, so 40 + 90 = 130 kcal.",
      },
      keyPoints: [
        "Food gives the body energy, helps it grow and repair itself, and protects it from disease.",
        "Carbohydrates, proteins and fats are the main components of food, while vitamins, minerals, water and fibre are supplementary.",
        "Carbohydrate and protein give about 4 kcal per gram, while fat gives about 9 kcal per gram.",
      ],
      misconception: {
        belief: "Fat is bad for you, so a healthy person should cut it out of the diet completely.",
        correction: "Fat gives the most energy of any food, helps the body grow, acts as a store of food and keeps the skin smooth. It also helps the body absorb vitamins A, D, E and K. Lack of fat causes dry, rough skin and eczema, and a long lack makes the body break down stored protein and lose weight. Only too much fat is harmful.",
      },
      quiz: [
        {
          question: "Which of these is mainly a body-building food?",
          options: ["Rice", "Fish", "Mustard oil", "Sugar"],
          answer: 1,
          why: "Fish is rich in protein, and proteins are called body-building foods.",
        },
        {
          question: "Why is the nutrient value of animal protein higher than that of most plant proteins?",
          options: ["It contains more of the 8 essential amino acids", "It contains more carbohydrate", "It takes less time to cook"],
          answer: 0,
          why: "The body cannot make the 8 essential amino acids, and animal proteins contain more of them.",
        },
        {
          question: "Nusrat's lunch contains 20 g of fat. How much energy does the fat alone give?",
          options: ["80 kcal", "20 kcal", "180 kcal"],
          answer: 2,
          why: "Fat gives about 9 kcal per gram, so 20 × 9 = 180 kcal.",
        },
      ],
      pairs: [
        { term: "Starch", match: "Carbohydrate found in rice, wheat and potato" },
        { term: "Fructose", match: "Fruit sugar found in mango, banana and honey" },
        { term: "Essential amino acids", match: "The 8 amino acids the body cannot make itself" },
        { term: "Oil", match: "Lipid that stays liquid at normal temperature, like mustard oil" },
        { term: "Kilocalorie", match: "1000 calories, the unit used for food energy" },
      ],
      order: {
        prompt: "Put the steps of how food becomes energy in your body in order.",
        items: [
          "You eat food such as rice, which is a complex chemical compound",
          "Enzymes in the digestive system break it into simple food like glucose",
          "The simple food is absorbed and taken up by the body's cells",
          "In the cells, glucose reacts with oxygen to release energy and heat",
        ],
      },
      blitz: [
        { statement: "Gram for gram, fat gives more than twice as much energy as carbohydrate.", truth: true, why: "Fat gives about 9 kcal per gram, while carbohydrate gives about 4 kcal per gram." },
        { statement: "Proteins are made of only carbon, hydrogen and oxygen, just like carbohydrates.", truth: false, why: "Proteins also contain nitrogen, and sometimes sulphur." },
        { statement: "Fat in food helps the body absorb vitamins A, D, E and K.", truth: true, why: "These vitamins dissolve in fat, and lipid helps the body absorb them." },
        { statement: "Oils such as mustard oil are saturated fats that stay solid at room temperature.", truth: false, why: "Oils are unsaturated and liquid at normal temperature; solid fats are saturated." },
      ],
      blanks: [
        { sentence: "After digestion, proteins are broken down into ___.", options: ["amino acids", "fatty acids", "glucose"], answer: 0 },
        { sentence: "Carbohydrates and fats are called ___ foods.", options: ["body-building", "energy-giving", "protective"], answer: 1 },
      ],
      sayPrompt: "Tell a friend the seven components of food, and which ones give energy, which build the body and which keep it working.",
      glossary: [
        { term: "Nutrition", bn: "পুষ্টি" },
        { term: "Nutrient", bn: "পরিপোষক" },
        { term: "Carbohydrate", bn: "শর্করা" },
        { term: "Protein", bn: "আমিষ" },
        { term: "Fat or lipid", bn: "স্নেহ পদার্থ" },
        { term: "Starch", bn: "শ্বেতসার" },
        { term: "Essential amino acid", bn: "অপরিহার্য অ্যামাইনো এসিড" },
        { term: "Food calorie", bn: "খাদ্য ক্যালরি" },
      ],
    },
    {
      id: "bd-ssc-science-1-2",
      title: "Vitamins, minerals, water and fibre",
      hook: "A plate full of rice can still leave you ill. Tiny amounts of vitamins and minerals decide whether the body works properly.",
      steps: [
        { label: "Two kinds", text: "Vitamins are organic compounds needed for normal growth. Vitamins A, D, E and K dissolve in fat. Vitamin B complex and vitamin C dissolve in water." },
        { label: "Missing vitamins", text: "Lack of vitamin A causes night blindness and xerophthalmia. Lack of vitamin D causes rickets in children. Lack of vitamin B1 causes beriberi, and lack of vitamin C causes scurvy." },
        { label: "Key minerals", text: "Iron forms hemoglobin, so its lack causes anaemia. Calcium and phosphorus build bones and teeth, so their lack causes rickets and weak teeth." },
        { label: "Water and fibre", text: "Water makes up 60 to 75 percent of body weight and carries wastes out as urine and sweat. Fibre is not digested, but it prevents constipation." },
      ],
      analogy: "A mobile phone needs a charged battery, but also tiny parts like the SIM card and screws. Without them, a full battery is useless. Vitamins and minerals are those tiny parts: needed in small amounts, but the body cannot work without them.",
      story: [
        "Every evening at dusk, Rafi's little sister Ruma kept bumping into the door frame of their home in Sunamganj. In daylight she saw perfectly. Their grandmother shook her head. 'This is rat-kana, night blindness.'",
        "At the community clinic, the health worker asked what Ruma ate. Mostly rice and a little dal, Rafi said, and she refused leafy vegetables. 'Her body lacks vitamin A,' the health worker explained. She gave Ruma a vitamin A capsule and asked for more coloured vegetables and fruit.",
        "Their mother began adding red amaranth, kachu shak and carrot to meals, with ripe papaya and mango in season. Within a few weeks, Ruma moved around the house at dusk without stumbling. Rafi wrote in his science notebook: lack of vitamin A first shows as night blindness.",
      ],
      deepRead: [
        "Vitamins A, D, E and K are fat-soluble; vitamin B complex and vitamin C are water-soluble. Vitamin A comes from egg, milk, liver and coloured vegetables and fruits such as carrot, red amaranth, mango and ripe papaya. Its lack causes xerophthalmia, which starts as night blindness and can damage the cornea until the person goes blind. Vitamin D is made in the skin with the help of ultraviolet rays and helps absorb calcium; its lack causes rickets in children. Lack of thiamin (B1) causes beriberi, and lack of niacin causes pellagra. Vitamin C, found in amloki, guava and lemon, prevents scurvy, in which the gums bleed.",
        "Minerals mainly help form cells. Iron forms hemoglobin, and 100 mL of blood holds about 50 mg of iron. Its lack causes anaemia, with pale eyes, weakness and palpitation. Calcium, about 2% of body weight, builds bones and teeth with phosphorus; its lack causes rickets, and osteomalacia in older women. Water forms 60 to 75 percent of body weight, and losing 10 percent can cause fainting or even death, so diarrhoea is treated with oral saline. Fibre, mainly cellulose, is not digested, but it absorbs water and prevents constipation.",
        "Worked example: a child in Khulna has bleeding gums and slow-healing wounds. These are signs of vitamin C deficiency, so the remedy is fresh fruit such as guava, amloki or lemon.",
      ],
      example: {
        question: "Shuvo's gums bleed when he brushes, and small cuts take a long time to heal. Which vitamin is he most likely lacking?",
        options: ["Vitamin C", "Vitamin D", "Vitamin A"],
        answer: 0,
        why: "Severe lack of vitamin C causes scurvy, with bleeding gums and slow repair of damaged cells.",
      },
      keyPoints: [
        "Vitamins A, D, E and K are fat-soluble, while vitamin B complex and vitamin C are water-soluble.",
        "Lack of vitamin A causes night blindness, lack of vitamin D causes rickets, lack of vitamin C causes scurvy and lack of iron causes anaemia.",
        "Water makes up 60 to 75 percent of body weight, and fibre prevents constipation even though it is not digested.",
      ],
      misconception: {
        belief: "Fibre is useless, because the body cannot digest it and it gives no nutrients.",
        correction: "Fibre is indeed not digested and supplies no nutrients. But it absorbs water, increases the amount of stool and helps remove undigested food, so it prevents constipation. It also reduces frequent hunger and is thought to lower the risk of heart disease, diabetes and colon cancer. We should eat 20 to 30 g of fibre every day.",
      },
      quiz: [
        {
          question: "Which group contains only fat-soluble vitamins?",
          options: ["A, D, E and K", "B complex and C", "A, B, C and D"],
          answer: 0,
          why: "Vitamins A, D, E and K dissolve in fat, while vitamin B complex and vitamin C dissolve in water.",
        },
        {
          question: "Rokeya feels weak, her eyes look pale and her heart often beats fast. Which mineral is she most likely short of?",
          options: ["Calcium", "Iron", "Phosphorus"],
          answer: 1,
          why: "Iron forms hemoglobin, and its lack causes anaemia, with pale eyes, weakness and palpitation.",
        },
        {
          question: "A child with severe diarrhoea is losing a lot of water. What should the child be given quickly?",
          options: ["Fibre-rich food", "A vitamin A capsule", "Oral saline"],
          answer: 2,
          why: "Oral saline replaces the water and salt lost from the body and restores their balance.",
        },
      ],
      pairs: [
        { term: "Vitamin A", match: "Keeps eyesight normal and prevents night blindness" },
        { term: "Vitamin D", match: "Helps absorb calcium; its lack causes rickets" },
        { term: "Thiamin (B1)", match: "Its severe lack causes beriberi" },
        { term: "Vitamin C", match: "Its severe lack causes scurvy, with bleeding gums" },
        { term: "Iron", match: "Forms hemoglobin; its lack causes anaemia" },
      ],
      order: {
        prompt: "Put the effects of a long lack of vitamin A in order.",
        items: [
          "The diet lacks vitamin A foods like carrot, red amaranth and egg for months",
          "The person cannot see well in dim light, which is night blindness",
          "The cornea of the eye becomes ulcerated or eroded",
          "The person may become completely blind",
        ],
      },
      blitz: [
        { statement: "Vitamin D can be made in human skin with the help of sunlight.", truth: true, why: "Ultraviolet rays help turn cholesterol in the skin into vitamin D." },
        { statement: "Dry fruits, seeds and canned food are rich sources of vitamin C.", truth: false, why: "These usually contain no vitamin C; fresh fruit and vegetables do." },
        { statement: "Calcium is the mineral present in the largest amount in the human body.", truth: true, why: "About 2% of body weight is calcium, the most of any mineral." },
        { statement: "Vitamins are good for health, so taking much more than you need can do no harm.", truth: false, why: "Too much vitamin A is harmful, and too much vitamin D deposits calcium in the kidney, heart and blood vessels." },
      ],
      blanks: [
        { sentence: "Lack of vitamin D causes ___ in children.", options: ["rickets", "scurvy", "beriberi"], answer: 0 },
        { sentence: "Pellagra is caused by a lack of ___.", options: ["riboflavin", "niacin", "vitamin K"], answer: 1 },
      ],
      sayPrompt: "Explain to a friend why a child who eats only rice and dal may get night blindness, and which foods would prevent it.",
      glossary: [
        { term: "Vitamin", bn: "খাদ্যপ্রাণ" },
        { term: "Fat-soluble vitamin", bn: "স্নেহে দ্রবণীয় ভিটামিন" },
        { term: "Mineral", bn: "খনিজ লবণ" },
        { term: "Fibre or roughage", bn: "রাফেজ বা আঁশ" },
        { term: "Night blindness", bn: "রাতকানা" },
        { term: "Xerophthalmia", bn: "জেরোফথ্যালমিয়া" },
        { term: "Rickets", bn: "রিকেটস" },
        { term: "Anaemia", bn: "রক্তশূন্যতা" },
      ],
    },
    {
      id: "bd-ssc-science-1-3",
      title: "Body mass index and a balanced diet",
      hook: "Two friends of the same height can weigh very different amounts. BMI tells you whether your weight suits your height.",
      steps: [
        { label: "The formula", text: "BMI shows the balance between height and weight. BMI = body weight in kg ÷ (height in m)². For 80 kg and 1.8 m, BMI = 80 ÷ 3.24 = 24.7 approximately." },
        { label: "Read the result", text: "Below 18.5 is underweight. From 18.5 to 24.9 is correct weight. From 25 to 29.9 is overweight, and 30 or more is obese." },
        { label: "Balanced diet", text: "A balanced diet contains all seven components of food in the right amounts. It gives the calories and fibre needed for normal work. Plan it for age, sex and physical work." },
        { label: "Food pyramid", text: "Carbohydrates form the wide base of the pyramid, because we need them most. Vegetables and fruits come next, then protein. Fats sit at the narrow top, eaten least." },
      ],
      analogy: "A ferry on the Padma has a load line painted on its side. With too little cargo it rides high, and with too much it sinks below the line. BMI is the body's load line, and a balanced diet keeps the load right.",
      story: [
        "On health day at a school in Chattogram, the science teacher set up a weighing scale and a measuring tape. Every Class 9 student had to work out their own BMI, just like the group work in their textbook.",
        "Nusrat weighed 40 kg and was 1.5 m tall. She worked out 1.5 × 1.5 = 2.25, then 40 ÷ 2.25 = 17.8. 'Below 18.5,' the teacher said, 'so you are underweight.' Nusrat admitted she often skipped breakfast.",
        "Her classmate Tanvir was 1.6 m tall and weighed 70 kg. His BMI came to 70 ÷ 2.56 = 27.3, in the overweight range. He bought fried chicken and cola most days. The teacher drew the food pyramid on the board. 'Different numbers, same answer,' she said. 'A balanced diet.'",
      ],
      deepRead: [
        "The body grows until about 20 to 24 years of age, and then height stops increasing. After that, food mainly repairs the body, so weight should stay in balance with height. The index that shows this balance is the Body Mass Index: BMI = body weight (kg) ÷ height (m)². Below 18.5 is underweight, 18.5 to 24.9 is correct weight, 25 to 29.9 is overweight and 30 or more is obese. BMI indicates body fat, but it is not the only or most accurate measure of health.",
        "Worked example: Rahima weighs 47 kg and is 1.5 m tall. Her height squared is 1.5 × 1.5 = 2.25, so her BMI = 47 ÷ 2.25 = 20.9 approximately, which is correct weight.",
        "A balanced diet contains all seven food components in the right amounts and gives the calories and fibre needed for normal activity. An active adult man needs about 2500 kcal a day and a woman about 2000 kcal. In the textbook's chart, carbohydrate makes up about 60% of an adult's balanced diet, protein 15% and fat 25%. Growing children need extra protein, calcium and phosphorus, and pregnant women extra protein, calcium and iodine. Fast food is full of fat and sugar but lacks vitamins and minerals, so it is never a balanced diet.",
      ],
      example: {
        question: "Rasel weighs 45 kg and is 1.5 m tall. What is his BMI?",
        options: ["20", "30", "15"],
        answer: 0,
        why: "BMI = 45 ÷ (1.5 × 1.5) = 45 ÷ 2.25 = 20, which is in the correct weight range.",
      },
      keyPoints: [
        "BMI = body weight in kg ÷ (height in m)², and it shows whether weight is in balance with height.",
        "A BMI below 18.5 is underweight, 18.5 to 24.9 is correct, 25 to 29.9 is overweight and 30 or more is obese.",
        "A balanced diet has all seven food components in the right amounts, with carbohydrates at the base of the pyramid and fats at the top.",
      ],
      misconception: {
        belief: "Healthy eating needs costly food like meat, ice cream and imported fruit.",
        correction: "A balanced diet depends on having all seven components in the right amounts, not on price. Rice or ruti, dal, eggs, small fish, leafy shak like red amaranth and seasonal fruit like guava are cheap and cover every component. Costly fast food often lacks vitamins and minerals. With proper planning, we can eat healthy food at low cost.",
      },
      quiz: [
        {
          question: "In the pyramid of a balanced diet, which group is placed at the bottom?",
          options: ["Fat group", "Protein group", "Carbohydrate group", "Vitamin and mineral group"],
          answer: 2,
          why: "We need carbohydrates in the largest amount, so they form the wide base of the pyramid.",
        },
        {
          question: "Farhan is 1.6 m tall and weighs 80 kg. Which BMI category is he in?",
          options: ["Correct weight", "Overweight", "Obese"],
          answer: 2,
          why: "BMI = 80 ÷ 2.56 = 31.3 approximately, which is 30 or more, so he is obese.",
        },
        {
          question: "Why can fast food never be a balanced diet?",
          options: ["It is cooked too quickly", "It is high in fat and sugar but lacks vitamins and minerals", "It contains no carbohydrate at all"],
          answer: 1,
          why: "Fast food is tasty, but it does not contain all seven components in the right amounts.",
        },
      ],
      pairs: [
        { term: "BMI below 18.5", match: "Underweight" },
        { term: "BMI 18.5 to 24.9", match: "Correct weight" },
        { term: "BMI 25 to 29.9", match: "Overweight" },
        { term: "BMI 30 or more", match: "Obese" },
        { term: "Balanced diet", match: "All seven food components in the right amounts" },
      ],
      order: {
        prompt: "Put the steps for finding a person's BMI in order.",
        items: [
          "Weigh the person in kilograms",
          "Measure the person's height and write it in metres",
          "Square the height by multiplying it by itself",
          "Divide the weight by the squared height and check the category",
        ],
      },
      blitz: [
        { statement: "Fats are placed at the top of the balanced diet pyramid because we need them in the smallest amount.", truth: true, why: "Carbohydrates form the wide base and fats the narrow top." },
        { statement: "A BMI of 27 falls in the correct weight range.", truth: false, why: "25 to 29.9 is overweight; correct weight is 18.5 to 24.9." },
        { statement: "Pregnant women need extra protein, calcium and iodine in their diet.", truth: true, why: "These help produce blood and support the growth of the baby." },
        { statement: "A person 1.5 m tall weighing 54 kg has a BMI of 36, because 54 ÷ 1.5 = 36.", truth: false, why: "Height must be squared first: 54 ÷ 2.25 = 24, which is correct weight." },
      ],
      blanks: [
        { sentence: "In the BMI formula, the height in metres is ___ before dividing.", options: ["halved", "squared", "doubled"], answer: 1 },
        { sentence: "A balanced diet contains all ___ components of food in the right amounts.", options: ["seven", "three", "four"], answer: 0 },
      ],
      sayPrompt: "Show a friend how to work out their BMI, and explain how a balanced diet helps if it is too high or too low.",
      glossary: [
        { term: "Body Mass Index", bn: "বডি মাস ইনডেক্স বা দেহের ভরসূচি" },
        { term: "Balanced diet", bn: "সুষম খাদ্য" },
        { term: "Balanced diet pyramid", bn: "সুষম খাদ্য পিরামিড" },
        { term: "Underweight", bn: "কম ওজন" },
        { term: "Correct weight", bn: "সঠিক ওজন" },
        { term: "Overweight", bn: "বেশি ওজন" },
        { term: "Obese", bn: "স্থূল" },
        { term: "Kilocalorie", bn: "কিলোক্যালরি" },
      ],
    },
  ],
  cq: {
    stem: "Nabila, a Class 9 student in Mymensingh, weighs 40 kg and is 1.6 m tall. She often skips breakfast and buys chips and a cola from a shop near school. She rarely eats vegetables or fruit. Lately she feels weak, her eyes look pale and she cannot see well at dusk. Her brother Rakib is also 1.6 m tall but weighs 72 kg. He eats fried chicken and drinks soft drinks almost every evening.",
    knowledge: {
      q: "What is a balanced diet?",
      a: "A balanced diet is a diet that contains all seven components of food in the right amounts, so that it gives the calories and fibre the body needs for normal activities.",
    },
    comprehension: {
      q: "Why can Nabila not see well at dusk?",
      a: "Nabila rarely eats vegetables or fruit and lives on chips, which lack vitamins. So her body is short of vitamin A, which keeps eyesight normal and protects against night blindness. The first sign of vitamin A deficiency is night blindness, so she cannot see well in dim light at dusk. If the lack continues, it can lead to xerophthalmia and damage the cornea.",
    },
    application: {
      q: "Calculate the BMI of Nabila and Rakib, and state the BMI category of each.",
      a: "BMI = body weight (kg) ÷ height (m)². Both are 1.6 m tall, so height squared = 1.6 × 1.6 = 2.56. Nabila: BMI = 40 ÷ 2.56 = 15.6 approximately. This is below 18.5, so Nabila is underweight. Rakib: BMI = 72 ÷ 2.56 = 28.1 approximately. This lies between 25 and 29.9, so Rakib is overweight.",
    },
    higherOrder: {
      q: "Both Nabila and Rakib eat fast food, yet their BMIs point in opposite directions. Analyse why, and suggest how each can reach the correct weight range.",
      a: "Fast food is tasty but not balanced: it is rich in fat and sugar but lacks vitamins and minerals. Nabila eats too little in total. She skips breakfast and lives on small snacks, so she takes in fewer calories than she uses and is underweight. Her pale eyes and weakness suggest anaemia from lack of iron, and her night blindness shows lack of vitamin A. Rakib takes in extra fat and sugar every evening, and the excess is stored as fat, so he is overweight and at risk of obesity and diabetes. For a height of 1.6 m, correct weight is 18.5 × 2.56 = 47.4 kg to 24.9 × 2.56 = 63.7 kg. Nabila should eat a proper breakfast such as ruti, egg and banana, plus shak, small fish and fruit. Rakib should replace fried food and soft drinks with vegetables, fruit and fish, and exercise regularly.",
    },
  },
} satisfies UnitContent;

export default unit;
