import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { projectSchema } from '../module.validation.js'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  restoreProject
} from './project.controller.js'

const router = Router()

// Public routes
router.get('/', getProjects)
router.get('/:id', getProjectById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(projectSchema), createProject)
router.put('/:id', requireAuth, requireRole('admin'), validate(projectSchema), updateProject)
router.delete('/:id', requireAuth, requireRole('admin'), deleteProject)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreProject)

export default router

