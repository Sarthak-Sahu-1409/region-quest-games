import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region, Language } from '@/types';
import { ChevronLeft, ChevronRight, ArrowLeft, GraduationCap, FileText, CheckCircle } from 'lucide-react';

interface TeacherQuestionViewProps {
  game: GameData;
  region: Region;
  language: Language;
  onBack: () => void;
}

export const TeacherQuestionView = ({ game, region, language, onBack }: TeacherQuestionViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const isMatchingGame = game.type === 'matching';
  const totalQuestions = isMatchingGame 
    ? (game.matchingQuestions?.length || 0)
    : game.questions.length;
  
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // For matching questions
  if (isMatchingGame && game.matchingQuestions) {
    const currentMatchingQuestion = game.matchingQuestions[currentQuestionIndex];
    const options = language === 'bengali' && currentMatchingQuestion?.optionsBengali 
      ? currentMatchingQuestion.optionsBengali 
      : currentMatchingQuestion?.options || [];
    const correctOption = options.find(opt => opt.region === region && opt.isCorrect);

    const handleNext = () => {
      if (currentQuestionIndex < totalQuestions - 1) {
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
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="w-full max-w-5xl relative z-20">
          <header className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 backdrop-blur-md rounded-xl mb-3 border border-secondary/20 shadow-md">
              <GraduationCap className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white mb-2 tracking-tight">
              {game.name}
            </h1>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-3 px-4">
              Teacher View - Matching Question Review with Answer Keys
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/40 text-xs">
              <FileText className="w-3 h-3 text-secondary" />
              <span className="font-medium text-white">Answer Key Mode</span>
            </div>
          </header>

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
                {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
              <div className="w-[100px] sm:block hidden" />
            </div>
            <div className="w-full max-w-xs sm:max-w-md mx-auto">
              <Progress 
                value={progress} 
                className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg"
              />
              <div className="flex justify-between text-xs text-white/80 mt-1.5">
                <span>Progress</span>
                <span className="font-semibold">{currentQuestionIndex + 1} of {totalQuestions}</span>
              </div>
            </div>
          </div>

          <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl font-heading text-center">
                Matching Question {currentQuestionIndex + 1}
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Review mode - Correct answer for your region is highlighted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
              {/* All Options in 2-Column Grid - Teacher View */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-center text-foreground font-semibold">
                  All Available Options (Correct answer is highlighted):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className={`
                        p-3 sm:p-4 rounded-lg border-2 text-center
                        ${option.id === correctOption?.id
                          ? 'bg-success/20 border-success'
                          : 'bg-card/80 border-border'
                        }
                      `}
                    >
                      <p className={`text-sm sm:text-base font-semibold leading-relaxed ${
                        option.id === correctOption?.id ? 'text-white' : 'text-black'
                      }`}>
                        {option.text}
                      </p>
                      {option.id === correctOption?.id && (
                        <span className="text-xl mt-2 block">✅</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image and Drop Zone Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Image on Left */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">Image:</p>
                  <div className="relative w-full aspect-video bg-card border-2 border-border rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={currentMatchingQuestion.image} 
                      alt="Matching question"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Correct Answer Display on Right */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">Correct Answer for {region}:</p>
                  <div className="relative w-full aspect-video bg-success/10 border-4 border-success rounded-lg flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
                    <div className="text-center p-3 sm:p-4">
                      <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-success mx-auto mb-3" />
                      <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                        {correctOption?.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs sm:text-sm text-foreground opacity-80 text-center">
                ✨ Correct answer for {region} is pre-marked with a checkmark
              </div>

              {/* Navigation Buttons */}
              <div className="text-center">
                <div className="flex justify-between items-center gap-2 max-w-lg mx-auto min-h-[40px]">
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

                  <div className="text-sm font-semibold text-on-dark">
                    {currentQuestionIndex + 1} / {totalQuestions}
                  </div>

                  <div className="flex-1 flex justify-end">
                    <Button 
                      onClick={handleNext}
                      size="sm"
                      disabled={currentQuestionIndex === totalQuestions - 1}
                      className={`bg-gradient-success hover:opacity-90 text-white font-semibold py-2 px-3 text-xs sm:text-sm ${
                        currentQuestionIndex === totalQuestions - 1 ? 'opacity-50 cursor-not-allowed' : ''
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
  }

  // For fill-blank questions
  const currentQuestion = game.questions[currentQuestionIndex];
  const fillBlankProgress = ((currentQuestionIndex + 1) / game.questions.length) * 100;

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
              value={fillBlankProgress} 
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
