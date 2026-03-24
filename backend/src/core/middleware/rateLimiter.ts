import rateLimit from "express-rate-limit";

// General rate limiter for all endpoints
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 login attempts per IP
  message: {
    success: false,
    message: "Too many login attempts, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict rate limiter for sensitive operations
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 sensitive operations per IP
  message: {
    success: false,
    message: "Too many sensitive operations, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for API endpoints
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 API requests per IP
  message: {
    success: false,
    message: "API rate limit exceeded, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
