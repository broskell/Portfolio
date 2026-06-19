import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils/errorResponse.js'

/**
 * Helper to generate rate limiter objects with custom thresholds and standard responses.
 */
const createLimiter = (max, minutes, message) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: process.env.NODE_ENV === 'test' ? 10000 : max,
    standardHeaders: true,
    legacyHeaders: true,
    handler: (req, res) => {
      return errorResponse(res, 429, message, [], 'TOO_MANY_REQUESTS')
    }
  })
}

// 5 authentication requests per 15 minutes per IP
export const authLimiter = createLimiter(
  5,
  15,
  'Too many login attempts. Please try again in 15 minutes.'
)

// 20 contact form submissions per 15 minutes per IP
export const contactLimiter = createLimiter(
  20,
  15,
  'Too many contact message submissions. Please try again in 15 minutes.'
)

// 100 general API requests per 15 minutes per IP
export const apiLimiter = createLimiter(
  100,
  15,
  'Too many requests. Please try again in 15 minutes.'
)
