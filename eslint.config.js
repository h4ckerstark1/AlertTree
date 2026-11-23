import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/*
 * Security guardrails (see docs/SECURITY.md).
 * These lint rules are a guardrail against mistakes, not a security boundary.
 * Tokens must never be placed in web storage at all; the backend keeps the session
 * in an httpOnly cookie.
 */

// Every way of reaching the browser storage objects that this config blocks:
//   localStorage            window.localStorage        globalThis.localStorage
//   self.localStorage       window['localStorage']     const { localStorage } = window
const STORAGE_OBJECTS = ['window', 'globalThis', 'self']

const storageMessage = (name) =>
  name === 'localStorage'
    ? 'localStorage is blocked. Use src/lib/safe-storage.ts (non-sensitive UI preferences only). Never store tokens.'
    : 'sessionStorage is blocked. Never store tokens or session data in the browser.'

const restrictedStorageProperties = (names) =>
  STORAGE_OBJECTS.flatMap((object) =>
    names.map((property) => ({ object, property, message: storageMessage(property) })),
  )

const restrictedStorageGlobals = (names) =>
  names.map((name) => ({ name, message: storageMessage(name) }))

// Destructuring such as `const { localStorage } = window`.
const destructuringSelectors = (names) => {
  const objects = STORAGE_OBJECTS.join('|')
  const props = names.join('|')
  return ['VariableDeclarator', 'AssignmentExpression'].map((parent) => ({
    selector: `${parent}[${parent === 'VariableDeclarator' ? 'init' : 'right'}.name=/^(${objects})$/] > ObjectPattern > Property[key.name=/^(${props})$/]`,
    message: `Destructuring ${names.join('/')} from the global object is blocked. See docs/SECURITY.md.`,
  }))
}

const noInnerHtml = {
  selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
  message: 'dangerouslySetInnerHTML is forbidden. Render external content as text.',
}

const ALL_STORAGE = ['localStorage', 'sessionStorage']

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'playwright-report']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // Raw HTML injection and storage destructuring are not allowed anywhere.
      'no-restricted-syntax': ['error', noInnerHtml, ...destructuringSelectors(ALL_STORAGE)],
      // Bare `localStorage` / `sessionStorage`.
      'no-restricted-globals': ['error', ...restrictedStorageGlobals(ALL_STORAGE)],
      // `window.localStorage`, `globalThis.localStorage`, `self.localStorage`,
      // `window['localStorage']` and the same for sessionStorage.
      'no-restricted-properties': ['error', ...restrictedStorageProperties(ALL_STORAGE)],
    },
  },
  /*
   * DOCUMENTED EXCEPTION: the one allowed place for localStorage.
   * The future safe-storage wrapper (added in Phase 1) may use localStorage ONLY for
   * non-sensitive UI preferences such as theme, density and sidebar state, and must
   * tolerate blocked or unavailable storage. sessionStorage stays blocked here too.
   * Flat config replaces a rule's whole setting, so the other restrictions are repeated.
   * Do not widen this exception to other files without a security review.
   */
  {
    files: ['src/lib/safe-storage.ts'],
    rules: {
      'no-restricted-syntax': ['error', noInnerHtml, ...destructuringSelectors(['sessionStorage'])],
      'no-restricted-globals': ['error', ...restrictedStorageGlobals(['sessionStorage'])],
      'no-restricted-properties': ['error', ...restrictedStorageProperties(['sessionStorage'])],
    },
  },
])
