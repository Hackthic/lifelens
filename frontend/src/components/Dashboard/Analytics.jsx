import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import './Analytics.css';

const Analytics = ({ profileData }) => {
    const [period, setPeriod] = useState('weekly'); // weekly or monthly
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, [period]);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const response = period === 'weekly'
                ? await analyticsAPI.getWeekly()
                : await analyticsAPI.getMonthly();
            setData(response.data);
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatChartData = () => {
        if (!data?.rawData) return [];

        return data.rawData.map(entry => ({
            date: format(new Date(entry.date), 'MMM dd'),
            steps: entry.activity?.steps || 0,
            water: entry.nutrition?.waterIntake || 0,
            sleep: entry.sleep?.duration || 0,
            calories: entry.nutrition?.totalCalories || 0,
            stress: entry.mental?.stressLevel || 0,
            energy: entry.wellness?.energyLevel || 0,
        }));
    };

    const chartData = formatChartData();

    if (loading) {
        return (
            <div className="analytics-loading">
                <div className="spinner"></div>
                <p>Loading analytics...</p>
            </div>
        );
    }

    return (
        <div className="analytics-container">
            <div className="analytics-header">
                <h1>Analytics 📈</h1>
                <div className="period-selector">
                    <button
                        className={period === 'weekly' ? 'active' : ''}
                        onClick={() => setPeriod('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={period === 'monthly' ? 'active' : ''}
                        onClick={() => setPeriod('monthly')}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {chartData.length === 0 ? (
                <div className="no-data">
                    <p>📊 No data available yet. Start tracking to see your progress!</p>
                </div>
            ) : (
                <>
                    {/* Trends Summary */}
                    {data?.trends && (
                        <div className="trends-summary">
                            <h2>Trends Summary</h2>
                            <div className="trends-grid">
                                {Object.entries(data.trends).map(([key, trend]) => {
                                    if (!trend || !trend.average) return null;
                                    return (
                                        <div key={key} className={`trend-card trend-${trend.trend}`}>
                                            <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                            <div className="trend-value">{trend.average.toFixed(1)}</div>
                                            <div className="trend-indicator">
                                                {trend.trend === 'improving' && '📈 Improving'}
                                                {trend.trend === 'declining' && '📉 Declining'}
                                                {trend.trend === 'stable' && '➡️ Stable'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Steps Chart */}
                    <div className="chart-container">
                        <h3>Steps Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="steps"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    dot={{ fill: '#8b5cf6' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Water & Sleep Chart */}
                    <div className="chart-container">
                        <h3>Water Intake & Sleep</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="water" fill="#3b82f6" name="Water (ml)" />
                                <Bar dataKey="sleep" fill="#10b981" name="Sleep (hours)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Mental Wellness Chart */}
                    <div className="chart-container">
                        <h3>Mental Wellness</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="stress"
                                    stroke="#ef4444"
                                    name="Stress Level"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="energy"
                                    stroke="#f59e0b"
                                    name="Energy Level"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calories Chart */}
                    <div className="chart-container">
                        <h3>Daily Calories</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="calories" fill="#f59e0b" name="Calories" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default Analytics;
