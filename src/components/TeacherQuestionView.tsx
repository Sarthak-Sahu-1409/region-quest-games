import { useState, useRef, useEffect, useMemo } from 'react';
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
  const [forceUpdate, setForceUpdate] = useState(0);
  const optionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sentenceRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const isMatchingGame = game.type === 'matching';
  const totalQuestions = isMatchingGame 
    ? (game.matchingQuestions?.length || 0)
    : game.questions.length;
  
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // For matching questions
  if (isMatchingGame && game.matchingQuestions) {
    const currentMatchingQuestion = game.matchingQuestions[currentQuestionIndex];
    
    // Get language-specific content
    const sentence = language === 'bengali' && currentMatchingQuestion?.sentenceBengali 
      ? currentMatchingQuestion.sentenceBengali 
      : currentMatchingQuestion?.sentence || '';
    
    const allOptions = language === 'bengali' && currentMatchingQuestion?.optionsBengali 
      ? currentMatchingQuestion.optionsBengali 
      : currentMatchingQuestion?.options || [];
    
    // Shuffle options randomly for each question
    const options = useMemo(() => {
      return [...allOptions].sort(() => Math.random() - 0.5);
    }, [currentQuestionIndex, language]);
    
    const correctOption = options.find(opt => opt.region === region && opt.isCorrect);

    // Force re-render when refs are populated to ensure SVG line draws
    useEffect(() => {
      const timer = setTimeout(() => {
        setForceUpdate(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }, [currentQuestionIndex]);

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

    const getElementRightEdge = (element: HTMLDivElement | null) => {
      if (!element) return { x: 0, y: 0 };
      const rect = element.getBoundingClientRect();
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return { x: 0, y: 0 };
      
      return {
        x: rect.right - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top
      };
    };

    const getElementLeftEdge = (element: HTMLDivElement | null) => {
      if (!element) return { x: 0, y: 0 };
      const rect = element.getBoundingClientRect();
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return { x: 0, y: 0 };
      
      return {
        x: rect.left - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top
      };
    };

    const renderConnectionLine = () => {
      if (!correctOption) return null;

      const sentenceElement = sentenceRef.current;
      const optionElement = optionsRef.current[correctOption.id];

      if (!optionElement || !sentenceElement) return null;

      const start = getElementRightEdge(sentenceElement);
      const end = getElementLeftEdge(optionElement);

      const controlPointOffset = Math.abs(end.x - start.x) * 0.5;
      const cp1x = start.x + controlPointOffset;
      const cp1y = start.y;
      const cp2x = end.x - controlPointOffset;
      const cp2y = end.y;

      const pathD = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

      return (
        <g key="connection-line">
          <path
            d={pathD}
            stroke="#22c55e"
            strokeWidth="6"
            fill="none"
            className="transition-all duration-300"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={start.x}
            cy={start.y}
            r="10"
            fill="#22c55e"
            className="animate-pulse"
          />
          <circle
            cx={end.x}
            cy={end.y}
            r="10"
            fill="#22c55e"
            className="animate-pulse"
          />
        </g>
      );
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
        <div className="w-full max-w-5xl relative z-20 px-2 sm:px-0">
          <header className="text-center mb-3 sm:mb-4 md:mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 backdrop-blur-md rounded-xl mb-2 sm:mb-3 border border-secondary/20 shadow-md">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-white mb-1 sm:mb-2 tracking-tight">
              {game.name}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto mb-2 sm:mb-3 px-2 sm:px-4">
              Teacher View - Matching Question Review with Answer Keys
            </p>
            <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-secondary/30 backdrop-blur-sm rounded-full border border-secondary/50 text-xs">
              <FileText className="w-3 h-3 text-white" />
              <span className="font-medium text-white text-xs sm:text-sm">Answer Key Mode</span>
            </div>
          </header>

          <div className="mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3 gap-2">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 font-semibold w-full sm:w-auto"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Back to Games
              </Button>
              <Badge variant="outline" className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5">
                {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
              <div className="w-[100px] sm:block hidden" />
            </div>
            <div className="w-full max-w-xs sm:max-w-md mx-auto px-2 sm:px-0">
              <Progress 
                value={progress} 
                className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg"
              />
              <div className="flex justify-between text-xs text-white/80 mt-1 sm:mt-1.5">
                <span>Progress</span>
                <span className="font-semibold">{currentQuestionIndex + 1} of {totalQuestions}</span>
              </div>
            </div>
          </div>

          <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
            <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
              <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-center">
                Matching Question {currentQuestionIndex + 1}
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                Review mode - Correct answer for your region is highlighted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 px-3 sm:px-6 pb-3 sm:pb-6 relative">
              {/* Layout: Sentence on Left, Options on Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative" style={{ zIndex: 1 }}>
                {/* SVG overlay for connector lines - Hidden on mobile, visible on md+ */}
                <svg
                  ref={svgRef}
                  className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                  style={{ zIndex: 5 }}
                >
                  {renderConnectionLine()}
                </svg>

                {/* Mobile: Visual indicator showing correct answer */}
                <div className="md:hidden order-1 mb-2">
                  <div className="bg-success/20 border-2 border-success rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <p className="text-sm font-bold text-success">Answer Key View</p>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  </div>
                </div>

                {/* Left Column: Sentence */}
                <div className="flex flex-col justify-center order-2 md:order-1">
                  <p className="text-xs sm:text-sm font-semibold text-center text-white mb-2">
                    Sentence:
                  </p>
                  <div 
                    ref={sentenceRef}
                    className="p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg border-4 bg-success/10 border-success transition-all duration-200 min-h-[120px] sm:min-h-[150px] md:min-h-[200px] flex items-center justify-center"
                  >
                    <div className="text-center">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white leading-relaxed">
                        {sentence}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Options */}
                <div className="space-y-2 order-3 md:order-2">
                  <p className="text-xs sm:text-sm font-semibold text-center text-white mb-2">
                    Options:
                  </p>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div
                        key={`${currentQuestionIndex}-${option.id}`}
                        ref={(el) => (optionsRef.current[option.id] = el)}
                        className={`
                          p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all duration-200
                          ${option.id === correctOption?.id
                            ? 'bg-success/20 border-success shadow-lg' 
                            : 'bg-white/90 border-white/40'
                          }
                        `}
                      >
                        <p className={`text-xs sm:text-sm md:text-base font-semibold text-center leading-relaxed ${
                          option.id === correctOption?.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {option.text}
                        </p>
                        {option.id === correctOption?.id && (
                          <div className="flex justify-center mt-2">
                            <CheckCircle className="w-5 h-5 text-success" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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

                  <div className="text-sm font-semibold text-white">
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
      <div className="w-full max-w-4xl relative z-20 px-2 sm:px-0">
        {/* Professional Header - Matching Student Portal Theme */}
        <header className="text-center mb-3 sm:mb-4 md:mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 backdrop-blur-md rounded-xl mb-2 sm:mb-3 border border-secondary/20 shadow-md">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-white mb-1 sm:mb-2 tracking-tight">
            {game.name}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto mb-2 sm:mb-3 px-2 sm:px-4">
            Teacher View - Question Review with Answer Keys
          </p>
          <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/40 text-xs">
            <FileText className="w-3 h-3 text-secondary" />
            <span className="font-medium text-white text-xs sm:text-sm">Answer Key Mode</span>
          </div>
        </header>

        {/* Navigation and Progress */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3 gap-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 font-semibold w-full sm:w-auto"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Games
            </Button>
            <Badge variant="outline" className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5">
              {currentQuestionIndex + 1} of {game.questions.length}
            </Badge>
            <div className="w-[100px] sm:block hidden" /> {/* Spacer for symmetry */}
          </div>
          <div className="w-full max-w-xs sm:max-w-md mx-auto px-2 sm:px-0">
            <Progress 
              value={fillBlankProgress} 
              className="h-2 bg-white/20 rounded-full overflow-hidden shadow-lg"
            />
            <div className="flex justify-between text-xs text-white/80 mt-1 sm:mt-1.5">
              <span>Progress</span>
              <span className="font-semibold">{currentQuestionIndex + 1} of {game.questions.length}</span>
            </div>
          </div>
        </div>

        {/* Game Card - Matching Student Portal Theme */}
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
          <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
            <CardTitle className="text-base sm:text-lg md:text-xl font-heading text-center">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm">
              Review mode - Correct answers are pre-highlighted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* All Available Options - Display Only */}
            <div className="p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-xs sm:text-sm font-semibold text-white mb-2 text-center">
                Available Options:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {options.map((option, index) => {
                  const isCorrect = correctAnswers.includes(option);
                  
                  return (
                    <div
                      key={index}
                      className={`
                        px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg font-bold text-xs sm:text-sm md:text-base border-2 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] text-center
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
            <div className="text-center p-3 sm:p-4 md:p-6 bg-white/95 rounded-lg border-2 border-white/40 shadow-lg">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed flex flex-wrap justify-center items-center gap-2">
                {/* First part of sentence */}
                <span className="font-bold text-gray-900">
                  {sentence[0]}
                </span>
                
                {/* Correct answers displayed in green box */}
                <div className="inline-flex flex-wrap gap-1 mx-1 sm:mx-2">
                  {correctAnswers.map((answer, idx) => (
                    <div 
                      key={idx}
                      className="bg-success/30 border-2 border-success text-success font-bold px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm md:text-base inline-block"
                    >
                      {answer}
                    </div>
                  ))}
                </div>

                {/* Second part of sentence (if exists) */}
                {sentence[1] && (
                  <span className="font-bold text-gray-900">
                    {sentence[1]}
                  </span>
                )}
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
                <div className="text-sm font-semibold text-white">
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
