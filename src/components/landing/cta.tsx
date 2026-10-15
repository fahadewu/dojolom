"use client";

import { useState } from "react";
import Link from "next/link";
import { gooeyToast } from "goey-toast";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useInView } from "@/components/landing/use-in-view";

/* The close. The mark's three shapes (structure, play, progress) come in on
   orbits and settle into the logo the first time this block is seen: the
   whole page's promise, ideas circling back until they hold. */

export function Cta() {
  const [email, setEmail] = useState("");

  function join() {
    if (!email.trim() || !email.includes("@")) {
      gooeyToast.error("That email doesn't look right", { description: "Check for a typo and try again.", preset: "subtle" });
      return;
    }
    setEmail("");
    gooeyToast.success("You're on the list", { description: "We'll write when new chapters and subjects land.", preset: "bouncy" });
  }

  return (
    <section id="waitlist" className="max-w-6xl mx-auto px-6 pb-20 md:pb-28 scroll-mt-16" data-testid="cta">
      <div className="relative overflow-hidden rounded-[36px] bg-focus text-white p-8 md:p-14 grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
        <div className="relative flex flex-col gap-6 max-w-xl">
          <h2 className="text-[2.2rem] md:text-[3rem] font-semibold leading-[1.04] tracking-[-0.035em]">Your first session takes about ten minutes</h2>
          <p className="text-lg text-white/80 leading-8">Two minutes of questions, then a path made for you. No account and nothing to install.</p>
          <Button size="lg" variant="sun" className="self-start" asChild>
            <Link href="/learn" data-testid="cta-start">
              Start in two minutes
              <ArrowRight size={18} weight="bold" />
            </Link>
          </Button>
          <form className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-2.5 pt-6 border-t border-white/20" onSubmit={(e) => { e.preventDefault(); join(); }} noValidate>
            <label className="w-full text-[15px] font-semibold text-white/85" htmlFor="cta-email">Get an email when new chapters land</label>
            <Input
              id="cta-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[52px] sm:w-80 bg-white/10 text-white placeholder:text-white/60 border-white/25 shadow-none focus-visible:ring-white/40"
            />
            <Button size="lg" type="submit" variant="white" className="shrink-0">Keep me posted</Button>
          </form>
        </div>
        <OrbitMark />
      </div>
    </section>
  );
}

function OrbitMark() {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.5 });
  return (
    <div ref={ref} className={cn("orbit relative mx-auto size-[240px] md:size-[300px]", seen && "is-seen")} aria-hidden>
      <svg viewBox="0 0 320 320" className="size-full overflow-visible">
        <g className="orbit-rings" fill="none" stroke="white" strokeWidth="1.2">
          {[0, 60, 120].map((r) => <ellipse key={r} cx="160" cy="160" rx="146" ry="50" transform={`rotate(${r} 160 160)`} />)}
        </g>
        <circle className="orbit-flash" cx="160" cy="160" r="92" fill="none" stroke="white" strokeWidth="2" />
        {/* The logo mark at 6×, centred: square (structure), circle (play), triangle (progress). */}
        <g className="orbit-shape" style={{ "--a": "-220deg", "--r": "150px", "--delay": "0ms", transformOrigin: "118px 178px" } as React.CSSProperties}>
          <rect x="76" y="136" width="84" height="84" rx="21" fill="#ffffff" />
        </g>
        <g className="orbit-shape" style={{ "--a": "160deg", "--r": "140px", "--delay": "140ms", transformOrigin: "190px 130px" } as React.CSSProperties}>
          <circle cx="190" cy="130" r="48" fill="#f7c548" />
        </g>
        <g className="orbit-shape" style={{ "--a": "-120deg", "--r": "160px", "--delay": "280ms", transformOrigin: "205px 222px" } as React.CSSProperties}>
          <path d="M166 244 L244 244 L205 178 Z" fill="#2a9d68" stroke="#2a9d68" strokeWidth="6" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
