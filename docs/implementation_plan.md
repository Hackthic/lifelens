# LifeLens Implementation Plan

## Goal Description
Build a single-page React application for "LifeLens", an AI-first lifestyle coach. The app is designed for an investor demo, focusing on a "Delhi-first" launch. It features a responsive design, dark mode, English/Hindi localization, and an interactive risk calculator widget.

## User Review Required
> [!IMPORTANT]
> **Tailwind CSS v4**: The user requested Tailwind v4. I will attempt to use the latest available version. If v4 is not stable/easily available via standard Vite scaffolding, I will fall back to v3.4+ with v4-like utility usage where possible.
> **Mock Data**: All data (AQI, Risk scores) will be mocked client-side as requested. No real backend will be connected.

## Proposed Changes

### Project Structure
- **Root**: `C:\Users\Aviral\.gemini\antigravity\scratch\lifelens`
- **Tech Stack**: Vite, React 18, Tailwind CSS, Lucide React.

### Components
#### [NEW] `src/components/`
- `Hero.jsx`: Main landing area with animated background/gradient, headline, CTAs.
- `Problem.jsx`: 3-column layout for pain points.
- `Solution.jsx`: Simple high-impact one-liner.
- `HowItWorks.jsx`: Horizontal process flow.
- `DemoWidget.jsx`: The core interactive component. State-driven risk calculator.
- `Features.jsx`: Grid of feature cards.
- `LocalProof.jsx`: Delhi AQI chart mock.
- `Waitlist.jsx`: Form with local storage persistence for referral codes.
- `Investor.jsx`: Section specifically for the pitch deck and KPIs.
- `Team.jsx`: Founder info.
- `Footer.jsx`: Legal and links.
- `LanguageToggle.jsx`: Floating or fixed switch for Eng/Hindi.

### Logic
- **Localization**: Simple JSON object or mapping for text content to switch between English and Hindi.
- **Theme**: `dark` class on `html` element, toggled via state/localStorage.
- **Demo Widget**: Simple heuristic: `(ScreenHours > 6 || Sleep < 6) ? HighRisk : LowRisk`.

### Assets
- `public/pitch-deck.pdf`: Placeholder file.
- `public/demo-gif.mp4`: Placeholder file.

## Verification Plan
### Automated Tests
- `npm run dev` to ensure build success.
- `npm run build` to verify production build.

### Manual Verification
- Verify responsiveness on mobile view (Chrome DevTools).
- Test Language Toggle switches all text.
- Test Dark Mode toggle.
- Test Demo Widget inputs generate the expected card.
- Test Waitlist form generates a referral code.
