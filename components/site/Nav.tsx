import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { nav, org } from "@/content/site";

/**
 * Static top bar, shared by every page. The centre links are always in the
 * HTML (crawlers and screen readers see them) and hidden below the 900px
 * breakpoint with CSS. On phones the bar keeps only the logo and the one
 * action that matters, Get involved.
 */
export function Nav() {
  return (
    <header>
      <nav
        aria-label="Primary"
        className="relative z-[2] flex items-center justify-between gap-4 px-page py-5 nav:py-7"
      >
        <Link href="/" className="flex items-center" aria-label={`${org.name} home`}>
          <Image
            src="/images/logo.png"
            alt={org.name}
            width={355}
            height={192}
            loading="eager"
            className="h-11 w-auto nav:h-[52px]"
          />
        </Link>
        <ul className="hidden items-center gap-9 text-[15px] font-medium nav:flex">
          {nav.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-ink hover:text-green">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild variant="nav" size="nav">
          <Link href={nav.cta.href}>{nav.cta.label}</Link>
        </Button>
      </nav>
    </header>
  );
}
