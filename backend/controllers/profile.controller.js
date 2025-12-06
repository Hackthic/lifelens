const User = require('../models/User');

// @desc    Complete onboarding
// @route   POST /api/profile/onboarding
// @access  Private
exports.completeOnboarding = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        // Calculate profile completion percentage
        const completionPercentage = calculateProfileCompletion(updates);

        const user = await User.findByIdAndUpdate(
            userId,
            {
                ...updates,
                onboardingCompleted: true,
                profileCompletionPercentage: completionPercentage
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Onboarding completed successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        // Don't allow password update through this route
        delete updates.password;
        delete updates.email; // Prevent email change for now

        // Recalculate completion percentage
        const user = await User.findById(userId);
        const mergedData = { ...user.toObject(), ...updates };
        const completionPercentage = calculateProfileCompletion(mergedData);

        updates.profileCompletionPercentage = completionPercentage;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user: updatedUser }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get profile completion status
// @route   GET /api/profile/completion
// @access  Private
exports.getProfileCompletion = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        const completion = {
            percentage: user.profileCompletionPercentage || 0,
            onboardingCompleted: user.onboardingCompleted,
            missingFields: getMissingFields(user)
        };

        res.status(200).json({
            success: true,
            data: { completion }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update health goals
// @route   PUT /api/profile/goals
// @access  Private
exports.updateGoals = async (req, res, next) => {
    try {
        const { goals } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { goals },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Health goals updated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

// Helper function to calculate profile completion
function calculateProfileCompletion(userData) {
    const fields = {
        basic: ['name', 'email', 'age', 'gender', 'phone'],
        health: ['healthProfile.height', 'healthProfile.weight', 'healthProfile.bloodGroup'],
        lifestyle: ['lifestyle.activityLevel', 'lifestyle.dietaryPreference'],
        location: ['location.city', 'location.state'],
        goals: ['goals'],
        baselines: ['baselines.dailyStepTarget', 'baselines.dailyWaterTarget', 'baselines.dailyCalorieTarget'],
        workInfo: ['workInfo.occupationType', 'workInfo.sleepSchedule']
    };

    let totalFields = 0;
    let filledFields = 0;

    Object.values(fields).forEach(fieldArray => {
        fieldArray.forEach(field => {
            totalFields++;
            const value = getNestedValue(userData, field);
            if (value !== undefined && value !== null && value !== '' &&
                (Array.isArray(value) ? value.length > 0 : true)) {
                filledFields++;
            }
        });
    });

    return Math.round((filledFields / totalFields) * 100);
}

// Helper function to get missing fields
function getMissingFields(userData) {
    const requiredFields = {
        'Basic Information': ['name', 'email', 'age', 'gender'],
        'Health Profile': ['healthProfile.height', 'healthProfile.weight'],
        'Lifestyle': ['lifestyle.activityLevel', 'lifestyle.dietaryPreference'],
        'Location': ['location.city'],
        'Goals': ['goals']
    };

    const missing = {};

    Object.entries(requiredFields).forEach(([category, fields]) => {
        const missingInCategory = fields.filter(field => {
            const value = getNestedValue(userData, field);
            return value === undefined || value === null || value === '' ||
                (Array.isArray(value) && value.length === 0);
        });

        if (missingInCategory.length > 0) {
            missing[category] = missingInCategory;
        }
    });

    return missing;
}

// Helper to get nested object values
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

module.exports = {
    completeOnboarding,
    getProfile,
    updateProfile,
    getProfileCompletion,
    updateGoals
};
