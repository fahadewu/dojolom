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
  Robot,
  Sparkle,
  ArrowFatRight,
  Brain,
  Warning,
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

// ─── Dual-track "Concepts, Two Ways" ──────────────────────────────────────────

const dualTrackTopics = [
  {
    id: "api",
    topic: "APIs",
    icon: "🔌",
    plain: {
      headline: "The waiter at a restaurant",
      steps: [
        "You (your app) want data from somewhere — say, today's weather.",
        "You don't enter the kitchen (the server). You use a menu (the API).",
        "The waiter (API) carries your request to the kitchen and returns your data.",
        "You get a structured response — just the information you asked for.",
      ],
      summary:
        "An API is any agreed-upon way for two programs to talk to each other without exposing their internals.",
    },
    technical: {
      note: "APIs expose HTTP endpoints that accept requests and return structured data (usually JSON). You authenticate with API keys or OAuth, specify a method (GET/POST/PUT/DELETE), and handle the response.",
      code: `import requests

# Call the OpenAI API — same pattern as ANY AI API
response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "model": "gpt-4o",
        "messages": [{"role": "user",
                      "content": "Explain loops in 2 lines"}]
    }
)
print(response.json()["choices"][0]["message"]["content"])`,
    },
    ai: "Every AI tool you use (ChatGPT, Gemini, Claude, Midjourney) exposes an API. Understanding APIs is the literal gate to building AI-powered applications.",
  },
  {
    id: "database",
    topic: "Databases",
    icon: "🗄️",
    plain: {
      headline: "A very organised filing cabinet",
      steps: [
        "Your app needs to remember things after you close it — accounts, posts, purchases.",
        "A database is a structured filing system: every drawer (table) holds one type of thing.",
        "Each folder in a drawer (row) stores the details for one item.",
        "You can find, update, or delete any record by asking a question — a query.",
      ],
      summary:
        "A database lets your app remember anything, indefinitely, and find it instantly — even with millions of entries.",
    },
    technical: {
      note: "Relational databases (PostgreSQL, MySQL) store data in typed tables. SQL handles CRUD operations. NoSQL (MongoDB, Redis) uses flexible documents or key-value pairs. Vector databases (Pinecone, Weaviate) store AI embeddings for semantic search.",
      code: `-- Create a table
CREATE TABLE users (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE
);

-- Insert a row
INSERT INTO users (name, email)
VALUES ('Alex', 'alex@dojo.dev');

-- Query with a filter
SELECT name, email
FROM   users
WHERE  email LIKE '%@dojo.dev';`,
    },
    ai: "AI apps store conversation history and user context in databases. Vector databases store AI 'embeddings' — the mathematical representations that power semantic search and ChatGPT memory.",
  },
  {
    id: "ai",
    topic: "How AI learns",
    icon: "🤖",
    plain: {
      headline: "Teaching by showing, not by rules",
      steps: [
        "You could write rules: 'a cat has fur, four legs, whiskers…' — but exceptions break every rule.",
        "Instead, show an AI millions of images labelled 'cat' or 'not cat'.",
        "It adjusts its internal dials (weights) each time it gets one wrong.",
        "After enough examples, it recognises cats it has never seen before.",
      ],
      summary:
        "Machine learning is programming by example. You don't write the rules — you show so many examples that the pattern emerges on its own.",
    },
    technical: {
      note: "A neural network is a parameterised function. Training minimises a loss function using gradient descent — adjusting millions of weights via backpropagation. LLMs are trained on next-token prediction across trillions of text tokens using transformer architecture.",
      code: `# Conceptual training loop (PyTorch-style)
for epoch in range(1000):
    predictions = model(X_train)       # forward pass
    loss = criterion(predictions, y)   # measure error

    optimizer.zero_grad()   # reset gradients
    loss.backward()         # compute gradients
    optimizer.step()        # update weights

    if epoch % 100 == 0:
        print(f"Epoch {epoch} | Loss: {loss:.4f}")`,
    },
    ai: "Understanding that AI is a pattern-matcher trained on examples — not a reasoning engine — explains why it hallucinates, why prompt context matters, and why fine-tuning on your own data improves results so dramatically.",
  },
  {
    id: "cloud",
    topic: "The Cloud",
    icon: "☁️",
    plain: {
      headline: "Renting computers you never see",
      steps: [
        "Buying your own servers is expensive. What if you could rent exactly as much computing power as you need?",
        "The cloud is millions of powerful computers in data centres, available to rent by the minute.",
        "When your app gets popular, you rent more. At 3am with zero users, you rent less.",
        "AWS, Google Cloud, and Azure provide these rentals — plus databases, AI models, and storage.",
      ],
      summary:
        "The cloud is to computing what electricity is to power — you don't own a generator, you plug in and pay for what you use.",
    },
    technical: {
      note: "Cloud providers offer IaaS (raw VMs), PaaS (managed runtimes), and SaaS (apps). Serverless (Lambda, Vercel Functions) runs code on-demand. Containers (Docker + Kubernetes) package apps for portable, scalable deployment.",
      code: `# handler.py — deploy to AWS Lambda
def main(event, context):
    name = event.get("queryStringParameters", {})
    return {
        "statusCode": 200,
        "body": f"Hello from the cloud, {name}!"
    }

# serverless.yml (Serverless Framework)
# service: dojo-api
# provider:
#   name: aws
#   runtime: python3.12
# functions:
#   hello:
#     handler: handler.main
#     events:
#       - httpApi: { path: /hello, method: get }`,
    },
    ai: "Every AI API call runs on cloud GPUs. Training even a small model requires cloud compute. AWS Bedrock, Google Vertex AI, and Azure OpenAI let you add AI features to apps in a few lines of code.",
  },
  {
    id: "git",
    topic: "Version Control",
    icon: "📝",
    plain: {
      headline: "A time machine for your code",
      steps: [
        "Imagine editing a document and being able to undo any change — even from three weeks ago.",
        "Git saves a snapshot of your code every time you 'commit', with a message about what changed.",
        "If you break something, you rewind to the last snapshot that worked.",
        "Multiple developers can work on the same codebase simultaneously without overwriting each other.",
      ],
      summary:
        "Git is like Google Docs version history — but for code, with the ability to work on different versions in parallel and merge them.",
    },
    technical: {
      note: "Git is a distributed version control system. Each commit hashes the entire tree state (SHA1). Branches are pointers to commits. GitHub/GitLab host remote repos and add collaboration — pull requests, code review, CI/CD pipelines.",
      code: `# Typical daily Git workflow
git clone https://github.com/you/project
git checkout -b feature/add-auth   # new branch

# ... make your changes ...

git add src/auth.py            # stage changes
git commit -m "Add JWT auth"   # save snapshot
git push origin feature/add-auth

# Open Pull Request → review → merge to main`,
    },
    ai: "AI coding tools (Copilot, Cursor, Aider) integrate deeply with Git. AI can write commit messages, generate PR descriptions, review diffs, and resolve merge conflicts. Git is the shared language between you and AI codegen tools.",
  },
  {
    id: "prompt",
    topic: "Prompt Engineering",
    icon: "✍️",
    plain: {
      headline: "Briefing a very fast contractor",
      steps: [
        "'Write code' gets you generic code. 'Write a Python function that takes a list of prices and returns the top 3 after removing 20% VAT' gets you exactly what you need.",
        "AI responds to precision. The more context you give, the better the output.",
        "You can assign AI a role (act as a senior engineer), constraints (no external libraries), and format (add inline comments).",
        "Iterating — asking follow-up questions and refining — turns a 70% answer into a 99% answer.",
      ],
      summary:
        "Prompting well is like briefing a contractor: the clearer you specify the job, material, and constraints — the less time you spend fixing things after.",
    },
    technical: {
      note: "A prompt is the input context the model conditions on for next-token prediction. Key techniques: zero-shot (direct ask), few-shot (examples in context), chain-of-thought (step-by-step reasoning), role prompting (system message), RAG (inject retrieved documents). Temperature controls randomness.",
      code: `// System + user message pattern (OpenAI)
{
  "messages": [
    {
      "role": "system",
      "content": "You are a senior Python engineer.\\nReturn only code. Add inline comments.\\nNever use external libraries."
    },
    {
      "role": "user",
      "content": "Write a function that validates\\nan email address using regex."
    }
  ],
  "temperature": 0.2,   // lower = more deterministic
  "model": "gpt-4o"
}`,
    },
    ai: "Prompt engineering is programming in natural language. Precision in prompts will separate people who get mediocre AI output from those who get expert-level results on demand.",
  },
];

