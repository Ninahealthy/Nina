/**
 * Escapes HTML special characters to prevent XSS in rendered content.
 * Shared utility used by server actions (newsletter, contact form).
 */
export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
