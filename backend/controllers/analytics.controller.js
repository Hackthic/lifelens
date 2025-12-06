const DailyTracking = require('../models/DailyTracking');

// @desc    Get daily aggregated data
// @route   GET /api/analytics/daily
// @access  Private
exports.getDailyAnalytics = async (req, res, next) => {
    try {
        const { date } = req.query;
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0, 0, 0, 0);

        const tracking = await DailyTracking.findOne({
            user: req.user.id,
            date: targetDate
        });

        if (!tracking) {
            return res.status(200).json({
                success: true,
                data: {
                    date: targetDate,
                    tracking: null,
                    message: 'No data for this date'
                }
            });
        }

        res.status(200).json({
            success: true,
            data: { tracking }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get weekly trends
// @route   GET /api/analytics/weekly
// @access  Private
exports.getWeeklyTrends = async (req, res, next) => {
    try {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);

        const trackingData = await DailyTracking.find({
            user: req.user.id,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        const trends = calculateTrends(trackingData, 'week');

        res.status(200).json({
            success: true,
            data: {
                period: 'week',
                startDate,
                endDate,
                trends,
                rawData: trackingData
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get monthly trends
// @route   GET /api/analytics/monthly
// @access  Private
exports.getMonthlyTrends = async (req, res, next) => {
    try {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);

        const trackingData = await DailyTracking.find({
            user: req.user.id,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        const trends = calculateTrends(trackingData, 'month');

        res.status(200).json({
            success: true,
            data: {
                period: 'month',
                startDate,
                endDate,
                trends,
                rawData: trackingData
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get insights and statistics
// @route   GET /api/analytics/insights
// @access  Private
exports.getInsights = async (req, res, next) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const trackingData = await DailyTracking.find({
            user: req.user.id,
            date: { $gte: thirtyDaysAgo }
        });

        const insights = generateInsights(trackingData);

        res.status(200).json({
            success: true,
            data: { insights }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Compare periods
// @route   GET /api/analytics/compare
// @access  Private
exports.comparePeriods = async (req, res, next) => {
    try {
        const { startDate1, endDate1, startDate2, endDate2 } = req.query;

        const period1Data = await DailyTracking.find({
            user: req.user.id,
            date: { $gte: new Date(startDate1), $lte: new Date(endDate1) }
        });

        const period2Data = await DailyTracking.find({
            user: req.user.id,
            date: { $gte: new Date(startDate2), $lte: new Date(endDate2) }
        });

        const comparison = {
            period1: calculateTrends(period1Data, 'custom'),
            period2: calculateTrends(period2Data, 'custom'),
            improvement: calculateImprovement(period1Data, period2Data)
        };

        res.status(200).json({
            success: true,
            data: { comparison }
        });
    } catch (error) {
        next(error);
    }
};

// Helper function to calculate trends
function calculateTrends(data, period) {
    if (!data || data.length === 0) {
        return null;
    }

    const trends = {
        steps: calculateMetricTrend(data, 'activity.steps'),
        sleep: calculateMetricTrend(data, 'sleep.duration'),
        water: calculateMetricTrend(data, 'nutrition.waterIntake'),
        calories: calculateMetricTrend(data, 'nutrition.totalCalories'),
        exercise: calculateMetricTrend(data, 'activity.exerciseDuration'),
        mood: calculateMoodTrend(data),
        stress: calculateMetricTrend(data, 'mental.stressLevel'),
        screenTime: calculateMetricTrend(data, 'screenTime.total')
    };

    return trends;
}

// Calculate trend for a specific metric
function calculateMetricTrend(data, path) {
    const values = data.map(entry => getNestedValue(entry, path)).filter(v => v != null);

    if (values.length === 0) return null;

    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return {
        average: Math.round(average * 100) / 100,
        max,
        min,
        dataPoints: values.length,
        trend: calculateTrendDirection(values)
    };
}

// Calculate mood trend
function calculateMoodTrend(data) {
    const moodValues = {
        'very-poor': 1,
        'poor': 2,
        'neutral': 3,
        'good': 4,
        'excellent': 5
    };

    const moods = data.map(entry => entry.mental?.mood).filter(m => m);
    const numericMoods = moods.map(m => moodValues[m] || 3);

    if (numericMoods.length === 0) return null;

    const average = numericMoods.reduce((sum, val) => sum + val, 0) / numericMoods.length;

    return {
        average: Math.round(average * 100) / 100,
        mostCommon: getMostCommon(moods),
        dataPoints: moods.length,
        trend: calculateTrendDirection(numericMoods)
    };
}

// Calculate trend direction (improving, declining, stable)
function calculateTrendDirection(values) {
    if (values.length < 2) return 'insufficient-data';

    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));

    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;

    const change = ((secondAvg - firstAvg) / firstAvg) * 100;

    if (Math.abs(change) < 5) return 'stable';
    return change > 0 ? 'improving' : 'declining';
}

// Calculate improvement between two periods
function calculateImprovement(period1, period2) {
    const metrics1 = calculateTrends(period1, 'custom');
    const metrics2 = calculateTrends(period2, 'custom');

    if (!metrics1 || !metrics2) return null;

    const improvement = {};
    Object.keys(metrics1).forEach(key => {
        if (metrics1[key] && metrics2[key]) {
            const change = metrics2[key].average - metrics1[key].average;
            const percentChange = (change / metrics1[key].average) * 100;
            improvement[key] = {
                change,
                percentChange: Math.round(percentChange * 100) / 100,
                improved: percentChange > 0
            };
        }
    });

    return improvement;
}

// Generate insights
function generateInsights(data) {
    if (!data || data.length === 0) {
        return {
            message: 'Not enough data to generate insights',
            suggestions: ['Start tracking daily to get personalized insights']
        };
    }

    const insights = [];
    const suggestions = [];

    // Check consistency
    const consistencyRate = (data.length / 30) * 100;
    insights.push({
        type: 'consistency',
        message: `You've tracked ${data.length} out of the last 30 days (${Math.round(consistencyRate)}% consistency)`,
        level: consistencyRate > 70 ? 'good' : consistencyRate > 40 ? 'moderate' : 'needs-improvement'
    });

    // Analyze sleep
    const sleepData = data.map(d => d.sleep?.duration).filter(s => s != null);
    if (sleepData.length > 0) {
        const avgSleep = sleepData.reduce((sum, val) => sum + val, 0) / sleepData.length;
        insights.push({
            type: 'sleep',
            message: `Average sleep: ${avgSleep.toFixed(1)} hours`,
            level: avgSleep >= 7 && avgSleep <= 9 ? 'good' : 'needs-improvement'
        });

        if (avgSleep < 7) {
            suggestions.push('Try to get 7-9 hours of sleep for better health');
        }
    }

    // Analyze activity
    const stepsData = data.map(d => d.activity?.steps).filter(s => s != null);
    if (stepsData.length > 0) {
        const avgSteps = stepsData.reduce((sum, val) => sum + val, 0) / stepsData.length;
        insights.push({
            type: 'activity',
            message: `Average daily steps: ${Math.round(avgSteps)}`,
            level: avgSteps >= 8000 ? 'good' : avgSteps >= 5000 ? 'moderate' : 'needs-improvement'
        });

        if (avgSteps < 8000) {
            suggestions.push('Aim for 8,000-10,000 steps daily for better cardiovascular health');
        }
    }

    return { insights, suggestions, dataPoints: data.length };
}

// Helper to get nested values
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Get most common value
function getMostCommon(arr) {
    const frequency = {};
    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });
    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
}

