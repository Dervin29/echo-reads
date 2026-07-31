import { FileUp, Mic, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Upload PDF",
    description:
      "Add your book file — up to 50 MB. Optionally pick a cover or let us generate one automatically.",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description:
      "We analyze the content and index your book so the AI can find and discuss any passage.",
  },
  {
    icon: Mic,
    title: "Voice Chat",
    description:
      "Hold a natural conversation with your book. Listen, ask questions, and explore ideas out loud.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#f5f1e8] py-20 md:py-28">
      <div className="wrapper">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="section-title">How Echo Reads works</h2>
          <p className="subtitle mt-4">
            Three simple steps between you and a living, talking library.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="relative flex flex-col gap-4 rounded-[14px] bg-white p-7 shadow-[var(--shadow-soft)]"
            >
              <span className="absolute right-5 top-5 font-serif text-4xl font-semibold text-[#f3e4c7]">
                {index + 1}
              </span>

              <div className="flex size-12 items-center justify-center rounded-xl bg-[#f3e4c7] text-[#212a3b]">
                <Icon className="size-6" />
              </div>

              <h3 className="font-serif text-xl font-bold text-[#212a3b]">
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

export default HowItWorks;
