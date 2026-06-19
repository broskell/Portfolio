import { describe, it, expect } from 'vitest'
import express from 'express'
import request from 'supertest'
import { createContactLimiter } from '../src/middleware/rateLimit.js'

const createTestApp = ({ max, windowMs }) => {
  const app = express()
  app.use(express.json())
  app.post('/contact', createContactLimiter({ max, windowMs }), (_req, res) => {
    res.status(201).json({ success: true })
  })
  return app
}

describe('contactLimiter', () => {
  it('blocks contact submissions after the configured threshold', async () => {
    const app = createTestApp({ max: 2, windowMs: 1000 })

    expect((await request(app).post('/contact').send({})).status).toBe(201)
    expect((await request(app).post('/contact').send({})).status).toBe(201)

    const blocked = await request(app).post('/contact').send({})
    expect(blocked.status).toBe(429)
    expect(blocked.body.error.code).toBe('TOO_MANY_REQUESTS')
  })

  it('allows contact submissions again after the rate limit window resets', async () => {
    const app = createTestApp({ max: 1, windowMs: 75 })

    expect((await request(app).post('/contact').send({})).status).toBe(201)
    expect((await request(app).post('/contact').send({})).status).toBe(429)

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect((await request(app).post('/contact').send({})).status).toBe(201)
  })
})
