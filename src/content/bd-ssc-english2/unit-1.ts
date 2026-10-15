import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-english2",
  unit: 1,
  title: "The Noun",
  titleBn: "বিশেষ্য",
  summary: "After this unit you can sort nouns into their five kinds, form plurals and match verbs and pronouns to a noun's number and gender, and write possessives and nouns in apposition correctly.",
  concepts: [
    {
      id: "bd-ssc-english2-1-1",
      title: "Five kinds of nouns",
      hook: "Every name in a sentence, from the Padma to honesty, is a noun. Knowing which of the five kinds it is tells you how it behaves.",
      steps: [
        { label: "Naming words", text: "A noun is a naming word. It may name a person, place or thing, and also a group, a substance or an idea. Rajshahi, girl, team, gold and bravery are all nouns." },
        { label: "Proper or common", text: "A proper noun names one particular person, place or thing, such as Alamgir, the Padma or English. It usually begins with a capital letter. A common noun, such as girl or city, names any member of a class." },
        { label: "Collective", text: "A collective noun names a group of people or things taken together as one whole, such as family, team, army and government. It can take either a singular or a plural verb." },
        { label: "Material and abstract", text: "A material noun names a substance, such as gold, rice, milk or oxygen, and it is uncountable. An abstract noun names a quality, state or idea, such as honesty, childhood or freedom." },
      ],
      analogy: "Sorting nouns is like sorting the stock of a shop in a Khulna bazaar. Some goods carry a brand name, some are ordinary items, some come in bundles, some are sold by weight, and some, like trust, never sit on a shelf at all.",
      story: [
        "Mitu, a class nine student in Sirajganj, was helping her grandfather at his rice stall in the weekly haat. Her English homework lay open on a sack: find the nouns around you and name their kind.",
        "She started with what she could see. Her grandfather's name, Abdul Karim, was a proper noun, so it began with a capital letter. Stall, sack and customer were common nouns. A woman bought rice and mustard oil, and Mitu wrote both as material nouns, because they are measured by the kilogram or the litre, not counted.",
        "Then a group of boys ran past with bats. 'That is our cricket team,' one shouted. Team, Mitu noted, was a collective noun: one word for many players. When the scale tipped, her grandfather added a handful of rice. 'Honesty keeps a shop alive,' he said. Mitu wrote honesty in her last column, abstract nouns, the ones you cannot touch.",
      ],
      deepRead: [
        "A noun is a naming word. The NCTB book sorts English nouns into five kinds. A proper noun is the name of a particular person, place or thing: Rajshahi, the Padma, Alamgir, History. It usually begins with a capital letter. A few proper nouns are plural in form but take a singular verb, as in 'The Maldives is an island country.' A common noun refers to every person, place or thing of the same class, so 'girl' may mean any girl in the world. It can be singular or plural: a city, many cities. A proper noun can even work as a common noun: 'There are two Raghibs in this class.'",
        "A collective noun is the name of a group of people or things taken together, spoken of as one whole: family, army, team, committee, Parliament. It can take a singular or a plural verb, as in 'The government has, or have, decided on a new pay scale.' A material noun names a substance that has weight but cannot be counted, whether solid, liquid or gas: gold, silver, sugar, milk, oil, oxygen. It is a mass noun, so it is uncountable. An abstract noun is the name of a quality, state or concept with no material form, shape or size: bravery, honesty, freedom, justice.",
        "Worked example: 'Tanvir's family keeps a herd of cows near Bogura, and their milk is known for its purity.' Tanvir and Bogura are proper nouns, family and herd are collective, cows is common, milk is material and purity is abstract.",
      ],
      example: {
        question: "Which noun in this sentence is abstract? 'Rafi's family showed great kindness to the flood victims in Sylhet.'",
        options: ["family", "kindness", "Sylhet", "victims"],
        answer: 1,
        why: "Kindness names a quality with no material form, shape or size, so it is an abstract noun.",
      },
      keyPoints: [
        "A noun is a naming word, and English has five kinds: proper, common, collective, material and abstract.",
        "A proper noun names one particular person, place or thing and begins with a capital letter, while a common noun names any member of a class.",
        "A collective noun names a group as one whole, a material noun names an uncountable substance, and an abstract noun names a quality, state or idea.",
      ],
      misconception: {
        belief: "Rice and sugar are made of many grains, so they are collective nouns.",
        correction: "A collective noun names a group of countable people or things taken as one whole, such as an army of soldiers or a herd of cattle. Rice and sugar are substances that we weigh, not count, so they are material nouns.",
      },
      quiz: [
        {
          question: "Which word in 'Mrs Rahman bought some gold from a jeweller in Khulna' is a material noun?",
          options: ["Rahman", "gold", "jeweller", "Khulna"],
          answer: 1,
          why: "Gold is a substance that has weight but cannot be counted, so it is a material noun.",
        },
        {
          question: "In which sentence is a proper noun used as a common noun?",
          options: ["He is called the Shakespeare of Bangladesh", "Shakespeare was born in 1564", "Shakespeare wrote many plays and poems"],
          answer: 0,
          why: "Here Shakespeare means the greatest dramatist, a kind of person, so the proper noun works as a common noun.",
        },
        {
          question: "What kind of noun is freedom?",
          options: ["Material noun", "Collective noun", "Abstract noun"],
          answer: 2,
          why: "Freedom names a state or concept that has no material form, shape or size.",
        },
      ],
      pairs: [
        { term: "Proper noun", match: "Names one particular person, place or thing" },
        { term: "Common noun", match: "Names any member of the same class or kind" },
        { term: "Collective noun", match: "Names a group taken together as one whole" },
        { term: "Material noun", match: "Names a substance that has weight but cannot be counted" },
        { term: "Abstract noun", match: "Names a quality, state or concept with no shape or size" },
      ],
      order: {
        prompt: "Put the questions for deciding a noun's kind in the order you ask them.",
        items: [
          "Does it name one particular person, place or thing? Then it is proper.",
          "If not, does it have any material form? If not, it is abstract.",
          "If it does, can it be counted? If not, it is a material noun.",
          "If it can be counted, is it one word for a group? Collective, otherwise common.",
        ],
      },
      blitz: [
        { statement: "A proper noun usually begins with a capital letter.", truth: true, why: "It names a particular person, place or thing, such as Rajshahi or the Padma." },
        { statement: "Sugar and rice are collective nouns because they are made of many grains.", truth: false, why: "They are substances that we weigh rather than count, so they are material nouns." },
        { statement: "A collective noun such as committee can take either a singular or a plural verb.", truth: true, why: "The textbook gives 'The committee was, or were, in favour of my proposal.'" },
        { statement: "The Maldives needs a plural verb because the noun ends in s.", truth: false, why: "Some proper nouns are plural in form but take a singular verb: The Maldives is an island country." },
      ],
      blanks: [
        { sentence: "Bravery, honesty and justice are ___ nouns.", options: ["abstract", "material", "collective"], answer: 0 },
        { sentence: "A herd of cattle grazed by the Jamuna, so herd is a ___ noun.", options: ["proper", "collective", "material"], answer: 1 },
      ],
      terms: ["proper", "common", "collective", "material", "abstract", "capital letter"],
      sayPrompt: "Tell a friend how to decide whether a noun is proper, common, collective, material or abstract, with one example of each",
      glossary: [
        { term: "Noun", bn: "বিশেষ্য" },
        { term: "Proper noun", bn: "নামবাচক বিশেষ্য" },
        { term: "Common noun", bn: "জাতিবাচক বিশেষ্য" },
        { term: "Collective noun", bn: "সমষ্টিবাচক বিশেষ্য" },
        { term: "Material noun", bn: "বস্তুবাচক বিশেষ্য" },
        { term: "Abstract noun", bn: "গুণবাচক বিশেষ্য" },
        { term: "Countable noun", bn: "গণনাযোগ্য বিশেষ্য" },
        { term: "Uncountable noun", bn: "অগণনাযোগ্য বিশেষ্য" },
      ],
    },
    {
      id: "bd-ssc-english2-1-2",
      title: "Number and gender of nouns",
      hook: "One teacher, two teachers; one wife, two wives. A noun's number decides its verb, and its gender decides its pronoun.",
      steps: [
        { label: "Two numbers", text: "Number tells whether a noun is singular or plural. A singular noun denotes one person or thing: teacher, child. A plural noun denotes more than one: teachers, children." },
        { label: "Regular plurals", text: "Most nouns add s: boy, boys. Nouns ending in s, ss, sh, ch or x add es: bus, buses; watch, watches. A consonant plus y becomes ies: lady, ladies. But monkey simply adds s." },
        { label: "Other plurals", text: "Many nouns ending in f or fe take ves: knife, knives. Some change a vowel: foot, feet; mouse, mice. Compounds pluralise the main noun: passers-by. A final is becomes es: crisis, crises." },
        { label: "Four genders", text: "Gender shows whether a noun is male or female. Masculine: man, lion. Feminine: woman, lioness. Common, for either: student, doctor. Neuter, for neither: table, book. The pronoun must match." },
      ],
      analogy: "Number and gender are like the tag on a parcel: one box or three, for Mr Karim or Mrs Karim. The courier reads the tag and acts on it. Verbs and pronouns read a noun's tag in the same way.",
      story: [
        "Nusrat was writing a letter to her pen friend about her family in Khulna. Her first line read: My two brother is very naughty. Her elder sister Sumaiya, home from university, leaned over and tapped the word brother.",
        "'Two of anything needs a plural,' Sumaiya said. 'Two brothers. And a plural subject takes a plural verb, so are, not is.' Nusrat fixed it. Next she wrote about the farm: three calfs and two gooses. Sumaiya laughed. 'Calves and geese. Some nouns change more than their ending.'",
        "The last line was about their grandmother: My grandmother is very kind. He tells us stories every night. This time Nusrat saw the problem before Sumaiya could speak. Grandmother is feminine, so the pronoun had to be she. She read the letter once more. Every verb and pronoun now matched its noun.",
      ],
      deepRead: [
        "Number is a grammatical distinction that tells whether a noun is singular or plural. A singular noun denotes one person or thing; a plural noun denotes more than one. Most plurals add s (boy, boys; monkey, monkeys). Nouns ending in s, ss, sh, ch or x add es (bus, buses; dish, dishes; box, boxes). A consonant plus y drops the y and adds ies (baby, babies; story, stories). Many nouns ending in f or fe drop it and add ves (calf, calves; wife, wives; thief, thieves). Some change an inner vowel (foot, feet; tooth, teeth; goose, geese; woman, women). Compounds usually pluralise the main noun (passers-by, runners-up, fathers-in-law, men-of-war), and nouns ending in is change it to es (crisis, crises; basis, bases).",
        "Number also applies to pronouns, verbs and determiners, and a verb's number is decided by its subject. A singular subject takes a singular verb and a plural subject takes a plural verb. Worked example: put 'The thief is hiding his knife on the shelf' into the plural. It becomes 'The thieves are hiding their knives on the shelves.'",
        "Gender shows whether a noun or pronoun is male or female. There are four genders: masculine (uncle, lion, drake), feminine (aunt, lioness, duck), common, for either sex (student, doctor, sibling), and neuter, for things that are neither (camera, flower, table). Some feminine forms add ess (actor, actress; duke, duchess), while others are different words (horse, mare; fox, vixen; nephew, niece). Pronouns must agree: 'My father is a poet. He has written many poems.'",
      ],
      example: {
        question: "Choose the correct sentence.",
        options: ["Two passer-bys was watching the match in Mirpur.", "Two passers-by were watching the match in Mirpur.", "Two passers-bys were watching the match in Mirpur."],
        answer: 1,
        why: "In passer-by the main noun passer takes the s, and a plural subject takes the plural verb were.",
      },
      keyPoints: [
        "Number tells whether a noun is singular or plural, and a singular subject takes a singular verb while a plural subject takes a plural verb.",
        "Most plurals add s, es or ies, but some take ves, change an inner vowel or change is to es, as in knives, feet and crises.",
        "English has four genders, masculine, feminine, common and neuter, and a pronoun must match the gender of its noun.",
      ],
      misconception: {
        belief: "Every noun becomes plural by adding s, so knifes, foots and passer-bys are correct.",
        correction: "Most nouns do add s, but many follow other patterns. Knife becomes knives, foot becomes feet, and in passer-by the main noun takes the s, giving passers-by. These forms must be learnt, not guessed from the usual rule.",
      },
      quiz: [
        {
          question: "What is the plural of crisis?",
          options: ["crises", "crisises", "crisies"],
          answer: 0,
          why: "Nouns ending in is change it to es in the plural, so crisis becomes crises.",
        },
        {
          question: "Which noun is in the common gender?",
          options: ["nephew", "duchess", "doctor", "table"],
          answer: 2,
          why: "A doctor can be male or female, so doctor is common gender; table is neuter.",
        },
        {
          question: "Choose the right verb: The children of our village ___ playing football in the rain.",
          options: ["was", "is", "are"],
          answer: 2,
          why: "Children is the plural of child, and a plural subject takes a plural verb.",
        },
      ],
      pairs: [
        { term: "knife", match: "knives" },
        { term: "goose", match: "geese" },
        { term: "passer-by", match: "passers-by" },
        { term: "duke", match: "duchess" },
        { term: "fox", match: "vixen" },
      ],
      order: {
        prompt: "Put the steps for making a verb and pronoun agree with a noun in order.",
        items: [
          "Find the subject noun that the verb belongs to",
          "Decide whether that noun is singular or plural",
          "Choose the verb form that matches it, such as is or are",
          "Check that pronouns referring to it match its number and gender",
        ],
      },
      blitz: [
        { statement: "Nouns ending in s, ss, sh, ch or x usually form the plural by adding es.", truth: true, why: "Bus becomes buses, dish becomes dishes, watch becomes watches and box becomes boxes." },
        { statement: "The plural of father-in-law is father-in-laws.", truth: false, why: "The main noun takes the s, so the plural is fathers-in-law." },
        { statement: "Student and doctor are common gender nouns.", truth: true, why: "Each can refer to a male or a female person." },
        { statement: "Monkey becomes monkies in the plural, just as lady becomes ladies.", truth: false, why: "Only a consonant plus y changes to ies; monkey has a vowel before y, so it becomes monkeys." },
      ],
      blanks: [
        { sentence: "The farmer in Rajshahi has two ___ and a bull.", options: ["calves", "calfs", "calf"], answer: 0 },
        { sentence: "The feminine form of drake is ___.", options: ["hen", "duck", "goose"], answer: 1 },
      ],
      terms: ["singular", "plural", "subject", "verb", "gender", "pronoun"],
      sayPrompt: "Explain to a classmate how knife, foot and passer-by become plural, and why the verb must change with them",
      glossary: [
        { term: "Number", bn: "বচন" },
        { term: "Singular number", bn: "একবচন" },
        { term: "Plural number", bn: "বহুবচন" },
        { term: "Gender", bn: "লিঙ্গ" },
        { term: "Masculine gender", bn: "পুংলিঙ্গ" },
        { term: "Feminine gender", bn: "স্ত্রীলিঙ্গ" },
        { term: "Common gender", bn: "উভলিঙ্গ" },
        { term: "Neuter gender", bn: "ক্লীবলিঙ্গ" },
      ],
    },
    {
      id: "bd-ssc-english2-1-3",
      title: "Possessives and nouns in apposition",
      hook: "Salma's school belongs to one girl, but a girls' school belongs to many. One apostrophe, before or after the s, tells the reader which.",
      steps: [
        { label: "Ownership mark", text: "The possessive case shows relationship or ownership. A singular noun takes an apostrophe and s: Nazma's bag, the headmistress's chamber, Bangladesh's foreign policy." },
        { label: "Plurals", text: "A plural noun that already ends in s takes only an apostrophe: a girls' school, horses' tails. Other plurals take an apostrophe and s: children's books, a women's club." },
        { label: "Special cases", text: "A few phrases drop the s to avoid a hissing sound: for goodness' sake. Time, distance and weight can be possessive too: three days' leave, a stone's throw, a pound's weight." },
        { label: "Apposition", text: "Apposition means placing near. Two nouns naming the same person stand side by side: Mr Rahman, our headmaster, is kind. The second noun, headmaster, is called the appositive." },
      ],
      analogy: "An apostrophe is like the name label on a tiffin box. Where you stick it tells everyone whose lunch it is: one pupil's, or all the pupils' together. An appositive is a second label naming the same owner in a different way.",
      story: [
        "The students of class nine at a school in Rajshahi were making a wall magazine. Shuvo, the class captain, had to check the notices before they went up. The first one read: Mr Haque is on three days casual leave.",
        "Shuvo frowned. 'The leave belongs to three days, so we need a possessive,' he said. 'Days is plural and already ends in s, so only an apostrophe goes after it.' He wrote: three days' casual leave.",
        "The next notice said: The headmistress office is on the first floor. Shuvo added an apostrophe and s to make the headmistress's office. Then Rupa, the editor, wrote the welcome line: Mr Abdur Rob, our class teacher, is our chief adviser. 'Our class teacher names the same man,' she explained, 'so it sits beside his name. That is an appositive.'",
      ],
      deepRead: [
        "The possessive case is a grammatical form that shows relationship or ownership. It is formed in mainly two ways. A singular noun takes an apostrophe and s: Della's hair, Nazma's bag, the headmistress's chamber. A plural noun that already ends in s takes only an apostrophe: a girls' school, horses' tails. Plurals that do not end in s take an apostrophe and s: children's books, a women's club. In a few fixed phrases the s is left out to avoid a hissing sound: for conscience' sake, for goodness' sake.",
        "Possessives are also used with time, distance, weight, value and some ideas treated like persons: a day's journey from here to Dhaka, one month's medical leave, a stone's throw, a pound's weight, your money's worth, Nature's laws, at his wit's end. When two people own one thing together, only the last name takes the possessive: Mr and Mrs Rahim's family. When each owns a separate thing, both take it: Mr Islam's and Mr Kabir's families.",
        "Apposition means placing near. It is an arrangement in which two words referring to the same person or thing are placed side by side. In 'Mr Rahman, our headmaster, is a very nice man', headmaster tells us which Rahman is meant, so it is in apposition to Rahman and is called the appositive. Worked example: in 'Shahana, the captain of our school team, lives in Mymensingh', the appositive is the captain of our school team.",
      ],
      example: {
        question: "Rafi took two ___ leave to visit Cox's Bazar. Which form fills the gap?",
        options: ["week's", "weeks'", "weeks's"],
        answer: 1,
        why: "Weeks is plural and already ends in s, so only an apostrophe is added: two weeks' leave.",
      },
      keyPoints: [
        "The possessive case shows relationship or ownership, and a singular noun forms it with an apostrophe and s, as in Nazma's bag.",
        "A plural ending in s takes only an apostrophe, as in a girls' school, while other plurals take an apostrophe and s, as in children's books.",
        "A noun in apposition stands beside another noun that names the same person or thing, as in Mr Rahman, our headmaster.",
      ],
      misconception: {
        belief: "Every possessive is made by adding an apostrophe in the same place, so a girls's school and childrens' books are correct.",
        correction: "Where the apostrophe goes depends on the noun. Girls already ends in s, so it takes only an apostrophe: a girls' school. Children is a plural that does not end in s, so it takes an apostrophe and s: children's books.",
      },
      quiz: [
        {
          question: "Which is the correct possessive form of women?",
          options: ["womens'", "women's", "womens's"],
          answer: 1,
          why: "Women is a plural that does not end in s, so it takes an apostrophe and s.",
        },
        {
          question: "In 'Dr Nilufar, our family doctor, lives in Barishal', which words are in apposition to Dr Nilufar?",
          options: ["our family doctor", "lives in Barishal", "Barishal"],
          answer: 0,
          why: "Our family doctor names the same person as Dr Nilufar and stands beside it.",
        },
        {
          question: "Rafi and Rina share one bicycle. Which phrase is correct?",
          options: ["Rafi's and Rina's bicycle", "Rafi and Rinas' bicycle", "Rafi and Rina's bicycle"],
          answer: 2,
          why: "When two people own one thing together, only the last name takes the possessive.",
        },
      ],
      pairs: [
        { term: "Nazma's bag", match: "A singular noun takes an apostrophe and s" },
        { term: "a girls' school", match: "A plural ending in s takes only an apostrophe" },
        { term: "children's books", match: "A plural not ending in s takes an apostrophe and s" },
        { term: "for goodness' sake", match: "The s is dropped to avoid a hissing sound" },
        { term: "Mr Rahman, our headmaster", match: "Two nouns naming the same person, side by side" },
      ],
      order: {
        prompt: "Put the steps for writing the possessive form of a noun in order.",
        items: [
          "Find the owner noun, the one that possesses something",
          "Decide whether that noun is singular or plural",
          "If it is plural, check whether it already ends in s",
          "Add only an apostrophe after a plural s; otherwise add an apostrophe and s",
        ],
      },
      blitz: [
        { statement: "The possessive case shows relationship or ownership.", truth: true, why: "That is how the textbook defines the possessive case." },
        { statement: "Horses' tails is correct because horses is a plural that ends in s.", truth: true, why: "A plural ending in s takes only an apostrophe." },
        { statement: "The possessive form of children is childrens'.", truth: false, why: "Children does not end in s, so it takes an apostrophe and s: children's." },
        { statement: "In 'My friend Nazrul came yesterday', Nazrul is a possessive noun.", truth: false, why: "Nazrul names the same person as friend and stands beside it, so it is in apposition." },
      ],
      blanks: [
        { sentence: "We must obey ___ laws.", options: ["Nature's", "Natures'", "Natures"], answer: 0 },
        { sentence: "Our house is only a ___ throw from the Karnaphuli.", options: ["stones'", "stone's", "stones"], answer: 1 },
      ],
      terms: ["apostrophe", "possessive", "ownership", "plural", "apposition", "same person"],
      sayPrompt: "Tell a friend why we write a girls' school but children's books, and what an appositive is",
      glossary: [
        { term: "Possessive case", bn: "সম্বন্ধ পদ" },
        { term: "Case", bn: "কারক" },
        { term: "Apostrophe", bn: "ঊর্ধ্বকমা" },
        { term: "Ownership", bn: "মালিকানা" },
        { term: "Relationship", bn: "সম্পর্ক" },
        { term: "Apposition", bn: "সমানাধিকরণ" },
      ],
    },
  ],
  cq: {
    stem: "Farhana, who studies in class nine in Sylhet, wrote this short passage. 'Last July my family visited Ratargul, a swamp forest near Sylhet. A crowd of tourists were taking photos from the boats. My uncle bought two loafs of bread and some honey from a local shop. The two boatman told us that the forests trees stand in water for months. We admired their patience and the beauty of the forest.'",
    knowledge: {
      q: "Identify the noun in apposition in the passage, and say which noun it refers to.",
      a: "'A swamp forest near Sylhet' is in apposition to Ratargul, because it names the same place and stands beside it.",
    },
    comprehension: {
      q: "Explain why 'patience' is an abstract noun but 'honey' is a material noun.",
      a: "An abstract noun is the name of a quality, state or concept, and it has no material form, shape or size. Patience names a quality; it cannot be seen, touched or weighed, so it is an abstract noun. A material noun names a substance that has weight but cannot be counted. Honey is a liquid substance that we measure by the jar or the kilogram rather than count, so it is a material noun.",
    },
    application: {
      q: "The passage has three mistakes in the number or possessive form of nouns. Find and correct each one, and give the rule you used.",
      a: "1. 'two loafs of bread' should be 'two loaves of bread'. Many nouns ending in f or fe form the plural by dropping the f or fe and adding ves, as in calf, calves and knife, knives. 2. 'The two boatman' should be 'The two boatmen'. Two needs a plural noun, and man forms its plural by an internal change of vowel, so boatman becomes boatmen. 3. 'the forests trees' should be 'the forest's trees'. The trees belong to one forest, and a singular noun forms its possessive by adding an apostrophe and s.",
    },
    higherOrder: {
      q: "Farhana's friend says 'A crowd of tourists were taking photos' is wrong and must use 'was'. Do you agree? Analyse with reasons, and write sentences showing both uses.",
      a: "I do not agree that it is wrong. Crowd is a collective noun, the name of a group of people taken together as one whole. The textbook says a collective noun can take both singular and plural verbs, as in 'The government has, or have, decided on a new pay scale.' The choice depends on the meaning. When the group is thought of as one unit, a singular verb fits: 'The crowd was too big for the small boats.' When we think of the members acting separately, a plural verb fits. In Farhana's sentence each tourist is taking his or her own photos, so 'were' is natural and correct. Her friend's version with 'was' is also acceptable if the crowd is seen as one body, but it is not the only correct form. So Farhana's sentence can stay as it is.",
    },
  },
} satisfies UnitContent;

export default unit;
