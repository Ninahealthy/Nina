"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const AD_CLIENT = "ca-pub-2087636695455778";
const AD_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

/**
 * AdSenseRefresh
 *
 * Manages the AdSense Auto Ads script lifecycle for SPA navigation.
 *
 * Problem: AdSense Auto Ads only scans the DOM once on initial page load.
 * During client-side navigation (next/link), the page content changes but
 * AdSense never re-scans, so ads disappear.
 *
 * Solution: On every route change, tear down all AdSense-injected elements,
 * reset the adsbygoogle queue, and re-inject the script so AdSense performs
 * a fresh scan of the new page content.
 */
export default function AdSenseRefresh() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  // Initial script load (replaces the <Script> tag in layout)
  useEffect(() => {
    // Only load if the script isn't already present (e.g., from SSR)
    const existing = document.querySelector(
      `script[src*="adsbygoogle.js"]`
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = AD_SCRIPT_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  // Re-initialize AdSense on route changes
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Delay to let Next.js finish rendering the new page content
    const timer = setTimeout(() => {
      try {
        // 1. Remove all auto-ad containers that AdSense injected
        const autoAds = document.querySelectorAll(
          "ins.adsbygoogle, .google-auto-placed, .adsbygoogle-noablate"
        );
        autoAds.forEach((el) => el.remove());

        // 2. Remove AdSense iframes (ad creatives)
        const adIframes = document.querySelectorAll(
          'iframe[id*="google_ads"], iframe[id*="aswift"]'
        );
        adIframes.forEach((el) => el.remove());

        // 3. Remove the old script tags
        const oldScripts = document.querySelectorAll(
          'script[src*="adsbygoogle"]'
        );
        oldScripts.forEach((s) => s.remove());

        // 4. Reset the adsbygoogle queue
        window.adsbygoogle = [];

        // 5. Re-inject the AdSense script to trigger a fresh page scan
        const script = document.createElement("script");
        script.src = AD_SCRIPT_SRC;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      } catch (e) {
        // AdSense errors during teardown/reinit are non-critical
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
