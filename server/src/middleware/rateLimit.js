import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils/errorResponse.js'

/**
 * Helper to generate rate limiter objects with custom thresholds and standard responses.
 */
const logLimitState = (name, req) => {
  if (process.env.NODE_ENV === 'test') return

  const limit = req.rateLimit || {}
  console.log(
    `[RATE_LIMIT:${name}]`,
    req.ip,
    `remaining=${limit.remaining ?? 'unknown'}`,
    `reset=${limit.resetTime ? limit.resetTime.toISOString() : 'unknown'}`
  )
}

const createLimiter = ({ name, max, windowMs, message, respectMaxInTest = false }) => {
  const limiter = rateLimit({
    windowMs,
    max: process.env.NODE_ENV === 'test' && !respectMaxInTest ? 10000 : max,
    standardHeaders: true,
    legacyHeaders: false,
    requestPropertyName: 'rateLimit',
    handler: (req, res) => {
      logLimitState(name, req)
      return errorResponse(res, 429, message, [], 'TOO_MANY_REQUESTS')
    }
  })

  return (req, res, next) => {
    limiter(req, res, (err) => {
      logLimitState(name, req)
      next(err)
    })
  }
}

// 5 authentication requests per 15 minutes per IP
export const authLimiter = createLimiter({
  name: 'auth',
  max: 5,
  windowMs: 15 * 60 * 1000,
  message: 'Too many login attempts. Please try again in 15 minutes.'
})

// 20 contact form submissions per 15 minutes per IP
export const createContactLimiter = ({ max, windowMs } = {}) =>
  createLimiter({
    name: 'contact',
    windowMs: windowMs ?? 15 * 60 * 1000,
    max: max ?? (process.env.NODE_ENV === 'production' ? 20 : 1000),
    message: 'Too many contact message submissions. Please try again in 15 minutes.',
    respectMaxInTest: max !== undefined || windowMs !== undefined
  })

export const contactLimiter = createContactLimiter()

// 100 general API requests per 15 minutes per IP
export const apiLimiter = createLimiter({
  name: 'api',
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests. Please try again in 15 minutes.'
})
