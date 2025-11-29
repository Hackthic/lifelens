import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import DemoWidget from './components/DemoWidget';
import Features from './components/Features';
import LocalProof from './components/LocalProof';
import Waitlist from './components/Waitlist';
import Investor from './components/Investor';
import Team from './components/Team';
import Footer from './components/Footer';
import LanguageToggle from './components/LanguageToggle';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <LanguageToggle />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <DemoWidget />
            <div className="hidden md:block">
              {/* Placeholder for demo context or image if needed, or just center the widget */}
            </div>
          </div>
          <Features />
          <LocalProof />
          <Waitlist />
          <Investor />
          <Team />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
