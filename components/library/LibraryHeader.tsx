"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const LibraryHeader = () => {
  return (
    <motion.section
      className="bezel"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
    >
      <div className="bezel-core relative overflow-hidden px-6 py-14 sm:px-10 md:px-14 md:py-20">
        <div className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="eyebrow">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Your personal bookshelf
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl">
              Your Library
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Upload a PDF and chat with your favorite reads through natural,
              AI-powered voice. Ask questions, get summaries, and dive deeper
              into any book — anytime.
            </p>
            <Link href="/books/new" className="btn-primary mt-2">
              Add New Book
              <span className="btn-arrow">
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LibraryHeader;
