import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Smartphone, CloudSun, BrainCircuit, BellRing, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const { t } = useLanguage();

    const steps = [
        {
            icon: Smartphone,
            title: t('howItWorks.step1'),
            desc: t('howItWorks.step1Desc'),
        },
        {
            icon: CloudSun,
            title: t('howItWorks.step2'),
            desc: t('howItWorks.step2Desc'),
        },
        {
            icon: BrainCircuit,
            title: t('howItWorks.step3'),
            desc: t('howItWorks.step3Desc'),
        },
        {
            icon: BellRing,
            title: t('howItWorks.step4'),
            desc: t('howItWorks.step4Desc'),
        },
    ];

    return (
        <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 z-10">
                                <step.icon className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px]">
                                {step.desc}
                            </p>

                            {index < steps.length - 1 && (
                                <ArrowRight className="md:hidden w-6 h-6 text-slate-300 mt-6 rotate-90" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Sample Rule */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-2xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4"
                >
                    <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div className="font-mono text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-purple-600 dark:text-purple-400">If</span> PM2.5 &gt; 200 <span className="text-purple-600 dark:text-purple-400">&</span> user.plans_outdoor <span className="text-purple-600 dark:text-purple-400">→</span> recommend(mask)
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
