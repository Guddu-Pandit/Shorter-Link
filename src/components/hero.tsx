import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-[69.375rem] flex-col-reverse items-center gap-14 px-6 pb-24 pt-10 md:flex-row md:items-center md:gap-16 md:px-0 md:pb-32 md:pt-20">
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-[2.5rem] font-bold leading-[1.15] tracking-tight text-shortly-dark-violet md:text-[4.5rem] md:leading-[1.1]">
          More than just shorter links
        </h1>
        <p className="mt-6 max-w-[32rem] text-lg font-medium leading-relaxed text-shortly-grayish-violet md:text-xl">
          Build your brand&apos;s recognition and get detailed insights on how
          your links are performing.
        </p>
        <Link
          href="#shorten"
          className="mt-8 inline-block rounded-full bg-shortly-cyan px-9 py-4 text-lg font-bold text-white transition-colors hover:bg-shortly-cyan-hover"
        >
          Get Started
        </Link>
      </div>

      <div className="relative flex flex-1 justify-center md:justify-end">
        <Image
          src="/illustration-working.svg"
          alt="Person working at a desk"
          width={733}
          height={482}
          priority
          className="w-full max-w-[35rem]"
        />
      </div>
    </section>
  );
}
