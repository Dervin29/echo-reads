import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

import { ui } from "@clerk/ui";

import { Toaster } from "sonner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echo Reads",
  description:
    "Transform your books into interactive AI conversations. Upload PDFs, and chat with your books using voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider ui={ui}>
      <html lang="en" className="scroll-smooth">
        <body
          suppressHydrationWarning
          className={`${fraunces.variable} ${figtree.variable} relative flex min-h-screen flex-col bg-[#f5f1e8] font-sans antialiased`}
        >
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
