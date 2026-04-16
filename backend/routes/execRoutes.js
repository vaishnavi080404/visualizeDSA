const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // Import the bouncer
const { executeCode, analyzeCode, getHealth } = require('../controllers/execController');

// Logic: Only a logged-in user can reach the 'executeCode' controller
router.post('/execute', protect, executeCode);

// URL: POST http://localhost:3001/api/compiler/execute
router.post('/execute', executeCode);

// URL: POST http://localhost:3001/api/compiler/analyze
router.post('/analyze', analyzeCode);

// URL: GET http://localhost:3001/api/compiler/health
router.get('/health', getHealth);

module.exports = router;