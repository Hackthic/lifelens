const DailyTracking = require('../models/DailyTracking');

// @desc    Submit daily tracking data
// @route   POST /api/tracking/daily
// @access  Private
exports.submitDailyTracking = async (req, res, next) => {
    try {
        const trackingData = {
            user: req.user.id,
            date: req.body.date || new Date().setHours(0, 0, 0, 0), // Start of day
            ...req.body
        };

        // Check if tracking already exists for this date
        const existingTracking = await DailyTracking.findOne({
            user: req.user.id,
            date: trackingData.date
        });

        let tracking;
        if (existingTracking) {
            // Update existing tracking
            tracking = await DailyTracking.findByIdAndUpdate(
                existingTracking._id,
                trackingData,
                { new: true, runValidators: true }
            );
        } else {
            // Create new tracking
            tracking = await DailyTracking.create(trackingData);
        }

        res.status(200).json({
            success: true,
            message: 'Daily tracking data saved successfully',
            data: {
                tracking
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get tracking history
// @route   GET /api/tracking/history
// @access  Private
exports.getTrackingHistory = async (req, res, next) => {
    try {
        const { startDate, endDate, limit = 30 } = req.query;

        // Build query
        const query = { user: req.user.id };

        // Add date filters if provided
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // Get tracking data
        const trackingData = await DailyTracking.find(query)
            .sort({ date: -1 }) // Most recent first
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: trackingData.length,
            data: {
                tracking: trackingData
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get today's tracking data
// @route   GET /api/tracking/today
// @access  Private
exports.getTodayTracking = async (req, res, next) => {
    try {
        const today = new Date().setHours(0, 0, 0, 0);

        const tracking = await DailyTracking.findOne({
            user: req.user.id,
            date: today
        });

        res.status(200).json({
            success: true,
            data: {
                tracking: tracking || null
            }
        });
    } catch (error) {
        next(error);
    }
};
