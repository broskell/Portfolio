import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { testimonialSchema } from '../module.validation.js'
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  restoreTestimonial
} from './testimonial.controller.js'

const router = Router()

// Public routes
router.get('/', getTestimonials)
router.get('/:id', getTestimonialById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(testimonialSchema), createTestimonial)
router.put('/:id', requireAuth, requireRole('admin'), validate(testimonialSchema), updateTestimonial)
router.delete('/:id', requireAuth, requireRole('admin'), deleteTestimonial)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreTestimonial)

export default router
