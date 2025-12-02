import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAQIContext } from '../context/AQIContext';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import AQIIndicator from './AQIIndicator';
import AuthModal from './AuthModal';

const Navbar = ({ darkMode, setDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    const { t } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleAuthClick = (mode) => {
        setAuthMode(mode);
        setShowAuthModal(true);
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navItems = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.contact'), href: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
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
                            ))}

                            {/* Demo/Dashboard Button */}
                            <button
                                onClick={() => {
                                    if (isAuthenticated) {
                                        navigate('/demo');
                                    } else {
                                        handleAuthClick('signup');
                                    }
                                }}
                                className="px-6 py-2 bg-gradient-to-r from-primary to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                {isAuthenticated ? 'Dashboard' : t('nav.demo')}
                            </button>

                            {/* AQI Indicator */}
                            <div className="ml-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                                <AQIIndicator {...useAQIContext()} compact showLocation />
                            </div>

                            {/* Language & Theme & Auth */}
                            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                                <LanguageToggle />
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                                </button>

                                {isAuthenticated ? (
                                    <div className="relative group ml-2">
                                        <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                                                {user?.name?.split(' ')[0]}
                                            </span>
                                        </button>

                                        {/* Dropdown */}
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                            <div className="py-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAuthClick('login')}
                                        className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                                    >
                                        Login
                                    </button>
                                )}
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
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
                        {isAuthenticated && (
                            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{user?.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                                </div>
                            </div>
                        )}

                        {navItems.map((item) => (
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
                        ))}

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                if (isAuthenticated) {
                                    navigate('/demo');
                                } else {
                                    handleAuthClick('signup');
                                }
                            }}
                            className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                        >
                            {isAuthenticated ? 'Dashboard' : t('nav.demo')}
                        </button>

                        {!isAuthenticated ? (
                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    onClick={() => handleAuthClick('login')}
                                    className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => handleAuthClick('signup')}
                                    className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full mt-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
            />
        </>
    );
};

export default Navbar;
