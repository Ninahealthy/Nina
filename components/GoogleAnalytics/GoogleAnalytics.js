"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-C8757P0MH2";

/**
 * GoogleAnalytics
 *
 * Loads GA4 (gtag.js) and tracks page views on both full page loads
 * and client-side navigations.
 *
 * How it works:
 * - Initial page load: gtag('config', ...) fires an automatic page_view
 * - Client-side navigation: usePathname() detects route changes and fires
 *   a manual page_view event via gtag('event', 'page_view', ...)
 * - Article-to-article navigation already forces a full reload (via
 *   AdSenseRefresh), so GA handles those as normal page loads
 *
 * Advanced features:
 * - Content grouping: pages are tagged by section (Home, Article, etc.)
 *   for segmented analysis in GA4 reports
 * - Article metadata: article pages send category and slug as custom
 *   event parameters for content performance analysis
 * - Proper page_title tracking: waits for DOM title update before sending
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Track client-side navigations
  // (initial page_view is handled automatically by gtag config)
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
      if (pathname.startsWith("/journal/") && pathname !== "/journal") {
        const slug = pathname.replace("/journal/", "");
        eventParams.article_slug = slug;

        // Read the article category from the rendered DOM
        const categoryEl = document.querySelector(
          "[class*='category']"
        );
        if (categoryEl) {
          eventParams.article_category = categoryEl.textContent.trim();
        }

        // Read the reading time from the rendered DOM
        const readingTimeEl = document.querySelector(
          "[class*='readingTime']"
        );
        if (readingTimeEl) {
          eventParams.reading_time = readingTimeEl.textContent.trim();
        }
      }

      // Send the page_view event
      window.gtag("event", "page_view", eventParams);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

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
  if (pathname === "/about") return "About";
  if (pathname === "/connect") return "Connect";
  if (pathname === "/privacy" || pathname === "/terms") return "Legal";
  return "Other";
}
