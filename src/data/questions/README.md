# Questions Data Structure

This folder contains all the game questions organized by region and language.

## Folder Structure

```
questions/
├── south-bengal-1/
│   ├── roman.ts      # Questions in Roman script
│   └── bengali.ts    # Questions in Bengali script
├── south-bengal-2/
│   ├── roman.ts
│   └── bengali.ts
├── north-bengal-1/
│   ├── roman.ts
│   └── bengali.ts
└── north-bengal-2/
    ├── roman.ts
    └── bengali.ts
```

## How It Works

Each region folder contains two files:
- **roman.ts**: Contains questions with Roman script (Latin alphabet)
- **bengali.ts**: Contains questions with Bengali script

The questions are automatically merged in `src/data/regions.ts` using the `mergeQuestions()` helper function, which combines both language versions into a single bilingual question set.

## Adding New Questions

### For an existing region:

1. Edit the appropriate `roman.ts` file to add/modify Roman script questions
2. Edit the corresponding `bengali.ts` file with the Bengali translations
3. Ensure both files have the same number of questions in the same order
4. Make sure question IDs match between files

### For a new region:

1. Create a new folder: `src/data/questions/<region-name>/`
2. Create `roman.ts` with Roman script questions
3. Create `bengali.ts` with Bengali script questions
4. Update `src/data/regions.ts`:
   - Import both question files
   - Add the region to `regionsData` array
   - Use `mergeQuestions()` to combine them

## Question Format

### Roman script file (roman.ts):
```typescript
export const regionNameRomanQuestions: Question[] = [
  {
    id: 'unique-q1',
    options: ["option1", "option2", "option3"],
    sentence: ["First part", "Second part"],
    blank: { correctAnswers: ["option1"] }
  }
];
```

### Bengali script file (bengali.ts):
```typescript
export const regionNameBengaliQuestions: Question[] = [
  {
    id: 'unique-q1',
    options: ["বিকল্প১", "বিকল্প২", "বিকল্প৩"],
    sentence: ["প্রথম অংশ", "দ্বিতীয় অংশ"],
    blank: { correctAnswers: ["বিকল্প১"] }
  }
];
```

## Important Notes

- ✅ Keep question IDs the same in both files
- ✅ Maintain the same order of questions in both files
- ✅ Ensure the same number of questions in both files
- ✅ Keep the same number of `correctAnswers` in both files
- ⚠️ The merge function assumes 1:1 correspondence by array index
