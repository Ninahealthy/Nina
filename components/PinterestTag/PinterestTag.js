"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * Pinterest Tag ID.
 *
 * To set up your Pinterest Tag:
 * 1. Go to ads.pinterest.com > Conversions > Create a Pinterest tag
 * 2. Copy the tag ID and replace the placeholder below
 * 3. Verify installation in Pinterest Tag Manager
 *
 * The tag enables:
 * - Conversion tracking (page visits, article views, sign-ups)
 * - Audience building for promoted pins
 * - Enhanced match (when email is available via newsletter signup)
 * - Performance analytics in Pinterest Ads Manager
 *
 * TODO: Replace with your actual Pinterest Tag ID from ads.pinterest.com
 */
const PINTEREST_TAG_ID = "YOUR_PINTEREST_TAG_ID";

/**
 * PinterestTag
 *
 * Loads the Pinterest Tag (pintrk) for conversion tracking and
 * audience analytics. Tracks:
 *
 * - `pagevisit` on every page view (with category metadata)
 * - `viewcategory` on journal index (filtered by category)
 * - `custom` article_read event on article pages (with slug and category)
 * - `lead` event when newsletter signup occurs (listens for custom event)
 *
 * Only initializes when a valid tag ID is configured.
 */
export default function PinterestTag() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isConfigured = PINTEREST_TAG_ID !== "YOUR_PINTEREST_TAG_ID";

  // Track page views on client-side navigation
  useEffect(() => {
    if (!isConfigured) return;

    // Skip the first render; the init script handles the initial pagevisit
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (typeof window.pintrk !== "function") return;

      // Base pagevisit on every navigation
      window.pintrk("track", "pagevisit");

      // Article-specific tracking
      if (pathname.startsWith("/journal/") && pathname !== "/journal") {
        const slug = pathname.replace("/journal/", "");
        const categoryEl = document.querySelector("[class*='category']");
        const category = categoryEl
          ? categoryEl.textContent.trim()
          : "Unknown";

        window.pintrk("track", "custom", {
          event_name: "article_read",
          article_slug: slug,
          article_category: category,
        });
      }

      // Journal index category view
      if (pathname === "/journal") {
        window.pintrk("track", "viewcategory", {
          category_name: "Journal",
        });
      }

      // Bookshelf page
      if (pathname === "/bookshelf") {
        window.pintrk("track", "viewcategory", {
          category_name: "Bookshelf",
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, isConfigured]);

  // Listen for newsletter signup events (dispatched by NewsletterSignup)
  useEffect(() => {
    if (!isConfigured) return;

    const handleSignup = () => {
      if (typeof window.pintrk !== "function") return;
      window.pintrk("track", "lead", {
        lead_type: "newsletter_signup",
      });
    };

    window.addEventListener("nina:newsletter_signup", handleSignup);
    return () =>
      window.removeEventListener("nina:newsletter_signup", handleSignup);
  }, [isConfigured]);

  // Don't render anything if not configured
  if (!isConfigured) return null;

  return (
    <>
      {/* Pinterest base code */}
      <Script
        id="pinterest-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(e){if(!window.pintrk){window.pintrk=function(){
window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
var n=window.pintrk;n.queue=[],n.version="3.0";
var t=document.createElement("script");t.async=!0,
t.src=e;var r=document.getElementsByTagName("script")[0];
r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
pintrk('load', '${PINTEREST_TAG_ID}');
pintrk('page');
          `.trim(),
        }}
      />
      {/* Pinterest noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
        />
      </noscript>
    </>
  );
}
