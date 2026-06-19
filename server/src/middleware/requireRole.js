import { ApiError } from '../utils/ApiError.js'

/**
 * Middleware that checks if the authenticated user has one of the allowed roles.
 * @param {...string} allowedRoles - List of permitted roles.
 */
export const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required', [], 'UNAUTHORIZED'))
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Access denied: insufficient permissions', [], 'FORBIDDEN'))
  }

  next()
}
