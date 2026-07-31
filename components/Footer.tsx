import Link from "next/link";
import { Show } from "@clerk/nextjs";

const exploreLinks = [{ label: "Pricing", href: "/subscriptions" }];

const gettingStartedLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
];

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[#f3e4c7]">
      <div className="wrapper py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-xl font-semibold text-black">
                Echo Reads
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#3d485e]">
              Convert your books into interactive AI conversations. Listen,
              learn, and discuss your favorite reads.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#212a3b]">
              Explore
            </h3>
            <div className="flex flex-col gap-2.5">
              <Show when="signed-in">
                <Link
                  href="/library"
                  className="text-sm font-medium text-[#3d485e] transition hover:text-[#212a3b]"
                >
                  Library
                </Link>
              </Show>
              {exploreLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium text-[#3d485e] transition hover:text-[#212a3b]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#212a3b]">
              Getting started
            </h3>
            <div className="flex flex-col gap-2.5">
              {gettingStartedLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium text-[#3d485e] transition hover:text-[#212a3b]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 text-sm text-[#3d485e] sm:flex-row">
          <p>© {new Date().getFullYear()} Echo Reads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
