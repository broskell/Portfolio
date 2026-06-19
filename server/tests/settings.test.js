import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import app from '../src/app.js'
import User from '../src/modules/auth/user.model.js'
import Settings from '../src/modules/settings/settings.model.js'

describe('Settings API Integration Tests', () => {
  let adminToken
  let regularToken
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
    await Settings.deleteMany({})

    // Create Admin User
    const passwordHash = await bcrypt.hash(rawPassword, 12)
    await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      passwordHash,
      role: 'admin',
      status: 'published'
    })

    // Create non-admin User (e.g. editor) for role checking
    await User.create({
      name: 'Regular User',
      email: 'regular@test.com',
      passwordHash,
      role: 'editor',
      status: 'published'
    })

    // Authenticate Admin
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@test.com', password: rawPassword })
    
    adminToken = loginRes.body.meta.accessToken

    // Authenticate Regular
    const regularLoginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'regular@test.com', password: rawPassword })
    
    regularToken = regularLoginRes.body.meta.accessToken
  })

  describe('GET /api/settings', () => {
    it('should return 404 if settings have not been configured yet', async () => {
      const res = await request(app).get('/api/settings')
      expect(res.status).toBe(404)
      expect(res.body.error.code).toBe('SETTINGS_NOT_FOUND')
    })

    it('should return settings publicly when seeded', async () => {
      await Settings.create({
        singletonKey: 'main',
        profile: { fullName: 'Saathvik', headline: 'Web Dev', bio: 'Bio text', email: 'saathvik@test.com' },
        socials: { github: 'https://github.com/broskell', linkedin: 'https://linkedin.com' },
        seo: { title: 'Saathvik Portfolio', description: 'SEO description' }
      })

      const res = await request(app).get('/api/settings')
      expect(res.status).toBe(200)
      expect(res.body.data.profile.fullName).toBe('Saathvik')
    })
  })

  describe('PUT /api/settings', () => {
    const validSettingsPayload = {
      profile: {
        fullName: 'Kellampalli Saathvik',
        headline: 'Full-Stack Developer',
        bio: 'Innovative engineer working on antigravity systems.',
        email: 'saathvik@test.com',
        location: 'IIT Jodhpur, India',
        phone: '+919999999999',
        profileImageUrl: 'https://res.cloudinary.com/avatar.jpg',
        resumeUrl: 'https://res.cloudinary.com/resume.pdf'
      },
      socials: {
        github: 'https://github.com/broskell',
        linkedin: 'https://linkedin.com/in/kellampalli-saathvik',
        twitter: 'https://twitter.com',
        leetcode: 'https://leetcode.com',
        codeforces: 'https://codeforces.com'
      },
      seo: {
        title: 'Portfolio | Kellampalli Saathvik',
        description: 'Portfolio details for Saathvik, building premium products.',
        keywords: ['developer', 'react', 'express', 'mongodb'],
        ogImageUrl: 'https://res.cloudinary.com/og.jpg',
        faviconUrl: 'https://res.cloudinary.com/favicon.ico'
      }
    }

    it('should update settings successfully when authenticated as admin', async () => {
      const res = await request(app)
        .put('/api/settings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validSettingsPayload)

      expect(res.status).toBe(200)
      expect(res.body.data.profile.fullName).toBe('Kellampalli Saathvik')
      expect(res.body.data.socials.github).toBe('https://github.com/broskell')
    })

    it('should fail settings update when duplicate settings document with same singletonKey is attempted', async () => {
      // First save
      await request(app)
        .put('/api/settings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validSettingsPayload)

      // Directly attempt Mongoose save of a second settings document with duplicate main key
      const set2 = new Settings({
        singletonKey: 'main',
        profile: { fullName: 'Second', headline: 'headline', bio: 'bio', email: 'sec@test.com' },
        seo: { title: 'SEO title', description: 'SEO desc' }
      })

      let err = null
      try {
        await set2.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.code).toBe(11000)
    })

    it('should fail with 401 when authorization header is missing', async () => {
      const res = await request(app)
        .put('/api/settings')
        .send(validSettingsPayload)

      expect(res.status).toBe(401)
    })

    it('should fail with 403 when authenticated as a non-admin role', async () => {
      const res = await request(app)
        .put('/api/settings')
        .set('Authorization', `Bearer ${regularToken}`)
        .send(validSettingsPayload)

      expect(res.status).toBe(403)
      expect(res.body.error.code).toBe('FORBIDDEN')
    })

    it('should fail with 400 when validation rules fail (Zod url/email validation)', async () => {
      const invalidPayload = {
        ...validSettingsPayload,
        profile: {
          ...validSettingsPayload.profile,
          email: 'invalid-email-format'
        }
      }

      const res = await request(app)
        .put('/api/settings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidPayload)

      expect(res.status).toBe(400)
      expect(res.body.error.code).toBe('VALIDATION_ERROR')
    })
  })

  describe('Rate Limiting & Security Headers Check', () => {
    it('should return rate limiting headers on api requests', async () => {
      const res = await request(app).get('/api/settings')
      expect(res.headers).toHaveProperty('x-ratelimit-limit')
      expect(res.headers).toHaveProperty('x-ratelimit-remaining')
    })

    it('should configure Helmet security headers', async () => {
      const res = await request(app).get('/api/settings')
      expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff')
      expect(res.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN')
    })
  })
})
