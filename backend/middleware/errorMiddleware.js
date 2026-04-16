/**
 * Global Error Handler
 * Logic: Catches server crashes and sends a structured JSON response
 */

const errorHandler = (err, req, res, next) => {
    console.error("Server Error Stack:", err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        error: err.message || "Internal Server Error",
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = errorHandler;