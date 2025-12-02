const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token);
    } else {
        localStorage.removeItem('authToken');
    }
};

// Helper function to get headers with auth
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

// Authentication API
export const authAPI = {
    // Sign up
    signup: async (userData) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        // Save token
        if (data.data?.token) {
            setAuthToken(data.data.token);
        }

        return data;
    },

    // Log in
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Save token
        if (data.data?.token) {
            setAuthToken(data.data.token);
        }

        return data;
    },

    // Get current user
    getMe: async () => {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get user data');
        }

        return data;
    },

    // Log out
    logout: () => {
        setAuthToken(null);
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!getAuthToken();
    },
};

// User API
export const userAPI = {
    // Get user profile
    getProfile: async () => {
        const response = await fetch(`${API_URL}/users/profile`, {
            headers: getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get profile');
        }

        return data;
    },

    // Update user profile
    updateProfile: async (profileData) => {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }

        return data;
    },
};

// Daily Tracking API
export const trackingAPI = {
    // Submit daily tracking data
    submitDaily: async (trackingData) => {
        const response = await fetch(`${API_URL}/tracking/daily`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(trackingData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit tracking data');
        }

        return data;
    },

    // Get tracking history
    getHistory: async (startDate, endDate, limit = 30) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (limit) params.append('limit', limit);

        const response = await fetch(`${API_URL}/tracking/history?${params}`, {
            headers: getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get tracking history');
        }

        return data;
    },

    // Get today's tracking
    getToday: async () => {
        const response = await fetch(`${API_URL}/tracking/today`, {
            headers: getHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get today\'s tracking');
        }

        return data;
    },
};
