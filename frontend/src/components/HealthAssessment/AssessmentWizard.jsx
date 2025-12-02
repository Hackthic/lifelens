import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { calculateBMI, getBMICategory, calculateHealthRisks } from '../../utils/healthRiskCalculator';
import { useHealthProfile } from '../../hooks/useHealthProfile';
import HealthReport from './HealthReport';

const AssessmentWizard = ({ onClose }) => {
    const { saveProfile } = useHealthProfile();
    const [step, setStep] = useState(0);
    const [showReport, setShowReport] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        occupation: '',
        physicalActivity: '',
        screenTime: '',
        diet: ''
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // Calculate BMI and health risks
        const bmi = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
        const bmiCategory = getBMICategory(bmi);

        const profile = {
            ...formData,
            age: parseInt(formData.age),
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            bmi: parseFloat(bmi.toFixed(1)),
            bmiCategory: bmiCategory.label
        };

        const riskAssessment = calculateHealthRisks(profile);

        const completeProfile = {
            ...profile,
            ...riskAssessment,
            completedAt: new Date().toISOString()
        };

        saveProfile(completeProfile);
        setShowReport(true);
    };

    const steps = [
        {
            title: 'Welcome to LifeLens',
            subtitle: 'Get your personalized health assessment in 2 minutes',
            content: (
                <div className="text-center space-y-6 py-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            Discover Your Health Risks
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                            Answer a few quick questions to get personalized health insights and recommendations based on medical research.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                            <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">Step 1</div>
                            <div className="text-slate-600 dark:text-slate-400">Basic Info</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                            <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">Step 2</div>
                            <div className="text-slate-600 dark:text-slate-400">Lifestyle</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
                            <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">Step 3</div>
                            <div className="text-slate-600 dark:text-slate-400">Results</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Basic Information',
            subtitle: 'Tell us about yourself',
            content: (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Age *
                            </label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => updateField('age', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="25"
                                min="10"
                                max="100"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Gender *
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => updateField('gender', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Weight (kg) *
                            </label>
                            <input
                                type="number"
                                value={formData.weight}
                                onChange={(e) => updateField('weight', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="70"
                                min="20"
                                max="200"
                                step="0.1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Height (cm) *
                            </label>
                            <input
                                type="number"
                                value={formData.height}
                                onChange={(e) => updateField('height', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="170"
                                min="100"
                                max="250"
                                required
                            />
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Occupation & Activity',
            subtitle: 'Your daily routine',
            content: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Occupation Type *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: 'student', label: 'Student', icon: '🎓' },
                                { value: 'working_professional', label: 'Working Professional', icon: '💼' },
                                { value: 'housewife', label: 'Homemaker', icon: '🏠' },
                                { value: 'retired', label: 'Retired', icon: '🌴' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => updateField('occupation', option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${formData.occupation === option.value
                                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{option.icon}</div>
                                    <div className="font-medium text-slate-900 dark:text-white text-sm">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Physical Activity Level *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'low', label: 'Low', desc: 'Mostly sitting' },
                                { value: 'moderate', label: 'Moderate', desc: 'Some activity' },
                                { value: 'high', label: 'High', desc: 'Very active' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => updateField('physicalActivity', option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${formData.physicalActivity === option.value
                                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                                        }`}
                                >
                                    <div className="font-medium text-slate-900 dark:text-white mb-1">{option.label}</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Screen Time & Diet',
            subtitle: 'Your daily habits',
            content: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Average Daily Screen Time *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'low', label: 'Low', desc: '< 4 hours' },
                                { value: 'moderate', label: 'Moderate', desc: '4-8 hours' },
                                { value: 'heavy', label: 'Heavy', desc: '> 8 hours' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => updateField('screenTime', option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${formData.screenTime === option.value
                                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                                        }`}
                                >
                                    <div className="font-medium text-slate-900 dark:text-white mb-1">{option.label}</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">{option.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            Primary Diet Type *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: 'homemade', label: 'Homemade', icon: '🏡' },
                                { value: 'mixed', label: 'Mixed', icon: '🍱' },
                                { value: 'outside', label: 'Restaurant/Outside', icon: '🍽️' },
                                { value: 'junk', label: 'Fast Food/Junk', icon: '🍔' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => updateField('diet', option.value)}
                                    className={`p-4 rounded-xl border-2 transition-all ${formData.diet === option.value
                                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                                            : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{option.icon}</div>
                                    <div className="font-medium text-slate-900 dark:text-white text-sm">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const isStepValid = () => {
        if (step === 0) return true;
        if (step === 1) return formData.age && formData.gender && formData.weight && formData.height;
        if (step === 2) return formData.occupation && formData.physicalActivity;
        if (step === 3) return formData.screenTime && formData.diet;
        return false;
    };

    if (showReport) {
        return <HealthReport profile={formData} onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {steps[step].title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {steps[step].subtitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-teal-600 to-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-right">
                        Step {step + 1} of {steps.length}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {steps[step].content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                    <button
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="px-6 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <button
                        onClick={() => {
                            if (step === steps.length - 1) {
                                handleSubmit();
                            } else {
                                setStep(s => s + 1);
                            }
                        }}
                        disabled={!isStepValid()}
                        className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {step === steps.length - 1 ? 'Get My Results' : 'Next'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AssessmentWizard;
