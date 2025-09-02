import { Question } from '@/types';

export const westGame1Questions: Question[] = [
  {
    id: 'west-game1-q1',
    options: ['slowly', 'walked', 'ambled', 'strolled', 'wandered'],
    sentence: ['The boy', 'to the desert park.'],
    blank: { correctAnswers: ['walked', 'ambled', 'strolled'] }
  },
  {
    id: 'west-game1-q2',
    options: ['dry', 'arid', 'dusty', 'sandy', 'parched'],
    sentence: ['The desert wind was', '.'],
    blank: { correctAnswers: ['dry', 'arid', 'dusty', 'sandy'] }
  },
  {
    id: 'west-game1-q3',
    options: ['explore', 'search', 'hunt', 'discover', 'find'],
    sentence: ['Children like to', 'for cacti in the desert.'],
    blank: { correctAnswers: ['explore', 'search', 'hunt', 'discover'] }
  },
  {
    id: 'west-game1-q4',
    options: ['hat', 'sunscreen', 'water bottle', 'light clothes', 'boots'],
    sentence: ['In the desert, we need', 'for protection.'],
    blank: { correctAnswers: ['hat', 'sunscreen', 'water bottle', 'light clothes'] }
  },
  {
    id: 'west-game1-q5',
    options: ['oasis', 'shelter', 'shade', 'cactus garden', 'rest area'],
    sentence: ['We found an', 'in the desert.'],
    blank: { correctAnswers: ['oasis', 'shelter', 'shade'] }
  }
];