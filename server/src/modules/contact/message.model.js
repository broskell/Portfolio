import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sender name is required'],
    trim: true,
    maxlength: [120, 'Name cannot exceed 120 characters'],
    comment: 'The display name of the contact form submitter.'
  },
  email: {
    type: String,
    required: [true, 'Sender email is required'],
    lowercase: true,
    trim: true,
    index: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
    comment: 'The email address of the contact form submitter.'
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [160, 'Subject cannot exceed 160 characters'],
    comment: 'Subject of the message.'
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [5000, 'Message cannot exceed 5000 characters'],
    comment: 'The full body content of the message.'
  }
})

// Ensure Message conforms to the global rule of having status, soft delete, audit, and timestamps
addCommonFields(messageSchema, { content: true })

messageSchema.index({ createdAt: -1, status: 1, isDeleted: 1 })

export default mongoose.models.Message || mongoose.model('Message', messageSchema)
