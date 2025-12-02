import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAQIContext } from '../context/AQIContext';
import LanguageToggle from './LanguageToggle';
import AQIIndicator from './AQIIndicator';

const Navbar = ({ darkMode, setDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const location = useLocation();

    const navItems = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.contact'), href: '/contact' },
        { name: t('nav.demo'), href: '/demo', isButton: true },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent"
                        >
                            LifeLens
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            item.isButton ? (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="px-6 py-2 bg-gradient-to-r from-primary to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200 relative group ${isActive(item.href) ? 'text-primary' : ''
                                        }`}
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                </Link>
                            )
                        ))}

                        {/* AQI Indicator */}
                        <div className="ml-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                            <AQIIndicator {...useAQIContext()} compact showLocation />
                        </div>

                        {/* Language Toggle and Theme Toggle */}
                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                            <LanguageToggle />
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                aria-label="Toggle Dark Mode"
                            >
                                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile: Theme Toggle and Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageToggle />
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
                    {navItems.map((item) => (
                        item.isButton ? (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive(item.href)
                                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
