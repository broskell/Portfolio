import { env } from './env.js'

/**
 * Returns the centralized cookie options configuration.
 * Sets secure, sameSite, path, and maxAge constraints.
 */
export const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV !== 'test',
  sameSite: env.NODE_ENV !== 'test' ? 'none' : 'lax',
  path: '/api/auth/refresh',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})

export const getHasTokenCookieOptions = () => ({
  httpOnly: false,
  secure: env.NODE_ENV !== 'test',
  sameSite: env.NODE_ENV !== 'test' ? 'none' : 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})
