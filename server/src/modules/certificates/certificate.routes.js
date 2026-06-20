import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { certificateSchema } from '../module.validation.js'
import {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  restoreCertificate
} from './certificate.controller.js'

const router = Router()

// Private routes (require authentication)
router.get('/', requireAuth, getCertificates)
router.get('/:id', requireAuth, getCertificateById)

// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(certificateSchema), createCertificate)
router.put('/:id', requireAuth, requireRole('admin'), validate(certificateSchema), updateCertificate)
router.delete('/:id', requireAuth, requireRole('admin'), deleteCertificate)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreCertificate)

export default router
