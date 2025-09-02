import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Region, GameData } from '@/types';
import { regionsData } from '@/data/regions';
import { FileText, HelpCircle, Shuffle } from 'lucide-react';

interface GameSelectorProps {
  region: Region;
  onSelectGame: (game: GameData) => void;
  onBack: () => void;
}

const gameIcons = {
  'fill-blank': FileText,
  'multiple-choice': HelpCircle,
  'matching': Shuffle,
};

const gameColors = {
  'fill-blank': 'bg-game-fill-blank',
  'multiple-choice': 'bg-game-multiple-choice',
  'matching': 'bg-game-matching',
};

export const GameSelector = ({ region, onSelectGame, onBack }: GameSelectorProps) => {
  const regionData = regionsData.find(r => r.id === region);
  
  if (!regionData) return null;

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading text-white mb-4">
            {regionData.displayName} Games
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Choose a game to start your learning adventure
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            ← Back to Regions
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionData.games.map((game) => {
            const Icon = gameIcons[game.type];
            const isAvailable = game.questions.length > 0;
            
            return (
              <Card 
                key={game.id}
                className={`shadow-large transition-all duration-300 ${
                  isAvailable 
                    ? 'hover:shadow-xl hover:scale-105 cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isAvailable && onSelectGame(game)}
              >
                <CardHeader className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 ${gameColors[game.type]} rounded-full flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-heading">{game.name}</CardTitle>
                    <div className="flex justify-center">
                      {isAvailable ? (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-center">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground text-center">
                      {isAvailable ? `${game.questions.length} Questions` : 'Under Development'}
                    </div>
                    <Button 
                      className={`w-full font-semibold py-4 ${gameColors[game.type]} hover:opacity-90 text-white`}
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