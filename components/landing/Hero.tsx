"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
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
      <div className="pointer-events-none absolute -left-40 top-10 size-[520px] rounded-full bg-gold/10 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -right-40 top-40 size-[560px] rounded-full bg-brand/10 blur-3xl animate-orb [animation-delay:-7s]" />

      <div className="wrapper relative grid items-center gap-16 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
        >
          <p className="eyebrow">
            <span className="size-1.5 rounded-full bg-brand" />
            Turn reading into conversation
          </p>

          <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[72px]">
            Books that listen.
            <br />
            <em className="font-medium italic text-brand">
              Ideas that talk back.
            </em>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Upload a PDF and chat with your favorite reads through natural,
            AI-powered voice. Ask questions, pull exact passages, and explore
            any book — out loud.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {!isLoaded ? (
              <span className="btn-primary pointer-events-none opacity-70">
                Loading…
              </span>
            ) : isSignedIn ? (
              <Link href="/library" className="btn-primary">
                Open Your Library
                <span className="btn-arrow">
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </span>
              </Link>
            ) : (
              <SignInButton mode="modal" fallbackRedirectUrl="/library">
                <button className="btn-primary">
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
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.18, ease: EASE_PREMIUM }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="bezel">
            <div className="bezel-core p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-0 size-10 rounded-full bg-brand/25 animate-ring-pulse" />
                    <span className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-b from-brand-hover to-brand shadow-[0_8px_20px_-6px_rgba(90,58,34,0.6)]">
                      <BookOpen className="size-4 text-brand-ink" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Discussing <em className="italic text-brand">The Great Gatsby</em>
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-ink-mute">
                      <span className="size-1.5 rounded-full bg-sage" />
                      Listening
                    </p>
                  </div>
                </div>

                <div className="flex h-9 items-end gap-[3px] rounded-full bg-paper-soft px-3 py-2">
                  {waveHeights.map((height, index) => (
                    <span
                      key={index}
                      className="wave-bar"
                      style={{ height, animationDelay: `${index * 0.07}s` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <div className="self-end max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-b from-brand-hover to-brand px-5 py-3.5 text-sm font-medium leading-6 text-brand-ink shadow-[0_10px_24px_-10px_rgba(90,58,34,0.5)]">
                  Explain the green light in the novel.
                </div>
                <div className="self-start max-w-[85%] rounded-2xl rounded-bl-md bg-paper-soft px-5 py-3.5 text-sm leading-6 text-ink shadow-[inset_0_0_0_1px_var(--hairline)]">
                  <span className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                    <span className="size-1.5 rounded-full bg-brand" /> Echo
                  </span>
                  It is Gatsby&apos;s longing for a future he can never quite
                  reach — hope held at arm&apos;s length.
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-6 hidden animate-floaty items-center gap-3 rounded-full bg-cream px-5 py-3 shadow-[inset_0_0_0_1px_var(--hairline),0_16px_40px_-16px_rgba(34,27,17,0.35)] sm:flex">
            <span className="flex size-8 items-center justify-center rounded-full bg-sage/15 text-sage">
              <BookOpen className="size-4" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">Any book, any passage</p>
              <p className="text-[11px] text-ink-mute">Searchable in real time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
