import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [150, 'Blog title cannot exceed 150 characters'],
    comment: 'The main heading of the blog article.'
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    comment: 'URL-friendly identifier derived from the title.'
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    comment: 'A short overview description used in cards and search indexing.'
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    comment: 'The full markdown or rich-text content body of the blog article.'
  },
  coverImage: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the blog cover image.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the cover image.'
    }
  },
  tags: {
    type: [String],
    default: [],
    comment: 'Categories or topics associated with this post (e.g. nodejs, design-patterns).'
  },
  readTime: {
    type: Number,
    default: 1,
    min: [1, 'Reading time must be at least 1 minute'],
    comment: 'Estimated reading time in minutes.'
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
    comment: 'Highlights this post on the portfolio front page.'
  },
  publishedAt: {
    type: Date,
    comment: 'The date when the article was changed from draft to published.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(blogSchema, { content: true })

blogSchema.index({ status: 1, publishedAt: -1, isDeleted: 1 })
blogSchema.index({ featured: 1, status: 1, isDeleted: 1 })

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
