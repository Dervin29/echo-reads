"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogOut } from "lucide-react";

import {
  Show,
  SignInButton,
  useClerk,
  UserButton,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import ConfirmDialog from "./ConfirmDialog";

const signedOutNavItems = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/subscriptions" },
];

const signedInNavItems = [
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/subscriptions" },
];

const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];

const Navbar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePathname, setActivePathname] = useState(pathname);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  if (pathname !== activePathname) {
    setActivePathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-5">
        <div className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-full bg-cream/75 py-2 pl-5 pr-2 shadow-[inset_0_0_0_1px_rgba(34,27,17,0.08),0_12px_36px_-16px_rgba(34,27,17,0.28)] backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-b from-brand-hover to-brand font-serif text-lg font-semibold text-brand-ink shadow-[0_6px_16px_-6px_rgba(90,58,34,0.6)]">
              E
            </span>
            <span className="logo-text">Echo Reads</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Show when="signed-out">
              {signedOutNavItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "relative text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-brand",
                    isActive(href) &&
                      "text-brand after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-brand",
                  )}
                >
                  {label}
                </Link>
              ))}
            </Show>

            <Show when="signed-in">
              {signedInNavItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "relative text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-brand",
                    isActive(href) &&
                      "text-brand after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-brand",
                  )}
                >
                  {label}
                </Link>
              ))}
            </Show>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 lg:flex">
              <Show when="signed-out">
                <SignInButton mode="modal" fallbackRedirectUrl="/library">
                  <button className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-b from-brand-hover to-brand px-5 py-2.5 text-sm font-semibold text-brand-ink transition-all duration-500 ease-premium hover:-translate-y-px active:scale-[0.97]">
                    Sign In
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand-ink/15 transition-transform duration-500 ease-premium group-hover:translate-x-0.5">
                      <ArrowRight className="size-3" strokeWidth={2} />
                    </span>
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
                <button
                  onClick={() => setIsSignOutOpen(true)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full bg-paper-soft px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-brand"
                >
                  <LogOut className="size-4" strokeWidth={1.5} />
                  <span className="hidden xl:inline">Sign out</span>
                </button>
              </Show>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-paper-soft transition-colors duration-300 hover:bg-paper-deep lg:hidden"
            >
              <span className="relative flex size-5 flex-col items-center justify-center gap-[5px]">
                <span
                  className={cn(
                    "h-[1.5px] w-5 rounded-full bg-ink transition-all duration-500 ease-premium",
                    isMenuOpen && "translate-y-[3.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-[1.5px] w-5 rounded-full bg-ink transition-all duration-500 ease-premium",
                    isMenuOpen && "-translate-y-[3.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-paper pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <div className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-10 size-96 rounded-full bg-gold/10 blur-3xl" />

            <div className="wrapper flex flex-1 flex-col justify-center gap-1">
              <Show when="signed-out">
                {signedOutNavItems.map(({ label, href }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12 + index * 0.08,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="font-serif text-sm text-ink-mute">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-4xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand sm:text-5xl">
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </Show>

              <Show when="signed-in">
                {signedInNavItems.map(({ label, href }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12 + index * 0.08,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="font-serif text-sm text-ink-mute">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-4xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand sm:text-5xl">
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </Show>

              <motion.div
                className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_PREMIUM }}
              >
                <Show when="signed-out">
                  <SignInButton mode="modal" fallbackRedirectUrl="/library">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full cursor-pointer rounded-full bg-gradient-to-b from-brand-hover to-brand px-6 py-4 text-base font-semibold text-brand-ink shadow-[0_12px_28px_-12px_rgba(90,58,34,0.6)] transition-transform duration-300 active:scale-[0.98]"
                    >
                      Get Started Free
                    </button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center justify-between rounded-full bg-cream px-5 py-3 shadow-[inset_0_0_0_1px_var(--hairline)]">
                    <UserButton />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSignOutOpen(true);
                      }}
                      className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-brand"
                    >
                      <LogOut className="size-4" strokeWidth={1.5} />
                      Sign out
                    </button>
                  </div>
                </Show>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={isSignOutOpen}
        onOpenChange={setIsSignOutOpen}
        onConfirm={() => signOut()}
        title="Sign out?"
        description="You will need to sign in again to access your library and books."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        destructive
      />
    </>
  );
};

export default Navbar;
