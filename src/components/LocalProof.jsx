import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const LocalProof = () => {
    const { t } = useLanguage();

    // Mock data for chart bars (height percentages)
    const chartData = [40, 60, 85, 95, 70, 50, 90];

    return (
        <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                    >
                        {t('delhi.headline')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        {t('delhi.text')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-800"
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-semibold">{t('delhi.stat')}</span>
                    </motion.div>
                </div>

                <div className="flex-1 w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-end h-48 gap-3">
                            {chartData.map((height, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${height}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`w-full rounded-t-lg relative group ${height > 80 ? 'bg-rose-500' : height > 50 ? 'bg-amber-500' : 'bg-teal-500'
                                        }`}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm whitespace-nowrap z-10">
                                        AQI {Math.round(height * 3)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase tracking-wider">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-xs text-slate-500">New Delhi (Last 7 Days)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalProof;
