import { Router } from 'express'
import { createMessage } from './contact.controller.js'
import { contactLimiter } from '../../middleware/rateLimit.js'

const router = Router()

router.post('/', contactLimiter, createMessage)

export default router
