"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { useMounted } from "@/lib/study-store";
import type { MotionProfile } from "@/lib/study";
import { cn } from "@/lib/utils";

/* Study pages read localStorage, so they render a quiet skeleton until mounted
   and never hydrate against server HTML that could disagree. */
export function ClientGate({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const mounted = useMounted();
  if (!mounted) return <>{fallback ?? <StudySkeleton />}</>;
  return <>{children}</>;
}

export function StudySkeleton({ bare = false }: { bare?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!bare && <Navbar />}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-14" aria-busy="true">
        <div className="h-8 w-56 rounded-full bg-muted mb-6" />
        <div className="h-40 rounded-[28px] bg-muted/70" />
      </main>
      {!bare && <Footer />}
    </div>
  );
}

/* The root of every study screen. data-motion tunes every animation inside;
   data-tap enlarges tap targets (children, 60+, or anyone with large text);
   data-text scales the page for large text. With tapHold, a second tap within
   300 ms is dropped: young children's taps often land on the screen that
   replaced the one they meant (src/lib/age.ts). */
export function StudyRoot({
  motion,
  largeTargets,
  largeText = false,
  tapHold = false,
  children,
  className,
}: {
  motion: MotionProfile;
  largeTargets: boolean;
  largeText?: boolean;
  tapHold?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const lastTap = useRef(-Infinity); // event timestamps count from page load, so a first tap must never look recent
  return (
    <div
      data-motion={motion}
      data-tap={largeTargets ? "large" : "normal"}
      data-text={largeText ? "large" : "normal"}
      onClickCapture={tapHold ? (e) => {
        const t = e.timeStamp;
        if (t - lastTap.current < 300) { e.preventDefault(); e.stopPropagation(); return; }
        lastTap.current = t;
      } : undefined}
      className={cn("min-h-screen bg-background text-foreground flex flex-col", className)}
    >
      {children}
    </div>
  );
}

/* A page with the site navigation: dashboard, path, settings. */
export function StudyPage({
  motion,
  largeTargets,
  largeText = false,
  children,
  wide = true,
}: {
  motion: MotionProfile;
  largeTargets: boolean;
  largeText?: boolean;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <StudyRoot motion={motion} largeTargets={largeTargets} largeText={largeText}>
      <Navbar />
      <main className={cn("flex-1 w-full mx-auto px-6 py-10 md:py-16 flex flex-col gap-12", wide ? "max-w-6xl" : "max-w-3xl")}>{children}</main>
      <Footer />
    </StudyRoot>
  );
}

/* The focused frame a session runs in: logo, a way out, and room for the segment. */
export function SessionFrame({
  motion,
  largeTargets,
  largeText = false,
  tapHold = false,
  backHref,
  backLabel = "My study",
  aside,
  children,
}: {
  motion: MotionProfile;
  largeTargets: boolean;
  largeText?: boolean;
  tapHold?: boolean;
  backHref: string;
  backLabel?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <StudyRoot motion={motion} largeTargets={largeTargets} largeText={largeText} tapHold={tapHold}>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 h-[64px] flex items-center justify-between gap-4">
          <Link href={backHref} className="inline-flex items-center gap-2 text-[15px] font-medium text-muted-foreground hover:text-foreground rounded-full px-2 -ml-2 py-1.5">
            <ArrowLeft size={16} weight="bold" />
            {backLabel}
          </Link>
          <div className="flex items-center gap-3">{aside}</div>
          <Logo />
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 md:py-12 flex flex-col gap-8">{children}</main>
    </StudyRoot>
  );
}
