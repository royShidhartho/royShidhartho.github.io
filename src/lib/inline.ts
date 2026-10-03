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
 * Links are processed before markup to prevent markup from corrupting URLs or creating XSS.
 */
export function renderInline(text: string): string {
  const escaped = escapeHtml(text);

  // Extract links with placeholder tokens to protect them from markup processing
  const links: Array<{ placeholder: string; html: string }> = [];
  let linkIndex = 0;

  const withPlaceholders = escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, url: string) => {
    // Only allow http(s), /, #, or relative paths (no unsafe schemes)
    // Reject URLs that contain : unless they start with http:// or https://
    const isValidUrl = /^https?:\/\//.test(url) || /^[/#]/.test(url) || !/:/.test(url);

    if (!isValidUrl) {
      // Return the original escaped text without creating a link
      return `[${label}](${url})`;
    }

    const isExternal = /^https?:\/\//.test(url);
    const external = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    const html = `<a href="${url}"${external}>${label}</a>`;

    const placeholder = `___LINK_${linkIndex}___`;
    links.push({ placeholder, html });
    linkIndex++;

    return placeholder;
  });

  // Apply markup transformations (now safe from URL corruption)
  const withMarkup = withPlaceholders
    .replace(/==(.+?)==/g, "<mark>$1</mark>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Substitute links back
  let result = withMarkup;
  for (const { placeholder, html } of links) {
    result = result.replace(placeholder, html);
  }

  return result;
}
