import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true,
    comment: 'The name of the certificate (e.g. AWS Certified Developer).'
  },
  issuer: {
    type: String,
    required: [true, 'Issuer name is required'],
    trim: true,
    comment: 'The organization that issued the certificate (e.g. Amazon Web Services).'
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required'],
    comment: 'The date when the certificate was issued.'
  },
  credentialId: {
    type: String,
    trim: true,
    comment: 'The unique certificate ID for validation purposes.'
  },
  credentialUrl: {
    type: String,
    trim: true,
    comment: 'Verification link to the credential issuer website.'
  },
  image: {
    url: {
      type: String,
      trim: true,
      comment: 'URL of the certificate image/badge asset.'
    },
    publicId: {
      type: String,
      trim: true,
      comment: 'Cloudinary public ID for the certificate image.'
    }
  },
  tags: {
    type: [String],
    default: [],
    comment: 'Tags for skills related to the certificate (e.g. cloud, react).'
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
    comment: 'Determines if this certificate should be pinned to high-priority sections of the portfolio.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Order index for manual drag-and-drop sequencing in list displays.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(certificateSchema, { content: true })

certificateSchema.index({ issueDate: -1, isDeleted: 1 })
certificateSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema)
