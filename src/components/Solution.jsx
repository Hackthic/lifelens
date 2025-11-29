import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Solution = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-4 bg-teal-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-800 to-teal-950 opacity-90"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-800/50 border border-teal-700 text-teal-200 text-sm font-medium mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('solution.headline')}</span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold leading-tight md:leading-tight"
                >
                    "{t('solution.text')}"
                </motion.p>
            </div>
        </section>
    );
};

export default Solution;
