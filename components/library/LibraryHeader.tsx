"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const LibraryHeader = () => {
  return (
    <motion.section
      className="rounded-2xl border border-hairline bg-paper-deep/40"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
    >
      <div className="relative overflow-hidden px-6 py-12 sm:px-10 md:px-12 md:py-14">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Library
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
              Your books
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Upload PDFs and open a voice session for any title. Search below to
              find what you need.
            </p>
          </div>
          <Link href="/books/new" className="btn-primary group w-fit shrink-0">
            Add new book
            <span className="btn-arrow">
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LibraryHeader;
