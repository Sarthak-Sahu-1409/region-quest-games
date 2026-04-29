import { useState, useEffect, useRef } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { RegionSelector } from '@/components/RegionSelector';
import { GameSelector } from '@/components/GameSelector';
import { FillBlankGame } from '@/components/games/FillBlankGame';
import { MatchingGame } from '@/components/games/MatchingGame';
import { HangmanGame } from '@/components/games/HangmanGame';
import { CompletionScreen } from '@/components/CompletionScreen';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { User, Region, GameData, Language } from '@/types';
import Loader from '@/components/Loader';

type AppState =
  | 'auth'
  | 'region-selection'
  | 'game-selection'
  | 'playing-game'
  | 'game-complete'
  | 'teacher-dashboard';

/** Maps each app-state to its wallpaper group (keep in sync with src/lib/styles.ts). */
type BgGroup = 'page' | 'inner' | 'game';

const getBgGroup = (state: AppState): BgGroup => {
  if (state === 'auth') return 'page';
  if (state === 'playing-game') return 'game';
  return 'inner';
};

interface HistoryState {
  state: AppState;
  user?: User | null;
  selectedRegion?: Region | null;
  selectedGame?: GameData | null;
  selectedLanguage?: Language | null;
  gameScore?: number;
}

/** How long (ms) the pencil loader plays on a background-group change. */
const TRANSITION_DURATION_MS = 1000;

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  /** The state actually being rendered — lags appState during a transition. */
  const [renderedState, setRenderedState] = useState<AppState>('auth');
  const [showTransitionLoader, setShowTransitionLoader] = useState(false);

  /** bg-group currently on screen. */
  const currentBgGroupRef = useRef<BgGroup>(getBgGroup('auth'));
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Skip the loader on the very first mount (WallpaperLoader already covers it). */
  const isFirstRender = useRef(true);

  // ── Navigate helper ──────────────────────────────────────────────────────
  const navigateTo = (newState: AppState, context?: Partial<HistoryState>) => {
    const historyState: HistoryState = {
      state: newState,
      user: context?.user !== undefined ? context.user : user,
      selectedRegion: context?.selectedRegion !== undefined ? context.selectedRegion : selectedRegion,
      selectedGame: context?.selectedGame !== undefined ? context.selectedGame : selectedGame,
      selectedLanguage: context?.selectedLanguage !== undefined ? context.selectedLanguage : selectedLanguage,
      gameScore: context?.gameScore !== undefined ? context.gameScore : gameScore,
    };
    setAppState(newState);
    window.history.pushState(historyState, '');
  };

  // ── Browser back/forward ─────────────────────────────────────────────────
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const historyState = event.state as HistoryState | null;
      if (historyState) {
        setAppState(historyState.state);
        setUser(historyState.user || null);
        setSelectedRegion(historyState.selectedRegion || null);
        setSelectedGame(historyState.selectedGame || null);
        setSelectedLanguage(historyState.selectedLanguage || null);
        setGameScore(historyState.gameScore || 0);
      } else {
        setAppState('auth');
        setUser(null);
        setSelectedRegion(null);
        setSelectedGame(null);
        setSelectedLanguage(null);
        setGameScore(0);
      }
    };

    window.history.replaceState(
      { state: 'auth', user: null, selectedRegion: null, selectedGame: null, selectedLanguage: null, gameScore: 0 },
      '',
    );
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ── Background-change transition ─────────────────────────────────────────
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      currentBgGroupRef.current = getBgGroup(appState);
      setRenderedState(appState); // sync on mount
      return;
    }

    const newGroup = getBgGroup(appState);

    if (newGroup !== currentBgGroupRef.current) {
      // Wallpaper is changing → show the pencil loader for 1 second.
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setShowTransitionLoader(true);

      transitionTimerRef.current = setTimeout(() => {
        currentBgGroupRef.current = newGroup;
        setRenderedState(appState);
        setShowTransitionLoader(false);
      }, TRANSITION_DURATION_MS);
    } else {
      // Same wallpaper → instant switch.
      setRenderedState(appState);
    }

    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  // ── Event handlers ───────────────────────────────────────────────────────
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.type === 'teacher') {
      navigateTo('teacher-dashboard', { user: loggedInUser });
    } else {
      navigateTo('region-selection', { user: loggedInUser });
    }
  };

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    navigateTo('game-selection', { selectedRegion: region });
  };

  const handleGameSelect = (game: GameData, language: Language) => {
    setSelectedGame(game);
    setSelectedLanguage(language);
    navigateTo('playing-game', { selectedGame: game, selectedLanguage: language });
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    navigateTo('game-complete', { gameScore: score });
  };

  const handleBackToGames = () => navigateTo('game-selection');

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setSelectedGame(null);
    navigateTo('region-selection', { selectedRegion: null, selectedGame: null });
  };

  const handleBackToHome = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setSelectedLanguage(null);
    setGameScore(0);
    navigateTo('auth', { user: null, selectedRegion: null, selectedGame: null, selectedLanguage: null, gameScore: 0 });
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setSelectedLanguage(null);
    setGameScore(0);
    navigateTo('auth', { user: null, selectedRegion: null, selectedGame: null, selectedLanguage: null, gameScore: 0 });
  };

  // ── Render ───────────────────────────────────────────────────────────────

  // Pencil loader during wallpaper transitions
  if (showTransitionLoader) {
    return <Loader />;
  }

  // Render the page that corresponds to the (possibly lagging) renderedState
  switch (renderedState) {
    case 'auth':
      return <AuthPage onLogin={handleLogin} />;

    case 'region-selection':
      return <RegionSelector onSelectRegion={handleRegionSelect} onBack={handleBackToHome} />;

    case 'game-selection':
      return (
        <GameSelector
          region={selectedRegion!}
          onSelectGame={handleGameSelect}
          onBack={handleBackToRegions}
        />
      );

    case 'playing-game':
      if (selectedGame?.type === 'hangman') {
        return (
          <HangmanGame
            game={selectedGame!}
            region={selectedRegion!}
            language={selectedLanguage!}
            onBack={handleBackToGames}
            onComplete={handleGameComplete}
          />
        );
      }
      if (selectedGame?.type === 'matching') {
        return (
          <MatchingGame
            game={selectedGame!}
            region={selectedRegion!}
            language={selectedLanguage!}
            onBack={handleBackToGames}
            onComplete={handleGameComplete}
          />
        );
      }
      return (
        <FillBlankGame
          game={selectedGame!}
          region={selectedRegion!}
          language={selectedLanguage!}
          onBack={handleBackToGames}
          onComplete={handleGameComplete}
        />
      );

    case 'game-complete':
      return (
        <CompletionScreen
          gameName={selectedGame?.name || ''}
          onBackToGames={handleBackToGames}
          onBackToHome={handleBackToHome}
        />
      );

    case 'teacher-dashboard':
      return <TeacherDashboard onLogout={handleLogout} />;

    default:
      return <AuthPage onLogin={handleLogin} />;
  }
};

export default Index;
