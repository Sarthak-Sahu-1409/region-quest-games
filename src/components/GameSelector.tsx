import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Region, GameData, Language } from '@/types';
import { regionsData } from '@/data/regions';
import { FileText, Shuffle, Skull } from 'lucide-react';
import { useState } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { INNER_PAGE_BACKGROUND_STYLE } from '@/lib/styles';

interface GameSelectorProps {
  region: Region;
  onSelectGame: (game: GameData, language: Language) => void;
  onBack: () => void;
}

const gameIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'fill-blank': FileText,
  'matching': Shuffle,
  'hangman': Skull,
};

const gameColors: Record<string, string> = {
  'fill-blank': 'bg-game-fill-blank',
  'matching': 'bg-game-matching',
  'hangman': 'bg-game-hangman',
};

export const GameSelector = ({ region, onSelectGame, onBack }: GameSelectorProps) => {
  const regionData = regionsData.find(r => r.id === region);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  
  if (!regionData) return null;

  // If a game is selected, show language selector
  if (selectedGame) {
    // Hangman uses both scripts on one screen — skip language selector
    if (selectedGame.type === 'hangman') {
      onSelectGame(selectedGame, 'roman');
      setSelectedGame(null);
      return null;
    }
    return (
      <LanguageSelector
        onSelectLanguage={(language) => onSelectGame(selectedGame, language)}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  return (
    <div 
      className="h-[100dvh] w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={INNER_PAGE_BACKGROUND_STYLE}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="w-full max-w-5xl relative z-20">
        <header className="text-center mb-3 sm:mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl mb-2 border border-white/20 shadow-md shadow-inner">
            <FileText className="w-5 h-5 text-white drop-shadow-md" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-foreground mb-1 tracking-tight">
            {regionData.displayName} Games
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mb-3 px-4">
            Choose a game to start your learning adventure
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:bg-accent/20 border text-sm h-9 shadow-sm hover:shadow transition-all"
          >
            ← Back to Regions
          </Button>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {regionData.games.map((game) => {
            const Icon = gameIcons[game.type];
            const isAvailable = game.type === 'matching' 
              ? (game.matchingQuestions && game.matchingQuestions.length > 0)
              : game.questions.length > 0;
            const questionCount = game.type === 'matching'
              ? (game.matchingQuestions?.length || 0)
              : game.questions.length;
            
            return (
              <Card 
                key={game.id}
                className={`shadow-large transition-all duration-300 border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 flex flex-col  ${
                  isAvailable 
                    ? 'hover:shadow-xl hover:scale-105 cursor-pointer card-glossy-hover' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isAvailable && setSelectedGame(game)}
              >
                <CardHeader className="text-center space-y-2 p-4 pb-2">
                  <div className={`mx-auto w-12 h-12 ${gameColors[game.type]} rounded-full flex items-center justify-center shadow-inner`}>
                    <Icon className={`w-6 h-6 ${game.type === 'matching' ? 'text-gray-900' : 'text-white drop-shadow-md'}`} />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-heading">{game.name}</CardTitle>
                  </div>
                  <CardDescription className="text-center text-xs">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 mt-auto">
                  <div className="flex flex-col">
                    <div className="text-xs text-muted-foreground text-center mb-3">
                      {isAvailable ? `${questionCount} Questions` : 'Under Development'}
                    </div>
                    <Button 
                      className={`w-full h-10 sm:h-12 font-semibold ${gameColors[game.type]} hover:opacity-90 ${game.type === 'matching' ? 'text-gray-900' : 'text-white drop-shadow-md'}`}
                      disabled={!isAvailable}
                    >
                      {isAvailable ? 'Start Game' : 'Coming Soon'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
