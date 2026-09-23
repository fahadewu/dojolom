import { Play } from "@phosphor-icons/react/dist/ssr";

/* Small compositions that show each format rather than describe it.
   Built from the same four colours the lessons themselves use. */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-[4/3] w-full rounded-2xl bg-muted/70 p-6 sm:p-8 flex items-center justify-center overflow-hidden" aria-hidden>
      {children}
    </div>
  );
}

export function InfographicArt() {
  const cells = [
    { bg: "bg-focus-soft", bar: "bg-focus" },
    { bg: "bg-sun-soft", bar: "bg-sun" },
    { bg: "bg-play-soft", bar: "bg-play" },
    { bg: "bg-sprout-soft", bar: "bg-sprout" },
  ];
  return (
    <Frame>
      <div className="w-full max-w-[260px] rounded-2xl bg-card shadow-[var(--shadow-card)] p-4 flex flex-col gap-3">
        <div className="h-2.5 w-2/3 rounded-full bg-foreground/80" />
        <div className="h-2 w-1/2 rounded-full bg-muted-foreground/30" />
        <div className="grid grid-cols-2 gap-2 mt-1">
          {cells.map((c, i) => (
            <div key={i} className={`${c.bg} rounded-xl p-2.5 flex flex-col gap-1.5`}>
              <div className="flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${c.bar}`} />
                <span className="h-1.5 w-8 rounded-full bg-foreground/50" />
              </div>
              <span className="h-1.5 w-full rounded-full bg-foreground/15" />
              <span className="h-1.5 w-3/4 rounded-full bg-foreground/15" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function GameArt() {
  const grid = ["bg-card", "bg-play", "bg-card", "bg-play", "bg-play", "bg-card", "bg-card", "bg-play", "bg-card"];
  return (
    <Frame>
      <div className="relative w-full max-w-[220px]">
        <div className="grid grid-cols-3 gap-2">
          {grid.map((c, i) => (
            <div key={i} className={`${c} aspect-square rounded-xl shadow-[var(--shadow-hairline)]`} />
          ))}
        </div>
        <span className="absolute -top-3 -right-4 rounded-full bg-sun text-ink font-display font-semibold text-sm px-3 py-1 shadow-[var(--shadow-card)]">
          +10
        </span>
        <div className="absolute -bottom-4 left-4 right-4 h-2 rounded-full bg-card shadow-[var(--shadow-hairline)] overflow-hidden">
          <span className="block h-full w-2/3 rounded-full bg-sprout" />
        </div>
      </div>
    </Frame>
  );
}

export function VideoArt() {
  return (
    <Frame>
      <div className="w-full max-w-[260px] aspect-video rounded-2xl bg-ink relative overflow-hidden shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(47_91_234/0.55),transparent_60%)]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-white text-ink inline-flex items-center justify-center">
          <Play size={20} weight="fill" className="translate-x-px" />
        </span>
        <div className="absolute left-4 right-4 bottom-4 h-1.5 rounded-full bg-white/25 overflow-hidden">
          <span className="block h-full w-2/4 rounded-full bg-sun" />
        </div>
        <span className="absolute right-4 bottom-7 text-[10px] font-semibold text-white/80">Step 2 of 4</span>
      </div>
    </Frame>
  );
}
