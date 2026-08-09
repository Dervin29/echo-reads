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
      className="relative scroll-mt-28 overflow-hidden bg-paper-soft py-24 md:py-36"
    >
      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-brand/6 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -right-32 bottom-20 size-96 rounded-full bg-gold/6 blur-3xl animate-orb [animation-delay:-8s]" />

      <div className="wrapper relative">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-5 text-3xl md:text-[40px]">
            Three steps to a <span className="text-gradient">talking library</span>
          </h2>
          <p className="subtitle mt-4">
            Between you and a living, breathing bookshelf.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {/* Step 1 — large */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          >
            <div className="bezel h-full transition-transform duration-700 ease-premium hover:-translate-y-1.5">
              <div className="bezel-core relative flex h-full flex-col gap-6 overflow-hidden p-7 md:p-9">
                <div className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl ${steps[0].glow}`} />
                <div className="relative flex items-center gap-4">
                  <span className={`flex size-14 items-center justify-center rounded-2xl ${steps[0].iconBg}`}>
                    <FileUp className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm tracking-[0.3em] text-ink-mute">
                    01
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-[28px]">
                    {steps[0].title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-ink-soft md:text-base">
                    {steps[0].description}
                  </p>
                </div>
                <div className="relative mt-auto flex items-center gap-3 rounded-2xl border-2 border-dashed border-white/12 bg-white/2 px-5 py-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/5 shadow-[inset_0_0_0_1px_var(--hairline)]">
                    <FileUp className="size-4 text-brand" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      rich-dad-poor-dad.pdf
                    </p>
                    <p className="text-xs text-ink-mute">4.2 MB · Ready</p>
                  </div>
                  <span className="ml-auto rounded-full bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                    Synced
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2 — narrow */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE_PREMIUM }}
          >
            <div className="bezel h-full transition-transform duration-700 ease-premium hover:-translate-y-1.5">
              <div className="bezel-core relative flex h-full flex-col gap-6 overflow-hidden p-7 md:p-9">
                <div className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl ${steps[1].glow}`} />
                <div className="relative flex items-center justify-between">
                  <span className={`flex size-14 items-center justify-center rounded-2xl ${steps[1].iconBg}`}>
                    <Sparkles className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm tracking-[0.3em] text-ink-mute">
                    02
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-[28px]">
                    {steps[1].title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                    {steps[1].description}
                  </p>
                </div>
                <div className="relative mt-auto flex flex-col gap-2.5">
                  {["Extracting text", "Indexing passages", "Preparing your voice"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 text-xs font-medium text-ink-soft"
                      >
                        <span className="flex size-5 items-center justify-center rounded-full bg-sage/10 text-sage">
                          <span className="size-1.5 rounded-full bg-sage" />
                        </span>
                        {label}
                        {index === 0 && (
                          <span className="ml-auto flex gap-[2px]">
                            <span className="size-1 rounded-full bg-brand animate-pulse" />
                            <span className="size-1 rounded-full bg-brand/60 animate-pulse [animation-delay:150ms]" />
                            <span className="size-1 rounded-full bg-brand/30 animate-pulse [animation-delay:300ms]" />
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 — full width */}
          <motion.div
            className="md:col-span-12"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_PREMIUM }}
          >
            <div className="bezel transition-transform duration-700 ease-premium hover:-translate-y-1.5">
              <div className="bezel-core relative flex flex-col gap-8 overflow-hidden p-7 md:flex-row md:items-center md:justify-between md:p-10">
                <div className={`pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full blur-3xl ${steps[2].glow}`} />
                <div className="relative flex max-w-md flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="relative flex size-14 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                      <span className="absolute inset-0 size-14 rounded-2xl bg-sage/20 animate-ring-pulse" />
                      <Mic className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-sm tracking-[0.3em] text-ink-mute">
                      03
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink md:text-[28px]">
                    {steps[2].title}
                  </h3>
                  <p className="text-sm leading-6 text-ink-soft md:text-base">
                    {steps[2].description}
                  </p>
                </div>

                <div className="relative flex h-20 items-end gap-[3px] rounded-3xl bg-white/5 px-6 py-4 shadow-[inset_0_0_0_1px_var(--hairline)]">
                  {waveHeights.map((height, index) => (
                    <span
                      key={index}
                      className="wave-bar"
                      style={{ height, animationDelay: `${index * 0.08}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
