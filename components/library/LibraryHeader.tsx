"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";

const LibraryHeader = () => {
  return (
    <motion.section
      className="library-header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-[#663820]/10 blur-3xl" />
      <div className="library-header-content">
        <div className="library-header-text">
          <p className="library-header-badge">
            <Sparkles className="size-3.5" />
            Your personal bookshelf
          </p>
          <h1 className="library-header-title">Your Library</h1>
          <p className="library-header-description">
            Upload a PDF and chat with your favorite reads through natural,
            AI-powered voice. Ask questions, get summaries, and dive deeper
            into any book — anytime.
          </p>
          <Link href="/books/new" className="btn-primary">
            <Plus className="size-5" />
            Add New Book
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LibraryHeader;
