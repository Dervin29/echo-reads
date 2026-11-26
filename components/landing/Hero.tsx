"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const waveHeights = [
  14, 26, 40, 22, 34, 48, 30, 18, 38, 24, 44, 16, 30, 40, 20, 34, 46, 26, 14, 36,
  22, 42, 28, 18,
];

const Hero = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div className="pointer-events-none absolute right-[-120px] top-[8%] size-[420px] rounded-full bg-brand/[0.08] blur-3xl" />

      <div className="wrapper relative grid items-center gap-16 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
        >
          <p className="eyebrow">Voice chat for your PDFs</p>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[68px]">
            Talk to the books
            <br />
            on your shelf.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Upload a PDF, then ask questions out loud. Echo Reads pulls from the
            text and keeps a live transcript as you go.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
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

            <a href="#how-it-works" className="btn-secondary">
              See How It Works
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-mute">
            Free to start · No credit card required · Works with any PDF
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_PREMIUM }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="bezel">
            <div className="bezel-core p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
                    Session
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                    The Great Gatsby
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">Chapter context · live transcript on</p>
                </div>
                <div className="flex h-10 items-end gap-[2px] rounded-xl bg-white/5 px-3 py-2 shadow-[inset_0_0_0_1px_var(--hairline)]">
                  {waveHeights.map((height, index) => (
                    <span
                      key={index}
                      className="wave-bar"
                      style={{ height: Math.max(8, Math.round(height * 0.55)), animationDelay: `${index * 0.07}s` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-semibold text-ink-mute shadow-[inset_0_0_0_1px_var(--hairline)]">
                    You
                  </span>
                  <p className="text-sm leading-6 text-ink">
                    What does the green light mean at the end of the dock?
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-semibold text-brand shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_30%,transparent)]">
                    AI
                  </span>
                  <p className="text-sm leading-6 text-ink-soft">
                    It points to Gatsby&apos;s hope for Daisy and the future he imagines—always close in view, never quite within reach.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 shadow-[inset_0_0_0_1px_var(--hairline)]">
                <p className="text-xs text-ink-mute">Tap the mic in the app to continue</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sage">
                  <span className="size-1.5 rounded-full bg-sage animate-pulse" />
                  Listening
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 hidden items-center gap-2.5 rounded-xl border border-hairline bg-paper-deep/90 px-4 py-3 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md sm:flex">
            <Search className="size-4 text-ink-soft" strokeWidth={1.5} />
            <span className="text-xs text-ink-soft">Answers stay grounded in your PDF</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
