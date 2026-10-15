import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-accounting",
  unit: 1,
  title: "Introduction to Accounting",
  titleBn: "হিসাববিজ্ঞান পরিচিতি",
  summary: "After this unit you can explain what accounting is and why it is called the language of business, state its objectives and history, identify the internal and external users of accounting information, and describe how accounting serves society, builds values and keeps people accountable.",
  concepts: [
    {
      id: "bd-ssc-accounting-1-1",
      title: "What accounting is and why we need it",
      hook: "A tea stall in Sylhet can sell 300 cups a day and still lose money. Only careful accounts show where the taka actually went.",
      steps: [
        { label: "Record", text: "Write every financial event in the books of accounts. This includes expenses paid, income received, goods bought and sold, and money collected from debtors or paid to creditors." },
        { label: "Classify", text: "Group similar transactions together. All sales go in one place, all rent in another and all salaries in a third, so each total can be found quickly." },
        { label: "Summarize", text: "At the end of a period, such as a month or a year, add up each group. Total income minus total expenses gives the profit or loss, the financial result." },
        { label: "Report", text: "Prepare statements that show the financial result and the financial position. Owners, banks and the government read them to take decisions, so accounting is called the language of business." },
      ],
      analogy: "Accounting is like a doctor's report for a business. The doctor records your pulse and temperature, groups the results and writes a short report, so anyone who reads it knows how healthy you are. Financial statements do the same for a firm's money.",
      story: [
        "Rafi's father runs a small grocery shop in Rajshahi. Every evening he looked at the cash box and felt pleased if it seemed full. Yet at the end of the year he could not pay the wholesaler on time, and he had no idea why.",
        "Rafi, a Class 9 Business Studies student, offered to help. For one month he wrote down every sale, purchase, rent payment and electricity bill in a notebook. Then he grouped them: sales in one list, goods in another, other expenses in a third.",
        "At the end of the month he added each list. Sales were ৳90,000. The goods sold had cost ৳70,000, and rent, salary and bills came to ৳12,000. 'So the profit is ৳8,000, not the ৳25,000 you guessed,' Rafi said. His father also saw that the electricity bill had doubled. 'Now I know where to cut costs,' he said.",
      ],
      deepRead: [
        "Accounting is the process by which the financial activities of a person or an institution are correctly recorded in books of accounts, and their actual results are found after a certain period. These activities include paying expenses, receiving income, buying and selling assets and goods, collecting from debtors and paying creditors. The transactions are recorded, classified and summarized, so the financial position of a business can be found and proper decisions taken. Because statements prepared from accounts tell everyone the financial condition of a firm, accounting is called the language of business.",
        "The foremost objective is to record transactions properly, since nothing else is possible without it. Another main objective is to find the financial result and financial condition. Recording all incomes and expenses shows the profit or loss, and calculating assets, liabilities and owner's equity shows the full financial picture. Accounting also helps to control cost, prevent fraud and forgery, inform interested groups and compare results with earlier years. Schools, hospitals and clubs use it to find their balance, and the government uses it to manage VAT, duties and taxes.",
        "Accounting is very old. Early people marked the bark of trees and drew lines on stones in caves. Farmers later made marks on walls and tied knots in rope to count crops and stock. As exchange, currency and trade grew, sales and expenses were written down with numbers. In 1494 the Italian mathematician Luca Pacioli explained double entry book keeping in his book 'Summa de arithmetica, geometria, proportioni et proportionalita'. Today most firms keep accounts on computers.",
      ],
      example: {
        question: "Mitu's stationery shop made ৳40,000 from sales this month. The goods she sold had cost ৳28,000, and the rent was ৳5,000. What is her financial result for the month?",
        options: ["A profit of ৳12,000", "A profit of ৳7,000", "A loss of ৳7,000"],
        answer: 1,
        why: "Income minus all expenses is 40,000 − 28,000 − 5,000 = ৳7,000, so she made a profit of ৳7,000.",
      },
      keyPoints: [
        "Accounting records, classifies and summarizes financial transactions to find the financial result and financial position of a person or an institution.",
        "Its main objectives are to record transactions properly, find the profit or loss and financial position, control cost and prevent fraud and forgery.",
        "Accounting is called the language of business because its statements tell everyone the financial condition of a firm.",
      ],
      misconception: {
        belief: "If there is plenty of money in the cash box at the end of the day, the business must be making a profit.",
        correction: "Cash in hand is not the same as profit. The box may hold money owed to suppliers, a loan, or capital the owner put in. Profit or loss can only be found by recording all the incomes and expenses of a period and comparing them, which is a main objective of accounting.",
      },
      quiz: [
        {
          question: "Why is accounting called the language of business?",
          options: ["It is written in English in most firms", "Its statements tell people the financial condition of a firm", "Only business people can understand it"],
          answer: 1,
          why: "Statements prepared from accounts pass a firm's financial information to everyone who reads them.",
        },
        {
          question: "Who explained the double entry system of book keeping in 1494?",
          options: ["Galileo Galilei", "Adam Smith", "Luca Pacioli"],
          answer: 2,
          why: "The Italian mathematician Luca Pacioli explained it in his book 'Summa de arithmetica, geometria, proportioni et proportionalita'.",
        },
        {
          question: "A salesman in a shop took money from the cash box, and nobody noticed because no records were kept. Which objective of accounting would have helped most?",
          options: ["Preventing fraud and forgery", "Helping the government collect VAT", "Comparing results with earlier years"],
          answer: 0,
          why: "When every sale and payment is recorded, missing money is noticed quickly, so fraud and forgery are controlled.",
        },
      ],
      pairs: [
        { term: "Recording", match: "Writing each financial transaction in the books of accounts" },
        { term: "Classifying", match: "Grouping similar transactions together" },
        { term: "Financial result", match: "The profit or loss of a period" },
        { term: "Financial position", match: "Shown by assets, liabilities and owner's equity" },
        { term: "Luca Pacioli", match: "Explained double entry book keeping in 1494" },
      ],
      order: {
        prompt: "Put these stages in the history of accounting in order.",
        items: [
          "People marked the bark of trees and stones in caves",
          "Farmers made marks on walls and tied knots in rope to count crops",
          "Luca Pacioli explained the double entry system in his 1494 book",
          "Most firms now keep their accounts on computers",
        ],
      },
      blitz: [
        { statement: "Accounting helps a business control its costs by recording all expenses properly.", truth: true, why: "When every expense is recorded, waste becomes visible and can be reduced." },
        { statement: "Accounting is only needed by businesses that aim to make a profit.", truth: false, why: "Schools, hospitals, clubs, families and the government also keep accounts." },
        { statement: "Luca Pacioli, who explained double entry book keeping, was an Italian mathematician.", truth: true, why: "He described the system in his book published in 1494." },
        { statement: "Recording transactions is enough to know the profit, so there is no need to classify or summarize them.", truth: false, why: "Only after grouping and adding up the transactions can the profit or loss of a period be found." },
      ],
      blanks: [
        { sentence: "Accounting is called the ___ of business.", options: ["language", "heart", "engine"], answer: 0 },
        { sentence: "In 1494, ___ explained the double entry system of book keeping.", options: ["Adam Smith", "Luca Pacioli", "Alfred Marshall"], answer: 1 },
      ],
      terms: ["record", "classify", "summarize", "financial result", "financial position", "language of business"],
      sayPrompt: "Explain to a friend what accounting does and why it is called the language of business.",
      glossary: [
        { term: "Accounting", bn: "হিসাববিজ্ঞান" },
        { term: "Language of business", bn: "ব্যবসায়ের ভাষা" },
        { term: "Books of accounts", bn: "হিসাবের বই" },
        { term: "Financial result", bn: "আর্থিক ফলাফল" },
        { term: "Financial position", bn: "আর্থিক অবস্থা" },
        { term: "Profit and loss", bn: "লাভ-ক্ষতি" },
        { term: "Fraud and forgery", bn: "প্রতারণা ও জালিয়াতি" },
        { term: "Double entry", bn: "দুতরফা দাখিলা" },
      ],
    },
    {
      id: "bd-ssc-accounting-1-2",
      title: "Users of accounting information",
      hook: "A bank in Dhaka will not lend a single taka to a business until it has read that business's accounts. Who else reads them, and why?",
      steps: [
        { label: "Information system", text: "Accounting is known as an information system. Records are kept and statements are published with the needs of internal and external users in mind." },
        { label: "Internal users", text: "Owners and managers run the business from inside. They read the statements to learn the profit or loss and the financial condition, and then plan future action." },
        { label: "Lenders, creditors", text: "Loan providers check whether a firm can repay a loan before granting it. Creditors check whether a buyer can pay before selling goods on credit." },
        { label: "Government, others", text: "The government checks that tariffs, taxes and VAT are paid. Auditors, investors, consumers and other concerned persons also use accounting information." },
      ],
      analogy: "Accounting information is like a cricket scorecard. The captain and coach study it to plan the next match. Selectors, sponsors and fans read the same card for their own reasons. One record serves both the team inside and the people outside.",
      story: [
        "Mrs Salma Begum runs a tailoring workshop in Narayanganj with eight sewing machines. She wanted a bank loan of ৳3,00,000 to buy four more. The bank officer listened politely and asked one question: 'May I see your accounts for the last two years?'",
        "Her daughter Nusrat had kept the books neatly. The officer studied the income, the expenses and the money already owed. 'Your profit is steady and your debts are small,' he said. 'You can repay this.' The loan was approved.",
        "That evening Nusrat listed everyone who had read their accounts that year. Her mother and the workshop manager used them every month to plan orders. The bank, a cloth supplier who sold to them on credit, and the VAT office had all asked to see them too.",
      ],
      deepRead: [
        "Accounting is known as an information system. Records of transactions are kept and statements are published with the internal and external users of accounting in mind. Internal users are the owners and managers, who run the business from inside. The accountant prepares the books of accounts and other statements. From these, the owner and the manager identify the profit or loss and the financial condition of the business, and decide its future course of action.",
        "External users are outside the business but still need its information. Loan or credit providers, such as banks, analyse a firm's financial condition before granting a loan, to judge whether it can pay the loan back. The government checks the accounts to see whether the firm pays its tariffs, taxes and VAT, and takes the necessary measures. Creditors, who sell goods on credit, want to be sure that the buyer can pay the due amount, and only the records of accounts can show this. Besides these, auditors, investors, consumers and other concerned persons also use accounting information.",
        "For example, take Rahman Traders in Khulna. The owner checks the monthly profit, and the shop manager checks which goods sell fastest, so both are internal users. A bank studies the accounts before giving a loan, a wholesaler checks them before selling on credit, and the tax office checks the VAT paid, so all three are external users.",
      ],
      example: {
        question: "A wholesaler in Chattogram is deciding whether to sell goods on credit to a shop. What kind of user of the shop's accounting information is the wholesaler?",
        options: ["An internal user", "An external user", "Not a user at all"],
        answer: 1,
        why: "The wholesaler is a creditor outside the business, so it is an external user.",
      },
      keyPoints: [
        "Accounting is known as an information system, because records and statements are kept with the needs of their users in mind.",
        "Internal users are the owners and managers, who use the accounts to find the profit or loss and plan future action.",
        "External users include loan providers, the government, creditors, auditors, investors and consumers.",
      ],
      misconception: {
        belief: "Accounts are private. Only the owner of a business ever needs to look at them.",
        correction: "The owner and the managers are only the internal users. Banks check accounts before lending, creditors check them before selling on credit, and the government checks them for taxes and VAT. Auditors, investors and consumers use them too, so accounts are kept with all these users in mind.",
      },
      quiz: [
        {
          question: "Which of these is an internal user of accounting information?",
          options: ["The manager of the business", "A bank that gives loans", "The tax authority"],
          answer: 0,
          why: "The manager works inside the business and uses its accounts to plan.",
        },
        {
          question: "Why does a bank study a firm's accounts before granting a loan?",
          options: ["To fix the selling price of the firm's goods", "To judge whether the firm can pay the loan back", "To collect VAT from the firm"],
          answer: 1,
          why: "Loan providers analyse the financial condition to see whether the loan will be repaid.",
        },
        {
          question: "Why does the government look at the accounts of a business?",
          options: ["To choose its manager", "To decide the design of its products", "To check that it pays its taxes, duties and VAT"],
          answer: 2,
          why: "The concerned authority checks whether tariffs, taxes and VAT are paid and takes measures if not.",
        },
      ],
      pairs: [
        { term: "Internal users", match: "Owners and managers who run the business" },
        { term: "External users", match: "People and bodies outside the business who need its information" },
        { term: "Loan provider", match: "Checks whether a loan can be paid back" },
        { term: "Creditor", match: "Checks the buyer can pay before selling on credit" },
        { term: "Government", match: "Checks that tariffs, taxes and VAT are paid" },
      ],
      order: {
        prompt: "Put the steps a bank follows before lending to a business in order.",
        items: [
          "The business applies to the bank for a loan",
          "The bank asks to see the business's accounts",
          "The bank analyses the financial condition shown in the statements",
          "The bank judges whether the loan can be repaid and decides",
        ],
      },
      blitz: [
        { statement: "The manager of a business is an internal user of accounting information.", truth: true, why: "Managers work inside the business and use its accounts to plan." },
        { statement: "A tax authority is an internal user because it works closely with businesses.", truth: false, why: "The tax authority is outside the business, so it is an external user." },
        { statement: "Accounting is known as an information system.", truth: true, why: "Its records and statements are prepared to give information to internal and external users." },
        { statement: "A creditor has no reason to look at a buyer's accounts before selling goods on credit.", truth: false, why: "Creditors check the records first to make sure the buyer can pay the due amount." },
      ],
      blanks: [
        { sentence: "Owners and managers are ___ users of accounting information.", options: ["internal", "external", "occasional"], answer: 0 },
        { sentence: "Before granting a loan, a bank analyses a firm's accounts to see whether it can ___ the loan.", options: ["spend", "repay", "refuse"], answer: 1 },
      ],
      terms: ["internal users", "external users", "owners", "managers", "loan providers", "creditors", "government", "information system"],
      sayPrompt: "Tell a friend who uses a business's accounting information, from inside and outside, and what each of them wants to know.",
      glossary: [
        { term: "Users of accounting information", bn: "হিসাব তথ্যের ব্যবহারকারী" },
        { term: "Information system", bn: "তথ্যব্যবস্থা" },
        { term: "Internal users", bn: "অভ্যন্তরীণ ব্যবহারকারী" },
        { term: "External users", bn: "বাহ্যিক ব্যবহারকারী" },
        { term: "Loan provider", bn: "ঋণ প্রদানকারী" },
        { term: "Creditor", bn: "পাওনাদার" },
        { term: "Auditor", bn: "হিসাব নিরীক্ষক" },
        { term: "Investor", bn: "বিনিয়োগকারী" },
      ],
    },
    {
      id: "bd-ssc-accounting-1-3",
      title: "Accounting for society, values and accountability",
      hook: "A factory near the Buriganga can show a healthy profit while harming the river. Good accounts also record what a firm gives back, and who must answer for it.",
      steps: [
        { label: "Society, environment", text: "Accounting is not used only to find profit. Firms spend on pollution control, safe waste disposal and scholarships, and the accountant records these expenses to show their care for society." },
        { label: "Honesty", text: "Proper accounts keep corruption, fraud and misuse of assets under control. Year after year, this builds honesty and a sense of responsibility in the people involved." },
        { label: "Paying dues", text: "Accounts make people conscious of repaying debts, so fewer become loan defaulters. Correct records of income also reduce the tendency to dodge VAT, customs and income tax." },
        { label: "Accountability", text: "Accountability means remaining responsible to a third party for a job. Accounts let a firm answer to its higher authority, to owners, creditors and investors, and to the government." },
      ],
      analogy: "Accounting is like the class monitor's register of the class fund. Because every taka in and out is written down, the monitor can answer any classmate's question, nobody is tempted to borrow quietly, and the money is spent on what the class agreed.",
      story: [
        "Tanvir's uncle runs a small plastics factory in Gazipur with two partners. Last year the neighbours complained that chimney smoke made their children cough. He spent ৳60,000 on a smoke filter and ৳20,000 on scholarships for poor and meritorious students from the village school.",
        "The factory accountant, Mr Hossain, recorded every taka of it. At the partners' meeting, one partner asked why the profit had fallen. Mr Hossain opened the books and showed the filter, the scholarships and the receipts. 'The money was spent on purpose, and here is the proof,' he said.",
        "Tanvir noticed something else. Because every payment had a receipt, no worker could quietly take money, and the factory paid its VAT and income tax on time. 'Accounts are not only about profit,' his uncle said. 'They keep everyone honest and answerable.'",
      ],
      deepRead: [
        "Accounting is not merely used for obtaining profit. It also helps a business contribute to society and the environment. A firm may spend money to resist pollution, and the accountant's records show how conscious the owner is of society and the environment. Using hygienic raw materials, consuming less electricity, keeping machine noise within a tolerable limit and dumping garbage in proper places all cost money that must be recorded. Firms also spend as part of social commitment, such as scholarships for poor and meritorious students.",
        "Value is the combination of long-term beliefs, thoughts and perceptions that sets a standard for accepting the right and ignoring the wrong. Accounting helps create value in five ways. It develops honesty and responsibility, and it builds debt repayment consciousness. It creates a religious sense of value through proper use of God-gifted resources and avoiding unnecessary cost. It makes people responsible towards society and state by reducing tax evasion, and it prevents fraud and forgery through fear of punishment and disrepute.",
        "Accountability means remaining responsible to a third party for a job. Accounting keeps it working at three levels. Inside the firm, people answer to higher authority for the income, expense and investment given to them. Owners, creditors and investors must be shown a true picture of the money invested and the profit earned. The government checks that its rules are followed and that taxes, VAT and duties are paid. For example, the Gazipur factory's records answered the partners' question about its ৳80,000 of social spending.",
      ],
      example: {
        question: "A company in Chattogram gives ৳50,000 in scholarships to poor and meritorious students and records it in its books. Which role of accounting does this show?",
        options: ["Its contribution to society", "Debt repayment consciousness", "Accountability to creditors"],
        answer: 0,
        why: "Spending for society, such as scholarships, and recording it properly shows accounting's relation with society.",
      },
      keyPoints: [
        "Accounting records what a firm spends to protect society and the environment, such as pollution control, safe waste disposal and scholarships.",
        "Accounting builds values such as honesty, responsibility, repaying debts, careful use of resources, paying taxes and resisting fraud and forgery.",
        "Accountability means answering to a third party, and accounts let a firm answer to its higher authority, its owners, creditors and investors, and the government.",
      ],
      misconception: {
        belief: "Accounting only matters for working out profit, so money spent on the environment or on society is just a loss that need not be recorded.",
        correction: "The textbook says accounting is not merely for finding profit. Spending on pollution control, safe waste disposal or scholarships must be recorded properly. These records show the owner's care for society and the environment, prove the money was used as intended, and help the firm follow government rules.",
      },
      quiz: [
        {
          question: "A trader who keeps proper accounts always repays his bank loan on time. Which value created by accounting does this show?",
          options: ["Debt repayment consciousness", "Religious sense of value", "Internal accountability"],
          answer: 0,
          why: "Accounting makes borrowers conscious of repaying loans, so they do not become defaulters.",
        },
        {
          question: "What does accountability mean?",
          options: ["Keeping all accounts on a computer", "Remaining responsible to a third party for a job", "Earning the highest possible profit"],
          answer: 1,
          why: "The textbook defines accountability as remaining responsible to a third party for one's work.",
        },
        {
          question: "The government checks whether a firm has paid its VAT and duties. Which kind of accountability is this?",
          options: ["Internal accountability of the firm", "Accountability towards owners and investors", "Accountability towards the government"],
          answer: 2,
          why: "The government has the legal right to check that its rules are followed and its taxes are paid.",
        },
      ],
      pairs: [
        { term: "Honesty and responsibility", match: "Fraud and misuse of assets stay under control" },
        { term: "Debt repayment consciousness", match: "Fewer people become loan defaulters" },
        { term: "Religious sense of value", match: "Using God-gifted resources well and avoiding needless cost" },
        { term: "Responsibility to the state", match: "Less tendency to dodge VAT and taxes" },
        { term: "Accountability", match: "Remaining responsible to a third party for a job" },
      ],
      order: {
        prompt: "Put the steps of internal accountability in a decentralized firm in order.",
        items: [
          "A manager is given full power over a branch's income, expense and investment",
          "The manager records every transaction of the branch properly",
          "At the end of the period, the results are reported to higher authority",
          "The manager answers the authority's questions using the accounts",
        ],
      },
      blitz: [
        { statement: "Money spent on scholarships for poor students should be recorded in a firm's books of accounts.", truth: true, why: "It is part of social commitment, and the record shows that the fund was properly allocated." },
        { statement: "Accounting is used only for obtaining profit.", truth: false, why: "It also records what a firm does for society and the environment." },
        { statement: "Proper accounts reduce the tendency to dodge taxes.", truth: true, why: "When income is recorded correctly, the right amount of tax can be found and checked." },
        { statement: "Accountability towards the government means the government decides how much profit a firm should earn.", truth: false, why: "The government checks whether its rules are followed and whether taxes, VAT and duties are paid." },
      ],
      blanks: [
        { sentence: "Remaining responsible to a third party for one's job is called ___.", options: ["accountability", "profitability", "liability"], answer: 0 },
        { sentence: "Accounting creates debt repayment consciousness, so fewer people become loan ___.", options: ["providers", "defaulters", "auditors"], answer: 1 },
      ],
      terms: ["society", "environment", "value", "honesty", "fraud and forgery", "accountability", "third party"],
      sayPrompt: "Explain to a friend how keeping accounts makes a business more honest, more answerable and more careful of the environment.",
      glossary: [
        { term: "Value", bn: "মূল্যবোধ" },
        { term: "Accountability", bn: "জবাবদিহিতা" },
        { term: "Honesty and responsibility", bn: "সততা ও দায়িত্ববোধ" },
        { term: "Social commitment", bn: "সামাজিক দায়বদ্ধতা" },
        { term: "Loan defaulter", bn: "ঋণখেলাপি" },
        { term: "Tax evasion", bn: "কর ফাঁকি" },
        { term: "Misappropriation of funds", bn: "তহবিল তছরুপ" },
        { term: "Decentralization", bn: "বিকেন্দ্রীকরণ" },
      ],
    },
  ],
  cq: {
    stem: "Nusrat runs a bakery in Khulna. Before she kept proper books, she never knew her profit, and a salesman once took ৳3,000 from the cash box without anyone noticing. In March 2025 her records showed sales of ৳1,20,000, while the cost of goods sold and other expenses came to ৳85,000. These expenses included ৳5,000 for a smoke filter on her oven. She now wants a loan of ৳2,00,000 from a bank to open a second shop, and the bank has asked to see her accounts.",
    knowledge: {
      q: "Who explained the double entry system of book keeping, and in which year?",
      a: "The Italian mathematician Luca Pacioli explained the double entry system of book keeping in 1494, in his book 'Summa de arithmetica, geometria, proportioni et proportionalita'.",
    },
    comprehension: {
      q: "Why is accounting called the language of business?",
      a: "Accounting records, classifies and summarizes a firm's financial transactions and prepares statements from them. These statements tell owners, managers, banks, the government and others the firm's profit or loss and its financial condition. Just as a language carries information from one person to another, accounting carries a business's financial information to everyone who needs it. That is why accounting is called the language of business.",
    },
    application: {
      q: "Find Nusrat's profit for March 2025 and explain which objective of accounting this shows.",
      a: "Profit = total income − total expenses = ৳1,20,000 − ৳85,000 = ৳35,000. So Nusrat earned a profit of ৳35,000 in March 2025. This shows the objective of ascertaining the financial result. Before she kept books, she could not tell whether she made a profit or a loss. Now that all her incomes and expenses are recorded properly, the profit of the period can be determined, and she can also see which costs to control.",
    },
    higherOrder: {
      q: "Judge how far proper accounting has helped Nusrat's business, considering the stolen cash, the smoke filter and the bank loan.",
      a: "Proper accounting has helped her business in three ways. First, fraud and forgery: the salesman could take ৳3,000 because nothing was recorded. Now every sale and payment is written down, so missing cash is noticed at once, staff become cautious and fraud is controlled. Second, society and environment: the ৳5,000 smoke filter is recorded as an expense, which shows her care for her neighbours and the environment and proves she follows pollution rules. Third, external users: the bank is an external user. It will analyse her records, including the ৳35,000 monthly profit, to judge whether she can repay ৳2,00,000, which she could not show without accounts. So accounting has made her business more honest, more responsible and more trusted by lenders, and it is essential for her plan to grow.",
    },
  },
} satisfies UnitContent;

export default unit;
