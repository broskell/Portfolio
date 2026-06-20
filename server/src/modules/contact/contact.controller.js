import Message from './message.model.js'
import { ContactService } from './contact.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { createCrudController } from '../../utils/crudFactory.js'
import { ApiError } from '../../utils/ApiError.js'

const controller = createCrudController(Message, ['name', 'email', 'subject', 'message'])

export const createMessage = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('[CONTACT]', req.ip, req.body.email, new Date())
  }

  const saved = await ContactService.createMessage(req.body)
  return successResponse(res, { success: true, id: saved._id }, 201, { raw: true })
})

export const getMessages = controller.getAll
export const getMessageById = controller.getById
export const deleteMessage = controller.delete
export const restoreMessage = controller.restore

export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params
  const message = await Message.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status: 'published' },
    { new: true }
  )
  
  if (!message) {
    throw new ApiError(404, 'Message not found')
  }
  
  return successResponse(res, message)
})
