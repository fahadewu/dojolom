import Link from "next/link";
import { GithubLogo, XLogo, DiscordLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";

const learn = [
  { href: "/#subjects", label: "Subjects" },
  { href: "/#how", label: "How it works" },
  { href: "/#try", label: "Try a lesson" },
  { href: "/start", label: "Start learning" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/#waitlist", label: "Early access" },
];

const colourKey = [
  { dot: "bg-focus", name: "Blue", job: "focus" },
  { dot: "bg-sun", name: "Yellow", job: "attention" },
  { dot: "bg-sprout", name: "Green", job: "progress" },
  { dot: "bg-play", name: "Violet", job: "play" },
];

const socials = [
  { href: "https://github.com/fahadewu", label: "GitHub", Icon: GithubLogo },
  { href: "#", label: "X", Icon: XLogo },
  { href: "#", label: "Discord", Icon: DiscordLogo },
];

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-4">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] lg:grid-cols-[1.6fr_0.9fr_0.9fr_1.3fr]">
        <div className="flex flex-col gap-5 max-w-sm">
          <Logo />
          <p className="text-[15px] text-muted-foreground leading-7">
            A learning platform that asks how you learn first, then builds any subject to fit.
          </p>
          <div className="flex items-center gap-1 -ml-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="size-10 inline-flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon size={20} weight="regular" />
              </a>
            ))}
          </div>
        </div>

        <FooterLinks title="Learn" links={learn} />
        <FooterLinks title="Company" links={company} />

        <div className="md:col-span-3 lg:col-span-1">
          <p className="text-sm font-semibold text-foreground mb-4">How to read our colours</p>
          <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
            {colourKey.map((c) => (
              <li key={c.name} className="flex items-center gap-3 text-[15px] text-muted-foreground">
                <span className={`size-3 rounded-full ${c.dot}`} aria-hidden />
                <span><span className="text-foreground font-medium">{c.name}</span> for {c.job}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Dojolom</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
