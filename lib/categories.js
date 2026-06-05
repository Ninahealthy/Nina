import { ARTICLES } from "./articles";

/**
 * Derive unique category list from actual article data.
 * "All" is always first.
 */
function deriveCategories() {
  const set = new Set();
  for (const article of Object.values(ARTICLES)) {
    if (article.category) set.add(article.category);
  }
  return ["All", ...Array.from(set).sort()];
}

export const CATEGORIES = deriveCategories();
