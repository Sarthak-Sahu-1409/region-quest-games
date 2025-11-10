import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language } from '@/types';
import { Languages, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
  onBack: () => void;
}

export const LanguageSelector = ({ onSelectLanguage, onBack }: LanguageSelectorProps) => {
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
      <div className="w-full max-w-4xl relative z-20">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Globe className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading text-foreground mb-4">
            Choose Language / ভাষা নির্বাচন করুন
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Select your preferred language for the game
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:bg-accent/20 border-2"
          >
            ← Back to Games
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Roman Script Option */}
          <Card 
            className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy card-glossy-hover"
            onClick={() => onSelectLanguage('roman')}
          >
            <CardHeader className="text-center space-y-4 p-6">
              <div className="mx-auto w-20 h-20 bg-gradient-region-1 rounded-full flex items-center justify-center">
                <Languages className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-heading">Roman Script</CardTitle>
              <CardDescription className="text-base">
                Learn using Roman alphabet transliteration
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">Example:</div>
                  <div className="text-lg font-bold">Gaṭa sapṭāhē hāmi ām khālē</div>
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-gradient-region-1 hover:opacity-90 text-white font-semibold text-base"
              >
                Start with Roman
              </Button>
            </CardContent>
          </Card>

          {/* Bengali Script Option */}
          <Card 
            className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy card-glossy-hover"
            onClick={() => onSelectLanguage('bengali')}
          >
            <CardHeader className="text-center space-y-4 p-6">
              <div className="mx-auto w-20 h-20 bg-gradient-region-3 rounded-full flex items-center justify-center">
                <Languages className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-heading">বাংলা লিপি</CardTitle>
              <CardDescription className="text-base">
                বাংলা বর্ণমালা ব্যবহার করে শিখুন
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-1">উদাহরণ:</div>
                  <div className="text-lg font-bold">গত সপ্তাহে হামি আম খালে</div>
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-gradient-region-3 hover:opacity-90 text-white font-semibold text-base"
              >
                বাংলায় শুরু করুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
