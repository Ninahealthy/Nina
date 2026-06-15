"use client";
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

/**
 * Inner component that reads search params.
 * Wrapped in Suspense by the parent to satisfy Next.js requirements.
 */
function SearchResultsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  /* Sync input when URL param changes externally */
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
    if (urlQuery) setHasResults(true);
  }, [searchParams]);

  /* Observe when Google CSE injects result nodes */
  useEffect(() => {
    if (!resultsRef.current) return;
    const observer = new MutationObserver(() => {
      const hasContent =
        resultsRef.current &&
        resultsRef.current.querySelector(".gsc-result");
      setHasResults(!!hasContent);
    });
    observer.observe(resultsRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      inputRef.current?.blur();
    },
    [query, router]
  );

  const motionDuration = shouldReduceMotion ? 0 : 0.4;

  return (
    <div className={styles.page}>
      {/* Compact search header */}
      <motion.section
        className={styles.searchHeader}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/journal" className={styles.backLink} aria-label="Back to journal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Journal</span>
        </Link>

        <motion.form
          className={styles.searchForm}
          role="search"
          aria-label="Refine your search"
          onSubmit={handleSubmit}
          animate={isFocused ? "focused" : "idle"}
          initial="idle"
          variants={{
            idle: {
              boxShadow: "0 2px 12px rgba(61, 56, 50, 0.06)",
            },
            focused: {
              boxShadow: "0 8px 32px rgba(61, 56, 50, 0.12), 0 2px 8px rgba(192, 122, 86, 0.1)",
            },
          }}
          transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
        >
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
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
            aria-label="Search query"
            autoComplete="off"
          />

          <motion.div
            className={styles.accentLine}
            aria-hidden="true"
            animate={isFocused ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: motionDuration, ease: [0.16, 1, 0.3, 1] }}
          />

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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Query context label */}
      {initialQuery && (
        <motion.div
          className={styles.queryContext}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.queryLabel}>
            Results for <span className={styles.queryTerm}>{initialQuery}</span>
          </p>
        </motion.div>
      )}

      {/* Google CSE results container */}
      <motion.section
        ref={resultsRef}
        className={styles.resultsSection}
        aria-label="Search results"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDuration, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.resultsContainer}>
          <div className="gcse-searchresults-only" data-queryParameterName="q"></div>
        </div>
      </motion.section>

      {/* Empty state when no query */}
      {!initialQuery && (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionDuration, delay: 0.2 }}
        >
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1" />
              <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <p className={styles.emptyText}>
            Type a query above to search across all journal articles.
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Client wrapper that provides the Suspense boundary
 * required by useSearchParams().
 */
export default function SearchResultsClient() {
  return (
    <Suspense fallback={<div className={styles.page}><div className={styles.loadingState}>Loading search...</div></div>}>
      <SearchResultsInner />
    </Suspense>
  );
}
