import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Hero = () => {
    const { t } = useLanguage();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCtaClick = () => {
        if (isAuthenticated) {
            navigate('/demo');
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/50 via-slate-50 to-slate-50 dark:from-teal-900/20 dark:via-slate-950 dark:to-slate-950" />

            <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium border border-teal-100 dark:border-teal-800"
                >
                    <MapPin className="w-4 h-4" />
                    <span>Launching in: Delhi NCR</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
                >
                    {t('hero.headline')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                    {t('hero.subhead')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={handleCtaClick}
                        className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 group"
                    >
                        {isAuthenticated ? 'Go to Dashboard' : t('hero.ctaPrimary')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm text-slate-500 dark:text-slate-400 font-medium"
                >
                    {t('hero.tagline')}
                </motion.p>
            </div>

            {/* Demo Video */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-video relative group"
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <video
                        src="/LifeLens_AI_Lifestyle_Coach.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        poster="https://placehold.co/1920x1080/e2e8f0/1e293b?text=LifeLens+Demo+Preview"
                    />
                </div>
            </motion.div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode="signup"
            />
        </section>
    );
};

export default Hero;
