// ─── Dojolom learning model ───────────────────────────────────────────────────
// Everything the onboarding flow and the personalised syllabus are built from.
// Plain data + small pure functions, so it can later be swapped for an API.

export type StyleId = "visual" | "player" | "storyteller" | "watcher" | "reader" | "tinkerer";

export type FormatId = "infographic" | "game" | "video" | "story" | "reading" | "challenge";

export interface LearningStyle {
  id: StyleId;
  name: string;
  short: string;
  description: string;
  colour: "focus" | "play" | "sun" | "sprout";
  formats: FormatId[];
}

export const learningStyles: Record<StyleId, LearningStyle> = {
  visual: {
    id: "visual",
    name: "The Mapper",
    short: "You think in pictures",
    description:
      "Diagrams, colour-coded maps and one-page summaries click for you. You remember where things sit on a page.",
    colour: "focus",
    formats: ["infographic", "video", "challenge"],
  },
  player: {
    id: "player",
    name: "The Player",
    short: "You learn by winning",
    description:
      "Points, streaks and a puzzle to crack keep you going. Repetition is fine as long as it feels like a game.",
    colour: "play",
    formats: ["game", "challenge", "infographic"],
  },
  storyteller: {
    id: "storyteller",
    name: "The Storyteller",
    short: "You remember through narrative",
    description:
      "Facts stick when they belong to a character, a journey or a real-world scene. Analogies are your shortcut.",
    colour: "sun",
    formats: ["story", "video", "game"],
  },
  watcher: {
    id: "watcher",
    name: "The Watcher",
    short: "Show me, then I'll do it",
    description:
      "A short demonstration beats a page of text. You like to see the whole thing once before trying.",
    colour: "focus",
    formats: ["video", "infographic", "challenge"],
  },
  reader: {
    id: "reader",
    name: "The Reader",
    short: "Give me the full picture",
    description:
      "You like precise explanations you can re-read at your own pace, then a check to confirm you got it.",
    colour: "sprout",
    formats: ["reading", "infographic", "challenge"],
  },
  tinkerer: {
    id: "tinkerer",
    name: "The Tinkerer",
    short: "You learn with your hands",
    description:
      "You'd rather try, break it and fix it than be told. Small experiments and instant feedback keep you sharp.",
    colour: "sprout",
    formats: ["challenge", "game", "video"],
  },
};

export const formats: Record<FormatId, { name: string; minutes: number; blurb: string; colour: LearningStyle["colour"] }> = {
  infographic: { name: "Infographic", minutes: 3, blurb: "One screen, the whole idea, colour-coded.", colour: "focus" },
  game: { name: "Mini-game", minutes: 5, blurb: "A quick round that drills the idea until it sticks.", colour: "play" },
  video: { name: "Guided walkthrough", minutes: 4, blurb: "One step at a time, with narration, at your own pace.", colour: "focus" },
  story: { name: "Story lesson", minutes: 6, blurb: "The concept lived out by a character in a real scene.", colour: "sun" },
  reading: { name: "Deep read", minutes: 8, blurb: "A precise written explanation with worked examples.", colour: "sprout" },
  challenge: { name: "Challenge", minutes: 5, blurb: "Try it yourself, get instant feedback, try again.", colour: "sprout" },
};

// ─── Subjects ─────────────────────────────────────────────────────────────────

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
  units: string[]; // ordered beginner → confident
}

