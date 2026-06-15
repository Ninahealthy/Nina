"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./JournalSearchBar.module.css";

/**
 * Animated search bar embedded in the journal page.
 * Submits queries to /search?q={query} via Next.js router.
 */
export default function JournalSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [query, router]
  );

  const motionDuration = shouldReduceMotion ? 0 : 0.35;

  return (
    <div className={styles.searchWrapper}>
      <motion.form
        className={styles.searchForm}
        role="search"
        aria-label="Search journal articles"
        onSubmit={handleSubmit}
        animate={isFocused ? "focused" : "idle"}
        initial="idle"
        variants={{
          idle: {
            boxShadow: "0 1px 8px rgba(61, 56, 50, 0.04)",
          },
          focused: {
            boxShadow: "0 6px 24px rgba(61, 56, 50, 0.1), 0 1px 6px rgba(192, 122, 86, 0.08)",
          },
        }}
        transition={{
          duration: motionDuration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Search icon */}
        <div className={styles.searchIcon} aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          className={styles.searchInput}
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search journal"
          autoComplete="off"
        />

        {/* Animated accent underline */}
        <motion.div
          className={styles.accentLine}
          aria-hidden="true"
          animate={isFocused ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Submit button: visible when query is non-empty */}
        <motion.button
          type="submit"
          className={styles.submitButton}
          aria-label="Submit search"
          animate={
            query.trim()
              ? { opacity: 1, scale: 1, pointerEvents: "auto" }
              : { opacity: 0, scale: 0.85, pointerEvents: "none" }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.form>
    </div>
  );
}
