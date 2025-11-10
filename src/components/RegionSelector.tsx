import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Region } from '@/types';
import { regionsData } from '@/data/regions';
import { Mountain, Snowflake, Sun, TreePine } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface RegionSelectorProps {
  onSelectRegion: (region: Region) => void;
  onBack: () => void;
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

export const RegionSelector = ({ onSelectRegion, onBack }: RegionSelectorProps) => {
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
      <div className="w-full max-w-6xl relative z-20">
        <header className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 backdrop-blur-md rounded-xl mb-3 border border-primary/20 shadow-md">
            <Mountain className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-foreground mb-2 tracking-tight">
            Choose Your Region
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-4 px-4">
            Unique learning experiences tailored to local culture
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:bg-accent/20 border text-sm h-9 shadow-sm hover:shadow transition-all"
          >
            ← Back to Login
          </Button>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionsData.map((region) => {
            const Icon = regionIcons[region.id];
            const gradientClass = regionGradients[region.id];
            
            return (
              <Card 
                key={region.id}
                className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 flex flex-col card-glossy card-glossy-hover"
                onClick={() => onSelectRegion(region.id)}
              >
                <CardHeader className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 ${gradientClass} rounded-full flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-heading">{region.displayName}</CardTitle>
                  <CardDescription>
                    <div className="text-sm font-medium mb-2">Locations:</div>
                    <div className="text-xs">
                      ({region.locations.join(', ')})
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6 mt-auto">
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground mb-6">
                      Available Games: {region.games.length}
                    </div>
                    <Button 
                      className={`w-full h-12 ${gradientClass} hover:opacity-90 text-white font-semibold`}
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