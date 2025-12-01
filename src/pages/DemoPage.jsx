import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import DemoWidget from '../components/DemoWidget';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

const DemoPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Interactive Demo</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                        Experience AI-Powered Health Prediction
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        Adjust your daily health metrics and watch our AI predict potential health risks in real-time
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    {/* Left: Instructions & Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                How to Use the Simulator
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Adjust the sliders to match your typical daily habits. Our AI will analyze the data and predict potential health risks.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-teal-600 dark:text-teal-400 font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Input Your Data</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Adjust sliders for screen time, sleep, water intake, steps, exercise, and local air quality
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-teal-600 dark:text-teal-400 font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Watch AI Analysis</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        See real-time risk calculation as our AI analyzes patterns across all metrics
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-teal-600 dark:text-teal-400 font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Get Recommendations</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Receive medical-recommended preventive actions to avoid predicted health issues
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Why This Matters
                            </h3>
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                    <span className="text-slate-700 dark:text-slate-300">Predict health issues before symptoms appear</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                    <span className="text-slate-700 dark:text-slate-300">Prevention-focused, not reactive healthcare</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                    <span className="text-slate-700 dark:text-slate-300">Personalized recommendations based on your data</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Demo Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:sticky lg:top-24"
                    >
                        <DemoWidget />
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center p-12 rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-100 dark:border-teal-800"
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Ready to Take Control of Your Health?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                        Join the Delhi Beta and get comprehensive health tracking with AI-powered disease prediction
                    </p>
                    <a
                        href="/#waitlist"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-600/20"
                    >
                        Join Delhi Beta — Free
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default DemoPage;
