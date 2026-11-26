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
          className="border-t border-hairline pt-14 md:pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        >
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="eyebrow">Get started</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink md:text-5xl">
              Put a voice to
              <br />
              your next read.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Upload a PDF and start a conversation in minutes.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              {!isLoaded ? (
                <span className="btn-primary pointer-events-none opacity-70">
                  Loading…
                </span>
              ) : isSignedIn ? (
                <Link href="/library" className="btn-primary group">
                  Open your library
                  <span className="btn-arrow">
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </span>
                </Link>
              ) : (
                <SignInButton mode="modal" fallbackRedirectUrl="/library">
                  <button className="btn-primary group">
                    Start listening free
                    <span className="btn-arrow">
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
