/**
 * Calculate reading time from article content blocks.
 * Extracts text from paragraph, quote, subheading, and list blocks,
 * assumes 230 words per minute.
 * @param {Array} content - Array of content blocks with type and text properties.
 * @returns {number} Estimated reading time in minutes (minimum 1).
 */
export function getReadingTime(content) {
  const parts = [];
  for (const block of content) {
    if (block.type === "paragraph" || block.type === "quote" || block.type === "subheading") {
      parts.push(block.text);
    } else if (block.type === "list" && Array.isArray(block.items)) {
      parts.push(block.items.join(" "));
    }
  }
  const text = parts.join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}
