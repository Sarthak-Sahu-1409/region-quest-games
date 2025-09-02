import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region } from '@/types';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface FillBlankGameProps {
  game: GameData;
  region: Region;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const FillBlankGame = ({ game, region, onBack, onComplete }: FillBlankGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const currentQuestion = game.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / game.questions.length) * 100;

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnsweredCorrectly(false);
    setDisabledOptions([]);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option: string) => {
    if (disabledOptions.includes(option) || answeredCorrectly) return;

    const isCorrect = currentQuestion.blank.correctAnswers.includes(option);
    
    if (isCorrect) {
      setSelectedAnswer(option);
      setShowFeedback(true);
      setAnsweredCorrectly(true);
      setScore(prev => prev + 1);
      setDisabledOptions(prev => [...prev, option]);
    } else {
      // Wrong answer - add shake effect and disable temporarily
      setDisabledOptions(prev => [...prev, option]);
      setTimeout(() => {
        setDisabledOptions(prev => prev.filter(opt => opt !== option));
      }, 600);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnsweredCorrectly(false);
    setDisabledOptions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              ← Back to Games
            </Button>
            <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
              Question {currentQuestionIndex + 1} of {game.questions.length}
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>
          <Progress 
            value={progress} 
            className="w-full max-w-md mx-auto mb-4 h-3"
          />
          <h1 className="text-4xl font-heading text-white mb-2">
            {game.name}
          </h1>
          <p className="text-white/90">
            Score: {score} / {game.questions.length}
          </p>
        </div>

        {/* Game Card */}
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">
              Fill in the Blank
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Options */}
            <div className="flex flex-wrap justify-center gap-3 p-6 bg-muted rounded-lg">
              {currentQuestion.options.map((option, index) => {
                const isDisabled = disabledOptions.includes(option);
                const isWrong = disabledOptions.includes(option) && !currentQuestion.blank.correctAnswers.includes(option);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={isDisabled && !isWrong}
                    className={`
                      px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200
                      ${isDisabled 
                        ? isWrong 
                          ? 'bg-destructive/20 text-destructive border-2 border-destructive animate-pulse'
                          : 'bg-success/20 text-success border-2 border-success cursor-not-allowed'
                        : 'bg-white border-2 border-border hover:border-primary hover:scale-105 hover:shadow-md cursor-pointer'
                      }
                      ${isWrong ? 'animate-shake' : ''}
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Sentence */}
            <div className="text-center p-8 bg-card rounded-lg border">
              <div className="text-2xl leading-relaxed space-x-2 flex flex-wrap justify-center items-center gap-2">
                {currentQuestion.sentence.map((word, index) => (
                  <span key={index} className="font-semibold">
                    {word}
                  </span>
                ))}
                {/* Blank space */}
                <div className={`
                  inline-flex items-center justify-center min-w-32 h-12 mx-2 rounded-lg border-2 transition-all duration-300
                  ${selectedAnswer 
                    ? 'bg-success/20 border-success text-success font-bold px-4' 
                    : 'border-dashed border-primary bg-primary/5'
                  }
                `}>
                  {selectedAnswer || '_____'}
                </div>
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-success">
                  <CheckCircle className="w-8 h-8" />
                  <span>Excellent! 🎉</span>
                </div>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-success hover:opacity-90 text-white font-semibold py-3 px-8 text-lg"
                >
                  {currentQuestionIndex < game.questions.length - 1 ? 'Next Question' : 'Finish Game'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};