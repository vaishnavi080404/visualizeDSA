const User = require('../models/user');

exports.updateProgress = async (req, res) => {
    try {
        const { topicId, level } = req.body;
        
        // Find the user using the ID attached by the 'protect' middleware
        const user = await User.findById(req.userId);
        
        if (!user) return res.status(404).json({ error: "User not found" });

        // Update the progress map (e.g., set 'array' to 2)
        // Only update if the new level is higher than the existing one
        const currentLevel = user.levelProgress.get(topicId) || 0;
        if (level > currentLevel) {
            user.levelProgress.set(topicId, level);
            await user.save();
        }

        res.json({ success: true, progress: user.levelProgress });
    } catch (err) {
        console.error("Progress Update Error:", err);
        res.status(500).json({ error: "Failed to save progress" });
    }
};
// GET user profile and progress
exports.getProfile = async (req, res) => {
    try {
        // req.userId comes from the 'protect' middleware
        const user = await User.findById(req.userId).select('-password'); // Exclude password for security
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error fetching profile" });
    }
};