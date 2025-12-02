import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, TrendingUp, Download } from 'lucide-react';
import { calculateBMI, getBMICategory, calculateHealthRisks } from '../../utils/healthRiskCalculator';
import { getPersonalizedRecommendations } from '../../utils/healthRecommendations';

const HealthReport = ({ profile, onClose }) => {
    const bmi = calculateBMI(parseFloat(profile.weight), parseFloat(profile.height));
    const bmiCategory = getBMICategory(bmi);
    const riskAssessment = calculateHealthRisks({ ...profile, bmi });
    const recommendations = getPersonalizedRecommendations(riskAssessment);

    const getRiskColor = (level) => {
        const colors = {
            low: { bg: '#E8F5E9', text: '#66BB6A', border: '#A5D6A7' },
            moderate: { bg: '#FFF3E0', text: '#FF9800', border: '#FFCC80' },
            high: { bg: '#FFEBEE', text: '#F44336', border: '#EF9A9A' },
            severe: { bg: '#FFCDD2', text: '#B71C1C', border: '#E57373' }
        };
        return colors[level] || colors.moderate;
    };

    const overallColor = getRiskColor(riskAssessment.riskLevel);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full my-8"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Your LifeLens Health Report
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Personalized insights based on your profile
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                <div className="p-6 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Overall Risk Score */}
                    <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: overallColor.bg }}>
                        <div className="text-6xl font-bold mb-2" style={{ color: overallColor.text }}>
                            {riskAssessment.overallRisk}
                        </div>
                        <div className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            Overall Health Risk Score
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold"
                            style={{ backgroundColor: overallColor.text, color: 'white' }}>
                            {riskAssessment.riskLevel.toUpperCase()} RISK
                        </div>
                    </div>

                    {/* BMI Section */}
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            Body Mass Index (BMI)
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-4xl font-bold mb-2" style={{ color: bmiCategory.color }}>
                                    {bmi.toFixed(1)}
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
                                    style={{ backgroundColor: bmiCategory.bgColor, color: bmiCategory.color }}>
                                    {bmiCategory.label}
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                    {bmiCategory.description}
                                </p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Height:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{profile.height} cm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Weight:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{profile.weight} kg</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Age:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{profile.age} years</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Health Concerns */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            Top Health Concerns
                        </h3>
                        <div className="space-y-4">
                            {riskAssessment.topConcerns.map((concern, index) => {
                                const color = getRiskColor(concern.severity);
                                return (
                                    <div key={index} className="p-4 rounded-xl border-2" style={{ borderColor: color.border, backgroundColor: color.bg }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                {index + 1}. {concern.category}
                                            </div>
                                            <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: color.text, color: 'white' }}>
                                                {concern.score}% Risk
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detailed Recommendations */}
                    {recommendations.map((rec, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {rec.title}
                                    </h4>
                                    {rec.problems && (
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                Potential Health Issues:
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                {rec.problems.map((problem, i) => (
                                                    <li key={i}>{problem}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {rec.causes && (
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                                Common Causes:
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                {rec.causes.map((cause, i) => (
                                                    <li key={i}>{cause}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <div className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Recommended Actions:
                                        </div>
                                        <ul className="space-y-2">
                                            {rec.recommendations.map((recommendation, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                    <span className="text-teal-600 dark:text-teal-400 flex-shrink-0">✓</span>
                                                    <span>{recommendation}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {rec.urgency && (
                                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                                            <div className="text-sm font-semibold text-rose-700 dark:text-rose-300 mb-1">
                                                ⚠️ When to Seek Medical Help:
                                            </div>
                                            <div className="text-sm text-rose-600 dark:text-rose-400">
                                                {rec.urgency}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA Section */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-600 to-blue-600 text-white text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-3">
                            Ready to Take Control of Your Health?
                        </h3>
                        <p className="text-teal-50 mb-6 max-w-2xl mx-auto">
                            LifeLens tracks all these metrics automatically and provides daily personalized recommendations to prevent health issues before they start.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button className="px-8 py-4 rounded-2xl bg-white text-teal-600 font-semibold hover:shadow-xl transition-all hover:scale-105">
                                Join Delhi Beta — Free
                            </button>
                            <button className="px-8 py-4 rounded-2xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HealthReport;
