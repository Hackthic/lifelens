import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const Team = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
                    Meet the Team
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Founder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg"
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-4 overflow-hidden">
                            <img
                                src="https://ui-avatars.com/api/?name=Aviral+Pandey&background=0ea5a4&color=fff"
                                alt="Aviral Pandey"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aviral Pandey</h3>
                        <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-2">Founder & CEO</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Engineer, teacher, product founder.
                        </p>
                        <div className="flex justify-center gap-3">
                            <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-teal-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Placeholder 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 border-dashed"
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-4 flex items-center justify-center text-slate-400">
                            <Users className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Join Us</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Co-founder (Tech)</p>
                        <p className="text-xs text-slate-400">Hiring now</p>
                    </motion.div>

                    {/* Placeholder 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 border-dashed"
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-4 flex items-center justify-center text-slate-400">
                            <Users className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Join Us</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Head of Growth</p>
                        <p className="text-xs text-slate-400">Hiring now</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

import { Users } from 'lucide-react'; // Import missing icon
export default Team;
