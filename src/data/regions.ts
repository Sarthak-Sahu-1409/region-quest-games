import { RegionData, Question, MatchingQuestion } from '@/types';
// Fill-in-the-blanks imports
import { southBengal1RomanQuestions } from './questions/fill-in-the-blanks/south-west-bengal-1/roman';
import { southBengal1BengaliQuestions } from './questions/fill-in-the-blanks/south-west-bengal-1/bengali';
import { southBengal2RomanQuestions } from './questions/fill-in-the-blanks/south-west-bengal-2/roman';
import { southBengal2BengaliQuestions } from './questions/fill-in-the-blanks/south-west-bengal-2/bengali';
import { northBengal1RomanQuestions } from './questions/fill-in-the-blanks/north-bengal-1/roman';
import { northBengal1BengaliQuestions } from './questions/fill-in-the-blanks/north-bengal-1/bengali';
import { northBengal2RomanQuestions } from './questions/fill-in-the-blanks/north-bengal-2/roman';
import { northBengal2BengaliQuestions } from './questions/fill-in-the-blanks/north-bengal-2/bengali';

// Sentence-matching imports
import { matchingRomanQuestions as swb1MatchingRomanQuestions } from './questions/sentence-matching/south-west-bengal-1/roman';
import { matchingBengaliQuestions as swb1MatchingBengaliQuestions } from './questions/sentence-matching/south-west-bengal-1/bengali';
import { matchingRomanQuestions as swb2MatchingRomanQuestions } from './questions/sentence-matching/south-west-bengal-2/roman';
import { matchingBengaliQuestions as swb2MatchingBengaliQuestions } from './questions/sentence-matching/south-west-bengal-2/bengali';
import { matchingRomanQuestions as nb1MatchingRomanQuestions } from './questions/sentence-matching/north-bengal-1/roman';
import { matchingBengaliQuestions as nb1MatchingBengaliQuestions } from './questions/sentence-matching/north-bengal-1/bengali';
import { matchingRomanQuestions as nb2MatchingRomanQuestions } from './questions/sentence-matching/north-bengal-2/roman';
import { matchingBengaliQuestions as nb2MatchingBengaliQuestions } from './questions/sentence-matching/north-bengal-2/bengali';

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
      sentenceBengali: bengaliQ.sentence,
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
        name: 'Sentence Matching',
        type: 'matching',
        description: 'Match correct options to sentences',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(swb1MatchingRomanQuestions, swb1MatchingBengaliQuestions)
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
        name: 'Sentence Matching',
        type: 'matching',
        description: 'Match correct options to sentences',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(swb2MatchingRomanQuestions, swb2MatchingBengaliQuestions)
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
        name: 'Sentence Matching',
        type: 'matching',
        description: 'Match correct options to sentences',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(nb1MatchingRomanQuestions, nb1MatchingBengaliQuestions)
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
        name: 'Sentence Matching',
        type: 'matching',
        description: 'Match correct options to sentences',
        questions: [],
        matchingQuestions: mergeMatchingQuestions(nb2MatchingRomanQuestions, nb2MatchingBengaliQuestions)
      }
    ]
  }
];