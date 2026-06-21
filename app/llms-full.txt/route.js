import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";
import { ENTRY_ORDER } from "@/lib/entryOrder";
import { escapeHtml } from "@/lib/escapeHtml";

/**
 * Dynamic llms-full.txt route.
 * Generates a comprehensive plain-text dump of all article content,
 * optimized for LLM consumption and AI search engine indexing.
 */
export async function GET() {
  const orderedSlugs = ENTRY_ORDER.filter((slug) => ARTICLES[slug]);

  const header = `# Nina: Full Content Index
> Generated: ${new Date().toISOString()}
> Total articles: ${orderedSlugs.length}
> Site: ${SITE.url}
> Author: ${SITE.author.name}
> License: All rights reserved. Attribution required for citation.

---
`;

  const articles = orderedSlugs
    .map((slug) => {
      const article = ARTICLES[slug];
      const url = `${SITE.url}/journal/${slug}`;

      const bodyText = article.content
        .map((block) => {
          if (block.type === "paragraph") return block.text;
          if (block.type === "subheading") return `\n## ${block.text}\n`;
          if (block.type === "quote") return `> ${block.text}`;
          if (block.type === "list") return block.items.map((item) => `- ${item}`).join("\n");
          if (block.type === "divider") return "\n---\n";
          return "";
        })
        .filter(Boolean)
        .join("\n\n");

      const citationsText =
        article.citations && article.citations.length > 0
          ? `\nCitations: ${article.citations.map((c) => `${c.name}, "${c.work}" (${c.type})`).join("; ")}`
          : "";

      return `# ${article.title}
URL: ${url}
Date: ${article.dateISO}
Category: ${article.category}
Tags: ${(article.tags || []).join(", ")}${citationsText}

${article.lead}

${bodyText}
`;
    })
    .join("\n---\n\n");

  const fullText = header + articles;

  return new Response(fullText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