// ─── AI-era skills ─────────────────────────────────────────────────────────────

const aiEraSkills = [
  {
    skill: "Reading & reviewing code",
    icon: "👁️",
    tag: "Critical",
    tagStyle: "bg-red-100 text-red-800",
    borderColor: "border-l-red-400",
    why: "AI writes it. You verify it.",
    detail:
      "Around 30% of AI-generated code contains bugs or security gaps. The developer who can read, trace, and challenge AI output earns 10× more trust than one who pastes blindly.",
  },
  {
    skill: "Debugging",
    icon: "🐛",
    tag: "Essential",
    tagStyle: "bg-orange-100 text-orange-800",
    borderColor: "border-l-orange-400",
    why: "AI fails silently. You investigate.",
    detail:
      "AI-generated code breaks in unexpected ways. Reading stack traces, understanding error types, and bisecting bugs is still fundamentally human reasoning that AI assists but cannot replace.",
  },
  {
    skill: "Prompt engineering",
    icon: "✍️",
    tag: "New skill",
    tagStyle: "bg-blue-100 text-blue-800",
    borderColor: "border-l-blue-400",
    why: "It's programming in plain English.",
    detail:
      "Writing precise, context-rich prompts is the new form of directing a computer. Output quality scales directly with prompt quality — it's a learnable, measurably improvable skill.",
  },
  {
    skill: "Systems design",
    icon: "🧩",
    tag: "High value",
    tagStyle: "bg-violet-100 text-violet-800",
    borderColor: "border-l-violet-400",
    why: "AI builds parts. You architect the whole.",
    detail:
      "AI can write a route, a component, a query — but it doesn't know your architecture. Understanding how systems connect lets you direct AI to build the right pieces in the right way.",
  },
  {
    skill: "Data literacy",
    icon: "📊",
    tag: "High value",
    tagStyle: "bg-amber-100 text-amber-800",
    borderColor: "border-l-amber-400",
    why: "AI runs on data. You manage it.",
    detail:
      "Every AI product is built on data. Understanding schemas, quality, bias, and embeddings lets you build products that work in production — not just in demos.",
  },
  {
    skill: "Security awareness",
    icon: "🔒",
    tag: "Essential",
    tagStyle: "bg-rose-100 text-rose-800",
    borderColor: "border-l-rose-400",
    why: "AI writes insecure code. You catch it.",
    detail:
      "Studies show AI-generated code has higher rates of vulnerabilities (SQLi, XSS, insecure defaults). Knowing OWASP fundamentals is your last line of defence when using AI codegen tools.",
  },
];

