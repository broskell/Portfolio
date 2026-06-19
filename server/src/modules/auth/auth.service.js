import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from './user.model.js'
import { ApiError } from '../../utils/ApiError.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/token.js'

// Helper function to hash raw tokens using SHA256
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export class AuthService {
  /**
   * Log in user, hash and store refresh token.
   */
  static async login({ email, password }) {
    const user = await User.findOne({ email, isDeleted: false }).select('+passwordHash')
    if (!user) {
      throw new ApiError(401, 'Invalid email or password', [], 'INVALID_CREDENTIALS')
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password', [], 'INVALID_CREDENTIALS')
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Store hashed token details in User record
    user.refreshTokenHash = hashToken(refreshToken)
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    user.lastLoginAt = new Date()
    await user.save()

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    }
  }

  /**
   * Rotates and refreshes access & refresh tokens.
   * Compares SHA256 hashed refresh tokens. Invalidate all sessions on reuse detection.
   */
  static async refresh(token) {
    if (!token) {
      throw new ApiError(401, 'Refresh token is missing', [], 'UNAUTHORIZED')
    }

    let decoded
    try {
      decoded = verifyRefreshToken(token)
    } catch (err) {
      throw new ApiError(401, 'Invalid or expired refresh token', [], 'UNAUTHORIZED')
    }

    // Find user selecting the hidden refreshTokenHash field
    const user = await User.findOne({ _id: decoded.sub, isDeleted: false }).select('+refreshTokenHash')
    if (!user) {
      throw new ApiError(401, 'User no longer exists', [], 'UNAUTHORIZED')
    }

    const incomingHash = hashToken(token)

    // Verify token hash is correct, token has not expired, and version matches
    const isTokenValid = 
      user.refreshTokenHash === incomingHash && 
      user.refreshTokenExpiresAt && 
      user.refreshTokenExpiresAt > new Date() &&
      decoded.tokenVersion === user.refreshTokenVersion

    if (!isTokenValid) {
      // Invalidate all tokens for this user on suspect hijack/reuse
      user.refreshTokenVersion += 1
      user.refreshTokenHash = undefined
      user.refreshTokenExpiresAt = undefined
      await user.save()
      throw new ApiError(403, 'Session compromised or expired. Re-authentication required.', [], 'TOKEN_REUSED_OR_REVOKED')
    }

    // Increment version for rotation
    user.refreshTokenVersion += 1
    
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)

    user.refreshTokenHash = hashToken(newRefreshToken)
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await user.save()

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  }

  /**
   * Generates a password reset token, saves it as SHA256, and logs it.
   */
  static async forgotPassword(email) {
    const user = await User.findOne({ email, isDeleted: false })
    if (!user) {
      return { message: 'If the account exists, reset instructions were sent.' }
    }

    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = hashToken(rawToken)

    user.passwordResetTokenHash = tokenHash
    user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 mins expiry
    await user.save()

    console.log(`[MOCK EMAIL] Password Reset Link: http://localhost:5173/reset-password?token=${rawToken}`)

    return { message: 'If the account exists, reset instructions were sent.', rawToken }
  }

  /**
   * Resets password using token, invalidating all current refresh tokens.
   */
  static async resetPassword({ token, password }) {
    const tokenHash = hashToken(token)

    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
      isDeleted: false
    })

    if (!user) {
      throw new ApiError(400, 'Reset token is invalid or has expired', [], 'INVALID_RESET_TOKEN')
    }

    user.passwordHash = await bcrypt.hash(password, 12)

    // Clear reset tokens
    user.passwordResetTokenHash = undefined
    user.passwordResetExpiresAt = undefined

    // Force rotation on all sessions and wipe refresh hashes
    user.refreshTokenVersion += 1
    user.refreshTokenHash = undefined
    user.refreshTokenExpiresAt = undefined

    await user.save()
  }
}
