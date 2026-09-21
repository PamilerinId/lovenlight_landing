import { Button } from "@/components/ui/button";
import { involved, links, partner } from "@/content/site";

import { Eyebrow, Glow } from "./primitives";
import { CheckIcon } from "./ProgrammeIcon";

/**
 * "Get involved" in the client's stated order of priority: Friends first as a
 * wide green panel, then Partnership and Volunteer side by side beneath it.
 *
 * The closing "Partner with us" band was folded in here, which is why the
 * partnership copy still comes from `partner`.
 *
 * No photographs: the Founder and Grand Patron moved to "Our people" inside
 * Our story, so that this section, which is where the money is asked for,
 * never appears to be fronted by the patrons.
 */
export function GetInvolved() {
  const { friends, volunteer } = involved;

  return (
    <section
      id="involved"
      aria-labelledby="involved-heading"
      className="relative px-page py-[110px]"
    >
      <Glow className="top-[40px] right-[-120px]" />
      <Eyebrow as="p" className="relative">
        {involved.eyebrow}
      </Eyebrow>
      <h2 id="involved-heading" className="sr-only">
        Ways to get involved
      </h2>

      <div className="relative mt-8 flex flex-col gap-5">
        {/* 1. Friends of Love & Light — the priority, full width */}
        <article className="glass-panel-strong flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow className="text-white/85">{friends.label}</Eyebrow>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white">
              {friends.badge}
            </span>
          </div>
          <h3 className="mt-5 max-w-[640px] text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
            {friends.heading}
          </h3>
          <div className="mt-6 grid gap-x-12 gap-y-6 nav:grid-cols-2">
            <p className="text-base leading-[1.7] text-white/90">{friends.body}</p>
            <ul className="flex flex-col gap-3">
              {friends.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-[15px] font-medium text-white"
                >
                  <CheckIcon />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-[760px] text-[15px] leading-[1.6] text-white/85">
            {friends.closing}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="inverse" size="primary">
              <a href={links.friend} target="_blank" rel="noopener">
                {friends.cta}
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <a href={links.donate}>Donate now</a>
            </Button>
          </div>
        </article>

        {/* 2. Partnership  3. Volunteer */}
        <div className="grid grid-cols-1 gap-5 nav:grid-cols-2">
          <article className="glass flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)]">
            <Eyebrow>Partnership</Eyebrow>
            <h3 className="mt-5 text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
              {partner.heading}
            </h3>
            <p className="mt-6 flex-1 text-base leading-[1.7] text-body">{partner.body}</p>
            <div className="mt-9">
              <Button asChild variant="secondary" size="secondary">
                <a href={links.partner}>{partner.cta}</a>
              </Button>
            </div>
          </article>

          <article className="glass flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)]">
            <Eyebrow>{volunteer.label}</Eyebrow>
            <h3 className="mt-5 text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
              {volunteer.heading}
            </h3>
            <p className="mt-6 flex-1 text-base leading-[1.7] text-body">{volunteer.body}</p>
            <div className="mt-9">
              <Button asChild variant="secondary" size="secondary">
                <a href={links.volunteer} target="_blank" rel="noopener">
                  {volunteer.cta}
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
