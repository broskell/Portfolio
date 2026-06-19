import { Router } from 'express'
import { login, logout, refresh, forgotPassword, resetPassword, getMe } from './auth.controller.js'
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation.js'
import { validate } from '../../middleware/validate.js'
import { requireAuth } from '../../middleware/auth.js'
import { authLimiter, forgotPasswordLimiter, refreshLimiter } from '../../middleware/rateLimit.js'

const router = Router()

router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/logout', logout)
router.post('/refresh', refreshLimiter, refresh)
router.post('/forgot-password', forgotPasswordLimiter, validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword)
router.get('/me', requireAuth, getMe)

export default router
