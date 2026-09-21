import { Events } from "@/components/site/Events";
import { Footer } from "@/components/site/Footer";
import { GetInvolved } from "@/components/site/GetInvolved";
import { Hero } from "@/components/site/Hero";
import { ImpactStrip } from "@/components/site/ImpactStrip";
import { Nav } from "@/components/site/Nav";
import { News } from "@/components/site/News";
import { Programmes } from "@/components/site/Programmes";
import { Story } from "@/components/site/Story";
import { SectionRule } from "@/components/site/primitives";

export default function HomePage() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ground focus:px-4 focus:py-2 focus:text-green focus:ring-2 focus:ring-green"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <ImpactStrip />
        <Story />
        <SectionRule />
        <Programmes />
        <SectionRule />
        <Events />
        <SectionRule />
        <GetInvolved />
        <SectionRule />
        <News />
        <SectionRule />
      </main>
      <Footer />
    </div>
  );
}