// ─── AI + Code parallel data ─────────────────────────────────────────────────

const aiParallels = [
  {
    topic: "Variables",
    human: {
      label: "You write it",
      code: `name = "Alex"
age = 22
print(name, age)`,
      note: "You understand what's stored, where, and why.",
    },
    ai: {
      label: "AI writes it",
      prompt: `Prompt: "Store a person's name and age in
Python and print them."`,
      output: `name = "Alex"
age = 22
print(name, age)`,
      note: "Same result — but if you don't know what a variable is, you can't verify, fix, or extend it.",
    },
  },
  {
    topic: "Functions",
    human: {
      label: "You write it",
      code: `def greet(name):
    return f"Hello, {name}!"

print(greet("Dojo"))`,
      note: "You control the logic — you can change it, debug it, combine it.",
    },
    ai: {
      label: "AI writes it",
      prompt: `Prompt: "Write a Python function
that greets a person by name."`,
      output: `def greet(name):
    return f"Hello, {name}!"

print(greet("Dojo"))`,
      note: "Instant result. But changing 'greet' to do something different requires you to think in functions.",
    },
  },
  {
    topic: "Loops",
    human: {
      label: "You write it",
      code: `scores = [72, 85, 91, 60]

for s in scores:
    if s >= 80:
        print(f"Pass: {s}")`,
      note: "You can adapt this to any list — products, users, files, API results.",
    },
    ai: {
      label: "AI writes it",
      prompt: `Prompt: "Loop over a list of scores
and print ones above 80."`,
      output: `scores = [72, 85, 91, 60]

for s in scores:
    if s >= 80:
        print(f"Pass: {s}")`,
      note: "The AI got it right this time. Next time you'll need to add filtering, sorting, or saving — understanding loops means you can guide it.",
    },
  },
  {
    topic: "Debugging",
    human: {
      label: "You read the error",
      code: `# TypeError: can only concatenate
# str (not "int") to str

age = 22
print("Age: " + age)

# Fix:
print("Age: " + str(age))`,
      note: "Reading errors is a skill. You learn what types are, why they matter, and how to fix them.",
    },
    ai: {
      label: "AI explains the error",
      prompt: `Prompt: "I got TypeError: can only
concatenate str not int. Fix it."`,
      output: `# AI says: convert int to str
age = 22
print("Age: " + str(age))
# ✓ Fixed`,
      note: "Great — but next time you get a different error, will you recognise it? Knowing the 'why' means you don't need to ask every time.",
    },
  },
];

