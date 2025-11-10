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
      <div className="w-full max-w-2xl relative z-20">
        <Card className="w-full max-w-2xl shadow-large border-2 border-white/20 dark:border-white/10 backdrop-blur-2xl bg-white/50 dark:bg-card/50 relative z-20">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-heading mb-2">
                Game Complete!
              </CardTitle>
              <p className="text-base sm:text-lg text-muted-foreground">
                {gameName}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Celebration Display */}
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-5xl sm:text-6xl animate-bounce-slow">
                🎉
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-primary animate-pulse">
                {randomMessage}
              </div>
              <div className="flex justify-center space-x-2">
                <span className="text-2xl sm:text-3xl animate-bounce" style={{animationDelay: '0.1s'}}>🌟</span>
                <span className="text-2xl sm:text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
                <span className="text-2xl sm:text-3xl animate-bounce" style={{animationDelay: '0.3s'}}>🌟</span>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-success">
                You completed the {gameName}!
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={onPlayAgain}
                className="w-full bg-gradient-success hover:opacity-90 text-white font-semibold py-3 text-base"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  onClick={onBackToGames}
                  className="font-semibold py-2.5 text-sm"
                >
                  Choose Different Game
                </Button>
                <Button 
                  variant="outline"
                  onClick={onBackToHome}
                  className="font-semibold py-2.5 text-sm"
                >
                  <Home className="w-3 h-3 mr-1" />
                  Back to Home
                </Button>
              </div>
            </div>
            
            {/* Encouragement Message */}
            <div className="text-center p-4 bg-gradient-subtle rounded-lg border-2 border-primary/20">
              <p className="text-base sm:text-lg text-primary font-semibold">
                🎈 Keep exploring and learning! You're doing great! 🎈
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Try more games to continue your adventure!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};