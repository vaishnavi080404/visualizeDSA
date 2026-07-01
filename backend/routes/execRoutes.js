const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // Import the bouncer
const {
  executeCode,
  analyzeCode,
  getHealth,
} = require("../controllers/execController");

// Only a logged-in user can reach the 'executeCode' controller
router.post("/execute", protect, executeCode);


//  POST http://localhost:3001/api/compiler/analyze
router.post("/analyze", analyzeCode);

//  GET http://localhost:3001/api/compiler/health
router.get("/health", getHealth);

module.exports = router;
