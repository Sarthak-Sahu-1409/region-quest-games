import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language } from '@/types';
import { Languages, Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
  onBack: () => void;
}

export const LanguageSelector = ({ onSelectLanguage, onBack }: LanguageSelectorProps) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2 sm:p-3 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/gradient-blue-background/backg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="w-full max-w-3xl relative z-20">
        <header className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-primary/10 backdrop-blur-md rounded-xl mb-2 sm:mb-3 border border-primary/20 shadow-md">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2 tracking-tight">
            Choose Language / ভাষা নির্বাচন করুন
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto mb-3 px-4">
            Select your preferred language for the game
          </p>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="hover:bg-accent/20 border text-xs h-8 shadow-sm hover:shadow transition-all"
          >
            ← Back to Games
          </Button>
        </header>
        
        <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {/* Roman Script Option */}
          <Card 
            className="shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy card-glossy-hover"
            onClick={() => onSelectLanguage('roman')}
          >
            <CardHeader className="text-center space-y-2 p-3 sm:p-4">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-gradient-region-1 rounded-full flex items-center justify-center">
                <Languages className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-heading">Roman Script</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Learn using Roman alphabet
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-muted/50 rounded-lg text-center">
                  <div className="text-xs text-on-light opacity-60 mb-1">Example:</div>
                  <div className="text-sm sm:text-base font-bold text-on-light">Gata saptahe hami am khale</div>
                </div>
              </div>
              <Button 
                className="w-full h-10 bg-gradient-region-1 hover:opacity-90 text-white font-semibold text-sm"
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
            <CardHeader className="text-center space-y-2 p-3 sm:p-4">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-gradient-region-3 rounded-full flex items-center justify-center">
                <Languages className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-heading">বাংলা লিপি</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                বাংলা বর্ণমালা ব্যবহার করে শিখুন
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-muted/50 rounded-lg text-center">
                  <div className="text-xs text-on-light opacity-60 mb-1">উদাহরণ:</div>
                  <div className="text-sm sm:text-base font-bold text-on-light">গত সপ্তাহে হামি আম খালে</div>
                </div>
              </div>
              <Button 
                className="w-full h-10 bg-gradient-region-3 hover:opacity-90 text-white font-semibold text-sm"
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
