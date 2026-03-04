import { useState, useEffect, useCallback, useRef } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { RegionSelector } from '@/components/RegionSelector';
import { GameSelector } from '@/components/GameSelector';
import { FillBlankGame } from '@/components/games/FillBlankGame';
import { MatchingGame } from '@/components/games/MatchingGame';
import { CompletionScreen } from '@/components/CompletionScreen';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { User, Region, GameData, Language } from '@/types';

type AppState = 
  | 'auth'
  | 'region-selection'
  | 'game-selection'
  | 'playing-game'
  | 'game-complete'
  | 'teacher-dashboard';

interface HistoryState {
  state: AppState;
  user?: User | null;
  selectedRegion?: Region | null;
  selectedGame?: GameData | null;
  selectedLanguage?: Language | null;
  gameScore?: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  // Refs to always have current state available (avoids stale closures)
  const userRef = useRef(user);
  const selectedRegionRef = useRef(selectedRegion);
  const selectedGameRef = useRef(selectedGame);
  const selectedLanguageRef = useRef(selectedLanguage);
  const gameScoreRef = useRef(gameScore);

  userRef.current = user;
  selectedRegionRef.current = selectedRegion;
  selectedGameRef.current = selectedGame;
  selectedLanguageRef.current = selectedLanguage;
  gameScoreRef.current = gameScore;

  // Navigate to a new state and push to history with full context
  const navigateTo = useCallback((newState: AppState, context?: Partial<HistoryState>) => {
    const historyState: HistoryState = {
      state: newState,
      user: context?.user !== undefined ? context.user : userRef.current,
      selectedRegion: context?.selectedRegion !== undefined ? context.selectedRegion : selectedRegionRef.current,
      selectedGame: context?.selectedGame !== undefined ? context.selectedGame : selectedGameRef.current,
      selectedLanguage: context?.selectedLanguage !== undefined ? context.selectedLanguage : selectedLanguageRef.current,
      gameScore: context?.gameScore !== undefined ? context.gameScore : gameScoreRef.current,
    };
    
    setAppState(newState);
    window.history.pushState(historyState, '');
  }, []);

  // Handle browser back/forward buttons - restore full state
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
        // If no state, reset to auth
        setAppState('auth');
        setUser(null);
        setSelectedRegion(null);
        setSelectedGame(null);
        setSelectedLanguage(null);
        setGameScore(0);
      }
    };

    // Set initial state with full context
    const initialState: HistoryState = {
      state: 'auth',
      user: null,
      selectedRegion: null,
      selectedGame: null,
      selectedLanguage: null,
      gameScore: 0,
    };
    window.history.replaceState(initialState, '');

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.type === 'teacher') {
      navigateTo('teacher-dashboard', { user: loggedInUser });
    } else {
      navigateTo('region-selection', { user: loggedInUser });
    }
  }, [navigateTo]);

  const handleRegionSelect = useCallback((region: Region) => {
    setSelectedRegion(region);
    navigateTo('game-selection', { selectedRegion: region });
  }, [navigateTo]);

  const handleGameSelect = useCallback((game: GameData, language: Language) => {
    setSelectedGame(game);
    setSelectedLanguage(language);
    navigateTo('playing-game', { selectedGame: game, selectedLanguage: language });
  }, [navigateTo]);

  const handleGameComplete = useCallback((score: number) => {
    setGameScore(score);
    navigateTo('game-complete', { gameScore: score });
  }, [navigateTo]);

  const handleBackToGames = useCallback(() => {
    navigateTo('game-selection');
  }, [navigateTo]);

  const handleBackToRegions = useCallback(() => {
    setSelectedRegion(null);
    setSelectedGame(null);
    navigateTo('region-selection', { selectedRegion: null, selectedGame: null });
  }, [navigateTo]);

  const resetAndGoToAuth = useCallback(() => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setSelectedLanguage(null);
    setGameScore(0);
    navigateTo('auth', { user: null, selectedRegion: null, selectedGame: null, selectedLanguage: null, gameScore: 0 });
  }, [navigateTo]);

  const handleBackToHome = resetAndGoToAuth;
  const handleLogout = resetAndGoToAuth;

  // Render the appropriate component based on app state
  switch (appState) {
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
