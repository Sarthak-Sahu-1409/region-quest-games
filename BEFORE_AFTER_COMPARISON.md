# Questions Folder Restructuring - Before & After

## 🔴 BEFORE (Confusing Structure)

```
src/data/questions/
├── south/
│   └── game1.ts         # Actually South Bengal 1 (mixed Roman + Bengali)
├── north/
│   └── game1.ts         # Actually South Bengal 2 (mixed Roman + Bengali)
├── east/
│   └── game1.ts         # Actually North Bengal 1 (mixed Roman + Bengali)
└── west/
    └── game1.ts         # Actually North Bengal 2 (mixed Roman + Bengali)
```

**Problems:**
- ❌ Folder names (south/north/east/west) don't match region names
- ❌ Roman and Bengali mixed in same file with optional fields
- ❌ Confusing to know which folder = which region
- ❌ Hard to edit just one language

## 🟢 AFTER (Clear Structure)

```
src/data/questions/
├── README.md            # Documentation on how to add questions
├── south-bengal-1/
│   ├── roman.ts         # Roman script only
│   └── bengali.ts       # Bengali script only
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

**Benefits:**
- ✅ Folder names match actual region names exactly
- ✅ Languages separated into dedicated files
- ✅ Easy to see structure at a glance
- ✅ Simple to edit one language without touching the other
- ✅ Documented with README

## 📊 Data Format Changes

### Before (Mixed in one file):
```typescript
// south/game1.ts
export const southWestBengal1Questions: Question[] = [
  {
    id: 'swb1-q1',
    options: ["khālē", "khālāhē"],           // Roman
    optionsBengali: ["খালে", "খালাহে"],      // Bengali (optional field)
    sentence: ["..."],                        // Roman
    sentenceBengali: ["..."],                 // Bengali (optional field)
    blank: { correctAnswers: ["..."] },       // Roman
    blankBengali: { correctAnswers: ["..."] } // Bengali (optional field)
  }
];
```

### After (Separated):
```typescript
// south-bengal-1/roman.ts
export const southBengal1RomanQuestions: Question[] = [
  {
    id: 'swb1-q1',
    options: ["khālē", "khālāhē"],
    sentence: ["..."],
    blank: { correctAnswers: ["..."] }
  }
];

// south-bengal-1/bengali.ts
export const southBengal1BengaliQuestions: Question[] = [
  {
    id: 'swb1-q1',
    options: ["খালে", "খালাহে"],
    sentence: ["..."],
    blank: { correctAnswers: ["..."] }
  }
];
```

## 🔄 How They're Combined

In `src/data/regions.ts`:

```typescript
// Helper function merges them automatically
function mergeQuestions(romanQuestions, bengaliQuestions) {
  return romanQuestions.map((romanQ, index) => ({
    ...romanQ,
    optionsBengali: bengaliQuestions[index].options,
    sentenceBengali: bengaliQuestions[index].sentence,
    blankBengali: bengaliQuestions[index].blank,
  }));
}

// Usage
games: [{
  questions: mergeQuestions(
    southBengal1RomanQuestions,
    southBengal1BengaliQuestions
  )
}]
```

## 🎯 Result

- Same functionality for the app
- Much cleaner code organization
- Easier to maintain and extend
- Clear naming conventions
- Better developer experience
