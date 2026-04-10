import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GameData, Region, Language } from '@/types';
import { RotateCcw, ArrowLeft, GripVertical } from 'lucide-react';
import { GAME_BACKGROUND_STYLE } from '@/lib/styles';

// ──────────────────────────────────────────────────────────
// Hangman data sourced from Hangman.txt — per-region questions
// 2-3 blanks per sentence, with relevant distractors from same region
// ──────────────────────────────────────────────────────────
interface HangmanQuestion {
  id: string;
  sentence: string;         // Sentence with ___ markers for blanks
  english: string;          // English translation (always shown)
  correctWords: string[];   // One per blank, in order
  distractors: string[];    // Wrong options from same dialect
}

const HANGMAN_DATA: Record<Region, HangmanQuestion[]> = {
  'north-bengal-1': [
    {
      id: 'nb1-h1',
      sentence: 'mui ___ bhɑt ___.',
      english: 'I eat rice every day',
      correctWords: ['potidin', 'khan'],
      distractors: ['sokale', 'kobe', 'jabe'],
    },
    {
      id: 'nb1-h2',
      sentence: 'cenrata ___ agot ___ ___.',
      english: 'The box was opened two days before yesterday',
      correctWords: ['duidin', 'bakshota', 'khulil'],
      distractors: ['khan', 'potidin'],
    },
    {
      id: 'nb1-h3',
      sentence: 'kɑli ___ cenrIta ___ ___.',
      english: 'Yesterday morning she/he went to the jungle',
      correctWords: ['sokale', 'jongolot', 'jabe'],
      distractors: ['duphure', 'khulil'],
    },
    {
      id: 'nb1-h4',
      sentence: 'obhoy kali ___ gan ___.',
      english: 'Abhoy sang songs yesterday afternoon',
      correctWords: ['duphure', 'kobe'],
      distractors: ['sokale', 'jongolot', 'khan'],
    },
  ],
  'north-bengal-2': [
    {
      id: 'nb2-h1',
      sentence: '___ dui ___ bhɑt khat ___.',
      english: "Yesterday I was eating rice at two o'clock",
      correctWords: ['kɑil', 'baje', 'rahlon'],
      distractors: ['geichil', 'paru'],
    },
    {
      id: 'nb2-h2',
      sentence: 'ager ___ uma ___ ___.',
      english: 'Last week Uma had gone to Siliguri',
      correctWords: ['shɔptahe', 'shliguri', 'geichil'],
      distractors: ['rahlon', 'kɑil'],
    },
    {
      id: 'nb2-h3',
      sentence: 'kail ___ chor ___ ___.',
      english: 'Yesterday they caught the thief',
      correctWords: ['ugo', 'dʰair', 'rahlak'],
      distractors: ['paru', 'baje'],
    },
    {
      id: 'nb2-h4',
      sentence: 'mui ___ gaba ___.',
      english: 'I can sing songs',
      correctWords: ['gan', 'paru'],
      distractors: ['ugo', 'rahlak', 'geichil'],
    },
  ],
  'south-west-bengal-1': [
    {
      id: 'swb1-h1',
      sentence: 'u ___ khanyor ___ kamta ___.',
      english: 'He/she always works quietly in the middle of eating',
      correctWords: ['chautuya', 'moddhei', 'nibhryabak'],
      distractors: ['kurit', 'khosanak'],
    },
    {
      id: 'swb1-h2',
      sentence: 'chautuya ___ agui ___ ___.',
      english: 'The bark of the tree was peeled two days before yesterday',
      correctWords: ['duidin', 'baskata', 'khosanak'],
      distractors: ['ruhinya', 'moddhei'],
    },
    {
      id: 'swb1-h3',
      sentence: 'tum ___ razot ___ ___.',
      english: 'You all stayed awake at night',
      correctWords: ['sobai', 'kurit', 'ruhinya'],
      distractors: ['nibhryabak', 'baskata'],
    },
    {
      id: 'swb1-h4',
      sentence: 'kanhiror ___ uga sɔbai pej ___ ___.',
      english: 'Yesterday afternoon they all were eating gruel',
      correctWords: ['dupohore', 'khate', 'rɔhnei'],
      distractors: ['sobai', 'duidin'],
    },
  ],
  'south-west-bengal-2': [
    {
      id: 'swb2-h1',
      sentence: 'u kaner ___ kamta ___ ___.',
      english: 'He/she works in the midst of eating',
      correctWords: ['moddhe', 'kurit', 'pattek'],
      distractors: ['jay', 'korbek'],
    },
    {
      id: 'swb2-h2',
      sentence: 'u ___ sokare ___ ___.',
      english: 'He/she could not come in the morning yesterday',
      correctWords: ['kainke', 'asit', 'parbyɛk'],
      distractors: ['pattek', 'moddhe'],
    },
    {
      id: 'swb2-h3',
      sentence: 'ei ___ roje ___ ___.',
      english: 'These boys go to the market every day',
      correctWords: ['chelegila', 'hate', 'jay'],
      distractors: ['korbek', 'asit'],
    },
    {
      id: 'swb2-h4',
      sentence: 'u kal ___ dostay ___ ___.',
      english: 'He/she will go hunting with friends tomorrow morning',
      correctWords: ['sokal', 'sikar', 'korbek'],
      distractors: ['chelegila', 'hate'],
    },
  ],
};

