// Bite-size demo lessons shown on the home page ("Try a 60-second lesson").
// Each one is an infographic-style breakdown plus one quick check.

export interface DemoLesson {
  id: string;
  subject: string;
  emoji: string;
  title: string;
  hook: string;
  steps: { label: string; text: string }[];
  analogy: string;
  quiz: { question: string; options: string[]; answer: number; why: string };
}

export const demoLessons: DemoLesson[] = [
  {
    id: "moon",
    subject: "Science",
    emoji: "🌙",
    title: "Why does the moon change shape?",
    hook: "The moon never changes shape. What changes is how much of its lit side faces you.",
    steps: [
      { label: "Sun", text: "The sun lights up exactly half of the moon, always." },
      { label: "Orbit", text: "The moon circles Earth about once a month." },
      { label: "Angle", text: "From Earth you see a different slice of that lit half each night." },
      { label: "Phase", text: "Thin slice: crescent. Whole lit side: full moon. None: new moon." },
    ],
    analogy: "Hold a ball under a lamp and walk around it. The ball doesn't change, your view does.",
    quiz: {
      question: "During a full moon, where is the moon relative to Earth and the sun?",
      options: ["Between Earth and the sun", "On the far side of Earth from the sun", "Directly above the north pole"],
      answer: 1,
      why: "With Earth in the middle, the whole sunlit half faces us.",
    },
  },
  {
    id: "interest",
    subject: "Money",
    emoji: "💰",
    title: "What is compound interest?",
    hook: "Interest that earns interest. Small at first, then it snowballs.",
    steps: [
      { label: "Year 1", text: "You save 100. At 10% you earn 10. Now you have 110." },
      { label: "Year 2", text: "10% of 110 is 11, not 10. Now you have 121." },
      { label: "Year 3", text: "10% of 121 is 12.10. The growth itself grows." },
      { label: "Year 20", text: "That 100 has become about 673 without adding a coin." },
    ],
    analogy: "A snowball rolling downhill picks up snow on the snow it already has.",
    quiz: {
      question: "Why does year 2 earn more than year 1?",
      options: ["The rate went up", "You are earning interest on last year's interest too", "Banks round up"],
      answer: 1,
      why: "The base grew from 100 to 110, so the same 10% pays more.",
    },
  },
  {
    id: "fractions",
    subject: "Math",
    emoji: "🍕",
    title: "Why is 1/3 bigger than 1/4?",
    hook: "A bigger number on the bottom means more slices, so each slice is smaller.",
    steps: [
      { label: "Bottom", text: "The bottom number says how many equal pieces the whole is cut into." },
      { label: "Top", text: "The top number says how many of those pieces you have." },
      { label: "Compare", text: "One pizza cut into 3 gives bigger slices than one cut into 4." },
      { label: "Rule", text: "Same top number: the smaller bottom wins." },
    ],
    analogy: "Sharing one cake with 3 friends beats sharing it with 4. Fewer people, bigger piece.",
    quiz: {
      question: "Which is the largest slice?",
      options: ["1/8", "1/5", "1/6"],
      answer: 1,
      why: "Five pieces means each one is bigger than a sixth or an eighth.",
    },
  },
  {
    id: "hola",
    subject: "Languages",
    emoji: "🗣️",
    title: "Say hello in Spanish, properly",
    hook: "Spanish greetings change with the time of day, and 'hola' works with all of them.",
    steps: [
      { label: "Any time", text: "Hola. Just 'hello'. Never wrong." },
      { label: "Morning", text: "Buenos días. Literally 'good days'." },
      { label: "Afternoon", text: "Buenas tardes, from lunch until sunset." },
      { label: "Evening", text: "Buenas noches, for evening and for goodnight." },
    ],
    analogy: "Think of 'hola' as the key that fits every door, and the others as the right key for the right room.",
    quiz: {
      question: "It's 3pm and you walk into a shop. What do you say?",
      options: ["Buenas noches", "Buenas tardes", "Buenos días"],
      answer: 1,
      why: "Afternoon greetings run from lunch until sunset.",
    },
  },
  {
    id: "loop",
    subject: "Coding",
    emoji: "💻",
    title: "What is a loop?",
    hook: "A loop is a way to say 'do this again' without writing it again.",
    steps: [
      { label: "Problem", text: "You want to print five names. Writing five lines works, but 5,000 wouldn't." },
      { label: "Loop", text: "You write the instruction once and tell the computer how many times." },
      { label: "Each turn", text: "The loop hands you the next item, runs the step, and moves on." },
      { label: "Stop", text: "When the list ends, or a condition is met, the loop stops." },
    ],
    analogy: "Like a teacher taking attendance: same question, next name, until the list is done.",
    quiz: {
      question: "What does a loop mostly save you?",
      options: ["Memory", "Repeating the same instruction by hand", "Electricity"],
      answer: 1,
      why: "One instruction, many repetitions, no copy-paste.",
    },
  },
  {
    id: "beat",
    subject: "Music",
    emoji: "🎵",
    title: "What is a beat?",
    hook: "The beat is the steady pulse under a song. Everything else lines up against it.",
    steps: [
      { label: "Pulse", text: "Tap your foot to any song. That regular tap is the beat." },
      { label: "Tempo", text: "How fast the taps come is the tempo, measured in beats per minute." },
      { label: "Bar", text: "Beats are grouped, most often in fours. One group is a bar." },
      { label: "Count", text: "One, two, three, four, then start again. That's most pop music." },
    ],
    analogy: "The beat is a clock. Melody and words are what happens at each tick.",
    quiz: {
      question: "If a song has 120 beats per minute, how many beats in one second?",
      options: ["One", "Two", "Four"],
      answer: 1,
      why: "120 per minute divided by 60 seconds is two per second.",
    },
  },
];
