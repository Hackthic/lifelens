import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-4">

                {/* FAQ Section */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    {t(`footer.faq.q${i}`)}
                                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                                        >
                                            {t(`footer.faq.a${i}`)}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legal & Links */}
                <div className="grid md:grid-cols-2 gap-8 items-start border-t border-slate-200 dark:border-slate-800 pt-10">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">LifeLens</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                            {t('footer.privacy')}
                        </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-4">
                        <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                            <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            {t('footer.legal')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
