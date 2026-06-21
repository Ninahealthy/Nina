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
export const OG_IMAGES = {};
