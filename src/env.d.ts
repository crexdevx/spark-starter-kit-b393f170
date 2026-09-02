/// <reference types="vite/client" />

/**
 * Type declarations for environment variables.
 *
 * - `VITE_*` keys are exposed to the browser bundle — public values only.
 * - Keys in `ProcessEnv` are server-only and must be read inside a
 *   server-only execution boundary (see src/lib/env.ts).
 */

interface ImportMetaEnv {
  /** Public site name shown in metadata and UI. */
  readonly VITE_APP_NAME?: string;
  /** Absolute public origin, e.g. https://example.com (set when published). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Example server-only secret slot — add real secrets here as needed. */
      readonly NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
