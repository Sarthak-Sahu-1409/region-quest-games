import { useState } from 'react';
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

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.type === 'teacher') {
      setAppState('teacher-dashboard');
    } else {
      setAppState('region-selection');
    }
  };

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setAppState('game-selection');
  };

  const handleGameSelect = (game: GameData) => {
    setSelectedGame(game);
    setAppState('playing-game');
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setAppState('game-complete');
  };

  const handlePlayAgain = () => {
    setAppState('playing-game');
  };

  const handleBackToGames = () => {
    setAppState('game-selection');
  };

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setAppState('region-selection');
  };

  const handleBackToHome = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    setAppState('auth');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRegion(null);
    setSelectedGame(null);
    setGameScore(0);
    setAppState('auth');
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
          score={gameScore}
          totalQuestions={selectedGame?.questions.length || 0}
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
