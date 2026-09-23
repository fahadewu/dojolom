import Link from "next/link";
import { cn } from "@/lib/utils";

/* Three stacked shapes: a square (structure), a circle (play) and a triangle
   (progress) — the three things Dojolom turns a subject into. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true">
      <rect x="2" y="12" width="14" height="14" rx="3.5" className="fill-focus" />
      <circle cx="21" cy="11" r="8" className="fill-sun" />
      <path d="M17 30 L30 30 L23.5 19 Z" className="fill-sprout" />
    </svg>
  );
}

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Dojolom home"
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.02em] rounded-lg",
        light ? "text-white" : "text-foreground",
        className
      )}
    >
      <LogoMark />
      Dojolom
    </Link>
  );
}
