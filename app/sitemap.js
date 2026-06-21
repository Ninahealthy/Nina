import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/journal",
    "/start-here",
    "/practice",
    "/listen",
    "/manifesto",
    "/about",
    "/connect",
    "/search",
    "/privacy",
    "/terms",
  ];
  const journalSlugs = Object.keys(ARTICLES);

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route}`,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : route === "/privacy" || route === "/terms" ? 0.1 : 0.8,
    })),
    ...journalSlugs.map((slug) => ({
      url: `${SITE.url}/journal/${slug}`,
      lastModified: new Date(ARTICLES[slug].dateModified || ARTICLES[slug].dateISO),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
