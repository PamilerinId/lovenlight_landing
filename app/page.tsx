import type { ReactNode } from "react";

import { Ask } from "@/components/site/Ask";
import { Opportunities, PastEvents } from "@/components/site/Events";
import { Hero } from "@/components/site/Hero";
import { News } from "@/components/site/News";
import { People } from "@/components/site/People";
import { Programmes } from "@/components/site/Programmes";
import { Reach } from "@/components/site/Reach";
import { Story } from "@/components/site/Story";
import { SectionRule } from "@/components/site/primitives";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo/config";
import { JsonLd, pageGraph } from "@/lib/seo/jsonld";

/**
 * Below-the-fold chapters skip layout and paint until the reader nears them
 * (content-visibility), which is most of the page's first-load work on phones.
 */
function Deferred({ children }: { children: ReactNode }) {
  return <div className="defer-render">{children}</div>;
}

/**
 * The home page tells the foundation's story in eight chapters, in an order
 * that earns the ask: who we are, why, how far it has reached, how, who does
 * it, what has been done, what comes next, what others say, and finally the
 * reader's part.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/", name: SITE_TITLE, description: SITE_DESCRIPTION })} />
      <Hero />
      <Story />
      <Deferred>
        <SectionRule />
        <Reach />
      </Deferred>
      <Deferred>
        <SectionRule />
        <Programmes />
      </Deferred>
      <Deferred>
        <SectionRule />
        <People />
      </Deferred>
      <Deferred>
        <SectionRule />
        <PastEvents />
      </Deferred>
      <Deferred>
        <SectionRule />
        <Opportunities />
      </Deferred>
      <Deferred>
        <SectionRule />
        <News />
      </Deferred>
      <Deferred>
        <SectionRule />
        <Ask />
        <SectionRule />
      </Deferred>
    </>
  );
}
