import React, { useState, useEffect } from 'react';
import { trackingAPI, analyticsAPI } from '../../services/api';
import './Overview.css';

const Overview = ({ profileData, todayTracking, onNavigate }) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInsights();
    }, []);

    const loadInsights = async () => {
        try {
            const response = await analyticsAPI.getInsights();
            setInsights(response.data?.insights);
        } catch (error) {
            console.error('Error loading insights:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateDailyProgress = () => {
        if (!todayTracking || !profileData?.baselines) return {};

        return {
            steps: {
                current: todayTracking.activity?.steps || 0,
                target: profileData.baselines.dailyStepTarget || 10000
            },
            water: {
                current: todayTracking.nutrition?.waterIntake || 0,
                target: profileData.baselines.dailyWaterTarget || 2000
            },
            calories: {
                current: todayTracking.nutrition?.totalCalories || 0,
                target: profileData.baselines.dailyCalorieTarget || 2000
            }
        };
    };

    const progress = calculateDailyProgress();

    const getProgressPercentage = (current, target) => {
        if (!target) return 0;
        return Math.min((current / target) * 100, 100);
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return '#10b981';
        if (percentage >= 50) return '#3b82f6';
        if (percentage >= 30) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="overview-container">
            <header className="overview-header">
                <div>
                    <h1>Welcome back, {profileData?.name}! 👋</h1>
                    <p>Here's your health overview for today</p>
                </div>
                <button className="quick-entry-btn" onClick={() => onNavigate('daily-entry')}>
                    + Log Today's Data
                </button>
            </header>

            <div className="stats-grid">
                {/* Steps Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-icon">👟</span>
                        <h3>Steps</h3>
                    </div>
                    <div className="stat-value">{progress.steps?.current?.toLocaleString() || 0}</div>
                    <div className="stat-target">Goal: {progress.steps?.target?.toLocaleString() || 0}</div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${getProgressPercentage(progress.steps?.current, progress.steps?.target)}%`,
                                backgroundColor: getProgressColor(getProgressPercentage(progress.steps?.current, progress.steps?.target))
                            }}
                        />
                    </div>
                </div>

                {/* Water Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-icon">💧</span>
                        <h3>Water</h3>
                    </div>
                    <div className="stat-value">{progress.water?.current || 0}ml</div>
                    <div className="stat-target">Goal: {progress.water?.target}ml</div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${getProgressPercentage(progress.water?.current, progress.water?.target)}%`,
                                backgroundColor: getProgressColor(getProgressPercentage(progress.water?.current, progress.water?.target))
                            }}
                        />
                    </div>
                </div>

                {/* Calories Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-icon">🔥</span>
                        <h3>Calories</h3>
                    </div>
                    <div className="stat-value">{progress.calories?.current || 0}</div>
                    <div className="stat-target">Goal: {progress.calories?.target}</div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${getProgressPercentage(progress.calories?.current, progress.calories?.target)}%`,
                                backgroundColor: getProgressColor(getProgressPercentage(progress.calories?.current, progress.calories?.target))
                            }}
                        />
                    </div>
                </div>

                {/* Mood Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-icon">😊</span>
                        <h3>Mood</h3>
                    </div>
                    <div className="stat-value mood-value">
                        {todayTracking?.mental?.mood ?
                            todayTracking.mental.mood.replace('-', ' ').toUpperCase() :
                            'Not recorded'
                        }
                    </div>
                    <div className="stat-target">
                        {todayTracking?.mental?.stressLevel &&
                            `Stress: ${todayTracking.mental.stressLevel}/10`
                        }
                    </div>
                </div>
            </div>

            {/* Insights Section */}
            <div className="insights-section">
                <h2>Your Insights 💡</h2>
                {loading ? (
                    <p>Loading insights...</p>
                ) : insights ? (
                    <div className="insights-grid">
                        {insights.insights?.map((insight, index) => (
                            <div key={index} className={`insight-card insight-${insight.level}`}>
                                <h4>{insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}</h4>
                                <p>{insight.message}</p>
                            </div>
                        ))}
                        {insights.suggestions && insights.suggestions.length > 0 && (
                            <div className="suggestions-card">
                                <h4>💪 Suggestions</h4>
                                <ul>
                                    {insights.suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Start tracking to get personalized insights!</p>
                )}
            </div>

            {/* Quick Links */}
            <div className="quick-links">
                <button onClick={() => onNavigate('analytics')} className="link-card">
                    <span className="link-icon">📈</span>
                    <span>View Analytics</span>
                </button>
                <button onClick={() => onNavigate('goals')} className="link-card">
                    <span className="link-icon">🎯</span>
                    <span>Manage Goals</span>
                </button>
            </div>
        </div>
    );
};

export default Overview;
