import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region, Language } from '@/types';
import { ChevronLeft, ChevronRight, ArrowLeft, GraduationCap, FileText } from 'lucide-react';

interface TeacherQuestionViewProps {
  game: GameData;
  region: Region;
  language: Language;
  onBack: () => void;
}

export const TeacherQuestionView = ({ game, region, language, onBack }: TeacherQuestionViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = game.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / game.questions.length) * 100;

  // Get language-specific content
  const options = language === 'bengali' && currentQuestion.optionsBengali 
    ? currentQuestion.optionsBengali 
    : currentQuestion.options;
  const sentence = language === 'bengali' && currentQuestion.sentenceBengali 
    ? currentQuestion.sentenceBengali 
    : currentQuestion.sentence;
  const correctAnswers = language === 'bengali' && currentQuestion.blankBengali 
    ? currentQuestion.blankBengali.correctAnswers 
    : currentQuestion.blank.correctAnswers;

  const handleNext = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
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
      <div className="w-full max-w-4xl relative z-20">
        {/* Professional Header - Matching Student Portal Theme */}
        <header className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 backdrop-blur-md rounded-xl mb-3 border border-secondary/20 shadow-md">
            <GraduationCap className="w-6 h-6 text-secondary" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white mb-2 tracking-tight">
            {game.name}
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-3 px-4">
            Teacher View - Question Review with Answer Keys
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/40 text-xs">
            <FileText className="w-3 h-3 text-secondary" />
            <span className="font-medium text-white">Answer Key Mode</span>
          </div>
        </header>

        {/* Navigation and Progress */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 font-semibold"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Games
            </Button>
            <Badge variant="outline" className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-xs sm:text-sm font-semibold px-3 py-1.5">
              {currentQuestionIndex + 1} of {game.questions.length}
            </Badge>
            <div className="w-[100px] sm:block hidden" /> {/* Spacer for symmetry */}
          </div>
          <div className="w-full max-w-xs sm:max-w-md mx-auto">
            <Progress 
              value={progress} 
              className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg"
            />
            <div className="flex justify-between text-xs text-white/80 mt-1.5">
              <span>Progress</span>
              <span className="font-semibold">{currentQuestionIndex + 1} of {game.questions.length}</span>
            </div>
          </div>
        </div>

        {/* Game Card - Matching Student Portal Theme */}
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl font-heading text-center">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Review mode - Correct answers are pre-highlighted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* All Available Options - Display Only */}
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <div className="text-xs sm:text-sm font-semibold text-on-light opacity-70 mb-2 text-center">
                Available Options:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {options.map((option, index) => {
                  const isCorrect = correctAnswers.includes(option);
                  
                  return (
                    <div
                      key={index}
                      className={`
                        px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-sm sm:text-base border-2 min-w-[70px] sm:min-w-[90px] text-center
                        ${
                          isCorrect
                            ? 'bg-success/20 text-success border-success'
                            : 'bg-card border-border text-on-light'
                        }
                      `}
                    >
                      {option}
                      {isCorrect && <span className="ml-1">✅</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sentence with Correct Answers Pre-filled */}
            <div className="text-center p-4 sm:p-6 bg-card rounded-lg border-2 border-border">
              <div className="text-base sm:text-lg md:text-xl leading-relaxed flex flex-wrap justify-center items-center gap-2">
                {/* First part of sentence */}
                <span className="font-bold text-on-light">
                  {sentence[0]}
                </span>
                
                {/* Correct answers displayed in green box */}
                <div className="inline-flex flex-wrap gap-1 mx-2">
                  {correctAnswers.map((answer, idx) => (
                    <div 
                      key={idx}
                      className="bg-success/30 border-2 border-success text-success font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base inline-block"
                    >
                      {answer} ✅
                    </div>
                  ))}
                </div>

                {/* Second part of sentence (if exists) */}
                {sentence[1] && (
                  <span className="font-bold text-on-light">
                    {sentence[1]}
                  </span>
                )}
              </div>
              
              <div className="mt-4 text-xs sm:text-sm text-on-light opacity-60">
                ✨ Correct answers are highlighted in green
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="text-center">
              <div className="flex justify-between items-center gap-2 max-w-lg mx-auto min-h-[40px]">
                {/* Previous Button */}
                <div className="flex-1 flex justify-start">
                  <Button 
                    onClick={handlePrevious}
                    variant="outline"
                    size="sm"
                    disabled={currentQuestionIndex === 0}
                    className={`font-semibold py-2 px-3 text-xs sm:text-sm ${
                      currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                </div>

                {/* Question Counter */}
                <div className="text-sm font-semibold text-on-dark">
                  {currentQuestionIndex + 1} / {game.questions.length}
                </div>

                {/* Next Button */}
                <div className="flex-1 flex justify-end">
                  <Button 
                    onClick={handleNext}
                    size="sm"
                    disabled={currentQuestionIndex === game.questions.length - 1}
                    className={`bg-gradient-success hover:opacity-90 text-white font-semibold py-2 px-3 text-xs sm:text-sm ${
                      currentQuestionIndex === game.questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
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
