import { RegionData } from '@/types';
import { northGame1Questions } from './questions/north/game1';
import { southGame1Questions } from './questions/south/game1';
import { eastGame1Questions } from './questions/east/game1';
import { westGame1Questions } from './questions/west/game1';

export const regionsData: RegionData[] = [
  // Northern Bengal regions (1-6)
  {
    id: 'northern-bengal-1',
    name: 'northern-bengal-1',
    displayName: 'Northern Bengal 1',
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
    id: 'northern-bengal-2',
    name: 'northern-bengal-2',
    displayName: 'Northern Bengal 2',
    color: 'region-2',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Forest Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with forest-themed words',
        questions: eastGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Forest Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about forests',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Forest Match',
        type: 'matching',
        description: 'Match forest items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'northern-bengal-3',
    name: 'northern-bengal-3',
    displayName: 'Northern Bengal 3',
    color: 'region-3',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Mountain Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with mountain-themed words',
        questions: westGame1Questions
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
    id: 'northern-bengal-4',
    name: 'northern-bengal-4',
    displayName: 'Northern Bengal 4',
    color: 'region-4',
    games: [
      {
        id: 'fill-blank-1',
        name: 'River Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with river-themed words',
        questions: northGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'River Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about rivers',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'River Match',
        type: 'matching',
        description: 'Match river items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'northern-bengal-5',
    name: 'northern-bengal-5',
    displayName: 'Northern Bengal 5',
    color: 'region-1',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Village Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with village-themed words',
        questions: eastGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Village Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about villages',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Village Match',
        type: 'matching',
        description: 'Match village items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'northern-bengal-6',
    name: 'northern-bengal-6',
    displayName: 'Northern Bengal 6',
    color: 'region-2',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Cultural Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with cultural-themed words',
        questions: westGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Cultural Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about culture',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Cultural Match',
        type: 'matching',
        description: 'Match cultural items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  // Southern Bengal regions (1-5)
  {
    id: 'southern-bengal-1',
    name: 'southern-bengal-1',
    displayName: 'Southern Bengal 1',
    color: 'region-3',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Coastal Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with coastal-themed words',
        questions: southGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Coastal Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about coastal areas',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Coastal Match',
        type: 'matching',
        description: 'Match coastal items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'southern-bengal-2',
    name: 'southern-bengal-2',
    displayName: 'Southern Bengal 2',
    color: 'region-4',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Delta Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with delta-themed words',
        questions: northGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Delta Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about deltas',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Delta Match',
        type: 'matching',
        description: 'Match delta items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'southern-bengal-3',
    name: 'southern-bengal-3',
    displayName: 'Southern Bengal 3',
    color: 'region-1',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Mangrove Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with mangrove-themed words',
        questions: eastGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Mangrove Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about mangroves',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Mangrove Match',
        type: 'matching',
        description: 'Match mangrove items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'southern-bengal-4',
    name: 'southern-bengal-4',
    displayName: 'Southern Bengal 4',
    color: 'region-2',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Urban Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with urban-themed words',
        questions: westGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Urban Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about urban areas',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Urban Match',
        type: 'matching',
        description: 'Match urban items with their uses',
        questions: [] // To be implemented
      }
    ]
  },
  {
    id: 'southern-bengal-5',
    name: 'southern-bengal-5',
    displayName: 'Southern Bengal 5',
    color: 'region-3',
    games: [
      {
        id: 'fill-blank-1',
        name: 'Heritage Word Fill',
        type: 'fill-blank',
        description: 'Fill in the blanks with heritage-themed words',
        questions: southGame1Questions
      },
      {
        id: 'multiple-choice-1',
        name: 'Heritage Quiz',
        type: 'multiple-choice',
        description: 'Multiple choice questions about heritage',
        questions: [] // To be implemented
      },
      {
        id: 'matching-1',
        name: 'Heritage Match',
        type: 'matching',
        description: 'Match heritage items with their uses',
        questions: [] // To be implemented
      }
    ]
  }
];