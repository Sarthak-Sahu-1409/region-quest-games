import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region, Language, MatchingQuestion } from '@/types';
import { CheckCircle, XCircle, RotateCcw, SkipForward } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface MatchingGameProps {
  game: GameData;
  region: Region;
  language: Language;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const MatchingGame = ({ game, region, language, onBack, onComplete }: MatchingGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [draggedOption, setDraggedOption] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [canSkip, setCanSkip] = useState(false);

  const matchingQuestions = game.matchingQuestions || [];
  const currentQuestion = matchingQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / matchingQuestions.length) * 100;

  // Get language-specific options
  const options = language === 'bengali' && currentQuestion?.optionsBengali 
    ? currentQuestion.optionsBengali 
    : currentQuestion?.options || [];

  // Find the correct option for the current region
  const correctOption = options.find(opt => opt.region === region && opt.isCorrect);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setDraggedOption(null);
    setWrongAttempts(new Set());
    setCanSkip(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionId: string) => {
    // Prevent selecting if already correct or if this option was already tried
    if (isCorrect || (wrongAttempts.has(optionId) && selectedAnswer !== optionId)) {
      return;
    }

    // If clicking the same wrong answer again, do nothing
    if (selectedAnswer === optionId && !isCorrect) {
      return;
    }

    if (!correctOption) return;

    setSelectedAnswer(optionId);
    const correct = optionId === correctOption.id;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    } else {
      // Add to wrong attempts
      setWrongAttempts(prev => new Set([...prev, optionId]));
      
      // Enable skip after 2 wrong attempts
      if (wrongAttempts.size >= 1) {
        setCanSkip(true);
      }
    }
  };

  const handleDragStart = (optionId: string) => {
    // Prevent dragging if already correct or if this option was already tried
    if (isCorrect || wrongAttempts.has(optionId)) {
      return;
    }
    setDraggedOption(optionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedOption && correctOption && !wrongAttempts.has(draggedOption)) {
      handleOptionSelect(draggedOption);
    }
    setDraggedOption(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex < matchingQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      handleNext();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setScore(0);
    setWrongAttempts(new Set());
    setCanSkip(false);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        <Card className="p-6 text-center relative z-20 border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
          <p className="text-lg">No matching questions available.</p>
          <Button onClick={onBack} className="mt-4">Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-6xl relative z-20">
        {/* Compact Header for Mobile */}
        <div className="text-center mb-2 sm:mb-4">
          <div className="flex flex-row items-center justify-between mb-2 gap-1 sm:gap-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2 font-semibold h-8 sm:h-auto"
            >
              ← Back
            </Button>
            <Badge variant="outline" className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-xs font-semibold px-2 py-1">
              {currentQuestionIndex + 1}/{matchingQuestions.length}
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2 font-semibold h-8 sm:h-auto"
            >
              <RotateCcw className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Restart</span>
            </Button>
          </div>
          <div className="w-full max-w-xs sm:max-w-md mx-auto mb-2">
            <Progress 
              value={progress} 
              className="h-2 bg-muted rounded-full overflow-hidden shadow-lg progress-indicator"
            />
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>Progress</span>
              <span className="font-semibold">{currentQuestionIndex + 1} of {matchingQuestions.length}</span>
            </div>
          </div>
          <h1 className="text-base sm:text-lg md:text-xl font-heading text-foreground mb-1">
            {game.name}
          </h1>
        </div>

        {/* Game Card - Optimized for Mobile */}
        <Card className="shadow-large border-2 border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/75 dark:bg-card/75">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-sm sm:text-base font-heading text-center">
              {isCorrect 
                ? "Correct! 🎉" 
                : showFeedback && !isCorrect
                ? "Try Again!"
                : "Match the Image with the Correct Description"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
            {/* Image and Drop Zone Side by Side - Mobile Stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Image on Left (Top on Mobile) */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Image:</p>
                <div className="relative w-full aspect-video bg-card border-2 border-border rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={currentQuestion.image} 
                    alt="Match this"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Drop Zone on Right (Bottom on Mobile) */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground">Your Answer:</p>
                <div 
                  className="relative w-full aspect-video bg-muted/20 border-4 border-dashed border-primary rounded-lg flex items-center justify-center min-h-[150px] sm:min-h-[200px] transition-all duration-200 hover:bg-muted/30 touch-manipulation"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {!selectedAnswer ? (
                    <div className="text-center p-3 sm:p-4">
                      <div className="text-3xl sm:text-4xl mb-2">👇</div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
                        Click or drag an option below
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-3 sm:p-4">
                      {isCorrect ? (
                        <div className="space-y-2">
                          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-success mx-auto animate-bounce-in" />
                          <p className="text-sm sm:text-base font-bold text-success">Perfect Match! 🎉</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-destructive mx-auto animate-shake" />
                          <p className="text-sm sm:text-base font-bold text-destructive">Not Quite!</p>
                          <Button 
                            onClick={handleTryAgain}
                            size="sm"
                            variant="outline"
                            className="mt-2"
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selectable Options at Bottom - 2 Column Grid */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-center text-foreground font-semibold">
                {isCorrect 
                  ? "✅ You got it right!" 
                  : showFeedback && !isCorrect
                  ? "❌ Pick a different option:"
                  : "Select the correct description:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {options.map((option) => {
                  const isWrongAttempt = wrongAttempts.has(option.id);
                  const isCurrentSelection = selectedAnswer === option.id;
                  const isDisabled = (isCorrect && !isCurrentSelection) || isWrongAttempt;
                  
                  return (
                    <button
                      key={option.id}
                      draggable={!isDisabled && !isCorrect}
                      onDragStart={() => handleDragStart(option.id)}
                      onClick={() => !isDisabled && handleOptionSelect(option.id)}
                      disabled={isDisabled}
                      className={`
                        p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-center touch-manipulation
                        ${draggedOption === option.id ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                        ${isCurrentSelection && isCorrect
                          ? 'bg-success/20 border-success cursor-default shadow-lg' 
                          : isWrongAttempt
                          ? 'bg-destructive/10 border-destructive/50 cursor-not-allowed opacity-60'
                          : isDisabled
                          ? 'bg-muted/50 border-muted cursor-not-allowed opacity-50'
                          : 'bg-card/80 border-border cursor-pointer hover:border-primary hover:scale-102 hover:shadow-lg active:scale-98'
                        }
                      `}
                    >
                      <p className={`text-sm sm:text-base font-semibold leading-relaxed ${
                        isCurrentSelection && isCorrect ? 'text-success' : 'text-foreground'
                      }`}>
                        {option.text}
                      </p>
                      {isCurrentSelection && isCorrect && (
                        <span className="text-xl mt-2 block">✅</span>
                      )}
                      {isWrongAttempt && (
                        <span className="text-xs text-destructive mt-1 block font-medium">Already tried ❌</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {canSkip && !isCorrect && (
                <Button 
                  onClick={handleSkip}
                  size="sm"
                  variant="outline"
                  className="font-semibold"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Skip
                </Button>
              )}
              
              {isCorrect && (
                <Button 
                  onClick={handleNext}
                  size="sm"
                  className="bg-gradient-success hover:opacity-90 text-white font-semibold py-2 px-4 sm:px-6 text-sm"
                >
                  {currentQuestionIndex < matchingQuestions.length - 1 ? 'Next Question →' : 'Finish 🎉'}
                </Button>
              )}
            </div>

            {/* Helper Text */}
            {wrongAttempts.size > 0 && !isCorrect && (
              <p className="text-xs text-center text-muted-foreground">
                {wrongAttempts.size === 1 
                  ? "You've tried 1 option. Keep going!" 
                  : `You've tried ${wrongAttempts.size} options. ${canSkip ? 'You can skip if needed.' : ''}`}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
