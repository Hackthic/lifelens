import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Download } from 'lucide-react';

const Investor = () => {
    const { t } = useLanguage();

    const kpis = [
        { icon: Target, text: t('investor.kpi1') },
        { icon: TrendingUp, text: t('investor.kpi2') },
        { icon: Users, text: t('investor.kpi3') },
    ];

    return (
        <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-4xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4 block"
                >
                    {t('investor.headline')}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 leading-tight"
                >
                    "{t('investor.vision')}"
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {kpis.map((kpi, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                        >
                            <kpi.icon className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {kpi.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="mailto:aviral@example.com"
                        className="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
                    >
                        {t('investor.cta')}
                    </a>
                    <a
                        href="/pitch-deck.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Pitch Deck
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Investor;