export const subjects: Subject[] = [
  {
    id: "languages",
    name: "Languages",
    emoji: "🗣️",
    blurb: "Spanish, French, Japanese and more, from first greeting to real conversation.",
    units: ["Sounds and greetings", "Everyday words", "Building sentences", "Asking and answering", "Telling a short story", "Holding a conversation"],
  },
  {
    id: "math",
    name: "Math",
    emoji: "➗",
    blurb: "Numbers that finally make sense, from fractions to functions.",
    units: ["Number sense", "Fractions and ratios", "Patterns and algebra", "Shapes and space", "Data and chance", "Functions and change"],
  },
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    blurb: "Why the sky is blue, how cells divide and what makes things move.",
    units: ["How we know things", "Matter and energy", "Living things", "Forces and motion", "Earth and space", "Systems that connect"],
  },
  {
    id: "history",
    name: "History",
    emoji: "🏛️",
    blurb: "People, turning points and the stories behind today's world.",
    units: ["Reading a timeline", "Ancient worlds", "Trade and empires", "Revolutions", "The modern century", "Connecting past to now"],
  },
  {
    id: "money",
    name: "Money",
    emoji: "💰",
    blurb: "Budgeting, saving, interest and investing without the jargon.",
    units: ["Where money goes", "Budgets that work", "Saving and interest", "Debt and credit", "Investing basics", "Planning for goals"],
  },
  {
    id: "coding",
    name: "Coding",
    emoji: "💻",
    blurb: "Tell a computer what to do, one small idea at a time.",
    units: ["Instructions and order", "Storing values", "Making decisions", "Repeating things", "Organising code", "Building a small project"],
  },
  {
    id: "music",
    name: "Music",
    emoji: "🎵",
    blurb: "Rhythm, notes and chords you can hear, tap and play.",
    units: ["Keeping the beat", "Reading notes", "Scales and keys", "Chords", "Song structure", "Playing along"],
  },
  {
    id: "art",
    name: "Art & Design",
    emoji: "🎨",
    blurb: "Colour, shape and composition, whether you draw or design.",
    units: ["Seeing shapes", "Light and shadow", "Colour theory", "Composition", "Style and voice", "A finished piece"],
  },
  {
    id: "health",
    name: "Health & Body",
    emoji: "🫀",
    blurb: "How your body works, and how to look after it.",
    units: ["Body basics", "Food and fuel", "Sleep and rest", "Movement", "Mind and mood", "Habits that stick"],
  },
  {
    id: "life",
    name: "Life Skills",
    emoji: "🧭",
    blurb: "Cooking, time, communication and the things school skipped.",
    units: ["Planning a day", "Cooking a real meal", "Clear communication", "Handling paperwork", "Fixing small things", "Making decisions"],
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    emoji: "🧠",
    blurb: "Logic, memory and focus, the tools behind every other subject.",
    units: ["How memory works", "Spotting patterns", "Logic and arguments", "Focus and attention", "Creative thinking", "Learning how to learn"],
  },
  {
    id: "world",
    name: "The World",
    emoji: "🌍",
    blurb: "Geography, cultures and how people live everywhere.",
    units: ["Maps and places", "Climate and land", "Cities and countries", "Cultures and customs", "How news works", "Big global questions"],
  },
];

// ─── Questionnaire ───────────────────────────────────────────────────────────

export const ageGroups = [
  { id: "kid", label: "Under 12", hint: "Short, playful, lots of pictures" },
  { id: "teen", label: "12 to 17", hint: "Fast-paced with real challenges" },
  { id: "adult", label: "18 to 40", hint: "Practical and to the point" },
  { id: "senior", label: "40 and over", hint: "Calm pace, clear text" },
] as const;

export type AgeGroupId = (typeof ageGroups)[number]["id"];

export const goals = [
  { id: "curious", label: "Just curious", hint: "Learn for the joy of it" },
  { id: "school", label: "School or exams", hint: "Keep up or get ahead" },
  { id: "work", label: "Work or career", hint: "Skills I can use on Monday" },
  { id: "hobby", label: "A hobby", hint: "Something to enjoy in my free time" },
  { id: "family", label: "Help someone I love", hint: "Teach a child, parent or friend" },
] as const;

export type GoalId = (typeof goals)[number]["id"];

export const paceOptions = [
  { id: "sprint", label: "5 minutes a day", sessions: 1, minutes: 5 },
  { id: "steady", label: "15 minutes a day", sessions: 1, minutes: 15 },
  { id: "deep", label: "A longer session a few times a week", sessions: 3, minutes: 35 },
] as const;

export type PaceId = (typeof paceOptions)[number]["id"];

export interface StyleQuestion {
  id: string;
  prompt: string;
  options: { label: string; style: StyleId }[];
}

export const styleQuestions: StyleQuestion[] = [
  {
    id: "new-gadget",
    prompt: "You get a new gadget. What do you do first?",
    options: [
      { label: "Look for a diagram of the buttons", style: "visual" },
      { label: "Press things until it works", style: "tinkerer" },
      { label: "Watch a quick unboxing video", style: "watcher" },
      { label: "Read the manual, start to finish", style: "reader" },
    ],
  },
  {
    id: "remember",
    prompt: "A fact you learned years ago still sticks. Why?",
    options: [
      { label: "It was part of a story someone told", style: "storyteller" },
      { label: "I saw it on a chart or map", style: "visual" },
      { label: "I got it wrong in a quiz and never forgot", style: "player" },
      { label: "I used it to fix something real", style: "tinkerer" },
    ],
  },
  {
    id: "free-hour",
    prompt: "A free hour with something new to learn. Pick one.",
    options: [
      { label: "A level-based game about it", style: "player" },
      { label: "A short documentary", style: "watcher" },
      { label: "A long article with examples", style: "reader" },
      { label: "A tale set in that world", style: "storyteller" },
    ],
  },
  {
    id: "stuck",
    prompt: "You're stuck on a hard idea. What helps?",
    options: [
      { label: "Someone shows me once", style: "watcher" },
      { label: "A comparison to something I already know", style: "storyteller" },
      { label: "Trying smaller versions until it clicks", style: "tinkerer" },
      { label: "Seeing all the parts laid out together", style: "visual" },
    ],
  },
  {
    id: "motivation",
    prompt: "What keeps you coming back?",
    options: [
      { label: "A streak I don't want to break", style: "player" },
      { label: "Feeling the whole picture get clearer", style: "reader" },
      { label: "Finishing something I made", style: "tinkerer" },
      { label: "Wanting to know how the story ends", style: "storyteller" },
    ],
  },
];

