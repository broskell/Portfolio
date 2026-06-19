import Message from './message.model.js'
import { ApiError } from '../../utils/ApiError.js'

export class ContactService {
  static async createMessage(data) {
    const { name, email, subject, message } = data

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      throw new ApiError(400, 'All fields are required.', [], 'MISSING_FIELDS')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new ApiError(400, 'Invalid email address.', [], 'INVALID_EMAIL')
    }

    return Message.create({ name, email, subject, message })
  }
}
