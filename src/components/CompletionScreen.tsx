import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
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
      <ThemeToggle />
      <div className="w-full max-w-lg relative z-20">
        <Card className="w-full shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 relative z-20 card-glossy">
          <CardHeader className="text-center space-y-2 pb-2 p-3">
            <div className="mx-auto w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-heading mb-1">
                Game Complete!
              </CardTitle>
            </div>
          </CardHeader>
          
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