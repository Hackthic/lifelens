import React, { useState } from 'react';
import { profileAPI } from '../../services/api';
import './Goals.css';

const Goals = ({ profileData, onUpdate }) => {
    const [selectedGoals, setSelectedGoals] = useState(profileData?.goals || []);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const availableGoals = [
        { value: 'weight-loss', label: 'Weight Loss', icon: '🏃', description: 'Reduce body weight' },
        { value: 'weight-gain', label: 'Weight Gain', icon: '💪', description: 'Increase healthy weight' },
        { value: 'muscle-building', label: 'Muscle Building', icon: '🏋️', description: 'Build muscle mass' },
        { value: 'better-sleep', label: 'Better Sleep', icon: '😴', description: 'Improve sleep quality' },
        { value: 'stress-reduction', label: 'Stress Reduction', icon: '🧘', description: 'Lower stress levels' },
        { value: 'improved-fitness', label: 'Improved Fitness', icon: '🎯', description: 'Enhance overall fitness' },
        { value: 'better-nutrition', label: 'Better Nutrition', icon: '🥗', description: 'Eat healthier' },
        { value: 'quit-smoking', label: 'Quit Smoking', icon: '🚭', description: 'Stop smoking' },
        { value: 'reduce-screen-time', label: 'Reduce Screen Time', icon: '📱', description: 'Less device usage' },
        { value: 'mental-wellness', label: 'Mental Wellness', icon: '💆‍♀️', description: 'Better mental health' },
    ];

    const toggleGoal = (goalValue) => {
        setSelectedGoals(prev => {
            if (prev.includes(goalValue)) {
                return prev.filter(g => g !== goalValue);
            } else {
                return [...prev, goalValue];
            }
        });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage('');

        try {
            await profileAPI.updateGoals(selectedGoals);
            setMessage('✅ Goals updated successfully!');
            onUpdate();
        } catch (error) {
            setMessage('❌ ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="goals-container">
            <div className="goals-header">
                <h1>Your Health Goals 🎯</h1>
                <p>Select the goals you want to achieve</p>
            </div>

            <div className="goals-grid">
                {availableGoals.map(goal => (
                    <div
                        key={goal.value}
                        className={`goal-card ${selectedGoals.includes(goal.value) ? 'selected' : ''}`}
                        onClick={() => toggleGoal(goal.value)}
                    >
                        <div className="goal-icon">{goal.icon}</div>
                        <h3>{goal.label}</h3>
                        <p>{goal.description}</p>
                        <div className="goal-check">
                            {selectedGoals.includes(goal.value) && '✓'}
                        </div>
                    </div>
                ))}
            </div>

            {message && (
                <div className={`message ${message.startsWith('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            <div className="goals-actions">
                <div className="goals-summary">
                    {selectedGoals.length} {selectedGoals.length === 1 ? 'goal' : 'goals'} selected
                </div>
                <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading || selectedGoals.length === 0}
                >
                    {loading ? 'Saving...' : '💾 Save Goals'}
                </button>
            </div>
        </div>
    );
};

export default Goals;
