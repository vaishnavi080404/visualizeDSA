/**
 * Auth Controller - Logic for User Management
 * Final Year Project: CODEANIME
 */

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ─── SIGNUP LOGIC ────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic Validation (Student Tip: Always validate on the server side too)
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists." });
    }

    // 3. Hash the password (bcrypt handles the salt automatically)
    // The useful truth: Never store passwords as plain text!
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return success (Don't send the password back!)
    res.status(201).json({ msg: "Registration successful. Please login." });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error during registration." });
  }
};

// ─── LOGIN LOGIC ─────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // 2. Compare entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // 3. Generate a JWT Token (The digital pass for the frontend)
    // Note: Using the secret key from our .env file
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }, // Session lasts for 1 day
    );

    // 4. Respond with token and non-sensitive user data
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        levelProgress: user.levelProgress,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal Server Error during login." });
  }
};
