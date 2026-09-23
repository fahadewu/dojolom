import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center">
        <div className="max-w-6xl w-full mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="flex flex-col gap-7">
            <p className="font-display text-sm font-semibold text-muted-foreground">Error 404</p>
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.02]">
              This lesson isn&rsquo;t on the map yet.
            </h1>
            <p className="lede max-w-md">
              The page moved, was renamed, or never existed. Nothing you did caused it.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button size="lg" asChild>
                <Link href="/"><ArrowLeft size={18} weight="bold" /> Back home</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/start">Build my path <ArrowRight size={18} weight="bold" /></Link>
              </Button>
            </div>
          </div>

          {/* The logo's three shapes, looking for the missing piece. */}
          <svg viewBox="0 0 320 320" className="hidden md:block w-full max-w-md mx-auto" aria-hidden="true">
            <rect x="20" y="120" width="140" height="140" rx="32" className="fill-focus" />
            <circle cx="210" cy="110" r="80" className="fill-sun" />
            <path d="M170 300 L300 300 L235 190 Z" className="fill-sprout" />
            <rect x="30" y="30" width="60" height="60" rx="16" className="fill-none stroke-border" strokeWidth="3" strokeDasharray="8 8" />
            <text x="90" y="200" textAnchor="middle" className="fill-white font-display" fontSize="44" fontWeight="600">404</text>
          </svg>
        </div>
      </main>
      <Footer />
    </div>
  );
}
