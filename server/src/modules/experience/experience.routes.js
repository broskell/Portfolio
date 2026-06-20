import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { experienceSchema } from '../module.validation.js'
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  restoreExperience
} from './experience.controller.js'

const router = Router()

// Private routes (require authentication)
router.get('/', requireAuth, getExperiences)
router.get('/:id', requireAuth, getExperienceById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(experienceSchema), createExperience)
router.put('/:id', requireAuth, requireRole('admin'), validate(experienceSchema), updateExperience)
router.delete('/:id', requireAuth, requireRole('admin'), deleteExperience)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreExperience)

export default router
