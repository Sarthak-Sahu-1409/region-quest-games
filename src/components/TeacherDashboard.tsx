import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  LogOut,
  PlayCircle,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { regionsData } from '@/data/regions';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});
  const totalGames = regionsData.reduce((total, region) => total + region.games.length, 0);
  const availableGames = regionsData.reduce((total, region) => 
    total + region.games.filter(game => game.questions.length > 0).length, 0
  );

  const toggleRegion = (regionId: string) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionId]: !prev[regionId]
    }));
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <AnimatedBackground />
      <ThemeToggle />
      <div className="w-full max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-card/80 dark:bg-card/60 rounded-lg backdrop-blur-sm border-2 border-border/50">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground mb-1 sm:mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Manage learning content and review questions
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={onLogout}
            className="w-full sm:w-auto hover:scale-105 transition-transform"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-medium hover:shadow-large transition-all border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                Regions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{regionsData.length}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Active regions</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-large transition-all border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center">
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-success" />
                Available Games
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-success">{availableGames}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Ready to play</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-large transition-all border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg flex items-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-secondary" />
                Total Games
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-secondary">{totalGames}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Including in development</p>
            </CardContent>
          </Card>
        </div>

        {/* Regions Overview with Questions */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {regionsData.map((region) => {
            const isExpanded = expandedRegions[region.id];
            const availableInRegion = region.games.filter(game => game.questions.length > 0).length;
            
            return (
              <Card key={region.id} className="shadow-medium hover:shadow-large transition-all border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
                <CardHeader className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1 w-full">
                      <CardTitle className="text-xl sm:text-2xl font-heading mb-1.5 sm:mb-2">
                        {region.displayName}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        <span className="font-medium">Locations:</span> ({region.locations.join(', ')})
                      </CardDescription>
                      <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">
                        {region.games.length} games configured
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                      <Badge 
                        variant={availableInRegion > 0 ? "default" : "secondary"}
                        className={availableInRegion > 0 ? "bg-success text-xs sm:text-sm" : "text-xs sm:text-sm"}
                      >
                        {availableInRegion} Available
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRegion(region.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0">
                  <div className="space-y-2 sm:space-y-3">
                    {region.games.map((game) => (
                      <div key={game.id}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2.5 sm:p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <div className="font-semibold text-sm sm:text-base">{game.name}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {game.description}
                            </div>
                          </div>
                          <Badge 
                            variant={game.questions.length > 0 ? "default" : "secondary"}
                            className={`${game.questions.length > 0 ? "bg-success" : ""} text-xs sm:text-sm whitespace-nowrap`}
                          >
                            {game.questions.length > 0 
                              ? `${game.questions.length} Questions` 
                              : 'In Development'
                            }
                          </Badge>
                        </div>
                        
                        {/* Show questions with answers when expanded */}
                        {isExpanded && game.questions.length > 0 && (
                          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-card rounded-lg border-2 border-border/50">
                            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-primary">
                              Questions with Correct Answers:
                            </h4>
                            <div className="space-y-4 sm:space-y-6">
                              {game.questions.map((question, index) => (
                                <div key={question.id} className="border-b border-border pb-3 sm:pb-4 last:border-b-0">
                                  <div className="flex items-start gap-2 mb-2 sm:mb-3">
                                    <span className="font-bold text-primary min-w-[1.5rem] sm:min-w-[2rem] text-sm sm:text-base">
                                      {index + 1}.
                                    </span>
                                    <div className="flex-1">
                                      <div className="text-sm sm:text-base mb-1.5 sm:mb-2 leading-relaxed">
                                        {question.sentence[0]}
                                        <span className="mx-1 sm:mx-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-success/20 text-success dark:bg-success/30 dark:text-success-foreground font-semibold rounded border-2 border-success/40 text-xs sm:text-sm inline-block my-1">
                                          {question.blank.correctAnswers.join(' / ')}
                                        </span>
                                        {question.sentence[1]}
                                      </div>
                                      <div className="mt-1.5 sm:mt-2">
                                        <span className="text-xs sm:text-sm font-medium text-muted-foreground">All options: </span>
                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                          {question.options.join(', ')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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