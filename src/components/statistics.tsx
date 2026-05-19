import Image from "next/image";

const features = [
  {
    icon: "/icon-brand-recognition.svg",
    title: "Brand Recognition",
    description:
      "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
    offset: "md:-mt-8",
  },
  {
    icon: "/icon-detailed-records.svg",
    title: "Detailed Records",
    description:
      "Gain insights as to who is clicking your links, when and where they're clicking them. Understand your audience and engage them more effectively.",
    offset: "md:mt-8",
  },
  {
    icon: "/icon-fully-customizable.svg",
    title: "Fully Customizable",
    description:
      "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    offset: "md:mt-16",
  },
] as const;

export function Statistics() {
  return (
    <section
      id="features"
      className="bg-shortly-light-grayish-blue px-6 pb-24 pt-32 md:px-0 md:pb-32 md:pt-52"
    >
      <div className="mx-auto max-w-[69.375rem]">
        <div className="mx-auto max-w-[33rem] text-center">
          <h2 className="text-[2rem] font-bold text-shortly-dark-violet md:text-[2.5rem]">
            Advanced Statistics
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed text-shortly-grayish-violet">
            Track how your links are performing across the web with our
            advanced statistics dashboard.
          </p>
        </div>

        <div className="relative mt-20 md:mt-24">
          <div
            className="absolute left-1/2 top-[45%] hidden h-2 w-[calc(100%-8rem)] -translate-x-1/2 bg-shortly-cyan md:block"
            aria-hidden
          />

          <div className="relative grid gap-20 md:grid-cols-3 md:gap-8">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`relative rounded-md bg-white px-8 pb-8 pt-16 text-center md:text-left ${feature.offset}`}
              >
                <div className="absolute -top-10 left-1/2 flex size-20 -translate-x-1/2 items-center justify-center rounded-full bg-shortly-dark-violet md:left-8 md:translate-x-0">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-xl font-bold text-shortly-dark-violet">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base font-medium leading-relaxed text-shortly-grayish-violet">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
