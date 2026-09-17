import { links, org, programmes, sdgs } from "@/content/site";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./config";

/**
 * schema.org graph for the single page: the organisation (NGO is the
 * schema.org subtype of Organization), the website and the page itself.
 *
 * No Event entities on purpose: the events have no venue and one lacks a
 * date, and the handoff forbids inventing facts. Add them when supplied.
 */
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#org`;
  const siteId = `${SITE_URL}/#website`;
  const pageId = `${SITE_URL}/#webpage`;
  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": orgId,
        name: org.legalName,
        alternateName: [...org.alternateNames],
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
        image: ogImage,
        description: org.description,
        slogan: org.tagline,
        email: org.email,
        telephone: org.tel,
        areaServed: org.countries.map((name) => ({ "@type": "Country", name })),
        sameAs: links.socials.map((s) => s.href),
        knowsAbout: [
          ...programmes.items.map((p) => p.title),
          ...sdgs.map((g) => `SDG ${g.id}: ${g.title}`),
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${SITE_URL}/`,
        name: org.name,
        publisher: { "@id": orgId },
        inLanguage: "en-NG",
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: `${SITE_URL}/`,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
        inLanguage: "en-NG",
      },
    ],
  };
}

/**
 * Serialised for a <script type="application/ld+json">. `<` is escaped so the
 * payload can never terminate the script element.
 */
export function jsonLdString() {
  return JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
}
