export type Region = 'north' | 'south' | 'east' | 'west';

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