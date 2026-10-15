import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-ssc-physics",
  unit: 1,
  title: "Physical Quantities and Their Measurements",
  titleBn: "ভৌত রাশি ও পরিমাপ",
  summary: "After this unit you can sort physical quantities into fundamental and derived with their SI units, use dimensions to check an equation, and take accurate readings with slide calipers and a screw gauge.",
  concepts: [
    {
      id: "bd-ssc-physics-1-1",
      title: "Fundamental and derived quantities and their SI units",
      hook: "Every measurement in physics is a number with a unit. Just seven fundamental quantities build every other quantity you will meet.",
      steps: [
        { label: "Compare", text: "Measuring means comparing a quantity with a fixed standard of the same kind. That standard is the unit. A 4 m bamboo pole is four times as long as 1 m." },
        { label: "Fundamental", text: "Seven quantities do not depend on any other: length, mass, time, temperature, electric current, luminous intensity and amount of substance. These are the fundamental quantities." },
        { label: "Derived", text: "Quantities built from fundamental ones are derived quantities. Velocity is displacement divided by time. Force is mass times acceleration. Their units, such as m s⁻¹ and the newton, are derived units." },
        { label: "SI units", text: "Since 1960 scientists everywhere use the International System of Units, SI. Its fundamental units are the metre, kilogram, second, kelvin, ampere, candela and mole." },
      ],
      analogy: "Fundamental quantities are like the letters of the Bangla alphabet. Every word is built from letters, and you can always spell a word back into them. Derived quantities are the words: velocity is spelled from length and time, and force from mass, length and time.",
      story: [
        "Mitu's grandmother in Sylhet still buys rice by the seer and measures cloth by the haat, the length of a forearm. At the market, Mitu asked the tailor for four haat of cloth for a kameez. The tailor's forearm was longer than her grandmother's, and the piece came out far too big.",
        "Her physics teacher, Mr Karim, smiled when she told the class. 'That is exactly why scientists agreed on SI units in 1960,' he said. 'A metre in Sylhet is the same as a metre in Paris.'",
        "He wrote two lists on the board. Length, mass and time went in the first list, which he called fundamental. Speed, area and force went in the second. 'Each of these is built from the first list,' he said. 'Speed is length divided by time.' That evening Mitu measured the cloth again, this time in metres.",
      ],
      deepRead: [
        "A physical quantity is anything in nature that can be measured, such as length, mass, time or temperature. Measuring it means comparing it with a standard amount of the same kind, called a unit. So every measurement has two parts, a number and a unit. Saying a table is 2 tells you nothing. Saying it is 2 m long is a measurement.",
        "Physical quantities are of two kinds. Fundamental quantities do not depend on any other quantity. SI has seven: length (metre, m), mass (kilogram, kg), time (second, s), temperature (kelvin, K), electric current (ampere, A), luminous intensity (candela, cd) and amount of substance (mole, mol). Derived quantities depend on fundamental ones. Worked example: a classroom floor is 8 m long and 6 m wide, so its area is 8 m × 6 m = 48 m². Area comes from length times length, so it is derived, and m² is a derived unit. In the same way velocity has the unit m s⁻¹, and force has the unit newton, where 1 N = 1 kg m s⁻².",
        "Very large and very small values are written with prefixes or in scientific notation. Kilo means 10³, mega 10⁶, milli 10⁻³ and micro 10⁻⁶, so 5 km = 5000 m. In scientific notation a number from 1 to 10 is multiplied by a power of 10. The distance from the Earth to the Sun, about 150,000,000,000 m, is written 1.5 × 10¹¹ m.",
      ],
      example: {
        question: "Nusrat's room is 4 m long and 3 m wide. What is its floor area, and what kind of unit is the answer in?",
        options: ["12 m, a fundamental unit", "12 m², a derived unit", "7 m², a derived unit"],
        answer: 1,
        why: "Area is length times length, 4 m × 3 m = 12 m², and m² is built from the metre, so it is a derived unit.",
      },
      keyPoints: [
        "A measurement compares a quantity with a standard unit, so every measured value needs both a number and a unit.",
        "The seven fundamental quantities, such as length, mass and time, do not depend on any other quantity.",
        "Derived quantities such as area, velocity and force are built from fundamental ones, and so are their units.",
      ],
      misconception: {
        belief: "Electric charge is a fundamental quantity, and current is derived from it because current is charge flowing each second.",
        correction: "In SI it is the other way round. Electric current is one of the seven fundamental quantities, with the unit ampere. Charge is derived from it: 1 coulomb is the charge carried when 1 A flows for 1 s, so 1 C = 1 A s.",
      },
      quiz: [
        {
          question: "Which of these is a fundamental quantity?",
          options: ["Force", "Luminous intensity", "Velocity", "Area"],
          answer: 1,
          why: "Luminous intensity is one of the seven SI fundamental quantities, while the others are built from length, mass and time.",
        },
        {
          question: "The Padma Bridge is about 6.15 km long. What is this length in metres?",
          options: ["615 m", "6150 m", "61500 m"],
          answer: 1,
          why: "Kilo means 10³, so 6.15 km = 6.15 × 1000 m = 6150 m.",
        },
        {
          question: "What is the SI unit of temperature?",
          options: ["Degree Celsius", "Degree Fahrenheit", "Kelvin"],
          answer: 2,
          why: "The kelvin, K, is the SI fundamental unit of temperature.",
        },
      ],
      pairs: [
        { term: "Metre", match: "SI unit of length" },
        { term: "Kilogram", match: "SI unit of mass" },
        { term: "Ampere", match: "SI unit of electric current" },
        { term: "Mole", match: "SI unit of amount of substance" },
        { term: "Newton", match: "Derived unit of force, equal to 1 kg m s⁻²" },
      ],
      order: {
        prompt: "Put these steps for finding the SI unit of force in order.",
        items: [
          "Write the relation: force equals mass times acceleration",
          "Write acceleration as velocity divided by time",
          "Write velocity as displacement divided by time",
          "Combine the units to get kg m s⁻², called the newton",
        ],
      },
      blitz: [
        { statement: "Time is a fundamental quantity, and its SI unit is the second.", truth: true, why: "Time is one of the seven fundamental quantities, measured in seconds." },
        { statement: "Weight is a fundamental quantity measured in kilograms.", truth: false, why: "Weight is a force, so it is derived and measured in newtons. The kilogram is the unit of mass." },
        { statement: "1 mm is equal to 10⁻³ m.", truth: true, why: "Milli means 10⁻³, so a millimetre is one thousandth of a metre." },
        { statement: "Velocity is a fundamental quantity because a speedometer measures it directly.", truth: false, why: "Velocity is displacement divided by time, so it is derived however it is measured." },
      ],
      blanks: [
        { sentence: "The SI unit of luminous intensity is the ___.", options: ["candela", "kelvin", "mole"], answer: 0 },
        { sentence: "In scientific notation, 0.00052 m is written as ___.", options: ["5.2 × 10⁻³ m", "5.2 × 10⁻⁴ m", "52 × 10⁻⁵ m"], answer: 1 },
      ],
      terms: ["fundamental quantity", "derived quantity", "unit", "SI", "metre", "kilogram", "second"],
      sayPrompt: "Tell a friend why time is a fundamental quantity but velocity is a derived one",
      glossary: [
        { term: "physical quantity", bn: "ভৌত রাশি" },
        { term: "fundamental quantity", bn: "মৌলিক রাশি" },
        { term: "derived quantity", bn: "লব্ধ রাশি" },
        { term: "measurement", bn: "পরিমাপ" },
        { term: "unit", bn: "একক" },
        { term: "fundamental unit", bn: "মৌলিক একক" },
        { term: "derived unit", bn: "লব্ধ একক" },
        { term: "prefix", bn: "উপসর্গ" },
      ],
    },
    {
      id: "bd-ssc-physics-1-2",
      title: "Dimensions of physical quantities",
      hook: "Dimensions show what a quantity is made of in mass, length and time. They let you catch a wrong formula before it costs you marks.",
      steps: [
        { label: "Base symbols", text: "Each fundamental quantity has a dimension symbol. Length is L, mass is M and time is T. Every other quantity is written using these letters and their powers." },
        { label: "Break it down", text: "Write the quantity in terms of fundamental ones. Velocity is displacement divided by time, so its dimension is L divided by T, written LT⁻¹." },
        { label: "Build up", text: "Use the results you already have. Acceleration is velocity divided by time, which gives LT⁻². Force is mass times acceleration, which gives MLT⁻²." },
        { label: "Check equations", text: "In a correct equation, every term that is added or equated has the same dimension. If even one term differs, the equation is wrong." },
      ],
      analogy: "Dimensions are like checking currency before adding money. You can add 50 taka to 20 taka, but adding 50 taka to 20 US dollars gives no sensible total. In physics a length can only be added to a length, never to a time.",
      story: [
        "The night before his physics test, Tanvir was studying at home in Mirpur when load-shedding cut the lights. By the glow of his phone torch, he tried to recall a motion formula. Was it s = ut + ½at² or s = ut + ½at?",
        "He remembered his teacher's trick. On a scrap of paper he wrote the dimension of each term. Distance s is a length, L. The term ut is LT⁻¹ times T, which is also L. So far, so good.",
        "Then he tried ½at. Acceleration is LT⁻², and multiplying by T gave LT⁻¹. That was a velocity, not a length, so it could not be added to s. With at², the T's cancelled properly and left L. 'So it is t squared,' he whispered, just as the ceiling fan whirred back to life.",
      ],
      deepRead: [
        "The dimension of a physical quantity shows the powers to which the fundamental quantities are raised in it. Length, mass and time are written L, M and T. Area is length × length, so its dimension is L², and volume is L³. Velocity is displacement ÷ time, so its dimension is LT⁻¹. Acceleration is velocity ÷ time, LT⁻². Force is mass × acceleration, MLT⁻². Pure numbers such as 2 or ½ have no dimension.",
        "Worked example: find the dimension of work. Work = force × displacement. Force is MLT⁻² and displacement is L, so work has dimension MLT⁻² × L = ML²T⁻². This also gives its SI unit, kg m² s⁻², which is called the joule.",
        "Dimensions are used to test equations. Take v = u + at. The left side, v, has dimension LT⁻¹. On the right, u is LT⁻¹ and at is LT⁻² × T = LT⁻¹. Every term matches, so the equation is dimensionally correct. A term with a different dimension proves an equation wrong. But matching dimensions cannot prove an equation right, because a number like ½ or 2 is invisible to this check.",
      ],
      example: {
        question: "Pressure is force divided by area. Force has dimension MLT⁻² and area has dimension L². What is the dimension of pressure?",
        options: ["ML⁻¹T⁻²", "MLT⁻²", "ML³T⁻²"],
        answer: 0,
        why: "MLT⁻² ÷ L² = ML⁻¹T⁻², because L divided by L² leaves L⁻¹.",
      },
      keyPoints: [
        "The dimension of a quantity shows the powers of mass, length and time in it, written with M, L and T.",
        "Velocity has dimension LT⁻¹, acceleration LT⁻² and force MLT⁻².",
        "In a correct equation every added or equated term has the same dimension, but numbers like ½ cannot be checked this way.",
      ],
      misconception: {
        belief: "If both sides of an equation have the same dimension, the equation must be correct.",
        correction: "Matching dimensions is needed but not enough. Both s = ut + at² and s = ut + ½at² pass the check, because the number ½ has no dimension, yet only the second is right. A dimension check can prove an equation wrong, but it can never fully prove it right.",
      },
      quiz: [
        {
          question: "What is the dimension of acceleration?",
          options: ["LT⁻¹", "LT⁻²", "MLT⁻²"],
          answer: 1,
          why: "Acceleration is velocity divided by time, so LT⁻¹ ÷ T = LT⁻².",
        },
        {
          question: "Which quantity has the dimension MLT⁻²?",
          options: ["Force", "Velocity", "Work", "Area"],
          answer: 0,
          why: "Force is mass times acceleration, M × LT⁻² = MLT⁻², while work is ML²T⁻².",
        },
        {
          question: "Nusrat checks the equation v² = u² + 2as. What is the dimension of the term 2as?",
          options: ["LT⁻²", "L²T⁻¹", "L²T⁻²"],
          answer: 2,
          why: "a is LT⁻² and s is L, so as is L²T⁻², and the 2 has no dimension, which matches v².",
        },
      ],
      pairs: [
        { term: "Area", match: "L²" },
        { term: "Volume", match: "L³" },
        { term: "Velocity", match: "LT⁻¹" },
        { term: "Acceleration", match: "LT⁻²" },
        { term: "Force", match: "MLT⁻²" },
      ],
      order: {
        prompt: "Build up these dimensions in order, each one from the step before.",
        items: [
          "Velocity is displacement divided by time, so it is LT⁻¹",
          "Acceleration is velocity divided by time, so it is LT⁻²",
          "Force is mass times acceleration, so it is MLT⁻²",
          "Work is force times displacement, so it is ML²T⁻²",
        ],
      },
      blitz: [
        { statement: "The dimension of velocity is LT⁻¹.", truth: true, why: "Velocity is displacement, L, divided by time, T." },
        { statement: "The ½ in s = ut + ½at² has the dimension of time.", truth: false, why: "Pure numbers such as ½ have no dimension." },
        { statement: "An equation with one term of a different dimension must be wrong.", truth: true, why: "Only quantities of the same dimension can be added or equated." },
        { statement: "Work and force have the same dimension because both involve a push.", truth: false, why: "Work is force times displacement, so it is ML²T⁻², while force is MLT⁻²." },
      ],
      blanks: [
        { sentence: "The dimension of force is ___.", options: ["MLT⁻¹", "MLT⁻²", "ML²T⁻²"], answer: 1 },
        { sentence: "A dimension check can prove an equation ___, but never fully correct.", options: ["wrong", "longer", "shorter"], answer: 0 },
      ],
      terms: ["dimension", "length", "mass", "time", "power", "equation"],
      sayPrompt: "Explain to a friend how dimensions show that s = ut + ½at² could be right but s = ut + ½at is wrong",
      glossary: [
        { term: "dimension", bn: "মাত্রা" },
        { term: "dimensional equation", bn: "মাত্রা সমীকরণ" },
        { term: "displacement", bn: "সরণ" },
        { term: "velocity", bn: "বেগ" },
        { term: "acceleration", bn: "ত্বরণ" },
        { term: "force", bn: "বল" },
        { term: "work", bn: "কাজ" },
        { term: "area", bn: "ক্ষেত্রফল" },
      ],
    },
    {
      id: "bd-ssc-physics-1-3",
      title: "Measuring small lengths with slide calipers and screw gauge",
      hook: "A metre scale reads only to the nearest millimetre. Slide calipers and a screw gauge read ten and a hundred times finer.",
      steps: [
        { label: "Vernier constant", text: "For slide calipers, VC = s/n. Here s is the smallest main scale division and n is the number of vernier divisions. With s = 1 mm and n = 10, VC = 0.1 mm." },
        { label: "Calipers reading", text: "Length L = M + V × VC. M is the main scale reading just before the vernier zero. V is the vernier division that lines up exactly with a main scale mark." },
        { label: "Least count", text: "For a screw gauge, the pitch is the distance moved in one full turn. Least count = pitch ÷ number of circular scale divisions. A 1 mm pitch with 100 divisions gives 0.01 mm." },
        { label: "Correct the error", text: "Close the instrument with nothing inside. If the zeros do not line up, it has an instrumental error. Subtract that error, with its sign, from every reading." },
      ],
      analogy: "A vernier is like two rows of bricks laid side by side, with the bricks in one row slightly shorter. The joints line up in only one place. Where they line up tells you the small offset between the rows, far less than a single brick.",
      story: [
        "Rafi's uncle runs an electrical shop on Station Road in Chattogram. A customer wanted wire exactly 1.5 mm thick, but the label had worn off one coil. Rafi's ruler showed about one and a half millimetres, which was not good enough.",
        "Rafi borrowed a screw gauge from his school lab. First he closed it with nothing inside and checked that the zeros lined up. Then he gripped the wire gently and read the scales. The linear scale showed 1 mm, and the 52nd circular division sat on the reference line.",
        "The gauge had a least count of 0.01 mm. He worked it out on the counter: 1 mm plus 52 × 0.01 mm gave 1.52 mm. 'Close enough to 1.5,' said his uncle, and he cut the length the customer wanted.",
      ],
      deepRead: [
        "Slide calipers combine a main scale with a small sliding scale called the vernier scale. The vernier constant, VC, is the difference between one smallest main scale division and one vernier division. It is found from VC = s/n, where s is the value of the smallest main scale division and n is the number of vernier divisions. If 10 vernier divisions equal 9 mm on the main scale, then s = 1 mm, n = 10 and VC = 0.1 mm = 0.01 cm. Worked example: a marble sits between the jaws. The main scale reading just before the vernier zero is M = 1.8 cm, and the 7th vernier division coincides with a main scale mark, so V = 7. The diameter is L = M + V × VC = 1.8 cm + 7 × 0.01 cm = 1.87 cm.",
        "A screw gauge measures even smaller lengths, such as the diameter of a wire. Its pitch is the distance the spindle moves along the linear scale in one full turn of the cap. Least count = pitch ÷ number of circular scale divisions, so a 0.5 mm pitch with 50 divisions gives 0.01 mm. The reading is L + C × LC, where L is the linear scale reading and C is the circular scale division on the reference line.",
        "Before measuring, close either instrument with nothing inside. If the zeros do not coincide, the instrument has an instrumental error. Note it with its sign and subtract it from each reading. Repeating a measurement and taking the average reduces random error.",
      ],
      example: {
        question: "A slide calipers has 20 vernier divisions, and the smallest main scale division is 1 mm. What is its vernier constant?",
        options: ["0.5 mm", "0.05 mm", "0.2 mm"],
        answer: 1,
        why: "VC = s/n = 1 mm ÷ 20 = 0.05 mm.",
      },
      keyPoints: [
        "The vernier constant is VC = s/n, and a slide calipers reading is L = M + V × VC.",
        "A screw gauge's least count is its pitch divided by the number of circular scale divisions.",
        "Check for instrumental error before measuring, and subtract it, with its sign, from every reading.",
      ],
      misconception: {
        belief: "If the vernier zero sits to the right of the main scale zero when the jaws are closed, I should add that error to my reading.",
        correction: "A zero to the right means the calipers already read more than zero with nothing inside. That is a positive error, and every reading is too large by that amount, so you subtract it. Corrected reading = observed reading − error. For a negative error, subtracting a negative value adds it back.",
      },
      quiz: [
        {
          question: "A screw gauge has a pitch of 1 mm and 100 circular scale divisions. What is its least count?",
          options: ["0.1 mm", "0.01 mm", "100 mm"],
          answer: 1,
          why: "Least count = pitch ÷ divisions = 1 mm ÷ 100 = 0.01 mm.",
        },
        {
          question: "Slide calipers have VC = 0.01 cm. The main scale reads 3.2 cm and the 5th vernier division coincides. What is the length?",
          options: ["3.25 cm", "3.205 cm", "3.7 cm"],
          answer: 0,
          why: "L = M + V × VC = 3.2 cm + 5 × 0.01 cm = 3.25 cm.",
        },
        {
          question: "Which instrument is best for measuring the diameter of a thin copper wire?",
          options: ["Metre scale", "Slide calipers", "Screw gauge"],
          answer: 2,
          why: "A screw gauge usually reads to 0.01 mm, ten times finer than common slide calipers.",
        },
      ],
      pairs: [
        { term: "Vernier constant", match: "One main scale division minus one vernier division" },
        { term: "Pitch", match: "Distance moved in one full turn of the screw" },
        { term: "Least count", match: "Distance moved when the circular scale turns one division" },
        { term: "Vernier coincidence", match: "The vernier division that lines up with a main scale mark" },
        { term: "Instrumental error", match: "The reading an instrument shows when it should show zero" },
      ],
      order: {
        prompt: "Put the steps of this screw gauge measurement in order.",
        items: [
          "Turn the cap 5 full turns and see the spindle move 2.5 mm",
          "Divide 2.5 mm by 5 to get a pitch of 0.5 mm",
          "Divide 0.5 mm by 50 circular divisions to get a least count of 0.01 mm",
          "Add C × 0.01 mm to the linear scale reading to get the diameter",
        ],
      },
      blitz: [
        { statement: "A screw gauge with a 0.5 mm pitch and 50 circular divisions has a least count of 0.01 mm.", truth: true, why: "0.5 mm ÷ 50 = 0.01 mm." },
        { statement: "The more vernier divisions there are, the larger the vernier constant becomes.", truth: false, why: "VC = s/n, so more divisions give a smaller vernier constant and a finer reading." },
        { statement: "A positive instrumental error must be subtracted from the observed reading.", truth: true, why: "The instrument reads too much by that amount, so the error is taken away." },
        { statement: "The pitch of a screw gauge is the distance moved when the cap turns one circular division.", truth: false, why: "That is the least count. The pitch is the distance moved in one full turn." },
      ],
      blanks: [
        { sentence: "The distance the spindle moves in one full turn of the cap is called the ___.", options: ["least count", "vernier constant", "pitch"], answer: 2 },
        { sentence: "If 10 vernier divisions equal 9 main scale divisions of 1 mm, the vernier constant is ___.", options: ["0.9 mm", "0.1 mm", "1 mm"], answer: 1 },
      ],
      terms: ["vernier constant", "main scale", "pitch", "least count", "circular scale", "instrumental error"],
      sayPrompt: "Explain to a classmate how to find a screw gauge's least count and use it to read a wire's diameter",
      glossary: [
        { term: "slide calipers", bn: "স্লাইড ক্যালিপার্স" },
        { term: "vernier scale", bn: "ভার্নিয়ার স্কেল" },
        { term: "vernier constant", bn: "ভার্নিয়ার ধ্রুবক" },
        { term: "vernier coincidence", bn: "ভার্নিয়ার সমপাতন" },
        { term: "screw gauge", bn: "স্ক্রু গজ" },
        { term: "pitch", bn: "পিচ" },
        { term: "least count", bn: "লঘিষ্ঠ গণন" },
        { term: "instrumental error", bn: "যান্ত্রিক ত্রুটি" },
      ],
    },
  ],
  cq: {
    stem: "In a school laboratory in Khulna, Rafi measures the diameter of a copper wire with a screw gauge. When he turns the cap through 5 full turns, the spindle moves 2.5 mm along the linear scale. The circular scale has 50 divisions. With the wire gripped, the linear scale reads 1 mm and the 32nd circular division lies on the reference line. His friend Mitu measures the same wire with slide calipers whose vernier constant is 0.1 mm. Neither instrument has any instrumental error.",
    knowledge: {
      q: "What is the pitch of a screw gauge?",
      a: "The pitch of a screw gauge is the distance the spindle moves along the linear scale when the cap is turned through one full rotation.",
    },
    comprehension: {
      q: "Explain why force is a derived quantity.",
      a: "A derived quantity depends on fundamental quantities. Force = mass × acceleration. Acceleration is velocity divided by time, and velocity is displacement divided by time. So force = mass × displacement ÷ time², which depends on mass, length and time. Its dimension is MLT⁻² and its unit, the newton, equals kg m s⁻². Because force can be broken down into fundamental quantities, it is a derived quantity.",
    },
    application: {
      q: "Find the diameter of the wire that Rafi measured.",
      a: "Pitch = distance moved ÷ number of turns = 2.5 mm ÷ 5 = 0.5 mm. Least count, LC = pitch ÷ number of circular scale divisions = 0.5 mm ÷ 50 = 0.01 mm. Linear scale reading, L = 1 mm, and circular scale reading, C = 32. Diameter = L + C × LC = 1 mm + 32 × 0.01 mm = 1 mm + 0.32 mm = 1.32 mm. So the diameter of the wire is 1.32 mm.",
    },
    higherOrder: {
      q: "Whose measurement of the wire's diameter is more accurate, Rafi's or Mitu's? Analyse with reasons from the stem.",
      a: "Rafi's screw gauge has a least count of 0.01 mm, found in part গ, while Mitu's slide calipers have a vernier constant of 0.1 mm. The smallest length an instrument can read is its least count, so the screw gauge reads 10 times finer. Rafi reads the diameter as 1.32 mm, correct to a hundredth of a millimetre. Mitu can read only to the nearest 0.1 mm, so she gets about 1.3 mm and loses the last digit. The possible error compared with the diameter is about 0.01 ÷ 1.32 × 100% ≈ 0.76% for Rafi, but about 0.1 ÷ 1.32 × 100% ≈ 7.6% for Mitu. So for a thin wire, Rafi's screw gauge measurement is the more accurate one.",
    },
  },
} satisfies UnitContent;

export default unit;
