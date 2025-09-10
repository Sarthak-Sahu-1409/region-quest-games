import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region } from '@/types';
import { CheckCircle, XCircle, RotateCcw, ChevronLeft } from 'lucide-react';

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
          <div className="w-full max-w-md mx-auto mb-6">
            <Progress 
              value={progress} 
              className="h-4 bg-white/20 rounded-full overflow-hidden shadow-lg progress-indicator"
            />
            <div className="flex justify-between text-sm text-white/80 mt-2">
              <span>Progress</span>
              <span className="font-semibold">{currentQuestionIndex + 1} of {game.questions.length}</span>
            </div>
          </div>
          <h1 className="text-4xl font-heading text-white mb-2">
            {game.name}
          </h1>
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
            <div className="flex flex-wrap justify-center gap-4 p-6 bg-muted rounded-xl">
              {currentQuestion.options.map((option, index) => {
                const isWrong = wrongOptions.includes(option);
                const isCorrect = correctOptions.includes(option);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={isWrong || isCorrect}
                    className={`
                      px-8 py-4 rounded-xl font-bold text-xl transition-all duration-200 min-w-[120px]
                      ${isWrong 
                        ? 'bg-destructive/20 text-destructive border-3 border-destructive cursor-not-allowed opacity-60' 
                        : isCorrect
                          ? 'bg-success/20 text-success border-3 border-success cursor-not-allowed'
                          : 'bg-white border-3 border-border hover:border-primary hover:scale-110 hover:shadow-lg cursor-pointer transform'
                      }
                      ${isWrong ? 'animate-shake' : ''}
                    `}
                  >
                    {option}
                    {isWrong && <span className="ml-2">❌</span>}
                    {isCorrect && <span className="ml-2">✅</span>}
                  </button>
                );
              })}
            </div>

            {/* Sentence */}
            <div className="text-center p-8 bg-card rounded-xl border-2">
              <div className="text-3xl leading-relaxed space-x-2 flex flex-wrap justify-center items-center gap-3">
                {/* First part of sentence */}
                <span className="font-bold text-foreground">
                  {currentQuestion.sentence[0]}
                </span>
                
                {/* Blank space with answers above the line */}
                <div className="flex flex-col items-center mx-4">
                  {/* Selected answers displayed above the line */}
                  {selectedAnswers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedAnswers.map((answer, idx) => (
                        <div 
                          key={idx}
                          className="bg-success/20 border-2 border-success text-success font-bold px-4 py-2 rounded-lg text-lg animate-bounce-in"
                        >
                          {answer} ✅
                        </div>
                      ))}
                    </div>
                  )}
                  {/* The blank line */}
                  <div className="w-40 h-1 bg-primary border-2 border-primary rounded-full"></div>
                  {selectedAnswers.length === 0 && (
                    <div className="text-muted-foreground text-lg mt-1">Click an answer above!</div>
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
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-success">
                  <CheckCircle className="w-8 h-8" />
                  <span>Excellent! 🎉</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Fixed Layout */}
            <div className="text-center">
              <div className="grid grid-cols-3 gap-4 items-center max-w-2xl mx-auto min-h-[60px]">
                {/* Previous Button - Always Present Container */}
                <div className="flex justify-start">
                  <Button 
                    onClick={handlePrevious}
                    variant="outline"
                    className={`font-semibold py-3 px-6 text-lg transition-opacity ${
                      currentQuestionIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </Button>
                </div>

                {/* Center Space */}
                <div></div>

                {/* Next Button - Always Present Container */}
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext}
                    className={`bg-gradient-success hover:opacity-90 text-white font-semibold py-3 px-8 text-lg transition-opacity ${
                      showFeedback ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {currentQuestionIndex < game.questions.length - 1 ? 'Next Question' : 'Finish Game'}
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