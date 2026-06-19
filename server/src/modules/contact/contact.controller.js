import { ContactService } from './contact.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const createMessage = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('[CONTACT]', req.ip, req.body.email, new Date())
  }

  const saved = await ContactService.createMessage(req.body)
  return successResponse(res, { success: true, id: saved._id }, 201, { raw: true })
})
