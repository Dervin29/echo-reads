"use client";

import { motion } from "framer-motion";
import { Crown, Mic, ScrollText, Search } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const features = [
  {
    icon: Mic,
    title: "AI Voice Chat",
    description:
      "Real-time voice conversations with AI using natural, expressive voices.",
    tilt: "md:rotate-[0.5deg]",
  },
  {
    icon: ScrollText,
    title: "Live Transcript",
    description:
      "A streaming transcript keeps every conversation searchable and easy to follow.",
    tilt: "md:rotate-[-1deg]",
  },
  {
    icon: Search,
    title: "Book Search",
    description:
      "The AI can search your book's content and quote exact passages on demand.",
    tilt: "md:rotate-[1deg]",
  },
  {
    icon: Crown,
    title: "Flexible Plans",
    description:
      "Start free and upgrade for more books, longer sessions, and full history.",
    tilt: "md:rotate-[-0.5deg]",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-28 overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrapper grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          className="lg:sticky lg:top-28"
        >
          <p className="eyebrow">Why Echo Reads</p>
          <h2 className="section-title mt-5 text-3xl md:text-[40px]">
            More than a chatbot.
            <br />
            A reading companion.
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-ink-soft">
            Echo Reads turns your books into living conversation partners. It
            remembers what you have read, pulls the right passages when asked,
            and speaks back to you in a voice you choose.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Whether you want to review a chapter before a meeting, quiz yourself
            on a classic, or simply talk through an idea, your library is always
            ready to listen.
          </p>

          <blockquote className="mt-10 border-l-2 border-brand pl-6">
            <p className="font-serif text-xl italic leading-relaxed text-ink">
              &ldquo;The best way to understand a book is to argue with it —
              out loud.&rdquo;
            </p>
          </blockquote>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          {features.map(({ icon: Icon, title, description, tilt }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: (index % 2) * 0.12,
                ease: EASE_PREMIUM,
              }}
              className={tilt}
            >
              <div className="bezel-sm h-full transition-transform duration-700 ease-premium hover:-translate-y-1.5">
                <div className="bezel-core-sm flex h-full flex-col gap-4 p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-500">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-ink-soft">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
