import type { Metadata } from "next";

import { GetInvolvedPanels } from "@/components/site/GetInvolved";
import { Glow, SectionHeader, SectionRule, sectionClass } from "@/components/site/primitives";
import { getInvolvedPage, org } from "@/content/site";
import { OG_IMAGE_PATH, SITE_NAME } from "@/lib/seo/config";
import { JsonLd, pageGraph } from "@/lib/seo/jsonld";
import { cn } from "@/lib/utils";

const title = `Get involved | ${org.name}`;

export const metadata: Metadata = {
  title,
  description: getInvolvedPage.description,
  alternates: { canonical: getInvolvedPage.path },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: getInvolvedPage.path,
    siteName: SITE_NAME,
    title,
    description: getInvolvedPage.description,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: getInvolvedPage.description,
    images: [OG_IMAGE_PATH],
  },
};

/**
 * Every way to help, in full: Friends of Love & Light, partnerships and
 * volunteering. The home page ends on a condensed version that links here,
 * so this page can be shared on its own.
 */
export default function GetInvolvedPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: getInvolvedPage.path,
          name: title,
          description: getInvolvedPage.description,
          crumb: "Get involved",
        })}
      />
      <section
        aria-labelledby="get-involved-heading"
        className={cn("relative", sectionClass, "pt-6 nav:pt-12")}
      >
        <Glow className="top-[-80px] right-[-120px]" />
        <SectionHeader
          id="get-involved-heading"
          level={1}
          eyebrow={getInvolvedPage.eyebrow}
          title={getInvolvedPage.heading}
          className="relative"
        />
        <div className="mt-8 nav:mt-14">
          <GetInvolvedPanels heading="h2" />
        </div>
      </section>
      <SectionRule />
    </>
  );
}
