import type { UnitContent } from "@/content/types";

const unit = {
  subject: "bd-hsc-physics1",
  unit: 1,
  title: "Physical World and Measurement",
  titleBn: "ভৌতজগত ও পরিমাপ",
  summary: "After this unit you can correct readings for zero and backlash errors, find a lens's radius of curvature with a spherometer, use dimensional analysis to check, derive and convert, and work out how errors spread through a calculation.",
  concepts: [
    {
      id: "bd-hsc-physics1-1-1",
      title: "Precision instruments, zero error and the spherometer",
      hook: "A reading is only as good as the instrument behind it. Correct its zero error first, and a screw can even measure how curved a lens is.",
      steps: [
        { label: "Calipers zero", text: "Close the jaws of the slide calipers. If the vernier zero lies right of the main scale zero, the error is positive and equals V × VC. If it lies left, the error is negative." },
        { label: "Gauge zero", text: "Bring the studs of the screw gauge together. If the circular scale has not yet reached zero, the error is positive. If its zero has passed the reference line, the error is negative." },
        { label: "Correct it", text: "Corrected reading = observed reading − zero error, with the sign kept. So a +0.03 mm error is subtracted, and a −0.03 mm error is added back." },
        { label: "Spherometer", text: "A spherometer's three outer legs form an equilateral triangle of side a. Its central screw measures h, how far the curved surface rises above the legs. Then R = a²/(6h) + h/2." },
      ],
      analogy: "Zero error is like a market weighing scale that shows 200 g with an empty pan. Every bag of rice then reads 200 g too heavy, so the seller must subtract 200 g each time. Weighing the bag again and again never fixes it.",
      story: [
        "In the HSC practical class at a college in Chattogram, Farhan had to find the radius of curvature of a convex lens. He set the spherometer on a flat glass plate and turned the central screw until its tip just touched the glass. He noted the reading.",
        "Next he set it on the lens. He raised the screw too far, turned it back down, and the reading no longer matched his first try. 'That is backlash,' said his teacher, Mrs Rahman. 'A worn screw slips a little in its nut when you reverse it. Raise it well above the lens, then only turn it down.'",
        "Farhan started again, turning one way only. The screw had risen 1 full turn and 50 divisions, so h = 1.50 mm, and the legs were 30 mm apart. He worked out R = 900/9 + 0.75 = 100.75 mm. The label on the lens box said 10 cm.",
      ],
      deepRead: [
        "An instrument has zero error when it does not read zero with nothing being measured. In slide calipers, close the jaws. If the vernier zero lies to the right of the main scale zero, the error is positive and equals V × VC, where V is the coinciding vernier division. In a screw gauge with pitch 1 mm and 100 circular divisions, the least count is 0.01 mm. If, with the studs touching, the 4th division sits on the reference line, the zero error is +0.04 mm. If the zero has passed the line and the 96th division sits on it, the error is −(100 − 96) × 0.01 mm = −0.04 mm. For both instruments, corrected reading = observed reading − zero error.",
        "Screw instruments such as the screw gauge and spherometer also suffer from backlash error. With wear, a small gap opens between the screw thread and the nut. When the turning direction is reversed, the cap turns a little before the screw moves. To avoid it, always turn the screw in one direction while taking a reading.",
        "A spherometer measures the radius of curvature of a spherical surface. Its three outer legs form an equilateral triangle of side a, and its central leg is a screw with a circular scale. Take a reading on a plane glass plate, then on the lens. The difference is h. Worked example: the screw rises 1 full turn and 50 divisions with LC = 0.01 mm, so h = 1.50 mm. With a = 30 mm, R = a²/(6h) + h/2 = 900/9 + 0.75 = 100.75 mm, about 10.1 cm.",
      ],
      example: {
        question: "With its studs touching, a screw gauge reads 0.05 mm. It then reads 1.37 mm on a wire. What is the wire's true diameter?",
        options: ["1.32 mm", "1.42 mm", "1.37 mm"],
        answer: 0,
        why: "The zero error is +0.05 mm, so the corrected reading is 1.37 mm − 0.05 mm = 1.32 mm.",
      },
      keyPoints: [
        "Corrected reading equals observed reading minus zero error, so a positive zero error is subtracted and a negative one is added.",
        "Backlash error appears when a screw's turning direction is reversed, so turn the screw one way only while taking a reading.",
        "A spherometer gives R = a²/(6h) + h/2, where a is the distance between two outer legs and h the height measured.",
      ],
      misconception: {
        belief: "A zero error is always taken away from the reading, so the corrected reading is smaller whether the error is positive or negative.",
        correction: "The sign matters. Corrected reading = observed reading − zero error. With a zero error of −0.04 mm the gauge reads too little, so 2.36 mm − (−0.04 mm) = 2.40 mm. The corrected reading becomes larger.",
      },
      quiz: [
        {
          question: "A screw gauge has a least count of 0.01 mm and 100 circular divisions. With the studs touching, its zero has passed the reference line and the 97th division sits on it. What is the zero error?",
          options: ["+0.97 mm", "−0.03 mm", "+0.03 mm"],
          answer: 1,
          why: "The zero has passed the line, so the error is negative: −(100 − 97) × 0.01 mm = −0.03 mm.",
        },
        {
          question: "Which error appears when the turning direction of a screw gauge or spherometer is reversed?",
          options: ["Zero error", "Backlash error", "Parallax error"],
          answer: 1,
          why: "A gap between the worn screw thread and the nut lets the cap turn before the screw moves, which is backlash error.",
        },
        {
          question: "A spherometer's outer legs are 60 mm apart. On a convex lens, h is 3 mm. What is the radius of curvature of the lens surface?",
          options: ["200 mm", "201.5 mm", "401.5 mm"],
          answer: 1,
          why: "R = a²/(6h) + h/2 = 3600/18 + 1.5 = 200 + 1.5 = 201.5 mm.",
        },
      ],
      pairs: [
        { term: "Zero error", match: "The reading shown when nothing is being measured" },
        { term: "Backlash error", match: "Lost motion when a screw's turning direction is reversed" },
        { term: "Spherometer", match: "Measures the radius of curvature of a spherical surface" },
        { term: "Negative zero error", match: "Its size is added to the observed reading" },
        { term: "Three outer legs", match: "Form an equilateral triangle of side a" },
      ],
      order: {
        prompt: "Put the steps for finding a lens's radius of curvature with a spherometer in order.",
        items: [
          "Find the least count from the pitch and the circular scale divisions",
          "Set the spherometer on a plane glass plate and take a reading",
          "Set it on the lens, turn the screw until it touches, and read again",
          "Take the difference as h and use R = a²/(6h) + h/2",
        ],
      },
      blitz: [
        { statement: "A screw gauge that reads +0.02 mm with its studs touching has a positive zero error.", truth: true, why: "It reads more than zero with nothing between the studs." },
        { statement: "A negative zero error is subtracted from the observed reading, making the result smaller.", truth: false, why: "Corrected reading = observed − (negative error), so the size of the error is added and the result grows." },
        { statement: "Turning a spherometer screw in one direction only while reading avoids backlash error.", truth: true, why: "Backlash happens only when the turning direction is reversed." },
        { statement: "In R = a²/(6h) + h/2, a is the radius of the lens being measured.", truth: false, why: "a is the distance between two outer legs of the spherometer." },
      ],
      blanks: [
        { sentence: "Corrected reading = observed reading ___ zero error.", options: ["minus", "plus", "times"], answer: 0 },
        { sentence: "The error caused by a gap between a screw's thread and its nut is called ___ error.", options: ["zero", "backlash", "parallax"], answer: 1 },
      ],
      terms: ["zero error", "backlash error", "least count", "spherometer", "radius of curvature", "pitch"],
      sayPrompt: "Explain to a friend how to correct a screw gauge reading when its zero error is negative",
      glossary: [
        { term: "zero error", bn: "শূন্য ত্রুটি" },
        { term: "backlash error", bn: "পিছট ত্রুটি" },
        { term: "instrumental error", bn: "যান্ত্রিক ত্রুটি" },
        { term: "spherometer", bn: "স্ফেরোমিটার" },
        { term: "radius of curvature", bn: "বক্রতার ব্যাসার্ধ" },
        { term: "spherical surface", bn: "গোলীয় তল" },
        { term: "pitch", bn: "পিচ" },
        { term: "least count", bn: "লঘিষ্ঠ গণন" },
      ],
    },
    {
      id: "bd-hsc-physics1-1-2",
      title: "Dimensional analysis to check and derive equations",
      hook: "With nothing but M, L and T you can test a formula, convert units and even predict how a pendulum swings.",
      steps: [
        { label: "Dimensions", text: "Write each quantity as powers of M, L and T. Momentum is mass × velocity, so it is MLT⁻¹. Power is work ÷ time, so it is ML²T⁻³." },
        { label: "Check", text: "By the principle of homogeneity, every term added or equated in a correct equation has the same dimension. In v² = u² + 2as, each term is L²T⁻², so it passes." },
        { label: "Derive", text: "If a quantity depends on others as a product of powers, write it as k times each one raised to an unknown power. Equate the powers of M, L and T and solve." },
        { label: "Know the limits", text: "The method cannot give number constants such as 2π. It fails for sums of terms and for sin, log or exponential functions. With M, L and T it finds at most three unknown powers." },
      ],
      analogy: "Dimensional analysis is like a cook who knows a dish's ingredients but not the amounts. From rice, lentils and spices she can tell it is khichuri, not payesh. But she can never tell you whether it takes one cup of rice or two.",
      story: [
        "Nusrat was revising for her HSC test in Rajshahi when she found a page torn from her notes. Only half the pendulum formula survived: the period T depends on the length l and on g. Did the mass of the bob matter too?",
        "She remembered a trick from class. She wrote T = k mˣ lʸ gᶻ and replaced each quantity with its dimension. The left side was simply T. The right side became Mˣ Lʸ⁺ᶻ T⁻²ᶻ.",
        "Matching the powers, x had to be zero, so the mass did not matter at all. Then z = −½ and y = ½, which gave T = k√(l/g). Her textbook showed that k = 2π. 'The method gave me the shape,' she wrote in the margin, 'but the 2π comes from experiment.'",
      ],
      deepRead: [
        "The dimension of a quantity is written as powers of M, L and T, for example momentum MLT⁻¹ and pressure ML⁻¹T⁻². A relation like this is a dimensional equation. Pure numbers, angles and ratios such as strain are dimensionless. By the principle of homogeneity, every term that is added, subtracted or equated in a correct equation has the same dimension. This can prove an equation wrong, but a dimensionally correct equation may still carry a wrong number.",
        "Dimensional analysis can also derive a relation. Worked example: the period T of a simple pendulum may depend on the bob's mass m, the length l and g. Write T = k mˣ lʸ gᶻ, where k has no dimension. The left side has dimension T, and the right side gives Mˣ Lʸ (LT⁻²)ᶻ = Mˣ Lʸ⁺ᶻ T⁻²ᶻ. Equating powers, M gives x = 0, T gives −2z = 1 so z = −½, and L gives y + z = 0 so y = ½. Hence T = k√(l/g), and experiment shows k = 2π.",
        "It also converts units. Since 1 N = 1 kg m s⁻² = 1000 g × 100 cm s⁻² = 10⁵ g cm s⁻², one newton equals 10⁵ dyne. Its limits are asked in exams too. It cannot find dimensionless constants such as 2π or ½, cannot derive sums like s = ut + ½at², and fails for sin, log and exponential relations.",
      ],
      example: {
        question: "Rafi wants the dimension of the gravitational constant G in F = Gm₁m₂/r². What is it?",
        options: ["M⁻¹L³T⁻²", "MLT⁻²", "M⁻²L²T⁻²"],
        answer: 0,
        why: "G = Fr²/(m₁m₂), so MLT⁻² × L² ÷ M² = M⁻¹L³T⁻².",
      },
      keyPoints: [
        "By the principle of homogeneity, every added or equated term in a correct equation has the same dimension.",
        "Writing a quantity as k times powers of what it depends on, then equating powers of M, L and T, derives the relation.",
        "Dimensional analysis cannot find number constants like 2π, and it fails for sums and for sin, log or exponential terms.",
      ],
      misconception: {
        belief: "Once I know which quantities a formula depends on, dimensional analysis will give me the whole formula.",
        correction: "It works only when the relation is a product of powers. It cannot give constants like 2π, cannot build sums such as s = ut + ½at², and fails for sin, log or exponential terms. With M, L and T alone it can fix at most three unknown powers, so a quantity that depends on four others cannot be solved this way.",
      },
      quiz: [
        {
          question: "Which pair of quantities has the same dimension?",
          options: ["Work and torque", "Force and momentum", "Power and energy", "Pressure and force"],
          answer: 0,
          why: "Both are a force times a distance, so both have the dimension ML²T⁻².",
        },
        {
          question: "In T = 2π√(l/g), which part can dimensional analysis not find?",
          options: ["The power ½ on l", "The constant 2π", "That mass does not appear"],
          answer: 1,
          why: "2π is a pure number with no dimension, so it is invisible to the method and must come from experiment or theory.",
        },
        {
          question: "How many dyne make 1 newton?",
          options: ["10³", "10⁵", "10⁷"],
          answer: 1,
          why: "1 N = 1000 g × 100 cm s⁻² = 10⁵ g cm s⁻², which is 10⁵ dyne.",
        },
      ],
      pairs: [
        { term: "Momentum", match: "MLT⁻¹" },
        { term: "Power", match: "ML²T⁻³" },
        { term: "Pressure", match: "ML⁻¹T⁻²" },
        { term: "Gravitational constant", match: "M⁻¹L³T⁻²" },
        { term: "Strain", match: "Dimensionless, a ratio of two lengths" },
      ],
      order: {
        prompt: "Put the steps for deriving a simple pendulum's period by dimensional analysis in order.",
        items: [
          "Assume T = k mˣ lʸ gᶻ, with k a pure number",
          "Replace each quantity by its dimension to get Mˣ Lʸ⁺ᶻ T⁻²ᶻ",
          "Equate powers of M, L and T: x = 0, z = −½, y = ½",
          "Write T = k√(l/g) and find k = 2π by experiment",
        ],
      },
      blitz: [
        { statement: "Dimensional analysis shows that a simple pendulum's period does not depend on the mass of its bob.", truth: true, why: "The power of mass comes out as zero." },
        { statement: "Dimensional analysis can derive s = ut + ½at² completely.", truth: false, why: "It cannot handle a sum of terms, and it cannot find the number ½." },
        { statement: "Work and torque share the dimension ML²T⁻², though they are different quantities.", truth: true, why: "Both are a force times a length, so matching dimensions do not mean the same quantity." },
        { statement: "Angle has the unit radian, so it must have the dimension L.", truth: false, why: "An angle is arc length ÷ radius, L ÷ L, so it is dimensionless even though it has a unit." },
      ],
      blanks: [
        { sentence: "Planck's constant h, from E = hf, has the dimension ___.", options: ["ML²T⁻¹", "ML²T⁻²", "MLT⁻¹"], answer: 0 },
        { sentence: "1 joule is equal to ___ erg.", options: ["10⁵", "10⁷", "10³"], answer: 1 },
      ],
      terms: ["dimension", "homogeneity", "dimensionless", "powers", "derive", "constant"],
      sayPrompt: "Tell a friend how dimensional analysis shows a pendulum's period depends on √(l/g) but not on the bob's mass",
      glossary: [
        { term: "dimension", bn: "মাত্রা" },
        { term: "dimensional equation", bn: "মাত্রা সমীকরণ" },
        { term: "dimensional analysis", bn: "মাত্রা বিশ্লেষণ" },
        { term: "dimensionless quantity", bn: "মাত্রাহীন রাশি" },
        { term: "simple pendulum", bn: "সরল দোলক" },
        { term: "time period", bn: "দোলনকাল" },
        { term: "gravitational constant", bn: "মহাকর্ষীয় ধ্রুবক" },
        { term: "acceleration due to gravity", bn: "অভিকর্ষজ ত্বরণ" },
      ],
    },
    {
      id: "bd-hsc-physics1-1-3",
      title: "Measurement errors, their propagation and significant figures",
      hook: "No measurement is perfect. Knowing the kind and size of its error tells you how far to trust a result, and how many digits to write.",
      steps: [
        { label: "Two kinds", text: "A systematic error pushes every reading the same way, like a zero error or a slow stopwatch. A random error scatters readings above and below the true value for unpredictable reasons." },
        { label: "Size it", text: "Absolute error is the difference between the true and measured values. Relative error is absolute error ÷ value. Multiply it by 100 for the percentage error." },
        { label: "Propagate", text: "For a sum or difference, absolute errors add. For a product or quotient, percentage errors add. For a power n, the percentage error is multiplied by n." },
        { label: "Round it", text: "Report only significant figures: the reliable digits plus one estimated digit. A product or quotient keeps as many significant figures as its least precise factor." },
      ],
      analogy: "A systematic error is like a wall clock that runs five minutes slow: reading it again never helps, you must reset it. Random error is like friends timing one race by hand: their times scatter either side, and the average lands close to the truth.",
      story: [
        "In the physics lab at a college in Khulna, Tanvir and Mitu each timed 20 swings of the same pendulum five times. Tanvir got 32.1, 31.8, 32.0, 32.2 and 31.9 s. They scattered a little, so he took the average, 32.0 s.",
        "Mitu's times were all close to one another, around 30.4 s, but every one was smaller than Tanvir's. Their teacher, Mr Hossain, checked her stopwatch against the lab clock. It ran 5 percent slow.",
        "'Tanvir's spread is random error, and averaging shrinks it,' said Mr Hossain. 'Mitu's error is systematic. Averaging a hundred readings would not fix a slow watch, so find the cause and correct it.' Mitu divided her average by 0.95 and got 32.0 s, matching Tanvir.",
      ],
      deepRead: [
        "A systematic error shifts every reading in the same direction by about the same amount. Zero error, a slow stopwatch or a badly calibrated scale cause it, and repeating the measurement does not reduce it, so the cause must be found and corrected. A random error makes readings scatter on both sides of the true value, and the mean of many readings reduces it. By source, errors are also called instrumental, from the instrument, or observational, from the observer, such as parallax error.",
        "If a value a has absolute error Δa, its relative error is Δa/a and its percentage error is (Δa/a) × 100%. When results are combined, errors propagate. For Z = A + B or A − B, ΔZ = ΔA + ΔB. For Z = AB or A/B, ΔZ/Z = ΔA/A + ΔB/B. For Z = Aⁿ, ΔZ/Z = n × ΔA/A. Worked example: a ball's radius is 2.00 cm with an error of 0.01 cm, which is 0.5%. Its volume, V = (4/3)πr³, therefore has a percentage error of 3 × 0.5% = 1.5%.",
        "Significant figures are the reliable digits of a measurement plus the first uncertain one. Non-zero digits and zeros between them count. Leading zeros, as in 0.0052, do not, while trailing zeros after a decimal point, as in 2.50, do. A product or quotient keeps as many significant figures as its least precise factor, so 2.5 cm × 1.25 cm = 3.125 cm² is reported as 3.1 cm².",
      ],
      example: {
        question: "A rod's length is measured as 50.0 cm with an absolute error of 0.5 cm. What is the percentage error?",
        options: ["0.5%", "1%", "10%"],
        answer: 1,
        why: "Percentage error = 0.5 ÷ 50.0 × 100% = 1%.",
      },
      keyPoints: [
        "Systematic errors shift every reading the same way and must be corrected, while random errors scatter readings and shrink when many readings are averaged.",
        "Percentage error is absolute error divided by the value, times 100, and for a power n it is multiplied by n.",
        "A product or quotient keeps as many significant figures as its least precise factor.",
      ],
      misconception: {
        belief: "If I measure a ball's radius with a 1% error, the volume I calculate from it also has a 1% error.",
        correction: "V = (4/3)πr³ uses r three times over, so its relative error is 3 × Δr/r. A 1% error in r gives a 3% error in V. The 4/3 and π are exact numbers and add no error.",
      },
      quiz: [
        {
          question: "Which error can be reduced by taking many readings and averaging them?",
          options: ["Zero error of a screw gauge", "Random error", "Error from a stopwatch that runs slow"],
          answer: 1,
          why: "Random errors scatter on both sides of the true value and partly cancel in an average, while the other two are systematic.",
        },
        {
          question: "The side of a cube is measured with a 2% error. What is the percentage error in its volume?",
          options: ["2%", "4%", "6%", "8%"],
          answer: 2,
          why: "V = l³, so the percentage error is 3 × 2% = 6%.",
        },
        {
          question: "How many significant figures does 0.03040 have?",
          options: ["3", "4", "5"],
          answer: 1,
          why: "The leading zeros do not count, but the zero between 3 and 4 and the trailing zero after the decimal point do, giving 3, 0, 4, 0.",
        },
      ],
      pairs: [
        { term: "Systematic error", match: "Shifts every reading the same way by the same amount" },
        { term: "Random error", match: "Scatters readings on both sides of the true value" },
        { term: "Absolute error", match: "Difference between the true and measured values" },
        { term: "Percentage error", match: "Absolute error divided by the value, times 100" },
        { term: "Parallax error", match: "Observational error from viewing a scale at a slant" },
      ],
      order: {
        prompt: "Put the steps for finding the percentage error in a sphere's volume in order.",
        items: [
          "Measure the diameter several times and find the mean",
          "Find the mean absolute error from the deviations",
          "Divide it by the mean diameter and multiply by 100",
          "Multiply that percentage by 3 to get the error in volume",
        ],
      },
      blitz: [
        { statement: "A zero error is a systematic error.", truth: true, why: "It shifts every reading by the same amount in the same direction." },
        { statement: "Averaging many readings removes a systematic error.", truth: false, why: "Every reading is shifted the same way, so the average is shifted too." },
        { statement: "If Z = A/B, the percentage error in Z is the sum of the percentage errors in A and B.", truth: true, why: "For products and quotients, percentage errors add." },
        { statement: "2.50 cm and 2.5 cm have the same number of significant figures.", truth: false, why: "2.50 has three significant figures, because a trailing zero after the decimal point counts, while 2.5 has two." },
      ],
      blanks: [
        { sentence: "For Z = A − B, the ___ errors of A and B are added to give the error in Z.", options: ["absolute", "percentage", "systematic"], answer: 0 },
        { sentence: "The product 3.0 cm × 1.25 cm should be reported as ___.", options: ["3.75 cm²", "3.8 cm²", "4 cm²"], answer: 1 },
      ],
      terms: ["systematic error", "random error", "absolute error", "percentage error", "propagation", "significant figures"],
      sayPrompt: "Explain to a friend why a 1% error in a ball's radius becomes a 3% error in its volume",
      glossary: [
        { term: "systematic error", bn: "নিয়মিত ত্রুটি" },
        { term: "random error", bn: "অনিয়মিত ত্রুটি" },
        { term: "observational error", bn: "পর্যবেক্ষণমূলক ত্রুটি" },
        { term: "parallax error", bn: "লম্বন ত্রুটি" },
        { term: "absolute error", bn: "পরম ত্রুটি" },
        { term: "relative error", bn: "আপেক্ষিক ত্রুটি" },
        { term: "percentage error", bn: "শতকরা ত্রুটি" },
        { term: "significant figures", bn: "তাৎপর্যপূর্ণ অঙ্ক" },
      ],
    },
  ],
  cq: {
    stem: "In a college laboratory in Rajshahi, Sadia measures the diameter of a small steel ball with a screw gauge. Its pitch is 0.5 mm and its circular scale has 50 divisions. With the studs touching and nothing between them, the gauge shows 3 circular divisions instead of zero. With the ball gripped, the linear scale reads 4 mm and the 28th circular division lies on the reference line. Take the possible error in her corrected diameter as one least count.",
    knowledge: {
      q: "What is backlash error?",
      a: "Backlash error is the error in an instrument based on a screw and nut, such as a screw gauge or spherometer, in which the screw does not move for a small part of a turn when the direction of rotation is reversed, because of wear or a gap between the screw thread and the nut.",
    },
    comprehension: {
      q: "Why can averaging many readings not remove the error that Sadia's screw gauge shows with its studs touching?",
      a: "With the studs touching, the gauge reads 3 divisions instead of zero. This is a zero error, which is a systematic error. It adds the same amount, 0.03 mm, to every reading in the same direction. Averaging cancels only random errors, which scatter above and below the true value. Since every reading is too large by 0.03 mm, the average is also too large by 0.03 mm. So the zero error must be found and subtracted from the reading instead.",
    },
    application: {
      q: "Find the correct diameter of the steel ball.",
      a: "Least count, LC = pitch ÷ number of circular divisions = 0.5 mm ÷ 50 = 0.01 mm. The gauge reads more than zero with the studs touching, so the zero error is positive: zero error = +3 × 0.01 mm = +0.03 mm. Observed reading = linear scale reading + circular scale reading × LC = 4 mm + 28 × 0.01 mm = 4.28 mm. Correct diameter = observed reading − zero error = 4.28 mm − 0.03 mm = 4.25 mm.",
    },
    higherOrder: {
      q: "Sadia claims that the percentage error in the ball's volume equals the percentage error in its diameter. Judge her claim with calculation, and say what happens if she forgets the zero error.",
      a: "Her claim is wrong. Volume V = (π/6)d³, and for a power of 3, ΔV/V = 3 × Δd/d. The possible error in d is one least count, 0.01 mm. Percentage error in d = 0.01 ÷ 4.25 × 100% ≈ 0.235%. Percentage error in V = 3 × 0.235% ≈ 0.71%, three times larger, because d enters the formula three times. V = (π/6) × 4.25³ ≈ 40.2 mm³, so ΔV ≈ 0.28 mm³. If she forgot the zero error and used 4.28 mm, her volume would be (4.28 ÷ 4.25)³ ≈ 1.021 times the true value, about 2.1% too large. That systematic error is about three times the 0.71% reading error. So she must correct the zero error first, then report V as about 40.2 mm³ with an error of about 0.7%.",
    },
  },
} satisfies UnitContent;

export default unit;
