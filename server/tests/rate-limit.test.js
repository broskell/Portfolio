import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import express from 'express'
import request from 'supertest'

const originalNodeEnv = process.env.NODE_ENV

const loadLimiters = async (nodeEnv) => {
  vi.resetModules()
  process.env.NODE_ENV = nodeEnv
  return import('../src/middleware/rateLimit.js')
}

const createRateLimitApp = async (nodeEnv) => {
  const { authLimiter, forgotPasswordLimiter, refreshLimiter, contactLimiter, apiLimiter } =
    await loadLimiters(nodeEnv)
  const app = express()

  app.use(express.json())
  app.use('/api', apiLimiter)
  app.post('/api/auth/login', authLimiter, (_req, res) => res.json({ ok: true }))
  app.post('/api/auth/forgot-password', forgotPasswordLimiter, (_req, res) => res.json({ ok: true }))
  app.post('/api/auth/refresh', refreshLimiter, (_req, res) => res.json({ ok: true }))
  app.post('/api/contact', contactLimiter, (_req, res) => res.status(201).json({ ok: true }))
  app.get('/api/settings', (_req, res) => res.json({ ok: true }))

  return app
}

const exhaust = async (app, method, path, allowedCount) => {
  for (let index = 0; index < allowedCount; index += 1) {
    const res = await request(app)[method](path).send({})
    expect(res.status).toBeLessThan(400)
  }

  return request(app)[method](path).send({})
}

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  process.env.NODE_ENV = originalNodeEnv
  vi.restoreAllMocks()
  vi.resetModules()
})

describe('rate limit configuration', () => {
  it('blocks production login requests after 20 attempts', async () => {
    const app = await createRateLimitApp('production')
    const blocked = await exhaust(app, 'post', '/api/auth/login', 20)

    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('TOO_MANY_LOGIN_ATTEMPTS')
    expect(blocked.body.error.message).toBe(
      'Too many login attempts. Please try again after 15 minutes.'
    )
  })

  it('blocks production forgot-password requests after 5 attempts', async () => {
    const app = await createRateLimitApp('production')
    const blocked = await exhaust(app, 'post', '/api/auth/forgot-password', 5)

    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('TOO_MANY_PASSWORD_RESET_REQUESTS')
  })

  it('blocks production refresh requests after 100 attempts', async () => {
    const app = await createRateLimitApp('production')
    const blocked = await exhaust(app, 'post', '/api/auth/refresh', 100)

    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('TOO_MANY_REFRESH_REQUESTS')
  })

  it('blocks production contact requests after 5 attempts with the contact message', async () => {
    const app = await createRateLimitApp('production')
    const blocked = await exhaust(app, 'post', '/api/contact', 5)

    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('CONTACT_LIMIT_REACHED')
    expect(blocked.body.error.message).toBe(
      "You've sent too many messages recently. Please try again later."
    )
  })

  it('blocks production global API requests after 300 attempts', async () => {
    const app = await createRateLimitApp('production')
    const blocked = await exhaust(app, 'get', '/api/settings', 300)

    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('TOO_MANY_REQUESTS')
  })

  it('does not let excluded auth/contact routes consume the global API bucket', async () => {
    const app = await createRateLimitApp('production')

    for (let index = 0; index < 301; index += 1) {
      await request(app).post('/api/auth/login').send({})
      await request(app).post('/api/contact').send({})
    }

    const globalApiResponse = await request(app).get('/api/settings')
    expect(globalApiResponse.status).toBe(200)
  })

  it('does not quickly block development login or contact testing', async () => {
    const app = await createRateLimitApp('development')

    for (let index = 0; index < 25; index += 1) {
      expect((await request(app).post('/api/auth/login').send({})).status).toBe(200)
      expect((await request(app).post('/api/contact').send({})).status).toBe(201)
    }
  })
})
