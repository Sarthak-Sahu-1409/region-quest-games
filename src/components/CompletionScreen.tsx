import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-large border-2 border-border">{/* Add border */}
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-4xl font-heading mb-2">
              Game Complete!
            </CardTitle>
            <p className="text-xl text-muted-foreground">
              {gameName}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Celebration Display */}
          <div className="text-center space-y-6">
            <div className="text-8xl animate-bounce-slow">
              🎉
            </div>
            <div className="text-6xl font-bold text-primary animate-pulse">
              {randomMessage}
            </div>
            <div className="flex justify-center space-x-3">
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>🌟</span>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🌟</span>
            </div>
            <p className="text-2xl font-semibold text-success">
              You completed the {gameName}!
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={onPlayAgain}
              className="w-full bg-gradient-success hover:opacity-90 text-white font-semibold py-4 text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                onClick={onBackToGames}
                className="font-semibold py-3"
              >
                Choose Different Game
              </Button>
              <Button 
                variant="outline"
                onClick={onBackToHome}
                className="font-semibold py-3"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
          
          {/* Encouragement Message */}
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border-2 border-primary/20">
            <p className="text-xl text-primary font-semibold">
              🎈 Keep exploring and learning! You're doing great! 🎈
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              Try more games to continue your adventure!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};