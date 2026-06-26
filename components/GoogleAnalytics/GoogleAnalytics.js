"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-C8757P0MH2";

/**
 * GoogleAnalytics
 *
 * Full GA4 integration with:
 * - Page view tracking (initial load + client-side navigation)
 * - Content grouping by page section
 * - Article metadata (category, slug, reading time)
 * - Scroll-depth tracking (25%, 50%, 75%, 90%, 100%)
 * - Reading engagement events (time-on-article milestones)
 * - Article completion tracking
 *
 * Scroll-depth and engagement events fire only on article pages
 * (/journal/*) to keep event volume focused on content performance.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const scrollMilestonesRef = useRef(new Set());
  const engagementTimerRef = useRef(null);
  const engagementStartRef = useRef(null);
  const articleSlugRef = useRef(null);

  const isArticlePage = useCallback(
    (path) => path.startsWith("/journal/") && path !== "/journal",
    []
  );

  // --- Scroll-depth tracking ---
  useEffect(() => {
    if (!isArticlePage(pathname)) return;

    const milestones = [25, 50, 75, 90, 100];
    scrollMilestonesRef.current = new Set();

    const handleScroll = () => {
      if (typeof window.gtag !== "function") return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (
          scrollPercent >= milestone &&
          !scrollMilestonesRef.current.has(milestone)
        ) {
          scrollMilestonesRef.current.add(milestone);
          window.gtag("event", "scroll_depth", {
            percent_scrolled: milestone,
            page_path: pathname,
            article_slug: pathname.replace("/journal/", ""),
            content_group: "Article",
          });

          // 90% scroll = article completion
          if (milestone === 90) {
            window.gtag("event", "article_complete", {
              page_path: pathname,
              article_slug: pathname.replace("/journal/", ""),
            });
          }
        }
      }
    };

    // Throttle scroll handler (fires at most every 200ms)
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [pathname, isArticlePage]);

  // --- Reading engagement (time-on-article milestones) ---
  useEffect(() => {
    if (!isArticlePage(pathname)) {
      // Clear any running timer when leaving an article page
      if (engagementTimerRef.current) {
        clearInterval(engagementTimerRef.current);
        engagementTimerRef.current = null;
      }
      return;
    }

    const slug = pathname.replace("/journal/", "");
    articleSlugRef.current = slug;
    engagementStartRef.current = Date.now();

    // Fire engagement events at 30s, 60s, 120s, 300s
    const engagementMilestones = [30, 60, 120, 300];
    const firedMilestones = new Set();

    engagementTimerRef.current = setInterval(() => {
      if (typeof window.gtag !== "function") return;
      if (document.hidden) return; // Skip if tab is not visible

      const elapsed = Math.floor(
        (Date.now() - engagementStartRef.current) / 1000
      );

      for (const seconds of engagementMilestones) {
        if (elapsed >= seconds && !firedMilestones.has(seconds)) {
          firedMilestones.add(seconds);
          window.gtag("event", "reading_engagement", {
            engagement_time_seconds: seconds,
            page_path: pathname,
            article_slug: slug,
            content_group: "Article",
          });
        }
      }

      // Stop checking after the last milestone
      if (firedMilestones.size === engagementMilestones.length) {
        clearInterval(engagementTimerRef.current);
        engagementTimerRef.current = null;
      }
    }, 5000);

    return () => {
      if (engagementTimerRef.current) {
        clearInterval(engagementTimerRef.current);
        engagementTimerRef.current = null;
      }
    };
  }, [pathname, isArticlePage]);

  // --- Page view tracking ---
  useEffect(() => {
    // Skip the first render: gtag config already sends the initial page_view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Small delay to let Next.js update document.title before we read it
    const timer = setTimeout(() => {
      if (typeof window.gtag !== "function") return;

      // Determine content group based on route
      const contentGroup = getContentGroup(pathname);

      // Build the page_view event parameters
      const eventParams = {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
        content_group: contentGroup,
      };

      // For article pages, extract and send article metadata
      if (isArticlePage(pathname)) {
        const slug = pathname.replace("/journal/", "");
        eventParams.article_slug = slug;

        // Read the article category from the rendered DOM
        const categoryEl = document.querySelector("[class*='category']");
        if (categoryEl) {
          eventParams.article_category = categoryEl.textContent.trim();
        }

        // Read the reading time from the rendered DOM
        const readingTimeEl = document.querySelector("[class*='readingTime']");
        if (readingTimeEl) {
          eventParams.reading_time = readingTimeEl.textContent.trim();
        }
      }

      // Send the page_view event
      window.gtag("event", "page_view", eventParams);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, isArticlePage]);

  return (
    <>
      {/* Load the gtag.js library */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Initialize gtag and send first page_view automatically */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer = window.dataLayer || [];",
            "function gtag(){dataLayer.push(arguments);}",
            "gtag('js', new Date());",
            "gtag('config', '" + GA_MEASUREMENT_ID + "', {",
            "  page_path: window.location.pathname",
            "});",
          ].join("\n"),
        }}
      />
    </>
  );
}

/**
 * Maps a pathname to a content group for GA4 reporting.
 * Content groups let you segment analytics by page type
 * (e.g., see all Article traffic vs. Home vs. Practice).
 */
function getContentGroup(pathname) {
  if (pathname === "/") return "Home";
  if (pathname === "/journal") return "Journal Index";
  if (pathname.startsWith("/journal/")) return "Article";
  if (pathname === "/practice") return "Practice";
  if (pathname === "/start-here") return "Start Here";
  if (pathname === "/listen") return "Listen";
  if (pathname === "/bookshelf") return "Bookshelf";
  if (pathname === "/manifesto") return "Manifesto";
  if (pathname === "/about") return "About";
  if (pathname === "/connect") return "Connect";
  if (pathname === "/search") return "Search";
  if (pathname === "/privacy" || pathname === "/terms") return "Legal";
  return "Other";
}