// ─── Profile ─────────────────────────────────────────────────────────────────

export interface LearnerInput {
  name: string;
  age: AgeGroupId | "";
  subjects: string[];
  goal: GoalId | "";
  pace: PaceId | "";
  answers: Record<string, StyleId>;
}

export interface LearnerProfile {
  primary: LearningStyle;
  secondary: LearningStyle;
  scores: Record<StyleId, number>;
  formats: FormatId[];
}

export const emptyLearner: LearnerInput = {
  name: "",
  age: "",
  subjects: [],
  goal: "",
  pace: "",
  answers: {},
};

export function buildProfile(input: LearnerInput): LearnerProfile {
  const scores: Record<StyleId, number> = {
    visual: 0, player: 0, storyteller: 0, watcher: 0, reader: 0, tinkerer: 0,
  };
  for (const style of Object.values(input.answers)) scores[style] += 2;

  // Gentle age priors: younger learners tend toward play and story, older toward reading.
  if (input.age === "kid") { scores.player += 1; scores.storyteller += 1; }
  if (input.age === "teen") { scores.player += 1; scores.watcher += 1; }
  if (input.age === "senior") { scores.reader += 1; scores.watcher += 1; }
  if (input.goal === "work") scores.tinkerer += 1;
  if (input.goal === "school") scores.reader += 1;

  const ranked = (Object.keys(scores) as StyleId[]).sort((a, b) => scores[b] - scores[a]);
  const primary = learningStyles[ranked[0]];
  const secondary = learningStyles[ranked[1]];

  const formatSet: FormatId[] = [];
  for (const f of [...primary.formats, ...secondary.formats]) {
    if (!formatSet.includes(f)) formatSet.push(f);
  }
  return { primary, secondary, scores, formats: formatSet.slice(0, 4) };
}

// ─── Syllabus ────────────────────────────────────────────────────────────────

export interface SyllabusLesson {
  title: string;
  format: FormatId;
  minutes: number;
}

export interface SyllabusUnit {
  week: number;
  title: string;
  lessons: SyllabusLesson[];
}

export interface Syllabus {
  subject: Subject;
  units: SyllabusUnit[];
  totalMinutes: number;
}

const lessonPrefixes: Record<FormatId, string[]> = {
  infographic: ["The whole picture:", "Mapped out:", "At a glance:"],
  game: ["Level up:", "Beat the clock:", "Streak round:"],
  video: ["Watch it happen:", "See it once:", "Follow along:"],
  story: ["The story of", "A day inside", "Meet"],
  reading: ["Deep dive:", "In full:", "Unpacked:"],
  challenge: ["Hands on:", "Try it:", "Fix it:"],
};

export function buildSyllabus(subject: Subject, profile: LearnerProfile, pace: PaceId | ""): Syllabus {
  const perUnit = pace === "sprint" ? 2 : pace === "deep" ? 4 : 3;
  const units = subject.units.map((unitTitle, i) => {
    const lessons: SyllabusLesson[] = [];
    for (let j = 0; j < perUnit; j++) {
      const format = profile.formats[(i + j) % profile.formats.length];
      const prefix = lessonPrefixes[format][(i + j) % lessonPrefixes[format].length];
      lessons.push({
        title: `${prefix} ${unitTitle.toLowerCase()}`,
        format,
        minutes: formats[format].minutes,
      });
    }
    // Every unit ends with a check so progress is real, not felt.
    lessons.push({ title: `Quick check: ${unitTitle.toLowerCase()}`, format: "challenge", minutes: 3 });
    return { week: i + 1, title: unitTitle, lessons };
  });
  const totalMinutes = units.reduce((s, u) => s + u.lessons.reduce((t, l) => t + l.minutes, 0), 0);
  return { subject, units, totalMinutes };
}

// ─── Persistence (browser only) ──────────────────────────────────────────────

const KEY = "dojolom.learner";

export function saveLearner(input: LearnerInput) {
  try { localStorage.setItem(KEY, JSON.stringify(input)); } catch {}
}

export function loadLearner(): LearnerInput | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...emptyLearner, ...JSON.parse(raw) } : null;
  } catch { return null; }
}

export function clearLearner() {
  try { localStorage.removeItem(KEY); } catch {}
}
