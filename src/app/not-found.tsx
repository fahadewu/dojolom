import Link from "next/link";
import { Terminal, ArrowLeft, Warning } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-foreground font-mono flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

          {/* Left: message */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Warning size={16} weight="bold" />
              <span className="text-xs uppercase tracking-widest font-medium">404 — Page Not Found</span>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight leading-tight">
              This path<br />doesn't exist.
            </h1>

            <p className="text-base text-muted-foreground leading-7 max-w-sm">
              You've wandered off the track. The page you're looking for was
              moved, deleted, or maybe never existed. Happens to the best of us.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors"
              >
                <ArrowLeft size={14} weight="bold" />
                Back to Home
              </Link>
              <Link
                href="/#tracks"
                className="inline-flex items-center gap-2 h-9 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>

          {/* Right: terminal decoration */}
          <div className="hidden md:flex flex-col border border-border bg-zinc-950 font-mono text-sm">
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-zinc-500 text-xs ml-2">dojo-lom ~ bash</span>
            </div>

            {/* terminal body */}
            <div className="p-6 flex flex-col gap-1 leading-7">
              <p>
                <span className="text-zinc-500">$</span>{" "}
                <span className="text-green-400">cd</span>{" "}
                <span className="text-white">/dojo/page-youre-looking-for</span>
              </p>
              <p className="text-red-400">
                bash: cd: /dojo/page-youre-looking-for: No such file or directory
              </p>
              <p className="mt-2">
                <span className="text-zinc-500">$</span>{" "}
                <span className="text-green-400">ls</span>{" "}
                <span className="text-white">/dojo</span>
              </p>
              <p className="text-zinc-300">
                home/{"  "}courses/{"  "}about/{"  "}contact/
              </p>
              <p className="mt-2">
                <span className="text-zinc-500">$</span>{" "}
                <span className="text-yellow-300">echo</span>{" "}
                <span className="text-orange-300">"Maybe start from here?"</span>
              </p>
              <p className="text-white">Maybe start from here?</p>
              <p className="mt-2">
                <span className="text-zinc-500">$</span>{" "}
                <span className="text-green-400">cd</span>{" "}
                <span className="text-white">/dojo/home</span>
              </p>
              <p className="text-zinc-400 text-xs mt-3">
                ✓ Found.{"  "}·{"  "}
                <Link href="/" className="underline underline-offset-4 hover:text-white transition-colors">
                  Navigate →
                </Link>
              </p>
              <p className="mt-2 flex items-center gap-1">
                <span className="text-zinc-500">$</span>
                <span className="w-2 h-4 bg-zinc-400 animate-pulse inline-block" />
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
