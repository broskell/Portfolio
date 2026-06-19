import { Router } from 'express'
import { getSettings, updateSettings } from './settings.controller.js'
import { updateSettingsSchema } from './settings.validation.js'
import { validate } from '../../middleware/validate.js'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'

const router = Router()

router.get('/', getSettings)
router.put('/', requireAuth, requireRole('admin'), validate(updateSettingsSchema), updateSettings)

export default router
