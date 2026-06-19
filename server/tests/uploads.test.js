import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import app from '../src/app.js'
import User from '../src/modules/auth/user.model.js'

// Mock the entire cloudinary library to keep tests deterministic and network-free
vi.mock('cloudinary', () => {
  return {
    v2: {
      config: vi.fn(),
      uploader: {
        upload_stream: vi.fn((options, callback) => {
          return {
            end: vi.fn((buffer) => {
              // Simulate failure if folder is 'fail'
              if (options.folder === 'fail') {
                callback(new Error('Simulated Cloudinary Upload Error'), null)
              } else {
                callback(null, {
                  url: `http://res.cloudinary.com/test-cloud/image/upload/v12345/${options.folder}/testfile.jpg`,
                  secure_url: `https://res.cloudinary.com/test-cloud/image/upload/v12345/${options.folder}/testfile.jpg`,
                  public_id: `${options.folder}/testfile`,
                  resource_type: 'image',
                  format: 'jpg',
                  width: 800,
                  height: 600,
                  bytes: buffer.length,
                  folder: options.folder
                })
              }
            })
          }
        }),
        destroy: vi.fn((publicId, options, callback) => {
          const cb = typeof options === 'function' ? options : callback
          if (publicId.includes('missing')) {
            cb(null, { result: 'not_found' })
          } else if (publicId.includes('fail')) {
            cb(new Error('Simulated Cloudinary Destroy Error'), null)
          } else {
            cb(null, { result: 'ok' })
          }
        })
      }
    }
  }
})

describe('Upload infrastructure API Integration Tests', () => {
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

    // Create Admin User
    const passwordHash = await bcrypt.hash(rawPassword, 12)
    await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      passwordHash,
      role: 'admin',
      status: 'published'
    })

    // Create Regular User (Editor)
    await User.create({
      name: 'Regular User',
      email: 'editor@test.com',
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
      .send({ email: 'editor@test.com', password: rawPassword })
    regularToken = regularLoginRes.body.meta.accessToken
  })

  describe('POST /api/uploads/:type (Upload Operations)', () => {
    it('should successfully upload a valid image file to the profile folder', async () => {
      const mockBuffer = Buffer.from('fake-image-binary-data')
      const res = await request(app)
        .post('/api/uploads/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', mockBuffer, 'avatar.png')

      expect(res.status).toBe(200)
      expect(res.body.data.secureUrl).toBeDefined()
      expect(res.body.data.publicId).toBe('portfolio/profile/testfile')
      expect(res.body.data.folder).toBe('portfolio/profile')
    })

    it('should reject file upload when mimetype is not allowed for that endpoint', async () => {
      const mockBuffer = Buffer.from('some text data')
      const res = await request(app)
        .post('/api/uploads/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', mockBuffer, 'document.txt')

      expect(res.status).toBe(415)
      expect(res.body.error.code).toBe('UNSUPPORTED_MEDIA_TYPE')
    })

    it('should reject file upload when file extension is dangerous or disallowed', async () => {
      const mockBuffer = Buffer.from('<script>alert(1)</script>')
      const res = await request(app)
        .post('/api/uploads/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', mockBuffer, 'malicious.html')

      expect(res.status).toBe(415)
      expect(res.body.error.code).toBe('UNSUPPORTED_MEDIA_TYPE')
    })

    it('should reject upload when file size exceeds the category maximum limit', async () => {
      // Create a large buffer exceeding 5MB (Profile maximum is 5MB)
      const oversizedBuffer = Buffer.alloc(6 * 1024 * 1024)
      const res = await request(app)
        .post('/api/uploads/profile')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', oversizedBuffer, 'oversized.png')

      expect(res.status).toBe(400)
      expect(res.body.error.code).toBe('LIMIT_FILE_SIZE')
    })

    it('should fail with 401 when attempting upload without authentication', async () => {
      const mockBuffer = Buffer.from('some-data')
      const res = await request(app)
        .post('/api/uploads/profile')
        .attach('file', mockBuffer, 'avatar.png')

      expect(res.status).toBe(401)
      expect(res.body.error.code).toBe('UNAUTHORIZED')
    })

    it('should return 403 when trying to upload as non-admin role', async () => {
      const mockBuffer = Buffer.from('some-data')
      const res = await request(app)
        .post('/api/uploads/profile')
        .set('Authorization', `Bearer ${regularToken}`)
        .attach('file', mockBuffer, 'avatar.png')

      expect(res.status).toBe(403)
      expect(res.body.error.code).toBe('FORBIDDEN')
    })

    it('should handle Cloudinary upload stream failure gracefully', async () => {
      // We trigger a simulated Cloudinary failure by bypassing controller folder with mocks
      // In this test, we can dynamically swap the upload target folder to 'fail' or mock the service call
      const { UploadService } = await import('../src/modules/uploads/upload.service.js')
      const originalUpload = UploadService.uploadToCloudinary
      UploadService.uploadToCloudinary = vi.fn().mockRejectedValue(new Error('Cloudinary stream timed out'))

      try {
        const mockBuffer = Buffer.from('data')
        const res = await request(app)
          .post('/api/uploads/profile')
          .set('Authorization', `Bearer ${adminToken}`)
          .attach('file', mockBuffer, 'avatar.png')

        expect(res.status).toBe(500)
        expect(res.body.error.code).toBe('CLOUDINARY_FAILURE')
        expect(res.body.error.details).toContain('Cloudinary stream timed out')
      } finally {
        UploadService.uploadToCloudinary = originalUpload
      }
    })
  })

  describe('DELETE /api/uploads/:publicId (Delete Operations)', () => {
    it('should delete a valid whitelisted asset from Cloudinary', async () => {
      const res = await request(app)
        .delete('/api/uploads/portfolio/profile/testfile')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.message).toContain('deleted successfully')
    })

    it('should return 404 if the asset is missing on Cloudinary', async () => {
      const res = await request(app)
        .delete('/api/uploads/portfolio/profile/missing')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(res.status).toBe(404)
      expect(res.body.error.code).toBe('ASSET_NOT_FOUND')
    })

    it('should reject deletion for arbitrary or non-whitelisted public IDs', async () => {
      const res = await request(app)
        .delete('/api/uploads/portfolio/unallowedfolder/asset')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(res.status).toBe(400)
      expect(res.body.error.code).toBe('INVALID_PUBLIC_ID')
    })

    it('should block directory traversal or relative path manipulation in public IDs', async () => {
      const res = await request(app)
        .delete('/api/uploads/portfolio%2Fprofile%2F..%2F..%2F..%2Frandom')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(res.status).toBe(400)
      expect(res.body.error.code).toBe('INVALID_PUBLIC_ID')
    })

    it('should reject deletion request without admin privileges', async () => {
      const res = await request(app)
        .delete('/api/uploads/portfolio/profile/testfile')
        .set('Authorization', `Bearer ${regularToken}`)

      expect(res.status).toBe(403)
      expect(res.body.error.code).toBe('FORBIDDEN')
    })
  })
})
