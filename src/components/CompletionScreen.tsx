import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface CompletionScreenProps {
  gameName: string;
  onPlayAgain: () => void;
  onBackToGames: () => void;
  onBackToHome: () => void;
}

export const CompletionScreen = ({ 
  gameName, 
  onPlayAgain, 
  onBackToGames, 
  onBackToHome 
}: CompletionScreenProps) => {
  const celebrationMessages = [
    "Awesome work! 🎉",
    "You're a star! ⭐",
    "Fantastic job! 🌟",
    "Well done! 👏",
    "Great effort! 💪"
  ];
  
  const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];

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
      <div className="w-full max-w-lg relative z-20">
        <header className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 backdrop-blur-md rounded-xl mb-2 border border-success/20 shadow-md">
            <Trophy className="w-6 h-6 text-success" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-1 tracking-tight">
            Game Complete!
          </h1>
        </header>
        
        <Card className="w-full shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 relative z-20 card-glossy">
          <CardContent className="space-y-3 p-3">
            {/* Celebration Display */}
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl">
                🎉
              </div>
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {randomMessage}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                onClick={onBackToGames}
                className="font-semibold py-2 text-sm h-10"
              >
                Region Games
              </Button>
              <Button 
                variant="outline"
                onClick={onBackToHome}
                className="font-semibold py-2 text-sm h-10"
              >
                <Home className="w-3 h-3 mr-1" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};