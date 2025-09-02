import { RegionData } from '@/types';
import { northGame1Questions } from './questions/north/game1';
import { southGame1Questions } from './questions/south/game1';
import { eastGame1Questions } from './questions/east/game1';
import { westGame1Questions } from './questions/west/game1';

export const regionsData: RegionData[] = [
  {
    id: 'north',
    name: 'north',
    displayName: 'Northern Region',
    color: 'region-1',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Winter Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with winter-themed words',
        questions: northGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Snow Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about winter',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Winter Match',
        type: 'matching',
        description: 'Match winter items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'south',
    name: 'south',
    displayName: 'Southern Region',
    color: 'region-2',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Summer Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with summer-themed words',
        questions: southGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Beach Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about summer',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Summer Match',
        type: 'matching',
        description: 'Match summer items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'east',
    name: 'east',
    displayName: 'Eastern Region',
    color: 'region-3',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Mountain Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with mountain-themed words',
        questions: eastGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Mountain Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about mountains',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Mountain Match',
        type: 'matching',
        description: 'Match mountain items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'west',
    name: 'west',
    displayName: 'Western Region',
    color: 'region-4',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Desert Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with desert-themed words',
        questions: westGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Desert Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about deserts',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Desert Match',
        type: 'matching',
        description: 'Match desert items with their uses',
        questions: [] // To be implemented
      }
    ]
  }
];