"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import {
  Code,
  GraduationCap,
  UsersThree,
  ChartLineUp,
  ArrowRight,
  CheckCircle,
  Gear,
  GithubLogo,
  LinkedinLogo,
  Wrench,
  MaskHappy,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { SiPython, SiJavascript, SiCplusplus, SiRust, SiGo, SiAssemblyscript } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <GraduationCap size={24} weight="duotone" />,
    title: "Structured Curriculum",
    description:
      "Every track is designed from the ground up—concepts build on each other so nothing feels out-of-order.",
  },
  {
    icon: <Code size={24} weight="duotone" />,
    title: "Learn by Doing",
    description:
      "No slides, no lectures. You write real code from lesson one, directly in your browser.",
  },
  {
    icon: <UsersThree size={24} weight="duotone" />,
    title: "Community-Driven",
    description:
      "Ask questions, share solutions, and pair-program with learners at the same stage as you.",
  },
  {
    icon: <ChartLineUp size={24} weight="duotone" />,
    title: "Track Your Progress",
    description:
      "A clear map of what you know and what's next—so you always know where you stand.",
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const languages = [
  {
    icon: <SiPython size={28} />,
    name: "Python",
    description: "The friendliest first language. Great for scripting, data, and automation.",
    difficulty: "Beginner",
  },
  {
    icon: <SiJavascript size={28} />,
    name: "JavaScript",
    description: "The language of the web. Build interactive UIs and server apps alike.",
    difficulty: "Beginner",
  },
  {
    icon: <SiCplusplus size={28} />,
    name: "C / C++",
    description: "Close to the metal. Understand memory, pointers, and performance.",
    difficulty: "Intermediate",
  },
  {
    icon: <SiRust size={28} />,
    name: "Rust",
    description: "Systems programming with memory safety and zero-cost abstractions.",
    difficulty: "Intermediate",
  },
  {
    icon: <SiGo size={28} />,
    name: "Go",
    description: "Simple, fast, and built for scale. Concurrency done right.",
    difficulty: "Intermediate",
  },
  {
    icon: <SiAssemblyscript size={28} />,
    name: "Assembly",
    description: "The rawest form of code. Speaks directly to the CPU.",
    difficulty: "Advanced",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick a Language",
    description:
      "Choose from beginner-friendly Python to bare-metal Assembly. Start where you are.",
  },
  {
    number: "02",
    title: "Follow the Track",
    description:
      "Work through bite-sized lessons with in-browser exercises and instant feedback.",
  },
  {
    number: "03",
    title: "Build Projects",
    description:
      "Graduate from exercises to real projects you can show, ship, and be proud of.",
  },
];

const testimonials = [
  {
    initials: "AL",
    name: "Amir Levi",
    role: "Self-taught developer",
    quote:
      "Dojo LoM is the only platform where the progression felt natural. I finally understand pointers.",
  },
  {
    initials: "SK",
    name: "Sara Kim",
    role: "CS student",
    quote:
      "I used it alongside my uni courses and it filled in every gap my textbooks left. Wish I'd found it sooner.",
  },
  {
    initials: "RT",
    name: "Remi Torres",
    role: "Backend engineer",
    quote:
      "The Rust track is outstanding. Very clear, very honest about complexity. No hand-holding, no fluff.",
  },
];

const difficultyColor: Record<string, "default" | "outline" | "secondary" | "destructive"> = {
  Beginner: "secondary",
  Intermediate: "outline",
  Advanced: "default",
};

// ─── Concept explorer data ────────────────────────────────────────────────────

const concepts = [
  {
    label: "Variables",
    tagline: "Storing a value to use later",
    py: `name = "Alex"
age = 22
height = 5.9

print(name)   # Alex
print(age)    # 22`,
    js: `const name = "Alex";
const age = 22;
let height = 5.9;

console.log(name);   // Alex
console.log(age);    // 22`,
    breakdown: [
      "A variable is a named container that holds a value in memory.",
      "In Python you just write name = \"Alex\" — no type declaration needed.",
      "In JS, use const for values that won't change, let for ones that will.",
      "The value on the right side is stored under the name on the left.",
    ],
    quiz: {
      question: "What does  age = 22  do?",
      options: ["Checks if age equals 22", "Stores the number 22 in a variable called age", "Prints 22 to the screen"],
      answer: 1,
    },
  },
  {
    label: "Functions",
    tagline: "Reusable blocks of logic",
    py: `def greet(name):
    return f"Hello, {name}!"

print(greet("Alex"))  # Hello, Alex!
print(greet("Sam"))   # Hello, Sam!`,
    js: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Alex")); // Hello, Alex!
console.log(greet("Sam"));  // Hello, Sam!`,
    breakdown: [
      "A function wraps logic under a name so you can call it as many times as you need.",
      "def (Python) / function (JS) declares it. The name inside () is a parameter.",
      "Each call to greet(...) feeds a new value into the name parameter.",
      "return sends the result back to whoever called the function.",
    ],
    quiz: {
      question: "Why do we use functions?",
      options: ["To slow down execution", "To write the same code repeatedly", "To package logic once and reuse it without repetition"],
      answer: 2,
    },
  },
  {
    label: "Loops",
    tagline: "Repeating an action automatically",
    py: `numbers = [1, 2, 3, 4, 5]

for n in numbers:
    print(n * 2)

# Output: 2  4  6  8  10`,
    js: `const numbers = [1, 2, 3, 4, 5];

for (const n of numbers) {
  console.log(n * 2);
}

// Output: 2  4  6  8  10`,
    breakdown: [
      "A loop runs a block of code repeatedly — once per item in a list (or until a condition is false).",
      "for n in numbers assigns each item to n one at a time, then runs the block.",
      "print(n * 2) runs for every item — no need to write it 5 times manually.",
      "Loops are how programs handle large amounts of data without manual repetition.",
    ],
    quiz: {
      question: "What value does n hold on the third iteration?",
      options: ["1", "2", "3"],
      answer: 2,
    },
  },
  {
    label: "Conditions",
    tagline: "Making decisions in code",
    py: `score = 75

if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")

# Output: B`,
    js: `const score = 75;

if (score >= 90) {
  console.log("A");
} else if (score >= 70) {
  console.log("B");
} else {
  console.log("C");
}

// Output: B`,
    breakdown: [
      "if checks a condition — if it's true, that block runs; otherwise execution moves down.",
      "elif / else if adds extra conditions to check in order if the first one failed.",
      "else is the fallback — it only runs if none of the conditions above matched.",
      "Here score = 75 satisfies >= 70, so \"B\" is printed and the rest is skipped.",
    ],
    quiz: {
      question: "What would print if score were 95?",
      options: ["B", "A", "C"],
      answer: 1,
    },
  },
  {
    label: "Arrays / Lists",
    tagline: "Storing many values in one place",
    py: `langs = ["Python", "JS", "Rust"]

print(langs[0])      # Python
print(langs[-1])     # Rust
print(len(langs))    # 3

langs.append("Go")
print(langs)         # ['Python','JS','Rust','Go']`,
    js: `const langs = ["Python", "JS", "Rust"];

console.log(langs[0]);       // Python
console.log(langs.at(-1));   // Rust
console.log(langs.length);   // 3

langs.push("Go");
console.log(langs); // ['Python','JS','Rust','Go']`,
    breakdown: [
      "An array / list stores multiple values in order, all under one variable name.",
      "Items are accessed by index — counting starts at 0, not 1.",
      "-1 (Python) or .at(-1) (JS) is a shortcut to get the last item.",
      ".append() / .push() adds a new item to the end of the list.",
    ],
    quiz: {
      question: `What index is \"Rust\" at in langs = [\"Python\", \"JS\", \"Rust\"]?`,
      options: ["0", "1", "2"],
      answer: 2,
    },
  },
  {
    label: "Memory & Refs",
    tagline: "How machines actually store data",
    py: `# Python manages memory for you
a = [1, 2, 3]
b = a        # b points to the SAME list

b.append(4)
print(a)     # [1, 2, 3, 4] — both changed!

c = a.copy() # c is a new, separate copy
c.append(99)
print(a)     # [1, 2, 3, 4] — unchanged`,
    js: `// Same behaviour in JS with arrays/objects
const a = [1, 2, 3];
const b = a;     // b points to the SAME array

b.push(4);
console.log(a);  // [1, 2, 3, 4] — both changed!

const c = [...a]; // c is a new, separate copy
c.push(99);
console.log(a);   // [1, 2, 3, 4] — unchanged`,
    breakdown: [
      "When you assign an array/object to another variable, you copy the reference — not the value.",
      "Both variables point to the same place in memory, so changing one changes both.",
      "Numbers and strings behave differently — they copy the actual value (called primitives).",
      "In C/C++/Rust you manage this explicitly with pointers — powerful but requires care.",
    ],
    quiz: {
      question: "After b = a and b.append(4), what does a contain?",
      options: ["[1, 2, 3]", "[1, 2, 3, 4]", "An error is thrown"],
      answer: 1,
    },
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [activeConcept, setActiveConcept] = useState(0);
  const [activeLang, setActiveLang] = useState<"py" | "js">("py");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  function handleJoinWaitlist(email: string, clear: () => void) {
    if (!email.trim() || !email.includes("@")) {
      gooeyToast.error("Invalid email", {
        description: "Please enter a valid email address.",
        preset: "subtle",
        
      });
      return;
    }
    clear();
    gooeyToast.success("You're on the list!", {
      description: "We'll reach out when Dojo LoM launches.",
      preset: "bouncy",
    });
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-mono">
      <Navbar />

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit text-sm font-normal px-2 py-1 gap-1.5">
            <Gear size={11} weight="bold" className="inline" />
            Now in early access
          </Badge>
          <h1 className="text-5xl md:text-5xl font-semibold leading-tight tracking-tight">
            Learn the<br />Language of<br />Machines.
          </h1>
          <p className="text-muted-foreground text-base leading-7 max-w-sm">
            Dojo LoM is a structured, beginner-friendly platform for learning
            programming from first principles — variables to memory, functions to
            systems, code to career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                className="h-9 text-sm w-56"
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleJoinWaitlist(heroEmail, () => setHeroEmail(""));
                }}
              />
              <Button
                size="sm"
                className="h-9 shrink-0"
                onClick={() => handleJoinWaitlist(heroEmail, () => setHeroEmail(""))}
              >
                Join Waitlist
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => {
                const el = document.getElementById("tracks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Tracks
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Free to join. No credit card required.</p>
        </div>

        {/* Code block decoration */}
        <div className="border border-border bg-zinc-950 text-green-400 p-6 text-sm leading-7 font-mono hidden md:block">
          <p className="text-zinc-500 mb-2"># lesson_01.py — your first program</p>
          <p><span className="text-blue-400">def</span> <span className="text-yellow-300">greet</span>(name):</p>
          <p className="pl-4"><span className="text-blue-400">return</span> <span className="text-orange-300">f"Hello, {"{name}"}! Ready to code?"</span></p>
          <p className="mt-2"><span className="text-green-400">print</span>(greet(<span className="text-orange-300">"World"</span>))</p>
          <p className="mt-4 text-zinc-500"># output:</p>
          <p className="text-white">→ Hello, World! Ready to code?</p>
          <p className="mt-4 text-zinc-400 text-xs">✓ Passed 3/3 tests &nbsp;·&nbsp; Next: Variables &amp; Types →</p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">Why Dojo LoM?</h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Other platforms teach you to copy code. We teach you to understand it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="py-5 gap-4">
                <CardHeader className="py-0 gap-3">
                  <div className="text-foreground">{f.icon}</div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6">{f.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Language Tracks ── */}
      <section id="tracks" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Pick Your Language</h2>
          <p className="text-muted-foreground text-base max-w-md">
            Start with what interests you. Every track is complete and self-contained.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <Card
              key={lang.name}
              className="py-5 gap-4 hover:border-foreground/30 transition-colors cursor-default"
            >
              <CardHeader className="py-0 gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{lang.icon}</span>
                  <Badge variant={difficultyColor[lang.difficulty]} className="text-xs">
                    {lang.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-base">{lang.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6">{lang.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Interactive Concept Explorer ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">Learn a concept right now</h2>
            <p className="text-muted-foreground text-base max-w-lg">
              Pick a topic, read real code in Python or JS, and answer a quick check to lock it in.
            </p>
          </div>

          {/* Concept tab strip */}
          <div className="flex flex-wrap gap-2 mb-8">
            {concepts.map((c, i) => (
              <button
                key={c.label}
                onClick={() => { setActiveConcept(i); setQuizAnswer(null); }}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  activeConcept === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Main panel */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">

            {/* Left: code block */}
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between border border-border border-b-0 bg-zinc-900 px-4 py-2">
                <span className="text-xs text-zinc-400 font-mono">
                  {concepts[activeConcept].label} — {concepts[activeConcept].tagline}
                </span>
                <div className="flex gap-1">
                  {(["py", "js"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                        activeLang === lang
                          ? "bg-white text-zinc-900"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {lang === "py" ? "Python" : "JavaScript"}
                    </button>
                  ))}
                </div>
              </div>
              <pre className="border border-border bg-zinc-950 text-green-400 p-5 text-sm leading-7 font-mono overflow-x-auto whitespace-pre">{activeLang === "py" ? concepts[activeConcept].py : concepts[activeConcept].js}</pre>
            </div>

            {/* Right: breakdown + quiz */}
            <div className="flex flex-col gap-6">

              {/* Line-by-line breakdown */}
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">How it works</p>
                <ol className="flex flex-col gap-2.5">
                  {concepts[activeConcept].breakdown.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="shrink-0 font-semibold text-foreground/40 w-4 text-right">{i + 1}.</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Quiz */}
              <div className="border border-border p-4 flex flex-col gap-3 bg-white">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Quick check</p>
                <p className="text-sm font-medium leading-5">{concepts[activeConcept].quiz.question}</p>
                <div className="flex flex-col gap-2">
                  {concepts[activeConcept].quiz.options.map((opt, i) => {
                    const isCorrect = i === concepts[activeConcept].quiz.answer;
                    const isSelected = quizAnswer === i;
                    const answered = quizAnswer !== null;
                    return (
                      <button
                        key={i}
                        disabled={answered}
                        onClick={() => setQuizAnswer(i)}
                        className={`text-left px-3 py-2 text-sm border transition-colors ${
                          !answered
                            ? "border-border hover:border-foreground/40 hover:bg-zinc-50"
                            : isCorrect
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : isSelected
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-border text-muted-foreground opacity-50"
                        }`}
                      >
                        <span className="font-mono text-xs text-muted-foreground mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {answered && isCorrect && <span className="ml-2 text-emerald-600">✓</span>}
                        {answered && isSelected && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
                      </button>
                    );
                  })}
                </div>
                {quizAnswer !== null && (
                  <p className={`text-xs mt-1 ${
                    quizAnswer === concepts[activeConcept].quiz.answer
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }`}>
                    {quizAnswer === concepts[activeConcept].quiz.answer
                      ? "Correct! Keep going."
                      : `Not quite — the right answer is ${String.fromCharCode(65 + concepts[activeConcept].quiz.answer)}.`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">How It Works</h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto">
              Three clear steps from zero to shipping real code.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-border">{step.number}</span>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block h-px flex-1 bg-border" />
                  )}
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-6">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="community" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">What Learners Say</h2>
          <p className="text-muted-foreground text-base">From people who've actually gone through the tracks.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <Card key={t.name} className="py-5 gap-4">
              <CardHeader className="py-0 gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none mb-1">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="text-foreground font-medium">"</span>
                  {t.quote}
                  <span className="text-foreground font-medium">"</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle size={14} weight="fill" className="text-foreground" />
          Real learners. No paid reviews.
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">The Team Behind It</h2>
            <p className="text-muted-foreground text-base max-w-md">
              Two builders who got tired of bad learning resources and decided to build the right one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Leopard */}
            <Card className="py-6 gap-0">
              <CardHeader className="py-0 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 select-none">
                    <MaskHappy size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-base font-semibold leading-none mb-1">Leopard</p>
                    <p className="text-xs text-muted-foreground">Founder &amp; Lead</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <p className="text-sm leading-6 text-muted-foreground mb-4">
                  Full-stack developer since 2019. Background in Information &amp; Communications
                  Engineering. Builds across web, DevOps, AI/ML, and mobile. Started Dojo LoM to
                  give beginners the structured path that didn't exist.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["JavaScript", "Python", "Next.js", "Node.js", "PHP", "DevOps", "AI/ML"].map((s) => (
                    <Badge key={s} variant="outline" className="text-xs font-normal gap-1">
                      <Wrench size={9} weight="bold" />{s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/fahadewu" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                    <GithubLogo size={15} weight="bold" />
                  </a>
                  <a href="https://www.linkedin.com/in/fahad-m-3b63211b5/" target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                    <LinkedinLogo size={15} weight="bold" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Ronin */}
            <Card className="py-6 gap-0">
              <CardHeader className="py-0 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 select-none">
                    <MaskHappy size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-base font-semibold leading-none mb-1">Ronin</p>
                    <p className="text-xs text-muted-foreground">Founder &amp; Curriculum</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <p className="text-sm leading-6 text-muted-foreground mb-4">
                  A methodical problem-solver who believes every concept can be taught clearly if
                  broken down the right way. Shapes how Dojo LoM's curriculum is structured — what
                  comes first, what order makes sense, and how complexity is introduced without fear.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Curriculum Design", "Problem Solving", "Teaching", "Systems Thinking"].map((s) => (
                    <Badge key={s} variant="outline" className="text-xs font-normal gap-1">
                      <Wrench size={9} weight="bold" />{s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground italic">Identity private for now</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Waitlist / Newsletter ── */}
      <section id="waitlist" className="border-t border-border bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white tracking-tight">
              Get early access to Dojo LoM
            </h2>
            <p className="text-zinc-400 text-base max-w-md mx-auto">
              We're onboarding the first cohort of learners soon. Drop your email to get
              notified and grab a founding member spot.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Input
              type="email"
              placeholder="your@email.com"
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              className="h-9 text-sm bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:border-zinc-400 flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleJoinWaitlist(footerEmail, () => setFooterEmail(""));
              }}
            />
            <Button
              size="sm"
              className="h-9 bg-white text-zinc-950 hover:bg-zinc-200 shrink-0"
              onClick={() => handleJoinWaitlist(footerEmail, () => setFooterEmail(""))}
            >
              Join Waitlist
              <ArrowRight size={12} weight="bold" />
            </Button>
          </div>
          <p className="text-zinc-600 text-sm">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

