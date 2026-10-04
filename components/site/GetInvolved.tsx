import { linkProps } from "@/lib/links";
import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { involved, links, partner } from "@/content/site";

import { Eyebrow } from "./primitives";
import { CheckIcon } from "./ProgrammeIcon";

/**
 * The Friends of Love & Light logo, supplied by the client. It comes on a
 * white background with white lettering inside it, so it sits on a white chip
 * rather than being cut out. The label beside it says the same words, so the
 * image itself is decorative.
 */
export function FriendsLogo() {
  return (
    <span className="inline-flex shrink-0 rounded-xl bg-white p-1.5 nav:p-2">
      <Image
        src="/images/friends-logo.webp"
        alt=""
        width={480}
        height={343}
        unoptimized
        className="h-[52px] w-auto nav:h-[60px]"
      />
    </span>
  );
}

/**
 * The full set of ways to help, in the client's order of priority: Friends
 * first as a wide green panel, then Partnership and Volunteer side by side.
 * Used on /get-involved; the home page closes on a condensed version (Ask).
 *
 * No photographs on purpose: this is where money is asked for, so it must
 * never appear to be fronted by the patrons.
 */
export function GetInvolvedPanels({ heading: H = "h2" }: { heading?: "h2" | "h3" }) {
  const { friends, volunteer } = involved;

  return (
    <div className="relative flex flex-col gap-4 nav:gap-5">
      {/* 1. Friends of Love & Light — the priority, full width */}
      <article
        id="friends"
        data-reveal
        className="glass-panel-strong flex scroll-mt-6 flex-col rounded-panel p-6 nav:p-[clamp(28px,3.3vw,48px)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FriendsLogo />
            <Eyebrow className="text-white/90">{friends.label}</Eyebrow>
          </div>
          <span className="rounded-full border border-white/50 px-3 py-1.5 text-[13px] font-semibold text-white">
            {friends.badge}
          </span>
        </div>
        <H className="mt-5 max-w-[640px] text-[clamp(26px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
          {friends.heading}
        </H>
        <div className="mt-5 grid gap-x-12 gap-y-6 nav:mt-6 nav:grid-cols-2">
          <p className="text-[15px] leading-[1.7] text-white/90 nav:text-base">{friends.body}</p>
          <ul className="flex flex-col gap-3">
            {friends.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[15px] font-medium text-white">
                <CheckIcon />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-[760px] text-[15px] leading-[1.6] text-white/90">
          {friends.closing}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 nav:mt-9">
          <Button asChild variant="inverse" size="primary">
            <a href={links.friend} {...linkProps(links.friend)}>
              {friends.cta}
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="secondary"
            className="border-white/60 bg-transparent text-white hover:bg-white hover:text-green"
          >
            <a href={links.donate} {...linkProps(links.donate)}>Donate now</a>
          </Button>
        </div>
      </article>

      {/* 2. Partnership  3. Volunteer */}
      <div className="grid grid-cols-1 gap-4 nav:grid-cols-2 nav:gap-5">
        <article
          id="partner"
          data-reveal
          className="glass flex scroll-mt-6 flex-col rounded-panel p-6 nav:p-[clamp(28px,3.3vw,48px)]"
        >
          <Eyebrow>Partnership</Eyebrow>
          <H className="mt-4 text-[clamp(26px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-ink nav:mt-5">
            {partner.heading}
          </H>
          <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-body nav:mt-6 nav:text-base">
            {partner.body}
          </p>
          <div className="mt-7 nav:mt-9">
            <Button asChild variant="secondary" size="secondary">
              <a href={links.partner} {...linkProps(links.partner)}>{partner.cta}</a>
            </Button>
          </div>
        </article>

        <article
          id="volunteer"
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
          className="glass flex scroll-mt-6 flex-col rounded-panel p-6 nav:p-[clamp(28px,3.3vw,48px)]"
        >
          <Eyebrow>{volunteer.label}</Eyebrow>
          <H className="mt-4 text-[clamp(26px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-ink nav:mt-5">
            {volunteer.heading}
          </H>
          <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-body nav:mt-6 nav:text-base">
            {volunteer.body}
          </p>
          <div className="mt-7 nav:mt-9">
            <Button asChild variant="secondary" size="secondary">
              <a href={links.volunteer} {...linkProps(links.volunteer)}>
                {volunteer.cta}
              </a>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
