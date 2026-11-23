/**
 * Typed access to PUBLIC build-time configuration.
 * Everything here ends up in the browser bundle, so it must never hold secrets.
 */

function parseApiBaseUrl(value: string | undefined): string {
  const raw = (value ?? '/api').trim()
  // Only same-origin relative paths are allowed. Keeps the httpOnly cookie session
  // same-origin and prevents pointing the app at an arbitrary third-party host.
  if (!raw.startsWith('/') || raw.startsWith('//')) {
    throw new Error('VITE_API_BASE_URL must be a same-origin path such as "/api".')
  }
  return raw.replace(/\/+$/, '') || '/api'
}

export const env = {
  apiBaseUrl: parseApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  demoMode: import.meta.env.VITE_DEMO_MODE === 'true',
} as const
