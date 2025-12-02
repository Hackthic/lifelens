import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, Zap, FileText, Shield, FileBarChart } from 'lucide-react';

const Features = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: Calendar,
            title: t('features.f1'),
            desc: t('features.f1Desc'),
            color: 'text-teal-500',
            bg: 'bg-teal-50 dark:bg-teal-900/20',
        },
        {
            icon: Zap,
            title: t('features.f2'),
            desc: t('features.f2Desc'),
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
        },
        {
            icon: FileText,
            title: t('features.f3'),
            desc: t('features.f3Desc'),
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
        },
        {
            icon: Shield,
            title: t('features.f4'),
            desc: t('features.f4Desc'),
            color: 'text-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        },
        {
            icon: FileBarChart,
            title: t('features.f5'),
            desc: t('features.f5Desc'),
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
        },
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-teal-200 dark:hover:border-teal-800 transition-colors group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
