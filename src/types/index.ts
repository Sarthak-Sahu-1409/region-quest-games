export type Region = 'northern-bengal-1' | 'northern-bengal-2' | 'northern-bengal-3' | 'northern-bengal-4' | 'northern-bengal-5' | 'northern-bengal-6' | 'southern-bengal-1' | 'southern-bengal-2' | 'southern-bengal-3' | 'southern-bengal-4' | 'southern-bengal-5';

export type GameType = 'fill-blank' | 'multiple-choice' | 'matching';

export interface Question {
  id: string;
  options: string[];
  sentence: string[];
  blank: {
    correctAnswers: string[];
  };
}

export interface GameData {
  id: string;
  name: string;
  type: GameType;
  description: string;
  questions: Question[];
}

export interface RegionData {
  id: Region;
  name: string;
  displayName: string;
  color: string;
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