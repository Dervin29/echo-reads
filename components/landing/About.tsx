import { Crown, Mic, Search, ScrollText } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "AI Voice Chat",
    description:
      "Real-time voice conversations with AI using natural, expressive voices.",
  },
  {
    icon: ScrollText,
    title: "Live Transcript",
    description:
      "A streaming transcript keeps every conversation searchable and easy to follow.",
  },
  {
    icon: Search,
    title: "Book Search",
    description:
      "The AI can search your book's content and quote exact passages on demand.",
  },
  {
    icon: Crown,
    title: "Flexible Plans",
    description:
      "Start free and upgrade for more books, longer sessions, and full history.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 bg-[#fff6e5] py-20 md:py-28">
      <div className="wrapper grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand)]">
            About Echo Reads
          </p>
          <h2 className="section-title mt-3">
            More than a chatbot. A reading companion.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#3d485e]">
            Echo Reads turns your books into living conversation partners. It
            remembers what you have read, pulls the right passages when asked,
            and speaks back to you in a voice you choose.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#3d485e]">
            Whether you want to review a chapter before a meeting, quiz yourself
            on a classic, or simply talk through an idea, your library is always
            ready to listen.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-[14px] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft-sm)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#212a3b]">
                {title}
              </h3>
              <p className="text-sm leading-6 text-[#3d485e]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
