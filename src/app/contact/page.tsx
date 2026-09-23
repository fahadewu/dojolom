"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import {
  EnvelopeSimple,
  DiscordLogo,
  GithubLogo,
  XLogo,
  LinkedinLogo,
  ChatsCircle,
  Bug,
  Lightbulb,
  HandHeart,
  ArrowUpRight,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tint } from "@/lib/tint";
import { cn } from "@/lib/utils";

const reasons = [
  { icon: ChatsCircle, title: "A question", text: "About Dojolom, early access, or anything else.", tint: "focus" },
  { icon: Bug, title: "Something broke", text: "Tell us what you did and what you expected to happen.", tint: "sprout" },
  { icon: Lightbulb, title: "An idea", text: "A subject, a game, a format we should try.", tint: "sun" },
  { icon: HandHeart, title: "Working together", text: "Content, research, schools or sponsorship.", tint: "play" },
] as const;

const socials = [
  { icon: GithubLogo, label: "GitHub", value: "@fahadewu", href: "https://github.com/fahadewu" },
  { icon: LinkedinLogo, label: "LinkedIn", value: "Fahad M.", href: "https://www.linkedin.com/in/fahad-m-3b63211b5/" },
  { icon: XLogo, label: "X", value: "@dojolom", href: "#" },
  { icon: DiscordLogo, label: "Discord", value: "Dojolom community", href: "#" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-foreground">
        {label}
        {hint && <span className="ml-1.5 font-normal text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      gooeyToast.error("Add your name", { description: "So we know who we're writing back to.", preset: "subtle" });
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      gooeyToast.error("That email doesn't look right", { description: "Check for a typo and try again.", preset: "subtle" });
      return;
    }
    if (!form.message.trim()) {
      gooeyToast.error("Write a message", { description: "Even a sentence is enough to get started.", preset: "subtle" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      gooeyToast.success("Message sent", {
        description: "We reply within two business days.",
        preset: "bouncy",
      });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-2xl flex flex-col gap-6">
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.02]">
              Let&rsquo;s talk.
            </h1>
            <p className="lede">
              A question, an idea, or something that broke. Use the form or reach us directly.
              We read every message and reply within two business days.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            <form onSubmit={handleSubmit} className="surface rounded-[28px] p-6 md:p-10 flex flex-col gap-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <Input name="name" placeholder="Your name" value={form.name} onChange={handleChange} autoComplete="name" />
                </Field>
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
                </Field>
              </div>
              <Field label="Subject" hint="optional">
                <Input name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
              </Field>
              <Field label="Message">
                <Textarea name="message" placeholder="Tell us what's on your mind." value={form.message} onChange={handleChange} rows={7} />
              </Field>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-sm text-muted-foreground">We only use your email to reply.</p>
                <Button size="lg" type="submit" disabled={loading} className="sm:w-auto w-full">
                  {loading ? "Sending" : "Send message"}
                  <PaperPlaneTilt size={18} weight="bold" />
                </Button>
              </div>
            </form>

            <aside className="surface rounded-[28px] divide-y divide-border lg:sticky lg:top-24">
              <div className="p-7 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <EnvelopeSimple size={18} weight="duotone" />
                  <p className="text-sm font-semibold">Email us directly</p>
                </div>
                <a href="mailto:fahad.wp@gmail.com" className="text-lg font-display font-semibold text-foreground hover:text-focus transition-colors break-all">
                  fahad.wp@gmail.com
                </a>
                <p className="text-sm text-muted-foreground leading-6">Best for partnerships, press and anything time-sensitive.</p>
              </div>
              <div className="p-7 flex flex-col gap-4">
                <p className="text-sm font-semibold text-muted-foreground">Find us online</p>
                <ul className="flex flex-col gap-1 -mx-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted transition-colors"
                      >
                        <span className="size-9 rounded-lg bg-muted text-foreground inline-flex items-center justify-center group-hover:bg-card transition-colors">
                          <s.icon size={18} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold leading-tight">{s.label}</span>
                          <span className="block text-sm text-muted-foreground truncate">{s.value}</span>
                        </span>
                        <ArrowUpRight size={16} weight="bold" className="text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
            <div className="max-w-2xl flex flex-col gap-3 mb-12">
              <h2 className="text-[2rem] font-semibold leading-[1.1]">What people usually write about</h2>
              <p className="lede">All messages are welcome. These are the common ones, so you know you&rsquo;re in the right place.</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {reasons.map((r) => {
                const t = tint[r.tint];
                return (
                  <li key={r.title} className="flex flex-col gap-4">
                    <span className={cn("size-11 rounded-xl inline-flex items-center justify-center", t.chip)}>
                      <r.icon size={24} weight="duotone" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-semibold">{r.title}</h3>
                      <p className="text-[15px] text-muted-foreground leading-7">{r.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
