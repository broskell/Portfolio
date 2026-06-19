import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils/errorResponse.js'

const FIFTEEN_MINUTES = 15 * 60 * 1000

export const isProd = process.env.NODE_ENV === 'production'

const LIMITS = {
  auth: {
    production: 20,
    development: 1000,
    code: 'TOO_MANY_LOGIN_ATTEMPTS',
    message: 'Too many login attempts. Please try again after 15 minutes.'
  },
  forgotPassword: {
    production: 5,
    development: 1000,
    code: 'TOO_MANY_PASSWORD_RESET_REQUESTS',
    message: 'Too many password reset requests. Please try again after 15 minutes.'
  },
  refresh: {
    production: 100,
    development: 1000,
    code: 'TOO_MANY_REFRESH_REQUESTS',
    message: 'Too many session refresh requests. Please sign in again later.'
  },
  contact: {
    production: 5,
    development: 1000,
    code: 'CONTACT_LIMIT_REACHED',
    message: "You've sent too many messages recently. Please try again later."
  },
  api: {
    production: 300,
    development: 5000,
    code: 'TOO_MANY_REQUESTS',
    message: 'Too many requests. Please try again in 15 minutes.'
  }
}

const getLimit = (config) => (isProd ? config.production : config.development)

const logLimitTrigger = (name, req) => {
  const limit = req.rateLimit || {}
  console.warn(
    `[RATE_LIMIT:${name}]`,
    `ip=${req.ip}`,
    `endpoint=${req.originalUrl}`,
    `remaining=${limit.remaining ?? 0}`,
    `reset=${limit.resetTime ? limit.resetTime.toISOString() : 'unknown'}`
  )
}

const createLimiter = (name, options = {}) => {
  const config = LIMITS[name]

  return rateLimit({
    windowMs: FIFTEEN_MINUTES,
    max: getLimit(config),
    standardHeaders: true,
    legacyHeaders: false,
    requestPropertyName: 'rateLimit',
    skip: options.skip,
    handler: (req, res) => {
      logLimitTrigger(name, req)
      return errorResponse(res, 429, config.message, [], config.code)
    }
  })
}

const skipGlobalApiLimiter = (req) => {
  const path = req.path.replace(/\/+$/, '')
  const method = req.method.toUpperCase()

  return (
    (method === 'POST' && path === '/auth/login') ||
    (method === 'POST' && path === '/auth/refresh') ||
    (method === 'POST' && path === '/auth/forgot-password') ||
    (method === 'POST' && path === '/contact')
  )
}

export const authLimiter = createLimiter('auth')
export const forgotPasswordLimiter = createLimiter('forgotPassword')
export const refreshLimiter = createLimiter('refresh')
export const contactLimiter = createLimiter('contact')
export const apiLimiter = createLimiter('api', { skip: skipGlobalApiLimiter })
