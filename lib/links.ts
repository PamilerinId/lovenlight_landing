/**
 * Props for an <a> given its destination: external web pages open in a new
 * tab, everything else (same-site paths, mailto:, tel:) behaves normally.
 * Keeps one rule in one place instead of a target attribute on every button.
 */
export function linkProps(href: string) {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener" } : {};
}
