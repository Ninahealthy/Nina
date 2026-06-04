"use client";
import { useState } from "react";
import Card from "../Card/Card";
import styles from "./JournalFilter.module.css";

const CATEGORIES = ["All", "Mindfulness", "Intentional Living", "Reflections", "Rituals", "Somatic Awareness"];

export default function JournalFilter({ entries }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEntries = activeCategory === "All"
    ? entries
    : entries.filter((entry) => entry.category === activeCategory);

  return (
    <>
      <section className={styles.filters} aria-label="Filter journal entries">
        <div className={styles.filterTabs} role="group" aria-label="Categories">
          {CATEGORIES.map((category) => (
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
            />
          ))}
        </div>
      </section>
    </>
  );
}
