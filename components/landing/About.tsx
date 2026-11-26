"use client";

import { motion } from "framer-motion";
import { Crown, Mic, ScrollText, Search } from "lucide-react";

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const features = [
  {
    icon: Mic,
    title: "Voice conversations",
    description:
      "Talk through chapters in real time with natural AI voices.",
  },
  {
    icon: ScrollText,
    title: "Live transcript",
    description:
      "Follow along as text streams in, so you can review what was said.",
  },
  {
    icon: Search,
    title: "Grounded in your book",
    description:
      "Answers draw from the PDF you uploaded, with room to ask for specific passages.",
  },
  {
    icon: Crown,
    title: "Plans that scale",
    description:
      "Start free, then upgrade when you need more books and longer sessions.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative scroll-mt-28 border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrapper relative grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="lg:sticky lg:top-28"
        >
          <p className="eyebrow">Why Echo Reads</p>
          <h2 className="section-title mt-5 text-3xl md:text-[40px]">
            Built for reading
            <br />
            out loud.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Upload a PDF, pick a voice, and talk through the text. Echo Reads is
            designed for questions, summaries, and revisiting passages without
            scrolling through the whole file.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: EASE_PREMIUM,
              }}
              className="bg-paper p-6 md:p-8"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-hairline bg-white/[0.03] text-ink-soft">
                <Icon className="size-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