// ──────────────────────────────────────────────────────────
// Hangman SVG drawing — progressive body parts
// ──────────────────────────────────────────────────────────
const HangmanDrawing = ({ wrongCount }: { wrongCount: number }) => {
  const bodyParts = [
    <circle key="head" cx="160" cy="80" r="20" fill="none" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
    <line key="body" x1="160" y1="100" x2="160" y2="160" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
    <line key="left-arm" x1="160" y1="120" x2="130" y2="150" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
    <line key="right-arm" x1="160" y1="120" x2="190" y2="150" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
    <line key="left-leg" x1="160" y1="160" x2="130" y2="200" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
    <line key="right-leg" x1="160" y1="160" x2="190" y2="200" stroke="#ef4444"
      strokeWidth="3" strokeLinecap="round" strokeDasharray="200" className="animate-stroke-draw" />,
  ];

  return (
    <svg viewBox="0 0 200 250" className="w-full h-full max-w-[200px] max-h-[250px]">
      {/* Gallows — always visible */}
      <line x1="10" y1="230" x2="80" y2="230" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="230" x2="40" y2="20" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="20" x2="160" y2="20" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="20" x2="160" y2="60" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      {bodyParts.slice(0, wrongCount)}
    </svg>
  );
};

// ──────────────────────────────────────────────────────────
// Seeded random for stable shuffle
// ──────────────────────────────────────────────────────────
const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const shuffleWithSeed = <T,>(arr: T[], seed: number): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ──────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────
interface HangmanGameProps {
  game: GameData;
  region: Region;
  language: Language;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const HangmanGame = ({ region, onBack, onComplete }: HangmanGameProps) => {
  const questions = HANGMAN_DATA[region] || [];
  const totalQuestions = questions.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(6);
  const [filledBlanks, setFilledBlanks] = useState<(string | null)[]>([]);
  const [blankStatuses, setBlankStatuses] = useState<('empty' | 'correct' | 'wrong')[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shakingWord, setShakingWord] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showVictory, setShowVictory] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const wrongCount = 6 - lives;

  // Build word bank: all correct words + distractors, shuffled
  const wordBank = currentQuestion
    ? shuffleWithSeed(
        [...currentQuestion.correctWords, ...currentQuestion.distractors],
        currentQuestionIndex * 100 + region.length
      )
    : [];

  // Words still available in the bank (not yet placed in blanks)
  const usedWords = filledBlanks.filter(Boolean) as string[];
  const availableWords = wordBank.filter((w) => !usedWords.includes(w));

  // Split sentence by ___ to get text parts
  const sentenceParts = currentQuestion ? currentQuestion.sentence.split('___') : [];

  const progress = ((currentQuestionIndex + (filledBlanks.every((b) => b !== null) && filledBlanks.length > 0 ? 1 : 0)) / totalQuestions) * 100;

  // Reset blanks when question changes
  useEffect(() => {
    if (currentQuestion) {
      setFilledBlanks(new Array(currentQuestion.correctWords.length).fill(null));
      setBlankStatuses(new Array(currentQuestion.correctWords.length).fill('empty'));
      setShakingWord(null);
      setSelectedWord(null);
      setDragOverSlotIndex(null);
    }
  }, [currentQuestionIndex, currentQuestion]);

