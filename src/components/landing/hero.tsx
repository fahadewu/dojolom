import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

/* The hero opens on the thing Dojolom actually makes: today's session, drawn as
   an exploded isometric stack. On load the four layers lift apart once, in the
   order a sitting runs (rewind, learn, play, check), and their names draw in.
   That is the page's one orchestrated moment; everything after it moves only
   when the visitor does something. */

const plates = [
  { key: "rewind", name: "Rewind", line: "What is due comes back first", face: "#7657e0", deep: "#5a3fc2", glyph: "rewind" },
  { key: "learn", name: "Learn", line: "One new idea, four moves", face: "#2f5bea", deep: "#1f42b8", glyph: "learn" },
  { key: "play", name: "Play", line: "A game you pick", face: "#f7c548", deep: "#d9a320", glyph: "play" },
  { key: "check", name: "Check", line: "A quick check to close", face: "#2a9d68", deep: "#1d7a50", glyph: "check" },
] as const;

// Geometry, in viewBox units. A plate is a 150-unit square seen isometrically: 260 wide, 150 tall, 12 thick.
const VB = { w: 560, h: 540 };
const CX = 210;      // the stack's centre line
const TOP = 26;      // the top plate's back corner when the stack is spread
const GAP = 110;     // vertical spacing between spread plates
const T = 12;        // plate thickness
const HALF = 129.9;  // 150 × cos 30°
const yOf = (i: number) => TOP + i * GAP;
const liftOf = (i: number) => (yOf(3) - (3 - i) * T) - yOf(i); // from stacked flat to spread

export function Hero() {
  return (
    <section className="relative overflow-hidden" data-testid="hero">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-[1.06fr_0.94fr] gap-10 lg:gap-10 items-center">
        <div className="flex flex-col gap-7">
          <h1 className="rise text-[2.9rem] sm:text-[4rem] lg:text-[3.9rem] xl:text-[4.15rem] font-semibold leading-[0.98] tracking-[-0.04em]">
            <span className="block [text-wrap:balance]">Learn it today.</span>
            <span className="block [text-wrap:balance]">Know it next month.</span>
          </h1>
          <p className="rise lede max-w-[34rem]" style={{ "--rise-delay": "90ms" } as React.CSSProperties}>
            Short daily sessions for any subject, or for your school books from Class 1 to HSC. You guess, try, see and say each
            idea, and it comes back just before you would forget it.
          </p>
          <div className="rise flex flex-wrap items-center gap-3" style={{ "--rise-delay": "170ms" } as React.CSSProperties}>
            <Button size="lg" asChild>
              <Link href="/learn" data-testid="hero-start">
                Start in two minutes
                <ArrowRight size={18} weight="bold" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#try">Try a lesson</a>
            </Button>
          </div>
          <p className="rise text-[15px] text-muted-foreground max-w-md" style={{ "--rise-delay": "230ms" } as React.CSSProperties}>
            Free while we build. No account, and your progress stays on this device.
          </p>
        </div>

        <SessionStack />
      </div>
    </section>
  );
}

