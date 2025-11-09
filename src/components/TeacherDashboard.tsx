import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  PlayCircle,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { regionsData } from '@/data/regions';
import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-primary p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-4xl font-heading text-white mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-white/90 text-lg">
              Manage learning content and monitor student progress
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={onLogout}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{regionsData.length}</div>
              <p className="text-sm text-muted-foreground">Active regions</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <PlayCircle className="w-5 h-5 mr-2 text-success" />
                Available Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{availableGames}</div>
              <p className="text-sm text-muted-foreground">Ready to play</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-secondary" />
                Total Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalGames}</div>
              <p className="text-sm text-muted-foreground">Including in development</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-accent" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">-</div>
              <p className="text-sm text-muted-foreground">Analytics coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Regions Overview with Questions */}
        <div className="space-y-6 mb-8">
          {regionsData.map((region) => {
            const isExpanded = expandedRegions[region.id];
            const availableInRegion = region.games.filter(game => game.questions.length > 0).length;
            
            return (
              <Card key={region.id} className="shadow-medium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-heading mb-2">
                        {region.displayName}
                      </CardTitle>
                      <CardDescription className="text-base">
                        <span className="font-medium">Locations:</span> ({region.locations.join(', ')})
                      </CardDescription>
                      <CardDescription className="mt-1">
                        {region.games.length} games configured
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={availableInRegion > 0 ? "default" : "secondary"}
                        className={availableInRegion > 0 ? "bg-success" : ""}
                      >
                        {availableInRegion} Available
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRegion(region.id)}
                        className="ml-2"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {region.games.map((game) => (
                      <div key={game.id}>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-semibold">{game.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {game.description}
                            </div>
                          </div>
                          <Badge 
                            variant={game.questions.length > 0 ? "default" : "secondary"}
                            className={game.questions.length > 0 ? "bg-success" : ""}
                          >
                            {game.questions.length > 0 
                              ? `${game.questions.length} Questions` 
                              : 'In Development'
                            }
                          </Badge>
                        </div>
                        
                        {/* Show questions with answers when expanded */}
                        {isExpanded && game.questions.length > 0 && (
                          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-lg mb-4 text-primary">
                              Questions with Correct Answers:
                            </h4>
                            <div className="space-y-6">
                              {game.questions.map((question, index) => (
                                <div key={question.id} className="border-b pb-4 last:border-b-0">
                                  <div className="flex items-start gap-2 mb-3">
                                    <span className="font-bold text-primary min-w-[2rem]">
                                      {index + 1}.
                                    </span>
                                    <div className="flex-1">
                                      <div className="text-base mb-2">
                                        {question.sentence[0]}
                                        <span className="mx-2 px-3 py-1 bg-green-100 text-green-800 font-semibold rounded border-2 border-green-300">
                                          {question.blank.correctAnswers.join(' / ')}
                                        </span>
                                        {question.sentence[1]}
                                      </div>
                                      <div className="mt-2">
                                        <span className="text-sm font-medium text-gray-600">All options: </span>
                                        <span className="text-sm text-gray-500">
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