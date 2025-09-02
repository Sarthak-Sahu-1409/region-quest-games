import { Question } from '@/types';

export const southGame1Questions: Question[] = [
  {
    id: 'south-game1-q1',
    options: ['quickly', 'ate', 'walked', 'strolled', 'jogged'],
    sentence: ['The boy', 'to the sunny park.'],
    blank: { correctAnswers: ['walked', 'strolled', 'jogged'] }
  },
  {
    id: 'south-game1-q2',
    options: ['cold', 'cool', 'refreshing', 'iced', 'chilled'],
    sentence: ['The summer drink was', '.'],
    blank: { correctAnswers: ['cool', 'refreshing', 'iced', 'chilled'] }
  },
  {
    id: 'south-game1-q3',
    options: ['swim', 'splash', 'dive', 'float', 'surf'],
    sentence: ['Children like to', 'in the pool.'],
    blank: { correctAnswers: ['swim', 'splash', 'dive', 'float'] }
  },
  {
    id: 'south-game1-q4',
    options: ['sunhat', 'cap', 'sunglasses', 'shorts', 'sandals'],
    sentence: ['In summer, we wear', 'to stay cool.'],
    blank: { correctAnswers: ['sunhat', 'cap', 'sunglasses', 'shorts'] }
  },
  {
    id: 'south-game1-q5',
    options: ['sandcastle', 'seashells', 'beach fort', 'palm tree', 'lighthouse'],
    sentence: ['We built a', 'on the beach.'],
    blank: { correctAnswers: ['sandcastle', 'beach fort'] }
  }
];