import { useState, useEffect } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { RegionSelector } from '@/components/RegionSelector';
import { GameSelector } from '@/components/GameSelector';
import { FillBlankGame } from '@/components/games/FillBlankGame';
import { CompletionScreen } from '@/components/CompletionScreen';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { User, Region, GameData } from '@/types';

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
  gameScore?: number;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  // Navigate to a new state and push to history with full context
  const navigateTo = (newState: AppState, context?: Partial<HistoryState>) => {
    const historyState: HistoryState = {
      state: newState,
      user: context?.user !== undefined ? context.user : user,
      selectedRegion: context?.selectedRegion !== undefined ? context.selectedRegion : selectedRegion,
      selectedGame: context?.selectedGame !== undefined ? context.selectedGame : selectedGame,
      gameScore: context?.gameScore !== undefined ? context.gameScore : gameScore,
    };
    
    setAppState(newState);
    window.history.pushState(historyState, '');
  };

  // Handle browser back/forward buttons - restore full state
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const historyState = event.state as HistoryState | null;
      
      if (historyState) {
        setAppState(historyState.state);
        setUser(historyState.user || null);
        setSelectedRegion(historyState.selectedRegion || null);
        setSelectedGame(historyState.selectedGame || null);
        setGameScore(historyState.gameScore || 0);
      } else {
        // If no state, reset to auth
        setAppState('auth');
        setUser(null);
        setSelectedRegion(null);
        setSelectedGame(null);
        setGameScore(0);
      }
    };

    // Set initial state with full context
    const initialState: HistoryState = {
      state: 'auth',
      user: null,
      selectedRegion: null,
      selectedGame: null,
      gameScore: 0,
    };
    window.history.replaceState(initialState, '');

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const handleGameSelect = (game: GameData) => {
    setSelectedGame(game);
    navigateTo('playing-game', { selectedGame: game });
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    navigateTo('game-complete', { gameScore: score });
  };

  const handlePlayAgain = () => {
    setGameScore(0);
    navigateTo('playing-game', { gameScore: 0 });
  };

  const handleBackToGames = () => {
    // From completion screen or playing game, go back to game selection
    navigateTo('game-selection');
  };

  const handleBackToRegions = () => {
    // From game selection, go back to region selection
    setSelectedRegion(null);
    setSelectedGame(null);
    navigateTo('region-selection', { selectedRegion: null, selectedGame: null });
  };

  const handleBackToHome = () => {
    // From completion screen, reset everything and go to auth
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    navigateTo('auth', { user: null, selectedRegion: null, selectedGame: null, gameScore: 0 });
  };

  const handleLogout = () => {
    // From teacher dashboard, reset and go to auth
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    navigateTo('auth', { user: null, selectedRegion: null, selectedGame: null, gameScore: 0 });
  };

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
      return (
        <FillBlankGame 
          game={selectedGame!} 
          region={selectedRegion!}
          onBack={handleBackToGames}
          onComplete={handleGameComplete}
        />
      );
    
    case 'game-complete':
      return (
        <CompletionScreen 
          gameName={selectedGame?.name || ''}
          onPlayAgain={handlePlayAgain}
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
