import Link from "next/link";

const navLinks = ["Features", "Pricing", "Resources"] as const;

export function Header() {
  return (
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
    </header>
  );
}
