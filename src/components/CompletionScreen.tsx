import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';

interface CompletionScreenProps {
  score: number;
  totalQuestions: number;
  gameName: string;
  onPlayAgain: () => void;
  onBackToGames: () => void;
  onBackToHome: () => void;
}

export const CompletionScreen = ({ 
  score, 
  totalQuestions, 
  gameName, 
  onPlayAgain, 
  onBackToGames, 
  onBackToHome 
}: CompletionScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! Outstanding work! 🌟";
    if (percentage >= 80) return "Excellent job! Well done! 🎉";
    if (percentage >= 60) return "Good work! Keep practicing! 👍";
    return "Nice try! Practice makes perfect! 💪";
  };

  const getStarRating = () => {
    if (percentage === 100) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 60) return 1;
    return 0;
  };

  const stars = getStarRating();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-large">
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
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">
              {score}/{totalQuestions}
            </div>
            <Badge variant="outline" className="text-2xl px-6 py-2">
              {percentage}% Correct
            </Badge>
            
            {/* Star Rating */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 3 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < stars 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-xl font-semibold text-success">
              {getPerformanceMessage()}
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
          <div className="text-center p-6 bg-muted rounded-lg">
            <p className="text-lg text-muted-foreground">
              {percentage >= 80 
                ? "You're doing amazingly! Try other games to continue learning!" 
                : "Every attempt makes you stronger! Keep practicing and you'll improve!"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};