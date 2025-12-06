import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, profileAPI, trackingAPI, analyticsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import OnboardingWizard from '../components/Dashboard/OnboardingWizard';
import DashboardNav from '../components/Dashboard/DashboardNav';
import Overview from '../components/Dashboard/Overview';
import DailyEntry from '../components/Dashboard/DailyEntry';
import Analytics from '../components/Dashboard/Analytics';
import Goals from '../components/Dashboard/Goals';
import './DashboardPage.css';

const DashboardPage = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [activeView, setActiveView] = useState(user?.onboardingCompleted ? 'overview' : 'daily-entry');
    const [profileData, setProfileData] = useState(null);
    const [todayTracking, setTodayTracking] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Check if user is authenticated
            if (!authAPI.isAuthenticated()) {
                navigate('/');
                return;
            }

            // Get profile data
            const profileResponse = await profileAPI.getProfile();
            setProfileData(profileResponse.data?.user);

            // Check if onboarding is needed
            if (!profileResponse.data?.user?.onboardingCompleted) {
                setShowOnboarding(true);
            }

            // Get today's tracking data
            try {
                const trackingResponse = await trackingAPI.getToday();
                setTodayTracking(trackingResponse.data?.tracking);
            } catch (error) {
                console.error('Error loading today\'s tracking:', error);
            }

        } catch (error) {
            console.error('Error loading dashboard:', error);
            if (error.message.includes('token')) {
                authAPI.logout();
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOnboardingComplete = async (data) => {
        try {
            const response = await profileAPI.completeOnboarding(data);
            setProfileData(response.data?.user);
            setUser(response.data?.user);
            setShowOnboarding(false);
            setActiveView('overview');
        } catch (error) {
            console.error('Onboarding error:', error);
            alert('Failed to complete onboarding. Please try again.');
        }
    };

    const handleDataUpdate = async () => {
        // Refresh today's tracking data after submission
        try {
            const trackingResponse = await trackingAPI.getToday();
            setTodayTracking(trackingResponse.data?.tracking);
        } catch (error) {
            console.error('Error refreshing tracking:', error);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (showOnboarding) {
        return (
            <OnboardingWizard
                onComplete={handleOnboardingComplete}
                existingData={profileData}
            />
        );
    }

    return (
        <div className="dashboard-container">
            <DashboardNav
                activeView={activeView}
                onViewChange={setActiveView}
                profileData={profileData}
            />

            <div className="dashboard-content">
                {activeView === 'overview' && (
                    <Overview
                        profileData={profileData}
                        todayTracking={todayTracking}
                        onNavigate={setActiveView}
                    />
                )}

                {activeView === 'daily-entry' && (
                    <DailyEntry
                        existingData={todayTracking}
                        onDataUpdate={handleDataUpdate}
                        profileData={profileData}
                    />
                )}

                {activeView === 'analytics' && (
                    <Analytics profileData={profileData} />
                )}

                {activeView === 'goals' && (
                    <Goals
                        profileData={profileData}
                        onUpdate={loadDashboardData}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
