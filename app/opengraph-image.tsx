import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero, org } from "@/content/site";
import { SITE_TITLE } from "@/lib/seo/config";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, rendered once at build time. Satori needs a static
 * font file (WOFF/TTF), so Manrope Medium is committed under assets/fonts.
 */
export default async function OpenGraphImage() {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Manrope-Medium.woff")),
    readFile(join(process.cwd(), "assets/images/logo-og.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FCFBF0",
          color: "#111411",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -260,
            width: 760,
            height: 760,
            borderRadius: 380,
            background:
              "radial-gradient(circle, rgba(255,236,60,0.28) 0%, rgba(255,236,60,0) 62%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" height={112} style={{ height: 112, width: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              letterSpacing: "0.08em",
              color: "#1E7A2C",
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#1E7A2C" }} />
            {hero.eyebrow}
          </div>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: 1000 }}>
            {org.tagline}
          </div>
          <div style={{ fontSize: 28, color: "#5B625B" }}>{org.legalName}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Manrope", data: font, weight: 500, style: "normal" }],
    }
  );
}
