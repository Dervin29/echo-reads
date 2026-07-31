"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";

const signedOutNavItems = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/subscriptions" },
];

const signedInNavItems = [
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed z-50 w-full border-b border-[var(--border-subtle)] bg-[#f5f1e8]/95 backdrop-blur">
      <div className="wrapper navbar-height flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-0.5">
          <Image
            src="/assets/logo.png"
            alt="Echo Reads"
            width={42}
            height={26}
            className="h-8 w-auto"
          />

          <span className="logo-text">Echo Reads</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Show when="signed-out">
            {signedOutNavItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "nav-link-base text-black hover:opacity-70",
                  isActive(href) && "nav-link-active",
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
                  "nav-link-base text-black hover:opacity-70",
                  isActive(href) && "nav-link-active",
                )}
              >
                {label}
              </Link>
            ))}
          </Show>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/library">
              <button className="rounded-xl bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hover)]">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
            <SignOutButton>
              <button className="flex items-center gap-1.5 rounded-xl border border-[var(--border-medium)] px-3.5 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-white">
                <LogOut className="size-4" />
                Sign out
              </button>
            </SignOutButton>
          </Show>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex size-11 items-center justify-center rounded-xl text-[var(--text-primary)] transition hover:bg-white lg:hidden"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[#f5f1e8] lg:hidden">
          <div className="wrapper flex flex-col gap-1 py-4">
            <Show when="signed-out">
              {signedOutNavItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--text-primary)] hover:bg-white"
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
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--text-primary)] hover:bg-white"
                >
                  {label}
                </Link>
              ))}
            </Show>

            <div className="mt-3 border-t border-[var(--border-subtle)] pt-4">
              <Show when="signed-out">
                <SignInButton mode="modal" fallbackRedirectUrl="/library">
                  <button className="w-full rounded-xl bg-[var(--color-brand)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hover)]">
                    Sign In
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center justify-between gap-3 px-3">
                  <UserButton />
                  <SignOutButton>
                    <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-white">
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </SignOutButton>
                </div>
              </Show>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
