"use client";
import { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./page.module.css";

const CATEGORIES = ["All", "Mindfulness", "Intentional Living", "Reflections", "Rituals"];

const ENTRIES = [
  {
    slug: "the-art-of-doing-nothing",
    title: "The Art of Doing Nothing",
    excerpt: "Why rest is not laziness, and how learning to be still changed the way I move through my days.",
    category: "Mindfulness",
    image: "/images/journal-1.png",
  },
  {
    slug: "morning-rituals-that-anchor-me",
    title: "Morning Rituals That Anchor Me",
    excerpt: "A simple sequence of small acts that turns the first hour of the day into something sacred.",
    category: "Rituals",
    image: "/images/journal-2.png",
  },
  {
    slug: "letting-go-of-perfect",
    title: "Letting Go of Perfect",
    excerpt: "Perfectionism kept me busy but never at peace. Here is what happened when I stopped chasing it.",
    category: "Reflections",
    image: "/images/journal-3.png",
  },
  {
    slug: "the-quiet-power-of-a-slow-morning",
    title: "The Quiet Power of a Slow Morning",
    excerpt: "What happens when you stop rushing through the first hours of your day and let them unfold at their own pace.",
    category: "Intentional Living",
    image: "/images/journal-4.png",
  },
  {
    slug: "breathing-through-the-overwhelm",
    title: "Breathing Through the Overwhelm",
    excerpt: "When everything feels like too much, three breaths can change the entire shape of the moment.",
    category: "Mindfulness",
    image: "/images/journal-5.png",
  },
  {
    slug: "seasonal-living-as-practice",
    title: "Seasonal Living as Practice",
    excerpt: "Aligning your rhythms with the natural world is one of the gentlest forms of self-care I know.",
    category: "Rituals",
    image: "/images/journal-6.png",
  },
  {
    slug: "the-weight-of-being-available",
    title: "The Weight of Being Available",
    excerpt: "On the quiet exhaustion of a life with no boundaries between reachable and resting.",
    category: "Intentional Living",
    image: "/images/journal-7.png",
  },
  {
    slug: "what-i-mean-when-i-say-gentle",
    title: "What I Mean When I Say Gentle",
    excerpt: "Gentleness is not weakness. It is the strongest way I know to move through a hard world.",
    category: "Reflections",
    image: "/images/journal-8.png",
  },
  {
    slug: "learning-to-sit-with-discomfort",
    title: "Learning to Sit with Discomfort",
    excerpt: "The urge to fix, flee, or distract is strong. But some feelings just need a witness.",
    category: "Mindfulness",
    image: "/images/journal-9.png",
  },
  {
    slug: "the-myth-of-balance",
    title: "The Myth of Balance",
    excerpt: "What if balance is not a state to achieve but a conversation to keep having with yourself?",
    category: "Intentional Living",
    image: "/images/journal-10.png",
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEntries = activeCategory === "All"
    ? ENTRIES
    : ENTRIES.filter((entry) => entry.category === activeCategory);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Journal</h1>
        <p className={styles.heroSubtitle}>
          Thoughts on mindful living, written from wherever I am in the journey.
        </p>
      </section>

      <section className={styles.filters}>
        <div className={styles.filterTabs}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.filterTab} ${
                activeCategory === category ? styles.filterTabActive : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.entries}>
        <div className={styles.cardGrid}>
          {filteredEntries.map((entry) => (
            <Card
              key={entry.slug}
              image={entry.image}
              title={entry.title}
              excerpt={entry.excerpt}
              href={`/journal/${entry.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
