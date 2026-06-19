import { verifyAccessToken } from '../utils/token.js'
import { ApiError } from '../utils/ApiError.js'
import User from '../modules/auth/user.model.js'

/**
 * Middleware that strictly protects routes by validating the JWT Bearer access token.
 * Access token payload format: { sub, role, email, tokenVersion }
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access token is missing or invalid', [], 'UNAUTHORIZED')
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyAccessToken(token)

    // Verify the user exists and is not soft-deleted
    const user = await User.findOne({ _id: decoded.sub, isDeleted: false })
    if (!user) {
      throw new ApiError(401, 'User associated with this token no longer exists', [], 'UNAUTHORIZED')
    }

    // Verify token version matches database refresh token version to support global revocations
    if (decoded.tokenVersion !== user.refreshTokenVersion) {
      throw new ApiError(401, 'Token has been revoked or session expired', [], 'TOKEN_REVOKED')
    }

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      next(new ApiError(401, 'Access token has expired', [], 'TOKEN_EXPIRED'))
    } else if (err instanceof ApiError) {
      next(err)
    } else {
      next(new ApiError(401, 'Invalid access token', [], 'INVALID_TOKEN'))
    }
  }
}
