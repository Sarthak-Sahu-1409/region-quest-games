/**
 * Shared style constants used across multiple components.
 * Declared as module-level constants so React reuses the same object reference
 * on every render, avoiding unnecessary style recalculations.
 */

export const PAGE_BACKGROUND_STYLE = {
  backgroundImage: 'url(/gradient-blue-background/backg2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;
