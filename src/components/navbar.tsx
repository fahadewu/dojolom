"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, ArrowRight, List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#tracks", label: "Courses" },
  { href: "/#how", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-base tracking-tight">
          <Terminal size={18} weight="bold" />
          Dojo LoM
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-foreground transition-colors",
                pathname === link.href && "text-foreground font-medium"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/#waitlist">
              Join Waitlist
              <ArrowRight size={12} weight="bold" />
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-base text-muted-foreground hover:text-foreground transition-colors",
                pathname === link.href && "text-foreground font-medium"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="w-fit mt-1" asChild>
            <Link href="/#waitlist" onClick={() => setOpen(false)}>
              Join Waitlist
              <ArrowRight size={12} weight="bold" />
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
