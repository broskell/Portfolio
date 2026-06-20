import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { timelineSchema } from '../module.validation.js'
import {
  getTimelines,
  getTimelineById,
  createTimeline,
  updateTimeline,
  deleteTimeline,
  restoreTimeline
} from './timeline.controller.js'

const router = Router()

// Private routes (require authentication)
router.get('/', requireAuth, getTimelines)
router.get('/:id', requireAuth, getTimelineById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(timelineSchema), createTimeline)
router.put('/:id', requireAuth, requireRole('admin'), validate(timelineSchema), updateTimeline)
router.delete('/:id', requireAuth, requireRole('admin'), deleteTimeline)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreTimeline)

export default router
