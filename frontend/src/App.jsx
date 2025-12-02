import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AQIProvider } from './context/AQIContext';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

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
      <AuthProvider>
        <AQIProvider>
          <Router>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/demo" element={<DemoPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </AQIProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
