const User = require("../models/user");

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
// Save which practice problem the user just solved (no duplicates)
exports.updateSolved = async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId)
      return res.status(400).json({ error: "problemId is required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // addToSet skips it if it's already in there — keeps the array clean
    if (!user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
      await user.save();
    }

    res.json({ success: true, solvedProblems: user.solvedProblems });
  } catch (err) {
    console.error("Solved Update Error:", err);
    res.status(500).json({ error: "Failed to save solved problem" });
  }
};

// Save the user's chosen theme so it follows them across devices
exports.updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    if (!["dark", "light", "blue"].includes(theme)) {
      return res.status(400).json({ error: "Invalid theme value" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.theme = theme;
    await user.save();

    res.json({ success: true, theme: user.theme });
  } catch (err) {
    console.error("Theme Update Error:", err);
    res.status(500).json({ error: "Failed to save theme" });
  }
};

// GET user profile and progress
exports.getProfile = async (req, res) => {
  try {
    // req.userId comes from the 'protect' middleware
    const user = await User.findById(req.userId).select("-password"); // Exclude password for security
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching profile" });
  }
};
