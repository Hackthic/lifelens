const express = require('express');
const {
    completeOnboarding,
    getProfile,
    updateProfile,
    getProfileCompletion,
    updateGoals
} = require('../controllers/profile.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/onboarding', completeOnboarding);
router.get('/me', getProfile);
router.put('/update', updateProfile);
router.get('/completion', getProfileCompletion);
router.put('/goals', updateGoals);

module.exports = router;
