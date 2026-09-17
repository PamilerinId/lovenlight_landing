import Image from "next/image";

import { footer, links, org } from "@/content/site";

export function Footer() {
  return (
    <>
      <footer
        id="contact"
        aria-labelledby="contact-heading"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-12 px-page pt-16 pb-12"
      >
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>
        <div className="flex flex-col items-start gap-5">
          <Image
            src="/images/logo.png"
            alt={org.name}
            width={355}
            height={192}
            className="h-16 w-auto"
          />
          <p className="max-w-[420px] text-[15px] leading-[1.6] text-body">{footer.body}</p>
        </div>
        <address className="flex flex-col gap-3 not-italic">
          <span className="text-xs font-semibold tracking-[0.08em] text-green uppercase">
            {footer.contactLabel}
          </span>
          <a href={`mailto:${org.email}`} className="text-[15px] text-ink hover:text-ink">
            {org.email}
          </a>
          <a href={`tel:${org.tel}`} className="text-[15px] text-ink hover:text-ink">
            {org.telDisplay}
          </a>
        </address>
        <nav aria-label="Social media" className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.08em] text-green uppercase">
            {footer.followLabel}
          </span>
          {links.socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="me noopener"
              className="text-[15px] text-ink hover:text-ink"
            >
              {s.name}
            </a>
          ))}
        </nav>
      </footer>
      <p className="mx-page border-t border-hairline pt-6 pb-10 text-[13px] text-muted">
        {footer.copyright}
      </p>
    </>
  );
}
