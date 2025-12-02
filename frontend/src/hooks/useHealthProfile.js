import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const STORAGE_KEY = 'lifelens_health_profile';

/**
 * Custom hook for managing health profile
 * Syncs with backend if authenticated, otherwise uses localStorage
 */
export const useHealthProfile = () => {
    const { user, isAuthenticated, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load profile
    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            try {
                if (isAuthenticated && user) {
                    // Map backend user data to frontend profile structure
                    const backendProfile = {
                        age: user.age,
                        gender: user.gender,
                        height: user.healthProfile?.height,
                        weight: user.healthProfile?.weight,
                        occupation: user.lifestyle?.occupation || 'student', // Default fallback
                        physicalActivity: user.lifestyle?.activityLevel || 'moderate',
                        diet: user.lifestyle?.dietaryPreference || 'mixed',
                        lastUpdated: user.updatedAt
                    };

                    // Only set if we have the core data
                    if (user.age && user.healthProfile?.weight) {
                        setProfile(backendProfile);
                        setHasCompletedAssessment(true);
                    }
                } else {
                    // Fallback to localStorage
                    const stored = localStorage.getItem(STORAGE_KEY);
                    if (stored) {
                        const data = JSON.parse(stored);
                        setProfile(data);
                        setHasCompletedAssessment(true);
                    }
                }
            } catch (error) {
                console.error('Error loading health profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [isAuthenticated, user]);

    /**
     * Save profile
     */
    const saveProfile = async (profileData) => {
        try {
            if (isAuthenticated) {
                // Map frontend profile to backend structure
                const apiData = {
                    age: parseInt(profileData.age),
                    gender: profileData.gender,
                    healthProfile: {
                        height: parseFloat(profileData.height),
                        weight: parseFloat(profileData.weight)
                    },
                    lifestyle: {
                        activityLevel: profileData.physicalActivity,
                        dietaryPreference: profileData.diet,
                        occupation: profileData.occupation
                    }
                };

                const response = await userAPI.updateProfile(apiData);
                updateUser(response.data.user); // Update global auth state
                setProfile({ ...profileData, lastUpdated: new Date().toISOString() });
                setHasCompletedAssessment(true);
            } else {
                // Save to localStorage
                const dataToSave = {
                    ...profileData,
                    lastUpdated: new Date().toISOString(),
                    version: '1.0'
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
                setProfile(dataToSave);
                setHasCompletedAssessment(true);
            }
            return true;
        } catch (error) {
            console.error('Error saving health profile:', error);
            return false;
        }
    };

    /**
     * Update specific fields
     */
    const updateProfile = async (updates) => {
        if (!profile) return false;
        const updated = { ...profile, ...updates };
        return saveProfile(updated);
    };

    /**
     * Clear profile
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

    return {
        profile,
        hasCompletedAssessment,
        loading,
        saveProfile,
        updateProfile,
        clearProfile
    };
};
