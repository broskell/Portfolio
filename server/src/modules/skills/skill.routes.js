import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { skillSchema } from '../module.validation.js'
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  restoreSkill
} from './skill.controller.js'

const router = Router()

// Public routes
router.get('/', getSkills)
router.get('/:id', getSkillById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(skillSchema), createSkill)
router.put('/:id', requireAuth, requireRole('admin'), validate(skillSchema), updateSkill)
router.delete('/:id', requireAuth, requireRole('admin'), deleteSkill)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreSkill)

export default router

