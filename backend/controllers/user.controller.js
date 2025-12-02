const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        // Fields that can be updated
        const allowedUpdates = [
            'name',
            'age',
            'gender',
            'phone',
            'healthProfile',
            'lifestyle',
            'location'
        ];

        // Filter out fields that shouldn't be updated
        const updates = {};
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        // Update user
        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            {
                new: true, // Return updated document
                runValidators: true // Run model validators
            }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};
