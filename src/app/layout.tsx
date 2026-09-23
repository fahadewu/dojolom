import type { Metadata } from "next";
import { Outfit, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toaster";
import { cn } from "@/lib/utils";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Nunito({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Dojolom — Learn anything, the way you learn best",
  description:
    "Dojolom asks how you like to learn, then builds a personal, day-by-day path of infographics, mini-games, stories and guided walkthroughs for any subject.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(display.variable, body.variable)}>
      <body className="font-sans antialiased">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
