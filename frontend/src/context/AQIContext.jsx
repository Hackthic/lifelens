import React, { createContext, useContext } from 'react';
import { useAQI } from '../hooks/useAQI';

const AQIContext = createContext();

export const useAQIContext = () => {
    const context = useContext(AQIContext);
    if (!context) {
        throw new Error('useAQIContext must be used within AQIProvider');
    }
    return context;
};

export const AQIProvider = ({ children }) => {
    const aqiData = useAQI();

    return (
        <AQIContext.Provider value={aqiData}>
            {children}
        </AQIContext.Provider>
    );
};
