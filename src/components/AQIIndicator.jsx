import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import { getAQICategory } from '../utils/aqiUtils';

const AQIIndicator = ({ aqi, location, loading, error, compact = false, showLocation = true }) => {
    if (loading) {
        return (
            <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                <RefreshCw className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} animate-spin text-slate-400`} />
                <span className="text-slate-500 dark:text-slate-400">Loading AQI...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                <AlertCircle className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-rose-500`} />
                <span className="text-rose-500 dark:text-rose-400">AQI unavailable</span>
            </div>
        );
    }

    if (aqi === null) return null;

    const category = getAQICategory(aqi);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}
        >
            {showLocation && location && (
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <MapPin className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className="font-medium">{location.city}</span>
                </div>
            )}

            <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold ${compact ? 'text-xs' : 'text-sm'
                    }`}
                style={{
                    backgroundColor: category.bgColor,
                    color: category.color
                }}
            >
                <span>AQI: {aqi}</span>
                <span className="font-bold">{category.label}</span>
            </div>
        </motion.div>
    );
};

export default AQIIndicator;
