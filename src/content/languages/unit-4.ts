// Languages, unit 4: Asking and answering. Spanish throughout.
import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 4,
  title: "Asking and answering",
  summary:
    "After this unit you can ask yes-or-no and detail questions in Spanish, answer them in full sentences, and hand the question back with '¿Y tú?'.",
  concepts: [
    {
      id: "languages-4-1",
      title: "Ask a yes-or-no question with your voice",
      hook: "In Spanish you don't need a helper word like 'do'. Say the sentence, lift your voice at the end, and it becomes a question.",
      steps: [
        {
          label: "Start flat",
          text: "Begin with a plain sentence you already know. 'Tienes un perro' means 'you have a dog'. Said in a flat voice, it is simply a fact.",
        },
        {
          label: "Lift the end",
          text: "Now say the same words, but let your voice rise on the last word. '¿Tienes un perro?' means 'do you have a dog?'. Nothing else has changed.",
        },
        {
          label: "Add the marks",
          text: "In writing, Spanish puts an upside-down question mark at the start and a normal one at the end. The first mark warns the reader that a question is coming.",
        },
        {
          label: "Answer short",
          text: "Answer with 'sí' (sounds like 'see') for yes, or 'no' for no. Then repeat the verb: 'Sí, tengo un perro' or 'No, no tengo un perro'.",
        },
      ],
      analogy:
        "It works like English 'You're coming?' said with a raised eyebrow. The words match the statement, but the tune of your voice turns them into a question.",
      story: [
        "Nadia was staying with a host family in Seville and wanted to know if there was milk in the fridge. She knew the words 'hay leche', which mean 'there is milk'. But how did you turn that into a question? In English she would need 'is there'.",
        "She decided to try the trick from her lesson. She said the two words exactly as before, but let her voice climb on 'leche', like the end of a hum. '¿Hay leche?' Her host, Carmen, looked up from the paper and said 'Sí, hay leche. En la puerta.' Yes, there is milk. In the door.",
        "Nadia grinned. No new words, no extra grammar. She had asked a real question in Spanish by changing nothing but the tune. At dinner she tried it again: '¿Hay pan?' Is there bread? Carmen passed the basket without even looking up.",
      ],
      deepRead: [
        "Spanish has three ways to ask a yes-or-no question, and the simplest is pure intonation. Take any statement, keep the word order, and raise the pitch of your voice on the final syllable. 'Hablas inglés' (you speak English) becomes '¿Hablas inglés?' (do you speak English?). English needs a helper verb such as 'do' or 'does', or has to swap the subject and verb, as in 'Are you coming?'. Spanish needs neither. That is why the written language marks both ends of a question: the opening mark tells a reader to start the rising tune before they reach the end.",
        "The second way is to move the subject after the verb, which sounds a little more formal or emphatic: '¿Tiene usted hijos?' (do you have children?). The third is to add a small tag to a normal statement, such as '¿verdad?' (right?) or '¿no?': 'Vives aquí, ¿no?' (you live here, don't you?). All three are correct and all three are common in everyday speech.",
        "Answering follows a fixed pattern. 'Sí' (with an accent, meaning yes) or 'no' comes first, then the verb is repeated. Worked example: someone asks '¿Tienes hermanos?' (do you have brothers or sisters?). A full positive answer is 'Sí, tengo dos hermanos'. A full negative answer is 'No, no tengo hermanos'. The first 'no' answers the question and the second makes the verb negative, so the doubled word is normal Spanish, not a slip. Without the accent, 'si' means 'if', so the small mark on 'sí' carries real meaning.",
      ],
      example: {
        question: "Your friend says 'Vives en Madrid' (you live in Madrid) as a flat statement. How do you turn it into 'do you live in Madrid?'",
        options: [
          "Add the helper word 'do' at the front, as you would in English",
          "Keep the same words and let your voice rise at the end",
          "Put 'Madrid' first, then 'vives en'",
        ],
        answer: 1,
        why: "Spanish needs no helper word; the same words with a rising tune already make a question.",
      },
      keyPoints: [
        "A Spanish statement becomes a yes-or-no question when your voice rises at the end, with no helper word needed.",
        "In writing, a question starts with an upside-down question mark and ends with a normal one.",
        "Answer with 'sí' or 'no' and then repeat the verb, so 'No, no tengo' is normal Spanish, not a mistake.",
      ],
      misconception: {
        belief: "I need a Spanish word for 'do' to start a question, like 'do you have' in English.",
        correction:
          "Spanish has no helper word for questions. 'Tienes un perro' and '¿Tienes un perro?' use exactly the same words; only the rising voice and the question marks change. Adding an extra word would sound wrong to a Spanish speaker.",
      },
      quiz: [
        {
          question: "Which of these is written correctly as a Spanish question?",
          options: ["Tienes un gato?", "¿Tienes un gato", "¿Tienes un gato?"],
          answer: 2,
          why: "A written question needs the upside-down mark at the start and the normal one at the end.",
        },
        {
          question: "Someone asks '¿Hablas francés?' (do you speak French?). You don't. What is the natural full answer?",
          options: ["No, no hablo francés", "No, hablas francés", "Sí, no hablo francés"],
          answer: 0,
          why: "The first 'no' answers and the second makes 'hablo' (I speak) negative; 'hablas' would mean 'you speak'.",
        },
        {
          question: "What does a rising tune at the end of a Spanish sentence tell the listener?",
          options: ["The speaker is angry", "The sentence is a question", "The speaker has finished talking"],
          answer: 1,
          why: "Rising pitch on the last word is the signal for a yes-or-no question.",
        },
      ],
      pairs: [
        { term: "Sí", match: "Yes, written with an accent mark" },
        { term: "¿Hay leche?", match: "Is there milk?" },
        { term: "¿Tienes un perro?", match: "Do you have a dog?" },
        { term: "Rising voice", match: "The tune that turns a statement into a question" },
        { term: "Opening mark ¿", match: "Warns the reader that a question is starting" },
      ],
      order: {
        prompt: "Put the steps of asking and answering a yes-or-no question in order.",
        items: [
          "Start with a plain statement, such as 'Tienes un gato'",
          "Let your voice rise on the last word to make it a question",
          "The other person answers 'sí' or 'no' first",
          "They repeat the verb, such as 'tengo' or 'no tengo'",
        ],
      },
      blitz: [
        {
          statement: "Spanish needs a helper word like 'do' to ask a yes-or-no question.",
          truth: false,
          why: "The same words as the statement, said with a rising voice, already make a question.",
        },
        {
          statement: "A written Spanish question has a mark at both the start and the end.",
          truth: true,
          why: "The upside-down mark opens it and the normal one closes it.",
        },
        {
          statement: "'No, no tengo' is a mistake because 'no' is said twice.",
          truth: false,
          why: "The first 'no' answers the question and the second makes the verb negative.",
        },
        {
          statement: "'Sí' with an accent mark means yes.",
          truth: true,
          why: "Without the accent, 'si' means 'if', so the little mark matters.",
        },
      ],
      blanks: [
        {
          sentence: "To turn 'Vives aquí' into a question, let your voice ___ on the last word.",
          options: ["rise", "fall", "stop"],
          answer: 0,
        },
        {
          sentence: "Someone asks '¿Tienes hambre?' and you are hungry, so you answer '___, tengo hambre'.",
          options: ["No", "Sí", "Hay"],
          answer: 1,
        },
      ],
    },
    {
      id: "languages-4-2",
      title: "Question words and their accent marks",
      hook: "When yes or no isn't enough, a question word at the front asks for the detail you want. Spanish has a small set, and each one wears an accent mark.",
      steps: [
        {
          label: "Meet the set",
          text: "Qué (what, sounds like 'keh'), quién (who), dónde (where), cuándo (when), cómo (how), por qué (why) and cuánto (how much or how many). These seven words cover almost every question you will ask.",
        },
        {
          label: "Put it first",
          text: "The question word goes at the very front, right after the opening mark. '¿Dónde está el baño?' means 'where is the bathroom?'. The rest of the sentence follows as normal.",
        },
        {
          label: "Spot the accent",
          text: "Every question word carries an accent mark and gets a little extra stress in your voice. Without the mark, 'que' means 'that' and 'como' means 'like'. The mark shows you are asking.",
        },
        {
          label: "Say them",
          text: "Dónde sounds like 'DON-deh', cuándo like 'KWAN-doh', cómo like 'KOH-moh' and quién like 'kee-EN'. Por qué is two words, 'por KEH'. Practise them in a row until they feel easy.",
        },
      ],
      analogy:
        "Question words are like the labelled drawers in a kitchen. Open 'dónde' and you find places, open 'cuándo' and you find times. The label tells you what kind of answer is inside before you look.",
      story: [
        "Leo stood in front of a fruit stall in a market in Valencia, holding a bag of oranges and no idea what to say. He knew plenty of words, but a shrug and a pointed finger felt rude. Then he remembered the small set of question words from his lessons.",
        "He took a breath and tried 'Perdón, ¿cuánto cuesta?' Excuse me, how much does it cost? The stallholder, a woman called Rosa, smiled and said 'Tres euros'. Three euros. It had worked. Feeling bolder, Leo pointed at a strange green fruit and asked '¿Qué es?' What is it? 'Chirimoya,' Rosa said, and cut him a slice to try.",
        "By the time he left, Leo had asked '¿Dónde está la salida?' to find the way out and '¿Cuándo cierra?' to learn when the market closed. Four small words, and the whole market had opened up to him.",
      ],
      deepRead: [
        "The Spanish question words are qué (what), quién (who), dónde (where), cuándo (when), cómo (how), por qué (why), cuánto (how much, with cuántos and cuántas for how many) and cuál (which). Each carries a written accent when it asks a question, and that accent marks a real difference in meaning. 'Que' without the accent means 'that', and 'porque' as one unaccented word means 'because'. So '¿Por qué estudias?' asks why you study, and 'Estudio porque me gusta' answers that you study because you enjoy it.",
        "The question word sits at the front, straight after the opening mark, and the verb usually comes right after it. Where English says 'Where do you live?', Spanish says '¿Dónde vives?', with no helper word and no separate word for 'you', because the verb ending already shows who is meant. Worked example: to ask a colleague what time the meeting starts, begin with qué, then the noun and verb: '¿A qué hora empieza la reunión?' (at what time does the meeting start?). A small word such as 'a' (at) or 'de' (from) goes before the question word, never at the end: '¿De dónde eres?' puts 'de' first.",
        "Cuánto agrees with the noun it counts. '¿Cuánto cuesta?' (how much does it cost?) is singular, but '¿Cuántas manzanas quieres?' (how many apples do you want?) takes the feminine plural to match manzanas. Learners mix up qué and cuál most often: qué asks for an open answer or a definition, while cuál picks from a known set, as in '¿Cuál prefieres, el rojo o el azul?' (which do you prefer, the red or the blue?).",
      ],
      example: {
        question: "You want to know where the train station is. Which question word starts your sentence?",
        options: ["Cuándo", "Quién", "Cuánto", "Dónde"],
        answer: 3,
        why: "Dónde asks for a place; cuándo asks for a time, quién for a person and cuánto for an amount.",
      },
      keyPoints: [
        "Spanish question words such as qué, quién, dónde, cuándo, cómo, por qué and cuánto go at the front of the sentence.",
        "Each question word wears an accent mark, which separates it from a look-alike word with a different meaning.",
        "Por qué in two words asks why, while porque in one word answers with because.",
      ],
      misconception: {
        belief: "The accent marks on question words are just decoration, so I can leave them off.",
        correction:
          "The accent changes the meaning. 'Qué' with the accent asks 'what?', but 'que' without it means 'that'. 'Por qué' asks why, while 'porque' means because. The mark also tells you to stress that word when you speak, which is how listeners hear it as a question.",
      },
      quiz: [
        {
          question: "Which of these means 'why'?",
          options: ["Porque", "Por qué", "Cuándo"],
          answer: 1,
          why: "Por qué, two words with an accent, asks why; porque, one word, means because.",
        },
        {
          question: "What does '¿Cómo te llamas?' ask?",
          options: ["What is your name?", "How are you?", "Where do you live?"],
          answer: 0,
          why: "Literally 'how do you call yourself'; 'how are you?' would be '¿Cómo estás?'.",
        },
        {
          question: "Which sentence puts the accent mark in the right place?",
          options: ["¿Donde vives?", "¿Dondé vives?", "¿Dónde vives?"],
          answer: 2,
          why: "The accent sits on the first 'o' of dónde, which is the syllable you stress.",
        },
      ],
      pairs: [
        { term: "Dónde", match: "Where" },
        { term: "Cuándo", match: "When" },
        { term: "Quién", match: "Who" },
        { term: "Cuánto", match: "How much or how many" },
        { term: "Por qué", match: "Why" },
      ],
      order: {
        prompt: "Put the parts of the written question '¿De dónde eres?' in the order they appear.",
        items: [
          "The opening question mark",
          "The small word 'de', meaning from",
          "The question word 'dónde'",
          "The verb 'eres' and the closing mark",
        ],
      },
      blitz: [
        {
          statement: "The question word usually goes at the front of a Spanish question.",
          truth: true,
          why: "It comes right after the opening mark, with the verb following it.",
        },
        {
          statement: "'Porque' as one word is how you ask why.",
          truth: false,
          why: "'Por qué' in two words asks why; 'porque' means because.",
        },
        {
          statement: "'Cuándo' asks about time.",
          truth: true,
          why: "It means 'when', as in '¿Cuándo es la fiesta?' (when is the party?).",
        },
        {
          statement: "'Quién' means 'where'.",
          truth: false,
          why: "'Quién' means 'who'; 'dónde' is the word for 'where'.",
        },
      ],
      blanks: [
        {
          sentence: "To ask what time it is, say '¿___ hora es?'",
          options: ["Cuándo", "Qué", "Cómo"],
          answer: 1,
        },
        {
          sentence: "'¿___ años tienes?' asks how old you are, literally how many years you have.",
          options: ["Cuántos", "Cuándo", "Dónde"],
          answer: 0,
        },
      ],
    },
    {
      id: "languages-4-3",
      title: "Answer in full, then ask back",
      hook: "A one-word answer ends the chat. Reuse the verb from the question, add the detail asked for, and hand the question back with '¿Y tú?'.",
      steps: [
        {
          label: "Hear the verb",
          text: "The question already contains the verb you need. '¿Dónde vives?' (where do you live?) gives you 'vives'. Grab it, because your answer will use the same verb.",
        },
        {
          label: "Flip to 'I'",
          text: "The question is about you, so its verb is in the 'you' form. Switch it to the 'I' form: vives becomes vivo, tienes becomes tengo, eres becomes soy.",
        },
        {
          label: "Add the detail",
          text: "Give the kind of answer the question word asked for. Dónde wants a place: 'Vivo en Leeds'. Cuántos wants a number: 'Tengo diez años'. Por qué wants 'porque' and a reason.",
        },
        {
          label: "Ask back",
          text: "Finish with '¿Y tú?' (and you?, sounds like 'ee too') to a friend, or '¿Y usted?' to someone older or in charge. Now they answer, and the talk keeps going.",
        },
      ],
      analogy:
        "It is like a game of catch. You catch the ball (the question), hold it for a moment (your answer), and throw it back (¿Y tú?). Drop it with a bare 'sí' and the game stops.",
      story: [
        "Grace had joined a language exchange in a Madrid café, and her partner, Diego, opened with '¿De dónde eres?' She knew it meant 'where are you from?'. Her first instinct was to say 'Bristol' and stop. Instead she took the verb he had used, 'eres', and flipped it to the 'I' form.",
        "'Soy de Bristol,' she said. I'm from Bristol. Then, remembering the trick from her lesson, she added '¿Y tú?' Diego's face lit up. 'Soy de Sevilla,' he replied, and asked '¿Cuántos años tienes?' Grace heard 'tienes' and knew her answer needed 'tengo'. 'Tengo veintidós años. ¿Y tú?'",
        "Twenty minutes later they were still talking. Each time Diego asked something, Grace listened for the verb, flipped it, added the detail and threw the question back. She hadn't learnt a single new word that afternoon, but she had held her first proper back-and-forth in Spanish.",
      ],
      deepRead: [
        "A full answer in Spanish is built from the question itself. Because verb endings show who is doing the action, a question aimed at you arrives in the 'tú' form (or the 'usted' form in polite speech), and your answer moves the same verb into the 'yo' form. The most common swaps are tienes to tengo (have), vives to vivo (live), eres to soy (are, am), hablas to hablo (speak), quieres to quiero (want) and te gusta to me gusta (you like, I like). The word 'yo' itself is usually dropped, since 'tengo' can only mean 'I have'.",
        "The question word tells you what kind of information to supply. Worked example: '¿Por qué estudias español?' (why do you study Spanish?). The verb is 'estudias', so the answer starts with 'estudio'. The question word is 'por qué', so the answer needs 'porque' (because) plus a reason: 'Estudio español porque mi abuela es de Perú' (I study Spanish because my grandmother is from Peru). For '¿Cuándo llegas?' (when do you arrive?) you give a time: 'Llego a las ocho' (I arrive at eight). For '¿Cuántos hermanos tienes?' you give a number: 'Tengo dos'.",
        "Returning the question is what makes the exchange feel natural. '¿Y tú?' (and you?) is the informal form for friends, children and people your own age. '¿Y usted?' is the polite form for strangers, older people and anyone you would call 'sir' or 'madam'. After a question about liking, the return is '¿Y a ti?', because gustar works with 'a ti' rather than 'tú': 'Me gusta el café. ¿Y a ti?'.",
      ],
      example: {
        question: "Someone asks '¿Tienes mascotas?' (do you have pets?). You have one cat. Which is the best full answer?",
        options: ["Sí, tienes un gato. ¿Y tú?", "Sí, tengo un gato. ¿Y tú?", "Sí, gato"],
        answer: 1,
        why: "'Tienes' means you have; the answer needs 'tengo' (I have), and '¿Y tú?' passes the question back.",
      },
      keyPoints: [
        "Take the verb from the question and switch it to the 'I' form, so tienes becomes tengo and vives becomes vivo.",
        "Give the kind of detail the question word asked for: a place for dónde, a time for cuándo, a reason with porque for por qué.",
        "Pass the question back with '¿Y tú?' to a friend or '¿Y usted?' to someone you should be polite to.",
      ],
      misconception: {
        belief: "If I answer with the same verb the question used, I've got it right.",
        correction:
          "The verb has to change person. '¿Tienes un perro?' uses 'tienes' (you have), but your answer is about yourself, so it needs 'tengo' (I have). Repeating 'tienes' would mean 'yes, you have a dog', which answers for the wrong person.",
      },
      quiz: [
        {
          question: "A friend asks '¿Dónde vives?' What kind of detail should your answer contain?",
          options: ["A place", "A time", "A reason"],
          answer: 0,
          why: "Dónde asks where, so the answer is a place, such as 'Vivo en Cardiff'.",
        },
        {
          question: "How would you answer '¿Por qué aprendes español?' (why are you learning Spanish?) about yourself?",
          options: ["Aprendes español porque me gusta", "Aprendo español porque me gusta", "Aprendo español por qué me gusta"],
          answer: 1,
          why: "'Aprendo' is the 'I' form and 'porque' in one word means because; 'aprendes' would mean 'you learn'.",
        },
        {
          question: "You are talking to your friend's grandmother and want to ask her question back. What do you say?",
          options: ["¿Y tú?", "¿Y yo?", "¿Y usted?"],
          answer: 2,
          why: "'Usted' is the polite 'you' for older people and strangers; '¿Y yo?' would mean 'and me?'.",
        },
      ],
      pairs: [
        { term: "Tienes", match: "You have" },
        { term: "Tengo", match: "I have" },
        { term: "¿Y tú?", match: "And you? (to a friend)" },
        { term: "¿Y usted?", match: "And you? (polite form)" },
        { term: "Porque", match: "Because" },
      ],
      order: {
        prompt: "Put the steps of a full answer to '¿Dónde vives?' in order.",
        items: [
          "Hear the verb 'vives' in the question",
          "Flip it to the 'I' form, 'vivo'",
          "Add the place: 'Vivo en Glasgow'",
          "Pass it back with '¿Y tú?'",
        ],
      },
      blitz: [
        {
          statement: "To answer '¿Tienes hermanos?' you say 'Sí, tienes dos'.",
          truth: false,
          why: "'Tienes' means you have; an answer about yourself needs 'tengo'.",
        },
        {
          statement: "'¿Y tú?' hands the question back to the other person.",
          truth: true,
          why: "It means 'and you?' and invites them to answer the same question.",
        },
        {
          statement: "'¿Y usted?' is the polite way to ask the question back.",
          truth: true,
          why: "'Usted' is the formal 'you' for strangers and older people.",
        },
        {
          statement: "A question starting with 'cuándo' should be answered with a place.",
          truth: false,
          why: "'Cuándo' means when, so it wants a time; 'dónde' wants a place.",
        },
      ],
      blanks: [
        {
          sentence: "'¿Hablas inglés?' is answered with 'Sí, ___ inglés', because the answer is about me.",
          options: ["hablas", "hablo", "habla"],
          answer: 1,
        },
        {
          sentence: "To pass a question back to a friend, say '¿Y ___?'",
          options: ["tú", "yo", "usted"],
          answer: 0,
        },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
