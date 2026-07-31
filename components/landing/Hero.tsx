"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

const Hero = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden bg-[#f3e4c7] pt-[var(--navbar-height)]">
      <div className="wrapper flex flex-col items-center gap-12 py-16 md:py-24 lg:flex-row lg:gap-8">
        <div className="flex max-w-xl flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <p className="rounded-full border border-[var(--border-medium)] bg-white/60 px-4 py-1.5 text-sm font-medium text-[var(--color-brand)]">
            Turn reading into conversation
          </p>

          <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-[#212a3b] md:text-5xl lg:text-[56px]">
            Transform your books into interactive AI conversations
          </h1>

          <p className="text-lg leading-relaxed text-[#3d485e]">
            Upload a PDF and chat with your favorite reads through natural,
            AI-powered voice. Ask questions, get summaries, and dive deeper
            into any book — anytime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {!isLoaded ? (
              <span className="btn-primary pointer-events-none opacity-70">
                Loading…
              </span>
            ) : isSignedIn ? (
              <Link href="/library" className="btn-primary">
                Open Your Library
              </Link>
            ) : (
              <SignInButton mode="modal" fallbackRedirectUrl="/library">
                <button className="btn-primary">Get Started Free</button>
              </SignInButton>
            )}

            <a href="#how-it-works" className="btn-secondary">
              See How It Works
            </a>
          </div>

          <p className="text-sm text-[#3d485e]">
            Free to start · No credit card required · Works with any PDF
          </p>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books and a globe"
            width={440}
            height={440}
            priority
            className="h-auto w-full max-w-md object-contain lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
