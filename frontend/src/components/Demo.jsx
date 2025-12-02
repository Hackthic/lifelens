import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import DemoWidget from './DemoWidget';

const Demo = () => {
    const { t } = useLanguage();

    return (
        <section id="demo" className="py-20 px-4 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Try It Yourself
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        Adjust your daily health metrics and see how our AI predicts potential health risks in real-time
                    </p>
                </motion.div>

                {/* Grid Layout - Text Left, Widget Right */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Explanation Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                            See Disease Prediction in Action
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Our AI analyzes multiple health metrics simultaneously to identify patterns that could lead to health issues.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Comprehensive Data Input</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Track sleep, screen time, water intake, steps, exercise, and environmental factors</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">AI Pattern Recognition</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Machine learning identifies correlations across all your health metrics</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Preventive Recommendations</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Get specific, actionable steps to prevent predicted health issues</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Demo Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <DemoWidget />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Demo;
