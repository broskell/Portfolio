import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Testimonial provider name is required'],
    trim: true,
    comment: 'The name of the person giving the testimonial.'
  },
  role: {
    type: String,
    trim: true,
    comment: 'The professional role/position of the provider (e.g. Lead Developer).'
  },
  company: {
    type: String,
    trim: true,
    comment: 'The company or organization where the provider works.'
  },
  message: {
    type: String,
    required: [true, 'Testimonial message/content is required'],
    trim: true,
    maxlength: [800, 'Testimonial message cannot exceed 800 characters'],
    comment: 'The written feedback or quote.'
  },
  avatar: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the person avatar image.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the avatar image.'
    }
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    comment: 'Optional numeric score out of 5.'
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
    comment: 'Enables showing this testimonial on high-priority sliders/grids.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Sorting order value.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(testimonialSchema, { content: true })

testimonialSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema)
