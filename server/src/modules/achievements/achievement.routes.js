import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { achievementSchema } from '../module.validation.js'
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  restoreAchievement
} from './achievement.controller.js'

const router = Router()

// Private routes (require authentication)
router.get('/', requireAuth, getAchievements)
router.get('/:id', requireAuth, getAchievementById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(achievementSchema), createAchievement)
router.put('/:id', requireAuth, requireRole('admin'), validate(achievementSchema), updateAchievement)
router.delete('/:id', requireAuth, requireRole('admin'), deleteAchievement)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreAchievement)

export default router
