import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAQIContext } from '../context/AQIContext';
import { useHealthProfile } from '../hooks/useHealthProfile';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, RefreshCw, MapPin, User, TrendingUp } from 'lucide-react';
import { calculateBMI, getBMICategory, calculateHealthRisks, getScreenTimeHours } from '../utils/healthRiskCalculator';
import { getPersonalizedRecommendations } from '../utils/healthRecommendations';

const DemoWidget = () => {
    const { t } = useLanguage();
    const { aqi: realAqi, location: realLocation, loading: aqiLoading } = useAQIContext();
    const { profile: savedProfile, saveProfile, hasCompletedAssessment } = useHealthProfile();

    // Profile data
    const [showProfileForm, setShowProfileForm] = useState(!hasCompletedAssessment);
    const [profileData, setProfileData] = useState({
        age: savedProfile?.age || '',
        gender: savedProfile?.gender || '',
        weight: savedProfile?.weight || '',
        height: savedProfile?.height || '',
        occupation: savedProfile?.occupation || '',
        physicalActivity: savedProfile?.physicalActivity || '',
        diet: savedProfile?.diet || ''
    });

    // Real-time metrics
    const [screenHours, setScreenHours] = useState(savedProfile?.screenTime ? getScreenTimeHours(savedProfile.screenTime) : 7);
    const [sleepHours, setSleepHours] = useState(5);
    const [aqi, setAqi] = useState(210);
    const [waterIntake, setWaterIntake] = useState(1.5);
    const [steps, setSteps] = useState(3000);
    const [exercise, setExercise] = useState(15);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [useRealAqi, setUseRealAqi] = useState(true);

    // Auto-populate AQI from real location
    useEffect(() => {
        if (realAqi !== null && useRealAqi) {
            setAqi(realAqi);
        }
    }, [realAqi, useRealAqi]);

    const updateProfileField = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleProfileSubmit = () => {
        if (!profileData.age || !profileData.gender || !profileData.weight || !profileData.height ||
            !profileData.occupation || !profileData.physicalActivity || !profileData.diet) {
            alert('Please fill all fields');
            return;
        }

        const bmi = calculateBMI(parseFloat(profileData.weight), parseFloat(profileData.height));
        const profile = {
            ...profileData,
            age: parseInt(profileData.age),
            weight: parseFloat(profileData.weight),
            height: parseFloat(profileData.height),
            bmi: parseFloat(bmi.toFixed(1)),
            screenTime: screenHours > 8 ? 'heavy' : screenHours > 4 ? 'moderate' : 'low'
        };

        saveProfile(profile);
        setShowProfileForm(false);
    };

    const calculateComprehensiveRisk = () => {
        setLoading(true);

        setTimeout(() => {
            let enhancedProfile = savedProfile || {};

            // If no saved profile, use current form data
            if (!savedProfile && profileData.age) {
                const bmi = calculateBMI(parseFloat(profileData.weight), parseFloat(profileData.height));
                enhancedProfile = {
                    ...profileData,
                    age: parseInt(profileData.age),
                    weight: parseFloat(profileData.weight),
                    height: parseFloat(profileData.height),
                    bmi: parseFloat(bmi.toFixed(1)),
                    screenTime: screenHours > 8 ? 'heavy' : screenHours > 4 ? 'moderate' : 'low'
                };
            }

            // Calculate comprehensive health risks
            const riskAssessment = calculateHealthRisks({
                ...enhancedProfile,
                screenTime: screenHours > 8 ? 'heavy' : screenHours > 4 ? 'moderate' : 'low'
            });

            const recommendations = getPersonalizedRecommendations(riskAssessment);

            // Combine with real-time factors
            const realTimeFactors = [];
            if (sleepHours < 6) realTimeFactors.push('Insufficient sleep');
            if (waterIntake < 2) realTimeFactors.push('Low hydration');
            if (steps < 5000) realTimeFactors.push('Low daily activity');
            if (exercise < 30) realTimeFactors.push('Insufficient exercise');
            if (aqi > 200) realTimeFactors.push('Poor air quality');

            setResult({
                overallRisk: riskAssessment.overallRisk,
                riskLevel: riskAssessment.riskLevel,
                topConcerns: riskAssessment.topConcerns,
                realTimeFactors,
                recommendations: recommendations.slice(0, 2), // Top 2 recommendations
                bmi: enhancedProfile.bmi,
                bmiCategory: riskAssessment.bmiCategory
            });

            setLoading(false);
        }, 1000);
    };

    if (showProfileForm) {
        return (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <User className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Complete Your Profile
                        </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Tell us about yourself for personalized health insights
                    </p>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Age *
                            </label>
                            <input
                                type="number"
                                value={profileData.age}
                                onChange={(e) => updateProfileField('age', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="25"
                                min="10"
                                max="100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Gender *
                            </label>
                            <select
                                value={profileData.gender}
                                onChange={(e) => updateProfileField('gender', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Weight (kg) *
                            </label>
                            <input
                                type="number"
                                value={profileData.weight}
                                onChange={(e) => updateProfileField('weight', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="70"
                                min="20"
                                max="200"
                                step="0.1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Height (cm) *
                            </label>
                            <input
                                type="number"
                                value={profileData.height}
                                onChange={(e) => updateProfileField('height', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                placeholder="170"
                                min="100"
                                max="250"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Occupation *
                        </label>
                        <select
                            value={profileData.occupation}
                            onChange={(e) => updateProfileField('occupation', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            <option value="">Select</option>
                            <option value="student">Student</option>
                            <option value="working_professional">Working Professional</option>
                            <option value="housewife">Homemaker</option>
                            <option value="retired">Retired</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Physical Activity *
                        </label>
                        <select
                            value={profileData.physicalActivity}
                            onChange={(e) => updateProfileField('physicalActivity', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            <option value="">Select</option>
                            <option value="low">Low (Mostly sitting)</option>
                            <option value="moderate">Moderate (Some activity)</option>
                            <option value="high">High (Very active)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Diet Type *
                        </label>
                        <select
                            value={profileData.diet}
                            onChange={(e) => updateProfileField('diet', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                            <option value="">Select</option>
                            <option value="homemade">Homemade</option>
                            <option value="mixed">Mixed</option>
                            <option value="outside">Restaurant/Outside</option>
                            <option value="junk">Fast Food/Junk</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={handleProfileSubmit}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all"
                    >
                        Save & Continue
                    </button>
                    {hasCompletedAssessment && (
                        <button
                            onClick={() => setShowProfileForm(false)}
                            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Skip
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {t('demo.title')}
                    </h3>
                    {savedProfile && (
                        <button
                            onClick={() => setShowProfileForm(true)}
                            className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                        >
                            <User className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {savedProfile ? `Personalized for ${savedProfile.age}y ${savedProfile.gender}` : t('demo.subtitle')}
                </p>
            </div>

            <div className="space-y-6">
                {/* Existing sliders */}
                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {t('demo.screenHours')}
                        <span className="text-slate-900 dark:text-white">{screenHours}h</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="16"
                        step="0.5"
                        value={screenHours}
                        onChange={(e) => setScreenHours(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {t('demo.sleepHours')}
                        <span className="text-slate-900 dark:text-white">{sleepHours}h</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {t('demo.waterIntake')}
                        <span className="text-slate-900 dark:text-white">{waterIntake}L</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={waterIntake}
                        onChange={(e) => setWaterIntake(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {t('demo.steps')}
                        <span className="text-slate-900 dark:text-white">{steps.toLocaleString()}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="15000"
                        step="500"
                        value={steps}
                        onChange={(e) => setSteps(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        {t('demo.exercise')}
                        <span className="text-slate-900 dark:text-white">{exercise} min</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="120"
                        step="5"
                        value={exercise}
                        onChange={(e) => setExercise(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                        <div className="flex items-center gap-2">
                            {t('demo.locationAqi')}
                            {useRealAqi && realLocation && !aqiLoading && (
                                <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400">
                                    <MapPin className="w-3 h-3" />
                                    {realLocation.city}
                                </span>
                            )}
                        </div>
                        <span className={`font-bold ${aqi > 200 ? 'text-rose-500' : 'text-teal-500'}`}>{aqi}</span>
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={aqi}
                        onChange={(e) => {
                            setAqi(Number(e.target.value));
                            setUseRealAqi(false);
                        }}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                </div>

                <button
                    onClick={calculateComprehensiveRisk}
                    disabled={loading}
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <TrendingUp className="w-5 h-5" />
                            {t('demo.calculate')}
                        </>
                    )}
                </button>

                {/* Results */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800"
                        >
                            {/* Overall Risk Score */}
                            <div className={`p-6 rounded-2xl ${result.riskLevel === 'low' ? 'bg-green-50 dark:bg-green-900/20' :
                                    result.riskLevel === 'moderate' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                                        result.riskLevel === 'high' ? 'bg-orange-50 dark:bg-orange-900/20' :
                                            'bg-rose-50 dark:bg-rose-900/20'
                                }`}>
                                <div className="text-center">
                                    <div className={`text-5xl font-bold mb-2 ${result.riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                                            result.riskLevel === 'moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                                                result.riskLevel === 'high' ? 'text-orange-600 dark:text-orange-400' :
                                                    'text-rose-600 dark:text-rose-400'
                                        }`}>
                                        {result.overallRisk}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase">
                                        {result.riskLevel} Risk
                                    </div>
                                    {result.bmi && (
                                        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            BMI: {result.bmi} ({result.bmiCategory.label})
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Top Concerns */}
                            {result.topConcerns && result.topConcerns.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                        Top Health Concerns:
                                    </h4>
                                    <div className="space-y-2">
                                        {result.topConcerns.map((concern, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                                    {index + 1}. {concern.category}
                                                </span>
                                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                                                    {concern.score}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Real-time Factors */}
                            {result.realTimeFactors && result.realTimeFactors.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                        Current Risk Factors:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {result.realTimeFactors.map((factor, index) => (
                                            <span key={index} className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium">
                                                {factor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Top Recommendations */}
                            {result.recommendations && result.recommendations.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                        Recommended Actions:
                                    </h4>
                                    {result.recommendations.map((rec, index) => (
                                        <div key={index} className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                                            <div className="font-semibold text-slate-900 dark:text-white mb-2">
                                                {rec.title}
                                            </div>
                                            <ul className="space-y-1">
                                                {rec.recommendations.slice(0, 3).map((recommendation, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <span className="text-teal-600 dark:text-teal-400 flex-shrink-0">✓</span>
                                                        <span>{recommendation}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DemoWidget;
