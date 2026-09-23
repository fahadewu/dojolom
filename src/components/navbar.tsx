"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#subjects", label: "Subjects" },
  { href: "/#how", label: "How it works" },
  { href: "/#try", label: "Try a lesson" },
  { href: "/study", label: "My study" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/80 backdrop-blur-xl transition-shadow duration-300",
        scrolled || open ? "shadow-[0_1px_0_rgb(20_27_45/0.08)]" : "shadow-none"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/70",
                isActive(link.href) && "text-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute left-1/2 -bottom-0.5 size-1 -translate-x-1/2 rounded-full bg-focus" aria-hidden />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden md:inline-flex h-10 px-4" asChild>
            <Link href="/start">
              Start learning
              <ArrowRight size={14} weight="bold" />
            </Link>
          </Button>

          <button
            className="md:hidden size-10 inline-flex items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-background border-t border-border/80 animate-in fade-in slide-in-from-top-1 duration-200">
          <nav className="max-w-6xl mx-auto px-6 py-3 flex flex-col" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between py-3.5 text-lg font-medium text-foreground border-b border-border/70 last:border-0",
                  isActive(link.href) && "text-focus"
                )}
              >
                {link.label}
                <ArrowRight size={16} weight="bold" className="text-muted-foreground/60" />
              </Link>
            ))}
            <Button size="lg" className="w-full mt-4 mb-3" asChild>
              <Link href="/start" onClick={() => setOpen(false)}>
                Start learning
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
