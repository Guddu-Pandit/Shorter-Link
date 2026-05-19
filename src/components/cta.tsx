import Link from "next/link";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-shortly-dark-violet bg-[url('/bg-boost-desktop.svg')] bg-cover bg-center px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[69.375rem] text-center">
        <h2 className="text-[1.75rem] font-bold text-white md:text-[2.5rem]">
          Boost your links today
        </h2>
        <Link
          href="#shorten"
          className="mt-6 inline-block rounded-full bg-shortly-cyan px-9 py-4 text-lg font-bold text-white transition-colors hover:bg-shortly-cyan-hover"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
