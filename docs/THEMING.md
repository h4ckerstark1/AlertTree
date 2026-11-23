# Theming (planned for Phase 1)

This document defines the rules. Implementation arrives in Phase 1.

## Modes

Light, Dark and System. System follows `prefers-color-scheme` and updates live. The theme changes instantly with no reload and persists across sessions. A small inline script in `index.html` will apply the saved theme before React loads to avoid a flash.

## Token layers

1. **Primitive tokens:** raw scales (colors, spacing, radii, type sizes).
2. **Semantic tokens:** meaning-based variables such as `--bg`, `--surface`, `--border`, `--text`, `--accent`, `--sidebar-bg`.
3. **Component usage:** components use semantic tokens only. Hardcoded colors are not allowed.

## Customization options

- Presets: Midnight, Graphite, Ocean, Forest, Violet, Emerald, Rose, Classic Light
- Custom primary accent color (with contrast check) and optional secondary accent
- Sidebar appearance, background style, card style, border contrast
- Density: Compact, Comfortable, Spacious
- Font size adjustment
- Rounded or compact components
- Reduced motion and optional animations
- Live preview, Save, and Reset to Default

## Accessibility

- Every preset must meet WCAG AA contrast for text and key UI elements.
- A custom accent that fails contrast shows a warning before it can be saved.
- `prefers-reduced-motion` is respected by default.

## Persistence

Only non-sensitive appearance preferences are stored in the browser, through a safe storage wrapper that tolerates blocked storage. When the backend supports it, preferences may also sync to the user's profile.

## Coverage

Components, charts, dialogs, tables, dropdowns, tooltips and notifications must all render correctly in every theme.