  // ── Handle word drop into a specific blank slot ────────
  const handleWordDrop = (word: string, slotIndex: number) => {
    if (isProcessing || filledBlanks[slotIndex] !== null) return;
    setIsProcessing(true);
    setSelectedWord(null);

    const isCorrect = word === currentQuestion.correctWords[slotIndex];

    if (isCorrect) {
      const newFilled = [...filledBlanks];
      newFilled[slotIndex] = word;
      setFilledBlanks(newFilled);

      const newStatuses = [...blankStatuses];
      newStatuses[slotIndex] = 'correct';
      setBlankStatuses(newStatuses);

      // Check if ALL blanks are now filled
      const allFilled = newFilled.every((w) => w !== null);
      if (allFilled) {
        const newScore = score + 1;
        setScore(newScore);
        setTimeout(() => {
          if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          } else {
            setShowVictory(true);
            onComplete(newScore);
          }
          setIsProcessing(false);
        }, 1200);
      } else {
        setIsProcessing(false);
      }
    } else {
      // Wrong answer
      const newStatuses = [...blankStatuses];
      newStatuses[slotIndex] = 'wrong';
      setBlankStatuses(newStatuses);
      setShakingWord(word);
      // Clear the shake animation after 600ms so the chip resets to normal
      setTimeout(() => setShakingWord(null), 600);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => setIsGameOver(true), 800);
      } else {
        setTimeout(() => {
          const resetStatuses = [...blankStatuses];
          resetStatuses[slotIndex] = 'empty';
          setBlankStatuses(resetStatuses);
          setIsProcessing(false);
        }, 800);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setLives(6);
    setFilledBlanks([]);
    setBlankStatuses([]);
    setIsProcessing(false);
    setShakingWord(null);
    setIsGameOver(false);
    setScore(0);
    setDragOverSlotIndex(null);
    setSelectedWord(null);
    setShowVictory(false);
  };

  // ── Drag handlers ─────────────────────────────────────
  const onDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.effectAllowed = 'move';
    // Add a visual ghost
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
    setTimeout(() => { target.style.opacity = '1'; }, 0);
  };

  const onDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = '1';
    setDragOverSlotIndex(null);
  };

  const onSlotDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlotIndex(slotIndex);
  };

  const onSlotDragLeave = () => {
    setDragOverSlotIndex(null);
  };

  const onSlotDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlotIndex(null);
    const word = e.dataTransfer.getData('text/plain');
    if (word) handleWordDrop(word, slotIndex);
  };

  // ── Mobile tap-to-select ──────────────────────────────
  const handleWordTap = (word: string) => {
    if (isProcessing) return;
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleSlotTap = (slotIndex: number) => {
    if (selectedWord && !isProcessing && filledBlanks[slotIndex] === null) {
      handleWordDrop(selectedWord, slotIndex);
    }
  };

  // No questions for this region
  if (!currentQuestion && !isGameOver && !showVictory) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={GAME_BACKGROUND_STYLE}>
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy p-8 text-center">
          <p className="text-white text-lg">No hangman questions available for this region.</p>
          <Button onClick={onBack} className="mt-4">← Back to Games</Button>
        </Card>
      </div>
    );
  }

  // ── Game Over Screen ──────────────────────────────────
  if (isGameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={GAME_BACKGROUND_STYLE}>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy w-full max-w-lg relative z-20">
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            <div className="mx-auto w-32 h-40">
              <HangmanDrawing wrongCount={6} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading text-destructive font-bold">
              Game Over!
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              You scored {score} out of {totalQuestions} before running out of lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleRestart} className="bg-game-hangman hover:opacity-90 text-white font-semibold">
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
              <Button variant="outline" onClick={onBack}>← Back to Games</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showVictory) return null; // CompletionScreen rendered by parent

  // ── Render a single blank drop zone ───────────────────
  const renderBlankSlot = (slotIndex: number) => {
    const filled = filledBlanks[slotIndex];
    const status = blankStatuses[slotIndex];
    const isDragOver = dragOverSlotIndex === slotIndex;

    return (
      <span
        key={`slot-${slotIndex}`}
        role="button"
        tabIndex={0}
        onClick={() => handleSlotTap(slotIndex)}
        onDragOver={(e) => onSlotDragOver(e, slotIndex)}
        onDragLeave={onSlotDragLeave}
        onDrop={(e) => onSlotDrop(e, slotIndex)}
        className={`
          inline-flex items-center justify-center mx-1 px-3
          min-w-[80px] sm:min-w-[100px] h-9 sm:h-10
          border-2 rounded-lg transition-all duration-200
          ${status === 'empty' && !isDragOver
            ? 'border-dashed border-white/50 bg-white/10 text-white/50 text-sm'
            : ''}
          ${status === 'empty' && isDragOver
            ? 'border-solid border-primary bg-primary/20 scale-105 shadow-lg'
            : ''}
          ${status === 'correct'
            ? 'border-solid border-green-500 bg-green-500/20 text-white font-bold animate-bounce-in'
            : ''}
          ${status === 'wrong'
            ? 'border-solid border-red-500 bg-red-500/20 text-white font-bold animate-shake'
            : ''}
          ${selectedWord && status === 'empty'
            ? 'ring-2 ring-primary ring-offset-1 ring-offset-transparent cursor-pointer'
            : ''}
        `}
      >
        {filled ? (
          <span className="font-bold text-sm">{filled}</span>
        ) : selectedWord && status === 'empty' ? (
          <span className="text-primary text-xs animate-pulse">tap here</span>
        ) : (
          <span className="text-xs opacity-50">drop here</span>
        )}
      </span>
    );
  };

  // ── Main Game UI ──────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden" style={GAME_BACKGROUND_STYLE}>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="w-full max-w-5xl relative z-20">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
            <Button variant="outline" onClick={onBack} className="text-xs sm:text-sm px-3 sm:px-4 py-2 font-semibold">
              <ArrowLeft className="w-3 h-3 mr-1" /> Back
            </Button>

            <Badge variant="outline" className="bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-xs sm:text-sm font-semibold px-3 py-1.5">
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </Badge>

            {/* Lives */}
            <div className="flex items-center gap-0.5 text-base sm:text-lg" aria-label={`${lives} lives remaining`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={`transition-all duration-300 ${i < lives ? '' : 'grayscale opacity-40 scale-75'}`}>
                  {i < lives ? '❤️' : '🖤'}
                </span>
              ))}
            </div>

            <Button variant="outline" onClick={handleRestart} className="text-xs sm:text-sm px-3 sm:px-4 py-2 font-semibold">
              <RotateCcw className="w-3 h-3 mr-1" /> Restart
            </Button>
          </div>

          <div className="w-full max-w-xs sm:max-w-md mx-auto mb-2 sm:mb-3">
            <Progress value={progress} className="h-2 bg-muted rounded-full overflow-hidden shadow-lg progress-indicator" />
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl font-heading text-foreground mb-1">
            Hangman Word Drop
          </h1>
        </div>

        {/* Game Card — Desktop: side by side, Mobile: stacked */}
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-3xl bg-gray-900/30 card-glossy">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: question content */}
              <div className="flex-1 space-y-5">
                {/* English hint */}
                <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                    Hint (English)
                  </p>
                  <p className="text-white text-base sm:text-lg font-bold">
                    &ldquo;{currentQuestion.english}&rdquo;
                  </p>
                </div>

                {/* Sentence with drop zones */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                    Fill in the blanks
                  </p>
                  <div className="text-base sm:text-lg leading-loose flex flex-wrap items-center gap-0.5">
                    {sentenceParts.map((part, i) => (
                      <span key={i} className="contents">
                        {part && <span className="text-white font-semibold">{part}</span>}
                        {i < sentenceParts.length - 1 && renderBlankSlot(i)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Word bank */}
                <div className="space-y-2">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                    Word Bank — drag or tap a word, then drop into a blank
                  </p>
                  <div className="flex flex-wrap gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                    {availableWords.length === 0 && filledBlanks.every((b) => b !== null) && (
                      <p className="text-success text-sm font-semibold">All blanks filled! ✓</p>
                    )}
                    {availableWords.map((word) => {
                      const isSelected = selectedWord === word;
                      const isShaking = shakingWord === word;
                      return (
                        <button
                          key={word}
                          draggable={!isProcessing}
                          onDragStart={(e) => onDragStart(e, word)}
                          onDragEnd={onDragEnd}
                          onClick={() => handleWordTap(word)}
                          disabled={isProcessing}
                          className={`
                            group relative flex items-center gap-1.5
                            px-3 py-2.5 rounded-lg font-bold text-sm border-2 select-none
                            transition-all duration-200
                            ${isShaking
                              ? 'bg-red-500/30 text-red-200 border-red-500 animate-shake'
                              : isSelected
                                ? 'bg-primary/30 text-white border-primary scale-110 shadow-xl ring-2 ring-primary/60 cursor-pointer'
                                : 'bg-white/90 text-gray-800 border-white/40 hover:scale-105 hover:shadow-lg hover:border-primary/60 cursor-grab active:cursor-grabbing active:scale-95'
                            }
                          `}
                        >
                          {/* Grip icon — draggable visual cue */}
                          <GripVertical className={`w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                          <span>{word}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Hangman SVG */}
              <div className="flex flex-col items-center justify-center md:w-56 shrink-0">
                <div className={`w-40 h-52 md:w-48 md:h-60 transition-transform duration-300 ${wrongCount > 0 && blankStatuses.includes('wrong') ? 'animate-shake' : ''}`}>
                  <HangmanDrawing wrongCount={wrongCount} />
                </div>
                <p className="text-white/40 text-xs mt-2 text-center">
                  {wrongCount === 0 ? 'No mistakes yet!' : `${wrongCount}/6 wrong`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
