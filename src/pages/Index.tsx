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

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  // Navigate to a new state and push to history
  const navigateTo = (newState: AppState) => {
    setAppState(newState);
    window.history.pushState({ state: newState }, '');
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.state) {
        setAppState(event.state.state);
      } else {
        // If no state, go back to auth
        setAppState('auth');
      }
    };

    // Set initial state
    window.history.replaceState({ state: 'auth' }, '');

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.type === 'teacher') {
      navigateTo('teacher-dashboard');
    } else {
      navigateTo('region-selection');
    }
  };

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    navigateTo('game-selection');
  };

  const handleGameSelect = (game: GameData) => {
    setSelectedGame(game);
    navigateTo('playing-game');
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    navigateTo('game-complete');
  };

  const handlePlayAgain = () => {
    navigateTo('playing-game');
  };

  const handleBackToGames = () => {
    window.history.back();
  };

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    window.history.back();
  };

  const handleBackToHome = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    window.history.back();
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    setAppState('auth');
    // Clear history and reset to auth
    window.history.pushState({ state: 'auth' }, '');
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
