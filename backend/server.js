/**
 * CODEANIME Backend - Entry Point
 * Final Year Project Refactor
 */

require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// 1. Connect to Database
// Note: Logic is handled in /config/db.js to keep this file clean
connectDB();

// 2. Global Middleware
// Live Server doesn't always open on the same port (depends what's
// free on your machine), so instead of hardcoding one port we keep a
// small list of the common ones it tends to pick.
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "https://visualize-dsa-codeanime.vercel.app",
  "http://127.0.0.1:5501",
  "http://127.0.0.1:5502",
  "http://127.0.0.1:5503",
  "http://localhost:5500",
  "http://localhost:5501",
  "http://localhost:5502",
  "http://localhost:5503",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Increase JSON limit to handle large source code strings from the editor
app.use(express.json({ limit: "10mb" }));

// 3. Route Definitions
// These mount your modular route files to specific URLs
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/compiler", require("./routes/execRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// 4. Global Error Handler (Sound Engineering Practice)
// Catches any unhandled errors and prevents the server from crashing
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

// 5. Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Server is running on: http://localhost:${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Accepting requests from any localhost/127.0.0.1 port\n`);
});
app.get("/", (req, res) => {
  res.send("DSA Visualizer Backend is running 🚀");
});