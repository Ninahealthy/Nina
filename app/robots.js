import { SITE } from "@/lib/siteConfig";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "Anthropic-ai",
          "Claude-Web",
          "PerplexityBot"
        ],
        allow: "/",
      },
      {
        userAgent: [
          "AhrefsBot",
          "BLEXBot",
          "DotBot",
          "MegaIndex.ru",
          "MJ12bot",
          "PetalBot",
          "SemrushBot",
          "Rogerbot",
          "Exabot",
          "spbot"
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
