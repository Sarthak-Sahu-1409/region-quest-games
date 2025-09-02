import { Question } from '@/types';

export const northGame1Questions: Question[] = [
  {
    id: 'north-game1-q1',
    options: ['quickly', 'ate', 'ran', 'happily', 'sprinted'],
    sentence: ['The boy', 'to the snowy park.'],
    blank: { correctAnswers: ['ran', 'sprinted'] }
  },
  {
    id: 'north-game1-q2',
    options: ['cold', 'warm', 'delicious', 'tasty', 'hot'],
    sentence: ['The winter soup was', '.'],
    blank: { correctAnswers: ['warm', 'hot'] }
  },
  {
    id: 'north-game1-q3',
    options: ['play', 'sing', 'jump', 'dance', 'skip'],
    sentence: ['Children like to', 'in the snowy playground.'],
    blank: { correctAnswers: ['jump', 'skip', 'dance'] }
  },
  {
    id: 'north-game1-q4',
    options: ['mittens', 'gloves', 'hat', 'scarf', 'boots'],
    sentence: ['In winter, we wear', 'to keep warm.'],
    blank: { correctAnswers: ['mittens', 'gloves', 'hat', 'scarf'] }
  },
  {
    id: 'north-game1-q5',
    options: ['snowman', 'sandcastle', 'igloo', 'fort', 'castle'],
    sentence: ['We built a', 'in the snow.'],
    blank: { correctAnswers: ['snowman', 'igloo', 'fort'] }
  }
];