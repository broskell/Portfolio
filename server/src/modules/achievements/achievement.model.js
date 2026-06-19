import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true,
    comment: 'The name or title of the achievement (e.g. Smart India Hackathon Winner).'
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true,
    comment: 'A details explanation of the achievement.'
  },
  issuer: {
    type: String,
    trim: true,
    comment: 'The organization bestowing the achievement (e.g. Ministry of Education).'
  },
  date: {
    type: Date,
    required: [true, 'Achievement date is required'],
    comment: 'The date when this achievement was attained.'
  },
  image: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the certificate image or hackathon photo.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the image.'
    }
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
    comment: 'Pins this achievement to the highlights section of the home page.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Sort ordering offset.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(achievementSchema, { content: true })

achievementSchema.index({ date: -1, isDeleted: 1 })
achievementSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema)
