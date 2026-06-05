import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

/**
 * Full RSS 2.0 feed for all journal articles.
 * Accessible at /feed.xml
 */
export async function GET() {
  const entries = Object.entries(ARTICLES)
    .map(([slug, article]) => ({ slug, ...article }))
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

  const itemsXml = entries
    .map((entry) => {
      const link = `${SITE.url}/journal/${entry.slug}`;
      const description = entry.lead || "";
      return `    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${description}]]></description>
      <category>${entry.category}</category>
      <pubDate>${new Date(entry.dateISO).toUTCString()}</pubDate>
      <author>${SITE.author.email} (${SITE.author.name})</author>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE.url}/og-default.png</url>
      <title>${SITE.name}</title>
      <link>${SITE.url}</link>
      <width>144</width>
      <height>144</height>
    </image>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
