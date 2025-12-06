import React, { useState, useEffect } from 'react';
import { trackingAPI, analyticsAPI } from '../../services/api';
import './Overview.css';

const Overview = ({ profileData, todayTracking, onNavigate }) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        loadInsights();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
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
            },
            sleep: {
                current: todayTracking.sleep?.duration || 0,
                target: 8
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

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return '🌅 Good Morning';
        if (hour < 17) return '☀️ Good Afternoon';
        if (hour < 21) return '🌆 Good Evening';
        return '🌙 Good Night';
    };

    const getTodayDate = () => {
        return currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getMoodEmoji = (mood) => {
        const moodEmojis = {
            'very-poor': '😢',
            'poor': '😕',
            'neutral': '😐',
            'good': '🙂',
            'excellent': '😄'
        };
        return moodEmojis[mood] || '😊';
    };

    const getSleepQuality = (quality) => {
        const qualityMap = {
            'poor': { text: 'Poor', color: '#ef4444' },
            'fair': { text: 'Fair', color: '#f59e0b' },
            'good': { text: 'Good', color: '#3b82f6' },
            'excellent': { text: 'Excellent', color: '#10b981' }
        };
        return qualityMap[quality] || { text: 'Not Logged', color: '#9ca3af' };
    };

    const getCompletionPercentage = () => {
        const fields = [progress.steps, progress.water, progress.calories, progress.sleep];
        const completed = fields.filter(field => field.current > 0).length;
        return Math.round((completed / fields.length) * 100);
    };

    return (
        <div className="overview-container">
            {/* Hero Header */}
            <div className="hero-header">
                <div className="hero-content">
                    <h1 className="greeting">{getGreeting()}, {profileData?.name}!</h1>
                    <p className="current-date">{getTodayDate()}</p>
                    <p className="hero-subtitle">Track your health, one day at a time</p>
                </div>
                <button className="quick-entry-btn-hero" onClick={() => onNavigate('daily-entry')}>
                    <span>📝</span>
                    <span>Log Today's Data</span>
                </button>
            </div>

            {/* Daily Completion Progress */}
            <div className="completion-card">
                <div className="completion-header">
                    <div>
                        <h3>Daily Progress</h3>
                        <p>Keep up the good work!</p>
                    </div>
                    <div className="completion-percentage">
                        <span className="percentage-value">{getCompletionPercentage()}%</span>
                        <span className="percentage-label">Complete</span>
                    </div>
                </div>
                <div className="completion-bar">
                    <div
                        className="completion-fill"
                        style={{ width: `${getCompletionPercentage()}%` }}
                    />
                </div>
            </div>

            {/* Primary Stats Grid */}
            <div className="primary-stats-grid">
                {/* Steps Card */}
                <div className="modern-stat-card steps-card">
                    <div className="card-icon-wrapper" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <span className="card-icon">👟</span>
                    </div>
                    <div className="card-content">
                        <h4 className="card-label">Steps</h4>
                        <div className="card-value">{progress.steps?.current?.toLocaleString() || 0}</div>
                        <p className="card-target">Target: {progress.steps?.target?.toLocaleString() || 0}</p>
                        <div className="circular-progress">
                            <div className="progress-ring" style={{
                                background: `conic-gradient(#667eea ${getProgressPercentage(progress.steps?.current, progress.steps?.target) * 3.6}deg, #e5e7eb 0deg)`
                            }}>
                                <div className="progress-inner">
                                    {Math.round(getProgressPercentage(progress.steps?.current, progress.steps?.target))}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Water Card */}
                <div className="modern-stat-card water-card">
                    <div className="card-icon-wrapper" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}>
                        <span className="card-icon">💧</span>
                    </div>
                    <div className="card-content">
                        <h4 className="card-label">Water Intake</h4>
                        <div className="card-value">{progress.water?.current || 0}<span className="unit">ml</span></div>
                        <p className="card-target">Target: {progress.water?.target || 0}ml</p>
                        <div className="circular-progress">
                            <div className="progress-ring" style={{
                                background: `conic-gradient(#06b6d4 ${getProgressPercentage(progress.water?.current, progress.water?.target) * 3.6}deg, #e5e7eb 0deg)`
                            }}>
                                <div className="progress-inner">
                                    {Math.round(getProgressPercentage(progress.water?.current, progress.water?.target))}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calories Card */}
                <div className="modern-stat-card calories-card">
                    <div className="card-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
                        <span className="card-icon">🔥</span>
                    </div>
                    <div className="card-content">
                        <h4 className="card-label">Calories</h4>
                        <div className="card-value">{progress.calories?.current || 0}<span className="unit">cal</span></div>
                        <p className="card-target">Target: {progress.calories?.target || 0}</p>
                        <div className="circular-progress">
                            <div className="progress-ring" style={{
                                background: `conic-gradient(#f59e0b ${getProgressPercentage(progress.calories?.current, progress.calories?.target) * 3.6}deg, #e5e7eb 0deg)`
                            }}>
                                <div className="progress-inner">
                                    {Math.round(getProgressPercentage(progress.calories?.current, progress.calories?.target))}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sleep Card */}
                <div className="modern-stat-card sleep-card">
                    <div className="card-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}>
                        <span className="card-icon">😴</span>
                    </div>
                    <div className="card-content">
                        <h4 className="card-label">Sleep</h4>
                        <div className="card-value">{progress.sleep?.current || 0}<span className="unit">hrs</span></div>
                        <p className="card-target">Target: {progress.sleep?.target || 0} hrs</p>
                        <div className="circular-progress">
                            <div className="progress-ring" style={{
                                background: `conic-gradient(#8b5cf6 ${getProgressPercentage(progress.sleep?.current, progress.sleep?.target) * 3.6}deg, #e5e7eb 0deg)`
                            }}>
                                <div className="progress-inner">
                                    {Math.round(getProgressPercentage(progress.sleep?.current, progress.sleep?.target))}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="secondary-stats-grid">
                <div className="secondary-card mood-card">
                    <div className="secondary-icon">{getMoodEmoji(todayTracking?.mental?.mood)}</div>
                    <div className="secondary-content">
                        <h4>Today's Mood</h4>
                        <p className="secondary-value">
                            {todayTracking?.mental?.mood ?
                                todayTracking.mental.mood.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
                                'Not Logged'
                            }
                        </p>
                    </div>
                </div>

                <div className="secondary-card stress-card">
                    <div className="secondary-icon">🧘</div>
                    <div className="secondary-content">
                        <h4>Stress Level</h4>
                        <p className="secondary-value">
                            {todayTracking?.mental?.stressLevel ? `${todayTracking.mental.stressLevel}/10` : 'Not Logged'}
                        </p>
                    </div>
                </div>

                <div className="secondary-card exercise-card">
                    <div className="secondary-icon">🏋️</div>
                    <div className="secondary-content">
                        <h4>Exercise</h4>
                        <p className="secondary-value">
                            {todayTracking?.activity?.exerciseDuration ? `${todayTracking.activity.exerciseDuration} min` : 'Not Logged'}
                        </p>
                    </div>
                </div>

                <div className="secondary-card sleep-quality-card">
                    <div className="secondary-icon">⭐</div>
                    <div className="secondary-content">
                        <h4>Sleep Quality</h4>
                        <p className="secondary-value" style={{ color: getSleepQuality(todayTracking?.sleep?.quality).color }}>
                            {getSleepQuality(todayTracking?.sleep?.quality).text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Insights Section */}
            {insights && (
                <div className="insights-section-modern">
                    <h2>💡 Your Insights</h2>
                    <div className="insights-grid-modern">
                        {insights.insights?.map((insight, index) => (
                            <div key={index} className={`insight-card-modern insight-${insight.level}`}>
                                <div className="insight-header">
                                    <span className="insight-badge">{insight.type}</span>
                                    <span className={`insight-status status-${insight.level}`}>
                                        {insight.level === 'good' && '✓'}
                                        {insight.level === 'moderate' && '!'}
                                        {insight.level === 'needs-improvement' && '⚠'}
                                    </span>
                                </div>
                                <p className="insight-message">{insight.message}</p>
                            </div>
                        ))}
                        {insights.suggestions && insights.suggestions.length > 0 && (
                            <div className="suggestions-card-modern">
                                <h4>💪 Personalized Suggestions</h4>
                                <ul>
                                    {insights.suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions-modern">
                <button onClick={() => onNavigate('analytics')} className="action-card">
                    <span className="action-icon">📈</span>
                    <div className="action-content">
                        <h4>Analytics</h4>
                        <p>View detailed trends</p>
                    </div>
                    <span className="action-arrow">→</span>
                </button>
                <button onClick={() => onNavigate('goals')} className="action-card">
                    <span className="action-icon">🎯</span>
                    <div className="action-content">
                        <h4>Goals</h4>
                        <p>Manage your targets</p>
                    </div>
                    <span className="action-arrow">→</span>
                </button>
                <button onClick={() => onNavigate('daily-entry')} className="action-card">
                    <span className="action-icon">📊</span>
                    <div className="action-content">
                        <h4>Daily Entry</h4>
                        <p>Log your health data</p>
                    </div>
                    <span className="action-arrow">→</span>
                </button>
            </div>
        </div>
    );
};

export default Overview;
