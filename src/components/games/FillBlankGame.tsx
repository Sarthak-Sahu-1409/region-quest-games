import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region } from '@/types';
import { CheckCircle, XCircle, RotateCcw, ChevronLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface FillBlankGameProps {
  game: GameData;
  region: Region;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const FillBlankGame = ({ game, region, onBack, onComplete }: FillBlankGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [wrongOptions, setWrongOptions] = useState<string[]>([]);
  const [correctOptions, setCorrectOptions] = useState<string[]>([]);

  const currentQuestion = game.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / game.questions.length) * 100;

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswers([]);
    setShowFeedback(false);
    setAnsweredCorrectly(false);
    setWrongOptions([]);
    setCorrectOptions([]);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option: string) => {
    if (wrongOptions.includes(option) || correctOptions.includes(option)) return;

    const isCorrect = currentQuestion.blank.correctAnswers.includes(option);
    
    if (isCorrect) {
      setSelectedAnswers(prev => [...prev, option]);
      setCorrectOptions(prev => [...prev, option]);
      setShowFeedback(true);
      setAnsweredCorrectly(true);
      // Increment score only once per question when first correct answer is selected
      if (!answeredCorrectly) {
        setScore(prev => prev + 1);
      }
    } else {
      // Wrong answer - mark as permanently wrong
      setWrongOptions(prev => [...prev, option]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setAnsweredCorrectly(false);
    setWrongOptions([]);
    setCorrectOptions([]);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden"
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
        {/* Header */}
        <div className="text-center mb-2 sm:mb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="bg-card/80 border-2 border-border hover:bg-accent/20 text-xs px-3 py-1.5"
            >
              ← Back
            </Button>
            <Badge variant="outline" className="bg-card/80 border-2 border-border text-xs">
              {currentQuestionIndex + 1} of {game.questions.length}
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="bg-card/80 border-2 border-border hover:bg-accent/20 text-xs px-3 py-1.5"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Restart
            </Button>
          </div>
          <div className="w-full max-w-xs sm:max-w-md mx-auto mb-2 sm:mb-3">
            <Progress 
              value={progress} 
              className="h-2 bg-muted rounded-full overflow-hidden shadow-lg progress-indicator"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Progress</span>
              <span className="font-semibold">{currentQuestionIndex + 1} of {game.questions.length}</span>
            </div>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-heading text-foreground mb-1">
            {game.name}
          </h1>
        </div>

        {/* Game Card */}
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg font-heading text-center">
              Fill in the Blank
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Options */}
            <div className="flex flex-wrap justify-center gap-2 p-2 sm:p-3 bg-muted rounded-lg">
              {currentQuestion.options.map((option, index) => {
                const isWrong = wrongOptions.includes(option);
                const isCorrect = correctOptions.includes(option);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={isWrong || isCorrect}
                    className={`
                      px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 min-w-[70px] sm:min-w-[90px]
                      ${
isWrong 
                        ? 'bg-destructive/20 text-destructive border-2 border-destructive cursor-not-allowed opacity-60' 
                        : isCorrect
                          ? 'bg-success/20 text-success border-2 border-success cursor-not-allowed'
                          : 'bg-card text-card-foreground border-2 border-border hover:border-primary hover:scale-105 hover:shadow-lg cursor-pointer transform hover:bg-accent/20'
                      }
                      ${isWrong ? 'animate-shake' : ''}
                    `}
                  >
                    {option}
                    {isWrong && <span className="ml-1">❌</span>}
                    {isCorrect && <span className="ml-1">✅</span>}
                  </button>
                );
              })}
            </div>

            {/* Sentence */}
            <div className="text-center p-3 sm:p-4 bg-card rounded-lg border-2">
              <div className="text-base sm:text-lg md:text-xl leading-relaxed space-x-1 flex flex-wrap justify-center items-center gap-2">
                {/* First part of sentence */}
                <span className="font-bold text-foreground">
                  {currentQuestion.sentence[0]}
                </span>
                
                {/* Blank space with answers above the line */}
                <div className="flex flex-col items-center mx-2">
                  {/* Selected answers displayed above the line */}
                  {selectedAnswers.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {selectedAnswers.map((answer, idx) => (
                        <div 
                          key={idx}
                          className="bg-success/20 border-2 border-success text-success font-bold px-2 py-1 rounded text-xs sm:text-sm animate-bounce-in"
                        >
                          {answer} ✅
                        </div>
                      ))}
                    </div>
                  )}
                  {/* The blank line */}
                  <div className="w-20 sm:w-28 h-1 bg-primary border-2 border-primary rounded-full"></div>
                  {selectedAnswers.length === 0 && (
                    <div className="text-muted-foreground text-xs sm:text-sm mt-1">Click an answer above!</div>
                  )}
                </div>

                {/* Second part of sentence (if exists) */}
                {currentQuestion.sentence[1] && (
                  <span className="font-bold text-foreground">
                    {currentQuestion.sentence[1]}
                  </span>
                )}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2 text-base sm:text-lg font-bold text-success">
                  <CheckCircle className="w-5 h-5" />
                  <span>Excellent! 🎉</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Fixed Layout */}
            <div className="text-center">
              <div className="flex justify-between items-center gap-2 max-w-lg mx-auto min-h-[40px]">
                {/* Previous Button - Always Present Container */}
                <div className="flex-1 flex justify-start">
                  <Button 
                    onClick={handlePrevious}
                    variant="outline"
                    size="sm"
                    className={`font-semibold py-2 px-3 text-xs sm:text-sm transition-opacity ${
                      currentQuestionIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                </div>

                {/* Next Button - Always Present Container */}
                <div className="flex-1 flex justify-end">
                  <Button 
                    onClick={handleNext}
                    size="sm"
                    className={`bg-gradient-success hover:opacity-90 text-white font-semibold py-2 px-3 text-xs sm:text-sm transition-opacity ${
                      showFeedback ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {currentQuestionIndex < game.questions.length - 1 ? 'Next' : 'Finish'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};