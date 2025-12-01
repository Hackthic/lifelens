import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Team from '../components/Team';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

const AboutPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                        About LifeLens
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        We're building the world's first comprehensive disease prevention platform
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-20"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                LifeLens exists to shift healthcare from reactive treatment to proactive prevention. We believe that by tracking comprehensive health data and using AI to predict potential diseases, we can help people avoid health problems before they start.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Our philosophy is simple: <span className="font-bold text-teal-600 dark:text-teal-400">Prevention is better than cure</span>. We're starting in Delhi NCR, where residents face unique health challenges from air pollution, long work hours, and high stress.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                                <Target className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Our Goal</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Prevent diseases before they happen through comprehensive tracking and AI prediction
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Our Users</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Health-conscious individuals who want to take control of their wellbeing
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                                <Lightbulb className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Our Approach</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    AI-powered analysis of comprehensive health data for personalized insights
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800">
                                <Heart className="w-10 h-10 text-rose-600 dark:text-rose-400 mb-4" />
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Our Values</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Privacy-first, evidence-based, and focused on prevention over treatment
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-20 p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                        Why We Started LifeLens
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4 text-lg text-slate-600 dark:text-slate-400">
                        <p>
                            We noticed a fundamental problem in healthcare: people only seek help after they're already sick. By then, treatment is expensive, time-consuming, and often less effective.
                        </p>
                        <p>
                            Meanwhile, we're surrounded by technology that tracks our every move—our phones know our steps, our sleep, our screen time. But this data sits in silos, unused and unanalyzed.
                        </p>
                        <p>
                            We asked ourselves: <span className="font-semibold text-slate-900 dark:text-white">What if we could connect all these data points? What if AI could spot patterns that predict health issues before symptoms appear?</span>
                        </p>
                        <p>
                            That's how LifeLens was born. We're building a platform that tracks everything—food, water, sleep, exercise, steps, screen time, and environmental factors—and uses AI to predict potential diseases and provide medical-recommended preventive actions.
                        </p>
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Team />
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
