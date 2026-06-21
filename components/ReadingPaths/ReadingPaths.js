"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./ReadingPaths.module.css";

/**
 * Displays curated reading paths as expandable cards.
 * Each path shows a numbered list of linked articles.
 *
 * @param {{ paths: Array<{ id: string, title: string, subtitle: string, description: string, articles: Array<{ slug: string, title: string, category: string, readingTime: number, image: string }> }> }} props
 */
export default function ReadingPaths({ paths }) {
  const [expandedId, setExpandedId] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.paths}>
      {paths.map((path) => {
        const isExpanded = expandedId === path.id;

        return (
          <div key={path.id} className={styles.pathCard}>
            <button
              className={styles.pathHeader}
              onClick={() => toggle(path.id)}
              aria-expanded={isExpanded}
              aria-controls={`path-${path.id}`}
            >
              <div className={styles.pathInfo}>
                <h2 className={styles.pathTitle}>{path.title}</h2>
                <p className={styles.pathSubtitle}>{path.subtitle}</p>
              </div>
              <div className={styles.pathMeta}>
                <span className={styles.articleCount}>
                  {path.articles.length} essays
                </span>
                <span
                  className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`path-${path.id}`}
                  className={styles.pathBody}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  <p className={styles.pathDescription}>{path.description}</p>
                  <ol className={styles.articleList}>
                    {path.articles.map((article, index) => (
                      <li key={article.slug} className={styles.articleItem}>
                        <span className={styles.articleNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className={styles.articleThumb}>
                          <Image
                            src={article.image}
                            alt=""
                            width={64}
                            height={64}
                            style={{
                              objectFit: "cover",
                              clipPath: "var(--clip-path-squircle-10)",
                            }}
                          />
                        </div>
                        <div className={styles.articleInfo}>
                          <Link
                            href={`/journal/${article.slug}`}
                            className={styles.articleLink}
                          >
                            {article.title}
                          </Link>
                          <div className={styles.articleMeta}>
                            <span className={styles.articleCategory}>
                              {article.category}
                            </span>
                            <span className={styles.metaDot} aria-hidden="true">
                              <svg width="3" height="3" viewBox="0 0 3 3">
                                <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                              </svg>
                            </span>
                            <span className={styles.articleTime}>
                              {article.readingTime} min
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
