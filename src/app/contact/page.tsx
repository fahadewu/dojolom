"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import {
  EnvelopeSimple,
  DiscordLogo,
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  ChatsCircle,
  Bug,
  Lightbulb,
  HandHeart,
} from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: <ChatsCircle size={20} weight="duotone" />,
    title: "General inquiry",
    description: "Questions about Dojo LoM, early access, or anything else.",
    badge: "Common",
  },
  {
    icon: <Bug size={20} weight="duotone" />,
    title: "Bug report",
    description: "Found something broken? Tell us exactly what happened.",
    badge: null,
  },
  {
    icon: <Lightbulb size={20} weight="duotone" />,
    title: "Feature suggestion",
    description: "Have an idea for a lesson, track, or feature? We're all ears.",
    badge: null,
  },
  {
    icon: <HandHeart size={20} weight="duotone" />,
    title: "Partner / collaborate",
    description: "Want to work with us, contribute content, or sponsor the platform?",
    badge: null,
  },
];

const socials = [
  {
    icon: <GithubLogo size={16} weight="bold" />,
    label: "GitHub",
    value: "@fahadewu",
    href: "https://github.com/fahadewu",
  },
  {
    icon: <LinkedinLogo size={16} weight="bold" />,
    label: "LinkedIn",
    value: "Fahad M.",
    href: "https://www.linkedin.com/in/fahad-m-3b63211b5/",
  },
  {
    icon: <TwitterLogo size={16} weight="bold" />,
    label: "Twitter / X",
    value: "@dojolom",
    href: "#",
  },
  {
    icon: <DiscordLogo size={16} weight="bold" />,
    label: "Discord",
    value: "Dojo LoM Community",
    href: "#",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      gooeyToast.error("Name required", { description: "Please enter your name.", preset: "subtle" });
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      gooeyToast.error("Invalid email", { description: "Please enter a valid email address.", preset: "subtle" });
      return;
    }
    if (!form.message.trim()) {
      gooeyToast.error("Message required", { description: "Please write a message before sending.", preset: "subtle" });
      return;
    }
    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      gooeyToast.success("Message sent!", {
        description: "We'll get back to you soon!!",
        preset: "bouncy",
      });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-mono">
      <Navbar />

      {/* ── Hero ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Contact</p>
            <h1 className="text-5xl font-semibold tracking-tight leading-tight mb-5">
              Let's talk.
            </h1>
            <p className="text-base text-muted-foreground leading-7">
              Have a question, idea, or just want to say hi? Use the form below or reach us
              directly on any of our social channels. We read every message.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main area: form + sidebar ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start">

          {/* Contact form */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-1">Send a message</h2>
              <p className="text-sm text-muted-foreground">We typically respond within 1–2 business days.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Name</span>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="h-9 text-sm"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Email</span>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="h-9 text-sm"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Subject <span className="normal-case tracking-normal font-normal text-muted-foreground/60">(optional)</span></span>
                <Input
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className="h-9 text-sm"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Message</span>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                  rows={7}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full min-w-0 rounded-none border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-1 resize-none leading-6"
                />
              </label>
              <div className="pt-1">
                <Button size="sm" type="submit" disabled={loading} className="h-9">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 md:sticky md:top-20">

            {/* Direct contact */}
            <Card className="py-5 gap-0">
              <CardHeader className="py-0 gap-2 mb-4">
                <div className="flex items-center gap-2 text-foreground">
                  <EnvelopeSimple size={16} weight="bold" />
                  <CardTitle className="text-base">Direct email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:fahad.wp@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  fahad.wp@gmail.com
                </a>
                <CardDescription className="text-xs mt-2 leading-5">
                  For partnership, press, or time-sensitive matters.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Socials */}
            <Card className="py-5 gap-0">
              <CardHeader className="py-0 gap-2 mb-4">
                <CardTitle className="text-base">Find us online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="shrink-0">{s.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground/60 leading-none mb-0.5">{s.label}</span>
                        <span className="text-sm group-hover:underline underline-offset-4">{s.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Reason cards ── */}
      <section className="border-t border-border bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight mb-2">What are you reaching out about?</h2>
            <p className="text-sm text-muted-foreground">All messages welcome — these are just common ones.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r) => (
              <Card key={r.title} className="py-5 gap-3">
                <CardHeader className="py-0 gap-3">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground">{r.icon}</div>
                    {r.badge && (
                      <Badge variant="secondary" className="text-xs font-normal">{r.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6">{r.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
