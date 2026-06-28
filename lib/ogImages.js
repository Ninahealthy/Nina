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
  "the-apology-your-body-has-been-waiting-for": "/images/og/the-apology-your-body-has-been-waiting-for.png",
  "the-morning-you-stopped-rushing": "/images/og/the-morning-you-stopped-rushing.png",
  "the-hands-that-do-not-know-what-to-do-with-rest": "/images/og/the-hands-that-do-not-know-what-to-do-with-rest.png",
  "the-voice-you-use-when-no-one-is-listening": "/images/og/the-voice-you-use-when-no-one-is-listening.png",
  "the-threshold-you-stand-in-before-entering": "/images/og/the-threshold-you-stand-in-before-entering.png",
  "the-permission-you-give-yourself-at-night": "/images/og/the-permission-you-give-yourself-at-night.png",
  "the-grief-that-arrives-on-ordinary-tuesdays": "/images/og/the-grief-that-arrives-on-ordinary-tuesdays.png",
  "the-way-you-hold-your-phone": "/images/og/the-way-you-hold-your-phone.png",
  "the-argument-that-lives-in-your-jaw": "/images/og/the-argument-that-lives-in-your-jaw.png",
  "the-first-meal-you-cook-for-yourself": "/images/og/the-first-meal-you-cook-for-yourself.png",
  "the-furniture-you-arrange-around-loneliness": "/images/og/the-furniture-you-arrange-around-loneliness.png",
  "the-muscle-memory-of-leaving": "/images/og/the-muscle-memory-of-leaving.png",
  "the-mouth-that-holds-the-words-back": "/images/og/the-mouth-that-holds-the-words-back.png",
  "the-room-that-holds-your-shape": "/images/og/the-room-that-holds-your-shape.png",
  "the-rebellion-of-resting": "/images/og/the-rebellion-of-resting.png",
  "the-shoes-you-cannot-throw-away": "/images/og/the-shoes-you-cannot-throw-away.png",
  "the-silence-between-heartbeats": "/images/og/the-silence-between-heartbeats.png",
  "the-temperature-of-trust": "/images/og/the-temperature-of-trust.png",
  "the-body-that-laughs-without-permission": "/images/og/the-body-that-laughs-without-permission.png",
  "the-scent-that-takes-you-somewhere": "/images/og/the-scent-that-takes-you-somewhere.png",
  "the-weight-you-carry-in-your-posture": "/images/og/the-weight-you-carry-in-your-posture.png",
  "the-architecture-of-waiting": "/images/og/the-architecture-of-waiting.png",
  "the-discipline-of-pleasure": "/images/og/the-discipline-of-pleasure.png",
  "the-silence-after-you-say-the-true-thing": "/images/og/the-silence-after-you-say-the-true-thing.png",
  "the-warmth-that-stays": "/images/og/the-warmth-that-stays.png",
  "the-age-you-started-believing-you-were-too-late": "/images/og/the-age-you-started-believing-you-were-too-late.png",
  "the-cup-you-still-make-for-two": "/images/og/the-cup-you-still-make-for-two.png",
  "the-honest-shock-of-cold-water": "/images/og/the-honest-shock-of-cold-water.png",
  "the-argument-your-body-is-having-without-you": "/images/og/the-argument-your-body-is-having-without-you.png",
  "the-wisdom-of-restless-hands": "/images/og/the-wisdom-of-restless-hands.png",
};
