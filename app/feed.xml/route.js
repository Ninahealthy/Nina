import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";
import { escapeHtml } from "@/lib/escapeHtml";

/**
 * Full RSS 2.0 feed for all journal articles.
 * Includes content:encoded with full article body for AI crawler consumption.
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

      /* Build full article body as HTML for content:encoded */
      const bodyHtml = entry.content
        .map((block) => {
          if (block.type === "paragraph") return `<p>${escapeHtml(block.text)}</p>`;
          if (block.type === "subheading") return `<h2>${escapeHtml(block.text)}</h2>`;
          if (block.type === "quote") return `<blockquote><p>${escapeHtml(block.text)}</p></blockquote>`;
          if (block.type === "list") return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
          return "";
        })
        .filter(Boolean)
        .join("\n");

      return `    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${bodyHtml}]]></content:encoded>
      <category>${entry.category}</category>
      <pubDate>${new Date(entry.dateISO).toUTCString()}</pubDate>
      <dc:creator>${SITE.author.name}</dc:creator>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
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
