"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const CTA = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden bg-paper-soft py-24 md:py-32">
      <div className="wrapper">
        <motion.div
          className="bezel"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
        >
          <div className="bezel-core relative overflow-hidden px-6 py-16 md:px-16 md:py-24">
            <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/15 blur-3xl animate-orb" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-gold/12 blur-3xl animate-orb [animation-delay:-8s]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(52,211,153,0.12),transparent_70%)]" />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <p className="eyebrow">
                <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                Begin your library
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
                Your books are waiting
                <br />
                to <span className="text-gradient">talk back.</span>
              </h2>
              <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                Upload a PDF and meet the companion hidden inside every page.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                {!isLoaded ? (
                  <span className="btn-primary pointer-events-none opacity-70">
                    Loading…
                  </span>
                ) : isSignedIn ? (
                  <Link href="/library" className="btn-primary group">
                    Open Your Library
                    <span className="btn-arrow">
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </Link>
                ) : (
                  <SignInButton mode="modal" fallbackRedirectUrl="/library">
                    <button className="btn-primary group">
                      Start Listening Free
                      <span className="btn-arrow">
                        <ArrowRight className="size-4" strokeWidth={1.75} />
                      </span>
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
