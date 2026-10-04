import {
  events,
  getInvolvedPage,
  impact,
  involved,
  leadership,
  links,
  news,
  org,
  partner,
  people,
  programmes,
  sdgs,
  story,
} from "@/content/site";
import { SITE_URL } from "@/lib/seo/config";

/**
 * /llms.txt — a plain-Markdown summary for AI answer engines, built from the
 * same content module as the page so it can never say something the site
 * does not. Rendered once at build time.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${org.name}`,
    "",
    `> ${org.description}`,
    "",
    `Legal name: ${org.legalName}`,
    `Tagline: ${org.tagline}`,
    `Countries: ${org.countries.join(", ")}`,
    `Website: ${SITE_URL}/`,
    `Ways to get involved: ${SITE_URL}${getInvolvedPage.path}`,
    `Social handle: ${org.handle}`,
    "",
    "## Our story",
    "",
    story.heading,
    "",
    ...story.paragraphs.flatMap((p) => [p, ""]),
    story.closing,
    "",
    "We work towards these UN Sustainable Development Goals:",
    "",
    ...sdgs.map((g) => `- SDG ${g.id}: ${g.title} — ${g.href}`),
    "",
    `## ${people.heading}`,
    "",
    `- ${leadership.founder.role}: ${leadership.founder.name}`,
    `- ${leadership.grandPatron.role}: ${leadership.grandPatron.name}`,
    "",
    `## ${impact.heading}`,
    "",
    ...impact.items.map((i) => `- ${i.value} ${i.label}`),
    "",
    "## What we do",
    "",
    programmes.heading,
    "",
    ...programmes.items.map((p) => `${p.n}. ${p.title}${p.blurb ? `: ${p.blurb}` : ""}`),
    "",
    "## Events",
    "",
    `### ${events.past.heading}`,
    "",
    ...events.past.items.map(
      (e) =>
        `- ${e.title}${e.date ? ` (${e.date})` : ""}${"detail" in e && e.detail ? `: ${e.detail}` : ""}`
    ),
    "",
    `### ${events.current.heading}`,
    "",
    ...events.current.items.map(
      (e) =>
        `- ${e.title}${e.date ? ` (${e.date})` : ""}${"blurb" in e && e.blurb ? `: ${e.blurb}` : ""}`
    ),
    "",
    "## What people say",
    "",
    ...news.reviews.flatMap((r) => [
      // A bare ">" between paragraphs keeps them separate in Markdown.
      ...r.quote.flatMap((p, i) => (i === 0 ? [`> ${p}`] : [">", `> ${p}`])),
      "",
      `— ${r.name}, ${r.role}`,
      "",
    ]),
    `## Get involved (${SITE_URL}${getInvolvedPage.path})`,
    "",
    `### ${involved.volunteer.label}`,
    "",
    involved.volunteer.heading,
    "",
    involved.volunteer.body,
    "",
    `${involved.volunteer.cta}: ${links.volunteer}`,
    "",
    `### ${involved.friends.label} (${involved.friends.badge})`,
    "",
    involved.friends.heading,
    "",
    involved.friends.body,
    "",
    ...involved.friends.perks.map((p) => `- ${p}`),
    "",
    involved.friends.closing,
    "",
    `${involved.friends.cta}: ${links.friend}`,
    `Donate: ${links.donate}`,
    "",
    `## ${partner.heading}`,
    "",
    partner.body,
    "",
    `${partner.cta}: ${links.partner}`,
    "",
    "## Contact",
    "",
    `- Email: ${org.email}`,
    `- Phone: ${org.telDisplay} (${org.tel})`,
    ...links.socials.map((s) => `- ${s.name}: ${s.href}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
