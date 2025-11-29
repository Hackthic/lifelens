# LifeLens - AI-First Lifestyle Coach

LifeLens is a single-page React application designed to demonstrate the vision of an AI-powered preventive wellness platform. Built for a "Delhi-first" launch, it features localized content (English/Hindi), AQI-aware nudges, and an interactive risk calculator.

## Tech Stack

- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS (v3.4+ with v4-like utility usage)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context (for Language/Theme)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components/`: UI components for each section (Hero, Problem, DemoWidget, etc.)
- `src/context/`: Context providers (LanguageContext)
- `src/translations.js`: Localization strings
- `public/`: Static assets (pitch-deck.pdf, demo-gif.mp4)

## Customization

- **Translations**: Edit `src/translations.js` to update text for English or Hindi.
- **Theme**: Colors are defined in `tailwind.config.js` (primary teal: `#0ea5a4`).
- **Demo Logic**: Risk calculation logic is in `src/components/DemoWidget.jsx`.

## Deployment

### Vercel
1.  Import project from Git.
2.  Framework Preset: Vite.
3.  Deploy.

### Netlify
1.  New site from Git.
2.  Build command: `npm run build`.
3.  Publish directory: `dist`.

## Note
This is a demo application with mocked data for AQI and risk calculations. No real API keys are required.
