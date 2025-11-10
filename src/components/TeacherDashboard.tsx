import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut,
  Sun,
  Snowflake,
  TreePine,
  FileText,
  HelpCircle,
  Shuffle
} from 'lucide-react';
import { regionsData } from '@/data/regions';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Region, GameData, Language } from '@/types';
import { TeacherQuestionView } from '@/components/TeacherQuestionView';
import { LanguageSelector } from '@/components/LanguageSelector';

interface TeacherDashboardProps {
  onLogout: () => void;
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

export const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  // If language and game are selected, show sequential question view
  if (selectedGame && selectedRegion && selectedLanguage) {
    return (
      <TeacherQuestionView
        game={selectedGame}
        region={selectedRegion}
        language={selectedLanguage}
        onBack={() => {
          setSelectedGame(null);
          setSelectedLanguage(null);
        }}
      />
    );
  }

  // If a game is selected (but no language yet), show language selector
  if (selectedGame && selectedRegion) {
    return (
      <LanguageSelector
        onSelectLanguage={(language) => setSelectedLanguage(language)}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  // If a region is selected, show game selection
  if (selectedRegion) {
    const region = regionsData.find(r => r.id === selectedRegion);
    if (!region) return null;

    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/gradient-blue-background/backg1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <ThemeToggle />
        <div className="w-full max-w-5xl relative z-20">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRegion(null)}
                className="hover:bg-accent/20 border-2"
              >
                ← Back to Regions
              </Button>
            </div>
            <h1 className="text-5xl font-heading text-foreground mb-4">
              {region.displayName}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Select a game to view questions with answers
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Locations:</span> ({region.locations.join(', ')})
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.games.map((game) => {
              const Icon = gameIcons[game.type];
              const isAvailable = game.questions.length > 0;
              
              return (
                <Card 
                  key={game.id}
                  className={`shadow-large transition-all duration-300 border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 flex flex-col ${
                    isAvailable 
                      ? 'hover:shadow-xl hover:scale-105 cursor-pointer card-glossy-hover' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => isAvailable && setSelectedGame(game)}
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
                            {game.questions.length} Questions
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
                  <CardContent className="px-6 pb-6 mt-auto">
                    <Button 
                      className={`w-full h-12 font-semibold ${gameColors[game.type]} hover:opacity-90 text-white`}
                      disabled={!isAvailable}
                    >
                      {isAvailable ? 'View Questions' : 'Coming Soon'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Logout Button */}
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline"
              onClick={onLogout}
              className="hover:bg-accent/20 border-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const regionIcons = {
    'south-west-bengal-1': Sun,
    'south-west-bengal-2': Sun,
    'north-bengal-1': Snowflake,
    'north-bengal-2': TreePine,
  };

  const regionGradients = {
    'south-west-bengal-1': 'bg-gradient-region-1',
    'south-west-bengal-2': 'bg-gradient-region-2',
    'north-bengal-1': 'bg-gradient-region-3',
    'north-bengal-2': 'bg-gradient-region-4',
  };

  // Region selection view
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/gradient-blue-background/backg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <ThemeToggle />
      <div className="w-full max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading text-foreground mb-3 sm:mb-4">
            Teacher Dashboard
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Select a region to view questions with correct answers
          </p>
          <Button 
            variant="outline"
            onClick={onLogout}
            className="hover:bg-accent/20 border-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Region Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {regionsData.map((region) => {
            const Icon = regionIcons[region.id];
            const gradientClass = regionGradients[region.id];
            const availableInRegion = region.games.filter(game => game.questions.length > 0).length;
            
            return (
              <Card 
                key={region.id}
                className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy card-glossy-hover flex flex-col"
                onClick={() => setSelectedRegion(region.id)}
              >
                <CardHeader className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 ${gradientClass} rounded-full flex items-center justify-center`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl font-heading">{region.displayName}</CardTitle>
                  <CardDescription>
                    <div className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Locations:</div>
                    <div className="text-xs">
                      ({region.locations.join(', ')})
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="text-xs sm:text-sm text-center">
                      <Badge 
                        variant={availableInRegion > 0 ? "default" : "secondary"}
                        className={availableInRegion > 0 ? "bg-success" : ""}
                      >
                        {availableInRegion > 0 ? `${availableInRegion} Games Available` : 'In Development'}
                      </Badge>
                    </div>
                    <Button 
                      className={`w-full h-10 sm:h-12 ${gradientClass} hover:opacity-90 text-white font-semibold text-sm sm:text-base`}
                    >
                      View Questions
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