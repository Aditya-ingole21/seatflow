// handles 404 - when a route doesn't exist
const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// global error handler - catches all errors passed via next(error)
const errorHandler = (err, req, res, next) => {
    // sometimes mongoose sets status to 200 even on errors, fix that
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // handle invalid mongodb id format
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID'
        });
    }

    // handle duplicate field errors (like duplicate email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }

    // handle mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: messages.join(', ')
        });
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong'
    });
};

module.exports = { notFound, errorHandler };
