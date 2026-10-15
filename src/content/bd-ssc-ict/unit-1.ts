import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-ict",
  unit: 1,
  title: "Information and Communication Technology and Our Bangladesh",
  titleBn: "তথ্য ও যোগাযোগ প্রযুক্তি ও আমাদের বাংলাদেশ",
  summary: "After this unit you can explain why knowledge is the wealth of the 21st century, name the pioneers of ICT, and describe how e-learning, e-governance, e-service and e-commerce are changing life in Bangladesh.",
  concepts: [
    {
      id: "bd-ssc-ict-1-1",
      title: "The knowledge age and the pioneers of ICT",
      hook: "In the 21st century, a country's real wealth is not its land or minerals but its people's knowledge, and ICT is the tool that builds it.",
      steps: [
        { label: "Knowledge is wealth", text: "Last century, wealth meant farmland, minerals, energy and industry. In the 21st century, the world agrees that knowledge is the wealth. People are the real asset, because they can search for and use knowledge." },
        { label: "Skills to survive", text: "To join this knowledge revolution, you must cooperate, communicate and know your duties as a citizen. You also need problem solving, critical thinking, creativity and, above all, skill in ICT." },
        { label: "Computing pioneers", text: "Charles Babbage designed the Difference Engine and the Analytical Engine, so he is called the father of the modern computer. Ada Lovelace brought the idea of programming to his engine." },
        { label: "Network pioneers", text: "Jagadish Chandra Bose sent wireless messages using microwaves in 1895. Raymond Tomlinson sent the first email through ARPANET in 1971. Tim Berners-Lee proposed the World Wide Web, using HTTP, in 1989." },
      ],
      analogy: "ICT works for knowledge the way a road works for a farmer's harvest. A good crop in a village with no road stays there and spoils. Link the village to Dhaka, and the same crop reaches buyers everywhere and earns its full value.",
      story: [
        "Rafi, a class 9 student in Rajshahi, sighed when the ICT period began. 'Why do we need this?' he asked. 'My father earns from mangoes, not computers.' Shirin Apa smiled and asked how his father had sold mangoes last season.",
        "Rafi thought about it. His father had posted photos of his Fazli mangoes on Facebook, taken orders from Dhaka and Chattogram, and sent the boxes by courier. Buyers paid through mobile banking. 'The mangoes grew on the tree,' said Shirin Apa, 'but knowing how to sell them online is what raised their value.'",
        "Then she wrote five names on the board: Babbage, Ada Lovelace, Jagadish Chandra Bose, Tomlinson and Berners-Lee. 'Every order your father got travelled on the work of these people,' she said. Rafi copied the list carefully. For the first time, ICT felt like part of his own family's story.",
      ],
      deepRead: [
        "The chapter opens with a big idea: the concept of wealth has changed. In the last century, a country was rich if it had farmland, minerals, energy or industry. In the 21st century, the world accepts that knowledge is the wealth, and people are the real asset because they can search for and use knowledge. The world now stands on a knowledge-based economy. Globalisation and internationalisation are speeding up, and ICT is the main driving force behind them. Millions of Bangladeshis live abroad yet stay linked to home, so in one sense Bangladesh's border has spread across the world.",
        "History shows why this matters. The nations that took part in the Industrial Revolution of the 18th and 19th centuries once ruled the world, and a similar shift is happening with knowledge. To take part, a student needs cooperation, communication, awareness of a citizen's duties, problem solving, critical thinking, creativity and skill in ICT. Without ICT skill, a student cannot collect, analyse and evaluate information to create new knowledge.",
        "ICT was built by many people. Charles Babbage (1791-1871) is called the father of the modern computer; in 1991 the Science Museum in London built an engine from his design, and it worked. Ada Lovelace (1815-1852) is honoured as the pioneer of programming. Bose sent wireless messages with microwaves in 1895, Tomlinson sent the first email in 1971, and Berners-Lee proposed the World Wide Web in 1989.",
      ],
      example: {
        question: "Bangladesh has fertile land, gas fields and great rivers. By the 21st-century idea of wealth, what is its greatest asset?",
        options: ["Its farmland and crops", "Its people and their knowledge", "Its natural gas and minerals"],
        answer: 1,
        why: "In the 21st century knowledge is the wealth, so people who can search for and use knowledge are the real asset.",
      },
      keyPoints: [
        "In the 21st century knowledge is the wealth, and people are the real asset because they can search for and use knowledge.",
        "ICT is the main driving force behind globalisation and the knowledge-based economy.",
        "Babbage is the father of the modern computer, Ada Lovelace the pioneer of programming, Tomlinson of email and Berners-Lee of the World Wide Web.",
      ],
      misconception: {
        belief: "ICT skill is only for people who want to become computer engineers.",
        correction: "The textbook calls skill in ICT the most important technological skill of this century. Bank, insurance and government jobs now expect word processing, email and internet skills, and every student needs ICT to collect, analyse and evaluate information.",
      },
      quiz: [
        {
          question: "Who is honoured as the pioneer of the programming concept?",
          options: ["Charles Babbage", "Ada Lovelace", "Bill Gates", "Steve Jobs"],
          answer: 1,
          why: "Ada Lovelace brought the idea of programming to Babbage's Analytical Engine, and her notes showed the idea of an algorithm.",
        },
        {
          question: "According to the textbook, why are people the real asset of the 21st century?",
          options: ["They can search for and use knowledge", "There are more people than ever before", "People can work longer hours than machines"],
          answer: 0,
          why: "Knowledge is the wealth of this century, and only people can seek, hold and use it.",
        },
        {
          question: "Who sent the first email through ARPANET in 1971?",
          options: ["Tim Berners-Lee", "Guglielmo Marconi", "Raymond Tomlinson", "Mark Zuckerberg"],
          answer: 2,
          why: "Raymond Tomlinson introduced email on ARPANET in 1971, long before the World Wide Web.",
        },
      ],
      pairs: [
        { term: "Charles Babbage", match: "Father of the modern computer" },
        { term: "Ada Lovelace", match: "Pioneer of the programming concept" },
        { term: "Jagadish Chandra Bose", match: "Sent wireless messages using microwaves in 1895" },
        { term: "Raymond Tomlinson", match: "Sent the first email through ARPANET in 1971" },
        { term: "Tim Berners-Lee", match: "Proposed the World Wide Web using HTTP in 1989" },
      ],
      order: {
        prompt: "Put these ICT milestones in the order they happened.",
        items: [
          "Charles Babbage designs the Analytical Engine",
          "Jagadish Chandra Bose sends wireless messages using microwaves",
          "Raymond Tomlinson sends the first email through ARPANET",
          "Tim Berners-Lee proposes the World Wide Web",
        ],
      },
      blitz: [
        { statement: "The textbook says knowledge, not minerals or industry, is the wealth of the 21st century.", truth: true, why: "People who can search for and use knowledge are now the real asset." },
        { statement: "Guglielmo Marconi was the first person to send wireless messages, in 1895.", truth: false, why: "Bose did it first in 1895 with microwaves, but his work was not published; Marconi did it with radio waves." },
        { statement: "Critical thinking and creativity are among the skills needed for a knowledge-based society.", truth: true, why: "The textbook lists them with cooperation, communication, citizenship, problem solving and ICT skill." },
        { statement: "Raymond Tomlinson invented the World Wide Web in 1971.", truth: false, why: "Tomlinson introduced email in 1971; Tim Berners-Lee proposed the World Wide Web in 1989." },
      ],
      blanks: [
        { sentence: "Charles Babbage is called the father of the modern ___.", options: ["computer", "radio", "internet"], answer: 0 },
        { sentence: "ICT is the main driving force behind ___ in the 21st century.", options: ["the Industrial Revolution", "globalisation", "the steam engine"], answer: 1 },
      ],
      glossary: [
        { term: "Information and communication technology", bn: "তথ্য ও যোগাযোগ প্রযুক্তি" },
        { term: "Knowledge-based society", bn: "জ্ঞানভিত্তিক সমাজ" },
        { term: "Knowledge-based economy", bn: "জ্ঞানভিত্তিক অর্থনীতি" },
        { term: "Globalisation", bn: "বিশ্বায়ন" },
        { term: "Industrial Revolution", bn: "শিল্প বিপ্লব" },
        { term: "Critical thinking", bn: "বিশ্লেষণী চিন্তন দক্ষতা" },
        { term: "Creativity", bn: "সৃজনশীলতা" },
        { term: "Microwave", bn: "অতিক্ষুদ্র তরঙ্গ" },
      ],
    },
    {
      id: "bd-ssc-ict-1-2",
      title: "E-learning and e-governance in Bangladesh",
      hook: "A lesson recorded once can reach a hundred schools, and an exam result can reach a remote village by SMS. That is ICT at work in learning and government.",
      steps: [
        { label: "E-learning", text: "E-learning is short for electronic learning. It means teaching through CD-ROM, the internet, personal networks and TV channels. A teacher can show a solar eclipse on video instead of only describing it." },
        { label: "A supplement", text: "E-learning is not a substitute for the classroom. Face-to-face talk, questions and help from classmates happen best in class. E-learning fills gaps, such as too few skilled teachers, labs and materials." },
        { label: "E-governance", text: "E-governance is the application of electronic or digital methods in government administration. It brings the transparency and accountability that good governance needs, and it stops the harassment of citizens." },
        { label: "Faster services", text: "Exam results come by SMS, university applications go by mobile phone, and bills are paid online. District e-service centres now deliver in 2 to 5 days what once took 2 to 3 weeks." },
      ],
      analogy: "E-learning is like a recorded cricket coaching video. It lets a boy in Kurigram learn from a top coach, but he still needs a real coach at the nets to watch him bat and correct him.",
      story: [
        "Nusrat lives in a village near Jashore. Her brother Tanvir wanted to apply to Shahjalal University of Science and Technology in Sylhet. Their father remembered his own time, when students rode buses for a whole day just to collect a form and then went again to submit it.",
        "Tanvir sent his application from his mobile phone in ten minutes. A few weeks later, the details of his admission test arrived by SMS while he sat on the veranda.",
        "That same week, Nusrat's science teacher played a recorded video of a solar eclipse, made by an expert teacher in Dhaka. Then she paused it and asked the class questions. 'The video shows it,' she said, 'but you learn best when you ask me what puzzles you.'",
      ],
      deepRead: [
        "E-learning is the short form of electronic learning: a teaching process that uses CD-ROM, the internet, personal networks and TV channels. It suits Bangladesh well. Classes are large, and many schools lack skilled teachers, materials and science laboratories. A lesson by a skilled teacher can be recorded, sent to hundreds of schools and reused, with images, videos and graphs that make hard ideas visible. Bangladeshi web portals now offer courses in Bangla. Still, the textbook stresses that e-learning is not a substitute for classroom teaching. It has little face-to-face interaction, so it can become mechanical, and it needs fast internet, infrastructure and good learning materials.",
        "Good governance needs transparency and accountability. The application of electronic or digital methods in government administration is called e-governance. Two decades ago, a village student could wait a week to learn a public exam result; now it comes through the internet or SMS. A candidate from Jashore can apply to a university in Sylhet by mobile phone instead of travelling there. District e-service centres deliver in 2 to 5 days a service that once took 2 to 3 weeks, and gas, electricity and water bills can be paid online or by mobile phone. Some services, such as ATM and mobile banking, run 24 hours a day, 365 days a year.",
      ],
      example: {
        question: "A science lesson recorded by an expert teacher in Dhaka is shown in 200 village schools. Which problem does this mainly solve?",
        options: ["The shortage of skilled teachers", "The shortage of classrooms", "The need for students to ask questions"],
        answer: 0,
        why: "Recording one skilled teacher's lesson lets many schools without such a teacher use it.",
      },
      keyPoints: [
        "E-learning means teaching through CD-ROM, the internet, personal networks and TV channels, and it supports classroom teaching rather than replacing it.",
        "E-governance is the use of electronic or digital methods in government administration to bring transparency, accountability and good governance.",
        "Results by SMS, admission applications by mobile phone and district e-service centres show e-governance cutting time, cost and harassment.",
      ],
      misconception: {
        belief: "E-learning can fully replace teachers and classrooms, so schools will not be needed.",
        correction: "The textbook says e-learning is not a substitute for conventional teaching. In class, students talk face to face, ask questions and help each other. E-learning has little interaction and can become mechanical, so it works best as a supplement.",
      },
      quiz: [
        {
          question: "What is e-governance?",
          options: ["Using electronic or digital methods in government administration", "Selling goods through a website", "Teaching through TV channels and CD-ROM"],
          answer: 0,
          why: "E-governance is about how the government runs and delivers its services, using digital methods.",
        },
        {
          question: "Which of these is an example of e-governance in Bangladesh?",
          options: ["Watching a cricket match online", "Getting a public exam result by SMS", "Buying a shirt from a Facebook shop"],
          answer: 1,
          why: "Publishing exam results by SMS is a government service delivered digitally.",
        },
        {
          question: "Why must students be very pro-active to succeed in e-learning?",
          options: ["It costs more than going to school", "It is only available in English", "It has little face-to-face interaction"],
          answer: 2,
          why: "With few chances to talk to a teacher, e-learning can become mechanical unless students push themselves.",
        },
      ],
      pairs: [
        { term: "E-learning", match: "Teaching through CD-ROM, the internet, personal networks and TV channels" },
        { term: "E-governance", match: "Electronic or digital methods in government administration" },
        { term: "Transparency", match: "Openness, so citizens can see how government work is done" },
        { term: "Accountability", match: "Officials must answer for their work and decisions" },
        { term: "District e-service centre", match: "Delivers in 2 to 5 days what once took 2 to 3 weeks" },
      ],
      order: {
        prompt: "Put the steps of sharing a lesson through e-learning in order.",
        items: [
          "A skilled teacher records a lesson with images, videos and graphs",
          "The recorded lesson is sent to hundreds of schools",
          "A class teacher plays it and pauses for students' questions",
          "The same lesson is reused in other classes and later years",
        ],
      },
      blitz: [
        { statement: "E-learning is a supplement to classroom teaching, not a substitute for it.", truth: true, why: "Face-to-face questions and discussion still happen best in the classroom." },
        { statement: "E-governance simply means government offices typing their letters on computers.", truth: false, why: "It means using digital methods to run administration and deliver services with transparency and accountability." },
        { statement: "District e-service centres have cut some services from 2 to 3 weeks to 2 to 5 days.", truth: true, why: "Digitised information has reduced the time needed for services and decisions." },
        { statement: "E-learning works well without fast internet or special infrastructure.", truth: false, why: "The textbook says it needs fast internet, infrastructure and e-learning materials." },
      ],
      blanks: [
        { sentence: "Good governance needs transparency and ___.", options: ["accountability", "entertainment", "outsourcing"], answer: 0 },
        { sentence: "E-learning is a ___ to classroom teaching, not a replacement for it.", options: ["threat", "supplement", "barrier"], answer: 1 },
      ],
      glossary: [
        { term: "E-learning", bn: "ই-লার্নিং" },
        { term: "E-governance", bn: "ই-গভর্ন্যান্স" },
        { term: "Good governance", bn: "সুশাসন" },
        { term: "Transparency", bn: "স্বচ্ছতা" },
        { term: "Accountability", bn: "জবাবদিহিতা" },
        { term: "Learning materials", bn: "শিখনসামগ্রী" },
        { term: "District e-service centre", bn: "জেলা ই-সেবা কেন্দ্র" },
      ],
    },
    {
      id: "bd-ssc-ict-1-3",
      title: "E-service and e-commerce in daily life",
      hook: "Sugarcane farmers now get their supply permit by SMS, and shoppers pay for goods on delivery. E-service and e-commerce have taken the queue out of daily life.",
      steps: [
        { label: "E-service", text: "Providing services through an electronic system is called e-service. It gives services at low cost, in the shortest time and without hassle. Instead of queueing at Kamlapur station, you can buy a train ticket online." },
        { label: "Key e-services", text: "The e-permit tells sugarcane farmers of 15 sugar mills by SMS when to supply cane. E-settlement records give copies of land records online. Telemedicine lets an upazila patient consult district hospital specialists." },
        { label: "E-commerce", text: "Running a business through an electronic medium is e-commerce. The seller shows product images on a website, the buyer orders and pays, and the seller delivers directly or by courier." },
        { label: "Ways to pay", text: "Buyers can pay by debit or credit card, by mobile banking, or by cash on delivery, paying only when the product arrives. E-commerce has grown in Bangladesh since 2011-12." },
      ],
      analogy: "E-service and e-commerce work like a tiffin delivery service. The meal is the same as in the office canteen, but you order it from where you sit, it arrives when you need it, and you skip the walk and the queue.",
      story: [
        "Every winter, Mitu's grandfather used to walk to the sugar mill office near Natore to ask when he could bring his cane. Some days he waited for hours and went home without an answer.",
        "Now his phone beeps with an SMS. It is his e-permit, the mill's official permission to supply his cane at a fixed time. He loads the van that morning, and the mill gets fresh cane on schedule.",
        "Mitu, in Dhaka, uses ICT differently. She ordered a ৳650 dictionary from an online bookshop and chose cash on delivery. When the courier came, she checked the book and then paid. 'Same book, and no bus ride to Nilkhet,' she told her grandfather on a video call.",
      ],
      deepRead: [
        "Providing services through an electronic system is called e-service. It makes services available at low cost, in the shortest possible time and without much hassle. Many ministries and departments of Bangladesh already offer e-services, such as digital textbooks, e-settlement records, e-permits, e-tickets, telemedicine, e-TIN registration and income tax calculation. Through the e-permit, sugarcane farmers of fifteen sugar mills receive by SMS the mill's permission to supply cane at a fixed time. The Postal Department's electronic money transfer system can send up to ৳50,000 within one minute. Duplicate land settlement records can be collected from home or abroad by paying the fee online.",
        "Running a business through an electronic medium is called e-commerce. Trade still needs a seller with goods, a buyer who pays and a way to deliver. Online, the seller displays product images on a website. The buyer chooses, orders and pays by debit or credit card or by mobile banking, and the seller delivers directly or by courier. In cash on delivery, the buyer pays only after receiving the product. Some e-commerce businesses sell only their own products, while others sell products of many companies.",
        "ICT also changes work. It makes existing jobs more efficient, and it creates new jobs in hardware, software, web development and maintenance. Through outsourcing, many young Bangladeshis earn foreign currency for the country while working from home.",
      ],
      example: {
        question: "Rahim orders a shirt from a Facebook shop and pays the courier only after the shirt reaches him. What is this payment method called?",
        options: ["Mobile banking", "Cash on delivery", "Credit card payment"],
        answer: 1,
        why: "He pays in cash only when the product is delivered, which is cash on delivery.",
      },
      keyPoints: [
        "E-service means providing services through an electronic system, at low cost, in less time and without hassle.",
        "The e-permit, e-settlement records, telemedicine, postal money transfer and railway e-ticketing are e-services in Bangladesh.",
        "E-commerce is running a business through an electronic medium, with payment by card, mobile banking or cash on delivery.",
      ],
      misconception: {
        belief: "E-commerce always means paying online in advance, so people without a bank card cannot use it.",
        correction: "Buyers can pay by debit or credit card, by mobile banking or by cash on delivery. With cash on delivery, the buyer orders from the website and pays only after the product arrives, so no card is needed.",
      },
      quiz: [
        {
          question: "Sugarcane farmers receive the mill's permission to supply cane at a fixed time by SMS. What is this e-service called?",
          options: ["E-permit", "E-ticket", "E-TIN", "E-settlement record"],
          answer: 0,
          why: "The e-permit is the sugar mill's official permission sent to farmers by SMS.",
        },
        {
          question: "A patient at an upazila health complex gets a district hospital specialist's advice by mobile phone. Which service is this?",
          options: ["E-commerce", "Telemedicine", "Outsourcing"],
          answer: 1,
          why: "Telemedicine brings a distant specialist's advice to the patient through communication technology.",
        },
        {
          question: "Which statement correctly describes e-commerce?",
          options: ["Using digital methods in government administration", "Teaching through CD-ROM and TV channels", "Running a business through an electronic medium"],
          answer: 2,
          why: "E-commerce is trade carried out electronically; the other two describe e-governance and e-learning.",
        },
      ],
      pairs: [
        { term: "E-service", match: "Providing services through an electronic system" },
        { term: "E-commerce", match: "Running a business through an electronic medium" },
        { term: "E-permit", match: "SMS permission for farmers to supply sugarcane to a mill" },
        { term: "Telemedicine", match: "A distant specialist's medical advice through the mobile phone" },
        { term: "Cash on delivery", match: "The buyer pays after receiving the product" },
      ],
      order: {
        prompt: "Put the steps of an online purchase with cash on delivery in order.",
        items: [
          "The seller displays product images on a website",
          "The buyer chooses a product and places an order",
          "The seller sends the product to the buyer by courier",
          "The buyer receives the product and pays the bill",
        ],
      },
      blitz: [
        { statement: "Railway e-ticketing lets travellers buy some intercity train tickets online or by mobile phone.", truth: true, why: "It is one of the e-services named in the textbook." },
        { statement: "In cash on delivery, the buyer pays the seller before the product is sent.", truth: false, why: "The buyer pays only after receiving the product." },
        { statement: "The postal electronic money transfer system can send up to ৳50,000 within one minute.", truth: true, why: "The Bangladesh Postal Department offers this service from post offices across the country." },
        { statement: "An e-permit is a copy of a land record that citizens collect online after paying a fee.", truth: false, why: "That is an e-settlement record; an e-permit tells sugarcane farmers when to supply cane." },
      ],
      blanks: [
        { sentence: "Providing services through an electronic system is called ___.", options: ["e-commerce", "e-service", "e-learning"], answer: 1 },
        { sentence: "With ___, the buyer pays only after the product arrives.", options: ["cash on delivery", "a credit card", "mobile banking"], answer: 0 },
      ],
      glossary: [
        { term: "E-service", bn: "ই-সার্ভিস" },
        { term: "E-commerce", bn: "ই-কমার্স" },
        { term: "E-permit", bn: "ই-পুর্জি" },
        { term: "E-settlement record", bn: "ই-পর্চা" },
        { term: "Telemedicine", bn: "টেলিমেডিসিন" },
        { term: "Cash on delivery", bn: "ক্যাশ অন ডেলিভারি" },
        { term: "Outsourcing", bn: "আউটসোর্সিং" },
        { term: "Foreign currency", bn: "বৈদেশিক মুদ্রা" },
      ],
    },
  ],
  cq: {
    stem: "Nusrat's uncle lives in a village in Khulna. Ten years ago, to get a copy of his land settlement record, he travelled to the district office 3 times, spending ৳150 on each round trip, and waited 21 days. This year he applied for the e-settlement record online, paid the fee from his phone and received the copy in 4 days. The same week, Nusrat's mother paid the family's electricity bill by mobile phone instead of queueing at the bill office.",
    knowledge: {
      q: "What is e-governance?",
      a: "The application of electronic or digital methods in government administration is called e-governance.",
    },
    comprehension: {
      q: "Why is e-governance needed for good governance? Explain.",
      a: "Good governance needs transparency and accountability. When government services are run through digital methods, the process, fees and time limits become visible to citizens, so officials have to answer for delays. Citizens no longer need to make repeated visits, so their harassment stops and services become faster. In this way e-governance makes administration modern, transparent and accountable, which paves the way to good governance.",
    },
    application: {
      q: "Name the service Nusrat's uncle used this year, and calculate how many days and how much travel money it saved him.",
      a: "He used the e-settlement record service (e-porcha), an e-service through which a duplicate land settlement record is collected online by paying the required fee. Days saved = 21 days - 4 days = 17 days. Travel money saved = 3 round trips × ৳150 = ৳450, because this time he did not need to travel at all. So the e-service saved him 17 days and ৳450, and the trouble of three journeys, because the record was supplied electronically instead of being copied by hand from big record books.",
    },
    higherOrder: {
      q: "Nusrat says both services in the stem are examples of e-governance. Do you agree? Analyse with reasons.",
      a: "I agree. E-governance is the use of electronic or digital methods in government administration. First, the e-settlement record is a service of the government's land settlement department. Putting it online cut the time from 21 days to 4, removed three trips and made the fee and process transparent, so officials became accountable. Second, the textbook gives online or mobile payment of gas, electricity and water bills as an example of e-governance, because the manual process was slow and troublesome. Both services save citizens time, money and harassment, and both are also e-services because they are delivered through an electronic system. So the stem shows e-governance moving Bangladesh towards good governance, though citizens still need internet access and basic ICT skills to benefit.",
    },
  },
} satisfies UnitContent;

export default unit;
