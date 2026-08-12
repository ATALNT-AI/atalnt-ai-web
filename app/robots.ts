import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /styleguide is internal.
      disallow: ["/api/", "/demo/index.html", "/styleguide", "/ad"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
