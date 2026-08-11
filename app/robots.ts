import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The raw bundle is an asset, not a page. /test-drive is the indexable
      // landing page that wraps it. /styleguide is internal.
      disallow: ["/api/", "/demo/index.html", "/styleguide", "/ad"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
