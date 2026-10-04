import Image from "next/image";

import { footer, links, org } from "@/content/site";

import { SocialIcon } from "./SocialIcon";

/**
 * A slim footer, shared by every page. One row on desktop (logo and
 * description, contact, social icons) and a short stack on phones, with the
 * copyright on a single line beneath. Social links are icons everywhere; each
 * carries a text label for screen readers and a 44px touch target.
 */
export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="px-page pt-8 pb-6 nav:pt-14 nav:pb-8">
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>

      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 nav:flex nav:justify-between nav:gap-12">
        <div className="order-1 flex items-center gap-4 nav:order-none nav:max-w-[460px]">
          <Image
            src="/images/logo.png"
            alt={org.name}
            width={355}
            height={192}
            className="h-11 w-auto shrink-0"
          />
          <p className="hidden text-[13px] leading-[1.55] text-body nav:block">{footer.body}</p>
        </div>

        <address className="order-3 col-span-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] not-italic nav:order-none nav:flex-col nav:items-end nav:gap-y-1">
          <a href={`mailto:${org.email}`} className="text-ink hover:text-green">
            {org.email}
          </a>
          <a href={`tel:${org.tel}`} className="text-ink hover:text-green">
            {org.telDisplay}
          </a>
        </address>

        <nav aria-label="Social media" className="order-2 -mr-2.5 flex nav:order-none nav:mr-0">
          {links.socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="me noopener"
              aria-label={`${org.name} on ${s.name}`}
              title={s.name}
              className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-[rgba(30,122,44,0.1)] hover:text-green focus-visible:ring-2 focus-visible:ring-green"
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
        </nav>
      </div>

      {/* The description is kept for phones too, as one short line of small
          type, so the text search engines read does not depend on screen size. */}
      <p className="mt-4 text-[12px] leading-[1.5] text-body nav:hidden">{footer.body}</p>

      <p className="mt-4 border-t border-hairline pt-4 text-[12px] text-body nav:mt-8 nav:pt-5 nav:text-[13px]">
        {footer.copyright}
      </p>
    </footer>
  );
}
