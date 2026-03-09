import Link from "next/link";
import { Terminal, GithubLogo, TwitterLogo, DiscordLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <Terminal size={16} weight="bold" />
            Dojo LoM
          </div>
          <p className="text-xs text-muted-foreground max-w-xs">
            A place to learn the language machines speak — from scratch to fluent.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <Link href="/#tracks" className="hover:text-foreground transition-colors">Courses</Link>
          <Link href="/#how" className="hover:text-foreground transition-colors">How It Works</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <Link href="/#waitlist" className="hover:text-foreground transition-colors">Join Waitlist</Link>
        </nav>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a href="https://github.com/fahadewu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
            <GithubLogo size={16} weight="bold" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
            <TwitterLogo size={16} weight="bold" />
          </a>
          <a href="#" aria-label="Discord" className="hover:text-foreground transition-colors">
            <DiscordLogo size={16} weight="bold" />
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 text-[11px] text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Dojo LoM. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
