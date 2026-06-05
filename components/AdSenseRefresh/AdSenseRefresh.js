"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * AdSenseRefresh
 *
 * Listens for client-side route changes and tells Google AdSense Auto Ads
 * to re-evaluate ad placements. Without this, Auto Ads only render on
 * the initial full page load and disappear during next/link navigation.
 */
export default function AdSenseRefresh() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip the first render (ads load normally on initial page load)
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Small delay to let the new page content render into the DOM
    // before asking AdSense to re-scan
    const timer = setTimeout(() => {
      try {
        const adsbygoogle = window.adsbygoogle;
        if (adsbygoogle) {
          // Remove stale auto-ad containers from the previous page
          // AdSense inserts these with data-ad-status attributes
          const staleAds = document.querySelectorAll(
            'ins.adsbygoogle[data-ad-status]'
          );
          staleAds.forEach((ad) => {
            ad.removeAttribute("data-ad-status");
            ad.removeAttribute("data-adsbygoogle-status");
            ad.innerHTML = "";
          });

          // Push a new ad request so AdSense re-scans the page
          adsbygoogle.push({});
        }
      } catch (e) {
        // AdSense may throw if no ad slots are fillable; safe to ignore
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