function SessionStack() {
  return (
    <figure className="stack relative w-full max-w-[600px] mx-auto lg:mx-0 lg:justify-self-end" aria-labelledby="stack-caption" data-testid="session-stack">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto overflow-visible" role="img" aria-hidden="true">
        <defs>
          {/* An isometric drafting grid under the stack, fading out at the edges. */}
          <pattern id="iso-grid" width="34.64" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 0 L34.64 20 M34.64 0 L0 20" stroke="#141b2d" strokeOpacity="0.07" strokeWidth="1" fill="none" />
          </pattern>
          <radialGradient id="iso-fade" cx="0.42" cy="0.55" r="0.55">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="iso-mask"><rect width={VB.w} height={VB.h} fill="url(#iso-fade)" /></mask>
        </defs>
        <rect width={VB.w} height={VB.h} fill="url(#iso-grid)" mask="url(#iso-mask)" />
        <ellipse cx={CX} cy={yOf(3) + 150 + T + 10} rx="150" ry="26" fill="#141b2d" fillOpacity="0.07" className="stack-shadow" />

        {/* Bottom plate first, so each layer above paints over the one below. */}
        {[...plates].reverse().map((p) => {
          const i = plates.indexOf(p);
          return (
            <g key={p.key} className="stack-plate" style={{ "--i": i, "--lift": `${liftOf(i)}px` } as React.CSSProperties}>
              <g className="stack-spread" style={{ "--i": i } as React.CSSProperties}>
                <g transform={`translate(${CX} ${yOf(i)})`}>
                  <polygon points={`${-HALF},75 0,150 0,${150 + T} ${-HALF},${75 + T}`} fill={p.face} />
                  <polygon points={`0,150 ${HALF},75 ${HALF},${75 + T} 0,${150 + T}`} fill={p.deep} />
                  <polygon points={`0,0 ${HALF},75 0,150 ${-HALF},75`} fill="#ffffff" stroke="#141b2d" strokeWidth="1.1" strokeLinejoin="round" />
                  <g transform="matrix(0.866 0.5 -0.866 0.5 0 0)">
                    <Glyph kind={p.glyph} />
                  </g>
                </g>
                {/* Leader line from the plate's right corner to its name. */}
                <path
                  className="stack-lead"
                  pathLength={1}
                  d={`M${CX + HALF + 4} ${yOf(i) + 75} H${CX + HALF + 34}`}
                  stroke="#141b2d"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  fill="none"
                />
                <circle className="stack-dot" cx={CX + HALF + 36} cy={yOf(i) + 75} r="2.5" fill="#141b2d" />
              </g>
            </g>
          );
        })}
      </svg>
      {/* Names as HTML, so they stay readable at phone width. */}
      <ol className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {plates.map((p, i) => (
          <li
            key={p.key}
            className="stack-label absolute -translate-y-1/2"
            style={{ top: `${((yOf(i) + 75) / VB.h) * 100}%`, left: `${((CX + HALF + 44) / VB.w) * 100}%`, "--i": i } as React.CSSProperties}
          >
            <span className="block font-display text-[15px] sm:text-[17px] font-semibold leading-tight">{p.name}</span>
            <span className="hidden sm:block text-[13px] text-muted-foreground leading-snug max-w-[11rem]">{p.line}</span>
          </li>
        ))}
      </ol>
      <figcaption id="stack-caption" className="sr-only">
        A session in four layers: rewind what is due, learn one new idea, play a game, and close with a quick check.
      </figcaption>
    </figure>
  );
}

const INK = "#141b2d";
const line = { stroke: INK, strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" as const, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* What lies on each plate, drawn flat in a 150-unit square and set isometric by the parent transform. */
function Glyph({ kind }: { kind: (typeof plates)[number]["glyph"] }) {
  if (kind === "rewind") {
    return (
      <g>
        <path d="M104 80 A30 30 0 1 1 92 54" {...line} strokeWidth={1.6} stroke="#7657e0" />
        <path d="M84 46 L94 54 L84 62" {...line} strokeWidth={1.6} stroke="#7657e0" />
        {[0, 1, 2].map((k) => (
          <rect key={k} x={28 + k * 32} y={118} width="24" height="14" rx="4" fill="#ebe6fb" {...{ stroke: INK, strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const }} />
        ))}
      </g>
    );
  }
  if (kind === "learn") {
    const soft = ["#e6ecfd", "#fff1c9", "#dcf3e7", "#ebe6fb"];
    return (
      <g>
        {[0, 1, 2, 3].map((k) => {
          const x = 18 + (k % 2) * 60;
          const y = 18 + Math.floor(k / 2) * 60;
          return (
            <g key={k}>
              <rect x={x} y={y} width="52" height="52" rx="8" fill={soft[k]} stroke={INK} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={`M${x + 10} ${y + 18} H${x + 40} M${x + 10} ${y + 28} H${x + 34} M${x + 10} ${y + 38} H${x + 28}`} {...line} />
            </g>
          );
        })}
      </g>
    );
  }
  if (kind === "play") {
    return (
      <g>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 20 + (k % 3) * 40;
          const y = 34 + Math.floor(k / 3) * 46;
          const matched = k === 1 || k === 5;
          return <rect key={k} x={x} y={y} width="32" height="36" rx="6" fill={matched ? "#f7c548" : "#ffffff"} stroke={INK} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
        })}
        <path d="M76 70 L116 80" {...line} strokeDasharray="3 3" />
      </g>
    );
  }
  return (
    <g>
      {[0, 1, 2].map((k) => {
        const y = 34 + k * 34;
        const done = k < 2;
        return (
          <g key={k}>
            <circle cx="32" cy={y} r="9" fill={done ? "#2a9d68" : "#ffffff"} stroke={INK} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {done && <path d={`M27 ${y} L31 ${y + 4} L37 ${y - 4}`} stroke="#ffffff" strokeWidth="1.6" vectorEffect="non-scaling-stroke" fill="none" strokeLinecap="round" />}
            <rect x="50" y={y - 5} width={done ? 70 : 52} height="10" rx="5" fill={done ? "#dcf3e7" : "#eef1f7"} stroke={INK} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
        );
      })}
    </g>
  );
}

