import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const founders = [
  {
    name: "Leopard",
    role: "Founder, product and engineering",
    initial: "L",
    tone: "bg-focus text-white",
    bio: "Builder since 2019 with a background in Information and Communications Engineering. Self-taught most of what he knows, and remembers how much of it stuck only when it arrived in the right form. Builds the platform and the learning engine behind it.",
    links: [
      { href: "https://github.com/fahadewu", label: "GitHub", Icon: GithubLogo },
      { href: "https://www.linkedin.com/in/fahad-m-3b63211b5/", label: "LinkedIn", Icon: LinkedinLogo },
    ],
  },
  {
    name: "Ronin",
    role: "Founder, curriculum and learning design",
    initial: "R",
    tone: "bg-play text-white",
    bio: "Believes any idea can be taught clearly if it is broken down in the right order and shown in the right form. Designs how subjects are sequenced, how difficulty is introduced, and how each learning style gets its own path to the same understanding.",
    links: [],
    note: "Working behind the scenes for now.",
  },
];

export function FounderCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-5", className)}>
      {founders.map((f) => (
        <article key={f.name} className="surface rounded-3xl p-7 md:p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className={cn("size-14 rounded-2xl inline-flex items-center justify-center font-display text-2xl font-semibold", f.tone)} aria-hidden>
              {f.initial}
            </span>
            <div>
              <h3 className="text-xl font-semibold leading-tight">{f.name}</h3>
              <p className="text-[15px] text-muted-foreground mt-0.5">{f.role}</p>
            </div>
          </div>
          <p className="text-[15px] text-muted-foreground leading-7">{f.bio}</p>
          <div className="mt-auto flex items-center justify-between gap-4 min-h-10">
            {f.links.length > 0 ? (
              <div className="flex items-center gap-1 -ml-2">
                {f.links.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on ${label}`}
                    className="size-10 inline-flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{f.note}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
