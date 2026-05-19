import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ShortenSection } from "@/components/shorten-section";
import { Statistics } from "@/components/statistics";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ShortenSection />
        <Statistics />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
