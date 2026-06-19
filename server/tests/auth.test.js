import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import app from '../src/app.js'
import User from '../src/modules/auth/user.model.js'
import { env } from '../src/config/env.js'

describe('Authentication API Integration Tests', () => {
  let seededUser
  const rawPassword = 'StrongAdminPassword@1'

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio-test'
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri)
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash(rawPassword, 12)
    seededUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      passwordHash,
      role: 'admin',
      status: 'published'
    })
  })

  describe('POST /api/auth/login', () => {
    it('should authenticate admin and return access token in response metadata and refresh token in cookie', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: rawPassword })

      expect(res.status).toBe(200)
      expect(res.body.data.user.email).toBe('admin@test.com')
      expect(res.body.meta.accessToken).toBeDefined()

      // Assert HttpOnly Cookie with specific paths and sameSite lax in test environment
      const cookies = res.headers['set-cookie']
      expect(cookies).toBeDefined()
      expect(cookies[0]).toContain('refreshToken=')
      expect(cookies[0]).toContain('HttpOnly')
      expect(cookies[0]).toContain('Path=/api/auth/refresh')
      expect(cookies[0]).toContain('SameSite=Lax') // Lax in test/dev, Strict in production
    })

    it('should reject authentication for incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'wrong-password' })

      expect(res.status).toBe(401)
      expect(res.body.error.code).toBe('INVALID_CREDENTIALS')
    })
  })

  describe('POST /api/auth/logout', () => {
    it('should clear refresh token cookie and return 204 status', async () => {
      const res = await request(app).post('/api/auth/logout')
      expect(res.status).toBe(204)
      
      const cookies = res.headers['set-cookie']
      if (cookies) {
        expect(cookies[0]).toContain('refreshToken=;')
        expect(cookies[0]).toContain('Max-Age=0')
      }
    })
  })

  describe('POST /api/auth/refresh (Rotation & Reuse Detection)', () => {
    it('should rotate refresh token and issue a new access token, and reject when re-using the old one', async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: rawPassword })
      
      const cookies = loginRes.headers['set-cookie']
      const originalCookie = cookies[0].split(';')[0]

      // Perform first refresh request (rotates token)
      const refreshRes1 = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', originalCookie)

      expect(refreshRes1.status).toBe(200)
      expect(refreshRes1.body.meta.accessToken).toBeDefined()

      const rotatedCookies = refreshRes1.headers['set-cookie']
      const rotatedCookie = rotatedCookies[0].split(';')[0]
      expect(rotatedCookie).not.toBe(originalCookie)

      // Re-using the OLD (original) refresh token should trigger breach detection and return 403
      const refreshRes2 = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', originalCookie)

      expect(refreshRes2.status).toBe(403)
      expect(refreshRes2.body.error.code).toBe('TOKEN_REUSED_OR_REVOKED')

      // Verify that the user session version was incremented, rendering even the rotated token invalid
      const refreshRes3 = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', rotatedCookie)

      expect(refreshRes3.status).toBe(403)
    })

    it('should fail refresh verification when no refresh cookie is supplied', async () => {
      const res = await request(app).post('/api/auth/refresh')
      expect(res.status).toBe(401)
      expect(res.body.error.code).toBe('UNAUTHORIZED')
    })
  })

  describe('GET /api/auth/me (JWT Checks)', () => {
    it('should return user info when authorized access token is supplied', async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: rawPassword })
      
      const accessToken = loginRes.body.meta.accessToken

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.user.name).toBe('Admin User')
    })

    it('should return 401 when access token has expired', async () => {
      // Sign an expired access token directly for the test
      const expiredToken = jwt.sign(
        { sub: seededUser._id.toString(), role: 'admin', email: 'admin@test.com', tokenVersion: seededUser.refreshTokenVersion },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '-10s' } // Expired 10 seconds ago
      )

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`)

      expect(res.status).toBe(401)
      expect(res.body.error.code).toBe('TOKEN_EXPIRED')
    })

    it('should return 401 when access token has a mismatched version', async () => {
      const tokenMismatchedVersion = jwt.sign(
        { sub: seededUser._id.toString(), role: 'admin', email: 'admin@test.com', tokenVersion: 999 }, // Mismatched
        env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
      )

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${tokenMismatchedVersion}`)

      expect(res.status).toBe(401)
      expect(res.body.error.code).toBe('TOKEN_REVOKED')
    })
  })

  describe('Password Recovery (Forgot/Reset Password)', () => {
    it('should trigger recovery and respond with 202 generic status', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'admin@test.com' })

      expect(res.status).toBe(202)
      expect(res.body.data.message).toContain('instructions were sent')

      const user = await User.findOne({ email: 'admin@test.com' }).select('+passwordResetTokenHash')
      expect(user.passwordResetTokenHash).toBeDefined()
      expect(user.passwordResetExpiresAt).toBeDefined()
    })

    it('should successfully reset password with valid token and strong password', async () => {
      // Trigger recovery
      const forgotRes = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'admin@test.com' })
      
      // Inject mock token
      const rawToken = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      const crypto = await import('crypto')
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
      
      const user = await User.findOne({ email: 'admin@test.com' })
      user.passwordResetTokenHash = tokenHash
      user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000)
      await user.save()

      // Reset
      const newPassword = 'NewStrongPassword@2'
      const resetRes = await request(app)
        .post('/api/auth/reset-password')
        .send({ token: rawToken, password: newPassword })

      expect(resetRes.status).toBe(204)

      // Login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: newPassword })

      expect(loginRes.status).toBe(200)
    })

    it('should fail reset password when reset token has expired', async () => {
      // Trigger recovery
      await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'admin@test.com' })

      const rawToken = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      const crypto = await import('crypto')
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
      
      const user = await User.findOne({ email: 'admin@test.com' })
      user.passwordResetTokenHash = tokenHash
      user.passwordResetExpiresAt = new Date(Date.now() - 1000) // Expired 1 second ago
      await user.save()

      const resetRes = await request(app)
        .post('/api/auth/reset-password')
        .send({ token: rawToken, password: 'NewPassword@123' })

      expect(resetRes.status).toBe(400)
      expect(resetRes.body.error.code).toBe('INVALID_RESET_TOKEN')
    })
  })
})
