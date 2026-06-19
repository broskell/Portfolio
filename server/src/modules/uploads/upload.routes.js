import express from 'express'
import multer from 'multer'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { UploadController } from './upload.controller.js'

const router = express.Router()

// Multer memory storage initialization - keeps files purely in memory buffers
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Hard limit of 10MB inside multer parser
  }
})

// Apply authentication guards on all upload endpoints
router.use(requireAuth)
router.use(requireRole('admin'))

// POST upload endpoints
router.post('/profile', upload.single('file'), UploadController.uploadFile('profile'))
router.post('/project', upload.single('file'), UploadController.uploadFile('project'))
router.post('/certificate', upload.single('file'), UploadController.uploadFile('certificate'))
router.post('/blog', upload.single('file'), UploadController.uploadFile('blog'))
router.post('/resume', upload.single('file'), UploadController.uploadFile('resume'))
router.post('/testimonial', upload.single('file'), UploadController.uploadFile('testimonial'))

// DELETE endpoint - wildcard parameter allows capturing public IDs containing slashes
router.delete('/:publicId(*)', UploadController.deleteFile)

export default router
