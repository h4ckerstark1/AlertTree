/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Same-origin API base path. Public value, never a secret. */
  readonly VITE_API_BASE_URL?: string
  /** "true" enables clearly labeled demo data where no backend exists. */
  readonly VITE_DEMO_MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
