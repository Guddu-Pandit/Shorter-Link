"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = ["Features", "Pricing", "Resources"] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="mx-auto flex w-full max-w-[69.375rem] items-center justify-between px-6 pt-8 md:px-0 md:pt-14">
        <Link
          href="/"
          className="text-2xl font-bold text-shortly-dark-violet md:text-[2rem]"
        >
          Shortly
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[0.9375rem] font-medium text-shortly-grayish-violet transition-colors hover:text-shortly-cyan"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-[0.9375rem] font-medium text-shortly-grayish-violet transition-colors hover:text-shortly-cyan"
          >
            Login
          </Link>
          <Link
            href="#"
            className="rounded-full bg-shortly-cyan px-6 py-2 text-[0.9375rem] font-bold text-white transition-colors hover:bg-shortly-cyan-hover"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="text-shortly-dark-violet md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 top-[4.5rem] z-50 bg-shortly-dark-violet px-8 py-10 md:hidden">
          <nav className="flex flex-col gap-8 text-center">
            {navLinks.map((label) => (
              <Link
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-lg font-bold text-white"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <hr className="border-shortly-grayish-violet/30" />
            <Link
              href="#"
              className="text-lg font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="#"
              className="rounded-full bg-shortly-cyan px-6 py-3 text-lg font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
