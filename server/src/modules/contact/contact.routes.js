import { Router } from 'express'
import {
  createMessage,
  getMessages,
  deleteMessage,
  restoreMessage,
  markAsRead
} from './contact.controller.js'
import { contactLimiter } from '../../middleware/rateLimit.js'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'

const router = Router()

// Public endpoint to send a message
router.post('/', contactLimiter, createMessage)

// Private admin endpoints to manage messages
router.get('/', requireAuth, requireRole('admin'), getMessages)
router.put('/:id/read', requireAuth, requireRole('admin'), markAsRead)
router.delete('/:id', requireAuth, requireRole('admin'), deleteMessage)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreMessage)

export default router
