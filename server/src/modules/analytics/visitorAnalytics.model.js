import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const visitorAnalyticsSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: [true, 'Visitor ID is required'],
    index: true,
    comment: 'Anonymized unique identifier for the visitor (stored in localStorage).'
  },
  sessionId: {
    type: String,
    required: [true, 'Session ID is required'],
    index: true,
    comment: 'Unique identifier grouping events in a single browsing session.'
  },
  path: {
    type: String,
    required: [true, 'URL path is required'],
    index: true,
    comment: 'The path visited (e.g. /projects).'
  },
  country: {
    type: String,
    trim: true,
    comment: 'Geographic country derived from visitor IP.'
  },
  device: {
    type: String,
    trim: true,
    comment: 'Device classification (desktop, mobile, tablet, bot, unknown).'
  },
  browser: {
    type: String,
    trim: true,
    comment: 'Browser identifier (e.g. Chrome, Firefox).'
  },
  os: {
    type: String,
    trim: true,
    comment: 'Operating system (e.g. Windows, macOS, iOS).'
  },
  referrer: {
    type: String,
    trim: true,
    comment: 'Traffic source referrer URL.'
  },
  durationSeconds: {
    type: Number,
    default: 0,
    comment: 'Active time spent viewing the page in seconds.'
  },
  visitedAt: {
    type: Date,
    default: Date.now,
    index: true,
    comment: 'Timestamp when the pageview occurred.'
  }
})

// Ensure VisitorAnalytics conforms to the global rule of having status, soft delete, audit, and timestamps
addCommonFields(visitorAnalyticsSchema, { content: true })

visitorAnalyticsSchema.index({ visitedAt: -1, path: 1 })

export default mongoose.models.VisitorAnalytics || mongoose.model('VisitorAnalytics', visitorAnalyticsSchema)
