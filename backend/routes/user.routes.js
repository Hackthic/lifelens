const express = require('express');
const { getProfile, updateProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/profile')
    .get(getProfile)
    .put(updateProfile);

module.exports = router;
