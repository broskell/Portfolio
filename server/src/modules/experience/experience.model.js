import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    comment: 'The name of the company or organization (e.g. Google).'
  },
  role: {
    type: String,
    required: [true, 'Role/Position is required'],
    trim: true,
    comment: 'Title of the position held (e.g. Software Engineer Intern).'
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    comment: 'A summary of achievements, projects, and daily tasks in this position.'
  },
  techStack: {
    type: [String],
    default: [],
    comment: 'List of technologies, frameworks, and tools used during the job.'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    comment: 'The date when employment started.'
  },
  endDate: {
    type: Date,
    comment: 'The date when employment ended. Null if currently working here.'
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
    comment: 'Flags if the developer is currently employed in this position.'
  },
  location: {
    type: String,
    trim: true,
    comment: 'Physical location of the role (e.g. Bangalore, India or Remote).'
  },
  companyLogo: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the company logo image.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the logo image.'
    }
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Order index for list sequencing.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(experienceSchema, { content: true })

experienceSchema.index({ startDate: -1, isDeleted: 1 })
experienceSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema)
