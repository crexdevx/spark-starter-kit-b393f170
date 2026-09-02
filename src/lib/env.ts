/**
 * Environment-variable handling.
 *
 * Rules:
 * - Client code may only read `import.meta.env.VITE_*` values. They are
 *   inlined into the browser bundle at build time — never put secrets here.
 * - Server secrets (no VITE_ prefix) must be read with `process.env['NAME']`
 *   INSIDE a server-only boundary (a createServerFn .handler(), a
 *   createServerOnlyFn, or a server route handler). Reading them at module
 *   scope leaks them into the client bundle or breaks on Cloudflare Workers.
 */

/** Public, client-safe environment values (typed in src/env.d.ts). */
export const publicEnv = {
  appName: import.meta.env["VITE_APP_NAME"] ?? "Site",
  /** Optional absolute site URL, e.g. https://example.com */
  siteUrl: import.meta.env["VITE_SITE_URL"] ?? "",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;

export type PublicEnv = typeof publicEnv;
