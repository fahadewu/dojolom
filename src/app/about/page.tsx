"use client";
import {
  GraduationCap,
  Terminal,
  Rocket,
  Eye,
  UsersThree,
  MaskHappy,
  GithubLogo,
  LinkedinLogo,
  Wrench,
  BookOpen,
  Code,
  Globe,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: <BookOpen size={22} weight="duotone" />,
    title: "Depth over breadth",
    description:
      "We'd rather have you truly understand 10 concepts than superficially touch 100. Every lesson earns its place.",
  },
  {
    icon: <Code size={22} weight="duotone" />,
    title: "Code first",
    description:
      "No passive watching. You write real code from lesson one. Mistakes are the curriculum.",
  },
  {
    icon: <UsersThree size={22} weight="duotone" />,
    title: "Community matters",
    description:
      "Learning alone is hard. Dojo LoM is built around peer learning — ask, share, and teach back.",
  },
  {
    icon: <Globe size={22} weight="duotone" />,
    title: "Accessible to all",
    description:
      "Great programming education shouldn't depend on geography or budget. We're building for everyone.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "The spark",
    description:
      "Leopard begins his programming journey — self-taught, frustrated with scattered resources, learning the hard way.",
  },
  {
    year: "2022",
    title: "The idea",
    description:
      "After years of building real projects and mentoring peers, the lack of structured, honest learning paths becomes impossible to ignore.",
  },
  {
    year: "2024",
    title: "The partnership",
    description:
      "Ronin joins as Founder, bringing a curriculum-design mindset that turns rough ideas into a proper learning framework.",
  },
  {
    year: "2025",
    title: "Building in the open",
    description:
      "First tracks drafted, community feedback gathered, platform architecture finalized. Early access cohort announced.",
  },
  {
    year: "2026",
    title: "Early access",
    description:
      "Dojo LoM opens its doors to the first cohort of learners. The Dojo is open.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-mono">
      <Navbar />

      {/* ── Hero ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-4">About Dojo LoM</p>
            <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-5">
              Built because the<br />right thing didn't exist.
            </h1>
            <p className="text-sm text-muted-foreground leading-7">
              Dojo LoM was born out of a simple frustration: every programming platform either
              holds your hand until you can't think for yourself, or throws you in the deep end
              with no direction. We're building the middle path — structured, honest,
              hands-on education from first principles.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-zinc-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
          <Card className="py-6 gap-0">
            <CardHeader className="py-0 gap-3 mb-4">
              <div className="size-9 border border-border flex items-center justify-center text-foreground">
                <Rocket size={18} weight="duotone" />
              </div>
              <CardTitle className="text-base">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-7">
                To give every aspiring programmer — regardless of background or budget — a structured,
                complete, and honest path from writing their first line of code to building and shipping
                real software. No shortcuts. No bloat. Just a clear road.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="py-6 gap-0">
            <CardHeader className="py-0 gap-3 mb-4">
              <div className="size-9 border border-border flex items-center justify-center text-foreground">
                <Eye size={18} weight="duotone" />
              </div>
              <CardTitle className="text-base">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-7">
                A world where "I want to learn programming" is never followed by "but I don't know where
                to start." Dojo LoM becomes the default answer — the one place that takes you seriously
                from day one and grows with you all the way to mastery.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">What we believe in</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              The principles that shape every decision we make about the platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <Card key={v.title} className="py-5 gap-4">
                <CardHeader className="py-0 gap-3">
                  <div className="text-foreground">{v.icon}</div>
                  <CardTitle className="text-sm">{v.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs leading-6">{v.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story / Timeline ── */}
      <section className="bg-zinc-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">How we got here</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              The story behind Dojo LoM — from a frustrated learner to an actual platform.
            </p>
          </div>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6 group">
                {/* Left: year + line */}
                <div className="flex flex-col items-center">
                  <div className="size-8 border border-border bg-white flex items-center justify-center shrink-0 z-10">
                    <Terminal size={12} weight="bold" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-0 mb-0 min-h-8" />
                  )}
                </div>
                {/* Right: content */}
                <div className="pb-10 flex flex-col gap-1.5 pt-1">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
                    {item.year}
                  </span>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-6 max-w-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">The team</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Two builders. One goal. Still private — but present.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Leopard */}
            <Card className="py-6 gap-0">
              <CardHeader className="py-0 gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 select-none">
                    <MaskHappy size={22} weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none mb-1.5">Leopard</p>
                    <p className="text-[11px] text-muted-foreground">Founder &amp; Lead</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-xs leading-6 text-muted-foreground">
                  Full-stack developer since 2019. Background in Information &amp; Communications
                  Engineering. Experience across web, DevOps, AI/ML, and mobile. Builds the platform,
                  writes the code, and obsesses over learning paths.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "Python", "Next.js", "Node.js", "PHP", "DevOps", "AI/ML"].map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] font-normal gap-1">
                      <Wrench size={9} weight="bold" />{s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
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
              <CardHeader className="py-0 gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 select-none">
                    <MaskHappy size={22} weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none mb-1.5">Ronin</p>
                    <p className="text-[11px] text-muted-foreground">Founder &amp; Curriculum</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-xs leading-6 text-muted-foreground">
                  A methodical thinker who believes any concept can be taught clearly if introduced in
                  the right order. Shapes the entire curriculum architecture — what comes first, how
                  complexity is layered, and where learners are most likely to give up.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Curriculum Design", "Problem Solving", "Teaching", "Systems Thinking"].map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] font-normal gap-1">
                      <Wrench size={9} weight="bold" />{s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] text-muted-foreground italic">Identity private — coming soon.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-5">
          <GraduationCap size={32} weight="duotone" className="text-zinc-400" />
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Ready to join the Dojo?
          </h2>
          <p className="text-zinc-400 text-sm max-w-sm">
            We're opening to the first group of learners soon. Get on the list.
          </p>
          <a
            href="/#waitlist"
            className="inline-flex items-center gap-2 h-9 px-4 bg-white text-zinc-950 text-xs font-medium hover:bg-zinc-200 transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