const aiPromptTips = [
  {
    label: "Ask for explanations",
    icon: "💬",
    bad: `"Write me a sorting algorithm."`,
    good: `"Write a Python bubble sort and explain each line as a comment. I'm a beginner."`,
    why: "The explanation is the lesson. Code alone teaches nothing — force the AI to narrate what it's doing.",
  },
  {
    label: "Give context",
    icon: "🎯",
    bad: `"Fix this code."`,
    good: `"I'm learning Python. This loop is supposed to print even numbers from 1–10 but it prints nothing. Here's my code: [paste]. What am I missing?"`,
    why: "AI doesn't know your level or intent. Context makes the response 10× more useful and educational.",
  },
  {
    label: "Ask it to quiz you",
    icon: "🧠",
    bad: `"Explain arrays."`,
    good: `"Explain arrays in Python in 3 sentences, then ask me 2 quiz questions to test if I understood."`,
    why: "Passive reading fades. Forcing retrieval (even with an AI) builds real memory.",
  },
  {
    label: "Spot the bug yourself first",
    icon: "🔍",
    bad: `"Here's my code, what's wrong?" (paste immediately)`,
    good: `"I think the bug is on line 7 — something about the loop condition. Am I right? If not, give me a hint before the answer."`,
    why: "The struggle is where learning happens. Use AI to confirm or nudge, not to skip the thinking.",
  },
  {
    label: "Build, then break, then ask",
    icon: "⚙️",
    bad: `"Build me a todo app."`,
    good: `"I built a todo app but deleting items doesn't update the list. Here's the relevant function. What concept am I misunderstanding about state?"`,
    why: "This shifts AI from code-generator to teacher. You own the project; it helps you understand the gap.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [activeConcept, setActiveConcept] = useState(0);
  const [activeLang, setActiveLang] = useState<"py" | "js">("py");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [activeParallel, setActiveParallel] = useState(0);
  const [activePromptTip, setActivePromptTip] = useState(0);
  const [activeDualTrack, setActiveDualTrack] = useState(0);
  const [dualTrackView, setDualTrackView] = useState<"plain" | "technical">("plain");

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

      {/* ── Code vs AI ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Robot size={16} weight="bold" />
              <span className="text-xs uppercase tracking-widest font-medium">Programming + AI</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight mb-3">
              Code it yourself.<br />Then do it faster with AI.
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              AI can write any of the code below in seconds. But if you don't understand what it wrote,
              you can't fix it, improve it, or build on it. Learn the concept first — then use AI as a force multiplier.
            </p>
          </div>

          {/* Topic tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {aiParallels.map((p, i) => (
              <button
                key={p.topic}
                onClick={() => setActiveParallel(i)}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  activeParallel === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {p.topic}
              </button>
            ))}
          </div>

          {/* Side by side */}
          <div className="grid md:grid-cols-2 gap-0 border border-border">
            {/* Left — Human */}
            <div className="flex flex-col border-r border-border">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-zinc-50">
                <Code size={14} weight="bold" />
                <span className="text-sm font-medium">{aiParallels[activeParallel].human.label}</span>
              </div>
              <pre className="bg-zinc-950 text-green-400 p-5 text-sm leading-7 font-mono overflow-x-auto flex-1 whitespace-pre">{aiParallels[activeParallel].human.code}</pre>
              <div className="px-4 py-3 border-t border-border bg-white">
                <p className="text-sm text-muted-foreground leading-6">
                  <CheckCircle size={13} weight="fill" className="inline mr-1.5 text-foreground" />
                  {aiParallels[activeParallel].human.note}
                </p>
              </div>
            </div>

            {/* Right — AI */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-zinc-50">
                <Sparkle size={14} weight="fill" />
                <span className="text-sm font-medium">{aiParallels[activeParallel].ai.label}</span>
              </div>
              <div className="bg-zinc-950 p-5 flex flex-col gap-3 flex-1">
                <pre className="text-zinc-400 text-sm leading-6 font-mono whitespace-pre-wrap">{aiParallels[activeParallel].ai.prompt}</pre>
                <div className="flex items-center gap-2 text-zinc-600 text-xs">
                  <ArrowFatRight size={12} weight="fill" /> output
                </div>
                <pre className="text-green-400 text-sm leading-7 font-mono whitespace-pre">{aiParallels[activeParallel].ai.output}</pre>
              </div>
              <div className="px-4 py-3 border-t border-border bg-amber-50">
                <p className="text-sm text-amber-800 leading-6">
                  <Warning size={13} weight="fill" className="inline mr-1.5" />
                  {aiParallels[activeParallel].ai.note}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6 max-w-2xl leading-7">
            <span className="text-foreground font-medium">The takeaway:</span>{" "}
            AI is a brilliant co-pilot — but you need to know how to fly first.
            Every concept in Dojo LoM is one that makes your AI-assisted code dramatically better.
          </p>
        </div>
      </section>

      {/* ── Prompt Engineering for Learners ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Brain size={16} weight="bold" />
              <span className="text-xs uppercase tracking-widest font-medium">AI as your coding partner</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight mb-3">How to learn with AI — the right way</h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Most people use AI to skip the thinking. The best learners use it to deepen it.
              Here's how to turn ChatGPT, Copilot, or any LLM into a patient teacher rather than a cheat sheet.
            </p>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
            {/* Tip list */}
            <div className="flex flex-col gap-1">
              {aiPromptTips.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActivePromptTip(i)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors border ${
                    activePromptTip === i
                      ? "bg-foreground text-background border-foreground"
                      : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="leading-5">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tip detail */}
            <div className="flex flex-col gap-0 border border-border">
              <div className="px-5 py-4 border-b border-border bg-white">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Instead of</p>
                <p className="text-sm font-mono bg-red-50 border border-red-200 text-red-800 px-3 py-2 leading-6">
                  {aiPromptTips[activePromptTip].bad}
                </p>
              </div>
              <div className="px-5 py-4 border-b border-border bg-white">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Try this</p>
                <p className="text-sm font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 leading-6 whitespace-pre-wrap">
                  {aiPromptTips[activePromptTip].good}
                </p>
              </div>
              <div className="px-5 py-4 bg-zinc-50">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Why it matters</p>
                <p className="text-sm text-muted-foreground leading-7">{aiPromptTips[activePromptTip].why}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Concepts, Two Ways ── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <GraduationCap size={16} weight="bold" />
              <span className="text-xs uppercase tracking-widest font-medium">Learn it your way</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight mb-3">
              Tech concepts — for everyone
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Whether you've never coded before or you're already writing scripts,
              these are the concepts that run the modern tech world.
              Pick your level — the same idea, two depths.
            </p>

            {/* Plain / Technical toggle */}
            <div className="flex gap-0 mt-6 border border-border w-fit">
              <button
                onClick={() => setDualTrackView("plain")}
                className={`px-4 py-2 text-sm transition-colors ${
                  dualTrackView === "plain"
                    ? "bg-foreground text-background"
                    : "bg-white text-muted-foreground hover:text-foreground"
                }`}
              >
                🟢 Plain English
              </button>
              <button
                onClick={() => setDualTrackView("technical")}
                className={`px-4 py-2 text-sm border-l border-border transition-colors ${
                  dualTrackView === "technical"
                    ? "bg-foreground text-background"
                    : "bg-white text-muted-foreground hover:text-foreground"
                }`}
              >
                🔵 Technical
              </button>
            </div>
          </div>

          {/* Topic pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {dualTrackTopics.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveDualTrack(i)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm border transition-colors ${
                  activeDualTrack === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.topic}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {dualTrackView === "plain" ? (
            <div className="border border-border">
              <div className="px-6 py-5 border-b border-border bg-zinc-50 flex items-center gap-3">
                <span className="text-2xl">{dualTrackTopics[activeDualTrack].icon}</span>
                <div>
                  <p className="font-semibold text-base">{dualTrackTopics[activeDualTrack].topic}</p>
                  <p className="text-sm text-muted-foreground">{dualTrackTopics[activeDualTrack].plain.headline}</p>
                </div>
              </div>
              <div className="px-6 py-6">
                <ol className="flex flex-col gap-4">
                  {dualTrackTopics[activeDualTrack].plain.steps.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="min-w-[28px] h-7 bg-foreground text-background text-sm flex items-center justify-center font-semibold shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-base text-muted-foreground leading-7 pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground leading-7">
                    <span className="text-foreground font-medium">In short: </span>
                    {dualTrackTopics[activeDualTrack].plain.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex gap-3 items-start">
                <Robot size={16} weight="fill" className="text-zinc-400 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-300 leading-7">
                  <span className="text-white font-medium">AI connection: </span>
                  {dualTrackTopics[activeDualTrack].ai}
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-border">
              <div className="px-6 py-5 border-b border-border bg-zinc-50 flex items-center gap-3">
                <span className="text-2xl">{dualTrackTopics[activeDualTrack].icon}</span>
                <div>
                  <p className="font-semibold text-base">{dualTrackTopics[activeDualTrack].topic}</p>
                  <p className="text-sm text-muted-foreground">{dualTrackTopics[activeDualTrack].technical.note}</p>
                </div>
              </div>
              <pre className="bg-zinc-950 text-green-400 p-6 text-sm leading-7 font-mono overflow-x-auto whitespace-pre">
                {dualTrackTopics[activeDualTrack].technical.code}
              </pre>
              <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex gap-3 items-start">
                <Robot size={16} weight="fill" className="text-zinc-400 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-300 leading-7">
                  <span className="text-white font-medium">AI connection: </span>
                  {dualTrackTopics[activeDualTrack].ai}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Skills for the AI Era ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Sparkle size={16} weight="fill" />
              <span className="text-xs uppercase tracking-widest font-medium">The AI era</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight mb-3">
              Skills that actually matter now
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              AI doesn't make programming skills obsolete — it raises the floor and amplifies the ceiling.
              Here's what's more valuable than ever in a world where AI writes first drafts of everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiEraSkills.map((s) => (
              <div
                key={s.skill}
                className={`bg-white border border-border border-l-4 ${s.borderColor} flex flex-col gap-3 p-5`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <p className="font-semibold text-base leading-5">{s.skill}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 font-medium shrink-0 ${s.tagStyle}`}>
                    {s.tag}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">{s.why}</p>
                <p className="text-sm text-muted-foreground leading-6">{s.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-border bg-white p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <p className="font-semibold text-base mb-1">The bottom line</p>
              <p className="text-sm text-muted-foreground leading-6 max-w-xl">
                AI handles the boilerplate. You handle the architecture, the judgment calls, the security,
                and the quality bar. The engineers who learn to work <em>with</em> AI — rather than be replaced by it
                — are the ones who build the future.
              </p>
            </div>
            <Button variant="default" size="lg" className="shrink-0" asChild>
              <a href="#waitlist">Start learning →</a>
            </Button>
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

