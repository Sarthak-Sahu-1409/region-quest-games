import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Region } from '@/types';
import { regionsData } from '@/data/regions';
import { Mountain, Compass, MapPin, TreePine } from 'lucide-react';
import { INNER_PAGE_BACKGROUND_STYLE } from '@/lib/styles';

interface RegionSelectorProps {
  onSelectRegion: (region: Region) => void;
  onBack: () => void;
}

const regionIcons = {
  'south-west-bengal-1': Compass,
  'south-west-bengal-2': MapPin,
  'north-bengal-1': Mountain,
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
      className="h-[100dvh] w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={INNER_PAGE_BACKGROUND_STYLE}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="w-full max-w-6xl relative z-20">
        <header className="text-center mb-3 sm:mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl mb-2 border border-white/20 shadow-md shadow-inner">
            <Mountain className="w-5 h-5 text-white drop-shadow-md" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-foreground mb-1 tracking-tight">
            Choose Your Region
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mb-3 px-4">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {regionsData.map((region) => {
            const Icon = regionIcons[region.id];
            const gradientClass = regionGradients[region.id];
            
            return (
              <Card 
                key={region.id}
                className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 flex flex-col card-glossy card-glossy-hover"
                onClick={() => onSelectRegion(region.id)}
              >
                <CardHeader className="text-center space-y-2 p-4 pb-2">
                  <div className={`mx-auto w-12 h-12 ${gradientClass} rounded-full flex items-center justify-center shadow-inner`}>
                    <Icon className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                  <CardTitle className="text-xl font-heading">{region.displayName}</CardTitle>
                  <CardDescription>
                    <span className="block text-xs font-medium mb-1">Locations:</span>
                    <span className="block text-[10px]">
                      ({region.locations.join(', ')})
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 mt-auto">
                  <div className="flex flex-col">
                    <div className="text-xs text-muted-foreground mb-3 text-center">
                      Available Games: {region.games.length}
                    </div>
                    <Button 
                      className={`w-full h-10 sm:h-12 ${gradientClass} hover:opacity-90 text-white font-semibold drop-shadow-sm`}
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
