import type { Metadata } from "next";
import { Figtree, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

import { ui } from "@clerk/ui";

import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
          className={`${spaceGrotesk.variable} ${figtree.variable} relative flex min-h-screen flex-col bg-paper font-sans text-ink antialiased`}
        >
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(15, 15, 19, 0.92)",
                color: "var(--ink)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
