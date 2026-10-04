import { leadership, links, org, programmes, sdgs } from "@/content/site";
import { OG_IMAGE_PATH, SITE_URL } from "./config";

const orgId = `${SITE_URL}/#org`;
const siteId = `${SITE_URL}/#website`;

/**
 * The organisation and the website. Identical on every page, so the root
 * layout renders it once. NGO is the schema.org subtype of Organization.
 *
 * No Event entities on purpose: the events have no venue and the handoff
 * forbids inventing facts. Add them when supplied.
 */
export function orgGraph() {
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
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        description: org.description,
        slogan: org.tagline,
        email: org.email,
        telephone: org.tel,
        areaServed: org.countries.map((name) => ({ "@type": "Country", name })),
        sameAs: links.socials.map((s) => s.href),
        founder: {
          "@type": "Person",
          name: leadership.founder.name,
          jobTitle: leadership.founder.role,
          image: `${SITE_URL}/images/people-founder.jpg`,
          worksFor: { "@id": orgId },
        },
        // schema.org has no "patron" property; an OrganizationRole carries
        // the title without inventing a closer fit.
        member: {
          "@type": "OrganizationRole",
          roleName: leadership.grandPatron.role,
          member: {
            "@type": "Person",
            name: leadership.grandPatron.name,
            image: `${SITE_URL}/images/people-grand-patron.jpg`,
          },
        },
        knowsAbout: [
          ...programmes.items.map((p) => p.title),
          // Linked to the UN's own page for each goal so the entity is
          // unambiguous to search engines and AI answer engines.
          ...sdgs.map((g) => ({
            "@type": "Thing",
            name: `SDG ${g.id}: ${g.title}`,
            url: g.href,
            sameAs: g.href,
          })),
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
    ],
  };
}

/**
 * One page of the site, with a breadcrumb trail for anything below home.
 * Each page renders its own, so the description always matches the page.
 */
export function pageGraph({
  path,
  name,
  description,
  crumb,
}: {
  path: string;
  name: string;
  description: string;
  /** Label for this page in the breadcrumb. Omit on the home page. */
  crumb?: string;
}) {
  const url = `${SITE_URL}${path}`;
  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE_PATH}` },
      inLanguage: "en-NG",
    },
  ];
  if (crumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: crumb, item: url },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Serialised for a <script type="application/ld+json">. `<` is escaped so the
 * payload can never terminate the script element.
 */
export function toJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(data) }} />
  );
}
