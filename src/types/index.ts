export type Region = 'south-west-bengal-1' | 'south-west-bengal-2' | 'north-bengal-1' | 'north-bengal-2';

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