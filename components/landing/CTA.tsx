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
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-hover to-brand px-6 py-16 shadow-[0_40px_80px_-40px_rgba(90,58,34,0.6)] md:px-16 md:py-24"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-ink/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-gold/20 blur-3xl" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-ink/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-ink">
              Begin your library
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-ink md:text-6xl">
              Your books are waiting
              <br />
              to <em className="italic">talk back.</em>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-brand-ink/80 md:text-lg">
              Upload a PDF and meet the companion hidden inside every page.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {!isLoaded ? (
                <span className="inline-flex cursor-default items-center gap-2 rounded-full bg-brand-ink px-8 py-4 text-base font-semibold text-brand opacity-70">
                  Loading…
                </span>
              ) : isSignedIn ? (
                <Link
                  href="/library"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-ink px-8 py-4 text-base font-semibold text-brand transition-all duration-500 ease-premium hover:-translate-y-px active:scale-[0.97]"
                >
                  Open Your Library
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </span>
                </Link>
              ) : (
                <SignInButton mode="modal" fallbackRedirectUrl="/library">
                  <button className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-brand-ink px-8 py-4 text-base font-semibold text-brand transition-all duration-500 ease-premium hover:-translate-y-px active:scale-[0.97]">
                    Start Listening Free
                    <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 transition-transform duration-500 ease-premium group-hover:translate-x-1">
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
