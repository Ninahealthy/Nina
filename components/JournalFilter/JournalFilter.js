"use client";
import { useState, useMemo } from "react";
import Card from "../Card/Card";
import styles from "./JournalFilter.module.css";

/**
 * Derive unique categories from the entries passed in.
 */
function deriveCategories(entries) {
  const set = new Set();
  for (const entry of entries) {
    if (entry.category) set.add(entry.category);
  }
  return ["All", ...Array.from(set).sort()];
}

export default function JournalFilter({ entries }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const categories = useMemo(() => deriveCategories(entries), [entries]);

  const filteredEntries = useMemo(() => {
    let result =
      activeCategory === "All"
        ? [...entries]
        : entries.filter((entry) => entry.category === activeCategory);

    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
    } else {
      result.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    }
    return result;
  }, [entries, activeCategory, sortOrder]);

  return (
    <>
      <section className={styles.filters} aria-label="Filter journal entries">
        <div
          className={styles.filterTabs}
          role="group"
          aria-label="Categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterTab} ${
                activeCategory === category ? styles.filterTabActive : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.sortControls} role="group" aria-label="Sort order">
          <button
            className={`${styles.sortButton} ${
              sortOrder === "newest" ? styles.sortActive : ""
            }`}
            onClick={() => setSortOrder("newest")}
            aria-pressed={sortOrder === "newest"}
          >
            Newest
          </button>
          <button
            className={`${styles.sortButton} ${
              sortOrder === "oldest" ? styles.sortActive : ""
            }`}
            onClick={() => setSortOrder("oldest")}
            aria-pressed={sortOrder === "oldest"}
          >
            Oldest
          </button>
        </div>
      </section>

      <section className={styles.entries} aria-label="Journal entries">
        <div className={styles.cardGrid}>
          {filteredEntries.map((entry) => (
            <Card
              key={entry.slug}
              image={entry.image}
              title={entry.title}
              excerpt={entry.excerpt}
              href={`/journal/${entry.slug}`}
              readingTime={entry.readingTime}
              date={entry.date}
              dateISO={entry.dateISO}
            />
          ))}
        </div>
      </section>
    </>
  );
}

