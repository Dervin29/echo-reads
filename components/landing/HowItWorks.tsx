"use client";

import { motion } from "framer-motion";
import { FileUp, Mic, Sparkles } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const steps = [
  {
    icon: FileUp,
    title: "Upload PDF",
    description:
      "Add your book file — up to 50 MB. Pick a cover or let us generate one from the first page automatically.",
    iconBg: "bg-brand/10 text-brand",
    glow: "bg-brand/12",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description:
      "We read, index, and structure your book so the AI can find and discuss any passage on request.",
    iconBg: "bg-gold/10 text-gold",
    glow: "bg-gold/10",
  },
  {
    icon: Mic,
    title: "Voice Chat",
    description:
      "Hold a natural conversation with your book. Listen, ask questions, and explore ideas out loud.",
    iconBg: "bg-sage/10 text-sage",
    glow: "bg-sage/10",
  },
];

const waveHeights = [14, 26, 40, 22, 34, 48, 30, 18, 38, 24, 44, 16, 30];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-28 border-t border-hairline bg-paper py-20 md:py-28"
    >
      <div className="wrapper">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-5 text-3xl md:text-[40px]">
            Three steps to a talking library
          </h2>
          <p className="subtitle mt-4">
            Upload a book, let Echo prepare it, then start a voice session.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          >
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-hairline bg-paper-deep/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <FileUp className="size-5" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-medium tabular-nums text-ink-mute">01</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {steps[0].title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-ink-soft md:text-base">
                  {steps[0].description}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-3 rounded-xl border border-dashed border-white/12 bg-white/[0.02] px-4 py-3">
                <FileUp className="size-4 shrink-0 text-ink-mute" strokeWidth={1.5} />
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">rich-dad-poor-dad.pdf</p>
                  <p className="text-xs text-ink-mute">4.2 MB</p>
                </div>
                <span className="ml-auto text-xs font-medium text-brand">Ready</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_PREMIUM }}
          >
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-hairline bg-paper-deep/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-ink-soft">
                  <Sparkles className="size-5" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-medium tabular-nums text-ink-mute">02</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {steps[1].title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                  {steps[1].description}
                </p>
              </div>
              <ul className="mt-auto space-y-2.5 text-sm text-ink-soft">
                {["Extracting text", "Indexing passages", "Preparing your voice"].map((label) => (
                  <li key={label} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand/80" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_PREMIUM }}
          >
            <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-paper-deep/60 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex max-w-xl flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-ink-soft">
                    <Mic className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-medium tabular-nums text-ink-mute">03</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {steps[2].title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                    {steps[2].description}
                  </p>
                </div>
              </div>
              <div className="flex h-14 items-end gap-[2px] rounded-xl bg-white/[0.03] px-4 py-3 shadow-[inset_0_0_0_1px_var(--hairline)]">
                {waveHeights.map((height, index) => (
                  <span
                    key={index}
                    className="wave-bar"
                    style={{ height: Math.max(6, Math.round(height * 0.4)), animationDelay: `${index * 0.08}s` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
