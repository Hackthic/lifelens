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

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-800/50 border border-teal-700 text-teal-200 text-sm font-medium mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('solution.headline')}</span>
                </motion.div>

                {/* Content Grid - Text Left, Image Right */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <p className="text-3xl md:text-xl lg:text-4xl font-bold leading-tight">
                            "{t('solution.text')}"
                        </p>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <img
                            src="/prevention_better_cure.png"
                            alt="Prevention is better than cure - LifeLens approach vs traditional healthcare"
                            className="w-full h-auto rounded-2xl shadow-2xl border border-teal-700"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
