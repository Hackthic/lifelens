import { useState, useEffect } from 'react';
import { pm25ToAQI } from '../utils/aqiUtils';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Custom hook to fetch real-time AQI data based on user's geolocation
 * @returns {object} { aqi, location, loading, error, refetch }
 */
export const useAQI = () => {
    const [aqi, setAqi] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAQI = async (latitude, longitude) => {
        try {
            setLoading(true);
            setError(null);

            // Fetch air pollution data from OpenWeatherMap
            const airPollutionResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );

            if (!airPollutionResponse.ok) {
                throw new Error('Failed to fetch air quality data');
            }

            const airData = await airPollutionResponse.json();

            // Fetch location name
            const geoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );

            if (!geoResponse.ok) {
                throw new Error('Failed to fetch location data');
            }

            const geoData = await geoResponse.json();

            // Extract PM2.5 value and convert to AQI
            const pm25 = airData.list[0]?.components?.pm2_5 || 0;
            const calculatedAQI = pm25ToAQI(pm25);

            setAqi(calculatedAQI);
            setLocation({
                city: geoData[0]?.name || 'Unknown',
                state: geoData[0]?.state || '',
                country: geoData[0]?.country || '',
                lat: latitude,
                lon: longitude
            });
            setLoading(false);
        } catch (err) {
            console.error('Error fetching AQI:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchAQI(latitude, longitude);
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError('Unable to retrieve your location. Please enable location access.');
                setLoading(false);
            }
        );
    };

    const refetch = () => {
        getLocation();
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { aqi, location, loading, error, refetch };
};
