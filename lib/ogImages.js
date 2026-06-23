/**
 * Canonical mapping of article slugs to OG (Open Graph) social card images.
 * Single source of truth for per-article social sharing images.
 *
 * Each image should be a 1200x630 PNG with article title, category, and
 * brand mark overlay. See the design skill for the OG image template spec.
 *
 * Fallback chain in generateMetadata:
 *   OG_IMAGES[slug] -> CARD_IMAGES[slug] -> SITE.ogImage.url
 *
 * Add entries here as per-article OG images are generated.
 *
 * @module ogImages
 */
export const OG_IMAGES = {
  "the-honest-shock-of-cold-water": "/images/og/the-honest-shock-of-cold-water.png",
  "the-argument-your-body-is-having-without-you": "/images/og/the-argument-your-body-is-having-without-you.png",
  "the-wisdom-of-restless-hands": "/images/og/the-wisdom-of-restless-hands.png",
};
