import type { UnitContent } from "@/content/types";

const unit = {
  subject: "languages",
  unit: 2,
  title: "Everyday words",
  summary: "After this unit you can count to ten in Spanish, say please, thank you and sorry, and name everyday things with the right el or la.",
  concepts: [
    {
      id: "languages-2-1",
      title: "Counting from one to ten",
      hook: "Ten small words let you buy apples, order coffees or say how many you want. Spanish numbers one to ten are the most useful words you'll learn this week.",
      steps: [
        { label: "One to five", text: "Uno, dos, tres, cuatro, cinco. Uno sounds like 'OO-no' and cuatro sounds like 'KWAH-tro'. Say them on the fingers of one hand, one finger each." },
        { label: "Six to ten", text: "Seis, siete, ocho, nueve, diez. Seis sounds like 'say' with an s on the end. Diez sounds like 'dee-ESS'. Now the other hand joins in." },
        { label: "Sound-alikes", text: "Seis and siete sound alike at the start. The ending tells them apart: seis ends in a hiss, siete ends in 'teh'. Dos and diez both begin with d, so listen to the finish." },
        { label: "Count real things", text: "Point at things and count them in Spanish. Tres manzanas is three apples. Dos cafés is two coffees. Numbers stick when they count something you can see." },
      ],
      analogy: "Learning the numbers is like learning a phone number. Say the whole string in the same rhythm a few times, and your mouth remembers it before your head does.",
      story: [
        "Maya stood in a bakery in Seville holding a five-euro note and a plan. She wanted three bread rolls for her family. The baker looked at her and waited. Her mind went blank, so she did what she had practised on the plane. Under the counter, she counted on her fingers. Uno, dos, tres.",
        "'Tres,' she said, and held up three fingers to be safe. The baker smiled, dropped three rolls into a paper bag and said a price. Maya didn't catch the words, but the number glowed on the till, so she paid and said gracias.",
        "On the way out she counted the rolls again in Spanish, just to prove she could. Uno, dos, tres. Tomorrow, she decided, she would come back and ask for cuatro.",
      ],
      deepRead: [
        "The Spanish numbers from one to ten are uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve and diez. Zero is cero. Most are said the way they look, with every vowel sounded: uno is 'OO-no', tres is 'tress', ocho is 'OH-cho' and nueve is 'NWEH-veh'. Two letters shift depending on where you are. In Latin America, the c in cinco and the z in diez sound like an s, giving 'SEEN-ko' and 'dee-ESS'. In most of Spain they sound like the th in 'thin', giving 'THEEN-ko' and 'dee-ETH'. Both are correct, and everyone understands both.",
        "One number changes shape when it counts something. On its own, one is uno. Before a thing, it shortens to un for el words and una for la words: un café is one coffee, una mesa is one table. The other nine never change. Two coffees is simply dos cafés, and three apples is tres manzanas.",
        "Here is a worked example from a café. You want two coffees and one piece of toast. Coffee is café, toast is tostada, and the word for 'and' is y, which sounds like 'ee'. So you say: dos cafés y una tostada. Notice that dos stays dos, but one becomes una because tostada is a la word. If the waiter brings three coffees by mistake, hold up two fingers and say dos again. Numbers plus fingers will get you through almost any shop or market in the Spanish-speaking world.",
      ],
      example: {
        question: "You want to order three coffees. Which number do you say?",
        options: ["dos", "seis", "tres"],
        answer: 2,
        why: "Tres is three; dos is two and seis is six.",
      },
      keyPoints: [
        "The Spanish numbers one to ten are uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.",
        "Seis is six and siete is seven, so listen to the ending to tell them apart.",
        "Before a thing you are counting, uno becomes un or una, as in un café or una mesa.",
      ],
      misconception: {
        belief: "One is uno, so one book must be uno libro.",
        correction: "Before a thing, uno shortens to un for el words and una for la words: un libro, una casa. It stays uno only when you count on its own.",
      },
      quiz: [
        { question: "What is the Spanish word for seven?", options: ["seis", "siete", "ocho"], answer: 1, why: "Siete is seven; seis is six and ocho is eight." },
        { question: "A stallholder says the price is 'nueve'. How many euros is that?", options: ["Nine", "Ten", "Four"], answer: 0, why: "Nueve is nine; it sounds close to nuevo, which means new, so listen for the last letter." },
        { question: "Which list counts correctly from one to four?", options: ["uno, dos, cuatro, tres", "uno, tres, dos, cuatro", "uno, dos, tres, cuatro"], answer: 2, why: "One, two, three, four is uno, dos, tres, cuatro." },
      ],
      pairs: [
        { term: "cinco", match: "Five, the fingers on one hand" },
        { term: "diez", match: "Ten, all the fingers on both hands" },
        { term: "siete", match: "Seven, the days in a week" },
        { term: "dos", match: "Two, a pair of shoes" },
        { term: "ocho", match: "Eight, the legs on a spider" },
      ],
      order: { prompt: "Put these numbers in counting order, smallest first.", items: ["dos", "cuatro", "siete", "nueve"] },
      blitz: [
        { statement: "Cuatro means four.", truth: true, why: "Cuatro is four; it sounds a little like 'quarter'." },
        { statement: "Seis means seven.", truth: false, why: "Seis is six; seven is siete." },
        { statement: "Diez is the Spanish word for ten.", truth: true, why: "Diez is ten; it sounds like 'dee-ESS' or, in Spain, 'dee-ETH'." },
        { statement: "Nueve means new.", truth: false, why: "Nueve is nine; nuevo, with an o, means new." },
      ],
      blanks: [
        { sentence: "In Spanish, the number that comes after tres is ___.", options: ["cuatro", "cinco", "dos"], answer: 0 },
        { sentence: "The Spanish word ___ means eight.", options: ["seis", "nueve", "ocho"], answer: 2 },
      ],
    },
    {
      id: "languages-2-2",
      title: "Please, thank you and sorry",
      hook: "A polite word turns a stranger into a helper. In Spanish, por favor and gracias do most of that work, and they cost nothing.",
      steps: [
        { label: "Please", text: "Por favor means please. It sounds like 'por fa-VOR'. Put it at the end of anything you ask for: un café, por favor." },
        { label: "Thank you", text: "Gracias means thank you. It sounds like 'GRAH-see-as'. For a bigger thank you, say muchas gracias, which means many thanks." },
        { label: "You're welcome", text: "De nada is the reply to gracias. Word for word it means 'of nothing', as in 'it was nothing'. It sounds like 'deh NAH-da'." },
        { label: "Sorry", text: "Perdón is for small things, like bumping someone or squeezing past. Lo siento is for real regret, like hearing bad news. It means 'I feel it'." },
      ],
      analogy: "Polite words are the oil on a bike chain. The bike still moves without them, but everything grinds, and everyone hears the squeak.",
      story: [
        "Graham had been in Madrid for two days and had said hola to everyone, but nothing else. On the bus that morning he needed to get past a woman with shopping bags. He froze. Then the word came. 'Perdón.' She shifted her bags at once and nodded.",
        "At the next stop he dropped his ticket. A teenager picked it up and handed it back. 'Gracias,' Graham said, and this time it came out without thinking. 'De nada,' the boy replied, and went back to his phone.",
        "Graham sat down feeling ten years younger. Two little words, and the city had started talking back. At a café that afternoon he tried a third. 'Un café, por favor.' It worked.",
      ],
      deepRead: [
        "Four phrases carry most everyday politeness in Spanish. Por favor (please) can go at the start or the end of a request. Gracias (thank you) is heard everywhere; in most of Spain the c sounds like th, 'GRAH-thee-as', and in Latin America like an s. The standard reply is de nada, 'of nothing', meaning it was no trouble. Muchas gracias means many thanks, and you'll hear it after any real favour.",
        "Sorry splits in two. Perdón, which sounds like 'per-DON', is the light one: say it when you bump someone, need to get past, or didn't hear and want them to repeat. Disculpe, 'dis-KOOL-peh', does the same job when you want a stranger's attention politely, such as a waiter or a shop assistant. Lo siento, 'lo see-EN-to', means 'I feel it' and is for genuine regret: you broke something, you're late, someone has had bad news. Using lo siento for a small bump sounds oddly dramatic, like saying 'I am so deeply sorry' after brushing past someone.",
        "Two more tiny words finish the set. Sí means yes and carries an accent on the i; without it, si means 'if'. No is the same as in English. Here is a whole exchange using only this unit's words. You want a bottle of water at a kiosk. 'Perdón.' The seller looks up. 'Una botella de agua, por favor.' She hands it over and says a price; you pay. 'Gracias.' 'De nada.' Not one full sentence, and it all worked.",
      ],
      example: {
        question: "Someone holds a door open for you. What do you say?",
        options: ["Gracias", "De nada", "Por favor"],
        answer: 0,
        why: "Gracias is thank you; de nada is what they might say back.",
      },
      keyPoints: [
        "Por favor means please and gracias means thank you, and they fit any request.",
        "De nada is the reply to gracias and means 'it was nothing'.",
        "Perdón is for small bumps and getting attention, while lo siento is for real regret.",
      ],
      misconception: {
        belief: "De nada must mean 'no thanks', because nada means nothing.",
        correction: "De nada is what you say after someone thanks you. It means 'it was nothing', like 'you're welcome'. To turn something down politely, say no, gracias.",
      },
      quiz: [
        { question: "You bump someone's elbow on a crowded train. What do you say?", options: ["Lo siento", "Perdón", "De nada"], answer: 1, why: "Perdón covers small bumps and squeezing past; lo siento is for something you truly regret." },
        { question: "What does gracias mean?", options: ["Please", "Goodbye", "Thank you"], answer: 2, why: "Gracias is thank you; please is por favor and goodbye is adiós." },
        { question: "Someone thanks you for picking up their ticket. What do you reply?", options: ["De nada", "Por favor", "Gracias"], answer: 0, why: "De nada, 'it was nothing', is the standard reply to thanks." },
      ],
      pairs: [
        { term: "por favor", match: "Please, added to any request" },
        { term: "gracias", match: "Thank you" },
        { term: "de nada", match: "You're welcome, literally 'of nothing'" },
        { term: "perdón", match: "Sorry for a small bump, or excuse me" },
        { term: "lo siento", match: "I'm sorry, for real regret" },
      ],
      order: { prompt: "Put this café exchange in the order it happens.", items: ["Perdón, to catch the waiter's eye", "Un café, por favor", "Gracias, when the coffee arrives", "De nada, from the waiter"] },
      blitz: [
        { statement: "Gracias means thank you.", truth: true, why: "Gracias is thank you; you'll hear it dozens of times a day." },
        { statement: "De nada means no thanks.", truth: false, why: "De nada is you're welcome; to refuse something, say no, gracias." },
        { statement: "Lo siento is the phrase for real regret, like hearing bad news.", truth: true, why: "Lo siento means 'I feel it', so it carries real feeling." },
        { statement: "Por favor means thank you.", truth: false, why: "Por favor means please; thank you is gracias." },
      ],
      blanks: [
        { sentence: "To ask for something politely, finish with ___.", options: ["gracias", "por favor", "de nada"], answer: 1 },
        { sentence: "When someone thanks you, the friendly reply is ___.", options: ["perdón", "lo siento", "de nada"], answer: 2 },
      ],
    },
    {
      id: "languages-2-3",
      title: "Every noun is el or la",
      hook: "In Spanish, every thing belongs to a team: el or la. Learn a word with its little partner and you'll get it right for life.",
      steps: [
        { label: "Two little words", text: "Spanish has two words for 'the': el and la. Every thing gets one of them. El libro is the book. La mesa is the table." },
        { label: "Ends in o", text: "Most words that end in o take el: el libro (book), el perro (dog), el vaso (glass). Say el and the word together, as one chunk." },
        { label: "Ends in a", text: "Most words that end in a take la: la casa (house), la mesa (table), la puerta (door). La and a rhyme, which helps you remember." },
        { label: "Other endings", text: "Other endings you simply learn: el pan (bread), la leche (milk), el tren (train). Always learn a new word with its el or la, never on its own." },
      ],
      analogy: "Think of el and la as two team shirts. Every word wears one. Learn the word with its shirt on, and you'll never have to guess which team it plays for.",
      story: [
        "Priya covered her kitchen in sticky notes one Sunday afternoon. On the table: la mesa. On the door: la puerta. On a glass: el vaso. On the bread bin: el pan. Her son Arjun read them out and frowned. 'Why is the door a girl?'",
        "'It isn't,' Priya said. 'It's just which team the word plays for. Puerta ends in a, so it's on team la. Vaso ends in o, so it's team el.' She pointed at the bread. 'Pan doesn't end in either, so that one you just remember.'",
        "By Wednesday she noticed something. She wasn't saying 'mesa' any more. She was saying 'la mesa', as one word, without thinking. The little partner had stuck to the noun, which was exactly the point.",
      ],
      deepRead: [
        "Every Spanish noun is either masculine or feminine. This is grammar, not meaning: a table is not female and a book is not male. The article tells you the team. El goes with masculine words and la with feminine ones, and both translate as 'the'. Two patterns cover most words. Nouns ending in o are almost always masculine: el libro, el perro, el vaso. Nouns ending in a are usually feminine: la casa, la mesa, la puerta. Two endings are always feminine and worth knowing early: -ción, as in la estación (station), and -dad, as in la ciudad (city). A few common words break the o and a pattern: el día (day) and el mapa (map) take el, while la mano (hand) takes la.",
        "The team follows the word everywhere. The word for 'a' matches it: un libro, una casa. So does the plural 'the': el becomes los and la becomes las, as in los libros and las casas. Here is a worked example. You learn huevo, the word for egg. It ends in o, so you file it as el huevo. Without any extra study you now have un huevo (an egg), los huevos (the eggs) and, borrowing from this unit's numbers, dos huevos (two eggs). Learn the partner once and every form comes free.",
        "The practical habit is simple. Never write down a bare noun. Write la leche, not leche; el pan, not pan. Say the pair aloud as one chunk until it feels like a single word. Learners who skip this end up guessing for years. Ten seconds at the start saves all of that.",
      ],
      example: {
        question: "Which is the right way to say 'the house'?",
        options: ["el casa", "la casa", "los casa"],
        answer: 1,
        why: "Casa ends in a, so it takes la; los is for more than one.",
      },
      keyPoints: [
        "Spanish has two words for 'the', el and la, and every noun takes one of them.",
        "Words ending in o almost always take el, and words ending in a usually take la.",
        "Learn each new word together with its el or la, so you never have to guess later.",
      ],
      misconception: {
        belief: "La mesa is feminine, so Spanish speakers think of a table as female.",
        correction: "The el or la team is grammar, not meaning. A table has no sex; la is simply the word that goes with mesa. Even la persona (person) stays la whether the person is a man or a woman.",
      },
      quiz: [
        { question: "Which word goes with libro (book)?", options: ["el", "la", "las"], answer: 0, why: "Libro ends in o, so it takes el." },
        { question: "Puerta (door) ends in a. Which is correct?", options: ["el puerta", "la puerta", "un puerta"], answer: 1, why: "Words ending in a usually take la; un puerta mixes the teams." },
        { question: "Which of these breaks the o and a pattern?", options: ["la casa", "el libro", "la mano"], answer: 2, why: "Mano ends in o but takes la; it's an exception you simply learn." },
      ],
      pairs: [
        { term: "el libro", match: "The book, a team el word ending in o" },
        { term: "la casa", match: "The house, a team la word ending in a" },
        { term: "la mano", match: "The hand, an exception: ends in o but takes la" },
        { term: "el día", match: "The day, an exception: ends in a but takes el" },
        { term: "la leche", match: "The milk, ends in e, so you just learn it" },
      ],
      order: { prompt: "Put the steps for learning a new noun in order.", items: ["Hear or read the new word, such as mesa", "Look at its ending: mesa ends in a", "Pick its partner: a usually means la", "Say them together as one chunk: la mesa"] },
      blitz: [
        { statement: "Most Spanish words ending in o take el.", truth: true, why: "El libro, el perro, el vaso: o words are almost always team el." },
        { statement: "La mano follows the o rule.", truth: false, why: "Mano ends in o but takes la; it's a well-known exception." },
        { statement: "El and la both mean 'the'.", truth: true, why: "Spanish has two words for the, one for each team." },
        { statement: "Every word ending in a takes la, with no exceptions.", truth: false, why: "El día (day) and el mapa (map) end in a but take el." },
      ],
      blanks: [
        { sentence: "For 'the door' in Spanish you say ___ puerta.", options: ["el", "la", "los"], answer: 1 },
        { sentence: "A word ending in o, like vaso, almost always takes ___.", options: ["la", "una", "el"], answer: 2 },
      ],
    },
  ],
} satisfies UnitContent;

export default unit;
