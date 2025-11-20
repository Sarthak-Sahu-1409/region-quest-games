# Region Quest Games

> An interactive educational platform for learning regional variations of Bengali language through engaging games

**Live Demo**: https://region-quest-games.vercel.app/

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [User Flows](#user-flows)
- [Getting Started](#getting-started)
- [Adding New Content](#adding-new-content)
- [Technologies](#technologies)
- [Deployment](#deployment)

---

## 🎯 Overview

Region Quest Games is an educational web application designed to teach students about regional variations in the Bengali language across West Bengal. The platform features interactive games that help students learn region-specific vocabulary, grammar, and sentence structures through a fun and engaging interface.

The application supports:
- **Multiple regions**: North Bengal, South-West Bengal, South Bengal, and West Bengal
- **Bilingual support**: English and Bengali interfaces
- **Dual portals**: Student portal for interactive learning and Teacher portal for answer key review
- **Multiple game types**: Sentence Matching and Fill-in-the-Blanks games

---

## ✨ Features

### 🎮 Game Types

#### 1. **Sentence Matching Game**
- Match sentences with correct regional options
- **Desktop**: Traditional two-column layout with animated SVG connector lines
- **Mobile**: Compact side-by-side rows (sentence-line-option) with short connector lines
- Randomized option order to prevent predictability
- Real-time feedback with visual indicators (green for correct, red for wrong)
- Score tracking and progress display

#### 2. **Fill-in-the-Blanks Game**
- Complete sentences by selecting the correct regional word
- Interactive word selection with drag-and-drop feel
- Visual feedback for correct/incorrect answers
- Multiple blanks per sentence support

### 👥 Dual Portal System

#### **Student Portal**
- Interactive gameplay with immediate feedback
- Progress tracking across questions
- Score calculation and completion screen
- Retry functionality for incorrect answers
- Mobile-optimized matching game layout

#### **Teacher Portal**
- Answer key review mode
- Pre-highlighted correct answers
- Navigation between questions (Previous/Next)
- Same responsive design as student portal
- Visual answer key with connector lines showing correct matches

### 🌍 Regional & Language Support
- **4 Regions**: North Bengal, South-West Bengal, South Bengal, West Bengal
- **2 Languages**: English and Bengali
- Easy region/language selection from home screen
- Persistent language preference throughout gameplay

### 📱 Responsive Design
- **Mobile-first approach** with tailored layouts for small screens
- **Desktop optimization** with enhanced visuals and spacing
- Smooth transitions between breakpoints
- Touch-friendly interactions on mobile devices

### 🎨 User Experience
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Clear visual feedback for all interactions
- Accessible color contrasts
- Intuitive navigation flow

---

## 📁 Project Structure

```
region-quest-games/
├── public/
│   ├── gradient-blue-background/     # Background images
│   │   ├── backg1.jpg
│   │   ├── backg2.jpg
│   │   └── backg3.jpg
│   ├── lovable-uploads/              # Asset uploads
│   └── placeholder.svg
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthPage.tsx          # Landing page with region/language selection
│   │   ├── games/
│   │   │   ├── MatchingGame.tsx      # Student sentence matching game
│   │   │   └── FillBlankGame.tsx     # Student fill-in-blanks game
│   │   ├── ui/                       # shadcn-ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   ├── CompletionScreen.tsx      # Game completion screen
│   │   ├── GameCard.tsx              # Game selection card
│   │   ├── GameSelection.tsx         # Game list view
│   │   ├── LanguageSelector.tsx      # Language toggle component
│   │   ├── RegionSelector.tsx        # Region selection component
│   │   └── TeacherQuestionView.tsx   # Teacher portal question viewer
│   │
│   ├── data/
│   │   ├── games.ts                  # Game configuration data
│   │   ├── matchingGames.ts          # Sentence matching questions
│   │   ├── regions.ts                # Region definitions
│   │   └── translations.ts           # UI translations (English/Bengali)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── use-toast.ts              # Toast notification hook
│   │
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   │
│   ├── pages/
│   │   ├── Index.tsx                 # Main app component
│   │   └── TeacherDashboard.tsx      # Teacher portal dashboard
│   │
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   │
│   ├── App.tsx                        # Root application component
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles
│
├── index.html
├── package.json
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite build configuration
└── README.md
```

---

## 🔄 User Flows

### Student Flow

```
┌─────────────────┐
│  Landing Page   │
│  (AuthPage)     │
└────────┬────────┘
         │
         ├─ Select Region (North/South-West/South/West Bengal)
         ├─ Select Language (English/Bengali)
         └─ Click "Enter" or "প্রবেশ করুন"
                  │
         ┌────────▼────────┐
         │ Game Selection  │
         │  Dashboard      │
         └────────┬────────┘
                  │
                  ├─ View available games
                  ├─ Toggle language anytime
                  └─ Select a game (Matching/Fill Blanks)
                           │
                  ┌────────▼────────┐
                  │   Game Play     │
                  │  (Interactive)  │
                  └────────┬────────┘
                           │
                           ├─ Answer questions
                           ├─ Get instant feedback
                           ├─ Track progress
                           └─ Complete all questions
                                    │
                           ┌────────▼────────┐
                           │   Completion    │
                           │     Screen      │
                           └────────┬────────┘
                                    │
                                    ├─ View final score
                                    ├─ See performance message
                                    └─ Options:
                                         ├─ Play Again
                                         └─ Back to Games
```

### Teacher Flow

```
┌─────────────────┐
│  Landing Page   │
│  (AuthPage)     │
└────────┬────────┘
         │
         ├─ Select Region
         ├─ Select Language
         └─ Click "Teacher Login" or "শিক্ষক লগইন"
                  │
         ┌────────▼────────┐
         │    Teacher      │
         │   Dashboard     │
         └────────┬────────┘
                  │
                  ├─ View all games
                  ├─ Toggle language
                  └─ Select game to review
                           │
                  ┌────────▼────────┐
                  │  Answer Key     │
                  │   Review Mode   │
                  └────────┬────────┘
                           │
                           ├─ View questions with answers
                           ├─ Correct answers highlighted (green)
                           ├─ Navigate: Previous/Next
                           └─ Visual connector lines (desktop)
                                    │
                                    └─ Back to Dashboard
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd region-quest-games

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## ➕ Adding New Content

### Adding a New Region

1. **Update Region Definitions** (`src/data/regions.ts`):

```typescript
export const regions: { id: Region; name: string; nameBengali: string }[] = [
  // ... existing regions
  { id: 'new-region', name: 'New Region Name', nameBengali: 'নতুন অঞ্চল' },
];
```

2. **Update Type Definition** (`src/types/index.ts`):

```typescript
export type Region = 'north-bengal' | 'south-west-bengal' | 'south-bengal' | 'west-bengal' | 'new-region';
```

3. **Add Region-Specific Options** in game data files:
   - For matching games: `src/data/matchingGames.ts`
   - For fill-blank games: `src/data/games.ts`

```typescript
options: [
  {
    id: 'new-region-option',
    text: 'Regional variant',
    region: 'new-region',
    isCorrect: true
  },
  // ... other regions
]
```

### Adding a New Game

#### For Sentence Matching Game:

**File**: `src/data/matchingGames.ts`

```typescript
export const matchingGames: MatchingGameData[] = [
  // ... existing games
  {
    id: 'new-game-id',
    name: 'New Game Title',
    nameBengali: 'নতুন খেলা',
    description: 'Description in English',
    descriptionBengali: 'বাংলায় বর্ণনা',
    type: 'matching',
    icon: '🎮', // Emoji icon
    matchingQuestions: [
      {
        id: 'question-1',
        sentence: 'Complete the sentence ___.',
        sentenceBengali: 'বাক্য সম্পূর্ণ করুন ___।',
        options: [
          {
            id: 'north-bengal-option',
            text: 'correctly',
            region: 'north-bengal',
            isCorrect: true
          },
          {
            id: 'south-west-bengal-option',
            text: 'properly',
            region: 'south-west-bengal',
            isCorrect: true
          },
          // ... add for all regions
        ],
        optionsBengali: [
          // Bengali version of options
        ]
      },
      // ... more questions
    ]
  }
];
```

#### For Fill-in-the-Blanks Game:

**File**: `src/data/games.ts`

```typescript
export const games: GameData[] = [
  // ... existing games
  {
    id: 'new-fill-blank-game',
    name: 'New Fill Blank Game',
    nameBengali: 'নতুন ফিল ব্ল্যাঙ্ক খেলা',
    description: 'Fill in the blanks',
    descriptionBengali: 'খালি জায়গা পূরণ করুন',
    type: 'fill-blank',
    icon: '📝',
    questions: [
      {
        id: 'q1',
        sentence: 'The teacher is ___.',
        sentenceBengali: 'শিক্ষক ___ আছেন।',
        options: ['option1', 'option2', 'option3'],
        optionsBengali: ['বিকল্প১', 'বিকল্প২', 'বিকল্প৩'],
        blank: {
          position: 15, // Character position of blank
          correctAnswers: ['option1']
        },
        blankBengali: {
          position: 8,
          correctAnswers: ['বিকল্প১']
        }
      },
      // ... more questions
    ]
  }
];
```

### Key Points for Adding Games:

1. **Unique IDs**: Ensure all game, question, and option IDs are unique
2. **All Regions**: Provide options for all supported regions in matching games
3. **Bilingual Content**: Always include both English and Bengali versions
4. **Correct Answers**: Mark `isCorrect: true` for the correct option per region
5. **Icon**: Use emoji or icon identifier for visual representation

---

## 🛠 Technologies

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library
- **Lucide React** - Icon library

### State Management
- **React Hooks** - useState, useEffect, useMemo, useRef
- Local component state (no global state library needed)

### Routing
- **React Router DOM** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

---

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploy automatically on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy the contents of dist/ to your hosting provider
```

### Environment Variables

No environment variables are required for basic deployment. All configuration is built into the application.

---

## 📝 License

Developed by Sarthak Sahu, Sameer Godara and Sarthak Goel under the guidance of Professor Dripta Piplai (Mondal).

Developed with love at IIT Kharagpur ❤️

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Support

For questions or support, please contact the development team at IIT Kharagpur.

