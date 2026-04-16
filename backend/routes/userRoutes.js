const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { updateProgress, getProfile } = require('../controllers/userController');

// URL: POST /api/user/progress (Already done)
router.post('/progress', protect, updateProgress);

// THE FIX: Add this line
// URL: GET /api/user/profile
router.get('/profile', protect, getProfile);

module.exports = router;