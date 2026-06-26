/**
 * Derives a deduplicated, grouped bookshelf from all article citations.
 *
 * Groups books by citationMode into four editorial shelves:
 * - agreement: "Books That Shaped How I Think"
 * - evolving-understanding: "Books I Am Still Arguing With"
 * - disagreement: "Books I Respectfully Disagree With"
 * - unresolved-tension: "Books That Left Me Unsettled"
 *
 * Each entry includes the source article slug(s) so the page can
 * link readers to where Nina discusses the work.
 *
 * @module bookshelf
 */

import { ARTICLES } from "@/lib/articles";

/**
 * Shelf metadata: editorial title and description for each citationMode.
 */
export const SHELVES = [
  {
    id: "agreement",
    title: "Books That Shaped How I Think",
    description:
      "These are the books I return to. The ones whose ideas have become so " +
      "woven into the way I see that I sometimes forget where my thinking " +
      "ends and theirs begins. I cite them because they said something I " +
      "recognized as true before I had the language for it.",
  },
  {
    id: "evolving-understanding",
    title: "Books I Am Still Arguing With",
    description:
      "I learned from these books, but I did not accept them whole. Some of " +
      "their ideas I have carried forward; others I have set down. The " +
      "conversation is ongoing, and that is what makes them valuable. A book " +
      "that asks nothing of you teaches you nothing.",
  },
  {
    id: "unresolved-tension",
    title: "Books That Left Me Unsettled",
    description:
      "These books did not resolve cleanly. They opened questions I have " +
      "not been able to close, raised tensions I have not been able to " +
      "smooth. I keep them on the shelf because the unsettled feeling is " +
      "itself a form of learning.",
  },
  {
    id: "disagreement",
    title: "Books I Respectfully Disagree With",
    description:
      "Disagreement is its own kind of debt. These books taught me what I " +
      "do not believe, which is as valuable as learning what I do. I cite " +
      "them honestly because the conversation matters more than the " +
      "agreement.",
  },
];

/**
 * Derives all unique book/work entries from article citations.
 * Returns an array of objects grouped by citationMode.
 *
 * @returns {{ id: string, title: string, description: string, books: Array }[]}
 */
export function getBookshelf() {
  const seen = new Map();

  for (const [slug, article] of Object.entries(ARTICLES)) {
    if (!article.citations || article.citations.length === 0) continue;

    for (const citation of article.citations) {
      const key = `${citation.name}|||${citation.work}`;

      if (!seen.has(key)) {
        seen.set(key, {
          name: citation.name,
          work: citation.work,
          type: citation.type,
          citationMode: citation.citationMode,
          slugs: [slug],
        });
      } else {
        const existing = seen.get(key);
        if (!existing.slugs.includes(slug)) {
          existing.slugs.push(slug);
        }
      }
    }
  }

  const allWorks = [...seen.values()].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return SHELVES.map((shelf) => ({
    ...shelf,
    books: allWorks.filter((w) => w.citationMode === shelf.id),
  }));
}
