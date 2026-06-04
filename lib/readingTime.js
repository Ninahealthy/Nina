/**
 * Calculate reading time from article content blocks.
 * Extracts text from paragraph and quote blocks, assumes 230 words per minute.
 * @param {Array} content - Array of content blocks with type and text properties.
 * @returns {number} Estimated reading time in minutes (minimum 1).
 */
export function getReadingTime(content) {
  const text = content
    .filter((block) => block.type === "paragraph" || block.type === "quote")
    .map((block) => block.text)
    .join(" ");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}
