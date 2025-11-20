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
  Shuffle,
  GraduationCap
} from 'lucide-react';
import { regionsData } from '@/data/regions';
import { useState } from 'react';
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
        <div className="w-full max-w-5xl relative z-20 px-2 sm:px-0">
          <header className="text-center mb-4 sm:mb-6 md:mb-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedRegion(null)}
              className="mb-3 sm:mb-4 bg-white/10 hover:bg-white/20 border-white/30 text-white text-xs sm:text-sm w-full sm:w-auto"
            >
              ← Back to Regions
            </Button>
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-xl mb-2 sm:mb-3 border border-white/20 shadow-md">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-white mb-1 sm:mb-2 tracking-tight">
              {region.displayName}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto mb-2 sm:mb-3 px-2 sm:px-4">
              Select a game to view questions with answers
            </p>
            <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 text-xs">
              <span className="font-medium text-white text-xs sm:text-sm">{region.locations.join(', ')}</span>
            </div>
          </header>
          
                  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {region.games.map((game) => {
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
                  className={`shadow-large transition-all duration-300 border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 flex flex-col ${
                    isAvailable 
                      ? 'hover:shadow-xl hover:scale-105 cursor-pointer card-glossy-hover' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => isAvailable && setSelectedGame(game)}
                >
                  <CardHeader className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
                    <div className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 ${gameColors[game.type]} rounded-full flex items-center justify-center`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg sm:text-xl font-heading text-white">{game.name}</CardTitle>
                      <div className="flex justify-center">
                        {isAvailable ? (
                          <Badge variant="default" className="bg-success/80 text-white border-0">
                            {questionCount} Questions
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-white/20 text-white border-0">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-center text-white/70 text-xs sm:text-sm">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                    <Button 
                      className={`w-full h-10 sm:h-12 font-semibold text-sm sm:text-base ${gameColors[game.type]} hover:opacity-90 text-white`}
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
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button 
              variant="outline"
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white text-sm w-full sm:w-auto">
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
      <div className="w-full max-w-7xl mx-auto relative z-20 px-2 sm:px-0">
        {/* Header */}
        <header className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 backdrop-blur-md rounded-xl mb-2 sm:mb-3 border border-primary/20 shadow-md">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">
            Teacher Dashboard
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-3 sm:mb-4 px-2 sm:px-4">
            Select a region to view questions with answers
          </p>
          <Button 
            variant="outline"
            onClick={onLogout}
            className="hover:bg-accent/20 border text-xs sm:text-sm h-8 sm:h-9 shadow-sm hover:shadow transition-all w-full sm:w-auto">
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Region Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {regionsData.map((region) => {
            const Icon = regionIcons[region.id];
            const gradientClass = regionGradients[region.id];
            const availableInRegion = region.games.filter(game => {
              if (game.type === 'matching') {
                return game.matchingQuestions && game.matchingQuestions.length > 0;
              }
              return game.questions.length > 0;
            }).length;
            
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