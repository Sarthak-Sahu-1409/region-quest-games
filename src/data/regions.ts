import { RegionData, Question, MatchingQuestion } from '@/types';
import { southBengal1RomanQuestions } from './questions/south-bengal-1/roman';
import { southBengal1BengaliQuestions } from './questions/south-bengal-1/bengali';
import { southBengal2RomanQuestions } from './questions/south-bengal-2/roman';
import { southBengal2BengaliQuestions } from './questions/south-bengal-2/bengali';
import { northBengal1RomanQuestions } from './questions/north-bengal-1/roman';
import { northBengal1BengaliQuestions } from './questions/north-bengal-1/bengali';
import { northBengal2RomanQuestions } from './questions/north-bengal-2/roman';
import { northBengal2BengaliQuestions } from './questions/north-bengal-2/bengali';
import { matchingRomanQuestions } from './questions/matching/roman';
import { matchingBengaliQuestions } from './questions/matching/bengali';

// Helper function to merge Roman and Bengali questions
function mergeQuestions(romanQuestions: Question[], bengaliQuestions: Question[]): Question[] {
  return romanQuestions.map((romanQ, index) => {
    const bengaliQ = bengaliQuestions[index];
    return {
      ...romanQ,
      optionsBengali: bengaliQ.options,
      sentenceBengali: bengaliQ.sentence,
      blankBengali: bengaliQ.blank,
    };
  });
}

// Helper function to merge Roman and Bengali matching questions
function mergeMatchingQuestions(romanQuestions: MatchingQuestion[], bengaliQuestions: MatchingQuestion[]): MatchingQuestion[] {
  return romanQuestions.map((romanQ, index) => {
    const bengaliQ = bengaliQuestions[index];
    return {
      ...romanQ,
      optionsBengali: bengaliQ.options,
    };
  });
}

export const regionsData: RegionData[] = [
  {
    id: 'south-west-bengal-1',
    name: 'south-west-bengal-1',
    displayName: 'South Bengal 1',
    color: 'region-1',
    locations: ['Tulin', 'Tunturi', 'Baghmundi'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: mergeQuestions(southBengal1RomanQuestions, southBengal1BengaliQuestions)
      },
      {
        id: 'matching-1',
        name: 'Image Matching',
        type: 'matching',
        description: 'Match images with correct regional descriptions',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(matchingRomanQuestions, matchingBengaliQuestions)
      }
    ]
  },
  {
    id: 'south-west-bengal-2',
    name: 'south-west-bengal-2',
    displayName: 'South Bengal 2',
    color: 'region-2',
    locations: ['Bandoyan', 'Manbazar', 'Holudboni'],
    games: [
      {
        id: 'fill-blank-1',
        name: 'Tense & Aspect Practice',
        type: 'fill-blank',
        description: 'Fill in the blanks with correct verb forms',
        questions: mergeQuestions(southBengal2RomanQuestions, southBengal2BengaliQuestions)
      },
      {
        id: 'matching-1',
        name: 'Image Matching',
        type: 'matching',
        description: 'Match images with correct regional descriptions',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(matchingRomanQuestions, matchingBengaliQuestions)
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
        questions: mergeQuestions(northBengal1RomanQuestions, northBengal1BengaliQuestions)
      },
      {
        id: 'matching-1',
        name: 'Image Matching',
        type: 'matching',
        description: 'Match images with correct regional descriptions',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(matchingRomanQuestions, matchingBengaliQuestions)
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
        questions: mergeQuestions(northBengal2RomanQuestions, northBengal2BengaliQuestions)
      },
      {
        id: 'matching-1',
        name: 'Image Matching',
        type: 'matching',
        description: 'Match images with correct regional descriptions',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(matchingRomanQuestions, matchingBengaliQuestions)
      }
    ]
  }
];