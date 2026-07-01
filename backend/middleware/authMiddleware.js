/**
 * Auth Middleware - Protects private routes
 * Logic: Checks for JWT in headers -> Verifies -> Attaches user to request
 */

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // 1. Get token from the header (Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No session token provided." });
    }

    try {
        // 2. Verify the token using the secret key in .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach the user ID to the request object for the controller to use
        req.userId = decoded.id;
        
        // 4. Move to the next function (The Controller)
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ error: "Session expired or invalid token." });
    }
};

module.exports = protect;