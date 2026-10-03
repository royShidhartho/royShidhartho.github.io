const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/**
 * Render a config string to safe HTML. Supports three inline marks:
 * [label](url) links, ==highlight==, and **strong**. Everything else is escaped.
 */
export function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, url: string) => {
      const external = /^https?:\/\//.test(url)
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${url}"${external}>${label}</a>`;
    })
    .replace(/==(.+?)==/g, "<mark>$1</mark>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
