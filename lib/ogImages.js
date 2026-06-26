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
  "the-silence-after-you-say-the-true-thing": "/images/og/the-silence-after-you-say-the-true-thing.png",
  "the-warmth-that-stays": "/images/og/the-warmth-that-stays.png",
  "the-age-you-started-believing-you-were-too-late": "/images/og/the-age-you-started-believing-you-were-too-late.png",
  "the-cup-you-still-make-for-two": "/images/og/the-cup-you-still-make-for-two.png",
  "the-honest-shock-of-cold-water": "/images/og/the-honest-shock-of-cold-water.png",
  "the-argument-your-body-is-having-without-you": "/images/og/the-argument-your-body-is-having-without-you.png",
  "the-wisdom-of-restless-hands": "/images/og/the-wisdom-of-restless-hands.png",
};
