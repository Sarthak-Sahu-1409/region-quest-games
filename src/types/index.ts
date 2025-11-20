export type Region = 'south-west-bengal-1' | 'south-west-bengal-2' | 'north-bengal-1' | 'north-bengal-2';

export type GameType = 'fill-blank' | 'multiple-choice' | 'matching';

export type Language = 'roman' | 'bengali';

export interface Question {
  id: string;
  options: string[];
  optionsBengali?: string[];
  sentence: string[];
  sentenceBengali?: string[];
  blank: {
    correctAnswers: string[];
  };
  blankBengali?: {
    correctAnswers: string[];
  };
}

export interface MatchingOption {
  id: string;
  text: string;
  region: Region;
  isCorrect: boolean;
}

export interface MatchingQuestion {
  id: string;
  sentence: string;
  sentenceBengali?: string;
  options: MatchingOption[];
  optionsBengali?: MatchingOption[];
}

export interface GameData {
  id: string;
  name: string;
  type: GameType;
  description: string;
  questions: Question[];
  matchingQuestions?: MatchingQuestion[];
}

export interface RegionData {
  id: Region;
  name: string;
  displayName: string;
  color: string;
  locations: string[];
  games: GameData[];
}

export interface User {
  type: 'student' | 'teacher';
  region?: Region;
}

export interface GameSession {
  user: User;
  region: Region;
  gameId: string;
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
}