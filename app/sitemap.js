import { ARTICLES } from "@/lib/articles";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/journal",
    "/practice",
    "/about",
    "/connect",
    "/privacy",
    "/terms",
  ];
  const journalSlugs = Object.keys(ARTICLES);

  return [
    ...staticRoutes.map((route) => ({
      url: `https://ninahealthy.com${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : 0.8,
    })),
    ...journalSlugs.map((slug) => ({
      url: `https://ninahealthy.com/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
