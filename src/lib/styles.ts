/**
 * Shared style constants used across multiple components.
 * Declared as module-level constants so React reuses the same object reference
 * on every render, avoiding unnecessary style recalculations.
 */

/** Used on the auth / landing page only. */
export const PAGE_BACKGROUND_STYLE = {
  backgroundImage: 'url(/gradient-blue-background/backg2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;

/** Used on all inner pages (after login). */
export const INNER_PAGE_BACKGROUND_STYLE = {
  backgroundImage: 'url(/gradient-blue-background/backg3.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;

/** Used on active gameplay screens (FillBlankGame, MatchingGame). */
export const GAME_BACKGROUND_STYLE = {
  backgroundImage: 'url(/gradient-blue-background/backg4.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
} as const;
