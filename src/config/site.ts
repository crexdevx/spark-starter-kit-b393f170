/**
 * Central site configuration — the single source of truth for
 * SEO metadata, branding, and canonical URLs.
 *
 * Update these values when the project gets a name and domain.
 */
export const siteConfig = {
  name: "Site",
  description: "A fast, static, Cloudflare-ready web application.",
  /**
   * Public origin of the deployed site. Empty until the site is published;
   * canonical/og URLs are emitted as relative paths and resolved by crawlers
   * against the request host.
   */
  url: "",
  locale: "en",
  twitterHandle: "",
} as const;

export type SiteConfig = typeof siteConfig;
