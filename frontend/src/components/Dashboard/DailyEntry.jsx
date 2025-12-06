import React, { useState, useEffect } from 'react';
import { trackingAPI } from '../../services/api';
import DietSection from './DietSection';
import './DailyEntry.css';

const DailyEntry = ({ existingData, onDataUpdate, profileData }) => {
    const [formData, setFormData] = useState({
        nutrition: {
            waterIntake: existingData?.nutrition?.waterIntake || '',
            glassesCount: existingData?.nutrition?.glassesCount || '',
            totalCalories: existingData?.nutrition?.totalCalories || '',
        },
        activity: {
            steps: existingData?.activity?.steps || '',
            exerciseDuration: existingData?.activity?.exerciseDuration || '',
        },
        sleep: {
            duration: existingData?.sleep?.duration || '',
            quality: existingData?.sleep?.quality || '',
        },
        mental: {
            mood: existingData?.mental?.mood || '',
            stressLevel: existingData?.mental?.stressLevel || 5,
        },
        wellness: {
            energyLevel: existingData?.wellness?.energyLevel || 5,
        },
        diet: existingData?.diet || {
            breakfast: [],
            lunch: [],
            snack: [],
            dinner: []
        }
    });

    // Auto-calculate total calories from diet
    useEffect(() => {
        const calculateDietCalories = () => {
            const { breakfast, lunch, snack, dinner } = formData.diet;
            const total = [...breakfast, ...lunch, ...snack, ...dinner]
                .reduce((sum, food) => sum + (food.calories || 0), 0);

            setFormData(prev => ({
                ...prev,
                nutrition: {
                    ...prev.nutrition,
                    totalCalories: total
                }
            }));
        };

        calculateDietCalories();
    }, [formData.diet]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [category, field] = name.split('.');

        setFormData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value === '' ? '' : (isNaN(value) ? value : parseFloat(value))
            }
        }));
    };

    const handleDietChange = (dietData) => {
        setFormData(prev => ({
            ...prev,
            diet: dietData
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await trackingAPI.submitDaily(formData);
            setMessage('✅ Data saved successfully!');
            onDataUpdate();
        } catch (error) {
            setMessage('❌ ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="daily-entry-container">
            <div className="entry-header">
                <h1>Daily Entry 📝</h1>
                <p>Track your health metrics for today</p>
            </div>

            <form onSubmit={handleSubmit} className="daily-entry-form">
                {/* Nutrition Section */}
                <div className="form-section">
                    <h2>💧 Nutrition & Hydration</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Water Intake (ml) <span className="required">*</span></label>
                            <input
                                type="number"
                                name="nutrition.waterIntake"
                                value={formData.nutrition.waterIntake}
                                onChange={handleChange}
                                placeholder="2000"
                                min="0"
                            />
                            <span className="helper-text">Target: {profileData?.baselines?.dailyWaterTarget || 2000}ml</span>
                        </div>
                        <div className="form-group">
                            <label>Number of Glasses</label>
                            <input
                                type="number"
                                name="nutrition.glassesCount"
                                value={formData.nutrition.glassesCount}
                                onChange={handleChange}
                                placeholder="8"
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Total Calories (Auto-calculated)</label>
                            <input
                                type="number"
                                name="nutrition.totalCalories"
                                value={formData.nutrition.totalCalories}
                                readOnly
                                placeholder="0"
                                min="0"
                                style={{ background: '#f9fafb', cursor: 'not-allowed' }}
                            />
                            <span className="helper-text">Automatically calculated from diet section below</span>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="form-section">
                    <h2>🏃 Physical Activity</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Steps <span className="required">*</span></label>
                            <input
                                type="number"
                                name="activity.steps"
                                value={formData.activity.steps}
                                onChange={handleChange}
                                placeholder="10000"
                                min="0"
                            />
                            <span className="helper-text">Target: {profileData?.baselines?.dailyStepTarget || 10000}</span>
                        </div>
                        <div className="form-group">
                            <label>Exercise Duration (minutes)</label>
                            <input
                                type="number"
                                name="activity.exerciseDuration"
                                value={formData.activity.exerciseDuration}
                                onChange={handleChange}
                                placeholder="30"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Sleep Section */}
                <div className="form-section">
                    <h2>😴 Sleep</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Sleep Duration (hours) <span className="required">*</span></label>
                            <input
                                type="number"
                                name="sleep.duration"
                                value={formData.sleep.duration}
                                onChange={handleChange}
                                placeholder="7.5"
                                min="0"
                                max="24"
                                step="0.5"
                            />
                        </div>
                        <div className="form-group">
                            <label>Sleep Quality <span className="required">*</span></label>
                            <select
                                name="sleep.quality"
                                value={formData.sleep.quality}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="poor">Poor</option>
                                <option value="fair">Fair</option>
                                <option value="good">Good</option>
                                <option value="excellent">Excellent</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mental Health Section */}
                <div className="form-section">
                    <h2>🧠 Mental Wellness</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Today's Mood <span className="required">*</span></label>
                            <select
                                name="mental.mood"
                                value={formData.mental.mood}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="very-poor">😢 Very Poor</option>
                                <option value="poor">😕 Poor</option>
                                <option value="neutral">😐 Neutral</option>
                                <option value="good">🙂 Good</option>
                                <option value="excellent">😄 Excellent</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Stress Level (1-10): {formData.mental.stressLevel}</label>
                            <input
                                type="range"
                                name="mental.stressLevel"
                                value={formData.mental.stressLevel}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                className="slider"
                            />
                            <div className="range-labels">
                                <span>Low</span>
                                <span>High</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Physical Wellness */}
                <div className="form-section">
                    <h2>💪 Physical Wellness</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Energy Level (1-10): {formData.wellness.energyLevel}</label>
                            <input
                                type="range"
                                name="wellness.energyLevel"
                                value={formData.wellness.energyLevel}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                className="slider"
                            />
                            <div className="range-labels">
                                <span>Low</span>
                                <span>High</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diet Section */}
                <div className="form-section">
                    <DietSection
                        dietData={formData.diet}
                        onDietChange={handleDietChange}
                    />
                </div>

                {message && (
                    <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Saving...' : '💾 Save Today\'s Data'}
                </button>
            </form>
        </div>
    );
};

export default DailyEntry;
