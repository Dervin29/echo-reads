import Link from "next/link";
import { Show } from "@clerk/nextjs";

const exploreLinks = [{ label: "Pricing", href: "/subscriptions" }];

const gettingStartedLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-paper-soft">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-brand/6 blur-3xl" />

      <div className="wrapper relative py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-white/[0.04] font-display text-sm font-semibold tracking-tight text-ink">
                ER
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-ink">
                Echo Reads
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-ink-soft">
              Convert your books into interactive AI conversations. Listen,
              learn, and discuss your favorite reads out loud.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              Explore
            </h3>
            <div className="flex flex-col gap-2.5">
              <Show when="signed-in">
                <Link
                  href="/library"
                  className="w-fit text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                >
                  Library
                </Link>
              </Show>
              {exploreLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-fit text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              Getting started
            </h3>
            <div className="flex flex-col gap-2.5">
              {gettingStartedLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-fit text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-sm text-ink-mute sm:flex-row">
          <p>© {new Date().getFullYear()} Echo Reads. All rights reserved.</p>
          <p className="text-gradient font-medium">
            Made for readers who like to talk.
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[14vw] font-semibold leading-none tracking-[-0.04em] text-white/[0.025]"
      >
        Echo Reads
      </div>
    </footer>
  );
};

export default Footer;
