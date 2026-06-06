"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * AdSenseRefresh
 *
 * Intercepts clicks on links to journal article pages and forces a full
 * page navigation (window.location.href) instead of letting Next.js do
 * client-side routing. This ensures Google AdSense Auto Ads re-initializes
 * and scans the DOM on every article page load.
 *
 * Why: AdSense Auto Ads only places ads on a full page load. Next.js's
 * client-side navigation (via next/link) swaps content without reloading,
 * so AdSense never re-scans and ads disappear. By intercepting the click
 * before the router handles it, we get a clean full-page load with ads.
 *
 * Non-article navigation (home, journal index, practice, about, etc.)
 * still uses fast client-side routing.
 */
export default function AdSenseRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e) {
      // Walk up from the click target to find the nearest <a>
      const link = e.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Only intercept internal article links: /journal/some-slug
      // Skip /journal (index page) and external links
      const isArticleLink =
        href.startsWith("/journal/") &&
        href !== "/journal" &&
        href !== "/journal/";

      if (!isArticleLink) return;

      // Don't intercept if we're already on this exact page
      if (href === pathname) return;

      // Don't interfere with modifier keys (new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Prevent Next.js client-side navigation
      e.preventDefault();

      // Force a full page load so AdSense re-initializes
      window.location.href = href;
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
