import type { Metadata } from "next";
import { Outfit, Nunito, Anek_Bangla } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toaster";
import { cn } from "@/lib/utils";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Nunito({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });
// Bangla terms and book names: a Bangla face with a width axis, so Bangla is set as type, not left to a system fallback.
const bangla = Anek_Bangla({ subsets: ["bengali"], variable: "--font-bangla", weight: "variable", axes: ["wdth"] });

export const metadata: Metadata = {
  title: "Dojolom: learn it today, know it next month",
  description:
    "Short daily sessions for any subject or NCTB school book, Class 1 to HSC. You guess, try, see and say each idea, and it comes back just before you would forget it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(display.variable, body.variable, bangla.variable)}>
      <body className="font-sans antialiased">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
