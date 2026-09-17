import type { NextConfig } from "next";

/**
 * Love & Light Foundation landing page. One fully static route, no backend.
 *
 * headers() is applied by the Vercel/Node server. If the site is ever moved to
 * a plain static host (output: "export"), these headers must be configured on
 * that host instead.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      // Vercel preview deployments are publicly reachable; keep them out of
      // search indexes so the future production domain is the only copy.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\.vercel\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
