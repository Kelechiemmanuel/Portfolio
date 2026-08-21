
const rateLimit = require('express-rate-limit');

const bookingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // 5 booking attempts per IP per window
    message: { error: 'Too many booking attempts, try again later.' },
});

module.exports = { bookingLimiter }