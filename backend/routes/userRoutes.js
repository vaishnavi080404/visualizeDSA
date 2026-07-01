const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { updateProgress, getProfile, updateSolved, updateTheme } = require("../controllers/userController");

//  POST /api/user/progress (Already done)
router.post("/progress", protect, updateProgress);

//  GET /api/user/profile
router.get("/profile", protect, getProfile);

//  POST /api/user/solved — mark a practice problem as solved
router.post("/solved", protect, updateSolved);

//  POST /api/user/theme — save the user's theme preference
router.post("/theme", protect, updateTheme);

module.exports = router;
