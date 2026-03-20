import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RefactorBuddy — Senior Code Review, Instantly",
  description:
    "Paste your code. Get a production-grade architectural review powered by Claude AI. Structured critiques, refactored code, and engineering principles — in seconds.",
  keywords: ["code review", "refactoring", "clean code", "SOLID", "architecture", "AI"],
  openGraph: {
    title: "RefactorBuddy",
    description: "Drop your code. Get a senior review.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="h-full bg-noise antialiased">{children}</body>
    </html>
  );
}
