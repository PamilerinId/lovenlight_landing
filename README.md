# Love & Light Foundation — landing page

Public single-page site for The Love and Light Community and Humanitarian
Foundation. Next.js App Router, Tailwind v4, one shadcn Button. Fully static,
no backend: every call to action is an external link.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

- `content/site.ts` — every word, number and link on the page. Edit copy here
  only; the page, metadata, JSON-LD, Open Graph image and `/llms.txt` all read
  from it.
- `components/site/` — one component per section, in page order.
- `app/globals.css` — brand tokens (colours, radii, page padding, glass
  surfaces). Only green and the neutrals exist as colour classes on purpose.
- `design/` — the client handoff. `design/HANDOFF.md` is the spec of record;
  `design/Love & Light Landing.dc.html` is the prototype this page implements.

## Domain

Set `NEXT_PUBLIC_SITE_URL` (no trailing slash) in Vercel or `.env.local`.
Canonical URL, sitemap, robots, Open Graph and JSON-LD all follow from it.

## Photos

The hero photo and the Food Outreach and Global Skills for Youth event photos
are generated from the client originals in `design/assets/photos/` by
`npm run assets` (crop and size rules live in `scripts/optimise-assets.mjs`).
To add or replace one: drop the original into that folder, add or edit its row
in the `PHOTOS` table in the script, run `npm run assets`, then set the
`photo` field for that item in `content/site.ts` to `{ src, alt }`.

Still labelled placeholders until the client supplies them: the School
Renovation photo and its date (`[DATE]`).

## Assets

`npm run assets` regenerates `public/images/logo.png`, `app/icon.png`,
`app/apple-icon.png`, the build-time OG logo and the four animated SDG WebPs
from the originals in `design/assets/`. Only run it when those originals
change.
