import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 1,
  title: "Sounds and greetings",
  summary:
    "This subject teaches Spanish throughout, and after this unit you can say every Spanish vowel properly, greet people at the right time of day, ask how they are and say goodbye.",
  concepts: [
    {
      id: "languages-1-1",
      title: "Five vowels, one sound each",
      hook: "English vowels are shape-shifters, but Spanish vowels never change. Learn five sounds and you can read almost any Spanish word aloud.",
      steps: [
        {
          label: "Five sounds",
          text: "Spanish has five vowels: a, e, i, o, u. Each one has exactly one sound. Say them as ah, eh, ee, oh, oo.",
        },
        {
          label: "Match them",
          text: "A is ah as in father. E is eh as in bed. I is ee as in see. O is oh as in go, but shorter. U is oo as in moon.",
        },
        {
          label: "Say every one",
          text: "Every vowel gets its full sound, even at the end of a word. Casa (house) is CA-sa, two clear chunks. Nothing fades to a lazy uh.",
        },
        {
          label: "Try it",
          text: "Read these aloud: sí (yes) is see, no is noh, luna (moon) is LOO-nah, mesa (table) is MEH-sah. If you can say the five sounds, you can say the word.",
        },
      ],
      analogy:
        "English vowels are like actors who play a different part in every film. Spanish vowels are like traffic lights: each one means exactly one thing, every single time.",
      story: [
        "Priya's new classmate arrived from Madrid on a rainy Tuesday. Her name was written on the board as Inés, and Priya said hello to 'Eye-ness'. Inés smiled and shook her head. 'In Spanish, i is always ee,' she said. 'Ee-NESS.'",
        "At lunch Inés wrote five letters on a napkin: a, e, i, o, u. Under each she wrote a sound: ah, eh, ee, oh, oo. 'That's it,' she said. 'They never change. Not ever.'",
        "Priya tested it on the Spanish poster by the door. Sí. No. Casa. Luna. She said each one slowly, giving every vowel its full sound, and Inés nodded at every word. By home time Priya could read the whole poster aloud, and she hadn't learned a single new rule since the napkin.",
      ],
      deepRead: [
        "Spanish is one of the easiest languages in the world to read aloud, and the vowels are the main reason. There are exactly five vowel sounds, and each letter maps to one of them: a is ah, e is eh, i is ee, o is oh, u is oo. English, by contrast, has roughly twenty vowel sounds shared across the same five letters, so the letter a makes four different sounds in cat, cake, car and about. In Spanish, a is always the same a.",
        "Two habits from English need switching off. First, English vowels in unstressed syllables tend to collapse into a lazy uh, so the o in 'lemon' barely counts. Spanish never does this; every vowel keeps its full shape wherever it sits. Second, English o and e often glide into a second sound, so 'go' ends in a hint of w and 'say' ends in a hint of y. Spanish vowels are pure: stop the sound before any glide begins.",
        "Try it on tomate, the word for tomato. Find the vowels: o, a, e. Split the word into one chunk per vowel: to-ma-te. Say each chunk with its single sound: toh, mah, teh. Spanish usually stresses the second-to-last chunk, so the finished word is toh-MAH-teh, with a clear teh at the end and no silent letters. The same method works for casa (KAH-sah), mesa (MEH-sah) and luna (LOO-nah). The small mark on sí (yes) does not change the sound of the i; it simply tells the word apart from si, which means if.",
      ],
      example: {
        question: "The Spanish word sí means yes. How do you say it?",
        options: ["Like sigh", "Like see", "Like sit, without the t"],
        answer: 1,
        why: "Spanish i always sounds like ee, so sí is see.",
      },
      keyPoints: [
        "Spanish has five vowels and each one has only one sound: ah, eh, ee, oh, oo.",
        "Every vowel in a Spanish word is said in full, even at the end, so nothing fades to uh.",
        "If I know the five vowel sounds, I can read most Spanish words aloud the first time I see them.",
      ],
      misconception: {
        belief: "The e at the end of tomate must be silent, like the e at the end of late.",
        correction:
          "Spanish has no silent vowels. Every vowel is said in full, so tomate has three chunks, to-ma-te, and the last one sounds like teh. The main silent letter in Spanish is h.",
      },
      quiz: [
        {
          question: "The English letter a has several sounds, as in cat, cake and car. How many sounds does the Spanish letter a have?",
          options: ["One", "Three", "It depends on the word"],
          answer: 0,
          why: "Spanish a is always ah, whatever word it sits in.",
        },
        {
          question: "Mesa means table. How does the e in mesa sound?",
          options: ["Like ee in see", "Like eh in bed", "Like uh in sofa"],
          answer: 1,
          why: "Spanish e is always eh, so mesa is MEH-sah.",
        },
        {
          question: "Luna means moon. Which is closest to how it sounds?",
          options: ["LUH-nah", "LYOO-nuh", "LOO-nah"],
          answer: 2,
          why: "Spanish u is oo as in moon, and the final a stays a full ah.",
        },
      ],
      pairs: [
        { term: "Spanish a", match: "Sounds like the a in father" },
        { term: "Spanish e", match: "Sounds like the e in bed" },
        { term: "Spanish i", match: "Sounds like the ee in see" },
        { term: "Spanish o", match: "Sounds like the o in go, cut short" },
        { term: "Spanish u", match: "Sounds like the oo in moon" },
      ],
      order: {
        prompt: "Put the steps for reading tomate aloud in order.",
        items: [
          "Spot the vowels: o, a, e",
          "Split into one chunk per vowel: to-ma-te",
          "Say each chunk with its one sound: toh, mah, teh",
          "Join the chunks smoothly: toh-MAH-teh",
        ],
      },
      blitz: [
        { statement: "Spanish a always sounds like the a in father.", truth: true, why: "One letter, one sound: ah." },
        { statement: "Spanish u sounds like the u in cup.", truth: false, why: "Spanish u is oo as in moon, so tú sounds like too." },
        { statement: "A vowel at the end of a Spanish word often fades to uh.", truth: false, why: "Every Spanish vowel keeps its full sound, even at the end." },
        { statement: "Spanish i sounds like the ee in see.", truth: true, why: "That is why sí sounds like see." },
      ],
      blanks: [
        { sentence: "The Spanish letter u sounds like the oo in ___.", options: ["moon", "cup", "cute"], answer: 0 },
        { sentence: "Casa has two vowels and both sound like ___.", options: ["ay", "ah", "uh"], answer: 1 },
      ],
    },
    {
      id: "languages-1-2",
      title: "Hola and the three time-of-day greetings",
      hook: "Hola greets anyone at any hour. Add three time-of-day greetings and you'll sound like you've lived there for years.",
      steps: [
        {
          label: "Any time",
          text: "Hola means hello and works at any time of day. The h is silent, so it sounds like OH-la. It is never wrong and always friendly.",
        },
        {
          label: "Morning",
          text: "Buenos días means good morning, though the words say 'good days'. Use it from waking up until about lunchtime. It sounds like BWEH-nos DEE-as.",
        },
        {
          label: "Afternoon",
          text: "Buenas tardes means good afternoon. Use it from lunch until it gets dark. It is buenas, not buenos, because tarde is a feminine word. It sounds like BWEH-nas TAR-des.",
        },
        {
          label: "Evening",
          text: "Buenas noches means good evening once it's dark. It also means goodnight when someone goes to bed. It sounds like BWEH-nas NOH-ches.",
        },
      ],
      analogy:
        "Hola is a plain white T-shirt that goes with everything. The time-of-day greetings are the jacket you choose to match the weather.",
      story: [
        "Marcus landed in Seville at nine at night, tired and nervous. His host family, the Romeros, were waiting by the door. He had practised one phrase on the plane, so he stepped forward and said 'Buenos días' as clearly as he could.",
        "There was a pause, then warm laughter. Señora Romero touched his arm. 'Buenas noches,' she said, pointing at the dark sky. 'Días is for the morning.' Marcus went red, then laughed too.",
        "The next morning he came down to breakfast and tried again. 'Buenos días,' he said, and Señor Romero gave him a thumbs up. By the afternoon Marcus had switched to 'Buenas tardes' without thinking. When the little Romero boy went to bed that night, Marcus said 'Buenas noches' and got a sleepy wave back. Three greetings, one day, and he already felt at home.",
      ],
      deepRead: [
        "The three time-of-day greetings are all wishes: buenos días is literally 'good days', buenas tardes 'good afternoons' and buenas noches 'good nights'. The boundaries follow daylight and meals rather than the clock. Buenos días lasts until lunch, which in Spain can be as late as two o'clock; in many parts of Latin America people switch around midday. Buenas tardes runs from lunch until dark, and buenas noches takes over once night has fallen. Buenas noches also doubles as goodnight when someone heads to bed, so you will hear it both on arriving and on leaving.",
        "The change from buenos to buenas is not random. Spanish nouns are either masculine or feminine, and any describing word has to match. Día is masculine even though it ends in a, so it takes buenos. Tarde and noche are feminine, so they take buenas. Practise the pairs as fixed units: buenos días, buenas tardes, buenas noches. In casual speech across Spain and Latin America you'll also hear a shortened 'Buenas' on its own, which covers any time after morning.",
        "A worked example: you walk into a bakery in Madrid at half past four. It is after lunch and still light, so you say 'Hola, buenas tardes', which sounds like OH-la, BWEH-nas TAR-des. Putting hola in front of a time greeting is normal and sounds warm. At half past nine that evening, arriving at a friend's flat, the same greeting becomes 'Hola, buenas noches'. Remember the h in hola is silent, because the letter h is silent in Spanish.",
      ],
      example: {
        question: "It's nine o'clock at night and you arrive at a friend's house. What do you say?",
        options: ["Buenos días", "Buenas tardes", "Buenas noches"],
        answer: 2,
        why: "Once it is dark, the greeting is buenas noches.",
      },
      keyPoints: [
        "Hola means hello, works at any time of day, and its h is silent.",
        "Buenos días is for the morning, buenas tardes for the afternoon and buenas noches once it is dark.",
        "Buenas noches is also what you say for goodnight, so it works when arriving and when leaving.",
      ],
      misconception: {
        belief: "Buenos and buenas are the same word, so 'buenas días' is fine.",
        correction:
          "They have to match the word after them. Día is a masculine word, so it takes buenos; tarde and noche are feminine, so they take buenas. To a Spanish speaker 'buenas días' jars the way 'a apples' does in English, so learn each pair as one fixed phrase.",
      },
      quiz: [
        {
          question: "Which greeting is correct at any time of day?",
          options: ["Hola", "Buenas noches", "Buenos días"],
          answer: 0,
          why: "Hola is simply hello and has no time attached.",
        },
        {
          question: "Why is it buenos días but buenas tardes?",
          options: ["Mornings are more formal than afternoons", "Días is plural but tardes is singular", "Día is masculine and tarde is feminine"],
          answer: 2,
          why: "Buenos and buenas copy the gender of the word that follows.",
        },
        {
          question: "How do you say the h in hola?",
          options: ["Like the h in English hello", "You don't, it is silent", "Like a soft k"],
          answer: 1,
          why: "The letter h is silent in Spanish, so hola sounds like OH-la.",
        },
      ],
      pairs: [
        { term: "Hola", match: "Hello, at any hour" },
        { term: "Buenos días", match: "Good morning, until about lunchtime" },
        { term: "Buenas tardes", match: "Good afternoon, from lunch until dark" },
        { term: "Buenas noches", match: "Good evening, and also goodnight" },
        { term: "Silent h", match: "Why hola sounds like OH-la" },
      ],
      order: {
        prompt: "Put these greetings in the order you would use them through one day.",
        items: [
          "Buenos días at breakfast",
          "Buenas tardes after lunch",
          "Buenas noches when it gets dark",
          "Buenas noches again at bedtime, meaning goodnight",
        ],
      },
      blitz: [
        { statement: "Buenas noches means both good evening and goodnight.", truth: true, why: "It greets people after dark and sends them off to bed." },
        { statement: "You should stop saying hola after lunchtime.", truth: false, why: "Hola works at any hour of the day or night." },
        { statement: "Buenos días is used from waking up until around lunchtime.", truth: true, why: "Lunch is the usual switch to buenas tardes." },
        { statement: "The h in hola sounds like the h in hat.", truth: false, why: "The Spanish h is silent, so hola is OH-la." },
      ],
      blanks: [
        { sentence: "In the morning you say buenos ___.", options: ["días", "tardes", "noches"], answer: 0 },
        { sentence: "The word ___ works as hello at any time of day.", options: ["Buenos días", "Hola", "Buenas tardes"], answer: 1 },
      ],
    },
    {
      id: "languages-1-3",
      title: "A whole greeting, from hola to hasta luego",
      hook: "Hello is only the opening move. Add how are you, a reply and a goodbye, and you can hold a real ten-second chat in Spanish.",
      steps: [
        {
          label: "Ask",
          text: "¿Cómo estás? means 'how are you?' when talking to a friend. It sounds like KOH-moh ess-TAHS. Written Spanish questions start with an upside-down question mark, ¿, so you see the question coming.",
        },
        {
          label: "Answer",
          text: "Bien, gracias means 'fine, thanks'. It sounds like BYEN, GRAH-syas. Muy bien means very well. Then pass it back with ¿Y tú?, meaning 'and you?', which sounds like ee TOO.",
        },
        {
          label: "Say goodbye",
          text: "Adiós means goodbye and sounds like ah-DYOHS. Hasta luego means 'see you later' and sounds like AHS-ta LWEH-go. The h in hasta is silent, just like the h in hola.",
        },
        {
          label: "Until tomorrow",
          text: "Hasta mañana means 'see you tomorrow'. The ñ sounds like the ny in canyon, so mañana is mah-NYAH-nah. Use it only when you really will see them tomorrow.",
        },
      ],
      analogy:
        "A greeting exchange is a handshake made of words. Hola offers the hand, ¿cómo estás? and bien, gracias are the shake, and hasta luego is letting go.",
      story: [
        "Aisha's neighbour, Señor Ortega, swept his front step every morning at eight. For a week she had only managed 'Hola' before hurrying off to school. On Monday she stopped, took a breath and asked, '¿Cómo estás?'",
        "His broom paused. 'Muy bien, gracias,' he said, clearly delighted. '¿Y tú?' Aisha had rehearsed this part. 'Bien, gracias,' she said, and then, because she was late, 'Hasta mañana.' He nodded and waved her off.",
        "By Friday the exchange felt as easy as tying her shoes. She asked, he answered, she answered back. Then she called 'Hasta mañana' over her shoulder and he laughed and shook his head. 'Mañana es sábado,' he said, then in English, 'Tomorrow is Saturday. Hasta luego.' Aisha grinned. Even the goodbye had rules, and she'd just learned one.",
      ],
      deepRead: [
        "¿Cómo estás? is the friendly, informal way to ask how someone is; it uses the tú form, which is right for friends, children and people your own age. With a stranger, a shopkeeper or someone older, Spanish speakers switch to ¿Cómo está? without the final s, which is the polite usted form. You'll also hear ¿Qué tal?, a relaxed 'how's it going?' that works in almost any situation. The usual replies are bien (fine), muy bien (very well) and regular (so-so). Add gracias, then hand the question back with ¿y tú?, or ¿y usted? in the polite form.",
        "For goodbyes, adiós is the plain, all-purpose word, while hasta luego, literally 'until later', is the everyday farewell in Spain and much of Latin America, used even with a shop assistant you will never see again. Hasta mañana ('until tomorrow') and hasta pronto ('see you soon') follow the same hasta pattern; nos vemos ('we'll see each other') is a casual extra. Two sound rules matter here. The letter h is always silent, so hasta is AHS-ta. And ñ is its own letter in the Spanish alphabet, pronounced like the ny in canyon.",
        "Here is the whole exchange with sound hints. You: 'Hola, ¿cómo estás?' (OH-la, KOH-moh ess-TAHS). Them: 'Muy bien, gracias. ¿Y tú?' (mwee BYEN, GRAH-syas. ee TOO). You: 'Bien, gracias. Hasta luego.' (BYEN, GRAH-syas. AHS-ta LWEH-go). In most of Spain, gracias sounds closer to GRAH-thyas, with a soft th, while Latin America says GRAH-syas; both are correct and everyone understands both.",
      ],
      example: {
        question: "A friend asks you '¿Cómo estás?' Which reply fits?",
        options: ["Hasta mañana", "Bien, gracias", "Buenas noches"],
        answer: 1,
        why: "Bien, gracias means fine, thanks, which answers the question.",
      },
      keyPoints: [
        "¿Cómo estás? asks a friend how they are, and bien, gracias answers fine, thanks.",
        "¿Y tú? hands the question back, and Spanish written questions open with an upside-down question mark.",
        "Adiós is goodbye, hasta luego is see you later and hasta mañana is see you tomorrow.",
      ],
      misconception: {
        belief: "Hasta luego means 'see you later', so I should only say it when I'll definitely see the person again.",
        correction:
          "Hasta luego is the everyday goodbye in Spain and much of Latin America. People say it to bus drivers and shop assistants they will never meet again. It's a friendly 'bye', not a promise. Hasta mañana is the one that carries a real meaning: you expect to meet tomorrow.",
      },
      quiz: [
        {
          question: "What does hasta mañana mean?",
          options: ["See you tomorrow", "Until the morning", "See you later"],
          answer: 0,
          why: "Mañana can also mean morning, but hasta mañana always means until tomorrow.",
        },
        {
          question: "How do you say the ñ in mañana?",
          options: ["Like a plain n", "Like the ny in canyon", "Like the ng in singing"],
          answer: 1,
          why: "So mañana is mah-NYAH-nah.",
        },
        {
          question: "It's Friday and you won't see your friend until Monday. Which goodbye fits best?",
          options: ["Hasta mañana", "¿Cómo estás?", "Hasta luego"],
          answer: 2,
          why: "Hasta luego is a loose 'see you later'; hasta mañana promises tomorrow, and ¿cómo estás? is a question, not a goodbye.",
        },
      ],
      pairs: [
        { term: "¿Cómo estás?", match: "How are you?" },
        { term: "Bien, gracias", match: "Fine, thanks" },
        { term: "¿Y tú?", match: "And you?" },
        { term: "Adiós", match: "Goodbye" },
        { term: "Hasta luego", match: "See you later" },
      ],
      order: {
        prompt: "Put this short chat in the order it would happen.",
        items: ["Hola", "¿Cómo estás?", "Bien, gracias. ¿Y tú?", "Hasta luego"],
      },
      blitz: [
        { statement: "¿Y tú? means 'and you?'", truth: true, why: "It hands the question back after you have answered." },
        { statement: "Adiós means 'how are you?'", truth: false, why: "Adiós is goodbye; ¿cómo estás? is how are you." },
        { statement: "Written Spanish questions begin with an upside-down question mark.", truth: true, why: "The ¿ at the start warns you a question is coming." },
        { statement: "The h in hasta is said like the h in English hat.", truth: false, why: "Spanish h is silent, so hasta sounds like AHS-ta." },
      ],
      blanks: [
        { sentence: "Bien, ___ means 'fine, thanks'.", options: ["adiós", "hola", "gracias"], answer: 2 },
        { sentence: "___ luego means 'see you later'.", options: ["Hasta", "Buenas", "Cómo"], answer: 0 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
