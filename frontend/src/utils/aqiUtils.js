/**
 * AQI (Air Quality Index) Utilities
 * Based on Indian National Air Quality Index standards
 */

// AQI Categories based on Indian standards
export const AQI_CATEGORIES = {
    GOOD: { min: 0, max: 50, label: 'Good', color: '#00E400', bgColor: '#E8F5E9' },
    SATISFACTORY: { min: 51, max: 100, label: 'Satisfactory', color: '#7CB342', bgColor: '#F1F8E9' },
    MODERATE: { min: 101, max: 200, label: 'Moderate', color: '#FDD835', bgColor: '#FFFDE7' },
    POOR: { min: 201, max: 300, label: 'Poor', color: '#FF9800', bgColor: '#FFF3E0' },
    VERY_POOR: { min: 301, max: 400, label: 'Very Poor', color: '#F44336', bgColor: '#FFEBEE' },
    SEVERE: { min: 401, max: 999, label: 'Severe', color: '#B71C1C', bgColor: '#FFCDD2' }
};

/**
 * Get AQI category based on AQI value
 * @param {number} aqi - AQI value
 * @returns {object} Category object with label, color, and bgColor
 */
export const getAQICategory = (aqi) => {
    if (aqi <= 50) return AQI_CATEGORIES.GOOD;
    if (aqi <= 100) return AQI_CATEGORIES.SATISFACTORY;
    if (aqi <= 200) return AQI_CATEGORIES.MODERATE;
    if (aqi <= 300) return AQI_CATEGORIES.POOR;
    if (aqi <= 400) return AQI_CATEGORIES.VERY_POOR;
    return AQI_CATEGORIES.SEVERE;
};

/**
 * Convert PM2.5 concentration to AQI (simplified calculation)
 * Based on Indian AQI calculation method
 * @param {number} pm25 - PM2.5 concentration in µg/m³
 * @returns {number} AQI value
 */
export const pm25ToAQI = (pm25) => {
    // Simplified AQI calculation for PM2.5
    // Indian AQI breakpoints for PM2.5
    const breakpoints = [
        { cLow: 0, cHigh: 30, aqiLow: 0, aqiHigh: 50 },
        { cLow: 31, cHigh: 60, aqiLow: 51, aqiHigh: 100 },
        { cLow: 61, cHigh: 90, aqiLow: 101, aqiHigh: 200 },
        { cLow: 91, cHigh: 120, aqiLow: 201, aqiHigh: 300 },
        { cLow: 121, cHigh: 250, aqiLow: 301, aqiHigh: 400 },
        { cLow: 251, cHigh: 999, aqiLow: 401, aqiHigh: 500 }
    ];

    for (const bp of breakpoints) {
        if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
            const aqi = ((bp.aqiHigh - bp.aqiLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.aqiLow;
            return Math.round(aqi);
        }
    }

    return 500; // Maximum AQI
};

/**
 * Get health message based on AQI category
 * @param {number} aqi - AQI value
 * @returns {string} Health message
 */
export const getHealthMessage = (aqi) => {
    const category = getAQICategory(aqi);

    const messages = {
        'Good': 'Air quality is satisfactory, and air pollution poses little or no risk.',
        'Satisfactory': 'Air quality is acceptable. However, there may be a risk for some people.',
        'Moderate': 'Members of sensitive groups may experience health effects.',
        'Poor': 'Everyone may begin to experience health effects.',
        'Very Poor': 'Health alert: everyone may experience more serious health effects.',
        'Severe': 'Health warning of emergency conditions. Everyone is likely to be affected.'
    };

    return messages[category.label] || 'Air quality data unavailable.';
};

/**
 * Get recommendation based on AQI
 * @param {number} aqi - AQI value
 * @returns {string} Recommendation
 */
export const getAQIRecommendation = (aqi) => {
    const category = getAQICategory(aqi);

    const recommendations = {
        'Good': 'Enjoy outdoor activities!',
        'Satisfactory': 'Enjoy outdoor activities. Sensitive individuals should consider limiting prolonged outdoor exertion.',
        'Moderate': 'Sensitive groups should reduce prolonged outdoor exertion.',
        'Poor': 'Avoid prolonged outdoor exertion. Wear a mask if going outside.',
        'Very Poor': 'Avoid outdoor activities. Use air purifier indoors. Wear N95 mask if you must go out.',
        'Severe': 'Stay indoors. Use air purifier. Avoid all outdoor activities. Wear N95 mask if absolutely necessary to go out.'
    };

    return recommendations[category.label] || 'Monitor air quality updates.';
};
