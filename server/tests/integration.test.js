import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import Project from '../src/modules/projects/project.model.js'
import Skill from '../src/modules/skills/skill.model.js'
import Message from '../src/modules/contact/message.model.js'

describe('Express API Integration Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio-test'
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri)
    }
    // Clean up collections to isolate tests
    await Project.deleteMany({})
    await Skill.deleteMany({})
    await Message.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('GET /api/health', () => {
    it('should return 200 and status ok', async () => {
      const res = await request(app).get('/api/health')
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ status: 'ok' })
    })
  })

  describe('GET /api/projects', () => {
    it('should return 200 and list of projects', async () => {
      await Project.create({
        title: 'Test Project',
        slug: 'test-project',
        shortDescription: 'Short description',
        description: 'Testing description',
        techStack: ['Node.js'],
        displayOrder: 1,
      })

      const res = await request(app).get('/api/projects')
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBe(1)
      expect(res.body[0].title).toBe('Test Project')
    })
  })

  describe('GET /api/skills', () => {
    it('should return grouped skills', async () => {
      await Skill.create({
        name: 'React',
        category: 'Frontend',
        proficiency: 90,
      })

      const res = await request(app).get('/api/skills')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('Frontend')
      expect(Array.isArray(res.body.Frontend)).toBe(true)
      expect(res.body.Frontend[0].name).toBe('React')
    })
  })

  describe('POST /api/contact', () => {
    it('should create a contact message and return success with 201', async () => {
      const payload = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello world',
      }

      const res = await request(app).post('/api/contact').send(payload)
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body).toHaveProperty('id')

      const saved = await Message.findById(res.body.id)
      expect(saved).toBeDefined()
      expect(saved.name).toBe('John Doe')
    })

    it('should return 400 when fields are missing', async () => {
      const payload = {
        name: 'John Doe',
        email: 'john@example.com',
      }

      const res = await request(app).post('/api/contact').send(payload)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })

    it('should return 400 when email is invalid', async () => {
      const payload = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Inquiry',
        message: 'Hello world',
      }

      const res = await request(app).post('/api/contact').send(payload)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('Database Failures Simulating', () => {
    it('should handle project database retrieval failures gracefully', async () => {
      const findSpy = vi.spyOn(Project, 'find').mockImplementationOnce(() => {
        throw new Error('Database connection lost')
      })

      const res = await request(app).get('/api/projects')
      expect(res.status).toBe(500)
      expect(res.body.error.message).toBe('Database connection lost')

      findSpy.mockRestore()
    })
  })
})
