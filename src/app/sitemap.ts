import type { MetadataRoute } from "next";
import { pages, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    changeFrequency: "monthly",
    priority: p.path === "/" ? 1 : p.priority ?? 0.7,
  }));
}
