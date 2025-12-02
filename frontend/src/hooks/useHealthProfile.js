import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lifelens_health_profile';

/**
 * Custom hook for managing health profile in localStorage
 * @returns {object} Profile data and management functions
 */
export const useHealthProfile = () => {
    const [profile, setProfile] = useState(null);
    const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load profile from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                setProfile(data);
                setHasCompletedAssessment(true);
            }
        } catch (error) {
            console.error('Error loading health profile:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Save profile to localStorage
     * @param {object} profileData - Health profile data
     */
    const saveProfile = (profileData) => {
        try {
            const dataToSave = {
                ...profileData,
                lastUpdated: new Date().toISOString(),
                version: '1.0'
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
            setProfile(dataToSave);
            setHasCompletedAssessment(true);
            return true;
        } catch (error) {
            console.error('Error saving health profile:', error);
            return false;
        }
    };

    /**
     * Update specific fields in profile
     * @param {object} updates - Fields to update
     */
    const updateProfile = (updates) => {
        if (!profile) return false;

        const updated = {
            ...profile,
            ...updates,
            lastUpdated: new Date().toISOString()
        };

        return saveProfile(updated);
    };

    /**
     * Clear profile from localStorage
     */
    const clearProfile = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setProfile(null);
            setHasCompletedAssessment(false);
            return true;
        } catch (error) {
            console.error('Error clearing health profile:', error);
            return false;
        }
    };

    /**
     * Check if assessment was completed recently (within 30 days)
     */
    const isAssessmentRecent = () => {
        if (!profile || !profile.lastUpdated) return false;

        const lastUpdate = new Date(profile.lastUpdated);
        const daysSince = (new Date() - lastUpdate) / (1000 * 60 * 60 * 24);

        return daysSince < 30;
    };

    return {
        profile,
        hasCompletedAssessment,
        loading,
        saveProfile,
        updateProfile,
        clearProfile,
        isAssessmentRecent
    };
};
