const express = require('express');
const {
    submitDailyTracking,
    getTrackingHistory,
    getTodayTracking
} = require('../controllers/tracking.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/daily', submitDailyTracking);
router.get('/history', getTrackingHistory);
router.get('/today', getTodayTracking);

module.exports = router;
