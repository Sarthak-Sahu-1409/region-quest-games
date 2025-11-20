import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region, Language, MatchingQuestion } from '@/types';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface MatchingGameProps {
  game: GameData;
  region: Region;
  language: Language;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface ConnectionLine {
  optionId: string;
  status: 'drawing' | 'correct' | 'wrong';
}

export const MatchingGame = ({ game, region, language, onBack, onComplete }: MatchingGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [connection, setConnection] = useState<ConnectionLine | null>(null);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const optionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sentenceRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrongTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const matchingQuestions = game.matchingQuestions || [];
  const currentQuestion = matchingQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / matchingQuestions.length) * 100;

  // Get language-specific content
  const sentence = language === 'bengali' && currentQuestion?.sentenceBengali 
    ? currentQuestion.sentenceBengali 
    : currentQuestion?.sentence || '';
    
  const allOptions = language === 'bengali' && currentQuestion?.optionsBengali 
    ? currentQuestion.optionsBengali 
    : currentQuestion?.options || [];

  // Use all options - each region has its own option even if text is the same
  const options = allOptions;

  // Find the correct option for the current region
  const correctOption = options.find(opt => opt.region === region && opt.isCorrect);

  useEffect(() => {
    // Clear any pending timeout when question changes
    if (wrongTimeoutRef.current) {
      clearTimeout(wrongTimeoutRef.current);
      wrongTimeoutRef.current = null;
    }
    
    // Reset state for new question
    setSelectedOption(null);
    setConnection(null);
    setWrongAttempts([]);
    setIsProcessing(false);
    
    // Clear old refs to prevent conflicts
    optionsRef.current = {};
  }, [currentQuestionIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wrongTimeoutRef.current) {
        clearTimeout(wrongTimeoutRef.current);
      }
    };
  }, []);

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

  const handleOptionClick = (optionId: string) => {
    // Prevent clicks if already answered correctly or processing a wrong answer
    if (connection?.status === 'correct' || isProcessing) return;
    
    // Clear any existing timeout
    if (wrongTimeoutRef.current) {
      clearTimeout(wrongTimeoutRef.current);
      wrongTimeoutRef.current = null;
    }
    
    // Validate correct option exists
    if (!correctOption) {
      console.error('No correct option found for region:', region);
      return;
    }
    
    const isCorrect = optionId === correctOption.id;
    
    setIsProcessing(true);
    setSelectedOption(optionId);
    setConnection({
      optionId: optionId,
      status: isCorrect ? 'correct' : 'wrong'
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
      setIsProcessing(false);
    } else {
      // Track wrong attempts
      setWrongAttempts(prev => {
        // Avoid duplicate entries
        if (prev.includes(optionId)) return prev;
        return [...prev, optionId];
      });
      
      // Clear wrong connection after animation 
      wrongTimeoutRef.current = setTimeout(() => {
        setConnection(null);
        setSelectedOption(null);
        setIsProcessing(false);
        wrongTimeoutRef.current = null;
      }, 800);
    }
  };

  // Remove handleSentenceClick - no longer needed

  const renderConnectionLine = () => {
    if (!connection) return null;

    const sentenceElement = sentenceRef.current;
    const optionElement = optionsRef.current[connection.optionId];

    if (!optionElement || !sentenceElement) return null;

    // Sentence is on left, options on right
    // Connect from right edge of sentence to left edge of option
    const start = getElementRightEdge(sentenceElement);
    const end = getElementLeftEdge(optionElement);

    // Calculate control points for smooth horizontal curve
    const controlPointOffset = Math.abs(end.x - start.x) * 0.5;
    const cp1x = start.x + controlPointOffset;
    const cp1y = start.y;
    const cp2x = end.x - controlPointOffset;
    const cp2y = end.y;

    const pathD = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

    const strokeColor = 
      connection.status === 'correct' ? '#22c55e' : 
      connection.status === 'wrong' ? '#ef4444' : 
      '#3b82f6';

    return (
      <>
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth="4"
          fill="none"
          className={`transition-all duration-300 ${
            connection.status === 'wrong' ? 'animate-pulse' : ''
          }`}
          strokeDasharray={connection.status === 'drawing' ? '5,5' : '0'}
        />
        {/* Start dot at sentence edge */}
        <circle
          cx={start.x}
          cy={start.y}
          r="8"
          fill={strokeColor}
          className="animate-pulse"
        />
        {/* End dot at option edge */}
        <circle
          cx={end.x}
          cy={end.y}
          r="8"
          fill={strokeColor}
          className="animate-pulse"
        />
      </>
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < matchingQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleRestart = () => {
    // Clear any pending timeouts
    if (wrongTimeoutRef.current) {
      clearTimeout(wrongTimeoutRef.current);
      wrongTimeoutRef.current = null;
    }
    
    // Reset all state
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setConnection(null);
    setScore(0);
    setWrongAttempts([]);
    setIsProcessing(false);
    optionsRef.current = {};
  };

  if (!currentQuestion || !correctOption) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <p className="text-lg mb-4">
            {!currentQuestion 
              ? 'No matching questions available.' 
              : `No correct option found for region: ${region}`
            }
          </p>
          <Button onClick={onBack} className="mt-4">Back</Button>
        </Card>
      </div>
    );
  }

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
      <div className="w-full max-w-6xl relative z-20">
        {/* Header */}
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

        {/* Game Card */}
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-sm sm:text-base md:text-lg font-heading text-center">
              Match the Correct Option to the Sentence
            </CardTitle>
            <p className="text-xs sm:text-sm text-center text-muted-foreground mt-1">
              Click an option to connect it to the sentence
            </p>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6 pb-3 sm:pb-6 relative">
            {/* SVG overlay for connector lines - Hidden on mobile, visible on md+ */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              style={{ zIndex: 10 }}
            >
              {renderConnectionLine()}
            </svg>

            {/* Main Layout: Sentence on Left, Options on Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative" style={{ zIndex: 20 }}>
              {/* Mobile: Visual indicator when correct answer is selected */}
              {connection?.status === 'correct' && (
                <div className="md:hidden order-1 mb-2">
                  <div className="bg-success/20 border-2 border-success rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <p className="text-sm font-bold text-success">Correct Match!</p>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  </div>
                </div>
              )}

              {/* Left Column: Sentence */}
              <div className="flex flex-col justify-center order-2 md:order-1">
                <p className="text-xs sm:text-sm font-semibold text-center text-white mb-2">
                  Sentence:
                </p>
                <div
                  ref={sentenceRef}
                  className={`
                    p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg border-4 transition-all duration-200 min-h-[120px] sm:min-h-[150px] md:min-h-[200px] flex items-center justify-center
                    ${connection?.status === 'correct'
                      ? 'bg-success/20 border-success' 
                      : connection?.status === 'wrong'
                      ? 'bg-white/5 border-white/30 border-dashed'
                      : 'bg-white/5 border-white/30 border-dashed'
                    }
                  `}
                >
                  <div className="text-center space-y-1 sm:space-y-2">
                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-relaxed ${
                      connection?.status === 'correct' ? 'text-white' : 'text-white'
                    }`}>
                      {sentence}
                    </p>
                    {!connection && (
                      <p className="text-xs sm:text-sm text-white/70">Click an option to match</p>
                    )}
                    {connection?.status === 'wrong' && (
                      <p className="text-xs sm:text-sm text-white/70">Try another option</p>
                    )}
                    {connection?.status === 'correct' && (
                      <div className="flex justify-center">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-success animate-bounce-in" />
                      </div>
                    )}
                    {connection?.status === 'wrong' && (
                      <div className="flex justify-center">
                        <XCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-destructive animate-shake" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Options */}
              <div className="space-y-2 order-3 md:order-2">
                <p className="text-xs sm:text-sm font-semibold text-center text-white mb-2">
                  Options:
                </p>
                <div className="space-y-2">
                  {options.map((option, index) => {
                    // Generate unique ref key using question index and option index
                    const uniqueRefKey = `q${currentQuestionIndex}-opt${index}`;
                    const isWrongAttempt = wrongAttempts.includes(option.id);
                    const isCorrectConnection = connection?.optionId === option.id && connection.status === 'correct';
                    const isWrongConnection = connection?.optionId === option.id && connection.status === 'wrong';
                    
                    return (
                      <div
                        key={`${currentQuestionIndex}-${option.id}`}
                        ref={(el) => (optionsRef.current[option.id] = el)}
                        onClick={() => handleOptionClick(option.id)}
                        className={`
                          p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all duration-200
                          ${isCorrectConnection
                            ? 'bg-success/20 border-success shadow-lg scale-105 cursor-default' 
                            : isWrongConnection
                            ? 'bg-destructive/20 border-destructive shadow-lg animate-shake cursor-not-allowed'
                            : isWrongAttempt
                            ? 'bg-destructive/10 border-destructive/50 hover:border-destructive cursor-pointer'
                            : 'bg-white/90 border-white/40 hover:border-primary hover:scale-102 cursor-pointer hover:bg-white'
                          }
                          ${connection?.status === 'correct' || isProcessing ? 'pointer-events-none opacity-60' : ''}
                        `}
                      >
                        <p className={`text-xs sm:text-sm md:text-base font-semibold text-center leading-relaxed ${
                          isCorrectConnection ? 'text-white' : isWrongConnection ? 'text-white' : isWrongAttempt ? 'text-white' : 'text-gray-800'
                        }`}>
                          {option.text}
                        </p>
                        {isCorrectConnection && (
                          <div className="flex justify-center mt-2">
                            <CheckCircle className="w-5 h-5 text-success animate-bounce-in" />
                          </div>
                        )}
                        {isWrongConnection && (
                          <div className="flex justify-center mt-2">
                            <XCircle className="w-5 h-5 text-destructive" />
                          </div>
                        )}
                        {isWrongAttempt && !isWrongConnection && (
                          <p className="text-xs text-destructive mt-1 text-center font-medium">Try again</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Feedback */}
            {connection?.status === 'correct' && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm sm:text-base font-bold text-success">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Perfect Match!</span>
                </div>
              </div>
            )}

            {/* Next Button */}
            <div className="text-center">
              <Button 
                onClick={handleNext}
                size="sm"
                className={`bg-gradient-success hover:opacity-90 text-white font-semibold py-2 px-4 sm:px-6 text-sm transition-opacity ${
                  connection?.status === 'correct' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {currentQuestionIndex < matchingQuestions.length - 1 ? 'Next Question' : 'Finish'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
