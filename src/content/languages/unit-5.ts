import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 5,
  title: "Telling a short story",
  summary: "You can tell a short story in Spanish about something that happened: when it was, what happened in order, and what the scene was like.",
  concepts: [
    {
      id: "languages-5-1",
      title: "Saying when it happened and what came next",
      hook: "Every story needs a 'when' and a path through it. In Spanish, a handful of small words do both jobs.",
      steps: [
        { label: "When", text: "Start with a time word. Ayer means yesterday and sounds like 'ah-YAIR'. Anoche means last night. La semana pasada means last week. Ayer comí pizza: yesterday I ate pizza." },
        { label: "Ago", text: "For 'ago', put hace in front of the length of time. Hace dos días means two days ago. Hace un año means a year ago." },
        { label: "First, then", text: "Link the events with primero (first), luego (then) and después (after that). Primero desayuné. Luego salí. Después compré pan. First I had breakfast. Then I left. After that I bought bread." },
        { label: "The ending", text: "Close with al final, which means in the end. Al final volví a casa: in the end I went back home. One time word, a few links and an ending make a story." },
      ],
      analogy: "Sequence words are stepping stones across a stream. Primero, luego, después and al final each carry the listener safely on to the next part of your story.",
      story: [
        "Priya's Spanish teacher asked the class a simple question on Monday morning. ¿Qué hiciste el fin de semana? What did you do at the weekend? Priya knew plenty of words, but they came out in a jumble. Park, cake, rain, grandmother. Her teacher smiled and wrote four words on the board: primero, luego, después, al final.",
        "Priya tried again, slowly. El sábado visité a mi abuela. Primero comimos pastel. Luego caminamos al parque. Después llovió mucho. Al final vimos una película. On Saturday I visited my grandmother. First we ate cake. Then we walked to the park. After that it rained a lot. In the end we watched a film.",
        "The same words, in a line, had become a story. Her teacher nodded. 'Now I can follow you,' she said. Priya noticed something else too. Each little linking word gave her a second to think about what came next.",
      ],
      deepRead: [
        "Spanish stories, like English ones, usually open with a time marker. The most useful are ayer (yesterday), anoche (last night), la semana pasada (last week) and el año pasado (last year). Notice that pasado changes to match the noun: semana is feminine, so it takes pasada, while año is masculine, so it takes pasado. For 'ago', Spanish puts hace in front of the length of time: hace dos días (two days ago), hace un mes (a month ago). These markers usually sit at the start of the sentence, though they can also go at the end, as in English.",
        "Once the time is set, sequence words carry the listener from one event to the next. Primero means first. Luego and después both mean then or afterwards, and either one works; many speakers alternate them so the story does not sound repetitive. Entonces also means then, but with a feeling of 'so' or 'at that moment', which suits a turning point. Al final means in the end, and por fin means at last, with a touch of relief.",
        "A worked example: Anoche cené con mi hermano. Primero hablamos del trabajo. Luego vimos un partido. Después comimos helado. Al final me dormí en el sofá. Last night I had dinner with my brother. First we talked about work. Then we watched a match. After that we ate ice cream. In the end I fell asleep on the sofa. One time word and four links, and the listener never loses the thread.",
      ],
      example: {
        question: "You want to say 'two days ago' in Spanish. Which is right?",
        options: ["Dos días pasados", "Hace dos días", "Dos días hace"],
        answer: 1,
        why: "Hace in front of a length of time means 'ago'.",
      },
      keyPoints: [
        "Start a story with a time word such as ayer, anoche or la semana pasada.",
        "Put hace in front of a length of time to say ago, as in hace dos días.",
        "Link the events with primero, luego and después, and close with al final.",
      ],
      misconception: {
        belief: "Hace means 'it makes' or 'does', so hace dos días can't mean two days ago.",
        correction: "Hace does mean 'it makes', and that is exactly the picture: hace dos días is literally 'it makes two days'. Put it in front of a length of time and the phrase means ago.",
      },
      quiz: [
        {
          question: "Which word means last night?",
          options: ["Ayer", "Anoche", "Ahora"],
          answer: 1,
          why: "Anoche is last night; ayer is yesterday and ahora is now.",
        },
        {
          question: "Which is the right way to say 'last week'?",
          options: ["La semana pasada", "El semana pasado", "La semana pasado"],
          answer: 0,
          why: "Semana is feminine, so it takes la and pasada.",
        },
        {
          question: "Which word best closes a story?",
          options: ["Primero", "Luego", "Al final"],
          answer: 2,
          why: "Al final means in the end; primero opens a story and luego links the middle.",
        },
      ],
      pairs: [
        { term: "Ayer", match: "Yesterday" },
        { term: "Anoche", match: "Last night" },
        { term: "Hace un año", match: "A year ago" },
        { term: "Primero", match: "First" },
        { term: "Al final", match: "In the end" },
      ],
      order: {
        prompt: "Put these parts of a story in the natural order.",
        items: ["Ayer caminé al parque.", "Primero corrí un poco.", "Luego comí un helado.", "Al final volví a casa."],
      },
      blitz: [
        { statement: "Ayer means yesterday.", truth: true, why: "Ayer is yesterday; anoche is last night." },
        { statement: "Hace dos días means 'in two days'.", truth: false, why: "Hace in front of a time means ago, so it is two days ago." },
        { statement: "Al final means in the end.", truth: true, why: "Al final closes a story, like 'in the end' in English." },
        { statement: "Después means before.", truth: false, why: "Después means after or afterwards; antes means before." },
      ],
      blanks: [
        { sentence: "___ comí pizza con mis primos: yesterday I ate pizza with my cousins.", options: ["Ayer", "Mañana", "Ahora"], answer: 0 },
        { sentence: "Primero desayuné, ___ salí de casa: first I had breakfast, then I left the house.", options: ["antes", "luego", "ayer"], answer: 1 },
      ],
    },
    {
      id: "languages-5-2",
      title: "Saying what happened with the past tense",
      hook: "To say what happened, Spanish swaps the ending of the verb. Learn the 'I' and 'he or she' endings and you can tell most stories.",
      steps: [
        { label: "Find the stem", text: "Take the verb and drop the last two letters. Hablar (to speak) becomes habl. Comer (to eat) becomes com. Salir (to leave) becomes sal. That is the stem." },
        { label: "I did it", text: "For 'I', add é to -ar verbs and í to -er and -ir verbs. Hablé: I spoke. Comí: I ate. Salí: I left. Say the last part loudest." },
        { label: "He or she", text: "For he, she or it, add ó to -ar verbs and ió to the others. Habló: he spoke. Comió: she ate. Salió: he left." },
        { label: "Mind the accent", text: "The little mark matters. Hablo means I speak, right now. Habló means he or she spoke, in the past. Write the accent and say that part loudest." },
      ],
      analogy: "A verb is like a coat with swappable buttons. The stem stays the same, and the ending you button on tells everyone who did it and that it is already over.",
      story: [
        "Marcus had been learning Spanish for six months, and he could order coffee and ask the way. But on Sunday his neighbour Rosa asked, ¿Qué pasó con tu bici? What happened to your bike? Marcus froze. He knew the words for buy, fall and fix, but only in the present.",
        "He tried anyway. Yo compro una bici. Rosa shook her head kindly. 'Compro is now,' she said. 'Compré is done.' She tapped the end of the word. Marcus tried again. Compré una bici. Un coche pasó muy cerca. Caí al suelo. I bought a bike. A car passed very close. I fell to the ground.",
        "Rosa laughed and told him she had done the same thing years ago. Marcus noticed that every verb had needed one small change at the end. The story was already inside him. He just had to change the buttons.",
      ],
      deepRead: [
        "The Spanish tense for finished past events is called the preterite. Regular verbs follow one of two patterns, chosen by their ending. Verbs ending in -ar take -é for yo and -ó for él, ella or usted: hablar gives hablé and habló, comprar gives compré and compró. Verbs ending in -er or -ir share one set: -í for yo and -ió for él, ella or usted, so comer gives comí and comió, and vivir gives viví and vivió. The written accent is not optional. It shows that the stress falls on the final syllable, and it separates habló (he or she spoke) from hablo (I speak).",
        "The other persons are just as regular. For -ar verbs: hablaste (you spoke), hablamos (we spoke), hablaron (they spoke). For -er and -ir verbs: comiste, comimos, comieron. Notice that hablamos looks the same in the present and the preterite; a time word such as ayer settles which one you mean. A few everyday verbs are irregular and simply need learning: ir (to go) gives fui and fue, ver (to see) gives vi and vio with no accent, and hacer (to do or make) gives hice and hizo.",
        "Worked example. Take 'Yesterday I bought bread, ate it in the park and read a book.' Comprar becomes compré, comer becomes comí and leer becomes leí. Ayer compré pan, lo comí en el parque y leí un libro. Three regular verbs, three endings, one clear story about a finished day.",
      ],
      example: {
        question: "How do you say 'she ate' in Spanish?",
        options: ["Come", "Comió", "Comí"],
        answer: 1,
        why: "Comió is the he or she past form of comer; comí is 'I ate' and come is 'she eats'.",
      },
      keyPoints: [
        "Drop -ar, -er or -ir to find the stem, then add the past ending.",
        "For 'I', add é to -ar verbs and í to -er and -ir verbs, as in hablé and comí.",
        "For he or she, add ó or ió and always write the accent, as in habló and comió.",
      ],
      misconception: {
        belief: "The accent on habló is just decoration, so I can leave it off.",
        correction: "Hablo means I speak, now. Habló means he or she spoke, in the past. The accent moves the stress to the end and changes both the person and the time.",
      },
      quiz: [
        {
          question: "Which is the 'I' form of vivir (to live) in the past?",
          options: ["Viví", "Vivió", "Vivo"],
          answer: 0,
          why: "Vivir is an -ir verb, so 'I lived' takes í: viví.",
        },
        {
          question: "What does 'Ana habló con su madre' mean?",
          options: ["Ana speaks with her mother.", "Ana spoke with her mother.", "Ana will speak with her mother."],
          answer: 1,
          why: "Habló, with the accent, is the past he or she form of hablar.",
        },
        {
          question: "Which verb form is in the past?",
          options: ["Compro", "Compra", "Compró"],
          answer: 2,
          why: "Compró carries the accent on the ó, so it is he or she bought; the others are present.",
        },
      ],
      pairs: [
        { term: "Hablé", match: "I spoke" },
        { term: "Habló", match: "He or she spoke" },
        { term: "Comí", match: "I ate" },
        { term: "Salió", match: "He or she left" },
        { term: "Hablo", match: "I speak, right now" },
      ],
      order: {
        prompt: "Put the steps for making the past form of comer (to eat) in order.",
        items: ["Start with the whole verb, comer.", "Drop the -er to find the stem, com.", "Add í for I or ió for he or she, with the accent.", "Put it in a sentence: ayer comí pan."],
      },
      blitz: [
        { statement: "Comí means I ate.", truth: true, why: "Comer is an -er verb, so the 'I' past form ends in í." },
        { statement: "Hablo and habló mean the same thing.", truth: false, why: "Hablo is I speak now; habló is he or she spoke." },
        { statement: "Regular -ar verbs take ó for he or she in the past.", truth: true, why: "Hablar gives habló and comprar gives compró." },
        { statement: "-er and -ir verbs use different past endings from each other.", truth: false, why: "They share one set: comí and viví, comió and vivió." },
      ],
      blanks: [
        { sentence: "Anoche mi hermana ___ una pizza entera: last night my sister ate a whole pizza.", options: ["comí", "comió", "come"], answer: 1 },
        { sentence: "Ayer ___ con mi abuela por teléfono: yesterday I spoke with my grandmother on the phone.", options: ["hablé", "habló", "hablo"], answer: 0 },
      ],
    },
    {
      id: "languages-5-3",
      title: "Setting the scene with era, estaba, había and hacía",
      hook: "A good story has a background and an action. Spanish uses different verb forms for each, and four words do most of the background work.",
      steps: [
        { label: "Era", text: "Era means it was, for describing things. Era tarde: it was late. Era un día tranquilo: it was a quiet day. Era sounds like 'EH-rah'." },
        { label: "Estaba", text: "Estaba means was, for where someone was or how they felt. Estaba en casa: I was at home. Estaba cansada: she was tired." },
        { label: "Había and hacía", text: "Había means there was or there were. Había mucha gente: there were a lot of people. Hacía is for weather. Hacía frío: it was cold. Hacía sol: it was sunny." },
        { label: "Then the action", text: "Set the scene with these, then switch to the past forms from before for what happened. Era de noche y hacía frío. Entonces sonó el teléfono. It was night and it was cold. Then the phone rang." },
      ],
      analogy: "Think of a stage play. Era, estaba, había and hacía paint the scenery before the curtain rises. The past forms like sonó and salió are the actors walking on and doing things.",
      story: [
        "Aisha had to write six sentences in Spanish about a night she remembered. She chose the storm last winter. Her first draft was a list. Llovió. La luz se apagó. Mi perro ladró. It rained. The light went out. My dog barked. Correct, but flat, like a police report.",
        "Her teacher suggested she paint the room first. Aisha tried. Era sábado y era tarde. Estaba en la cocina con mi madre. Había velas en la mesa. Hacía mucho viento. Then she let the events land. Entonces la luz se apagó. Mi perro ladró y mi madre sonrió.",
        "It was Saturday and it was late. I was in the kitchen with my mum. There were candles on the table. It was very windy. Then the light went out. My dog barked and my mum smiled. Reading it back, Aisha could see the room. The scene words held the picture still, and the action words made it move.",
      ],
      deepRead: [
        "Spanish has two main past tenses, and a story needs both. The preterite (hablé, comió, sonó) reports events that happened and finished. The imperfect describes what was going on around those events: the time, the weather, where people were, how they felt and what was there. The four most useful imperfect forms for a beginner are era (it was, for descriptions and time), estaba (was, for place and feelings), había (there was or there were) and hacía (for weather, as in hacía calor). Había does not change for plural: había una silla and había tres sillas are both correct.",
        "Era and estaba come from ser and estar, the two Spanish verbs for 'to be'. Era describes what something was like or when it was: era lunes, era pequeño, era mi cumpleaños. Estaba gives a location or a passing state: estaba en el jardín, estaba nervioso. Both are the same for yo and for él or ella, which makes them easy to use in a story about yourself. Other imperfect forms follow the same idea: tenía (had, as in tenía hambre), llovía (it was raining) and quería (wanted).",
        "Worked example. Take 'It was Sunday. It was raining and I was in bed. Suddenly the doorbell rang.' The first three pieces are background, so they take imperfect forms: Era domingo. Llovía y estaba en la cama. The last one is an event that moves the story on, so it takes the preterite: De repente sonó el timbre. Background holds still; the action steps forward.",
      ],
      example: {
        question: "You want to say 'there were a lot of people in the square'. Which word starts the sentence?",
        options: ["Estaba", "Había", "Era"],
        answer: 1,
        why: "Había means there was or there were; era and estaba describe a named person or thing.",
      },
      keyPoints: [
        "Era, estaba, había and hacía describe the background of a story.",
        "Había means there was or there were, and it stays the same for one thing or many.",
        "Once the scene is set, switch to forms like sonó and salió for the events.",
      ],
      misconception: {
        belief: "It all happened in the past, so I should use hablé, comió and the other past endings for everything.",
        correction: "Spanish splits the past in two. What was going on in the background takes era, estaba, había and hacía. What happened next takes the endings from the last lesson, such as sonó and salió.",
      },
      quiz: [
        {
          question: "Which word means 'there was' or 'there were'?",
          options: ["Había", "Estaba", "Hacía"],
          answer: 0,
          why: "Había is there was or there were; estaba is was, for place, and hacía is for weather.",
        },
        {
          question: "The weather was cold. Which is the Spanish?",
          options: ["Era frío", "Estaba frío", "Hacía frío"],
          answer: 2,
          why: "Spanish uses hacer for weather, so cold weather is hacía frío.",
        },
        {
          question: "Which sentence is the action, not the background?",
          options: ["Era de noche.", "Sonó el teléfono.", "Estaba en la cocina."],
          answer: 1,
          why: "Sonó is a finished event that moves the story; era and estaba paint the scene.",
        },
      ],
      pairs: [
        { term: "Era", match: "It was, for describing" },
        { term: "Estaba", match: "Was, for place or feeling" },
        { term: "Había", match: "There was or there were" },
        { term: "Hacía frío", match: "It was cold" },
        { term: "Sonó", match: "Rang, a finished event" },
      ],
      order: {
        prompt: "Put this short story in order, scene first.",
        items: ["Era de noche y estaba solo en casa.", "Entonces sonó el teléfono.", "Contesté: era mi hermano.", "Al final comimos pizza juntos."],
      },
      blitz: [
        { statement: "Había means there was or there were.", truth: true, why: "Había covers both one thing and many." },
        { statement: "Era frío is how you say the weather was cold.", truth: false, why: "Weather uses hacer, so it is hacía frío." },
        { statement: "Estaba can mean both I was and he or she was.", truth: true, why: "The yo and él or ella forms are the same: estaba." },
        { statement: "Sonó el teléfono describes the background of a scene.", truth: false, why: "Sonó is a finished event, the action; background uses forms like era and había." },
      ],
      blanks: [
        { sentence: "___ domingo y llovía: it was Sunday and it was raining.", options: ["Era", "Había", "Hacía"], answer: 0 },
        { sentence: "Estaba en el jardín cuando ___ el teléfono: I was in the garden when the phone rang.", options: ["sonaba", "sonó", "suena"], answer: 1 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
