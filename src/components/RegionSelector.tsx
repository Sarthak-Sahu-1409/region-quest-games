import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Region } from '@/types';
import { regionsData } from '@/data/regions';
import { Mountain, Snowflake, Sun, TreePine } from 'lucide-react';

interface RegionSelectorProps {
  onSelectRegion: (region: Region) => void;
  onBack: () => void;
}

const regionIcons = {
  north: Snowflake,
  south: Sun,
  east: Mountain,
  west: TreePine,
};

const regionGradients = {
  north: 'bg-gradient-region-1',
  south: 'bg-gradient-region-2',
  east: 'bg-gradient-region-3',
  west: 'bg-gradient-region-4',
};

export const RegionSelector = ({ onSelectRegion, onBack }: RegionSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading text-white mb-4">
            Choose Your Region
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Each region has unique learning experiences tailored to local culture and environment
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            ← Back to Login
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionsData.map((region) => {
            const Icon = regionIcons[region.id];
            const gradientClass = regionGradients[region.id];
            
            return (
              <Card 
                key={region.id}
                className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onSelectRegion(region.id)}
              >
                <CardHeader className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 ${gradientClass} rounded-full flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-heading">{region.displayName}</CardTitle>
                  <CardDescription>
                    Discover learning adventures in the {region.name}ern culture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Available Games: {region.games.length}
                    </div>
                    <Button 
                      className={`w-full ${gradientClass} hover:opacity-90 text-white font-semibold py-4`}
                    >
                      Explore {region.displayName}
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