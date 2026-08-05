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
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description:
      "We read, index, and structure your book so the AI can find and discuss any passage on request.",
    iconBg: "bg-gold/15 text-gold",
  },
  {
    icon: Mic,
    title: "Voice Chat",
    description:
      "Hold a natural conversation with your book. Listen, ask questions, and explore ideas out loud.",
    iconBg: "bg-sage/15 text-sage",
  },
];

const waveHeights = [14, 26, 40, 22, 34, 48, 30, 18, 38, 24, 44, 16, 30];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 bg-paper-soft py-24 md:py-36"
    >
      <div className="wrapper">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-5 text-3xl md:text-[40px]">
            Three steps to a talking library
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
            <div className="bezel h-full">
              <div className="bezel-core flex h-full flex-col gap-6 p-7 md:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <FileUp className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-sm tracking-[0.3em] text-ink-mute">
                    01
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink md:text-[28px]">
                    Upload PDF
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-ink-soft md:text-base">
                    {steps[0].description}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-3 rounded-2xl border-2 border-dashed border-ink/15 bg-paper px-5 py-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-cream shadow-[inset_0_0_0_1px_var(--hairline)]">
                    <FileUp className="size-4 text-brand" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      rich-dad-poor-dad.pdf
                    </p>
                    <p className="text-xs text-ink-mute">4.2 MB · Ready</p>
                  </div>
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
            <div className="bezel h-full">
              <div className="bezel-core flex h-full flex-col gap-6 p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Sparkles className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-sm tracking-[0.3em] text-ink-mute">
                    02
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-ink md:text-[28px]">
                    AI Processing
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft md:text-base">
                    {steps[1].description}
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-2.5">
                  {["Extracting text", "Indexing passages", "Preparing your voice"].map(
                    (label, index) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 text-xs font-medium text-ink-soft"
                      >
                        <span className="flex size-5 items-center justify-center rounded-full bg-sage/15 text-sage">
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
            <div className="bezel">
              <div className="bezel-core flex flex-col gap-8 p-7 md:flex-row md:items-center md:justify-between md:p-10">
                <div className="flex max-w-md flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="relative flex size-14 items-center justify-center rounded-full bg-sage/15 text-sage">
                      <span className="absolute inset-0 size-14 rounded-full bg-sage/25 animate-ring-pulse" />
                      <Mic className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-serif text-sm tracking-[0.3em] text-ink-mute">
                      03
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-ink md:text-[28px]">
                    Voice Chat
                  </h3>
                  <p className="text-sm leading-6 text-ink-soft md:text-base">
                    {steps[2].description}
                  </p>
                </div>

                <div className="flex h-20 items-end gap-[3px] rounded-3xl bg-paper px-6 py-4 shadow-[inset_0_0_0_1px_var(--hairline)]">
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
