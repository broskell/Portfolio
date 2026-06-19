import { verifyAccessToken } from '../utils/token.js'
import User from '../modules/auth/user.model.js'

/**
 * Middleware that parses JWT access token if present, but does not enforce authentication.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      const decoded = verifyAccessToken(token)
      const user = await User.findOne({ _id: decoded.sub, isDeleted: false })
      if (user && decoded.tokenVersion === user.refreshTokenVersion) {
        req.user = user
      }
    }
  } catch (err) {
    // Fail silently since credentials are optional
  }
  next()
}
