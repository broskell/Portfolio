import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import User from '../src/modules/auth/user.model.js'
import Project from '../src/modules/projects/project.model.js'
import Skill from '../src/modules/skills/skill.model.js'
import Settings from '../src/modules/settings/settings.model.js'
import Blog from '../src/modules/blogs/blog.model.js'
import Certificate from '../src/modules/certificates/certificate.model.js'
import Experience from '../src/modules/experience/experience.model.js'
import Timeline from '../src/modules/timeline/timeline.model.js'
import Achievement from '../src/modules/achievements/achievement.model.js'
import Testimonial from '../src/modules/testimonials/testimonial.model.js'
import VisitorAnalytics from '../src/modules/analytics/visitorAnalytics.model.js'
import Message from '../src/modules/contact/message.model.js'

describe('Mongoose Schema Validation and Constraints Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio-test'
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri)
    }
    // Clean collections
    await User.deleteMany({})
    await Project.deleteMany({})
    await Skill.deleteMany({})
    await Settings.deleteMany({})
    await Blog.deleteMany({})
    await Certificate.deleteMany({})
    await Experience.deleteMany({})
    await Timeline.deleteMany({})
    await Achievement.deleteMany({})
    await Testimonial.deleteMany({})
    await VisitorAnalytics.deleteMany({})
    await Message.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('Global Base Schema (Timestamps & Soft Delete)', () => {
    it('should automatically set timestamps (createdAt and updatedAt) on save', async () => {
      const skill = new Skill({
        name: 'NodeJS',
        category: 'Backend',
        proficiency: 90
      })
      const saved = await skill.save()
      expect(saved.createdAt).toBeDefined()
      expect(saved.updatedAt).toBeDefined()
      expect(saved.isDeleted).toBe(false)
    })
  })

  describe('User Schema Validation', () => {
    it('should fail if required fields name and email are missing', async () => {
      const user = new User({ passwordHash: 'secret' })
      let err = null
      try {
        await user.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.errors.name).toBeDefined()
      expect(err.errors.email).toBeDefined()
    })

    it('should enforce unique email constraint', async () => {
      const email = 'unique-admin@portfolio.com'
      const user1 = new User({ name: 'Admin One', email, passwordHash: 'hash' })
      await user1.save()

      const user2 = new User({ name: 'Admin Two', email, passwordHash: 'hash2' })
      let err = null
      try {
        await user2.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.code).toBe(11000) // Duplicate key error
    })
  })

  describe('Project Schema Validation', () => {
    it('should fail with invalid category enum', async () => {
      const project = new Project({
        title: 'Project 1',
        slug: 'project-1',
        shortDescription: 'Short desc',
        description: 'Detailed description',
        category: 'invalid-category'
      })
      let err = null
      try {
        await project.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.errors.category).toBeDefined()
    })

    it('should enforce unique slug constraint', async () => {
      const slug = 'duplicate-slug'
      const p1 = new Project({
        title: 'Project A',
        slug,
        shortDescription: 'Short desc',
        description: 'Detailed description'
      })
      await p1.save()

      const p2 = new Project({
        title: 'Project B',
        slug,
        shortDescription: 'Short desc',
        description: 'Detailed description'
      })
      let err = null
      try {
        await p2.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.code).toBe(11000)
    })
  })

  describe('Skill Schema Validation', () => {
    it('should fail with invalid category enum', async () => {
      const skill = new Skill({
        name: 'TypeScript',
        category: 'InvalidCat'
      })
      let err = null
      try {
        await skill.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.errors.category).toBeDefined()
    })
  })

  describe('Settings Schema Validation', () => {
    it('should enforce unique singletonKey constraint', async () => {
      const set1 = new Settings({
        singletonKey: 'main',
        profile: { fullName: 'Saathvik', headline: 'Dev', bio: 'Bio', email: 'saathvik@gmail.com' },
        seo: { title: 'Portfolio', description: 'Web' }
      })
      await set1.save()

      const set2 = new Settings({
        singletonKey: 'main',
        profile: { fullName: 'Saathvik', headline: 'Dev', bio: 'Bio', email: 'saathvik@gmail.com' },
        seo: { title: 'Portfolio', description: 'Web' }
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
  })

  describe('Blog Schema Validation', () => {
    it('should enforce unique slug constraint and validate required fields', async () => {
      const blog = new Blog({ title: 'A blog' }) // missing slug, excerpt, content
      let err = null
      try {
        await blog.save()
      } catch (e) {
        err = e
      }
      expect(err).not.toBeNull()
      expect(err.errors.slug).toBeDefined()
      expect(err.errors.excerpt).toBeDefined()
      expect(err.errors.content).toBeDefined()
    })
  })
})
