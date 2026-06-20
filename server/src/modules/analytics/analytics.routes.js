import { Router } from 'express'
import { getDashboardSummary } from './analytics.controller.js'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'

const router = Router()

router.get('/', requireAuth, requireRole('admin'), getDashboardSummary)

export default router
