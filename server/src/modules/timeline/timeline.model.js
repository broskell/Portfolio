import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Timeline milestone title is required'],
    trim: true,
    comment: 'The title of the milestone event (e.g. Graduated from IIT).'
  },
  description: {
    type: String,
    required: [true, 'Timeline description is required'],
    trim: true,
    comment: 'A details summary of the milestone event.'
  },
  year: {
    type: Number,
    required: [true, 'Milestone year is required'],
    comment: 'The calendar year when the event occurred (e.g. 2024).'
  },
  date: {
    type: Date,
    required: [true, 'Milestone date is required'],
    comment: 'The precise date when the event occurred.'
  },
  type: {
    type: String,
    required: [true, 'Milestone type is required'],
    enum: ['education', 'project', 'award', 'experience', 'personal'],
    index: true,
    comment: 'Categorization of the milestone (education, project, award, experience, or personal).'
  },
  icon: {
    type: String,
    trim: true,
    comment: 'Icon code or tag corresponding to the milestone event.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Manual reordering index.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(timelineSchema, { content: true })

timelineSchema.index({ date: -1, isDeleted: 1 })
timelineSchema.index({ status: 1, displayOrder: 1, isDeleted: 1 })

export default mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema)
