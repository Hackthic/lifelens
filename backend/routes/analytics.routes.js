const express = require('express');
const {
    getDailyAnalytics,
    getWeeklyTrends,
    getMonthlyTrends,
    getInsights,
    comparePeriods
} = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/daily', getDailyAnalytics);
router.get('/weekly', getWeeklyTrends);
router.get('/monthly', getMonthlyTrends);
router.get('/insights', getInsights);
router.get('/compare', comparePeriods);

module.exports = router;
