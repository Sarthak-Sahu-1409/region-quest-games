import { RegionData } from '@/types';
import { southWestBengal1Questions } from './questions/south/game1';
import { southWestBengal2Questions } from './questions/north/game1';
import { northBengal1Questions } from './questions/east/game1';
import { northBengal2Questions } from './questions/west/game1';

export const regionsData: RegionData[] = [
  {
    id: 'south-west-bengal-1',
    name: 'south-west-bengal-1',
    displayName: 'South West Bengal:1',
    color: 'region-1',
    locations: ['Tulin', 'Tunturi', 'Baghmundi'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: southWestBengal1Questions
      }
    ]
  },
  {
    id: 'south-west-bengal-2',
    name: 'south-west-bengal-2',
    displayName: 'South West Bengal:2',
    color: 'region-2',
    locations: ['Bandoyan', 'Manbazar', 'Holudboni'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: southWestBengal2Questions
      }
    ]
  },
  {
    id: 'north-bengal-1',
    name: 'north-bengal-1',
    displayName: 'North Bengal 1',
    color: 'region-3',
    locations: ['Brahmanpara', 'Kuchlibari', 'Berubari', 'Bhawer Thana', 'Kamakyaguri', 'Ghughumari'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: northBengal1Questions
      }
    ]
  },
  {
    id: 'north-bengal-2',
    name: 'north-bengal-2',
    displayName: 'North Bengal 2',
    color: 'region-4',
    locations: ['Birpara', 'Sanyashikata', 'Rangdhamali', 'West Damdim', 'Kalchini'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: northBengal2Questions
      }
    ]
  }
];