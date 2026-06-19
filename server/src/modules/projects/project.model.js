import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    minlength: [2, 'Project title must be at least 2 characters'],
    maxlength: [100, 'Project title cannot exceed 100 characters'],
    comment: 'The name of the project.'
  },
  slug: {
    type: String,
    required: [true, 'Project slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    comment: 'URL-friendly identifier derived from the title.'
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters'],
    comment: 'A brief summary of the project for cards.'
  },
  description: {
    type: String,
    required: [true, 'Detailed description is required'],
    trim: true,
    comment: 'Detailed overview or writeup of the project.'
  },
  techStack: {
    type: [String],
    default: [],
    comment: 'Technologies used in the project.'
  },
  tags: {
    type: [String],
    default: [],
    comment: 'Tags for searching and grouping.'
  },
  githubUrl: {
    type: String,
    trim: true,
    comment: 'Link to the GitHub repository.'
  },
  liveUrl: {
    type: String,
    trim: true,
    comment: 'Link to the live demo.'
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
    comment: 'Pins this project to the highlights showcase.'
  },
  coverImage: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the main cover image.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the cover image.'
    }
  },
  galleryImages: [{
    url: {
      type: String,
      trim: true,
      comment: 'URL of a gallery image.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for a gallery image.'
    }
  }],
  category: {
    type: String,
    enum: ['web', 'ai', 'mobile', 'data', 'design', 'security', 'other'],
    default: 'web',
    index: true,
    comment: 'Categorization of the project.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Manual drag-and-drop display order index.'
  },
  startDate: {
    type: Date,
    comment: 'Date when the project was started.'
  },
  endDate: {
    type: Date,
    comment: 'Date when the project was completed.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(projectSchema, { content: true })

projectSchema.index({ featured: 1, status: 1, isDeleted: 1 })
projectSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Project || mongoose.model('Project', projectSchema)
