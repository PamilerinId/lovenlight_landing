import Link from "next/link";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { ask, involved, links, partner } from "@/content/site";

import { Eyebrow, Glow, SectionHeader, sectionClass } from "./primitives";
import { FriendsLogo } from "./GetInvolved";

/**
 * Chapter 08 — the close of the story: the reader's part in it.
 *
 * A condensed version of the three ways to help, each with its own direct
 * action, so nobody has to leave the page to act. The full detail lives on
 * /get-involved, linked at the foot. Same order of priority as the client
 * set: Friends, then Partnership, then Volunteer.
 */
export function Ask() {
  const { friends, volunteer } = involved;
  const cardTitle =
    "text-[clamp(22px,2vw,28px)] leading-[1.15] font-medium tracking-[-0.02em]";

  return (
    <section id="involved" aria-labelledby="ask-heading" className={`relative ${sectionClass}`}>
      <Glow className="top-[40px] right-[-120px]" />
      <SectionHeader id="ask-heading" eyebrow={ask.eyebrow} title={ask.heading} className="relative" />

      <div className="relative mt-8 grid gap-4 nav:mt-14 nav:grid-cols-[1.35fr_1fr_1fr] nav:gap-5">
        <article
          data-reveal
          className="glass-panel-strong flex flex-col rounded-panel p-6 nav:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <FriendsLogo />
            <span className="rounded-full border border-white/50 px-3 py-1.5 text-[13px] font-semibold text-white">
              {friends.badge}
            </span>
          </div>
          <Eyebrow className="mt-6 text-white/90">{friends.label}</Eyebrow>
          <h3 className={`mt-3 text-white ${cardTitle}`}>{friends.heading}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-white/90">{friends.closing}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="inverse" size="primary">
              <a href={links.friend} target="_blank" rel="noopener">
                {friends.cta}
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="secondary"
              className="border-white/60 bg-transparent text-white hover:bg-white hover:text-green"
            >
              <a href={links.donate}>Donate now</a>
            </Button>
          </div>
        </article>

        <article
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
          className="glass flex flex-col rounded-panel p-6 nav:p-8"
        >
          <Eyebrow>Partnership</Eyebrow>
          <h3 className={`mt-3 text-ink ${cardTitle}`}>{partner.heading}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-body">{partner.body}</p>
          <div className="mt-6">
            <Button asChild variant="secondary" size="secondary">
              <a href={links.partner}>{partner.cta}</a>
            </Button>
          </div>
        </article>

        <article
          data-reveal
          style={{ "--i": 2 } as CSSProperties}
          className="glass flex flex-col rounded-panel p-6 nav:p-8"
        >
          <Eyebrow>{volunteer.label}</Eyebrow>
          <h3 className={`mt-3 text-ink ${cardTitle}`}>{volunteer.heading}</h3>
          <div className="mt-6 nav:mt-auto nav:pt-6">
            <Button asChild variant="secondary" size="secondary">
              <a href={links.volunteer} target="_blank" rel="noopener">
                {volunteer.cta}
              </a>
            </Button>
          </div>
        </article>
      </div>

      <p data-reveal className="relative mt-8 nav:mt-10">
        <Link
          href={ask.more.href}
          className="text-[15px] font-semibold text-green hover:text-green-hover"
        >
          {ask.more.label}
        </Link>
      </p>
    </section>
  );
}
