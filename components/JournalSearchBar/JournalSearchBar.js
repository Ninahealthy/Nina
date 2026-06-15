"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./JournalSearchBar.module.css";

/**
 * Animated search bar embedded in the journal page.
 * Submits queries to /search?q={query} via Next.js router.
 * Supports "/" keyboard shortcut to focus.
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

  /* Global "/" shortcut to focus the search bar */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !document.activeElement?.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const motionDuration = shouldReduceMotion ? 0 : 0.35;

  return (
    <motion.form
      className={styles.searchForm}
      role="search"
      aria-label="Search journal articles"
      onSubmit={handleSubmit}
      animate={isFocused ? "focused" : "idle"}
      initial="idle"
      variants={{
        idle: {
          scale: 1,
          boxShadow: "0 2px 12px rgba(61, 56, 50, 0.06)",
        },
        focused: {
          scale: 1.015,
          boxShadow: "0 8px 32px rgba(61, 56, 50, 0.12), 0 2px 8px rgba(192, 122, 86, 0.1)",
        },
      }}
      transition={{
        duration: motionDuration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Search icon */}
      <div className={styles.searchIcon} aria-hidden="true">
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={isFocused ? { scale: 1.1, rotate: -8 } : { scale: 1, rotate: 0 }}
          transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        className={styles.searchInput}
        placeholder="Search articles, topics, reflections..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search journal"
        aria-keyshortcuts="/"
        autoComplete="off"
      />

      {/* Animated accent underline */}
      <motion.div
        className={styles.accentLine}
        aria-hidden="true"
        animate={isFocused ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Keyboard shortcut badge: visible only when idle + empty */}
      <motion.kbd
        className={styles.shortcutBadge}
        aria-hidden="true"
        animate={isFocused || query ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        /
      </motion.kbd>

      {/* Submit button */}
      <motion.button
        type="submit"
        className={styles.submitButton}
        aria-label="Submit search"
        animate={
          query.trim()
            ? { opacity: 1, x: 0, pointerEvents: "auto" }
            : { opacity: 0, x: 8, pointerEvents: "none" }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          width="18"
          height="18"
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
  );
}
