import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 3,
  title: "Building sentences",
  summary:
    "After this unit you can build short Spanish sentences that say who does what, make them negative with no, and add describing words that match their nouns.",
  concepts: [
    {
      id: "languages-3-1",
      title: "Who does what: the sentence skeleton",
      hook: "A Spanish sentence is built the same way as an English one: who comes first, then what they do. If you know a name and a verb, you can already speak.",
      steps: [
        {
          label: "Who",
          text: "Start with the person or thing doing the action. Ana. Pedro. El perro (the dog). This is the subject, the who of the sentence.",
        },
        {
          label: "Does what",
          text: "Next comes the verb, the doing word. Come (sounds like ko-meh) means eats. Bebe means drinks. Habla means speaks. Ana come. Pedro bebe.",
        },
        {
          label: "The rest",
          text: "Add what the action is about. Ana come pan: Ana eats bread. Pedro bebe agua: Pedro drinks water. Who, does what, to what.",
        },
        {
          label: "Say no",
          text: "To make it negative, put no right before the verb. Ana no come pan: Ana does not eat bread. One small word does the whole job.",
        },
      ],
      analogy:
        "A sentence is like a little train. The engine at the front is the person, the first carriage is the action, and the rest follows behind.",
      story: [
        "Tom had learned a hundred Spanish words on the train to Seville, but he had never put two of them together. At a café near the cathedral he wanted to tell the waiter that his wife did not drink coffee. He froze.",
        "Then he remembered the skeleton. Who first. Mi esposa, my wife. Then the doing word. Bebe, drinks. Then the rest. Café. He tried it: 'Mi esposa bebe café.' The waiter nodded and reached for a cup. Wrong. Tom quickly added the one small word he had forgotten. 'Mi esposa no bebe café. Té, por favor.'",
        "The waiter smiled and swapped the cup for a teapot. Tom sat back, a little amazed. Three words in the right order had done the job. And one more, in the right place, had fixed it.",
      ],
      deepRead: [
        "Spanish and English share the same basic sentence order: subject, verb, object. The subject is who or what does the action, the verb is the action, and the object is what the action lands on. 'Ana come pan' maps word for word onto 'Ana eats bread'. This is a real advantage for English speakers. Many languages, such as Japanese or Turkish, put the verb at the very end, so you have to hold the whole sentence in your head before you know what is happening. In Spanish you do not.",
        "Two small differences matter. First, the verb carries the negative. To say that something does not happen, place 'no' directly in front of the verb and nothing else changes: 'Pedro no bebe agua' is 'Pedro does not drink water'. English needs the helper 'does' and moves 'not' about; Spanish just drops in 'no'. Second, articles come along for the ride. 'El perro come pan' is 'The dog eats bread', with 'el' before a masculine noun and 'la' before a feminine one, as you saw in the last unit.",
        "Worked example. You want to say 'The girl does not speak English'. Start with the subject: la niña. Add 'no' because it is negative. Then the verb: habla (the h is silent, so it sounds like ah-bla). Then the object: inglés. Put it together: 'La niña no habla inglés.' Four slots, filled in order, and the sentence stands up.",
      ],
      example: {
        question: "Which sentence means 'Ana does not eat bread'?",
        options: ["Ana come no pan", "No Ana come pan", "Ana no come pan"],
        answer: 2,
        why: "No sits directly in front of the verb come, and nothing else moves.",
      },
      keyPoints: [
        "A plain Spanish sentence goes who, then the action, then the rest, just like English.",
        "Come means eats, bebe means drinks and habla means speaks, so Ana come pan is Ana eats bread.",
        "To make a sentence negative, put no directly in front of the verb.",
      ],
      misconception: {
        belief: "No only means the answer no, so to say 'not' I need a different word.",
        correction:
          "In Spanish, no does both jobs. As an answer it means no, and in front of a verb it means not. Ana no come pan is Ana does not eat bread, with no helper word like does.",
      },
      quiz: [
        {
          question: "In 'Pedro bebe agua', which word is the action?",
          options: ["Pedro", "bebe", "agua"],
          answer: 1,
          why: "Bebe means drinks; it is the verb, the doing word in the middle.",
        },
        {
          question: "What does 'El niño no bebe leche' mean?",
          options: ["The boy drinks milk", "The boy does not drink water", "The boy does not drink milk"],
          answer: 2,
          why: "No in front of bebe turns drinks into does not drink, and leche is milk, not water.",
        },
        {
          question: "In a plain Spanish sentence, what comes first?",
          options: ["The one doing the action", "The action word", "The thing the action is done to"],
          answer: 0,
          why: "The subject leads, then the verb, then the rest, as in Ana come pan.",
        },
      ],
      pairs: [
        { term: "come", match: "eats" },
        { term: "bebe", match: "drinks" },
        { term: "habla", match: "speaks" },
        { term: "pan", match: "bread" },
        { term: "agua", match: "water" },
      ],
      order: {
        prompt: "Build the sentence 'Ana does not eat bread' one word at a time.",
        items: ["Ana", "no", "come", "pan"],
      },
      blitz: [
        { statement: "In a plain Spanish sentence the person comes first, then the action.", truth: true, why: "Spanish uses the same who, action, rest order as English." },
        { statement: "Bebe means eats.", truth: false, why: "Bebe means drinks; come means eats." },
        { statement: "To say 'not', put no right before the verb.", truth: true, why: "Ana no come pan is Ana does not eat bread." },
        { statement: "Spanish needs an extra word like 'does' to make a sentence negative.", truth: false, why: "No alone does the job; there is no helper word." },
      ],
      blanks: [
        { sentence: "Pedro ___ agua means Pedro drinks water.", options: ["come", "habla", "bebe"], answer: 2 },
        { sentence: "To say Ana doesn't eat bread: Ana ___ come pan.", options: ["sí", "no", "es"], answer: 1 },
      ],
    },
    {
      id: "languages-3-2",
      title: "The verb ending tells you who",
      hook: "In Spanish you can often skip the word for I or you, because the end of the verb already says it. Hablo means I speak, all in one word.",
      steps: [
        {
          label: "Yo, -o",
          text: "For I, the verb ends in -o. Hablo, I speak. Como, I eat. Vivo, I live. The word yo (I) is optional.",
        },
        {
          label: "Tú, -s",
          text: "For you (a friend), the verb ends in -s. Hablas, you speak. Comes, you eat. Vives, you live.",
        },
        {
          label: "Él, ella",
          text: "For he or she, the ending has no s. Habla, he or she speaks. Come, eats. Vive, lives. This is the form you used with names.",
        },
        {
          label: "Drop the pronoun",
          text: "Because the ending does the work, Spanish speakers usually leave out yo and tú. Hablo español already means I speak Spanish.",
        },
      ],
      analogy:
        "Think of the ending as a name badge pinned to the verb. Habl- is the job, and -o or -as is the badge that says who is wearing it.",
      story: [
        "Amira had a Spanish pen pal called Sofía, and their first video call was in ten minutes. Amira wanted to say three things: I live in Leeds, I speak a little Spanish, and you speak fast. She wrote them out with yo and tú in front of every verb, and it looked clumsy.",
        "Then she looked at the endings. Vivo, hablo, both ending in -o. That was already 'I'. Hablas, ending in -s. That was already 'you'. She crossed out the pronouns. 'Vivo en Leeds. Hablo un poco de español. Hablas rápido.' Three short lines, and every one of them still said who.",
        "On the call, Sofía laughed at the last one and slowed down. 'Hablas muy bien,' she said. You speak very well. Amira heard the -s and knew, without thinking, that Sofía meant her.",
      ],
      deepRead: [
        "Regular Spanish verbs are made of a stem and an ending. Take hablar, to speak. Remove the -ar and you have the stem habl-. The ending you attach tells the listener who is speaking: hablo (I), hablas (you, informal), habla (he, she, or the formal you, usted). Verbs ending in -er and -ir follow the same idea with slightly different vowels: comer gives como, comes, come; vivir gives vivo, vives, vive. Notice the pattern that holds across all three groups. The I form ends in -o, the you form ends in -s, and the he or she form has no s at all.",
        "Because the ending carries the person, the pronouns yo and tú are usually dropped. Spanish speakers add them for emphasis or contrast: 'Yo hablo español, tú hablas francés' stresses the difference between us. Saying yo before every verb is not wrong, but it sounds a little like saying 'I myself' each time in English. The él and ella forms are dropped less often, because habla on its own could mean he, she or you (formal), so a name or pronoun often stays to make it clear.",
        "Worked example. You want to say 'You eat bread and I drink water', talking to a friend. Comer, stem com-, you form comes. Beber, stem beb-, I form bebo. Join with y (and): 'Comes pan y bebo agua.' Nobody needs to hear yo or tú; the -s and the -o have already said it.",
      ],
      example: {
        question: "Your friend asks about your job. You want to say 'I work in a school'. Trabajar means to work. Which is right?",
        options: ["Trabaja en una escuela", "Trabajo en una escuela", "Trabajas en una escuela"],
        answer: 1,
        why: "The -o ending means I; trabaja is he or she and trabajas is you.",
      },
      keyPoints: [
        "The end of a Spanish verb tells you who is doing it, so hablo means I speak by itself.",
        "For I the verb ends in -o, for you it ends in -s, and for he or she there is no s.",
        "Yo and tú are usually left out because the ending has already done the job.",
      ],
      misconception: {
        belief: "I should say yo before every verb, like I say I in English, or people won't know who I mean.",
        correction:
          "The -o ending already means I, so hablo is a complete sentence. Adding yo every time is not wrong, but it sounds heavy, like saying 'I myself' each time. Keep yo for emphasis or contrast.",
      },
      quiz: [
        {
          question: "What does 'Comes pan' mean?",
          options: ["You eat bread", "I eat bread", "She eats bread"],
          answer: 0,
          why: "The -s ending points to tú, you; I eat would be como and she eats would be come.",
        },
        {
          question: "Which ending marks 'I' on a Spanish verb?",
          options: ["-a", "-s", "-o"],
          answer: 2,
          why: "Hablo, como, vivo: the -o is the I form.",
        },
        {
          question: "Why do Spanish speakers often leave out yo and tú?",
          options: ["Pronouns count as rude in Spanish", "The verb ending already shows who", "Sentences must stay under four words"],
          answer: 1,
          why: "Hablo already carries I and hablas already carries you, so the pronoun adds nothing new.",
        },
      ],
      pairs: [
        { term: "hablo", match: "I speak" },
        { term: "hablas", match: "you speak" },
        { term: "habla", match: "he or she speaks" },
        { term: "vivo", match: "I live" },
        { term: "comes", match: "you eat" },
      ],
      order: {
        prompt: "Build 'I speak Spanish' from the verb hablar, step by step.",
        items: ["Start with hablar, to speak", "Remove -ar to get the stem habl-", "Add -o for I: hablo", "Add the rest: hablo español"],
      },
      blitz: [
        { statement: "Hablas means you speak.", truth: true, why: "The -s ending is the tú form." },
        { statement: "Como means she eats.", truth: false, why: "Como ends in -o, so it means I eat; she eats is come." },
        { statement: "Yo and tú are usually dropped because the ending shows who.", truth: true, why: "Hablo already means I speak." },
        { statement: "The he or she form always ends in -s.", truth: false, why: "It has no s: habla, come, vive." },
      ],
      blanks: [
        { sentence: "___ en Madrid means I live in Madrid.", options: ["Vive", "Vives", "Vivo"], answer: 2 },
        { sentence: "Tú ___ español means you speak Spanish.", options: ["hablas", "hablo", "habla"], answer: 0 },
      ],
    },
    {
      id: "languages-3-3",
      title: "Describing words come after and match",
      hook: "In Spanish the describing word comes after the thing and changes its ending to match. A black cat is gato negro; a white house is casa blanca.",
      steps: [
        {
          label: "After, not before",
          text: "The describing word follows the noun. El gato negro is the black cat, word for word 'the cat black'. La casa blanca is the white house.",
        },
        {
          label: "Match the gender",
          text: "If the noun is masculine (el), the adjective ends in -o: el coche rojo, the red car. If it is feminine (la), it ends in -a: la mesa roja, the red table.",
        },
        {
          label: "Match the number",
          text: "More than one? Add -s to both. Los gatos negros, the black cats. Las casas blancas, the white houses.",
        },
        {
          label: "Some don't change",
          text: "Adjectives that end in -e or a consonant use one form for both genders: el coche grande, la casa grande. For plurals they still add -s or -es: grandes, azules.",
        },
      ],
      analogy:
        "A Spanish adjective is like a shadow. It walks behind the noun and takes the noun's shape, whether that shape is masculine, feminine, one or many.",
      story: [
        "Leo wanted the red trainers in the shop window in Barcelona, and his dad said he could ask for them himself. Leo knew rojo meant red and zapatillas meant trainers. He marched up to the counter and said, 'Rojo zapatillas, por favor.'",
        "The shop assistant smiled kindly and waited, not quite sure what he meant. Leo's dad leaned down. 'Thing first, then the colour,' he whispered. 'And make it match. Zapatillas ends in -as, so rojo has to change.' Leo thought about it. Las zapatillas. More than one, and feminine. Rojo became roja, then rojas. 'Las zapatillas rojas, por favor,' he tried again.",
        "The assistant's face cleared at once, and she lifted the red pair down from the window. Leo carried the box out as if it were a trophy. The trainers were the same, but this time the words had fitted them.",
      ],
      deepRead: [
        "Spanish adjectives agree with their nouns. They change their ending to match the noun's gender (masculine or feminine) and number (one or many). Most adjectives you meet early end in -o in their basic form: negro, blanco, rojo, pequeño (the ñ sounds like the ny in canyon). These have four shapes. Negro goes with a masculine singular noun (el gato negro), negra with a feminine singular one (la casa negra), negros with masculine plurals (los gatos negros) and negras with feminine plurals (las casas negras). Article, noun and adjective all line up, so a listener hears the same gender and number three times.",
        "Adjectives that end in -e or in a consonant have only two shapes, because they do not change for gender. Grande (big), verde (green) and azul (blue) are the same for el and la. For the plural, add -s after a vowel and -es after a consonant: grandes, verdes, azules. Position is the other half of the rule. The usual place for a descriptive adjective is after the noun, the opposite of English. A few very common adjectives, such as the word for good, often come before the noun, but that is for a later unit.",
        "Worked example. You want to say 'the small blue houses'. Casa is feminine, and there are several, so the article is las and the noun is casas. Pequeño becomes pequeñas to match. Azul does not change for gender, but it takes -es for the plural: azules. Put the adjectives after the noun: 'las casas pequeñas y azules'. Every ending agrees, and the phrase is complete.",
      ],
      example: {
        question: "Which is the usual way to say 'the white houses'?",
        options: ["Las blancas casas", "Las casas blancas", "Las casas blanco"],
        answer: 1,
        why: "The adjective follows the noun and matches it: feminine and plural, so blancas.",
      },
      keyPoints: [
        "In Spanish the describing word usually comes after the noun: el gato negro, not el negro gato.",
        "An adjective ending in -o changes to -a for a feminine noun, so la casa blanca.",
        "For more than one, add -s to the adjective as well: los gatos negros, las casas blancas.",
      ],
      misconception: {
        belief: "An adjective is just one word. Negro means black, so I can use negro with anything.",
        correction:
          "Negro is only the masculine singular shape. The adjective must match its noun, so a white house is casa blanca and black cats are gatos negros. The ending is part of the word you choose each time.",
      },
      quiz: [
        {
          question: "Which is correct for 'the red table'? Mesa is feminine.",
          options: ["La mesa roja", "La mesa rojo", "El mesa roja"],
          answer: 0,
          why: "Mesa is feminine, so it takes la and the adjective ends in -a: roja.",
        },
        {
          question: "How do you say 'the big cat'? Gato is masculine.",
          options: ["El grande gato", "El gato grande", "El gato grando"],
          answer: 1,
          why: "Grande ends in -e, so it keeps one form for both genders, and it follows the noun.",
        },
        {
          question: "What does 'los coches negros' mean?",
          options: ["The black car", "The cars are black", "The black cars"],
          answer: 2,
          why: "Los, coches and negros all carry the plural -s, so it is more than one black car.",
        },
      ],
      pairs: [
        { term: "el gato negro", match: "the black cat" },
        { term: "la casa blanca", match: "the white house" },
        { term: "los coches rojos", match: "the red cars" },
        { term: "la mesa grande", match: "the big table" },
        { term: "las casas pequeñas", match: "the small houses" },
      ],
      order: {
        prompt: "Build 'the red tables' by following the method in order.",
        items: [
          "Find the noun's gender: mesa is feminine",
          "Count: more than one, so mesas",
          "Shape the adjective to match: rojas",
          "Put it after the noun: las mesas rojas",
        ],
      },
      blitz: [
        { statement: "In Spanish the adjective usually comes after the noun.", truth: true, why: "El gato negro, word for word 'the cat black'." },
        { statement: "La casa blanco is correct.", truth: false, why: "Casa is feminine, so the adjective must be blanca." },
        { statement: "Grande has the same form for el and la.", truth: true, why: "Adjectives ending in -e do not change for gender." },
        { statement: "Only the noun takes an -s in the plural; the adjective stays the same.", truth: false, why: "Both change: los gatos negros." },
      ],
      blanks: [
        { sentence: "La casa ___ means the white house.", options: ["blanco", "blanca", "blancas"], answer: 1 },
        { sentence: "Los gatos ___ means the black cats.", options: ["negros", "negro", "negras"], answer: 0 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
