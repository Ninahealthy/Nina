/**
 * Episode registry for the Listen page and podcast RSS feed.
 *
 * Each episode maps to an existing journal article slug.
 * Audio files are hosted externally (e.g., Cloudflare R2).
 * Update this file when new audio recordings are published.
 *
 * To add a new episode:
 * 1. Record the essay reading as MP3 (128kbps, mono).
 * 2. Upload to the audio hosting bucket.
 * 3. Add an entry here with the correct slug, URL, and duration.
 *
 * @module episodes
 */

/**
 * Placeholder episodes for development.
 * Replace audioUrl values with real Cloudflare R2 URLs once recordings exist.
 */
const EPISODES = {
  "the-body-you-are-in": {
    episodeNumber: 1,
    title: "The Body You Are In",
    slug: "the-body-you-are-in",
    voiceMode: "raw",
    audioUrl: "/audio/the-body-you-are-in.mp3",
    duration: "6:42",
    durationSeconds: 402,
    fileSize: 3216000,
    publishedDate: "2026-06-25",
    description:
      "An audio reading of the essay about learning to inhabit the body you actually have, not the one you were promised.",
  },
  "the-page-that-listens": {
    episodeNumber: 2,
    title: "The Page That Listens",
    slug: "the-page-that-listens",
    voiceMode: "searching",
    audioUrl: "/audio/the-page-that-listens.mp3",
    duration: "5:18",
    durationSeconds: 318,
    fileSize: 2544000,
    publishedDate: "2026-07-02",
    description:
      "What happens when you stop writing to perform and start writing to understand. An essay on journaling as somatic attention.",
  },
  "anger-as-information": {
    episodeNumber: 3,
    title: "Anger as Information",
    slug: "anger-as-information",
    voiceMode: "fierce",
    audioUrl: "/audio/anger-as-information.mp3",
    duration: "7:54",
    durationSeconds: 474,
    fileSize: 3792000,
    publishedDate: "2026-07-09",
    description:
      "Anger is not the problem. The refusal to listen to it is. An essay on learning to treat anger as the body's honest reporting.",
  },
};

/**
 * Returns episodes sorted by episode number (ascending).
 * @returns {Array<Object>} Sorted episode array.
 */
export function getEpisodeList() {
  return Object.values(EPISODES).sort(
    (a, b) => a.episodeNumber - b.episodeNumber
  );
}

/**
 * Returns a single episode by slug, or null if not found.
 * @param {string} slug - The article slug.
 * @returns {Object|null}
 */
export function getEpisodeBySlug(slug) {
  return EPISODES[slug] || null;
}

/**
 * Returns the most recent episode by published date.
 * @returns {Object}
 */
export function getLatestEpisode() {
  const list = getEpisodeList();
  return list[list.length - 1];
}

export default EPISODES;
