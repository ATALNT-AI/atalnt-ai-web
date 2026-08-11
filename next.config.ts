import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The interactive demo shipped at /demo-app for the first day; keep any
      // shared links working after the rename to /test-drive.
      { source: "/demo-app", destination: "/test-drive", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // The demo bundle is a build artifact. Keep it out of the index so it
        // does not compete with the /demo-app landing page.
        source: "/demo/index.html",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
