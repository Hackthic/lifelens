import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

const DemoWidget = () => {
    const { t } = useLanguage();
    const [screenHours, setScreenHours] = useState(7);
    const [sleepHours, setSleepHours] = useState(5);
    const [aqi, setAqi] = useState(210);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const calculateRisk = () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const isHighRisk = screenHours > 6 || sleepHours < 6 || aqi > 200;
            setResult({
                level: isHighRisk ? 'High' : 'Low',
                type: isHighRisk ? 'Eye Strain & Fatigue' : 'Optimal Balance',
                confidence: 85 + Math.floor(Math.random() * 10),
                recommendation: isHighRisk
                    ? t('demo.recommended')
                    : "Keep up the good habits!",
                reason: isHighRisk
                    ? `Screen > 6h (${screenHours}h) + Sleep < 6h (${sleepHours}h)`
                    : "Balanced metrics observed."
            });
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        calculateRisk();
    }, [screenHours, sleepHours, aqi]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Live Risk Simulator
                </h3>
            </div>

            <div className="p-6 space-y-6">
                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                            {t('demo.screenHours')}
                            <span className="text-slate-900 dark:text-white">{screenHours}h</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="16"
                            value={screenHours}
                            onChange={(e) => setScreenHours(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                            {t('demo.sleepHours')}
                            <span className="text-slate-900 dark:text-white">{sleepHours}h</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={sleepHours}
                            onChange={(e) => setSleepHours(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                            {t('demo.locationAqi')} (Delhi)
                            <span className={`font-bold ${aqi > 200 ? 'text-rose-500' : 'text-teal-500'}`}>{aqi}</span>
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            step="10"
                            value={aqi}
                            onChange={(e) => setAqi(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                    </div>
                </div>

                {/* Result Card */}
                <AnimatePresence mode="wait">
                    {!loading && result && (
                        <motion.div
                            key={result.type}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-5 rounded-2xl border ${result.level === 'High'
                                    ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800'
                                    : 'bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-800'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-wider ${result.level === 'High' ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                                        }`}>
                                        {t('demo.risk')}: {result.level}
                                    </p>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                                        {result.type}
                                    </h4>
                                </div>
                                {result.level === 'High' ? (
                                    <AlertTriangle className="w-6 h-6 text-rose-500" />
                                ) : (
                                    <CheckCircle className="w-6 h-6 text-teal-500" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold">{t('demo.recommended')}:</span> {result.recommendation}
                                </p>
                                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 mt-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t('demo.confidence')}: {result.confidence}%
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                                        "{result.reason}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DemoWidget;
