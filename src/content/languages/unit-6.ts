import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 6,
  title: "Holding a conversation",
  summary: "After this unit you can hold a short, friendly conversation in Spanish: keep it going with quick reactions, get unstuck when you miss a word, and end it kindly.",
  concepts: [
    {
      id: "languages-6-1",
      title: "Keeping the conversation going",
      hook: "Good listeners talk less than you think. A handful of two-word Spanish reactions will keep anyone talking to you.",
      steps: [
        { label: "React", text: "When someone tells you something, show you heard it. 'Claro' (sounds like 'clah-ro') means 'of course'. '¿De verdad?' means 'really?'. Two words each, and the speaker knows you're with them." },
        { label: "Feel it", text: "Put 'qué' (sounds like 'keh') in front of a word to react with feeling. 'Qué bien' is 'how nice'. 'Qué pena' is 'what a shame'. 'Qué suerte' is 'how lucky'." },
        { label: "Pass it back", text: "Ask a tiny question so they keep going. '¿Y tú?' means 'and you?'. '¿Y luego?' means 'and then?'. With an older person or a stranger, say '¿Y usted?' instead." },
        { label: "Repeat", text: "React, then pass it back. Do this each time they finish and the chat keeps rolling. You never need a long sentence of your own." },
      ],
      analogy: "A conversation is like keeping a balloon in the air. You don't need a big hit, just a light tap to send it back.",
      story: [
        "Maya sat at the long kitchen table of her host family in Valencia, trying to follow the talk. Her host mum, Carmen, said something about the weekend and then looked at her. Maya froze. She had caught 'sábado' and 'playa', Saturday and beach, but she had no long sentence ready.",
        "So she tried the small words instead. 'Ah, ¿sí? ¿La playa?' Carmen smiled and started again, slower this time. She had gone to the beach with her sister and the sea was freezing. 'Qué frío,' said Maya, pulling a face, and the whole table laughed.",
        "'¿Y tú?' Carmen asked. Maya managed, 'Yo también, con mi amiga.' It wasn't much, but Carmen leaned in and asked another question. Ten minutes later Maya realised she had been part of the conversation the whole time. The little words had done the work.",
      ],
      deepRead: [
        "Linguists call the little words a listener makes 'back-channel' signals. English has 'mm', 'really?' and 'no way'. Spanish has its own set, and using them is what makes you part of the conversation rather than its audience. They come in three groups. Attention words: 'claro' (of course), 'vale' (OK, very common in Spain) and 'entiendo' (I see). Surprise words: '¿de verdad?' (really?), '¿en serio?' (seriously?) and 'ah, ¿sí?' (oh, yes?). Feeling words built with 'qué': 'qué bien' (how nice), 'qué pena' (what a shame), 'qué suerte' (how lucky) and 'qué miedo' (how scary). Notice the accent on 'qué'. With the accent it means 'how' or 'what'; without it, 'que' means 'that'.",
        "Reactions alone don't keep a conversation alive. The second half of the skill is the pass-back: a tiny question that hands the turn straight back. '¿Y tú?' (and you?), '¿y luego?' (and then?), '¿por qué?' (why?) and 'cuéntame más' (tell me more) all do this. With an older person or a stranger, swap 'tú' for the polite 'usted' and ask '¿y usted?'. A worked example: your host says 'Trabajo en un hospital' (I work in a hospital). A weak reply is a nod. A strong reply is 'Ah, ¿sí? ¿Y te gusta?' (Oh, yes? And do you like it?). Five words, and the host now has an easy question to answer. Repeat that pattern and you can hold a ten-minute conversation while understanding only half of what you hear.",
      ],
      example: {
        question: "Your friend says 'Voy a Perú en agosto' (I'm going to Peru in August). Which reply keeps them talking?",
        options: ["Yo fui a Perú el año pasado con mi familia.", "¿De verdad? ¿Con quién?", "Vale."],
        answer: 1,
        why: "It reacts with surprise and hands the turn straight back with a question; the first option takes over, and 'vale' closes the door.",
      },
      keyPoints: [
        "Short reactions like 'claro' and '¿de verdad?' show you're listening without a full sentence.",
        "Put 'qué' before a word to react with feeling: 'qué bien', 'qué pena', 'qué suerte'.",
        "A tiny question like '¿y tú?' or '¿y luego?' passes the conversation back and keeps it going.",
      ],
      misconception: {
        belief: "I can't really join a conversation until I can say long sentences.",
        correction: "Most of a good conversation is short. 'Claro', '¿de verdad?' and '¿y tú?' are two words each, and they do the listener's whole job: showing you heard and asking for more. Long sentences can come later.",
      },
      quiz: [
        { question: "Your friend says her cat is ill. Which reaction fits?", options: ["Qué bien", "Qué pena", "Qué suerte"], answer: 1, why: "'Qué pena' means 'what a shame'; 'qué bien' is 'how nice' and 'qué suerte' is 'how lucky'." },
        { question: "Someone says 'Trabajo en un hospital' (I work in a hospital). Which reply passes the turn back to them?", options: ["Ah, ¿sí? ¿Y te gusta?", "Yo trabajo en una tienda.", "Claro."], answer: 0, why: "A reaction plus a tiny question keeps them talking; the second takes the turn for yourself and the third gives them nothing to answer." },
        { question: "You're chatting with an older stranger on a train. How do you ask 'and you?' politely?", options: ["¿Y tú?", "¿Y luego?", "¿Y usted?"], answer: 2, why: "'Usted' is the respectful 'you'; 'tú' is for friends and '¿y luego?' means 'and then?'." },
      ],
      pairs: [
        { term: "¿Y tú?", match: "And you?" },
        { term: "¿De verdad?", match: "Really?" },
        { term: "Qué bien", match: "How nice" },
        { term: "Claro", match: "Of course" },
        { term: "Cuéntame más", match: "Tell me more" },
      ],
      order: {
        prompt: "Put this chat in order, from the first line to the last.",
        items: [
          "Ana: Fui al cine el sábado. (I went to the cinema on Saturday.)",
          "You: ¿De verdad? ¿Qué viste? (Really? What did you see?)",
          "Ana: Una película de miedo. (A scary film.)",
          "You: Qué miedo. ¿Y te gustó? (How scary. And did you like it?)",
        ],
      },
      blitz: [
        { statement: "'¿De verdad?' means 'really?'", truth: true, why: "Literally 'of truth?', it shows surprise or interest." },
        { statement: "'Qué pena' means 'how nice'.", truth: false, why: "'Qué pena' is 'what a shame'; 'qué bien' is 'how nice'." },
        { statement: "You need a full sentence to take your turn in a conversation.", truth: false, why: "Short reactions and tiny questions count as turns and keep the other person talking." },
        { statement: "'¿Y usted?' is the polite way to ask 'and you?'", truth: true, why: "'Usted' is the respectful 'you' for strangers and older people." },
      ],
      blanks: [
        { sentence: "To ask 'and you?' to a friend, say '¿Y ___?'", options: ["tú", "usted", "luego"], answer: 0 },
        { sentence: "'___ bien' means 'how nice'.", options: ["Muy", "Qué", "Más"], answer: 1 },
      ],
    },
    {
      id: "languages-6-2",
      title: "Getting unstuck when you miss a word",
      hook: "Everyone gets stuck in a conversation, even native speakers. The skill is knowing the few phrases that get you moving again.",
      steps: [
        { label: "Stop the panic", text: "Missing a word is normal, even for fluent speakers. The only real mistake is going quiet. Say 'perdón' (sorry) and take charge of the moment." },
        { label: "Slow it down", text: "'Más despacio, por favor' (sounds like 'mahs des-pah-see-oh, por fa-vor') means 'slower, please'. Nearly everyone will say it again, slowly and simply." },
        { label: "Get it again", text: "'¿Puedes repetir?' means 'can you repeat that?'. With an older person or a stranger, say '¿Puede repetir?' instead, which is the polite form. '¿Cómo?' on its own is a quick 'pardon?'." },
        { label: "Ask the word", text: "'¿Qué significa...?' means 'what does... mean?'. '¿Cómo se dice...?' means 'how do you say...?'. The first asks about their word. The second asks for the word you need." },
      ],
      analogy: "Getting stuck in a conversation is like dropping a stitch in knitting. You don't throw the scarf away; you pick the stitch up and carry on.",
      story: [
        "Kwame stood at the counter of a small bakery in Madrid, pointing at a golden pastry. The baker said the price quickly and the numbers ran together like water. Kwame felt his face go hot. His first thought was to hand over a big note and hope.",
        "Instead he said the line he had practised on the plane. 'Perdón, más despacio, por favor.' The baker nodded and said it again, one word at a time. 'Dos... euros... con... veinte.' This time Kwame heard it clearly and counted out the coins.",
        "Then he pointed at the pastry once more. '¿Cómo se dice esto?' The baker grinned. 'Napolitana.' Kwame repeated it and the baker gently fixed the middle sound. He left with a pastry, a new word, and the feeling that getting stuck had not been the end of anything.",
      ],
      deepRead: [
        "Repair phrases may be the most useful sentences you ever learn, because they turn a breakdown into an ordinary moment. There are three moves. The first slows the speaker down: 'más despacio, por favor' (slower, please) or 'otra vez, por favor' (again, please). The second asks for a repeat: '¿puedes repetir?' to a friend, and '¿puede repetir?' to a stranger or an older person, because 'puede' is the polite usted form. The one-word version is '¿cómo?', which works like the English 'pardon?'. Avoid a bare '¿qué?', which can sound sharp, like snapping 'what?' at someone.",
        "The third move deals with a single word. '¿Qué significa...?' asks what their word means. '¿Cómo se dice...?' asks how to say your word in Spanish. Learners mix these up, so hold on to this: 'significa' is about meaning, 'se dice' is about saying. A worked example. At a station, someone tells you 'El tren sale del andén cuatro' (the train leaves from platform four). You catch 'tren' and 'cuatro' but not 'andén'. Instead of guessing, you ask 'Perdón, ¿qué significa andén?' They point at the platform sign, and now you know. You finish by repeating the key words back: '¿El andén cuatro?' That last step matters. Saying it back checks that you understood, and it shows the other person that their help worked.",
      ],
      example: {
        question: "A waiter lists the specials so fast you catch nothing. What do you say first?",
        options: ["Más despacio, por favor.", "¿Qué significa 'pescado'?", "No, gracias."],
        answer: 0,
        why: "You need the whole thing slower before you can ask about any one word; 'no, gracias' just gives up.",
      },
      keyPoints: [
        "Getting stuck is normal; going quiet is the only real mistake.",
        "'Más despacio, por favor' and '¿puedes repetir?' get you a slower, clearer second try.",
        "'¿Qué significa...?' asks what their word means, and '¿cómo se dice...?' asks for the Spanish word you need.",
      ],
      misconception: {
        belief: "If I say 'no entiendo', people will think I'm hopeless and stop talking to me.",
        correction: "The opposite happens. Asking someone to slow down shows you're listening and want to understand, and most people are pleased to help. Silence is what ends conversations, not questions.",
      },
      quiz: [
        { question: "You want to know the Spanish word for 'cheese'. What do you ask?", options: ["¿Qué significa 'queso'?", "¿Cómo se dice 'cheese'?", "¿Puedes repetir 'queso'?"], answer: 1, why: "'¿Cómo se dice...?' asks for the Spanish word; '¿qué significa...?' would ask what a word means, and you don't know the word yet." },
        { question: "Someone uses a word you've never heard: 'rotonda'. Which question helps most?", options: ["¿Qué significa 'rotonda'?", "¿Cómo se dice 'rotonda'?", "Más despacio, por favor."], answer: 0, why: "You heard the word fine, you need its meaning, so ask what it means; slowing down won't explain it." },
        { question: "You're speaking to a shopkeeper you don't know. Which is the polite way to ask them to repeat?", options: ["¿Puedes repetir?", "¿Qué?", "¿Puede repetir?"], answer: 2, why: "'Puede' is the polite usted form; 'puedes' is for friends, and a bare '¿qué?' can sound sharp." },
      ],
      pairs: [
        { term: "No entiendo", match: "I don't understand" },
        { term: "Más despacio, por favor", match: "Slower, please" },
        { term: "¿Puedes repetir?", match: "Can you repeat that?" },
        { term: "¿Cómo se dice...?", match: "How do you say...?" },
        { term: "¿Qué significa...?", match: "What does... mean?" },
      ],
      order: {
        prompt: "Put this exchange with a stranger in order.",
        items: [
          "Stranger: Gira a la izquierda en la rotonda. (Turn left at the roundabout.)",
          "You: Perdón, ¿qué significa 'rotonda'? (Sorry, what does 'rotonda' mean?)",
          "Stranger: Es un círculo para los coches. (It's a circle for cars.)",
          "You: Ah, a la izquierda en la rotonda. Gracias. (Ah, left at the roundabout. Thanks.)",
        ],
      },
      blitz: [
        { statement: "'Más despacio' means 'more slowly'.", truth: true, why: "'Más' is 'more' and 'despacio' is 'slowly'." },
        { statement: "'¿Cómo se dice...?' asks what a Spanish word means.", truth: false, why: "It asks how to say your word in Spanish; '¿qué significa...?' asks for a meaning." },
        { statement: "'¿Cómo?' on its own is a polite way to say 'pardon?'", truth: true, why: "It's the everyday 'sorry, what?' and is softer than a bare '¿qué?'." },
        { statement: "Saying 'no entiendo' usually makes people stop talking to you.", truth: false, why: "Most people slow down and simplify; silence ends conversations, not questions." },
      ],
      blanks: [
        { sentence: "'Más ___, por favor' asks someone to speak more slowly.", options: ["rápido", "despacio", "tarde"], answer: 1 },
        { sentence: "'¿Qué ___ esta palabra?' asks what this word means.", options: ["significa", "dice", "repite"], answer: 0 },
      ],
    },
    {
      id: "languages-6-3",
      title: "Ending a conversation kindly",
      hook: "A good goodbye takes ten seconds and four small steps. Get it right and people remember the whole conversation warmly.",
      steps: [
        { label: "Signal", text: "Say 'bueno...' (sounds like 'bweh-no') and pause. It means 'well...' and warns the other person that a goodbye is coming." },
        { label: "Reason", text: "Give a short reason. 'Tengo que irme' means 'I have to go'. You can add why: 'el autobús sale pronto', the bus leaves soon." },
        { label: "Warm line", text: "Say something kind. 'Fue un placer' means 'it was a pleasure'. 'Gracias por el café' means 'thanks for the coffee'." },
        { label: "Goodbye", text: "Finish with a goodbye that fits. 'Hasta luego' is 'see you later'. 'Nos vemos' is 'see you'. 'Cuídate' (sounds like 'kwee-da-teh') is 'take care'." },
      ],
      analogy: "Ending a conversation is like landing a plane. You don't just switch off the engines; you slow down, signal, and touch down gently.",
      story: [
        "Hannah had been chatting with her elderly neighbour, Don Rafael, on a bench outside their block of flats in Seville. He was telling her about the orange trees along the street. She liked him, but her bus left in ten minutes and she didn't know how to stop without seeming rude.",
        "She remembered the four steps. 'Bueno...' she said, and let the word hang for a moment. Don Rafael paused and looked up. 'Tengo que irme, el autobús sale pronto.' He nodded, not offended in the least. 'Fue un placer,' she added, and she meant it.",
        "'Igualmente,' he said. 'Hasta luego, Hannah.' She chose the polite form for an older neighbour. 'Hasta luego, cuídese.' Walking to the bus stop, she realised the conversation had ended the way it had started, warmly and on purpose.",
      ],
      deepRead: [
        "Leaving a conversation well is a skill in every language, and Spanish speakers tend to do it in four short moves. First, a signal: 'bueno...' (well...) said with a small pause, or the longer 'bueno, pues...'. Second, a reason: 'tengo que irme' (I have to go), 'se hace tarde' (it's getting late) or 'me esperan en casa' (they're expecting me at home). Third, a warm line: 'fue un placer' (it was a pleasure), 'gracias por el café' (thanks for the coffee) or, after meeting someone for the first time, 'encantado de conocerte' if you're male and 'encantada de conocerte' if you're female. Fourth, the goodbye itself.",
        "Choose the goodbye to fit the moment. 'Hasta luego' (see you later) is the everyday default and promises nothing. 'Nos vemos' (see you) is casual and friendly. 'Hasta mañana' means 'see you tomorrow', so use it only when that's true. 'Adiós' is correct, but on its own it can feel final, like a door closing. Then match the person. 'Cuídate' (take care) and 'que tengas un buen día' (have a good day) are for friends; 'cuídese' and 'que tenga un buen día' are the polite forms for elders and strangers. A worked example, leaving a friend's flat after dinner: 'Bueno, se hace tarde. Tengo que irme. Gracias por la cena, estaba riquísima. Nos vemos el viernes.' Signal, reason, warm line, goodbye, in about ten seconds.",
      ],
      example: {
        question: "You've had coffee with a new friend and need to leave. Which do you say first?",
        options: ["Hasta luego.", "Fue un placer.", "Bueno... tengo que irme."],
        answer: 2,
        why: "The signal and reason come first; the warm line and goodbye follow.",
      },
      keyPoints: [
        "A good goodbye has four steps: signal, reason, warm line, goodbye.",
        "'Bueno, tengo que irme' signals and explains in just four words.",
        "Match the goodbye to the person: 'cuídate' for friends, 'cuídese' for elders and strangers.",
      ],
      misconception: {
        belief: "When I need to leave, I just say 'adiós' and go.",
        correction: "A bare 'adiós' can feel abrupt, like hanging up mid-sentence. Spanish speakers usually signal first with 'bueno...', give a small reason and add a warm line before the goodbye. It takes ten seconds and leaves the other person feeling good.",
      },
      quiz: [
        { question: "In the four-step goodbye, which line is the warm line?", options: ["Fue un placer.", "Bueno...", "Tengo que irme."], answer: 0, why: "'It was a pleasure' is the kind words; 'bueno' is the signal and 'tengo que irme' is the reason." },
        { question: "You're saying goodbye to your friend's grandmother. Which is the polite form of 'take care'?", options: ["Cuídate", "Cuídese", "Cuidado"], answer: 1, why: "'Cuídese' is the usted form for elders and strangers; 'cuídate' is for friends, and 'cuidado' means 'careful'." },
        { question: "Which goodbye means 'see you tomorrow'?", options: ["Hasta luego", "Hasta pronto", "Hasta mañana"], answer: 2, why: "'Mañana' means 'tomorrow'; 'luego' is 'later' and 'pronto' is 'soon'." },
      ],
      pairs: [
        { term: "Bueno...", match: "Well... (the signal that a goodbye is coming)" },
        { term: "Tengo que irme", match: "I have to go" },
        { term: "Fue un placer", match: "It was a pleasure" },
        { term: "Nos vemos", match: "See you" },
        { term: "Cuídate", match: "Take care" },
      ],
      order: {
        prompt: "Put the four-step goodbye in the order this lesson teaches.",
        items: [
          "Bueno... (Well...)",
          "Tengo que irme. (I have to go.)",
          "Fue un placer. (It was a pleasure.)",
          "Hasta luego. (See you later.)",
        ],
      },
      blitz: [
        { statement: "Saying 'bueno...' with a pause signals that you're about to leave.", truth: true, why: "It's the Spanish 'well...', a gentle warning that a goodbye is coming." },
        { statement: "'Cuídese' is the form of 'take care' you'd use with a close friend.", truth: false, why: "'Cuídese' is the polite usted form; with a friend you say 'cuídate'." },
        { statement: "'Nos vemos' literally means 'we see each other'.", truth: true, why: "It's used as a casual 'see you'." },
        { statement: "'Hasta mañana' is a safe goodbye for anyone at any time.", truth: false, why: "It means 'see you tomorrow', so use it only if you'll meet tomorrow." },
      ],
      blanks: [
        { sentence: "'Tengo que ___' means 'I have to go'.", options: ["irme", "venir", "quedarme"], answer: 0 },
        { sentence: "'Fue un ___' means 'it was a pleasure'.", options: ["favor", "momento", "placer"], answer: 2 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
