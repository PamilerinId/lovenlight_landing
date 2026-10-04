import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/site/Footer";
import { Motion } from "@/components/site/Motion";
import { Nav } from "@/components/site/Nav";
import { JsonLd, orgGraph } from "@/lib/seo/jsonld";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo/config";

import "./globals.css";

// The one typeface on the site. Self-hosted rather than next/font/google:
// that loader downloads the font from Google at build time, and the response
// Google serves Vercel's build machines broke the Turbopack build there while
// building fine locally. A committed file makes the build deterministic.
//
// Manrope is a variable font, so one file carries every weight the design
// uses (400, 500, 600). Only the basic Latin set is shipped: the extended set
// adds accented letters the site does not use, and neither set contains ₦ or
// →, which fall back to the system font exactly as they did before.
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FCFBF0",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. It marks <html> as able to animate, which is the
 * only condition under which reveal targets start hidden (see globals.css),
 * so the page is fully visible without JavaScript.
 */
const motionFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script above adds a class to
    // <html> before React hydrates, which is intended.
    // data-scroll-behavior: in-page links glide, but moving between pages
    // jumps straight to the top instead of gliding up from where you were.
    <html
      lang="en-NG"
      className={manrope.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <JsonLd data={orgGraph()} />
        <div className="relative w-full overflow-x-clip">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ground focus:px-4 focus:py-2 focus:text-green focus:ring-2 focus:ring-green"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <Motion />
      </body>
    </html>
  );
}
